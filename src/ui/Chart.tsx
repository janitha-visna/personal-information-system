import { useMemo } from "react";
import { BaseChart } from "./BaseChart";

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
  selectedView: "CPU" | "RAM" | "STORAGE";
};

export const COLOR_MAP = {
  CPU: {
    stroke: "#5DD4EE",
    fill: "#0A4D5C",
  },
  RAM: {
    stroke: "#E99311",
    fill: "#5F3C07",
  },
  STORAGE: {
    stroke: "#1ACF4D",
    fill: "#0B5B22",
  },
};

export function Chart(props: ChartProps) {
    const color = useMemo(
      () => COLOR_MAP[props.selectedView],
      [props.selectedView]
    );
  const preparedData = useMemo(() => {
    // Convert numbers to { value: number } objects
    const points = props.data.map((point) => ({ value: point * 100 }));

    // Fill remaining points with { value: undefined } if needed
    const emptyPoints = Array.from(
      { length: props.maxDataPoints - points.length },
      () => ({ value: undefined })
    );

    return [...points, ...emptyPoints]; // Combine actual and empty data points
  }, [props.data, props.maxDataPoints]); // Dependencies

  return <BaseChart data={preparedData} fill={color.fill} stroke={color.stroke}/>;
}
