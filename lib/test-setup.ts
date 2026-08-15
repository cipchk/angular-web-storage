/**
 * 测试全局 setup（由 @angular/build:unit-test 的 setupFiles 加载）。
 *
 * 当前测试运行在 Node 环境下。Node 的实验性 WebStorage 里 sessionStorage 可用，
 * 但 localStorage 需要 `--localstorage-file` 才提供，未提供时访问会得到 undefined，
 * 导致测试中 vi.spyOn(localStorage, ...) 报错。这里为两者提供内存版实现。
 */
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

for (const name of ['localStorage', 'sessionStorage'] as const) {
  try {
    // 直接 defineProperty，避免触发 Node 实验性 getter（从而避免 ExperimentalWarning）
    Object.defineProperty(globalThis, name, {
      value: new MemoryStorage(),
      configurable: true,
      writable: true
    });
  } catch {
    // 若属性不可配置，退化为直接赋值
    globalThis[name] = new MemoryStorage();
  }
}
