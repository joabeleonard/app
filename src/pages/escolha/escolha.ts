import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Noticia } from '../../models/noticia';
import { NoticiasServiceProvider } from '../../providers/noticias-service/noticias-service';

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public noticia: Noticia;
 

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _noticiasService: NoticiasServiceProvider) {

      this.noticia = this.navParams.get('noticiaSelecionada');
     
  }

  get caminhoImagem(){
    return this._noticiasService.caminhoImagem();
  }

}
