import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AcompanhamentoJuridicoServiceProvider } from '../../providers/acompanhamento-juridico-service/acompanhamento-juridico-service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { AcompanhamentoJuridico } from '../../models/acompanhamentoJuridico';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ModalAcompanhamentoPage } from '../modal-acompanhamento/modal-acompanhamento';

/**
 * Generated class for the AcompanhamentoJuridicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acompanhamento-juridico',
  templateUrl: 'acompanhamento-juridico.html',
})
export class AcompanhamentoJuridicoPage {

  public processos:string[];
  public acompanhamentosSelecionados:AcompanhamentoJuridico[];
  public acompanhamentos:AcompanhamentoJuridico[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _loadingCtrl: LoadingController,private _alertCtrl: AlertController,
    private _acompanhamentoJuridicoService:AcompanhamentoJuridicoServiceProvider,
    private _usuarioService: UsuariosServiceProvider,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando processos...'
    });

    loading.present();

    this._acompanhamentoJuridicoService.lista(this.usuarioLogado.cpf)
              .subscribe(
                (AcompanhamentoJuridico) => {
                  loading.dismiss();
                  this.processos = [];
                  this.acompanhamentos = AcompanhamentoJuridico;
                  AcompanhamentoJuridico.forEach(element => {
                      this.processos.push(element.numeroProcesso);
                  });
                  this.processos = Array.from(new Set(this.processos));

                  
                },
                (err: HttpErrorResponse) => {
                  console.log(err);

                  loading.dismiss();

                  this._alertCtrl.create({
                    title: 'Falha na conexão',
                    subTitle: 'Não foi possível carregar. Tente novamente mais tarde!',
                    buttons: [
                      { text: 'Ok' }
                    ]
                  }).present();
                }
              );

              
  }

  get usuarioLogado(){
    console.log(this._usuarioService.obtemUsuarioLogado());
     return this._usuarioService.obtemUsuarioLogado(); 
  }

  selecionarProcesso(numeroProcesso: string) {

    this.acompanhamentosSelecionados = [];
    this.acompanhamentos.forEach(element => {
      if(this.acompanhamentosSelecionados.indexOf(element) && element.numeroProcesso ==numeroProcesso){
        this.acompanhamentosSelecionados.push(element);
      }
    });
    let modal = this.modalCtrl.create(ModalAcompanhamentoPage, {acompanhamentos:this.acompanhamentosSelecionados} );
    modal.present();
    
  }
}
