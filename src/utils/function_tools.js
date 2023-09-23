export const getIngredientsByType = (arr, type) => {
  return arr.filter((item) => item.type === type);
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}


export const getOrderModal = (store) => store.modal.orderModal;
export const getOpenDetails = (store) => store.modal.ingredientModal;
export const getDetailsIngredient = (store) => store.modal.detailsIngredient;
export const getIsOpen = (store) => store.modal;

export const getIsLoad = (store) => store.data.ingredientsRequest;
export const getData = (store) => store.data.ingredients;

export const getIngredients = (store) => store.construct;

export const getOrder = (store) => store.order.order;

export const getOrderFailed = (store) => store.order.orderFailed;
export const getSelectedIngredients = (store) => store.construct.data;
export const getSelectedBun = (store) => store.construct.bun;

export const getUserData = (store) => store.user.userData;
export const getIsForgotPassword = (store) => store.user.isPasswordForgot;
