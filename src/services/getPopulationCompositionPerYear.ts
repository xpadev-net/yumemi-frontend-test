import { ZErrorResponse } from "@/@types/api/error.ts";
import {
  TPopulationCompositionResponse,
  ZPopulationCompositionResponse,
} from "@/@types/api/populationComposition.ts";
import { TApiResponse } from "@/@types/api/response";
import { requests } from "@/lib/requests.ts";

export const getPopulationCompositionPerYear = async (
  prefCode: number,
): Promise<TApiResponse<TPopulationCompositionResponse>> => {
  const data = await requests(
    `/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
  );
  const result = ZPopulationCompositionResponse.safeParse(data);
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
