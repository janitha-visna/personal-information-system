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

type UnsubscribeFuntion = () => void;

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => UnsubscribeFuntion;
    getStaticData: () => Promise<StaticData>;
  };
}

