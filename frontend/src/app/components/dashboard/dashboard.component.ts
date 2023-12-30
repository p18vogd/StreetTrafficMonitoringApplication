import { Component , OnInit} from '@angular/core';
import {Chart} from 'chart.js/auto';
import {DashboardService} from "../../services/dashboard.service";
import {HttpParams} from "@angular/common/http";
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {PieComponent} from "../../charts/pie/pie.component";
import {SpeedLineComponent} from "../../charts/speed-line/speed-line.component";
import {StatusTableComponent} from "../../charts/status-table/status-table.component";
import {MatTabChangeEvent} from "@angular/material/tabs";

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

  //---Chart variables (Highest Congestion)---
  ChartLabels!: string[];
  ChartCountedCars !: any[];
  ChartSpeed !: any[];
  ChartTimeStamp !: any[];
  //---Chart variables (Low Congestion)---
  LowChartLabels!: string[];
  LowChartCountedCars !: any[];
  LowChartSpeed !: any[];
  LowChartTimeStamp !: any[];
  //-----------------------//
  ChartAVG !: any;
  buttonValue : string='Highest Congestion';



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
      this.streetArrayForTable = []
      this.speedArrayForTable = [];
      this.updateMiniCardContent(this.formattedStartDate,this.formattedEndDate);
      this.getDashBoardChartData(this.formattedStartDate, this.formattedEndDate);
      this.getDashBoardChartLowCongestionData(this.formattedStartDate, this.formattedEndDate);
      this.createChartsForDashboard(this.ChartLabels,this.ChartCountedCars,this.ChartSpeed,'#e16d84','#eca6b5');
      this.onButtonClick('Highest Congestion');
      this.destroyOnUpdateCharts();
    }
  }

  destroyOnUpdateCharts(){
    if (this.chart instanceof Chart) {
      this.chart.destroy(); // Destroy the existing chart
    }
    if (this.pieComponent.chart instanceof Chart) {
      this.pieComponent.chart.destroy(); // Destroy the existing chart
    }
    if (this.speedLineComponent.chart instanceof Chart) {
      this.speedLineComponent.chart.destroy(); // Destroy the existing chart
    }
  }

  onButtonClick(buttonValue: string){
    if (buttonValue === 'Medium/Low Congestion'){
      this.createChartsForDashboard(this.LowChartLabels,this.LowChartCountedCars,this.LowChartSpeed,'#36A2EB','#9BD0F5');
    }else if (buttonValue === 'Highest Congestion'){
      console.log('HighestCong1');
      this.createChartsForDashboard(this.ChartLabels,this.ChartCountedCars,this.ChartSpeed,'#ff809f','#ffb6c1');
    }else{
      console.log('HighestCong2');
      this.createChartsForDashboard(this.ChartLabels,this.ChartCountedCars,this.ChartSpeed,'#ff809f','#ffb6c1');
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
      this.createChartsForDashboard(this.ChartLabels,this.ChartCountedCars,this.ChartSpeed,'#e16d84','#eca6b5');
      this.onButtonClick('Highest Congestion');
    });
    this.isLoadingData = false;
    this.showCardFooter = true;
  }

  getDashBoardChartLowCongestionData(startDate: string, endDate: string): void {
    this.isLoadingData = true;
    this.showCardFooter = false;

    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);

    this.dashboardService.getLowCongestionData(params).subscribe(data => {
      this.LowChartLabels = data.map((data: { road_name: any; }) => data.road_name);
      this.LowChartCountedCars = data.map((data: { countedcars: any; }) => data.countedcars);
      this.LowChartSpeed = data.map((data: { average_speed: any; }) => data.average_speed);
      this.LowChartTimeStamp = data.map((data: { appprocesstime: any; }) => data.appprocesstime);

      // For Table Divider
      this.isLoadingData = false;
      this.showCardFooter = true;
    });


  }

  createChartsForDashboard(labels:any[],countedCars:any[],carSpeed:any[],boarderColor: string,backgroundColor: string){
    // this.isLoadingData = true;
    // this.showCardFooter = false;
    this.updateChart(labels,countedCars,boarderColor,backgroundColor);
    this.pieComponent.updatePieChart(labels,countedCars,carSpeed);
    this.speedLineComponent.updateLineChart(labels,carSpeed,boarderColor,backgroundColor);

    //
    this.streetArrayForTable = labels;
    this.speedArrayForTable = carSpeed.map(carSpeed => Math.floor(carSpeed));
    // this.isLoadingData = false;
    // this.showCardFooter = true;

    console.log('CHARTS called');
  }

  updateChart(labels: string[], countedCars: any[], boarderColor: string,backgroundColor: string): void {

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
            borderColor: boarderColor,
            backgroundColor: backgroundColor,
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
    // this.isLoadingData = false;
    // this.showCardFooter = true;
  }


  updateMiniCardContent(startDate: string, endDate: string): void {
    this.isLoadingData = true;
    this.showCardFooter = false;
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
    console.log('first called');
    this.isLoadingData = false;
    this.showCardFooter = true;
  }
}
