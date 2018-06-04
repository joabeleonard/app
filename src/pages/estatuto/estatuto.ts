import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ApiServiceProvider } from '../../providers/api-service';
import { FileOpener } from '@ionic-native/file-opener';
import { Platform } from 'ionic-angular/platform/platform';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


/**
 * Generated class for the EstatutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estatuto',
  templateUrl: 'estatuto.html',
  providers: [PdfViewerComponent]
})
export class EstatutoPage {

  public pdfSrc;
  _url: string;
  public zoom: number = 1.0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public pdfViewerComponent: PdfViewerComponent,
    private _loadingCtrl: LoadingController,
    private _api: ApiServiceProvider,
     private fileOpener: FileOpener,
    private platform: Platform,
    private document: DocumentViewer,
    private transfer: FileTransfer,
    private file:File,
    private http: HttpClient,
    private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

    this._url = this._api.url;

    let loading = this._loadingCtrl.create({
      content: 'Carregando Estatuto...'
    });

    loading.present();
    //this.pdfSrc ='/assets/file/Estatuto_assof.pdf';
    //this.pdfSrc ='http://localhost:3000/Estatuto_assof.pdf';

    this._url = this._api.url;

    //this.pdfSrc =this._url+'/Estatuto_assof.pdf';
    this.http.get('assets/file/Estatuto_assof.pdf', { responseType: 'arraybuffer' })
    .subscribe((file: ArrayBuffer) => {
      this.pdfSrc = new Uint8Array(file);
      loading.dismiss();
      // or directly passing ArrayBuffer
      // this.pdfSrc = file;
    });
  }

  downloadEstatuto(){

    let loading = this._loadingCtrl.create({
      content: 'Baixando Documento...'
    });

    loading.present(); 

      const fileTransfer: FileTransferObject = this.transfer.create();
      const mime = 'application/pdf';
      const pdfFile = this._url+'/Estatuto_assof.pdf';
      fileTransfer.download(pdfFile, this.file.externalRootDirectory + 'Download/' + 'fichaAdesao.pdf', true)
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

  incrementZoom(amount: number) {
    this.zoom += amount;   }
}
