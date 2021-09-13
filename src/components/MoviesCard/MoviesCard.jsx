import React, { useState } from 'react';
import './MoviesCard.css';
import image from '../../images/movie-1.png';

function MoviesCard() {
  const [isMovieSaved, setIsMovieSaved] = useState(false);

  function handleCardSave() {
    setIsMovieSaved(!isMovieSaved);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <h3 className="movies-card__title">В погоне за Бенкси</h3>
        <span className="movies-card__duration">27 минут</span>
      </div>
      <img
        src={image}
        alt=""
        className="movies-card__image"
      />
      {isMovieSaved ? (
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
      )}
    </li>
  );
}

export default MoviesCard;
