
export class Board {
  boardBrandName: string;
  digitalPins: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
  analogPins: Array<string> = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'];


  constructor(boardBrandName, digitalPins, analogPins) {
    this.boardBrandName = boardBrandName;
    this.digitalPins = digitalPins;
    this.analogPins = analogPins;

  }

}

