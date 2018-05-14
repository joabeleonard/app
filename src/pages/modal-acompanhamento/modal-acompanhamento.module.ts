import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAcompanhamentoPage } from './modal-acompanhamento';

@NgModule({
  declarations: [
    ModalAcompanhamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAcompanhamentoPage),
  ],
})
export class ModalAcompanhamentoPageModule {}
