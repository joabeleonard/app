import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceProvider } from '../api-service';
import { Noticia } from '../../models/noticia';

/*
  Generated class for the NoticiasServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoticiasServiceProvider {

   _url: string;

  constructor(public _http: HttpClient,
    private _api: ApiServiceProvider) {
    this._url = this._api.url;
  }


  lista() {
    return this._http.get<Noticia[]>(this._url+'/noticias');
  }

  caminhoImagem(){
    return this._url+'/';
  }
}
