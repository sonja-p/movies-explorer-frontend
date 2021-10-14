const URL = 'https://api.nomoreparties.co';

// максимальная длительность короткометражки
const SHORT_MOVIE_DURATION = 40;

// Кнопка «Ещё» загружает по 2 карточки при ширине экрана 768px
const CARDS_TO_ADD_FOR_MIN_WW = 2;

// Кнопка «Ещё» загружает по 2 карточки при ширине экрана 1280px
const CARDS_TO_ADD_FOR_MAX_WW = 3;

// Ширина от 320px до 480px — отображается 5 карточек
const CARDS_COUNT_FOR_MIN_WW = 5;

// Ширина 768px — 8 карточек
const CARDS_COUNT_FOR_MEDIUM_WW = 8;

// Ширина 1280px — 12 карточек
const CARDS_COUNT_FOR_MAX_WW = 12;

export {
  URL,
  SHORT_MOVIE_DURATION,
  CARDS_TO_ADD_FOR_MIN_WW,
  CARDS_TO_ADD_FOR_MAX_WW,
  CARDS_COUNT_FOR_MIN_WW,
  CARDS_COUNT_FOR_MEDIUM_WW,
  CARDS_COUNT_FOR_MAX_WW,
};
