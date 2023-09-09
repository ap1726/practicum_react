import { useMemo, useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient.jsx";
import { getIngredientsByType } from '../../utils/function_tools.js';
import { useSelector } from "react-redux";
import { getData } from "../../utils/function_tools";

import { BUN, SAUCE, MAIN } from '../../utils/variables'

const BurgerIngredients = () => {

  const data = useSelector(getData);

  const buns = useMemo( () => getIngredientsByType(data, BUN), [data]);
  const mains = useMemo( () => getIngredientsByType(data, MAIN), [data]);
  const sauces = useMemo( () => getIngredientsByType(data, SAUCE), [data]);
  const [activeTab, setActiveTab] = useState(BUN);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const scrollHandler = () => {
    const bun = bunRef.current.getBoundingClientRect().top;
    const sauce = sauceRef.current.getBoundingClientRect().top;
    const main = mainRef.current.getBoundingClientRect().top;

    if (bun <= 250) {
      setActiveTab(BUN);
    }
    if (sauce <= 250) {
      setActiveTab(SAUCE);
    }
    if (main <= 250) {
      setActiveTab(MAIN);
    }
  };


  return (
    <section className={`${styles.components}`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <nav className="mt-5">
        <div className={styles.menu}>
          <Tab value={BUN} 
            active={activeTab === BUN}
           >
            Булки
          </Tab>
          <Tab value={SAUCE}
          active={activeTab === SAUCE}
          >
            Соусы
          </Tab>
          <Tab value={MAIN}
          active={activeTab === MAIN}
          >
            Начинки
          </Tab>
        </div>
      </nav>

      <div onScroll={scrollHandler} className={styles.categories}>
        <div ref={bunRef} id={BUN} className={styles.category}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Булки</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {buns.map((item)=><Ingredient key={"key_"+item._id} data={item} />)}
          </div>
        </div>
        <div ref={sauceRef} id={SAUCE} className={styles.categoty}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Соусы</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {sauces.map((item)=><Ingredient key={"key_"+item._id} data={item} />)}
          </div>
        </div>
        <div ref={mainRef} id={MAIN} className={styles.categoty}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Начинки</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {mains.map((item)=><Ingredient key={"key_"+item._id} data={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;