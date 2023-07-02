import React, { useMemo } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient.jsx";
import PropTypes from 'prop-types';
import { TypeIngredient } from '../../utils/prop-types.js';
import { getIngredientsByType } from '../../utils/function_tools.js';

const BurgerIngredients = ({data}) => {



  const buns = useMemo( () => getIngredientsByType(data, 'bun'), [data]);
  const mains = useMemo( () => getIngredientsByType(data, 'main'), [data]);
  const sauces = useMemo( () => getIngredientsByType(data, 'sauce'), [data]);

  return (
    <section className={`${styles.components}`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <nav className="mt-5">
        <div className={styles.menu}>
          <Tab value="bun" active={true} >
            Булки
          </Tab>
          <Tab value="sauce">
            Соусы
          </Tab>
          <Tab value="main">
            Начинки
          </Tab>
        </div>
      </nav>

      <div className={styles.categories}>
        <div id="bun" className={styles.category}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Булки</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {buns.map((item)=><Ingredient key={"key_"+item._id} data={item} />)}
          </div>
        </div>
        <div id="sauce" className={styles.categoty}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Соусы</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {sauces.map((item)=><Ingredient key={"key_"+item._id} data={item} />)}
          </div>
        </div>
        <div id="main" className={styles.categoty}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Начинки</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {mains.map((item)=><Ingredient key={"key_"+item._id} data={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = { data: PropTypes.arrayOf(TypeIngredient) };

export default BurgerIngredients;