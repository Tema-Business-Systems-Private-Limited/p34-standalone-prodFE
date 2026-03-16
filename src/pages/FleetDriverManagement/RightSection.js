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
import { id } from "date-fns/locale";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBoxIcon from "@mui/icons-material/AddBox";

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

  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const [deleteModal, setDeleteModal] = useState(false);
  //const [postalData, setPostalData] = useState();

  const [backgroundColor, setBackgroundColor] = useState("#fff");

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
    // setSelectedOrder((prev) => {
    //   const newValue = e.target.checked ? 2 : 1;

    //   return { ...prev, xsalesrep: newValue };
    // });
    setSelectedOrder({
      ...selectedOrder,
      xsalesrep: selectedOrder.xsalesrep === 2 ? 1 : 2,
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
      x10csup: selectedOrder.x10csup === 2 ? 1 : 2,
    });
  };






  const onChangeCarrier = (selectedOption) => {
    setSelectedOrder((prev) => ({
      ...prev,
      bptnum: selectedOption ? selectedOption.value : "",
    }));
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
      xper: selectedOption ? Number(selectedOption.value) : "",
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
      licetyp: selectedOption ? Number(selectedOption.value) : "",
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
      styzon: selectedOption ? selectedOption.value : "",
    });
    if (selectedOption.value.trim()) {
      setErrors({
        ...errors,
        style: "",
      });
    } else {
      setErrors({
        ...errors,
        style: "This field is mandatory",
      });
    }
  };

  const onChangeUnavailable = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      xuvycod: selectedOption ? selectedOption.value : "",
    });
  };

  const onChangeCountry = (selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      cry: selectedOption ? selectedOption.value : "",
    });
    if (selectedOption.value.trim()) {
      setErrors({
        ...errors,
        country: "",
      });
    } else {
      setErrors({
        ...errors,
        country: "This field is mandatory",
      });
    }
  };

  const onChangeCity = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      cty: e.target.value,
    });
  };

  const onChangePostalCode = (e) => {
    const value = e.target.value;

    setSelectedOrder({
      ...selectedOrder,
      poscod: value,
    });

    if (value.trim()) {
      setErrors({
        ...errors,
        postalCode: "",
      });
    } else {
      setErrors({
        ...errors,
        postalCode: "This field is mandatory",
      });
    }
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
    setSelectedOrder(prev => ({
      ...prev,
      fcy: selectedOption ? selectedOption.value : "",
    }));

    if (selectedOption) {
      setErrors(prev => ({
        ...prev,
        site: "",
      }));
    }
  };


  const handleChangeBusinessLine = (selectedOption) => {
    // console.log(e,"this is value site check")
    setSelectedOrder({
      ...selectedOrder,
      xbus: selectedOption ? selectedOption.value : "",
    });
  };


  const onChangeCareer = (career) => {
    setSelectedOrder({
      ...selectedOrder,
      bptnum: career ? career.value : "",
    });
  }
  const handleChangeLanguage = (selectedOption) => {
    // console.log(e,"this is value site check")
    setSelectedOrder({
      ...selectedOrder,
      lanmain: selectedOption ? selectedOption.value : "",
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
  const newRows =
    selectedOrder.documentList.length > 0
      ? [...selectedOrder.documentList]
      : [
          {
            docNum: "",
            docType: "",
            expiration: "",
            issuingAuthority: "",
            issuingDate: "",
            lineNum: 1000,
          },
        ];

  if (!newRows[index]) {
    newRows[index] = {
      docNum: "",
      docType: "",
      expiration: "",
      issuingAuthority: "",
      issuingDate: "",
      lineNum: 1000,
    };
  }

  // ===============================
  // DATE VALIDATION LOGIC
  // ===============================
  if (field === "expiration") {
    const issuingDate = newRows[index]?.issuingDate;

    if (issuingDate) {
      const issue = new Date(issuingDate);
      const expiry = new Date(value);

      if (expiry < issue) {
        toast.error("Expiration date cannot be earlier than issuing date");
        return; // ❌ stop update
      }
    }
  }

  // ===============================
  // FORMAT DATE
  // ===============================
  if (field === "issuingDate" || field === "expiration") {
    const date = new Date(value);
    const formattedValue = date.toISOString().replace("Z", "+00:00");
    newRows[index][field] = formattedValue;
  } else {
    newRows[index][field] = value;
  }

  setSelectedOrder({
    ...selectedOrder,
    documentList: newRows,
  });
};

  // const handleSiteListChange = (index, value) => {
  //   setSelectedOrder((prevSelectedOrder) => {
  //     // Make a copy of the current siteList
  //     const updatedSiteList = [...prevSelectedOrder.siteList];

  //     // Update the specific object in the siteList array
  //     updatedSiteList[index] = {
  //       ...updatedSiteList[index],
  //       desc: value.label, // Assign the label to desc
  //       id: value.value, // Assign the value to id
  //     };

  //     // Return the updated selectedOrder object
  //     return {
  //       ...prevSelectedOrder,
  //       siteList: updatedSiteList, // Replace the old siteList with the updated one
  //     };
  //   });
  // };


  const handleSiteListChange = (index, selectedOption) => {
    const isDuplicate = selectedOrder.siteList.some(
      (item, idx) =>
        item.id === selectedOption?.value && idx !== index
    );

    if (isDuplicate) {
      toast.error("This site is already selected.", { autoClose: 5000 });
      return;
    }

    const updatedSiteList = [...selectedOrder.siteList];
    updatedSiteList[index] = {
      ...updatedSiteList[index],
      id: selectedOption?.value || "",
      desc: selectedOption?.label || "",
    };

    setSelectedOrder((prev) => ({
      ...prev,
      siteList: updatedSiteList,
    }));
  };

  // const handleVehClassListChange = (index, value) => {
  //   setSelectedOrder((prevSelectedOrder) => {
  //     // Make a copy of the current siteList
  //     const updatedSiteList = [...prevSelectedOrder.vehicleClassList];

  //     // Update the specific object in the siteList array
  //     updatedSiteList[index] = {
  //       ...updatedSiteList[index],
  //       desc: value.label, // Assign the label to desc
  //       id: value.value, // Assign the value to id
  //     };

  //     // Return the updated selectedOrder object
  //     return {
  //       ...prevSelectedOrder,
  //       vehicleClassList: updatedSiteList, // Replace the old siteList with the updated one
  //     };
  //   });
  // };

  const handleVehClassListChange = (index, value) => {
    const isDuplicate = selectedOrder.vehicleClassList.some(
      (item, idx) => item.id === value.value && idx !== index
    );

    if (isDuplicate) {
      toast.error("This vehicle class is already selected.", { autoClose: 5000 });
      return;
    }

    setSelectedOrder((prevSelectedOrder) => {
      const updatedVehicleClassList = [...prevSelectedOrder.vehicleClassList];

      updatedVehicleClassList[index] = {
        ...updatedVehicleClassList[index],
        desc: value.label,
        id: value.value,
      };

      return {
        ...prevSelectedOrder,
        vehicleClassList: updatedVehicleClassList,
      };
    });
  };

  const handleUnAvailableListChange = (index, value, field) => {
    let formattedValue = value;

    setSelectedOrder((prevState) => {
      const updatedList = [...prevState.unavailableDaysList];
      const currentRow = updatedList[index];

      // ---------------- DATE FORMATTING ----------------
      if (field === "startDate" || field === "endDate") {
        if (!value) {
          formattedValue = "";
        } else {
          const date = new Date(value);
          formattedValue = date.toISOString().replace("Z", "+00:00");
        }
      }

      // ---------------- VALIDATION ----------------
      if (
        field === "endDate" &&
        currentRow?.startDate &&
        formattedValue &&
        new Date(formattedValue) < new Date(currentRow.startDate)
      ) {
        toast.error("End date cannot be less than start date");
        return prevState; // ❌ stop update
      }

      // If start date changes and becomes greater than end date → clear end date
      if (
        field === "startDate" &&
        currentRow?.endDate &&
        formattedValue &&
        new Date(formattedValue) > new Date(currentRow.endDate)
      ) {
        updatedList[index] = {
          ...currentRow,
          endDate: "",
        };
      }

      // ---------------- UPDATE ROW ----------------
      updatedList[index] = {
        ...updatedList[index],
        [field]: formattedValue,
      };

      return {
        ...prevState,
        unavailableDaysList: updatedList,
      };
    });
  };


  // const handleKeyDown = (index, field, event, val) => {
  //   // for route renewals
  //   if (val === "documentList") {
  //     if (
  //       event.key === "Tab" &&
  //       field === "expiration"
  //     ) {
  //       console.log(
  //         index,
  //         field,
  //         event,
  //         "this is handle key down add capacity"
  //       );

  //     }
  //   }
  // };

  const addTableRow = (table) => {
    if (table == "documentList") {
      const newRows = [...selectedOrder.documentList];
      const lastRow = newRows[newRows.length - 1];
      console.log(lastRow, "this is last row checking");
      const allFieldsFilled = [
        "docType",
        "docNum",
        "issuingAuthority",
        "issuingDate",
        "expiration",
      ].every((key) => lastRow[key] && lastRow[key].trim() !== "");

      console.log(allFieldsFilled, "checking flag");
      const newObject = {
        docType: "",
        docNum: "",
        issuingAuthority: "",
        issuingDate: "",
        expiration: "",
        lineNum: "",
      };

      if (allFieldsFilled) {
        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          documentList: [...prevOrder.documentList, newObject],
        }));
      } else {
        toast.error("Please fill all the fields in Documents table", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    }
    if (table == "siteList") {
      const newRows = [...selectedOrder.siteList];
      const lastRow = newRows[newRows.length - 1];
      console.log(lastRow, "this is last row checking");
      const allFieldsFilled = [
        "id",
      ].every((key) => lastRow[key] && lastRow[key].trim() !== "");

      console.log(allFieldsFilled, "checking flag");
      const newObject = {
        id: "",
        desc: "",
      };

      if (allFieldsFilled) {
        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          siteList: [...prevOrder.siteList, newObject],
        }));
      } else {
        toast.error("Please select a site in the table", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    }
    if (table == "vehicleClassList") {
      const newRows = [...selectedOrder.vehicleClassList];
      const lastRow = newRows[newRows.length - 1];
      console.log(lastRow, "this is last row checking");
      const allFieldsFilled = [
        "id",
      ].every((key) => lastRow[key] && lastRow[key].trim() !== "");

      console.log(allFieldsFilled, "checking flag");
      const newObject = {
        id: "",
        desc: "",
      };

      if (allFieldsFilled) {
        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          vehicleClassList: [...prevOrder.vehicleClassList, newObject],
        }));
      } else {
        toast.error("Please select a vehicle class in the table", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    }
  };

  const handleKeyDown = (index, field, event, val) => {
    // For route renewals
    if (val === "documentList") {
      if (event.key === "Tab" && field === "expiration") {
        console.log(
          index,
          field,
          event,
          "this is handle key down add capacity"
        );

        // New object to be added
        const newObject = {
          docType: "",
          docNum: "",
          issuingAuthority: "",
          issuingDate: "",
          expiration: "",
          lineNum: "",
        };

        // Update the state with the new object added to documentList
        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          documentList: [...prevOrder.documentList, newObject],
        }));
      }
    }

    if (val === "siteList") {
      if (event.key === "Tab" && field === "site") {
        console.log(
          index,
          field,
          event,
          "this is handle key down add siteLsit"
        );

        // New object to be added
        const newObject = {
          id: "",
          desc: "",
        };

        // Update the state with the new object added to documentList
        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          siteList: [...prevOrder.siteList, newObject],
        }));
      }
    }

    // handleKeyDown(index, "vehClass", e, "vehicleClassList")
    if (val == "vehicleClassList") {
      if (event.key === "Tab" && field === "vehClass") {
        // console.log(index, field, event, "this is handle key down add capacity");

        // New object to be added
        const newObject = {
          id: "",
          desc: "",
        };

        // Update the state with the new object added to documentList
        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          vehicleClassList: [...prevOrder.vehicleClassList, newObject],
        }));
      }
    }
    if (val == "unavailableList") {
      if (event.key === "Tab" && field === "desc") {
        // console.log(index, field, event, "this is handle key down add capacity");

        // New object to be added
        const newObject = {
          startDate: "",
          endDate: "",
          desc: "",
        };

        // Update the state with the new object added to documentList
        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          unavailableDaysList: [...prevOrder.unavailableDaysList, newObject],
        }));
      }
    }
  };



  const handleDeleteListItems = (index, val) => {
    if (val === "documentList") {
      setSelectedOrder((prev) => {
        const currentList = prev.documentList || [];

        // If there is only one row, clear instead of deleting
        if (currentList.length === 1) {
          const clearedRow = Object.fromEntries(
            Object.keys(currentList[0]).map((key) => [key, ""])
          );
          return { ...prev, documentList: [clearedRow] };
        }

        // Otherwise, delete normally
        const newRows = currentList.filter((_, i) => i !== index);
        return { ...prev, documentList: newRows };
      });
      return;
    }
    if (val === "siteList") {
      setSelectedOrder((prev) => {
        const currentList = prev.siteList || [];

        // If only one row, clear its fields instead of deleting
        if (currentList.length === 1) {
          const clearedRow = Object.fromEntries(
            Object.keys(currentList[0]).map((key) => [key, ""])
          );
          return { ...prev, siteList: [clearedRow] };
        }

        // Otherwise, delete the row normally
        const newRows = currentList.filter((_, i) => i !== index);
        return { ...prev, siteList: newRows };
      });
      return;
    }

    // ... oth
    // if (val === "siteList") {
    //   if (selectedOrder.siteList.length === 1) {
    //     toast.error("At least one site must be assigned");
    //     return;
    //   }
    //   const newRows = selectedOrder.siteList.filter((_, i) => i !== index);
    //   setSelectedOrder((prev) => ({ ...prev, siteList: newRows }));
    // }

    if (val === "vehicleClass") {
      setSelectedOrder((prev) => {
        const currentList = prev.vehicleClassList || [];

        // If only one row, clear its fields instead of deleting
        if (currentList.length === 1) {
          const clearedRow = Object.fromEntries(
            Object.keys(currentList[0]).map((key) => [key, ""])
          );
          return { ...prev, vehicleClassList: [clearedRow] };
        }

        // Otherwise, delete the row normally
        const newRows = currentList.filter((_, i) => i !== index);
        return { ...prev, vehicleClassList: newRows };
      });
      return;
    }

    if (val === "unavailableList") {
      setSelectedOrder((prev) => {
        const currentList = prev.unavailableDaysList || [];

        // If only one row, clear fields instead of deleting
        if (currentList.length === 1) {
          const clearedRow = Object.fromEntries(
            Object.keys(currentList[0]).map((key) => [key, ""])
          );
          return { ...prev, unavailableDaysList: [clearedRow] };
        }

        // Otherwise, delete the row normally
        const newRows = currentList.filter((_, i) => i !== index);
        return { ...prev, unavailableDaysList: newRows };
      });
      return;
    }
    // if (val === "unavailableList") {
    //   const newRows = selectedOrder.unavailableDaysList.filter((_, i) => i !== index);
    //   setSelectedOrder((prev) => ({ ...prev, unavailableDaysList: newRows }));
    // }
  };



  //   const handleDeleteListItems = (index, val) => {
  //   if (val === "documentList") {
  //     const newRows = selectedOrder.documentList.filter((_, i) => i !== index);
  //     setSelectedOrder((prev) => ({
  //       ...prev,
  //       documentList: newRows,
  //     }));
  //   }

  //   if (val === "siteList") {
  //     if (selectedOrder.siteList.length === 1) {
  //       toast.error("At least one site must be assigned");
  //       return;
  //     }
  //     const newRows = selectedOrder.siteList.filter((_, i) => i !== index);
  //     setSelectedOrder((prev) => ({
  //       ...prev,
  //       siteList: newRows,
  //     }));
  //   }

  //   if (val === "vehicleClass") {
  //     const newRows = selectedOrder.vehicleClassList.filter((_, i) => i !== index);
  //     setSelectedOrder((prev) => ({
  //       ...prev,
  //       vehicleClassList: newRows,
  //     }));
  //   }

  //   if (val === "unavailableList") {
  //     const newRows = selectedOrder.unavailableDaysList.filter((_, i) => i !== index);
  //     setSelectedOrder((prev) => ({
  //       ...prev,
  //       unavailableDaysList: newRows,
  //     }));
  //   }
  // };


  // const handleDeleteListItems = (index, val) => {
  //   if (val === "documentList") {
  //     if (index === 0) return; // Prevent deletion of the first row

  //     const newRows = selectedOrder.documentList.filter((_, i) => i !== index);

  //     setSelectedOrder((prev) => ({
  //       ...prev,
  //       documentList: newRows,
  //     }));
  //   }

  //   if (val === "siteList") {
  //     // if (index === 0) return; // Prevent deletion of the first row

  //     if (selectedOrder.siteList.length === 1) {
  //       toast.error("At least one site must be assigned");
  //       return;
  //     }
  //     const newRows = selectedOrder.siteList.filter((_, i) => i !== index);

  //     setSelectedOrder((prev) => ({
  //       ...prev,
  //       siteList: newRows,
  //     }));
  //   }

  //   if (val === "vehicleClass") {
  //     if (index === 0) return; // Prevent deletion of the first row

  //     const newRows = selectedOrder.vehicleClassList.filter(
  //       (_, i) => i !== index
  //     );

  //     setSelectedOrder((prev) => ({
  //       ...prev,
  //       vehicleClassList: newRows,
  //     }));
  //   }

  //   if (val === "unavailableList") {
  //     if (index === 0) return; // Prevent deletion of the first row

  //     const newRows = selectedOrder.unavailableDaysList.filter(
  //       (_, i) => i !== index
  //     );

  //     setSelectedOrder((prev) => ({
  //       ...prev,
  //       unavailableDaysList: newRows,
  //     }));
  //   }
  // };

  const selectedStyle =
    commonData?.styleList?.find(
      (option) => option.value === selectedOrder?.styzon
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        const binaryArray = new Uint8Array(reader.result);
        const base64Image = btoa(String.fromCharCode(...binaryArray));
        setSelectedOrder((prevState) => ({
          ...prevState,
          image: base64Image,
        }));
      };

      reader.onerror = (error) => {
        console.error("Error reading file: ", error);
      };
    }
  };

  const handleRemoveImage = () => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      image: null,
    }));

    setFileInputKey(Date.now()); // Reset the input by changing key
  };

  console.log(selectedOrder, "selecedorder 1095");

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
              <h5
                className="pl-2 d-flex align-items-center text-light bg-secondary"
                style={{ height: "50px" }}
              // style={{ textAlign: "left", backgroundColor: "#4CAF50" }}
              >
                {isCreate
                  ? "Create Driver"
                  : `Update Driver`}
              </h5>
              <div
                style={{ display: "flex", gap: 50, fontSize: "1.2rem" }}
                className="pl-2 bg-light"
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
                    color: activeTab === "address" ? "green" : "black",
                    borderBottom:
                      activeTab === "address" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  href="#address"
                  onClick={(e) => handleScrollTo(e, "address")}
                >
                  Address Details
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
                <a
                  style={{
                    color: activeTab === "siteSelection" ? "green" : "black",
                    borderBottom:
                      activeTab === "siteSelection" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  href="#siteSelection"
                  onClick={(e) => handleScrollTo(e, "siteSelection")}
                >
                  Site Selection
                </a>
                <a
                  style={{
                    color: activeTab === "vehicleClass" ? "green" : "black",
                    borderBottom:
                      activeTab === "vehicleClass" ? "5px solid green" : "",
                    textDecoration: "none",
                  }}
                  href="#vehicleClass"
                  onClick={(e) => handleScrollTo(e, "vehicleClass")}
                >
                  Vehicle Class
                </a>
              </div>
            </div>
            <div id="home" className="mt-5 responsive-form">
              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="driverId">
                  User ID{" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
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
                <Label for="site">
                  Site <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>

                <Select
                  id="site"
                  name="site"
                  value={
                    commonData?.siteList.find(
                      option => option.value === selectedOrder.fcy
                    ) || null
                  }
                  onChange={onChangeSite} 
                  options={commonData?.siteList}
                  placeholder="Select"
                  isClearable
                  getOptionLabel={(option) => option.value}
                  getOptionValue={(option) => option.value}
                />


                <div style={{ minHeight: "18px", marginTop: "5px" }}>
                  {errors.site && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errors.site}
                    </span>
                  )}
                </div>
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
                    checked={selectedOrder.xsalesrep == 2 ? true : false}
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
                    checked={selectedOrder.x10csup === 2 ? true : false}
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
                  onChange={onChangeCareer}
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
                    selectedOrder.bir &&
                      selectedOrder.bir !== "1753-01-01T00:00:00.000+00:00"
                      ? new Date(selectedOrder.bir)
                      : null
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
                    selectedOrder.lastvime &&
                      selectedOrder.lastvime !== "1753-01-01T00:00:00.000+00:00"
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
                    selectedOrder.licedat &&
                      selectedOrder.licedat !== "1753-01-01T00:00:00.000+00:00"
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
                    selectedOrder.validat &&
                      selectedOrder.validat !== "1753-01-01T00:00:00.000+00:00"
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
                <Label for="styzon">
                  Style{" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
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

                {/* <Select
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
                /> */}

                <Select
                  id="style"
                  name="style"
                  options={commonData?.styleList} // Provide options to React Select
                  value={selectedStyle} // Set selected value to the matching object
                  placeholder="Select a style"
                  isClearable // Allows clearing the selection
                  onChange={onChangeStyle}
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
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    {errors.style}
                  </div>
                )}
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
              <h4 id="address" className="mt-5 text-bold mt-2">Address Detail</h4>
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
                  <Label for="country">
                    Country{" "}
                    <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
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
                  {errors.country && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {errors.country}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="country">Postal Code
                    <span style={{ color: "red", marginLeft: "2px" }}> *</span>
                  </Label>
                  <Input
                    type="text"
                    name="pcode"
                    id="pcode"
                    value={selectedOrder.poscod}
                    onChange={onChangePostalCode}
                  />
                  {errors.postalCode && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {errors.postalCode}
                    </div>
                  )}
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
                <div className="d-flex justify-content-end">
                  <AddBoxIcon
                    onClick={() => addTableRow("documentList")}
                    style={{ cursor: "pointer", fontSize: "40px" }}
                  />
                </div>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center" style={{ color: "black" }}>
                      <th style={{ background: "#CCD6DB" }}>Sr No</th>
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
                          <div
                            style={{
                              display: "inline-block",
                              padding: "5px 10px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              backgroundColor: "#f0f0f0",
                              minWidth: "30px",
                            }}
                          >
                            {index + 1}
                          </div>
                        </td>
                        <td>
                          <Button
                            type="button"
                            size="sm"
                            color="danger"
                            title={
                              Object.values(selectedOrder.documentList[index] || {}).some(
                                (val) => val?.trim?.() !== ""
                              )
                                ? "Clear this row"
                                : "Fill a field to enable clear"
                            }
                            onClick={() => handleDeleteListItems(index, "documentList")}
                            disabled={
                              selectedOrder.documentList.length === 0 ||
                              Object.values(selectedOrder.documentList[index] || {}).every(
                                (val) => val?.trim?.() === ""
                              ) // disable if all fields empty
                            }
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button>



                          {/* <Button
                            type="button"
                            size="sm"
                            color="danger"
                            onClick={() =>
                              handleDeleteListItems(index, "documentList")
                            }
                            disabled={index === 0}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button> */}
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
                              selectedOrder?.documentList?.[index]?.docType
                                ? commonData?.documentTypeList.find(
                                  (option) =>
                                    option.value === selectedOrder.documentList[index]?.docType
                                ) || null
                                : null // explicitly set null if empty
                            }
                            onChange={(selectedOption) =>
                              handleDocumentListChange(
                                index,
                                "docType",
                                selectedOption?.value || ""
                              )
                            }
                            options={commonData?.documentTypeList}
                            formatOptionLabel={(option) => <div>{option.value}</div>}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                            placeholder="Select"
                            isClearable
                          />
                        </td>
                        <td>
                          <Select
                            name="issuingAuthority"
                            id="country"
                            value={
                              selectedOrder?.documentList?.[index]?.issuingAuthority
                                ? commonData?.issueAuthList.find(
                                  (option) =>
                                    option.value ===
                                    selectedOrder.documentList[index]?.issuingAuthority
                                ) || null
                                : null // explicitly set null if empty
                            }
                            onChange={(selectedOption) =>
                              handleDocumentListChange(
                                index,
                                "issuingAuthority",
                                selectedOption?.value || ""
                              )
                            }
                            options={commonData?.issueAuthList}
                            formatOptionLabel={(option) => <div>{option.value}</div>}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                            placeholder="Select"
                            isClearable
                          />
                        </td>


                        <td>
                          <Input
                            type="text"
                            value={
                              selectedOrder?.documentList
                                ? selectedOrder.documentList[index]?.docNum ||
                                ""
                                : "" // Show empty if selectedOrder is empty
                            }
                            onChange={(e) =>
                              handleDocumentListChange(
                                index,
                                "docNum",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(index, "docNum", e, "documentList")
                            }
                          />
                        </td>

                        <td>
                          {/* // onKeyDown={(e) =>
                            //   handleKeyDown(
                            //     index,
                            //     "docNum",
                            //     e,
                            //     "capacities"
                            //   )
                            // }
                         */}

                          <Input
                            type="date"
                            value={
                              selectedOrder?.documentList
                                ? selectedOrder.documentList[index]
                                  ?.issuingDate &&
                                  selectedOrder.documentList[index]
                                    .issuingDate !==
                                  "1753-01-01T00:00:00.000+00:00"
                                  ? new Date(
                                    selectedOrder.documentList[
                                      index
                                    ].issuingDate
                                  )
                                    .toISOString()
                                    .slice(0, 10)
                                  : ""
                                : "" // Show empty if selectedOrder or documentList is empty
                            }
                            onChange={(e) =>
                              handleDocumentListChange(
                                index,
                                "issuingDate",
                                e.target.value
                              )
                            }
                          />
                        </td>

                        <td>
                          {/* <Input
                            type="date"
                            // value={row.expiration}
                            value={
                              selectedOrder?.documentList[index]?.expiration
                                ? new Date(
                                    selectedOrder.documentList[index].expiration
                                  )
                                    .toISOString()
                                    .slice(0, 10)
                                : ""
                            }
                            onChange={(e) =>
                              handleDocumentListChange(
                                index,
                                "expiration",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(
                                index,
                                "expiration",
                                e,
                                "documentList"
                              )
                            }
                          /> */}

                          <Input
                            type="date"
                            value={
                              selectedOrder?.documentList?.[index]
                                ?.expiration &&
                                selectedOrder.documentList[index].expiration !==
                                "1753-01-01T00:00:00.000+00:00" &&
                                !isNaN(
                                  new Date(
                                    selectedOrder.documentList[index].expiration
                                  )
                                )
                                ? new Date(
                                  selectedOrder.documentList[index].expiration
                                )
                                  .toISOString()
                                  .slice(0, 10)
                                : "" // Show empty if expiration is invalid or placeholder date
                            }
                            onChange={(e) =>
                              handleDocumentListChange(
                                index,
                                "expiration",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(
                                index,
                                "expiration",
                                e,
                                "documentList"
                              )
                            }
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
                <h4 id="controls" className="mt-4 text-bold">Controls</h4>
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
                <div className="mt-5 d-flex justify-content-between">
                  <h4 id="siteSelection" className="text-bold">Site Selection</h4>
                  <AddBoxIcon
                    onClick={() => addTableRow("siteList")}
                    style={{ cursor: "pointer", fontSize: "40px" }}
                  />
                </div>
                <div className="custom-divider"></div>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center" style={{ color: "black" }}>
                      <th style={{ background: "#CCD6DB" }}>Sr No</th>
                      <th style={{ background: "#CCD6DB" }}>Actions</th>
                      <th
                        className="text-nowrap"
                        style={{ background: "#CCD6DB" }}
                      >
                        Site
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedOrder?.siteList?.length > 0
                      ? selectedOrder.siteList
                      : [
                        {
                          id: "",
                          desc: "",
                        },
                      ]
                    ).map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <div
                            style={{
                              display: "inline-block",
                              padding: "5px 10px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              backgroundColor: "#f0f0f0",
                              minWidth: "30px",
                            }}
                          >
                            {index + 1}
                          </div>
                        </td>



                        <td>


                          <Button
                            size="sm"
                            color="danger"
                            title={
                              Object.values(selectedOrder.siteList[index] || {}).some(
                                (val) => val?.trim?.() !== ""
                              )
                                ? "Clear this row"
                                : "Fill a field to enable clear"
                            }
                            onClick={() => handleDeleteListItems(index, "siteList")}
                            disabled={
                              selectedOrder.siteList.length === 0 ||
                              Object.values(selectedOrder.siteList[index] || {}).every(
                                (val) => val?.trim?.() === ""
                              ) // disable if all fields empty
                            }
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button>

                          {/* <Button
                            size="sm"
                            color="danger"
                            onClick={() =>
                              handleDeleteListItems(index, "siteList")
                            }
                            // disabled={index === 0}
                            disabled={selectedOrder.siteList.length === 1}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button> */}
                        </td>
                        <td>
                          <Select
                            options={commonData?.siteList}
                            // value={selectedOrder?.siteList[index]?.id || ""}
                            value={
                              selectedOrder?.siteList &&
                                selectedOrder.siteList[index]?.id
                                ? commonData?.siteList?.find(
                                  (option) =>
                                    option.value ===
                                    selectedOrder.siteList[index].id
                                ) || ""
                                : "" // Show empty if selectedOrder or siteList is empty
                            }
                            onChange={(selectedOption) =>
                              handleSiteListChange(index, selectedOption || "")
                            }
                            getOptionLabel={(option) =>
                              `${option.value} (${option.label})`
                            }
                            placeholder="Select Site"
                            isClearable
                            menuPortalTarget={document.body} // Render dropdown in a portal
                            menuPosition="fixed" // Position dropdown absolutely
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
                            }}
                            onKeyDown={(e) =>
                              handleKeyDown(index, "site", e, "siteList")
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
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
              <div id="vehicleClass" className="mt-5">
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
                <div className="d-flex justify-content-between">
                  <h4 className="mt-2 text-bold">Vehicle Class</h4>
                  <AddBoxIcon
                    onClick={() => addTableRow("vehicleClassList")}
                    style={{ cursor: "pointer", fontSize: "40px" }}
                  />
                </div>
                <div className="custom-divider"></div>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center" style={{ color: "black" }}>
                      <th style={{ background: "#CCD6DB" }}>Sr No</th>
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
                  <tbody>
                    {/* {selectedOrder.vehicleClassList? */}

                    {(selectedOrder?.vehicleClassList?.length > 0
                      ? selectedOrder.vehicleClassList
                      : [
                        {
                          id: "",
                          desc: "",
                        },
                      ]
                    ).map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <div
                            style={{
                              display: "inline-block",
                              padding: "5px 10px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              backgroundColor: "#f0f0f0",
                              minWidth: "30px",
                            }}
                          >
                            {index + 1}
                          </div>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            title={
                              Object.values(selectedOrder.vehicleClassList[index] || {}).some(
                                (val) => val?.trim?.() !== ""
                              )
                                ? "Clear this row"
                                : "Fill a field to enable clear"
                            }
                            onClick={() => handleDeleteListItems(index, "vehicleClass")}
                            disabled={
                              selectedOrder.vehicleClassList.length === 0 ||
                              Object.values(selectedOrder.vehicleClassList[index] || {}).every(
                                (val) => val?.trim?.() === ""
                              ) // disable if all fields empty
                            }
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button>


                          {/* <Button
                            size="sm"
                            color="danger"
                            onClick={() =>
                              handleDeleteListItems(index, "vehicleClass")
                            }
                            disabled={selectedOrder.vehicleClassList.length === 1}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button> */}
                        </td>
                        <td>
                          <Select
                            options={commonData?.vehicleClassList}
                            // value={selectedOrder?.siteList[index]?.id || ""}
                            value={
                              selectedOrder?.vehicleClassList &&
                                selectedOrder.vehicleClassList[index]?.id
                                ? commonData?.vehicleClassList?.find(
                                  (option) =>
                                    option.value ==
                                    selectedOrder.vehicleClassList[index].id
                                ) || ""
                                : "" // Show empty if selectedOrder or vehicleClassList is empty
                            }
                            // onChange={onChangeSite}
                            onChange={(selectedOption) =>
                              handleVehClassListChange(
                                index,
                                selectedOption || ""
                              )
                            }
                            getOptionLabel={(option) =>
                              `${option.value} (${option.label})`
                            }
                            placeholder="Select Site"
                            isClearable
                            menuPortalTarget={document.body} // Render dropdown in a portal
                            menuPosition="fixed" // Position dropdown absolutely
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is on top
                            }}
                            onKeyDown={(e) =>
                              handleKeyDown(
                                index,
                                "vehClass",
                                e,
                                "vehicleClassList"
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={selectedOrder?.vehicleClassList?.[index]?.desc || ""}
                            onChange={(e) =>
                              handleVehClassListChange(index, "desc", e.target.value) // update description correctly
                            }

                          // value={commonData?.vehicleClassList?.find(
                          //   (option) =>
                          //     option.label ==
                          //     selectedOrder.vehicleClassList[index]?.desc || ""
                          // )}
                          // onChange={(e) =>
                          //   handleCapacityChange(
                          //     index,
                          //     "capacity",
                          //     e.target.value
                          //   )
                          // }
                          // onKeyDown={(e) =>
                          //   handleKeyDown(index, "capacity", e, "capacities")
                          // }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div>
                <h4 className="mt-5 text-bold mt-2">Unavailable Days</h4>
                <div className="custom-divider"></div>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr className="text-center" style={{ color: "black" }}>
                      <th style={{ background: "#CCD6DB" }}>Sr No</th>
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
                  <tbody>
                    {(selectedOrder?.unavailableDaysList?.length > 0
                      ? selectedOrder.unavailableDaysList
                      : [
                        {
                          desc: "",
                          endDate: "",
                          startDate: "",
                        },
                      ]
                    ).map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <div
                            style={{
                              display: "inline-block",
                              padding: "5px 10px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              backgroundColor: "#f0f0f0",
                              minWidth: "30px",
                            }}
                          >
                            {index + 1}
                          </div>
                        </td>
                        <td>

                          <Button
                            size="sm"
                            color="danger"
                            title={
                              Object.values(selectedOrder.unavailableDaysList[index] || {}).some(
                                (val) => val?.trim?.() !== ""
                              )
                                ? "Clear this row"
                                : "Fill a field to enable clear"
                            }
                            onClick={() => handleDeleteListItems(index, "unavailableList")}
                            disabled={
                              selectedOrder.unavailableDaysList.length === 0 ||
                              Object.values(selectedOrder.unavailableDaysList[index] || {}).every(
                                (val) => val?.trim?.() === ""
                              ) // disable if all fields are empty
                            }
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button>

                          {/* <Button
                            size="sm"
                            color="danger"
                            onClick={() =>
                              handleDeleteListItems(index, "unavailableList")
                            }
                            disabled={index === 0}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button> */}
                        </td>
                        <td>
                          <Input
                            type="date"
                            value={
                              selectedOrder?.unavailableDaysList &&
                                selectedOrder.unavailableDaysList[index]
                                  ?.startDate &&
                                selectedOrder.unavailableDaysList[index]
                                  .startDate !==
                                "1753-01-01T00:00:00.000+00:00" &&
                                !isNaN(
                                  new Date(
                                    selectedOrder.unavailableDaysList[
                                      index
                                    ]?.startDate
                                  )
                                )
                                ? new Date(
                                  selectedOrder.unavailableDaysList[
                                    index
                                  ].startDate
                                )
                                  .toISOString()
                                  .slice(0, 10)
                                : "" // Show empty if the placeholder date or invalid date is found
                            }
                            onChange={(e) =>
                              handleUnAvailableListChange(
                                index,
                                e.target.value || "",
                                "startDate"
                              )
                            }
                          />
                        </td>

                        <td>
                          <Input
                            type="date"
                            value={
                              selectedOrder?.unavailableDaysList &&
                                selectedOrder.unavailableDaysList[index]
                                  ?.endDate &&
                                selectedOrder.unavailableDaysList[index]
                                  .endDate !== "1753-01-01T00:00:00.000+00:00" &&
                                !isNaN(
                                  new Date(
                                    selectedOrder.unavailableDaysList[
                                      index
                                    ]?.endDate
                                  )
                                )
                                ? new Date(
                                  selectedOrder.unavailableDaysList[
                                    index
                                  ].endDate
                                )
                                  .toISOString()
                                  .slice(0, 10)
                                : "" // Show empty if the placeholder date or invalid date is found
                            }
                            onChange={(e) =>
                              handleUnAvailableListChange(
                                index,
                                e.target.value || "",
                                "endDate"
                              )
                            }
                          />
                        </td>

                        <td>
                          <Input
                            type="text"
                            value={
                              selectedOrder?.unavailableDaysList &&
                                selectedOrder.unavailableDaysList[index]?.desc
                                ? selectedOrder.unavailableDaysList[index].desc
                                : "" // Show empty if selectedOrder, unavailableDaysList, or desc is invalid
                            }
                            onChange={(e) =>
                              handleUnAvailableListChange(
                                index,
                                e.target.value || "",
                                "desc"
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(index, "desc", e, "unavailableList")
                            }
                          ></Input>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
            {/* <div className="mt-5 d-flex justify-content-end">
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
            </div> */}
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
