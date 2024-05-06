import { TErrorResponse } from "@/@types/api/error.ts";

export type TApiResponse<T> =
  | {
      type: "success";
      data: T;
    }
  | {
      type: "error";
      data: TErrorResponse;
    }
  | {
      type: "unknown";
      data: unknown;
    };
