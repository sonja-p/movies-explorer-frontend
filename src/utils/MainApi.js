import reqOptions from './constants';

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _parseResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  // # возвращает информацию о пользователе (email и имя)
  // GET /users/me
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._parseResponse(res));
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._parseResponse(res));
  }

  // # обновляет информацию о пользователе (email и имя)
  // PATCH /users/me
  setUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(name, email),
    })
      .then((res) => this._parseResponse(res));
  }

  saveMovie({
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
  }) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: image.url,
        trailer: trailerLink,
        thumbnail: image.formats.thumbnail.url,
        nameRU,
        nameEN,
        movieId: id,
      }),
    })
      .then((res) => this._parseResponse(res));
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      headers: this._headers,
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => this._parseResponse(res));
  }
}

const MainApi = new Api(reqOptions);

export default MainApi;
