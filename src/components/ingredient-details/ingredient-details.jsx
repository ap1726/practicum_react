import styles from "./ingredient-details.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientDetails = (props) => {
  return (
    <li className={styles.card}>
        <img className={styles.img} src={props.data.image} alt={props.data.name} />
        <div className={`mt-2 mb-2`}>
          <span className="text text_type_digits-default pr-2">
            {props.data.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text text_type_main-default">{props.data.name}</p>
        <Counter count={1} size="default" extraClass="m-1" />
    </li>
  );
};

export default IngredientDetails;