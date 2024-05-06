import { z } from "zod";

export const ZErrorResponse = z.union([
  z.object({
    statusCode: z.preprocess(Number, z.number()),
    message: z.string(),
    description: z.string(),
  }),
  z.preprocess(Number, z.number()),
]);
export type TErrorResponse = z.infer<typeof ZErrorResponse>;
