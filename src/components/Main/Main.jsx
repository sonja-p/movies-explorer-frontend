import React from 'react';
import './Main.css';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

/*
Promo — компонент с вёрсткой баннера страницы «О проекте».
NavTab — компонент с навигацией по странице «О проекте».
AboutProject — компонент с описанием дипломного проекта.
Techs — компонент с использованными технологиями.
AboutMe — компонент с информацией о студенте.
Portfolio — компонент со ссылками на другие проекты.
*/

function Main({ loggedIn }) {
  const ref = React.createRef();

  const scrollTo = () => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <Promo />
        <NavTab>
          <button onClick={() => scrollTo()} type="button" className="nav-tab__link">Узнать больше</button>
        </NavTab>
        <AboutProject ref={ref} />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

Main.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Main;
