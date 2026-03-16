// ErrorModal.js
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ErrorModal = ({ isOpen, toggle, errors }) => {
    console.log(errors, "errors inside modal check");
  
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="bg-light" toggle={toggle}>
          <span style={{ color: "red" }}>Warning</span>
        </ModalHeader>
        <ModalBody className="bg-light">
          {errors && typeof errors === "object" ? (
            <ul>
              {Object.keys(errors).map((key, index) => (
                <li key={index}>
                  <b>{key} field is mandatory</b>
                </li>
              ))}
            </ul>
          ) : (
            <p>No errors to display</p>
          )}
        </ModalBody>
      </Modal>
    );
  };

  

export default ErrorModal;
