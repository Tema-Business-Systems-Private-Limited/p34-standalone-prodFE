import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const TextInput = ({ label, id, value, onChange, readOnly = false }) => (
  <FormGroup className="form-item text-input">
    <Label for={id}>{label}</Label>
    <Input
      type="text"
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value, id)}
      readOnly={readOnly}
    />
  </FormGroup>
);

export default TextInput;
