import { TPopulationData } from "@/@types/api/populationComposition";
import { TPrefectures } from "@/@types/api/prefectures";

export const transformPopulation = (
  prefectures: TPrefectures,
  data: TPopulationData,
  label: string,
) => {
  const result: { name: number; [prefName: string]: number }[] = [];
  for (const [prefCode, prefData] of Object.entries(data)) {
    const prefName = getPrefNameByCode(prefectures, prefCode);
    if (!prefName) continue;
    const population = prefData.result.data.find(
      (d) => d.label === label,
    )?.data;
    if (!population) continue;
    for (const { year, value } of population) {
      const index = result.findIndex((r) => r.name === year);
      if (index === -1) {
        result.push({ name: year, [prefName]: value });
      } else {
        result[index][prefName] = value;
      }
    }
  }
  return result;
};

const getPrefNameByCode = (prefectures: TPrefectures, prefCode: string) => {
  return prefectures.find((pref) => pref.prefCode === Number(prefCode))
    ?.prefName;
};
