import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MapComponent } from './components/map/map.component';
import {HttpClientModule} from "@angular/common/http";
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatTabsModule} from "@angular/material/tabs";
import { PieComponent } from './charts/pie/pie.component';
import { SpeedLineComponent } from './charts/speed-line/speed-line.component';
import { StatusTableComponent } from './charts/status-table/status-table.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDialog} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MapComponent,
    TableComponent,
    DashboardComponent,
    PieComponent,
    SpeedLineComponent,
    StatusTableComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        MatCardModule,
        MatExpansionModule,
        MatInputModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        MatNativeDateModule,
        FormsModule,
        MatProgressBarModule,
        MatGridListModule,
        NgChartsModule,
        MatTabsModule,
        MatButtonToggleModule
    ],
  providers: [PieComponent,SpeedLineComponent,StatusTableComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
