import './App.css';
import React, { useState } from 'react';

import {
  Route, Switch,
} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Error from '../Error/Error';
import MoviesApi from '../../utils/MoviesApi';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [moviesCards, setMoviesCards] = useState([]);

  const findMovies = (name) => {
    setIsLoading(true);
    MoviesApi
      .getMovies()
      .then((data) => {
        setMoviesCards(() => data.filter(
          (c) => c.nameRU.toLowerCase().includes(name.toLowerCase()),
        ));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Ошибка при поиске фильма', err.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App">
      <Switch>
        <Route path="/movies">
          <Movies
            isLoading={isLoading}
            findMovies={findMovies}
            moviesCards={moviesCards}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            isLoading={false}
          />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/404">
          <Error />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
