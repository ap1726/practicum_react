import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/app/app";
import reportWebVitals from './reportWebVitals';
import { rootReducer } from "./services/reducers";
import { Provider } from "react-redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { compose, createStore, applyMiddleware, ActionCreator, AnyAction } from 'redux';
import { HashRouter as Router } from 'react-router-dom';
import { wsOrdersUrl, wsUrlAll } from './utils/variables';
import { WS_FEED_CONNECTION_START,
        WS_FEED_SEND_MESSAGE,
        WS_FEED_CONNECTION_SUCCESS,
        WS_FEED_CONNECTION_CLOSED,
        WS_FEED_CONNECTION_ERROR,
        WS_FEED_GET_MESSAGE,
        WS_ORDERS_CONNECTION_START,
        WS_ORDERS_SEND_MESSAGE,
        WS_ORDERS_CONNECTION_SUCCESS,
        WS_ORDERS_CONNECTION_CLOSED,
        WS_ORDERS_CONNECTION_ERROR,
        WS_ORDERS_GET_MESSAGE,
        TWsActions, } from './services/actions/ws-actions';
import { socketMiddleware } from './services/middleware/ws-middleware';
import { TUserActions } from './services/actions/user';
import { TActions } from './services/actions/actions';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const feedWsActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE,
};

const userOrdersWsActions = {
  wsInit: WS_ORDERS_CONNECTION_START,
  wsSendMessage: WS_ORDERS_SEND_MESSAGE,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onMessage: WS_ORDERS_GET_MESSAGE,
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
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, null, AnyAction>
export type TApplicationActions = 
        | TWsActions
        | TUserActions
        | TActions

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, null, TApplicationActions>
>; 

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
