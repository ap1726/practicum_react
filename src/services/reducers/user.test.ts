import { userReducer } from './user';
import {
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  SEND_USER_DATA,
  SEND_USER_DATA_SUCCESS,
  SEND_USER_DATA_FAILED,
} from '../actions/user';

describe('userReducer', () => {
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
        accessToken: undefined,
        userData: undefined,
      };
  const payload = { email: "test@example.com", name: "Test User" };
  it('should handle REGISTRATION', () => {

    const action = {
      type: REGISTRATION,
    };

    const expectedState = {
      ...initialState,
      registrationRequest: true,
      registrationRequestFailed: false,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REGISTRATION_SUCCESS', () => {

    const action = {
      type: REGISTRATION_SUCCESS,
      payload: 'accessToken',
    };

    const expectedState = {
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
      accessToken: 'accessToken',
      userData: undefined
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REGISTRATION_FAILED', () => {

    const action = {
      type: REGISTRATION_FAILED,
    };

    const expectedState = {
      registrationRequest: false,
      registrationRequestFailed: true,
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
      accessToken: undefined,
      userData: undefined
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGIN action', () => {

    const action = { type: LOGIN };

    const newState = userReducer(initialState, action);

    expect(newState.loginRequest).toBe(true);
    expect(newState.loginRequestFailed).toBe(false);
  });

  it('should handle LOGIN_SUCCESS action', () => {

    const mockPayload = { email: 'example@example.com', name: 'John Doe' };

    const action = { type: LOGIN_SUCCESS, payload: mockPayload };

    const newState = userReducer(initialState, action);

    expect(newState.loginRequest).toBe(false);
    expect(newState.userData).toEqual(mockPayload);
  });

  it('should handle LOGIN_FAILED action', () => {
    const action = { type: LOGIN_FAILED };
    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      loginRequest: false,
      loginRequestFailed: true,
    });
  });

  it('should handle FORGOT_PASSWORD', () => {
    const nextState = userReducer(initialState, { type: FORGOT_PASSWORD });
    expect(nextState.forgotPasswordRequest).toBe(true);
    expect(nextState.forgotPasswordRequestFailed).toBe(false);
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const nextState = userReducer(initialState, { type: FORGOT_PASSWORD_SUCCESS });
    expect(nextState.forgotPasswordRequest).toBe(false);
    expect(nextState.isPasswordForgot).toBe(true);
  });

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    const nextState = userReducer(initialState, { type: FORGOT_PASSWORD_FAILED });
    expect(nextState.forgotPasswordRequest).toBe(false);
    expect(nextState.forgotPasswordRequestFailed).toBe(true);
  });

  it('should handle RESET_PASSWORD', () => {
    const nextState = userReducer(initialState, { type: RESET_PASSWORD });
    expect(nextState.resetPasswordRequest).toBe(true);
    expect(nextState.resetPasswordRequestFailed).toBe(false);
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    const nextState = userReducer(initialState, { type: RESET_PASSWORD_SUCCESS });
    expect(nextState.resetPasswordRequest).toBe(false);
  });

  it('should handle RESET_PASSWORD_FAILED', () => {
    const nextState = userReducer(initialState, { type: RESET_PASSWORD_FAILED });
    expect(nextState.resetPasswordRequest).toBe(false);
    expect(nextState.resetPasswordRequestFailed).toBe(true);
  });

  it("should handle GET_USER_DATA", () => {
    const action = { type: GET_USER_DATA };
    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      getUserDataRequest: true,
      getUserDataRequestFailed: false,
    });
  });

  it("should handle GET_USER_DATA_SUCCESS", () => {
    const action = { type: GET_USER_DATA_SUCCESS, payload };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      getUserDataRequest: false,
      userData: payload,
    });
  });

  it("should handle GET_USER_DATA_FAILED", () => {
    const action = { type: GET_USER_DATA_FAILED };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      getUserDataRequest: false,
      getUserDataRequestFailed: true,
    });
  });

  it("should handle LOGOUT", () => {
    const action = { type: LOGOUT };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      logoutRequest: true,
      logoutRequestFailed: false,
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    const action = { type: LOGOUT_SUCCESS };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      logoutRequest: false,
      userData: undefined,
    });
  });

  it("should handle LOGOUT_FAILED", () => {
    const action = { type: LOGOUT_FAILED };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutRequestFailed: true,
    });
  });

  it("should handle REFRESH_TOKEN", () => {
    const action = { type: REFRESH_TOKEN };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      refreshTokenRequest: true,
      refreshTokenRequestFailed: false,
    });
  });

  it("should handle REFRESH_TOKEN_SUCCESS", () => {
    const action = { type: REFRESH_TOKEN_SUCCESS };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      refreshTokenRequest: false,
    });
  });

  it("should handle REFRESH_TOKEN_FAILED", () => {
    const action = { type: REFRESH_TOKEN_FAILED };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      refreshTokenRequest: false,
      refreshTokenRequestFailed: true,
    });
  });
  
  it("should handle SEND_USER_DATA", () => {
    const action = { type: SEND_USER_DATA };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      sendUserDataRequest: true,
      sendUserDataRequestFailed: false,
    });
  });
  it("should handle SEND_USER_DATA_SUCCESS", () => {
    const action = { type: SEND_USER_DATA_SUCCESS, payload };
    const expectedState = {
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
      accessToken: undefined,
      userData: { email: 'test@example.com', name: 'Test User' }
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  it("should handle SEND_USER_DATA_FAILED", () => {
    const action = { type: SEND_USER_DATA_FAILED };

    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      sendUserDataRequest: false,
      sendUserDataRequestFailed: true,
    });
  });


});
