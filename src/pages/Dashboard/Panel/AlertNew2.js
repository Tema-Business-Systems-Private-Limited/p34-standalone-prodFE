import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { HiInformationCircle, HiExclamation, HiCheck, HiX } from 'react-icons/hi';
import 'bootstrap/dist/css/bootstrap.min.css';

const AlertNew = ({ show, type, message, onClose, onConfirm }) => {
  const styles = {
    info: { bg: "bg-primary", icon: <HiInformationCircle className="h-5 w-5 text-white" /> },
    warning: { bg: "bg-warning", icon: <HiExclamation className="h-5 w-5 text-white" /> },
    error: { bg: "bg-danger", icon: <HiExclamation className="h-5 w-5 text-white" /> },
    success: { bg: "#AFE1AF", icon: <HiCheck className="h-5 w-5 text-white" /> },
  };

  const { bg, icon } = styles[type] || styles.info;

  const titles = {
    info: "Information",
    warning: "Warning",
    error: "Error",
    success: "Success",
  };

  return (
    <Modal
      show={show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ backgroundColor: bg, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Modal.Title id="contained-modal-title-vcenter" style={{ flex: 1 }}>
            <div style={{ color: 'black', textAlign: 'left' , fontSize : "28px" }}>{message}</div>
        </Modal.Title>
         </Modal.Header>
        <Modal.Footer>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
         {type === 'success' && (
                    <Button variant="success" onClick={onConfirm} className="d-flex align-items-center me-2 m-3 mr-5">
                      <HiCheck className="mr-2" />
                      Confirm
                    </Button>
                  )}


          <Button variant="secondary" onClick={onClose} className="d-flex align-items-center me-2 m-3">
            <HiX className="mr-2" />
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertNew;

