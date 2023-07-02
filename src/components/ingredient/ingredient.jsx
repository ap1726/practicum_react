import styles from "./ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import { useState } from 'react';
const Ingedient = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal(info) {
    console.log('open modal')
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <><div className={styles.card} onClick={()=>handleOpenModal(props.data)} >
        <Counter count={1} size="default" extraClass={styles.counter_my} />
        <img className={styles.img} src={props.data.image} alt={props.data.name} />
        <div className={`mt-2 mb-2`}>
          <span className="text text_type_digits-default pr-2">
            {props.data.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text text_type_main-default">{props.data.name}</p>
    </div>
    {isModalOpen && <Modal body={<IngredientDetails data={props.data} />} title="Детали ингредиента" handleClose={handleCloseModal} />}</>
  );
};

Ingedient.propTypes = {
  data: PropTypes.shape
  ({_id:PropTypes.string,
   name:PropTypes.string,
   type:PropTypes.string,
   proteins:PropTypes.number,
   fat:PropTypes.number,
   carbohydrates:PropTypes.number,
   calories:PropTypes.number,
   price:PropTypes.number,
   image:PropTypes.string,
   image_mobile:PropTypes.string,
   image_large:PropTypes.string,
   __v:PropTypes.number,})
}; 
 

export default Ingedient;