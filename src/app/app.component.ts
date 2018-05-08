import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>angular-web-storage</h1>
  <p class="mb-3">Angular decorator to save and restore of HTML5 Local&Session Storage，有关更多细节见<a href="https://github.com/cipchk/angular-web-storage/blob/master/README.md" target="_blank">README.md</a></p>
  <demo></demo>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
