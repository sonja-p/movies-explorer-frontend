import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

/*
Promo — компонент с вёрсткой баннера страницы «О проекте».
NavTab — компонент с навигацией по странице «О проекте».
AboutProject — компонент с описанием дипломного проекта.
Techs — компонент с использованными технологиями.
AboutMe — компонент с информацией о студенте.
Portfolio — компонент со ссылками на другие проекты.
*/

function Main() {
  return (
    <>
      <Header />
      <main className="main">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
    </>
  );
}

export default Main;
