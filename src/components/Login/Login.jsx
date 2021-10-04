import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import { useFormWithValidation } from '../../hooks/useForm';

function Login({ handleLogin, isSending, messages }) {
  const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
  } = useFormWithValidation();

  useEffect(() => {
    resetForm({});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    const { password, email } = values;
    handleLogin({ password, email });
  };

  return (
    <div className="login">
      <Link to="." className="login__link">
        <img src={logo} alt="Логотип" className="login__logo" />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form
        className="login__form"
        onSubmit={handleSubmit}
      >
        <span className="login__input-title">E-mail</span>
        <input
          className="login__input"
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          value={values.email || ''}
          required
          disabled={isSending}
        />
        <span className="login__input-error" id="email-error">{errors.email}</span>

        <span className="login__input-title">Пароль</span>
        <input
          className="login__input"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password || ''}
          autoComplete="on"
          required
          disabled={isSending}
        />
        <span className="login__input-error" id="password-error">{errors.password}</span>

        <span className="login__input-error" id="messages">{messages.authForm}</span>

        <button
          type="submit"
          className={`login__button
          ${!isValid && 'login__button_disabled'}
          ${isSending && 'login__button_disabled'}`}
        >
          {isSending ? 'Вход...' : 'Войти'}
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

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  messages: PropTypes.shape({
    regForm: PropTypes.string,
    authForm: PropTypes.string,
    profileForm: PropTypes.string,
    searchForm: PropTypes.string,
    auth: PropTypes.string,
  }).isRequired,
};

export default Login;
