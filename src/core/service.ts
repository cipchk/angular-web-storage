import { Injectable } from '@angular/core';
import { StorageUtil, ExpiredUnit } from './util';

export class StorageService {
    constructor(private storage: Storage) { }
    
    get(key: string) {
        return StorageUtil.get(this.storage, key);
    }

    set(key: string, value: any, expiredAt: number = 0, expiredUnit: ExpiredUnit = 'd') {
        return StorageUtil.set(this.storage, key, value, expiredAt, expiredUnit);
    }

    remove(key: string) {
        StorageUtil.remove(this.storage, key);
    }

    clear() {
        this.storage.clear();
    }
}

@Injectable()
export class LocalStorageService extends StorageService {
    constructor() {
        super(localStorage);
    }
}

@Injectable()
export class SessionStorageService extends StorageService {
    constructor() {
        super(sessionStorage);
    }
}
