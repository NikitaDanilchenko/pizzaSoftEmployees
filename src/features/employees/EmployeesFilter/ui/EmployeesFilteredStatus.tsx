import { Checkbox } from "@shared/ui/Checkbox";
import Dropdown from "@shared/ui/Dropdown/Dropdown";
import style from "./employeesFiltered.module.scss";
import { useClickOutside } from "@shared/hooks/useClickOutside";
import { IEmployees } from "@entities/employees/model/types";
import { useOpen } from "@shared/hooks/useOpen";
import ArrowIcon from "@assets/images/Arrow.svg?react";
import cn from "classnames";

interface EmployeesFilteredStatusProps {
  selectedArchiveFilter: IEmployees["isArchive"] | null;
  setSelectedIsArchive: (filter: IEmployees["isArchive"] | null) => void;
}

export const EmployeesFilteredStatus = (props: EmployeesFilteredStatusProps) => {
  const { selectedArchiveFilter, setSelectedIsArchive } = props;
  const { handleClose, isOpen, handleCloseOpen } = useOpen();

  const ref = useClickOutside<HTMLDivElement>(handleClose);

  return (
    <div className={style.formContainer} ref={ref}>
      <div onClick={handleCloseOpen} className={style.formSelector}>
        <span>Статус</span>
        <ArrowIcon className={cn(style.icon, isOpen ? style["icon-down"] : style["icon-up"])} />
      </div>
      {isOpen && (
        <Dropdown>
          <Checkbox
            label={<span>В архиве</span>}
            checked={selectedArchiveFilter ?? false}
            onChange={e => {
              setSelectedIsArchive(e.currentTarget.checked);
              handleClose();
            }}
          />
        </Dropdown>
      )}
    </div>
  );
};
