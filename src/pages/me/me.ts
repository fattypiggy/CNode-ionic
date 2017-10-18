import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SharedProvider, Global } from "../../providers/shared/shared";

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

  private loginUser: string;
  private accesstoken: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, public sharedProvider: SharedProvider) {
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.accesstoken = barcodeData.text;
      console.log(barcodeData);
      this.verify(this.accesstoken);
      // Success! Barcode data is here
    }, (err) => {
      console.log(err);
      // An error occurred
    });
  }
  verify(accesstoken: string) {
    this.sharedProvider.httpPost(Global.API.verifyToken, { "accesstoken": accesstoken }, true)
      .then(data => {
        this.loginUser = data.loginname;
        if(this.loginUser){
          localStorage.setItem('accesstoken',this.accesstoken);
        }
      })
  }
}
