import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LocalStorage, SessionStorage } from './decorator';
import { LocalStorageService, SessionStorageService, StorageService } from './service';

beforeEach(() => {
  TestBed.configureTestingModule({ providers: [SessionStorageTest] });
});

describe('service', () => {
  describe('localStorage', () => {
    let service: LocalStorageService;
    const KEY = 'test_key';

    beforeEach(() => {
      localStorage.clear();
      service = TestBed.inject(LocalStorageService);
    });

    it(`should set result to 1 by called [set]`, () => {
      const value = 1;
      service.set(KEY, value);
      expect(service.get(KEY)).toBe(value);
    });

    it(`should set result to 1 by called [get]`, () => {
      const value = 1;
      service.set(KEY, value);
      expect(service.get(KEY)).toBe(value);
    });

    describe('#remove', () => {
      it(`when use key`, () => {
        const value = 1;
        service.set(KEY, value);
        service.remove(KEY);
        expect(service.get(KEY)).toBeNull();
      });
      it(`when use regex`, () => {
        service.set('key_1', 1);
        service.set('key_2', 2);
        expect(service.get('key_1')).toBe(1);
        expect(service.get('key_2')).toBe(2);
        service.remove(/key_\d+/);
        expect(service.get('key_1')).toBeNull();
        expect(service.get('key_2')).toBeNull();
      });
    });

    it(`should be expired data`, (done: any) => {
      const value = 1;
      service.set(KEY, value, 10, 't');
      expect(service.get(KEY)).toBe(value);
      setTimeout(() => {
        expect(service.get(KEY)).toBeNull();
        done();
      }, 100);
    });

    it(`should be called [clear]`, () => {
      service.set(KEY, 1);
      service.clear();
      expect(service.get(KEY)).toBeNull();
    });
  });
  describe('sessionStorage', () => {
    let service: SessionStorageService;
    const KEY = 'test_key';

    beforeEach(() => {
      sessionStorage.clear();
      service = TestBed.inject(SessionStorageService);
    });

    it(`should set result to 1 by called [set]`, () => {
      const value = 1;
      service.set(KEY, value);
      expect(service.get(KEY)).toBe(value);
    });

    it(`should set result to 1 by called [get]`, () => {
      const value = 1;
      service.set(KEY, value);
      expect(service.get(KEY)).toBe(value);
    });

    it(`should be called [remove]`, () => {
      const value = 1;
      service.set(KEY, value);
      service.remove(KEY);
      expect(service.get(KEY)).toBeNull();
    });

    it(`should be expired data`, (done: any) => {
      const value = 1;
      service.set(KEY, value, 10, 't');
      expect(service.get(KEY)).toBe(value);
      setTimeout(() => {
        expect(service.get(KEY)).toBeNull();
        done();
      }, 100);
    });

    it(`should be called [clear]`, () => {
      service.set(KEY, 1);
      service.clear();
      expect(service.get(KEY)).toBeNull();
    });
  });
  describe('Decorator', () => {
    let srv: SessionStorageTest;

    it('should be working', () => {
      srv = TestBed.inject(SessionStorageTest);
      srv.nullValue = null;
      srv.localValue = { ...srv.localValue, a: 1 };
      expect(srv.localValue.a).toBe(1);
    });
  });
});

describe('StorageService（null storage 降级路径）', () => {
  let service: StorageService;

  beforeEach(() => {
    service = new StorageService(null);
  });

  it('get/set/remove/clear 对 null storage 不抛错', () => {
    expect(service.get('k')).toBeNull();
    expect(() => service.set('k', 1)).not.toThrow();
    expect(() => service.remove('k')).not.toThrow();
    expect(() => service.remove(/k/)).not.toThrow();
    expect(() => service.clear()).not.toThrow();
  });
});

@Injectable()
class SessionStorageTest {
  // `declare` 避免 useDefineForClassFields 在实例上生成自有属性，
  // 使 prototype 上的装饰器 accessor 真正生效
  @LocalStorage() declare localValue: any;
  @LocalStorage() declare nullValue: null | 1;
  @SessionStorage() declare sessionValue: any;
}
