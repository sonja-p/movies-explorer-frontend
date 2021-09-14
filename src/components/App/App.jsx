import './App.css';
import React from 'react';

import {
  Route, Switch,
} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/movies">
          <Movies
            isLoading={false}
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
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
