/**将File类型转缓存UTF-8类型
 * @param {File} file
 * @returns {Promise<string>}
 * @example
 * ```ts
 * const file = new File(["foo"], "foo.txt", {
 *  type: "text/plain",
 * });
 * const result = await readAsText(file);
 * console.log(result);
 * ```
 */
export function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file, "utf8");
    fileReader.onloadend = (evt) => {
      const result = fileReader.result || evt.target?.result;
      resolve(result as string);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
}

/**将File类型转缓存ArrayBuffer类型
 * @param {File} file
 * @returns {Promise<ArrayBuffer>}
 * @example
 * ```ts
 * const file = new File(["foo"], "foo.txt", {
 * type: "text/plain",
 * });
 * const result = await readAsArrayBuffer(file);
 * console.log(result);
 * ```
 */
export function readAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onloadend = (evt) => {
      const result = fileReader.result || evt.target?.result;
      resolve(result as ArrayBuffer);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * 获取文件后缀名
 * @param {string} filename
 * @returns {string}
 * @example
 * ```ts
 * const result = getExt("foo.txt");
 * console.log(result);
 * ```
 */
export function getExt(filename: string) {
  const ext = filename.split(".").pop();
  return ext;
}

export function getFileType(fileType: string) {
  switch (fileType) {
    case "json":
      return "application/json";
    case "xml":
      return "application/xml";
    case "ini":
      return "text/plain;charset=utf-8";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    default:
      throw Error("类型错误");
  }
}
