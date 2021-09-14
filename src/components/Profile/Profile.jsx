import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile() {
  return (
    <div className="profile">
      <Header />
      <h2 className="profile__form-title">Привет, Виталий!</h2>
      <form
        className="profile__form"
        onSubmit
      >
        <div className="profile__input-container">
          <span className="profile__input-title">Имя</span>
          <input
            className="profile__input"
            onChange
            id="name"
            name="name"
            type="text"
            value="Виталий"
            minLength="2"
            maxLength="20"
            required
          />
        </div>
        <div className="profile__input-container">
          <span className="profile__input-title">E-mail</span>
          <input
            className="profile__input"
            onChange
            id="email"
            name="email"
            type="email"
            value="pochta@yandex.ru"
            required
          />
        </div>
        <button type="submit" className="profile__button" onClick>Редактировать</button>
        <button type="button" className="profile__button profile__button_type_exit" onClick>Выйти из аккаунта</button>
      </form>
    </div>
  );
}

export default Profile;
