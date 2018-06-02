import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CadastrarAcompanhamentoJuridicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar-acompanhamento-juridico',
  templateUrl: 'cadastrar-acompanhamento-juridico.html',
})
export class CadastrarAcompanhamentoJuridicoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarAcompanhamentoJuridicoPage');
  }

}
