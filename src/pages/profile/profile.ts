import { Component, SimpleChanges } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedProvider, Global } from "../../providers/shared/shared";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private loginname: string;
  private userInfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedProvider: SharedProvider) {
    this.loginname = navParams.get("loginname");
  }
  ngOnInit() {
    if (this.loginname) {
      this.getInfo(this.loginname);
    }
  }

  getInfo(loginname: string) {
    this.sharedProvider.httpGet(Global.API.userInfo + this.loginname, {}, true)
      .then((data) => {
        this.extractData(data);
      });
  }
  extractData(data) {
    if (data.success) {
      this.userInfo = data.data;
    }
  }
}
