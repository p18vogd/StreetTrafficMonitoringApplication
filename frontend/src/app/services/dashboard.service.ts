import { Injectable } from '@angular/core';
import {HOST, PORT} from "../ApplicationHosts";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://' + HOST + ':' + PORT + '/getTenHighestCarCountStreets' ;
  private miniCardUrl = 'http://' + HOST + ':' + PORT + '/getMiniCardData' ;
  constructor(private http: HttpClient) { }

  getChartData(requestParams : HttpParams): Observable<TableItem[]> {
    return this.http.get<TableItem[]>(this.apiUrl, {params : requestParams});
  }
  getMiniCardData(requestParams : HttpParams): Observable<number[]> {
    return this.http.get<number[]>(this.miniCardUrl, {params : requestParams});
  }
}
export interface TableItem {
  road_name: string;
  road_info: string;
  appprocesstime: string;
  countedcars: number;
  average_speed: number;
}
