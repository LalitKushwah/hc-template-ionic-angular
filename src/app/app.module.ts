import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen   } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import {HomePageModule} from "../pages/home/home.module";
import {WidgetUtils} from "../shared/widget.util";
import {HcService} from "../shared/HcService";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PostInterceptor} from "../interceptor/post.interceptor";
import {AuthService} from "../shared/AuthService";


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    HomePageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HcService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: PostInterceptor, multi: true},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WidgetUtils
  ]
})
export class AppModule {

  public static map;
  constructor() {
    AppModule.map = new Map();
  }
  public redirectToLogin(screen) {
  }
}
