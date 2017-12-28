import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ThreeDeeTouch, ThreeDeeTouchForceTouch, ThreeDeeTouchQuickAction } from "@ionic-native/three-dee-touch";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'TabsPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, threeDeeTouch: ThreeDeeTouch) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('cordova') && platform.is('ios')) {

        threeDeeTouch.watchForceTouches()
          .subscribe(
          (data: ThreeDeeTouchForceTouch) => {
          }
          );


        let actions: Array<ThreeDeeTouchQuickAction> = [
          {
            type: 'checkin',
            title: '写话题',
            subtitle: '快速入口',
            iconType: 'Compose'
          },
          {
            type: 'share',
            title: '分享"Node中文社区"',
            iconType: 'Share'
          }
        ];

        threeDeeTouch.configureQuickActions(actions);

        threeDeeTouch.onHomeIconPressed().subscribe(
          (payload) => {
            // returns an object that is the button you presed
            console.log('Pressed the ${payload.title} button');
            switch (payload.title) {
              case '写话题': console.log('写话题'); break;
              case '分享"Node中文社区"': console.log('分享"Node中文社区"'); break;
            }
            console.log(payload.type);

          }
        )
      }
    });
  }
}
