import { RouterProvider } from "react-router-dom"
import style from "./employees.module.scss"
import { routes } from "./config/routes"
function App() {

  return (
    <div className={style.wrapper}>
    <RouterProvider router={routes} />
  </div>
  )
}

export default App
