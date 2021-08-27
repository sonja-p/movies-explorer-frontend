import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function Header() {
  return (
    <>
      <header className="header">
        <Link to="." className="header__link">
          <img src={logo} alt="Логотип" className="header__logo" />
        </Link>
        <div className="header__container">
          <Link to="signup" className="header__register-link">Регистрация</Link>
          <Link to="signin" className="header__login-link">Войти</Link>
        </div>
      </header>
    </>
  );
}

export default Header;
