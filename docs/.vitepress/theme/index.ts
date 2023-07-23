import DefaultTheme from "vitepress/theme";
import DemoBlockContainer from "./components/block";
import examples from "../../examples/install";
/**添加tailwind */
import "../../examples/styles/style.scss"
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.use(examples)
    app.provide("examples", examples.components);
    app.component("DemoBlockContainer", DemoBlockContainer); // 全局注册DemoBlockContainer
  },
};
