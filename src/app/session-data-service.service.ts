import { Injectable } from '@angular/core';
import {Board} from "./BoardClasses/Board";

@Injectable({
  providedIn: 'root'
})
export class SessionDataServiceService {
  public board: Board;

  constructor() { }
}
