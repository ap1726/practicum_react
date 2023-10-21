import {
  forgotPassword,
  refreshToken,
  registerNewUser,
  resetPassword,
  updateUserData,
} from "../../utils/burger-api";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { loginUser, logout, getUserData } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../..";
import { TUserType } from "../reducers/user";

export const REGISTRATION: "REGISTRATION" = "REGISTRATION";
export const REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS" = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED: "REGISTRATION_FAILED" = "REGISTRATION_FAILED";
export const LOGIN: "LOGIN" = "LOGIN";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";
export const FORGOT_PASSWORD: "FORGOT_PASSWORD" = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD: "RESET_PASSWORD" = "RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";
export const GET_USER_DATA: "GET_USER_DATA" = "GET_USER_DATA";
export const GET_USER_DATA_SUCCESS: "GET_USER_DATA_SUCCESS" = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILED: "GET_USER_DATA_FAILED" = "GET_USER_DATA_FAILED";
export const SEND_USER_DATA: "SEND_USER_DATA" = "SEND_USER_DATA";
export const SEND_USER_DATA_SUCCESS: "SEND_USER_DATA_SUCCESS" = "SEND_USER_DATA_SUCCESS";
export const SEND_USER_DATA_FAILED: "SEND_USER_DATA_FAILED" = "SEND_USER_DATA_FAILED";
export const LOGOUT: "LOGOUT" = "LOGOUT";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";
export const REFRESH_TOKEN: "REFRESH_TOKEN" = "REFRESH_TOKEN";
export const REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS" = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED: "REFRESH_TOKEN_FAILED" = "REFRESH_TOKEN_FAILED";

export interface IRegistration {
  readonly type: typeof REGISTRATION;
}

export interface IRegistration {
  readonly type: typeof REGISTRATION;
}
export interface IRegistrationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
  payload?: string;
}
export interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED;
}
export interface ILogin {
  readonly type: typeof LOGIN;
}
export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload?: {name: string, email: string};
}
export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}
export interface IFogotPassword {
  readonly type: typeof FORGOT_PASSWORD;
}
export interface IFogotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IFogotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export interface IResetPassword {
  readonly type: typeof RESET_PASSWORD;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface IGetUserData {
  readonly type: typeof GET_USER_DATA;
}
export interface IGetUserDataSuccess {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly payload: {name: string, email: string};

}
export interface IGetUserDataFailed {
  readonly type: typeof GET_USER_DATA_FAILED;
}
export interface ISendUserData {
  readonly type: typeof SEND_USER_DATA;
}
export interface ISendUserDataSuccess {
  readonly type: typeof SEND_USER_DATA_SUCCESS;
  readonly payload: {name: string, email: string};

}
export interface ISendUserDataFailed {
  readonly type: typeof SEND_USER_DATA_FAILED;
}
export interface ILogout {
  readonly type: typeof LOGOUT;
}
export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}
export interface IRefreshToken {
  readonly type: typeof REFRESH_TOKEN;
}
export interface IRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}
export interface IRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export type TUserActions = 
          | IRegistration
          | IRegistration
          | IRegistrationSuccess
          | IRegistrationFailed
          | ILogin
          | ILoginSuccess
          | ILoginFailed
          | IFogotPassword
          | IFogotPasswordSuccess
          | IFogotPasswordFailed
          | IResetPassword
          | IResetPasswordSuccess
          | IResetPasswordFailed
          | IGetUserData
          | IGetUserDataSuccess
          | IGetUserDataFailed
          | ISendUserData
          | ISendUserDataSuccess
          | ISendUserDataFailed
          | ILogout
          | ILogoutSuccess
          | ILogoutFailed
          | IRefreshToken
          | IRefreshTokenSuccess
          | IRefreshTokenFailed;

export const registrationSuccessAction = (): IRegistrationSuccess => ({type: REGISTRATION_SUCCESS})
export const loginSuccess = (): ILoginSuccess => ({ type: LOGIN_SUCCESS })

export const registration: AppThunk = (email: string, password: string, name: string) => (dispatch) => {
    dispatch({
      type: REGISTRATION,
    });

    registerNewUser(email, name, password)
      .then((res) => {
        dispatch(registrationSuccessAction());
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({ type: LOGIN_SUCCESS, payload: res.user });
      })
      .catch((err) => {
        dispatch({ type: REGISTRATION_FAILED });
        console.log(err);
      });
};

export const signIn: AppThunk = (email: string, password: string) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN,
    });

    loginUser(email, password)
      .then((res) => {
        dispatch(loginSuccess());
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

export const logOut: AppThunk = (refreshToken: string) => {
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

export const getUser: AppThunk = (token?: string) => {
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

export const forgotPasswords: AppThunk = (email: string) => {
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

export const resetPasswords: AppThunk = (password: string, token: string) => {
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

export const updateToken: AppThunk = (token?: string ) => {
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

export const sendUserData: AppThunk = (email: string, name: string, password: string, token: string) => 
  (dispatch) => {
    dispatch({ type: SEND_USER_DATA });

    updateUserData(email, name, password, token)
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

export const updateTokenAndProfile: AppThunk = (
  email: string, name: string, password: string) => (dispatch) =>{
    getUserData(getCookie("accessToken"))
      .then(() => {
        dispatch(
          sendUserData(email, name, password, getCookie("accessToken"))
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
              sendUserData(email, name, password, getCookie("accessToken"))
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
}
