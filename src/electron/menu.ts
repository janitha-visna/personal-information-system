import { app, BrowserWindow, Menu } from "electron";
import { Label } from "recharts";
import { isDev } from "./util.js";

export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === "darwin" ? undefined : "App",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            click: app.quit,
          },
          {
            label: "Devtools",
            click: ()=>mainWindow.webContents.openDevTools(),
            visible:isDev(),
          },
        ],
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "CPU",
          },
          {
            label: "RAM",
          },
          {
            label: "STORAGE",
          },
        ],
      },
    ])
  );
}
