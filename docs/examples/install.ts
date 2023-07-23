import { startCase } from "lodash-es";

const modules = import.meta.globEager("./**/*.vue");

export default {
  install: (app) => {
    // eslint-disable-next-line guard-for-in
    for (const path in modules) {
      const index = path.indexOf(".vue");
      const newPath = path.substring(0, index);
      const name = startCase(newPath).split(" ").join("");
      console.log("🚀 -> file: install.ts:13 -> name:", name);
      // modules[path]().then((mod) => {
      app.component(name, modules[path].default); // demos下的组件全局注册
      // });
    }
  },
  components: modules,
};
