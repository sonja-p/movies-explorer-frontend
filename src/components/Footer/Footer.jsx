import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <p className="footer__about-project">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">
          &copy;
          {' '}
          {new Date().getFullYear()}
        </p>
        <ul className="footer__links">
          <li className="footer__links-item">
            <a href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__links-item">
            <a href="https://github.com/sonja-p" className="footer__link" target="_blank" rel="noreferrer">Github</a>
          </li>
          <li className="footer__links-item">
            <a href="https://www.instagram.com/soninson" className="footer__link" target="_blank" rel="noreferrer">Instagram</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
