import cn from "classnames";
import style from "@shared/ui/Button/button.module.scss";

import { type ButtonProps } from "./types";
import { memo, type MouseEventHandler } from "react";

export const Button = memo(({ children, onClick, colorScheme = "light", ...props }: ButtonProps): React.ReactNode => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.stopPropagation();
    if (onClick == null) return;
    onClick();
  };

  return (
    <button className={cn(style.button, style[colorScheme])} onClick={handleClick} {...props}>
      {children}
    </button>
  );
});

Button.displayName = "Button";
