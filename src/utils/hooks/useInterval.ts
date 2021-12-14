import { useEffect, useRef } from "react";

const useInterval: (callback?: () => any, delay?: number | null) => void = (
  callback,
  delay
) => {
  const savedCallback = useRef<() => any | undefined>();

  // Remember latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval for the callback, using the delay
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return () => {};
  }, [delay]);
};

export default useInterval;
