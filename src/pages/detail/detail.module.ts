import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';

import { PipesModule } from "../../pipes/pipes.module";

import { KeyboardAttachDirective } from "../../directive/keyboard-attach.directive";
@NgModule({
  declarations: [
    DetailPage,
    KeyboardAttachDirective,
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),
    PipesModule.forChild(),
  ],
})
export class DetailPageModule {}
