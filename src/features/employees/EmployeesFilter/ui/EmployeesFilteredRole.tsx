import { IEmployees } from "@entities/employees/model/types";
import style from "./employeesFiltered.module.scss";
import { DropdownMenu } from "@shared/ui/Dropdown/DropdownMenu";
import Dropdown from "@shared/ui/Dropdown/Dropdown";
import { useClickOutside } from "@shared/hooks/useClickOutside";
import { useOpen } from "@shared/hooks/useOpen";
import ArrowIcon from "@assets/images/Arrow.svg?react";
import cn from "classnames";

interface EmployeesFilteredRoleProps {
  employees: IEmployees[];
  selectedRole: IEmployees["role"] | null;
  setSelectedRole: (role: IEmployees["role"] | null) => void;
}

export const EmployeesFilteredRole = (props: EmployeesFilteredRoleProps) => {
  const { employees, selectedRole, setSelectedRole } = props;
  const { handleClose, isOpen, handleCloseOpen } = useOpen();
  const employeesFilterItem = [...new Set(employees.map(employee => employee.role))];

  const ref = useClickOutside<HTMLDivElement>(handleClose);

  return (
    <div className={style.formContainer} ref={ref}>
      <div onClick={handleCloseOpen} className={style.formSelector}>
        <span>Выбрать должность</span>
        <ArrowIcon className={cn(style.icon, isOpen ? style["icon-down"] : style["icon-up"])} />
      </div>
      {isOpen && (
        <Dropdown>
          <DropdownMenu
            onClick={handleClose}
            items={employeesFilterItem}
            onSelect={setSelectedRole}
            selectedItem={selectedRole}
          />
        </Dropdown>
      )}
    </div>
  );
};
