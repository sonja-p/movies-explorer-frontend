import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Register.css';
import logo from '../../images/header-logo.svg';
import { useFormWithValidation } from '../../hooks/useForm';

function Register({ handleRegister, isSending, messages }) {
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
    const { name, password, email } = values;
    handleRegister({ name, password, email });
  };

  return (
    <div className="register">
      <Link to="." className="register__link">
        <img src={logo} alt="Логотип" className="register__logo" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form
        className="register__form"
        onSubmit={handleSubmit}
      >
        <span className="register__input-title">Имя</span>
        <input
          className="register__input"
          onChange={handleChange}
          id="name"
          name="name"
          type="text"
          pattern="^[А-Яа-яЁёA-Za-z]+-? ?[А-Яа-яЁёA-Za-z]+$"
          value={values.name || ''}
          minLength="2"
          maxLength="20"
          required
          disabled={isSending}
        />
        <span className="register__input-error" id="name-error">{errors.name}</span>

        <span className="register__input-title">E-mail</span>
        <input
          className="register__input"
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          value={values.email || ''}
          required
          disabled={isSending}
        />
        <span className="register__input-error" id="email-error">{errors.email}</span>

        <span className="register__input-title">Пароль</span>
        <input
          className="register__input"
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          value={values.password || ''}
          autoComplete="on"
          required
          disabled={isSending}
        />
        <span className="register__input-error" id="password-error">{errors.password}</span>

        <span className="register__input-error" id="messages">{messages.regForm}</span>

        <button
          type="submit"
          className={`register__button
            ${!isValid && 'register__button_disabled'}
            ${isSending && 'register__button_disabled'}`}
        >
          {isSending ? 'Регистрация...' : 'Зарегистрироваться'}
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

Register.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  messages: PropTypes.shape({
    regForm: PropTypes.string,
    authForm: PropTypes.string,
    profileForm: PropTypes.string,
    searchForm: PropTypes.string,
  }).isRequired,
};

export default Register;
