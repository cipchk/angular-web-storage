/**
 * Expiration time unit
 * s: seconds
 * m: minute
 * h: hour
 * d: day
 * w: week
 * y: year
 * t: Custom (millisecond)
 */
export type ExpiredUnit = 's' | 'm' | 'h' | 'd' | 'w' | 'y' | 't';

/**
 * 判断是否在浏览器中渲染Angular应用
 * `decorator` 无法直接使用Angular `PLATFORM_ID` 标识
 * 这带来的好处是当服务端自行填充 Document 时也能很好的识别
 */
export const isBrowser = typeof document === 'object' && !!document;

export class StorageUtil {
  static get(storage: Storage, key: string): any {
    if (storage == null) {
      return null;
    }
    const value = StorageUtil.parse(storage.getItem(key) || 'null') || null;
    if (value === null) return null;
    if (
      typeof value === 'object' &&
      typeof value._expired !== 'undefined' &&
      value._expired !== 0 &&
      +new Date() > value._expired
    ) {
      StorageUtil.remove(storage, key);
      return null;
    }

    return value._value || null;
  }

  static set(
    storage: Storage,
    key: string,
    value: any,
    expiredAt: number = 0,
    expiredUnit: ExpiredUnit = 't',
  ): void {
    if (storage == null) {
      return ;
    }
    storage.setItem(
      key,
      StorageUtil.stringify({
        _expired: StorageUtil.getExpired(expiredAt, expiredUnit),
        _value: value,
      }),
    );
  }

  static remove(storage: Storage, key: string): void {
    if (storage == null) {
      return ;
    }
    storage.removeItem(key);
  }

  static key(storage: Storage, index: number): string {
    return storage == null ? '' : storage.key(index);
  }

  private static getExpired(val: number, unit: ExpiredUnit): number {
    if (val <= 0) return 0;
    const now = +new Date();
    switch (unit) {
      case 's': // 秒
        return now + 1000 * val;
      case 'm': // 分
        return now + 1000 * 60 * val;
      case 'h': // 时
        return now + 1000 * 60 * 60 * val;
      case 'd': // 天
        return now + 1000 * 60 * 60 * 24 * val;
      case 'w': // 周
        return now + 1000 * 60 * 60 * 24 * 7 * val;
      case 'y': // 年
        return now + 1000 * 60 * 60 * 24 * 365 * val;
      case 't': // 自定义
        return now + val;
    }
    return 0;
  }

  private static stringify(value: any) {
    return JSON.stringify(value);
  }

  private static parse(text: string) {
    try {
      return JSON.parse(text) || null;
    } catch (e) {
      return text;
    }
  }
}
