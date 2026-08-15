import { LocalStorage, SessionStorage } from './decorator';

describe('Decorator', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it(`first assign writes, second assign updates（覆盖 cache 分支）`, () => {
    class Demo {
      @LocalStorage() declare a: any;
      @SessionStorage() declare b: any;
    }
    const d = new Demo();
    d.a = 1;
    expect(d.a).toBe(1);
    d.a = 2;
    expect(d.a).toBe(2);
    d.b = 's';
    expect(d.b).toBe('s');
  });

  it(`does not overwrite existing stored value on first assign`, () => {
    localStorage.setItem('b2', JSON.stringify({ _expired: 0, _value: 'seed' }));
    class Demo {
      @LocalStorage() declare b2: any;
    }
    const d = new Demo();
    d.b2 = 'new';
    expect(d.b2).toBe('seed');
  });

  it(`supports custom key`, () => {
    class Demo {
      @LocalStorage('customKey') declare c: any;
    }
    const d = new Demo();
    d.c = 'v';
    expect(localStorage.getItem('customKey')).toContain('v');
  });
});
