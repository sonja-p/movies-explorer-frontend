import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const history = useHistory();

  const handleClick = () => {
    if (history.length < 2) {
      history.push('/');
    } else {
      history.go(-1);
    }
  };

  return (
    <div className="not-found">
      <span className="not-found__error-code">404</span>
      <p className="not-found__error-text">Страница не найдена</p>
      <button type="button" onClick={handleClick} className="not-found__link">Назад</button>
    </div>
  );
}

export default NotFound;
