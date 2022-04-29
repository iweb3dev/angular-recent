import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupManagersComponent } from './group-managers.component';
import { GroupManagersRoutingModule } from './group-managers.routes';


@NgModule({
  declarations: [GroupManagersComponent],
  imports: [
    CommonModule,
    GroupManagersRoutingModule
  ]
})
export class GroupManagersModule {}
