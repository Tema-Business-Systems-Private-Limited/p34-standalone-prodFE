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
import ReactFlatpickr from "react-flatpickr";
import zIndex from "@mui/material/styles/zIndex";
const RightSide = ({
  selectedOrder,
  setSelectedOrder,
  isCreate,
  commonData,
  handleUpdate,
  handleDeleteVeh,
}) => {
  const [routeRenewals, setRouteRenewals] = useState([
    {
      site: "",
      name: "",
      servicetime: "",
    },
  ]);

  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const [odometerReadngHistory, setOdometerReadngHistory] = useState([
    {
      meterReading: "",
      date: "",
      time: "",
      transactionNum: "",
      source: "",
    },
  ]);

  const [serviceScheduleHistory, setServiceScheduleHistory] = useState([
    {
      service: "",
      servicDate: "",
      cost: "",
      currency: "",
      servicetrancatiionCode: "",
      status: "",
    },
  ]);

  const [Drivers, setDrivers] = useState([
    {
      loaderId: "",
      driver: "",
    },
  ]);

  const [Customers, setCustomers] = useState([
    {
      customer: "",
      companyname: "",
    },
  ]);

  const [ProductCategory, setProductCategory] = useState([
    {
      category: "",
      description: "",
    },
  ]);

  const handleCheckboxAllCustomers = () => {
    setSelectedOrder({
      ...selectedOrder,
      allCustomerFlag: selectedOrder.allCustomerFlag === 2 ? 1 : 2,
    });
  };

  const handleCheckboxAllDriverChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      allDriverFlag: selectedOrder.allDriverFlag === 2 ? 1 : 2,
    });
  };

  const handleAllProductCatChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      allCategoryFlag: selectedOrder.allCategoryFlag === 2 ? 1 : 2,
    });
  };

  // const handleInputChange = (index, field, value) => {
  //   const newRows = [...routeRenewals];
  //   newRows[index][field] = value;
  //   setRouteRenewals(newRows);
  // };
  const handleInputChange = (index, field, value) => {
    const newRows = [...selectedOrder.routeRenewalsList];
    newRows[index][field] = value;

    setSelectedOrder({
      ...selectedOrder,
      routeRenewalsList: newRows,
    });
  };

  //   const handleDriverInputChange = (index, field, value) => {
  // //     const newRows = [...selectedOrder.driverIds];

  // //     console.log(newRows ,"handle drivrer change")
  // //     newRows[index][field] = value;
  // //     // setDrivers(newRows);
  // // // console.log(  index, field,value ,"whiat is this ")
  // //     setSelectedOrder({
  // //       ...selectedOrder,
  // //       driverIds: newRows,
  // //     });

  //   };

  const handleDriverInputChange = (index, field, value) => {
    // Check if selectedOrder.driverIds is empty
    const newRows =
      selectedOrder.driverIds.length > 0
        ? [...selectedOrder.driverIds]
        : [{ id: "", desc: "" }];

    // Update the specified field of the object at the given index
    if (!newRows[index]) {
      newRows[index] = { id: "", desc: "" }; // Add a new object if the index does not exist
    }

    newRows[index][field] = value;

    // Update the state with the modified driverIds array
    setSelectedOrder({
      ...selectedOrder,
      driverIds: newRows,
    });
  };

  // customr input change
  const handleCustomerInputChange = (index, field, value) => {
    const newRows =
      selectedOrder.customerIds.length > 0
        ? [...selectedOrder.customerIds]
        : [{ id: "", desc: "" }];

    if (!newRows[index]) {
      newRows[index] = { id: "", desc: "" }; // Add a new object if the index does not exist
    }

    newRows[index][field] = value;

    setSelectedOrder({
      ...selectedOrder,
      customerIds: newRows,
    });

    // const newRows = [...Customers];
    // newRows[index][field] = value;
    // setCustomers(newRows);
  };

  //Odometer reading history

  const handleOdometerHistoryChange = (index, field, value) => {
    const newRows = [...odometerReadngHistory];
    newRows[index][field] = value;
    setOdometerReadngHistory(newRows);
  };

  // serviceScheduleHistory

  const handleServiceScheduleHistoryChange = (index, field, value) => {
    const newRows = [...serviceScheduleHistory];
    newRows[index][field] = value;
    setServiceScheduleHistory(newRows);
  };

  // product cat input change

  const handleProductCatInputChange = (index, field, value) => {
    const newRows =
      selectedOrder.categoryIds.length > 0
        ? [...selectedOrder.categoryIds]
        : [{ id: "", desc: "" }];

    // Update the specified field of the object at the given index
    if (!newRows[index]) {
      newRows[index] = { id: "", desc: "" }; // Add a new object if the index does not exist
    }

    newRows[index][field] = value;

    // Update the state with the modified driverIds array
    setSelectedOrder({
      ...selectedOrder,
      categoryIds: newRows,
    });

    // const newRows = [...ProductCategory];
    // newRows[index][field] = value;
    // setProductCategory(newRows);
  };

  const handleKeyDown = (index, field, event, val) => {
    console.log(index, field, event, val, "these are values");
    // for route renewals
    // if (val === "routerenewals") {
    //   if (
    //     event.key === "Tab" &&
    //     index === routeRenewals.length - 1 &&
    //     field === "servicetime"
    //   ) {
    //     console.log(index, field, event, "this is handle key down add vehicle");
    //     const newRows = [...routeRenewals];
    //     const lastRow = newRows[newRows.length - 1];
    //     const allFieldsFilled = Object.values(lastRow).every(
    //       (val) => val.trim() !== ""
    //     );

    //     if (allFieldsFilled) {
    //       setRouteRenewals([
    //         ...newRows,
    //         {
    //           site: "",
    //           name: "",
    //           servicetime: "",
    //         },
    //       ]);
    //     }
    //   }
    // }

    // servicetime
    // console.log(val,)
    // console.log(index, field, event, "this is handle key down add vehicle");
    // console.log(index === selectedOrder.routeRenewalsList.length - 1,"what is this")
    if (val === "routerenewals") {
      if (event.key === "Tab" && field === "servicetime") {
        const newRows = [...selectedOrder.routeRenewalsList];
        const lastRow = newRows[newRows.length - 1];

        // Only add a new row if all fields are filled

        const newEmptyRow = {
          site: "",
          name: "",
          serviceTime: "",
        };

        setSelectedOrder((prev) => ({
          ...prev,
          routeRenewalsList: [...prev.routeRenewalsList, newEmptyRow],
        }));
      }
    }

    // for drivers
    if (val === "drivers") {
      if (event.key === "Tab" && field === "driver") {
        console.log(index, field, event, "this is handle key down add vehicle");
        const newRows = [...selectedOrder.driverIds];
        // const lastRow = newRows[newRows.length - 1];
        // const allFieldsFilled = Object.values(lastRow).every(
        //   (val) => val.trim() !== ""
        // );

        const newEmptyRow = {
          id: "",
          desc: "",
        };
        setSelectedOrder((prev) => ({
          ...prev,
          driverIds: [...prev.driverIds, newEmptyRow],
        }));
      }
    }

    // for customers
    if (val === "customers") {
      if (event.key === "Tab" && field === "desc") {
        const newEmptyRow = {
          id: "",
          desc: "",
        };
        setSelectedOrder((prev) => ({
          ...prev,
          customerIds: [...prev.customerIds, newEmptyRow],
        }));
      }
    }
    // for product categories
    if (val === "productcategory") {
      console.log(
        index,
        field,
        event,
        val,
        "these are values inside product category"
      );
      if (event.key === "Tab" && field === "desc") {
        // window.alert("hii category entered if")
        const newEmptyRow = {
          id: "",
          desc: "",
        };
        setSelectedOrder((prev) => ({
          ...prev,
          categoryIds: [...prev.categoryIds, newEmptyRow],
        }));
      }
    }

    if (val === "odometerReadingHistory") {
      if (
        event.key === "Tab" &&
        index === odometerReadngHistory.length - 1 &&
        field === "source"
      ) {
        const newRows = [...odometerReadngHistory];
        const lastRow = newRows[newRows.length - 1];
        const allFieldsFilled = Object.values(lastRow).every(
          (val) => val.trim() !== ""
        );

        if (allFieldsFilled) {
          setOdometerReadngHistory([
            ...newRows,
            {
              meterReading: "",
              date: "",
              time: "",
              transactionNum: "",
              source: "",
            },
          ]);
        }
      }
    }

    if (val === "serviseScheculeHistory") {
      if (
        event.key === "Tab" &&
        index === serviceScheduleHistory.length - 1 &&
        field === "status"
      ) {
        const newRows = [...serviceScheduleHistory];
        const lastRow = newRows[newRows.length - 1];
        const allFieldsFilled = Object.values(lastRow).every(
          (val) => val.trim() !== ""
        );

        if (allFieldsFilled) {
          setServiceScheduleHistory([
            ...newRows,
            {
              service: "",
              servicDate: "",
              cost: "",
              currency: "",
              servicetrancatiionCode: "",
              status: "",
            },
          ]);
        }
      }
    }
  };

  // handle delete functionality

  const handleDelete = (index, val) => {
    if (val === "routeRenewals") {
      if (index === 0) return; // Prevent deletion of the first row

      const newRows = selectedOrder.routeRenewalsList.filter(
        (_, i) => i !== index
      );

      setSelectedOrder((prev) => ({
        ...prev,
        routeRenewalsList: newRows,
      }));
    }

    if (val === "drivers") {
      // const newRows = Drivers.filter((_, i) => i !== index);
      // setDrivers(newRows);

      if (index === 0) return; // Prevent deletion of the first row

      const newRows = selectedOrder.driverIds.filter((_, i) => i !== index);

      setSelectedOrder((prev) => ({
        ...prev,
        driverIds: newRows,
      }));
    }

    if (val === "customers") {
      // const newRows = Customers.filter((_, i) => i !== index);
      // setCustomers(newRows);

      if (index === 0) return; // Prevent deletion of the first row

      const newRows = selectedOrder.customerIds.filter((_, i) => i !== index);

      setSelectedOrder((prev) => ({
        ...prev,
        customerIds: newRows,
      }));
    }

    if (val === "productcategory") {
      // const newRows = ProductCategory.filter((_, i) => i !== index);
      // setProductCategory(newRows);

      if (index === 0) return; // Prevent deletion of the first row

      const newRows = selectedOrder.categoryIds.filter((_, i) => i !== index);

      setSelectedOrder((prev) => ({
        ...prev,
        categoryIds: newRows,
      }));
    }

    if (val === "odometerReadingHistory") {
      const newRows = odometerReadngHistory.filter((_, i) => i !== index);
      setOdometerReadngHistory(newRows);
    }

    if (val === "serviseScheculeHistory") {
      const newRows = serviceScheduleHistory.filter((_, i) => i !== index);
      setServiceScheduleHistory(newRows);
    }
  };

  const onChangeCode = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      code: e.target.value,
    });
  };

  const onChangeLicancePlate = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      registration: e.target.value,
    });
  };

  const onChangeTrailer = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      trailer: e.target.value,
    });
  };

  const onChangeEngicc = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      engineCC: e.target.value,
    });
  };

  const handleChangeChesisnum = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      chasisNum: e.target.value,
    });
  };

  const handleChangePerformance = (selectedOption) => {
    // window.alert(e.target.value)
    setSelectedOrder({
      ...selectedOrder,
      performance: selectedOption ? Number(selectedOption.value) : "",
    });
  };

  const handleChangeVehClass = (selectedOption) => {
    // window.alert(e.target.value)
    setSelectedOrder({
      ...selectedOrder,
      vehicleClass: selectedOption ? selectedOption.value : "",
    });
  };

  const handleChangeUnavailableList = (selectedOption) => {
    // window.alert(e.target.value)
    setSelectedOrder({
      ...selectedOrder,
      unavailable: selectedOption ? selectedOption.value : "",
    });
  };

  const onChangeYearMfg = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      yearOfManufacture: e.target.value,
    });
  };

  const handeChangeInsYear = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      insuranceAmountYearly: e.target.value,
    });
  };

  const handleChangeroaYear = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      roadTaxAmountYearly: e.target.value,
    });
  };

  const handleChangeEmptyMass = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      emptyVehicleMass: e.target.value,
    });
  };

  const handleGroMasChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      grossVehicleMass: e.target.value,
    });
  };

  const handleToleranceChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      tolerance: e.target.value,
    });
  };

  const handleChangeSkillCriteria = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      skillCriteria: e.target.value,
    });
  };

  const handleLoadingTimeChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      loadingTime: e.target.value,
    });
  };

  const handleOffLoadingTimeChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      offloadingTime: e.target.value,
    });
  };

  const earliestStartTimeChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      earliestStartTime: e.target.value,
    });
  };

  const latestStartChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      latestStartTime: e.target.value,
    });
  };

  const handleAvilableHrsChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      latestStartTime: e.target.value,
    });
  };

  const handlecostPerUnitOverTimeChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      costPerUnitOverTime: e.target.value,
    });
  };

  const handleCostPerUnitDistChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      costPerUnitOverTime: e.target.value,
    });
  };

  const handleChangeCostPerUnitT = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      costPerUnitTime: e.target.value,
    });
  };

  const handleChangeFixedCost = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      fixedCost: e.target.value,
    });
  };

  const handleMaxTotalDistChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      totalMaxDistance: e.target.value,
    });
  };

  const handleMaxTotalTimeChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxTotalTime: e.target.value,
    });
  };

  const handleMaxTotalTravelTimeChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxTotalTravelTime: e.target.value,
    });
  };

  const handleChangeMaxSpeedPerHr = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxSpeed: e.target.value,
    });
  };

  const maxAllowdWeightChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxAllowedWeight: e.target.value,
    });
  };

  const handleMaxAllVolChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxAllowedVolume: e.target.value,
    });
  };

  const quantityChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      quantity: e.target.value,
    });
  };

  const maxOrderCouChanage = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxOrderCount: e.target.value,
    });
  };

  const handleMaxPalletChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xnbpallet: e.target.value,
    });
  };

  const handleStackHeightChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      stackHeight: e.target.value,
    });
  };

  const handleSurfaceSolChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      surfaceSol: e.target.value,
    });
  };

  const handleVehFuelCapacityChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      vehicleFuelCapacity: e.target.value,
    });
  };

  const handleActVehChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      activeFlag: selectedOrder.activeFlag == 2 ? 1 : 2,
    });
  };

  const onChangeLastInseption = (date) => {
    setSelectedOrder({
      ...selectedOrder,
      lastUpdateDate: date[0].toISOString,
    });
  };

  const handleLastUpdatedTime = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      lastUpdateTime: e.target.value,
    });
  };

  const handleReferenceChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      reference: e.target.value,
    });
  };

  const onChangeDriverDate = (date) => {
    setSelectedOrder({
      ...selectedOrder,
      date: date[0].toISOString,
    });
  };

  const onChangeDriverTime = (time) => {
    setSelectedOrder({
      ...selectedOrder,
      time: time,
    });
  };

  const handleCo2CoefChange = (value) => {
    setSelectedOrder({
      ...selectedOrder,
      co2Coef: value,
    });
  };
  console.log(
    selectedOrder,
    "this is selected order checking for creating new order"
  );

  const handleChangeSite = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      site: selectedOption ? selectedOption.value : "",
    });
  };

  const handleChangeStartDepotSite = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      startdepotn: selectedOption ? selectedOption.value : "",
    });
  };

  const handleChangeEndDepotSite = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      enddepotname: selectedOption ? selectedOption.value : "",
    });
  };

  const handleChangeCareer = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      carrier: selectedOption ? selectedOption.value : "",
    });
  };

  const handleChangeFuelType = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      fuelType: selectedOption ? Number(selectedOption.value) : "",
    });
  };
  const handleChangeOwonership = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      ownership: selectedOption ? Number(selectedOption.value) : "",
    });
  };

  const handleChangeStyle = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      style: selectedOption ? selectedOption.value : "",
    });

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
  };

  const handleClick = () => {
    let formValid = true;

    // const newErrors = {};
    // if (!selectedOrder.driverId.trim()) {
    //   formValid = false;
    //   newErrors.user = "This field is mandatory";
    // }

    // if (!selectedOrder.styzon.trim()) {
    //   formValid = false;
    //   newErrors.style = "This field is mandatory";
    // }

    // if (!selectedOrder.cry.trim()) {
    //   formValid = false;
    //   newErrors.country = "This field is mandatory";
    // }

    // setErrors(newErrors);
    // console.log("errors :", errors);

    if (formValid) {
      handleUpdate();
    }
  };

  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteClick = () => {
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    handleDeleteVeh();
    toggleDeleteModal();
  };

  const ensureRowInState = (index) => {
    if (selectedOrder.routeRenewalsList.length <= index) {
      setSelectedOrder((prev) => ({
        ...prev,
        routeRenewalsList: [
          ...prev.routeRenewalsList,
          { site: "", name: "", serviceTime: "" },
        ],
      }));
    }
  };

  console.log(commonData, "this is common data check in right section");
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
              style={{ textAlign: "left" }}
            >
              {isCreate ? "Create New Vehicle " : `Update Vehicle`}
            </h5>
            <div className="responsive-form">
              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="typeOfOrder">Code</Label>
                <Input
                  type="text"
                  name="typeOfOrder"
                  id="typeOfOrder"
                  value={selectedOrder.code}
                  onChange={onChangeCode}
                />
              </FormGroup>

              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="order">License Plate</Label>
                <Input
                  type="text"
                  name="order"
                  id="order"
                  value={selectedOrder.registration}
                  onChange={onChangeLicancePlate}
                />
              </FormGroup>

              {/* Dropdown */}
              {/* <FormGroup className="form-item dropdown-input">
                <Label for="orderSite">Site</Label>
                <Input
                  type="select"
                  name="orderSite"
                  id="orderSite"
                  value={selectedOrder.fcy}
                >
                  <option>{selectedOrder.fcy}</option>
                </Input>
              </FormGroup> */}

              {/* <FormGroup className="form-item dropdown-input">
                <Label for="orderSite">Site</Label>
                <Input
                  type="select"
                  name="orderSite"
                  id="orderSite"
                  value={selectedOrder.fcy}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      fcy: e.target.value,
                    })
                  }
                >
                  {commonData.siteList && commonData.siteList.length > 0 ? (
                    commonData.siteList.map((site) => (
                      <option key={site.value} value={site.value}>
                        {site.value} ({site.label})
                      </option>
                    ))
                  ) : (
                    <option disabled>No sites available</option>
                  )}
                </Input>
              </FormGroup> */}
              <FormGroup className="form-item dropdown-input">
                <Label for="orderSite">Site</Label>

                {/* <Select
                  id="orderSite"
                  name="orderSite"
                  options={commonData?.siteList} // Provide options to React Select
                  value={commonData?.siteList?.find(
                    (option) => option.value === selectedOrder.site
                  )} // Set selected value
                  onChange={handleChangeSite} // Handle selection change
                  placeholder="Select a site"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )} // Customize how options are displayed
                /> */}

                <Select
                  id="orderSite"
                  name="orderSite"
                  options={commonData?.siteList} // Provide options to React Select
                  value={
                    selectedOrder.site
                      ? commonData?.siteList?.find(
                          (option) => option.value === selectedOrder.site
                        )
                      : null
                  } // Set selected value or null for an empty field
                  onChange={handleChangeSite} // Handle selection change
                  placeholder="Select a site"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )} // Customize how options are displayed
                />
              </FormGroup>

              {/* Checkbox */}
              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.activeFlag == 2 ? true : false}
                    onChange={handleActVehChange}
                  />{" "}
                  Active
                </Label>
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="owonership">Owonership</Label>
                {/* <Input
                  type="select"
                  name="owonership"
                  id="owonership"
                  value={selectedOrder.ownership}
                >
                  <option>{selectedOrder.ownership}</option>
                </Input> */}

                <Select
                  id="owonership"
                  name="owonership"
                  options={commonData?.ownerShipList} // Provide options to React Select
                  value={commonData?.ownerShipList?.find(
                    (option) => option.value == selectedOrder.ownership
                  )} // Set selected value
                  onChange={handleChangeOwonership} // Handle selection change
                  placeholder="please select owonership"
                  isClearable // Allows clearing the selection
                />
              </FormGroup>

              {/* Dropdown */}
              <FormGroup className="form-item dropdown-input">
                <Label for="vehicleClass">Vehicle Class</Label>
                {/* <Input
                  type="select"
                  name="vehicleClass"
                  id="vehicleClass"
                  value={selectedOrder.vehicleClass}
                >
                  <option>{selectedOrder.vehicleClass}</option>
                </Input> */}

                <Select
                  id="performance"
                  name="performance"
                  options={commonData?.vehicleClassList} // Provide options to React Select
                  value={commonData?.vehicleClassList?.find(
                    (option) => option.value == selectedOrder.vehicleClass
                  )} // Set selected value
                  onChange={handleChangeVehClass} // Handle selection change
                  placeholder="Select vehicle class"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )} // Customize how options are displayed
                />

                {/* vehicleClassList */}
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="trailer">Trailer</Label>
                <Input
                  type="text"
                  name="trailer"
                  id="trailer"
                  value={selectedOrder.trailer}
                  onChange={onChangeTrailer}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <div style={{display:"flex",flexDirection:"column"}}>
                  <div >
                    <Label for="picture">Picture</Label>
                  </div>
                  {/* <img src={selectedOrder.image} alt="vehicle image" /> */}

                  <div>
                    <img
                      style={{ height: "150px", width: "350px" }}
                      className="img-fluid card-img-top ml-2"
                      src={`data:image/jpeg;base64,${
                        selectedOrder.image && selectedOrder.image
                      }`}
                      alt={selectedOrder.code}
                    />
                  </div>
                </div>
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="Carrier">Carrier</Label>
                {/* <Input
                  type="select"
                  name="Carrier"
                  id="Carrier"
                  value={selectedOrder.bptNum}
                >
                  <option>{selectedOrder.bptNum}</option>
                </Input> */}

                <Select
                  id="career"
                  name="career"
                  options={commonData?.carrierList} // Provide options to React Select
                  value={commonData?.carrierList?.find(
                    (option) => option.value === selectedOrder.carrier
                  )} // Set selected value
                  onChange={handleChangeCareer} // Handle selection change
                  placeholder="Select a career"
                  isClearable // Allows clearing the selection
                />
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="Carrier">Start Depot Name</Label>
                {/* <Input
                  type="select"
                  name="Carrier"
                  id="Carrier"
                  value={selectedOrder.bptNum}
                >
                  <option>{selectedOrder.bptNum}</option>
                </Input> */}

                {/* <Select
                  id="startDepotName"
                  name="startDepotName"
                  // options={} // Provide options to React Select
                  // value={} // Set selected value
                  // onChange={handleChangeCareer} // Handle selection change
                  placeholder="Select start Depot Name"
                  isClearable // Allows clearing the selection
                /> */}

                <Select
                  id="startDepotName"
                  name="startDepotName"
                  options={commonData?.siteList} // Provide options to React Select
                  value={commonData?.siteList?.find(
                    (option) => option.value === selectedOrder.startDepotName
                  )} // Set selected value
                  onChange={handleChangeStartDepotSite} // Handle selection change
                  placeholder="Select start depot site"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )} // Customize how options are displayed
                />
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="Carrier">End Depot Name</Label>
                {/* <Input
                  type="select"
                  name="Carrier"
                  id="Carrier"
                  value={selectedOrder.bptNum}
                >
                  <option>{selectedOrder.bptNum}</option>
                </Input> */}

                {/* <Select
                  id="endDepotName"
                  name="endDepotName"
                  // options={} // Provide options to React Select
                  // value={} // Set selected value
                  // onChange={handleChangeCareer} // Handle selection change
                  placeholder="Select end Depot Name"
                  isClearable // Allows clearing the selection
                /> */}

                <Select
                  id="endDepotName"
                  name="endDepotName"
                  options={commonData?.siteList} // Provide options to React Select
                  value={commonData?.siteList?.find(
                    (option) => option.value === selectedOrder.endDepotName
                  )} // Set selected value
                  onChange={handleChangeEndDepotSite} // Handle selection change
                  placeholder="Select End Depot Site"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )} // Customize how options are displayed
                />

                {/* enddepotname */}
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="Fuel">Fuel type</Label>
                {/* <Input
                  type="select"
                  name="Fuel"
                  id="Fuel"
                  value={selectedOrder.fuelType}
                >
                  <option>{selectedOrder.fuelType}</option>
                </Input> */}

                <Select
                  id="Fuel"
                  name="Fuel"
                  options={commonData?.fuelTypeList} // Provide options to React Select
                  value={commonData?.fuelTypeList?.find(
                    (option) => option.value == selectedOrder.fuelType
                  )} // Set selected value
                  onChange={handleChangeFuelType} // Handle selection change
                  placeholder="Select a fuel type"
                  isClearable // Allows clearing the selection
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  value={selectedOrder.location}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="enginecc">Engine CC</Label>
                <Input
                  type="text"
                  name="enginecc"
                  id="enginecc"
                  value={selectedOrder.engineCC}
                  onChange={onChangeEngicc}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="chassisNumber">Chassis number</Label>
                <Input
                  type="text"
                  name="chassisNumber"
                  id="chassisNumber"
                  value={selectedOrder.chasisNum}
                  onChange={handleChangeChesisnum}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="yearOfManufacture">Year of Manufacture</Label>
                <Input
                  type="text"
                  name="yearOfManufacture"
                  id="yearOfManufacture"
                  value={selectedOrder.yearOfManufacture}
                  onChange={onChangeYearMfg}
                />
              </FormGroup>
              {/* 
              <FormGroup>
                <Label>Date</Label>
                <DatePicker />
              </FormGroup> */}

              <FormGroup className="form-item dropdown-input">
                <Label for="performance">Performance</Label>
                {/* <Input
                  type="select"
                  name="performance"
                  id="performance"
                  value={selectedOrder.performance}
                >
                  <option>{selectedOrder.performance}</option>
                </Input> */}

                <Select
                  id="performance"
                  name="performance"
                  options={commonData?.performanceList} // Provide options to React Select
                  value={commonData?.performanceList?.find(
                    (option) => option.value == selectedOrder.performance
                  )} // Set selected value
                  onChange={handleChangePerformance} // Handle selection change
                  placeholder="Select vehicle performance"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={(option) => <div>{option.label}</div>} // Customize how options are displayed
                />

                {/* performanceList */}
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="insuranceAmtYearly">
                  Insurance Amount (Yearly)
                </Label>
                <Input
                  type="text"
                  name="insuranceAmtYearly"
                  id="insuranceAmtYearly"
                  value={selectedOrder.insuranceAmountYearly}
                  onChange={handeChangeInsYear}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="roadTaxAmtYearly">Road tax Amount (Yearly)</Label>
                <Input
                  type="text"
                  name="roadTaxAmtYearly"
                  id="roadTaxAmtYearly"
                  value={selectedOrder.roadTaxAmountYearly}
                  onChange={handleChangeroaYear}
                />
              </FormGroup>

              <FormGroup className="form-item checkbox-input mt-4">
                <Label for="gbp">GBP</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="emptyVehiclemass">Empty vehicle mass</Label>
                <Input
                  type="text"
                  name="emptyVehiclemass"
                  id="emptyVehiclemass"
                  value={selectedOrder.emptyVehicleMass}
                  onChange={handleChangeEmptyMass}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="emptyUnitMass">KG</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="grossVehicleMass">Gross vehicle mass</Label>
                <Input
                  type="text"
                  name="grossVehicleMass"
                  id="grossVehicleMass"
                  value={selectedOrder.grossVehicleMass}
                  onChange={handleGroMasChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="grossVehUnitMass">KG</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="tolerance">Tolerance %</Label>
                <Input
                  type="text"
                  name="tolerance"
                  id="tolerance"
                  value={selectedOrder.tolerance}
                  onChange={handleToleranceChange}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="skillCriteria"> Skill Criteria</Label>
                <Input
                  type="text"
                  name="skillCriteria"
                  id="skillCriteria"
                  value={selectedOrder.skillCriteria}
                  onChange={handleChangeSkillCriteria}
                />
              </FormGroup>

              {/* <div  style={{ border: '1px solid #ddd', margin: '20px 0' }}></div> */}

              {/* Save Button */}
              {/* <div className="form-item button-input">
                <Button color="primary" block>
                  Save Changes
                </Button>
              </div> */}
            </div>
            <h4 className="test-bold">Time</h4>
            <div className="custom-divider"></div>

            <div className="responsive-form">
              <FormGroup className="form-item text-input">
                <Label for="loadingTime">Loading Time</Label>
                <Input
                  type="text"
                  name="loadingTime"
                  id="loadingTime"
                  value={selectedOrder.loadingTime}
                  onChange={handleLoadingTimeChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="loadingTimeUnit">Hours</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="offloadingTime">Offloading Time</Label>
                <Input
                  type="text"
                  name="offloadingTime"
                  id="offloadingTime"
                  value={selectedOrder.offloadingTime}
                  onChange={handleOffLoadingTimeChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="loadingTimeUnit">Hours</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="earliestStartTime">Earliest Start Time</Label>
                <Input
                  type="text"
                  name="earliestStartTime"
                  id="earliestStartTime"
                  value={selectedOrder.earliestStartTime}
                  onChange={earliestStartTimeChange}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="latestStartTime">Latest Start Time</Label>
                <Input
                  type="text"
                  name="latestStartTime"
                  id="latestStartTime"
                  value={selectedOrder.latestStartTime}
                  onChange={latestStartChange}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="startTimeSupp">Available Hours</Label>
                <Input
                  type="text"
                  name="availableHrs"
                  id="availableHrs"
                  value={selectedOrder.latestStartTime}
                  onChange={handleAvilableHrsChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="loadingTimeUnit">Hours</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="costPerUnitOt">Cost Per Unit Overtime</Label>
                <Input
                  type="text"
                  name="costPerUnitOt"
                  id="costPerUnitOt"
                  value={selectedOrder.costPerUnitOverTime}
                  onChange={handlecostPerUnitOverTimeChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="loadingTimeUnit">GBP</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="costPerUnitDist">Cost Per Unit Distance</Label>
                <Input
                  type="text"
                  name="costPerUnitDist"
                  id="costPerUnitDist"
                  value={selectedOrder.costPerUnitOverTime}
                  onChange={handleCostPerUnitDistChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="costPerUnitDistUnit">GBP/Kilometers</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="costPerUnitTime">Cost Per Unit Time</Label>
                <Input
                  type="text"
                  name="costPerUnitTime"
                  id="costPerUnitTime"
                  value={selectedOrder.costPerUnitTime}
                  onChange={handleChangeCostPerUnitT}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="costPerUnitTimeUnit">GBP/Hours</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="fixedCost">Fixed Cost</Label>
                <Input
                  type="text"
                  name="fixedCost"
                  id="fixedCost"
                  value={selectedOrder.fixedCost}
                  onChange={handleChangeFixedCost}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="fixedCostUnit">GBP</Label>
              </FormGroup>
            </div>

            {/* Trip section starts from here */}
            <h4 className="test-bold">Trip</h4>
            <div className="custom-divider"></div>

            <div className="responsive-form">
              <FormGroup className="form-item text-input">
                <Label for="maxTotDist">Total maximum distance</Label>
                <Input
                  type="text"
                  name="maxTotDist"
                  id="maxTotDist"
                  value={selectedOrder.totalMaxDistance}
                  onChange={handleMaxTotalDistChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxTotdistUnit">Kilometers</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxTotTime">Max total time</Label>
                <Input
                  type="text"
                  name="maxTotTime"
                  id="maxTotTime"
                  value={selectedOrder.maxTotalTime}
                  onChange={handleMaxTotalTimeChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxTotTime">Hours</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxTotTravelTime">Max Total Travel Time</Label>
                <Input
                  type="text"
                  name="maxTotTravelTime"
                  id="maxTotTravelTime"
                  value={selectedOrder.maxTotalTravelTime}
                  onChange={handleMaxTotalTravelTimeChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxTotTravelTimeUnit">Hours</Label>
              </FormGroup>
              <FormGroup className="form-item text-input">
                <Label for="maxSpeedPerHr">Maximum speed (per hour)</Label>
                <Input
                  type="text"
                  name="maxSpeedPerHr"
                  id="maxSpeedPerHr"
                  value={selectedOrder.maxSpeed}
                  onChange={handleChangeMaxSpeedPerHr}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxSpeedPerHrKm">Kilometers</Label>
              </FormGroup>
            </div>

            {/* Loading section */}
            <h4 className="test-bold">Loading</h4>
            <div className="custom-divider"></div>

            <div className="responsive-form">
              <FormGroup className="form-item text-input">
                <Label for="maxAllowdedWeight">Max Allowed Weight</Label>
                <Input
                  type="text"
                  name="maxAllowdedWeight"
                  id="maxAllowdedWeight"
                  value={selectedOrder.maxAllowedWeight}
                  onChange={maxAllowdWeightChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxAllowdedWeightUnit">KG</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxAllowdedVol">Max Allowed Volume</Label>
                <Input
                  type="text"
                  name="maxAllowdedVol"
                  id="maxAllowdedVol"
                  value={selectedOrder.maxAllowedVolume}
                  onChange={handleMaxAllVolChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxAllowdedVolUnit">L</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="quantity">Quantity</Label>
                <Input
                  type="text"
                  name="quantity"
                  id="quantity"
                  value={selectedOrder.quantity}
                  onChange={quantityChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="quantityUnit">UN</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxOrderCount">Max Order Count</Label>
                <Input
                  type="text"
                  name="maxOrderCount"
                  id="maxOrderCount"
                  value={selectedOrder.maxOrderCount}
                  onChange={maxOrderCouChanage}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="maxPalletCount">Number of Pallets</Label>
                <Input
                  type="text"
                  name="maxPalletCount"
                  id="maxPalletCount"
                  value={selectedOrder.maxOrderCount}
                  onChange={handleMaxPalletChange}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="stackHeight">Stack Height</Label>
                <Input
                  type="text"
                  name="stackHeight"
                  id="stackHeight"
                  value={selectedOrder.stackHeight}
                  onChange={handleStackHeightChange}
                />
              </FormGroup>

              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="stackHeightUnit">CM</Label>
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="surfaceSol">Surface sol</Label>
                <Input
                  type="text"
                  name="surfaceSol"
                  id="surfaceSol"
                  value={selectedOrder.surfaceSol}
                  onChange={handleSurfaceSolChange}
                />
              </FormGroup>

              {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="surfaceSolUnit">IN</Label>
              </FormGroup> */}

              <FormGroup className="form-item text-input">
                <Label for="vehFuelCap">Vehicle Fuel Capacity</Label>
                <Input
                  type="text"
                  name="vehFuelCap"
                  id="vehFuelCap"
                  value={selectedOrder.vehicleFuelCapacity}
                  onChange={handleVehFuelCapacityChange}
                />
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="vehFuelUnits">Vehicle Fuel Units</Label>
                {/* <Input
                  type="select"
                  name="vehFuelUnits"
                  id="vehFuelUnits"
                  value={selectedOrder.vehicleFuelUnits}
                >
                  <option>{selectedOrder.vehicleFuelUnits}</option>
                </Input> */}

                <Select
                  id="vehFuelUnits"
                  name="vehFuelUnits"
                  options={commonData?.vehicleFuelUnitList} // Provide options to React Select
                  value={commonData?.vehicleFuelUnitList?.find(
                    (option) => option.value === selectedOrder.vehicleFuelUnits
                  )} // Set selected value
                  // onChange={handleChangeSite} // Handle selection change
                  placeholder="Select vehicle fuel unit"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={(option) => (
                    <div>
                      {option.label}({option.value})
                    </div>
                  )} // Customize how options are displayed
                />
              </FormGroup>
            </div>

            <h4 className="test-bold">Driver Allocation</h4>
            <div className="custom-divider"> </div>
            <div className="responsive-form">
              <FormGroup className="form-item text-input">
                <Label for="currAllocDriver">Currently Alloc Driver</Label>
                <Input
                  type="text"
                  name="currAllocDriver"
                  id="currAllocDriver"
                  value={selectedOrder.currentDriver}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Date</Label>
                {/* <DatePicker /> */}

                <ReactFlatpickr
                  value={
                    selectedOrder.date ? new Date(selectedOrder.date) : null
                  }
                  onChange={onChangeDriverDate}
                  id="driverDate"
                  options={{
                    dateFormat: "m/d/Y",
                  }}
                  className="form-control"
                />
              </FormGroup>

              {/* xdate */}

              <FormGroup className="form-item text-input">
                <Label for="driverTime">Time</Label>
                <Input
                  type="text"
                  name="driverTime"
                  id="driverTime"
                  onChange={onChangeDriverTime}
                  value={selectedOrder.time}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="co2coef">co2 coef</Label>
                <Input
                  type="text"
                  name="co2coef"
                  id="co2coef"
                  value={selectedOrder.co2Coef}
                  onChange={handleCo2CoefChange}
                />
              </FormGroup>
              {/* 
              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.active}
                    // onChange={handleCheckboxChange}
                  />{" "}
                  Side Operation
                </Label>
              </FormGroup> */}
            </div>

            {/* Services section */}
            <h4 className="text-bold">Services</h4>
            <div className="custom-divider"></div>
            <div className="responsive-form">
              <FormGroup className="form-item dropdown-input">
                <Label for="Unavailable">Unavailable</Label>
                {/* <Input
                  type="select"
                  name="Unavailable"
                  id="Unavailable"
                  value={selectedOrder.unavailable}
                >
                  <option>{selectedOrder.unavailable}</option>
                </Input> */}

                <Select
                  id="Unavailable"
                  name="Unavailable"
                  options={commonData?.unAvailableList} // Provide options to React Select
                  value={commonData?.unAvailableList?.find(
                    (option) => option.value == selectedOrder.unavailable
                  )} // Set selected value
                  onChange={handleChangeUnavailableList} // Handle selection change
                  placeholder="Unavailable list"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={(option) => <div>{option.label}</div>} // Customize how options are displayed
                />
              </FormGroup>

              {/* <FormGroup className="form-item dropdown-input">
                <Label for="style">Style</Label>
                <Input
                  type="select"
                  name="style"
                  id="style"
                  value={selectedOrder.styzon}
                >
                  <option>{selectedOrder.styzon}</option>
                </Input>
              </FormGroup> */}

              <FormGroup className="form-item dropdown-input">
                <Label for="style">Style</Label>
                {/* <Select
                  id="style"
                  name="style"
                  options={commonData?.styleList} // Provide options to React Select
                  value={commonData?.styleList?.find(
                    (option) => option.value === selectedOrder.style
                  )} // Set selected value
                  // onChange={handleChangeStyle} // Handle selection change
                  placeholder="Select a style"
                  isClearable // Allows clearing the selection
                /> */}

                {/* <Select
                  id="style"
                  name="style"
                  options={commonData?.styleList} // Provide options to React Select
                  value={commonData?.styleList?.find(
                    (option) => option.value === selectedOrder.style
                  )} // Set selected value
                  placeholder="Select a style"
                  isClearable // Allows clearing the selection
                  formatOptionLabel={({ value, label }) => (
                    <div>
                      <strong>{value}</strong> <span>({label})</span>
                    </div>
                  )} // Customize label format with a div
                /> */}

                <Select
                  id="style"
                  name="style"
                  options={commonData?.styleList} // Provide options to React Select
                  value={commonData?.styleList?.find(
                    (option) => option.value === selectedOrder.style
                  )} // Set selected value
                  placeholder="Select a style"
                  isClearable // Allows clearing the selection
                  onChange={handleChangeStyle}
                  formatOptionLabel={({ value, label, style }) => {
                    // Parse the style string into an object
                    const styleObject = style
                      ? Object.fromEntries(
                          style
                            .split(";") // Split the string by semicolon
                            .filter(Boolean) // Remove empty entries
                            .map((item) => {
                              const [key, value] = item
                                .split(":")
                                .map((str) => str.trim()); // Split key and value
                              return [
                                key.replace(/-./g, (match) =>
                                  match[1].toUpperCase()
                                ),
                                value,
                              ]; // Convert CSS property to camelCase
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
              </FormGroup>
            </div>

            <h3 className="text-bold">Controls</h3>
            <h4 className="text-bold mt-2">Route renewals</h4>

            <div className="custom-divider"></div>

            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center" style={{ color: "black" }}>
                  <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                  <th style={{ background: "#CCD6DB" }}>Actions</th>
                  <th className="text-nowrap" style={{ background: "#CCD6DB" }}>
                    Site
                  </th>
                  <th style={{ background: "#CCD6DB" }}>Name</th>
                  <th style={{ background: "#CCD6DB" }}>Service Time</th>
                </tr>
              </thead>
              <tbody>
                {/* {selectedOrder?.routeRenewalsList?.map((row, index) => (
                 <tr key={index} className="text-center">
                <td>
                  <Button size="sm">{index + 1}</Button>
                </td>
                <td>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => handleDelete(index, "routeRenewals")}
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
                      handleInputChange(index, "site", e.target.value)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, "site", e, "routerenewals")
                    }
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={row?.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, "name", e, "routerenewals")
                    }
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={row.serviceTime}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "serviceTime",
                        e.target.value
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(
                        index,
                        "servicetime",
                        e,
                        "routerenewals"
                      )
                    }
                  />
                </td>
              </tr>
                 ))} */}

                {(selectedOrder?.routeRenewalsList?.length > 0
                  ? selectedOrder.routeRenewalsList
                  : [{ site: "", name: "", serviceTime: "" }]
                ).map((row, index) => (
                  <tr key={index} className="text-center">
                    <td>
                      <Button size="sm">{index + 1}</Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => handleDelete(index, "routeRenewals")}
                        disabled={index === 0}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </td>
                    <td>
                      {/* <Input
                        type="text"
                        value={row.site}
                        onChange={(e) =>
                          handleInputChange(index, "site", e.target.value)
                        }
                        onFocus={() => ensureRowInState(index)}
                        onKeyDown={(e) =>
                          handleKeyDown(index, "site", e, "routerenewals")
                        }
                      /> */}

                      {/* <Select
                    
                        id="routeRenewalSite"
                        name="routeRenewalSite"
                        options={commonData.siteList} // Provide options to React Select
                        value={commonData.siteList.find(
                          (option) => option.value === selectedOrder.site
                        )} // Set selected value
                        // onChange={handleChangeSite} // Handle selection change
                        onChange={(e) =>
                          handleInputChange(index, "site", e.target.value)
                        }
                        placeholder="Select a site"
                        isClearable // Allows clearing the selection
                        formatOptionLabel={(option) => (
                          <div>
                            {option.value} ({option.label})
                          </div>
                        )} // Customize how options are displayed
                        menuPortalTarget={document.body} // Render dropdown in a portal
                        // menuPosition="fixed" // Position dropdown absolutely
                        // styles={{
                        //   menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
                        // }}
                        onFocus={() => ensureRowInState(index)}
                        onKeyDown={(e) =>
                          handleKeyDown(index, "site", e, "routerenewals")
                        }
                      /> */}

                      <Select
                        id="routeRenewalSite"
                        name="routeRenewalSite"
                        options={commonData?.siteList} // Provide options to React Select
                        value={commonData?.siteList?.find(
                          (option) =>
                            option.value ===
                            selectedOrder.routeRenewalsList[index]?.site
                        )} // Set selected value based on the current row's site
                        onChange={(selectedOption) =>
                          handleInputChange(
                            index,
                            "site",
                            selectedOption?.value || ""
                          )
                        } // Update site field with the selected value
                        placeholder="Select a site"
                        isClearable // Allows clearing the selection
                        formatOptionLabel={(option) => (
                          <div>{option.value}</div>
                        )} // Customize how options are displayed
                        menuPortalTarget={document.body} // Render dropdown in a portal
                        menuPosition="fixed" // Position dropdown absolutely
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
                        }}
                        onFocus={() => ensureRowInState(index)}
                        onKeyDown={(e) =>
                          handleKeyDown(index, "site", e, "routerenewals")
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row?.name}
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                        onFocus={() => ensureRowInState(index)}
                        onKeyDown={(e) =>
                          handleKeyDown(index, "name", e, "routerenewals")
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        value={row.serviceTime}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "serviceTime",
                            e.target.value
                          )
                        }
                        onFocus={() => ensureRowInState(index)}
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "servicetime",
                            e,
                            "routerenewals"
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h4 className="text-bold mt-2">Drivers</h4>
            <div className="custom-divider"></div>

            <div className="my-3">
              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.allDriverFlag == 2 ? true : false}
                    onChange={handleCheckboxAllDriverChange}
                  />{" "}
                  All Drivers
                </Label>
              </FormGroup>
            </div>
            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center" style={{ color: "black" }}>
                  <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                  <th style={{ background: "#CCD6DB" }}>Actions</th>
                  <th className="text-nowrap" style={{ background: "#CCD6DB" }}>
                    Loader Id
                  </th>
                  <th style={{ background: "#CCD6DB" }}>Driver</th>
                </tr>
              </thead>
              <tbody>
                {(selectedOrder?.driverIds?.length > 0
                  ? selectedOrder.driverIds
                  : [{ desc: "", id: "", desc: "" }]
                ).map((row, index) => (
                  <tr key={index} className="text-center">
                    <td>
                      <Button size="sm">{index + 1}</Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => handleDelete(index, "drivers")}
                        disabled={index === 0}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </td>
                    <td>
                      {/* <Input
                        type="text"
                        value={row.id}
                        onChange={(e) =>
                          handleDriverInputChange(
                            index,
                            "loaderId",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(index, "loaderId", e, "drivers")
                        }
                      /> */}

                      <Select
                        id="driverId"
                        name="routeRenewalSite"
                        options={commonData?.driverList} // Provide options to React Select
                        value={commonData?.driverList?.find(
                          (option) =>
                            option.value === selectedOrder.driverIds[index]?.id
                        )} // Set selected value based on the current row's site
                        onChange={(selectedOption) =>
                          handleDriverInputChange(
                            index,
                            "id",
                            selectedOption.value
                          )
                        } // Update site field with the selected value
                        placeholder="Select driver"
                        isClearable // Allows clearing the selection
                        formatOptionLabel={(option) => (
                          <div>{option.value}</div>
                        )} // Customize how options are displayed
                        menuPortalTarget={document.body} // Render dropdown in a portal
                        menuPosition="fixed" // Position dropdown absolutely
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
                        }}
                        onFocus={() => ensureRowInState(index)}
                        onKeyDown={(e) =>
                          handleKeyDown(index, "site", e, "routerenewals")
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row.desc}
                        onChange={(e) =>
                          handleDriverInputChange(index, "desc", e.target.value)
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(index, "driver", e, "drivers")
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Customer section starts from here */}
            <h4 className="text-bold mt-2">Customers</h4>
            <div className="custom-divider"></div>

            <div className="my-3">
              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.allCustomerFlag == 2 ? true : false}
                    onChange={handleCheckboxAllCustomers}
                  />{" "}
                  All Customers
                </Label>
              </FormGroup>
            </div>
            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center" style={{ color: "black" }}>
                  <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                  <th style={{ background: "#CCD6DB" }}>Actions</th>
                  <th className="text-nowrap" style={{ background: "#CCD6DB" }}>
                    Customer
                  </th>
                  <th style={{ background: "#CCD6DB" }}>Company Name</th>
                </tr>
              </thead>
              <tbody>
                {/* {Customers?.map((row, index) => ( */}
                {(selectedOrder?.customerIds?.length > 0
                  ? selectedOrder.customerIds
                  : [{ id: "", desc: "" }]
                ).map((row, index) => (
                  <tr key={index} className="text-center">
                    <td>
                      <Button size="sm">{index + 1}</Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => handleDelete(index, "customers")}
                        disabled={index === 0}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </td>
                    <td>
                      {/* <Input
                        type="text"
                        value={row.id}
                        onChange={(e) =>
                          handleCustomerInputChange(
                            index,
                            "id",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(index, "customer", e, "customers")
                        }
                      /> */}

                      <Select
                        id="customerId"
                        name="routeRenewalSite"
                        options={commonData?.customerList} // Provide options to React Select
                        value={commonData?.customerList?.find(
                          (option) =>
                            option.value ===
                            selectedOrder.customerIds[index]?.id
                        )} // Set selected value based on the current row's site
                        onChange={(selectedOption) =>
                          handleCustomerInputChange(
                            index,
                            "id",
                            selectedOption.value
                          )
                        } // Update site field with the selected value
                        placeholder="Select Customer"
                        isClearable // Allows clearing the selection
                        formatOptionLabel={(option) => (
                          <div>{option.value}</div>
                        )} // Customize how options are displayed
                        menuPortalTarget={document.body} // Render dropdown in a portal
                        menuPosition="fixed" // Position dropdown absolutely
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
                        }}
                        onFocus={() => ensureRowInState(index)}
                        onKeyDown={(e) =>
                          handleKeyDown(index, "id", e, "customers")
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row.desc}
                        onChange={(e) =>
                          handleCustomerInputChange(
                            index,
                            "desc",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(index, "desc", e, "customers")
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h4 className="text-bold mt-2">Product Category</h4>
            <div className="custom-divider"></div>

            <div className="my-3">
              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.allCategoryFlag == 2 ? true : false}
                    onChange={handleAllProductCatChange}
                  />{" "}
                  All Product Categories
                </Label>
              </FormGroup>
            </div>

            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center" style={{ color: "black" }}>
                  <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                  <th style={{ background: "#CCD6DB" }}>Actions</th>
                  <th className="text-nowrap" style={{ background: "#CCD6DB" }}>
                    Category
                  </th>
                  <th style={{ background: "#CCD6DB" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {(selectedOrder?.categoryIds?.length > 0
                  ? selectedOrder.categoryIds
                  : [{ id: "", desc: "" }]
                ).map((row, index) => (
                  <tr key={index} className="text-center">
                    <td>
                      <Button size="sm">{index + 1}</Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => handleDelete(index, "productcategory")}
                        disabled={index === 0}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </td>
                    <td>
                      {/* <Input
                        type="text"
                        value={row.category}
                        onChange={(e) =>
                          handleProductCatInputChange(
                            index,
                            "category",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(index, "category", e, "productcategory")
                        }
                      /> */}

                      <Select
                        id="procuctCategory"
                        name="procuctCategory"
                        options={commonData?.categoryList} // Provide options to React Select
                        value={commonData?.categoryList?.find(
                          (option) =>
                            option.value ===
                            selectedOrder.categoryIds[index]?.id
                        )} // Set selected value based on the current row's site
                        onChange={(selectedOption) =>
                          handleProductCatInputChange(
                            index,
                            "id",
                            selectedOption.value
                          )
                        } // Update site field with the selected value
                        placeholder="Select Customer"
                        isClearable // Allows clearing the selection
                        formatOptionLabel={(option) => (
                          <div>{option.value}</div>
                        )} // Customize how options are displayed
                        menuPortalTarget={document.body} // Render dropdown in a portal
                        menuPosition="fixed" // Position dropdown absolutely
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
                        }}
                        onFocus={() => ensureRowInState(index)}
                        onKeyDown={(e) =>
                          handleKeyDown(index, "id", e, "productcategory")
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row.desc}
                        onChange={(e) =>
                          handleProductCatInputChange(
                            index,
                            "desc",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(index, "desc", e, "productcategory")
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Loading layout started from here */}
            {/* <h3 className="text-bold">Loading Layout</h3>
            <h4 className="text-bold mt-2">Configuration Chargement</h4>

            <div className="custom-divider"></div>


            <FormGroup className="form-item text-input" style={{width:"150px"}}>
                <Label for="Rows">Rows</Label>
                <Input
                  type="text"
                  name="Rows"
                  id="Rows"
                  //   value={selectedOrder.}
                />
              </FormGroup>

              <FormGroup className="form-item text-input" style={{width:"150px"}}>
                <Label for="Blocks">Blocks</Label>
                <Input
                  type="text"
                  name="Blocks"
                  id="Blocks"
                  //   value={selectedOrder.}
                />
              </FormGroup> */}

            {/* Details section starts form here */}

            <h3 className="text-bold">Details</h3>
            <h4 className="text-bold mt-2">Odometer</h4>
            <div className="custom-divider"></div>

            <div className="responsive-form">
              <FormGroup className="form-item text-input">
                <Label for="currentOdometerReading">
                  Current Odometer Reading
                </Label>
                <Input
                  type="text"
                  name="currentOdometerReading"
                  id="currentOdometerReading"
                  value={selectedOrder.currentOdometerReading}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label for="lastInspection">Latest Updated Date</Label>
                {/* <DatePicker
                value={selectedOrder.xlastdate ? new Date(selectedOrder.xlastdate) : null}
                dateFormat="yyyy-MM-dd" // Customize date format
             
                /> */}

                <ReactFlatpickr
                  value={
                    selectedOrder.lastUpdateDate
                      ? new Date(selectedOrder.lastUpdateDate)
                      : null
                  }
                  onChange={onChangeLastInseption}
                  id="lastInspection"
                  options={{
                    dateFormat: "m/d/Y",
                  }}
                  className="form-control"
                />
              </FormGroup>
              {/* xlastdate */}
              <FormGroup className="form-item text-input">
                <Label for="latestUpdatedTime">Last Updated Time</Label>
                <Input
                  type="text"
                  name="latestUpdatedTime"
                  id="latestUpdatedTime"
                  value={selectedOrder.lastUpdateTime}
                  onChange={handleLastUpdatedTime}
                />
              </FormGroup>
            </div>

            {/* <h4 className="text-bold mt-2">Technicial Inspection</h4> */}
            <div className="custom-divider"></div>

            {/* <div className="responsive-form">
              <FormGroup className="form-item text-input">
                <Label for="Reference">Reference</Label>
                <Input
                  type="text"
                  name="Reference"
                  id="Reference"
                  value={selectedOrder.reference}
                  onChange={handleReferenceChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastInspection">Last inspection</Label>
                <DatePicker />
              </FormGroup>
              <FormGroup>
                <Label for="lastInspection">Expiry inspection</Label>
                <DatePicker />
              </FormGroup>
            </div> */}

            {/* This is vehicle inspection */}
            {/* <h4 className="text-bold mt-2">Vehicle inspection</h4>
            <div className="custom-divider"></div>

            <div className="responsive-form">
              <FormGroup className="form-item dropdown-input">
                <Label for="vehAllInsp">Vehicle Allocation Inspection</Label>
                <Input
                  type="select"
                  name="vehAllInsp"
                  id="vehAllInsp"
                  value={selectedOrder.orderSite}
                >
                  <option>{selectedOrder.orderSite}</option>
                </Input>
              </FormGroup>

              <FormGroup className="form-item dropdown-input">
                <Label for="retuOfInspVeh">
                  Return of the Inspection Vehicle
                </Label>
                <Input
                  type="select"
                  name="retuOfInspVeh"
                  id="retuOfInspVeh"
                  value={selectedOrder.orderSite}
                >
                  <option>{selectedOrder.orderSite}</option>
                </Input>
              </FormGroup>
            </div> */}
            {/* 
            <h4 className="text-bold mt-2">Equipment</h4>
            <div className="custom-divider"></div>

            <div className="responsive-form">
              <FormGroup className="form-item text-input">
                <Label for="gpsTrackId">GPS tracker ID</Label>
                <Input
                  type="text"
                  name="gpsTrackId"
                  id="gpsTrackId"
                  //   value={selectedOrder.}
                />
              </FormGroup>
              <FormGroup className="form-item text-input">
                <Label for="refGmsMob">Ref GMS mobile</Label>
                <Input
                  type="text"
                  name="refGmsMob"
                  id="refGmsMob"
                  //   value={selectedOrder.}
                />
              </FormGroup>
              <FormGroup className="form-item text-input">
                <Label for="trackingWebService">Tracking Web Service</Label>
                <Input
                  type="text"
                  name="trackingWebService"
                  id="trackingWebService"
                  //   value={selectedOrder.}
                />
              </FormGroup>
              <FormGroup className="form-item text-input">
                <Label for="mobRadio">Mobile radio / CB</Label>
                <Input
                  type="text"
                  name="mobRadio"
                  id="mobRadio"
                  //   value={selectedOrder.}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="fireExt">Fire / Extinguisher</Label>
                <Input
                  type="text"
                  name="fireExt"
                  id="fireExt"
                  //   value={selectedOrder.}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <Label for="EquipmentNotes">Equipment notes</Label>

                <Input
                  style={{ height: "150px" }}
                  id="EquipmentNotes"
                  name="EquipmentNotes"
                  type="textarea"
                />
              </FormGroup>
            </div> */}

            {/* Technical Inspection */}

            {/* <h4 className="text-bold mt-2">Technical Inspection</h4>
            <div className="custom-divider"></div>


            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center" style={{color:"black"}}>
                  <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                  <th style={{ background: "#CCD6DB" }}>Actions</th>
                  <th className="text-nowrap" style={{ background: "#CCD6DB" }}>
                   Inspection Type
                  </th>
                  <th style={{ background: "#CCD6DB" }}>Last Check</th>
                  <th style={{ background: "#CCD6DB" }}>Periodicity</th>
                  <th style={{ background: "#CCD6DB" }}>Next Visit</th>
                  <th style={{ background: "#CCD6DB" }}>Type</th>


                </tr>
              </thead>
              <tbody>
                {Drivers?.map((row, index) => (
                  <tr key={index} className="text-center">
                    <td>
                      <Button size="sm">{index + 1}</Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => handleDelete(index, "drivers")}
                        disabled={index === 0}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row.loaderId}
                        onChange={(e) =>
                          handleDriverInputChange(
                            index,
                            "loaderId",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(index, "loaderId", e, "drivers")
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row.driver}
                        onChange={(e) =>
                          handleDriverInputChange(
                            index,
                            "driver",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(index, "driver", e, "drivers")
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table> */}

            {/* <h3 className="text-bold">Transaction History</h3>
            <h4 className="text-bold mt-2">Odometer Reading History</h4>
            <div className="custom-divider"></div>

            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center" style={{ color: "black" }}>
                  <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                  <th style={{ background: "#CCD6DB" }}>Actions</th>
                  <th className="text-nowrap" style={{ background: "#CCD6DB" }}>
                    Site
                  </th>
                  <th style={{ background: "#CCD6DB" }}>Meter Reading</th>
                  <th style={{ background: "#CCD6DB" }}>Date</th>
                  <th style={{ background: "#CCD6DB" }}>Time</th>
                  <th style={{ background: "#CCD6DB" }}>Transaction Number</th>
                  <th style={{ background: "#CCD6DB" }}>Source</th>
                </tr>
              </thead>
              <tbody>
                {odometerReadngHistory?.map((row, index) => (
                  <tr key={index} className="text-center">
                    <td>
                      <Button size="sm">{index + 1}</Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() =>
                          handleDelete(index, "odometerReadingHistory")
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
                          handleOdometerHistoryChange(
                            index,
                            "site",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "site",
                            e,
                            "odometerReadingHistory"
                          )
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row.meterReading}
                        onChange={(e) =>
                          handleOdometerHistoryChange(
                            index,
                            "meterReading",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "meterReading",
                            e,
                            "odometerReadingHistory"
                          )
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row.date}
                        onChange={(e) =>
                          handleOdometerHistoryChange(
                            index,
                            "date",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "date",
                            e,
                            "odometerReadingHistory"
                          )
                        }
                      />
                    </td>

                    <td>
                      <Input
                        type="text"
                        value={row.time}
                        onChange={(e) =>
                          handleOdometerHistoryChange(
                            index,
                            "time",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "time",
                            e,
                            "odometerReadingHistory"
                          )
                        }
                      />
                    </td>

                    <td>
                      <Input
                        type="text"
                        value={row.transactionNum}
                        onChange={(e) =>
                          handleOdometerHistoryChange(
                            index,
                            "transactionNum",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "transactionNum",
                            e,
                            "odometerReadingHistory"
                          )
                        }
                      />
                    </td>

                    <td>
                      <Input
                        type="text"
                        value={row.source}
                        onChange={(e) =>
                          handleOdometerHistoryChange(
                            index,
                            "source",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "source",
                            e,
                            "odometerReadingHistory"
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table> */}
            {/* 
            <h4 className="text-bold mt-2">Service schedule History</h4>
            <div className="custom-divider"></div>

            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center" style={{ color: "black" }}>
                  <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                  <th style={{ background: "#CCD6DB" }}>Actions</th>
                  <th className="text-nowrap" style={{ background: "#CCD6DB" }}>
                    Service
                  </th>
                  <th style={{ background: "#CCD6DB" }}>service Date</th>
                  <th style={{ background: "#CCD6DB" }}>Cost</th>
                  <th style={{ background: "#CCD6DB" }}>Currency</th>
                  <th style={{ background: "#CCD6DB" }}>
                    Service Transaction Code
                  </th>
                  <th style={{ background: "#CCD6DB" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {serviceScheduleHistory?.map((row, index) => (
                  <tr key={index} className="text-center">
                    <td>
                      <Button size="sm">{index + 1}</Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() =>
                          handleDelete(index, "serviseScheculeHistory")
                        }
                        disabled={index === 0}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row.service}
                        onChange={(e) =>
                          handleServiceScheduleHistoryChange(
                            index,
                            "service",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "service",
                            e,
                            "serviseScheculeHistory"
                          )
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row.servicDate}
                        onChange={(e) =>
                          handleServiceScheduleHistoryChange(
                            index,
                            "servicDate",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "servicDate",
                            e,
                            "serviseScheculeHistory"
                          )
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={row.cost}
                        onChange={(e) =>
                          handleServiceScheduleHistoryChange(
                            index,
                            "cost",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "cost",
                            e,
                            "serviseScheculeHistory"
                          )
                        }
                      />
                    </td>

                    <td>
                      <Input
                        type="text"
                        value={row.currency}
                        onChange={(e) =>
                          handleServiceScheduleHistoryChange(
                            index,
                            "currency",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "currency",
                            e,
                            "serviseScheculeHistory"
                          )
                        }
                      />
                    </td>

                    <td>
                      <Input
                        type="text"
                        value={row.servicetrancatiionCode}
                        onChange={(e) =>
                          handleServiceScheduleHistoryChange(
                            index,
                            "servicetrancatiionCode",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "servicetrancatiionCode",
                            e,
                            "serviseScheculeHistory"
                          )
                        }
                      />
                    </td>

                    <td>
                      <Input
                        type="text"
                        value={row.status}
                        onChange={(e) =>
                          handleServiceScheduleHistoryChange(
                            index,
                            "status",
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            index,
                            "status",
                            e,
                            "serviseScheculeHistory"
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            */}
            <div className="mt-3 d-flex justify-content-end">
              {!isCreate && (
                <Button
                  color="danger"
                  className="mr-2"
                  onClick={handleDeleteClick}
                  style={{
                    borderRadius: "50px",
                    padding: "0.4rem 1.5rem",
                  }}
                >
                  Delete
                </Button>
              )}
              <Button
                color="primary"
                // onClick={handleClick}
                onClick={handleClick}
                style={{
                  borderRadius: "50px",
                  padding: "0.4rem 1.5rem",
                }}
              >
                {isCreate ? "Create" : "Update"}
              </Button>
            </div>
          </Form>
        ) : (
          <p>Select a Vehicle to view details</p>
        )}
      </CardBody>

      <Modal isOpen={deleteModal} toggle={toggleDeleteModal} centered>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the Vehicle: {selectedOrder?.code}?
        </ModalBody>
        <ModalFooter>
          <Button
            style={{
              borderRadius: "50px",
              padding: "0.4rem 1.5rem",
            }}
            color="danger"
            onClick={confirmDelete}
          >
            Yes
          </Button>
          <Button
            style={{
              borderRadius: "50px",
              padding: "0.4rem 1.5rem",
            }}
            color="secondary"
            onClick={toggleDeleteModal}
          >
            No
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default RightSide;
