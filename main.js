const { app, BrowserWindow,ipcMain,dialog  } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs')
const csv = require('csv-parser')
const papa = require('papaparse');
const Validator = require('jsonschema').Validator;
//Increase file size
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=4096');




const https = require('node:https')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegrationInWorker: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  win.webContents.openDevTools()
  win.loadFile('index.html')

  ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    }).then(result => {
        if(!result.canceled)
    
          result = writeJsonFromCSV(result.filePaths[0]).then(event)
      }).catch(err => {
        console.log(err)
      })
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

function fsReadFileSynchToArray (filePath) {
  var data = JSON.parse(fs.readFileSync(filePath));
  return data;
}

function formatJsonRow(row){
  map = fsReadFileSynchToArray("schema/map.json");
  emptyObject = []
  for (const [key, value] of Object.entries(map)){
    if(typeof map[key] == "undefined" || typeof row[value]  == "undefined"){
        return emptyObject;
    }
    map[key] = row[value];
  } 
  return map;

}


 async function writeJsonFromCSV(filePath){
  console.log(path.join(__dirname,`test-data3.json`))
  const writeStream = fs.createWriteStream(path.join(__dirname,`test-data3.json`))
  var date_time = new Date();
  console.log("start:"+date_time);
  var count = 0; // cache the running count
  return new Promise((resolve, reject) => {
    let data = {}
    const file = fs.createReadStream(filePath)
    i = 1;
    papa.parse(file, {
      header: true,
      dynamicTyping: true,
      worker: true, // Don't bog down the main thread if its a big file
      step: function(result) {
          data = formatJsonRow(result.data)
          if(Object.keys(data).length > 0){
            writeStream.write((i > 1 ? ',' : '[')+JSON.stringify(data))
          }
          i++;
      },
      complete: function(results) {
        var date_time = new Date();
        console.log("End:"+date_time);
        //console.log(results.data);
        writeStream.write(']')
        writeStream.close;
        resolve(userpath+'/test-data3.json')
      }
  });
});
}

app.whenReady().then(() => {
  ipcMain.handle('dialog', (event, method, params) => {       
    dialog[method](params);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})