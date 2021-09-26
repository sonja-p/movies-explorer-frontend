import React from 'react';
import './Movies.css';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({
  loggedIn, isLoading, findMovies, moviesCards, messages, onCardLike, onCardDelete, isMovieSaved,
}) {
  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm findMovies={findMovies} isLoading={isLoading} />
      <FilterCheckbox isChecked />
      <MoviesCardList
        isLoading={isLoading}
        moviesCards={moviesCards}
        messages={messages}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        isMovieSaved={isMovieSaved}
      />
      <Footer />
    </div>
  );
}

Movies.propTypes = {
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
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
  isMovieSaved: PropTypes.bool.isRequired,
};

export default Movies;
