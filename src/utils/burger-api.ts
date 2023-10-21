import { IData } from "../components/ingredient/ingredient";

import { NORMA_API } from "./variables";

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const request = (endpoint: string, options?: object) => {
  // принимает два аргумента: endpoint и объект опций, как и `fetch`
  return fetch(NORMA_API+endpoint, options).then(checkResponse)
}

export const getIngredients = () => {
   return request("/ingredients")
}

// ingredients - массив _id ингредиентов 
export const setNewOrder = (ingredients: IData, token?: string) => {
  return request("/orders", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
        method: "POST",
        body: JSON.stringify({ingredients: ingredients}),
      })
};

export const forgotPassword = (email: string) => {
  return request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  })
};

export const resetPassword = (password: string, token?: string) => {
  return request("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  })
};

//Регистрация пользователя
export const registerNewUser = (email: string, name: string, password: string) => {
  return request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  })
};

//Авторизация пользователя
export const loginUser = (email: string, password: string) => {
  return request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
};

//Обновление токена
export const refreshToken = (refreshToken?: string) => {
  return request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  })
};

//Выход из системы
export const logout = (refreshToken?: string) => {
  return request("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  })
};

//Получение данных о пользователе
export const getUserData = (token?: string) => {
  return request("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  })
};

//Изменение данных о пользователе
export const updateUserData = (email: string, name: string, password: string, token?: string) => {
  return request("/auth/user", {
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
  })
};