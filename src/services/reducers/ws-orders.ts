import { TOrderType } from "../../components/orders/components/order-card/order-card";
import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE,
  TWsActions
} from "../actions/ws-actions";

type TWsOrders = {
  wsConnected: boolean,
  orders: Array<TOrderType>,
  total: number,
  totalToday: number,
  error: string | null,
}

const initialState: TWsOrders = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

export const wsOrdersReducer = (state = initialState, action: TWsActions):TWsOrders => {
  switch (action.type) {
    case WS_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null,
      };

    case WS_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };

    case WS_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: null,
      };

    case WS_ORDERS_GET_MESSAGE:
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
