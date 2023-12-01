import { Component, OnInit } from '@angular/core';
import { TableDataSource, TableItem } from './table-datasource';
import { TableService } from '../../services/table.service';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    dataSource: TableDataSource;
    displayedColumns: string[] = [ 'appprocesstime','road_name','countedcars', 'average_speed','road_info'];

    constructor(private tableService: TableService) {
        this.dataSource = new TableDataSource(tableService);
    }

    async downloadFile(fileType: string){
      this.tableService.downloadTableData(fileType).subscribe(response=>{
        console.log(fileType)
        var binaryData = [];
        binaryData.push(response.data);
        console.log(binaryData)
        var url = window.URL.createObjectURL(new Blob(binaryData,{type: 'application/xml'}));
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', 'blank');
        a.href = url;
        console.log(url)
        a.download = response.filename;
        console.log(response.filename)
        a.click;
        window.URL.revokeObjectURL(url);
        a.remove();
      })
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
