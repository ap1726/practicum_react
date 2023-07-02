import styles from "./ingredient-details.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const IngredientDetails = (props) => {
  return (
    <div className={styles.card}>
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
  );
};

IngredientDetails.propTypes = {
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
 

export default IngredientDetails;