import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardContainerComponent} from "./dashboard-container/dashboard-container.component";
import {BoardConfiguratorComponent} from "./board-configurator/board-configurator.component";

const routes: Routes = [
  {path: '', component: BoardConfiguratorComponent},
  {path: 'dashboard', component: DashboardContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
