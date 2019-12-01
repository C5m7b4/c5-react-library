/* eslint-disable react/jsx-indent */
import "./index.css";
import React from "react";
import DatePicker from "./DatePicker.js";
import Modal from "../common/Modal";
import { defaultProps } from "./dataSource";
import PropTypes from "prop-types";

const ModalDatePicker = ({
  isShowing,
  onCancel,
  onSelect,
  useState,
  useEffect,
  ...props
}) => {
  return (
    <div>
      <Modal id="portal" className="Modal-Portal" isShowing={isShowing}>
        <DatePicker
          {...defaultProps}
          useState={useState}
          useEffect={useEffect}
          onCancel={onCancel}
          onSelect={onSelect}
        />
      </Modal>
    </div>
  );
};

ModalDatePicker.propTypes = {
  isShowing: PropTypes.bool,
  onSelect: PropTypes.func,
  onCancel: PropTypes.func,
  useState: PropTypes.func,
  useEffect: PropTypes.func
};

export default ModalDatePicker;
