import {ConnectedBoard} from "./BoardClasses/ConnectedBoard";
import {Widget} from "./Widget";
const minWidgetXIndex = 1;

/**
 * Dashboard
 *
 * Models a dashboard within the system
 */
export class Dashboard {
  private readonly id: string;
  private name: string;
  private board: ConnectedBoard;
  widgets: Widget[[Widget]];

  constructor(id: string, name: string, board: ConnectedBoard, widgets) {
    this.id = id;
    this.name = name;
    this.board = board;
    this.widgets = widgets;

    if (!this.widgets) {
      this.widgets = [[], []];

    } else if (this.widgets.length === minWidgetXIndex ) {
      console.log('Widgets did not have the minimum minWidgetXIndex, adding empty array.');
      this.widgets.push([]);

    }



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

  addNewWidget(newWidget: Widget) {
    this.widgets[0].push(newWidget);

  }

}
