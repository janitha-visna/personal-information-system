import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { getAssetsPath } from "./pathResolver.js";

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(
    path.join(
      getAssetsPath(),
      process.platform === "win32" ? "trayIcon.png" : "trayIcon.png"
    )
  );

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show",
        click:() => {
            mainWindow.show();
        },
      },
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ])
  );
}
