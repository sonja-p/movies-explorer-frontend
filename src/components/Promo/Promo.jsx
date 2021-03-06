import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <div className="promo__wrapper">
      <section className="promo">
        <div className="promo__container">
          <h1 className="promo__title">Учебный проект студентки факультета Веб‑разработки.</h1>
          <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создательницу.</p>
        </div>
        <div className="promo__logo" />
      </section>
    </div>
  );
}

export default Promo;
