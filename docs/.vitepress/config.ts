import { defineConfig } from 'vitepress'
import markdownDemo from "../plugins/markdown-demo";
import { genApiDoc } from 'lich-vite-plugin-gen-api-doc';
import path from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ANY2JSON Docs",
  description: "ANY2JSON Developer Example",
  srcDir:"./pages",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Get Started', link: '/getting-started' }
    // ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Get Started', link: '/getting-started' },
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Liar0320/any2json.git' }
    ]
  },
  markdown: {
    config: (md) => md.use(markdownDemo)
    // config: (md) => md.use(demoBlockPlugin, 'myDemosDir')
  },
  vite:{
    publicDir: path.resolve(__dirname, '..', 'public'),
    plugins:[
      genApiDoc({ workspaceRoot: path.resolve(__dirname, '..','..') })
    ]
  }
})
