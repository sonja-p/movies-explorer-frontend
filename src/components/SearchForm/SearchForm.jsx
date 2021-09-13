import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <form
      className="search-form"
      title="Поиск фильма"
      name="search-film"
      submitButtonTitle="Найти"
      onSubmit
      isDisabled
    >
      <div className="search-form__container">
        <input
          className="search-form__input"
          onChange
          id="movie-name"
          name="name"
          type="text"
          value=""
          minLength="2"
          maxLength="100"
          placeholder="Фильм"
          required
        />
        <button type="submit" className="search-form__button" onClick="">Найти</button>
      </div>
    </form>
  );
}

export default SearchForm;
