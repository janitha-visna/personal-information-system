const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => {
    //and any to the paramerter _ ans stats
    electron.ipcRenderer.on("statistics", (_: any, stats: any) => {
      callback(stats);
    });
  },

  getStaticData: () =>  electron.ipcRenderer.invoke("getStaticData"),
} satisfies window['electron']);