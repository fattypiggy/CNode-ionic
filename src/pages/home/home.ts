import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SharedProvider, Global } from "../../providers/shared/shared";
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Topic } from '../../model/topic';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, AfterViewInit {
  private currentTab: string;
  private currentPage: number;
  private topics: Array<Topic>;
  // private isAuthenticated: boolean;

  constructor(public navCtrl: NavController, public sharedProvider: SharedProvider) {
  }

  ngOnInit() {
    this.currentTab = "all";
  }

  ngAfterViewInit() {
    this.onChangeTab(1);
  }
  onChangeTab(page?: number) {
    this.currentPage = 1;
    this.getTopics(this.currentTab, this.currentPage, true);
  }

  gotoDetail(id: string) {
    console.log("go to detail:" + id);
    this.navCtrl.push('DetailPage', {
      "id": id
    });
  }

  gotoProfile(loginname: string) {
    console.log("go to profile:" + loginname);
    this.navCtrl.push('ProfilePage', {
      "loginname": loginname
    })
  }

  doRefresh(refresher) {
    this.currentPage = 1;
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getTopics(this.currentTab, this.currentPage, false);
      refresher.complete();
    }, 500);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.getTopics(this.currentTab, ++this.currentPage, false);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  gotoLogin() {
    this.navCtrl.push('LoginPage');
  }
  getTopics(tab: string, page?: number, loader = true) {
    this.sharedProvider.httpGet(Global.API.getTopics, { "tab": tab, "page": page, "limit": Global.LIMIT }, loader)
      .then((data) => {
        this.extractData(data);
      });
  }
  extractData(data) {
    if (this.currentPage > 1) {
      this.topics = this.topics.concat(data.data);
    } else {
      this.topics = data.data;
    }
  }
}
