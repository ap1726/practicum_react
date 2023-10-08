import { itemType } from "../components/burger-constructor/constructor-item/constructor-item";
import { orderType } from "../components/orders/components/order-card/order-card";
export const getIngredientsByType = (arr: any, type: string) => {
  return arr.filter((item: itemType) => item.type === type);
}

// store в следующем спринте
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

export const getWsFeed = (store: any) => store.wsFeed;

export const getWsOrders = (store: any) => store.wsOrders;

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