import styles from "./burger-constructor.module.css";
import { useEffect, useState, useContext, useReducer } from 'react';
import { ConstructorElement, DragIcon,CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import {getRandomInt} from '../../utils/function_tools.js';
import { TypeIngredient } from '../../utils/prop-types.js';
import { setNewOrder } from '../../utils/burger-api.js';
import { OrderContext } from '../contexts/orderContext.js';


// начальное значение стейта
const initialState = { price: 0 };

// функция-редьюсер
// изменяет состояния в зависимости от типа переданного action
function reducer(state, action) {
  switch (action.type) {
    case "init":
      return initialState;
    case "bun":
      return { price: Number(state.price) + Number(action.price*2)};
    case "ingredients":
      return { price: Number(state.price) + Number(action.price*2)};
    default:
      return { price: Number(state.price) + Number(action.price)};
  }
}


const BurgerConstructor = ({bun, ingredients}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(0);
  const [isOrderLoaded, setOrderLoaded] = useState(false);
  const [price, dispatch] = useReducer(reducer, initialState);

  function getOrderNumber(){
    let items = [bun._id, ...ingredients.map( (item)=>item._id), bun._id];
    setNewOrder(items).then(
            (result) => {
              setOrderLoaded(true);
              setOrderData(result);
            })
          .catch( error =>
              {setOrderLoaded(false);
              alert("Произошла ошибка при получении данный! Попробуйте обновить страницу");}
              )
  }
  useEffect(() => {
    handleSumPrice({type: 'init'});
    handleSumPrice(bun);
    ingredients.forEach( (item) => handleSumPrice(item) );
    }, [bun, ingredients])

  function handleSumPrice(item){
    dispatch({ type: item.type, price: item.price});
  }

  function handleOpenModal(info) {
    getOrderNumber();
    if (isOrderLoaded) setIsModalOpen(true);
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
          ingredients.map((item)=> item.type != 'bun' && 
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
        <div className={styles.price_sum}>{price.price}<CurrencyIcon type="primary" /></div>
          <Button htmlType="button" type="primary" size="medium" extraClass={styles.inline} onClick={()=>handleOpenModal(orderData)}>
            Оформить заказ
          </Button>
      </div>
      {isModalOpen && 
        <OrderContext.Provider value={orderData}>
          <Modal body={<OrderDetails />} title="" handleClose={handleCloseModal} />
        </OrderContext.Provider>
        }
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(TypeIngredient).isRequired,

  bun: TypeIngredient
}; 

export default BurgerConstructor;
