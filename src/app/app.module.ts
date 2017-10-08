import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";

import { AboutPage } from '../pages/about/about';
import { MePage } from "../pages/me/me";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPageModule } from "../pages/login/login.module";
import { DetailPageModule } from "../pages/detail/detail.module";
import { ProfilePageModule } from "../pages/profile/profile.module";
import { QrcodePageModule } from "../pages/qrcode/qrcode.module";

import { SharedProvider } from '../providers/shared/shared';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ThreeDeeTouch, ThreeDeeTouchForceTouch, ThreeDeeTouchQuickAction } from "@ionic-native/three-dee-touch";
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    MePage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LoginPageModule,
    DetailPageModule,
    ProfilePageModule,
    QrcodePageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    MePage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    ThreeDeeTouch,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedProvider
  ]
})
export class AppModule {}
