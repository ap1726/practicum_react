import {
  actions
} from "./actions";
import { setNewOrder } from "../../utils/burger-api";

export function addOrder(order: any) {
  return function (dispatch: any) {
    dispatch({
      type: actions.CREATE_ORDER_REQUEST,
    });

    setNewOrder(order)
          .then((result) => {
              if (result && result.success) {
                dispatch({
                  type: actions.CREATE_ORDER_SUCCESS,
                  item: result.order.number,
                });
              }
            })
          .catch( error =>
              {dispatch({ type: actions.CREATE_ORDER_FAILED });}
              );
  };
}

export function deleteIngredientFromOrder(selectedIngredients: any, index: any) {
  return function (dispatch: any) {
    const copyArr = selectedIngredients.slice();
    copyArr.splice(index, 1);
    dispatch({
      type: actions.REMOVE_INGREDIENT_ORDER,
      payload: copyArr,
    });
  };
}