import { useAppSelector, RootState } from "@app/store/store";
import { IEmployees } from "@entities/employees/model/types";
import { EmployeesFilteredRole } from "@features/employees/index";
import { EmployeesFilteredStatus } from "@features/employees/index";
import { Button } from "@shared/ui/Button";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowIcon from "@assets/images/Arrow.svg?react";
import cn from "classnames";
import style from "./employeesMenu.module.scss";

interface EmployeesMenuProps {
  selectedRole: IEmployees["role"] | null;
  setSelectedRole: (role: IEmployees["role"] | null) => void;
  selectedIsArchive: IEmployees["isArchive"] | null;
  setSelectedIsArchive: (archive: IEmployees["isArchive"] | null) => void;
  handleSort: (field: "name" | "birthday") => void;
  sort: "ASC" | "DESC" | null;
}

export const EmployeesMenu = (props: EmployeesMenuProps) => {
  const { selectedRole, setSelectedRole, selectedIsArchive, setSelectedIsArchive, handleSort, sort } = props;
  const employees = useAppSelector((state: RootState) => state.employeesReducer.employees);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddEmployee = () => {
    navigate("add", { state: { backgroundLocation: location } });
  };

  return (
    <div className={style.employees_menu}>
      <div className={style.employees_scroll}>
        <EmployeesFilteredRole selectedRole={selectedRole} setSelectedRole={setSelectedRole} employees={employees} />
        <EmployeesFilteredStatus
          selectedArchiveFilter={selectedIsArchive}
          setSelectedIsArchive={setSelectedIsArchive}
        />
        <div className={style.formSelector} onClick={() => handleSort("name")}>
          <span>Имя</span>
          <ArrowIcon className={cn(style.icon, sort === "ASC" ? style["icon_down"] : style["icon_up"])} />
        </div>
        <div className={style.formSelector} onClick={() => handleSort("birthday")}>
          <span>Дата рождения</span>
          <ArrowIcon className={cn(style.icon, sort === "ASC" ? style["icon_down"] : style["icon_up"])} />
        </div>
      </div>
      <div className={style.addButtonContainer}>
        <Button onClick={handleAddEmployee}>Добавить</Button>
      </div>
    </div>
  );
};
