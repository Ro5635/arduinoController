/**
 * SerialHelper
 *
 */

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

function getSerialHelper(serialPort) {
  if (!serialPort) {
    console.error('Serial Port Not Open');
    console.error('Aborting Write');
    return;
  }

  return {
    writeLine: (line) => {
      serialPort.write(line + '\n');
    }
  };


}


exports.getSerialHelper = (comPortName) => {

  const newPort = new SerialPort(comPortName, {baudRate: 115200});

  const parser = new Readline();
  newPort.pipe(parser);

  parser.

  // For now just dump all responses to the console
  parser.on('data', line => {
    console.log(line);

  });


  // get a new serial helper with the new port
  return getSerialHelper(newPort);

};

module.exports = exports;
