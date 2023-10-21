import styles from "./burger-constructor.module.css";
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConstructorElement,CurrencyIcon, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { addOrder } from "../../services/actions/order";
import { useDrop } from "react-dnd";

import {
  SORT_INGREDIENTS,
  OPEN_ORDER_MODAL,
  openOrderModal
        } from "../../services/actions/actions";
import { 
          getOrderModal,
          getSelectedIngredients, 
          getSelectedBun,
          getUserData } from "../../utils/function_tools";

import { ConstructorItem }  from './constructor-item/constructor-item';

import { BUN, loginPage } from "../../utils/variables";

import { addIngredient, addIngredientBun } from "../../services/reducers/constructor";
import { IData, TItemDataType } from "../ingredient/ingredient";

const BurgerConstructor = () => {

  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getSelectedIngredients);
  const bun = useAppSelector(getSelectedBun);

  const isModalOpen = useAppSelector(getOrderModal)
  const userData = useAppSelector(getUserData);
  const navigate = useNavigate();

  const moveListItem = (dragIndex: number, hoverIndex: number) => {
      dispatch({
        type: SORT_INGREDIENTS,
        payload: { dragIndex, hoverIndex }
      });
    };

  const totalSum = useMemo(
    () =>
      ingredients.reduce(
        (sum: number, ingredient: TItemDataType) => sum + ingredient.price,
        bun?.price ? bun?.price * 2 : 0
      ),
    [ingredients, bun]
  );

  const handleSubmitOrderClick = () => {
    !userData && navigate(loginPage);
    if (userData && ingredients.length !== 0 && bun && bun?._id.length>0) {
      dispatch(addOrder(orderIngredients));
      dispatch(openOrderModal());
    }
  };
  
  const orderIngredients = useMemo(
    () => ingredients.map((element: TItemDataType) => element._id).concat(bun?bun._id:''),
    [ingredients, bun]
  );

  const [ , dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IData) {
      item.data.type === BUN?
      dispatch(addIngredientBun(item))
      :dispatch(addIngredient(item));
    },
  });

  return (
    <section ref={dropTarget} className={styles.main+' mt-10'}>
      {bun?._id ? <ConstructorElement 
            type="top"
            isLocked={true}
            text={bun?.name+" (верх)"}
            price={bun?.price}
            thumbnail={bun?.image_mobile} extraClass={styles.items+' mb-3 ml-10'} />
          :
          <div className={styles.items+' mb-3 ml-10'} >
              Добавьте булку
          </div>
          }
      <div className={styles.with_scroll}>
        {ingredients.length>0 ?
          ingredients.map((item: TItemDataType, index: number)=> item.type !== BUN && 
            <div key={'div'+item.uniqueId} className={styles.items+' mb-3'}>
              <ConstructorItem
                  key={'ConstructorItem'+item.uniqueId}
                  item={item}
                  index={index}
                  moveListItem={moveListItem}
              />
            </div>)
          : <div className={styles.items+' mb-3 ml-10'}>
              Добавьте соусы и начинку
            </div>

        }
      </div>
      { bun?._id ?  <div className={styles.items+' mb-3 ml-6'}><ConstructorElement 
            type="bottom"
            isLocked={true}
            text={bun?.name+" (низ)"}
            price={bun?.price}
            thumbnail={bun?.image_mobile} extraClass={styles.items+' mb-3 ml-4'} /></div>
            :
            <div className={styles.items+' mb-3 ml-10'}>
              Добавьте булку
            </div>
            }
      <div className={styles.footer_order}>
        <div className={styles.price_sum}>{totalSum}<CurrencyIcon type="primary" /></div>
          <Button htmlType="button" type="primary" size="medium" extraClass={styles.inline} onClick={handleSubmitOrderClick}>
            Оформить заказ
          </Button>
      </div>
      {isModalOpen && <Modal body={<OrderDetails />} title="" />}
    </section>
  );
};

export default BurgerConstructor;
