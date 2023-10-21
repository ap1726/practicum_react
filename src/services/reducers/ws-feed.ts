import { TOrderType } from '../../components/orders/components/order-card/order-card'

import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  TWsActions
  } from "../actions/ws-actions";
  
type TWsFeed = {
    wsConnected: boolean,
    orders: Array<TOrderType>,
    total: number,
    totalToday: number,
    error: string | null,
}

const initialState:TWsFeed = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

  export const wsFeedReducer = (state = initialState, action: TWsActions):TWsFeed => {
    switch (action.type) {
      case WS_FEED_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true,
          error: null,
        };
  
      case WS_FEED_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false,
          error: action.payload,
        };
  
      case WS_FEED_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false,
          error: null,
        };
  
      case WS_FEED_GET_MESSAGE:
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
  