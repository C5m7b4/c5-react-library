import React from "react";
import "./switcher.css";
import PropTypes from "prop-types";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

const Switcher = ({
  label1,
  label2,
  instructions,
  changeCallback,
  useState,
  headerText
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
      <span className="col-xs-12 col-sm-3 searchFilter">{label1}</span>
      <div className="col-xs-12 col-sm-4 center">
        <input
          className="switcher"
          onChange={handleChange}
          type="checkbox"
          name=""
        />
      </div>
      <span className="col-xs-12 col-sm-3 searchFilter">{label2}</span>
      <button
        className="btn btn-outline-info help-btn"
        id="switcherHelp"
        onClick={togglePopover}
      >
        ?
      </button>
      <div className="col-xs-12 col-sm-2">
        {
          <Popover
            trigger="legacy"
            isOpen={popoveropen}
            toggle={togglePopover}
            placement="bottom"
            target="switcherHelp"
          >
            <PopoverHeader>
              {headerText || "Helpful Instructions"}
            </PopoverHeader>
            <PopoverBody>{instructions}</PopoverBody>
          </Popover>
        }
      </div>
    </div>
  );
};

Switcher.propTypes = {
  label1: PropTypes.string,
  label2: PropTypes.string,
  instructions: PropTypes.string,
  changeCallback: PropTypes.func,
  useState: PropTypes.func,
  headerText: PropTypes.string
};

export default Switcher;
