import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";

import { useLocation } from "react-router-dom";
import { useEffect, FC, ReactPortal, ReactElement } from "react";
import { getUser } from "../../services/actions/user";
import { getCookie } from "../../utils/cookie";
import { loginPage, homePage } from "../../utils/variables";
import { getUserData } from "../../utils/function_tools";

interface IProtectedRouteType {
  onlyUnAuth: boolean,
  children: ReactElement | ReactPortal
}

export const ProtectedRoute: FC<IProtectedRouteType> = ({ onlyUnAuth = false, children }) => {
  const userData = useAppSelector(getUserData);
  const location = useLocation();
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    if (accessToken) {
      getUser(accessToken);
    }
  }, [accessToken]);

  if (userData && onlyUnAuth) {
    const { from } = location.state || { from: { pathname: homePage } };
    return (
        <Navigate to={from} />
    );
  }

  if (userData && !onlyUnAuth) {
    return (children);
  }

  if (!onlyUnAuth && !userData) {
    return (
        <Navigate to={loginPage} state = {{ from: location }}  />
    );
  }

  return (children);
}
