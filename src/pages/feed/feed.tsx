import { useEffect } from "react";
import { useAppDispatch } from "../../utils/hooks"; 
import OrdersStats from "../../components/orders-stats/orders-stats";
import Orders from "../../components/orders/orders";
import {
  wsActions
} from "../../services/actions/ws-actions";
import styles from "./feed.module.css";


const Feed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: wsActions.WS_FEED_CONNECTION_START });

    return () => {
      dispatch({type: wsActions.WS_FEED_CONNECTION_CLOSED})
    }
  }, [dispatch]);


  return (
    <main className={styles.wrapper}>
      <h2 className={styles.title + 'text text_type_main-large'}>
        Лента заказов
      </h2>
      <div className={styles.container}>
        <Orders />
        <OrdersStats />
      </div>
    </main>
  );
};

export default Feed;
