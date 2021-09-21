import React from 'react';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

// на 1280 должно отображаться 12 карточек (4 ряда по 3 карточки)
// на 768 - 8 карточек (4 ряда по 2 карточки)
// на 320 - 5 карточек по 1

function MoviesCardList({ isLoading, moviesCards, message }) {
  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('Something else..');
  };

  return (
    <section className="movies-cardlist">
      { isLoading ? <Preloader />
        : (
          <>
            { message ? (
              <span className="movies-cardlist__message">{message}</span>) : (
                <>
                  <ul className="movies-cardlist__list">
                    {
                moviesCards.map((card) => (
                  <MoviesCard
                    key={card.id}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...card}
                    // onCardClick={onCardClick}
                    // onCardLike={onCardLike}
                    // onCardDelete={onCardDelete}
                  />
                ))
              }
                  </ul>
                  <button
                    className="movies-cardlist__button"
                    type="button"
                    onClick={handleClick}
                  >
                    Ещё
                  </button>
                </>
            )}
          </>
        )}
    </section>
  );
/* <span className="movies-cardlist__message">{message}</span> */
}

MoviesCardList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  moviesCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string.isRequired,
};

export default MoviesCardList;
