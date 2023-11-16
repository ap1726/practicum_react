import { wsFeedReducer } from "./ws-feed";
import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
} from "../actions/ws-actions";

describe("wsFeedReducer", () => {
  const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
  }
  it("should handle WS_FEED_CONNECTION_SUCCESS", () => {
    expect(
      wsFeedReducer(initialState, {
        type: WS_FEED_CONNECTION_SUCCESS,
        wsConnected: true,
        error: "success"
      })
    ).toEqual({
      wsConnected: true,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
    });
  });

  it("should handle WS_FEED_CONNECTION_ERROR", () => {
    const errorMessage = "Connection error";

    expect(
      wsFeedReducer(initialState, {
        type: WS_FEED_CONNECTION_ERROR,
        payload: errorMessage,
      })
    ).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: errorMessage,
    });
  });

  it("should handle WS_FEED_CONNECTION_CLOSED", () => {
    expect(
      wsFeedReducer(initialState, {
        type: WS_FEED_CONNECTION_CLOSED,
        wsConnected: false,
        error: "closed"
      })
    ).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
    });
  });

  it("should handle WS_FEED_GET_MESSAGE", () => {
    const message = {
      orders: [
        {
            _id: "",
            ingredients: [],
            number: 0,
            createdAt: new Date(),
            name: "",
            status: "",
        },
      ],
      total: 10,
      totalToday: 5,
    };

    expect(
      wsFeedReducer(initialState, {
        type: WS_FEED_GET_MESSAGE,
        payload: message,
      })
    ).toEqual({
      wsConnected: false,
      orders: message.orders,
      total: message.total,
      totalToday: message.totalToday,
      error: null,
    });
  });
});
