export const env = {
  API_ENDPOINT: `${import.meta.env.VITE_API_ENDPOINT}`,
} as const satisfies Record<string, string>;
