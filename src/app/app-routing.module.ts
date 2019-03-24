import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardContainerComponent} from "./dashboard/dashboard-container/dashboard-container.component";
import {BoardConfiguratorComponent} from "./BoardComponents/board-configurator/board-configurator.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {DashboardSelectionComponent} from "./dashboard/dashboard-selection/dashboard-selection.component";
import {AuthGuardService} from "./guards/auth-guard.service";
import {DashboardSettingsComponent} from "./dashboard/dashboard-settings/dashboard-settings.component";

const routes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'dashboard', component: DashboardContainerComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginFormComponent},
  {path: 'dashboard/select', component: DashboardSelectionComponent, canActivate: [AuthGuardService]},
  {path: 'dashboard/settings/:dashboardID', component: DashboardSettingsComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
