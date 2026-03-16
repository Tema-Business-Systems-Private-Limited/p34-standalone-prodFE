// ErrorModal.js
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ErrorModal = ({ isOpen, toggle, errors = {}, validation = "" }) => {
  // Format field labels nicely
  const formatLabel = (key) => {
    if (key === "registration") return "License Plate";
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  // Replace registration with License Plate in validation message
  const getFormattedValidation = () => {
    if (typeof validation === "string") {
      return validation.replace(/registration/gi, "License Plate");
    }
    return validation;
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="bg-light" toggle={toggle}>
        <span style={{ color: "red" }}>Warning</span>
      </ModalHeader>
      <ModalBody className="bg-light">
        {/* Show field-level validation errors */}
        {errors && typeof errors === "object" && Object.keys(errors).length > 0 && (
          <ul style={{ paddingLeft: "1.2rem" }}>
            {Object.keys(errors).map((key, index) => (
              <li key={index}>
                <b>{formatLabel(key)} field is mandatory</b>
              </li>
            ))}
          </ul>
        )}

        {/* Show validation message(s) if present */}
        {validation && typeof validation === "string" && (
          <div style={{ marginTop: "1rem" }}>
            {getFormattedValidation().split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}
      </ModalBody>
      <ModalFooter className="bg-light">
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ErrorModal;
