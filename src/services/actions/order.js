import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  REMOVE_INGREDIENT_ORDER,
} from "./actions";
import { setNewOrder } from "../../utils/burger-api";

export function addOrder(order) {
  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    setNewOrder(order)
          .then((result) => {
              if (result && result.success) {
                dispatch({
                  type: CREATE_ORDER_SUCCESS,
                  item: result.order.number,
                });
              }
            })
          .catch( error =>
              {dispatch({ type: CREATE_ORDER_FAILED });}
              );
  };
}

export function deleteIngredientFromOrder(selectedIngredients, index) {
  return function (dispatch) {
    const copyArr = selectedIngredients.slice();
    copyArr.splice(index, 1);
    dispatch({
      type: REMOVE_INGREDIENT_ORDER,
      payload: copyArr,
    });
  };
}