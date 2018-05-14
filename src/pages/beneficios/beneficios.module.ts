import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeneficiosPage } from './beneficios';

@NgModule({
  declarations: [
    BeneficiosPage,
  ],
  imports: [
    IonicPageModule.forChild(BeneficiosPage),
  ],
})
export class BeneficiosPageModule {}
