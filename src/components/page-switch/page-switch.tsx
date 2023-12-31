import styles from "../app/app.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile-page/profile-page";
import NotFound404 from "../../pages/page-404/page-404";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from '../modal/modal';
import { useNavigate } from "react-router-dom";
import {
  homePage,
  loginPage,
  registerPage,
  forgotPasswordPage,
  resetPasswordPage,
  profilePage,
  ingredientsPage,
  feedPage,
  ordersPage
} from "../../utils/variables";
import Feed from "../../pages/feed/feed";
import SingleOrder from "../../pages/single-order/single-order";
import { getOrderModal } from "../../utils/function_tools";
import { useAppSelector } from "../../utils/hooks";
import OrderDetails from "../order-details/order-details";


const PageSwitch = () => {
  const orderModal = useAppSelector(getOrderModal);
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  return (
    <>
      <Routes location={background || location}>
        <Route path={homePage} element={
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        }/>
        <Route path={loginPage} element={
          <ProtectedRoute onlyUnAuth={true}>
            <LoginPage />
          </ProtectedRoute>
        }/>
        <Route path={registerPage} element={
          <ProtectedRoute onlyUnAuth={true}>
            <RegisterPage />
          </ProtectedRoute>
        }/>
        <Route path={forgotPasswordPage} element={
            <ProtectedRoute onlyUnAuth={true}>
              <ForgotPassword />
            </ProtectedRoute>
        } />
        <Route path={resetPasswordPage} element={
          <ProtectedRoute onlyUnAuth={true}>
            <ResetPassword />
          </ProtectedRoute>
        }/>
        <Route path={profilePage+'/*'} element={
            <ProtectedRoute onlyUnAuth={false}>
              <ProfilePage />
            </ProtectedRoute>
        }/>
        <Route path={ingredientsPage+'/:ingredientId'} element={
          <IngredientDetails title="Детали ингредиента"/>
        }/>
        <Route path={feedPage} element={<Feed />} />

        <Route path={feedPage+'/:id'} element={<SingleOrder />} />
        
        <Route path={profilePage+'/'+ordersPage+'/:id'} 
          element={
                  <ProtectedRoute onlyUnAuth={false}>
                    <SingleOrder />
                  </ProtectedRoute>}/>

        <Route path="*" element={
          <NotFound404 />
        }/>
      </Routes>
      {background && (
        <Routes>
          <Route path={ingredientsPage+'/:ingredientId'}
          element={<Modal body={<IngredientDetails />} title="Детали ингредиента" onClose={()=> {navigate(-1);}} />}
          />
        </Routes>
        )}


      {orderModal && (
          <Modal body={<OrderDetails />} title="Детали заказа" onClose={()=> {navigate(-1);}}/>
      )}
      { background  && (
      <Routes>
          <Route path={feedPage+'/:id'} element={<Modal body={<SingleOrder/>} title="Детали заказа" onClose={()=> {navigate(-1);}}/>} />
      </Routes>
      )}

      { background && (
        <Routes>
          <Route path={profilePage+'/'+ordersPage+'/:id'} 
        element={
                <ProtectedRoute onlyUnAuth={false}>
                  <Modal body={<SingleOrder/>} title="Детали заказа" onClose={()=> {navigate(-1);}}/>
                </ProtectedRoute>}/>
        </Routes>
      )}
    </>
  );
};

export default PageSwitch;
