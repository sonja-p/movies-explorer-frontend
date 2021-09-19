import React from 'react';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

// на 1280 должно отображаться 12 карточек (4 ряда по 3 карточки)
// на 768 - 8 карточек (4 ряда по 2 карточки)
// на 320 - 5 карточек по 1

function MoviesCardList({ isLoading }) {
  return (
    <section className="movies-cardlist">
      {isLoading ? <Preloader />
        : (
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
        )}
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

MoviesCardList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default MoviesCardList;
