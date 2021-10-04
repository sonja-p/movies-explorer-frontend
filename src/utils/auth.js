import reqOptions from './constants';

class Auth {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse = (response) => (response.ok
    ? response.json()
    : Promise.reject(new Error(response.status)));

  register = (name, password, email) => fetch(`${this._url}/signup`, {
    headers: this._headers,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      name: `${name}`,
      password: `${password}`,
      email: `${email}`,
    }),
  }).then((response) => this._checkResponse(response))

  authorize(password, email) {
    return fetch(`${this._url}/signin`, {
      headers: this._headers,
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      }),
    }).then((response) => this._checkResponse(response));
  }

  logout = () => fetch(`${this._url}/logout`, {
    headers: this._headers,
    credentials: 'include',
  }).then((response) => this._checkResponse(response))
}

const auth = new Auth(reqOptions);

export default auth;
