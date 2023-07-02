import styles from "./ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import { TypeIngredient } from '../../utils/prop-types.js';
import { useState } from 'react';

const Ingedient = ({data}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal(info) {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <><div className={styles.card} onClick={()=>handleOpenModal(data)} >
        <Counter count={1} size="default" extraClass={styles.counter_my} />
        <img className={styles.img} src={data.image} alt={data.name} />
        <div className={`mt-2 mb-2`}>
          <span className="text text_type_digits-default pr-2">
            {data.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text text_type_main-default">{data.name}</p>
    </div>
    {isModalOpen && <Modal body={<IngredientDetails data={data} />} title="Детали ингредиента" handleClose={handleCloseModal} />}</>
  );
};

Ingedient.propTypes = {data: TypeIngredient};

export default Ingedient;