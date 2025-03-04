import { createBrowserRouter } from "react-router-dom";
import { Employees } from "@pages/employees/ui/Employees";
import { Layout } from "@app/layout";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div>Error...</div>,
    children: [
      { path: "/", element: <Employees /> },
      // { path: "/results/:testId", element: <Results /> },
      // { path: "/finalize/:testId", element: <Finalize /> },
    ],
  },
]);
