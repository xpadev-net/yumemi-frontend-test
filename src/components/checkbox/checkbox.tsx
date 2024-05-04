import { FC, useCallback, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

import styles from "./checkbox.module.scss";

type Props = {
  label: string;
  required: boolean;
  values: { label: string; value: string }[];
  selectedValues: string[];
  variant: "vertical" | "horizontal";
  className?: string;
  onChange?: (checkedValues: string[]) => void;
};

export const Checkbox: FC<Props> = ({
  label,
  required,
  values,
  selectedValues,
  variant,
  className,
  onChange,
}) => {
  const [isError, setIsError] = useState(false);
  const onChangeCallback = useCallback(
    (checkedValues: string[]) => {
      setIsError(required && checkedValues.length === 0);
      onChange?.(checkedValues);
    },
    [onChange, required],
  );

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <p className={styles.label}>
        <span>{label}</span>
        {required && <span className={styles.required}>必須</span>}
      </p>
      <div className={`${styles.inputs} ${styles[variant]}`}>
        {values.map((value) => (
          <CheckboxItem
            key={value.value}
            label={value.label}
            value={value.value}
            selectedValues={selectedValues}
            onChange={onChangeCallback}
            isError={isError}
          />
        ))}
      </div>
    </div>
  );
};

type ItemProps = {
  label: string;
  value: string;
  selectedValues: string[];
  onChange?: (checkedValues: string[]) => void;
  isError?: boolean;
};

const CheckboxItem: FC<ItemProps> = ({
  label,
  value,
  selectedValues,
  onChange,
  isError,
}) => {
  const isChecked = selectedValues.includes(value);

  const onClick = () => {
    if (isChecked) {
      onChange?.(selectedValues.filter((v) => v !== value));
    } else {
      onChange?.([...selectedValues, value]);
    }
  };

  return (
    <button
      className={`${styles.input} ${isError && styles.error}`}
      onClick={onClick}
    >
      {isChecked ? (
        <MdCheckBox className={`${styles.checkbox} ${styles.checked}`} />
      ) : (
        <MdCheckBoxOutlineBlank className={styles.checkbox} />
      )}
      <span className={styles.label}>{label}</span>
    </button>
  );
};
