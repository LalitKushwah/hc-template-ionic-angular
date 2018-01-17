import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginModel } from "../../models/login";
import { WidgetUtils } from "../../shared/widget.util";


import { HcService } from "hc-lib/dist/hc.service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loader: Loading;
  companyLogo: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthProvider, private dialog: Dialog) {
    this.companyLogo =  '../../assets/imgs/hc.png';
  }

  getAuthToken(username, password){
    if(localStorage.getItem('baseUrl') == null) {
      this.dialog.showToast('Please Enter Tenant URL before logging in');
    }
    else {
      this.showLoading();
      this.hcService.doLogin(localStorage.getItem('baseUrl'), username, password)
        .subscribe((data: LoginModel) => {
            localStorage.setItem('token', data.token);
            this.hideLoading();
            this.navCtrl.setRoot('HomePage', {data: data});
          },
          (err) => {
            if (this.loader)
              this.hideLoading();
            this.showToast(err.statusText);
            console.log(err);
          }
        );
      // this.auth.doLogin(username, password).subscribe(
      //   (data: LoginModel) => {
      //     localStorage.setItem('token', data.token);
      //     this.hideLoading();
      //     this.navCtrl.setRoot('HomePage', {data: data});
      //   },
      //   (err) => {
      //     if (this.loader)
      //       this.hideLoading();
      //     this.showToast(err.statusText);
      //     console.log(err);
      //   }
      // );
    }
  }

  showPrompt() {
    this.dialog.showPrompt();
  }

}
