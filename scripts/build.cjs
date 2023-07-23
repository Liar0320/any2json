/*
 * @Author: lich
 * @Date: 2022-09-14 16:03:19
 * @Last Modified by: lich
 * @Last Modified time: 2023-07-23 11:45:43
 * @desc:
 * 开发模式现实的功能,
 * 可以开启不同模块的打包, 例如
 * npm run dev | node ./dev  监听packages下所有模块的编译和输出
 * -f esm | cjs | global
 */

const build = require("esbuild");
const { resolve } = require("path");
var argv = require("minimist")(process.argv.slice(2));

const target = argv._[0];

async function bundlePackages(target, format = "esm") {
  // resolve output
  const outputFormat = format.startsWith("global") ? "iife" : format === "cjs" ? "cjs" : "esm";
  const pkg = require(resolve(__dirname, `../packages/${target}/package.json`));
  const outfile = resolve(__dirname, `../packages/${target}/dist/${pkg.buildOptions.name}.${format}.js`);

  /**
   * Enabling watch mode on the build API tells esbuild to listen for changes on the file system and to rebuild whenever a file changes that could invalidate the build
   * @see: https://esbuild.github.io/api/#target
   */
  await build.build({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile,
    format: outputFormat,
    bundle: true,
    globalName: outputFormat === "iife" ? pkg.buildOptions.name.replace(/-/g, "_") : "",
    sourcemap: false,
    minify: true,
    // 保持外部依赖不打包
    external: [...(pkg.buildOptions.external || [])],

    tsconfig: resolve(__dirname, "../tsconfig.json"),
  });

  console.log("build success: ", {
    target,
    format,
    outfile,
  });
}

["esm", "cjs", "global"].forEach((format) => {
  if (target) {
    bundlePackages(target, format);
  } else {
    /**读取packages下的所有文件夹，并行执行bundlePackages */
    const fg = require("fast-glob");
    const entries = fg.sync("**", { cwd: resolve(__dirname, "../packages"), onlyDirectories: true, deep: 1 });
    entries.forEach((item) => bundlePackages(item, format));
  }
});
