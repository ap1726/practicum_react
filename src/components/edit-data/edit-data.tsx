import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import styles from './edit-data.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateTokenAndProfile } from '../../services/actions/user';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserData } from '../../utils/function_tools';

const EditData = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [isDataChanged, setIsDataChanged] = useState(false);
  const userData = useSelector(getUserData);

  const dispatch = useDispatch();

  useEffect(()=> {
    if (userData) {
    setName(userData.name);
    setEmail(userData.email);
    }
  },[userData])

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateTokenAndProfile(email, name, password) as any)
    setIsDataChanged(false)
  }

  const onNameChange = (e: any) => {
    const value = e.target.value
    setName(value)
    value === userData.name ? setIsDataChanged(false) : setIsDataChanged(true)
  }

  const onEmailChange = (e: any) => {
    const value = e.target.value
    setEmail(value)
    value === userData.email ? setIsDataChanged(false) : setIsDataChanged(true)
  }

  const onCancelEdit = (e: any) => {
    e.preventDefault();
    setName(userData.name);
    setEmail(userData.email);
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
