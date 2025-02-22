import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import path from "path";
import { ipcMainHandle, ipcMainOn, isDev } from "./util.js";
import { getStaticData, pollResource } from "./resourceManger.js";
import { getAssetsPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    // Enable the default frame
    frame: true,
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResource(mainWindow);

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });


  createTray(mainWindow);
  handleCloseEvents(mainWindow);
  
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (!willClose) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}