import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  private accesstoken: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner) {
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.accesstoken = barcodeData.text;
      console.log(barcodeData);
      // Success! Barcode data is here
    }, (err) => {
      console.log(err);
      // An error occurred
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }

}
