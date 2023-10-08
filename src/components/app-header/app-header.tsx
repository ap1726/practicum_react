import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';

import { NavLink } from "react-router-dom";
import { feedPage, homePage, profilePage } from "../../utils/variables";

function AppHeader() {
  return (
    <header className={`${styles.header} pt-2 pb-2`}>
      <nav className={styles.header_navigation}>
        <ul className={styles.header_list}>
          <li className={styles.menuItem}>
            <NavLink
              to={homePage}
            >
              <BurgerIcon type="primary" />
              Конструктор
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink
                to={feedPage}
              >
                <ListIcon type="primary" />
                Лента заказов
            </NavLink>
          </li>
        </ul>
        <NavLink to={homePage} className={styles.header__logoWrapper}>
          <Logo />
        </NavLink>
        <div className={styles.menuItem}>
          <NavLink
            to={profilePage}
          >
            <ProfileIcon type="primary" />
            Личный кабинет
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;