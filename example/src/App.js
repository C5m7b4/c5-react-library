import React, { useState } from "react";

import {
  ColorHeadingOne,
  ColorHeadingTwo,
  ModalDatePicker
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

  const formatDate = date => {
    var testDate = new Date(date),
      month = testDate.getMonth() + 1,
      day = testDate.getDate(),
      year = testDate.getFullYear();

    return month + "/" + day + "/" + year;
  };

  return (
    <div style={{ width: 800, margin: "15px auto" }}>
      <ColorHeadingOne text="Colored heading one is working" color={"red"} />

      {/* Our other component */}
      <ColorHeadingTwo text="Another Heading" color={"blue"} />

      {/* This is our Modal Component */}
      <div style={{ marginTop: "30px" }}>
        <button onClick={handleOpenDatePicker}>Select Date</button>
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
        />
      </div>
    </div>
  );
};

export default App;
