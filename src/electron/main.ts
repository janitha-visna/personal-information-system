import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import path from "path";
import { ipcMainHandle, ipcMainOn, isDev } from "./util.js";
import { getStaticData, pollResource } from "./resourceManger.js";
import { getAssetsPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
import { electron } from "process";

//Menu.setApplicationMenu(null);
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: false,
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

  ipcMainOn("sendFrameAction", (payload) => {
    switch (payload) {
      case "CLOSE":
        mainWindow.close();
        break;
      case "MAXIMIZE":
        mainWindow.maximize();
        break;
      case "MINIMIZE":
        mainWindow.minimize();
        break;
    }
  });

  createTray(mainWindow);
  handleCloseEvents(mainWindow);
  //create custom menu
  createMenu(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    e.preventDefault();
    mainWindow.hide();
  });
}
