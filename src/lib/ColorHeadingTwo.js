import React from "react";
import PropTypes from "prop-types";

const ColorHeadingTwo = ({ text, color }) => {
  return <h2 style={{ color }}>{text}</h2>;
};

ColorHeadingTwo.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string
};

export default ColorHeadingTwo;
