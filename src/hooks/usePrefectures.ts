import { useCallback, useEffect, useState } from "react";

import { TPrefectureResponse } from "@/@types/api/prefectures.ts";
import { TApiResponse } from "@/@types/api/response";
import { useApiKey } from "@/lib/localStorage.ts";
import { getPrefectures } from "@/services";

export const usePrefectures = () => {
  const { apiKey } = useApiKey();

  const [data, setData] = useState<TApiResponse<TPrefectureResponse>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (forceUpdate = true) => {
      if (!apiKey) {
        setData({
          type: "error",
          data: {
            message: "APIキーが設定されていません",
            statusCode: -1,
            description: "APIキーを設定してください",
          },
        });
        return;
      }
      setLoading(true);
      const response = await getPrefectures(apiKey, forceUpdate);
      setData(response);
      setLoading(false);
    },
    [apiKey],
  );

  useEffect(() => {
    void fetchData(false);
  }, [fetchData]);
  return { data, loading, refetch: fetchData };
};
