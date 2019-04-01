/**
 * SerialHelper
 *
 * Provides a serial helper that has the following functions:
 *
 *  writeLine(line: string)
 *    writes the provided string to the serial port as a line, terminated with a new line character.
 *
 *  closePort(): Promise<>
 *      Closes the active serial port
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
    },
    closePort: () => {
      return new Promise((resolve, reject) => {
        serialPort.close(err => {
          if (err) {
            console.error('Failed to close serial port');
            console.error(err);
            return reject('Failed to close serial port');

          }

          console.log('Closed serial port successfully');
          return resolve();

        })
      });
    }
  };


}

/**
 * getSerialHelper
 *
 * Gets a new serial port
 *
 * @param comPortName  string Example "COM4"
 * @param baudRate  number board rate for new port, example: 115200
 * @param electronMainWindow  Electron Window Instance
 * @return {Promise<any>}
 */
exports.getSerialHelper = (comPortName, baudRate, electronMainWindow) => {
  return new Promise((resolve, reject) => {

    const newPort = new SerialPort(comPortName, {"baudRate": baudRate}, err => {
      if (err) {
        console.error('failed to open serial port');
        console.error(err);

        return reject(new Error('Failed to open serial port'));

      }
    });

    const parser = new Readline();
    newPort.pipe(parser);

    // parser.

    // For now just dump all responses to the console
    parser.on('data', line => {
      console.log(line);

      if(line.includes('#')) {
        console.log('Arduino read response detected');
        const jsonLine = line.replace('#', '');

        let readResponse;

        try {
          readResponse = JSON.parse(jsonLine);

          electronMainWindow.webContents.send('serialOperations-readResponse', readResponse);

        } catch (err) {
          console.error(err);
          console.error('Failed to decode serial received line to JSON');

        }

      }
    });


    // get a new serial helper with the new port
    return resolve(getSerialHelper(newPort));

  });


};

module.exports = exports;
