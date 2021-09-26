import React from 'react';
import './SavedMovies.css';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({
  isLoading, loggedIn, findMovies, moviesCards, messages, onCardDelete, isMovieSaved,
}) {
  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} />
      <SearchForm findMovies={findMovies} isLoading={isLoading} />
      <FilterCheckbox isChecked />
      <MoviesCardList
        isLoading={isLoading}
        moviesCards={moviesCards}
        messages={messages}
        onCardDelete={onCardDelete}
        isMovieSaved={isMovieSaved}
      />
      <Footer />
    </div>
  );
}

SavedMovies.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  findMovies: PropTypes.func.isRequired,
  moviesCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  messages: PropTypes.shape({
    regForm: PropTypes.string,
    authForm: PropTypes.string,
    profileForm: PropTypes.string,
    searchForm: PropTypes.string,
    auth: PropTypes.string,
  }).isRequired,
  onCardDelete: PropTypes.func.isRequired,
  isMovieSaved: PropTypes.bool.isRequired,
};

export default SavedMovies;
