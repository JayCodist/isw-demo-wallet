import { ChangeEventHandler, FunctionComponent } from "react";
import { resources } from "../../utils/resources";
import Button from "../button/Button";
import styles from "./Input.module.scss";

export interface InputValidation {
  maxLength?: number;
  transform?: (inputValue: string) => string;
  required?: boolean;
}

interface InputProps {
  icon?: string;
  startSymbol?: string | JSX.Element;
  onChange: (value: string) => void;
  value: string | number;
  placeholder?: string;
  name?: string;
  dimmed?: boolean;
  endSymbol?: string | JSX.Element;
  responsive?: boolean;
  number?: boolean;
  type?: "email" | "password" | "text" | "search" | "number";
  required?: boolean;
  className?: string;
  onInputClear?: () => void;
  disabled?: boolean;
  noBorder?: boolean;
  refValue?: any;
  onBlur?: () => void;
  inputValidation?: InputValidation;
  id?: string;
}

const Input: FunctionComponent<InputProps> = props => {
  const {
    icon,
    startSymbol,
    onChange,
    value,
    placeholder,
    name,
    dimmed,
    endSymbol,
    responsive,
    number,
    type,
    required,
    className,
    onInputClear,
    disabled,
    noBorder,
    refValue,
    onBlur,
    inputValidation,
    id
  } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (onChange) {
      let output = e.target.value;
      if (number) {
        output = Number(output.replace(/\D/g, "")).toLocaleString();
        output = output === "0" ? "" : output;
      }
      if (inputValidation) {
        if (inputValidation.transform) {
          output = inputValidation.transform(output);
        }
        if (inputValidation.maxLength) {
          output = output.slice(0, inputValidation.maxLength);
        }
      }
      onChange(output);
    }
  };

  const displayValue =
    number && typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div
      className={[
        styles.wrapper,
        icon ? styles["with-icon"] : "",
        noBorder && styles["no-border"],
        responsive && styles.responsive,
        className
      ].join(" ")}
    >
      {icon && <img alt="input icon" src={icon} className={styles.icon} />}
      {startSymbol && (
        <span className={[styles.symbol, styles.start].join(" ")}>
          <span>{startSymbol}</span>
        </span>
      )}
      <input
        className={[
          styles.input,
          icon ? styles["with-icon"] : "",
          dimmed ? styles.dimmed : "",
          startSymbol && styles["padding-left"],
          onInputClear && styles["padding-right"]
        ].join(" ")}
        onChange={handleChange}
        value={displayValue || ""}
        name={name}
        placeholder={placeholder}
        type={type || "text"}
        required={required || inputValidation?.required}
        disabled={disabled}
        ref={refValue}
        onBlur={onBlur}
        id={id}
      />
      {endSymbol && (
        <span className={[styles.symbol, styles.end].join(" ")}>
          <span>{endSymbol}</span>
        </span>
      )}
      {onInputClear && Boolean(value) && (
        <span className={[styles.symbol, styles.end].join(" ")}>
          <Button type="transparent" iconOnly>
            <img
              alt="clear"
              onClick={onInputClear}
              src={resources.icons.CLEAR}
              className={styles["clear-icon"]}
            />
          </Button>
        </span>
      )}
    </div>
  );
};

interface TextAreaProps {
  icon?: string;
  onChange: (value: string) => void;
  value: string | number;
  placeholder?: string;
  name?: string;
  dimmed?: boolean;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  refValue?: any;
  onBlur?: () => void;
  inputValidation?: InputValidation;
  id?: string;
}

export const TextArea: FunctionComponent<TextAreaProps> = props => {
  const {
    icon,
    onChange,
    value,
    placeholder,
    name,
    dimmed,
    required,
    className,
    disabled,
    refValue,
    onBlur,
    inputValidation,
    id
  } = props;

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    let output = e.target.value;
    if (inputValidation) {
      if (inputValidation.transform) {
        output = inputValidation.transform(output);
      }
      if (inputValidation.maxLength) {
        output = output.slice(0, inputValidation.maxLength);
      }
    }
    onChange(output);
  };

  return (
    <div
      className={[styles.wrapper, icon ? styles["with-icon"] : ""].join(" ")}
    >
      {icon && <img alt="input icon" src={icon} className={styles.icon} />}
      <textarea
        className={[
          styles.input,
          icon ? styles["with-icon"] : "",
          dimmed ? styles.dimmed : "",
          className
        ].join(" ")}
        rows={6}
        onChange={handleChange}
        value={value || ""}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        ref={refValue}
        onBlur={onBlur}
        id={id}
      />
    </div>
  );
};

export default Input;
