import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: "large" | "medium" | "small" | "XSmall";
  variant: "primary" | "secondary";
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[props.size]} ${styles[props.variant]} ${props.className}`}
    />
  );
};
