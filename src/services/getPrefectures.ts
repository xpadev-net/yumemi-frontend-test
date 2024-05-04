import { ZErrorResponse } from "@/@types/api/error.ts";
import {
  TPrefectureResponse,
  ZPrefectureResponse,
} from "@/@types/api/prefectures.ts";
import { TApiResponse } from "@/@types/api/response";
import { requests } from "@/lib/requests.ts";

export const getPrefectures = async (): Promise<
  TApiResponse<TPrefectureResponse>
> => {
  const data = await requests(`/prefectures`);
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
