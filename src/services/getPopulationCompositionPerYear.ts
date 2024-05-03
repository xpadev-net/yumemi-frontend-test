import { SafeParseReturnType } from "zod";

import {
  TPopulationCompositionResponse,
  ZPopulationCompositionResponse,
} from "@/@types/api/populationComposition.ts";
import { requests } from "@/lib/requests.ts";

export const getPopulationCompositionPerYear = async (
  prefCode: number,
): Promise<SafeParseReturnType<unknown, TPopulationCompositionResponse>> => {
  const data = await requests(
    `/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
  );
  return ZPopulationCompositionResponse.safeParse(data);
};
