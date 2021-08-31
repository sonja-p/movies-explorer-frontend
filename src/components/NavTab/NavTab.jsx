import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <div className="nav-tab__wrapper">
      <section className="nav-tab">
        <Link to="#section" className="nav-tab__link">Узнать больше</Link>
      </section>
    </div>
  );
}

export default NavTab;
