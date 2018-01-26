import { Component } from '@angular/core';
import {IonicPage, List, NavController, NavParams} from 'ionic-angular';
import {LoginModel} from "../../models/login.model";
import {HcService} from "../../shared/HcService";
import {HttpResponse} from "@angular/common/http";
import {LoginPage} from "../login/login";



@IonicPage({name: 'HomePage'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  responseData: LoginModel;
  products: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public hcService: HcService) {
  this.responseData = navParams.get('data');
  }

  logout(){
    this.hcService.doLogout();
    this.navCtrl.push(LoginPage);
  }

}
