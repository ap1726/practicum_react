import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={`${styles.header} pt-2 pb-2`}>
      <nav className={styles.header__navigation}>
        <ul className={styles.header__list}>
          <li className={styles.menuItem}>
              <BurgerIcon type="primary" />
              Конструктор
          </li>
          <li className={styles.menuItem}>
              <ListIcon type="primary" />
              Лента заказов
          </li>
        </ul>
          <Logo />
        <div className={styles.menuItem}>
            <ProfileIcon type="primary" />
            Личный кабинет
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;