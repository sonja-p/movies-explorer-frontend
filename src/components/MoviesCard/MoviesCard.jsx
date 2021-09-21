import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MoviesCard.css';

function MoviesCard(props) {
  const url = 'https://api.nomoreparties.co';
  const {
    nameRU, image, duration,
    // trailer,
  } = props;
  const [isMovieSaved, setIsMovieSaved] = useState(false);

  const isSavedMovies = useRouteMatch({ path: '/saved-movies', exact: true });
  const isMovies = useRouteMatch({ path: '/movies', exact: true });

  function handleCardSave() {
    setIsMovieSaved(!isMovieSaved);
  }

  function handleCardDelete(evt) {
    evt.target.closest('.movies-card').remove();
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
      <img
        src={`${url}${image.url}`}
        alt="Обложка фильма"
        className="movies-card__image"
      />
      {isMovies && (isMovieSaved ? (
        <button
          className="movies-card__button movies-card__button_type_saved"
          type="button"
          aria-label="Save"
          onClick={handleCardSave}
        />
      ) : (
        <button
          className="movies-card__button"
          type="button"
          onClick={handleCardSave}
        >
          Сохранить
        </button>
      ))}
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
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  // trailer: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

export default MoviesCard;
