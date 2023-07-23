import json5 from "json5";
import { FieldData, FileType, Transfer } from "../interface";

export default class JSONParser implements Transfer {
  fileType = FileType.JSON;

  fromJSON(content: FieldData[]): string | undefined {
    const result = content.reduce((prev, item) => {
      prev[item.name] = item.value;
      return prev;
    }, {} as Record<string, any>);

    return JSON.stringify(result);
  }
  async toJSON(content: string): Promise<FieldData[]> {
    const result: Record<string, any> = json5.parse(content);

    return Object.values(result).map(([key, value]) => {
      return {
        name: key,
        value: value,
      };
    });
  }
}
