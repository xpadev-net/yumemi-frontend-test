import { forwardRef } from "react";

import styles from "./text-input.module.scss";

type TextInputProps = {
  label: string;
  placeholder: string;
  required: boolean;
  className?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, required, placeholder, className }, ref) => {
    return (
      <label className={`${styles.wrapper} ${className}`}>
        <p className={styles.label}>
          <span>{label}</span>
          {required && <span className={styles.required}>必須</span>}
        </p>
        <input
          className={styles.input}
          type="text"
          ref={ref}
          placeholder={placeholder}
          required={required}
        />
      </label>
    );
  },
);
