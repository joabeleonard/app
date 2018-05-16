// api-service.ts
import { Injectable } from '@angular/core';

// código anterior omitido
@Injectable()
export class ApiServiceProvider {

  // Quando for necessário, aqui será o único lugar a ser modificado!
  private _url: string = 'http://assofce.kinghost.net:21321';

  get url() {
    return this._url;
  }

}