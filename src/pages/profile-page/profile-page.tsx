import styles from "./profile-page.module.css";
import {
  NavLink,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import EditData from "../../components/edit-data/edit-data";
import { useAppDispatch } from "../../utils/hooks"; 
import { logOut } from "../../services/actions/user";
import { getCookie } from "../../utils/cookie";
import { userActions } from "../../services/actions/user";
import { loginPage, profilePage, ordersPage } from "../../utils/variables";
import NotFound404 from "../../pages/page-404/page-404"

const linkClass = `${styles.link} text text_type_main-medium pt-4 pb-5 text_color_inactive`;

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const accessToken = getCookie("accessToken") || "";
  const handleLogoutClick = () => {
    const refreshToken = getCookie("refreshToken") || "";
    dispatch(logOut(refreshToken));
    dispatch({ type: userActions.LOGOUT_SUCCESS });
  };


  return (
    <main className={styles.wrapper}>
      <nav className={styles.nav}>
        <NavLink
          to={profilePage}
          className={location.pathname === profilePage ? linkClass + styles.active:linkClass }
        >
          Профиль
        </NavLink>
        <NavLink
          to={`${profilePage}/${ordersPage}?token=${accessToken}`}
          className={location.pathname === profilePage + '/' + ordersPage ? linkClass + styles.active:linkClass }
          >
          История заказов
        </NavLink>
        <NavLink
          to={loginPage}
          className={linkClass}
          onClick={handleLogoutClick}
        >
          Выход
        </NavLink>
        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Routes>

        <Route path={'/'} element={<EditData />} />

        <Route path={"/orders"} element={<NotFound404 />} />

      </Routes>
    </main>
  );
};

export default ProfilePage;
