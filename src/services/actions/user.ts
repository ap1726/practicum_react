import {
  forgotPassword,
  refreshToken,
  registerNewUser,
  resetPassword,
  updateUserData,
} from "../../utils/burger-api";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { loginUser, logout, getUserData } from "../../utils/burger-api";
import { AppDispatch } from "../..";

export enum UserActions {
    REGISTRATION = "REGISTRATION",
    REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS",
    REGISTRATION_FAILED = "REGISTRATION_FAILED",
    LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILED = "LOGIN_FAILED",
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
    FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS",
    FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED",
    RESET_PASSWORD = "RESET_PASSWORD",
    RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS",
    RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED",
    GET_USER_DATA = "GET_USER_DATA",
    GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS",
    GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED",
    SEND_USER_DATA = "SEND_USER_DATA",
    SEND_USER_DATA_SUCCESS = "SEND_USER_DATA_SUCCESS",
    SEND_USER_DATA_FAILED = "SEND_USER_DATA_FAILED",
    LOGOUT = "LOGOUT",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    LOGOUT_FAILED = "LOGOUT_FAILED",
    REFRESH_TOKEN = "REFRESH_TOKEN",
    REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS",
    REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED"
  }

export function registration(email: string, password: string, name: string) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UserActions.REGISTRATION,
    });

    registerNewUser(email, name, password)
      .then((res) => {
        dispatch({ type: UserActions.REGISTRATION_SUCCESS });
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({ type: UserActions.LOGIN_SUCCESS, payload: res.user });
      })
      .catch((err) => {
        dispatch({ type: UserActions.REGISTRATION_FAILED });
        console.log(err);
      });
  };
}

export function signIn(email: string, password: string) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UserActions.LOGIN,
    });

    loginUser(email, password)
      .then((res) => {
        dispatch({ type: UserActions.LOGIN_SUCCESS });
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({
          type: UserActions.LOGIN_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({ type: UserActions.LOGIN_FAILED });
        console.log(err.status);
      });
  };
}

export function logOut(refreshToken: string) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UserActions.LOGOUT });

    logout(refreshToken)
      .then(() => {
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
        dispatch({ type: UserActions.LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: UserActions.LOGOUT_FAILED });
        console.log(err);
      });
  };
}

export function getUser(token: string | undefined): any {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UserActions.LOGIN });

    getUserData(token)
      .then((res) => {
        dispatch({ type: UserActions.LOGIN_SUCCESS, payload: res.user });
      })
      .catch((err) => {
        dispatch({ type: UserActions.LOGIN_FAILED });
        console.log(err);

        dispatch(updateToken(getCookie("refreshToken")));
      });
  };
}

export function forgotPasswords(email: string) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UserActions.FORGOT_PASSWORD });

    forgotPassword(email)
      .then((res) => {
        if (res.success) {
          dispatch({ type: UserActions.FORGOT_PASSWORD_SUCCESS });
        }
      })
      .catch((err) => {
        dispatch({ type: UserActions.FORGOT_PASSWORD_FAILED });
        console.log(err);
      });
  };
}

export function resetPasswords(password: string, token: string) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UserActions.RESET_PASSWORD });

    resetPassword(password, token)
      .then((res) => {
        dispatch({ type: UserActions.RESET_PASSWORD_SUCCESS });
        console.log(res);
      })
      .catch((err) => {
        dispatch({ type: UserActions.RESET_PASSWORD_FAILED });
        console.log(err);
      });
  };
}

export function updateToken(token: string | undefined) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UserActions.REFRESH_TOKEN });

    refreshToken(token)
      .then((res) => {
        dispatch({ type: UserActions.REFRESH_TOKEN_SUCCESS });
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
      })
      .then(() => {
        getUser(getCookie("accessToken"));
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: UserActions.REFRESH_TOKEN_FAILED });
      });
  };
}

export function updateProfile(token: string | undefined, email: string, name: string, password: string) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UserActions.SEND_USER_DATA });

    updateUserData(token, email, name, password)
      .then((res) => {
        dispatch({
          type: UserActions.SEND_USER_DATA_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({ type: UserActions.SEND_USER_DATA_FAILED });
        console.log(err);
      });
  };
}

export function updateTokenAndProfile(email: string, name: string, password: string) {
  return function (dispatch: AppDispatch) {
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
