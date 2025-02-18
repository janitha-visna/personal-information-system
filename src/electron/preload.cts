const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => {
    //and any to the paramerter _ ans stats
    ipcOn("statistics", (stats) => {
      callback(stats);
    });
  },

  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"]);

interface EventPayloadMapping {
  getStaticData: StaticData;
  statistics: Statistics;
}

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  //code check 1.30
  electron.ipcRenderer.on(
    key,
    (_: Electron.IpcRendererEvent, payload: EventPayloadMapping[Key]) =>
      callback(payload)
  );
}
