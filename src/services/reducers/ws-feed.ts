import {
    wsActions,
  } from "../actions/ws-actions";
  
  const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
  };
  
  export const wsFeedReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case wsActions.WS_FEED_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true,
          error: null,
        };
  
      case wsActions.WS_FEED_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false,
          error: action.payload,
        };
  
      case wsActions.WS_FEED_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false,
          error: null,
        };
  
      case wsActions.WS_FEED_GET_MESSAGE:
        return {
          ...state,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          error: null,
        };
  
      default:
        return state;
    }
  };
  