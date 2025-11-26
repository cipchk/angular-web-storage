import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'demo',
  template: `
    <div class="card mb-3">
      <div class="card-header">LocalStorage Demo</div>
      <div class="card-body">
        <p>localValue: {{ localValue | json }}</p>
        <p>value: {{ value | json }}</p>
        <div class="mb-3">
          <button type="button" (click)="get()" class="btn btn-primary btn-sm">
            get
          </button>
          <button type="button" (click)="set()" class="btn btn-primary btn-sm">
            set
          </button>
          <button type="button" (click)="set(5)" class="btn btn-primary btn-sm">
            set in 5 second expired!
          </button>
          <button type="button" (click)="remove()" class="btn btn-primary btn-sm">
            remove
          </button>
          <button type="button" (click)="clear()" class="btn btn-primary btn-sm">
            clear
          </button>
        </div>
        <div class="mb-3">
          <button type="button" (click)="batchSet()" class="btn btn-primary btn-sm">
            batch set
          </button>
          <button type="button" (click)="batchRemove()" class="btn btn-primary btn-sm">
            batch remove
          </button>
        </div>
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-header">SessionStorage Demo</div>
      <div class="card-body">
        <p>value: {{ sessionValue | json }}</p>
      </div>
    </div>
  `,
  imports: [FormsModule, CommonModule],
})
export class Demo {
  private readonly local = inject(LocalStorageService);
  @LocalStorage() protected readonly localValue = { text: `Hello ${+new Date()}` };
  // 设置存储KEY，以及10个小时后过期
  @LocalStorage('newKey', 10, 'h')
  protected readonly localValue2 = { text: `Hello ${+new Date()}` };
  @SessionStorage() protected readonly sessionValue = `Hello ${+new Date()}`;

  private KEY = 'value';
  protected value: any = null;

  protected set(expired = 0): void {
    this.local.set(this.KEY, { a: 1, now: +new Date() }, expired, 's');
  }

  protected remove(): void {
    this.local.remove(this.KEY);
  }

  protected get(): void {
    this.value = this.local.get(this.KEY);
  }

  protected clear(): void {
    this.local.clear();
  }

  protected batchSet(): void {
    this.local.set(`batch_1`, 'a');
    this.local.set(`batch_2`, 'b');
    this.local.set(`batch_c`, 'c');
  }

  protected batchRemove(): void {
    this.local.remove(/batch_\w+/);
  }
}
