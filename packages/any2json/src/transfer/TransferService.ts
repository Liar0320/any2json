import { getExt, getFileType, isFile, readAsText } from "@lich/utils";
import { FieldData, FileType, Plugin, Transfer } from "../interface";

export class TransferService {
  public transfer: Transfer;
  constructor(transfer: Transfer) {
    this.transfer = transfer;
  }

  /**转换为json */
  async toJSON(file: File): Promise<FieldData[]> {
    let content;
    if (isFile(file) && getExt(file.name) !== "xlsx") {
      content = await readAsText(file);
    } else {
      content = file;
    }

    let result = this.transfer.toJSON(content);
    const afterReadPlugin = this.getTypePlugins(FileType.XLSX, "afterRead");
    if (afterReadPlugin) {
      afterReadPlugin.forEach((item) => {
        result = item.afterRead(result);
        if (!result) {
          throw new Error("return must not be empty");
        }
      });
    }

    return result;
  }
  /**从json转换 */
  fromJSON(content: Record<any, any>): string | undefined {
    let result = this.transfer.fromJSON(content);
    const afterReadPlugin = this.getTypePlugins(FileType.XLSX, "beforeRestore");
    if (afterReadPlugin) {
      afterReadPlugin.forEach((item) => {
        result = item.afterRead(result);
        if (!result) {
          throw new Error("return must not be empty");
        }
      });
    }

    return result;
  }

  download(content: FieldData[], fileName: string) {
    let blob: Blob;
    if (this.transfer.fileType === "xlsx") {
      const text = this.transfer.fromJSON(content) as unknown as ArrayBuffer;
      blob = new Blob([text], { type: getFileType(this.transfer.fileType) });
    } else {
      const txt = this.fromJSON(content) || "";
      blob = new Blob([txt], { type: getFileType(this.transfer.fileType) });
    }
    console.log("🚀 -> file: index.ts:59 -> TransferService -> download -> fileName:", fileName);

    const a = document.createElement("a");
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
  }

  //   async toExcel() {
  //     return XLSXParser.writeFile(await this.toJSON(), this.file.name.replace(/\.\w+$/, ".xlsx"));
  //   }

  private plugins: Plugin[] = [];

  getTypePlugins(fileType: FileType, stage: Exclude<keyof Plugin, "loader">) {
    return fileType ? this.plugins.filter((item) => item.loader === fileType && item[stage]) : this.plugins;
  }

  registerPlugins(plugins: Plugin[]) {
    this.plugins = plugins;
  }
}
