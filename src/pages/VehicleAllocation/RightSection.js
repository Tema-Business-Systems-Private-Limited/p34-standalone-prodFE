import React, { useState } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import { FormControl } from "react-bootstrap";
import ReactFlatpickr from "react-flatpickr";
import { useEffect } from "react";
import VehicleInspectionModal from "./components/VehicleInspectionModal";
import { toast } from 'react-toastify';

const RightSide = ({
  selectedOrder,
  setSelectedOrder,
  associations,
  handleUpdate,
  isCreate,
  handleDelete,
  errors,
  setErrors,
  commonData,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [driverOptions, setDriverOptions] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleScrollTo = (event, id) => {
    event.preventDefault();

    const targetElement = document.getElementById(id);
    const cardBody = document.getElementById("cardbody");

    console.log(targetElement, cardBody, "element and cardbody 114");
    if (targetElement && cardBody) {
      // Calculate the position to scroll to inside the container, with a 100px offset
      const targetPosition = targetElement.offsetTop - 90;

      // Scroll the cardbody container to that position
      cardBody.scrollTo({
        top: targetPosition,
        behavior: "smooth", // Smooth scroll effect
      });

      setActiveTab(id);
    }
  };

  const vehicleOptions = commonData?.vehicleData?.map((item) => ({
    value: item.vehicle,
    label: item.vehicle,
  }));


  const onChangeStartTime = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      startTime: e.target.value,
    });
  };

  const onChangeEndDate = (date) => {
    setSelectedOrder({
      ...selectedOrder,
      endDate: date[0].toISOString(),
    });
  };

  const onChangeEndTime = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      endTime: e.target.value,
    });
  };

  const formatTime = (value) => {
    if (value.length === 4) {
      const hours = value.slice(0, 2);
      const minutes = value.slice(2, 4);
      return `${hours}:${minutes}`;
    }
    return value;
  };

  const confirmDelete = () => {
    handleDelete();
    toggleDeleteModal();
  };

  const onChangeVehicle = (selectedOption) => {
    console.log("line 86:", selectedOption.value);

    const selectedVehicle = commonData?.vehicleData?.find((item) => item.vehicle === selectedOption.value);
    if (selectedVehicle) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}${minutes}`;

      setSelectedOrder({
        ...selectedOrder,
        vehicleClass: selectedVehicle.vehicleClass,
        vehicleNumber: selectedOption ? selectedOption.value : "",
        status: 1,
        startDate: new Date().toISOString(),
        startTime: currentTime,  // ✅ Set start time when vehicle selected
      });

      const filteredDrivers = commonData?.driverData?.filter(
        (driver) => driver.site === selectedVehicle.site
      );

      const driverSelectOptions = filteredDrivers.map((driver) => ({
        value: driver.driverId,
        label: driver.driverName,
      }));
      setDriverOptions(driverSelectOptions);
    }
  };

  // const onChangeVehicle = (selectedOption) => {
  //   console.log("line 86:", selectedOption.value);

  //   const selectedVehicle = commonData?.vehicleData?.find((item) => item.vehicle === selectedOption.value);
  //   if (selectedVehicle) {
  //     setSelectedOrder({
  //       ...selectedOrder,
  //       vehicleClass: selectedVehicle.vehicleClass,
  //       vehicleNumber: selectedOption ? selectedOption.value : "",
  //       status: 1,
  //       startDate: new Date().toISOString()
  //     });

  //     const filteredDrivers = commonData?.driverData?.filter(
  //       (driver) => driver.site === selectedVehicle.site
  //     );

  //     const driverSelectOptions = filteredDrivers.map((driver) => ({
  //       value: driver.driverId,
  //       label: driver.driverName,
  //     }));
  //     setDriverOptions(driverSelectOptions);
  //   }
  // };


  const onChangeDriver = (selectedOption) => {

    const selectedDriver = commonData?.driverData?.find((item) => item.driverId === selectedOption.value);
    if (selectedDriver) {
      setSelectedOrder({
        ...selectedOrder,
        driverId: selectedOption ? selectedOption.value : "",
        driverName: selectedDriver.driverName,
        mobile: selectedDriver.mobile,
        licenseType: selectedDriver.licenseType,
        licenseNumber: selectedDriver.licenseNum
      });
    }
  };

  useEffect(() => {
    if (selectedOrder?.vehicleNumber) {
      const selectedVehicle = commonData?.vehicleData?.find(
        (item) => item.vehicle === selectedOrder.vehicleNumber
      );

      // Set the vehicleClass
      if (selectedVehicle) {
        const filteredDrivers = commonData?.driverData?.filter(
          (driver) => driver.site === selectedVehicle.site
        );

        const driverSelectOptions = filteredDrivers.map((driver) => ({
          value: driver.driverId,
          label: driver.driverName,
        }));
        setDriverOptions(driverSelectOptions);
      }
    }
  }, [selectedOrder?.vehicleNumber]);

  console.log("155 ", selectedOrder);


  return (

    <Card className="h-100 m-0" style={{ color: "black", fontSize: "16px" }}>
      <CardBody
        className="overflow-auto relative py-0 px-2 m-0"
        style={{
          height: "calc(80vh - 156px)",
          scrollBehavior: "smooth",
          overflowY: "auto",
        }}
        id="cardbody"
      >
        {selectedOrder ? (
          <Form>
            {isCreate && (
              <div className="d-flex justify-content-end mb-2 gap-2">
                <Button
                  color="danger"
                  className="px-3 py-1 text-sm rounded shadow-md disabled:opacity-50"
                  disabled={
                    isCreate ||
                    selectedOrder.status === 1 || // OPEN
                    selectedOrder.status === 5    // RETURNED
                  }
                  onClick={() => {
                    if (
                      !selectedOrder.endDate ||
                      selectedOrder.endDate === "1753-01-01T00:00:00.000+00:00" ||
                      !selectedOrder.endTime ||
                      selectedOrder.endTime.trim() === ""
                    ) {
                      toast.error("Please enter both End Date and End Time before deallocation.");
                      return;
                    }

                    const updatedOrder = {
                      ...selectedOrder,
                      status: 3, // DEALLOCATED
                    };
                    setSelectedOrder(updatedOrder);
                  }}
                >
                  Deallocation
                </Button>
                {/* Vehicle Allocation Insepection */}
                <Button
                  color="primary"
                  className="px-3 py-1 text-sm rounded shadow-md"
                  onClick={() => setShowModal(true)}
                  disabled={selectedOrder?.status !== 1}
                >
                  Vehicle Allocation Insepection
                </Button>
                <VehicleInspectionModal
                  isOpen={showModal}
                  toggle={() => setShowModal(false)}
                  title="Vehicle Allocation Inspection"
                  orderData={selectedOrder}
                  onSubmit={() => setShowModal(false)}
                />
                {/* Vehicle Return Inspection */}
                <Button
                  color="secondary"
                  className="px-3 py-1 text-sm rounded shadow-md"
                  onClick={() => setShowReturnModal(true)}
                  disabled={selectedOrder?.status !== 1}
                >
                  Vehicle Return Inspection
                </Button>
                <VehicleInspectionModal
                  isOpen={showReturnModal}
                  toggle={() => setShowReturnModal(false)}
                  title="Vehicle Return Inspection"
                  orderData={selectedOrder}
                  onSubmit={() => setShowReturnModal(false)}
                />
              </div>
            )}
            {/* Responsive Form Layout */}
            <div
              style={{
                height: "100%",
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "white",
              }}
            >
              {/* <h5
              className="pl-2 d-flex align-items-center text-light bg-secondary"
              style={{height:"50px"}}
              // style={{ textAlign: "left", backgroundColor: "#4CAF50" }}
            >
              {isCreate
                ? "Create New Allocation"
                : `Update Allocation`}
            </h5> */}
              <div
                style={{ display: "flex", gap: 50, fontSize: "1.2rem" }}
                className="pl-2"
              >
                <a
                  href="#Home"
                  style={{
                    color: activeTab === "home" ? "green" : "black",
                    borderBottom:
                      activeTab === "home" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  onClick={(e) => handleScrollTo(e, "home")}
                >
                  Home
                </a>
                <a
                  style={{
                    color: activeTab === "driverInfo" ? "green" : "black",
                    borderBottom:
                      activeTab === "driverInfo" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  href="#driverInfo"
                  onClick={(e) => handleScrollTo(e, "driverInfo")}
                >
                  Driver Information
                </a>
                <a
                  style={{
                    color: activeTab === "odometerInfo" ? "green" : "black",
                    borderBottom:
                      activeTab === "odometerInfo" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  href="#odometerInfo"
                  onClick={(e) => handleScrollTo(e, "odometerInfo")}
                >
                  Odometer Information
                </a>
              </div>
            </div>

            <h4 id="home" className="test-bold mt-3">Home</h4>
            <div className="custom-divider"></div>
            <div className="mt-2 responsive-form">
              <FormGroup className="form-item text-input">
                <Label for="classCode">
                  Transaction No.
                  {/* <span style={{ color: "red", marginLeft: "2px" }}>*</span> */}
                </Label>
                <FormControl
                  type="text"
                  name="classCode"
                  id="classCode"
                  value={selectedOrder.transactionNumber}
                  readOnly={true}
                  required
                  isInvalid={!!errors?.vehicleNumber}
                />
                <FormControl.Feedback type="invalid">
                  {errors?.vehicleNumber}
                </FormControl.Feedback>
              </FormGroup>

              {/* Text Input */}
              {/* <FormGroup className="form-item text-input">
                  <Label for="description">Vehicle No.</Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    value={selectedOrder.vehicleNumber}
                  />
                </FormGroup> */}
              <FormGroup className="form-item dropdown-input">
                <Label for="vehicle">
                  Vehicle No.
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
                <Select
                  id="vehicle"
                  name="vehicle"
                  options={vehicleOptions}
                  value={
                    selectedOrder.vehicleNumber
                      ? vehicleOptions?.find(
                        (option) =>
                          option.value === selectedOrder.vehicleNumber
                      )
                      : null
                  }
                  onChange={onChangeVehicle} // Handle selection change
                  placeholder="Select a Vehicle"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value}
                    </div>
                  )}
                  isDisabled={!isCreate}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="vehclass">Vehicle Class</Label>
                <Input
                  type="text"
                  name="vehclass"
                  id="vehclass"
                  value={selectedOrder.vehicleClass}
                  readOnly={true}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="stat">Status</Label>
                <Input
                  type="text"
                  name="stat"
                  id="stat"
                  value={selectedOrder.status !== 0 ? commonData?.statusList?.find((item) => item.value == selectedOrder.status)?.label : ""}
                  readOnly={true}
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Start Date{" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
                <ReactFlatpickr
                  value={selectedOrder.startDate ? new Date(selectedOrder.startDate) : null}
                  id="startDate"
                  options={{
                    dateFormat: "m/d/Y",
                  }}
                  className="form-control"
                  disabled={true}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="startTime">
                  Allocation Start Time(hh:mm){" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
                <Input
                  type="text"
                  name="startTime"
                  id="startTime"
                  value={formatTime(selectedOrder.startTime)}
                  onChange={onChangeStartTime}
                  maxLength={4}
                  readOnly={!isCreate}
                />
              </FormGroup>

              <FormGroup>
                <Label>End Date</Label>
                <ReactFlatpickr
                  value={
                    selectedOrder.endDate &&
                      selectedOrder.endDate !== "1753-01-01T00:00:00.000+00:00"
                      ? new Date(selectedOrder.endDate)
                      : null
                  }
                  id="endDate"
                  options={{
                    dateFormat: "m/d/Y",
                  }}
                  className="form-control"
                  disabled={selectedOrder.status === 2 ? false : true}
                  onChange={onChangeEndDate}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="endTime">Allocation End Time(hh:mm)</Label>
                <Input
                  type="text"
                  name="endTime"
                  id="endTime"
                  value={formatTime(selectedOrder.endTime)}
                  onChange={onChangeEndTime}
                  readOnly={selectedOrder.status === 2 ? false : true}
                  maxLength={4}
                />
              </FormGroup>
            </div>
            <h4 id="driverInfo" className="test-bold mt-4">Driver Information</h4>
            <div className="custom-divider"></div>
            <div className="responsive-form">

              <FormGroup className="form-item dropdown-input">
                <Label for="driverId">
                  Driver ID.{" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
                <Select
                  id="driverId"
                  name="driverId"
                  options={driverOptions}
                  value={
                    selectedOrder.driverId
                      ? driverOptions?.find(
                        (option) =>
                          option.value === selectedOrder.driverId
                      )
                      : null
                  }
                  onChange={onChangeDriver} // Handle selection change
                  placeholder="Select a Driver"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value}
                    </div>
                  )}
                  isDisabled={!isCreate}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="driver">Driver Name</Label>
                <Input
                  type="text"
                  name="driver"
                  id="driver"
                  value={selectedOrder.driverName}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="mobile">Mobile phone</Label>
                <Input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={selectedOrder.mobile}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="lictype">License Type</Label>
                <Input
                  type="text"
                  name="lictype"
                  id="lictype"
                  value={selectedOrder.licenseType !== 0 ? commonData?.licenseTypeList?.find((item) => item.value == selectedOrder.licenseType)?.label : ""}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="licno">License Number</Label>
                <Input
                  type="text"
                  name="licno"
                  id="licno"
                  value={selectedOrder.licenseNumber}
                />
              </FormGroup>
            </div>
            <style>
              {`
          .no-spinner::-webkit-inner-spin-button,
          .no-spinner::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          .no-spinner {
            -moz-appearance: textfield;
          }
        `}
            </style>

            <h4 id="odometerInfo" className="test-bold mt-4">
              Vehicle Odometer Information
            </h4>
            <div className="custom-divider"></div>

            <div className="responsive-form">
              <FormGroup className="text-input">
                <Label for="odoStart">Odometer Start Reading</Label>
                <Input
                  type="number"
                  name="odoStart"
                  id="odoStart"
                  value={selectedOrder.odoStart}
                  onChange={(e) =>
                    setSelectedOrder({ ...selectedOrder, odoStart: e.target.value })
                  }
                  className="no-spinner"
                />
              </FormGroup>

              <FormGroup className="text-input">
                <Label for="odoEnd">Odometer End Reading</Label>
                <Input
                  type="number"
                  name="odoEnd"
                  id="odoEnd"
                  value={selectedOrder.odoEnd}
                  onChange={(e) =>
                    setSelectedOrder({ ...selectedOrder, odoEnd: e.target.value })
                  }
                  className="no-spinner"
                />
              </FormGroup>
            </div>


          </Form>
        ) : (
          <p></p>
        )}
      </CardBody>
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the association:{" "}
          {selectedOrder?.transactionNumber}?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>
            No
          </Button>
          <Button color="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </ModalFooter>
      </Modal>
    </Card>

  );
};

export default RightSide;
