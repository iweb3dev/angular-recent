import { Component } from '@angular/core';

@Component({
  selector: 'app-current-year',
  template: `<span> {{ currentYear }} </span>`,
  styles: [``]
})
export class CurrentYearComponent {
  readonly currentYear = new Date().getFullYear();
}
