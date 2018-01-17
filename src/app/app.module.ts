import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import {HomePageModule} from "../pages/home/home.module";
import { AuthProvider } from '../providers/auth/auth';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PostInterceptor } from "../interceptor/post.interceptor";
import {WidgetUtils} from "../shared/widget.util";
import {HcModule} from "hc-lib/dist/hc.module";
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    HomePageModule,
    HttpClientModule,
    HcModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PostInterceptor,
      multi: true
    },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    WidgetUtils
  ]
})
export class AppModule {}
