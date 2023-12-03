import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TableItem} from "../components/table/table-datasource";
import {map} from "rxjs/operators";
import {HOST,PORT} from "../ApplicationHosts"

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = 'http://' + HOST + ':' + PORT + '/gov' ;
  private getXMLfile = 'http://' + HOST + ':' + PORT + '/getXML';
  private getXLSXfile = 'http://' + HOST + ':' + PORT + '/getXLSX';
  private getJSONfile = 'http://' + HOST + ':' + PORT + '/getJSON';
  downloadUrl = '';
  constructor(private http: HttpClient) { }

  fetchTableData(): Observable<TableItem[]> {
    return this.http.get<TableItem[]>(this.apiUrl);
  }

  downloadTableData(fileType: string): Observable<Blob> {
    if (fileType == 'xml') {
      this.downloadUrl = this.getXMLfile;
      console.log(this.downloadUrl)
    }else if(fileType == 'xlsx'){
      this.downloadUrl = this.getXLSXfile;
    }else if(fileType == 'json'){
      this.downloadUrl = this.getJSONfile;
    }

    return this.http.get(`${this.downloadUrl}`, {responseType: 'blob'})
  }
}
