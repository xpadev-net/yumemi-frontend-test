import { useCallback, useEffect, useState } from "react";

import { TErrorResponse } from "@/@types/api/error.ts";
import { TPopulationCompositionResponse } from "@/@types/api/populationComposition.ts";
import { TApiResponse } from "@/@types/api/response";
import { useApiKey } from "@/lib/localStorage.ts";
import { getPopulationCompositionPerYear } from "@/services";

export const usePopulationComposition = (prefCodes: number[]) => {
  const { apiKey } = useApiKey();

  const [data, setData] =
    useState<TApiResponse<Record<number, TPopulationCompositionResponse>>>();
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
          return {
            data: await getPopulationCompositionPerYear(
              apiKey,
              prefCode,
              forceUpdate,
            ),
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
    [prefCodes, apiKey],
  );

  useEffect(() => {
    void fetchData(false);
  }, [fetchData, apiKey]);

  return { data, loading, refetch: fetchData };
};
