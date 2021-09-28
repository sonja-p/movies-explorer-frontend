/* eslint-disable react/prop-types */
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MoviesCard.css';

function MoviesCard(props) {
  const url = 'https://api.nomoreparties.co';
  const {
    id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    onCardLike,
    onCardDelete,
    isMovieSaved,
  } = props;

  const isSavedMovies = useRouteMatch({ path: '/saved-movies', exact: true });
  const isMovies = useRouteMatch({ path: '/movies', exact: true });

  function handleLikeClick() {
    onCardLike({
      id,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
    });
  }

  // function handleCardSave() {
  //   setIsMovieSaved(!isMovieSaved);
  // }

  function handleCardDelete() {
    onCardDelete(props);
  }

  function addMinutes(n) {
    let minutes;
    if (n % 10 >= 2 && n % 10 <= 4) {
      minutes = 'минуты';
    } else if (n % 10 === 1) {
      minutes = 'минута';
    } else {
      minutes = 'минут';
    }
    return minutes;
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <h3 className="movies-card__title">{nameRU}</h3>
        <span className="movies-card__duration">
          {`${duration} ${addMinutes(duration)}`}
        </span>
      </div>
      {isMovies ? (
        <img
          src={`${url}${image.url}`}
          alt="Обложка фильма"
          className="movies-card__image"
        />
      ) : (
        <img
          src={`${url}${image}`}
          alt="Обложка фильма"
          className="movies-card__image"
        />
      )}
      {isMovies && isMovieSaved && (
        <button
          className="movies-card__button movies-card__button_type_saved"
          type="button"
          aria-label="Save"
          onClick={onCardDelete}
        />
      )}
      {isMovies && !isMovieSaved && (
        <button
          className="movies-card__button"
          type="button"
          onClick={handleLikeClick}
        >
          Сохранить
        </button>
      )}
      {isSavedMovies && (
        <button
          className="movies-card__button movies-card__button_type_delete"
          type="button"
          aria-label="Delete"
          onClick={handleCardDelete}
        />
      )}
    </li>
  );
}

MoviesCard.propTypes = {
  nameRU: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.any.isRequired,
  // trailer: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func.isRequired,
  isMovieSaved: PropTypes.bool.isRequired,
};

MoviesCard.defaultProps = {
  onCardLike: undefined,
};

export default MoviesCard;
