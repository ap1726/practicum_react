import { FC, FormEvent, useState } from "react";
import styles from "./forgot-password.module.css";
import {
  Input,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../utils/hooks"; 
import { forgotPasswords } from "../../services/actions/user";
import { 
  resetPasswordPage,
  loginPage
} from "../../utils/variables";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    email && dispatch(forgotPasswords(email));
    email && navigate( resetPasswordPage );
    setEmail('');
  }

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <form onSubmit={onSubmitForm} className={styles.form}>
        <div className="mt-6 mb-6">
          <Input
            type={'email'}
            value={email}
            placeholder={'Укажите e-mail'}
            onChange={(e) => setEmail(e.target.value)}
            size={'default'}
            width={'100%'}
          />
        </div>
        <Button type="primary"
          size="medium"
          htmlType="submit">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Вспомнили пароль? "}
        <Link className={styles.link} to={loginPage}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;


