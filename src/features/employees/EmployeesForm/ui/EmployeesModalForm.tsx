import { useAppDispatch } from "@app/store/store";
import { addEmployeeForm, updateEmployeeForm } from "@entities/employees/api/employeesApi";
import { IEmployees } from "@entities/employees/model/types";
import { useMask } from "@react-input/mask";
import { useClickOutside } from "@shared/hooks/useClickOutside";
import { useOpen } from "@shared/hooks/useOpen";
import { Button } from "@shared/ui/Button";
import { Checkbox } from "@shared/ui/Checkbox";
import Dropdown from "@shared/ui/Dropdown/Dropdown";
import { DropdownMenu } from "@shared/ui/Dropdown/DropdownMenu";
import { Input } from "@shared/ui/Input";
import { FormEvent, useState } from "react";
import style from "./employeesModalForm.module.scss";
import { trackDate } from "@shared/utils/trackDate";
import { v4 as uuidv4 } from "uuid";

interface EmployeeEditCardProps {
  card?: IEmployees;
  onClose: () => void;
  employees: IEmployees[];
}
export const EmployeesModalForm = (props: EmployeeEditCardProps) => {
  const { onClose, card, employees } = props;
  const { isOpen, handleClose, handleOpen } = useOpen();
  const dispatch = useAppDispatch();

  const [name, setName] = useState(card?.name || "");
  const [phone, setPhone] = useState(card?.phone || "");
  const [birthday, setBirthday] = useState<string>(card?.birthday || "");
  const [isArchive, setIsArchive] = useState(card?.isArchive || false);
  const [role, setRole] = useState<IEmployees["role"] | "">(card?.role ?? "");

  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [birthdayError, setBirthdayError] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);

  const employeesFilterItem = [...new Set(employees?.map(employee => employee.role))] as IEmployees["role"][];

  const isValidForm = () => {
    return name.trim() !== "" && phone.length === 17 && birthday.length === 10 && role;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidForm()) {
      if (name.trim() === "") setNameError("Имя обязательно");
      else setNameError(null);

      if (phone.trim().length < 17) setPhoneError("Некорректный номер телефона");
      else setPhoneError(null);

      if (birthday.trim().length < 10) setBirthdayError("Некорректная дата рождения");
      else setBirthdayError(null);

      if (role === "") setRoleError("Выберите должность");
      else setRoleError(null);
      return;
    }

    const formData: IEmployees = {
      id: card?.id || uuidv4(),
      name: name,
      phone: phone,
      birthday: birthday,
      isArchive: isArchive,
      role: role as IEmployees["role"],
    };
    if (card) {
      const updatedEmployee: IEmployees = {
        ...card,
        ...formData,
      };
      await dispatch(updateEmployeeForm(updatedEmployee));
    } else {
      await dispatch(addEmployeeForm(formData));
    }
    onClose?.();
  };
  const ref = useClickOutside<HTMLDivElement>(handleClose);

  const inputPhoneRef = useMask({
    mask: "+7 (___) ___-____",
    replacement: { _: /\d/ },
  });

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.trim() !== "") {
      setNameError(null);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (value.length === 17) {
      setPhoneError(null);
    }
  };
  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthday(value);
    if (value.length === 10) {
      setBirthdayError(null);
    }
  };
  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setNameError("Некорректный номер");
    } else {
      setNameError(null);
    }
  };
  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 17) {
      setPhoneError("Некорректный номер");
    } else {
      setPhoneError(null);
    }
  };
  const handleBirthdayBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 10) {
      setBirthdayError("Некорректная дата");
    } else {
      setBirthdayError(null);
    }
  };
  const handleRoleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setRoleError("Выберите должность");
    } else {
      setRoleError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.container}>
        <Input
          label="Имя"
          value={name}
          isError={Boolean(nameError)}
          errorMessage={nameError}
          onBlur={handleNameBlur}
          onChange={handleChangeName}
        />
        <Input
          ref={inputPhoneRef}
          label="Номер телефона"
          value={phone}
          isError={Boolean(phoneError)}
          errorMessage={phoneError}
          onBlur={handlePhoneBlur}
          onChange={handlePhoneChange}
        />
        <Input
          type="text"
          mask="ДД.ММ.ГГГГ"
          replacement={{ Д: /\d/, М: /\d/, Г: /\d/ }}
          track={trackDate}
          label="Дата рождения"
          value={birthday}
          onChange={handleBirthdayChange}
          onBlur={handleBirthdayBlur}
          isError={Boolean(birthdayError)}
          errorMessage={birthdayError}
        />
        <div>
          <div ref={ref} style={{ position: "relative" }}>
            <Input
              label="Должность"
              onClick={handleOpen}
              onBlur={handleRoleBlur}
              type="text"
              value={role ? role : ""}
              isError={Boolean(roleError)}
              errorMessage={roleError}
              readOnly
            />
            {isOpen && (
              <Dropdown>
                <DropdownMenu
                  onClick={handleClose}
                  items={employeesFilterItem}
                  onSelect={selectedRole => {
                    setRole(selectedRole);
                    setRoleError(null);
                    handleClose();
                  }}
                  selectedItem={role}
                />
              </Dropdown>
            )}
          </div>
        </div>
        <div className={style.checkboxWrapper}>
          <Checkbox checked={isArchive} label={<span>В архиве</span>} onChange={e => setIsArchive(e.target.checked)} />
        </div>
        <div>
          <Button onClick={() => handleSubmit}>Submit</Button>
        </div>
      </div>
    </form>
  );
};
