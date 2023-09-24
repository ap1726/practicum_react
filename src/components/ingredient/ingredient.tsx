import styles from "./ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useMemo, FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getOpenDetails, getIngredients } from "../../utils/function_tools";
import {
  actions
} from "../../services/actions/actions";

import { useDrag } from "react-dnd";

import { BUN, ingredientsPage } from '../../utils/variables'

import { Link, useLocation } from "react-router-dom";

export type itemDataType = {
      _id: string,
      name: string,
      type: string,
      proteins: number,
      fat: number,
      carbohydrates: number,
      calories: number,
      price: number,
      image: string,
      image_mobile: string,
      image_large: string,
      __v: number
  }

export interface IData {
    data: itemDataType
}

export const Ingedient: FC<IData> = ({data}) => {

  const ingredients = useSelector(getIngredients);
  const isOpenDetails = useSelector(getOpenDetails);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = () => {
      dispatch({
        type: actions.SET_INGREDIENT_INFO,
        item: data,
      });
      dispatch({ type: actions.OPEN_INGREDIENT_MODAL });
    };
  const count = useMemo(() => {
    let result = null;
    if (data.type === BUN && ingredients.bun?._id === data._id) {
      result = 1;
    } else {
      result = ingredients.data.filter((item: itemDataType) => item._id === data._id).length;
    }

    return result;
  }, [data, ingredients]);


  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { data },
  });

  return (
    <><div ref={dragRef} className={styles.card} onClick={()=>handleClick()} >
      <Link
        className={styles.link}
        state={{background: location }}
        to={ingredientsPage+'/'+data._id}
      >
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
        </Link>
    </div>
    {isOpenDetails && <Modal body={<IngredientDetails />} title="Детали ингредиента" />}</>
  );
};


export default Ingedient;