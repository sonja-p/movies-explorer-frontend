import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NotFound.css';

function NotFound({ loggedIn }) {
  const history = useHistory();

  const handleClick = () => {
    if (loggedIn && history.length > 4) {
      history.go(-2);
    } else {
      history.push('/');
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

NotFound.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default NotFound;
