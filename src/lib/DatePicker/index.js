import "./index.css";
import React from "react";
import DatePicker from "./DatePicker.js";
import Modal from "./Modal.js";
import { defaultProps } from "./dataSource";
import PropTypes from "prop-types";

const ModalDatePicker = ({ isOpen, ...props }) => {
  return (
    <div>
      {!isOpen ? null : (
        <Modal {...props}>
          <DatePicker {...defaultProps} />
        </Modal>
      )}
    </div>
  );
};

ModalDatePicker.propTypes = {
  isOpen: PropTypes.bool,
  onSelect: PropTypes.func,
  onCancel: PropTypes.func
};

export default ModalDatePicker;
