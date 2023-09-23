import {
  forgotPassword,
  refreshToken,
  registerNewUser,
  resetPassword,
  updateUserData,
} from "../../utils/burger-api";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { loginUser, logout, getUserData } from "../../utils/burger-api";

export const REGISTRATION = "REGISTRATION";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const GET_USER_DATA = "GET_USER_DATA";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED";

export const SEND_USER_DATA = "SEND_USER_DATA";
export const SEND_USER_DATA_SUCCESS = "SEND_USER_DATA_SUCCESS";
export const SEND_USER_DATA_FAILED = "SEND_USER_DATA_FAILED";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";

export function registration(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION,
    });

    registerNewUser(email, name, password)
      .then((res) => {
        dispatch({ type: REGISTRATION_SUCCESS });
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({ type: LOGIN_SUCCESS, payload: res.user });
      })
      .catch((err) => {
        dispatch({ type: REGISTRATION_FAILED });
        console.log(err);
      });
  };
}

export function signIn(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN,
    });

    loginUser(email, password)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS });
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILED });
        console.log(err.status);
      });
  };
}

export function logOut(refreshToken) {
  return function (dispatch) {
    dispatch({ type: LOGOUT });

    logout(refreshToken)
      .then(() => {
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: LOGOUT_FAILED });
        console.log(err);
      });
  };
}

export function getUser(token) {
  return function (dispatch) {
    dispatch({ type: LOGIN });

    getUserData(token)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.user });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILED });
        console.log(err);

        dispatch(updateToken(getCookie("refreshToken")));
      });
  };
}

export function forgotPasswords(email) {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASSWORD });

    forgotPassword(email)
      .then((res) => {
        if (res.success) {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        }
      })
      .catch((err) => {
        dispatch({ type: FORGOT_PASSWORD_FAILED });
        console.log(err);
      });
  };
}

export function resetPasswords(password, token) {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD });

    resetPassword(password, token)
      .then((res) => {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
        console.log(res);
      })
      .catch((err) => {
        dispatch({ type: RESET_PASSWORD_FAILED });
        console.log(err);
      });
  };
}

export function updateToken(token) {
  return function (dispatch) {
    dispatch({ type: REFRESH_TOKEN });

    refreshToken(token)
      .then((res) => {
        dispatch({ type: REFRESH_TOKEN_SUCCESS });
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
      })
      .then(() => {
        getUser(getCookie("accessToken"));
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REFRESH_TOKEN_FAILED });
      });
  };
}

export function updateProfile(token, email, name, password) {
  return function (dispatch) {
    dispatch({ type: SEND_USER_DATA });

    updateUserData(token, email, name, password)
      .then((res) => {
        dispatch({
          type: SEND_USER_DATA_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({ type: SEND_USER_DATA_FAILED });
        console.log(err);
      });
  };
}

export function updateTokenAndProfile(email, name, password) {
  return function (dispatch) {
    getUserData(getCookie("accessToken"))
      .then(() => {
        dispatch(
          updateProfile(getCookie("accessToken"), email, name, password)
        );
      })
      .catch(() => {
        refreshToken(getCookie("refreshToken"))
          .then((res) => {
            setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
            setCookie("refreshToken", res.refreshToken);
          })
          .then(() => {
            dispatch(
              updateProfile(getCookie("accessToken"), email, name, password)
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
}
