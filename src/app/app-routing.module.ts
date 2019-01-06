import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardContainerComponent} from "./dashboard-container/dashboard-container.component";
import {BoardSelectionContainerComponent} from "./board-selection-container/board-selection-container.component";

const routes: Routes = [
  { path: '', component: BoardSelectionContainerComponent },
  { path: 'dashboard', component: DashboardContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
