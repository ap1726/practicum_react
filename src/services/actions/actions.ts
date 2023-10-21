import { TItemDataType } from "../../components/ingredient/ingredient"
import { TOrderType } from "../../components/orders/components/order-card/order-card"

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST"
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS"
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED"
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL"
export const OPEN_MODAL: "OPEN_MODAL" = "OPEN_MODAL"
export const OPEN_INGREDIENT_MODAL: "OPEN_INGREDIENT_MODAL" = "OPEN_INGREDIENT_MODAL"
export const OPEN_ORDER_MODAL: "OPEN_ORDER_MODAL" = "OPEN_ORDER_MODAL"
export const SET_INGREDIENT_INFO: "SET_INGREDIENT_INFO" = "SET_INGREDIENT_INFO"
export const SET_ORDER_INFO: "SET_ORDER_INFO" = "SET_ORDER_INFO"
export const CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST" = "CREATE_ORDER_REQUEST"
export const CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS" = "CREATE_ORDER_SUCCESS"
export const CREATE_ORDER_FAILED: "CREATE_ORDER_FAILED" = "CREATE_ORDER_FAILED"
export const ADD_INGREDIENT_ORDER: "ADD_INGREDIENT_ORDER" = "ADD_INGREDIENT_ORDER"
export const REMOVE_INGREDIENT_ORDER: "REMOVE_INGREDIENT_ORDER" = "REMOVE_INGREDIENT_ORDER"
export const ADD_INGREDIENT_BUN_ORDER: "ADD_INGREDIENT_BUN_ORDER" = "ADD_INGREDIENT_BUN_ORDER"
export const SORT_INGREDIENTS: "SORT_INGREDIENTS" = "SORT_INGREDIENTS"
export const CLEAR_INGREDIENTS: "CLEAR_INGREDIENTS" = "CLEAR_INGREDIENTS"

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    items: Array<TItemDataType>;
}
export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface ICloseModal {
    readonly type: typeof CLOSE_MODAL;
}
export interface IOpenModal {
    readonly type: typeof OPEN_MODAL;
}
export interface IOpenIngredientModal {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
}
export interface IOpenOrderModal{
    readonly type: typeof OPEN_ORDER_MODAL;
}
export interface ISetIngredientInfo {
    readonly type: typeof SET_INGREDIENT_INFO;
    item: TItemDataType;
}
export interface ISetOrderInfo {
    readonly type: typeof SET_ORDER_INFO;
}
export interface ICreateOrderRequest {
    readonly type: typeof CREATE_ORDER_REQUEST;
}
export interface ICreateOrderSuccess {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly item: TOrderType | number;
}
export interface ICreateOrderFailed {
    readonly type: typeof CREATE_ORDER_FAILED;
}
export interface IAddIngredientOrder {
    readonly type: typeof ADD_INGREDIENT_ORDER;
    payload: {data: TItemDataType};
}
export interface IRemoveIngredientOrder {
    readonly type: typeof REMOVE_INGREDIENT_ORDER;
    readonly payload: Array<TItemDataType>;
}
export interface IAddIngredientBunOrder {
    readonly type: typeof ADD_INGREDIENT_BUN_ORDER;
    payload: {data: TItemDataType};
}
export interface ISortIngredients {
    readonly type: typeof SORT_INGREDIENTS;
    readonly payload: {dragIndex: number, hoverIndex: number}
}
export interface IClearIngredients {
    readonly type: typeof CLEAR_INGREDIENTS;
}

export type TActions = 
    | IGetIngredientsRequest
    | IGetIngredientsSuccess
    | IGetIngredientsFailed
    | ICloseModal
    | IOpenModal
    | IOpenIngredientModal
    | IOpenOrderModal
    | ISetIngredientInfo
    | ISetOrderInfo
    | ICreateOrderRequest
    | ICreateOrderSuccess
    | ICreateOrderFailed
    | IAddIngredientOrder
    | IRemoveIngredientOrder
    | IAddIngredientBunOrder
    | ISortIngredients
    | IClearIngredients

export const getIngredientsRequest = ():IGetIngredientsRequest => ({type: GET_INGREDIENTS_REQUEST});
export const getIngredientsSuccess = (ingredients: Array<TItemDataType>):IGetIngredientsSuccess => ({type: GET_INGREDIENTS_SUCCESS, items: ingredients});
export const getIngredientsFailed = ():IGetIngredientsFailed => ({type: GET_INGREDIENTS_FAILED});
export const closeModal = ():ICloseModal => ({type: CLOSE_MODAL});
export const openModal = ():IOpenModal => ({type: OPEN_MODAL});
export const openIngredientModal = ():IOpenIngredientModal => ({type: OPEN_INGREDIENT_MODAL});
export const openOrderModal = ():IOpenOrderModal => ({type: OPEN_ORDER_MODAL});
export const setIngredientInfo = (ingredientData: TItemDataType):ISetIngredientInfo => ({type: SET_INGREDIENT_INFO,
                                                            item: ingredientData
                                                        });
export const setOrderInfo = ():ISetOrderInfo => ({type: SET_ORDER_INFO});
export const createOrderRequest = ():ICreateOrderRequest => ({type: CREATE_ORDER_REQUEST});
export const createOrderSuccess = (number: number):ICreateOrderSuccess => ({type: CREATE_ORDER_SUCCESS, item: number});
export const createOrderFailed = ():ICreateOrderFailed => ({type: CREATE_ORDER_FAILED});

export const addIngredientOrder = (ingredientData: TItemDataType):IAddIngredientOrder => ({type: ADD_INGREDIENT_ORDER, payload: {data: ingredientData}});
export const removeIngredientOrder = (ingredientsOrder: Array<TItemDataType>):IRemoveIngredientOrder => ({type: REMOVE_INGREDIENT_ORDER, payload: ingredientsOrder});
export const addIngredientBunOrder = (ingredientData: TItemDataType):IAddIngredientBunOrder => ({type: ADD_INGREDIENT_BUN_ORDER, payload: {data: ingredientData}});
export const sortIngredients = (dIndex: number, hIndex: number):ISortIngredients => ({type: SORT_INGREDIENTS, payload: {dragIndex: dIndex, hoverIndex: hIndex}});
export const clearIngredient = ():IClearIngredients => ({type: CLEAR_INGREDIENTS});