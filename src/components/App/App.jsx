/* eslint-disable no-console */
import './App.css';
import React, {
  useState,
  useEffect,
} from 'react';

import {
  Route, Switch, Redirect, useHistory, useLocation,
} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import auth from '../../utils/auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState({
    regForm: null,
    authForm: null,
    profileForm: null,
    searchForm: null,
    auth: null,
  });
  const [movies, setMovies] = useState([]);
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [isFormSending, setIsFormSending] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const handleError = (error) => {
    console.error(error);
  };

  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (localMovies !== null) {
      setMovies(localMovies);
    }
  }, []);

  useEffect(() => {
    MainApi
      .getSavedMovies()
      .then((usersMovies) => {
        setSavedMovies(usersMovies);
        localStorage.setItem('savedMovies', JSON.stringify(usersMovies));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [loggedIn]);

  useEffect(() => {
    MainApi
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        history.push(location.pathname);
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err.message);
        setMessages({
          regForm: null,
          authForm: null,
          profileForm: null,
          searchForm: null,
          auth: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате',
        });
      });
  }, []);

  useEffect(() => {
    setMessages({
      regForm: null,
      authForm: null,
      profileForm: null,
      searchForm: null,
      auth: null,
    });
  }, []);

  // функция поиска по фильмам
  const findMovies = (name) => {
    setIsLoading(true);
    MoviesApi
      .getMovies()
      .then((data) => {
        const foundMovies = data.filter((c) => c.nameRU.toLowerCase().includes(name.toLowerCase()));
        if (foundMovies.length === 0) {
          setMessages({
            regForm: null,
            authForm: null,
            profileForm: null,
            searchForm: 'Ничего не найдено',
            auth: null,
          });
        } else {
          setMovies(foundMovies);
          localStorage.setItem('movies', JSON.stringify(foundMovies));
        }
      })
      .catch(() => {
        setMessages({
          regForm: null,
          authForm: null,
          profileForm: null,
          searchForm: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
          auth: null,
        });
      })
      .finally(() => setIsLoading(false));
  };

  // функция поиска по сохраненным в localStorage фильмам
  const findSavedMovies = (name) => {
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const foundSavedMovies = localSavedMovies.filter(
      (c) => c.nameRU.toLowerCase().includes(name.toLowerCase()),
    );
    if (foundSavedMovies.length === 0) {
      setMessages({
        regForm: null,
        authForm: null,
        profileForm: null,
        searchForm: 'Ничего не найдено',
        auth: null,
      });
    } else {
      setSavedMovies(foundSavedMovies);
    }
  };

  // функция сохранения фильма(лайка)
  const handleLike = (movie) => {
    MainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie]);
        localStorage.setItem('savedMovies', JSON.stringify([savedMovie, ...savedMovies]));
        setIsMovieSaved(true);
      })
      .catch((err) => {
        console.log('Ошибка при сохранении фильма', err.message);
      });
  };

  // функция удаления фильма
  const handleDelete = (movie) => {
    MainApi
      .deleteMovie(movie)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
        setIsMovieSaved(false);
      })
      .catch((err) => {
        console.log('Ошибка при удалении фильма', err.message);
      });
  };

  const handleLogin = ({ password, email }) => {
    setIsFormSending(true);
    auth
      .authorize(password, email)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        console.log('Успешный вход в аккаунт');
      })
      .then(() => history.push('/movies'))
      .catch((err) => {
        handleError(err);
        if (err) {
          setMessages({
            regForm: null,
            authForm: 'Вы ввели неправильный логин или пароль',
            profileForm: null,
            searchForm: null,
            auth: null,
          });
        }
      })
      .finally(() => setIsFormSending(false));
  };

  const handleRegister = ({ name, password, email }) => {
    setIsFormSending(true);
    auth
      .register(name, password, email)
      .then(() => {
        auth
          .authorize(password, email)
          .then((userData) => {
            setCurrentUser(userData);
            setLoggedIn(true);
            console.log('Регистрация прошла успешно');
          });
      })
      .catch((err) => {
        handleError(err);
        if (err) {
          // console.log(err.message);
          // тут должна быть проверка на 409 код
          setMessages({
            regForm: 'Пользователь с таким email уже существует',
            authForm: null,
            profileForm: null,
            searchForm: null,
            auth: null,
          });
        } else {
          setMessages({
            regForm: 'При регистрации пользователя произошла ошибка',
            authForm: null,
            profileForm: null,
            searchForm: null,
            auth: null,
          });
        }
      })
      .finally(() => setIsFormSending(false));
  };

  const handleLogout = () => {
    auth
      .logout()
      .then(() => {
        history.push('/signin');
        setLoggedIn(false);
        setCurrentUser({
          name: '',
          email: '',
        });
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        setMovies([]);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const handleUpdateUser = () => {
    setIsFormSending(true);
    MainApi
      .setUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        // console.log(err.message);
        // тут должна быть проверка на 409 код
        if (err) {
          setMessages({
            regForm: null,
            authForm: null,
            profileForm: 'Пользователь с таким email уже существует',
            searchForm: null,
            auth: null,
          });
        } else {
          console.log(err.message);
          setMessages({
            regForm: null,
            authForm: null,
            profileForm: 'При обновлении профиля произошла ошибка',
            searchForm: null,
            auth: null,
          });
        }
      })
      .finally(() => setIsFormSending(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            isLoading={isLoading}
            findMovies={findMovies}
            movies={movies}
            messages={messages}
            onCardLike={handleLike}
            onCardDelete={handleDelete}
            isMovieSaved={isMovieSaved}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            isLoading={isLoading}
            findMovies={findSavedMovies}
            movies={savedMovies}
            messages={messages}
            onCardDelete={handleDelete}
            isMovieSaved={isMovieSaved}
          />
          <Route exact path="/signup">
            {loggedIn && <Redirect to="/" />}
            <Register
              handleRegister={handleRegister}
              isSending={isFormSending}
              messages={messages}
            />
          </Route>
          <Route exact path="/signin">
            {loggedIn && <Redirect to="/" />}
            <Login
              handleLogin={handleLogin}
              isSending={isFormSending}
              messages={messages}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            handleLogout={handleLogout}
            onUpdateUser={handleUpdateUser}
            isSending={isFormSending}
            messages={messages}
          />
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <Route path="/*">
            <NotFound loggedIn={loggedIn} />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
