import React, { useState, useRef } from "react";
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
import { FormControl } from "react-bootstrap";
import { useEffect } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RightSide = ({
  selectedOrder,
  setSelectedOrder,
  isCreate,
  commonData,
  handleUpdate,
  handleDeleteVeh,
  errors,
  setErrors,
  validationMessage,
  setValidationMessage,
  showValidationModal,
  setShowValidationModal,
  siteList
}) => {
  const [routeRenewals, setRouteRenewals] = useState([
    {
      site: "",
      name: "",
      servicetime: "",
    },
  ]);


  console.log(errors, "errors checking 49")


  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const [fileInputKey, setFileInputKey] = useState(Date.now());



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

  // scrolling logic

  const containerRef = useRef(null);
  const sectionRefs = {
    section1: useRef(null),
    section2: useRef(null),
    section3: useRef(null),
    section4: useRef(null),
    section5: useRef(null),
  };

  const [activeTab, setActiveTab] = useState("Home");
  let currencyUnit = siteList[0]?.cur;
  let distanceUnit = siteList[0]?.distunit;

  // Scroll to the target section within the cardbody container with a 100px offset
  // const handleScrollTo = (event, id) => {
  //   event.preventDefault(); // Prevent default anchor behavior

  //   const targetElement = document.getElementById(id);
  //   const cardBody = document.getElementById("cardbody"); // The scrollable container



  //   if (targetElement && cardBody) {
  //     // Calculate the position to scroll to inside the container, with a 100px offset
  //     const targetPosition = targetElement.offsetTop - 90;

  //     // Scroll the cardbody container to that position
  //     cardBody.scrollTo({
  //       top: targetPosition,
  //       behavior: "smooth", // Smooth scroll effect
  //     });

  //     setActiveTab(id);
  //   }
  // };


  const handleScrollTo = (event, id) => {
    event.preventDefault();

    const cardBody = document.getElementById("cardbody");
    const targetElement = document.getElementById(id);

    if (!cardBody || !targetElement) return;

    const STICKY_NAV_HEIGHT = 60;   // tabs
    const CARD_MARGIN_BUFFER = 20; // removes previous card shadow/margin

    const containerTop = cardBody.getBoundingClientRect().top;
    const targetTop = targetElement.getBoundingClientRect().top;

    const scrollTop =
      cardBody.scrollTop +
      (targetTop - containerTop) -
      STICKY_NAV_HEIGHT +
      CARD_MARGIN_BUFFER;

    cardBody.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });

    setActiveTab(id);
  };


  const handleCheckboxAllCustomers = () => {
    setSelectedOrder({
      ...selectedOrder,
      allCustomerFlag: selectedOrder.allCustomerFlag === 2 ? 1 : 2,
      customerIds: [],
    });
  };

  const handleCheckboxAllDriverChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      allDriverFlag: selectedOrder.allDriverFlag === 2 ? 1 : 2,
      driverIds: [],
    });
  };

  const handleAllProductCatChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      allCategoryFlag: selectedOrder.allCategoryFlag === 2 ? 1 : 2,
      categoryIds: [],
    });
  };

  const handleAllRouteCodeChange = () => {
    setSelectedOrder({
      ...selectedOrder,
      xallrutcds: selectedOrder.xallrutcds === 2 ? 1 : 2,
      routesList: [],
    });
  };

  // const handleInputChange = (index, field, value) => {
  //   const newRows = [...routeRenewals];
  //   newRows[index][field] = value;
  //   setRouteRenewals(newRows);
  // };
  const handleInputChange = (index, field, value) => {
    const newRows = [...selectedOrder.routeRenewalsList];

    if (field === "serviceTime") {
      newRows[index][field] = value;

    } else {
      // Destructure label and value from the object
      const { label, value: siteValue } = value;

      // Duplicate check for site value
      const isDuplicateSite = newRows.some(
        (row, i) => row.site === siteValue && i !== index
      );

      if (isDuplicateSite) {
        toast.error("Duplicate site not allowed");
        return;
      }

      newRows[index] = {
        ...newRows[index],
        desc: label,
        site: siteValue,
      };
    }

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
    const newRows =
      selectedOrder.driverIds.length > 0
        ? [...selectedOrder.driverIds]
        : [{ id: "", desc: "" }];

    if (!newRows[index]) {
      newRows[index] = { id: "", desc: "" };
    }

    if (field === "desc") {
      newRows[index][field] = value;
    } else if (field === "id") {
      const { label, value: driverId } = value;

      // Duplicate check
      const isDuplicate = newRows.some(
        (driver, i) => driver.id === driverId && i !== index
      );

      if (isDuplicate) {
        toast.error("Duplicate driver not allowed");
        return;
      }

      newRows[index] = {
        ...newRows[index],
        desc: label,
        id: driverId,
      };
    }

    setSelectedOrder({
      ...selectedOrder,
      driverIds: newRows,
    });
  };


  const handleCustomerInputChange = (index, field, value) => {
    const newRows =
      selectedOrder.customerIds.length > 0
        ? [...selectedOrder.customerIds]
        : [{ id: "", desc: "" }];

    if (!newRows[index]) {
      newRows[index] = { id: "", desc: "" };
    }

    if (field === "desc") {
      const descValue = value.trim();

      // Duplicate check for desc
      const isDuplicateDesc = newRows.some(
        (customer, i) => customer.desc === descValue && i !== index
      );

      if (isDuplicateDesc) {
        toast.error("Duplicate customer description not allowed");
        return;
      }

      newRows[index][field] = descValue;

    } else if (field === "id") {
      const { label, value: customerId } = value;

      // Duplicate check for id
      const isDuplicateId = newRows.some(
        (customer, i) => customer.id === customerId && i !== index
      );

      if (isDuplicateId) {
        toast.error("Duplicate customer not allowed");
        return;
      }

      newRows[index] = {
        ...newRows[index],
        desc: label,
        id: customerId,
      };
    }

    setSelectedOrder({
      ...selectedOrder,
      customerIds: newRows,
    });
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

    if (!newRows[index]) {
      newRows[index] = { id: "", desc: "" };
    }

    if (field === "desc") {
      const descValue = value.trim();

      // Duplicate check for desc
      const isDuplicateDesc = newRows.some(
        (cat, i) => cat.desc === descValue && i !== index
      );

      if (isDuplicateDesc) {
        toast.error("Duplicate product category description not allowed");
        return;
      }

      newRows[index][field] = descValue;

    } else if (field === "id") {
      const { label, value: categoryId } = value;

      // Duplicate check for id
      const isDuplicateId = newRows.some(
        (cat, i) => cat.id === categoryId && i !== index
      );

      if (isDuplicateId) {
        toast.error("Duplicate product category not allowed");
        return;
      }

      newRows[index] = {
        ...newRows[index],
        desc: label,
        id: categoryId,
      };
    }

    setSelectedOrder({
      ...selectedOrder,
      categoryIds: newRows,
    });
  };




  const handleRouteCodeInputChange = (index, field, value) => {

    // Check if the new value already exists in routesList (excluding the current index)
    const isDuplicate = selectedOrder.routesList.some((route, idx) => route === value && idx !== index);

    if (isDuplicate) {
      // If duplicate found, show popup and do NOT update
      setShowValidationModal(true);
      setValidationMessage("Route Code already selected");
      return; // stop further execution
    }

    // No duplicate found, safe to update
    setShowValidationModal(false);

    // Create a shallow copy of the routesList array
    const newRows = [...selectedOrder.routesList];

    // Update the value at the specific index
    newRows[index] = value;


    // Update the state with the modified array
    setSelectedOrder({
      ...selectedOrder,
      routesList: newRows,
    });
  };





  const addTableRow = (table) => {
    if (table === "routeRenewals") {
      const newRows = [...selectedOrder.routeRenewalsList];
      const lastRow = newRows[newRows.length - 1];

      if (!lastRow) {
        toast.error("Please fill the existing row first in Route Renewals", {
          autoClose: 5000,
          position: "top-right",
        });
        return;
      }

      const allFieldsFilled = ["site", "serviceName"].every(
        (key) => lastRow[key]?.trim() !== ""
      );

      if (allFieldsFilled) {
        setSelectedOrder((prev) => ({
          ...prev,
          routeRenewalsList: [...prev.routeRenewalsList, { site: "", name: "", serviceTime: "" }],
        }));
      } else {
        toast.error("Please fill all the fields in Route Renewals", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    }
    else if (table === "drivers") {
      const newRows = [...selectedOrder.driverIds];
      const lastRow = newRows[newRows.length - 1];

      if (!lastRow) {
        toast.error("Please fill the existing row first in Drivers table", {
          autoClose: 5000,
          position: "top-right",
        });
        return;
      }

      const allFieldsFilled = ["id"].every((key) => lastRow[key]?.trim() !== "");

      if (allFieldsFilled) {
        setSelectedOrder((prev) => ({
          ...prev,
          driverIds: [...prev.driverIds, { id: "", desc: "" }],
        }));
      } else {
        toast.error("Please fill all the fields in Drivers table", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    }
    else if (table === "customers") {
      const newRows = [...selectedOrder.customerIds];
      const lastRow = newRows[newRows.length - 1];

      if (!lastRow) {
        toast.error("Please fill the existing row first in Customers table", {
          autoClose: 5000,
          position: "top-right",
        });
        return;
      }

      const allFieldsFilled = ["id"].every((key) => lastRow[key]?.trim() !== "");

      if (allFieldsFilled) {
        setSelectedOrder((prev) => ({
          ...prev,
          customerIds: [...prev.customerIds, { id: "", desc: "" }],
        }));
      } else {
        toast.error("Please fill all the fields in Customers table", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    }
    else if (table === "productcategory") {
      const newRows = [...selectedOrder.categoryIds];
      const lastRow = newRows[newRows.length - 1];

      if (!lastRow) {
        toast.error("Please fill the existing row first in Product Category table", {
          autoClose: 5000,
          position: "top-right",
        });
        return;
      }

      const allFieldsFilled = ["id"].every((key) => lastRow[key]?.trim() !== "");

      if (allFieldsFilled) {
        setSelectedOrder((prev) => ({
          ...prev,
          categoryIds: [...prev.categoryIds, { id: "", desc: "" }],
        }));
      } else {
        toast.error("Please fill all the fields in Product Category table", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    }
    else if (table === "routeCodeList") {
      const { routesList } = selectedOrder;

      // Check for duplicates excluding empty values
      const hasDuplicates = routesList.some(
        (route, index) =>
          route && route.trim() !== "" &&
          routesList.indexOf(route) !== index
      );

      if (hasDuplicates) {
        setShowValidationModal(true);
        setValidationMessage("Route Code already selected");
        return;
      }

      if (routesList.length > 0) {
        const lastRoute = routesList[routesList.length - 1];
        if (!lastRoute || lastRoute.trim() === "") {
          toast.error("Please select a Route Code before adding a new one.", {
            autoClose: 5000,
            position: "top-right",
          });
          return;
        }
      }

      setShowValidationModal(false);
      setSelectedOrder((prevState) => ({
        ...prevState,
        routesList: [...prevState.routesList, ""],
      }));
    }
  };






  const handleKeyDown = (index, field, event, val) => {


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

    if (val === "routeCodeList") {


      if (event.key === "Tab" && field === "routeCode") {


        // Check for duplicates in the routesList
        const hasDuplicates = selectedOrder.routesList.some(
          (route, index) => selectedOrder.routesList.indexOf(route) !== index
        );

        if (hasDuplicates) {
          // Show alert if there are duplicate route codes
          // alert("This route code is already selected.");
          setShowValidationModal(true);
          setValidationMessage("Route Code alerady selected");
        } else {
          setShowValidationModal(false);
          // Add an empty string to the array if no duplicates exist
          setSelectedOrder((prevState) => ({
            ...prevState,
            routesList: [...prevState.routesList, ""],
          }));
        }
      }
    }

    // handleKeyDown(index, "routeCode", e, "routeCodeList")
  };

  // handle delete functionality
  // const handleDelete = (index, val) => {
  //   const showMinRowToast = () => toast.error("At least one row is required");

  //   switch (val) {
  //     case "routeRenewals":
  //       if (selectedOrder.routeRenewalsList.length <= 1) {
  //         showMinRowToast();
  //         return;
  //       }
  //       setSelectedOrder((prev) => ({
  //         ...prev,
  //         routeRenewalsList: prev.routeRenewalsList.filter((_, i) => i !== index),
  //       }));
  //       break;

  //     case "drivers":
  //       if (selectedOrder.driverIds.length <= 1) {
  //         showMinRowToast();
  //         return;
  //       }
  //       setSelectedOrder((prev) => ({
  //         ...prev,
  //         driverIds: prev.driverIds.filter((_, i) => i !== index),
  //       }));
  //       break;

  //     case "customers":
  //       if (selectedOrder.customerIds.length <= 1) {
  //         showMinRowToast();
  //         return;
  //       }
  //       setSelectedOrder((prev) => ({
  //         ...prev,
  //         customerIds: prev.customerIds.filter((_, i) => i !== index),
  //       }));
  //       break;

  //     case "productcategory":
  //       if (selectedOrder.categoryIds.length <= 1) {
  //         showMinRowToast();
  //         return;
  //       }
  //       setSelectedOrder((prev) => ({
  //         ...prev,
  //         categoryIds: prev.categoryIds.filter((_, i) => i !== index),
  //       }));
  //       break;

  //     case "routeCodeList":
  //       if (selectedOrder.routesList.length <= 1) {
  //         showMinRowToast();
  //         return;
  //       }
  //       setSelectedOrder((prev) => ({
  //         ...prev,
  //         routesList: prev.routesList.filter((_, i) => i !== index),
  //       }));
  //       break;

  //     case "odometerReadingHistory":
  //       if (odometerReadngHistory.length <= 1) {
  //         showMinRowToast();
  //         return;
  //       }
  //       setOdometerReadngHistory(prev => prev.filter((_, i) => i !== index));
  //       break;

  //     case "serviseScheculeHistory":
  //       if (serviceScheduleHistory.length <= 1) {
  //         showMinRowToast();
  //         return;
  //       }
  //       setServiceScheduleHistory(prev => prev.filter((_, i) => i !== index));
  //       break;

  //     default:
  //       console.warn("Unknown delete type:", val);
  //   }
  // };
  const handleDelete = (index, val) => {
    const showDeleteToast = (msg) => toast.error(msg);

    switch (val) {
      case "routeRenewals":
        setSelectedOrder((prev) => ({
          ...prev,
          routeRenewalsList: prev.routeRenewalsList.filter((_, i) => i !== index),
        }));
        showDeleteToast("Route Renewal deleted successfully");
        break;

      case "drivers":
        setSelectedOrder((prev) => ({
          ...prev,
          driverIds: prev.driverIds.filter((_, i) => i !== index),
        }));
        showDeleteToast("Driver deleted successfully");
        break;

      case "customers":
        setSelectedOrder((prev) => ({
          ...prev,
          customerIds: prev.customerIds.filter((_, i) => i !== index),
        }));
        showDeleteToast("Customer deleted successfully");
        break;

      case "productcategory":
        setSelectedOrder((prev) => ({
          ...prev,
          categoryIds: prev.categoryIds.filter((_, i) => i !== index),
        }));
        showDeleteToast("Product Category deleted successfully");
        break;

      case "routeCodeList":
        setSelectedOrder((prev) => ({
          ...prev,
          routesList: prev.routesList.filter((_, i) => i !== index),
        }));
        showDeleteToast("Route Code deleted successfully");
        break;

      case "odometerReadingHistory":
        setOdometerReadngHistory((prev) =>
          prev.filter((_, i) => i !== index)
        );
        showDeleteToast("Odometer Reading deleted successfully");
        break;

      case "serviseScheculeHistory":
        setServiceScheduleHistory((prev) =>
          prev.filter((_, i) => i !== index)
        );
        showDeleteToast("Service Schedule deleted successfully");
        break;

      default:
        console.warn("Unknown delete type:", val);
    }
  };





  const onChangeCode = (e) => {
    const value = e.target.value;

    setSelectedOrder(prev => ({
      ...prev,
      code: value,
    }));

    if (value.trim()) {
      setErrors(prev => ({
        ...prev,
        code: "",        // ✅ ONLY clear code
      }));
    }
  };


  const onChangeLicancePlate = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      registration: e.target.value,
    });
    if (e.target.value.trim()) {
      setErrors({
        ...errors,
        registration: "",
      });
    } else {
      setErrors({
        ...errors,
        registration: "This field is mandatory",
      });
    }
  };

  const handleChangeChesisnum = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      chasisNum: e.target.value,
    });

    if (e.target.value.trim()) {
      setErrors({
        ...errors,
        chasisNum: "",
      });
    } else {
      setErrors({
        ...errors,
        // chasisNum: "This field is mandatory",
      });
    }
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



  const handleChangePerformance = (selectedOption) => {
    // window.alert(e.target.value)
    setSelectedOrder({
      ...selectedOrder,
      performance: selectedOption ? Number(selectedOption.value) : "",
    });
  };

  const handleChangeVehClass = (selectedOption) => {
    const value = selectedOption?.value || "";

    setSelectedOrder(prev => ({
      ...prev,
      vehicleClass: value,
    }));

    if (value) {
      setErrors(prev => ({
        ...prev,
        vehicleClass: "",
      }));

    }
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
    let inputValue = e.target.value;

    // Remove any non-numeric characters
    inputValue = inputValue.replace(/\D/g, '');

    // Limit to 4 digits
    if (inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
    }

    setSelectedOrder({
      ...selectedOrder,
      earliestStartTime: inputValue,
    });

    // ✅ clear error as soon as user types
    if (inputValue.length > 0) {
      setErrors((prev) => ({
        ...prev,
        earliestStartTime: "",
      }));
    }
  };


  const latestStartChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      latestStartTime: e.target.value,
    });

    if (e.target.value?.trim()) {
      setErrors({
        ...errors,
        latestStartTime: "",
      });
    } else {
      setErrors({
        ...errors,
        latestStartTime: "This field is mandatory",
      });
    }
  };

  const handleAvilableHrsChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      availableHours: e.target.value,
    });
  };

  const handlecostPerUnitOverTimeChange = (e) => {
    const value = e.target.value;


    const isValidNumber = value !== "" && !isNaN(value);

    setSelectedOrder({
      ...selectedOrder,
      costPerUnitOverTime: value === "" ? "" : Number(value),
    });

    if (isValidNumber) {
      setErrors({
        ...errors,
        costPerUnitOverTime: "",
      });
    } else {
      setErrors({
        ...errors,
        costPerUnitOverTime: "This field is mandatory",
      });
    }
  };



  const handleCostPerUnitDistChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      costPerUnitDistance: e.target.value,
    });

    if (e.target.value?.trim()) {
      setErrors({
        ...errors,
        costPerUnitDistance: "",
      });
    } else {
      setErrors({
        ...errors,
        costPerUnitDistance: "This field is mandatory",
      });
    }
  };



  const handleChangeCostPerUnitT = (e) => {

    setSelectedOrder({
      ...selectedOrder,
      costPerUnitTime: e.target.value,
    });

    if (e.target.value?.trim()) {
      setErrors({
        ...errors,
        costPerUnitTime: "",
      });
    } else {
      setErrors({
        ...errors,
        costPerUnitTime: "This field is mandatory",
      });
    }
  };

  const handleChangeFixedCost = (e) => {
    const value = e.target.value;

    setSelectedOrder({
      ...selectedOrder,
      fixedCost: value,
    });

    if (value.trim() === "" || isNaN(value.trim())) {
      setErrors({
        ...errors,
        fixedCost: "This field is mandatory and must be a valid number",
      });
    } else {
      setErrors({
        ...errors,
        fixedCost: "",
      });
    }
  };





  const handleMaxTotalDistChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      totalMaxDistance: e.target.value,
    });

    if (e.target.value?.trim()) {
      setErrors({
        ...errors,
        totalMaxDistance: "",
      });
    } else {
      setErrors({
        ...errors,
        totalMaxDistance: "This field is mandatory",
      });
    }
  };

  const handleMaxTotalTimeChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxTotalTime: e.target.value,
    });

    if (e.target.value?.trim()) {
      setErrors({
        ...errors,
        maxTotalTime: "",
      });
    } else {
      setErrors({
        ...errors,
        maxTotalTime: "This field is mandatory",
      });
    }
  };

  const handleMaxTotalTravelTimeChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxTotalTravelTime: e.target.value,
    });

    if (e.target.value?.trim()) {
      setErrors({
        ...errors,
        maxTotalTravelTime: "",
      });
    } else {
      setErrors({
        ...errors,
        maxTotalTravelTime: "This field is mandatory",
      });
    }
  };

  const handleChangeMaxSpeedPerHr = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxSpeed: e.target.value,
    });
  };

  const handleChangeOverTimePerHr = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      overTimeHrs: e.target.value,
    });
  };
  const maxAllowdWeightChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxAllowedWeight: e.target.value,
    });

    // maxAllowedWeight

    if (e.target.value?.trim()) {
      setErrors({
        ...errors,
        maxAllowedWeight: "",
      });
    } else {
      setErrors({
        ...errors,
        maxAllowedWeight: "This field is mandatory",
      });
    }
  };

  const handleMaxAllVolChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      maxAllowedVolume: e.target.value,
    });

    if (e.target.value?.trim()) {
      setErrors({
        ...errors,
        maxAllowedVolume: "",
      });
    } else {
      setErrors({
        ...errors,
        maxAllowedVolume: "This field is mandatory",
      });
    }
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
      noOfPallets: e.target.value,
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

  // console.log(selectedOrder.date ,"this is selected order date")

  const onChangeDriverDate = (date) => {

    // console.log(date,"date checking 1263")
    setSelectedOrder((prev) => ({
      ...prev,
      // ...selectedOrder,
      // date: date[0].toISOString,
      date: date[0]?.toISOString(),
    }));
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


  const handleChangeSite = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      site: selectedOption ? selectedOption.value : "",
    });

    if (selectedOption && selectedOption.value?.trim()) {
      setErrors({
        ...errors,
        site: "",
      });
    } else {
      setErrors({
        ...errors,
        site: "This field is mandatory",
      });
    }
  };

  const handleChangeStartDepotSite = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      startDepotName: selectedOption ? selectedOption.value : "",
    });

    if (selectedOption && selectedOption.value?.trim()) {
      setErrors({
        ...errors,
        startDepotName: "",
      });
    } else {
      setErrors({
        ...errors,
        startDepotName: "This field is mandatory",
      });
    }
  };

  const handleChangeEndDepotSite = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      endDepotName: selectedOption ? selectedOption.value : "",
    });

    if (selectedOption && selectedOption.value?.trim()) {
      setErrors({
        ...errors,
        endDepotName: "",
      });
    } else {
      setErrors({
        ...errors,
        endDepotName: "This field is mandatory",
      });
    }
  };




  const handleChangeCareer = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      carrier: selectedOption ? selectedOption.value : "",
    });

    if (selectedOption && selectedOption.value?.trim()) {
      setErrors({
        ...errors,
        carrier: "",
      });
    } else {
      setErrors({
        ...errors,
        carrier: "This field is mandatory",
      });
    }
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
    const value = selectedOption ? selectedOption.value : "";

    setSelectedOrder({
      ...selectedOrder,
      style: value,
    });

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        style: "",
      }));

      // Only parse and set background color if a value exists
      const styleString = selectedOption.style || "";
      const styleObject = Object.fromEntries(
        styleString
          .split(";")
          .filter(Boolean)
          .map((item) => {
            const [key, val] = item.split(":").map((str) => str.trim());
            return [key.replace(/-./g, (match) => match[1].toUpperCase()), val];
          })
      );
      setBackgroundColor(styleObject.backgroundColor || "#fff");

    } else {
      // When empty, set error and reset background color to default
      setErrors((prev) => ({
        ...prev,
        style: "This field is mandatory",
      }));
      setBackgroundColor("#fff");
    }
  };


  // const handleChangeStyle = (selectedOption) => {
  //   setSelectedOrder({
  //     ...selectedOrder,
  //     style: selectedOption ? selectedOption.value : "",
  //   });

  //   const styleString = selectedOption?.style || "";
  //   const styleObject = Object.fromEntries(
  //     styleString
  //       .split(";")
  //       .filter(Boolean)
  //       .map((item) => {
  //         const [key, value] = item.split(":").map((str) => str.trim());
  //         return [key.replace(/-./g, (match) => match[1].toUpperCase()), value];
  //       })
  //   );
  //   setBackgroundColor(styleObject.backgroundColor || "#fff"); // Update background color

  //   if (selectedOption && selectedOption.value?.trim()) {
  //     setErrors({
  //       ...errors,
  //       style: "",
  //     });
  //   } else {
  //     setErrors({
  //       ...errors,
  //       style: "This field is mandatory",
  //     });
  //   }
  // };



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


  const handleChangeVehicleAllocationInspection = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      vehicleAllocationInsp: selectedOption ? selectedOption.value : "",
    });
  };


  const handleChangeReturnAllocationInspection = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      returnVehicleInsp: selectedOption ? selectedOption.value : "",
    });
  };

  const selectedStyle =
    commonData?.styleList?.find(
      (option) => option.value === selectedOrder?.style
    ) || null;

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

    // Update background color when styleObject is processed
    setBackgroundColor(styleObject.backgroundColor || "#fff");
  }, [selectedStyle]);

  const formatTime = (value) => {
    if (value.length === 4) {
      const hours = value.slice(0, 2);
      const minutes = value.slice(2, 4);
      return `${hours}:${minutes}`;
    }
    return value;
  };


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();

      // Save image URL (not base64) to your form state
      setSelectedOrder((prevState) => ({
        ...prevState,
        image: data.imageUrl, // Assuming response has { imageUrl: '/images/xyz.jpg' }
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
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
  //         image: base64Image,
  //       }));
  //     };

  //     reader.onerror = (error) => {

  //     };
  //   }
  // };

  const handleRemoveImage = () => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      image: null,
    }));

    setFileInputKey(Date.now()); // Reset the input by changing key
  };


  console.log("this is commondata", commonData);
  return (
    <Card className="h-100 m-0" style={{ color: "black", fontSize: "16px" }}>
      <CardBody
        className="overflow-auto relative py-0 px-2 m-0"
        style={{
          height: "calc(80vh - 156px)",
          scrollBehavior: "smooth",
          overflowY: "auto",
        }}
        ref={containerRef}
        id="cardbody"
      >
        {selectedOrder ? (
          <div>
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
                {/* <h5
                  style={{ height: "50px" }}
                  className="pl-2 d-flex align-items-center text-light bg-secondary"
                >
                  {isCreate ? "Create New Vehicle " : `Update Vehicle`}
                </h5> */}

                <div
                  style={{ display: "flex", gap: 50, fontSize: "1.2rem" }}
                  className="pl-2 mb-2 bg-light"
                >
                  <a
                    href="#Home"
                    style={{
                      color: activeTab === "Home" ? "green" : "black",
                      borderBottom:
                        activeTab === "Home" ? "5px solid green" : "",
                      textDecoration: "none",
                    }}
                    onClick={(e) => handleScrollTo(e, "Home")}
                  >
                    Home
                  </a>
                  <a
                    style={{
                      color: activeTab === "Time" ? "green" : "black",
                      borderBottom:
                        activeTab === "Time" ? "5px solid green" : "",
                      textDecoration: "none",
                    }}
                    href="#Time"
                    onClick={(e) => handleScrollTo(e, "Time")}
                  >
                    Time
                  </a>
                  <a
                    style={{
                      color: activeTab === "Trip" ? "green" : "black",
                      borderBottom:
                        activeTab === "Trip" ? "5px solid green" : "",
                      textDecoration: "none",
                    }}
                    href="#Trip"
                    onClick={(e) => handleScrollTo(e, "Trip")}
                  >
                    Trip
                  </a>
                  <a
                    style={{
                      color: activeTab === "Loading" ? "green" : "black",
                      borderBottom:
                        activeTab === "Loading" ? "5px solid green" : "",
                      textDecoration: "none",
                    }}
                    href="#Loading"
                    onClick={(e) => handleScrollTo(e, "Loading")}
                  >
                    Loading
                  </a>

                  <a
                    style={{
                      color: activeTab === "driverAllocation" ? "green" : "black",
                      borderBottom:
                        activeTab === "driverAllocation" ? "5px solid green" : "",
                      textDecoration: "none",
                    }}
                    href="#driverAllocation"
                    onClick={(e) => handleScrollTo(e, "driverAllocation")}
                  >
                    Driver Allocation
                  </a>

                  <a
                    style={{
                      color: activeTab === "services" ? "green" : "black",
                      borderBottom:
                        activeTab === "services" ? "5px solid green" : "",
                      textDecoration: "none",
                    }}
                    href="#services"
                    onClick={(e) => handleScrollTo(e, "services")}
                  >
                    Services
                  </a>

                  <a
                    style={{
                      color: activeTab === "Controls" ? "green" : "black",
                      borderBottom:
                        activeTab === "Controls" ? "5px solid green" : "",
                      textDecoration: "none",
                    }}
                    href="#Controls"
                    onClick={(e) => handleScrollTo(e, "Controls")}
                  >
                    Controls
                  </a>

                  <a
                    style={{
                      color: activeTab === "routeCodes" ? "green" : "black",
                      borderBottom:
                        activeTab === "routeCodes" ? "5px solid green" : "",
                      textDecoration: "none",
                    }}
                    href="#routeCodes"
                    onClick={(e) => handleScrollTo(e, "routeCodes")}
                  >
                    Route Codes
                  </a>

                  {/* routeCodes */}




                </div>
              </div>

              <div
                id="Home"
                className="responsive-form"
                ref={sectionRefs.section1}
              >
                {/* Text Input */}
                <FormGroup className="form-item text-input">
                  <Label for="typeOfOrder">
                    Code{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="typeOfOrder"
                    id="typeOfOrder"
                    value={selectedOrder.code}
                    onChange={onChangeCode}
                    onKeyDown={(e) => {
                      const cursorAtStart = e.target.selectionStart === 0;

                      if (e.key === "-" && cursorAtStart) {
                        e.preventDefault();
                      }
                    }}
                    isInvalid={!!errors.code}
                  />



                  {errors.code && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.code}
                    </div>
                  )}
                </FormGroup>

                {/* Text Input */}
                <FormGroup className="form-item text-input">
                  <Label for="order">
                    License Plate{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="order"
                    id="order"
                    value={selectedOrder.registration}
                    onChange={onChangeLicancePlate}
                    onKeyDown={(e) => {
                      const cursorAtStart = e.target.selectionStart === 0;

                      if (e.key === "-" && cursorAtStart) {
                        e.preventDefault();
                      }
                    }}
                  />


                  {errors.registration && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.registration}
                    </div>
                  )}
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
                  <Label for="orderSite">
                    Site{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>



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
                    )}

                  // Customize how options are displayed
                  />

                  {errors.site && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.site}

                    </div>
                  )}
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
                  <Label for="owonership">Ownership</Label>
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
                    value={
                      commonData?.ownerShipList?.find(
                        (option) => option.value == selectedOrder.ownership
                      ) || null
                    } // Set selected value
                    onChange={handleChangeOwonership} // Handle selection change
                    placeholder="Select ownership"
                    isClearable // Allows clearing the selection
                  />
                </FormGroup>

                {/* Dropdown */}
                <FormGroup className="form-item dropdown-input">
                  <Label for="vehicleClass">
                    Vehicle Class{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
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
                    value={
                      commonData?.vehicleClassList?.find(
                        (option) => option.value == selectedOrder.vehicleClass
                      ) || null
                    }
                    // Set selected value
                    onChange={handleChangeVehClass} // Handle selection change
                    placeholder="Select vehicle class"
                    isClearable // Allows clearing the selection
                    formatOptionLabel={(option) => (
                      <div>
                        {option.value} ({option.label})
                      </div>
                    )} // Customize how options are displayed
                  />

                  <div style={{ minHeight: "18px", marginTop: "5px" }}>
                    {errors.vehicleClass && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {errors.vehicleClass}
                      </span>
                    )}
                  </div>



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
                    style={{ backgroundColor: '#EFF2F7' }}
                  />

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
                        key={fileInputKey}
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

                <FormGroup className="form-item dropdown-input">
                  <Label for="Carrier">
                    Carrier{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
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
                    value={
                      commonData?.carrierList?.find(
                        (option) => option.value === selectedOrder.carrier
                      ) || null
                    }
                    // Set selected value
                    onChange={handleChangeCareer} // Handle selection change
                    placeholder="Select a Carrier "
                    isClearable // Allows clearing the selection
                  />

                  {errors.carrier && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.carrier}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-item dropdown-input">
                  <Label for="Carrier">
                    Start Depot Name{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
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
                    value={
                      commonData?.siteList?.find(
                        (option) =>
                          option.value === selectedOrder.startDepotName
                      ) || null
                    }
                    // Set selected value
                    onChange={handleChangeStartDepotSite} // Handle selection change
                    placeholder="Select start depot site"
                    isClearable // Allows clearing the selection
                    formatOptionLabel={(option) => (
                      <div>
                        {option.value} ({option.label})
                      </div>
                    )} // Customize how options are displayed
                  />
                  {errors.startDepotName && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.startDepotName}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-item dropdown-input">
                  <Label for="Carrier">
                    End Depot Name{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
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
                    value={
                      commonData?.siteList?.find(
                        (option) => option.value === selectedOrder.endDepotName
                      ) || null
                    } // Set selected value
                    onChange={handleChangeEndDepotSite} // Handle selection change
                    placeholder="Select End Depot Site"
                    isClearable // Allows clearing the selection
                    formatOptionLabel={(option) => (
                      <div>
                        {option.value} ({option.label})
                      </div>
                    )} // Customize how options are displayed
                  />

                  {errors.endDepotName && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.endDepotName}
                    </div>
                  )}

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
                    value={
                      commonData?.fuelTypeList?.find(
                        (option) => option.value == selectedOrder.fuelType
                      ) || null
                    } // Set selected value
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
                    disabled
                    style={{ backgroundColor: '#EFF2F7' }}
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
                    onKeyDown={(e) => {
                      // block minus at first position
                      if (e.key === "-" && e.target.selectionStart === 0) {
                        e.preventDefault();
                      }


                    }}
                  />

                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="chasisNum">
                    Chassis Number <span style={{ color: "red" }}>*</span>
                  </Label>

                  <Input
                    type="text"
                    id="chasisNum"
                    name="chasisNum"
                    value={selectedOrder.chasisNum || ""}
                    onChange={handleChangeChesisnum}
                    onKeyDown={(e) => {
                      const cursorAtStart = e.target.selectionStart === 0;

                      if (e.key === "-" && cursorAtStart) {
                        e.preventDefault();
                      }
                    }}
                    isInvalid={!!errors.chasisNum}
                  />


                  {errors.chasisNum && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {errors.chasisNum}
                    </div>
                  )}
                </FormGroup>


                <FormGroup className="form-item text-input">
                  <Label for="yearOfManufacture">Year of Manufacture</Label>
                  <Input
                    type="text"
                    name="yearOfManufacture"
                    id="yearOfManufacture"
                    value={selectedOrder.yearOfManufacture}
                    onChange={onChangeYearMfg}
                    onKeyDown={(e) => {
                      const cursorAtStart = e.target.selectionStart === 0;


                      if (e.key === "-" && cursorAtStart) {
                        e.preventDefault();
                        return;
                      }


                    }}
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
                    value={
                      commonData?.performanceList?.find(
                        (option) => option.value == selectedOrder.performance
                      ) || null
                    } // Set selected value
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
                    onChange={(e) => {
                      const value = e.target.value;

                      // allow clearing the field
                      if (value === '') {
                        handeChangeInsYear(e);
                        return;
                      }

                      // block negative values
                      if (value.includes('-')) {
                        return;
                      }

                      handeChangeInsYear(e);
                    }}
                  />

                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="roadTaxAmtYearly">Road tax Amount (Yearly)</Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="roadTaxAmtYearly"
                      id="roadTaxAmtYearly"
                      value={selectedOrder.roadTaxAmountYearly}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing the field
                        if (value === '') {
                          handleChangeroaYear(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        handleChangeroaYear(e);
                      }}
                    />

                    {/* <Label for="gbp">GBP</Label> */}
                    <span className="unit-suffix">{currencyUnit}</span>
                  </div>
                </FormGroup>

                {/* <FormGroup className="form-item checkbox-input mt-4">
               
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="emptyVehiclemass">Empty vehicle mass</Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="emptyVehiclemass"
                      id="emptyVehiclemass"
                      value={selectedOrder.emptyVehicleMass}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing the field
                        if (value === '') {
                          handleChangeEmptyMass(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        handleChangeEmptyMass(e);
                      }}
                    />

                    <span className="unit-suffix">KG</span>
                  </div>
                </FormGroup>

                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="emptyUnitMass">KG</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="grossVehicleMass">Gross vehicle mass</Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="grossVehicleMass"
                      id="grossVehicleMass"
                      value={selectedOrder.grossVehicleMass}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing the field
                        if (value === '') {
                          handleGroMasChange(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        handleGroMasChange(e);
                      }}
                    />


                    <span className="unit-suffix">KG</span>
                  </div>
                </FormGroup>
                {/* 
              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="grossVehUnitMass">KG</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="tolerance">Tolerance %</Label>
                  <Input
                    type="text"
                    name="tolerance"
                    id="tolerance"
                    value={selectedOrder.tolerance}
                    onChange={(e) => {
                      const value = e.target.value;

                      // allow clearing the field
                      if (value === '') {
                        handleToleranceChange(e);
                        return;
                      }

                      // block negative values
                      if (value.includes('-')) {
                        return;
                      }

                      handleToleranceChange(e);
                    }}
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
                    onKeyDown={(e) => {
                      const cursorAtStart = e.target.selectionStart === 0;

                      if (e.key === "-" && cursorAtStart) {
                        e.preventDefault();
                      }
                    }}
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
              <h4 id="Time" className="test-bold mt-4">
                Time
              </h4>
              <div className="custom-divider"></div>

              <div className="responsive-form" ref={sectionRefs.section2}>
                <FormGroup className="form-item text-input">
                  <Label for="loadingTime">Loading Time</Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="loadingTime"
                      id="loadingTime"
                      value={selectedOrder.loadingTime}
                      onChange={handleLoadingTimeChange}
                      onKeyDown={(e) => {
                        if (e.key === "-") {
                          e.preventDefault(); // ❌ block negative
                        }
                      }}
                    />


                    <span className="unit-suffix">HR</span>
                  </div>
                </FormGroup>

                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="loadingTimeUnit">Hours</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="offloadingTime">Offloading Time</Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="offloadingTime"
                      id="offloadingTime"
                      value={selectedOrder.offloadingTime}
                      onChange={handleOffLoadingTimeChange}
                      onKeyDown={(e) => {
                        if (e.key === "-") {
                          e.preventDefault();
                        }
                      }}
                    />


                    <span className="unit-suffix">HR</span>
                  </div>
                </FormGroup>

                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="loadingTimeUnit">Hours</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="earliestStartTime">
                    Earliest Start Time{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="earliestStartTime"
                    id="earliestStartTime"
                    value={formatTime(selectedOrder.earliestStartTime)}
                    onChange={(e) => {
                      if (e.target.value.includes('-')) return;
                      earliestStartTimeChange(e);
                    }}
                  />


                  {errors.earliestStartTime && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.earliestStartTime}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="latestStartTime">
                    Latest Start Time{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="latestStartTime"
                    id="latestStartTime"
                    value={formatTime(selectedOrder.latestStartTime)}
                    onChange={(e) => {
                      if (e.target.value.includes('-')) return;
                      latestStartChange(e);
                    }}
                  />


                  {errors.latestStartTime && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.latestStartTime}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="startTimeSupp">Available Hours</Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="availableHrs"
                      id="availableHrs"
                      value={selectedOrder.availableHours}
                      onChange={handleAvilableHrsChange}
                      onKeyDown={(e) => {
                        if (e.key === "-") {
                          e.preventDefault();
                        }
                      }}
                    />


                    <span className="unit-suffix">HR</span>
                  </div>
                </FormGroup>
                {/* 
              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="loadingTimeUnit">Hours</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="costPerUnitOt">
                    Cost Per Unit Overtime{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <div className="input-with-suffix">
                    <Input
                      type="number"
                      name="costPerUnitOt"
                      id="costPerUnitOt"
                      value={selectedOrder.costPerUnitOverTime}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || Number(value) >= 0) {
                          handlecostPerUnitOverTimeChange(e);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "-") {
                          e.preventDefault();
                        }
                      }}
                    />



                    <span className="unit-suffix">{currencyUnit}</span>
                  </div>

                  {errors.costPerUnitOverTime && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.costPerUnitOverTime}
                    </div>
                  )}
                </FormGroup>
                {/* 
              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="loadingTimeUnit">GBP</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="costPerUnitDist"
                    style={{ marginBottom: "1px" }}>
                    Cost Per Unit Distance{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>

                  <div style={{ position: "relative" }}>
                    <div className="input-with-suffix">
                      <Input
                        type="text"
                        name="costPerUnitDist"
                        id="costPerUnitDist"
                        value={selectedOrder.costPerUnitDistance}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (value === "") {
                            handleCostPerUnitDistChange(e);
                            return;
                          }

                          if (value.includes("-")) {
                            return;
                          }

                          handleCostPerUnitDistChange(e);
                        }}
                      />
                      <span className="unit-suffix">USD / Miles</span>
                    </div>

                    {/* ✅ absolutely positioned error (no layout impact) */}
                    {errors.costPerUnitDistance && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-18px",
                          left: "0",
                          fontSize: "12px",
                          color: "red",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {errors.costPerUnitDistance}
                      </div>
                    )}
                  </div>
                </FormGroup>



                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="costPerUnitDistUnit">USD / Miles</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="costPerUnitTime">
                    Cost Per Unit Time{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="costPerUnitTime"
                      id="costPerUnitTime"
                      value={selectedOrder.costPerUnitTime}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing the field
                        if (value === '') {
                          handleChangeCostPerUnitT(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        handleChangeCostPerUnitT(e);
                      }}
                    />


                    <span className="unit-suffix">GBP/HR</span>
                  </div>

                  {errors.costPerUnitTime && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.costPerUnitTime}
                    </div>
                  )}
                </FormGroup>
                {/* 
              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="costPerUnitTimeUnit">GBP/Hours</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="fixedCost">
                    Fixed Cost <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="fixedCost"
                      id="fixedCost"
                      value={selectedOrder.fixedCost}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing
                        if (value === '') {
                          handleChangeFixedCost(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        handleChangeFixedCost(e);
                      }}
                    />

                    <span className="unit-suffix">{currencyUnit}</span>
                  </div>

                  {errors.fixedCost && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.fixedCost}
                    </div>
                  )}
                </FormGroup>


                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="fixedCostUnit">GBP</Label>
              </FormGroup> */}
              </div>

              {/* Trip section starts from here */}
              <h4 id="Trip" className="test-bold mt-3">
                Trip
              </h4>
              <div className="custom-divider"></div>

              <div className="responsive-form" ref={sectionRefs.section3}>
                <FormGroup className="form-item text-input">
                  <Label for="maxTotDist">
                    Total maximum distance{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="maxTotDist"
                      id="maxTotDist"
                      value={selectedOrder.totalMaxDistance}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing the field
                        if (value === '') {
                          handleMaxTotalDistChange(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        handleMaxTotalDistChange(e);
                      }}
                    />


                    <span className="unit-suffix">{distanceUnit}</span>
                  </div>

                  {errors.totalMaxDistance && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.totalMaxDistance}
                    </div>
                  )}
                </FormGroup>

                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxTotdistUnit"> <span className="unit-suffix">GBP/Hours</span></Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="maxTotTime">
                    Max total time{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="maxTotTime"
                      id="maxTotTime"
                      value={formatTime(selectedOrder.maxTotalTime)}
                      onChange={(e) => {
                        if (e.target.value.includes('-')) return;
                        handleMaxTotalTimeChange(e);
                      }}
                    />


                    <span className="unit-suffix">HR</span>
                  </div>
                  {errors.maxTotalTime && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.maxTotalTime}
                    </div>
                  )}
                </FormGroup>
                {/* 
              <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxTotTime">Hours</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="maxTotTravelTime">
                    Max Total Travel Time{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="maxTotTravelTime"
                      id="maxTotTravelTime"
                      value={formatTime(selectedOrder.maxTotalTravelTime)}
                      onChange={(e) => {
                        if (e.target.value.includes('-')) return;
                        handleMaxTotalTravelTimeChange(e);
                      }}
                    />

                    <span className="unit-suffix">HR</span>
                  </div>

                  {errors.maxTotalTravelTime && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.maxTotalTravelTime}
                    </div>
                  )}
                </FormGroup>

                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxTotTravelTimeUnit">Hours</Label>
              </FormGroup> */}
                <FormGroup className="form-item text-input">
                  <Label for="maxSpeedPerHr">Maximum speed (per hour)</Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="maxSpeedPerHr"
                      id="maxSpeedPerHr"
                      value={selectedOrder.maxSpeed}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing the field
                        if (value === '') {
                          handleChangeMaxSpeedPerHr(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        handleChangeMaxSpeedPerHr(e);
                      }}
                    />

                    <span className="unit-suffix">KM</span>
                  </div>
                </FormGroup>

                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxSpeedPerHrKm">Kilometers</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="maxSpeedPerHr">Over time Hour's</Label>
                  <Input
                    type="text"
                    name="overtimeHrs"
                    id="overtimeHrs"
                    value={selectedOrder.overTimeHrs}
                    onChange={(e) => {
                      const value = e.target.value;

                      // allow clearing the field
                      if (value === '') {
                        handleChangeOverTimePerHr(e);
                        return;
                      }

                      // block negative values
                      if (value.includes('-')) {
                        return;
                      }

                      handleChangeOverTimePerHr(e);
                    }}
                  />

                </FormGroup>
              </div>

              {/* Loading section */}
              <h4 id="Loading" className="test-bold mt-3">
                Loading
              </h4>
              <div className="custom-divider"></div>

              <div className="responsive-form">
                <FormGroup className="form-item text-input">
                  <Label for="maxAllowdedWeight">
                    Max Allowed Weight{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="maxAllowdedWeight"
                      id="maxAllowdedWeight"
                      value={selectedOrder.maxAllowedWeight}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing the field
                        if (value === '') {
                          maxAllowdWeightChange(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        maxAllowdWeightChange(e);
                      }}
                    />


                    <span className="unit-suffix">KG</span>
                  </div>
                  {errors.maxAllowedWeight && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.maxAllowedWeight}
                    </div>
                  )}
                </FormGroup>

                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxAllowdedWeightUnit">KG</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="maxAllowdedVol">
                    Max Allowed Volume{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="maxAllowdedVol"
                      id="maxAllowdedVol"
                      value={selectedOrder.maxAllowedVolume}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing the field
                        if (value === '') {
                          handleMaxAllVolChange(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        handleMaxAllVolChange(e);
                      }}
                    />


                    <span className="unit-suffix">L</span>
                  </div>

                  {errors.maxAllowedVolume && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.maxAllowedVolume}
                    </div>
                  )}
                </FormGroup>

                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="maxAllowdedVolUnit">L</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="quantity">Quantity</Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="quantity"
                      id="quantity"
                      value={selectedOrder.quantity}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing the field
                        if (value === '') {
                          quantityChange(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        quantityChange(e);
                      }}
                    />

                    <span className="unit-suffix">UN</span>
                  </div>
                </FormGroup>

                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="quantityUnit">UN</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="maxOrderCount">Max Order Count</Label>
                  <Input
                    type="text"
                    name="maxOrderCount"
                    id="maxOrderCount"
                    value={selectedOrder.maxOrderCount}
                    onChange={(e) => {
                      const value = e.target.value;

                      // allow clearing the field
                      if (value === '') {
                        maxOrderCouChanage(e);
                        return;
                      }

                      // block negative values
                      if (value.includes('-')) {
                        return;
                      }

                      maxOrderCouChanage(e);
                    }}
                  />

                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="maxPalletCount">Number of Pallets</Label>
                  <Input
                    type="text"
                    name="maxPalletCount"
                    id="maxPalletCount"
                    value={selectedOrder.noOfPallets}
                    onChange={(e) => {
                      const value = e.target.value;

                      // allow clearing the field
                      if (value === '') {
                        handleMaxPalletChange(e);
                        return;
                      }

                      // block negative values
                      if (value.includes('-')) {
                        return;
                      }

                      handleMaxPalletChange(e);
                    }}
                  />

                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="stackHeight">Stack Height</Label>
                  <div className="input-with-suffix">
                    <Input
                      type="text"
                      name="stackHeight"
                      id="stackHeight"
                      value={selectedOrder.stackHeight}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow clearing the field
                        if (value === '') {
                          handleStackHeightChange(e);
                          return;
                        }

                        // block negative values
                        if (value.includes('-')) {
                          return;
                        }

                        handleStackHeightChange(e);
                      }}
                    />

                    <span className="unit-suffix">CM</span>
                  </div>
                </FormGroup>

                {/* <FormGroup className="form-item mt-4 checkbox-input">
                <Label for="stackHeightUnit">CM</Label>
              </FormGroup> */}

                <FormGroup className="form-item text-input">
                  <Label for="surfaceSol">Surface sol</Label>
                  <Input
                    type="text"
                    name="surfaceSol"
                    id="surfaceSol"
                    value={selectedOrder.surfaceSol}
                    onChange={(e) => {
                      const value = e.target.value;

                      // allow clearing the field
                      if (value === '') {
                        handleSurfaceSolChange(e);
                        return;
                      }

                      // block negative values
                      if (value.includes('-')) {
                        return;
                      }

                      handleSurfaceSolChange(e);
                    }}
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
                    onChange={(e) => {
                      const value = e.target.value;

                      // allow clearing the field
                      if (value === '') {
                        handleVehFuelCapacityChange(e);
                        return;
                      }

                      // block negative values
                      if (value.includes('-')) {
                        return;
                      }

                      handleVehFuelCapacityChange(e);
                    }}
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
                      (option) => option.value == selectedOrder.vehicleFuelUnits
                    )} // Set selected value
                    // onChange={handleChangeSite} // Handle selection change
                    placeholder="Select vehicle fuel unit"
                    isClearable // Allows clearing the selection
                    formatOptionLabel={(option) => (
                      <div>
                        {option.value} ({option.label})
                      </div>
                    )} // Customize how options are displayed
                  />
                </FormGroup>
              </div>

              <h4 id="driverAllocation" className="test-bold mt-3">Driver Allocation</h4>
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
                  <ReactFlatpickr
                    value={
                      selectedOrder.date &&
                        selectedOrder.date !== "1753-01-01T00:00:00.000+00:00"
                        ? new Date(selectedOrder.date)
                        : null
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
                    value={formatTime(selectedOrder.time)}
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
              <h4 id="services" className="text-bold mt-3">Services</h4>
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
                  <Label for="style">
                    Style{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
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
                    options={commonData?.styleList}
                    value={commonData?.styleList?.find(
                      (option) => option.value === selectedOrder.style
                    )}
                    // Provide options to React Select
                    // value={selectedStyle} // Set selected value to the matching object
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

                  {errors.style && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.style}
                    </div>
                  )}
                </FormGroup>
              </div>

              <h3 id="Controls" className="text-bold mt-3">Controls</h3>
              <div className="d-flex justify-content-between">
                <h4 className="text-bold mt-2">Route renewals</h4>
                <AddBoxIcon
                  onClick={() => addTableRow("routeRenewals")}
                  style={{ cursor: "pointer", fontSize: "40px" }}
                />
              </div>

              <div className="custom-divider"></div>

              <Table responsive striped bordered hover>
                <thead>
                  <tr className="text-center" style={{ color: "black" }}>
                    <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                    <th style={{ background: "#CCD6DB" }}>Actions</th>
                    <th
                      className="text-nowrap"
                      style={{ background: "#CCD6DB" }}
                    >
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
                        <Button type="button" size="sm">{index + 1}</Button>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(index, "routeRenewals")}
                          disabled={
                            !row.site || !row.serviceTime // only disable if these fields are missing
                          }
                          style={{
                            opacity: !row.site || !row.serviceTime ? 0.4 : 1,
                            cursor: !row.site || !row.serviceTime ? "not-allowed" : "pointer",
                          }}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button>







                        {/* <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(index, "routeRenewals")}
                          disabled={selectedOrder?.routeRenewalsList.length <= 1}
                          style={{
                            opacity: selectedOrder?.routeRenewalsList.length <= 1 ? 0.4 : 1,
                            cursor: selectedOrder?.routeRenewalsList.length <= 1 ? "not-allowed" : "pointer",
                          }}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </Button> */}

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
                          value={
                            commonData?.siteList?.find(
                              (option) =>
                                option.value ===
                                selectedOrder?.routeRenewalsList?.[index]?.site
                            ) || "" // Fallback to an empty string if no match is found
                          }
                          onChange={(selectedOption) =>
                            handleInputChange(
                              index,
                              "site",
                              selectedOption || ""
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
                          value={
                            commonData?.siteList?.find(
                              (option) =>
                                option.label ===
                                selectedOrder?.routeRenewalsList?.[index]?.desc
                            )?.label || "" // Extract the label property or fallback to an empty string
                          }
                          // onChange={(e) =>
                          //   handleInputChange(index, "name", e.target.value)
                          // }
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
              <div className="d-flex justify-content-between">
                <h4 className="text-bold mt-3">Drivers</h4>
                {selectedOrder.allDriverFlag !== 2 && (
                  <AddBoxIcon
                    onClick={() => addTableRow("drivers")}
                    style={{ cursor: "pointer", fontSize: "40px" }}
                  />
                )}
              </div>
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
                    <th style={{ background: "#CCD6DB" }} >Sr.No</th>
                    <th style={{ background: "#CCD6DB" }}>Actions</th>
                    <th
                      className="text-nowrap"
                      style={{ background: "#CCD6DB" }}
                    >
                      Loader Id
                    </th>
                    <th style={{ background: "#CCD6DB" }}>Driver</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedOrder?.driverIds?.length > 0
                    ? selectedOrder.driverIds
                    : [{ desc: "", id: "" }]
                  ).map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>
                        <Button type="button" size="sm">{index + 1}</Button>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(index, "drivers")}
                          disabled={!selectedOrder.driverIds[index]} // disable only if this driver row is invalid
                          style={{
                            opacity: !selectedOrder.driverIds[index] ? 0.4 : 1,
                            cursor: !selectedOrder.driverIds[index] ? "not-allowed" : "pointer",
                          }}
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
                          name="driverId"
                          options={commonData?.driverList} // Provide options to React Select
                          value={
                            commonData?.driverList?.find(
                              (option) =>
                                option.value ===
                                selectedOrder.driverIds[index]?.id
                            ) || null // Pass null if the value is not found
                          }
                          onChange={(selectedOption) => {
                            // Handle both selected and cleared values
                            handleDriverInputChange(
                              index,
                              "id",
                              selectedOption ? selectedOption : "" // Set empty string if cleared
                            );
                          }}
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
                          isDisabled={selectedOrder.allDriverFlag === 2}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          value={
                            commonData?.driverList?.find(
                              (option) =>
                                option.label ===
                                selectedOrder?.driverIds?.[index]?.desc
                            )?.label || ""
                          }
                          onChange={(e) =>
                            handleDriverInputChange(
                              index,
                              "desc",
                              e.target.value
                            )
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(index, "driver", e, "drivers")
                          }
                          disabled={selectedOrder.allDriverFlag === 2}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Customer section starts from here */}
              <div className="d-flex justify-content-between">
                <h4 className="text-bold mt-3">Customers</h4>
                {selectedOrder.allCustomerFlag !== 2 && (
                  <AddBoxIcon
                    onClick={() => addTableRow("customers")}
                    style={{ cursor: "pointer", fontSize: "40px" }}
                  />
                )}
              </div>
              <div className="custom-divider"></div>

              <div className="my-3">
                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={
                        selectedOrder.allCustomerFlag == 2 ? true : false
                      }
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
                    <th
                      className="text-nowrap"
                      style={{ background: "#CCD6DB" }}
                    >
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
                        <Button type="button" size="sm">{index + 1}</Button>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(index, "customers")}
                          disabled={!selectedOrder.customerIds[index]} // disable only if this customer row is invalid
                          style={{
                            opacity: !selectedOrder.customerIds[index] ? 0.4 : 1,
                            cursor: !selectedOrder.customerIds[index] ? "not-allowed" : "pointer",
                          }}
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
                          value={
                            commonData?.customerList?.find(
                              (option) =>
                                option.value ===
                                selectedOrder.customerIds[index]?.id
                            ) || null // Pass null if no match is found
                          }
                          // Set selected value based on the current row's site
                          onChange={(selectedOption) =>
                            handleCustomerInputChange(
                              index,
                              "id",
                              selectedOption ? selectedOption : ""
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
                          isDisabled={selectedOrder.allCustomerFlag == 2}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          value={
                            commonData?.customerList?.find(
                              (option) =>
                                option.label ===
                                selectedOrder?.customerIds?.[index]?.desc
                            )?.label || ""
                          }
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
                          disabled={selectedOrder.allCustomerFlag == 2}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between">
                <h4 className="text-bold mt-3">Product Category</h4>
                {selectedOrder.allCategoryFlag !== 2 && (
                  <AddBoxIcon
                    onClick={() => addTableRow("productcategory")}
                    style={{ cursor: "pointer", fontSize: "40px" }}
                  />
                )}
              </div>
              <div className="custom-divider"></div>

              <div className="my-3">
                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={
                        selectedOrder.allCategoryFlag == 2 ? true : false
                      }
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
                    <th
                      className="text-nowrap"
                      style={{ background: "#CCD6DB" }}
                    >
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
                        <Button type="button" size="sm">{index + 1}</Button>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(index, "productcategory")}
                          disabled={!selectedOrder.categoryIds[index]} // disable only if this category row is invalid
                          style={{
                            opacity: !selectedOrder.categoryIds[index] ? 0.4 : 1,
                            cursor: !selectedOrder.categoryIds[index] ? "not-allowed" : "pointer",
                          }}
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
                          value={
                            commonData?.categoryList?.find(
                              (option) =>
                                option.value ===
                                selectedOrder.categoryIds[index]?.id
                            ) || null // Pass null if no match is found
                          }
                          onChange={(selectedOption) =>
                            handleProductCatInputChange(
                              index,
                              "id",
                              selectedOption ? selectedOption : ""
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
                          isDisabled={selectedOrder.allCategoryFlag == 2}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          value={
                            commonData?.categoryList?.find(
                              (option) =>
                                option.label ===
                                selectedOrder?.categoryIds?.[index]?.desc
                            )?.label || ""
                          }
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
                          disabled={selectedOrder.allCategoryFlag == 2}
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

              {/* Route Code section */}
              <div className="d-flex justify-content-between">
                <h4 id="routeCodes" className="text-bold mt-3">Route Codes</h4>
                {selectedOrder.xallrutcds !== 2 && (
                  <AddBoxIcon
                    onClick={() => addTableRow("routeCodeList")}
                    style={{ cursor: "pointer", fontSize: "40px" }}
                  />
                )}
              </div>
              <div className="custom-divider"></div>

              <div className="my-3">
                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.xallrutcds == 2 ? true : false}
                      onChange={handleAllRouteCodeChange}
                    />{" "}
                    All Route Codes
                  </Label>
                </FormGroup>
              </div>

              <Table responsive striped bordered hover>
                <thead>
                  <tr className="text-center" style={{ color: "black" }}>
                    <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                    <th style={{ background: "#CCD6DB" }}>Actions</th>
                    <th
                      className="text-nowrap"
                      style={{ background: "#CCD6DB" }}
                    >
                      Route Codes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedOrder?.routesList?.length > 0
                    ? selectedOrder.routesList
                    : [null]
                  ).map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>
                        <Button type="button" size="sm">{index + 1}</Button>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(index, "routeCodeList")}
                          disabled={!selectedOrder?.routesList[index]} // disable only if this row is invalid
                          style={{
                            opacity: !selectedOrder?.routesList[index] ? 0.4 : 1,
                            cursor: !selectedOrder?.routesList[index] ? "not-allowed" : "pointer",
                          }}
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
                          id="routeCodeList"
                          name="routeCodeList"
                          options={commonData?.routeCodesList} // Provide options to React Select
                          value={
                            commonData?.routeCodesList?.find(
                              (option) =>
                                option.value == selectedOrder.routesList[index]
                            ) || null // Pass null if no match is found
                          }
                          onChange={(selectedOption) =>
                            handleRouteCodeInputChange(
                              index,
                              "routecode",
                              selectedOption ? selectedOption.value : ""
                            )
                          } // Update site field with the selected value
                          placeholder="Select Route Code"
                          isClearable // Allows clearing the selection
                          formatOptionLabel={(option) => (
                            <div>{option.label}</div>
                          )} // Customize how options are displayed
                          menuPortalTarget={document.body} // Render dropdown in a portal
                          menuPosition="fixed" // Position dropdown absolutely
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
                          }}
                          onFocus={() => ensureRowInState(index)}
                          onKeyDown={(e) =>
                            handleKeyDown(
                              index,
                              "routeCode",
                              e,
                              "routeCodeList"
                            )
                          }
                          isDisabled={selectedOrder.xallrutcds == 2}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h3 className="text-bold mt-3">Details</h3>
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
                  <ReactFlatpickr
                    value={
                      selectedOrder.lastUpdateDate &&
                        selectedOrder.lastUpdateDate !==
                        "1753-01-01T00:00:00.000+00:00"
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
              <h4 className="text-bold mt-3">Vehicle Allocation</h4>
              <div className="responsive-form">
                <FormGroup className="form-item text-input">
                  <Label for="vehicleAllocationInspection">Vehicle Allocation Inspection</Label>
                  <Select
                    id="vehicleAllocationInspection"
                    name="vehicleAllocationInspection"
                    options={commonData?.vehicleAllocationInspectionList || []}
                    value={
                      (commonData?.vehicleAllocationInspectionList || []).find(
                        (opt) => opt.value === selectedOrder.vehicleAllocationInsp
                      ) || null
                    }
                    onChange={handleChangeVehicleAllocationInspection}
                    placeholder="Select"
                    isClearable
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="ReturnAllocationvehicle">Return Allocation vehicle</Label>
                  <Select
                    id="ReturnAllocationvehicle"
                    name="ReturnAllocationvehicle"
                    options={commonData?.vehicleAllocationInspectionList || []}
                    value={
                      (commonData?.vehicleAllocationInspectionList || []).find(
                        (opt) => opt.value === selectedOrder.returnVehicleInsp
                      ) || null
                    }
                    onChange={handleChangeReturnAllocationInspection}
                    placeholder="Select"
                    isClearable
                  />
                </FormGroup>


              </div>

              {/* <h4 className="text-bold mt-2">Technicial Inspection</h4> */}
              <div className="custom-divider"></div>


            </Form>
          </div>
        ) : (
          <p></p>
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
