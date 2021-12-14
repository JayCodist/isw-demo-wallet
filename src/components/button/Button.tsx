import { Link } from "@reach/router";
import { CSSProperties, FunctionComponent, MouseEventHandler } from "react";
import { resources } from "../../utils/resources";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: string | number | JSX.Element;
  onClick?: MouseEventHandler;
  type?: "primary" | "accent" | "plain" | "transparent";
  style?: CSSProperties;
  loading?: boolean;
  url?: string;
  size?: "small" | "default" | "large";
  minWidth?: boolean;
  className?: string;
  danger?: boolean;
  startIcon?: string;
  iconOnly?: boolean;
  disabled?: boolean;
  buttonType?: "button" | "submit" | "reset";
  tooltip?: string;
  id?: string;
}

const Button: FunctionComponent<ButtonProps> = props => {
  const {
    children,
    onClick,
    type,
    style,
    loading,
    url,
    size,
    minWidth,
    className,
    danger,
    startIcon,
    iconOnly,
    disabled,
    buttonType,
    tooltip,
    id
  } = props;

  if (url && !(loading || disabled)) {
    return (
      <Link to={url} id={id}>
        <span
          className={[
            styles.button,
            styles[type || "primary"],
            styles[size as string],
            minWidth && styles["min-width"],
            danger && styles.danger,
            iconOnly && styles["icon-only"],
            disabled && styles.disabled,
            className
          ].join(" ")}
          style={style}
          title={tooltip}
        >
          {startIcon && (
            <img
              alt="button icon"
              src={startIcon}
              className={styles["start-icon"]}
            />
          )}
          {children}
        </span>
      </Link>
    );
  }

  return (
    <button
      className={[
        styles.button,
        styles[type || "primary"],
        styles[size as string],
        minWidth && styles["min-width"],
        loading && styles.loading,
        danger && styles.danger,
        iconOnly && styles["icon-only"],
        disabled && styles.disabled,
        className
      ].join(" ")}
      onClick={onClick}
      type={buttonType || "button"}
      style={style}
      disabled={loading || disabled}
      title={tooltip}
      id={id}
    >
      {startIcon && (
        <img
          alt="button icon"
          src={startIcon}
          className={styles["start-icon"]}
        />
      )}
      {children}
      <img
        src={resources.images.LOADING_WHITE}
        alt="loading"
        className={[styles.loader, loading && styles.active].join(" ")}
      />
    </button>
  );
};

export default Button;
