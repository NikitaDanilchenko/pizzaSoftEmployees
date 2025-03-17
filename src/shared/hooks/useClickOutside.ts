import { useEffect, useRef, type RefObject } from "react";

export const useClickOutside = <T extends HTMLElement>(callback: VoidFunction): RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (ref.current != null && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [callback]);

  return ref;
};
