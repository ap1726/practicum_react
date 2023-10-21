import { TItemDataType } from "../../components/ingredient/ingredient";
import {
    OPEN_INGREDIENT_MODAL,
    OPEN_ORDER_MODAL,
    SET_INGREDIENT_INFO,
    CLOSE_MODAL,
    OPEN_MODAL,
    TActions
} from "../actions/actions";

type TModal = {
  ingredientModal: boolean,
  detailsIngredient?: TItemDataType,
  orderModal: boolean,
  isOpen: boolean
};

const initialState: TModal = {
  ingredientModal: false,
  detailsIngredient: undefined,
  orderModal: false,
  isOpen: false
};

export const modalReducer = (state = initialState, action: TActions):TModal => {
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
        detailsIngredient: undefined,
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