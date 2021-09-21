import reqOptions from './constants';

class Api {
  constructor(options) {
    this._url = options.beatfilmUrl;
    this._headers = options.headers;
  }

  _parseResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getMovies() {
    return fetch(this._url, {
      headers: this._headers,
    })
      .then((res) => this._parseResponse(res));
  }
}

const MoviesApi = new Api(reqOptions);

export default MoviesApi;
