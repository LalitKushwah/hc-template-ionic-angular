import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginModel} from "../../models/login";
import { HcService } from "hc-lib/dist/hc.service";
@IonicPage({name: 'HomePage'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  responseData: LoginModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public hcService: HcService) {
  this.responseData = navParams.get('data');

  }

  logout(){
    this.hcService.doLogout();
    this.navCtrl.setRoot('LoginPage');
  }

}
