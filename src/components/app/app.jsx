import React from 'react';
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'

function App() {
  return (
    <div>
    <AppHeader />
    <div className={styles.container}>
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
    </div>
    </div>
  );
}

export default App;
