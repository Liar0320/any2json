import path from "path";
import type { Plugin } from "vite";

export default function MarkdownTransform(): Plugin {
  return {
    name: "componnets-md-transform",

    enforce: "pre",

    async transform(code, id) {
      if (!id.endsWith(".md")) return;
      const componentId = path.basename(id, ".md");

      const append = {
        headers: [],
        footers: [],
        scriptSetups: [`const demos = import.meta.globEager('./examples/${componentId}/*.vue')`],
      };

      // @FIXME: 为了解决一个makrdown出现 两个 <script setup> 的问题
      if (code.includes("<script setup>")) {
        return code;
      }

      return code + combineScriptSetup(append.scriptSetups);
    },
  };
}

const combineScriptSetup = (codes: string[]) =>
  `\n<script setup>
${codes.join("\n")}
</script>
`;
