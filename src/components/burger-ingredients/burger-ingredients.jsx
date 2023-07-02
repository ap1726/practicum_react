import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";


const BurgerIngredients = ({data}) => {

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
              {data.map((item)=>item.type==="bun"&&<IngredientDetails key={"key_"+item._id} data={item} />)}
          </div>
        </div>
        <div id="sauce" className={styles.categoty}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Соусы</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {data.map((item)=>item.type==="sauce"&&<IngredientDetails key={"key_"+item._id} data={item} />)}
          </div>
        </div>
        <div id="main" className={styles.categoty}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Начинки</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {data.map((item)=>item.type==="main"&&<IngredientDetails key={"key_"+item._id} data={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;