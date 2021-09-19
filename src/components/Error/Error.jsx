import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

function Login() {
  return (
    <div className="error">
      <span className="error__error-code">404</span>
      <p className="error__error-text">Страница не найдена</p>
      <Link to="/" className="error__link">Назад</Link>
    </div>
  );
}

export default Login;
