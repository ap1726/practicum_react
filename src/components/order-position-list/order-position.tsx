import styles from "./order-position.module.css";
import IngredientImage from "../orders/components/ingredient-image/ingredient-image";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../utils/hooks"; 
import { getData } from "../../utils/function_tools";
import { FC, useMemo } from "react";
import { uniq } from "../../utils/function_tools";
import { itemDataType } from "../ingredient/ingredient";

type orderPositionsType = {
  ingredients: Array<itemDataType>
}
const OrderPositions: FC<orderPositionsType> = ({ ingredients }) => {
  const data = useAppSelector(getData);
  
  const count = (elem: itemDataType) => {
    let count = ingredients.filter((item: itemDataType) => {
      return item === elem;
    }).length;
    return count;
  }

  const orderIngredient = useMemo(() => {
    return ingredients.map((elem: itemDataType) => {
      return data.find((item: itemDataType) => {
        return elem._id === item._id;
      });
    });
  }, [ingredients, data]);

  const orderIngredients = uniq(orderIngredient)

  return( 
    <ul className={styles.ingredientList}>
      {orderIngredients.map((item,index) => { 
        return(
      <li className={styles.wrapper} key={index}>
        <div className={styles.container}>
        <IngredientImage image={item.image} alt={item.name}/>
        <p className="text text_type_main-default ml-4">{item.name}</p>
        </div>
        <div className={styles.container}>
          <p className="text text_type_digits-default">{`${count(item)} x ${item.price}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </li>
        )
      })}
    </ul>
  )
};

export default OrderPositions;
