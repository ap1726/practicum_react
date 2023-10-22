import { TOrderType } from "../../components/orders/components/order-card/order-card";
import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILED,
  TActions
} from "../actions/actions";

type TOrder = {
  order: number|TOrderType,
  orderRequest: boolean,
  orderFailed: boolean,
};

const initialState: TOrder = {
  order: 0,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TActions): TOrder => {
  switch (action.type) {
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        order: action.item,
      };
    }
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};