type Statistics = {
  cpuUsage: number;
  RamUsage: number;
  storageData: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  toatalMemoryGB: number;
};

type EventPayloadMapping = {
  statistics: Statistics;
  staticData: StaticData;
}

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
    getStaticData: () => Promise<StaticData>;
  };
}

