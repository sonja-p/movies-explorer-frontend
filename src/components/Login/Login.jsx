import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function Login() {
  const error = 'Что-то пошло не так...';

  return (
    <div className="login">
      <Link to="." className="login__link">
        <img src={logo} alt="Логотип" className="login__logo" />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form
        className="login__form"
        onSubmit
      >
        <span className="login__input-title">E-mail</span>
        <input
          className="login__input"
          onChange
          id="email"
          name="email"
          type="email"
          value="pochta@yandex.ru"
          required
        />
        <span className="login__input-error" id="email-error">{error}</span>

        <span className="login__input-title">Пароль</span>
        <input
          className="login__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange
          value="••••••••••••••"
          autoComplete="on"
          required
        />
        <span className="login__input-error" id="password-error">{error}</span>

        <button
          type="submit"
          className="login__button login__button_type_disabled"
          onClick
        >
          Войти
        </button>
        <div className="login__signup">
          <p className="login__link-title">Ещё не зарегистрированы?</p>
          <Link to="signup" className="login__register-link">
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
