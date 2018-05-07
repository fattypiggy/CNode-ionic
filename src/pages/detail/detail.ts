import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { SharedProvider, Global } from "../../providers/shared/shared";
import { Subscription } from 'rxjs/Subscription';

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
  private onShowSubscription: Subscription;
  private onHideSubscription: Subscription;
  private id: string;
  private topic: any;
  private accessToken: string;
  private showInput: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedProvider: SharedProvider, private keyboard: Keyboard) {
    this.id = navParams.get("id");
  }
  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    this.topic = this.sharedProvider.httpGet(Global.API.getTopic + this.id, this.accessToken ? { 'accessToken': this.accessToken } : null, true)
      .then(data => {
        this.topic = data.data;
      });
    this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe(e => this.onShow(e));
    this.onHideSubscription = this.keyboard.onKeyboardHide().subscribe(() => this.onHide());
    console.log("topic:" + this.topic);
  }

  doReply(e) {
    console.log(e);
  }
  like(reply) {
    console.log("like++");
    this.sharedProvider.httpPost(Global.API.upReply.replace(':reply_id', reply.id), this.accessToken ? { 'accessToken': this.accessToken } : null, false)
      .then(data => {
        if (data.success) {
          if (data.action == "down") {
            reply.is_uped = false;
            reply.ups.pop();
          } else {
            reply.is_uped = true;
            reply.ups.push('');
          }
        } else {

        }
      });
  }

  writeReply() {
    this.keyboard.disableScroll(true);
    this.keyboard.show();
  }

  cancelReply() {
    this.keyboard.close();
  }

  onShow(e) {
    this.showInput = true;
  }
  onHide() {
    this.showInput = false;
  }
  ngOnDestroy() {
    if (this.onShowSubscription) this.onShowSubscription.unsubscribe();
    if (this.onHideSubscription) this.onHideSubscription.unsubscribe();
  }
}
