import { Injectable } from '@angular/core';
import {HOST, PORT} from "../ApplicationHosts";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://' + HOST + ':' + PORT + '/getTenHighestCarCountStreets' ;
  downloadUrl = '';
  constructor(private http: HttpClient) { }

  getChartData(requestParams : HttpParams): Observable<TableItem[]> {
    return this.http.get<TableItem[]>(this.apiUrl, {params : requestParams});
  }
}
export interface TableItem {
  road_name: string;
  road_info: string;
  appprocesstime: string;
  countedcars: number;
  average_speed: number;
}
