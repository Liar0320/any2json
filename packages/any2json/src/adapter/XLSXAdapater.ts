/*
 * @Author: lich
 * @Date: 2023-02-14 12:11:00
 * @Last Modified by: lich
 * @Last Modified time: 2023-07-22 20:51:02
 * @Link: https://www.npmjs.com/package/xlsx
 */
import { readAsArrayBuffer } from "@lich/utils";
import { FieldData, FileType, Transfer } from "../interface";
import * as XLSX from "xlsx";
export default class XLSXParser implements Transfer {
  fileType = FileType.XLSX;

  async toJSON(content: any): Promise<FieldData[]> {
    content = await readAsArrayBuffer(content);
    const XLSX_DATA = XLSX.read(content);
    return this.transfer(XLSX_DATA);
  }
  /**node env */
  toJsonFromPath(filePath: string) {
    const XLSX_DATA = XLSX.readFile(filePath);
    return this.transfer(XLSX_DATA);
  }

  transfer(XLSX_DATA: XLSX.WorkBook) {
    const result = Object.entries(XLSX_DATA.Sheets).reduce((prev, [key, data]) => {
      prev = XLSX.utils.sheet_to_json(data).map((item: any, index) => {
        // item.name = item;
        // item.module = key;
        // item.arrtibutes = item;
        const result = Object.entries(item);
        return {
          name: result[0][1],
          value: result[1][1],
          module: key,
          arrtibutes: item,
        };
      });
      return prev;
    }, [] as FieldData[]);

    return result;
  }

  fromJSON(content: FieldData[]) {
    content = content.map((item) => {
      return item.arrtibutes
        ? item.arrtibutes
        : {
            name: item.name,
            value: item.value,
          };
    }) as FieldData[];
    /* generate worksheet and workbook */
    const worksheet = XLSX.utils.json_to_sheet(content);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  }

  static writeFile(content: any, fileName: string) {
    /* generate worksheet and workbook */
    const worksheet = XLSX.utils.json_to_sheet(content);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFileXLSX(workbook, fileName);
  }

  //   toXLSX(content: string, fileType: FileType): Record<any, any> | undefined {
  //     if (fileType === FileType.XLSX) {
  //       return XLSX.parse(content)
  //     }
  //   }
}
