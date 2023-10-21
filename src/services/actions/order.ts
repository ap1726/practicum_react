import {
    createOrderRequest,
    createOrderFailed,
    createOrderSuccess,
    removeIngredientOrder,
  } from "./actions";
import { setNewOrder } from "../../utils/burger-api";
import { AppThunk } from "../..";
import { getCookie } from "../../utils/cookie";
import { IData, TItemDataType } from "../../components/ingredient/ingredient";

export const addOrder: AppThunk = (order: IData) => (dispatch) =>{
    const token = getCookie("accessToken");
    dispatch(createOrderRequest());
    setNewOrder(order, token)
          .then((result) => {
              if (result && result.success) {
                dispatch(createOrderSuccess(result.order.number));
              }
            })
          .catch( error =>
              {dispatch(createOrderFailed());
                console.log(error)}
              );
};

export const deleteIngredientFromOrder: AppThunk = (selectedIngredients: Array<TItemDataType>, index: number) => {
  return function (dispatch) {
    const copyArr = selectedIngredients.slice();
    copyArr.splice(index, 1);
    dispatch(removeIngredientOrder(copyArr));
  };
}