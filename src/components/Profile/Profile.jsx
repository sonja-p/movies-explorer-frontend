import React, { useContext, useEffect } from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useForm';

function Profile({
  handleLogout,
  loggedIn,
  onUpdateUser,
  isSending,
  messages,
}) {
  const currentUser = useContext(CurrentUserContext);

  const {
    values, handleChange, resetForm, errors, isValid,
  } = useFormWithValidation();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ email: values.email, name: values.name });
  }

  return (
    <div className="profile">
      <Header loggedIn={loggedIn} />
      <h2 className="profile__form-title">{`Привет, ${currentUser.name}!`}</h2>
      <form
        className="profile__form"
        onSubmit={handleSubmit}
      >
        <div className="profile__input-container">
          <span className="profile__input-title">Имя</span>
          <input
            className="profile__input"
            onChange={handleChange}
            id="name"
            name="name"
            type="text"
            pattern="^[А-Яа-яЁёA-Za-z]+-? ?[А-Яа-яЁёA-Za-z]+$"
            value={values.name || currentUser.name}
            minLength="2"
            maxLength="20"
            required
          />
        </div>
        <span className="login__input-error" id="email-error">{errors.name}</span>
        <div className="profile__input-container">
          <span className="profile__input-title">E-mail</span>
          <input
            className="profile__input"
            onChange={handleChange}
            id="email"
            name="email"
            type="email"
            value={values.email || currentUser.email}
            required
          />
        </div>
        <span className="login__input-error" id="email-error">{errors.email}</span>
        {messages && <span className="login__input-error" id="messages">{messages.profileForm}</span>}
        <button
          type="submit"
          className={`profile__button
          ${!isValid && 'login__button_disabled'}
          ${values.email === currentUser.email && values.name === currentUser.name && 'login__button_disabled'}
          ${isSending && 'login__button_disabled'}`}
        >
          Редактировать
        </button>
        <button type="button" className="profile__button profile__button_type_exit" onClick={handleLogout}>Выйти из аккаунта</button>
      </form>
    </div>
  );
}

Profile.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  messages: PropTypes.shape({
    regForm: PropTypes.string,
    authForm: PropTypes.string,
    profileForm: PropTypes.string,
    searchForm: PropTypes.string,
    auth: PropTypes.string,
  }).isRequired,
};

export default Profile;
