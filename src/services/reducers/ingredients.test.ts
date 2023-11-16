import { ingredientsReducer } from './ingredients';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/actions';

describe('ingredientsReducer', () => {
  it('should handle GET_INGREDIENTS_REQUEST action', () => {
    const initialState = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
    };

    const action = {
      type: GET_INGREDIENTS_REQUEST,
    };

    const expectedState = {
      ...initialState,
      ingredientsRequest: true,
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_INGREDIENTS_SUCCESS action', () => {
    const initialState = {
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
    };

    const action = {
      type: GET_INGREDIENTS_SUCCESS,
      items: [
        {_id: "111",
        __v: 0,
        name: "1111",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "1111",
        image_mobile: "111",
        image_large: "111",
        uniqueId: "1111",
        type: "bun",
        index: 0},
        {_id: "22222",
        __v: 0,
        name: "22222",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "22222",
        image_mobile: "22222",
        image_large: "22222",
        uniqueId: "22222",
        type: "sauce",
        index: 0},
      ],
    };

    const expectedState = {
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredients: action.items,
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_INGREDIENTS_FAILED action', () => {
    const initialState = {
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
    };

    const action = {
      type: GET_INGREDIENTS_FAILED,
    };

    const expectedState = {
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: true,
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

});
