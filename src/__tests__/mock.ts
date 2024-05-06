import { Page, Request, Route } from "@playwright/test";

import { TErrorResponse } from "@/@types/api/error";
import { TPopulationCompositionResponse } from "@/@types/api/populationComposition";
import { TPrefectureResponse, TPrefectures } from "@/@types/api/prefectures";

export const mockRESASApi = async (page: Page) => {
  await page.route(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    prefectureMock,
  );
  await page.route(
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/**",
    populationCompositionMock,
  );
};

export const errorResponse: TErrorResponse = {
  statusCode: 403,
  message: "Forbidden",
  description: "",
};

export const prefectureData: TPrefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
  { prefCode: 3, prefName: "岩手県" },
];

export const populationCompositionData: TPopulationCompositionResponse = {
  message: null,
  result: {
    boundaryYear: 2015,
    data: [
      {
        label: "総人口",
        data: [
          { year: 1960, value: 5039206 },
          { year: 1965, value: 5171800 },
          { year: 1970, value: 5288139 },
        ],
      },
      {
        label: "年少人口",
        data: [
          { year: 1960, value: 1398933, rate: 0 },
          { year: 1965, value: 1396489, rate: 0 },
          { year: 1970, value: 1383770, rate: 0 },
        ],
      },
      {
        label: "生産年齢人口",
        data: [
          { year: 1960, value: 2977164, rate: 0 },
          { year: 1965, value: 3086284, rate: 0 },
          { year: 1970, value: 3201954, rate: 0 },
        ],
      },
      {
        label: "老年人口",
        data: [
          { year: 1960, value: 664109, rate: 0 },
          { year: 1965, value: 684027, rate: 0 },
          { year: 1970, value: 705415, rate: 0 },
        ],
      },
    ],
  },
};

const prefectureMock = async (route: Route, request: Request) => {
  const apiKey = await request.headerValue("X-API-KEY");
  if (apiKey !== "test") {
    return route.fulfill({ json: errorResponse });
  }
  const response: TPrefectureResponse = {
    message: null,
    result: prefectureData,
  };
  return route.fulfill({ json: response });
};

const populationCompositionMock = async (route: Route, request: Request) => {
  const apiKey = await request.headerValue("X-API-KEY");
  if (apiKey !== "test") {
    return route.fulfill({ json: errorResponse });
  }
  return route.fulfill({ json: populationCompositionData });
};
