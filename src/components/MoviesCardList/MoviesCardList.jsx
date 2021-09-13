import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

// на 1280 должно отображаться 12 карточек (4 ряда по 3 карточки)
// на 768 - 8 карточек (4 ряда по 2 карточки)
// на 320 - 5 карточек по 1

function MoviesCardList() {
  return (
    <section className="movies-cardlist">
      <ul className="movies-cardlist__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button
        className="movies-cardlist__button"
        type="button"
        onClick
      >
        Ещё
      </button>
    </section>

  );
}

export default MoviesCardList;
