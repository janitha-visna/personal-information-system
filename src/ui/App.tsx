import { useEffect, useMemo, useState } from "react";

import "./App.css";
import { useStatistics } from "./useStatistics";
import { Chart } from "./Chart";

function App() {
  const [count, setCount] = useState(0);
  const statistics = useStatistics(10);
  const [activeView,setActiveView] = useState<View>("CPU");
  const cpuUsage = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.RamUsage),
    [statistics]
  );
  const storageDatas = useMemo(
    () => statistics.map((stat) => stat.storageData),
    [statistics]
  );

  const activeUsages = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsage;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageDatas;
    }
  }, [activeView, cpuUsage, ramUsages, storageDatas]);

useEffect(() => {
  return window.electron.subscribeChangeView((view) => setActiveView(view));
},[]);

  console.log(statistics);

  return (
    <>
      <header>
        <button
          id="close"
          onClick={() => window.electron.sendFrameAction("CLOSE")}
        />
        <button
          id="minimize"
          onClick={() => window.electron.sendFrameAction("MINIMIZE")}
        />
        <button
          id="maximize"
          onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
        />
      </header>
      <div style={{ height: 120 }}>
        <Chart data={activeUsages} maxDataPoints={10} />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
