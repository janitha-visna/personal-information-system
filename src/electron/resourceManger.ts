import osUtils from "os-utils";
import fs from "fs";
import os from 'os'
import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "./util.js";


const POLLING_INTERVAL = 500;

export function pollResource(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const RamUsage = getRamUsage();
    const storageData = getStorageUsage();
    ipcWebContentsSend('statistics',mainWindow.webContents ,{cpuUsage, RamUsage,storageData: storageData.usage});
    console.log({cpuUsage, RamUsage,storageData: storageData.usage});
  }, POLLING_INTERVAL);
}

export function getStaticData(){
    const totalStorage = getStorageUsage().total;
    const cpuModel = os.cpus()[0].model;
    const toatalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

    return {
        totalStorage,
        cpuModel,
        toatalMemoryGB,
    }

}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 -osUtils.freememPercentage();
}

function getStorageUsage() {
  // require node 18
  const stats = fs.statfsSync(process.platform === 'win32' ? 'c:' : '/');
  const total = stats.bsize* stats.blocks;
  const free = stats.bsize * stats.bfree;

  return{
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}