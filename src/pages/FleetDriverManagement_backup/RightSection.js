import React, { useEffect, useState } from "react";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormFeedback,
} from "reactstrap";
import { options } from "toastr";
import ReactFlatpickr from "react-flatpickr";
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import LoadingOverlay from "react-loading-overlay";
import { FormControl } from "react-bootstrap";

const RightSide = ({
  selectedOrder,
  setSelectedOrder,
  associations,
  handleUpdate,
  isCreate,
  handleDelete,
  commonData,
  errors,
  setErrors,
}) => {
  const performaneOptionsMap = {
    1: "Excellent",
    2: "Alright",
    3: "Good",
    4: "Mean",
    5: "Below average",
  };
  const performaneOptions = [1, 2, 3, 4, 5];

  const licenseTypeOptionsMap = {
    1: "Category AM",
    2: "Category P",
    3: "Category Q",
    4: "Category A1",
    5: "Category A2",
    6: "Category A",
    7: "Category B",
    8: "Category BE",
  };
  const licenseTypeOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  const [deleteModal, setDeleteModal] = useState(false);
  //const [postalData, setPostalData] = useState();

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteClick = () => {
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    handleDelete();
    toggleDeleteModal();
  };

  const handleClick = () => {
    let formValid = true;
    setErrors({
      user: "",
      style: "",
      country: "",
    });
    const newErrors = {};
    if (!selectedOrder.driverId.trim()) {
      formValid = false;
      newErrors.user = "This field is mandatory";
    }

    if (!selectedOrder.styzon.trim()) {
      formValid = false;
      newErrors.style = "This field is mandatory";
    }

    if (!selectedOrder.cry.trim()) {
      formValid = false;
      newErrors.country = "This field is mandatory";
    }

    setErrors(newErrors);
    console.log("errors :", errors);

    if (formValid) {
      handleUpdate();
    }
  };

  // async function fetchPostalDetails() {
  //   try {
  //     let res = await fetch(
  //       `http://localhost:8082/api/v1/fleet/getPostalData?country=${selectedOrder?.cry}`
  //     ).then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Error while getting postal data");
  //       }
  //       return response.json();
  //     });
  //     setPostalData(res.postalData);
  //   } catch (error) {
  //     console.log("Error while getting postal data");
  //   }
  // }

  // useEffect(() => {
  //   fetchPostalDetails();
  // }, []);

  // useEffect(() => {
  //   fetchPostalDetails();
  // }, [selectedOrder?.cry]);

  const onChangeDriverId = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      driverId: e.target.value,
    });

    if (e.target.value.trim()) {
      setErrors({
        ...errors,
        user: "",
      });
    } else {
      setErrors({
        ...errors,
        user: "This field is mandatory",
      });
    }
  };

  const onChangeDriver = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      driver: e.target.value,
    });
  };

  const handleActiveCheckboxChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      active: selectedOrder.active === 2 ? 1 : 2,
    });
  };

  const handleSalesRepCheckboxChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xsalerep: selectedOrder.xsalerep === 2 ? 1 : 2,
    });
  };

  const handleDriverCheckboxChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xdriver: selectedOrder.xdriver === 2 ? 1 : 2,
    });
  };

  const handleSupervisorCheckboxChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      x10csupflg: selectedOrder.x10csupflg === 2 ? 1 : 2,
    });
  };

  const onChangeCarrier = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      bptnum: e.target.value,
    });
  };

  const onChangeBusinessLine = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xbus: e.target.value,
    });
  };

  const onChangePrimaryLang = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      lanmain: e.target.value,
    });
  };

  const onChangeBirthDate = (date) => {
    setSelectedOrder({
      ...selectedOrder,
      bir: format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
    });
  };

  const onChangeLastMedicalVisit = (date) => {
    setSelectedOrder({
      ...selectedOrder,
      lastvime: format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
    });
  };

  const onChangeDeliveredBy = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      delivby: e.target.value,
    });
  };

  const onChangeTripsPerDay = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xnooftrips: Number(e.target.value),
    });
  };

  const onChangePerformance = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      xper: Number(selectedOption.value),
    });
  };

  const onChangeLicenseNum = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      licenum: e.target.value,
    });
  };

  const onChangeLicenseDate = (date) => {
    setSelectedOrder({
      ...selectedOrder,
      licedat: format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
    });
  };

  const onChangeLicenseType = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      licetyp: Number(selectedOption.value),
    });
  };

  const onChangeValidityDate = (date) => {
    setSelectedOrder({
      ...selectedOrder,
      validat: format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
    });
  };

  const onChangeBreakStartTime = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setSelectedOrder({
      ...selectedOrder,
      xlncstarttim: rawValue,
    });
  };

  const onChangeBreakEndTime = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setSelectedOrder({
      ...selectedOrder,
      xlncdur: rawValue,
    });
  };

  const onChangeAddressLine1 = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      bpaaddlig0: e.target.value,
    });
  };

  const onChangeAddressLine2 = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      bpaaddlig1: e.target.value,
    });
  };

  const onChangeAddressLine3 = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      bpaaddlig2: e.target.value,
    });
  };

  const onChangeStyle = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      styzon: selectedOption.value,
    });
    // if (e.target.value.trim()) {
    //   setErrors({
    //     ...errors,
    //     style: "",
    //   });
    // } else {
    //   setErrors({
    //     ...errors,
    //     style: "This field is mandatory",
    //   });
    // }
  };

  const onChangeUnavailable = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      xuvycod: selectedOption.value,
    });
  };

  const onChangeCountry = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      cry: selectedOption.value,
    });
    // if (e.target.value.trim()) {
    //   setErrors({
    //     ...errors,
    //     country: "",
    //   });
    // } else {
    //   setErrors({
    //     ...errors,
    //     country: "This field is mandatory",
    //   });
    // }
  };

  const onChangeCity = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      cty: e.target.value,
    });
  };

  const onChangePostalCode = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      poscod: e.target.value,
    });
  };

  const onChangeState = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      sat: e.target.value,
    });
  };

  const onChangeTelephone = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      tel: e.target.value,
    });
  };

  const onChangeMobile = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      mob: e.target.value,
    });
  };

  const onChangeEmail = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      web: e.target.value,
    });
  };

  const onChangePassword = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xpwd: e.target.value,
    });
  };

  const onChangeNote = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      note: e.target.value,
    });
  };

  const onChangeSeniority = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      x1cunion: Number(e.target.value),
    });
  };

  const onChangeOverTimeHours = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      x1coverhrs: Number(e.target.value),
    });
  };

  const onChangeMaxHoursDay = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xmaxhrsday: Number(e.target.value),
    });
  };

  const onChangeMaxHoursWeek = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xmaxhrsweek: Number(e.target.value),
    });
  };

  const onChangeDownTimeHours = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xdriverhrs: Number(e.target.value),
    });
  };

  const onChangeSite = (selectedOption) => {
    // console.log(e,"this is value site check")
    setSelectedOrder({
      ...selectedOrder,
      fcy: selectedOption.value,
    });
  };

  const handleChangeBusinessLine = (selectedOption) => {
    // console.log(e,"this is value site check")
    setSelectedOrder({
      ...selectedOrder,
      xbus: selectedOption.value,
    });
  };

  const handleChangeLanguage = (selectedOption) => {
    // console.log(e,"this is value site check")
    setSelectedOrder({
      ...selectedOrder,
      lanmain: selectedOption.value,
    });
  };

  const onChangeControls = (control) => {
    if (control === "skip") {
      setSelectedOrder({
        ...selectedOrder,
        xskpcon: selectedOrder.xskpcon === 2 ? 1 : 2,
      });
    } else if (control === "res") {
      setSelectedOrder({
        ...selectedOrder,
        xrescon: selectedOrder.xrescon === 1 ? 2 : 1,
      });
    } else if (control === "qty") {
      setSelectedOrder({
        ...selectedOrder,
        xqtychgcon: selectedOrder.xqtychgcon === 1 ? 2 : 1,
      });
    } else if (control === "spot") {
      setSelectedOrder({
        ...selectedOrder,
        xspotcon: selectedOrder.xspotcon === 1 ? 2 : 1,
      });
    } else if (control === "invoice") {
      setSelectedOrder({
        ...selectedOrder,
        xsihcon: selectedOrder.xsihcon === 1 ? 2 : 1,
      });
    } else if (control === "pay") {
      setSelectedOrder({
        ...selectedOrder,
        xpaycon: selectedOrder.xpaycon === 1 ? 2 : 1,
      });
    } else if (control === "geo") {
      setSelectedOrder({
        ...selectedOrder,
        xgeocon: selectedOrder.xgeocon === 1 ? 2 : 1,
      });
    } else if (control === "cdl") {
      setSelectedOrder({
        ...selectedOrder,
        xcondriv: selectedOrder.xcondriv === 1 ? 2 : 1,
      });
    } else if (control === "lh") {
      setSelectedOrder({
        ...selectedOrder,
        xlonghaul: selectedOrder.xlonghaul === 1 ? 2 : 1,
      });
    } else if (control === "mon") {
      setSelectedOrder({
        ...selectedOrder,
        x10cmon: selectedOrder.x10cmon === 1 ? 2 : 1,
      });
    } else if (control === "tue") {
      setSelectedOrder({
        ...selectedOrder,
        x10ctues: selectedOrder.x10ctues === 1 ? 2 : 1,
      });
    } else if (control === "wed") {
      setSelectedOrder({
        ...selectedOrder,
        x10cwed: selectedOrder.x10cwed === 1 ? 2 : 1,
      });
    } else if (control === "thu") {
      setSelectedOrder({
        ...selectedOrder,
        x10cthu: selectedOrder.x10cthu === 1 ? 2 : 1,
      });
    } else if (control === "fri") {
      setSelectedOrder({
        ...selectedOrder,
        x10cfri: selectedOrder.x10cfri === 1 ? 2 : 1,
      });
    } else if (control === "sat") {
      setSelectedOrder({
        ...selectedOrder,
        x10csat: selectedOrder.x10csat === 1 ? 2 : 1,
      });
    } else if (control === "sun") {
      setSelectedOrder({
        ...selectedOrder,
        x10csun: selectedOrder.x10csun === 1 ? 2 : 1,
      });
    } else if (control === "allVehCls") {
      setSelectedOrder({
        ...selectedOrder,
        xallvehicle: selectedOrder.xallvehicle === 1 ? 2 : 1,
      });
    }
  };

  const formatTime = (value) => {
    if (value.length === 4) {
      const hours = value.slice(0, 2);
      const minutes = value.slice(2, 4);
      return `${hours}:${minutes}`;
    }
    return value;
  };

  const handleDocumentListChange = (index, field, value) => {
    // Check if selectedOrder.driverIds is empty
    const newRows =
      selectedOrder.driverIds.length > 0
        ? [...selectedOrder.documentList]
        : [
            {
              docNum: "",
              docType: "",
              expiration: "",
              issuingAuthority: "",
              issuingDate: "",
            
            },
          ];

    // Update the specified field of the object at the given index
    if (!newRows[index]) {
      newRows[index] = {
        docNum: "",
        docType: "",
        expiration: "",
        issuingAuthority: "",
        issuingDate: "",
      }; // Add a new object if the index does not exist
    }

    newRows[index][field] = value;

    // Update the state with the modified driverIds array
    setSelectedOrder({
      ...selectedOrder,
      documentList: newRows,
    });
  };

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
                ? "Create New Driver"
                : `Update Driver : ${selectedOrder?.driverId}`}
            </h5>
            <div className="mt-5 responsive-form">
              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="driverId">User ID *</Label>
                <FormControl
                  type="text"
                  name="driverId"
                  id="driverId"
                  value={selectedOrder.driverId}
                  readOnly={!isCreate}
                  onChange={onChangeDriverId}
                  required
                  isInvalid={!!errors.user}
                />
                <FormControl.Feedback type="invalid">
                  {errors.user}
                </FormControl.Feedback>
              </FormGroup>

              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="user">User</Label>
                <Input
                  type="text"
                  name="user"
                  id="user"
                  value={selectedOrder.driver}
                  onChange={onChangeDriver}
                />
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="site">Site</Label>
                {/* <Input
                  type="select"
                  name="site"
                  id="site"
                  value={selectedOrder.fcy || ""}
                  onChange={onChangeSite}
                  placeholder="Select"
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
                  id="site"
                  name="site"
                  value={
                    commonData?.siteList.find(
                      (option) => option.value === selectedOrder.fcy
                    ) || null
                  }
                  onChange={(selectedOption) => onChangeSite(selectedOption)}
                  options={commonData?.siteList}
                  placeholder="Select"
                  isClearable
                  // styles={customStyles}
                />
              </FormGroup>

              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.active === 2 ? true : false}
                    onChange={handleActiveCheckboxChange}
                  />
                  Active
                </Label>
              </FormGroup>

              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.xsalerep === 2 ? true : false}
                    onChange={handleSalesRepCheckboxChange}
                  />
                  Sales Rep
                </Label>
              </FormGroup>

              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.xdriver === 2 ? true : false}
                    onChange={handleDriverCheckboxChange}
                  />
                  Driver
                </Label>
              </FormGroup>

              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.x10csupflg === 2 ? true : false}
                    onChange={handleSupervisorCheckboxChange}
                  />
                  Supervisor
                </Label>
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="carrier">Carrier</Label>
                {/* <Input
                  type="select"
                  name="carrier"
                  id="carrier"
                  value={selectedOrder.bptnum || ""}
                  onChange={onChangeCarrier}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {commonData?.carrierList.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.value + " (" + option.label + ")"}
                    </option>
                  ))}
                </Input> */}

                <Select
                  id="carrier"
                  name="carrier"
                  value={
                    commonData?.carrierList.find(
                      (option) => option.value === selectedOrder.bptnum
                    ) || null
                  }
                  // onChange={onChangeCareer}
                  options={commonData?.carrierList}
                  placeholder="Select"
                  isClearable
                  // styles={customStyles}
                />
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="busLine">Business Line</Label>
                {/* <Input
                  type="select"
                  name="busLine"
                  id="busLine"
                  value={selectedOrder.xbus || ""}
                  onChange={onChangeBusinessLine}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {commonData?.businessLineList.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.value + " (" + option.label + ")"}
                    </option>
                  ))}
                </Input> */}

                <Select
                  name="busLine"
                  id="busLine"
                  value={
                    commonData?.businessLineList.find(
                      (opt) => opt.value === selectedOrder.xbus
                    ) || null
                  }
                  onChange={handleChangeBusinessLine}
                  options={commonData?.businessLineList}
                  placeholder="Select"
                  isClearable
                />
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="plang">Primary language</Label>
                {/* <Input
                  type="select"
                  name="plang"
                  id="plang"
                  value={selectedOrder.lanmain || ""}
                  onChange={onChangePrimaryLang}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {commonData?.languageList.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.value + " (" + option.label + ")"}
                    </option>
                  ))}
                </Input> */}

                <Select
                  name="plang"
                  id="plang"
                  value={
                    commonData?.languageList.find(
                      (opt) => opt.value === selectedOrder.lanmain
                    ) || null
                  }
                  onChange={handleChangeLanguage}
                  options={commonData?.languageList}
                  placeholder="Select"
                  isClearable
                />
              </FormGroup>

              <FormGroup>
                <Label>Birth date</Label>
                <DatePicker
                  id="birthDate"
                  className="form-control"
                  selected={
                    selectedOrder.bir ? new Date(selectedOrder.bir) : null
                  }
                  onChange={onChangeBirthDate}
                  showTimeSelect={false}
                  dateFormat="MM/dd/yyyy"
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="model">Last medical visit</Label>
                <DatePicker
                  id="lastmedvist"
                  className="form-control"
                  selected={
                    selectedOrder.lastvime
                      ? new Date(selectedOrder.lastvime)
                      : null
                  }
                  onChange={onChangeLastMedicalVisit}
                  showTimeSelect={false}
                  dateFormat="MM/dd/yyyy"
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="deliveredBy">Delivered by</Label>
                <Input
                  type="text"
                  name="deliveredBy"
                  value={selectedOrder.delivby}
                  onChange={onChangeDeliveredBy}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="tripsPerDay">Trips per Day</Label>
                <Input
                  type="number"
                  name="tripsPerDay"
                  id="tripsPerDay"
                  value={selectedOrder.xnooftrips}
                  onChange={onChangeTripsPerDay}
                ></Input>
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="xper">Performance</Label>
                {/* <Input
                  type="select"
                  name="xper"
                  id="xper"
                  value={selectedOrder.xper || ""}
                  onChange={onChangePerformance}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {performaneOptions.map((option, i) => (
                    <option key={i} value={option}>
                      {performaneOptionsMap[option]}
                    </option>
                  ))}
                </Input>
                 */}

                <Select
                  name="xper"
                  id="xper"
                  value={
                    commonData?.performanceList.find(
                      (opt) => opt.value == selectedOrder.xper
                    ) || null
                  }
                  onChange={onChangePerformance}
                  options={commonData?.performanceList}
                  placeholder="Select"
                  isClearable
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="licenum">License number</Label>
                <Input
                  type="text"
                  name="licenum"
                  id="licenum"
                  value={selectedOrder.licenum}
                  onChange={onChangeLicenseNum}
                ></Input>
              </FormGroup>

              <FormGroup className="form-item">
                <Label for="licedat">License date</Label>
                <DatePicker
                  id="licedat"
                  className="form-control"
                  selected={
                    selectedOrder.licedat
                      ? new Date(selectedOrder.licedat)
                      : null
                  }
                  onChange={onChangeLicenseDate}
                  showTimeSelect={false}
                  dateFormat="MM/dd/yyyy"
                />
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="licetyp">License Type</Label>
                {/* <Input
                  type="select"
                  name="licetyp"
                  id="licetyp"
                  value={selectedOrder.licetyp || ""}
                  onChange={onChangeLicenseType}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {licenseTypeOptions.map((option, i) => (
                    <option key={i} value={option}>
                      {licenseTypeOptionsMap[option]}
                    </option>
                  ))}
                </Input> */}

                <Select
                  name="licetyp"
                  id="licetyp"
                  value={
                    commonData?.licenseTypeList.find(
                      (opt) => opt.value == selectedOrder.licetyp
                    ) || null
                  }
                  onChange={onChangeLicenseType}
                  options={commonData?.licenseTypeList}
                  placeholder="Select"
                  isClearable
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="validat">Validity Date</Label>
                <DatePicker
                  className="form-control"
                  id="validat"
                  selected={
                    selectedOrder.validat
                      ? new Date(selectedOrder.validat)
                      : null
                  }
                  onChange={onChangeValidityDate}
                  showTimeSelect={false}
                  dateFormat="MM/dd/yyyy"
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="xlncstarttim">Break Start Time</Label>
                <Input
                  type="text"
                  name="xlncstarttim"
                  id="xlncstarttim"
                  value={formatTime(selectedOrder.xlncstarttim)}
                  onChange={onChangeBreakStartTime}
                  maxLength="4"
                ></Input>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="xlncdur">Break End Time</Label>
                <Input
                  type="text"
                  name="xlncdur"
                  id="xlncdur"
                  value={formatTime(selectedOrder.xlncdur)}
                  onChange={onChangeBreakEndTime}
                  maxLength="4"
                ></Input>
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="styzon">Style *</Label>
                {/* <Input
                  type="select"
                  name="styzon"
                  id="styzon"
                  value={selectedOrder.styzon || ""}
                  onChange={onChangeStyle}
                  required
                  isInvalid={!!errors.style}
                  style={{
                    borderColor: errors.style ? "red" : "",
                  }}
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
                {/* {errors.style && (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {errors.style}
                </div>
                )} */}

                <Select
                  name="styzon"
                  id="styzon"
                  value={
                    commonData?.styleList.find(
                      (opt) => opt.value === selectedOrder.styzon
                    ) || null
                  }
                  onChange={onChangeStyle}
                  options={commonData?.styleList.map((opt) => ({
                    value: opt.value,
                    label: `${opt.value} (${opt.label})`,
                  }))}
                  placeholder="Select"
                  isClearable
                />
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="unavailable">Unavailable</Label>
                {/* <Input
                  type="select"
                  name="unavailable"
                  id="unavailable"
                  value={selectedOrder.xuvycod || ""}
                  onChange={onChangeUnavailable}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {commonData?.unAvailableList.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.value + " (" + option.label + ")"}
                    </option>
                  ))}
                </Input> */}

                <Select
                  name="unavailable"
                  id="unavailable"
                  value={
                    commonData?.unAvailableList.find(
                      (opt) => opt.value === selectedOrder.xuvycod
                    ) || null
                  }
                  onChange={onChangeUnavailable}
                  options={commonData?.unAvailableList}
                  placeholder="Select"
                  isClearable
                />
              </FormGroup>

              <FormGroup>
                <Label for="picture">Picture</Label>
                <img src="" alt="trailer image" />
              </FormGroup>
            </div>
            {/* <div className="mt-5">
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
                    checked={selectedOrder.xstomgtcod === 1 ? true : false}
                    onChange={handleStMgCheckboxChange}
                    className="mr-2"
                  />
                  Stock Managed
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="lotManaged"
                    checked={selectedOrder.xlotmgtcod === 1 ? true : false}
                    onChange={handleLtMgCheckboxChange}
                    className="mr-2"
                  />
                  LOT Managed
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="serialManaged"
                    checked={selectedOrder.xseril === 1 ? true : false}
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
                    <th style={{ background: "#CCD6DB" }}>Actions</th>
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
                  {inspections?.map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>
                        <Button size="sm">{index + 1}</Button>
                      </td>
                      <td>
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
                      </td>
                      <td>{row.inspectionType}</td>
                      <td>
                        <Input
                          type="date"
                          value={row.lastCheck}
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
                          value={row.nextVisit}
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
            </div> */}
            <div>
              <h4 className="mt-5 text-bold mt-2">Address Detail</h4>
              <div className="custom-divider"></div>
              <div className="responsive-form">
                <FormGroup className="form-item addressline-input">
                  <Label for="address1">Address line 1</Label>
                  <Input
                    type="text"
                    name="address1"
                    id="address1"
                    value={selectedOrder.bpaaddlig0}
                    onChange={onChangeAddressLine1}
                  ></Input>
                </FormGroup>

                <FormGroup className="form-item addressline-input">
                  <Label for="address2">Address line 2</Label>
                  <Input
                    type="text"
                    name="address2"
                    id="address2"
                    value={selectedOrder.bpaaddlig1}
                    onChange={onChangeAddressLine2}
                  ></Input>
                </FormGroup>

                <FormGroup className="form-item addressline-input">
                  <Label for="address3">Address line 3</Label>
                  <Input
                    type="text"
                    name="address3"
                    id="address3"
                    value={selectedOrder.bpaaddlig2}
                    onChange={onChangeAddressLine3}
                  ></Input>
                </FormGroup>

                <FormGroup className="form-item dropdown-input">
                  <Label for="country">Country *</Label>
                  {/* <Input
                    type="select"
                    name="country"
                    id="country"
                    value={selectedOrder.cry || ""}
                    onChange={onChangeCountry}
                    isInvalid={!!errors.country}
                    style={{
                      borderColor: errors.country ? "red" : "",
                    }}
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
                    name="country"
                    id="country"
                    value={
                      commonData?.countryList.find(
                        (opt) => opt.value === selectedOrder.cry
                      ) || null
                    }
                    onChange={onChangeCountry}
                    options={commonData?.countryList}
                    placeholder="Select"
                    isClearable
                  />
                  {/* {errors.style && (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {errors.country}
                </div>
                )} */}
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="country">Postal Code</Label>
                  <Input
                    type="text"
                    name="pcode"
                    id="pcode"
                    value={selectedOrder.poscod}
                    onChange={onChangePostalCode}
                  ></Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="country">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    value={selectedOrder.cty}
                    onChange={onChangeCity}
                  ></Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="state">State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    value={selectedOrder.sat}
                    onChange={onChangeState}
                  ></Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="telephone">Telephone</Label>
                  <Input
                    type="text"
                    name="telephone"
                    id="telephone"
                    value={selectedOrder.tel}
                    onChange={onChangeTelephone}
                  ></Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="mphone">Mobile Phone</Label>
                  <Input
                    type="text"
                    name="mphone"
                    id="mphone"
                    value={selectedOrder.mob}
                    onChange={onChangeMobile}
                  ></Input>
                </FormGroup>

                <FormGroup className="form-item" style={{ minWidth: "400px" }}>
                  <Label for="email">Email</Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    value={selectedOrder.web}
                    onChange={onChangeEmail}
                  ></Input>
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
                        Document Type
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Issuing Authority
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Document Number
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Issuing Date
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Expiration Date
                      </th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedOrder?.documentList?.length > 0
                      ? selectedOrder.documentList
                      : [
                          {
                            docNum: "",
                            docType: "",
                            expiration: "",
                            issuingAuthority: "",
                            issuingDate: "",
                         
                          },
                        ]
                    ).map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <Button size="sm">{index + 1}</Button>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            // onClick={() =>
                            //   handleOtherDelete(index, "capacities")
                            // }
                            disabled={index === 0}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button>
                        </td>
                        <td>
                          {/* <Input
                            type="text"
                            value={row.docType}
                            // onChange={(e) =>
                            //   handleCapacityChange(
                            //     index,
                            //     "compartment",
                            //     e.target.value
                            //   )
                            // }
                            // onKeyDown={(e) =>
                            //   handleKeyDown(
                            //     index,
                            //     "compartment",
                            //     e,
                            //     "capacities"
                            //   )
                            // }
                          /> */}

                          <Select
                            name="docType"
                            id="docType"
                            value={
                              commonData?.documentTypeList?.find(
                                (opt) => opt.value === selectedOrder.docType
                              ) || null
                            }
                            onChange={(e) =>
                              handleDocumentListChange(
                                index,
                                "docType",
                                e.target.value
                              )
                            }
                            options={commonData?.documentTypeList}
                            formatOptionLabel={(option) => (
                              <div>{option.value}</div>
                            )} // Customize how options are displayed
                            menuPortalTarget={document.body} // Render dropdown in a portal
                            menuPosition="fixed" // Position dropdown absolutely
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
                            }}
                            placeholder="Select"
                            isClearable
                          />
                        </td>
                        <td>
                        
                        <Select
                            name="docType"
                            id="country"
                            value={
                              commonData?.issueAuthList?.find(
                                (opt) => opt.value === selectedOrder.docType
                              ) || null
                            }
                            onChange={(e) =>
                              handleDocumentListChange(
                                index,
                                "issuingAuthority",
                                e.target.value
                              )
                            }
                            options={commonData?.issueAuthList}
                            formatOptionLabel={(option) => (
                              <div>{option.value}</div>
                            )} // Customize how options are displayed
                            menuPortalTarget={document.body} // Render dropdown in a portal
                            menuPosition="fixed" // Position dropdown absolutely
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
                            }}
                            placeholder="Select"
                            isClearable
                          />
                          
                        </td>

                        <td>
                               <Input
                            type="text"
                            value={row.docNum}
                            onChange={(e) =>
                              handleDocumentListChange(
                                index,
                                "docNum",
                                e.target.value
                              )
                            }
                            // onKeyDown={(e) =>
                            //   handleKeyDown(
                            //     index,
                            //     "docNum",
                            //     e,
                            //     "capacities"
                            //   )
                            // }
                          /> 
                        </td>
                        
                        <td>
                               <Input
                            type="text"
                            value={row.issuingDate}
                            onChange={(e) =>
                              handleDocumentListChange(
                                index,
                                "issuingDate",
                                e.target.value
                              )
                            }
                            // onKeyDown={(e) =>
                            //   handleKeyDown(
                            //     index,
                            //     "docNum",
                            //     e,
                            //     "capacities"
                            //   )
                            // }
                          /> 
                        </td>

                        <td>
                               <Input
                            type="text"
                            value={row.expiration}
                            onChange={(e) =>
                              handleDocumentListChange(
                                index,
                                "expiration",
                                e.target.value
                              )
                            }
                            // onKeyDown={(e) =>
                            //   handleKeyDown(
                            //     index,
                            //     "docNum",
                            //     e,
                            //     "capacities"
                            //   )
                            // }
                          /> 
                        </td>

                        
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="mt-3 responsive-form">
                  <FormGroup className="form-item text-input">
                    <Label for="username">User Name</Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      value={selectedOrder.driverId}
                      readOnly
                    ></Input>
                  </FormGroup>

                  <FormGroup className="form-item text-input">
                    <Label for="mphone">Password</Label>
                    <Input
                      type="password"
                      name="pwd"
                      id="pwd"
                      value={selectedOrder.xpwd}
                      onChange={onChangePassword}
                    ></Input>
                  </FormGroup>
                </div>
              </div>
              <div>
                <h4 className="mt-4 text-bold">Controls</h4>
                <div className="custom-divider"></div>
                <div className="responsive-form">
                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.xskpcon === 2}
                        onChange={() => onChangeControls("skip")}
                      />
                      Skip Control
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.xrescon === 2}
                        onChange={() => onChangeControls("res")}
                      />
                      Reschedule Control
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.xqtychgcon === 2}
                        onChange={() => onChangeControls("qty")}
                      />
                      Qty Change Control
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.xspotcon === 2}
                        onChange={() => onChangeControls("spot")}
                      />
                      Spot Sales Control
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.xsihcon === 2}
                        onChange={() => onChangeControls("invoice")}
                      />
                      Invoice Control
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.xpaycon === 2}
                        onChange={() => onChangeControls("pay")}
                      />
                      Payment Control
                    </Label>
                  </FormGroup>
                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.xgeocon === 2}
                        onChange={() => onChangeControls("geo")}
                      />
                      Geocordinates Control
                    </Label>
                  </FormGroup>
                </div>
                <h4 className="mt-5 text-bold">Comments</h4>
                <div className="custom-divider"></div>
                <FormGroup className="form-item">
                  <Label for="mphone">Note</Label>
                  <Input
                    type="textarea"
                    name="note"
                    id="note"
                    value={selectedOrder.note}
                    onChange={onChangeNote}
                    rows="5"
                  ></Input>
                </FormGroup>

                <h4 className="mt-5 text-bold">Site Selection</h4>
                <div className="custom-divider"></div>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center" style={{ color: "black" }}>
                      <th style={{ background: "#CCD6DB" }}></th>
                      <th style={{ background: "#CCD6DB" }}>Actions</th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Site
                      </th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {documentDetails?.map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <Button size="sm">{index + 1}</Button>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() =>
                              handleOtherDelete(index, "capacities")
                            }
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
                              handleKeyDown(
                                index,
                                "compartment",
                                e,
                                "capacities"
                              )
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
                  </tbody> */}
                </Table>
              </div>
              <div>
                <h4 className="mt-5 text-bold mt-2">TMS</h4>
                <div className="custom-divider"></div>
                <div className="responsive-form">
                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.xcondriv === 2}
                        onChange={() => onChangeControls("cdl")}
                      />
                      CDL License class
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.xlonghaul === 2}
                        onChange={() => onChangeControls("lh")}
                      />
                      Long haul
                    </Label>
                  </FormGroup>

                  <FormGroup className="form-item">
                    <Label for="seniority">Seniority</Label>
                    <Input
                      type="number"
                      name="seniority"
                      id="seniority"
                      value={selectedOrder.x1cunion}
                      onChange={onChangeSeniority}
                    ></Input>
                  </FormGroup>

                  <FormGroup className="form-item">
                    <Label for="oth">Over Time Hour's</Label>
                    <Input
                      type="number"
                      name="oth"
                      id="oth"
                      value={selectedOrder.x1coverhrs}
                      onChange={onChangeOverTimeHours}
                    ></Input>
                  </FormGroup>

                  <FormGroup className="form-item">
                    <Label for="maxHD">Max Hours Per Day</Label>
                    <Input
                      type="number"
                      name="maxHD"
                      id="maxHD"
                      value={selectedOrder.xmaxhrsday}
                      onChange={onChangeMaxHoursDay}
                    ></Input>
                  </FormGroup>

                  <FormGroup className="form-item">
                    <Label for="maxHW">Max Hours Per Week</Label>
                    <Input
                      type="number"
                      name="maxHW"
                      id="maxHW"
                      value={selectedOrder.xmaxhrsweek}
                      onChange={onChangeMaxHoursWeek}
                    ></Input>
                  </FormGroup>

                  <FormGroup className="form-item">
                    <Label for="ddh">Driver Downtime Hours</Label>
                    <Input
                      type="number"
                      name="ddh"
                      id="ddh"
                      value={selectedOrder.xdriverhrs}
                      onChange={onChangeDownTimeHours}
                    ></Input>
                  </FormGroup>
                </div>
              </div>
              <div>
                <h4 className="mt-5 text-bold mt-2">Workdays</h4>
                <div className="custom-divider"></div>
                <div className="responsive-form">
                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.x10cmon === 2}
                        onChange={() => onChangeControls("mon")}
                      />
                      Monday
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.x10ctues === 2}
                        onChange={() => onChangeControls("tue")}
                      />
                      Tuesday
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.x10cwed === 2}
                        onChange={() => onChangeControls("wed")}
                      />
                      Wednesday
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.x10cthu === 2}
                        onChange={() => onChangeControls("thu")}
                      />
                      Thursday
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.x10cfri === 2}
                        onChange={() => onChangeControls("fri")}
                      />
                      Friday
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.x10csat === 2}
                        onChange={() => onChangeControls("sat")}
                      />
                      Saturday
                    </Label>
                  </FormGroup>

                  <FormGroup check className="form-item checkbox-input">
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder.x10csun === 2}
                        onChange={() => onChangeControls("sun")}
                      />
                      Sunday
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="mt-5">
                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.xallvehicle === 2}
                      onChange={() => onChangeControls("allVehCls")}
                    />
                    All Vehicle Classes
                  </Label>
                </FormGroup>
                <h4 className="mt-2 text-bold">Vehicle Class</h4>
                <div className="custom-divider"></div>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center" style={{ color: "black" }}>
                      <th style={{ background: "#CCD6DB" }}></th>
                      <th style={{ background: "#CCD6DB" }}>Actions</th>
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
                        Description
                      </th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {documentDetails?.map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <Button size="sm">{index + 1}</Button>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() =>
                              handleOtherDelete(index, "capacities")
                            }
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
                              handleKeyDown(
                                index,
                                "compartment",
                                e,
                                "capacities"
                              )
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
                  </tbody> */}
                </Table>
              </div>
              <div>
                <h4 className="mt-5 text-bold mt-2">Unavailable Days</h4>
                <div className="custom-divider"></div>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center" style={{ color: "black" }}>
                      <th style={{ background: "#CCD6DB" }}></th>
                      <th style={{ background: "#CCD6DB" }}>Actions</th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Start Date
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        End Date
                      </th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {documentDetails?.map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <Button size="sm">{index + 1}</Button>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() =>
                              handleOtherDelete(index, "capacities")
                            }
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
                              handleKeyDown(
                                index,
                                "compartment",
                                e,
                                "capacities"
                              )
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
                  </tbody> */}
                </Table>
              </div>
            </div>
            <div className="mt-5 d-flex justify-content-end">
              {!isCreate && (
                <Button
                  className="mr-2"
                  color="danger"
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
          <p>Select a driver to view details</p>
        )}
      </CardBody>
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal} centered>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the driver: {selectedOrder?.driverId}?
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
