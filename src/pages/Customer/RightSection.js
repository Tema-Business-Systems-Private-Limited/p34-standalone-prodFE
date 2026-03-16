import React, { useRef, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import siteClass from "./css/siteClass.css";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CreatableSelect from "react-select/creatable";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const RightSide = ({
  selectedOrder,
  setSelectedOrder,
  handleUpdate,
  isCreate,
  handleDelete,
  error,
  setError,
  commonData,
  supplierList
}) => {
  const optionInsGeoCordinates = [
    { value: "1", label: "Block" },
    { value: "2", label: "Allow" },
  ];


  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [activeTab, setActiveTab] = useState("home");
  const fileInputRef = useRef(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierDetails, setSupplierDetails] = useState({});
  const [contactsData, setContactsData] = useState([
    { code: "", lastName: "" }
  ]);
  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        codar: "",
        xx10c_geoy: "",
        xx10c_geox: "",
        xx10c_servt: "",
        xupdvia: "",
        xupdusr: "",
        xupddatei: "",
      },
    ]);
  };
  const [addressList, setAddressList] = useState([]);




  const [addresses, setAddresses] = useState([
    {
      codar: "",
      xx10c_geoy: "",
      xx10c_geox: "",
      xx10c_servt: "",
      xupdvia: "",
      xupdusr: "",
      xupddatei: "",
    },
  ]);
  const vehicleClassOptions = [
    { value: "classA", label: "Class A" },
    { value: "classB", label: "Class B" },
    { value: "classC", label: "Class C" }
  ];
  const handleFieldChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value
    }));
  };


  const [allVehiclesChecked, setAllVehiclesChecked] = useState(false);
  const [vehicleList, setVehicleList] = useState([{ vehicleId: "", vehicle: "" }]);

  const vehicleMap = {
    VH001: "Tata Ace",
    VH002: "Eicher 1110",
    VH003: "Ashok Leyland",
  };

  const vehicleIdOptions = Object.keys(vehicleMap).map((id) => ({
    value: id,
    label: id,
  }));

  const vehicleNameOptions = Object.values(vehicleMap).map((name) => ({
    value: name,
    label: name,
  }));
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "34px",
      borderColor: "#ced4da",
      boxShadow: "none",
      fontSize: "14px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "#fff",
      color: "#000",
      fontSize: "14px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),
  };



  const handleVehicleSelectionChange = (index, selectedOption, type) => {
    let newVehicleId = "";
    let newVehicle = "";

    if (type === "id") {
      newVehicleId = selectedOption?.value || "";
      newVehicle = vehicleMap[newVehicleId] || "";
    } else if (type === "name") {
      newVehicle = selectedOption?.value || "";
      const matched = Object.entries(vehicleMap).find(
        ([id, name]) => name === newVehicle
      );
      newVehicleId = matched ? matched[0] : "";
    }

    const isDuplicate = vehicleList.some(
      (v, i) =>
        i !== index && (v.vehicleId === newVehicleId || v.vehicle === newVehicle)
    );

    const updated = [...vehicleList];

    if (isDuplicate) {
      toast.error(
        type === "id"
          ? "This Vehicle ID is already selected!"
          : "This Vehicle is already selected!",
        { position: "top-right", autoClose: 3000 }
      );
      updated[index] = { vehicleId: "", vehicle: "" };
    } else {
      updated[index] = { vehicleId: newVehicleId, vehicle: newVehicle };
    }

    setVehicleList(updated);
  };


  // const handleVehicleSelectionChange = (index, selectedOption, type) => {
  //   let newVehicleId = "";
  //   let newVehicle = "";

  //   if (type === "id") {
  //     newVehicleId = selectedOption?.value || "";
  //     newVehicle = vehicleMap[newVehicleId] || "";
  //   } else if (type === "name") {
  //     newVehicle = selectedOption?.value || "";
  //     const matched = Object.entries(vehicleMap).find(([id, name]) => name === newVehicle);
  //     newVehicleId = matched ? matched[0] : "";
  //   }

  //   // Check for duplicate
  //   const isDuplicate = vehicleList.some(
  //     (v, i) => i !== index && (v.vehicleId === newVehicleId || v.vehicle === newVehicle)
  //   );

  //   const updated = [...vehicleList];

  //   if (isDuplicate) {
  //     toast.error(
  //       type === "id"
  //         ? "This Vehicle ID is already selected!"
  //         : "This Vehicle is already selected!",
  //       { position: "top-right", autoClose: 3000 }
  //     );

  //     // Clear the field in state
  //     updated[index] = { vehicleId: "", vehicle: "" };
  //   } else {
  //     updated[index] = { vehicleId: newVehicleId, vehicle: newVehicle };
  //   }

  //   setVehicleList(updated);
  // };


  // const handleVehicleIdChange = (index, selectedOption) => {
  //   const updated = [...vehicleList];
  //   updated[index].vehicleId = selectedOption?.value || "";
  //   updated[index].vehicle = vehicleMap[selectedOption?.value] || "";
  //   setVehicleList(updated);
  // };

  // const handleVehicleChange = (index, selectedOption) => {
  //   const updated = [...vehicleList];
  //   updated[index].vehicle = selectedOption?.value || "";
  //   const matched = Object.entries(vehicleMap).find(
  //     ([id, name]) => name === selectedOption?.value
  //   );
  //   updated[index].vehicleId = matched ? matched[0] : "";
  //   setVehicleList(updated);
  // };

  const handleAddVehicleRow = () => {
    const lastRow = vehicleList[vehicleList.length - 1];

    if (!lastRow.vehicleId || !lastRow.vehicle) {
      toast.error("Please fill the current vehicle row before adding a new one.");
      return;
    }

    setVehicleList([...vehicleList, { vehicleId: "", vehicle: "" }]);
  };
  const handleDeleteVehicleRow = (index) => {
    if (index === 0) {
      // First row: clear fields
      const resetRow = Object.fromEntries(
        Object.keys(vehicleList[0]).map((key) => [key, ""])
      );
      const updatedList = [...vehicleList];
      updatedList[0] = resetRow;
      setVehicleList(updatedList);
      return;
    }

    // Other rows: delete regardless of content
    const updatedList = [...vehicleList];
    updatedList.splice(index, 1);
    setVehicleList(updatedList);
  };



  const [allDriversChecked, setAllDriversChecked] = useState(false);
  const [driverList, setDriverList] = useState([{ loaderId: "", driver: "" }]);

  const loaderDriverMap = {
    LDR01: "John Doe",
    LDR02: "Jane Smith",
    LDR03: "Mike Johnson",
  };

  // When Loader ID changes




  const driverIdSelectOptions = Object.keys(loaderDriverMap).map((id) => ({
    value: id,
    label: id,
  }));

  const driverNameSelectOptions = Object.values(loaderDriverMap).map((name) => ({
    value: name,
    label: name,
  }));


  // Handler for selection
  const handleDriverSelectionChange = (index, selectedValue, type) => {
    const updatedList = [...driverList];

    let newLoaderId = "";
    let newDriverName = "";

    if (type === "id") {
      newLoaderId = selectedValue || "";
      newDriverName = loaderDriverMap[newLoaderId] || "";
    } else if (type === "name") {
      newDriverName = selectedValue || "";
      newLoaderId = Object.keys(loaderDriverMap).find(
        (id) => loaderDriverMap[id] === newDriverName
      ) || "";
    }

    // Duplicate check
    const isDuplicate = driverList.some(
      (d, i) => i !== index && (d.loaderId === newLoaderId || d.driver === newDriverName)
    );

    if (isDuplicate) {
      toast.error(
        type === "id"
          ? "This Driver ID is already selected!"
          : "This Driver Name is already selected!",
        { position: "top-right", autoClose: 3000 }
      );

      updatedList[index] = { loaderId: "", driver: "" };
      setDriverList(updatedList);
      return;
    }

    updatedList[index] = { loaderId: newLoaderId, driver: newDriverName };
    setDriverList(updatedList);
  };


  // const handleDriverIdChange = (index, value) => {
  //   const updatedList = [...driverList];
  //   updatedList[index].loaderId = value;
  //   setDriverList(updatedList);
  // };



  // const handleDriverNameChange = (index, value) => {
  //   const updatedList = [...driverList];
  //   updatedList[index].driver = value;
  //   setDriverList(updatedList);
  // };


  const handleDeleteDriverRow = (index) => {
    if (index === 0) {
      // First row: clear fields
      const resetRow = Object.fromEntries(
        Object.keys(driverList[0]).map((key) => [key, ""])
      );
      const updatedList = [...driverList];
      updatedList[0] = resetRow;
      setDriverList(updatedList);
      return;
    }

    // Other rows: delete regardless of content
    const updatedList = [...driverList];
    updatedList.splice(index, 1);
    setDriverList(updatedList);
  };


  const handleAddDriverRow = () => {
    const lastRow = driverList[driverList.length - 1];

    console.log("Last row state before add:", lastRow); // 👈 see what's stored

    if (!lastRow.loaderId || !lastRow.driver) {
      toast.error("Please fill the current driver row before adding a new one.");
      return;
    }

    setDriverList([...driverList, { loaderId: "", driver: "" }]);
  };





  const handleScrollTo = (e, id) => {
    e.preventDefault();

    const container = document.getElementById("cardbody");
    const target = document.getElementById(id);

    if (container && target) {
      const stickyOffset = 40; // your sticky header height
      const extraMargin = 8;   // equivalent to mt-2

      container.scrollTo({
        top: target.offsetTop - stickyOffset - extraMargin,
        behavior: "smooth",
      });

      // Update active tab
      setActiveTab(id);
    }
  };

  const handleCategorySelect = (value) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      bsgcod: value,
    }));
  };



  const onChangeSupname = (e) => {
    setSelectedOrder({ ...selectedOrder, suppliername: e.target.value });
  };

  const handleChangeTypeList = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, x1cgeoso: Number(selectedOption.value) });
  };

  const onChangeShortDescription = (e) => {
    setSelectedOrder({ ...selectedOrder, bprsho: e.target.value });
  };

  const onChangeCompany1 = (e) => {
    setSelectedOrder({ ...selectedOrder, bprnam1: e.target.value });
  }
  const onChangeCompany2 = (e) => {
    setSelectedOrder({ ...selectedOrder, bprnam2: e.target.value });
  }
  const onChangeLatitude = (e) => {
    setSelectedOrder({ ...selectedOrder, xx10c_geox: e.target.value });
  }

  const onChangeAcronym = (e) => {
    setSelectedOrder({ ...selectedOrder, bprlog: e.target.value });
  };


  const onChangeLongitude = (e) => {
    setSelectedOrder({ ...selectedOrder, xx10c_geox: e.target.value });
  };
  const handleActiveCheckboxChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      enaflg: selectedOrder.enaflg === 1 ? 2 : 1,
    });
  };
  const onChangeUpdatedUser = (e) => {
    setSelectedOrder({ ...selectedOrder, xupdusr: e.target.value });
  };
  const handleDefaultWarehouseChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



  const driverIdOptions = [
    { value: "D001", label: "D001" },
    { value: "D002", label: "D002" },
  ];

  const driverNameOptions = [
    { value: "John Smith", label: "John Smith" },
    { value: "Jane Doe", label: "Jane Doe" },
  ];




  const onChangeUpdatedDate = (e) => {
    const inputValue = e.target.value;

    if (!inputValue) {
      // If cleared manually from input
      setSelectedOrder({
        ...selectedOrder,
        xupddate: ""
      });
      return;
    }

    const year = new Date(inputValue).getFullYear();
    if (year > 9999) {

      return;
    }

    let formattedValue = new Date(inputValue).toISOString();
    if (formattedValue.endsWith("Z")) {
      formattedValue = formattedValue.slice(0, -1) + "+00:00";
    }

    setSelectedOrder({
      ...selectedOrder,
      xupddate: formattedValue,
    });
  };



  const onChangeUpdatedThrough = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, xupdvia: Number(selectedOption.value) });
  };


  const onChangeProdList = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, xbaseprllst: Number(selectedOption.value) });
  };
  const handleCheckFinancial = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      finflg: selectedOrder.finflg === 1 ? 2 : 1,
    });
  };

  const onChangeFinanceSite = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, finsite: Number(selectedOption.value) });
  };


  const onChangeAccounting = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, acccod: Number(selectedOption.value) });
  };



  const onChangeTitle = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, kcntttl: Number(selectedOption.value) });
  };
  const onChangeFunction = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, kcntfnc: Number(selectedOption.value) });
  };
  const onChangeRole = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, kcntmss: Number(selectedOption.value) });
  };
  const handleDateChange = (date) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      dob: date,
    }));
  };

  const onChangeConEmail = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, kcntweb: Number(selectedOption.value) });
  };
  const handleKcntDropdownChange = (field, selected) => {
    setSelectedOrder(prev => ({
      ...prev,
      [field]: selected ? selected.value : ""
    }));
  };


  const handleKcntInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleContactFieldChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleDasFieldsChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleCarrierAndBankChange = (field, selectedOption) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
  };
  const handleTimeChange = (field, value) => {
    const cleaned = value.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
    }

    if (formatted.length <= 5) {
      setSelectedOrder((prev) => ({
        ...prev,
        [field]: formatted,
      }));
    }
  };


  const handleLegalFieldsChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



  const handleDas2Change = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleWorkdaysChange = (day) => {
    let days = [];


    if (typeof selectedOrder.uvyday === "string") {
      days = selectedOrder.uvyday.split(",").filter(Boolean);
    } else if (Array.isArray(selectedOrder.uvyday)) {
      days = selectedOrder.uvyday;
    } else {
      days = [];
    }

    const updatedDays = days.includes(day)
      ? days.filter((d) => d !== day)
      : [...days, day];

    setSelectedOrder((prev) => ({
      ...prev,
      uvyday: updatedDays.join(","),
    }));
  };


  const onChangeLastName = (e) => {
    setSelectedOrder({ ...selectedOrder, kcntlna: e.target.value });
  };
  const onChangeFirstName = (e) => {
    setSelectedOrder({ ...selectedOrder, kcntfna: e.target.value });
  };
  const onChangeDepartment = (e) => {
    setSelectedOrder({ ...selectedOrder, kcntsrv: e.target.value });
  };

  const addAnalyticalDimension = () => {
    setSelectedOrder({
      ...selectedOrder,
      analyticalDimension: [
        ...selectedOrder.analyticalDimension,
        {
          dimensionType: "",
          dimensionTypeDescription: "",
          analyticalDimension: "",
          analyticalDimensionDescription: ""
        }
      ]
    });
  };

  const removeAnalyticalDimension = (index) => {
    const updatedList = [...selectedOrder.analyticalDimension];
    updatedList.splice(index, 1);
    setSelectedOrder({ ...selectedOrder, analyticalDimension: updatedList });
  };

  const handleAnalyticalDimensionChange = (index, key, value) => {
    const updatedList = [...selectedOrder.analyticalDimension];
    updatedList[index][key] = value;
    setSelectedOrder({ ...selectedOrder, analyticalDimension: updatedList });
  };




  const handleRemoveAddress = (index) => {
    const updated = [...selectedOrder.addresses];
    updated.splice(index, 1);

    console.log("Address removed:", updated);

    setSelectedOrder({ ...selectedOrder, addresses: updated });
  };
  const onChangeCode = (e) => {
    setSelectedOrder({ ...selectedOrder, code: e.target.value });
  }
  const onChangeDetailDescription = (e) => {
    setSelectedOrder({ ...selectedOrder, xbpades: e.target.value });
  }
  const onChangeDetailCountry = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, xbpacry: Number(selectedOption.value) });
  };
  const onChangeDetailDescriptionCountry = (e) => {
    setSelectedOrder({ ...selectedOrder, countrydes: e.target.value });
  };
  const onChangeDetailType = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, xaddtypsa: Number(selectedOption.value) });
  };
  const onChangeDetailTypeService = (e) => {
    setSelectedOrder({ ...selectedOrder, typser: e.target.value });
  };
  const onChangeContactCode = (e) => {
    setSelectedOrder({ ...setSelectedOrder, contactcode: Number(e.target.value) });
  };


  const handleWarehouseCheckboxChange = () => {
    setSelectedOrder((prev) => ({
      ...prev,
      whsmgtflg: prev.whsmgtflg === 2 ? 1 : 2,
    }));
  };

  const onChangeDetailUnitPostal = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xaddposnbrsa: Number(e.target.value),
    });
  };

  const onChangeDetailComplex = (e) => {
    setSelectedOrder({ ...selectedOrder, xaddcpxsa: e.target.value });
  };


  const handleContactInfoChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const onChangeDetailAddress = (e) => {
    const { name, value } = e.target;
    setSelectedOrder({
      ...selectedOrder,
      [name]: value,
    });
  };

  const onChangeCityStatePostal = (field, selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      [field]: selectedOption ? selectedOption.value : "",
    });
  };


  const onChangeDetailWebsite = (e) => {
    setSelectedOrder({ ...selectedOrder, xfcyweb: e.target.value });
  };
  const onChangeDetailExternal = (e) => {
    setSelectedOrder({ ...selectedOrder, xextnum: e.target.value });
  };
  const onCheckDefaultAddress = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xbpaaddflg: e.target.checked ? 2 : 1,
    });
  };
  const handleCheckboxChange = (field, isChecked) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      [field]: isChecked ? 1 : 0,
    }));
  };



  const onChangeTelephone = (e) => {
    const { name, value } = e.target;
    setSelectedOrder({
      ...selectedOrder,
      [name]: value,
    });
  };





  const onChangeEmail = (key, selectedOption) => {
    setSelectedOrder({
      ...selectedOrder,
      [key]: selectedOption ? selectedOption.value : "",
    });
  };

  const [bankTableData, setBankTableData] = useState([
    {
      country: "",
      bankAcctNumber: "",
      isDefault: "",
      address: "",
      isrCustomerNo: "",
      payingBank: "",
      beneficiary: "",
      payingBank2: "",
      payingBank3: "",
      payingBank4: "",
      bicCode1: "",
      intermediaryBank: "",
      payingBank1: "",
      payingBank22: "",
      payingBank33: "",
      bicCode2: "",
      country2: "",
    },
  ]);

  const handleDropdownChange = (index, key, value) => {
    const updated = [...bankTableData];
    updated[index][key] = value;
    setBankTableData(updated);
  };

  const handleAddRow = () => {
    setBankTableData([
      ...bankTableData,
      {
        country: "",
        bankAcctNumber: "",
        isDefault: "",
        address: "",
        isrCustomerNo: "",
        payingBank: "",
        beneficiary: "",
        payingBank2: "",
        payingBank3: "",
        payingBank4: "",
        bicCode1: "",
        intermediaryBank: "",
        payingBank1: "",
        payingBank22: "",
        payingBank33: "",
        bicCode2: "",
        country2: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...bankTableData];
    updated.splice(index, 1);
    setBankTableData(updated);
  };

  const handleContactsTableChange = (action, index = null, key = null, value = null) => {
    const updated = [...contactsData];

    if (action === "add") {
      updated.push({ code: "", lastName: "" });
    } else if (action === "update" && index !== null && key) {
      updated[index][key] = value;
    } else if (action === "remove" && index !== null) {
      updated.splice(index, 1);
    }

    setContactsData(updated);
  };




  useEffect(() => {
    if (bankTableData.length === 0) {
      handleAddRow();
    }
  }, []);





  useEffect(() => {
    console.log("Analytical Dimensions List:", selectedOrder.analyticalDimension);
  }, [selectedOrder.analyticalDimension]);



  const handleChangeCountryLanCur = (field, value) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleCrnNafChange = (field, value) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleRexVatChange = (field, value) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleVerifiedChange = (isChecked) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      verified: isChecked ? 1 : 0,
    }));
  };

  const handleIntersiteChange = (isChecked) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      betfcy: isChecked ? 1 : 0,
    }));
  };


  const handleSiteChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      euvatno: value,
    }));
  };
  const handleRoleChange = (key, isChecked) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [key]: isChecked ? 1 : 0,
    }));
  };




  const handleDeleteAddress = (index) => {
    if (addresses.length === 1) return;
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
  };
  const handleAddress = (index) => {
    if (index === 0) {
      // First row: just clear fields
      const resetAddress = Object.fromEntries(
        Object.keys(addresses[0]).map((key) => [key, ""])
      );
      const updatedAddresses = [...addresses];
      updatedAddresses[0] = resetAddress;
      setAddresses(updatedAddresses);
      return;
    }

    // Other rows: delete regardless of content
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };


  const isFirstRowEmpty = () => {
    const row = addresses[0];
    return (
      !row.codar?.trim() &&
      !row.xx10c_geoy?.trim() &&
      !row.xx10c_geox?.trim() &&
      !row.xx10c_servt?.trim() &&
      !row.xupdvia?.trim() &&
      !row.xupdusr?.trim() &&
      !row.xupddatei
    );
  };


  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };
  const isRowFilled = (row) => {
    return Object.values(row).every(
      (value) => value !== null && value !== undefined && value !== ""
    );
  };

  const handleAddAddressRow = () => {
    if (addresses.length > 0 && !isRowFilled(addresses[addresses.length - 1])) {
      toast.error("Please fill all fields in the last row before adding a new one.");
      return;
    }

    const newRow = {
      codar: "",
      xx10c_geoy: "",
      xx10c_geox: "",
      xx10c_servt: "",
      xupdvia: "",
      xupdusr: "",
      xupddatei: "",
    };

    setAddresses([...addresses, newRow]);
  };



  const handleTeleChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleEmailChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleLoaderSelect = (index, loaderId) => {
    const updated = [...driverList];
    updated[index].loaderId = loaderId;
    updated[index].driver = loaderDriverMap[loaderId] || "";
    setDriverList(updated);
  };

  // Auto-fill when Driver selected
  const handleDriverSelect = (index, driverName) => {
    const updated = [...driverList];
    updated[index].driver = driverName;
    const matchingEntry = Object.entries(loaderDriverMap).find(
      ([id, name]) => name === driverName
    );
    updated[index].loaderId = matchingEntry ? matchingEntry[0] : "";
    setDriverList(updated);
  };
  const driverOptions = [
    { id: "D001", name: "John Doe" },
    { id: "D002", name: "Jane Smith" },
  ];


  const handleLoaderIdChange = (index, selected) => {
    const updated = [...driverList];
    updated[index].loaderId = selected ? selected.value : "";
    // auto-fill driver name
    const matched = driverOptions.find((opt) => opt.id === selected?.value);
    if (matched) updated[index].driver = matched.name;
    setDriverList(updated);
  };

  const handleDriverChange = (index, field, value) => {
    const updated = [...driverList];

    if (field === "loaderId") {
      updated[index]["loaderId"] = value;

      // Auto-fill driver if loaderId is in the map, else keep current driver
      updated[index]["driver"] = loaderDriverMap[value] || "";
    } else if (field === "driver") {
      updated[index]["driver"] = value;
    }

    setDriverList(updated);
  };


  const handleCustomerTypeChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";

    setSelectedOrder((prev) => ({
      ...prev,
      bpctyp: value,
    }));
  };

  const handleWorkDayChange = (key, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  const handleSalesDayChange = (key, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAltVisitDayChange = (key, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [deliveryTimeList, setDeliveryTimeList] = useState([
    { fromTime: "", tillTime: "" },
  ]);

  const handleDeliveryTimeChange = (index, field, value) => {
    const updated = [...deliveryTimeList];
    updated[index][field] = value;
    setDeliveryTimeList(updated);
  };

  const handleAddDeliveryTimeRow = () => {
    const lastRow = deliveryTimeList[deliveryTimeList.length - 1];

    if (!lastRow.fromTime || !lastRow.tillTime) {
      toast.error("Please fill in the current Delivery Time row before adding a new one.");
      return;
    }

    setDeliveryTimeList([...deliveryTimeList, { fromTime: "", tillTime: "" }]);
  };

  const handleDeleteDeliveryTimeRow = (index) => {
    if (index === 0) {
      // First row: just clear fields
      const resetRow = Object.fromEntries(
        Object.keys(deliveryTimeList[0]).map((key) => [key, ""])
      );
      const updatedList = [...deliveryTimeList];
      updatedList[0] = resetRow;
      setDeliveryTimeList(updatedList);
      return;
    }

    // Other rows: delete regardless of content
    const updatedList = [...deliveryTimeList];
    updatedList.splice(index, 1);
    setDeliveryTimeList(updatedList);
  };




  const handleRouteCodeChange = (selectedOption) => {
    setSelectedOrder((prev) => ({
      ...prev,
      routeCode: selectedOption ? selectedOption.value : "",
    }));
  };



  const handleDeliveryPriorityChange = (selectedOption) => {
    setSelectedOrder((prev) => ({
      ...prev,
      deliveryPriority: selectedOption ? selectedOption.value : "",
    }));
  };


  const handleDeliveryChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaymentChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTaxRuleChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));


    if (value.trim()) {
      setError((prev) => ({ ...prev, [field]: "" }));
    }
  };


  const handleRoleCheckboxChange = (field, value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreditControlChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      creditControl: value,
    }));
  };




  // Placeholder handlers (still empty)
  const onChangeDescription = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      fcynam: e.target.value,
    });
  };


  const onChangeCountry = () => { };
  const onChangeNoOfAxle = () => { };
  const onChangeMaxWeight = () => { };
  const onChangeMaxVolume = () => { };
  const onChangeSkillNumber = () => { };
  const handleImageUpload = () => { };
  const handleRemoveImage = () => { };
  const handleChangeCheckinMandatory = () => { };
  const handleChangeCheckOutMandatory = () => { };
  const onChangeInspectionOut = () => { };
  const confirmDelete = () => { };

  const optionsInspCheckInOut = [
    { value: 1, label: "Yes" },
    { value: 2, label: "No" },
  ];

  return (

    <Card className="h-100 m-0" style={{ color: "black", fontSize: "16px" }}>
      <CardBody
        className="relative py-0 px-2 m-0 overflow-y-auto"
        style={{
          maxHeight: "calc(85vh - 156px)",
          paddingRight: "8px",
          scrollBehavior: "smooth",
        }}
        id="cardbody"
      >

        {selectedOrder ? (
          <Form>
            <div className="sticky top-0 z-10 bg-white shadow-sm">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-6 border-b px-4 pt-2 text-base font-medium whitespace-nowrap min-w-max">
                  {[
                    { id: "home", label: "Home" },
                    { id: "addresses", label: "Addresses" },
                    { id: "management", label: "Management" },
                    { id: "payment", label: "Financial" },
                    { id: "workdays", label: "Ship-To-Customer" },


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
            </div>




            <div id="home" className="mt-3 mb-2 responsive-form">
              <div className="flex flex-wrap gap-6">

                {/* Category - narrower */}
                <FormGroup className="form-item text-input" style={{ maxWidth: "300px" }}>
                  <Label for="site">
                    Category <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  </Label>
                  <Select
                    options={commonData?.supplierList || []}
                    value={
                      (commonData?.supplierList || []).find(
                        (option) => option.value === selectedOrder.bsgcod
                      ) || null
                    }
                    formatOptionLabel={(option) => (
                      <div>
                        {option.value} ({option.label})
                      </div>
                    )}
                    onChange={(selectedOption) =>
                      handleCategorySelect(selectedOption ? selectedOption.value : null)
                    }
                    placeholder="Select"
                    isClearable
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: "32px",
                        height: "32px",
                        fontSize: "0.875rem",
                      }),
                      container: (base) => ({
                        ...base,
                        width: "100%",
                      }),
                    }}
                  />
                  {error.site && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {error.site}
                    </div>
                  )}
                </FormGroup>


                <FormGroup
                  check
                  className="form-item checkbox-input mt-8"
                  style={{ minWidth: "120px", marginLeft: "35px" }}
                >
                  <Label
                    check
                    className="flex items-center gap-2"
                    style={{ position: "relative", top: "-30px" }}
                  >
                    <Input
                      type="checkbox"
                      checked={selectedOrder.enaflg === 2}
                      onChange={handleActiveCheckboxChange}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium ml-2">Active</span>

                  </Label>
                </FormGroup>




                {/* Customer text input */}
                <FormGroup className="form-item text-input" style={{ minWidth: "240px" }}>
                  <Label>Customer</Label>
                  <Input
                    type="text"
                    value={selectedOrder.suppliername}
                    onChange={onChangeSupname}
                  />
                </FormGroup>
                <FormGroup className="form-item text-input">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Customer Description</Label>
                  <Input
                    type="text"
                    className="w-[250px] h-[36px] text-sm"
                    value={selectedOrder.fcynam}
                    onChange={onChangeDescription}
                    disabled
                  />
                </FormGroup>


              </div>
            </div>



            <div id="identity" className="mt-3 mb-2 ">
              <div className="section-header">
                <h3>Identity</h3>
              </div>

              <div className="section-body">
                <FormGroup>
                  <Label>Short Description</Label>
                  <Input
                    type="text"
                    value={selectedOrder.bprsho}
                    onChange={onChangeShortDescription}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Country</Label>
                  <Select
                    options={commonData?.countryList || []}
                    value={
                      (commonData?.countryList || []).find(
                        (option) => option.value === selectedOrder.cry
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      handleChangeCountryLanCur("cry", selectedOption ? selectedOption.value : "")
                    }
                    placeholder="Select Country"
                    isClearable
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Language</Label>
                  <Select
                    options={commonData?.languageList || []}
                    value={
                      (commonData?.languageList || []).find(
                        (option) => option.value === selectedOrder.lan
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      handleChangeCountryLanCur("lan", selectedOption ? selectedOption.value : "")
                    }
                    placeholder="Select Language"
                    isClearable
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Currency</Label>
                  <Select
                    options={commonData?.currencyList || []}
                    value={
                      (commonData?.currencyList || []).find(
                        (option) => option.value === selectedOrder.cur
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      handleChangeCountryLanCur("cur", selectedOption ? selectedOption.value : "")
                    }
                    placeholder="Select Currency"
                    isClearable
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Site tax ID no.</Label>
                  <Input
                    type="text"
                    value={selectedOrder.crn}
                    onChange={(e) => handleCrnNafChange("crn", e.target.value)}
                    placeholder="Enter Site tax ID no."
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>SIC code</Label>
                  <Input
                    type="text"
                    value={selectedOrder.naf}
                    onChange={(e) => handleCrnNafChange("naf", e.target.value)}
                    placeholder="Enter SIC code"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>REX number</Label>
                  <Input
                    type="text"
                    value={selectedOrder.rexno}
                    onChange={(e) => handleRexVatChange("rexno", e.target.value)}
                    placeholder="Enter REX number"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>EU VAT no.</Label>
                  <Input
                    type="text"
                    value={selectedOrder.euvatno}
                    onChange={(e) => handleRexVatChange("euvatno", e.target.value)}
                    placeholder="Enter EU VAT number"
                  />
                </FormGroup>
                <FormGroup
                  check
                  className="form-item checkbox-input mt-4"
                  style={{ minWidth: "120px", marginLeft: "10px" }} // You can increase value as needed
                >
                  <Label
                    check
                    className="flex items-center gap-2"
                    style={{ position: "relative", top: "10px" }}
                  >
                    <Input
                      type="checkbox"
                      checked={selectedOrder.verified === 2}
                      onChange={handleVerifiedChange}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium ml-2">Verified</span>
                  </Label>
                </FormGroup>
              </div>
            </div>


            <div className="mt-3 mb-2 ">
              <div id="intersite">
                <div className="section-header">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-2">Intersites</h3>
                </div>
                <div className="section-body flex items-center gap-4">

                  <FormGroup check className="form-item mb-0">
                    <Label className="mb-1">
                      <Input
                        type="checkbox"
                        checked={selectedOrder.betfcy === 1}
                        onChange={(e) => handleIntersiteChange(e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">Intersite</span>
                    </Label>
                  </FormGroup>

                  {/* Site Input */}
                  <FormGroup className="form-item mb-0">
                    <Label className="mb-1">Site</Label>
                    <Input
                      type="text"
                      value={selectedOrder.site}
                      onChange={handleSiteChange}
                      style={{ width: "200px" }}
                      placeholder="Enter Site"
                    />
                  </FormGroup>
                </div>
              </div>
            </div>




            <div className="mt-3 mb-2"> {/* Ensures vertical stacking */}
              <div id="roles">
                <div className="section-header">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">Customer Roles</h3>
                </div>

                {/* Section Body */}
                <div className="section-body flex flex-wrap justify-content-between gap-4">
                  <FormGroup check>
                    <Label check className="flex items-center  gap-2">
                      <Input
                        type="checkbox"
                        checked={selectedOrder.salesRep || false}
                        onChange={(e) => handleRoleCheckboxChange("salesRep", e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">Sales Rep</span>
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Label check className="flex items-center">
                      <Input
                        type="checkbox"
                        checked={selectedOrder.prospect || false}
                        onChange={(e) => handleRoleCheckboxChange("prospect", e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">Prospect</span>
                    </Label>
                  </FormGroup>


                  <FormGroup check>
                    <Label check className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        checked={selectedOrder.publicSector || false}
                        onChange={(e) => handleRoleCheckboxChange("publicSector", e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">Public Sector</span>
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Label check className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        checked={selectedOrder.supplier || false}
                        onChange={(e) => handleRoleCheckboxChange("supplier", e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">Supplier</span>
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Label check className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        checked={selectedOrder.miscellaneousBP || false}
                        onChange={(e) => handleRoleCheckboxChange("miscellaneousBP", e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">Miscellaneous BP</span>
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Label check className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        checked={selectedOrder.serviceSupplier || false}
                        onChange={(e) => handleRoleCheckboxChange("serviceSupplier", e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">Service Supplier</span>
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Label check className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        checked={selectedOrder.carrier || false}
                        onChange={(e) => handleRoleCheckboxChange("carrier", e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">Carrier</span>
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Label check className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        checked={selectedOrder.serviceCaller || false}
                        onChange={(e) => handleRoleCheckboxChange("serviceCaller", e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">Service Caller</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
            </div>

            <div id="addresses" className="mt-3 mb-0">

              <div className="section-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">Addresses</h3>

                  <Button
                    color="primary"
                    size="sm"
                    onClick={handleAddAddressRow}
                  >
                    +
                  </Button>
                </div>
              </div>



              <div className="table-responsive">
                <Table
                  responsive
                  striped
                  bordered
                  hover
                  className="mt-0 border-collapse"
                  style={{ marginTop: 0 }}
                >
                  <thead className="text-center" style={{ color: "black" }}>
                    <tr>
                      <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                      <th style={{ background: "#CCD6DB" }}>Actions</th>
                      <th style={{ background: "#CCD6DB" }}>Address Code</th>
                      <th style={{ background: "#CCD6DB" }}>Longitude</th>
                      <th style={{ background: "#CCD6DB" }}>Latitude</th>
                      <th style={{ background: "#CCD6DB" }}>Service Time</th>
                      <th style={{ background: "#CCD6DB" }}>Updated Through</th>
                      <th style={{ background: "#CCD6DB" }}>Updated User</th>
                      <th style={{ background: "#CCD6DB" }}>Updated Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {addresses.map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>

                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => handleAddress(index)}
                            title={
                              index === 0
                                ? "Clear this row"
                                : "Delete Address"
                            }
                            disabled={
                              // Disable if first row is the only row AND all fields are empty
                              index === 0 &&
                              addresses.length === 1 &&
                              Object.values(addresses[0]).every((val) => val?.trim?.() === "")
                            }
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button>



                          {/* <Button
                            size="sm"
                            color="danger"
                            onClick={() => handleAddress(index)}
                            disabled={addresses.length === 1}
                            title={
                              addresses.length === 1
                                ? "At least one address is required"
                                : "Delete Address"
                            }
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button> */}
                        </td>

                        <td>
                          <Input
                            type="text"
                            value={row.codar || ""}
                            onChange={(e) =>
                              handleAddressChange(index, "codar", e.target.value)
                            }
                          />
                        </td>

                        <td>
                          <Input
                            type="text"
                            value={row.xx10c_geoy || ""}
                            onChange={(e) =>
                              handleAddressChange(index, "xx10c_geoy", e.target.value)
                            }
                          />
                        </td>

                        <td>
                          <Input
                            type="text"
                            value={row.xx10c_geox || ""}
                            onChange={(e) =>
                              handleAddressChange(index, "xx10c_geox", e.target.value)
                            }
                          />
                        </td>

                        <td>
                          <Input
                            type="text"
                            value={row.xx10c_servt || ""}
                            onChange={(e) =>
                              handleAddressChange(index, "xx10c_servt", e.target.value)
                            }
                          />
                        </td>

                        <td>
                          <Input
                            type="text"
                            value={row.xupdvia || ""}
                            onChange={(e) =>
                              handleAddressChange(index, "xupdvia", e.target.value)
                            }
                          />
                        </td>

                        <td>
                          <Input
                            type="text"
                            value={row.xupdusr || ""}
                            onChange={(e) =>
                              handleAddressChange(index, "xupdusr", e.target.value)
                            }
                          />
                        </td>

                        <td>
                          <Input
                            type="date"
                            value={row.xupddatei || ""}
                            onChange={(e) =>
                              handleAddressChange(index, "xupddatei", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>



            </div>
            <div id="telephone" className="section-header mt-1 mb-3">
              <h3 >Telephone</h3>
              <div className="section-body">
                <FormGroup className="form-item text-input">
                  <Label>Landline</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xtel1}
                    onChange={(e) => handleTeleChange("xtel1", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Fax</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xtel2}
                    onChange={(e) => handleTeleChange("xtel2", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Toll Free</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xtel3}
                    onChange={(e) => handleTeleChange("xtel3", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Other</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xtel4}
                    onChange={(e) => handleTeleChange("xtel4", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Mobile</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xtel5}
                    onChange={(e) => handleTeleChange("xtel5", e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>



            <div id="email" className="section-header">
              <h3 >Emails</h3>
              <div className="section-body">
                <FormGroup className="form-item text-input">
                  <Label>Email</Label>
                  <Input
                    type="select"
                    value={selectedOrder.xweb1}
                    onChange={(e) => handleEmailChange("xweb1", e.target.value)}
                  >
                    <option value="">Select Email</option>
                    <option value="email1@example.com">email1@example.com</option>
                    <option value="email2@example.com">email2@example.com</option>
                    <option value="email3@example.com">email3@example.com</option>
                  </Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Other Email 2</Label>
                  <Input
                    type="select"
                    value={selectedOrder.xweb2}
                    onChange={(e) => handleEmailChange("xweb2", e.target.value)}
                  >
                    <option value="">Select Email</option>
                    <option value="other2@example.com">other2@example.com</option>
                    <option value="alt2@example.com">alt2@example.com</option>
                    <option value="user2@example.com">user2@example.com</option>
                  </Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Other Email 3</Label>
                  <Input
                    type="select"
                    value={selectedOrder.xweb3}
                    onChange={(e) => handleEmailChange("xweb3", e.target.value)}
                  >
                    <option value="">Select Email</option>
                    <option value="other3@example.com">other3@example.com</option>
                    <option value="alt3@example.com">alt3@example.com</option>
                    <option value="user3@example.com">user3@example.com</option>
                  </Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Other Email 4</Label>
                  <Input
                    type="select"
                    value={selectedOrder.xweb4}
                    onChange={(e) => handleEmailChange("xweb4", e.target.value)}
                  >
                    <option value="">Select Email</option>
                    <option value="other4@example.com">other4@example.com</option>
                    <option value="alt4@example.com">alt4@example.com</option>
                    <option value="user4@example.com">user4@example.com</option>
                  </Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Other Email 5</Label>
                  <Input
                    type="select"
                    value={selectedOrder.xweb5}
                    onChange={(e) => handleEmailChange("xweb5", e.target.value)}
                  >
                    <option value="">Select Email</option>
                    <option value="other5@example.com">other5@example.com</option>
                    <option value="alt5@example.com">alt5@example.com</option>
                    <option value="user5@example.com">user5@example.com</option>
                  </Input>
                </FormGroup>
              </div>
            </div>

            {/* 
            <div className="w-full mb-4">
              <div id="drivers" className="mt-3">

                <div className="section-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">Drivers</h3>


                    <Button
                      color="primary"
                      size="sm"
                      onClick={handleAddDriverRow}
                      disabled={allDriversChecked}
                    >
                      +
                    </Button>
                    <FormGroup check className="mb-0">
                      <Label check className="mb-0">
                        <Input
                          type="checkbox"
                          checked={allDriversChecked}
                          onChange={(e) => setAllDriversChecked(e.target.checked)}
                        />{" "}
                        All Drivers
                      </Label>
                    </FormGroup>
                  </div>
                </div>
                <div className="table-responsive">
                  <Table responsive striped bordered hover className="mt-2">
                    <thead className="text-center" style={{ color: "black" }}>
                      <tr>
                        <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                        <th style={{ background: "#CCD6DB" }}>Actions</th>
                        <th style={{ background: "#CCD6DB" }}>Driver ID</th>
                        <th style={{ background: "#CCD6DB" }}>Driver Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driverList.map((row, index) => (
                        <tr key={index} className="text-center">
                          <td>{index + 1}</td>
                          <td>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() => handleDeleteDriverRow(index)}
                              disabled={driverList.length === 1 || allDriversChecked}
                              style={{
                                backgroundColor:
                                  allDriversChecked || driverList.length === 1
                                    ? "#f8d7da"
                                    : "#dc3545",
                                borderColor:
                                  allDriversChecked || driverList.length === 1
                                    ? "#f5c6cb"
                                    : "#dc3545",
                                cursor:
                                  allDriversChecked || driverList.length === 1
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              <i className="ri-delete-bin-line" />
                            </Button>
                          </td>
                          <td>
                            <Select
                              isDisabled={allDriversChecked}
                              options={driverIdOptions}
                              value={driverIdOptions.find((opt) => opt.value === row.loaderId)}
                              onChange={(selected) => handleDriverSelectionChange(index, selected?.value || "", "id")}
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                              menuShouldBlockScroll={true}
                              styles={{
                                ...customSelectStyles,
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              }}
                              isClearable
                            />

                          </td>

                          <td>
                            <Select
                              isDisabled={allDriversChecked}
                              options={driverNameOptions}
                              value={driverNameOptions.find((opt) => opt.value === row.driver)}
                              onChange={(selected) => handleDriverSelectionChange(index, selected?.value || "", "name")}
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                              menuShouldBlockScroll={true}
                              styles={{
                                ...customSelectStyles,
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              }}
                              isClearable
                            />

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                </div>
              </div>
            </div> */}



            <div className="w-full mb-2">
              <div id="drivers" className="mt-3">
                <div className="section-header d-flex justify-content-between align-items-center mb-0">
                  <div className="d-flex align-items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">Drivers</h3>

                    <Button
                      color="primary"
                      size="sm"
                      onClick={handleAddDriverRow}
                      disabled={allDriversChecked}
                    >
                      +
                    </Button>

                    <FormGroup check className="mb-0">
                      <Label check className="mb-0">
                        <Input
                          type="checkbox"
                          checked={allDriversChecked}
                          onChange={(e) => setAllDriversChecked(e.target.checked)}
                        />{" "}
                        All Drivers
                      </Label>
                    </FormGroup>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table responsive striped bordered hover className="mb-0">
                    <thead className="text-center" style={{ color: "black" }}>
                      <tr>
                        <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                        <th style={{ background: "#CCD6DB" }}>Actions</th>
                        <th style={{ background: "#CCD6DB" }}>Driver ID</th>
                        <th style={{ background: "#CCD6DB" }}>Driver Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driverList.map((row, index) => (
                        <tr key={index} className="text-center">
                          <td>{index + 1}</td>
                          <td>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() => handleDeleteDriverRow(index)}
                              disabled={
                                allDriversChecked ||
                                (index === 0 &&
                                  driverList.length === 1 &&
                                  Object.values(driverList[0]).every((val) => val?.trim?.() === ""))
                              }
                              style={{
                                backgroundColor:
                                  allDriversChecked ||
                                    (index === 0 &&
                                      driverList.length === 1 &&
                                      Object.values(driverList[0]).every((val) => val?.trim?.() === ""))
                                    ? "#f8d7da"
                                    : "#dc3545",
                                borderColor:
                                  allDriversChecked ||
                                    (index === 0 &&
                                      driverList.length === 1 &&
                                      Object.values(driverList[0]).every((val) => val?.trim?.() === ""))
                                    ? "#f5c6cb"
                                    : "#dc3545",
                                cursor:
                                  allDriversChecked ||
                                    (index === 0 &&
                                      driverList.length === 1 &&
                                      Object.values(driverList[0]).every((val) => val?.trim?.() === ""))
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </Button>

                          </td>

                          {/* 🔹 Driver ID Select */}
                          <td>
                            <Select
                              isDisabled={allDriversChecked}
                              value={
                                row.loaderId
                                  ? { value: row.loaderId, label: row.loaderId }
                                  : null
                              }
                              onChange={(selected) =>
                                handleDriverSelectionChange(index, selected?.value || "", "id")
                              }
                              options={driverIdSelectOptions}
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  width: "100%",       // lock width
                                  minWidth: "150px",   // prevent shrinking
                                }),
                                control: (base) => ({
                                  ...base,
                                  minHeight: "38px",
                                  width: "100%",
                                  borderColor: "#ced4da",
                                  boxShadow: "none",
                                  "&:hover": { borderColor: "#86b7fe" },
                                }),
                                valueContainer: (base) => ({
                                  ...base,
                                  padding: "0 8px",
                                }),
                                indicatorsContainer: (base) => ({
                                  ...base,
                                  padding: "0 4px",
                                }),
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              }}
                              isClearable
                            />
                          </td>

                          {/* 🔹 Driver Name Select */}
                          <td>
                            <Select
                              isDisabled={allDriversChecked}
                              value={
                                row.driver
                                  ? { value: row.driver, label: row.driver }
                                  : null
                              }
                              onChange={(selected) =>
                                handleDriverSelectionChange(index, selected?.value || "", "name")
                              }
                              options={driverNameSelectOptions}
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  width: "100%",       // lock width
                                  minWidth: "150px",   // prevent shrinking
                                }),
                                control: (base) => ({
                                  ...base,
                                  minHeight: "38px",
                                  width: "100%",
                                  borderColor: "#ced4da",
                                  boxShadow: "none",
                                  "&:hover": { borderColor: "#86b7fe" },
                                }),
                                valueContainer: (base) => ({
                                  ...base,
                                  padding: "0 8px",
                                }),
                                indicatorsContainer: (base) => ({
                                  ...base,
                                  padding: "0 4px",
                                }),
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              }}
                              isClearable
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </Table>
                </div>
              </div>
            </div>




            <div className="w-full mb-2">
              <div id="vehicles" className="mt-3">
                <div className="section-header d-flex justify-content-between align-items-center mb-0">
                  <div className="d-flex align-items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">
                      Vehicles
                    </h3>

                    {/* Add Vehicle Button */}
                    <Button
                      color="primary"
                      size="sm"
                      onClick={handleAddVehicleRow}
                      disabled={allVehiclesChecked}
                    >
                      +
                    </Button>

                    {/* All Vehicles Checkbox */}
                    <FormGroup check className="mb-0">
                      <Label check className="mb-0">
                        <Input
                          type="checkbox"
                          checked={allVehiclesChecked}
                          onChange={(e) => setAllVehiclesChecked(e.target.checked)}
                        />{" "}
                        All Vehicles
                      </Label>
                    </FormGroup>
                  </div>
                </div>

                {/* Vehicle Table */}
                <div className="table-responsive">
                  <Table responsive striped bordered hover className="mb-0">
                    <thead className="text-center" style={{ color: "black" }}>
                      <tr>
                        <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                        <th style={{ background: "#CCD6DB" }}>Actions</th>
                        <th style={{ background: "#CCD6DB" }}>Vehicle ID</th>
                        <th style={{ background: "#CCD6DB" }}>Vehicle Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicleList.map((row, index) => (
                        <tr key={index} className="text-center">
                          <td>{index + 1}</td>
                          <td>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() => handleDeleteVehicleRow(index)}
                              disabled={
                                allVehiclesChecked ||
                                (index === 0 &&
                                  vehicleList.length === 1 &&
                                  Object.values(vehicleList[0]).every((val) => val?.trim?.() === ""))
                              }
                              style={{
                                backgroundColor:
                                  allVehiclesChecked ||
                                    (index === 0 &&
                                      vehicleList.length === 1 &&
                                      Object.values(vehicleList[0]).every((val) => val?.trim?.() === ""))
                                    ? "#f8d7da"
                                    : "#dc3545",
                                borderColor:
                                  allVehiclesChecked ||
                                    (index === 0 &&
                                      vehicleList.length === 1 &&
                                      Object.values(vehicleList[0]).every((val) => val?.trim?.() === ""))
                                    ? "#f5c6cb"
                                    : "#dc3545",
                                cursor:
                                  allVehiclesChecked ||
                                    (index === 0 &&
                                      vehicleList.length === 1 &&
                                      Object.values(vehicleList[0]).every((val) => val?.trim?.() === ""))
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </Button>

                          </td>

                          {/* 🔹 Vehicle ID Select */}
                          {/* 🔹 Vehicle ID Select */}
                          <td>
                            <Select
                              isDisabled={allVehiclesChecked}
                              value={vehicleIdOptions.find(opt => opt.value === row.vehicleId) || null}
                              onChange={(option) => handleVehicleSelectionChange(index, option, "id")}
                              options={vehicleIdOptions}
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  width: "100%",
                                  minWidth: "150px",
                                }),
                                control: (base) => ({
                                  ...base,
                                  minHeight: "38px",
                                  width: "100%",
                                  borderColor: "#ced4da",
                                  boxShadow: "none",
                                  "&:hover": { borderColor: "#86b7fe" },
                                }),
                                valueContainer: (base) => ({
                                  ...base,
                                  padding: "0 8px",
                                }),
                                indicatorsContainer: (base) => ({
                                  ...base,
                                  padding: "0 4px",
                                }),
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                               
                              }}
                              isClearable
                            />
                          </td>

                          {/* 🔹 Vehicle Name Select */}
                          <td>

                            <Select
                              isDisabled={allVehiclesChecked}
                              value={vehicleNameOptions.find(opt => opt.value === row.vehicle) || null}
                              onChange={(option) => handleVehicleSelectionChange(index, option, "name")}
                              options={vehicleNameOptions}
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  width: "100%",
                                  minWidth: "150px",
                                }),
                                control: (base) => ({
                                  ...base,
                                  minHeight: "38px",
                                  width: "100%",
                                  borderColor: "#ced4da",
                                  boxShadow: "none",
                                  "&:hover": { borderColor: "#86b7fe" },
                                }),
                                valueContainer: (base) => ({
                                  ...base,
                                  padding: "0 8px",
                                }),
                                indicatorsContainer: (base) => ({
                                  ...base,
                                  padding: "0 4px",
                                }),
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              }}
                              isClearable
                            />
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>










            <div id="details" className="section-header mt-3 mb-3">
              <h3 >Details</h3>
              <div className="section-body">
                <FormGroup className="form-item text-input">
                  <Label>Longitude</Label>
                  <Input
                    type="text"
                    value={selectedOrder.longitude}
                    onChange={(e) => handleFieldChange("longitude", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Latitude</Label>
                  <Input
                    type="text"
                    value={selectedOrder.latitude}
                    onChange={(e) => handleFieldChange("latitude", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Service Time</Label>
                  <Input
                    type="text"
                    value={selectedOrder.serviceTime}
                    onChange={(e) => handleFieldChange("serviceTime", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Waiting Time</Label>
                  <Input
                    type="text"
                    value={selectedOrder.waitingTime}
                    onChange={(e) => handleFieldChange("waitingTime", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Vehicle Class</Label>
                  <Select
                    options={vehicleClassOptions}
                    value={
                      vehicleClassOptions.find((opt) => opt.value === selectedOrder.vehicleClass) || null
                    }
                    onChange={(selected) =>
                      handleFieldChange("vehicleClass", selected ? selected.value : "")
                    }
                    isClearable
                    placeholder="Select"
                    styles={{
                      control: (base) => ({ ...base, minHeight: 34, fontSize: 14 }),
                      container: (base) => ({ ...base, minWidth: 200 })
                    }}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Pickup Time Frame</Label>
                  <Input
                    type="text"
                    value={selectedOrder.pickupTimeFrame}
                    onChange={(e) => handleFieldChange("pickupTimeFrame", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Updated User</Label>
                  <Input
                    type="text"
                    value={selectedOrder.updatedUser}
                    onChange={(e) => handleFieldChange("updatedUser", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Updated Through</Label>
                  <Input
                    type="text"
                    value={selectedOrder.updatedThrough}
                    onChange={(e) => handleFieldChange("updatedThrough", e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Updated Date</Label>
                  <Input
                    type="date"
                    value={
                      selectedOrder.updatedDate &&
                        selectedOrder.updatedDate !== "1753-01-01T00:00:00.000+00:00"
                        ? new Date(selectedOrder.updatedDate).toISOString().slice(0, 10)
                        : ""
                    }
                    onChange={(e) => handleFieldChange("updatedDate", e.target.value)}
                  />
                </FormGroup>
              </div>

            </div>
            <div id="management" className="mt-3 section-header">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Management</h3>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Credit Control</h3>

              <div className="section-body">

                {/* Credit Control Radio Buttons */}
                <FormGroup tag="fieldset" className="mt-2">

                  <div className="flex flex-wrap gap-4 mt-1">
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="radio"
                          name="creditControl"
                          value="Check"
                          checked={selectedOrder.creditControl === "Check"}
                          onChange={(e) => handleCreditControlChange(e.target.value)}
                        />
                        Check
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="radio"
                          name="creditControl"
                          value="No check"
                          checked={selectedOrder.creditControl === "No check"}
                          onChange={(e) => handleCreditControlChange(e.target.value)}
                        />
                        No check
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="radio"
                          name="creditControl"
                          value="Hold"
                          checked={selectedOrder.creditControl === "Hold"}
                          onChange={(e) => handleCreditControlChange(e.target.value)}
                        />
                        Hold
                      </Label>
                    </FormGroup>
                  </div>
                </FormGroup>


                {/* Customer Type Dropdown */}
                <FormGroup className="form-item text-input mt-3 w-full max-w-sm">
                  <Label>Customer Type</Label>
                  <Select
                    options={commonData?.customerList || []}
                    value={
                      (commonData?.customerList || []).find(
                        (option) => option.value === selectedOrder.bpctyp
                      ) || null
                    }
                    onChange={handleCustomerTypeChange}
                    placeholder="Select Customer Type"
                    isClearable
                    styles={{
                      container: (base) => ({
                        ...base,
                        width: "100%",
                      }),
                      control: (base) => ({
                        ...base,
                        minHeight: 32,
                        fontSize: 14,
                      }),
                    }}
                  />
                </FormGroup>

              </div>
            </div>



            <div id="payment" className="mt-3 section-header">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Financial</h3>

              <div className="section-body">

                {/* Tax Rule */}
                <FormGroup className="form-item text-input mt-3">
                  <Label>
                    Tax Rule <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="select"
                    value={selectedOrder.taxRule}
                    onChange={(e) => handleTaxRuleChange("taxRule", e.target.value)}
                    required
                    className="form-select block w-full border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                  >
                    <option value="">Select Tax Rule</option>
                    {(commonData?.taxRuleList || []).map((rule) => (
                      <option key={rule.value} value={rule.value}>
                        {rule.label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                {/* Payment Term */}
                <FormGroup className="form-item text-input mt-3">
                  <Label>
                    Payment Term <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="select"
                    value={selectedOrder.paymentTerm}
                    onChange={(e) => handlePaymentChange("paymentTerm", e.target.value)}
                    required
                    className="form-select block w-full border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                  >
                    <option value="">Select Payment Term</option>
                    {(commonData?.paymentTermList || []).map((term) => (
                      <option key={term.value} value={term.value}>
                        {term.label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                {/* Payment Bank */}
                <FormGroup className="form-item text-input mt-3">
                  <Label>Payment Bank</Label>
                  <Input
                    type="select"
                    value={selectedOrder.paymentBank}
                    onChange={(e) => handlePaymentChange("paymentBank", e.target.value)}
                    className="form-select block w-full border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                  >
                    <option value="">Select Bank</option>
                    {(commonData?.bankList || []).map((bank) => (
                      <option key={bank.value} value={bank.value}>
                        {bank.label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

              </div>
            </div>










            <div id="workdays" className="mt-3 section-header">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Workdays</h3>

              <div className="section-body">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Monday", key: "xuvday1" },
                    { label: "Tuesday", key: "xuvday2" },
                    { label: "Wednesday", key: "xuvday3" },
                    { label: "Thursday", key: "xuvday4" },
                    { label: "Friday", key: "xuvday5" },
                    { label: "Saturday", key: "xuvday6" },
                    { label: "Sunday", key: "xuvday7" },
                  ].map((day) => (
                    <FormGroup
                      check
                      className="form-item checkbox-input"
                      key={day.key}
                    >
                      <Label check>
                        <Input
                          type="checkbox"
                          checked={selectedOrder?.[day.key] || false}
                          onChange={(e) =>
                            handleWorkDayChange(day.key, e.target.checked)
                          }
                          className="w-5 h-5"
                        />
                        <span className="text-lg font-medium ml-2">{day.label}</span>
                      </Label>
                    </FormGroup>
                  ))}
                </div>

                <FormGroup className="form-item text-input mt-4">
                  <Label>Unavailable Period</Label>
                  <Select
                    options={[
                      { label: "Morning", value: "M" },
                      { label: "Afternoon", value: "A" },
                      { label: "Full Day", value: "F" },
                    ]}
                    value={
                      [
                        { label: "Morning", value: "M" },
                        { label: "Afternoon", value: "A" },
                        { label: "Full Day", value: "F" },
                      ].find((option) => option.value === selectedOrder.xuvcod) || null
                    }
                    onChange={(selected) =>
                      handleWorkDayChange("xuvcod", selected ? selected.value : "")
                    }
                    isClearable
                    placeholder="Select Unavailable Period"
                  />
                </FormGroup>

              </div>
            </div>

            <div id="dayOfSales" className="w-full mb-3 mt-3">
              <div className="section-header mt-2">
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Ship-to-Customer
                </h3>
              </div>

              <div className="section-body flex flex-wrap justify-content-between gap-4">
                {[
                  { label: "Monday", key: "x2uvyday1" },
                  { label: "Tuesday", key: "x2uvyday2" },
                  { label: "Wednesday", key: "x2uvyday3" },
                  { label: "Thursday", key: "x2uvyday4" },
                  { label: "Friday", key: "x2uvyday5" },
                  { label: "Saturday", key: "x2uvyday6" },
                  { label: "Sunday", key: "x2uvyday7" },
                ].map((day) => (
                  <FormGroup check key={day.key}>
                    <Label check className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        checked={selectedOrder?.[day.key] || false}
                        onChange={(e) =>
                          handleSalesDayChange(day.key, e.target.checked)
                        }
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">{day.label}</span>
                    </Label>
                  </FormGroup>
                ))}
              </div>
            </div>





            <div id="vstAltDays" className="w-full mb-3">
              <div className="section-header">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Vst ALt. Week Days</h3>
              </div>
              <div className="section-body flex flex-wrap justify-content-between gap-4">
                {[
                  { label: "Monday", key: "x3uvyday1" },
                  { label: "Tuesday", key: "x3uvyday2" },
                  { label: "Wednesday", key: "x3uvyday3" },
                  { label: "Thursday", key: "x3uvyday4" },
                  { label: "Friday", key: "x3uvyday5" },
                  { label: "Saturday", key: "x3uvyday6" },
                  { label: "Sunday", key: "x3uvyday7" },
                  { label: "Anytime", key: "xxanytime" },
                ].map((day) => (
                  <FormGroup check key={day.key}>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={selectedOrder?.[day.key] || false}
                        onChange={(e) =>
                          handleAltVisitDayChange(day.key, e.target.checked)
                        }
                        className="w-5 h-5"
                      />
                      <span className="text-lg font-medium ml-2">{day.label}</span>
                    </Label>
                  </FormGroup>
                ))}
              </div>
            </div>



            <div className="w-full mb-2">
              <div id="deliveryTimeFrame" className="mt-0 mb-0">
                <div className="section-header d-flex justify-content-between align-items-center mb-0">
                  <div className="d-flex align-items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">
                      Delivery Time Frame
                    </h3>
                    <Button
                      color="primary"
                      size="sm"
                      className="ms-2"
                      onClick={handleAddDeliveryTimeRow}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    responsive
                    striped
                    bordered
                    hover
                    className="mb-0"
                    style={{ minWidth: "900px" }}
                  >
                    <thead className="text-center" style={{ color: "black" }}>
                      <tr>
                        <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                        <th style={{ background: "#CCD6DB" }}>Actions</th>
                        <th style={{ background: "#CCD6DB" }}>From Time</th>
                        <th style={{ background: "#CCD6DB" }}>Till Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryTimeList.map((row, index) => (
                        <tr key={index} className="text-center align-middle">
                          <td style={{ width: "60px" }}>{index + 1}</td>

                          <td style={{ width: "80px" }}>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() => handleDeleteDeliveryTimeRow(index)}
                              title={index === 0 ? "Clear this row" : "Delete Row"}
                              disabled={
                                // Disable if first row is the only row AND all fields are empty
                                index === 0 &&
                                deliveryTimeList.length === 1 &&
                                Object.values(deliveryTimeList[0]).every((val) => val?.trim?.() === "")
                              }
                            >
                              <i className="ri-delete-bin-line"></i>
                            </Button>




                          </td>

                          {/* From Time */}
                          <td style={{ minWidth: "180px", position: "relative" }}>
                            <div style={{ position: "relative" }}>
                              <Input
                                type="text"
                                placeholder="HH:MM"
                                value={row.fromTime}
                                onChange={(e) =>
                                  handleDeliveryTimeChange(index, "fromTime", e.target.value)
                                }
                                maxLength={5}
                                style={{
                                  paddingRight: "24px",
                                }}
                              />
                              {row.fromTime && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeliveryTimeChange(index, "fromTime", "")
                                  }
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "8px",
                                    transform: "translateY(-50%)",
                                    border: "none",
                                    background: "transparent",
                                    fontSize: "1rem",
                                    color: "#6c757d",
                                    cursor: "pointer",
                                    padding: "0",
                                    lineHeight: "1",
                                  }}
                                  title="Clear"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          </td>

                          {/* Till Time */}
                          <td style={{ minWidth: "180px", position: "relative" }}>
                            <div style={{ position: "relative" }}>
                              <Input
                                type="text"
                                placeholder="HH:MM"
                                value={row.tillTime}
                                onChange={(e) =>
                                  handleDeliveryTimeChange(index, "tillTime", e.target.value)
                                }
                                maxLength={5}
                                style={{
                                  paddingRight: "24px",
                                }}
                              />
                              {row.tillTime && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeliveryTimeChange(index, "tillTime", "")
                                  }
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "8px",
                                    transform: "translateY(-50%)",
                                    border: "none",
                                    background: "transparent",
                                    fontSize: "1rem",
                                    color: "#6c757d",
                                    cursor: "pointer",
                                    padding: "0",
                                    lineHeight: "1",
                                  }}
                                  title="Clear"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>




            <div className="w-full mt-3 mb-3">
              <div id="routecode" className="section-header">
                <h3 className>Route Code</h3>
              </div>
              <div className="section-body">
                <FormGroup className="form-item text-input w-full sm:w-1/2">
                  <Label>Route Code</Label>
                  <Select
                    options={commonData?.routeCodeList || []}
                    value={
                      (commonData?.routeCodeList || []).find(
                        (option) => option.value === selectedOrder.routeCode
                      ) || null
                    }
                    onChange={handleRouteCodeChange}
                    placeholder="Select Route Code"
                    isClearable
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: '36px',
                        height: '36px',
                        fontSize: '0.875rem',
                        width: '250px',
                        boxShadow: 'none',
                        borderColor: state.isFocused ? '#d1d5db' : provided.borderColor,
                        '&:hover': {
                          borderColor: '#a1a1aa',
                        },
                      }),
                    }}
                  />
                </FormGroup>

              </div>
            </div>



            <div className="w-full mb-3">
              <div id="deliveryPriority" className="section-header">
                <h3 className>Delivery</h3>
              </div>
              <div className="section-body">
                <FormGroup className="form-item text-input w-full sm:w-1/2">
                  <Label>Delivery Priority</Label>
                  <Select
                    options={commonData?.deliveryPriorityList || []}
                    value={
                      (commonData?.deliveryPriorityList || []).find(
                        (option) => option.value === selectedOrder.deliveryPriority
                      ) || null
                    }
                    onChange={handleDeliveryPriorityChange}
                    placeholder="Select Delivery Priority"
                    isClearable
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: '36px',
                        height: '36px',
                        fontSize: '0.875rem',
                        width: '250px',
                        boxShadow: 'none',
                        borderColor: state.isFocused ? '#d1d5db' : provided.borderColor,
                        '&:hover': {
                          borderColor: '#a1a1aa',
                        },
                      }),
                    }}
                  />

                </FormGroup>
              </div>
            </div>



            <div className="w-full mb-3">
              <div id="shipment" className="mt-0">
                <div className="section-header">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-2">Shipment Site</h3>
                </div>

                <div className="section-body">
                  <div className="flex flex-wrap gap-6">
                    <FormGroup className="form-item text-input w-full sm:w-1/2">
                      <Label>Shipment Site</Label>
                      <Input
                        type="select"
                        value={selectedOrder.shipmentSite}
                        onChange={(e) => handleDeliveryChange("shipmentSite", e.target.value)}
                      >
                        <option value="">Select Site</option>
                        {(commonData?.siteList || []).map((site) => (
                          <option key={site.value} value={site.value}>
                            {site.label}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>

                    <FormGroup className="form-item text-input w-full sm:w-1/2">
                      <Label>Delivery Mode</Label>
                      <Input
                        type="select"
                        value={selectedOrder.deliveryMode}
                        onChange={(e) => handleDeliveryChange("deliveryMode", e.target.value)}
                      >
                        <option value="">Select Delivery Mode</option>
                        {(commonData?.deliveryModeList || []).map((mode) => (
                          <option key={mode.value} value={mode.value}>
                            {mode.label}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </div>
                </div>
              </div>
            </div>



















          </Form>

        ) : (
          <p className="text-center">No site selected</p>
        )
        }


      </CardBody >


      {/* Delete Confirmation Modal */}
      < Modal isOpen={deleteModal} toggle={toggleDeleteModal} >
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the vehicle class: {selectedOrder?.className}?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>No</Button>
          <Button color="danger" onClick={confirmDelete}>Yes, Delete</Button>
        </ModalFooter>
      </Modal >
    </Card >
  );
}

export default RightSide;
