import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SharedProvider } from "../../providers/shared/shared";

import { LoginPage } from "../login/login";
// import { TopicComponent } from "../../components/topic/topic";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private current_tab: string;
  private topics: any[];
  private isAuthenticated:boolean;

  constructor(public navCtrl: NavController, public sharedProvider: SharedProvider) {
  }

  ngOnInit() {
    // this.current_tab = "share";
    // this.onChangeTab();
    if(!this.isAuthenticated){
      this.gotoLogin();
    }
  }

  onChangeTab(page?:number) {
    this.getTopics(this.current_tab,page);
  }

  goToDetail(id:number) {
    this.navCtrl.push(LoginPage);
  }

  gotoLogin() {
    this.navCtrl.push(LoginPage);
  }
  getTopics(tab: string, page?: number) {
    this.sharedProvider.getTopics(tab,page)
      .subscribe(
      data => {
        this.topics = data;
      }
      );
  }
}
