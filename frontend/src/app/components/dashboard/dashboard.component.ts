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
      this.updateChart(this.formattedStartDate, this.formattedEndDate);
    }
  }
  ngOnInit(): void {
  }

  updateChart(startDate: string, endDate: string): void {
    this.isLoadingData = true;
    this.showCardFooter = false;

    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);

    this.dashboardService.getChartData(params).subscribe(data => {
      let labels = data.map((data: { road_name: any; }) => data.road_name);
      let dataset = data.map((data: { countedcars: any; }) => data.countedcars);
      let speed = data.map((data: { average_speed: any; }) => data.average_speed);
      let timestamps = data.map((data: { appprocesstime: any; }) => data.appprocesstime);
      this.vehicleData = data;
      console.log(labels);
      console.log(dataset);

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
              data: dataset,
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
                  const timestamp = timestamps[context.dataIndex];
                  const formattedTimestamp = new Date(timestamp).toLocaleString();
                  return `${label}: ${context.parsed.y} (Timestamp: ${formattedTimestamp})`;
                },
              },
            },
          },
        },
      });
      // this.pieComponent.updatePieChart(labels,speed);
      this.speedLineComponent.updateLineChart(labels,speed);
      this.statusTableComponent.createDashboardTable(data,this.avg);
      this.isLoadingData = false;
      this.showCardFooter = true;
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
