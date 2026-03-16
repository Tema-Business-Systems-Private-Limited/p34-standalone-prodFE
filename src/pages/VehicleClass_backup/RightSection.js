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

const RightSide = ({
  selectedOrder,
  setSelectedOrder,
  associations,
  handleUpdate,
  isCreate,
  handleDelete,
  error,
  setError,
  commonData,
}) => {
  const typeOptionsMap = { 1: "Single Unit", 2: "Multi Unit" };
  const typeOptions = [1, 2];
  const mndtOptions = [0, 1];
  const mndtOptionsMap = { 0: "No", 1: "Yes" };

  const optionsInspCheckInOut = [
    { value: "2", label: "Yes" },
    { value: "1", label: "No" },
  ];
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteClick = () => {
    toggleDeleteModal();
  };

  const handleCheckboxChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      enaFlag: selectedOrder.enaFlag === 2 ? 1 : 2,
    });
  };

  const onChangeNoOfAxle = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      axlnbr: parseInt(e.target.value),
    });
  };

  const onChangeMaxWeight = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xmaxcapw: Number(e.target.value),
    });
  };

  const onChangeMaxVolume = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xmaxcapv: Number(e.target.value),
    });
  };

  const onChangeSkillNumber = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xskillno: Number(e.target.value),
    });
  };

  const onChangeDesc = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      desc: e.target.value,
    });
  };

  const onChangeClassCode = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      className: e.target.value,
    });
    if (e.target.value.trim()) {
      setError("");
    } else {
      setError("This field is mandatory");
    }
  };

  const confirmDelete = () => {
    handleDelete();
    toggleDeleteModal();
  };

  const handleClick = () => {
    if (!selectedOrder.className.trim()) {
      setError("This field is mandatory");
    } else {
      setError("");
      handleUpdate();
    }
  };

  const onChangeCountry = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      cry: selectedOption.value,
    });
  };

  const onChangeInspection = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      xinspin: selectedOption.value,
    });
  };

  const onChangeInspectionOut = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      xmanout: Number(selectedOption.value),
    });
  };



  const handleChangeCheckinMandatory=(selectedOption)=>{
    setSelectedOrder({
      ...selectedOrder,
      xmanin: Number(selectedOption.value),
    });
  }

  const handleChangeCheckOutMandatory=(selectedOption)=>{
    setSelectedOrder({
      ...selectedOrder,
      xinspout: selectedOption.value,
    });
  }


  const handleChangeTypeList = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      typ: Number(selectedOption.value),
    });
  };

  return (
    <div>
      <Card className="h-100 m-0" style={{ color: "black", fontSize: "16px" }}>
        <CardBody
          className="overflow-auto"
          style={{ height: "calc(100vh - 156px)" }}
        >
          {selectedOrder ? (
            <Form>
              {/* Responsive Form Layout */}
              <h5
                className="p-2 text-light bg-secondary"
                // style={{ textAlign: "left", backgroundColor: "#4CAF50" }}
                
              >
                {isCreate
                  ? "Create New Vehicle Class"
                  : `Update Vehicle: ${selectedOrder?.className}`}
              </h5>
              <div className="mt-5 responsive-form">
                {/* Text Input */}
                <FormGroup className="form-item text-input">
                  <Label for="classCode">Class Code*</Label>
                  <FormControl
                    type="text"
                    name="classCode"
                    id="classCode"
                    value={selectedOrder.className}
                    readOnly={!isCreate}
                    onChange={onChangeClassCode}
                    required
                    isInvalid={!!error}
                  />
                  <FormControl.Feedback type="invalid">
                    {error}
                  </FormControl.Feedback>
                </FormGroup>

                {/* Text Input */}
                <FormGroup className="form-item text-input">
                  <Label for="description">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    value={selectedOrder.desc}
                    onChange={onChangeDesc}
                  />
                </FormGroup>

                {/* Checkbox */}
                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.enaFlag === 2 ? true : false}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Active
                  </Label>
                </FormGroup>

                <FormGroup className="form-item dropdown-input">
                  <Label for="country">Country</Label>
                  {/* <Input
                    type="select"
                    name="country"
                    id="country"
                    onChange={onChangeCountry}
                    value={selectedOrder.cry || ""}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {commonData?.countryList.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.value + " (" + option.label + ")"}
                      </option>
                    ))}
                  </Input> */}
                  <Select
                    options={commonData?.countryList}
                    value={
                      commonData?.countryList.find(
                        (option) => option.value === selectedOrder.cry
                      ) || null
                    }
                    onChange={onChangeCountry}
                    placeholder="Select"
                    isClearable
                  />
                </FormGroup>

                <FormGroup className="form-item dropdown-input">
                  <Label for="type">Type</Label>
                  {/* <Input
                    type="select"
                    name="type"
                    id="type"
                    value={selectedOrder.typ}
                  >
                    {typeOptions.map((option) => (
                      <option key={option} value={option}>
                        {typeOptionsMap[option]}
                      </option>
                    ))}
                  </Input> */}

                  <Select
                    options={commonData?.typeList}
                    value={
                      commonData?.typeList.find(
                        (option) => option.value == selectedOrder.typ
                      ) || null
                    }
                    onChange={handleChangeTypeList}
                    placeholder="Select"
                    isClearable
                  />
                </FormGroup>

                <FormGroup className="form-item dropdown-input">
                  <Label for="noOfAxle">Number of axle</Label>
                  <Input
                    type="number"
                    name="noOfAxle"
                    id="noOfAxle"
                    value={selectedOrder.axlnbr}
                    onChange={onChangeNoOfAxle}
                  ></Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="maxWeight">Maximum Weight</Label>
                  <Input
                    type="number"
                    name="maxWeight"
                    id="maxWeight"
                    value={selectedOrder.xmaxcapw}
                    onChange={onChangeMaxWeight}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="maxWeightUnit">Weight UOM</Label>
                  <Input
                    type="text"
                    name="maxWeightUnit"
                    id="maxWeightUnit"
                    value={selectedOrder.xmaxunit}
                    disabled
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="maxVolume">Maximum Volume</Label>
                  <Input
                    type="number"
                    name="maxVolume"
                    id="maxVolume"
                    value={selectedOrder.xmaxcapv}
                    onChange={onChangeMaxVolume}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="maxVolumeUnit">Volume UOM</Label>
                  <Input
                    type="text"
                    name="maxVolumeUnit"
                    id="maxVolumeUnit"
                    value={selectedOrder.xmaxvunit}
                    disabled
                  />
                </FormGroup>

                <FormGroup className="form-item dropdown-input">
                  <Label for="skillNumber">Skill No.</Label>
                  <Input
                    type="number"
                    name="skillNumber"
                    id="skillNumber"
                    value={selectedOrder.xskillno}
                    onChange={onChangeSkillNumber}
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Label for="picture">Picture</Label>
                  <img src="" alt="vehicle class image" />
                </FormGroup>

                <FormGroup style={{ width: "250px" }}>
                  <Label for="inspCheckIn">Inspection Checkin</Label>
                  {/* <Input
                    type="select"
                    name="inspCheckIn"
                    id="inspCheckIn"
                    value={selectedOrder.xinspin}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {commonData?.inspectionList.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Input> */}

                  <Select
                    options={commonData?.inspectionList.map((option) => ({
                      value: option.value,
                      label: `${option.value} (${option.label})`,
                    }))}
                    value={
                      commonData?.inspectionList
                        .map((option) => ({
                          value: option.value,
                          label: `${option.value} (${option.label})`,
                        }))
                        .find(
                          (option) => option.value === selectedOrder.xinspin
                        ) || null
                    }
                    onChange={onChangeInspection}
                    placeholder="Select"
                    isClearable
                  />
                </FormGroup>

                <FormGroup style={{ width: "150px" }}>
                  <Label for="inspCheckInMndt">Mandatory</Label>
                  <Select
                    options={optionsInspCheckInOut}
                    value={
                      optionsInspCheckInOut.find(
                        (option) => option.value == selectedOrder.xmanin
                      ) || null
                    }
                    onChange={handleChangeCheckinMandatory}
                    placeholder="Select"
                    isClearable
                  />
                </FormGroup>

                <FormGroup style={{ width: "250px" }}>
                  <Label for="inspCheckOut">Inspection Checkout</Label>

                  <Select
                    options={commonData?.inspectionList.map((option) => ({
                      value: option.value,
                      label: `${option.value} (${option.label})`,
                    }))}
                    value={
                      commonData?.inspectionList
                        .map((option) => ({
                          value: option.value,
                          label: `${option.value} (${option.label})`,
                        }))
                        .find(
                          (option) => option.value === selectedOrder.xinspout
                        ) || null
                    }
                    onChange={handleChangeCheckOutMandatory}
                    placeholder="Select"
                    isClearable
                  />
                </FormGroup>

                <FormGroup style={{ width: "150px" }}>
                  <Label for="inspCheckOutMndt">Mandatory</Label>
                  {/* <Input
                    type="select"
                    name="inspCheckOutMndt"
                    id="inspCheckOutMndt"
                    value={selectedOrder.xmanout}
                  >
                    {mndtOptions.map((option) => (
                      <option key={option} value={option}>
                        {mndtOptionsMap[option]}
                      </option>
                    ))}
                  </Input> */}

                  
<Select
                    options={optionsInspCheckInOut}
                    value={
                      optionsInspCheckInOut.find(
                        (option) => option.value == selectedOrder.xmanout
                      ) || null
                    }
                    onChange={onChangeInspectionOut}
                    placeholder="Select"
                    isClearable
                  />
                </FormGroup>
              </div>
              <div className="mt-5">
                <h3 className="text-bold">Associations</h3>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center" style={{ color: "black" }}>
                      <th style={{ background: "#CCD6DB" }}></th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Link Type
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Trailer/Equipment Co
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Weight
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        UOM
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Description
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Volume
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        UOM
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Description
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        No. of Axle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.associationList?.map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <Button size="sm">{index + 1}</Button>
                        </td>
                        <td>{row.linkType}</td>
                        <td>{row.trailerOrEqp}</td>
                        <td>{row.weight}</td>
                        <td>{row.weightUOM}</td>
                        <td>{row.weightDescription}</td>
                        <td>{row.volume}</td>
                        <td>{row.volumeUOM}</td>
                        <td>{row.volumeDescription}</td>
                        <td>{row.noOfAxle}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="mt-3 d-flex justify-content-end">
                {!isCreate && (
                  <Button
                    color="danger"
                    className="mr-2"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </Button>
                )}
                <Button color="primary" onClick={handleClick}>
                  {isCreate ? "Create" : "Update"}
                </Button>
              </div>
            </Form>
          ) : (
            <p>Select a Vehicle Class to view details</p>
          )}
        </CardBody>
      </Card>
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the vehicle class:{" "}
          {selectedOrder?.className}?
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
    </div>
  );
};

export default RightSide;
