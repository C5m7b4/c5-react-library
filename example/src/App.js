import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  ColorHeadingOne,
  ColorHeadingTwo,
  ModalDatePicker,
  Slider,
  Switcher
} from "c5-react-library";

const App = () => {
  const [time, setTime] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDatePicker = () => {
    setIsOpen(!isOpen);
  };

  const handleDateSelect = time => {
    setTime(time);
    setIsOpen(false);
  };

  const handleCloseDatePicker = () => {
    setIsOpen(false);
  };

  const handleSwitcherCallback = e => {
    console.log(e);
  };

  const formatDate = date => {
    var testDate = new Date(date),
      month = testDate.getMonth() + 1,
      day = testDate.getDate(),
      year = testDate.getFullYear();

    return month + "/" + day + "/" + year;
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center text-center p-4">
        <div className="col-12">
          <h3>c5-react-library kitchen sink</h3>
        </div>

        <hr />
        <div className="mt-5">
          <h4>Basic Toggle Switch used to turn things on and off.</h4>
          <Slider />
        </div>

        <div className="my-2">
          <Switcher
            label1="Groups"
            label2="Stores"
            changeCallback={handleSwitcherCallback}
            instructions="Here you can put some instructions to help your users"
          />
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <button className="btn btn-outline-dark" onClick={handleOpenDatePicker}>
          Select Date
        </button>
        <ModalDatePicker
          value={time}
          isOpen={isOpen}
          onSelect={handleDateSelect}
          onCancel={handleCloseDatePicker}
        />
      </div>
      <div>
        <input
          style={{ marginTop: "20px" }}
          type="text"
          value={formatDate(time)}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default App;
