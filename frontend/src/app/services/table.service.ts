import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TableItem} from "../components/table/table-datasource";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = 'http://localhost:8082/gov' ;
  private getXMLfile = 'http://localhost:8082/getXML';
  downloadUrl = '';
  constructor(private http: HttpClient) { }

  fetchTableData(): Observable<TableItem[]> {
    return this.http.get<TableItem[]>(this.apiUrl);
  }

  downloadTableData(fileType: string): Observable<any> {
    if (fileType == 'xml') {
      this.downloadUrl = this.getXMLfile;
      console.log(this.downloadUrl)
    }

    return this.http.get(`${this.downloadUrl}`, {responseType: 'blob'}).pipe(map(response => {
      return {
        filename: "Athens-Traffic."+fileType,
        data: response.slice()
      };
    }));
  }
}
