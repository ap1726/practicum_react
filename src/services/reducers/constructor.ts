import { IData, TItemDataType } from "../../components/ingredient/ingredient";
import {
    ADD_INGREDIENT_ORDER,
    REMOVE_INGREDIENT_ORDER,
    ADD_INGREDIENT_BUN_ORDER,
    SORT_INGREDIENTS,
    CLEAR_INGREDIENTS,
    TActions,
} from "../actions/actions";
import { v4 as uuidv4 } from "uuid";

type TConstructor = {
  bun: TItemDataType | null,
  data: Array<TItemDataType>
};

const initialState: TConstructor = {
  bun: null ,
  data: [],
};
export const constructorReducer = (state = initialState, action: TActions):TConstructor => {
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
      const updatedData = [...state.data];
      updatedData[action.payload.dragIndex] = state.data[action.payload.hoverIndex];
      updatedData[action.payload.hoverIndex] = state.data[action.payload.dragIndex];
      return {
        ...state,
        data: updatedData,
      };
    }
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        data: [],
        bun: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const addIngredient = (item: IData) => {
  return {
      type: ADD_INGREDIENT_ORDER,
      payload: {
          ...item, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
         data: {...item.data, uniqueId: uuidv4()}  // и добавляем в объект новое поле, которое потом будет использовано в `key`
      }
  }
}

export const addIngredientBun = (item: IData) => {
  return {
      type: ADD_INGREDIENT_BUN_ORDER,
      payload: {
          ...item, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
         bun: {...item.data, uniqueId: uuidv4()}
      }
  }
}