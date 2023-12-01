import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { TableService } from '../../services/table.service';

export interface TableItem {
    road_name: string;
    road_info: string;
    appprocesstime: string;
    countedcars: number;
    average_speed: number;
}

export class TableDataSource extends DataSource<TableItem> {
    data: TableItem[] = [];

    constructor(private tableService: TableService) {
        super();
    }

    connect(): Observable<TableItem[]> {
        return this.tableService.fetchTableData();
    }

    disconnect(): void {}
}
