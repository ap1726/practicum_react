import { FormEvent, useEffect, useState } from 'react';
import styles from './reset-password.module.css';
import {
  Input,
  Button,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { resetPasswords } from '../../services/actions/user';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { 
  loginPage,
  forgotPasswordPage
} from '../../utils/variables';
import { 
  getIsForgotPassword
} from '../../utils/function_tools';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [code, setCode] = useState('');
  const isForgotPassword = useAppSelector(getIsForgotPassword);

  const navigate = useNavigate();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    password && code && dispatch(resetPasswords(password, code));
    password && code && navigate(loginPage)
  }

  useEffect(()=> {
    if (!isForgotPassword) {
      navigate(forgotPasswordPage)
    }
  },[isForgotPassword, navigate])

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className="mt-6 mb-6">
        <PasswordInput
          placeholder={'Введите новый пароль'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Input
            type={'text'}
            value={code}
            placeholder={'Введите код из письма'}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <Button type="primary" size="medium" htmlType='submit'>
          Сохранить
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

export default ResetPassword;


