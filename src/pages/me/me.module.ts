import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MePage } from './me';

import { BarcodeScanner } from "@ionic-native/barcode-scanner";

@NgModule({
  declarations: [
    MePage,
  ],
  imports: [
    IonicPageModule.forChild(MePage),
  ],
  providers: [BarcodeScanner]
})
export class MePageModule { }
