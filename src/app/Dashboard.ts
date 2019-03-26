import {ConnectedBoard} from "./BoardClasses/ConnectedBoard";

/**
 * Dashboard
 *
 * Models a dashboard within the system
 */
export class Dashboard {
  private readonly id: string;
  private name: string;
  private board: ConnectedBoard;
  // widgets: [[Widget]]

  constructor(id: string, name: string, board: ConnectedBoard, widgets) {
    this.id = id;
    this.name = name;
    this.board = board;

  }

  getID(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getBoard(): ConnectedBoard {
    return this.board;
  }

  setBoard(newBoard: ConnectedBoard) {
    this.board = newBoard;
  }

}
