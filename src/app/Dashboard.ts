import {Board} from './BoardClasses/Board';

/**
 * Dashboard
 *
 * Models a dashboard within the system
 */
export class Dashboard {
  private readonly id: string;
  private name: string;
  private board: Board;
  // widgets: [[Widget]]

  constructor(id: string, name: string, board: Board, widgets) {
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

  getBoard(): Board {
    return this.board;
  }

  setBoard(newBoard: Board) {
    this.board = newBoard;
  }

}
