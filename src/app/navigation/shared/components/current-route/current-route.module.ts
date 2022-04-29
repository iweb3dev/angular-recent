import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRouteComponent } from './current-route.component';

@NgModule({
  declarations: [CurrentRouteComponent],
  imports: [CommonModule],
  exports: [CurrentRouteComponent],
})
export class CurrentRouteModule {}
