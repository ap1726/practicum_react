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
      <nav className={styles.header_navigation}>
        <ul className={styles.header_list}>
          <li className={styles.menuItem}>
              <BurgerIcon type="primary" />
              <a href="#">Конструктор</a>
          </li>
          <li className={styles.menuItem}>
              <ListIcon type="primary" />
              <a href="#">Лента заказов</a>
          </li>
        </ul>
          <Logo />
        <div className={styles.menuItem}>
            <ProfileIcon type="primary" />
            <a href="#">Личный кабинет</a>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;