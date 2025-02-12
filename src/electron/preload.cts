const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistics: any) => void) => {
    //and any to the paramerter _ ans stats
    electron.ipcRenderer.on("statistics", (_:any, stats: any) => {
      callback(stats);
    })
  },

  getStaticData: () => console.log("static"),
});