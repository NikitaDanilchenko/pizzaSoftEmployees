import { RootState, useAppDispatch, useAppSelector } from "@app/store/store";
import { fetchEmployees } from "@entities/employees/api/employeesApi";
import { EmployeesCard } from "@entities/employees/employeesCard/ui/EmployeesCard";
import { IEmployees } from "@entities/employees/model/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import style from "./employeesList.module.scss";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { sortEmployees } from "@shared/utils/sortEmployees";
import { useLocation, useNavigate } from "react-router-dom";
import { EmployeesMenu } from "@widgets/index";
import SearchIcon from "@assets/images/Search.svg?react";

export const EmployeesList = () => {
  const { employees, error, loading } = useAppSelector((state: RootState) => state.employeesReducer);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<IEmployees["role"] | null>(null);
  const [selectedIsArchive, setSelectedIsArchive] = useState<IEmployees["isArchive"] | null>(null);
  const [sort, setSort] = useState<"ASC" | "DESC" | null>(null);
  const [sortField, setSortField] = useState<"name" | "birthday" | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const filteredEmployees = useMemo(
    () =>
      employees.filter(employee => {
        const roleMatch = selectedRole ? employee.role === selectedRole : true;
        const archiveMatch = selectedIsArchive === null ? true : employee.isArchive === selectedIsArchive;
        const nameMatch = employee.name.toLowerCase().includes(search.toLowerCase());
        return roleMatch && archiveMatch && nameMatch;
      }),
    [employees, selectedRole, selectedIsArchive, search],
  );

  const sortedEmployees = useMemo(
    () => (sortField && sort ? sortEmployees(filteredEmployees, sortField, sort) : filteredEmployees),
    [sort, sortField, filteredEmployees],
  );

  const handleCardClick = useCallback(
    (employee: IEmployees) => {
      navigate(`edit/${employee.id}`, { state: { backgroundLocation: location } });
    },
    [navigate, location],
  );

  const handleSort = (field: "name" | "birthday") => {
    if (sortField !== field) {
      setSortField(field);
      setSort("ASC");
    } else {
      setSort(prev => (prev === "ASC" ? "DESC" : "ASC"));
    }
  };

  const handleResetAllFilters = () => {
    setSearch("");
    setSelectedRole(null);
    setSelectedIsArchive(null);
  };

  if (error) return <div>Ошибка: {error}</div>;
  if (loading) return <div>Загрузка...</div>;
  return (
    <div>
      <div className={style.wrapper}>
        <h2>Список сотрудников</h2>
        <div className={style.wrapperInput}>
          <Input value={search} placeholder="Поиск сотрудников" onChange={e => setSearch(e.target.value)} />
          <SearchIcon className={style.wrapperInputIcon} />
        </div>
        <EmployeesMenu
          selectedIsArchive={selectedIsArchive}
          setSelectedIsArchive={setSelectedIsArchive}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          handleSort={handleSort}
          sort={sort}
        />
        {filteredEmployees.length !== 0 ? (
          <div className={style.employees_lists}>
            <div className={style.employees_header}>
              <span>Name</span>
              <span>Role</span>
              <span>Number</span>
              <span></span>
              <span></span>
            </div>
            {sortedEmployees.map((employee: IEmployees) => (
              <EmployeesCard key={employee.id} employee={employee} onClick={() => handleCardClick(employee)} />
            ))}
          </div>
        ) : (
          <div className={style.noResults}>
            <span className={style.noResults_Text}>Не найдено сотрудников.</span>
            <Button colorScheme="light" onClick={handleResetAllFilters}>
              Сбросить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
