import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner) {
  }

  // scan() {
  //   this.barcodeScanner.scan().then((barcodeData) => {
  //     // Success! Barcode data is here
  //   }, (err) => {
  //     // An error occurred
  //   });
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
      // Success! Barcode data is here
    }, (err) => {
      console.log(err);
      // An error occurred
    });
  }

}
