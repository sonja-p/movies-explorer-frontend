import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <>
      <div className="promo">
        <div className="promo__container">
          <h1 className="promo__title">Учебный проект студенки факультета Веб‑разработки.</h1>
          <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создательницу.</p>
        </div>
        <div className="promo__logo" />
      </div>
    </>
  );
}

export default Promo;
