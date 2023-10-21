import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import styles from './edit-data.module.css';
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { updateTokenAndProfile } from '../../services/actions/user';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserData } from '../../utils/function_tools';

const EditData = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [isDataChanged, setIsDataChanged] = useState(false);
  const userData = useAppSelector(getUserData);

  const dispatch = useAppDispatch();

  useEffect(()=> {
    if (userData) {
      userData.name && setName(userData.name);
      userData.email && setEmail(userData.email);
    }
  },[userData])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateTokenAndProfile(email, name, password))
    setIsDataChanged(false)
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    userData && value === userData.name ? setIsDataChanged(false) : setIsDataChanged(true)
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    userData && value === userData.email ? setIsDataChanged(false) : setIsDataChanged(true)
  }

  const onCancelEdit = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    userData && userData.name && setName(userData.name);
    userData && userData.email && setEmail(userData.email);
    setPassword('');
    setIsDataChanged(false)
  }


  return(
    <form onSubmit={onSubmit} className={styles.content}>
      <Input
        placeholder='Имя'
        icon="EditIcon"
        value={name}
        onChange={onNameChange}
      />
      <Input
        placeholder='Логин'
        icon="EditIcon"
        value={email}
        onChange={onEmailChange}
      />
      <PasswordInput
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {
        isDataChanged && (
          <div className={styles.buttonsContainer}>
            <Button
              onClick={onCancelEdit}
              type="secondary"
              size="medium"
              htmlType={'button'}
            >
              Отмена
            </Button>
            <Button
              type="primary"
              size="medium"
              htmlType={'submit'}
            >
              Сохранить
            </Button>
          </div>
        )
      }
    </form>
  )
}

export default EditData;
