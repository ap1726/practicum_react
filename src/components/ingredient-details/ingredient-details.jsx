import styles from "./ingredient-details.module.css";
import PropTypes from 'prop-types';
import DetailsMutted from './details-mutted/details-mutted.jsx'

const IngredientDetails = (props) => {

  return (
    <>{props.data && 
        <div className={styles.content}>
            <div className={styles.detailsContainer}>
                <img className='mb-4' src={props.data.image_large} alt={props.data.name} ></img>
            </div>
            <div className={`${styles.caption} text text_type_main-medium mb-8`}>
                {props.data.name}
            </div>
            <div className={styles.detailsContainer}>
                <DetailsMutted title="Калории, ккал" value={props.data.calories} extraClass={" mr-5"}/>
                <DetailsMutted title="Белки, г" value={props.data.proteins} extraClass={" mr-5"}/>
                <DetailsMutted title="Жиры, г" value={props.data.fat} extraClass={" mr-5"}/>
                <DetailsMutted title="Углеводы, г" value={props.data.carbohydrates} extraClass={""}/>
            </div>
        </div>}
      {!props.data && <div>Информация отсутствует</div>}
    </>
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