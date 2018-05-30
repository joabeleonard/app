import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Camera } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular/util/util';
import { HomePage } from '../home/home';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { LoginPage } from '../login/login';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';

/**
 * Generated class for the CadastroUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {


  cpf:string;
  senha:string;
  email:string;
  nome:string;
  fotoUri: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _usuarioService:UsuariosServiceProvider,
    private _loadingCtrl: LoadingController,
    private _usuariosService: UsuariosServiceProvider,
    private _camera: Camera,
    private transfer: FileTransfer,
    private imageResizer: ImageResizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  cadastrarUsuario(){

    let loading = this._loadingCtrl.create({
      content: 'Aguarde...'
    });

    loading.present();
    this._usuarioService.cadastrarUsuario(this.cpf, this.senha, this.nome, this.email).
      subscribe(
        () => {
          

          let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: this.cpf+".jpg",
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
          }
          const fileTransfer: FileTransferObject = this.transfer.create();
          fileTransfer.upload( this.fotoUri, this._usuariosService._url+'/usuarios/uploadImage', options)
            .then(() => {
                this._alertCtrl.create({
                  title:'Cadastro',
                  subTitle:'Cadastro realizado!',
                  buttons:[
                    {text:'OK'}
                  ]
                }).present();
      
                this.navCtrl.setRoot(LoginPage);
                loading.dismiss();
          }, (err) => {
            loading.dismiss();

            this._alertCtrl.create({
              title:'Erro',
              subTitle:err ,
              buttons:[
                {text:'OK'}
              ]
            }).present();
            console.log(err);
          });

                 },
        (err) =>{
          loading.dismiss();
          this._alertCtrl.create({
            title:'Falha',
            subTitle:'Erro ao fazer o cadastro!',
            buttons:[
              {text:'OK'}
            ]
          }).present();
        }
      );

    
  }

  tiraFoto() {
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      mediaType: this._camera.MediaType.PICTURE,
      encodingType: this._camera.EncodingType.JPEG,
      allowEdit: true
    }).then(fotoUri => {

      this.imageResizer.resize({
        uri: fotoUri,
        quality: 60,
        width: 1280,
        height: 1280
      }).then(uri => {
        this.fotoUri = normalizeURL(uri);
        this._usuariosService.salvaAvatar(uri);
      })
     
    })
    .catch(err => console.log(err));
  }

  get avatar() {
    return this._usuariosService.obtemAvatar();
  }

}
