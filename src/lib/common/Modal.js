/* eslint-disable react/jsx-indent */
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, className, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <div className={className}>{children}</div>,
        document.body
      )
    : null;

export default Modal;
