import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../services/actions/user";
import { getCookie } from "../../utils/cookie";
import PropTypes from "prop-types";
import { loginPage, homePage } from "../../utils/variables";
import { getUserData } from "../../utils/function_tools";

export function ProtectedRoute({ onlyUnAuth = false, children }) {
  const userData = useSelector(getUserData);
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

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  onlyUnAuth: PropTypes.bool,
};
