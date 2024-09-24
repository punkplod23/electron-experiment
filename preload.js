const {ipcRenderer,contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    openDialog() {
        return ipcRenderer.send('open-file-dialog');
      }
});