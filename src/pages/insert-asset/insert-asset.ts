import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Alert } from '../../model/alert';
import { Wallet } from '../../model/wallet';
import { Cryptocurrency } from '../../model/cryptocurrency';
import { AssetForm } from '../../forms/assetform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { WalletsPage } from '../wallets/wallets';

@Component({
  selector: 'page-insert-asset',
  templateUrl: 'insert-asset.html',
})
export class InsertAssetPage {

  public wallet: Wallet;
  public cryptocurrency: Cryptocurrency;
  public allFavorites: Array<Cryptocurrency> = [];
  public assetForm: AssetForm;
  public assetFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider) {
    this.wallet = this.navParams.get("wallet");
    this.assetForm = new AssetForm();
    this.assetFormGroup = formBuilder.group({
      amount: ['', Validators.compose([Validators.required])],
      purchasePrice: ['', Validators.compose([Validators.required])],
      cryptocurrency: ['', Validators.compose([Validators.required])]
    });
  }

  public ionViewDidEnter(): void {
    this.registeredUserProvider.allFavorites(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allFavorites = data.data;
    });
  }

  public onSubmit(value: any): void {
    if (this.assetFormGroup.valid) {
      this.registeredUserProvider.insertAsset(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.wallet, this.cryptocurrency, this.assetForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(WalletsPage);
      });
    }
  }
}