import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MoviesCard.css';
import { URL } from '../../utils/constants';

function MoviesCard(props) {
  const {
    id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    trailer,
    nameRU,
    nameEN,
    onCardLike,
    onCardDelete,
    isLiked,
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

  const handleCardDelete = () => {
    onCardDelete(props);
  };

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
        <a href={trailerLink} target="_blank" rel="noreferrer" className="movies-card__link">
          <img
            src={`${URL}${image.url}`}
            alt={`Обложка фильма "${nameRU}"`}
            className="movies-card__image"
          />
        </a>
      ) : (
        <a href={trailer} target="_blank" rel="noreferrer" className="movies-card__link">
          <img
            src={`${URL}${image}`}
            alt={`Обложка фильма "${nameRU}"`}
            className="movies-card__image"
          />
        </a>
      )}
      {isMovies && isLiked && (
        <button
          className="movies-card__button movies-card__button_type_saved"
          type="button"
          aria-label="Save"
          onClick={onCardDelete}
        />
      )}
      {isMovies && !isLiked && (
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
  id: PropTypes.number,
  country: PropTypes.string,
  director: PropTypes.string,
  year: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  nameRU: PropTypes.string.isRequired,
  nameEN: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.any.isRequired,
  trailerLink: PropTypes.string,
  trailer: PropTypes.string,
  duration: PropTypes.number.isRequired,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func.isRequired,
  isLiked: PropTypes.bool,
};

MoviesCard.defaultProps = {
  id: undefined,
  onCardLike: undefined,
  isLiked: undefined,
  trailer: undefined,
  trailerLink: undefined,
  country: undefined,
  director: undefined,
  nameEN: undefined,
};

export default MoviesCard;
