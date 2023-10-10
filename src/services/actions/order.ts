import {
  actions
} from "./actions";
import { setNewOrder } from "../../utils/burger-api";
import { AppDispatch } from "../..";
import { getCookie } from "../../utils/cookie";

export function addOrder(order: any) {
  const token = getCookie("accessToken");

  return function (dispatch: AppDispatch) {
    dispatch({
      type: actions.CREATE_ORDER_REQUEST,
    });
    setNewOrder(order, token)
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
  return function (dispatch: AppDispatch) {
    const copyArr = selectedIngredients.slice();
    copyArr.splice(index, 1);
    dispatch({
      type: actions.REMOVE_INGREDIENT_ORDER,
      payload: copyArr,
    });
  };
}