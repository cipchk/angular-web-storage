import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'demo',
  templateUrl: './demo.html',
  imports: [FormsModule, CommonModule],
})
export class DemoComponent {
  readonly local = inject(LocalStorageService);
  readonly session = inject(SessionStorageService);
  @LocalStorage() localValue = { text: `Hello ${+new Date()}` };
  // 设置存储KEY，以及10个小时后过期
  @LocalStorage('newKey', 10, 'h')
  localValue2 = { text: `Hello ${+new Date()}` };
  @SessionStorage() sessionValue = `Hello ${+new Date()}`;

  KEY = 'value';
  value: any = null;

  set(expired = 0): void {
    this.local.set(this.KEY, { a: 1, now: +new Date() }, expired, 's');
  }

  remove(): void {
    this.local.remove(this.KEY);
  }

  get(): void {
    this.value = this.local.get(this.KEY);
  }

  clear(): void {
    this.local.clear();
  }

  batchSet(): void {
    this.local.set(`batch_1`, 'a');
    this.local.set(`batch_2`, 'b');
    this.local.set(`batch_c`, 'c');
  }

  batchRemove(): void {
    this.local.remove(/batch_\w+/);
  }
}
