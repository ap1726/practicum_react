import styles from "./profile-page.module.css";
import {
  NavLink,
  Route,
  useMatch,
  Routes
} from "react-router-dom";
import EditData from "../../components/edit-data/edit-data";
import { useDispatch } from "react-redux";
import { logOut } from "../../services/actions/user";
import { getCookie } from "../../utils/cookie";
import { LOGOUT_SUCCESS } from "../../services/actions/user";
import { loginPage } from "../../utils/variables";

const linkClass = `${styles.link} text text_type_main-medium pt-4 pb-5 text_color_inactive`;

const ProfilePage = () => {
  const { path, url } = useMatch();
  const dispatch = useDispatch();


  const handleLogoutClick = () => {
    const refreshToken = getCookie("refreshToken");
    dispatch(logOut(refreshToken));
    dispatch({ type: LOGOUT_SUCCESS });
  };



  return (
    <main className={styles.wrapper}>
      <nav className={styles.nav}>
        <NavLink
          to={`${url}`}
          className={linkClass}
          activeClassName={styles.active}
        >
          Профиль
        </NavLink>
        <NavLink
          to={loginPage}
          className={linkClass}
          activeClassName={styles.active}
          onClick={handleLogoutClick}
        >
          Выход
        </NavLink>
        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Routes>

        <Route path={`${path}`}>
          <EditData />
        </Route>

      </Routes>



    </main>
  );
};

export default ProfilePage;
