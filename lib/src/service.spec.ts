import { TestBed } from '@angular/core/testing';
import { LocalStorageService, SessionStorageService } from './service';
import { LocalStorage, SessionStorage } from './decorator';
import { Injectable } from '@angular/core';

beforeEach(() => {
  TestBed.configureTestingModule({ providers: [SessionStorageTest] });
});

function InitSpy(storage: Storage, store: { [key: string]: any }) {
  spyOn(storage, 'getItem').and.callFake((key: string) => {
    return store[key];
  });
  spyOn(storage, 'setItem').and.callFake((key: string, value: any) => {
    return (store[key] = value);
  });
  spyOn(storage, 'removeItem').and.callFake((key: string) => {
    delete store[key];
  });
  spyOn(storage, 'key').and.callFake((index: number) => {
    return Object.keys(store)[index];
  });
  spyOn(storage, 'clear').and.callFake(() => {
    store = {};
  });
}

describe('service', () => {
  describe('localStorage', () => {
    let service: LocalStorageService;
    const KEY = 'test_key';
    let store: { [key: string]: any } = {};

    beforeEach(() => {
      InitSpy(localStorage, store);
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
  });
  describe('sessionStorage', () => {
    let service: SessionStorageService;
    const KEY = 'test_key';
    let store: { [key: string]: any } = {};

    beforeEach(() => {
      InitSpy(sessionStorage, store);

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

@Injectable()
class SessionStorageTest {
  @LocalStorage() localValue: any = { text: `Hello ${+new Date()}` };
  @LocalStorage() nullValue: null | 1 = null;
  @SessionStorage() sessionValue: string = `Hello ${+new Date()}`;
}
