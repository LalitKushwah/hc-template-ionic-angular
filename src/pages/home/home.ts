import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginModel} from "../../models/login";
import {AuthProvider} from '../../providers/auth/auth';
@IonicPage({name: 'HomePage'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  responseData: LoginModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  this.responseData = navParams.get('data');

  }

  logout(){
    this.auth.doLogout();
    this.navCtrl.setRoot('LoginPage');
  }

}
