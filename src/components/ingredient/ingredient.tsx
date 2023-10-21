import styles from "./ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useMemo, FC } from 'react';
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { getOpenDetails, getIngredients } from "../../utils/function_tools";
import {
  SET_INGREDIENT_INFO,
  OPEN_INGREDIENT_MODAL
} from "../../services/actions/actions";

import { useDrag } from "react-dnd";

import { BUN, ingredientsPage } from '../../utils/variables'

import { Link, useLocation } from "react-router-dom";

export type TItemDataType = {
      _id: string,
      __v: number,
      name: string,
      proteins: number,
      fat: number,
      carbohydrates: number,
      calories: number,
      price: number,
      image: string,
      image_mobile: string,
      image_large: string,
      uniqueId?: string,
      type?: string,
      index?: number
  }

export const ItemDataInitial: TItemDataType = {
          _id: "",
          __v: 0,
          name: "",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
          image_mobile: "",
          image_large: "",
          uniqueId: "",
          type: "",
          index: 0
}

export interface IData {
    data: TItemDataType
}

export const Ingedient: FC<IData> = ({data}) => {

  const ingredients = useAppSelector(getIngredients);
  const isOpenDetails = useAppSelector(getOpenDetails);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleClick = () => {
      dispatch({
        type: SET_INGREDIENT_INFO,
        item: data,
      });
      dispatch({ type: OPEN_INGREDIENT_MODAL });
    };
  const count = useMemo(() => {
    let result = null;
    if (data.type === BUN && ingredients.bun?._id === data._id) {
      result = 1;
    } else {
      result = ingredients.data.filter((item: TItemDataType) => item._id === data._id).length;
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