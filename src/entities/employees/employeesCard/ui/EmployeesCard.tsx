import { useAppDispatch } from "@app/store/store";
import { IEmployees } from "@entities/employees/model/types";
import style from "./employeesCard.module.scss";
import { Checkbox } from "@shared/ui/Checkbox";
import { deleteEmployee, updateStatusEmployees } from "@entities/employees/api/employeesApi";
import DeleteIcon from "@assets/images/Delete.svg?react";
import cn from "classnames";
import { memo, useEffect, useState } from "react";

interface EmployeeCardProps {
  employee: IEmployees;
  onClick: () => void;
}

export const EmployeesCard = memo(({ employee, onClick }: EmployeeCardProps) => {
  const dispatch = useAppDispatch();

  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (deleting) {
      timeoutId = setTimeout(() => dispatch(deleteEmployee(employee)), 300);
    }
    return () => clearTimeout(timeoutId);
  }, [deleting, dispatch, employee]);

  const handleChangeIsArchive = () => {
    dispatch(updateStatusEmployees({ id: employee.id, isArchive: !employee.isArchive }));
  };

  const handleDeleteEmployee = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    setDeleting(true);
  };

  if (!employee) return null;

  return (
    <div className={style.employeeCard}>
      <div
        onClick={onClick}
        className={cn(style.employeeCardWrapper, {
          [style["border-cook"]]: employee.role === "cook",
          [style["border-driver"]]: employee.role === "driver",
          [style["border-waiter"]]: employee.role === "waiter",
          [style.deleting]: deleting,
        })}>
        <span className={style["employeeCard-name"]}>{employee.name}</span>
        <span className={style["employeeCard-role"]}>{employee.role}</span>
        <span className={style["employeeCard-phone"]}>{employee.phone}</span>
        <Checkbox
          key={employee.id}
          label={<div>В архиве</div>}
          checked={employee.isArchive}
          onChange={handleChangeIsArchive}
        />
        <div className={style.employeeCard_deleteIcon}>
          <span onClick={handleDeleteEmployee}>
            <DeleteIcon className={style.employeeCard_deleteIcon__hoverScale} />
          </span>
        </div>
      </div>
    </div>
  );
});
