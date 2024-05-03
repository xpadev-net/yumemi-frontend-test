import { SafeParseReturnType } from "zod";

import {
  TPrefectureResponse,
  ZPrefectureResponse,
} from "@/@types/api/prefectures.ts";
import { requests } from "@/lib/requests.ts";

export const getPrefectures = async (): Promise<
  SafeParseReturnType<unknown, TPrefectureResponse>
> => {
  const data = await requests(`/prefectures`);
  return ZPrefectureResponse.safeParse(data);
};
