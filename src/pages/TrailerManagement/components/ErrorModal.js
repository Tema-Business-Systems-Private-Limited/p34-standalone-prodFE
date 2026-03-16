import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const fieldLabels = {
  trailer: "Trailer",
  site: "Site",
  type: "Type",
  style: "Style",
  maxLength: "Max Length",
  maxWidth: "Max Width",
  crubWeight: "Curb Weight",
  maxLoadingMass: "Max Loading Mass",
  maxFreightHeight: "Max Freight Height",
  gvwr: "GVWR",
  maxLoadVol: "Max Load Volume",
  xbathght:"Max Stack Height",
  xgndocc:"Ground Occupancy",
};

const ErrorModal = ({ isOpen, toggle, errors }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered
      scrollable
      className="error-modal"
      contentClassName="rounded-lg"
    >
      <ModalHeader
        className="bg-light text-danger"
        toggle={toggle}
        tag="div"
      >
        <span className="fw-bold">Warning!</span>
      </ModalHeader>

      <ModalBody className="bg-light text-dark" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {errors?.length > 0 ? (
          <ul className="ps-3">
            {errors.map((field, index) => (
              <li key={index} className="mb-2">
                <b>{fieldLabels[field] || field} field is mandatory</b> 
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
