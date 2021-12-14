import { useNavigate } from "@reach/router";
import { FunctionComponent } from "react";
import { resources } from "../../utils/resources";
import styles from "./BackButton.module.scss";

interface BackButtonProps {
  text: string;
  className?: string;
  round?: boolean;
}

const BackButton: FunctionComponent<BackButtonProps> = props => {
  const navigte = useNavigate();

  const { text, className, round } = props;

  const handleClick = () => {
    navigte(-1);
  };

  return (
    <div
      className={[styles.wrapper, className, round && styles.round].join(" ")}
      onClick={handleClick}
      role="link"
      title={round ? text : undefined}
    >
      {round ? (
        <span className={styles["round-caret"]} />
      ) : (
        <>
          <img
            alt="go back"
            className={styles.image}
            src={resources.icons.ARROW_LEFT_SOLID}
          />
          {text && <strong className={styles.text}>{text}</strong>}
        </>
      )}
    </div>
  );
};

export default BackButton;
