import cn from "classnames";
import style from "./dropdownMenu.module.scss";

interface DropdownMenuProps<T> {
  items?: T[];
  selectedItem: T | null;
  onSelect: (item: T) => void;
  onClick: () => void;
}

export const DropdownMenu = <T,>({ items, selectedItem, onSelect, onClick }: DropdownMenuProps<T>) => {
  return (
    <div className={style.dropdownMenu} onClick={onClick}>
      {items &&
        items.map((item, index) => {
          const isSelected = selectedItem === item;
          return (
            <span
              key={index}
              className={cn(style.dropdownMenu_item, {
                [style.dropdownMenu_item__selected]: isSelected,
              })}
              onClick={() => onSelect(item)}>
              {String(item)}
            </span>
          );
        })}
    </div>
  );
};
