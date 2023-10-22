import { AppThunk } from "../..";
import { getIngredients } from "../../utils/burger-api";
import {
  getIngredientsSuccess,
  getIngredientsFailed,
  getIngredientsRequest,
} from "./actions";

export const getIngredientsStore: AppThunk = () => (dispatch) => {
    dispatch(getIngredientsRequest());

    getIngredients()
          .then((result) => {      
              if (result && result.success) {
                dispatch(getIngredientsSuccess(result.data));
              } else {
                dispatch(getIngredientsFailed());
              }
            })
          .catch( error =>
              {dispatch(getIngredientsFailed());
            })
}