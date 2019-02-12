// Models a board as presented from the Arduino CLI
export class ArduinoCLIBoard {
  name: string;
  fqbn: string;
  port: string;
  usbID: string;


  constructor(name, fqbn, port, usbID) {
    this.name = name;
    this.fqbn = fqbn;
    this.port = port;
    this.usbID = usbID;

  }

}
