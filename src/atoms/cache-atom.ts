import { atom } from "jotai";

import { TPopulationCompositionResponse } from "@/@types/api/populationComposition";
import { TPrefectureResponse } from "@/@types/api/prefectures";

export const prefectureCacheAtom = atom<Record<string, TPrefectureResponse>>(
  {},
);
export const populationCompositionCacheAtom = atom<
  Record<string, Record<number, TPopulationCompositionResponse>>
>({});
