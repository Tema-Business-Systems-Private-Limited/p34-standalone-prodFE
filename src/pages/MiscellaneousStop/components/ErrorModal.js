// ErrorModal.js
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ErrorModal = ({ isOpen, toggle, error }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="bg-light" toggle={toggle}><span style={{color:"red"}}>Error</span></ModalHeader>
      <ModalBody className="bg-light">
        <p><b>{error}</b> is mandatory!</p>
      </ModalBody>
    </Modal>
  );
};

export default ErrorModal;
