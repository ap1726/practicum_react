import React, { useEffect, useState, createContext } from 'react';
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { getIngredients } from '../../utils/burger-api.js';
import { IngredientsContext } from '../contexts/ingredientsContext.js';

function App() {

  const [ingredients, setIngredients] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(()=>{
    getIngredients().then(
            (result) => {      
              setIngredients(result.data);
              setIsLoad(true);
            })
          .catch( error =>
              {setIsLoad(false);
              alert("Произошла ошибка при получении данный! Попробуйте обновить страницу");
            })
  },[])

  return (
    <div>
    <AppHeader />
    {isLoad && <div className={styles.container}>
        <main className={styles.main}>
          <IngredientsContext.Provider value={ingredients}>
            <BurgerIngredients />
            <BurgerConstructor bun={ingredients[0]} ingredients={ingredients.slice(1,7)}/>
          </IngredientsContext.Provider>
        </main>
      </div>}
    </div>
  );
}

export default App;
