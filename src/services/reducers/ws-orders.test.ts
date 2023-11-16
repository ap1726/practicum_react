import { wsOrdersReducer } from './ws-orders';
import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE
} from "../actions/ws-actions";

describe('wsOrdersReducer', () => {
  const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
  };

  it('should handle WS_ORDERS_CONNECTION_SUCCESS', () => {
    const action = {
      type: WS_ORDERS_CONNECTION_SUCCESS
    };
    const expectedState = {
      ...initialState,
      wsConnected: true,
      error: null
    };
    expect(wsOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_ORDERS_CONNECTION_ERROR', () => {
    const errorMessage = 'Connection error';
    const action = {
      type: WS_ORDERS_CONNECTION_ERROR,
      payload: errorMessage
    };
    const expectedState = {
      ...initialState,
      wsConnected: false,
      error: errorMessage
    };
    expect(wsOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_ORDERS_CONNECTION_CLOSED', () => {
    const action = {
      type: WS_ORDERS_CONNECTION_CLOSED
    };
    const expectedState = {
      ...initialState,
      wsConnected: false,
      error: null
    };
    expect(wsOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_ORDERS_GET_MESSAGE', () => {
    const orders = [{ 
        _id: "",
        ingredients: [],
        number: 0,
        createdAt: new Date(),
        name: "",
        status: "",
    }];
    const total = 1;
    const totalToday = 1;
    const action = {
      type: WS_ORDERS_GET_MESSAGE,
      payload: { orders, total, totalToday }
    };
    const expectedState = {
      ...initialState,
      orders,
      total,
      totalToday,
      error: null
    };
    expect(wsOrdersReducer(initialState, action)).toEqual(expectedState);
  });
});
