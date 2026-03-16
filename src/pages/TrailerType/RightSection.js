import React, { useState, useRef } from "react";
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
import AddBoxIcon from "@mui/icons-material/AddBox";
import HomeIcon from "@mui/icons-material/Home";
import { toast } from "react-toastify";


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

  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);


  const [activeTab, setActiveTab] = useState("home");
  const fileInputRef = useRef(null);

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

  const handleCheckboxChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      xenaflg: selectedOrder.xenaflg === 2 ? 1 : 2,
    });
  };

  const onChangeNoOfAxle = (e) => {
    const value = e.target.value;
    setSelectedOrder((prev) => ({
      ...prev,
      xaxlnbr: value === "" ? null : parseInt(value),
    }));
  };

  const onChangeMaxWeight = (e) => {
    const val = e.target.value;
    setSelectedOrder({
      ...selectedOrder,
      xmaxcapw: val === "" ? "" : Number(val),
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
      xdes: e.target.value,
    });
  };

  // const onChangeTrailerCode = (e) => {
  //   setSelectedOrder({
  //     ...selectedOrder,
  //     trailerCode: e.target.value,
  //   });
  //   if (e.target.value.trim()) {
  //     setError("");
  //   } else {
  //     setError("This field is mandatory");
  //   }
  // };


  const onChangeTrailerCode = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      trailerCode: e.target.value,
    });

  };


  const confirmDelete = () => {
    handleDelete();
    toggleDeleteModal();
  };

  const handleChangeTypeList = (selectedOption) => {
    setSelectedOrder((prev) => ({
      ...(prev || {}),
      xtyp: selectedOption ? Number(selectedOption.value) : null,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64DataUrl = reader.result;
        const base64Only = base64DataUrl.split(",")[1];

        setSelectedOrder((prevState) => ({
          ...prevState,
          ximg: base64Only,
        }));

        // Reset file input so re-selecting the same image works
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file: ", error);
      };
    }
  };


  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsArrayBuffer(file);

  //     reader.onload = () => {
  //       const binaryArray = new Uint8Array(reader.result);
  //       const base64Image = btoa(String.fromCharCode(...binaryArray));
  //       setSelectedOrder((prevState) => ({
  //         ...prevState,
  //         ximg: base64Image,
  //       }));
  //     };

  //     reader.onerror = (error) => {
  //       console.error("Error reading file: ", error);
  //     };
  //   }
  // };

  // const handleRemoveImage = () => {
  //   setSelectedOrder((prevState) => ({
  //     ...prevState,
  //     ximg: "",
  //   }));
  // };
  const handleRemoveImage = () => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      ximg: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };


  const handleAllProductCatChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      xall: selectedOrder.xall === 2 ? 1 : 2,
      productCategoryList: [],
    });
  };




  const addTableRow = (table) => {
    if (table === "prodCategory") {
      const newRows = [...selectedOrder.productCategoryList];
      const lastRow = newRows[newRows.length - 1];

      // 🔹 Check if all required fields are filled
      const allFieldsFilled = lastRow?.value?.trim() !== "";

      const newEmptyRow = { label: "", value: "" };

      if (allFieldsFilled) {
        // ✅ Add new row
        setSelectedOrder((prev) => ({
          ...prev,
          productCategoryList: [...prev.productCategoryList, newEmptyRow],
        }));
        setError(""); // Clear error
      } else {
        // ❌ Show error toast if fields are empty
        setError("Please fill all the fields in Category Table");
        toast.error("Please fill the required fields before adding a new row");
      }
    }
  };


  // const addTableRow = (table) => {
  //   if (table === "prodCategory") {
  //     const newRows = [...selectedOrder.productCategoryList];
  //     const lastRow = newRows[newRows.length - 1];

  //     // 🔹 Validation
  //     const allFieldsFilled = lastRow?.value?.trim() !== "";

  //     const newEmptyRow = { label: "", value: "" };

  //     if (allFieldsFilled) {
  //       setSelectedOrder((prev) => ({
  //         ...prev,
  //         productCategoryList: [...prev.productCategoryList, newEmptyRow],
  //       }));
  //       setError(""); // ✅ Clear error if valid
  //     } else {
  //       setError("Please fill all the fields in Category Table"); // ✅ Set error like trailerCode
  //     }
  //   }
  // };

  const handleInputChange = (index, option) => {
    const { label, value } = option || {};

    const newRows = [...selectedOrder.productCategoryList];
    newRows[index] = { ...newRows[index], label: label || "", value: value || "" };

    setSelectedOrder({
      ...selectedOrder,
      productCategoryList: newRows,
    });


    console.log(newRows, "this is new rows 217");
    // 🔹 Validation like trailerCode
    if (value?.trim()) {
      setError("");
    } else {
      setError(["Product Category is mandatory"]);
    }
  };




  // const addTableRow = (table) => {
  //   if (table === "prodCategory") {
  //     const newRows = [...selectedOrder.productCategoryList];
  //     const lastRow = newRows[newRows.length - 1];
  //     console.log(lastRow, "this is last row checking");
  //     const allFieldsFilled = ["value"].every(
  //       (key) => lastRow[key]?.trim() !== ""
  //     );

  //     const newEmptyRow = {
  //       label: "",
  //       value: "",
  //     };

  //     if (allFieldsFilled) {
  //       setSelectedOrder((prev) => ({
  //         ...prev,
  //         productCategoryList: [...prev.productCategoryList, newEmptyRow],
  //       }));
  //     } else {
  //       toast.error("Please fill all the fields in Category Table", {
  //         autoClose: 5000,
  //         position: "top-right",
  //       });
  //     }
  //   }
  // };

  // const handleInputChange = (index, option) => {
  //   console.log("prodchange ", index, option);

  //   const { label, value } = option;

  //   const newRows = [...selectedOrder.productCategoryList];
  //   newRows[index] = {
  //     ...newRows[index],
  //     label: label,
  //     value: value,
  //   };

  //   setSelectedOrder({
  //     ...selectedOrder,
  //     productCategoryList: newRows,
  //   });
  // };

  const handleDeleteCategory = (index) => {
    const newRows = selectedOrder.productCategoryList.filter(
      (_, i) => i !== index
    );

    setSelectedOrder((prev) => ({
      ...prev,
      productCategoryList: newRows,
    }));

    // ✅ Show success toast
    toast.error("Category deleted successfully", {
      autoClose: 3000,
      position: "top-right",
    });
  };



  // const handleDeleteCategory = (index) => {
  //   if (index === 0) return;

  //   const newRows = selectedOrder.productCategoryList.filter(
  //     (_, i) => i !== index
  //   );

  //   setSelectedOrder((prev) => ({
  //     ...prev,
  //     productCategoryList: newRows,
  //   }));
  // }

  console.log(selectedOrder, "selected order in vehicleclass");
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

              <div
                style={{ display: "flex", gap: 50, fontSize: "1.2rem" }}
              // className="pl-2 bg-light"
              >
                <a
                  href="#Home"
                  style={{
                    color: activeTab === "home" ? "green" : "black",
                    borderBottom: activeTab === "home" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  onClick={(e) => handleScrollTo(e, "home")}
                >
                  <HomeIcon />
                </a>
                <a
                  style={{
                    color: activeTab === "classDetails" ? "green" : "black",
                    borderBottom:
                      activeTab === "classDetails" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  href="#classDetails"
                  onClick={(e) => handleScrollTo(e, "classDetails")}
                >
                  Class Details
                </a>
                <a
                  style={{
                    color: activeTab === "controls" ? "green" : "black",
                    borderBottom:
                      activeTab === "controls" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  href="#controls"
                  onClick={(e) => handleScrollTo(e, "controls")}
                >
                  Controls
                </a>
              </div>
            </div>
            <h4 id="home" className="mt-3 text-bold">
              Home
            </h4>
            <div className="custom-divider"></div>
            <div className="mt-2 responsive-form">
              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="classCode">
                  Trailer Code
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
                <FormControl
                  type="text"
                  name="classCode"
                  id="classCode"
                  value={selectedOrder.trailerCode}
                  readOnly={!isCreate}
                  onChange={onChangeTrailerCode}
                  required
                  isInvalid={Array.isArray(error) ? error.includes("Trailer code") : !!error}
                />
                <FormControl.Feedback type="invalid">
                  {Array.isArray(error) && error.includes("Trailer code") && "Trailer code is mandatory"}
                </FormControl.Feedback>

              </FormGroup>

              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={selectedOrder.xdes}
                  onChange={onChangeDesc}
                />
              </FormGroup>

              {/* Checkbox */}
              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.xenaflg === 2 ? true : false}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Active
                </Label>
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="type">Type</Label>
                <Select
                  options={commonData?.typeList}
                  value={
                    // commonData?.typeList.find(
                    //   (option) => option.value == selectedOrder.xtyp
                    // ) || null
                    selectedOrder?.xtyp
                      ? commonData?.typeList.find(option => option.value === selectedOrder.xtyp) : null
                  }
                  onChange={handleChangeTypeList}
                  placeholder="Select"
                  isClearable
                />
              </FormGroup>

              {/* <FormGroup className="form-item dropdown-input">
                <Label for="noOfAxle">Number of axle</Label>
                <Input
                  type="number"
                  name="noOfAxle"
                  id="noOfAxle"
                  value={selectedOrder.xaxlnbr}
                  onChange={onChangeNoOfAxle}
                  min="0"
                  className="no-spinner"
                />
              </FormGroup> */}
              <FormGroup className="form-item dropdown-input">
                <Label for="noOfAxle">Number of axle</Label>
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
                  value={
                    selectedOrder?.xaxlnbr === 0 || selectedOrder?.xaxlnbr == null
                      ? ""
                      : selectedOrder?.xaxlnbr
                  }
                  onChange={onChangeNoOfAxle}
                  onKeyDown={(e) => {
                    if (['-', 'e', '+', 'E'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxWeight">Maximum Weight</Label>
                <style>
                  {`
                    #maxWeight::-webkit-inner-spin-button, 
                    #maxWeight::-webkit-outer-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                    }
                    #maxWeight {
                      -moz-appearance: textfield;
                      appearance: textfield;
                    }
                  `}
                </style>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxWeight"
                    id="maxWeight"
                    value={
                      isCreate && selectedOrder?.xmaxcapw === 0
                        ? ""
                        : selectedOrder?.xmaxcapw ?? ""
                    }
                    onChange={onChangeMaxWeight}
                    onKeyDown={(e) => {
                      if (['-', 'e', '+', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <span className="unit-suffix">{selectedOrder?.xmaxunit}</span>
                </div>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxVolume">Maximum Volume</Label>
                <style>
                  {`
                    #maxVolume::-webkit-inner-spin-button, 
                    #maxVolume::-webkit-outer-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                    }
                    #maxVolume {
                      -moz-appearance: textfield;
                      appearance: textfield;
                    }
                  `}
                </style>
                <div className="input-with-suffix">
                  <Input
                    type="number"
                    name="maxVolume"
                    id="maxVolume"
                    value={
                      isCreate && selectedOrder?.xmaxcapv === 0
                        ? ""
                        : selectedOrder?.xmaxcapv ?? ""
                    }
                    onChange={onChangeMaxVolume}
                    onKeyDown={(e) => {
                      if (['-', 'e', '+', 'E'].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <span className="unit-suffix">{selectedOrder.xmaxvunit}</span>
                </div>
              </FormGroup>

              <FormGroup>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <Label for="picture">Picture</Label>
                  </div>

                  <div>
                    {/* Hidden file input */}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="picture"
                      name="picture"
                      innerRef={fileInputRef}
                      style={{ display: "none" }}
                    />

                    {/* Image preview */}
                    <div>
                      <img
                        style={{ height: "150px", width: "350px" }}
                        className="img-fluid card-img-top ml-2"
                        src={
                          selectedOrder.ximg
                            ? `data:image/jpeg;base64,${selectedOrder.ximg}`
                            : "https://via.placeholder.com/350x150?text=No+Image"
                        }
                        alt={selectedOrder.trailerCode || "Trailer"}
                      />
                    </div>

                    {/* File select and remove buttons */}
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

            </div>
            <div className="mt-5">
              <h4 id="classDetails" className="mb-4 text-bold">
                Class Details
              </h4>
              <Table responsive striped bordered hover>
                <thead>
                  <tr className="text-center" style={{ color: "black" }}>
                    <th style={{ background: "#CCD6DB" }}></th>
                    <th
                      className="text-nowrap"
                      style={{ background: "#CCD6DB" }}
                    >
                      Vehicle Class
                    </th>
                    <th
                      className="text-nowrap"
                      style={{ background: "#CCD6DB" }}
                    >
                      Max allowed Weight
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
                      Max allowed Volume
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
                  {selectedOrder.trailerClassList?.map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>
                        <Button size="sm">{index + 1}</Button>
                      </td>
                      <td>{row.vehicleClass}</td>
                      <td>{row.weight}</td>
                      <td>{row.weightUOM}</td>
                      <td>{row.weightUOMDesc}</td>
                      <td>{row.volume}</td>
                      <td>{row.volumeUOM}</td>
                      <td>{row.volumeUOMDesc}</td>
                      <td>{row.nbAxle}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-between">
              <h4 id="controls" className="text-bold mt-5">
                Controls
              </h4>
              {/* {selectedOrder.allCategoryFlag!==2 && <AddBoxIcon
          onClick={()=>addTableRow("productcategory")} style={{ cursor:"pointer", fontSize: "40px"}}/>} */}
            </div>
            <div className="custom-divider"></div>

            <div className="my-3 d-flex justify-content-between">
              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder?.xall == 2 ? true : false}
                    onChange={handleAllProductCatChange}
                  />
                  All Categories
                </Label>
              </FormGroup>
              <AddBoxIcon
                onClick={() => addTableRow("prodCategory")}
                style={{ cursor: "pointer", fontSize: "40px" }}
              />
            </div>

            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center" style={{ color: "black" }}>
                  <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                  <th style={{ background: "#CCD6DB" }}>Actions</th>
                  <th className="text-nowrap" style={{ background: "#CCD6DB" }}>
                    Product Category<span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </th>
                  <th style={{ background: "#CCD6DB" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {(selectedOrder?.productCategoryList?.length > 0
                  ? selectedOrder.productCategoryList
                  : [{ value: "", label: "", description: "" }])
                  .map((row, index) => (
                    <tr key={index} className="text-center">
                      {/* Sr.No */}
                      <td>
                        <Button type="button" size="sm">{index + 1}</Button>
                      </td>

                      {/* Actions */}
                      <td>


                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDeleteCategory(index)}
                          disabled={
                            !Object.values(selectedOrder?.productCategoryList[index] || {}).some(
                              (val) => val !== "" && val !== null && val !== undefined
                            )
                          }
                          style={{
                            opacity: !Object.values(selectedOrder?.productCategoryList[index] || {}).some(
                              (val) => val !== "" && val !== null && val !== undefined
                            )
                              ? 0.4
                              : 1,
                            cursor: !Object.values(selectedOrder?.productCategoryList[index] || {}).some(
                              (val) => val !== "" && val !== null && val !== undefined
                            )
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button>

                        {/* <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDeleteCategory(index)}
                          disabled={
                            !Object.values(selectedOrder?.productCategoryList[index] || {}).every(
                              (val) => val !== "" && val !== null && val !== undefined
                            )
                          }
                          style={{
                            opacity: !Object.values(selectedOrder?.productCategoryList[index] || {}).every(
                              (val) => val !== "" && val !== null && val !== undefined
                            )
                              ? 0.4
                              : 1,
                            cursor: !Object.values(selectedOrder?.productCategoryList[index] || {}).every(
                              (val) => val !== "" && val !== null && val !== undefined
                            )
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button> */}




                        {/* <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDeleteCategory(index)}
                          disabled={selectedOrder?.productCategoryList.length <= 1}
                          style={{
                            opacity: selectedOrder?.productCategoryList.length <= 1 ? 0.4 : 1,
                            cursor: selectedOrder?.productCategoryList.length <= 1 ? "not-allowed" : "pointer",
                          }}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button> */}
                      </td>

                      {/* Product Category */}
                      <td>
                        <FormGroup className="mb-0" style={{ minWidth: "250px" }}>
                          <Select
                            id={`productCategory-${index}`}
                            name="productCategory"
                            options={commonData?.categoryList?.filter(
                              (option) =>
                                !selectedOrder?.productCategoryList
                                  ?.filter((_, i) => i !== index)
                                  ?.some((selected) => selected?.value === option?.value)
                            )}
                            value={
                              commonData?.categoryList?.find(
                                (option) => option.value === row?.value
                              ) || null
                            }
                            onChange={(selectedOption) =>
                              handleInputChange(index, selectedOption || "")
                            }
                            placeholder="Select Customer"
                            isClearable
                            formatOptionLabel={(option) => <div>{option.value}</div>}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                            isDisabled={selectedOrder?.xall === 2}
                            className={
                              error.includes("Product category") && !row?.value
                                ? "is-invalid"
                                : ""
                            }
                          />
                          {error.includes("Product category") && !row?.value && (
                            <small className="text-danger">Product category is mandatory</small>
                          )}
                        </FormGroup>
                      </td>

                      {/* Description */}
                      <td>
                        <FormGroup className="mb-0">
                          <FormControl
                            type="text"
                            placeholder="Enter Description"
                            value={row?.description || ""}
                            onChange={(e) => {
                              const updated = [...selectedOrder.productCategoryList];
                              updated[index].description = e.target.value;
                              setSelectedOrder({
                                ...selectedOrder,
                                productCategoryList: updated,
                              });
                            }}
                            disabled={selectedOrder?.xall === 2}
                          />
                        </FormGroup>
                      </td>
                    </tr>
                  ))}
              </tbody>

            </Table>
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
