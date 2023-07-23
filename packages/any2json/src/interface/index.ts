/**支持的文件类型 */
export enum FileType {
  XLSX = "xlsx",
  JSON = "json",
  XML = "xml",
  INI = "ini",
}

export interface Plugin {
  loader: `${FileType}`;
  beforeRead?: any;
  afterRead?: any;
  beforeRestore?: any;
  beforeWrite?: any;
  finished?: any;
}

// 定义any2json的转换器
export interface Transfer {
  /**文件类型 */
  fileType: `${FileType}`;
  /**转换插件 */
  plugins?: any[];
  /**转换为json */
  toJSON(content: any | File): Promise<FieldData[]>;
  /**从json转换 */
  fromJSON(content: Record<any, any>): string | undefined;
}

export interface FieldData {
  /**字段名 */
  name: string;
  /**字段值 */
  value: string;
  /**字段属性 */
  arrtibutes?: Record<string, any>;
  /**xml 中模块 */
  module?: string;
  /**xml 中的标签名 */
  tag?: string;
}
