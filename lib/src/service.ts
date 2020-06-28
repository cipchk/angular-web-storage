import { Injectable } from '@angular/core';
import { StorageUtil, ExpiredUnit, isBrowser } from './util';

@Injectable()
export class StorageService {
  constructor(private storage: Storage) {}

  get(key: string): any {
    return StorageUtil.get(this.storage, key);
  }

  set(
    key: string,
    value: any,
    expiredAt: number = 0,
    expiredUnit: ExpiredUnit = 'd',
  ): void {
    return StorageUtil.set(this.storage, key, value, expiredAt, expiredUnit);
  }

  /**
   * 删除指定key，如：
   * - `remove('key')` 删除 `key` 键
   * - `remove(/BMap_\w+/)` 批量删除所有 BMap_ 开头的键
   * @param key 键名或正则表达式
   */
  remove(key: string | RegExp): void {
    if (typeof key === 'string') {
      StorageUtil.remove(this.storage, key);
      return;
    }
    let index = 0;
    let next = StorageUtil.key(this.storage, index);
    const ls: string[] = [];
    while (next) {
      if (key.test(next)) {
        ls.push(next);
      }
      next = StorageUtil.key(this.storage, ++index);
    }
    ls.forEach((v) => StorageUtil.remove(this.storage, v));
  }

  clear(): void {
    this.storage.clear();
  }
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService extends StorageService {
  constructor() {
    super(isBrowser ? localStorage : null);
  }
}

@Injectable({ providedIn: 'root' })
export class SessionStorageService extends StorageService {
  constructor() {
    super(isBrowser ? sessionStorage : null);
  }
}
