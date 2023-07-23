# ANY2JSON

## Install

```bash
npm i any2json-v2
```

## Features

- [x] 支持 xml 导入为 JSON 数据,并且支持从 JSON 导出 xml
- [x] 支持 ini 导入为 JSON 数据,并且支持从 JSON 导出 ini
- [x] 支持 json 导入为 JSON 数据,并且支持从 JSON 导出 json
- [x] 支持 xlsx 导入为 JSON 数据,并且支持从 JSON 导出 xlsx
- [ ] 支持更多的字段配置

## 目录结构

```
├── README.md               # 本文件
├── commitlint.config.js     # commitlint 配置
├── package.json            # 根目录 package.json
├── packages                # 项目代码
│   ├── any2json            # convert xml ini json to json
│   └── utils               # 工具
├── playground              # playground
│   ├── package.json
│   ├── public
│   ├── src
│   ├── tailwind.config.cjs
│   └── tsconfig.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── scripts                 # 脚本
│   ├── dev.cjs             # 开发脚本
│   └── package.json
└── shell
    └── clean.sh            # 清理脚本
```

## 参考

- [xml-js](https://github.com/Leonidas-from-XIV/node-xml2js)
- [xlsx](https://github.com/SheetJS/sheetjs)
