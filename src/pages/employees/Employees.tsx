import { EmployeesList } from "@entities/employees/employeesList/ui/EmployeesList";
import { EmployeesAddForm, EmployeesEditForm } from "@features/employees";
import { Modal } from "@shared/ui/Modal/Modal";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

export const Employees = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null;
  return (
    <>
      <EmployeesList />
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="add"
            element={
              <Modal title="AddForm" onClose={() => navigate(-1)}>
                <EmployeesAddForm />
              </Modal>
            }
          />
          <Route
            path="edit/:id"
            element={
              <Modal title="EditForm" onClose={() => navigate(-1)}>
                <EmployeesEditForm />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
