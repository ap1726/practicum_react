import { AppDispatch, AppThunk } from "../..";
import { getIngredients } from "../../utils/burger-api";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "./actions";

export const getIngredientsStore: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });

    getIngredients()
          .then((result) => {      
              if (result && result.success) {
                dispatch({
                  type: GET_INGREDIENTS_SUCCESS,
                  items: result.data,
                });
              } else {
                dispatch({ type: GET_INGREDIENTS_FAILED });
              }
            })
          .catch( error =>
              {dispatch({ type: GET_INGREDIENTS_FAILED });
            })
  };
}