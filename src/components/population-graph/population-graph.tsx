import { FC, useMemo, useState } from "react";
import { MdRestartAlt } from "react-icons/md";

import { Button } from "@/components/button/button.tsx";
import { Dropdown } from "@/components/dropdown/dropdown.tsx";
import { Graph } from "@/components/graph/graph.tsx";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner.tsx";
import { usePopulationComposition } from "@/hooks/usePopulationComposition.ts";
import { usePrefectures } from "@/hooks/usePrefectures.ts";
import { transformPopulation } from "@/lib/population-transformer.ts";

import styles from "./population-graph.module.scss";

type Props = {
  selectedPrefIds: number[];
};

export const PopulationGraph: FC<Props> = ({ selectedPrefIds }) => {
  const { data, loading, refetch } = usePopulationComposition(selectedPrefIds);
  const { data: prefectures, loading: prefLoading } = usePrefectures();

  const [range, setRange] = useState<[number, number] | undefined>(undefined);
  const [label, setLabel] = useState<string>("総人口");
  const labels = useMemo(
    () =>
      (data?.type === "success" &&
        Object.values(data.data)[0].result.data.map((d) => d.label)) ||
      [],
    [data],
  );

  const graphData = useMemo(() => {
    if (data?.type !== "success" || prefectures?.type !== "success") {
      return [];
    }
    return transformPopulation(prefectures.data.result, data.data, label);
  }, [data, prefectures, label]);

  if (loading || prefLoading) {
    return <LoadingDisplay />;
  }
  if (data?.type !== "success" || prefectures?.type !== "success") {
    return <ErrorDisplay refetch={refetch} />;
  }
  return (
    <div>
      <div className={styles.control}>
        <Dropdown
          label={"データ"}
          values={labels}
          selected={label}
          onChange={setLabel}
        />
        <Button
          size={"large"}
          variant={"secondary"}
          className={styles.button}
          onClick={() => setRange(undefined)}
        >
          <MdRestartAlt />
          <span>リセット</span>
        </Button>
      </div>
      <Graph data={graphData} range={range} onRangeChange={setRange} />
    </div>
  );
};

const LoadingDisplay: FC = () => {
  return (
    <div className={styles.loading}>
      <LoadingSpinner />
      <span>人口データを読み込んでいます...</span>
    </div>
  );
};

type ErrorProps = {
  refetch: () => void;
};

const ErrorDisplay: FC<ErrorProps> = ({ refetch }) => {
  return (
    <div className={styles.error}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          人口データの取得に
          <wbr />
          失敗しました
        </h2>
        <div className={styles.control}>
          <Button size={"medium"} variant={"primary"} onClick={() => refetch()}>
            再試行
          </Button>
        </div>
      </div>
    </div>
  );
};
