import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { TPrefectureResponse } from "@/@types/api/prefectures";
import { TApiResponse } from "@/@types/api/response";
import { prefectureCacheAtom } from "@/atoms";
import { useApiKey } from "@/lib";
import { getPrefectures } from "@/services";

export const usePrefectures = () => {
  const { apiKey } = useApiKey();

  const [cache, setCache] = useAtom(prefectureCacheAtom);
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
      if (!forceUpdate && cache[apiKey]) {
        setData({
          type: "success",
          data: cache[apiKey],
        });
        return;
      }
      setLoading(true);
      const response = await getPrefectures(apiKey);
      setCache((prev) => {
        if (response.type === "success") {
          prev[apiKey] = response.data;
        } else if (prev[apiKey]) {
          delete prev[apiKey];
        } else {
          return prev;
        }
        return { ...prev };
      });
      setData(response);
      setLoading(false);
    },
    [apiKey, cache, setCache],
  );

  useEffect(() => {
    void fetchData(false);
  }, [fetchData]);
  return { data, loading, refetch: fetchData };
};
