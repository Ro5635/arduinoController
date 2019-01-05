import {Component, Inject} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateControlDialogueComponent} from './create-control-dialogue/create-control-dialogue.component';

import {ControlConfiguration} from './controlConfiguration';
import {ButtonControlComponentComponent} from "./button-control-component/button-control-component.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  buttControls: Array<ControlConfiguration> = [];

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateControlDialogueComponent, {
      width: '250px',
      data: {bestCake: 'LemonDrizzled', worstCake: 'Fire'}
    });

    dialogRef.afterClosed().subscribe((result: ControlConfiguration)=> {
      switch (result.controlType) {
        case 'Button':
          this.buttControls.push(result);
          break;
      }
    });
  }

}
