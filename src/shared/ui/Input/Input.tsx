import { InputMask } from "@react-input/mask";
import type { Track } from "@react-input/mask";
import cn from "classnames";
import style from "./input.module.scss";
import { type ChangeEventHandler, forwardRef, type InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: boolean;
  borderless?: boolean;
  colorScheme?: "light" | "dark";
  label?: string;
  fullWidth?: boolean;
  default?: boolean;
  isError?: boolean;
  icon?: ReactNode;
  mask?: string;
  errorMessage?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  replacement?: any;
  track?: Track;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    borderless,
    colorScheme = "light",
    style: styleProp,
    onChange,
    label,
    fullWidth,
    isError,
    errorMessage,
    icon,
    mask,
    replacement,
    value,
    track,
    ...rest
  } = props;

  const classess = {
    ...styleProp,
  };

  if (props.width) {
    classess.width = props.width;
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    onChange?.(event);
  };

  return (
    <div className={className}>
      {label && <label className={style.label}>{label}</label>}
      <div>{icon}</div>
      {mask ? (
        <InputMask
          className={cn(
            style.input,
            { [style.default]: !borderless },
            { [style.error]: isError },
            { [style.borderless]: borderless },
            { [style.fullWidth]: fullWidth },
            style[colorScheme],
            className,
          )}
          mask={mask}
          ref={ref}
          replacement={replacement}
          track={track}
          type="text"
          value={value}
          onChange={handleChange}
          {...rest}
        />
      ) : (
        <input
          className={cn(
            style.input,
            { [style.default]: !borderless },
            { [style.error]: isError },
            { [style.borderless]: borderless },
            { [style.fullWidth]: fullWidth },
            style[colorScheme],
            className,
          )}
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          {...rest}
        />
      )}
      {isError && errorMessage && <span className={style.errorMessage}>{errorMessage}</span>}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
