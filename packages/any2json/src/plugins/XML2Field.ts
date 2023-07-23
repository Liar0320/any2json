import { iteralObject } from "@lich/utils";
import { FieldData, Plugin } from "../interface";

/**XML的结构 */
export interface Target {
  [key: string]: {
    [key: string]: Array<{
      _: string;
      $: {
        name: string;
      };
    }>;
  };
}

function afterRead(content: Target) {
  const result = Object.entries(content).reduce((prev, [key, value]) => {
    iteralObject(value, (tag, source) => {
      source.forEach((item) => {
        prev.push({
          name: item.$.name,
          value: item._,
          module: key,
          tag,
        });
      });
    });

    return prev;
  }, [] as FieldData[]);

  return result;
}

function resotre(content: FieldData[]): Target {
  const groups = content.reduce((prev, item) => {
    const module = item.module || "resource";
    if (!item.module) {
      console.warn("解析错误 缺少module参数");
    }

    if (!prev[module]) {
      prev[module] = [];
    }
    prev[module].push(item);
    return prev;
  }, {} as Record<string, FieldData[]>);

  const result = Object.entries(groups).reduce((prev, [key, value]) => {
    prev[key] = {
      string: [],
    };
    value.forEach((item) => {
      const tag = item.tag || "string";
      if (item.tag === undefined) {
        console.warn("解析错误 缺少tag参数");
      }
      if (prev[key][tag] === undefined) {
        prev[key][tag] = [];
      }

      prev[key][tag].push({
        $: {
          name: item.name,
        },
        _: item.value,
      });
    });
    return prev;
  }, {} as any);

  return result;
}

export const xmlDataTransfer: Plugin = {
  loader: "xml",
  afterRead: (data: any) => {
    return afterRead(data);
  },
  beforeRestore: (data: any) => {
    return resotre(data);
  },
};
