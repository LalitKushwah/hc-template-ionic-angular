import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Loading, ToastController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginModel} from "../../models/login";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  icon: string = 'settings';
  loader: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  authorizeUser(username, password){
    this.showLoading();
    this.auth.doLogin(username, password).subscribe(
      (data: LoginModel) => {
      localStorage.setItem('token', data.token);
      this.hideLoading();
      this.navCtrl.setRoot('HomePage', {data: data});
    },
      (err) => {
        if(this.loader)
        this.hideLoading();
        this.showToast(err.statusText);
        console.log(err);
      }
    );
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Logging In..."
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
