import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a href="https://puolukka.nomoredomains.rocks" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__link-title">Статичный сайт</p>
            <div className="portfolio__link-arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://puolukka.nomoredomains.rocks" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__link-title">Адаптивный сайт</p>
            <div className="portfolio__link-arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://puolukka.nomoredomains.rocks" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__link-title">Одностраничное приложение</p>
            <div className="portfolio__link-arrow" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
