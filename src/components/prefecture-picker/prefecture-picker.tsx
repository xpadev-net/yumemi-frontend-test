import { FC, useCallback, useMemo } from "react";

import { Button } from "@/components/button/button.tsx";
import { Checkbox } from "@/components/checkbox/checkbox.tsx";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner.tsx";
import { usePrefectures } from "@/hooks/usePrefectures.ts";
import { useApiKey } from "@/lib/localStorage.ts";

import styles from "./prefecture-picker.module.scss";

type Props = {
  selectedPrefectureIds: string[];
  onChange?: (selectedPrefectureIds: string[]) => void;
};

export const PrefecturePicker: FC<Props> = ({
  onChange,
  selectedPrefectureIds,
}) => {
  const { data: prefectures, loading, refetch } = usePrefectures();
  const { setApiKey } = useApiKey();

  const values = useMemo(() => {
    if (prefectures?.type !== "success") return undefined;
    return prefectures.data.result.map(({ prefCode, prefName }) => ({
      label: prefName,
      value: `${prefCode}`,
    }));
  }, [prefectures]);

  const removeApikey = useCallback(() => {
    setApiKey();
  }, [setApiKey]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
        <span>都道府県データを読み込んでいます...</span>
      </div>
    );
  }

  if (!values) {
    return (
      <div className={styles.error}>
        <div className={styles.container}>
          <h2>都道府県データの取得に失敗しました</h2>
          <div className={styles.control}>
            <Button
              size={"medium"}
              variant={"secondary"}
              onClick={removeApikey}
            >
              APIキーを変更
            </Button>
            <Button
              size={"medium"}
              variant={"primary"}
              onClick={() => refetch()}
            >
              再試行
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Checkbox
        label={"都道府県"}
        required={true}
        values={values}
        selectedValues={selectedPrefectureIds}
        variant={"horizontal"}
        onChange={onChange}
      />
    </div>
  );
};
