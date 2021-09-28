import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import throttle from '../../utils/throttle';

// Если карточек больше трёх, под ними появляется кнопка «Ещё».
// По нажатию отрисовываются ещё три, а кнопка сдвигается ниже,
// чтобы оказаться под блоком с карточками.
// Ширина 1280px — 12 карточек по 3 в ряд. Кнопка «Ещё» загружает по 3 карточки.
// Ширина 768px — 8 карточек по 2 в ряд. Кнопка «Ещё» загружает по 2 карточки.
// Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.

function MoviesCardList({
  isLoading, moviesCards, messages, children,
}) {
  const [cardsCount, setCardsCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const callback = throttle(() => {
      setWindowWidth(window.innerWidth);
    }, 1000);

    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);

  const handleClick = () => {
    if (windowWidth > 1020) {
      setCardsCount(cardsCount + 3);
    } else {
      setCardsCount(cardsCount + 2);
    }
  };

  const renderCards = () => {
    if (windowWidth > 768) {
      setCardsCount(12);
    } else if (windowWidth > 480 && windowWidth <= 768) {
      setCardsCount(8);
    } else {
      setCardsCount(5);
    }
  };

  useEffect(() => renderCards(), [windowWidth]);

  return (
    <section className="movies-cardlist">
      { isLoading ? <Preloader />
        : (
          <>
            { messages.searchForm ? (
              <span className="movies-cardlist__message">{messages.searchForm}</span>) : (
                <>
                  <ul className="movies-cardlist__list">
                    {children.slice(0, cardsCount)}
                  </ul>
                  { moviesCards.length > 3 && moviesCards.length > cardsCount && (
                  <button
                    className="movies-cardlist__button"
                    type="button"
                    onClick={handleClick}
                  >
                    Ещё
                  </button>
                  )}
                </>
            )}
          </>
        )}
    </section>
  );
}

MoviesCardList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  moviesCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  messages: PropTypes.shape({
    regForm: PropTypes.string,
    authForm: PropTypes.string,
    profileForm: PropTypes.string,
    searchForm: PropTypes.string,
    auth: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array,
  // isMovieSaved: PropTypes.bool.isRequired,
};

MoviesCardList.defaultProps = {
  children: undefined,
};

export default MoviesCardList;
