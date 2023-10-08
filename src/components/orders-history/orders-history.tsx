import styles from "./orders-history.module.css";
import OrderCard, { orderType } from "../orders/components/order-card/order-card";
import { useAppSelector, useAppDispatch } from "../../utils/hooks"; 
import { getWsOrders } from "../../utils/function_tools";
import { useEffect } from "react";
import {
  wsActions,
} from "../../services/actions/ws-actions";
import { NavLink, useLocation } from "react-router-dom"
import { v4 as uuidv4 } from "uuid";

const OrdersHistory = () => {
  const { orders } = useAppSelector(getWsOrders);
  const location = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: wsActions.WS_ORDERS_CONNECTION_START });

    return () => {
      dispatch({ type: wsActions.WS_ORDERS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  if (!orders) {
    return <p>Loading</p>;
  }

  if (orders.length === 0) {
    return <p>Нет заказов</p>;
  }


  return (
    <div className={styles.wrapper}>
      {orders ? 
        orders.reverse().map((order: orderType) => {
          return(
            <NavLink
              key={uuidv4()}
              className={styles.link}
              to={`${location.pathname}/${order._id}`}
              state={{background : location }} >
            <OrderCard viewStatus={true} key={uuidv4()} order={order} />
            </NavLink>
          )

        })
        : null}
    </div>
  );
};

export default OrdersHistory;
