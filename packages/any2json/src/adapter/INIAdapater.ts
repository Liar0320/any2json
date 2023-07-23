import { FieldData, FileType, Transfer } from "../interface";

export default class INIParser implements Transfer {
  fileType = FileType.INI;

  fromJSON(content: FieldData[]): string | undefined {
    const result = content.reduce((prev: string[], { name: key, value }) => {
      prev.push(`${key}="${value}"`);
      return prev;
    }, []);

    return result.join("\n");
  }

  async toJSON(content: string): Promise<FieldData[]> {
    const data = content.split("\n").reduce((prev, item: string) => {
      const [a, b] = item.split("=");
      if (!a) return prev;
      prev.push({
        name: a,
        value: (b || "").replace(/("|\r)/g, ""),
      });

      return prev;
    }, [] as FieldData[]);

    return data;
  }
}
