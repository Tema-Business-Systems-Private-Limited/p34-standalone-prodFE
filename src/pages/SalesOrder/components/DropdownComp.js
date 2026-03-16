import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const DropdownInput = ({ label, id, value, options = [], onChange }) => (
  <FormGroup className="form-item dropdown-input">
    <Label for={id}>{label}</Label>
    <Input
      type="select"
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value, id)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Input>
  </FormGroup>
);

export default DropdownInput;
