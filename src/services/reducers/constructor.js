import {
  ADD_INGREDIENT_ORDER,
  ADD_INGREDIENT_BUN_ORDER,
  REMOVE_INGREDIENT_ORDER,
  SORT_INGREDIENTS,
  CLEAR_INGREDIENTS,
} from "../actions/actions";

const initialState = {
  bun: null ,
  data: [],
};
export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_ORDER: {
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    }
    case ADD_INGREDIENT_BUN_ORDER: {
      return {
        ...state,
        bun: action.payload.data,
      };
    }
    case REMOVE_INGREDIENT_ORDER: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case SORT_INGREDIENTS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        data: [],
        bun: {},
      };
    }
    default: {
      return state;
    }
  }
};