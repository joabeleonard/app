import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular/util/util';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


/**
 * Generated class for the PerfilUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-usuario',
  templateUrl: 'perfil-usuario.html',
})
export class PerfilUsuarioPage {

  
  //fileTransfer: FileTransferObject = this.transfer.create();
  
  image: string;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _camera: Camera,
    private _alertCtrl: AlertController,
    //private transfer: FileTransfer,
    // private file: File
    ) {
  }

  pictureFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.capturePhoto(options);
  }

  
  async capturePhoto(options: CameraOptions) {
    try {
      //Result is a base64 image but can be changed to use a filepath.
      const result = await this._camera.getPicture(options)

      //Append result to image to display in view
      this.image = `data:image/jpeg;base64,${result}`;
    }
    catch (e) {
      console.error(e);
    }
  }

  tiraFoto() {
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    })
    .then(fotoUri => {
      fotoUri = normalizeURL(fotoUri);
      this._usuariosService.salvaAvatar(fotoUri);
    })
    .catch(err => console.log(err));
  }

  get avatar() {
    return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }

  downloadRequerimento(){

  }
}
