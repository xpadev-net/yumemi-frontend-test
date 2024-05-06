import { TErrorResponse } from "@/@types/api/error";

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
