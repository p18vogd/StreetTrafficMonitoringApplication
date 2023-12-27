import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TableItem} from "../../components/table/table.component";
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-status-table',
  templateUrl: './status-table.component.html',
  styleUrls: ['./status-table.component.css']
})
export class StatusTableComponent implements OnInit {
  data!: TableItem[];
  avg!: number;
  streets: any[] = ['1111'];
  speed: any[] = ['111'];
  createDashboardTable(data: TableItem[],average:number): void{
    this.data = data;
    this.streets = data.map((data: { road_name: any; }) => data.road_name);
    this.speed = data.map((data: { average_speed: any; }) => data.average_speed);
    console.log('HEREE s  ' + this.streets);
    this.avg = average;
  }
   ngOnInit() {
    this.streets = ['1'];
    this.speed = ['2'];
    this.avg = 0;
   }
}
