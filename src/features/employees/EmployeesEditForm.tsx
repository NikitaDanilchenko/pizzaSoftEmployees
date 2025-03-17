import { useAppSelector } from "@app/store/store";
import { useNavigate, useParams } from "react-router-dom";
import { IEmployees } from "@entities/employees/model/types";
import { EmployeesModalForm } from "./EmployeesForm/ui/EmployeesModalForm";

export const EmployeesEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const { employees, loading } = useAppSelector(state => state.employeesReducer);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  const card: IEmployees | undefined = employees.find(employee => employee.id == id);
  if (!card) {
    return <>нет карты</>;
  }
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <div>
      <EmployeesModalForm card={card} employees={employees} onClose={handleClose} />
    </div>
  );
};
