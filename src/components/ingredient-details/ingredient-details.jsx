import styles from "./ingredient-details.module.css";
import DetailsMutted from './details-mutted/details-mutted.jsx'
import { TypeIngredient } from '../../utils/prop-types.js';
import { getDetailsIngredient } from "../../utils/function_tools";
import { useSelector } from "react-redux";


const IngredientDetails = ({data}) => {

  const item = useSelector(getDetailsIngredient);

  return (
    <>{item && 
        <div className={styles.content}>
            <div className={styles.detailsContainer}>
                <img className='mb-4' src={item.image_large} alt={item.name} ></img>
            </div>
            <div className={`${styles.caption} text text_type_main-medium mb-8`}>
                {item.name}
            </div>
            <div className={styles.detailsContainer}>
                <DetailsMutted title="Калории, ккал" value={item.calories} extraClass={" mr-5"}/>
                <DetailsMutted title="Белки, г" value={item.proteins} extraClass={" mr-5"}/>
                <DetailsMutted title="Жиры, г" value={item.fat} extraClass={" mr-5"}/>
                <DetailsMutted title="Углеводы, г" value={item.carbohydrates} extraClass={""}/>
            </div>
        </div>}
      {!item && <div>Информация отсутствует</div>}
    </>
  );
};

IngredientDetails.propTypes = { data: TypeIngredient }; 
 

export default IngredientDetails;