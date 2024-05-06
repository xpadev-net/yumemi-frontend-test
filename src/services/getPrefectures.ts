import { ZErrorResponse } from "@/@types/api/error";
import {
  TPrefectureResponse,
  ZPrefectureResponse,
} from "@/@types/api/prefectures";
import { TApiResponse } from "@/@types/api/response";
import { requests } from "@/lib";

export const getPrefectures = async (
  apikey: string,
): Promise<TApiResponse<TPrefectureResponse>> => {
  const data = await requests(apikey, `/prefectures`);
  const result = ZPrefectureResponse.safeParse(data);
  if (result.success) {
    return {
      type: "success",
      data: result.data,
    };
  }
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
