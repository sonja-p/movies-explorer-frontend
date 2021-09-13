import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="navigation">
      <div className={`navigation__menu ${isMenuOpen ? 'navigation_menu-open' : ''}`}>
        <div className="navigation__container">
          <NavLink
            exact
            to="."
            className="navigation__link navigation__link_hidden"
            activeClassName="navigation__link_selected"
          >
            Главная
          </NavLink>
          <NavLink
            to="movies"
            className="navigation__link"
            activeClassName="navigation__link_selected"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="saved-movies"
            className="navigation__link"
            activeClassName="navigation__link_selected"
          >
            Сохраненные фильмы
          </NavLink>
        </div>
        <Link
          to="profile"
          className="navigation__account-link"
        >
          Аккаунт
        </Link>
      </div>
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="toggleMenu"
        className={`navigation__button ${isMenuOpen ? 'navigation__button_type_close' : ''}`}
      />

      <div className={`navigation__fade ${isMenuOpen ? 'navigation_menu-open' : ''}`} />
    </nav>
  );
}

export default Navigation;
