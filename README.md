# ANY2JSON

## Install

```bash
npm i any2json-v2
```

## Features

- [x] Support xml import to json , and support export xml from json
- [x] Support ini import to json , and support export ini from json
- [x] Support json import to json , and support export json from json
- [x] Support xlsx import to json , and support export xlsx from json
- [ ] Support more field config

## Directory Structure

```
├── README.md               # This file
├── commitlint.config.js     # commitlint config
├── package.json            # root package.json
├── packages                # project code
│   ├── any2json            # convert xml ini json to json
│   └── utils               # utils
├── playground              # playground
│   ├── package.json
│   ├── public
│   ├── src
│   ├── tailwind.config.cjs
│   └── tsconfig.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── scripts                 # scripts
│   ├── dev.cjs             # dev script
│   └── package.json
└── shell
    └── clean.sh            # clean script
```

## Reference

- [xml-js](https://github.com/Leonidas-from-XIV/node-xml2js)
- [xlsx](https://github.com/SheetJS/sheetjs)
