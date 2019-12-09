/* eslint-disable react/self-closing-comp */
import React from "react";
import "./Slider.css";
import PropTypes from "prop-types";

const Slider = ({ onChanged }) => {
  const handleChange = e => {
    onChanged(e.target.checked);
  };

  return (
    <div className="slider-body">
      <label className="slider-toggle">
        <input
          type="checkbox"
          className="slider-check"
          onChange={handleChange}
        />
        <span className="slider-slider"></span>
      </label>
    </div>
  );
};

Slider.propTypes = {
  onChanged: PropTypes.func
};

export default Slider;
