import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { ApiServiceProvider } from '../api-service';

const CHAVE = 'avatar-usuario';

@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado:Usuario;
  _url: string;

  constructor(public _http: HttpClient,
    private _api: ApiServiceProvider) {
    this._url = this._api.url;
    console.log('Hello UsuariosServiceProvider Provider'+ this._url);
  }


  efetuaLogin(cpf, senha) {
  
    
    var usuario = {"cpf":cpf, "senha":senha};
    console.log(usuario)
    return this._http.post<Usuario>(this._url+'/usuarios/logar',usuario )
              .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }
  salvaAvatar(avatar) {
    localStorage.setItem(CHAVE, avatar);
  }

  obtemAvatar() {
    return localStorage.getItem(CHAVE)
            ? localStorage.getItem(CHAVE)
            : 'assets/img/avatar-padrao.jpg';
  }
}
