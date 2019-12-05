import React from "react";
import "./switcher.css";
import PropTypes from "prop-types";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

const Switcher = ({
  label1,
  label2,
  instructions,
  changeCallback,
  useState
}) => {
  const [popoveropen, setPopoverOpen] = useState(false);

  const togglePopover = () => {
    setPopoverOpen(!popoveropen);
  };

  const handleChange = e => {
    changeCallback(e.target.checked);
  };

  return (
    <div className="row justify-content-center">
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
      <button
        className="btn btn-outline-info help-btn"
        id="switcherHelp"
        onClick={togglePopover}
      >
        ?
      </button>
      {
        <Popover
          trigger="legacy"
          isOpen={popoveropen}
          toggle={togglePopover}
          placement="bottom"
          target="switcherHelp"
        >
          <PopoverHeader>Helpful Instructions</PopoverHeader>
          <PopoverBody>{instructions}</PopoverBody>
        </Popover>
      }
    </div>
  );
};

Switcher.propTypes = {
  label1: PropTypes.string,
  label2: PropTypes.string,
  instructions: PropTypes.string,
  changeCallback: PropTypes.func,
  useState: PropTypes.func
};

export default Switcher;
