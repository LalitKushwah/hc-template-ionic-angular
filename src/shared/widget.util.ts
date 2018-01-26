import {AlertController, Loading, LoadingController, ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class WidgetUtils {
  loader: Loading;
  constructor( public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

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
