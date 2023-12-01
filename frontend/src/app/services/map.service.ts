import { Injectable } from '@angular/core';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ttservices from '@tomtom-international/web-sdk-services';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  createMap(element:string,apiKey:string,center:[number,number],zoom: number) {
    return tt.map({
      key: apiKey,
      container: element,
      center: center,
      zoom: zoom
    })
  }



}
