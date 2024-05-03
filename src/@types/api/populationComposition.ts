import { z } from "zod";

export const ZPopulation = z.object({
  year: z.number(),
  value: z.number(),
});
export type TPopulation = z.infer<typeof ZPopulation>;

export const ZPopulationCompositionTotal = z.object({
  label: z.literal("総人口"),
  data: z.array(ZPopulation),
});
export type TPopulationCompositionTotal = z.infer<
  typeof ZPopulationCompositionTotal
>;

export const ZPopulationCompositionPart = z.object({
  label: z.string().refine((v) => v !== "総人口"),
  data: z.array(
    ZPopulation.extend({
      rate: z.number(),
    }),
  ),
});
export type TPopulationCompositionPart = z.infer<
  typeof ZPopulationCompositionPart
>;

export const ZPopulationCompositionResponse = z.object({
  message: z.string().nullable(),
  result: z.object({
    boundaryYear: z.number(),
    data: z.array(
      z.union([ZPopulationCompositionTotal, ZPopulationCompositionPart]),
    ),
  }),
});
export type TPopulationCompositionResponse = z.infer<
  typeof ZPopulationCompositionResponse
>;
