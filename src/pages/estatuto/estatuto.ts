import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

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
  public zoom: number = 1.0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public pdfViewerComponent: PdfViewerComponent) {
  }

  ionViewDidLoad() {
    this.pdfSrc ='assets/file/Estatuto_assof.pdf';
    console.log('ionViewDidLoad EstatutoPage');
  }

  incrementZoom(amount: number) {
    this.zoom += amount;   }
}
