# angular-web-storage
Angular decorator to save and restore of HTML5 Local&Session Storage

[![NPM version](https://img.shields.io/npm/v/angular-web-storage.svg)](https://www.npmjs.com/package/angular-web-storage)
[![Build Status](https://travis-ci.org/cipchk/angular-web-storage.svg?branch=master)](https://travis-ci.org/cipchk/angular-web-storage)

## Demo

- [Live Demo](https://cipchk.github.io/angular-web-storage/)
- [Stackblitz](https://stackblitz.com/edit/angular-web-storage)

## Version

- Angular 6 `3.x`
- Angular 7 `4.x`

### 1、Usage

install `angular-web-storage` from `npm`

```
npm install angular-web-storage --save
```

Import the `AngularWebStorageModule` in your module.

```typescript
import { AngularWebStorageModule } from 'angular-web-storage';

@NgModule({
    imports: [ 
        BrowserModule,
        AngularWebStorageModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
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

    constructor(public local: LocalStorageService, public session: SessionStorageService) { }

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
