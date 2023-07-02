import React, { useEffect, useState } from 'react';
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { checkReponse } from '../../utils/burger-api.js';

function App() {

  const url = "https://norma.nomoreparties.space/api/ingredients";

  const [data, setData] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(()=>{
    fetch(url)
          .then(checkReponse)
          .then(
            (result) => {      
              setData(result.data);
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
          <BurgerIngredients data={data}/>
          <BurgerConstructor bun={data[0]} ingredients={data.slice(1,7)}/>
        </main>
      </div>}
    </div>
  );
}

export default App;
