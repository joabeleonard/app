import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaleriaPresidentesPage } from './galeria-presidentes';

@NgModule({
  declarations: [
    GaleriaPresidentesPage,
  ],
  imports: [
    IonicPageModule.forChild(GaleriaPresidentesPage),
  ],
})
export class GaleriaPresidentesPageModule {}
