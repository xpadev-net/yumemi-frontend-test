import { z } from "zod";

export const ZPrefecture = z.object({
  prefCode: z.number(),
  prefName: z.string(),
});
export type TPrefecture = z.infer<typeof ZPrefecture>;

export const ZPrefectures = z.array(ZPrefecture);
export type TPrefectures = z.infer<typeof ZPrefectures>;

export const ZPrefectureResponse = z.object({
  message: z.string().nullable(),
  result: ZPrefectures,
});
export type TPrefectureResponse = z.infer<typeof ZPrefectureResponse>;
