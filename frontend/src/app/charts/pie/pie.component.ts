import {Component, OnInit} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {Chart} from "chart.js/auto";
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  data: any;
  chart: any=[];
  isLoadingData !: boolean;
  showCardFooter !: boolean;
  constructor() {}

  updatePieChart(labels: string[], dataset: string[],speed: string[]): void {

    if (this.chart instanceof Chart) {
      this.chart.destroy(); // Destroy the existing chart
    }

    this.chart = new Chart('pie-chart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Cars passed by',
            data: dataset,
            borderWidth: 1,
          },
          {
            label: 'Average Speed',
            data: speed,
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
        }
      },
    });
    this.isLoadingData = false;
    this.showCardFooter = true;
  }
  ngOnInit() {
  }
}
