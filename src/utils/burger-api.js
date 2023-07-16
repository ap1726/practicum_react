const NORMA_API = "https://norma.nomoreparties.space/api";

export const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
   return fetch(`${NORMA_API}/ingredients`)
          .then(checkReponse)
}

// ingredients - массив _id ингредиентов 
export const setNewOrder = (ingredients) => {
  return fetch(`${NORMA_API}/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
        method: "POST",
        body: JSON.stringify({ingredients: ingredients}),
      })
  .then(checkReponse);
};