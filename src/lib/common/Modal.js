/* eslint-disable react/jsx-indent */
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, hide, header, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-box">
              <div className="modal-header">
                {!header ? null : (
                  <div className="modal-header-caption">{header}</div>
                )}
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {props.children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
