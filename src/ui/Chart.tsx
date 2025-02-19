import { useMemo } from "react";
import { BaseChart } from "./BaseChart";

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
};

export function Chart(props: ChartProps) {
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

  return <BaseChart data={preparedData} fill="#4CAF50" stroke="#2E7D32" />;
}
