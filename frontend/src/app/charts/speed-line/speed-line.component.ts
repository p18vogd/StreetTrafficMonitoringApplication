import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";

@Component({
  selector: 'app-speed-line',
  templateUrl: './speed-line.component.html',
  styleUrls: ['./speed-line.component.css']
})
export class SpeedLineComponent implements OnInit {
  data: any;
  chart: any=[];
  isLoadingData !: boolean;
  showCardFooter !: boolean;
  constructor() {}

  updateLineChart(labels: string[], dataset: string[]): void {


    if (this.chart instanceof Chart) {
      this.chart.destroy(); // Destroy the existing chart
    }

    this.chart = new Chart('speed-line-chart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Changes in vehicle speed',
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
        }
      },
    });
    this.isLoadingData = false;
    this.showCardFooter = true;
  }
  ngOnInit() {
  }
}
