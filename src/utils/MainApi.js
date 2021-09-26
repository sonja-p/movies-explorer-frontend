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

  // # обновляет информацию о пользователе (email и имя)
  // PATCH /users/me
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._parseResponse(res));
  }

  saveMovie() {
    // Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      method: 'PUT',
      credentials: 'include',
    })
      .then((res) => this._parseResponse(res));
  }

  deleteMovie() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => this._parseResponse(res));
  }
}

const MainApi = new Api(reqOptions);

export default MainApi;
