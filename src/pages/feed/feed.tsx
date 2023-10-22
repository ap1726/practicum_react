import { useEffect } from "react";
import { useAppDispatch } from "../../utils/hooks"; 
import OrdersStats from "../../components/orders-stats/orders-stats";
import Orders from "../../components/orders/orders";
import {
  wsFeedConnectionStart,
  wsFeedConnectionClosed
  } from "../../services/actions/ws-actions";
import styles from "./feed.module.css";


const Feed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsFeedConnectionStart());

    return () => {
      dispatch(wsFeedConnectionClosed())
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
