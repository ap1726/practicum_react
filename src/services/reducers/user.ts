import {
  userActions
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
    case userActions.REGISTRATION: {
      return {
        ...state,
        registrationRequest: true,
        registrationRequestFailed: false,
      };
    }
    case userActions.REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        accessToken: action.payload,
      };
    }
    case userActions.REGISTRATION_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationRequestFailed: true,
      };
    }
    case userActions.LOGIN: {
      return {
        ...state,
        loginRequest: true,
        loginRequestFailed: false,
      };
    }
    case userActions.LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        userData: action.payload,
      };
    }
    case userActions.LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: true,
      };
    }
    case userActions.FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordRequestFailed: false,
      };
    }
    case userActions.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        isPasswordForgot: true,
      };
    }
    case userActions.FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      };
    }
    case userActions.RESET_PASSWORD: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordRequestFailed: false,
      };
    }
    case userActions.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
      };
    }
    case userActions.RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      };
    }
    case userActions.GET_USER_DATA: {
      return {
        ...state,
        getUserDataRequest: true,
        getUserDataRequestFailed: false,
      };
    }
    case userActions.GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        getUserDataRequest: false,
        userData: action.payload,
      };
    }
    case userActions.GET_USER_DATA_FAILED: {
      return {
        ...state,
        getUserDataRequest: false,
        getUserDataRequestFailed: true,
      };
    }
    case userActions.LOGOUT: {
      return {
        ...state,
        logoutRequest: true,
        logoutRequestFailed: false,
      };
    }
    case userActions.LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        userData: null,
      };
    }
    case userActions.LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutRequestFailed: true,
      };
    }
    case userActions.REFRESH_TOKEN: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenRequestFailed: false,
      };
    }
    case userActions.REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
      };
    }
    case userActions.REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenRequestFailed: true,
      };
    }
    case userActions.SEND_USER_DATA: {
      return {
        ...state,
        sendUserDataRequest: true,
        sendUserDataRequestFailed: false,
      };
    }
    case userActions.SEND_USER_DATA_SUCCESS: {
      return {
        ...state,
        sendUserDataRequest: false,
        userData: action.payload,
      };
    }
    case userActions.SEND_USER_DATA_FAILED: {
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
