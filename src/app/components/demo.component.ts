import { Component } from '@angular/core';
import {
  LocalStorageService,
  SessionStorageService,
  LocalStorage,
  SessionStorage,
} from 'angular-web-storage';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  @LocalStorage() localValue: Object = { text: `Hello ${+new Date()}` };
  // 设置存储KEY，以及10个小时后过期
  @LocalStorage('newKey', 10, 'h')
  localValue2: Object = { text: `Hello ${+new Date()}` };
  @SessionStorage() sessionValue = `Hello ${+new Date()}`;

  constructor(
    public local: LocalStorageService,
    public session: SessionStorageService,
  ) {}

  KEY = 'value';
  value: any = null;

  set(expired: number = 0) {
    this.local.set(this.KEY, { a: 1, now: +new Date() }, expired, 's');
  }

  remove() {
    this.local.remove(this.KEY);
  }

  get() {
    this.value = this.local.get(this.KEY);
  }

  clear() {
    this.local.clear();
  }

  batchSet() {
    this.local.set(`batch_1`, 'a');
    this.local.set(`batch_2`, 'b');
    this.local.set(`batch_c`, 'c');
  }

  batchRemove() {
    this.local.remove(/batch_\w+/);
  }
}
