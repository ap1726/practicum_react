import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/app/app";
import reportWebVitals from './reportWebVitals';
import { rootReducer } from "./services/reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { wsOrdersUrl, wsUrlAll } from './utils/variables';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
import { wsActions } from './services/actions/ws-actions';
import { socketMiddleware } from './services/middleware/ws-middleware';

const feedWsActions = {
  wsInit: wsActions.WS_FEED_CONNECTION_START,
  wsSendMessage: wsActions.WS_FEED_SEND_MESSAGE,
  onOpen: wsActions.WS_FEED_CONNECTION_SUCCESS,
  onClose: wsActions.WS_FEED_CONNECTION_CLOSED,
  onError: wsActions.WS_FEED_CONNECTION_ERROR,
  onMessage: wsActions.WS_FEED_GET_MESSAGE,
};

const userOrdersWsActions = {
  wsInit: wsActions.WS_ORDERS_CONNECTION_START,
  wsSendMessage: wsActions.WS_ORDERS_SEND_MESSAGE,
  onOpen: wsActions.WS_ORDERS_CONNECTION_SUCCESS,
  onClose: wsActions.WS_ORDERS_CONNECTION_CLOSED,
  onError: wsActions.WS_ORDERS_CONNECTION_ERROR,
  onMessage: wsActions.WS_ORDERS_GET_MESSAGE,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk,
    socketMiddleware(wsUrlAll, feedWsActions, false),
    socketMiddleware(wsOrdersUrl, userOrdersWsActions, true)
    ));
const store = createStore(rootReducer, enhancer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
