import { ExpiredUnit, StorageUtil, isBrowser } from './util';

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
 * `localStorage` Decorator
 *
 * @param [expiredAt=0] Expiration time, 0 means forever
 * @param [expiredUnit='t'] Expiration time unit (default: custom [unit: ms])
 */
export function LocalStorage(
  key?: string,
  expiredAt: number = 0,
  expiredUnit: ExpiredUnit = 't',
) {
  return WebStorage(isBrowser ? localStorage : null, key, expiredAt, expiredUnit);
}

/**
 * `sessionStorage` Decorator
 *
 * @param [expiredAt=0] Expiration time, 0 means forever
 * @param [expiredUnit='t'] Expiration time unit (default: custom [unit: ms])
 */
export function SessionStorage(
  key?: string,
  expiredAt: number = 0,
  expiredUnit: ExpiredUnit = 't',
) {
  return WebStorage(isBrowser ? sessionStorage : null, key, expiredAt, expiredUnit);
}
