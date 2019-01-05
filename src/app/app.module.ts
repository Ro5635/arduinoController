import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { CreateControlDialogueComponent } from './create-control-dialogue/create-control-dialogue.component';
import { ButtonControlComponentComponent } from './button-control-component/button-control-component.component';

import { NgxElectronModule } from 'ngx-electron';
import { ControlComponentComponent } from './control-component/control-component.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateControlDialogueComponent,
    ButtonControlComponentComponent,
    ControlComponentComponent,

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
    NgxElectronModule,
    MatButtonToggleModule,
    MatCardModule,
    AppRoutingModule,

  ],
  providers: [],
  entryComponents: [
    CreateControlDialogueComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
