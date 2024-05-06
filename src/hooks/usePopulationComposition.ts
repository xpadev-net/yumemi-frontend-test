import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { TErrorResponse } from "@/@types/api/error.ts";
import {
  TPopulationCompositionResponse,
  TPopulationData,
} from "@/@types/api/populationComposition.ts";
import { TApiResponse } from "@/@types/api/response";
import { populationCompositionCacheAtom } from "@/atoms/cache-atom.ts";
import { useApiKey } from "@/lib/localStorage.ts";
import { getPopulationCompositionPerYear } from "@/services";

export const usePopulationComposition = (prefCodes: number[]) => {
  const { apiKey } = useApiKey();

  const [cache, setCache] = useAtom(populationCompositionCacheAtom);
  const [data, setData] = useState<TApiResponse<TPopulationData>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (forceUpdate = true) => {
      setLoading(true);
      if (!apiKey) {
        setData({
          type: "error",
          data: {
            message: "APIキーが設定されていません",
            statusCode: -1,
            description: "APIキーを設定してください",
          },
        });
        setLoading(false);
        return;
      }
      const response = await Promise.all(
        prefCodes.map(async (prefCode) => {
          if (!forceUpdate && cache[apiKey]?.[prefCode]) {
            return {
              data: {
                type: "success",
                data: cache[apiKey][prefCode],
              },
              prefCode,
            };
          }
          const data = await getPopulationCompositionPerYear(apiKey, prefCode);
          setCache((prev) => {
            prev[apiKey] ??= {};
            if (data.type === "success") {
              prev[apiKey][prefCode] = data.data;
            } else if (prev[apiKey][prefCode]) {
              delete prev[apiKey][prefCode];
            } else {
              return prev;
            }
            return { ...prev };
          });
          return {
            data,
            prefCode,
          };
        }),
      );
      const isFailed = response.find((res) => res.data.type !== "success");
      if (isFailed) {
        setData({
          type: "error",
          data: isFailed.data.data as TErrorResponse,
        });
      } else {
        const data = response.reduce(
          (acc, res) => {
            if (res.data.type !== "success") return acc;
            return {
              ...acc,
              [res.prefCode]: res.data.data,
            };
          },
          {} as Record<string, TPopulationCompositionResponse>,
        );
        setData({
          type: "success",
          data,
        });
      }
      setLoading(false);
    },
    [prefCodes, apiKey, cache, setCache],
  );

  useEffect(() => {
    void fetchData(false);
  }, [fetchData, apiKey]);

  return { data, loading, refetch: fetchData };
};
