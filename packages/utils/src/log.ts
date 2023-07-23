/*
 * @Author: lich
 * @Date: 2023-06-19 01:07:46
 * @Last Modified by: lich
 * @Last Modified time: 2023-06-19 01:39:41
 * @Path: packages\core\src\events\MapBrowserEvent.ts
 * @Description:
 * 系统日志，模块名称 🎨 NearHub
 */

interface Logger {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

const banner = [`%c 🎨 NearHub `, "color: black;background:#FFFF22;border-radius:50px;padding:2.5px 0px; margin-right:5px"];

/* The code above does the following:
1. 实现这个logger，每次输出的时候带上 🎨 NearHub 2. 要求输出的时候，如果是字符串，换行符 \n 会被替换成 ↵
3. 要求输出的时候，如果是对象，会被 JSON.stringify 处理
4. 要求输出的时候，如果是数组，会被 JSON.stringify 处理
5. 要求输出的时候，如果是函数，会被调用，并且输出函数返回值
6. 要求输出的时候，如果是数字，布尔值，null，undefined，会直接输出
7. 要求输出的时候，如果是Symbol，会输出 Symbol 的描述
8. 要求输出的时候，如果是Map，会被转换成对象输出
9. 要求输出的时候，如果是Set，会被转换成对象输出
10. 要求输出的时候，如果是Date，会被转换成字符串输出
11. 要求输出的时候，如果是Error，会被转换成对象输出，其中的 stack 字段会被转换成字符串输出
12. 要求输出的时候，如果是其他类型的对象，会被转换成对象输出 */
function loggerImp(type: "log" | "warn" | "error") {
  return function (...args: any[]) {
    const arr = args.map((item) => {
      if (typeof item === "string") {
        return item.replace("\n", "\\n");
      }
      if (typeof item === "object" && item !== null) {
        if (item instanceof Date) {
          return item.toString();
        }
        if (item instanceof Error) {
          return JSON.stringify({ ...item, stack: item.stack!.toString() });
        }
        if (item instanceof Set || item instanceof Map) {
          return Object.fromEntries(item);
        }
        return item;
      }
      if (typeof item === "function") {
        return item;
      }
      if (typeof item === "symbol") {
        return item.description;
      }
      return item;
    });
    //   console[type]("🎨 NearHub", ...arr);
    console[type].apply(console, [...banner, ...arr]);
  };
}

export const logger: Logger = {
  log: loggerImp("log"),
  warn: loggerImp("warn"),
  error: loggerImp("error"),
};
