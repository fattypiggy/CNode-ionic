import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SharedProvider, Global } from "../../providers/shared/shared";
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  private id: string;
  private topic: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedProvider: SharedProvider) {
    this.id = navParams.get("id");
  }
  ngOnInit() {
    this.topic = this.sharedProvider.httpGet(Global.API.getTopic + this.id, null, true)
      .then(data => {
        this.topic = data.data;
      }
      );
    console.log("topic:" + this.topic);
  }
}
