import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner) {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide().then(()=>{
              (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
            }); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          this.qrScanner.show().then(() => {
            (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
          });

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          this.qrScanner.getStatus().then(function (status) {
            if (!status.authorized && status.canOpenSettings) {
              if (confirm("Would you like to enable QR code scanning? You can allow camera access in your settings.")) {
                this.qrScanner.openSettings();
              }
            }
          });
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

}
