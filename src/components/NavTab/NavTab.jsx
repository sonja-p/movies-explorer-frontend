import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <>
      <div className="navigation-tab">
        <Link to="#section" className="nav-tab__link">Узнать больше</Link>
      </div>
    </>
  );
}

export default NavTab;
