/* eslint-disable no-console */
import './App.css';
import React, {
  useState,
  useEffect,
} from 'react';

import {
  Route, Switch, useHistory,
} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Error from '../Error/Error';
import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import throttle from '../../utils/throttle';
import auth from '../../utils/auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [moviesCards, setMoviesCards] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [isFormSending, setIsFormSending] = useState(false);

  const history = useHistory();

  const handleError = (error) => {
    console.error(error);
  };

  // перенести в cardlist
  useEffect(() => {
    const callback = throttle(() => {
      setWindowWidth(window.innerWidth);
    }, 1000);

    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);

  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (localMovies !== null) {
      setMoviesCards(localMovies);
    }
  }, []);

  const findMovies = (name) => {
    setIsLoading(true);
    MoviesApi
      .getMovies()
      .then((data) => {
        const movies = data.filter((c) => c.nameRU.toLowerCase().includes(name.toLowerCase()));
        if (movies.length === 0) {
          setMessage('Ничего не найдено');
        } else {
          setMessage('');
          setMoviesCards(movies);
          localStorage.setItem('movies', JSON.stringify(movies));
        }
      })
      .catch((err) => {
        console.log('Ошибка при поиске фильма', err.message);
        setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => setIsLoading(false));
  };

  const handleLike = () => {
    MainApi
      .saveMovie()
      .then((data) => {
        console.log(data);
        setIsMovieSaved(true);
      })
      .catch((err) => {
        console.log('Ошибка при сохранении фильма', err.message);
      });
  };

  const handleDelete = () => {
    MainApi
      .deleteMovie()
      .then((data) => {
        console.log(data);
        setIsMovieSaved(false);
      })
      .catch((err) => {
        console.log('Ошибка при удалении фильма', err.message);
      });
  };

  const handleRegister = ({ name, password, email }) => {
    setIsFormSending(true);
    auth
      .register(name, password, email)
      .then((user) => {
        setCurrentUser(user);
        console.log('Регистрация прошла успешно', user);
      })
      .then(() => history.push('/movies'))
      .catch((err) => {
        handleError(err);
        if (err) {
          setMessage('Что-то пошло не так...');
        }
      })
      .finally(() => setIsFormSending(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route path="/movies">
            <Movies
              isLoading={isLoading}
              findMovies={findMovies}
              moviesCards={moviesCards}
              message={message}
              windowWidth={windowWidth}
              onCardLike={handleLike}
              onCardDelete={handleDelete}
              isMovieSaved={isMovieSaved}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
              isLoading={false}
            />
          </Route>
          <Route path="/signup">
            <Register
              handleRegister={handleRegister}
              isSending={isFormSending}
              message={message}
            />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
