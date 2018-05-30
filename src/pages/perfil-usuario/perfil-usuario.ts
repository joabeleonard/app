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
import { ImageResizer } from '@ionic-native/image-resizer';

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
  fotoFichaAdesao: string; 
  fotoDocumentoFrente: string; 
  fotoDocumentoVerso: string;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _camera: Camera,
    private _alertCtrl: AlertController,
    private transfer: FileTransfer,
    private file: File,
    private document: DocumentViewer,
    private platform: Platform,
    private _loadingCtrl: LoadingController,
    private imageResizer: ImageResizer) {
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

  tiraFotoFicha() {
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    })
    .then(fotoUri => {
      this.fotoFichaAdesao = normalizeURL(fotoUri);
    })
    .catch(err => console.log(err));
  }
  tirarFotoFrenteDocumento() {
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    })
    .then(fotoUri => {
      this.fotoDocumentoFrente = normalizeURL(fotoUri);
    })
    .catch(err => console.log(err));
  }
  tirarFotoVersoDocumento() {

    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    })
    .then(fotoUri => {
      this.fotoDocumentoVerso = normalizeURL(fotoUri);

        this.imageResizer.resize({
          uri: fotoUri,
          quality: 100,
          width: 1280,
          height: 1280
        }).then(uri => {

          let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: this.usuarioLogado.cpf+"fotoDocumentoVerso.jpg",
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
          }
          const fileTransfer: FileTransferObject = this.transfer.create();
          fileTransfer.upload( this.fotoDocumentoVerso, this._usuariosService._url+'/usuarios/uploadImage', options)
            .then(() => {
                this._alertCtrl.create({
                  title:'Cadastro',
                  subTitle:'Cadastro realizado!',
                  buttons:[
                    {text:'OK'}
                  ]
                }).present();
      
          }, (err) => {
            this._alertCtrl.create({
              title:'Erro',
              subTitle:err ,
              buttons:[
                {text:'OK'}
              ]
            }).present();
            console.log(err);
          });
        })
      
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
