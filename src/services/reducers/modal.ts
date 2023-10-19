import {
    OPEN_INGREDIENT_MODAL,
    OPEN_ORDER_MODAL,
    SET_INGREDIENT_INFO,
    CLOSE_MODAL,
    OPEN_MODAL
} from "../actions/actions";

const initialState = {
  ingredientModal: false,
  detailsIngredient: [],
  orderModal: false,
  isOpen: false
};

export const modalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        ingredientModal: true,
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        orderModal: true,
      };
    }
    case SET_INGREDIENT_INFO: {
      return {
        ...state,
        detailsIngredient: action.item,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isOpen: false,
        ingredientModal: false,
        detailsIngredient: [],
        orderModal: false,
      };
    }
    case OPEN_MODAL: {
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