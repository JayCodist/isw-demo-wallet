import { FunctionComponent } from "react";
import styles from "./ToolTip.module.scss";

interface ToolTipProps {
  toolTip: string | JSX.Element;
  anchor: JSX.Element;
  position?: "left" | "right";
}

const ToolTip: FunctionComponent<ToolTipProps> = ({
  toolTip,
  anchor,
  position
}) => {
  return (
    <span className={[styles.wrapper, "tooltip"].join(" ")}>
      <span className={styles.anchor}>{anchor}</span>
      <span className={[styles.tooltip, styles[position || "left"]].join(" ")}>
        {toolTip}
      </span>
    </span>
  );
};

export default ToolTip;
