import { env } from "@/env";

export const requests = async (
  apiKey: string,
  input: string,
  init?: RequestInit | undefined,
): Promise<unknown> => {
  const req = await fetch(`${env.API_ENDPOINT}${input}`, {
    ...(init ?? {}),
    headers: {
      "X-API-KEY": apiKey,
      ...(init?.headers ?? {}),
    },
  });
  return await req.json();
};
