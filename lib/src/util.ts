/**
 * 过期时间单位
 * s：秒
 * m：分
 * h：时
 * d：天
 * w：周
 * y：年
 * t：自定义（毫秒ms）
 */
export type ExpiredUnit = 's' | 'm' | 'h' | 'd' | 'w' | 'y' | 't';

export class StorageUtil {
  static get(storage: Storage, key: string) {
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
  ) {
    storage.setItem(
      key,
      StorageUtil.stringify({
        _expired: StorageUtil.getExpired(expiredAt, expiredUnit),
        _value: value,
      }),
    );
  }

  static remove(storage: Storage, key: string) {
    storage.removeItem(key);
  }

  static key(storage: Storage, index: number) {
    return storage.key(index);
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
