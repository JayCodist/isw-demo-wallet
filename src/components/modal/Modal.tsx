import { useRef, useEffect, ReactNode } from "react";
import { Option } from "../select/Select";
import styles from "./Modal.module.scss";

export interface ModalProps {
  children?: ReactNode;
  visible: boolean;
  cancel?: (payload?: Option) => void;
  isConfirm?: boolean;
  className?: string;
  size?: "default" | "small";
  ignoreBackdropClicks?: boolean;
}

const Modal: (props: ModalProps) => JSX.Element = props => {
  const {
    children,
    visible,
    cancel = () => {},
    isConfirm,
    className,
    size,
    ignoreBackdropClicks
  } = props;
  const modalRef = useRef(null);
  const visibleRef = useRef(visible);
  const ignoreBackdropClicksRef = useRef(ignoreBackdropClicks);

  visibleRef.current = visible;
  ignoreBackdropClicksRef.current = ignoreBackdropClicks;

  const handleClose = (e: MouseEvent) => {
    const modalBody = modalRef.current as HTMLElement | null;
    if (visibleRef.current && !ignoreBackdropClicksRef.current) {
      if (!modalBody || !modalBody.contains(e.target as Node)) {
        cancel();
      }
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (visibleRef.current && e.key === "Escape") {
      cancel();
    }
  };

  useEffect(() => {
    if (!isConfirm) {
      window.addEventListener("mousedown", handleClose);
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.removeEventListener("mousedown", handleClose);
        window.removeEventListener("keydown", handleEscape);
      };
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div
      className={[
        styles.backdrop,
        visible && styles.active,
        isConfirm && styles["confirm-backdrop"],
        "modal-backdrop"
      ].join(" ")}
    >
      <div
        ref={modalRef}
        className={[
          styles["modal-wrapper"],
          visible && styles.active,
          isConfirm && styles.confirm,
          styles[size || "default"],
          className
        ].join(" ")}
      >
        {children}
        <div
          onClick={() => cancel()}
          className={[styles["close-icon"], "modal-close"].join(" ")}
          role="button"
        >
          <div className={styles.bar} />
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
