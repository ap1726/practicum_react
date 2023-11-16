import { modalReducer } from "./modal";
import {
  OPEN_INGREDIENT_MODAL,
  OPEN_ORDER_MODAL,
  SET_INGREDIENT_INFO,
  CLOSE_MODAL,
  OPEN_MODAL
} from "../actions/actions";

describe("modalReducer", () => {
  const initialState = {
    ingredientModal: false,
    detailsIngredient: undefined,
    orderModal: false,
    isOpen: false
  };
  const item = {
    _id: "111",
    __v: 0,
    name: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "2222",
    image_mobile: "333",
    image_large: "44",
    uniqueId: "555",
    type: "bun",
    index: 0
  };
  it("should handle OPEN_INGREDIENT_MODAL action", () => {
    const action = {
      type: OPEN_INGREDIENT_MODAL
    };

    const newState = modalReducer(initialState, action);

    expect(newState.ingredientModal).toBeTruthy();
    expect(newState.orderModal).toBeFalsy();
    expect(newState.isOpen).toBeFalsy();
    expect(newState.detailsIngredient).toBeUndefined();
  });

  it("should handle OPEN_ORDER_MODAL action", () => {
    const action = {
      type: OPEN_ORDER_MODAL
    };

    const newState = modalReducer(initialState, action);

    expect(newState.ingredientModal).toBeFalsy();
    expect(newState.orderModal).toBeTruthy();
    expect(newState.isOpen).toBeFalsy();
    expect(newState.detailsIngredient).toBeUndefined();
  });

  it("should handle SET_INGREDIENT_INFO action", () => {
    const action = {
      type: SET_INGREDIENT_INFO,
      item
    };

    const newState = modalReducer(initialState, action);

    expect(newState.ingredientModal).toBeFalsy();
    expect(newState.orderModal).toBeFalsy();
    expect(newState.isOpen).toBeFalsy();
    expect(newState.detailsIngredient).toEqual(item);
  });

  it("should handle CLOSE_MODAL action", () => {
    const action = {
      type: CLOSE_MODAL
    };

    const newState = modalReducer(initialState, action);

    expect(newState.ingredientModal).toBeFalsy();
    expect(newState.orderModal).toBeFalsy();
    expect(newState.isOpen).toBeFalsy();
    expect(newState.detailsIngredient).toBeUndefined();
  });

  it("should handle OPEN_MODAL action", () => {
    const action = {
      type: OPEN_MODAL
    };

    const newState = modalReducer(initialState, action);

    expect(newState.ingredientModal).toBeFalsy();
    expect(newState.orderModal).toBeFalsy();
    expect(newState.isOpen).toBeTruthy();
    expect(newState.detailsIngredient).toBeUndefined();
  });
});
