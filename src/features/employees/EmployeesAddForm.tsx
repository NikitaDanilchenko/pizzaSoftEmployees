import { useAppSelector } from "@app/store/store";
import { useNavigate } from "react-router-dom";
import { EmployeesModalForm } from "./EmployeesForm/ui/EmployeesModalForm";

export const EmployeesAddForm = () => {
  const employees = useAppSelector(state => state.employeesReducer.employees);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <div>
      <EmployeesModalForm employees={employees} onClose={handleClose} />
    </div>
  );
};
