import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserProfileRoutingModule } from './user-profile.routes';
import { UserProfileComponent } from './user-profile.component';
import { ProfileImageService } from './user-profile-details/components/profile-image/profile-image.service';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ],
  providers: [ProfileImageService],
  bootstrap: [],
})
export class UserProfileModule {}
