import React from 'react';
import './Movies.css';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({
  isLoading, findMovies, moviesCards, message,
}) {
  return (
    <div className="movies">
      <Header />
      <SearchForm findMovies={findMovies} isLoading={isLoading} />
      <FilterCheckbox isChecked />
      <MoviesCardList
        isLoading={isLoading}
        moviesCards={moviesCards}
        message={message}
      />
      <Footer />
    </div>
  );
}

Movies.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  findMovies: PropTypes.func.isRequired,
  moviesCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string.isRequired,
};

export default Movies;
