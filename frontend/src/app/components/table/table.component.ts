import {Component, OnInit, ViewChild} from '@angular/core';
import { TableService } from '../../services/table.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDatepicker, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";

export interface TableItem {
  road_name: string;
  road_info: string;
  appprocesstime: string;
  countedcars: number;
  average_speed: number;
}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = [ 'appprocesstime','road_name','countedcars', 'average_speed','road_info'];
  dataSource = new MatTableDataSource<TableItem> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatDatepicker) datepicker!: MatDatepicker<Date>;

  date!: MatDatepicker<Date>
  constructor(private tableService: TableService,
              private dateAdapter: DateAdapter<Date>)
  {
    this.dateAdapter.setLocale('en-GB');
  }

  formattedDate!: string;

  onDateChange(selectedDate: MatDatepickerInputEvent<any, any>) {
    this.formattedDate = selectedDate.value?.toLocaleDateString() || '';
    console.log('Selected Date:', this.formattedDate);
    // You can perform additional actions with the formatted date here
  }
    async downloadFile(fileType: string){
      this.tableService.downloadTableData(fileType).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Data-Overview.'+fileType;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
    }
  ngOnInit(): void {
    this.tableService.fetchTableData().subscribe(
      (data: TableItem[]) => {
        this.dataSource = new MatTableDataSource<TableItem>(data);
        this.dataSource.paginator = this.paginator;

      },
      (error) => {
        console.error('Error fetching table data:', error);
      }
    );
  }

}
