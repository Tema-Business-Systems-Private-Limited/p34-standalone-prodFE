import React, { useRef, useState } from "react";
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
  handleUpdate,
  isCreate,
  handleDelete,
  error,
  setError,
  commonData,
}) => {
  const optionsInspCheckInOut = [
    { value: "2", label: "Yes" },
    { value: "1", label: "No" },
  ];
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [activeTab, setActiveTab] = useState("home");
  const fileInputRef = useRef(null);

  const [isCheckboxTouched, setIsCheckboxTouched] = useState(false);

  const handleScrollTo = (event, id) => {
    event.preventDefault();
    const targetElement = document.getElementById(id);
    const cardBody = document.getElementById("cardbody");
    if (targetElement && cardBody) {
      const targetPosition = targetElement.offsetTop - 90;
      cardBody.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      setActiveTab(id);
    }
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
    const value = e.target.value;
    setSelectedOrder({
      ...selectedOrder,
      xmaxcapw: value === "" ? "" : Number(value),
    });
  };


const onChangeMaxVolume = (e) => {
  setSelectedOrder({
    ...selectedOrder,
    xmaxcapv:
      e.target.value === ""
        ? ""
        : Number(e.target.value),
  });
};


  const onChangeSkillNumber = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSelectedOrder({
        ...selectedOrder,
        xskillno: value,
      });
    }
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

  const onChangeCountry = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      cry: selectedOption ? selectedOption.value : "",
    });
  };

  const onChangeInspection = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      xinspin: selectedOption ? selectedOption.value : "",
    });
  };


  const onChangeInspectionOut = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      xmanout: selectedOption ? Number(selectedOption.value) : "",  // Clear on null
    });
  };


  const handleChangeCheckinMandatory = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      xmanin: selectedOption ? Number(selectedOption.value) : "",
    });
  };

  const handleChangeCheckOutMandatory = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      xinspout: selectedOption ? selectedOption.value : "",
    });
  };

  const handleChangeTypeList = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      typ: Number(selectedOption.value),
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const base64Image = result.split(',')[1];
        setSelectedOrder((prevState) => ({
          ...prevState,
          image: base64Image,
        }));
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      };
      reader.onerror = (error) => {
        console.error("Error reading file: ", error);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      image: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

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
            <div className="sticky top-0 z-10 bg-white shadow-sm">
              <div className="flex space-x-6 border-b px-4 pt-2 text-base font-medium">
                {[
                  { id: "home", label: "Home" },
                  { id: "associations", label: "Associations" },
                ].map((tab) => (
                  <a
                    key={tab.id}
                    href={`#${tab.id}`}
                    onClick={(e) => handleScrollTo(e, tab.id)}
                    className={`pb-2 border-b-4 transition-colors duration-300 ${activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-700 hover:text-black"
                      }`}
                  >
                    {tab.label}
                  </a>
                ))}
              </div>
            </div>

            <div id="home" className="mt-3 responsive-form">
              <FormGroup className="form-item text-input">
                <Label for="classCode">
                  Class Code
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
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
                  {typeof error === 'string' ? error : ""}
                </FormControl.Feedback>
              </FormGroup>
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
              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.enaFlag === 2}
                    onChange={handleCheckboxChange}
                  />
                  {" "}
                  Active
                </Label>
              </FormGroup>


              <FormGroup className="form-item dropdown-input">
                <Label for="country">Country</Label>
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

                {/* Inline <style> block */}
                <style>
                  {`
      #noOfAxle::-webkit-inner-spin-button, 
      #noOfAxle::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #noOfAxle {
        -moz-appearance: textfield;
      }
    `}
                </style>

                <Input
                  type="number"
                  name="noOfAxle"
                  id="noOfAxle"
                  value={selectedOrder.axlnbr}
                  onChange={onChangeNoOfAxle}
                />
              </FormGroup>



              <FormGroup className="form-item text-input">
                <Label for="maxWeight">Maximum Weight</Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="maxWeight"
                  id="maxWeight"
                  value={selectedOrder.xmaxcapw}
                  onChange={onChangeMaxWeight}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
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
                <style>
                  {`
      #maxVolume::-webkit-inner-spin-button, 
      #maxVolume::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #maxVolume {
        -moz-appearance: textfield;
      }
    `}
                </style>
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
                <style>
                  {`
      #skillNumber::-webkit-inner-spin-button, 
      #skillNumber::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #skillNumber {
        -moz-appearance: textfield;
      }
    `}
                </style>
                <Label for="skillNumber">Skill No.</Label>
                <Input
                  type="number"
                  name="skillNumber"
                  id="skillNumber"
                  value={selectedOrder.xskillno}
                  onChange={onChangeSkillNumber}
                  onKeyDown={(e) => {
                    const blockedKeys = ["-", "+", "e", "E"];
                    if (blockedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <Label for="picture">Picture</Label>
                  </div>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="picture"
                      name="picture"
                      style={{ display: "none" }}
                      innerRef={fileInputRef}
                    />
                    <div>
                      <img
                        style={{ height: "150px", width: "350px" }}
                        className="img-fluid card-img-top ml-2"
                        src={`data:image/jpeg;base64,${selectedOrder.image && selectedOrder.image
                          }`}
                        alt={selectedOrder.code}
                      />
                    </div>
                    <div className="mt-2">
                      <Label
                        for="picture"
                        className="mr-2"
                        style={{
                          display: "inline-block",
                          padding: "3px 8px",
                          backgroundColor: "#007bff",
                          color: "white",
                          cursor: "pointer",
                          border: "none",
                          borderRadius: "2px",
                          fontSize: "14px",
                        }}
                      >
                        Select file
                      </Label>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={handleRemoveImage}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </FormGroup>

              <FormGroup style={{ width: "250px" }}>
                <Label for="inspCheckIn">Inspection Checkin</Label>
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
            <div id="associations" className="mt-5">
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
                      <td>{row.weightUOMDesc}</td>
                      <td>{row.volume}</td>
                      <td>{row.volumeUOM}</td>
                      <td>{row.volumeUOMDesc}</td>
                      <td>{row.noOfAxle}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Form>
        ) : (
          <p></p>
        )}
      </CardBody>
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
    </Card>
  );
};

export default RightSide;
