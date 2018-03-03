import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  strValue: string;

  constructor(public navCtrl: NavController, private keychainTouchId: KeychainTouchId, public toastCtrl: ToastController) {
    this.strValue = "Example";
  }

  storeKey(){

    this.keychainTouchId.isAvailable().then((res: any) => {
      this.keychainTouchId.delete("strValue").then(() => {
        this.keychainTouchId.save("strValue", this.strValue).then((strValue) => {
          this.showToast("String Value Saved: " + this.strValue + ".");
        }).catch((error: any) => {
          this.showToast("Cannot save string.");
        });;
      }).catch((error: any) => {
        this.keychainTouchId.save("strValue", this.strValue).then((strValue) => {
          this.showToast("String Value Saved: " + this.strValue + ".");
        }).catch((error: any) => {
          this.showToast("Cannot save string.");
        });;
      });
    }).catch((error: any) => {
      this.showToast("Touch ID Unavailable.");
    });

  }

  getKey(){

    this.keychainTouchId.isAvailable().then((res: any) => {
      this.keychainTouchId.verify("strValue", "Authenticate").then((strValue) => {
        this.showToast("String value = " + strValue + '.');
      }).catch((error: any) => {
        this.showToast("Cannot get key.");
      });
    }).catch((error: any) => {
      this.showToast("Touch ID Unavailable.");
    });

  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });

    toast.present();
  }

}
