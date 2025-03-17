import { ForwardedRef, forwardRef } from "react";
import style from "./dropdown.module.scss";

interface DropdownProps {
  children?: React.ReactNode;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({ children }, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={style.dropdown} ref={ref}>
      <div className={style.dropdownContainer}>
        <div>{children}</div>
      </div>
    </div>
  );
});
Dropdown.displayName = "DatePickerPopup";

export default Dropdown;
