import { Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./AddRoutesJson";
import LayoutWrapper from "./LayoutWrappers";
import PrivateRoutesAuth from "./PrivateRoutesAuth";
import { useCookies } from "react-cookie";
const RouterMain = () => {
  const [cookies] = useCookies();
  const renderRoute: any = () => {
    return PRIVATE_ROUTES.filter((route) =>
      route.accessTo.includes(
        cookies?.user ? JSON.parse(atob(cookies?.user))?.role_type : ""
      )
    ).map((route, index) => (
      <Route
        key={"_key_Id_Pro" + index + route.path}
        path={route.path}
        element={
          <LayoutWrapper layoutIdentifier={route.layoutType}>
            <Suspense fallback={route.loadingFallback}>
              {route.component}
            </Suspense>
          </LayoutWrapper>
        }
      />
    ));
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ---Public routes-------- */}
          {PUBLIC_ROUTES.map((route, index) => (
            <Route
              key={"_key_Id_" + index + route.path}
              path={route.path}
              element={
                <LayoutWrapper layoutIdentifier={route.layoutType}>
                  <Suspense fallback={route.loadingFallback}>
                    {route.component}
                  </Suspense>
                </LayoutWrapper>
              }
            />
          ))}
          {/* ---Public routes End-------- */}
          <Route element={<PrivateRoutesAuth />}>
            {/* ---Private routes */}
            {renderRoute()}
            {/* ---Private routes end*/}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterMain;
