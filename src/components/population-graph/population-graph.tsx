import { FC, useMemo, useState } from "react";
import { MdRestartAlt } from "react-icons/md";

import { Button } from "@/components/button";
import { Dropdown } from "@/components/dropdown";
import { ErrorBanner } from "@/components/error-banner";
import { Graph } from "@/components/graph";
import { LoadingSpinner } from "@/components/loading-spinner";
import { usePopulationComposition, usePrefectures } from "@/hooks";
import { transformPopulation } from "@/lib";

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
    <section>
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
    </section>
  );
};

const LoadingDisplay: FC = () => {
  return (
    <section>
      <div className={styles.loading}>
        <LoadingSpinner />
        <span>人口データを読み込んでいます...</span>
      </div>
    </section>
  );
};

type ErrorProps = {
  refetch: () => void;
};

const ErrorDisplay: FC<ErrorProps> = ({ refetch }) => {
  return (
    <section>
      <ErrorBanner
        title={
          <>
            人口データの取得に
            <wbr />
            失敗しました
          </>
        }
      >
        <div className={styles.control}>
          <Button size={"medium"} variant={"primary"} onClick={() => refetch()}>
            再試行
          </Button>
        </div>
      </ErrorBanner>
    </section>
  );
};
