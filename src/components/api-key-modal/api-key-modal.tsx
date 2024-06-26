import { useCallback, useRef } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { TextInput } from "@/components/text-input";
import { useApiKey } from "@/lib";

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
    <Modal>
      <h1 className={styles.title}>RESASのAPIキーを入力してください</h1>
      <form onSubmit={save} className={styles.form}>
        <TextInput
          label={"APIキー"}
          placeholder={"abcdefg123456789"}
          required={true}
          ref={inputRef}
        />
        <div className={styles.buttons}>
          <Button size={"medium"} variant={"primary"} type={"submit"}>
            保存
          </Button>
        </div>
      </form>
    </Modal>
  );
};
