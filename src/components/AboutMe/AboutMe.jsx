import React from 'react';
import './AboutMe.css';
import photoMe from '../../images/photo-me.jpg';

function AboutMe() {
  return (
    <div className="about-me">
      <h2 className="about-me__title">Студентка</h2>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__name">Софья</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 31 год</p>
          <p className="about-me__text">
            Я живу в Санкт-Петербурге,
            закончила факультет технологии и предпринимательства РГПУ им.Герцена.
            Я люблю шить и современные технологии,
            долгое время работала в портнихой,
            сейчас моя работа связана со швейной и вышивальной техникой.
            А ещё увлекаюсь бегом.
            Недавно, благодаря учебе в Яндекс.Практикуме, начала кодить.
            После окончания курса планирую работать в сфере IT.
          </p>

          <div className="about-me__social-media">
            <a href="https://www.instagram.com/soninson/" className="about-me__link" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://github.com/sonja-p" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
        <img className="about-me__photo" alt="me" src={photoMe} />
      </div>
    </div>
  );
}

export default AboutMe;
