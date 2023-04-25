import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "./DatePickerStyle.scss";

const DatePickerCustom = ({ label, icon }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="custom-input">
      <Form.Label>{label}</Form.Label>
      <div className="custom-input__inputwrap d-flex align-items-center">
        <span className="input-group-text">{icon}</span>
        <DatePicker
          className="date-picker"
          selected={startDate}
          //   placeholderText="__ /__ / ____"
          onChange={(Date) => setStartDate(Date)}
        />
      </div>
    </div>
  );
};

export default DatePickerCustom;
