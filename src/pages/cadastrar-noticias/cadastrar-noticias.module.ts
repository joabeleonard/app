import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarNoticiasPage } from './cadastrar-noticias';

@NgModule({
  declarations: [
    CadastrarNoticiasPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarNoticiasPage),
  ],
})
export class CadastrarNoticiasPageModule {}
