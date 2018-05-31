import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import 'rxjs/add/operator/do';
import { HttpClientModule } from '@angular/common/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AcompanhamentoJuridicoPage } from '../pages/acompanhamento-juridico/acompanhamento-juridico';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { InformacoesGeraisPage } from '../pages/informacoes-gerais/informacoes-gerais';
import { EstatutoPage } from '../pages/estatuto/estatuto';
import { BeneficiosPage } from '../pages/beneficios/beneficios';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { NoticiasServiceProvider } from '../providers/noticias-service/noticias-service';
import { AcompanhamentoJuridicoServiceProvider } from '../providers/acompanhamento-juridico-service/acompanhamento-juridico-service';
import { ApiServiceProvider } from '../providers/api-service';
import { ModalAcompanhamentoPage } from '../pages/modal-acompanhamento/modal-acompanhamento';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { GaleriaPresidentesPage } from '../pages/galeria-presidentes/galeria-presidentes';
import { CadastroUsuarioPage } from '../pages/cadastro-usuario/cadastro-usuario';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AcompanhamentoJuridicoPage,
    PerfilUsuarioPage,
    InformacoesGeraisPage,
    LoginPage,
    EstatutoPage,
    BeneficiosPage,
    ModalAcompanhamentoPage,
    GaleriaPresidentesPage,
    CadastroUsuarioPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PdfViewerModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AcompanhamentoJuridicoPage,
    PerfilUsuarioPage,
    InformacoesGeraisPage,
    EstatutoPage,
    BeneficiosPage,
    ModalAcompanhamentoPage,
    GaleriaPresidentesPage,
    CadastroUsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuariosServiceProvider,
    NoticiasServiceProvider,
    ApiServiceProvider,
    Camera, ImageResizer,
    AcompanhamentoJuridicoServiceProvider,
    FileTransfer, FileTransferObject,File,DocumentViewer

  ]
})
export class AppModule {}
