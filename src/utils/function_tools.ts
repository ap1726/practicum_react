import { itemType } from "../components/burger-constructor/constructor-item/constructor-item";
export const getIngredientsByType = (arr: any, type: string) => {
  return arr.filter((item: itemType) => item.type === type);
}

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

// store в следeющем спринте
export const getOrderModal = (store: any) => store.modal.orderModal;
export const getOpenDetails = (store: any) => store.modal.ingredientModal;
export const getDetailsIngredient = (store: any) => store.modal.detailsIngredient;
export const getIsOpen = (store: any) => store.modal;

export const getIsLoad = (store: any) => store.data.ingredientsRequest;
export const getData = (store: any) => store.data.ingredients;

export const getIngredients = (store: any) => store.construct;

export const getOrder = (store: any) => store.order.order;

export const getOrderFailed = (store: any) => store.order.orderFailed;
export const getSelectedIngredients = (store: any) => store.construct.data;
export const getSelectedBun = (store: any) => store.construct.bun;

export const getUserData = (store: any) => store.user.userData;
export const getIsForgotPassword = (store: any) => store.user.isPasswordForgot;
