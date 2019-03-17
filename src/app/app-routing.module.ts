import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardContainerComponent} from "./dashboard-container/dashboard-container.component";
import {BoardConfiguratorComponent} from "./BoardComponents/board-configurator/board-configurator.component";
import {LoginFormComponent} from "./login-form/login-form.component";

const routes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'dashboard', component: DashboardContainerComponent},
  {path: 'login', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
