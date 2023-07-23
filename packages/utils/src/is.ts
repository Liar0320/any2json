/**判断参数是否是文件类型的 */
export const isFile = (value: any): value is File => {
  return value instanceof File;
};
