import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private translate:TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.localizeApplication();
    });
  }
  //This function is used to localization/internationalization
  localizeApplication() {
    if(this.translate.getBrowserLang() !== undefined) {
      this.translate.setDefaultLang(this.translate.getBrowserLang());
    }
    else {
      this.translate.use('en');
    }
 }
}

