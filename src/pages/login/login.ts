import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  cpf:string;
  senha:string;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _usuarioService:UsuariosServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  efetuaLogin(){

    console.log(this.cpf);
    console.log(this.senha);
    this._usuarioService.efetuaLogin(this.cpf, this.senha).
      subscribe(
        (usuario: Usuario) => {
          console.log(usuario);
          this.navCtrl.setRoot(HomePage);
        },
        () =>{
          this._alertCtrl.create({
            title:'Falha no login',
            subTitle:'CPF ou senha incorretos!',
            buttons:[
              {text:'OK'}
            ]
          }).present();
        }
      );
   
  }
}
