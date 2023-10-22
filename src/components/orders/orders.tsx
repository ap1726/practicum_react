import styles from "./orders.module.css";
import OrderCard from "./components/order-card/order-card";
import { useAppSelector } from "../../utils/hooks"; 
import { getWsFeed } from "../../utils/function_tools";
import { useLocation, NavLink } from "react-router-dom";


const Orders = () => {
  const { orders } = useAppSelector(getWsFeed);
  const location = useLocation();

  return (
    <ul className={styles.ordersList}>
      {orders && orders.map((item, index) => {
          return(
            <NavLink
              key={'navLink__'+item._id}
              className={styles.link}
              to={`${location.pathname}/${item._id}`}
              state = {{background: location }} >
              <OrderCard order={item} key={'orderCard__'+item._id} />
            </NavLink>

          )
        })}
    </ul>
  );
};

export default Orders;
