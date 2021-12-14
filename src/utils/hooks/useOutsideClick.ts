import { MutableRefObject, useEffect, useRef } from "react";

const useOutsideClick: (
  onOutsideClick: () => void
) => MutableRefObject<Element | undefined> = onOutsideClick => {
  const componentToCloseRef = useRef<Element>();

  const handleClose = (e: MouseEvent) => {
    const componentToClose = componentToCloseRef.current;
    if (!componentToClose || !componentToClose.contains(e.target as Node)) {
      onOutsideClick();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClose);
    return () => window.removeEventListener("mousedown", handleClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return componentToCloseRef;
};

export default useOutsideClick;
