import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { wsFeedReducer } from "./ws-feed";
import { wsOrdersReducer } from "./ws-orders";

export const rootReducer = combineReducers({
  data: ingredientsReducer,
  modal: modalReducer,
  construct: constructorReducer,
  order: orderReducer,
  user: userReducer,
  wsFeed: wsFeedReducer,
  wsOrders: wsOrdersReducer,
});