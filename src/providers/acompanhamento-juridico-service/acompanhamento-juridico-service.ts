import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceProvider } from '../api-service';
import { AcompanhamentoJuridico } from '../../models/acompanhamentoJuridico';


@Injectable()
export class AcompanhamentoJuridicoServiceProvider {

  _url: string;

  constructor(public _http: HttpClient, 
     private _api: ApiServiceProvider) {
      this._url = this._api.url;
  }

  lista(cpf) {
    return this._http.get<AcompanhamentoJuridico[]>(this._url+'/acompanhamentoJuridico/'+cpf);
  }
}
