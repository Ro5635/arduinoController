import { Injectable } from '@angular/core';
import {ElectronService} from "ngx-electron";

@Injectable({
  providedIn: 'root'
})
export class ElectronControlService {

  constructor(private _electronService: ElectronService) {
  }

  /**
   * Close Electron Application
   */
  closeApplication() {
    console.log('Closing application as requested');
    const window = this._electronService.remote.getCurrentWindow();
    window.close();

  }
}
