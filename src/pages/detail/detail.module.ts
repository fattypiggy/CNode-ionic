import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';

import { PipesModule } from "../../pipes/pipes.module";
@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),
    PipesModule.forChild(),
  ],
})
export class DetailPageModule {}
