import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the ModalAcompanhamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-acompanhamento',
  templateUrl: 'modal-acompanhamento.html',
})
export class ModalAcompanhamentoPage {

  acompanhamentos = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.acompanhamentos = this.params.get('acompanhamentos');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
