import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import './MoviesCard.css';
import image from '../../images/movie-1.png';

function MoviesCard() {
  const [isMovieSaved, setIsMovieSaved] = useState(false);

  const isSavedMovies = useRouteMatch({ path: '/saved-movies', exact: true });
  const isMovies = useRouteMatch({ path: '/movies', exact: true });

  function handleCardSave() {
    setIsMovieSaved(!isMovieSaved);
  }

  function handleCardDelete(evt) {
    evt.target.closest('.movies-card').remove();
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <h3 className="movies-card__title">В погоне за Бенкси</h3>
        <span className="movies-card__duration">27 минут</span>
      </div>
      <img
        src={image}
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

export default MoviesCard;
