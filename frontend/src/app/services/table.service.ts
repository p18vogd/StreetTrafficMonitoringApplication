import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HOST,PORT} from "../ApplicationHosts"

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = 'http://' + HOST + ':' + PORT + '/gov' ;
  private getDataByDate = 'http://' + HOST + ':' + PORT + '/getDataByDate' ;
  private getXMLfile = 'http://' + HOST + ':' + PORT + '/getXML';
  private getXLSXfile = 'http://' + HOST + ':' + PORT + '/getXLSX';
  private getJSONfile = 'http://' + HOST + ':' + PORT + '/getJSON';
  downloadUrl = '';
  constructor(private http: HttpClient) { }

  fetchTableData(requestParams : HttpParams): Observable<TableItem[]> {
    return this.http.get<TableItem[]>(this.apiUrl, {params : requestParams});
  }


  downloadTableData(fileType: string,requestParams : HttpParams): Observable<Blob> {
    if (fileType == 'xml') {
      this.downloadUrl = this.getXMLfile;
      console.log(this.downloadUrl)
    }else if(fileType == 'xlsx'){
      this.downloadUrl = this.getXLSXfile;
    }else if(fileType == 'json'){
      this.downloadUrl = this.getJSONfile;
    }

    return this.http.get(`${this.downloadUrl}`, {responseType: 'blob',params: requestParams})
  }
}

export interface TableItem {
  road_name: string;
  road_info: string;
  appprocesstime: string;
  countedcars: number;
  average_speed: number;
}
