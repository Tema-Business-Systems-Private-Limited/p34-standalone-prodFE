import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const CheckboxInput = ({ label, id, checked, onChange }) => (
  <FormGroup check className="form-item checkbox-input">
    <Label check>
      <Input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked, id)}
      />{" "}
      {label}
    </Label>
  </FormGroup>
);

export default CheckboxInput;
