import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";

const VehicleInspectionModal = ({
  isOpen,
  toggle,
  title,
  orderData = {},
  onSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <FormGroup>
            <Label>Transaction No.</Label>
            <Input value={orderData.transactionNumber || ""} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Vehicle</Label>
            <Input value={orderData.vehicleNumber || ""} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Odometer Start</Label>
            <Input type="number" value={orderData.odoStart || 0} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Time</Label>
            <Input
              value={
                orderData.startTime
                  ? new Date(orderData.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })
                  : ""
              }
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label>User</Label>
            <Input value={orderData.driverName || ""} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Input
              value={
                orderData.startDate
                  ? new Date(orderData.startDate).toLocaleDateString('en-GB') // dd-MM-yyyy
                  : ""
              }
              readOnly
            />
          </FormGroup>
        </div>

        <div className="mb-4">
          <Label>Image</Label>
          <div className="border p-2 rounded text-center">
            <img
              src={
                // orderData.image || ""
                "https://media.istockphoto.com/id/1465157700/photo/brightly-red-colored-semi-truck-speeding-on-a-two-lane-highway-with-cars-in-background-under.jpg?s=612x612&w=0&k=20&c=cfbbPy2ylvFGRULNLGO_Ucm-C5DsOJMFHiZBdKGsq3c="
              }
              alt="uploaded"
              className="w-48 mx-auto mb-2"
            />
            {/* <p className="text-muted text-sm">
              Drop file from explorer or select it
            </p> */}
          </div>
        </div>

        <div>
          <Label className="font-semibold">Details</Label>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Question title</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{orderData.xdelInspec || ""}</td>
                <td>Delivery Inspection</td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>{orderData.xretInspec || ""}</td>
                <td>Return Inspection</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={onSubmit}>
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VehicleInspectionModal;
