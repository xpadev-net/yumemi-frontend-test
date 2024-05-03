import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "large" | "medium" | "small" | "XSmall";
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[props.variant]} ${props.className}`}
    />
  );
};
