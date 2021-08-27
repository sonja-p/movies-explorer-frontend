import './App.css';

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import {
    Route, Switch
  } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <div className="page__container">
            <Switch>
                <Route path="/movies">
                    <Movies/>
                </Route>
                <Route path="/saved-movies">
                    <SavedMovies/>
                </Route>
                <Route path="/signup">
                    <Register/>
                </Route>
                <Route path="/signin">
                    <Login/>
                </Route>
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/">
                    <Main />
                </Route>
            </Switch>
          <Footer />
        </div>
      </div>
  );
}

export default App;
