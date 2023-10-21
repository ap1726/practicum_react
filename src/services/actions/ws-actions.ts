import { TOrderType } from "../../components/orders/components/order-card/order-card";

export const WS_FEED_CONNECTION_START: "WS_FEED_CONNECTION_START" = "WS_FEED_CONNECTION_START";
export const WS_FEED_CONNECTION_SUCCESS: "WS_FEED_CONNECTION_SUCCESS" = "WS_FEED_CONNECTION_SUCCESS";
export const WS_FEED_CONNECTION_ERROR: "WS_FEED_CONNECTION_ERROR" = "WS_FEED_CONNECTION_ERROR";
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE: "WS_FEED_GET_MESSAGE" = "WS_FEED_GET_MESSAGE";
export const WS_FEED_SEND_MESSAGE: "WS_FEED_SEND_MESSAGE" = "WS_FEED_SEND_MESSAGE";
export const WS_ORDERS_CONNECTION_START: "WS_ORDERS_CONNECTION_START" = "WS_ORDERS_CONNECTION_START";
export const WS_ORDERS_CONNECTION_SUCCESS: "WS_ORDERS_CONNECTION_SUCCESS" = "WS_ORDERS_CONNECTION_SUCCESS";
export const WS_ORDERS_CONNECTION_ERROR: "WS_ORDERS_CONNECTION_ERROR" = "WS_ORDERS_CONNECTION_ERROR";
export const WS_ORDERS_CONNECTION_CLOSED: 'WS_ORDERS_CONNECTION_CLOSED' = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_GET_MESSAGE: "WS_ORDERS_GET_MESSAGE" = "WS_ORDERS_GET_MESSAGE";
export const WS_ORDERS_SEND_MESSAGE: "WS_ORDERS_SEND_MESSAGE" = "WS_ORDERS_SEND_MESSAGE";

export interface IWsFeedConectionStart {
    readonly type: typeof WS_FEED_CONNECTION_START;
  }

export interface IWsFeedConectionSuccess {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
    readonly wsConnected: boolean;
    readonly error: string;
  }

export interface IWsFeedConectionError {
    readonly type: typeof WS_FEED_CONNECTION_ERROR;
    readonly payload: string;
  }

export interface IWsFeedConectionClosed {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED;
    readonly wsConnected: boolean;
    readonly error: string;
  }


  
export interface IWsFeedGetMessage {
    readonly type: typeof WS_FEED_GET_MESSAGE;
    readonly payload: {
      orders: Array<TOrderType>,
      total: number,
      totalToday: number
    }
  }

export interface IWsFeedSendMessage {
    readonly type: typeof WS_FEED_SEND_MESSAGE;
  }

export interface IWsOrdersConectionStart {
    readonly type: typeof WS_ORDERS_CONNECTION_START;
  }

export interface IWsOrdersConectionSuccess {
    readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
  }

export interface IWsOrdersConectionError {
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
    payload: string;
  }

export interface IWsOrdersConectionClosed {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
  }

export interface IWsOrdersGetMessage {
    readonly type: typeof WS_ORDERS_GET_MESSAGE;
    payload: {orders:Array<TOrderType>, 
              total: number,
              totalToday: number};
  }

export interface IWsOrdersSendMessage {
    readonly type: typeof WS_ORDERS_SEND_MESSAGE;
  }

export type TWsActions = 
        | IWsFeedConectionStart
        | IWsFeedConectionSuccess
        | IWsFeedConectionError
        | IWsFeedConectionClosed
        | IWsFeedGetMessage
        | IWsFeedSendMessage
        | IWsOrdersConectionStart
        | IWsOrdersConectionSuccess
        | IWsOrdersConectionError
        | IWsOrdersConectionClosed
        | IWsOrdersGetMessage
        | IWsOrdersSendMessage

export const wsFeedConnectionStart = (): IWsFeedConectionStart => ({type: WS_FEED_CONNECTION_START})
export const wsFeedConnectionClosed = (): IWsFeedConectionClosed => ({type: WS_FEED_CONNECTION_CLOSED, wsConnected: false, error: ""})
