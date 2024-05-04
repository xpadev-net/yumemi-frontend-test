/**
 * original source: https://github.com/n3r4zzurr0/svg-spinners/
 * licensed under MIT
 * https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE
 */

import { FC } from "react";

import styles from "./loading-spinner.module.scss";

type Props = {
  className?: string;
};

export const LoadingSpinner: FC<Props> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`${styles.svg} ${className}`}
    >
      <g className={styles.spinner_V8m1}>
        <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3" />
      </g>
    </svg>
  );
};
