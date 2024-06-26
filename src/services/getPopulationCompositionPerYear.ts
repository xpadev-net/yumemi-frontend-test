import { ZErrorResponse } from "@/@types/api/error";
import {
  TPopulationCompositionResponse,
  ZPopulationCompositionResponse,
} from "@/@types/api/populationComposition";
import { TApiResponse } from "@/@types/api/response";
import { requests } from "@/lib";

export const getPopulationCompositionPerYear = async (
  apikey: string,
  prefCode: number,
): Promise<TApiResponse<TPopulationCompositionResponse>> => {
  const data = await requests(
    apikey,
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
