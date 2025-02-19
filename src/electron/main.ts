import { app, BrowserWindow, ipcMain, Tray } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import { getStaticData, pollResource } from "./resourceManger.js";
import { getAssetsPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";

type test = string;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
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
    e.preventDefault();
    mainWindow.hide();
  });
}
