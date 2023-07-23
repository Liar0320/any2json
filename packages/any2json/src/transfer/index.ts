import { getExt, getFileType } from "@lich/utils";
import { TransferService } from "./TransferService";
import { FieldData, FileType } from "../interface";
import { INIAdapater, JSONAdapater, XLSXAdapater, XMLAdapater } from "../adapter";

export { TransferService };

export function createAny2JSON(file: File): TransferService {
  const fileExt = getExt(file.name) as FileType;
  switch (fileExt) {
    case "xlsx":
      return new TransferService(new XLSXAdapater());
    case "ini":
      return new TransferService(new INIAdapater());
    case "xml":
      return new TransferService(new XMLAdapater());
    case "json":
      return new TransferService(new JSONAdapater());

    default:
      throw Error("类型错误");
  }
}

export function downloadFile(fileName: string, content: FieldData[]) {
  let blob: Blob;
  const service = createAny2JSON(new File([], fileName));

  if (service.transfer.fileType === "xlsx") {
    const text = service.transfer.fromJSON(content) as unknown as ArrayBuffer;
    blob = new Blob([text], { type: getFileType(service.transfer.fileType) });
  } else {
    const txt = service.fromJSON(content) || "";
    blob = new Blob([txt], { type: getFileType(service.transfer.fileType) });
  }

  const a = document.createElement("a");
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.click();
  URL.revokeObjectURL(a.href);
}
