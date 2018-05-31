import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AcompanhamentoJuridicoPage } from '../pages/acompanhamento-juridico/acompanhamento-juridico';
import { BeneficiosPage } from '../pages/beneficios/beneficios';
import { EstatutoPage } from '../pages/estatuto/estatuto';
import { InformacoesGeraisPage } from '../pages/informacoes-gerais/informacoes-gerais';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { GaleriaPresidentesPage } from '../pages/galeria-presidentes/galeria-presidentes';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private _usuarioService: UsuariosServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dados Associado', component: PerfilUsuarioPage },
      { title: 'Acompanhamento Juridico', component: AcompanhamentoJuridicoPage },
      { title: 'Beneficios', component: BeneficiosPage },
      { title: 'Estatuto', component: EstatutoPage },
      { title: 'Galeria de Presidentes', component: GaleriaPresidentesPage },
      { title: 'Informações Gerais', component: InformacoesGeraisPage }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  get avatar(){
    return this._usuarioService.obtemAvatar();
  }

  get usuarioLogado(){
    console.log(this._usuarioService.obtemUsuarioLogado());
     return this._usuarioService.obtemUsuarioLogado(); 
  }

}
