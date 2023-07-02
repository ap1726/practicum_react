import styles from "./burger-constructor.module.css";
import { useEffect, useState } from 'react';
import { ConstructorElement, DragIcon,CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import {getRandomInt} from '../../utils/function_tools.js';
import { TypeIngredient } from '../../utils/prop-types.js';

const BurgerConstructor = ({ bun, ingredients }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(111111);

  useEffect(()=>{
    setOrderData(isModalOpen?getRandomInt(100000,999999):0);
  }, [isModalOpen])

  function handleOpenModal(info) {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <section className={styles.main+' mt-10'}>
      <ConstructorElement 
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile} extraClass={styles.items+' mb-3 ml-10'} />
      <div className={styles.with_scroll}>
        {
          ingredients.map((item)=> 
            <div key={'div'+item._id} className={styles.items+' mb-3'}>
              <DragIcon key={'DragIcon'+item._id} type="primary" />
              <ConstructorElement key={'ConstructorElement'+item._id} 
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile} extraClass={'ml-4'} />
            </div>)
        }
      </div>
      <div className={styles.items+' mb-3 ml-6'}><ConstructorElement 
            type="bottom"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile} extraClass={styles.items+' mb-3 ml-4'} /></div>
      <div className={styles.footer_order}>
        <div className={styles.price_sum}>{610}<CurrencyIcon type="primary" /></div>
          <Button htmlType="button" type="primary" size="medium" extraClass={styles.inline} onClick={()=>handleOpenModal(orderData)}>
            Оформить заказ
          </Button>
      </div>
      {isModalOpen && <Modal body={<OrderDetails number={orderData} />} title="" handleClose={handleCloseModal} />}
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(TypeIngredient).isRequired,

  bun: TypeIngredient
}; 

export default BurgerConstructor;
