import { atom } from "jotai";

import { TPopulationCompositionResponse } from "@/@types/api/populationComposition.ts";
import { TPrefectureResponse } from "@/@types/api/prefectures.ts";

export const prefectureCacheAtom = atom<Record<string, TPrefectureResponse>>(
  {},
);
export const populationCompositionCacheAtom = atom<
  Record<string, Record<number, TPopulationCompositionResponse>>
>({});
