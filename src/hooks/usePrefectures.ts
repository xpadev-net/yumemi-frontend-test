import { useEffect, useState } from "react";

import { TPrefectureResponse } from "@/@types/api/prefectures.ts";
import { TApiResponse } from "@/@types/api/response";
import { getPrefectures } from "@/services";

export const usePrefectures = () => {
  const [data, setData] = useState<TApiResponse<TPrefectureResponse>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (forceUpdate = true) => {
    setLoading(true);
    const response = await getPrefectures(forceUpdate);
    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    void fetchData(false);
  }, []);
  return { data, loading, refetch: fetchData };
};
