import { FC } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import styles from "./dropdown.module.scss";

type Props = {
  label: string;
  required?: boolean;
  values: string[];
  selected: string;
  onChange: (value: string) => void;
};

export const Dropdown: FC<Props> = ({
  values,
  selected,
  onChange,
  label,
  required,
}) => {
  return (
    <label className={styles.wrapper}>
      <p className={styles.label}>
        <span>{label}</span>
        {required && <span className={styles.required}>必須</span>}
      </p>
      <div className={styles.container}>
        <MdOutlineKeyboardArrowDown className={styles.arrowDown} />
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className={styles.select}
        >
          {values.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
};
