import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ApiServiceProvider } from '../../providers/api-service';

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
    private _api: ApiServiceProvider) {
  }

  ionViewDidLoad() {

    this._url = this._api.url;

    let loading = this._loadingCtrl.create({
      content: 'Carregando Estatuto...'
    });

    loading.present();
    console.log(this._url+'/Estatuto_assof.pdf');
    this.pdfSrc =this._url+'/Estatuto_assof.pdf';

    loading.dismiss();
    console.log('ionViewDidLoad EstatutoPage');
  }

  incrementZoom(amount: number) {
    this.zoom += amount;   }
}
