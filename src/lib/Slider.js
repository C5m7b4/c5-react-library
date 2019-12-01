/* eslint-disable react/self-closing-comp */
import React from "react";
import "./Slider.css";

const Slider = () => {
  return (
    <div className="slider-body">
      <label className="slider-toggle">
        <input type="checkbox" className="slider-check" />
        <span className="slider-slider"></span>
      </label>
    </div>
  );
};

export default Slider;
