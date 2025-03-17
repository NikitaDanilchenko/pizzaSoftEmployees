import { RouterProvider } from "react-router-dom";
import style from "./app.module.scss";
import { routes } from "./config/routes";
import "@shared/theme/globals.scss";
function App() {
  return (
    <div className={style.wrapper}>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
