import React from "react";
import PropTypes from "prop-types";

const PickerContents = ({
  header,
  store,
  handleSelect,
  hide,
  valueField,
  displayField,
  scrollRef,
  viewportRef,
  useEffect,
  scrollStyle
}) => {
  useEffect(() => {}, [scrollStyle]);
  return (
    <div className="Modal-Picker">
      <div className="picker-modal">
        <div className="picker default">
          <div className="modal-picker-header">
            <a className="modal-navbar-btn-cancel" onClick={hide}>
              <span className="modal-navbar-btn-cancel-span">Cancel</span>
            </a>
            {!header ? null : (
              <div className="modal-header-caption">{header}</div>
            )}
            <a className="modal-navbar-btn-confirm" onClick={handleSelect}>
              <span className="modal-navbar-btn-select-span justify-content-end">
                Select
              </span>
            </a>
          </div>
          <div className="modal-records-body">
            <div className="modal-records-col">
              <div
                ref={viewportRef}
                className="modal-records-viewport"
                id="modal-viewport"
              >
                <div className="modal-records-wheel">
                  <ul
                    ref={scrollRef}
                    className="modal-records-scroll"
                    style={scrollStyle}
                    id="modal-scroll"
                  >
                    {store.length === 0 ? (
                      <div key="0">
                        <div className="modal-empty-records">
                          There are no records to show
                        </div>
                      </div>
                    ) : (
                      store.map(s => {
                        return <li key={s[valueField]}>{s[displayField]}</li>;
                      })
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PickerContents.propTypes = {
  store: PropTypes.array,
  hide: PropTypes.func,
  handleSelect: PropTypes.func,
  header: PropTypes.string,
  valueField: PropTypes.string,
  displayField: PropTypes.string,
  viewportRef: PropTypes.object,
  scrollRef: PropTypes.object,
  useEffect: PropTypes.func,
  scrollStyle: PropTypes.any
};

export default PickerContents;
