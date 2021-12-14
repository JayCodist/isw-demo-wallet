import { useMemo, useState } from "react";
import { resources } from "../../utils/resources";
import Button from "../button/Button";
import styles from "./SecretDisplay.module.scss";

const getCensorDisplay: (str: string) => string = str => {
  return str.replace(/./g, "*");
};

let timerRef: any;

interface SecretDisplayProps {
  value: string | number;
  className?: string;
}
const SecretDisplay: (props: SecretDisplayProps) => JSX.Element = ({
  value,
  className
}) => {
  const [shouldCensor, setShouldCensor] = useState(true);
  const [justCopied, setJustCopied] = useState(false);

  const displayValue = useMemo(() => {
    return shouldCensor ? getCensorDisplay(String(value)) : value;
  }, [value, shouldCensor]);

  const handleCopy = async () => {
    clearTimeout(timerRef);
    await navigator.clipboard.writeText(String(value));
    setJustCopied(true);
    timerRef = setTimeout(() => setJustCopied(false), 1500);
  };

  return (
    <span className={[styles["secret-wrapper"], className].join(" ")}>
      <span className={styles.main}>{displayValue}</span>
      <span className={styles.controls}>
        <Button
          type="transparent"
          onClick={() => setShouldCensor(!shouldCensor)}
          startIcon={
            shouldCensor
              ? resources.icons.EYE_SOLID
              : resources.icons.EYE_SLASH_SOLID
          }
          size="small"
          className="toggle-secret"
        >
          {shouldCensor ? "SHOW" : "HIDE"}
        </Button>
        <span className={styles["clipboard-wrapper"]}>
          <Button
            type="transparent"
            startIcon={resources.icons.CLIPBOARD_SOLID}
            size="small"
            onClick={handleCopy}
            className="clipboard-copy"
          >
            COPY
          </Button>
          <span
            className={[styles.copied, justCopied && styles.active].join(" ")}
          >
            Copied!
          </span>
        </span>
      </span>
    </span>
  );
};

export default SecretDisplay;
