import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutesAuth = () => {
  const [cookies] = useCookies();
  var cookieValue = cookies?.user
    ? JSON.parse(atob(cookies?.user))?.role_type
    : false;
  if (!cookieValue) return <Navigate to="/sign-in" />;
  return <Outlet />;
};

export default PrivateRoutesAuth;
