import React from "react";
import "./switcher.css";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import PropTypes from "prop-types";

const Switcher = ({ label1, label2, instructions, changeCallback }) => {
  const handleChange = e => changeCallback(e);

  return (
    <div className="row">
      <span className="searchFilter">{label1}</span>
      <div className="center">
        <input
          className="switcher"
          onChange={handleChange}
          type="checkbox"
          name=""
        />
      </div>
      <span className="searchFilter">{label2}</span>
      <button className="btn btn-outline-info help-btn" id="switcherHelp">
        ?
      </button>
      <UncontrolledPopover
        trigger="legacy"
        placement="bottom"
        target="switcherHelp"
      >
        <PopoverHeader>Helpful Instructions</PopoverHeader>
        <PopoverBody>{instructions}</PopoverBody>
      </UncontrolledPopover>
    </div>
  );
};

Switcher.propTypes = {
  label1: PropTypes.string,
  label2: PropTypes.string,
  instructions: PropTypes.string,
  changeCallback: PropTypes.func
};

export default Switcher;
