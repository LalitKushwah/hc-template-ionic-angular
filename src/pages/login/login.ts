import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController, Loading, ToastController,
  AlertController
} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  authorizeUser(username, password){
    if(localStorage.getItem('baseUrl') == null) {
      this.showToast('Please Enter Tenant URL before logging in');
    }
    else {
      this.showLoading();
      this.auth.doLogin(username, password).subscribe(
        (data: LoginModel) => {
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
    }
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

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Tenant URL',
      message: "Enter the name of instance. Do not enter complete URL, just enter the name of instance",
      inputs: [
        {
          name: 'url',
          placeholder: 'Tenant URL',
          value : localStorage.getItem('baseUrl')
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            localStorage.removeItem('baseUrl');
            localStorage.setItem('baseUrl', data.url);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();

  }
}
