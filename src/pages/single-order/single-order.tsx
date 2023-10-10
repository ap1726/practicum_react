import styles from './single-order.module.css';
import { useParams, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { useEffect, useMemo } from 'react';
import OrderPositions from '../../components/order-position-list/order-position';
import { getData, formatDate } from '../../utils/function_tools';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { wsActions } from '../../services/actions/ws-actions';
import { feedPage, ordersPage, profilePage } from '../../utils/variables';
import { itemDataType } from '../../components/ingredient/ingredient';
import { orderType } from '../../components/orders/components/order-card/order-card';

const SingleOrder = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const profileOrders = useAppSelector((store) => store.wsOrders.orders);
  const feedOrders = useAppSelector((store) => store.wsFeed.orders);
  const data = useAppSelector(getData);
  const isProfileOrders = `${profilePage}/${ordersPage}/${id}`;
  const isFeedOrders = `${feedPage}/${id}`;
  const path = useLocation();
  console.log(path)
  const orders = path?.pathname === isProfileOrders ? profileOrders : feedOrders;

  const order = useMemo(
    () => orders.filter((order: orderType) => order._id === id)[0],[orders,id]
  )


  const orderIngredientsData = useMemo(() => {
    return order ? order.ingredients.map((id: string) => {
      return data.find((item: itemDataType) => {
        return id === item._id;
      });
    }) : 0;
  }, [order,data]);

  const orderTotalPrice = useMemo(() => {
    return order ? orderIngredientsData.reduce((sum: number, item: itemDataType) => {
      if (item.type === "bun") {
        return (sum += item.price * 2);
      }
      return (sum += item ? item.price : 0);
    }, 0) : 0;
  }, [orderIngredientsData, order]);

  useEffect(() => {
    if (path?.pathname === isProfileOrders) {
      dispatch({ type: wsActions.WS_ORDERS_CONNECTION_START });
    }
    if (path?.pathname === isFeedOrders) {
      dispatch({ type: wsActions.WS_FEED_CONNECTION_START });
    }

    return () => {
      if (path?.pathname === isProfileOrders) {
        dispatch({ type: wsActions.WS_ORDERS_CONNECTION_CLOSED });
      }
      if (path?.pathname === isFeedOrders) {
        dispatch({ type: wsActions.WS_FEED_CONNECTION_CLOSED });
      }
    };
  }, [dispatch, isProfileOrders, isFeedOrders, path]);


  return(
    <>
    { order &&
    <div className={styles.wrapper}>
      <p className={`text text_type_digits-default ${styles.number}`}>#{order ? order.number : null}</p>
      <p className="text text_type_main-medium mt-10">{order ? order.name : null}</p>
      <p className={`text text_type_main-small mt-3 ${styles.status}`}>
        {order.status === "done"
        ? "Выполнен"
        : order.status === "pending"
        ? "Готовится"
        : order.status === "created"
        ? "Создан"
        : "Выполнен"}
      </p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <div className={`${styles.ingredientsContainer} mt-6 mb-10 pr-6`}>

      <OrderPositions ingredients={orderIngredientsData}/>

      </div>
      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {order ? formatDate(order.createdAt) : null}
        </p>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default">{orderTotalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default SingleOrder;
