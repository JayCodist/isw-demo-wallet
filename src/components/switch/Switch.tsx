import { FunctionComponent } from "react";
import styles from "./Switch.module.scss";

interface SwitchProps {
  onChange: (checked: boolean) => void;
  text?: string | number | JSX.Element;
  responsive?: boolean;
  size?: "small" | "default";
  name?: string;
  checked: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  id?: string;
  textAfterSwitch?: boolean;
}

const Switch: FunctionComponent<SwitchProps> = props => {
  const {
    onChange,
    text,
    responsive,
    size,
    name,
    checked,
    defaultChecked,
    disabled,
    id,
    textAfterSwitch
  } = props;

  return (
    <label
      className={[
        styles.wrapper,
        responsive && styles.responsive,
        styles[size || "default"]
      ].join(" ")}
    >
      <input
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        className={styles.switch}
        onChange={e => onChange(e.target.checked)}
        type="checkbox"
        disabled={disabled}
        id={id}
      />
      {text && !textAfterSwitch && <span className={styles.text}>{text}</span>}
      <span className={styles["switch-wrapper"]}>
        <span className={styles["switch-icon"]} />
      </span>
      {text && textAfterSwitch && <span className={styles.text}>{text}</span>}
    </label>
  );
};

export default Switch;
