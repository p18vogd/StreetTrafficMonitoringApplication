import { Component , OnInit} from '@angular/core';
import {Chart} from 'chart.js/auto';
import {DashboardService} from "../../services/dashboard.service";
import {HttpParams} from "@angular/common/http";
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
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
  formattedStartDate!: string;
  formattedEndDate!: string;
  isLoadingData !: boolean;

  constructor(private dashboardService: DashboardService,
              private dateAdapter: DateAdapter<Date>)
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
      this.updateChart(this.formattedStartDate, this.formattedEndDate);
    }
  }
  ngOnInit(): void {
  }

  updateChart(startDate: string, endDate: string): void {
    this.isLoadingData = true;
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate',endDate);

    this.dashboardService.getChartData(params).subscribe(data => {
      let label = data.map((data: { road_name: any; }) => data.road_name);
      let dataset = data.map((data: { countedcars: any; }) => data.countedcars);
      console.log(label);
      console.log(dataset);
      if (this.chart instanceof Chart) {
        this.chart.destroy(); // Destroy the existing chart
      }

      this.chart = new Chart('line-chart', {
          type: 'bar',
          data: {
            labels:label,
            datasets: [
              {
                label: 'Cars passed by',
                data: dataset,
                borderWidth: 1, //width="400" height="200"
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      this.isLoadingData = false;
    });
  }
}
