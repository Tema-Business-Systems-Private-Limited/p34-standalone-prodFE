import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

import { options } from "toastr";
import { format } from "date-fns";

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

  console.log(error, "this is error inside trailer");
  const [compartmentCapacities, setCompartmentCapacities] = useState([
    {
      compartment: "",
      capacity: "",
    },
  ]);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
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
  const [activeTab, setActiveTab] = useState("home");

  const handleScrollTo = (event, id) => {
    event.preventDefault(); // Prevent default anchor behavior

    const targetElement = document.getElementById(id);
    const cardBody = document.getElementById("cardbody"); // The scrollable container

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
      xsermgtcod: selectedOrder.xsermgtcod === 1 ? 2 : 1,
    });
  };

  // const handleOtherDelete = (index, val) => {

  //   console.log(compartmentCapacities, "this is compartment capacities")
  //   if (val === "capacities") {
  //     // if (compartmentCapacities.length === 1) return; // only block delete if it's the last item
  //     const newRows = compartmentCapacities.filter((_, i) => i !== index);

  //     console.log(newRows, "new rows checking here");
  //     setCompartmentCapacities(newRows);
  //   }

  //   if (val === "inspections") {
  //     if (inspections.length === 1) return;
  //     const newRows = inspections.filter((_, i) => i !== index);
  //     setInspections(newRows);
  //   }
  // };
  const handleOtherDelete = (index, val) => {
    const clearRow = (row) =>
      Object.fromEntries(Object.keys(row).map((key) => [key, ""]));

    if (val === "capacities") {
      const newRows = compartmentCapacities.map((row, i) =>
        i === index ? clearRow(row) : row
      );
      console.log(newRows, "new rows checking here");
      setCompartmentCapacities(newRows);
    }

    if (val === "inspections") {
      const newRows = inspections.map((row, i) =>
        i === index ? clearRow(row) : row
      );
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
      if (formattedValue.endsWith("Z")) {
        formattedValue = formattedValue.slice(0, -1) + "+00:00";
      }
    }
    const updatedData = [...selectedOrder.technicalInspectionList];
    updatedData[index] = {
      ...updatedData[index], // Spread the current object at the index
      [columnName]: formattedValue, // Dynamically update the property using columnName
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
    const value = Number(e.target.value);
    if (value > 0) {
      setSelectedOrder({
        ...selectedOrder,
        annee: value,
      });
    } else {
      setSelectedOrder({
        ...selectedOrder,
        annee: "",
      });
    }
  };

  const onChangeNoOfAxle = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      nbaxle: Number(e.target.value),
    });
  };

  const onChangeMaxLength = (e) => {
    const value = e.target.value;

    setSelectedOrder({
      ...selectedOrder,
      maxLen: value === "" ? "" : Number(value),
    });

    if (value.trim()) {
      setError({
        ...error,
        maxLength: "",
      });
    } else {
      setError({
        ...error,
        maxLength: "This field is mandatory",
      });
    }
  };


  const onChangeMaxWidth = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxWid: Number(e.target.value),
    });

    if (e.target.value.trim()) {
      setError({
        ...error,
        maxWidth: "",
      });
    } else {
      setError({
        ...error,
        maxWidth: "This field is mandatory",
      });
    }
  };

  const onChangeMaxLoadVol = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxLovol: Number(e.target.value),
    });

    if (e.target.value.trim()) {
      setError({
        ...error,
        maxLoadVol: "",
      });
    } else {
      setError({
        ...error,
        maxLoadVol: "This field is mandatory",
      });
    }
  };

  const onChangeCurbWeight = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      curbWei: Number(e.target.value),
    });

    if (e.target.value.trim()) {
      setError({
        ...error,
        crubWeight: "",
      });
    } else {
      setError({
        ...error,
        crubWeight: "This field is mandatory",
      });
    }
  };

  const onChangeMaxFreightHeight = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxFH: Number(e.target.value),
    });

    if (e.target.value.trim()) {
      setError({
        ...error,
        maxFreightHeight: "",
      });
    } else {
      setError({
        ...error,
        maxFreightHeight: "This field is mandatory",
      });
    }
  };

  const onChangeMaxLoadMass = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxLoams: Number(e.target.value),
    });

    if (e.target.value.trim()) {
      setError({
        ...error,
        maxLoadingMass: "",
      });
    } else {
      setError({
        ...error,
        maxLoadingMass: "This field is mandatory",
      });
    }
  };

  const onChangeGVWR = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      gvwr: Number(e.target.value),
    });

    if (e.target.value.trim()) {
      setError({
        ...error,
        gvwr: "",
      });
    } else {
      setError({
        ...error,
        gvwr: "This field is mandatory",
      });
    }
  };

  const onChangeMaxStackHeight = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xbathght: Number(e.target.value),
    });
    if (e.target.value.trim()) {
      setError({
        ...error,
        xbathght: "",
      });
    } else {
      setError({
        ...error,
        xbathght: "This field is mandatory",
      });
    }

  };

  const onChangeGroundOccupancy = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xgndocc: Number(e.target.value),
    });
    if (e.target.value.trim()) {
      setError({
        ...error,
        xgndocc: "",
      });
    } else {
      setError({
        ...error,
        xgndocc: "This field is mandatory",
      });
    }
  };

  const onChangeComment = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      comment: e.target.value,
    });
  };

  const onChangeLastInsp = (date) => {
    if (!date) {
      // If the date is cleared using clear button
      setSelectedOrder((prev) => ({
        ...prev,
        lastInsp: "",
      }));
      return;
    }

    const year = date.getFullYear();
    if (year > 9999) {
      return; // prevent setting unrealistic date
    }

    let formattedValue = date.toISOString();
    if (formattedValue.endsWith("Z")) {
      formattedValue = formattedValue.slice(0, -1) + "+00:00";
    }

    setSelectedOrder((prev) => ({
      ...prev,
      lastInsp: formattedValue,
    }));
  };


  const clearLastInsp = () => {
    setSelectedOrder({
      ...selectedOrder,
      lastInsp: ""
    });
  };



