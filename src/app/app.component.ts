import {Component} from '@angular/core';
import {ElectronControlService} from "./electron-control.service";
import {slideInAnimation} from "./route-animation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {

  constructor(private electronControlService: ElectronControlService) {
  }

  closeApp() {
    // Call for the closure of the application
    this.electronControlService.closeApplication();

  }

}
