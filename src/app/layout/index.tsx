import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Layout = (): React.ReactNode => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
