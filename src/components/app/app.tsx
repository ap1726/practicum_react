import { useEffect } from 'react';
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header';
import { getIngredientsStore } from "../../services/actions/get-data";
import { getIsLoad } from "../../utils/function_tools";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import PageSwitch from "../page-switch/page-switch";
import { getCookie } from "../../utils/cookie";
import { getUser } from "../../services/actions/user";

function App() {

  const dispatch = useAppDispatch();
  const isLoad = useAppSelector(getIsLoad);
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    dispatch(getIngredientsStore());
      dispatch(getUser(accessToken));
  }, [dispatch, accessToken]);

  return (
    <>
    {!isLoad &&
      <div className={styles.container}>
        <AppHeader />
          <div className={styles.container}>
            <PageSwitch />
          </div>
      </div>
    }
    </>
  );
}

export default App;
