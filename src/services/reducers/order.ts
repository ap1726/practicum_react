import {
  actions
} from "../actions/actions";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        order: action.item,
      };
    }
    case actions.CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case actions.CREATE_ORDER_FAILED: {
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