import { FunctionComponent } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  onChange: (checked: boolean) => void;
  text?: string | JSX.Element | number;
  responsive?: boolean;
  name?: string;
  checked: boolean;
}

const Checkbox: FunctionComponent<CheckboxProps> = props => {
  const { onChange = () => {}, text, responsive, name, checked } = props;

  return (
    <label
      className={[styles.wrapper, responsive && styles.responsive].join(" ")}
    >
      <input
        name={name}
        checked={checked}
        className={styles.checkbox}
        onChange={e => onChange(e.target.checked)}
        type="checkbox"
      />
      <span className={styles["check-wrapper"]}>
        <span className={styles["check-icon"]} />
      </span>
      {text && <span className={styles.text}>{text}</span>}
    </label>
  );
};

export default Checkbox;
