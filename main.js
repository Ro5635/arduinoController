/**
 * Electron Main Process
 *
 *
 */

// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');

const serialHelperProvider = require('./serialHelper');
const arduinoHelper = require('./Helpers/arduinoHelper');
const pinReadSubscriptionHelper = require('./Helpers/pinReadSubscription');

let serialHelper;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1500, height: 750, frame: false});

  // Hide the menu bar
  // mainWindow.setMenuBarVisibility(false);

  // and load the index.html of the app.
  mainWindow.loadFile('./dist/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }

});

//
//  Initial Home for ipc tasks, this will be extracted to a separate module with time
//

// Handle calls to complete serial operations
ipcMain.on('serialOperations', async function (event, tasks) {

  try {
    for (let task of tasks) {
      switch (task.taskName) {
        case 'openPort':
          try {
            serialHelper = await serialHelperProvider.getSerialHelper(task.comPort, 115200, mainWindow);
            pinReadSubscriptionHelper.provideSerialWriteHelper(serialHelper.writeLine);

          } catch (err) {
            console.error('Call to open serial port failed');
            console.error(err);

            mainWindow.webContents.send('serialOperations-openPort', {success: false});

          }

          mainWindow.webContents.send('serialOperations-openPort', {success: true});
          break;

        case 'closePort':

          console.log('Request received to close serial port');

          try {
            await serialHelper.closePort();
            pinReadSubscriptionHelper.clearAllSubscriptions();

            // Closed successfully
            mainWindow.webContents.send('serialOperations-closePort', {success: true});

          } catch (err) {
              console.error('Failure in call to close serial port');
              console.error(err);
              // Report back up to the app
              mainWindow.webContents.send('serialOperations-closePort', {success: false});
          }

          break;

        case 'writeLine':
          if (!serialHelper) {
            throw new Error('No serial port available');
          }
          serialHelper.writeLine(task.line);
          break;

        case 'registerAnalogReadSubscription':
          // TODO: add way to remove a subscription
          // TODO: This was written at 2AM to meet the deadline, so needs work...
          pinReadSubscriptionHelper.registerSubscription({nextReadDue: new Date(), 'interval': task.interval, 'pinTarget': task.pinTarget, 'forWidgetID': task.forWidgetID });
          //     task.interval
              // task.forWidgetID
        //      task.pinTarget
              break;

        default:
          console.error('Could not identify required serialOperation');
          console.error(`Requested task: ${task.taskName}`);

      }
    }
  } catch (err) {
    console.error(`Failed to run serialOperation`);
    console.error(err);

  }
});

// Handle calls to complete arduino-cli operations
ipcMain.on('arduinoOperations', async function (event, tasks) {
  try {
    for (let task of tasks) {
      switch (task.taskName) {
        case 'uploadSketch':
          await arduinoHelper.uploadToBoard(task.comPort);

          // Report back to the app
          //TODO: Handle Failure to upload to board
          mainWindow.webContents.send('boardUpload', {uploadSuccess: true});
          break;

        case 'boardScan':
          const boards = await arduinoHelper.scanForBoards();

          // Take only the serial boards
          const serialBoards = boards.serialBoards;

          // Report back to the app
          mainWindow.webContents.send('boardsFound', serialBoards);
          break;

        case 'prepareArduinoCLI':
          await arduinoHelper.prepareArduinoCLI();
          break;

        case 'prepareArduinoCLIAndUpload':
          await arduinoHelper.prepareArduinoCLI();
          await arduinoHelper.uploadToBoard(task.board.comPort, task.board.fqbn);

          // Report back to app
          //TODO: Handle Failure to upload to board
          mainWindow.webContents.send('boardUpload', {uploadSuccess: true});

          break;

        default:
          console.error('Could not identify required arduinoOperation');
          console.error(`Requested task: ${task.taskName}`);

      }
    }
  } catch (err) {
    console.error(`Failed to run arduinoOperation`);
    console.error(err);

  }
});

