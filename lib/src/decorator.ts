import { ExpiredUnit, StorageUtil } from './util';

/**
 * localStorage 装饰器
 *
 * @export
 * @param {string} [key] 指定一个新key
 * @param {number} [expiredAt=0] 过期时间值，0表示永久有效。
 * @param {ExpiredUnit} [expiredUnit='t'] 过期时间单位（默认：自定义[单位：毫秒]）
 * @returns
 */
export function LocalStorage(key?: string, expiredAt: number = 0, expiredUnit: ExpiredUnit = 't') {
    return WebStorage(localStorage, key, expiredAt, expiredUnit);
}

/**
 * sessionStorage 装饰器
 *
 * @export
 * @param {string} [key] 指定一个新key
 * @returns
 */
export function SessionStorage(key?: string) {
    return WebStorage(sessionStorage, key);
}

interface ICache {
    [key: string]: boolean;
}

const cache: ICache = {};
const WebStorage = (storage: Storage, key: string, expiredAt: number = 0, expiredUnit: ExpiredUnit = 'd') => {
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
                        StorageUtil.set(storage, <string>key, value, expiredAt, expiredUnit);
                    }
                    cache[<string>key] = true;
                    return;
                }
                StorageUtil.set(storage, <string>key, value, expiredAt, expiredUnit);
            },
            enumerable: true,
            configurable: true
        });
    };
};
