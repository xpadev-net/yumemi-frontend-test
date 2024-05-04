import { ZErrorResponse } from "@/@types/api/error.ts";
import {
  TPopulationCompositionResponse,
  ZPopulationCompositionResponse,
} from "@/@types/api/populationComposition.ts";
import { TApiResponse } from "@/@types/api/response";
import { requests } from "@/lib/requests.ts";

const cache: Record<
  string,
  Record<number, TPopulationCompositionResponse>
> = {};

export const getPopulationCompositionPerYear = async (
  apikey: string,
  prefCode: number,
  forceUpdate = false,
): Promise<TApiResponse<TPopulationCompositionResponse>> => {
  const cacheItem = cache[apikey]?.[prefCode];
  if (!forceUpdate && cacheItem) {
    return {
      type: "success",
      data: cacheItem,
    };
  }

  const data = await requests(
    apikey,
    `/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
  );
  const result = ZPopulationCompositionResponse.safeParse(data);
  if (result.success) {
    cache[apikey] ??= {};
    cache[apikey][prefCode] = result.data;
    return {
      type: "success",
      data: result.data,
    };
  }
  delete cache[apikey][prefCode];
  const error = ZErrorResponse.safeParse(data);
  if (error.success) {
    return {
      type: "error",
      data: error.data,
    };
  }
  return {
    type: "unknown",
    data,
  };
};
