import { useEffect } from 'react';
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header';
import { getIngredientsStore } from "../../services/actions/get-data";
import { getIsLoad } from "../../utils/function_tools";
import { useDispatch, useSelector } from "react-redux";
import PageSwitch from "../page-switch/page-switch";
import { getCookie } from "../../utils/cookie";
import { getUser } from "../../services/actions/user";

function App() {

  const dispatch = useDispatch();
  const isLoad = useSelector(getIsLoad);
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
