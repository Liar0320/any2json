/**
 * @module ol/obj
 */

/**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */
export function clear(object: { [key: string]: any }) {
  for (const property in object) {
    delete object[property];
  }
}

/**
 * Determine if an object has any properties.
 * @param {Object} object The object to check.
 * @return {boolean} The object is empty.
 */
export function isEmpty(object: { [key: string]: any }) {
  let property;
  for (property in object) {
    return false;
  }
  return !property;
}

/**
 * 定义一些只读的属性.
 * @param target
 * @param key
 * @param value
 */
export const defineReadonlyProperty = <T extends object, K extends keyof T>(target: T, key: K, value: () => T[K] | T[K]) => {
  Object.defineProperty(target, key, {
    get() {
      return value instanceof Function ? value() : value;
    },
    // value,
    // writable: false,
    // configurable: false,
  });
};

/**
 * @param target
 * @param keyPath
 * @returns
 * @example
 * const obj = {
 *  a: {
 *   b: {
 *   c: 1
 *  }
 * }
 * }
 * getValueFromPath(obj, 'a.b.c') // 1
 */
export function getValueFromPath(target: Record<string, any>, keyPath: string) {
  const path = keyPath.split(".");
  let value = target;
  for (let i = 0; i < path.length; i++) {
    value = value[path[i]];
  }
  return value;
}

/**
 * 迭代对象
 * @param { Record<string, TData> } obj
 * @param { (key: string, value: TData) => void } callback
 * @example
 * const obj = {
 * a: 1,
 * b: 2,
 * c: 3,
 * }
 * iteralObject(obj, (key, value) => {
 * console.log(key, value)
 * })
 * // a 1
 * // b 2
 * // c 3
 */
export function iteralObject<TData>(obj: Record<string, TData>, callback: (key: string, value: TData) => void) {
  Object.entries(obj).forEach(([key, value]) => {
    callback(key, value);
  });
}
