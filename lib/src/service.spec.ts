import { TestBed, inject, fakeAsync, tick, async } from '@angular/core/testing';
import { AngularWebStorageModule } from '../index';
import { LocalStorageService, SessionStorageService } from './service';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [AngularWebStorageModule],
  });
});

describe('service', () => {
  describe('localStorage', () => {
    let service: LocalStorageService;
    const KEY = 'test_key';

    beforeEach(() => {
      let store = {};
      spyOn(localStorage, 'getItem').and.callFake((key: string) => {
        return store[key];
      });
      spyOn(localStorage, 'setItem').and.callFake((key: string, value: any) => {
        return (store[key] = value);
      });
      spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
        delete store[key];
      });
      spyOn(localStorage, 'clear').and.callFake(() => {
        store = {};
      });
    });

    beforeEach(
      inject([LocalStorageService], (_s: LocalStorageService) => {
        service = _s;
      }),
    );

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

  describe('sessionStorage', () => {
    let service: SessionStorageService;
    const KEY = 'test_key';

    beforeEach(() => {
      let store = {};
      spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
        return store[key];
      });
      spyOn(sessionStorage, 'setItem').and.callFake(
        (key: string, value: any) => {
          return (store[key] = value);
        },
      );
      spyOn(sessionStorage, 'removeItem').and.callFake((key: string) => {
        delete store[key];
      });
      spyOn(sessionStorage, 'clear').and.callFake(() => {
        store = {};
      });
    });

    beforeEach(
      inject([SessionStorageService], (_s: SessionStorageService) => {
        service = _s;
      }),
    );

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
});
