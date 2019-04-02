import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSliderModule} from '@angular/material/slider';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CreateControlDialogueComponent} from './create-control-dialogue/create-control-dialogue.component';
import {ButtonControlComponentComponent} from './button-control-component/button-control-component.component';

import {NgxElectronModule} from 'ngx-electron';
import {ControlComponentComponent} from './control-component/control-component.component';
import {DashboardComponent} from './dashboard/dashboard-component/dashboard.component';
import {DashboardContainerComponent} from './dashboard/dashboard-container/dashboard-container.component';
import {BoardSelectionContainerComponent} from './BoardComponents/board-selection-container/board-selection-container.component';
import {BoardConfiguratorComponent} from './BoardComponents/board-configurator/board-configurator.component';
import {BoardProgrammerComponent} from './BoardComponents/board-programmer/board-programmer.component';
import {BoardSaveComponent} from './BoardComponents/board-save/board-save.component';
import {SliderControlComponent} from './slider-control/slider-control.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {DashboardSelectionComponent} from './dashboard/dashboard-selection/dashboard-selection.component';
import {MatExpansionModule, MatListModule, MatMenuModule, MatTabsModule} from "@angular/material";
import { ConfirmDialogueComponent } from './dialogues/confirm-dialogue/confirm-dialogue.component';
import { DashboardCreationComponent } from './dashboard/dashboard-creation/dashboard-creation-component/dashboard-creation.component';
import { DashboardSettingsComponent } from './dashboard/dashboard-settings/dashboard-settings.component';
import { DashboardSettingsCoreComponent } from './dashboard/dashboard-settings-core/dashboard-settings-core.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { ConfirmBoardForLoadDialogueComponent } from './dialogues/confirm-board-for-load-dialogue/confirm-board-for-load-dialogue.component';
import { BoardConfiguratorDialogueWrapperComponent } from './BoardComponents/board-configurator-dialogue-wrapper/board-configurator-dialogue-wrapper.component';
import { NewWidgetComponent } from './dashboard/widgets/creationWizards/new-widget/new-widget.component';
import { SelectWidgetTypeComponent } from './dashboard/widgets/select-widget-type/select-widget-type.component';
import { CreateButtonWidgetWizardComponent } from './dashboard/widgets/creationWizards/create-button-widget-wizard/create-button-widget-wizard.component';
import { SliderWidgetWizardComponent } from './dashboard/widgets/creationWizards/slider-widget-wizard/slider-widget-wizard.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CreateLiveWidgetWizardComponent } from './dashboard/widgets/creationWizards/create-live-widget-wizard/create-live-widget-wizard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LiveWidgetComponent } from './dashboard/widgets/live-widget/live-widget.component';
import { GraphWidgetComponent } from './dashboard/widgets/graph-widget/graph-widget.component';
import { GraphWidgetWizardComponent } from './dashboard/widgets/creationWizards/graph-widget-wizard/graph-widget-wizard.component';
import { GraphWidgetSettingsComponent } from './dashboard/widgets/graph-widget-settings/graph-widget-settings.component';


const wsConfig: SocketIoConfig = { url: 'http://localhost:5500', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    CreateControlDialogueComponent,
    ButtonControlComponentComponent,
    ControlComponentComponent,
    DashboardComponent,
    DashboardContainerComponent,
    BoardSelectionContainerComponent,
    BoardConfiguratorComponent,
    BoardProgrammerComponent,
    BoardSaveComponent,
    SliderControlComponent,
    LoginFormComponent,
    DashboardSelectionComponent,
    ConfirmDialogueComponent,
    DashboardCreationComponent,
    DashboardSettingsComponent,
    DashboardSettingsCoreComponent,
    BoardDetailsComponent,
    ConfirmBoardForLoadDialogueComponent,
    BoardConfiguratorDialogueWrapperComponent,
    NewWidgetComponent,
    SelectWidgetTypeComponent,
    CreateButtonWidgetWizardComponent,
    SliderWidgetWizardComponent,
    CreateLiveWidgetWizardComponent,
    LiveWidgetComponent,
    GraphWidgetComponent,
    GraphWidgetWizardComponent,
    GraphWidgetSettingsComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(wsConfig),
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxElectronModule,
    MatButtonToggleModule,
    MatCardModule,
    AppRoutingModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatSnackBarModule,
    DragDropModule,
    MatSliderModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatMenuModule,
    NgxEchartsModule
  ],
  providers: [],
  entryComponents: [
    CreateControlDialogueComponent,
    ConfirmDialogueComponent,
    DashboardCreationComponent,
    ConfirmBoardForLoadDialogueComponent,
    BoardConfiguratorDialogueWrapperComponent,
    NewWidgetComponent,
    GraphWidgetSettingsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
