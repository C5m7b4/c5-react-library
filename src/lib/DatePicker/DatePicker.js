import React, { useState, useEffect } from "react";
import DatePickerItem from "./DatePickerItem.js";
import { convertDate, nextDate } from "./time.js";
import { dateConfigMap } from "./dataSource";
import { capitalize, isArray } from "./utils";
import PropTypes from "prop-types";

const DatePicker = ({ onSelect, onChange, value, ...props }) => {
  const [time, setTime] = useState(nextDate(value || new Date()));

  useEffect(() => {}, [time]);

  const handleFinishBtnClick = () => {
    onSelect(time);
  };

  const handleDateSelect = value => {
    setTime(value);
    onChange(value);
  };

  const normalizeDateConfig = dataConfig => {
    const configList = [];
    if (isArray(dataConfig)) {
      for (let i = 0; i < dataConfig.length; i++) {
        const v = dataConfig[i];
        if (typeof v === "string") {
          const lowerCaseKey = v.toLocaleLowerCase();
          configList.push({
            ...dateConfigMap[lowerCaseKey],
            type: capitalize(lowerCaseKey)
          });
        }
      }
    } else {
      for (const key in dataConfig) {
        if (dataConfig.hasOwnProperty(key)) {
          const lowerCaseKey = key.toLocaleLowerCase();
          if (dateConfigMap.hasOwnProperty(lowerCaseKey)) {
            configList.push({
              ...dateConfigMap[lowerCaseKey],
              ...dataConfig[key],
              type: capitalize(lowerCaseKey)
            });
          }
        }
      }
    }

    return configList;
  };

  const {
    min,
    max,
    dateConfig,
    confirmText,
    cancelText,
    headerFormat,
    customHeader,
    onCancel
  } = props;
  const themeClassName = "default";
  const dataConfigList = normalizeDateConfig(dateConfig);

  return (
    <div className={`datepicker ${themeClassName}`}>
      <div className="datepicker-header">
        <a className="datepicker-navbar-btn btn-dp-cancel" onClick={onCancel}>
          {cancelText}
        </a>
        {customHeader || convertDate(time, headerFormat)}
        <a
          className="datepicker-navbar-btn btn-dp-confirm"
          onClick={handleFinishBtnClick}
        >
          {confirmText}
        </a>
      </div>
      <div className="datepicker-caption">
        {dataConfigList.map((item, index) => (
          <div key={index} className="datepicker-caption-item">
            {item.caption}
          </div>
        ))}
      </div>
      <div className="datepicker-content">
        {dataConfigList.map((item, index) => (
          <DatePickerItem
            key={index}
            value={value}
            min={min}
            max={max}
            step={item.step}
            type={item.type}
            format={item.format}
            onSelect={handleDateSelect}
          />
        ))}
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  headerFormat: PropTypes.string,
  onCancel: PropTypes.func,
  customHeader: PropTypes.string,
  dateConfig: PropTypes.object,
  props: PropTypes.array
};

export default DatePicker;
