import styles from "./ingredient-details.module.css";
import DetailsMutted from './details-mutted/details-mutted.jsx'
import { TypeIngredient } from '../../utils/prop-types.js';

const IngredientDetails = ({data}) => {

  return (
    <>{data && 
        <div className={styles.content}>
            <div className={styles.detailsContainer}>
                <img className='mb-4' src={data.image_large} alt={data.name} ></img>
            </div>
            <div className={`${styles.caption} text text_type_main-medium mb-8`}>
                {data.name}
            </div>
            <div className={styles.detailsContainer}>
                <DetailsMutted title="Калории, ккал" value={data.calories} extraClass={" mr-5"}/>
                <DetailsMutted title="Белки, г" value={data.proteins} extraClass={" mr-5"}/>
                <DetailsMutted title="Жиры, г" value={data.fat} extraClass={" mr-5"}/>
                <DetailsMutted title="Углеводы, г" value={data.carbohydrates} extraClass={""}/>
            </div>
        </div>}
      {!data && <div>Информация отсутствует</div>}
    </>
  );
};

IngredientDetails.propTypes = { data: TypeIngredient }; 
 

export default IngredientDetails;