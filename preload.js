const {contextBridge, ipcMain, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: process.versions.chrome, // is not a function, see
    electron: () => process.versions.electron,
    ping: (inputText) => ipcRenderer.invoke('ping', inputText),
    fizzBuzz: (number) => ipcRenderer.invoke('fizz-buzz', number)
});
