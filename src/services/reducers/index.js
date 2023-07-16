import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  data: ingredientsReducer,
  modal: modalReducer,
  construct: constructorReducer,
  order: orderReducer
});