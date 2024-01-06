import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {Chart} from 'chart.js/auto';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent {
  // private map: any;
  //
  // constructor(private httpClient: HttpClient) { }
  //
  // ngOnInit() {
  //   this.initializeMap();
  //   this.getTrafficIncidents();
  // }
  //
  // private initializeMap() {
  //   this.map = tt.map({
  //     key: 'API-KEY',
  //     container: 'map',
  //     center: [23.7275, 37.9838],
  //     zoom: 12,
  //   });
  // }
  //
  // private getTrafficIncidents() {
  //   const trafficIncidentsEndpoint = 'https://api.tomtom.com/traffic/services/4/incidentDetails/s3/relative-delay/json';
  //
  //   this.httpClient.get(trafficIncidentsEndpoint, {
  //     params: {
  //       key: 'API-KEY',
  //       point: [23.7275,37.9838],
  //     }
  //   }).subscribe((data: any) => {
  //     this.displayTrafficIncidentsOnMap(data);
  //   });
  // }
  //
  // private displayTrafficIncidentsOnMap(incidentData: any) {
  //   // Process the incident data and plot markers on the map
  //   if (incidentData && incidentData.incidents) {
  //     incidentData.incidents.forEach((incident: { point: { lon: number; lat: number; }; description: any; }) => {
  //       const marker = new tt.Marker().setLngLat([incident.point.lon, incident.point.lat])
  //         .setPopup(new tt.Popup().setHTML(`<strong>${incident.description}</strong>`))
  //         .addTo(this.map);
  //     });
  //   }
  // }
}
