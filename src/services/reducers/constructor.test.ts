import { constructorReducer, addIngredient, addIngredientBun } from './constructor';
import {
  REMOVE_INGREDIENT_ORDER,
  SORT_INGREDIENTS,
  CLEAR_INGREDIENTS
} from '../actions/actions';

const initialState = {
  bun: null,
  data: []
};

describe('constructorReducer', () => {
  const itemInitial = { 
    _id: "111",
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
    uniqueId: expect.any(String),
    type: "bun",
    index: 0 };

  it('should handle ADD_INGREDIENT_ORDER', () => {
    const item = {data: itemInitial};
    const action = addIngredient(item);
    const expectedState = {
      bun: null,
      data: [
        {
          _id: '111',
          __v: 0,
          name: '1111',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: '1111',
          image_mobile: '111',
          image_large: '111',
          uniqueId: expect.any(String),
          type: 'bun',
          index: 0
        }
      ]
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_INGREDIENT_BUN_ORDER', () => {
    const action = addIngredientBun({data: itemInitial});
    const expectedState = {
      bun: {
        _id: '111',
        __v: 0,
        name: '1111',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '1111',
        image_mobile: '111',
        image_large: '111',
        uniqueId: expect.any(String),
        type: 'bun',
        index: 0
      },
      data: []
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REMOVE_INGREDIENT_ORDER', () => {
    const items = [ itemInitial, ]
    const action = { type: REMOVE_INGREDIENT_ORDER, payload: items };
    const expectedState = {
      ...initialState,
      data: items,
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SORT_INGREDIENTS', () => {
    const items = [ itemInitial ];
    const dragIndex = 0;
    const hoverIndex = 1;
    const action = { type: SORT_INGREDIENTS, payload: { dragIndex, hoverIndex } };
    const expectedState = {
      bun: null,
      data: [
        undefined,
        {
          _id: '111',
          __v: 0,
          name: '1111',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: '1111',
          image_mobile: '111',
          image_large: '111',
          uniqueId: expect.any(String),
          type: 'bun',
          index: 0
        }
      ]
    };
    expect(constructorReducer({ ...initialState, data: items }, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INGREDIENTS', () => {
    const action = { type: CLEAR_INGREDIENTS };
    const expectedState = {
      ...initialState,
      data: [],
      bun: null,
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });
});
