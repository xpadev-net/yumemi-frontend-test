import { ZErrorResponse } from "@/@types/api/error.ts";
import {
  TPrefectureResponse,
  ZPrefectureResponse,
} from "@/@types/api/prefectures.ts";
import { TApiResponse } from "@/@types/api/response";
import { requests } from "@/lib/requests.ts";

const cache: Record<string, TPrefectureResponse> = {};

export const getPrefectures = async (
  apikey: string,
  forceUpdate = false,
): Promise<TApiResponse<TPrefectureResponse>> => {
  const cacheItem = cache[apikey];
  if (!forceUpdate && cacheItem) {
    return {
      type: "success",
      data: cacheItem,
    };
  }

  const data = await requests(apikey, `/prefectures`);
  const result = ZPrefectureResponse.safeParse(data);
  if (result.success) {
    cache[apikey] = result.data;
    return {
      type: "success",
      data: result.data,
    };
  }
  delete cache[apikey];
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
