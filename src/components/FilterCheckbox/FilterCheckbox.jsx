import React from 'react';
import PropTypes from 'prop-types';
import './FilterCheckbox.css';

function FilterCheckbox({ filtered, handleCheck }) {
  function toggleCheckbox() {
    handleCheck(!filtered);
  }

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input type="checkbox" onClick={toggleCheckbox} className="filter-checkbox__input" />
        <span className="filter-checkbox__slider" />
      </label>
      <h3 className="filter-checkbox__title">Короткометражки</h3>
    </div>
  );
}

FilterCheckbox.propTypes = {
  handleCheck: PropTypes.func.isRequired,
  filtered: PropTypes.bool.isRequired,
};

export default FilterCheckbox;
