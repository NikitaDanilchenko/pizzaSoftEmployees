import { createBrowserRouter } from "react-router-dom";
import { Employees } from "@pages/employees/Employees";
import { Layout } from "@app/layout";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div>Error...</div>,
    children: [
      {
        path: "employees/*",
        element: <Employees />,
      },
    ],
  },
]);
