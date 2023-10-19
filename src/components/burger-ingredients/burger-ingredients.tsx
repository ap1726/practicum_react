import { useMemo, useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import { getIngredientsByType } from '../../utils/function_tools';
import { useAppSelector } from "../../utils/hooks";
import { getData } from "../../utils/function_tools";

import { BUN, SAUCE, MAIN } from '../../utils/variables'
import { TItemDataType } from "../ingredient/ingredient";
const BurgerIngredients = () => {

  const data = useAppSelector(getData);

  const buns = useMemo( () => getIngredientsByType(data, BUN), [data]);
  const mains = useMemo( () => getIngredientsByType(data, MAIN), [data]);
  const sauces = useMemo( () => getIngredientsByType(data, SAUCE), [data]);
  const [activeTab, setActiveTab] = useState(BUN);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollHandler = () => {
    const bun = bunRef.current? bunRef.current.getBoundingClientRect().top : null;
    const sauce = sauceRef.current? sauceRef.current.getBoundingClientRect().top : null;
    const main = mainRef.current? mainRef.current.getBoundingClientRect().top : null;

    if (bun && bun <= 250) {
      setActiveTab(BUN);
    }
    if (sauce && sauce <= 250) {
      setActiveTab(SAUCE);
    }
    if (main && main <= 250) {
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
            onClick={() => {console.log('BUN')} }
           >
            Булки
          </Tab>
          <Tab value={SAUCE}
          active={activeTab === SAUCE}
          onClick={() => {console.log('SAUCE')} }
          >
            Соусы
          </Tab>
          <Tab value={MAIN}
          active={activeTab === MAIN}
          onClick={() => {console.log('MAIN')} }
          >
            Начинки
          </Tab>
        </div>
      </nav>

      <div onScroll={scrollHandler} className={styles.categories}>
        <div ref={bunRef} id={BUN} className={styles.category}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Булки</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {buns.map((item: TItemDataType)=><Ingredient key={"key_"+item._id} data={item} />)}
          </div>
        </div>
        <div ref={sauceRef} id={SAUCE} className={styles.categoty}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Соусы</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {sauces.map((item: TItemDataType)=><Ingredient key={"key_"+item._id} data={item} />)}
          </div>
        </div>
        <div ref={mainRef} id={MAIN} className={styles.categoty}>
          <h2 className="text text_type_main-medium mt-11 mb-6">Начинки</h2>
          <div className={`${styles.cardsContainer} ml-4 mb-10`}>
              {mains.map((item: TItemDataType)=><Ingredient key={"key_"+item._id} data={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;