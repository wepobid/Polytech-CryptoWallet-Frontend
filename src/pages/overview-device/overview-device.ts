import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Device } from '../../entities/device';

import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllDevicesPage } from '../all-devices/all-devices';

@Component({
  selector: 'page-overview-device',
  templateUrl: 'overview-device.html',
})
export class OverviewDevicePage {

  public device: Device;

  constructor(private navCtrl: NavController, private navParams: NavParams, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllDevicesPage });
      return;
    }
  }

  public ionViewDidEnter(): void {
    this.device = this.navParams.get("device");
  }
}