import { useLayoutEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
  children: ReactNode;
  wrapperId: string;
}
export const ReactPortal = ({ children, wrapperId }: ReactPortalProps): ReactNode => {
  const [wrapperEl, setWrapperEl] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = document.getElementById(wrapperId);
    setWrapperEl(element);
  }, []);

  if (wrapperEl == null) return null;

  return createPortal(children, wrapperEl) as ReactNode;
};
