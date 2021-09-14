import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function Register() {
  const error = 'Что-то пошло не так...';

  return (
    <div className="register">
      <Link to="." className="register__link">
        <img src={logo} alt="Логотип" className="register__logo" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form
        className="register__form"
        onSubmit
      >
        <span className="register__input-title">Имя</span>
        <input
          className="register__input"
          onChange
          id="name"
          name="name"
          type="text"
          value="Виталий"
          minLength="2"
          maxLength="20"
          required
        />
        <span className="register__input-error" id="name-error">{error}</span>

        <span className="register__input-title">E-mail</span>
        <input
          className="register__input"
          onChange
          id="email"
          name="email"
          type="email"
          value="pochta@yandex.ru"
          required
        />
        <span className="register__input-error" id="email-error">{error}</span>

        <span className="register__input-title">Пароль</span>
        <input
          className="register__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange
          value="••••••••••••••"
          autoComplete="on"
          required
        />
        <span className="register__input-error register__input-error_visible" id="password-error">{error}</span>

        <button
          type="submit"
          className="register__button"
          onClick
        >
          Зарегистрироваться
        </button>
        <div className="register__signin">
          <p className="register__link-title">Уже зарегистрированы?</p>
          <Link to="signin" className="register__login-link">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
