import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { TPrefectureResponse } from "@/@types/api/prefectures.ts";
import { TApiResponse } from "@/@types/api/response";
import { prefectureCacheAtom } from "@/atoms/cache-atom.ts";
import { useApiKey } from "@/lib/localStorage.ts";
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
        } else {
          delete prev[apiKey];
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
