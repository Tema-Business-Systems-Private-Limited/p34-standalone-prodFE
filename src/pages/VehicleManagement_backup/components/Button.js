import React from "react";
import { Button } from "reactstrap";

const ButtonInput = ({ color, label, block = false, onClick }) => (
  <div className="form-item button-input">
    <Button color={color} block={block} onClick={onClick}>
      {label}
    </Button>
  </div>
);

export default ButtonInput;
