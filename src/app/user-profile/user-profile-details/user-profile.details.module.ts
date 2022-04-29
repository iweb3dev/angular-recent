import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserProfileDetailsComponent } from './user-profile-details.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { PhoneNumbersComponent } from './components/phone-numbers/phone-numbers.component';
import { EmailAddressesComponent } from './components/email-addresses/email-addresses.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressFrameComponent } from './components/addresses/address-frame/address-frame.component';
import { EmailFrameComponent } from './components/email-addresses/email-frame/email-frame.component';
import { PhoneFrameComponent } from './components/phone-numbers/phone-frame/phone-frame.component';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProfileImageService } from './components/profile-image/profile-image.service';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    UserProfileDetailsComponent,
    ProfileDetailsComponent,
    ProfileImageComponent,
    PhoneNumbersComponent,
    EmailAddressesComponent,
    AddressesComponent,
    AddressFrameComponent,
    EmailFrameComponent,
    PhoneFrameComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    PipesModule,
  ],
  exports: [ProfileImageComponent],
  providers: [ProfileImageService],
  bootstrap: [],
})
export class UserProfileDetailsModule {}
