import styles from "./ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import { TypeIngredient } from '../../utils/prop-types.js';
import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getOpenDetails, getIngredients } from "../../utils/function_tools";
import {
  OPEN_INGREDIENT_MODAL,
  SET_INGREDIENT_INFO
} from "../../services/actions/actions";

import { useDrag } from "react-dnd";

const Ingedient = ({data}) => {

  const ingredients = useSelector(getIngredients);
  const isOpenDetails = useSelector(getOpenDetails);
  const dispatch = useDispatch();
  const handleClick = () => {
      dispatch({
        type: SET_INGREDIENT_INFO,
        item: data,
      });
      dispatch({ type: OPEN_INGREDIENT_MODAL });
    };

  const count = useMemo(() => {
    let result = null;
    if (data.type === "bun" && ingredients.bun._id === data._id) {
      result = 1;
    } else {
      result = ingredients.data.filter((item) => item._id === data._id).length;
    }

    return result;
  }, [data, ingredients]);


  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { data },
  });

  return (
    <><div ref={dragRef} className={styles.card} onClick={()=>handleClick()} >
        {count>0?<Counter count={count} size="default" extraClass={styles.counter_my} />:
        <></>}
        <img className={styles.img} src={data.image} alt={data.name} />
        <div className={`mt-2 mb-2`}>
          <span className="text text_type_digits-default pr-2">
            {data.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text text_type_main-default">{data.name}</p>
    </div>
    {isOpenDetails && <Modal body={<IngredientDetails data={data} />} title="Детали ингредиента" />}</>
  );
};

Ingedient.propTypes = {data: TypeIngredient};

export default Ingedient;