import path from "path";
import fs from "fs-extra";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import MdContainer from "markdown-it-container";
import { getHighlighter } from "shiki";

export default async function markdownDemoPlugin(md: MarkdownIt, demoDir = "examples") {
  const highlighter = await getHighlighter({
    theme: "github-dark",
    langs: ["javascript", "typescript", "vue"],
  });

  const markupInfo = "demo";
  md.use(MdContainer, markupInfo, {
    render(tokens: Token[], idx: number) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        const desc = token.info.trim().slice(markupInfo.length).trim();
        const descTemp = desc ? `<template #desc>${md.render(desc)}</template>` : null;

        const sourceFileToken = tokens[idx + 2];
        const sourceFile = sourceFileToken.children?.[0].content ?? "";

        const root = process.cwd();
        const code = sourceFile ? fs.readFileSync(path.resolve(root, demoDir, `${sourceFile}.vue`), "utf-8") : "";

        if (code) {
          const html = highlighter.codeToHtml(code, {
            lang: "vue",
            theme: "github-dark",
          });
          const codeTemp = `<template #code>${html}</template>`;
          return `<DemoBlockContainer  :demos="demos" path="${sourceFile}"  code="${encodeURIComponent(code)}">${descTemp}${codeTemp}\n`;
        }
        return `<DemoBlockContainer>${descTemp}\n`;
      }
      return "</DemoBlockContainer>\n";
    },
  });
}
