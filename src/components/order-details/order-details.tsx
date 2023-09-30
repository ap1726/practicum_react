import styles from "./order-details.module.css";
import done from '../../images/done.svg';
import { useAppSelector } from "../../utils/hooks";
import { getOrder, getOrderFailed } from "../../utils/function_tools";


const OrderDetails = () => {
  const order = useAppSelector(getOrder);
  const orderFailed = useAppSelector(getOrderFailed);
  return (
    <>{!orderFailed &&
    <div className={`${styles.main} pt-9`}>
      <h2 className={`${styles.title} text text_type_digits-large`}>
        {order}
      </h2>
      <p className={`text mt-10 text_type_main-medium`}>идентификатор заказа</p>
      <img className={`${styles.image} mt-15`} src={done} alt="done" />
      <div className={`${styles.details} mt-15`}>
        <p className={`text text_type_main-default`}>
          Ваш заказ начали готовить
        </p>
        <p className={`text text_type_main-default mt-2`}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>}
    {orderFailed && <></>}
    </>)
}

export default OrderDetails;