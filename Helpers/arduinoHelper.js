/**
 * arduinoHelper
 *
 * Exposes the functionality required from the arduino-cli
 *
 * prepareArduinoCLI()
 * scanForBoards()
 * uploadToBoard(comPort)
 *
 *
 *
 */

const {exec} = require('child_process');

/**
 * prepareArduinoCLI
 *
 * Updates package index and ready's the Arduino cli for use
 * to upload to a board
 *
 * @return {Promise<*>}
 */
exports.prepareArduinoCLI = async function () {
  return new Promise(async function (resolve, reject) {
    let commands = [];

    commands.push("arduino-cli core update-index");
    commands.push("arduino-cli core install arduino:avr");
    // Compile the arduino sketch
    commands.push("arduino-cli compile --fqbn arduino:avr:uno setLEDBasedOnSerial");

    for (let command of commands) {
      try {
        const resp = await runShellCommand(command);
        console.log(resp);

      } catch (err) {
        console.error('Failed to execute command to prep Arduino-cli');

        reject(new Error('Failed to prepare arduino-cli'));
      }
    }

    // Finished prepping the arduino-cli
    resolve();

  });

};

/**
 * scanForBoards
 *
 * Scans for attached boards, uses the arduino-cli
 * returns a JSON object detailing the found boards.
 *
 * Example response: {
 *  "serialBoards": [
 *   {
 *     "name": "Arduino/Genuino Uno",
 *     "fqbn": "arduino:avr:uno",
 *     "port": "COM3",
 *     "usbID": "2341:0043 - 7493430303035161E1A1"
 *   }
 * ],
 * "networkBoards": []
 * }
 *
 * @return {Promise<*>}
 */
exports.scanForBoards = async function () {
  return new Promise((resolve, reject) => {

    exec("arduino-cli board list --format json", (err, stdout, stderr) => {

      if (err) {
        console.error('Failed to scan for boards');
        console.error(err);
        return reject(err);

      }

      // console.log(stdout);
      const boards = JSON.parse(stdout);

      return resolve(boards);

    });
  });
};

/**
 * uploadToBoard
 *
 * Uploads arduino sketch to the board at the supplied com port
 *
 * @param comPort
 * @return {Promise<*>}
 */
exports.uploadToBoard = async function (comPort) {
  return new Promise(async function (resolve, reject) {
    const sketchName = 'setLEDBasedOnSerial';
    const fqbn = 'arduino:avr:uno';
    const command = `arduino-cli upload -p ${comPort} --fqbn ${fqbn} ${sketchName}`;

    try {
      await runShellCommand(command);

    } catch (err) {
      console.error('Failed to upload sketch to board');
      console.error(`Failed to upload to board at: ${comPort}`);
      console.error(err);
      return reject(new Error('Failed to upload to board'));

    }

    console.log('Upload to board completed successfully');
    return resolve();

  });
};

/**
 * runShellCommand
 *
 * Executes shell commands and returns stdout
 *
 * @param shellCommand
 * @return {Promise<any>}
 */
function runShellCommand(shellCommand) {
  return new Promise((resolve, reject) => {
    console.log(`Running shell command: ${shellCommand}`);
    exec(shellCommand, (err, stdout, stderr) => {

      if (err) {
        console.error('Failed to run shell command');
        console.error(`Failed with command: ${shellCommand}`);
        console.error(err);
        return reject(err);

      }

      return resolve(stdout);

    });
  });
}

module.exports = exports;
