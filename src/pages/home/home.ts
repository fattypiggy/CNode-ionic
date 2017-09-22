import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SharedProvider } from "../../providers/shared/shared";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private topics: any[];
  constructor(public navCtrl: NavController, public sharedProvider: SharedProvider) {
  }

  ngOnInit() {
    console.log("init");
    this.sharedProvider.getTopics()
      .subscribe(
        data => {
          if(data.success == true){
            this.topics = data.data;
          }
        }
          // this.topics1 = data
      );

    // console.log(this.topics1);
  }
}
