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
  const [isFormSending, setIsFormSending] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));

  const history = useHistory();
  const location = useLocation();

  const handleError = (error) => {
    console.error(error);
  };

  const resetMessages = () => {
    setMessages({
      regForm: null,
      authForm: null,
      profileForm: null,
      searchForm: null,
      auth: null,
    });
  };

  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('foundMovies'));
    if (localMovies !== null) {
      setMovies(localMovies);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (localSavedMovies !== null) {
      setSavedMovies(localSavedMovies);
    }
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
        console.log(err.message);
        setLoggedIn(false);
        setMessages({
          regForm: null,
          authForm: null,
          profileForm: null,
          searchForm: null,
          auth: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате',
        });
        setCurrentUser({
          name: '',
          email: '',
        });
        localStorage.removeItem('foundMovies');
        localStorage.removeItem('savedMovies');
      });
  }, []);

  useEffect(() => {
    resetMessages();
  }, []);

  // функция получения всех фильмов от beatFilm
  const getMovies = () => {
    setIsLoading(true);
    MoviesApi
      .getMovies()
      .then((data) => {
        localStorage.setItem('beatFilmMovies', JSON.stringify(data));
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

  // функция поиска по фильмам
  const findMovies = (name) => {
    const beatFilmMovies = JSON.parse(localStorage.getItem('beatFilmMovies'));
    if (!beatFilmMovies) {
      getMovies();
    } else {
      const foundMovies = beatFilmMovies.filter(
        (c) => c.nameRU.toLowerCase().includes(name.toLowerCase()),
      );
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
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
        resetMessages();
      }
    }
  };

  // функция поиска по сохраненным в localStorage фильмам
  const findSavedMovies = (name) => {
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
      resetMessages();
    }
  };

  // функция сохранения фильма(лайка)
  const handleLike = (movie) => {
    // eslint-disable-next-line prefer-destructuring
    const id = movie.id;
    const country = movie.country || 'Неизвестно';
    const director = movie.director || 'Неизвестно';
    const duration = movie.duration || 'Неизвестно';
    const year = movie.year || 'Неизвестно';
    const description = movie.description || 'Неизвестно';
    const image = movie.image || '/uploads/_.jpeg';
    const trailerLink = movie.trailerLink || 'https://www.youtube.com/=';
    const nameRU = movie.nameRU || 'Неизвестно';
    const nameEN = movie.nameEN || 'Неизвестно';

    MainApi
      .saveMovie({
        id,
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
      })
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie]);
        localStorage.setItem('savedMovies', JSON.stringify([savedMovie, ...savedMovies]));
      })
      .catch((err) => {
        console.log('Ошибка при сохранении фильма', err.message);
      });
  };

  // функция удаления фильма
  const handleDelete = (movie) => {
    const movieId = movie.id || movie.movieId;
    const userMovie = savedMovies.find((i) => i.movieId === movieId);
    MainApi
      .deleteMovie(userMovie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== userMovie._id));
        const newSavedMovies = localSavedMovies.filter(
          (c) => c._id !== userMovie._id,
        );
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log('Ошибка при удалении фильма', err.message);
      });
  };

  const handleAuth = (user) => {
    setCurrentUser(user);
    setLoggedIn(true);
    MainApi
      .getSavedMovies()
      .then((usersMovies) => {
        setSavedMovies(usersMovies);
        localStorage.setItem('savedMovies', JSON.stringify(usersMovies));
      });
    // Ошибка обработается в catch в handleLogin и handleRegister, поэтому закомментированно
    // .catch((err) => {
    //   console.log(err.message);
    // });
  };

  const handleLogin = ({ password, email }) => {
    setIsFormSending(true);
    auth
      .authorize(password, email)
      .then((user) => {
        handleAuth(user);
        console.log('Успешный вход в аккаунт');
      })
      .then(() => history.push('/movies'))
      .catch((err) => {
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
          .then((user) => {
            handleAuth(user);
            console.log('Регистрация прошла успешно');
          })
          .then(() => history.push('/movies'));
      })
      .catch((err) => {
        if (err.message === '409') {
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
        localStorage.removeItem('foundMovies');
        localStorage.removeItem('savedMovies');
        setMovies([]);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const handleUpdateUser = (name, email) => {
    setIsFormSending(true);
    MainApi
      .setUserInfo(name, email)
      .then((user) => {
        setCurrentUser(user);
        console.log(user);
        setMessages({
          regForm: null,
          authForm: null,
          profileForm: 'Данные пользователья обновлены успешно',
          searchForm: null,
          auth: null,
        });
      })
      .catch((err) => {
        if (err.message === '409') {
          setMessages({
            regForm: null,
            authForm: null,
            profileForm: 'Пользователь с таким email уже существует',
            searchForm: null,
            auth: null,
          });
        } else {
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
            likedMovies={savedMovies.map((movie) => movie.movieId)}
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
