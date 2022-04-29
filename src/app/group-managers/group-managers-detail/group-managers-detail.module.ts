import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupManagersDetailComponent } from './group-managers-detail.component';
import { NoGroupManagersComponent } from './no-group-managers/no-group-managers.component';
import { HasGroupManagersComponent } from './has-group-managers/has-group-managers.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CreateGroupManagerComponent } from './has-group-managers/create-group-manager/create-group-manager.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NumbersOnlyModule } from 'src/app/shared/directives/number-only/numbers-only.module';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from './has-group-managers/delete-dialog/delete-dialog.component';
import {MatDividerModule} from '@angular/material/divider';
import { EditGroupManagerComponent } from './has-group-managers/edit-group-manager/edit-group-manager.component';
import { OrganizationNameModalComponent } from './has-group-managers/organization-name-modal/organization-name-modal.component';

@NgModule({
  declarations: [
    GroupManagersDetailComponent,
    NoGroupManagersComponent,
    HasGroupManagersComponent,
    CreateGroupManagerComponent,
    DeleteDialogComponent,
    EditGroupManagerComponent,
    OrganizationNameModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NumbersOnlyModule,
    MatDialogModule,
    MatDividerModule
  ]
})
export class GroupManagersDetailModule {}
