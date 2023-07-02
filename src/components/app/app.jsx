import React from 'react';
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'

import {mainData} from "../../utils/data"

function App() {
  const data = mainData;
  const bun = mainData[0];
  const ingredients = mainData.slice(1,7);

  return (
    <div>
    <AppHeader />
    <div className={styles.container}>
        <main className={styles.main}>
          <BurgerIngredients data={data}/>
          <BurgerConstructor bun={bun} ingredients={ingredients}/>
        </main>
    </div>
    </div>
  );
}

export default App;
