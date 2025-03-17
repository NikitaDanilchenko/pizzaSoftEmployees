import cn from "classnames";
import { useId } from "react";
import style from "./checkbox.module.scss";
import { type CheckboxProps } from "./types";

export const Checkbox = ({ onChange, className, label, ...rest }: CheckboxProps): React.ReactNode => {
  const id = useId();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    onChange?.(event);
  };

  return (
    <label onClick={e => e.stopPropagation()} className={style.label} htmlFor={id}>
      <input id={id} type="checkbox" onChange={onChangeHandler} {...rest} />
      <div className={cn(style.checkbox, className)}>
        <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 8.44444L6.07692 12L13 4"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </svg>
      </div>
      {label}
    </label>
  );
};
