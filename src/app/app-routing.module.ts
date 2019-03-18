import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardContainerComponent} from "./dashboard-container/dashboard-container.component";
import {BoardConfiguratorComponent} from "./BoardComponents/board-configurator/board-configurator.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {DashboardSelectionComponent} from "./dashboard-selection/dashboard-selection.component";

const routes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'dashboard', component: DashboardContainerComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'dashboard/select', component: DashboardSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
