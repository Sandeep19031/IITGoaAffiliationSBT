import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./CustomInputStyle.scss";

const CustomInput = ({ icon, label, placeholder, type, className, value }) => {
  return (
    <div className={`custom-input ${className}`}>
      <Form.Label>{label}</Form.Label>
      <InputGroup className="custom-input__inputwrap">
        <InputGroup.Text>{icon}</InputGroup.Text>
        <Form.Control placeholder={placeholder} type={type} value={value} />
      </InputGroup>
    </div>
  );
};

export default CustomInput;
