import { useCallback, useRef } from "react";

import { useApiKey } from "@/lib/localStorage.ts";

import styles from "./api-key-modal.module.scss";

export const ApiKeyModal = () => {
  const { apiKey, setApiKey } = useApiKey();
  const inputRef = useRef<HTMLInputElement>(null);
  const save = useCallback(() => {
    setApiKey(inputRef.current?.value);
    return false;
  }, [inputRef, setApiKey]);
  if (apiKey) {
    return null;
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.body}>
        <h1 className={styles.title}>RESASのAPIキーを入力してください</h1>
        <form onSubmit={save}>
          <input
            type="text"
            ref={inputRef}
            placeholder={"abcdefg0123456789"}
            required={true}
          />
          <button type={"submit"}>保存</button>
        </form>
      </div>
    </div>
  );
};
