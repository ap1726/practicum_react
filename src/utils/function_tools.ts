import { RootState } from "..";
import { itemType } from "../components/burger-constructor/constructor-item/constructor-item";
import { orderType } from "../components/orders/components/order-card/order-card";
export const getIngredientsByType = (arr: any, type: string) => {
  return arr.filter((item: itemType) => item.type === type);
}

// store в следующем спринте
export const getOrderModal = (store: RootState) => store.modal.orderModal;
export const getOpenDetails = (store: RootState) => store.modal.ingredientModal;
export const getDetailsIngredient = (store: RootState) => store.modal.detailsIngredient;
export const getIsOpen = (store: RootState) => store.modal;

export const getIsLoad = (store: RootState) => store.data.ingredientsRequest;
export const getData = (store: RootState) => store.data.ingredients;

export const getIngredients = (store: RootState) => store.construct;

export const getOrder = (store: RootState) => store.order.order;

export const getOrderFailed = (store: RootState) => store.order.orderFailed;
export const getSelectedIngredients = (store: RootState) => store.construct.data;
export const getSelectedBun = (store: RootState) => store.construct.bun;

export const getUserData = (store: RootState) => store.user.userData;
export const getIsForgotPassword = (store: RootState) => store.user.isPasswordForgot;

export const getWsFeed = (store: RootState) => store.wsFeed;

export const getWsOrders = (store: RootState) => store.wsOrders;

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

export const formatDate = (date: Date) => {
  const createdAt = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = Math.ceil(
    (today.getTime() - createdAt.getTime()) / (60 * 60 * 24 * 1000)
  );
  const hours =
    createdAt.getHours() > 9
      ? createdAt.getHours()
      : `0${createdAt.getHours()}`;
  const min =
    createdAt.getMinutes() > 9
      ? createdAt.getMinutes()
      : `0${createdAt.getMinutes()}`;
  const getDays = (days: number) =>
    days === 0
      ? "Сегодня"
      : days === 1
      ? "Вчера"
      : days > 1
      ? `${days} дня(-ей) назад`
      : "Ошибка";
  return `${getDays(diffTime)}, ${hours}:${min}`;
};

export const filterOrders = (orders: Array<orderType>) => {
    if (!orders) {
      return null
    }
    type resultType = {
      done: Array<number>,
      pending: Array<number>,
    }
    const result: resultType = {done: [], pending: []}
    
    orders.filter((item) => {
      return item.status === "done"
      ? result.done.push(item.number)
      : result.pending.push(item.number)
    })
    return result
} 

export const uniq = (arr: Array<any>) => {
    let result = [];
    for (let i=0;i<arr.length;i++) {
      if (result.indexOf(arr[i]) === -1) {
          result.push(arr[i]);
      }
    }
    return result
}