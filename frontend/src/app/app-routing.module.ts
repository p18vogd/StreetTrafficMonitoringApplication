import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapComponent} from "./components/map/map.component";
import {TableComponent} from "./components/table/table.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'table', component: TableComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '',component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
