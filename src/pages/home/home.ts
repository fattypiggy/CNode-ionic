import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SharedProvider } from "../../providers/shared/shared";
import { TabData } from "../../providers/interface/data";

import { LoginPage } from "../login/login";
import { ProfilePage } from "../profile/profile";
import { DetailPage } from "../detail/detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tabData: TabData[];
  private current_tab: string;
  private topics: Array<any>;
  // private isAuthenticated: boolean;

  constructor(public navCtrl: NavController, public sharedProvider: SharedProvider) {
  }

  ngOnInit() {
    this.current_tab = "all";
    this.tabData = [];
    this.onChangeTab(1);
  }

  onChangeTab(page?: number) {
    if (this.tabData.find(myObj => myObj.tabName == this.current_tab)) {

    } else {
      this.tabData.push(new TabData(this.current_tab, 1, []));
    }
    this.getTopics(this.current_tab, 1);
  }

  gotoDetail(id: string) {
    console.log("go to detail:" + id);
    this.navCtrl.push(DetailPage, {
      "id": id
    });
  }

  gotoProfile(loginname: string) {
    console.log("go to profile:" + loginname);
    this.navCtrl.push(ProfilePage, {
      "loginname": loginname
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getTopics(this.current_tab, 1);
      refresher.complete();
    }, 1500);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      let tmp = this.tabData.find(myObj => myObj.tabName == this.current_tab);
      this.getTopics(this.current_tab, ++tmp.page);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1500);
  }
  gotoLogin() {
    this.navCtrl.push(LoginPage);
  }
  getTopics(tab: string, page?: number) {
    this.sharedProvider.getTopics(tab, page)
      .subscribe(
      data => {
        let tmp: TabData;
        if (tmp = this.tabData.find(obj => obj.tabName == this.current_tab && obj.topics.length > 0)) {
          tmp.topics = tmp.topics.concat(data);
        } else {
          this.tabData.find(myObj => myObj.tabName == this.current_tab).topics = data;
        }
        this.topics = this.tabData.find(myObj => myObj.tabName == this.current_tab).topics;
      }
      );
  }
}
