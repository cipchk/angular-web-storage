import { StorageUtil } from './util';

describe('StorageUtil', () => {
  const KEY = 'test_key';

  beforeEach(() => {
    localStorage.clear();
  });

  it(`should handle null storage（SSR 降级路径）`, () => {
    expect(StorageUtil.get(null, KEY)).toBeNull();
    expect(StorageUtil.key(null, 0)).toBeNull();
    expect(() => StorageUtil.set(null, KEY, 1)).not.toThrow();
    expect(() => StorageUtil.remove(null, KEY)).not.toThrow();
  });

  it(`should support all expired units`, () => {
    const base = +new Date();
    const cases: Array<[string, 's' | 'm' | 'h' | 'd' | 'w' | 'y', number]> = [
      ['s', 's', 1000],
      ['m', 'm', 1000 * 60],
      ['h', 'h', 1000 * 60 * 60],
      ['d', 'd', 1000 * 60 * 60 * 24],
      ['w', 'w', 1000 * 60 * 60 * 24 * 7],
      ['y', 'y', 1000 * 60 * 60 * 24 * 365]
    ];
    for (const [k, unit, offset] of cases) {
      StorageUtil.set(localStorage, k, 1, 1, unit);
      const expired = JSON.parse(localStorage.getItem(k)!)._expired;
      expect(expired).toBeGreaterThanOrEqual(base + offset);
    }
  });

  it(`should fallback to 0 when unit is invalid`, () => {
    StorageUtil.set(localStorage, KEY, 1, 1, 'x' as any);
    // _expired = 0，表示永不过期，仍可读回
    expect(StorageUtil.get(localStorage, KEY)).toBe(1);
  });

  it(`should return null when stored text is not valid JSON`, () => {
    localStorage.setItem(KEY, 'not-json');
    expect(StorageUtil.get(localStorage, KEY)).toBeNull();
  });

  it(`should return null when _value is falsy`, () => {
    StorageUtil.set(localStorage, KEY, 0);
    expect(StorageUtil.get(localStorage, KEY)).toBeNull();
  });

  it(`should remove expired data on get`, () => {
    localStorage.setItem(KEY, JSON.stringify({ _expired: +new Date() - 1000, _value: 1 }));
    expect(StorageUtil.get(localStorage, KEY)).toBeNull();
    expect(localStorage.getItem(KEY)).toBeNull();
  });
});