const onChangeTrailerCode = (e) => {
  const value = e.target.value;

  setSelectedOrder(prev => ({
    ...prev,
    trailer: value,
  }));

  if (value.trim()) {
    setError(prev => ({ ...prev, trailer: "" }));
  }
};




  // const onChangeTrailerCode = (e) => {
  //   setSelectedOrder({
  //     ...selectedOrder,
  //     trailer: e.target.value,
  //   });

  //   if (e.target.value.trim()) {
  //     setError({
  //       ...error,
  //       trailer: "",
  //     });
  //   } else {
  //     setError({
  //       ...error,
  //       trailer: "This field is mandatory",
  //     });
  //   }
  // };

  const handleChangeSite = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setSelectedOrder({
      ...selectedOrder,
      fcy: selectedValue,
    });

    if (selectedValue.trim()) {
      setError({
        ...error,
        site: "",
      });
    } else {
      setError({
        ...error,
        site: "This field is mandatory",
      });
    }
  };

  const handleChangeTrailerType = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setSelectedOrder({
      ...selectedOrder,
      type: selectedValue,
    });

    if (selectedValue.trim()) {
      setError({
        ...error,
        type: "",
      });
    } else {
      setError({
        ...error,
        type: "This field is mandatory",
      });
    }
  };

  const handleChangeFixedAssetList = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    setSelectedOrder({
      ...selectedOrder,
      aasref: selectedValue,
    });
  };

  const handleChangeStyle = (selectedOption) => {
    // console.log(selectedOption, "selected option in style")
    const selectedValue = selectedOption ? selectedOption.value : "";
    setSelectedOrder({
      ...selectedOrder,
      styzon: selectedValue,
    });

    console.log(selectedOption, "this is selected option value style");

    const styleString = selectedOption?.style || "";
    const styleObject = Object.fromEntries(
      styleString
        .split(";")
        .filter(Boolean)
        .map((item) => {
          const [key, value] = item.split(":").map((str) => str.trim());
          return [key.replace(/-./g, (match) => match[1].toUpperCase()), value];
        })
    );
    setBackgroundColor(styleObject.backgroundColor || "#fff"); // Update background color

    if (selectedValue.trim()) {
      setError({
        ...error,
        style: "",
      });
    } else {
      setError({
        ...error,
        style: "This field is mandatory",
      });
    }
  };
  console.log(
    selectedOrder?.technicalInspectionList,
    "this is tech inspection list right section"
  );



  const selectedStyle =
    commonData?.styleList?.find(
      (option) => option.value === selectedOrder?.styzon
    ) || null;
  console.log(selectedStyle, "this is selected style checking");
  const styleString = selectedStyle?.style || "";

  useEffect(() => {
    const styleObject = Object.fromEntries(
      styleString
        .split(";")
        .filter(Boolean)
        .map((item) => {
          const [key, value] = item.split(":").map((str) => str.trim());
          return [key.replace(/-./g, (match) => match[1].toUpperCase()), value];
        })
    );

    console.log(styleObject, "this is selected object ");

    // Update background color when styleObject is processed
    setBackgroundColor(styleObject.backgroundColor || "#fff");
  }, [selectedStyle]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      // reader.readAsArrayBuffer(file);

      reader.onload = () => {
        const result = reader.result;
        // const binaryArray = new Uint8Array(reader.result);
        // const base64Image = btoa(String.fromCharCode(...binaryArray));
        const base64Image = result.split(',')[1];
        setSelectedOrder((prevState) => ({
          ...prevState,
          image: base64Image,
        }));
      };


      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      image: null,
    }));
    const fileInput = document.getElementById("picture");
    if (fileInput) fileInput.value = "";
  };

  console.log(commonData, "common");
  console.log("keycheck", selectedOrder)
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
              <div className="pl-2" style={{ display: "flex", gap: 50, fontSize: "1.2rem" }}>
                <a
                  href="#Home"
                  style={{
                    color: activeTab === "home" ? "green" : "black",
                    borderBottom: activeTab === "home" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  onClick={(e) => handleScrollTo(e, "home")}
                >
                  Home
                </a>
                <a
                  style={{
                    color: activeTab === "management" ? "green" : "black",
                    borderBottom:
                      activeTab === "management" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  href="#management"
                  onClick={(e) => handleScrollTo(e, "management")}
                >
                  Management
                </a>
                <a
                  style={{
                    color:
                      activeTab === "technicalInspection" ? "green" : "black",
                    borderBottom:
                      activeTab === "technicalInspection"
                        ? "5px solid green"
                        : "",
                    textDecoration: "none",
                  }}
                  href="#technicalInspection"
                  onClick={(e) => handleScrollTo(e, "technicalInspection")}
                >
                  Technical Inspection
                </a>


              </div>
            </div>
            <h4 id="home" className="mt-3 text-bold">
              Home
            </h4>
            <div className="custom-divider"></div>
            <div className="mt-3 responsive-form">
              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="trailer">
                  Trailer
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
                <Input
                  type="text"
                  name="trailer"
                  id="trailer"
                  value={selectedOrder.trailer}
                  readOnly={!isCreate}
                  onChange={onChangeTrailerCode}
                  isInvalid={!!error.trailer}
                  required
                />

                {error.trailer && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    {error.trailer}
                  </div>
                )}
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
                <Label for="site">
                  Site{" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>


                <Select
                  options={commonData?.siteList}
                  value={
                    commonData?.siteList.find(
                      (option) => option.value === selectedOrder.fcy
                    ) || null
                  }
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )}
                  onChange={handleChangeSite}
                  placeholder="Select"
                  isClearable
                />

                {error.site && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    {error.site}
                  </div>
                )}
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
                <Label for="type">
                  Type{" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
                {/* <Input
                  type="select"
                  name="type"
                  id="type"
                  value={selectedOrder.type}
                >
                  <option>{selectedOrder.type}</option>
                </Input> */}
                <Select
                  options={
                    commonData?.trailerTypeList
                      ?.filter(opt => opt && opt.value && opt.label) // remove null/empty
                  }
                  value={
                    commonData?.trailerTypeList.find(
                      (option) => option.value === selectedOrder.type
                    ) || null
                  }
                  onChange={handleChangeTrailerType}
                  placeholder="Select Type"
                  isClearable
                />


                {/* <Select
                  options={commonData?.trailerTypeList}
                  value={
                    commonData?.trailerTypeList.find(
                      (option) => option.value === selectedOrder.type
                    ) || null
                  }
                  onChange={handleChangeTrailerType}
                  placeholder="Select Type"
                  isClearable
                /> */}

                {error.type && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    {error.type}
                  </div>
                )}
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

                {/* Inline <style> block for year input to remove arrows */}
                <style>
                  {`
      #year::-webkit-inner-spin-button, 
      #year::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #year {
        -moz-appearance: textfield;
      }
    `}
                </style>

                <Input
                  type="number"
                  name="year"
                  id="year"
                  min="0"
                  value={selectedOrder.annee}
                  onChange={onChangeYear}
                  onKeyDown={(e) => {
                    const blockedKeys = ["-", "+", "e", "E"];
                    if (blockedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
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

                {/* Inline <style> block for noOfAxle input to remove arrows */}
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
                  value={selectedOrder.nbaxle}
                  onChange={onChangeNoOfAxle}
                />
              </FormGroup>


              <FormGroup className="form-item dropdown-input">
                <Label for="style">
                  Style{" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
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
                {/* 
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
                /> */}

                <Select
                  id="style"
                  name="style"
                  options={commonData?.styleList} // Provide options to React Select
                  value={selectedStyle} // Set selected value to the matching object
                  placeholder="Select a style"
                  isClearable // Allows clearing the selection
                  onChange={handleChangeStyle}
                  formatOptionLabel={({ value, label, style }) => {
                    const styleObject = style
                      ? Object.fromEntries(
                        style
                          .split(";")
                          .filter(Boolean)
                          .map((item) => {
                            const [key, value] = item
                              .split(":")
                              .map((str) => str.trim());
                            return [
                              key.replace(/-./g, (match) =>
                                match[1].toUpperCase()
                              ),
                              value,
                            ];
                          })
                      )
                      : {};

                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          className="shadow-lg"
                          style={{
                            backgroundColor: styleObject.backgroundColor, // Use parsed background color
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%", // Make it round
                            display: "inline-block",
                          }}
                        ></span>
                        <div>
                          <strong>{value}</strong> <span>({label})</span>
                        </div>
                      </div>
                    );
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: backgroundColor, // Apply dynamic background color
                    }),
                  }}
                />

                {error.style && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    {error.style}
                  </div>
                )}
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxLength">
                  Max length <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>

                {/* Inline <style> block for maxLength input to remove arrows */}
                <style>
                  {`
      #maxLength::-webkit-inner-spin-button, 
      #maxLength::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #maxLength {
        -moz-appearance: textfield;
      }
    `}
                </style>

                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxLength"
                    id="maxLength"
                    value={selectedOrder.maxLen}
                    onChange={onChangeMaxLength}
                    min="0"
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <span className="unit-suffix">IN</span>
                </div>

                {error.maxLength && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.maxLength}
                  </div>
                )}
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="maxWidth">
                  Max width <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>

                {/* Inline <style> block for maxWidth input to remove arrows */}
                <style>
                  {`
      #maxWidth::-webkit-inner-spin-button, 
      #maxWidth::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #maxWidth {
        -moz-appearance: textfield;
      }
    `}
                </style>

                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxWidth"
                    id="maxWidth"
                    value={selectedOrder.maxWid === 0 ? "" : selectedOrder.maxWid}
                    onChange={onChangeMaxWidth}
                  />

                  <span className="unit-suffix">IN</span>
                </div>

                {error.maxWidth && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.maxWidth}
                  </div>
                )}
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="maxLoadVol">
                  Max loading vol 
                </Label>

                {/* Inline <style> block for maxLoadVol input to remove arrows */}
                <style>
                  {`
      #maxLoadVol::-webkit-inner-spin-button, 
      #maxLoadVol::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #maxLoadVol {
        -moz-appearance: textfield;
      }
    `}
                </style>

                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxLoadVol"
                    id="maxLoadVol"
                    value={selectedOrder.maxLovol === 0 ? "" : selectedOrder.maxLovol}
                    onChange={onChangeMaxLoadVol}
                    min="0"
                  />

                  <span className="unit-suffix">GL</span>
                </div>

                {/* {error.maxLoadVol && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.maxLoadVol}
                  </div>
                )} */}
              </FormGroup>


              <FormGroup className="form-item dropdown-input">
                <Label for="curbWeight">
                  Curb weight <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>

                {/* Inline <style> block for curbWeight input to remove arrows */}
                <style>
                  {`
      #curbWeight::-webkit-inner-spin-button, 
      #curbWeight::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #curbWeight {
        -moz-appearance: textfield;
      }
    `}
                </style>

                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="curbWeight"
                    id="curbWeight"
                    value={selectedOrder.curbWei === 0 ? "" : selectedOrder.curbWei}
                    onChange={onChangeCurbWeight}
                    min="0"
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                  />

                  <span className="unit-suffix">LB</span>
                </div>

                {error.crubWeight && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.crubWeight}
                  </div>
                )}
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="maxFreightHeight">
                  Max freight height <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>

                {/* Inline <style> block for maxFreightHeight input to remove arrows */}
                <style>
                  {`
      #maxFreightHeight::-webkit-inner-spin-button, 
      #maxFreightHeight::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #maxFreightHeight {
        -moz-appearance: textfield;
      }
    `}
                </style>

                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxFreightHeight"
                    id="maxFreightHeight"
                    value={selectedOrder.maxFH === 0 ? "" : selectedOrder.maxFH}
                    onChange={onChangeMaxFreightHeight}
                    min="0"
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                  />

                  <span className="unit-suffix">IN</span>
                </div>

                {error.maxFreightHeight && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.maxFreightHeight}
                  </div>
                )}
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="maxLoadMass">
                  Max loading mass <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
                <style>
                  {`
      #maxLoadMass::-webkit-inner-spin-button, 
      #maxLoadMass::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #maxLoadMass {
        -moz-appearance: textfield;
        appearance: textfield;
      }
    `}
                </style>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxLoadMass"
                    id="maxLoadMass"
                    value={
                      isCreate && selectedOrder?.maxLoams === 0
                        ? ""
                        : selectedOrder?.maxLoams ?? ""
                    }
                    onChange={onChangeMaxLoadMass}
                    onKeyDown={(e) => {
                      if (["-", "e", "+", "E"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <span className="unit-suffix">LB</span>
                </div>
                {error.maxLoadingMass && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.maxLoadingMass}
                  </div>
                )}
              </FormGroup>



              <FormGroup className="form-item text-input">
                <Label for="gvwr">
                  GVWR <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>


                <style>
                  {`
      #gvwr::-webkit-inner-spin-button, 
      #gvwr::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #gvwr {
        -moz-appearance: textfield;
      }
    `}
                </style>

                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="gvwr"
                    id="gvwr"
                    value={selectedOrder.gvwr === 0 ? "" : selectedOrder.gvwr}
                    onChange={onChangeGVWR}
                    min="0"
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <span className="unit-suffix">LB</span>
                </div>


                {error.gvwr && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.gvwr}
                  </div>
                )}
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="maxStackHeight">Max Stack Height</Label>


                <style>
                  {`
      #maxStackHeight::-webkit-inner-spin-button, 
      #maxStackHeight::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #maxStackHeight {
        -moz-appearance: textfield;
      }
    `}
                </style>

                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxStackHeight"
                    id="maxStackHeight"
                    value={selectedOrder.xbathght === 0 ? "" : selectedOrder.xbathght}
                    onChange={onChangeMaxStackHeight}
                    min="0"
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                  />

                  <span className="unit-suffix">IN</span>
                </div>
                {/* {error.xbathght && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.xbathght}
                  </div>
                )} */}
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="groundOccupancy">Ground Occupancy </Label>

                {/* Inline <style> block for groundOccupancy input to remove arrows */}
                <style>
                  {`
      #groundOccupancy::-webkit-inner-spin-button, 
      #groundOccupancy::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #groundOccupancy {
        -moz-appearance: textfield;
      }
    `}
                </style>

                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="groundOccupancy"
                    id="groundOccupancy"
                    value={selectedOrder.xgndocc === 0 ? "" : selectedOrder.xgndocc}
                    onChange={onChangeGroundOccupancy}
                    min="0"
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                  />

                  <span className="unit-suffix">IN</span>
                </div>
                {/* {error.xgndocc && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.xgndocc}
                  </div>
                )} */}
              </FormGroup>


              <FormGroup>
                <Label>Last Inspection</Label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <DatePicker
                    selected={
                      selectedOrder.lastInsp &&
                        selectedOrder.lastInsp !== "1753-01-01T00:00:00.000+00:00"
                        ? new Date(selectedOrder.lastInsp)
                        : null
                    }
                    onChange={(date) => onChangeLastInsp(date)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="MM/DD/YYYY"
                    className="form-control"
                    isClearable
                  />
                </div>
              </FormGroup>




              <FormGroup>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <Label for="picture">Picture</Label>
                  </div>
                  {/* {/ <img src={selectedOrder.image} alt="vehicle image" /> /} */}

                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="picture"
                      name="picture"
                      style={{ display: "none" }}
                    />
                    {
                      selectedOrder.image && (
                        <div>
                          <img
                            style={{ height: "150px", width: "350px" }}
                            className="img-fluid card-img-top ml-2"
                            src={`data:image/jpeg;base64,${selectedOrder.image}`}
                            alt={selectedOrder.code}
                          />
                        </div>
                      )
                    }
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
                    <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                    <th style={{ background: "#CCD6DB" }}>Actions</th>
                    <th className="text-nowrap" style={{ background: "#CCD6DB" }}>
                      Compartment
                    </th>
                    <th style={{ background: "#CCD6DB" }}>Capacity (Vol)</th>
                  </tr>
                </thead>

                <tbody>
                  {compartmentCapacities?.map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>
                        <Button type="button" size="sm" disabled>
                          {index + 1}
                        </Button>
                      </td>

                      <td>
                        <Button
                          size="sm"
                          color="danger"
                          title={
                            Object.values(compartmentCapacities[index] || {}).some(
                              (val) => val?.trim() !== ""
                            )
                              ? "Clear this row"
                              : "Fill a field to enable clear"
                          }
                          onClick={() => handleOtherDelete(index, "capacities")}
                          disabled={
                            compartmentCapacities.length === 0 ||
                            Object.values(compartmentCapacities[index] || {}).every(
                              (val) => val?.trim() === ""
                            ) // disable if all fields are empty
                          }
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button>



                        {/* <Button
                          size="sm"
                          color="danger"
                          title={
                            compartmentCapacities.length === 1
                              ? "At least one compartment is required"
                              : "Delete Compartment"
                          }
                          onClick={() => handleOtherDelete(index, "capacities")}
                          disabled={compartmentCapacities.length === 0}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button> */}
                      </td>

                      <td>
                        <Input
                          type="text"
                          value={row.compartment || ""}
                          onChange={(e) =>
                            handleCapacityChange(index, "compartment", e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(index, "compartment", e, "capacities")
                          }
                        />
                      </td>

                      <td>
                        <Input
                          type="text"
                          value={row.capacity || ""}
                          onChange={(e) =>
                            handleCapacityChange(index, "capacity", e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(index, "capacity", e, "capacities")
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>  {/* ✅ Closing tag added here */}




              <h4 id="management" className="text-bold mt-2">
                Management
              </h4>
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
                    checked={selectedOrder.xsermgtcod === 2 ? true : false}
                    onChange={handleSrMgCheckboxChange}
                    className="mr-2"
                  />
                  Serial Managed
                </label>
              </div>

              <h4 id="technicalInspection" className="text-bold mt-5">
                Technical Inspection
              </h4>
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
                        <Button size="sm" type="button">{index + 1}</Button>
                      </td>

                      <td>{row.inspectionType}</td>
                      <td>
                        <Input
                          type="date"
                          value={
                            row.lastCheck &&
                              row.lastCheck !== "1753-01-01T00:00:00.000+00:00"
                              ? new Date(row.lastCheck)
                                .toISOString()
                                .slice(0, 10)
                              : ""
                          }
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
                          <option value="">No match</option>
                          {/* {periodicityOptions.map((option, id) => (
                            <option key={id} value={option}>
                              {option}
                            </option>
                          ))} */}
                        </select>
                      </td>
                      <td>
                        <Input
                          type="date"
                          value={
                            row.nextVisit &&
                              row.nextVisit !== "1753-01-01T00:00:00.000+00:00"
                              ? new Date(row.nextVisit)
                                .toISOString()
                                .slice(0, 10)
                              : ""
                          }
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
                          <option value="">No match</option>
                          {/* {typeOptions.map((option, id) => (
                            <option key={id} value={option}>
                              {option}
                            </option>
                          ))} */}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* <div className="mt-3 d-flex justify-content-end">
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
                color="primary"
                onClick={handleClick}
              >
                {isCreate ? "Create" : "Update"}
              </Button>
            </div> */}
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
