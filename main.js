const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const { eventNames } = require("process");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname,"preload.js")
        }
    });
    
    mainWindow.loadFile(path.join(__dirname,"index.html"));
    //mainWindow.webContents.toggleDevTools();
};

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('ping', (event, input) => {
        console.log(input);
        return `${input} pong`;
    });

    ipcMain.handle('fizz-buzz', (event, number) => {
        // logs to terminal
        //console.log(`Received number ${number}`);
        return fizzBuzzer(number);
    });

    app.on("activate", () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on("window-all-closed", () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})

const fizzBuzzer = (number) => {
    let returnVal = [];
    for(let i=1; i<=number; i++) {
        let fizz = i%3 ===0;
        let buzz = i%5 === 0
        if(fizz && buzz) {
            returnVal.push("fizz buzz");
        } else if (fizz) {
            returnVal.push("fizz");
        } else if (buzz) {
            returnVal.push("buzz");
        } else {
            returnVal.push(i);
        }
    }
    return returnVal;
}
