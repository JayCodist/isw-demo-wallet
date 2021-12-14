import { useState, useRef, useEffect, useMemo, MouseEvent } from "react";
import styles from "./ContextMenu.module.scss";

interface Option {
  label: string;
  onClick: () => void;
}

const ContextMenu: (props: { options: Option[] }) => JSX.Element = props => {
  const [showDropdown, setShowDropdown] = useState(false);
  const contextRef = useRef(null);

  const handleClose: EventListener = e => {
    const dropdown = contextRef.current as HTMLElement | null;
    if (!dropdown || !dropdown.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClose);
    return () => window.removeEventListener("mousedown", handleClose);
  }, []);

  const { options: _options } = props;

  const options = useMemo(() => {
    return _options.map(option =>
      typeof option === "object"
        ? option
        : { label: String(option), onClick: () => {} }
    );
  }, [_options]);

  const handleSelect = ({ onClick = () => {} }, e: MouseEvent) => {
    onClick();
    setShowDropdown(false);
    e.stopPropagation();
  };

  return (
    <div
      className={styles["menu-wrapper"]}
      onClick={() => setShowDropdown(true)}
      ref={contextRef}
      role="menu"
    >
      <span
        className={[styles.dots, showDropdown ? styles.active : ""].join(" ")}
      >
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </span>
      <div
        className={[
          styles["options-wrapper"],
          showDropdown ? styles.active : ""
        ].join(" ")}
      >
        {options.map((option, i) => (
          <div
            key={i}
            className={styles.option}
            onClick={e => handleSelect(option, e)}
            role="menuitem"
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContextMenu;
