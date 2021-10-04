import React, { useState } from 'react';
import './SavedMovies.css';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMovies({
  isLoading, loggedIn, findMovies, movies, messages, onCardDelete,
}) {
  const [filtered, setFiltered] = useState(false);
  const SHORT_MOVIE_DURATION = 40;

  const data = !filtered ? movies : movies.filter(
    (movie) => movie.duration <= SHORT_MOVIE_DURATION,
  );

  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        findMovies={findMovies}
        isLoading={isLoading}
      />
      <FilterCheckbox
        filtered={filtered}
        handleCheck={(value) => setFiltered(value)}
      />
      <MoviesCardList
        isLoading={isLoading}
        moviesCards={data}
        messages={messages}
      >
        {
          (data.map((card) => (
            <MoviesCard
              key={card.movieId}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...card}
              // onCardClick={onCardClick}
              onCardDelete={onCardDelete}
            />
          )).reverse())
        }
      </MoviesCardList>
      <Footer />
    </div>
  );
}

SavedMovies.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  findMovies: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  messages: PropTypes.shape({
    regForm: PropTypes.string,
    authForm: PropTypes.string,
    profileForm: PropTypes.string,
    searchForm: PropTypes.string,
    auth: PropTypes.string,
  }).isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

export default SavedMovies;
