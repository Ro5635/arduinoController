/**
 * Widget
 *
 * Represents a dashboard widget
 */

export class Widget {
  type: string;
  name: string;
  id: string;
  state: object;
  boardPin: string;

  constructor(type: string, name: string, id: string, state: object, boardPin: string) {
    this.type = type;
    this.name = name;
    this.id = id;
    this.state = state;
    this.boardPin = boardPin;

  }

}
