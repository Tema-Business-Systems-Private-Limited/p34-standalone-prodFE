// ErrorModal.js
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ErrorModalValidation = ({ isOpen, toggle, validation }) => {
  console.log(validation, "errors inside modal check");

  // Function to replace 'registration' with 'License Plate' in message text
  const getFormattedValidation = () => {
    if (typeof validation === "string") {
      return validation.replace(/registration/gi, "License Plate");
    }
    return validation;
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="bg-light" toggle={toggle}>
        <span style={{ color: "red" }}>Error</span>
      </ModalHeader>
      <ModalBody className="bg-light">
        {getFormattedValidation()}
      </ModalBody>
    </Modal>
  );
};

export default ErrorModalValidation;

