import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { HiInformationCircle, HiExclamation, HiCheck, HiX } from 'react-icons/hi';
import 'bootstrap/dist/css/bootstrap.min.css';

const AlertNewOver = ({ show, type, message, onClose, onConfirm, msgtype }) => {
  const styles = {
    info: { bg: "#D9EDF7", icon: <HiInformationCircle className="h-5 w-5 text-white" /> },
    warning: { bg: "#FCF8E3", icon: <HiExclamation className="h-5 w-5 text-white" /> },
    error: { bg: "#F2DEDE", icon: <HiExclamation className="h-5 w-5 text-white" /> },
    success: { bg: "#AFE1AF", icon: <HiCheck className="h-5 w-5 text-white" /> },
  };

  const { bg, icon } = styles[type] || styles.info;

  const titles = {
    info: "Information",
    warning: "Warning",
    error: "Error",
    success: "Success",
  };

  const buttonStyle = {
    fontSize: '1.2rem',
    padding: '10px 20px',
    minWidth: '150px',
    margin: '0 10px',
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
          <div style={{ color: 'black', textAlign: 'left', fontSize: "28px" }}>"Temportary data"</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        {type === 'success' && (
          <Button
            variant="success"
            onClick={() => onConfirm(msgtype)}
            style={buttonStyle}
            className="d-flex align-items-center justify-content-center"
          >
            <HiCheck className="mr-2" />
            <span>Confirm</span>
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={onClose}
          style={buttonStyle}
          className="d-flex align-items-center justify-content-center"
        >
          <HiX className="mr-2" />
          <span>Close</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertNewOver;

