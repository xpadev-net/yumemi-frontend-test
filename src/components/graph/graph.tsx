import "./rechart.scss";

import { FC, useEffect, useMemo, useState } from "react";
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

export const Graph: FC<Props> = ({ data, range, onRangeChange }) => {
  const [dragStart, setDragStart] = useState<number | undefined>();
  const [dragEnd, setDragEnd] = useState<number | undefined>();
  const [verticalRange, setVerticalRange] = useState<[number, number]>(
    getVerticalRange(data),
  );
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [colors, setColors] = useState<Record<string, string>>({});

  const keys = useMemo(
    () => Object.keys(data[0]).filter((key) => key !== "name"),
    [data],
  );

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

  useEffect(() => {
    setVerticalRange(getVerticalRange(data, range));
  }, [data, range]);

  const regenerateColors = (isDarkMode: boolean) => {
    const newColors: Record<string, string> = {};
    for (const key of keys) {
      newColors[key] = generateRandomColor(isDarkMode);
    }
    setColors(newColors);
  };

  useEffect(() => {
    setColors((pv) => {
      for (const key of keys) {
        pv[key] ??= generateRandomColor(isDarkMode);
      }
      return { ...pv };
    });
  }, [data, isDarkMode, keys]);

  const setDarkMode = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
    regenerateColors(isDarkMode);
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    mediaQueryList.addEventListener("change", handler);
    return () => {
      mediaQueryList.removeEventListener("change", handler);
    };
  }, []);

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
        <XAxis
          allowDataOverflow
          dataKey="name"
          domain={range ?? ["dataMin", "dataMax"]}
          type="number"
          unit={"年"}
          height={60}
        />
        <YAxis
          allowDataOverflow
          domain={verticalRange}
          type="number"
          unit={"人"}
          width={100}
        />
        <Tooltip />
        <Legend onClick={onLegendClick} />
        {keys.map((key) => (
          <Line
            key={key}
            type="natural"
            dataKey={key}
            stroke={colors[key]}
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
  range?: [number, number],
  offset = 1.1,
): [number, number] => {
  let max = 0;
  const slicedData = (() => {
    if (!range) {
      return data;
    }
    const start = data.findIndex((item) => item.name === range[0]);
    const end = data.findIndex((item) => item.name === range[1]);
    return data.slice(start, end + 1);
  })();
  for (const item of slicedData) {
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

const generateRandomColor = (isDarkMode: boolean) => {
  return (
    "#" +
    [0, 0, 0]
      .map(() =>
        (Math.floor(Math.random() * 128) + (isDarkMode ? 128 : 0))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
};
