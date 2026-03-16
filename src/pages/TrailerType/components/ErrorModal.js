import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ErrorModal = ({ isOpen, toggle, error }) => {
  console.log("6error", error);

  // Ensure error is always an array
  const errorList = Array.isArray(error) ? error : error ? [error] : [];

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="bg-light" toggle={toggle}>
        <span style={{ color: "red" }}>Warning !</span>
      </ModalHeader>
      <ModalBody className="bg-light">
        <ul style={{ paddingLeft: "20px" }}>
          {errorList.map((err, i) => (
            <li key={i}>
              <b>{err}</b> is mandatory!
            </li>
          ))}
        </ul>
      </ModalBody>
    </Modal>
  );
};

export default ErrorModal;
