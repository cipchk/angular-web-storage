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
): (target: {}, propertyName: string) => void {
  return (target: {}, propertyName: string): void => {
    key = key || propertyName;
    Object.defineProperty(target, propertyName, {
      get: () => {
        return StorageUtil.get(storage, key as string);
      },
      set: (value: any) => {
        if (!cache[key as string]) {
          const storedValue = StorageUtil.get(storage, key as string);
          if (storedValue === null) {
            StorageUtil.set(
              storage,
              key as string,
              value,
              expiredAt,
              expiredUnit,
            );
          }
          cache[key as string] = true;
          return;
        }
        StorageUtil.set(storage, key as string, value, expiredAt, expiredUnit);
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
): (target: {}, propertyName: string) => void {
  return WebStorage(
    isBrowser ? localStorage : null,
    key,
    expiredAt,
    expiredUnit,
  );
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
): (target: {}, propertyName: string) => void {
  return WebStorage(
    isBrowser ? sessionStorage : null,
    key,
    expiredAt,
    expiredUnit,
  );
}
