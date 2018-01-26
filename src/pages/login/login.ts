import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { LoginModel } from "../../models/login.model";
import { WidgetUtils } from "../../shared/widget.util";

import { HttpResponse} from "@angular/common/http";
import {HcService} from "../../shared/HcService";
import {AuthService} from "../../shared/AuthService";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loader: Loading;
  companyLogo: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private dialog: WidgetUtils, public hcService: HcService,public authService: AuthService) {
    this.companyLogo =  '../../assets/imgs/hc.png';
  }

  getAuthToken(username, password){
    if(localStorage.getItem('baseUrl') == null) {
      this.dialog.showToast('Please Enter Tenant URL before logging in');
    }
    else {
      this.dialog.showLoading();
      this.hcService.doLogin(localStorage.getItem('baseUrl'), username, password)
        .subscribe((data: HttpResponse<LoginModel>) => {
            localStorage.setItem('token', data.body.token);

          if(this.authService.cachedRequest != null) {
            //Fire cached request
            let cachedRequest = this.authService.cachedRequest;
            this.hcService.fireCachedRequest(cachedRequest).subscribe(
              (data:HttpResponse<any>)=> {
                this.authService.cachedRequest = null;
                this.navCtrl.push(this.authService.targetScreen,{data:data});
          });
            this.dialog.hideLoading();
            this.navCtrl.setRoot('HomePage', {data: data.body});
          }
          else {
            console.log('No Cached request to fire ');
            this.navCtrl.setRoot('HomePage', {data: data.body});
            this.dialog.hideLoading();
          }
        }
          ,
          (err) => {
            if (this.loader)
              this.dialog.hideLoading();
            this.dialog.showToast(err.statusText);
            console.log(err);
          }
        );
    }
  }

  showPrompt() {
    this.dialog.showPrompt();
  }

}
