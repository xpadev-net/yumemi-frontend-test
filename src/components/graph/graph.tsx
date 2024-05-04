import { FC, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";

type GraphData = {
  name: number;
  [key: string]: number;
}[];

type Props = {
  data: GraphData;
  range?: [number, number];
  onRangeChange?: (range: [number, number]) => void;
};

export const Graph: FC<Props> = ({ data, range: _range, onRangeChange }) => {
  const [dragStart, setDragStart] = useState<number | undefined>();
  const [dragEnd, setDragEnd] = useState<number | undefined>();
  const range = _range ?? ["dataMin", "dataMax"];
  const [verticalRange, setVerticalRange] = useState<[number, number]>(
    getVerticalRange(data),
  );
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);

  const zoom = () => {
    setDragStart(undefined);
    setDragEnd(undefined);
    if (dragStart === dragEnd || !dragEnd || !dragStart) {
      return;
    }
    const left = Math.min(dragStart, dragEnd);
    const right = Math.max(dragStart, dragEnd);
    onRangeChange?.([left, right]);
    setVerticalRange(getVerticalRange(data, [left, right]));
  };

  const onLegendClick = (e: Payload) => {
    if (typeof e.dataKey !== "string") return;
    if (hiddenKeys.includes(e.dataKey)) {
      setHiddenKeys(hiddenKeys.filter((key) => key !== e.dataKey));
    } else {
      setHiddenKeys([...hiddenKeys, e.dataKey]);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={800}
        height={400}
        data={data}
        onMouseDown={(e) => setDragStart(Number(e.activeLabel ?? 0))}
        onMouseMove={(e) => dragStart && setDragEnd(Number(e.activeLabel ?? 0))}
        onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis allowDataOverflow dataKey="name" domain={range} type="number" />
        <YAxis allowDataOverflow domain={verticalRange} type="number" />
        <Tooltip />
        <Legend onClick={onLegendClick} />
        {Object.keys(data[0])
          .filter((key) => key !== "name")
          .map((key) => (
            <Line
              key={key}
              type="natural"
              dataKey={key}
              stroke="#8884d8"
              hide={hiddenKeys.includes(key)}
            />
          ))}
        {dragStart && dragEnd && (
          <ReferenceArea x1={dragStart} x2={dragEnd} strokeOpacity={0.3} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

const getVerticalRange = (
  data: GraphData,
  range: [number, number] = [0, data.length],
  offset = 1.1,
): [number, number] => {
  let max = 0;
  for (const item of data.slice(...range)) {
    for (const [key, value] of Object.entries(item)) {
      if (key === "name") {
        continue;
      }
      if (value > max) {
        max = value;
      }
    }
  }
  return [0, Math.round(max * offset)];
};
