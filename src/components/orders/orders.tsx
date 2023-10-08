import styles from "./orders.module.css";
import OrderCard, { orderType } from "./components/order-card/order-card";
import { useAppSelector } from "../../utils/hooks"; 
import { getWsFeed } from "../../utils/function_tools";
import { useLocation, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";


const Orders = () => {
  const { orders } = useAppSelector(getWsFeed);
  const location = useLocation();

  return (
    <ul className={styles.ordersList}>
      {orders && orders.map((item: orderType, index: number) => {
          return(
            <NavLink
              key={uuidv4()}
              className={styles.link}
              to={`${location.pathname}/${item._id}`}
              state = {{background: location }} >
              <OrderCard order={item} key={index} />
            </NavLink>

          )
        })}
    </ul>
  );
};

export default Orders;
