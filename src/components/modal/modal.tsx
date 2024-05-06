import { FC, ReactNode } from "react";

import styles from "./modal.module.scss";

type Props = {
  children?: ReactNode;
  onBackgroundClick?: () => void;
};

export const Modal: FC<Props> = ({ children, onBackgroundClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background} onClick={onBackgroundClick} />
      <dialog className={styles.body}>{children}</dialog>
    </div>
  );
};
