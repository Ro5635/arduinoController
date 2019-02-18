import {Board} from "../Board";

/**
 * Holds constants required in the main application
 */
export class SupportedBoardData {

  public supportedBoards: object = {};

  constructor() {
    // Create each supported board
    this.supportedBoards['arduino:avr:uno'] = new Board('Arduino Uno', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'], ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'], ['3','5', '6', '9', '10', '11'], 'arduino:avr:uno');
    this.supportedBoards['arduino:avr:mega'] = new Board('Arduino Mega', ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53'], ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15'], ['3','4', '5', '6', '7', '8', '9', '10', '11', '12', '13'], 'arduino:avr:mega');

  }




}
