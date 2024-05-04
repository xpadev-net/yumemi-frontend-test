import { useSyncExternalStore } from "react";

const localStorageApiKey = "X-API-KEY";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
};

const setApiKey = (test?: string) => {
  if (test === undefined) {
    window.localStorage.removeItem(localStorageApiKey);
  } else {
    window.localStorage.setItem(localStorageApiKey, test);
  }
  window.dispatchEvent(new Event("storage"));
};

export const useApiKey = () => {
  const apiKey =
    useSyncExternalStore(
      subscribe,
      () => localStorage.getItem(localStorageApiKey), // 現在の値を返す関数
      () => null,
    ) || undefined;

  return { apiKey, setApiKey };
};
