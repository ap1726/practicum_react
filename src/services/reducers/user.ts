import {
  UserActions
} from "../actions/user";

const initialState = {
  registrationRequest: false,
  registrationRequestFailed: false,
  loginRequest: false,
  loginRequestFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordRequestFailed: false,
  resetPasswordRequest: false,
  resetPasswordRequestFailed: false,
  getUserDataRequest: false,
  getUserDataRequestFailed: false,
  logoutRequest: false,
  logoutRequestFailed: false,
  refreshTokenRequest: false,
  refreshTokenRequestFailed: false,
  sendUserDataRequest: false,
  sendUserDataRequestFailed: false,
  isPasswordForgot: false,
  userData: null,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserActions.REGISTRATION: {
      return {
        ...state,
        registrationRequest: true,
        registrationRequestFailed: false,
      };
    }
    case UserActions.REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        accessToken: action.payload,
      };
    }
    case UserActions.REGISTRATION_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationRequestFailed: true,
      };
    }
    case UserActions.LOGIN: {
      return {
        ...state,
        loginRequest: true,
        loginRequestFailed: false,
      };
    }
    case UserActions.LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        userData: action.payload,
      };
    }
    case UserActions.LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: true,
      };
    }
    case UserActions.FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordRequestFailed: false,
      };
    }
    case UserActions.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        isPasswordForgot: true,
      };
    }
    case UserActions.FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      };
    }
    case UserActions.RESET_PASSWORD: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordRequestFailed: false,
      };
    }
    case UserActions.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
      };
    }
    case UserActions.RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      };
    }
    case UserActions.GET_USER_DATA: {
      return {
        ...state,
        getUserDataRequest: true,
        getUserDataRequestFailed: false,
      };
    }
    case UserActions.GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        getUserDataRequest: false,
        userData: action.payload,
      };
    }
    case UserActions.GET_USER_DATA_FAILED: {
      return {
        ...state,
        getUserDataRequest: false,
        getUserDataRequestFailed: true,
      };
    }
    case UserActions.LOGOUT: {
      return {
        ...state,
        logoutRequest: true,
        logoutRequestFailed: false,
      };
    }
    case UserActions.LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        userData: null,
      };
    }
    case UserActions.LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutRequestFailed: true,
      };
    }
    case UserActions.REFRESH_TOKEN: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenRequestFailed: false,
      };
    }
    case UserActions.REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
      };
    }
    case UserActions.REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: true,
      };
    }
    case UserActions.SEND_USER_DATA: {
      return {
        ...state,
        sendUserDataRequest: true,
        sendUserDataRequestFailed: false,
      };
    }
    case UserActions.SEND_USER_DATA_SUCCESS: {
      return {
        ...state,
        sendUserDataRequest: false,
        userData: action.payload,
      };
    }
    case UserActions.SEND_USER_DATA_FAILED: {
      return {
        ...state,
        sendUserDataRequest: false,
        sendUserDataRequestFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
