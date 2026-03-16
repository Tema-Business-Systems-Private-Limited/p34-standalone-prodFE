import React, { useState } from "react";
import Select from "react-select";
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
import { DatePicker } from "reactstrap-date-picker";
import { options } from "toastr";
import { format } from "date-fns";

const RightSide = ({
  selectedOrder,
  setSelectedOrder,
  associations,
  handleUpdate,
  isCreate,
  handleDelete,
  commonData,
}) => {
  /*
  1.Site Dropdown
  2.Type Dropdown
  3.Fixed Asset mapping in DB
  4.Style Dropdown
  5.Max Stack Height mapping in DB
  6.Ground occupancy mapping in DB
  7.Unavilable Dropdown
  8.Compartment- Capacity table data
  9.Technical Inspection table data
  */

  const [compartmentCapacities, setCompartmentCapacities] = useState([
    {
      compartment: "",
      capacity: "",
    },
  ]);

  const [inspections, setInspections] = useState([
    {
      inspectionType: "Regulatory",
      lastCheck: "",
      periodicity: "",
      nextVisit: "",
      type: "",
    },
    {
      inspectionType: "Internal",
      lastCheck: "",
      periodicity: "",
      nextVisit: "",
      type: "",
    },
  ]);

  const periodicityOptions = ["Daily", "Weekly", "Monthly", "Annually"];
  const typeOptions = ["Audit", "Check", "Inspection"];
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteClick = () => {
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    handleDelete();
    toggleDeleteModal();
  };

  const handleTailGateCheckboxChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      xtailgate: selectedOrder.xtailgate === 1 ? 2 : 1,
    });
  };

  const handleRentableCheckboxChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      xrentable: selectedOrder.xrentable === 2 ? 1 : 2,
    });
  };

  const handleSideOpCheckboxChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      xsideope: selectedOrder.xsideope === 2 ? 1 : 2,
    });
  };

  const handleStMgCheckboxChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      xstomgtcod: selectedOrder.xstomgtcod === 1 ? 2 : 1,
    });
  };

  const handleLtMgCheckboxChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      xlotmgtcod: selectedOrder.xlotmgtcod === 1 ? 2 : 1,
    });
  };

  const handleSrMgCheckboxChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      xseril: selectedOrder.xseril === 1 ? 2 : 1,
    });
  };

  const handleOtherDelete = (index, val) => {
    if (val === "capacities") {
      if (index === 0) return; // Prevent deletion of the first row
      const newRows = compartmentCapacities.filter((_, i) => i !== index);
      setCompartmentCapacities(newRows);
    }
    if (val === "inspections") {
      if (index === 0) return; // Prevent deletion of the first row
      const newRows = inspections.filter((_, i) => i !== index);
      setInspections(newRows);
    }
  };

  const handleCapacityChange = (index, field, value) => {
    const newRows = [...compartmentCapacities];
    newRows[index][field] = value;
    setCompartmentCapacities(newRows);
  };

  const handleKeyDown = (index, field, event, val) => {
    // for route renewals
    if (val === "capacities") {
      if (
        event.key === "Tab" &&
        index === compartmentCapacities.length - 1 &&
        field === "capacity"
      ) {
        console.log(
          index,
          field,
          event,
          "this is handle key down add capacity"
        );
        const newRows = [...compartmentCapacities];
        const lastRow = newRows[newRows.length - 1];
        const allFieldsFilled = Object.values(lastRow).every(
          (val) => val.trim() !== ""
        );

        if (allFieldsFilled) {
          setCompartmentCapacities([
            ...newRows,
            {
              compartment: "",
              capacity: "",
            },
          ]);
        }
      }
    }
  };

  const handleChange = (index, columnName, value) => {
    console.log("On change :", value);
    let formattedValue = value;
    if (columnName === "nextVisit" || columnName === "lastCheck") { 
      const date = new Date(value);
      formattedValue = date.toISOString(); // This will give you the format "2025-01-08T00:00:00.000Z"
      
      // To ensure it matches the exact format with +00:00 (instead of Z), replace 'Z' with '+00:00'
      if (formattedValue.endsWith('Z')) {
        formattedValue = formattedValue.slice(0, -1) + '+00:00';
      }
    }
    const updatedData = [...selectedOrder.technicalInspectionList];
    updatedData[index] = {
      ...updatedData[index],  // Spread the current object at the index
      [columnName]: formattedValue,    // Dynamically update the property using columnName
    };
  
    // Set the updated state
    setSelectedOrder({
      ...selectedOrder, // Spread the previous state
      technicalInspectionList: updatedData, // Update the specific list
    });
  };

  const handleOnChangeDesc = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      des: e.target.value,
    });
  };

  const onChangeLink = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      linkTo: e.target.value,
    });
  };

  const onChangeMake = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      make: e.target.value,
    });
  };

  const onChangeModel = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      model: e.target.value,
    });
  };

  const onChangeYear = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      annee: Number(e.target.value),
    });
  };

  const onChangeNoOfAxle = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      nbaxle: Number(e.target.value),
    });
  };

  const onChangeMaxLength = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxLen: Number(e.target.value),
    });
  };

  const onChangeMaxWidth = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxWid: Number(e.target.value),
    });
  };

  const onChangeMaxLoadVol = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxLovol: Number(e.target.value),
    });
  };

  const onChangeCurbWeight = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      curbWei: Number(e.target.value),
    });
  };

  const onChangeMaxFreightHeight = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxFH: Number(e.target.value),
    });
  };

  const onChangeMaxLoadMass = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxLoams: Number(e.target.value),
    });
  };

  const onChangeGVWR = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      gvwr: Number(e.target.value),
    });
  };

  const onChangeMaxStackHeight = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxStackHeight: Number(e.target.value),
    });
  };

  const onChangeGroundOccupancy = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      groundOccupancy: Number(e.target.value),
    });
  };

  const onChangeComment = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      comment: e.target.value,
    });
  };

  const onChangeLastInsp = (date) => {
    setSelectedOrder({
      ...selectedOrder,
      lastInsp: format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
    });
  };

  const onChangeTrailerCode = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      trailer: e.target.value,
    });
  };

  const handleChangeSite = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setSelectedOrder({
      ...selectedOrder,
      fcy: selectedValue,
    });
  };

  const handleChangeTrailerType = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setSelectedOrder({
      ...selectedOrder,
      type: selectedValue,
    });
  };

  const handleChangeFixedAssetList = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setSelectedOrder({
      ...selectedOrder,
      aasref: selectedValue,
    });
  };

  const handleChangeStyle = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setSelectedOrder({
      ...selectedOrder,
      styzon: selectedValue,
    });
  };
  console.log(
    selectedOrder?.technicalInspectionList,
    "this is tech inspection list right section"
  );
  return (
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
                ? "Create New Trailer"
                : `Update Trailer : ${selectedOrder?.trailer}`}
            </h5>
            <div className="mt-5 responsive-form">
              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="trailer">Trailer</Label>
                <Input
                  type="text"
                  name="trailer"
                  id="trailer"
                  value={selectedOrder.trailer}
                  readOnly={!isCreate}
                  onChange={onChangeTrailerCode}
                />
              </FormGroup>

              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={selectedOrder.des}
                  onChange={handleOnChangeDesc}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="site">Site</Label>
                {/* <Input
                  type="select"
                  name="site"
                  id="site"
                  value={selectedOrder.fcy || ""}
                >
                  <option value="" disabled>
                      Select
                    </option>
                    {commonData?.siteList.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.value + " (" + option.label + ")"}
                      </option>
                    ))}
                </Input> */}

                <Select
                  options={commonData?.siteList}
                  value={
                    commonData?.siteList.find(
                      (option) => option.value === selectedOrder.fcy
                    ) || null
                  }
                  onChange={handleChangeSite}
                  placeholder="Select"
                  isClearable
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="link">Link</Label>
                <Input
                  type="text"
                  name="link"
                  id="link"
                  value={selectedOrder.linkTo}
                  onChange={onChangeLink}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="type">Type</Label>
                {/* <Input
                  type="select"
                  name="type"
                  id="type"
                  value={selectedOrder.type}
                >
                  <option>{selectedOrder.type}</option>
                </Input> */}

                <Select
                  options={commonData?.trailerTypeList}
                  value={
                    commonData?.trailerTypeList.find(
                      (option) => option.value === selectedOrder.type
                    ) || null
                  }
                  onChange={handleChangeTrailerType}
                  placeholder="Select Type"
                  isClearable
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="make">Make</Label>
                <Input
                  type="text"
                  name="make"
                  id="make"
                  value={selectedOrder.make}
                  onChange={onChangeMake}
                />
              </FormGroup>

              {/* Checkbox */}
              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.xtailgate === 2 ? true : false}
                    onChange={handleTailGateCheckboxChange}
                  />
                  Tailgate
                </Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="model">Model</Label>
                <Input
                  type="text"
                  name="model"
                  id="model"
                  value={selectedOrder.model}
                  onChange={onChangeModel}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="year">Year</Label>
                <Input
                  type="number"
                  name="year"
                  id="year"
                  value={selectedOrder.annee}
                  onChange={onChangeYear}
                />
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="fasset">Fixed asset</Label>
                {/* <Input
                  type="select"
                  name="fasset"
                  id="fasset"
                  value={selectedOrder.aasref || ""}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {commonData?.fixedAssetList.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.value + " (" + option.label + ")"}
                    </option>
                  ))}
                </Input> */}

                <Select
                  options={commonData?.fixedAssetList}
                  value={
                    commonData?.fixedAssetList.find(
                      (option) => option.value === selectedOrder.aasref
                    ) || null
                  }
                  getOptionLabel={(option) => `${option.value}`}
                  onChange={handleChangeFixedAssetList}
                  placeholder="Select"
                  isClearable
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="noOfAxle">No of axle</Label>
                <Input
                  type="number"
                  name="noOfAxle"
                  id="noOfAxle"
                  value={selectedOrder.nbaxle}
                  onChange={onChangeNoOfAxle}
                />
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="style">Style</Label>
                {/* <Input
                  type="select"
                  name="style"
                  id="style"
                  value={selectedOrder.styzon || ""}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {commonData?.styleList.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.value + " (" + option.label + ")"}
                    </option>
                  ))}
                </Input> */}

                <Select
                  options={commonData?.styleList}
                  value={
                    commonData?.styleList.find(
                      (option) => option.value === selectedOrder.styzon
                    ) || null
                  }
                  onChange={handleChangeStyle}
                  getOptionLabel={(option) => `${option.value}`}
                  placeholder="Select"
                  isClearable
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxLength">Max length</Label>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxLength"
                    id="maxLength"
                    value={selectedOrder.maxLen}
                    onChange={onChangeMaxLength}
                  />
                  <span className="unit-suffix">IN</span>
                </div>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxWidth">Max width</Label>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxWidth"
                    id="maxWidth"
                    value={selectedOrder.maxWid}
                    onChange={onChangeMaxWidth}
                  />
                  <span className="unit-suffix">IN</span>
                </div>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxLoadVol">Max loading vol</Label>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxLoadVol"
                    id="maxLoadVol"
                    value={selectedOrder.maxLovol}
                    onChange={onChangeMaxLoadVol}
                  />
                  <span className="unit-suffix">GL</span>
                </div>
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="curbWeight">Curb weight</Label>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="curbWeight"
                    id="curbWeight"
                    value={selectedOrder.curbWei}
                    onChange={onChangeCurbWeight}
                  ></Input>
                  <span className="unit-suffix">LB</span>
                </div>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxFreightHeight">Max freight height</Label>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxFreightHeight"
                    id="maxFreightHeight"
                    value={selectedOrder.maxFH}
                    onChange={onChangeMaxFreightHeight}
                  ></Input>
                  <span className="unit-suffix">IN</span>
                </div>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxLoadMass">Max loading mass</Label>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxLoadMass"
                    id="maxLoadMass"
                    value={selectedOrder.maxLoams}
                    onChange={onChangeMaxLoadMass}
                  ></Input>
                  <span className="unit-suffix">LB</span>
                </div>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="gvwr">GVWR</Label>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="gvwr"
                    id="gvwr"
                    value={selectedOrder.gvwr}
                    onChange={onChangeGVWR}
                  ></Input>
                  <span className="unit-suffix">LB</span>
                </div>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxStackHeight">Max Stack Height</Label>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxStackHeight"
                    id="maxStackHeight"
                    value={selectedOrder.maxStackHeight}
                    onChange={onChangeMaxStackHeight}
                  ></Input>
                  <span className="unit-suffix">IN</span>
                </div>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="groundOccupancy">Ground Occupancy</Label>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="groundOccupancy"
                    id="groundOccupancy"
                    value={selectedOrder.groundOccupancy}
                    onChange={onChangeGroundOccupancy}
                  ></Input>
                  <span className="unit-suffix">IN</span>
                </div>
              </FormGroup>

              <FormGroup>
                <Label>Last Inspection</Label>
                <DatePicker
                  selected={
                    selectedOrder.lastInsp
                      ? new Date(selectedOrder.lastInsp)
                      : null
                  }
                  onChange={onChangeLastInsp}
                  id="lastInspection"
                  showTimeSelect={false}
                  dateFormat="MM/dd/yyyy"
                  className="form-control"
                />
              </FormGroup>

              <FormGroup>
                <Label for="picture">Picture</Label>
                <img src="" alt="trailer image" />
              </FormGroup>

              <FormGroup check className="form-item">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.xrentable === 2 ? true : false}
                    onChange={handleRentableCheckboxChange}
                  />
                  Rentable
                </Label>
              </FormGroup>

              <FormGroup check className="form-item">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.xsideope === 2 ? true : false}
                    onChange={handleSideOpCheckboxChange}
                  />
                  Side operation
                </Label>
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="unavailable">Unavailable</Label>
                <Input
                  type="select"
                  name="unavailable"
                  id="unavailable"
                  value={selectedOrder.unavailable}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {commonData?.unAvailableList.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.value + " (" + option.label + ")"}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup className="form-item">
                <Label for="message">Comment</Label>
                <Input
                  type="textarea"
                  name="comment"
                  id="comment"
                  value={selectedOrder.comment}
                  onChange={onChangeComment}
                />
              </FormGroup>
            </div>
            <div className="mt-5">
              <Table responsive striped bordered hover>
                <thead>
                  <tr className="text-center" style={{ color: "black" }}>
                    <th style={{ background: "#CCD6DB" }}></th>
                    <th style={{ background: "#CCD6DB" }}>Actions</th>
                    <th
                      className="text-nowrap"
                      style={{ background: "#CCD6DB" }}
                    >
                      Compartment
                    </th>
                    <th style={{ background: "#CCD6DB" }}>Capacity (Vol)</th>
                  </tr>
                </thead>
                <tbody>
                  {compartmentCapacities?.map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>
                        <Button size="sm">{index + 1}</Button>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleOtherDelete(index, "capacities")}
                          disabled={index === 0}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button>
                      </td>
                      <td>
                        <Input
                          type="text"
                          value={row.site}
                          onChange={(e) =>
                            handleCapacityChange(
                              index,
                              "compartment",
                              e.target.value
                            )
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(index, "compartment", e, "capacities")
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          value={row.name}
                          onChange={(e) =>
                            handleCapacityChange(
                              index,
                              "capacity",
                              e.target.value
                            )
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(index, "capacity", e, "capacities")
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h4 className="text-bold mt-2">Management</h4>
              <div className="custom-divider"></div>
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <label>
                  <input
                    type="checkbox"
                    name="stockManaged"
                    checked={selectedOrder.xstomgtcod === 2 ? true : false}
                    onChange={handleStMgCheckboxChange}
                    className="mr-2"
                  />
                  Stock Managed
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="lotManaged"
                    checked={selectedOrder.xlotmgtcod === 2 ? true : false}
                    onChange={handleLtMgCheckboxChange}
                    className="mr-2"
                  />
                  LOT Managed
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="serialManaged"
                    checked={selectedOrder.xseril === 2 ? true : false}
                    onChange={handleSrMgCheckboxChange}
                    className="mr-2"
                  />
                  Serial Managed
                </label>
              </div>

              <h4 className="text-bold mt-5">Technical Inspection</h4>
              <div className="custom-divider"></div>
              <Table responsive striped bordered hover>
                <thead>
                  <tr className="text-center" style={{ color: "black" }}>
                    <th style={{ background: "#CCD6DB" }}></th>
                    {/* <th style={{ background: "#CCD6DB" }}>Actions</th> */}
                    <th
                      className="text-nowrap"
                      style={{ background: "#CCD6DB" }}
                    >
                      Inspection Type
                    </th>
                    <th style={{ background: "#CCD6DB" }}>Last Check</th>
                    <th style={{ background: "#CCD6DB" }}>Periodicity</th>
                    <th style={{ background: "#CCD6DB" }}>Next Visit</th>
                    <th style={{ background: "#CCD6DB" }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.technicalInspectionList?.map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>
                        <Button size="sm">{index + 1}</Button>
                      </td>
                      {/* <td>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() =>
                            handleOtherDelete(index, "inspections")
                          }
                          disabled={index === 0}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button>
                      </td> */}
                      <td>{row.inspectionType}</td>
                      <td>
                      <Input
  type="date"
  value={row.lastCheck ? new Date(row.lastCheck).toISOString().slice(0, 10) : ""} 
  onChange={(e) =>
    handleChange(index, "lastCheck", e.target.value)
  }
/>
                      </td>
                      <td>
                        <select
                          value={row.periodicity || ""}
                          onChange={(e) =>
                            handleChange(index, "periodicity", e.target.value)
                          }
                          className="form-control"
                        >
                          <option value="">Select</option>
                          {periodicityOptions.map((option, id) => (
                            <option key={id} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                      <Input
  type="date"
  value={row.nextVisit ? new Date(row.nextVisit).toISOString().slice(0, 10) : ""} 
  onChange={(e) =>
    handleChange(index, "nextVisit", e.target.value)
  }
/>

                      </td>
                      <td>
                        <select
                          value={row.type || ""}
                          onChange={(e) =>
                            handleChange(index, "type", e.target.value)
                          }
                          className="form-control"
                        >
                          <option value="">Select</option>
                          {typeOptions.map((option, id) => (
                            <option key={id} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="mt-3 d-flex justify-content-end">
              {!isCreate && (
                <Button
                style={{
                  borderRadius: "50px",
                  padding: "0.4rem 1.5rem",
                }}
                  className="mr-2"
                  color="danger"
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              )}
              <Button
               style={{
                borderRadius: "50px",
                padding: "0.4rem 1.5rem",
              }}
              color="primary" onClick={handleUpdate}>
                {isCreate ? "Create" : "Update"}
              </Button>
            </div>
          </Form>
        ) : (
          <p>Select a trailer to view details</p>
        )}
      </CardBody>
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal} centered>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the trailer: {selectedOrder?.trailer}?
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
