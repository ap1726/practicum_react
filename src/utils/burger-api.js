const NORMA_API = "https://norma.nomoreparties.space/api";

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
   return fetch(`${NORMA_API}/ingredients`)
          .then(checkResponse)
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
  .then(checkResponse);
};

export const forgotPassword = (email) => {
  return fetch(`${NORMA_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  }).then((res) => checkResponse(res));
};

export const resetPassword = (password, token) => {
  return fetch(`${NORMA_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  }).then((res) => checkResponse(res));
};

//Регистрация пользователя
export const registerNewUser = (email, name, password) => {
  return fetch(`${NORMA_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then((res) => checkResponse(res));
};

//Авторизация пользователя
export const loginUser = (email, password) => {
  return fetch(`${NORMA_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => checkResponse(res));
};

//Обновление токена
export const refreshToken = (refreshToken) => {
  return fetch(`${NORMA_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((res) => checkResponse(res));
};

//Выход из системы
export const logout = (refreshToken) => {
  return fetch(`${NORMA_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((res) => checkResponse(res));
};

//Получение данных о пользователе
export const getUserData = (token) => {
  return fetch(`${NORMA_API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  }).then((res) => checkResponse(res));
};

//Изменение данных о пользователе
export const updateUserData = (token, email, name, password) => {
  return fetch(`${NORMA_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  }).then((res) => checkResponse(res));
};