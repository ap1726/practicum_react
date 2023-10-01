import {
  actions
} from "../actions/actions";

const initialState = {
  bun: null ,
  data: [],
};
export const constructorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT_ORDER: {
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    }
    case actions.ADD_INGREDIENT_BUN_ORDER: {
      return {
        ...state,
        bun: action.payload.data,
      };
    }
    case actions.REMOVE_INGREDIENT_ORDER: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case actions.SORT_INGREDIENTS: {
      const updatedData = [...state.data];
      updatedData[action.payload.dragIndex] = state.data[action.payload.hoverIndex];
      updatedData[action.payload.hoverIndex] = state.data[action.payload.dragIndex];
      return {
        ...state,
        data: updatedData,
      };
    }
    case actions.CLEAR_INGREDIENTS: {
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