export interface IEmployees {
  id: string;
  name: string;
  isArchive: boolean;
  role: "driver" | "waiter" | "cook";
  phone: string;
  birthday: string;
}
