import styles from "./ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import { TypeIngredient } from '../../utils/prop-types.js';
import { useState } from 'react';

const Ingedient = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal(info) {
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

Ingedient.propTypes = {data: TypeIngredient};

export default Ingedient;