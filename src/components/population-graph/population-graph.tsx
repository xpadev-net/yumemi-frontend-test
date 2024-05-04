import { FC, useState } from "react";

import { Button } from "@/components/button/button.tsx";
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

  const label = "総人口";

  if (loading || prefLoading) {
    return <LoadingDisplay />;
  }
  if (data?.type !== "success" || prefectures?.type !== "success") {
    return <ErrorDisplay refetch={refetch} />;
  }
  const graphData = transformPopulation(
    prefectures.data.result,
    data.data,
    label,
  );
  return (
    <div>
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
