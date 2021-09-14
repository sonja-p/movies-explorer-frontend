import React from 'react';
import './NavTab.css';
import PropTypes from 'prop-types';

function NavTab({ children }) {
  return (
    <div className="nav-tab__wrapper">
      <section className="nav-tab">
        {children}
      </section>
    </div>
  );
}

NavTab.propTypes = {
  children: PropTypes.node,
};

NavTab.defaultProps = {
  children: undefined,
};

export default NavTab;
