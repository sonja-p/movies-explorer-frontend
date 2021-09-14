import React from 'react';
import './Header.css';
import { Link, useRouteMatch } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

function Header() {
  const isMain = useRouteMatch({ path: '/', exact: true });

  return (
    <>
      { isMain ? (
        <div className="header__wrapper header__wrapper_page_landing">
          <header className="header">
            <Link to="." className="header__link">
              <img src={logo} alt="Логотип" className="header__logo" />
            </Link>
            <nav className="header__container">
              <Link to="signup" className="header__link header__register-link">Регистрация</Link>
              <Link to="signin" className="header__login-link">Войти</Link>
            </nav>
          </header>
        </div>
      ) : (
        <div className="header__wrapper header__wrapper_page_main">
          <header className="header">
            <Link to="." className="header__link">
              <img src={logo} alt="Логотип" className="header__logo" />
            </Link>
            <Navigation />
          </header>
        </div>
      )}
    </>
  );
}

export default Header;
