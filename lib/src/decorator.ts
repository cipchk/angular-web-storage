import { ExpiredUnit, StorageUtil } from './util';

interface ICache {
  [key: string]: boolean;
}
const cache: ICache = {};

function WebStorage(
  storage: Storage,
  key: string,
  expiredAt: number = 0,
  expiredUnit: ExpiredUnit = 'd',
) {
  return (target: Object, propertyName: string): void => {
    key = key || propertyName;
    Object.defineProperty(target, propertyName, {
      get: () => {
        return StorageUtil.get(storage, <string>key);
      },
      set: (value: any) => {
        if (!cache[<string>key]) {
          const storedValue = StorageUtil.get(storage, <string>key);
          if (storedValue === null) {
            StorageUtil.set(
              storage,
              <string>key,
              value,
              expiredAt,
              expiredUnit,
            );
          }
          cache[<string>key] = true;
          return;
        }
        StorageUtil.set(storage, <string>key, value, expiredAt, expiredUnit);
      },
      enumerable: true,
      configurable: true,
    });
  };
}

/**
 * localStorage 装饰器
 *
 * @param [key] 指定一个新key
 * @param [expiredAt=0] 过期时间值，0表示永久有效。
 * @param [expiredUnit='t'] 过期时间单位（默认：自定义[单位：毫秒]）
 */
export function LocalStorage(
  key?: string,
  expiredAt: number = 0,
  expiredUnit: ExpiredUnit = 't',
) {
  return WebStorage(localStorage, key, expiredAt, expiredUnit);
}

/**
 * sessionStorage 装饰器
 *
 * @param [key] 指定一个新key
 * @param [expiredAt=0] 过期时间值，0表示在 `sessionStorage` 有效时期范围内永久有效。
 * @param [expiredUnit='t'] 过期时间单位（默认：自定义[单位：毫秒]）
 */
export function SessionStorage(
  key?: string,
  expiredAt: number = 0,
  expiredUnit: ExpiredUnit = 't',
) {
  return WebStorage(sessionStorage, key, expiredAt, expiredUnit);
}
