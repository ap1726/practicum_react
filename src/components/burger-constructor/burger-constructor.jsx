import styles from "./burger-constructor.module.css";
import { useMemo } from 'react';
import { ConstructorElement,CurrencyIcon, Button, DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import PropTypes from 'prop-types';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
// import { TypeIngredient } from '../../utils/prop-types.js';
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../services/actions/order";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { deleteIngredientFromOrder } from "../../services/actions/order";

import {
          OPEN_ORDER_MODAL,
          ADD_INGREDIENT_ORDER,
          ADD_INGREDIENT_BUN_ORDER,
          SORT_INGREDIENTS
        } from "../../services/actions/actions";
import { 
          getOrderModal,
          getSelectedIngredients, 
          getSelectedBun } from "../../utils/function_tools";

import { BUN } from "../../utils/variables"

const ConstructorItem = ({ item, index, moveListItem }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getSelectedIngredients);

  const handleDeleteIngredient = (index) => {
    dispatch(deleteIngredientFromOrder(ingredients, index));
  };

  const [, dragRef] = useDrag({
    type: "item",
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex === hoverIndex) return;
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));


return (
  <div ref={dragDropRef} key={index}>
      <DragIcon key={'DragIcon'+item._id} type="primary" />
      <ConstructorElement 
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
          extraClass={'ml-4'}
          handleClose={() => handleDeleteIngredient(index)}
      />
  </div>
);
};


const BurgerConstructor = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(getSelectedIngredients);
  const bun = useSelector(getSelectedBun);

  const isModalOpen = useSelector(getOrderModal)


  const moveListItem = (dragIndex, hoverIndex) => {
      const dragItem = ingredients[dragIndex];
      const hoverItem = ingredients[hoverIndex];

      const updatedIngredients = [...ingredients];
      updatedIngredients[dragIndex] = hoverItem;
      updatedIngredients[hoverIndex] = dragItem;

      dispatch({
        // FIXME
        type: SORT_INGREDIENTS,
        payload: updatedIngredients,
      });
    };

  const totalSum = useMemo(
    () =>
      ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        bun?.price ? bun?.price * 2 : 0
      ),
    [ingredients, bun]
  );

  const handleSubmitOrderClick = () => {
    if (ingredients.length !== 0 && bun?._id.length>0) {
      dispatch(addOrder(orderIngredients));
      dispatch({ type: OPEN_ORDER_MODAL });
    }
  };
  
  const orderIngredients = useMemo(
    () => ingredients.map((element) => element._id).concat(bun?._id),
    [ingredients, bun]
  );

  const [ , dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({
        type:
          item.data.type === BUN
            ? ADD_INGREDIENT_BUN_ORDER
            : ADD_INGREDIENT_ORDER,
        payload: item,
      });
    },
  });

  return (
    <section ref={dropTarget} className={styles.main+' mt-10'}>
      {bun?._id ? <ConstructorElement 
            type="top"
            isLocked={true}
            text={bun?.name}
            price={bun?.price}
            thumbnail={bun?.image_mobile} extraClass={styles.items+' mb-3 ml-10'} />
          :
          <div className={styles.items+' mb-3 ml-10'} >
              Добавьте булку
          </div>
          }
      <div className={styles.with_scroll}>
        {ingredients.length>0 ?
          ingredients.map((item, index)=> item.type !== BUN && 
            <div key={'div'+item._id+index} className={styles.items+' mb-3'}>
              <ConstructorItem
                  key={'ConstructorItem'+item._id + index}
                  item={item}
                  index={index}
                  moveListItem={moveListItem}
                  extraClass={'ml-4'}
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
            text={bun?.name}
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

// BurgerConstructor.propTypes = {
//   ingredients: PropTypes.arrayOf(TypeIngredient).isRequired,

//   bun: TypeIngredient
// }; 

export default BurgerConstructor;
