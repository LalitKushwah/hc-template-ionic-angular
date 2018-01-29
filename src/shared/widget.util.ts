import {AlertController, Loading, LoadingController, ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class WidgetUtils {
  loader: Loading;
  constructor( public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController,public translate:TranslateService) {

  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: this.translate.instant('loadingMsg')
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
    // Internationalisation is table feature of enterprise sdk. Cannot move forward without it.
    // @Lalit: Resolved
    let prompt = this.alertCtrl.create({
      title: this.translate.instant('promptTitle'),
      message: this.translate.instant('promptMessage'),
      inputs: [
        {
          name: this.translate.instant('url'),
          placeholder: this.translate.instant('promptTitle'),
          value : localStorage.getItem('baseUrl')
        },
      ],
      buttons: [
        {
          text: this.translate.instant('cancel'),
          handler: data => {
          }
        },
        {
          text: this.translate.instant('save'),
          handler: data => {
            localStorage.removeItem('baseUrl');
            localStorage.setItem('baseUrl', data.url);
          }
        }
      ]
    });
    prompt.present();

  }
}
