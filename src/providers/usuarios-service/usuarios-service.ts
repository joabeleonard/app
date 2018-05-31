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

  cadastrarUsuario(cpf, senha,nome, email){
    var usuario = {"cpf":cpf, "senha":senha, "nome":nome,"email":email};

    return this._http.post<Usuario>(this._url+'/usuarios/cadastrar',usuario )
    .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  uploadImageUsuario(image){

    let postData = new FormData();

    postData.append('file', image);
    return this._http.post<Usuario>(this._url+'/usuarios/uploadImage',postData );
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }
  salvaAvatar(avatar) {
    localStorage.setItem(CHAVE, avatar);
  }

  obtemAvatar() {
    return this._url+'/'+this._usuarioLogado.cpf+".jpg";
  }

  urlService(){
    return this._url+'/';
  }
}
