import { ZErrorResponse } from "@/@types/api/error.ts";
import {
  TPrefectureResponse,
  ZPrefectureResponse,
} from "@/@types/api/prefectures.ts";
import { TApiResponse } from "@/@types/api/response";
import { requests } from "@/lib/requests.ts";

let cache: TPrefectureResponse | undefined = undefined;

export const getPrefectures = async (
  forceUpdate = false,
): Promise<TApiResponse<TPrefectureResponse>> => {
  if (!forceUpdate && cache) {
    return {
      type: "success",
      data: cache,
    };
  }

  const data = await requests(`/prefectures`);
  const result = ZPrefectureResponse.safeParse(data);
  if (result.success) {
    cache = result.data;
    return {
      type: "success",
      data: result.data,
    };
  }
  cache = undefined;
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
