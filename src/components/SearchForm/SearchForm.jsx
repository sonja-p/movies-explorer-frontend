import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import { useFormWithValidation } from '../../hooks/useForm';

function SearchForm({ findMovies, isLoading }) {
  const {
    values,
    handleChange,
    resetForm,
  } = useFormWithValidation();

  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.movie) {
      setError('Нужно ввести ключевое слово');
    } else {
      findMovies(values.movie);
      setError('');
      resetForm();
    }
  }

  return (
    <form
      className="search-form"
      title="Поиск фильма"
      name="search-film"
      onSubmit={handleSubmit}
    >
      <div className="search-form__container">
        <input
          className="search-form__input"
          onChange={handleChange}
          id="movie"
          name="movie"
          type="text"
          value={values.movie || ''}
          maxLength="100"
          placeholder="Фильм"
          disabled={isLoading}
        />

        <span className="search-form__input-error" id="movie-error">{error}</span>

        <button
          type="submit"
          className={`search-form__button ${
            isLoading && 'search-form__button_disabled'
          }`}
        >
          {isLoading ? 'Поиск...' : 'Найти'}
        </button>
      </div>
    </form>
  );
}

SearchForm.propTypes = {
  findMovies: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SearchForm;
