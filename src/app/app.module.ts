import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardContainerComponent} from './dashboard-container/dashboard-container.component';
import {BoardSelectionContainerComponent} from './BoardComponents/board-selection-container/board-selection-container.component';
import {BoardConfiguratorComponent} from './BoardComponents/board-configurator/board-configurator.component';
import { BoardProgrammerComponent } from './BoardComponents/board-programmer/board-programmer.component';
import { BoardSaveComponent } from './BoardComponents/board-save/board-save.component';
import { SliderControlComponent } from './slider-control/slider-control.component';

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

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MatSliderModule
  ],
  providers: [],
  entryComponents: [
    CreateControlDialogueComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
