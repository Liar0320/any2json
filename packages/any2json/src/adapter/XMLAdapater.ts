import xml2js from "xml2js";
import { FileType, type FieldData, type Transfer } from "../interface";
import { xmlDataTransfer } from "../plugins/XML2Field";

/**XML转换器 */
export default class XMLAdapater implements Transfer {
  fileType = FileType.XML;

  toJSON(content: any): Promise<FieldData[]> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(content, (err, XML_DATA) => {
        if (err) {
          reject(err);
        }
        resolve(xmlDataTransfer.afterRead(XML_DATA));
      });
    });
  }

  fromJSON(content: Record<any, any>): string | undefined {
    content = xmlDataTransfer.beforeRestore(content);
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(content);

    return xml;
  }
}
