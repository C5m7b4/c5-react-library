import React from "react";
import PropTypes from "prop-types";

const ColorHeadingOne = ({ text, color }) => {
  return <h1 style={{ color }}>{text}</h1>;
};

ColorHeadingOne.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string
};

export default ColorHeadingOne;
