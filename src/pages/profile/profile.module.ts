import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

import { PipesModule } from "../../pipes/pipes.module";
@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    PipesModule.forChild(),
  ],
})
export class ProfilePageModule {}
