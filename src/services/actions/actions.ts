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
}
export interface ISetOrderInfo {
    readonly type: typeof SET_ORDER_INFO;
}
export interface ICreateOrderRequest {
    readonly type: typeof CREATE_ORDER_REQUEST;
}
export interface ICreateOrderSuccess {
    readonly type: typeof CREATE_ORDER_SUCCESS;
}
export interface ICreateOrderFailed {
    readonly type: typeof CREATE_ORDER_FAILED;
}
export interface IAddIngrediemtOrder {
    readonly type: typeof ADD_INGREDIENT_ORDER;
}
export interface IRemoveIngrediemtOrder {
    readonly type: typeof REMOVE_INGREDIENT_ORDER;
}
export interface IAddIngrediemtBunOrder {
    readonly type: typeof ADD_INGREDIENT_BUN_ORDER;
}
export interface ISortIngrediemts {
    readonly type: typeof SORT_INGREDIENTS;
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
    | IAddIngrediemtOrder
    | IRemoveIngrediemtOrder
    | IAddIngrediemtBunOrder
    | ISortIngrediemts
    | IClearIngredients