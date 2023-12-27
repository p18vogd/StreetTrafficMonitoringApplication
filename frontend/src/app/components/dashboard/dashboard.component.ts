import { Component , OnInit} from '@angular/core';
import {Chart} from 'chart.js/auto';
import {DashboardService} from "../../services/dashboard.service";
import {HttpParams} from "@angular/common/http";
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {PieComponent} from "../../charts/pie/pie.component";
import {SpeedLineComponent} from "../../charts/speed-line/speed-line.component";
import {StatusTableComponent} from "../../charts/status-table/status-table.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // selectedYear: number; // Variable to store the selected year
  // years: number[];
  data: any;
  chart: any=[];
  vehicleData !: any[];
  streetArrayForTable!: any[];
  speedArrayForTable!: any[];
  formattedStartDate!: string;
  formattedEndDate!: string;
  isLoadingData !: boolean;
  avg!:number;

  //MiniCard variables
  numberOfVehicles !: string;
  averageSpeedInRoad !: string;
  numberOfRoadsInNetwork !: string;
  numberOfSensors !: string;
  showCardFooter !: boolean;

  //Chart variables (Highest Congestion)
  ChartLabels!: string[];
  ChartCountedCars !: any[];
  ChartSpeed !: any[];
  ChartTimeStamp !: any[];
  ChartAVG !: any;
  //let labels = data.map((data: { road_name: any; }) => data.road_name);
  //       let dataset = data.map((data: { countedcars: any; }) => data.countedcars);
  //       let speed = data.map((data: { average_speed: any; }) => data.average_speed);
  //       let timestamps = data.map((data: { appprocesstime: any; }) => data.appprocesstime);
  //       this.vehicleData = data;
  //       console.log(labels);
  //       console.log(dataset);
  //       this.speedArrayForTable = speed.map(speed => Math.floor(speed));
  //       this.streetArrayForTable = labels;
  //       this.avg



  constructor(private dashboardService: DashboardService,
              private dateAdapter: DateAdapter<Date>,
              private pieComponent: PieComponent,
              private speedLineComponent : SpeedLineComponent,
              private statusTableComponent : StatusTableComponent)
  {
    this.dateAdapter.setLocale('en-GB');
  }

onStartDateChange(selectedDate: MatDatepickerInputEvent<any, any>) {
    if (selectedDate.value) {
      this.formattedStartDate = selectedDate.value.toLocaleDateString();
      console.log('Selected Start Date:', this.formattedStartDate);
    }
  }

  onEndDateChange(selectedDate: MatDatepickerInputEvent<any, any>) {
    if (selectedDate.value) {
      this.formattedEndDate = selectedDate.value.toLocaleDateString();
      console.log('Selected End Date:', this.formattedEndDate);
      this.updateMiniCardContent(this.formattedStartDate,this.formattedEndDate);
      this.getDashBoardChartData(this.formattedStartDate, this.formattedEndDate);
    }
  }
  ngOnInit(): void {
  }
  getDashBoardChartData(startDate: string, endDate: string): void {
    this.isLoadingData = true;
    this.showCardFooter = false;

    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);

    this.dashboardService.getChartData(params).subscribe(data => {
      this.ChartLabels = data.map((data: { road_name: any; }) => data.road_name);
      this.ChartCountedCars = data.map((data: { countedcars: any; }) => data.countedcars);
      this.ChartSpeed = data.map((data: { average_speed: any; }) => data.average_speed);
      this.ChartTimeStamp = data.map((data: { appprocesstime: any; }) => data.appprocesstime);
      // For Table Divider
      this.streetArrayForTable = this.ChartLabels;
      this.speedArrayForTable = this.ChartSpeed.map(speed => Math.floor(speed));
      // Call other Charts
      this.updateChart(this.ChartLabels,this.ChartCountedCars)
      this.pieComponent.updatePieChart(this.ChartLabels,this.ChartCountedCars,this.ChartSpeed);
      this.speedLineComponent.updateLineChart(this.ChartLabels,this.ChartSpeed);
      this.isLoadingData = false;
      this.showCardFooter = true;
    });

  }

  updateChart(labels: string[], countedCars: any[]): void {
    this.isLoadingData = true;
    this.showCardFooter = false;
    if (this.chart instanceof Chart) {
      this.chart.destroy(); // Destroy the existing chart
    }

    this.chart = new Chart('bar-chart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cars passed by',
            data: countedCars,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const timestamp = this.ChartTimeStamp[context.dataIndex];
                const formattedTimestamp = new Date(timestamp).toLocaleString();
                return `${label}: ${context.parsed.y} (Timestamp: ${formattedTimestamp})`;
              },
            },
          },
        },
      },
    });
  }


  updateMiniCardContent(startDate: string, endDate: string): void {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate',endDate);
    this.dashboardService.getMiniCardData(params).subscribe(data => {
      this.avg = data[1];
      this.numberOfVehicles = data[0].toLocaleString("de-DE");
      this.averageSpeedInRoad = data[1].toString() + ' km/h';
      this.numberOfRoadsInNetwork = data[2].toString();
      this.numberOfSensors = data[3].toString();
      if(data[0] === 0){
        this.numberOfVehicles = 'No available data'
      }
      if(data[1] === 0){
        this.averageSpeedInRoad = 'No available data'
      }
      if(data[2] === 0){
        this.numberOfRoadsInNetwork = 'No available data'
      }
      if(data[3] === 0){
        this.numberOfSensors = 'No available data'
      }
    });
  }
}
