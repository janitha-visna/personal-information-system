export type Statistics = {
  cpuUsage: number;
  RamUsage: number;
  storageData: number;
};

export type StaticData = {
  totalStorage: number;
  cpuModel: string;
  toatalMemoryGB: number;
};

declare global {
  interface Window {
    electron: {
      subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
      getStaticData: () => Promise<StaticData>;
    };
  }
}
