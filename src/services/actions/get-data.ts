import { getIngredients } from "../../utils/burger-api";
import {
  actions
} from "./actions";

export function getIngredientsStore(): any {
  return function (dispatch: any) {
    dispatch({
      type: actions.GET_INGREDIENTS_REQUEST,
    });

    getIngredients()
          .then((result) => {      
              if (result && result.success) {
                dispatch({
                  type: actions.GET_INGREDIENTS_SUCCESS,
                  items: result.data,
                });
              } else {
                dispatch({ type: actions.GET_INGREDIENTS_FAILED });
              }
            })
          .catch( error =>
              {dispatch({ type: actions.GET_INGREDIENTS_FAILED });
            })
  };
}