# angular-web-storage

Angular decorator to save and restore of HTML5 Local&Session Storage

[![NPM version](https://img.shields.io/npm/v/angular-web-storage.svg)](https://www.npmjs.com/package/angular-web-storage)
![Ci](https://github.com/cipchk/angular-web-storage/workflows/Ci/badge.svg)

## Demo

- [Live Demo](https://cipchk.github.io/angular-web-storage/)
- [Stackblitz](https://stackblitz.com/edit/angular-web-storage)

### 1、Usage

install `angular-web-storage` from `npm`

```bash
npm install angular-web-storage --save
```

Import the `AngularWebStorageModule` in to your root `AppModule`.

```typescript
import { AngularWebStorageModule } from 'angular-web-storage';
@NgModule({
  imports: [ AngularWebStorageModule ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### 2、Examples

1. using `LocalStorage` or `SessionStorage` decorator.

```typescript
import { Component } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html'
})
export class DemoComponent {
  @LocalStorage() localValue: Object = { text: `Hello ${+new Date}`};
  // 设置存储KEY，以及10个小时后过期
  @LocalStorage('newKey', 10, 'h') localValue2: Object = { text: `Hello ${+new Date}`};
  @SessionStorage() sessionValue: string = `Hello ${+new Date}`;
}
```

2. using `LocalStorageService` or `SessionStorageService` service.

```typescript
import { Component } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html'
})
export class DemoComponent {
  constructor(private local: LocalStorageService, private session: SessionStorageService) { }

  KEY = 'value';
  value: any = null;

  set(expired: number = 0) {
    this.local.set(this.KEY, { a: 1, now: +new Date }, expired, 's');
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
}

```

### Expired Time Unit

+ `s` Second.
+ `m` Minute.
+ `h` Hour.
+ `d` Day.
+ `w` Week(equar 7 Day).
+ `y` Year.
+ `t` Custom(unit: millisecond).

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/angular-web-storage/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/angular-web-storage/blob/master/LICENSE) file for the full text)
