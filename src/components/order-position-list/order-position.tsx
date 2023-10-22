import styles from "./order-position.module.css";
import IngredientImage from "../orders/components/ingredient-image/ingredient-image";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../utils/hooks"; 
import { getData } from "../../utils/function_tools";
import { FC, useMemo } from "react";
import { uniq } from "../../utils/function_tools";
import { TItemDataType } from "../ingredient/ingredient";

export type TOrderPositionsType = {
  ingredients: Array<TItemDataType>
}
const OrderPositions: FC<TOrderPositionsType> = ({ ingredients }) => {
  const data = useAppSelector(getData);
  
  const count = (elem: TItemDataType) => {
    let count = ingredients.filter((item) => {
      return item === elem;
    }).length;
    return count;
  }

  const orderIngredient = useMemo(() => {
    return ingredients.map((elem) => {
      return data.find((item: TItemDataType) => {
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
