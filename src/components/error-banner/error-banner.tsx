import { FC, ReactNode } from "react";
import { MdError } from "react-icons/md";

import styles from "./error-banner.module.scss";

type Props = {
  title: ReactNode;
  children?: ReactNode;
};

export const ErrorBanner: FC<Props> = ({ title, children }) => {
  return (
    <section className={styles.wrapper}>
      <MdError className={styles.icon} />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
};
