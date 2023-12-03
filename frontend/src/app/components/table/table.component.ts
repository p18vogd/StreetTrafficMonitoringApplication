import { Component, OnInit } from '@angular/core';
import { TableDataSource, TableItem } from './table-datasource';
import { TableService } from '../../services/table.service';
import {MatProgressBarModule} from "@angular/material/progress-bar";


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
    dataSource: TableDataSource;
    displayedColumns: string[] = [ 'appprocesstime','road_name','countedcars', 'average_speed','road_info'];

    constructor(private tableService: TableService) {
        this.dataSource = new TableDataSource(tableService);
    }
    isDownloading = false;
    async downloadFile(fileType: string){
      this.tableService.downloadTableData(fileType).subscribe(blob => {
        this.isDownloading = true;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Data-Overview.'+fileType;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.isDownloading = false;
      });
    }

    ngOnInit(): void {
        this.dataSource.connect().subscribe(
            (data) => {
                this.dataSource.data = data;
            },
            (error) => {
                console.error('Error fetching table data:', error);
            }
        );
    }
}
