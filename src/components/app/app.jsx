import { useEffect } from 'react';
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { getIngredientsStore } from "../../services/actions/get-data";
import { getIsLoad } from "../../utils/function_tools";
import { useDispatch, useSelector } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  const dispatch = useDispatch();
  const isLoad = useSelector(getIsLoad);

  useEffect(() => {
    dispatch(getIngredientsStore());
  }, [dispatch]);

  return (
    <div>
    <AppHeader />
    {!isLoad && <div className={styles.container}>
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>}
    </div>
  );
}

export default App;
