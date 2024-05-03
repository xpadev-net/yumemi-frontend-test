import { env } from "@/env.ts";

export const requests = async (
  input: string,
  init?: RequestInit | undefined,
): Promise<unknown> => {
  const apiKey = localStorage.getItem("X-API-KEY");
  if (!apiKey) {
    throw new Error("APIキーがありません");
  }
  const req = await fetch(`${env.API_ENDPOINT}${input}`, {
    ...(init ?? {}),
    headers: {
      "X-API-KEY": apiKey,
      ...(init?.headers ?? {}),
    },
  });
  return await req.json();
};
