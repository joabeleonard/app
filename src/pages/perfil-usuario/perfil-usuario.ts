import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular/util/util';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { DocumentViewerOptions, DocumentViewer } from '@ionic-native/document-viewer';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Platform } from 'ionic-angular/platform/platform';

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

    
  image: string;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _camera: Camera,
    private _alertCtrl: AlertController,
    private transfer: FileTransfer,
    private file: File,
    private document: DocumentViewer,
    private platform: Platform,
    private _loadingCtrl: LoadingController) {
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

    let loading = this._loadingCtrl.create({
      content: 'Baixando Documento...'
    });

    loading.present();

    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }

    let path = null;
 
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }
 
    const transfer = this.transfer.create();
    transfer.download(this._usuariosService._url+'/Estatuto_assof.pdf', path + 'Estatuto_assof.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
      loading.dismiss();
    });
  
    
    


     // const fileTransfer: FileTransferObject = this.transfer.create();
      //const mime = 'application/pdf';
      //const pdfFile = 'http://assofce.kinghost.net:21321/Estatuto_assof.pdf';
      // alert(this.file.dataDirectory);
      //fileTransfer.download(pdfFile, this.file.externalDataDirectory + 'file.pdf', true)
        //  .then((entry) => {
          //    alert('download complete: ' + entry.toURL());
          //}, (error) => {
              // handle error
          //});
  
  }
}
