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
