import styles from "./ingredient-details.module.css";
import DetailsMutted from './details-mutted/details-mutted'
import { getData } from "../../utils/function_tools";
import { useAppSelector } from "../../utils/hooks";
import { useParams } from "react-router-dom";

import { itemDataType } from "../ingredient/ingredient";

const IngredientDetails = ({title = ""}) => {

  const ingredients = useAppSelector(getData);
  const { ingredientId } = useParams();
  const detailsIngredient = ingredients.find((item: itemDataType) => item._id === ingredientId);
  return (
    <>
    {detailsIngredient && 
        <div className={styles.content}>
            {title && (
              <h2 className={'mt-20 text text_type_main-large'}>
                {title}
              </h2>
            )}
            <div className={styles.detailsContainer}>
                <img className='mb-4' src={detailsIngredient.image_large} alt={detailsIngredient.name} ></img>
            </div>
            <div className={`${styles.caption} text text_type_main-medium mb-8 mt-5`}>
                {detailsIngredient.name}
            </div>
            <div className={styles.detailsContainer}>
                <DetailsMutted title="Калории, ккал" value={detailsIngredient.calories} extraClass={" mr-5"}/>
                <DetailsMutted title="Белки, г" value={detailsIngredient.proteins} extraClass={" mr-5"}/>
                <DetailsMutted title="Жиры, г" value={detailsIngredient.fat} extraClass={" mr-5"}/>
                <DetailsMutted title="Углеводы, г" value={detailsIngredient.carbohydrates} extraClass={""}/>
            </div>
        </div>}
      {!detailsIngredient && <div>Информация отсутствует</div>}
    </>
  );
}; 

export default IngredientDetails;