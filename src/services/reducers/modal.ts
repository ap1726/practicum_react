import {
  actions
} from "../actions/actions";

const initialState = {
  ingredientModal: false,
  detailsIngredient: [],
  orderModal: false,
  isOpen: false
};

export const modalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        ingredientModal: true,
      };
    }
    case actions.OPEN_ORDER_MODAL: {
      return {
        ...state,
        orderModal: true,
      };
    }
    case actions.SET_INGREDIENT_INFO: {
      return {
        ...state,
        detailsIngredient: action.item,
      };
    }
    case actions.CLOSE_MODAL: {
      return {
        ...state,
        isOpen: false,
        ingredientModal: false,
        detailsIngredient: [],
        orderModal: false,
      };
    }
    case actions.OPEN_MODAL: {
      return {
        ...state,
        isOpen: true,
      };
    }
    default: {
      return state;
    }
  }
};