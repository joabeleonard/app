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

    
  fotoUsuarios: string;
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

  ionViewDidLoad() {
    this.fotoUsuarios = this._usuariosService.urlService()+this.usuarioLogado.cpf+".jpg";
    this.fotoFichaAdesao= this._usuariosService.urlService()+this.usuarioLogado.cpf+"fotoFichaAdesao.jpg"; 
    this.fotoDocumentoFrente= this._usuariosService.urlService()+this.usuarioLogado.cpf+"fotoDocumentoFrente.jpg"; 
    this.fotoDocumentoVerso= this._usuariosService.urlService()+this.usuarioLogado.cpf+"fotoDocumentoVerso.jpg";
  }
  

  tiraFoto() {

    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    })
    .then(fotoUri => {
      this.fotoUsuarios = normalizeURL(fotoUri);

        this.imageResizer.resize({
          uri: fotoUri,
          quality: 100,
          width: 1280,
          height: 1280
        }).then(uri => {

          let loading = this._loadingCtrl.create({
            content: 'Aguarde...'
          });
          loading.present();
      
          let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: this.usuarioLogado.cpf+".jpg",
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
          }
          const fileTransfer: FileTransferObject = this.transfer.create();
          fileTransfer.upload( this.fotoUsuarios, this._usuariosService._url+'/usuarios/uploadImage', options)
            .then(() => {
              loading.dismiss();
                this._alertCtrl.create({
                  title:'Foto',
                  subTitle:'Foto Enviada!',
                  buttons:[
                    {text:'OK'}
                  ]
                }).present();
      
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
        })
      
    })
    .catch(err => console.log(err));
  }



  tiraFotoFicha() {
    let loading = this._loadingCtrl.create({
      content: 'Aguarde...'
    });

    loading.present();
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    })
    .then(fotoUri => {
      this.fotoFichaAdesao = normalizeURL(fotoUri);

        this.imageResizer.resize({
          uri: fotoUri,
          quality: 100,
          width: 1280,
          height: 1280
        }).then(uri => {

          let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: this.usuarioLogado.cpf+"fotoFichaAdesao.jpg",
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
          }
          const fileTransfer: FileTransferObject = this.transfer.create();
          fileTransfer.upload( this.fotoFichaAdesao, this._usuariosService._url+'/usuarios/uploadImage', options)
            .then(() => {

                loading.dismiss();
                this._alertCtrl.create({
                  title:'Foto',
                  subTitle:'Foto Enviada!',
                  buttons:[
                    {text:'OK'}
                  ]
                }).present();
      
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
        })
      
    })
    .catch(err => console.log(err));
  }


  tirarFotoFrenteDocumento() {

    let loading = this._loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    })
    .then(fotoUri => {
      this.fotoDocumentoFrente = normalizeURL(fotoUri);

        this.imageResizer.resize({
          uri: fotoUri,
          quality: 100,
          width: 1280,
          height: 1280
        }).then(uri => {

          let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: this.usuarioLogado.cpf+"fotoDocumentoFrente.jpg",
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
          }
          const fileTransfer: FileTransferObject = this.transfer.create();
          fileTransfer.upload( this.fotoDocumentoFrente, this._usuariosService._url+'/usuarios/uploadImage', options)
            .then(() => {
              loading.dismiss();
                this._alertCtrl.create({
                  title:'Foto',
                  subTitle:'Foto Enviada!',
                  buttons:[
                    {text:'OK'}
                  ]
                }).present();
      
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
        })
      
    })
    .catch(err => console.log(err));
  }


  tirarFotoVersoDocumento() {
    let loading = this._loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();

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
                loading.dismiss();
                this._alertCtrl.create({
                  title:'Foto',
                  subTitle:'Foto Enviada!',
                  buttons:[
                    {text:'OK'}
                  ]
                }).present();
      
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

    

      const fileTransfer: FileTransferObject = this.transfer.create();
      const mime = 'application/pdf';
      const pdfFile = this._usuariosService._url+'/Estatuto_assof.pdf';
      fileTransfer.download(pdfFile, this.file.externalRootDirectory + 'Download/' + 'REQUERIMENTO_DE_ADESAO_SEPLAG.docx', true)
          .then((entry) => {
            loading.dismiss();
            this._alertCtrl.create({
              title:'Ficha Adesão',
              subTitle:'Arquivo baixado para sua pasta de Download',
              buttons:[
                {text:'OK'}
              ]
            }).present();
          }, (error) => {
            this._alertCtrl.create({
              title:'Erro',
              subTitle:'Erro ao Baixa Arquivo',
              buttons:[
                {text:'OK'}
              ]
            }).present();
          });
  
  }
}
