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


  const handleVehicleIdChange = (index, selectedOption) => {
    const updated = [...vehicleList];
    updated[index].vehicleId = selectedOption?.value || "";
    updated[index].vehicle = vehicleMap[selectedOption?.value] || "";
    setVehicleList(updated);
  };

  const handleVehicleChange = (index, selectedOption) => {
    const updated = [...vehicleList];
    updated[index].vehicle = selectedOption?.value || "";
    const matched = Object.entries(vehicleMap).find(
      ([id, name]) => name === selectedOption?.value
    );
    updated[index].vehicleId = matched ? matched[0] : "";
    setVehicleList(updated);
  };

  const handleAddVehicleRow = () => {
    setVehicleList([...vehicleList, { vehicleId: "", vehicle: "" }]);
  };

  const handleDeleteVehicleRow = (index) => {
    const updated = [...vehicleList];
    updated.splice(index, 1);
    setVehicleList(updated);
  };

  const [driversList, setDriversList] = useState([]);
  const [allDriversChecked, setAllDriversChecked] = useState(false);
  const [driverList, setDriverList] = useState([{ loaderId: "", driver: "" }]);

  const loaderDriverMap = {
    LDR01: "John Doe",
    LDR02: "Jane Smith",
    LDR03: "Mike Johnson",
  };





  const handleDriverIdChange = (index, selected) => {
    const updatedList = [...driverList];

    if (selected) {
      const matching = driversList.find((d) => d.id === selected.value);
      updatedList[index].loaderId = selected.value;
      updatedList[index].driver = matching ? matching.name : "";
    } else {
      updatedList[index].loaderId = "";
      updatedList[index].driver = "";
    }

    setDriverList(updatedList);
  };


  const handleDriverNameChange = (index, selected) => {
    const updatedList = [...driverList];

    if (selected) {
      const matching = driversList.find((d) => d.name === selected.value);
      updatedList[index].driver = selected.value;
      updatedList[index].loaderId = matching ? matching.id : "";
    } else {
      updatedList[index].driver = "";
      updatedList[index].loaderId = "";
    }

    setDriverList(updatedList);
  };


  const handleDeleteDriverRow = (index) => {
    const updated = [...driverList];
    updated.splice(index, 1);
    setDriverList(updated);
  };

  const handleAddDriverRow = () => {
    setDriverList([...driverList, { loaderId: "", driver: "" }]);
  };


 
const handleScrollTo = (e, id) => {
  e.preventDefault();

  const container = document.getElementById("cardbody");
  const target = document.getElementById(id);

  if (container && target) {
    const stickyOffset = 40; 
    const extraMargin = 8;   

    container.scrollTo({
      top: target.offsetTop - stickyOffset - extraMargin,
      behavior: "smooth",
    });

    
    setActiveTab(id);
  }
};

  const handleSiteSelect = (value) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      salfcy: value,
    }));
  };



  const onChangeStopno = (e) => {
    setSelectedOrder({ ...selectedOrder, xmsnum: e.target.value });
  };


  const onChangeStopTyp = (e) => {
    setSelectedOrder({ ...selectedOrder, misstotyp: e.target.value });
  }

  const onChangeDate = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      dlvdat: e.target.value,
    });
  };


  const onChangeTransportationStatus = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xqtyuom: e.target.value,
    });
  };



  const onChangeSoldTo = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      bpcord: e.target.value,
    });
  };

  const handleChangeTypeList = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, x1cgeoso: Number(selectedOption.value) });
  };

  const onChangeAddress = (e) => {
    setSelectedOrder({ ...selectedOrder, bpaadd: e.target.value });
  };


  const onChangeCity = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      bpdcry: e.target.value,
    });
  };


  const onChangeAddressLine = (e, index) => {
    const updatedAddress = [...(selectedOrder.addressLine || ["", ""])];
    updatedAddress[index] = e.target.value;

    setSelectedOrder({
      ...selectedOrder,
      addressLine: updatedAddress,
    });
  };


  const onChangeCoordinates = (e) => {
    const { name, value } = e.target;

    setSelectedOrder({
      ...selectedOrder,
      [name]: value,
    });
  };


  const onChangeUpdatedFields = (e) => {
    const { name, value } = e.target;

    setSelectedOrder({
      ...selectedOrder,
      [name]: value,
    });
  };


  const onChangePackingFields = (e) => {
    const { name, value } = e.target;
    setSelectedOrder({
      ...selectedOrder,
      [name]: value,
    });
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
  const handleValidatedChange = (isChecked) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      verified: isChecked ? 1 : 0,
    }));
  };



  const onChangePairedReceipts = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xppthnum: e.target.value,
    });
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
    if (addresses.length === 1) return;

    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };


  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
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
    setDeliveryTimeList([...deliveryTimeList, { fromTime: "", tillTime: "" }]);
  };

  const handleDeleteDeliveryTimeRow = (index) => {
    const updated = [...deliveryTimeList];
    updated.splice(index, 1);
    setDeliveryTimeList(updated);
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
                    { id: "address", label: "Address" },
                    { id: "packing", label: "packing" },



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




            <div id="home" className="mt-3 responsive-form">
              <FormGroup>
                <Label>Stop n.o</Label>
                <Input
                  type="text"
                  value={selectedOrder.xmsnum}
                  onChange={onChangeStopno}
                />
              </FormGroup>
              <FormGroup className="form-item text-input">
                <Label for="site">
                  Sales Site{" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>


                <Select
                  options={commonData?.supplierList || []}
                  value={
                    (commonData?.supplierList || []).find(
                      (option) => option.value === selectedOrder.salfcy
                    ) || null
                  }
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )}
                  onChange={(selectedOption) =>
                    handleSiteSelect(selectedOption ? selectedOption.value : null)
                  }
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


              <FormGroup>
                <Label>Stop Type</Label>
                <Input
                  type="text"
                  value={selectedOrder.misstotyp}
                  onChange={onChangeStopTyp}
                />
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="dlvdat">Date</Label>
                <Input
                  type="date"
                  name="dlvdat"
                  id="dlvdat"
                  value={selectedOrder.dlvdat}
                  onChange={onChangeDate}
                />
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="xqtyuom">Transportation Status</Label>
                <Input
                  type="text"
                  name="xqtyuom"
                  id="xqtyuom"
                  value={selectedOrder.xqtyuom}
                  onChange={onChangeTransportationStatus}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="bpcord">Sold-to</Label>
                <Input
                  type="text"
                  name="bpcord"
                  id="bpcord"
                  value={selectedOrder.bpcord}
                  onChange={onChangeSoldTo}
                />
              </FormGroup>

              <FormGroup check className="form-item mt-2">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.verified === 1}
                    onChange={(e) => handleValidatedChange(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="ml-2">Validated</span>
                </Label>
              </FormGroup>


              <FormGroup
                className="form-item text-input"
                style={{ width: "200px", display: "inline-block" }}
              >
                <Label
                  htmlFor="xppthnum"
                  className="text-sm font-bold text-gray-900 mb-1 block"
                >
                  Paired Receipts
                </Label>
                <Input
                  type="text"
                  name="xppthnum"
                  id="xppthnum"
                  value={selectedOrder.xppthnum}
                  onChange={onChangePairedReceipts}
                  className="h-[36px] text-sm"
                  style={{ width: "200px" }}
                />
              </FormGroup>













            </div>


            <div id="address" className="mt-3">
              {/* Header section */}
              <div className="section-header">
                <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">
                  Drop / Pickup address
                </h3>
              </div>

              {/* Form body section */}
              <div className="section-body">
                <FormGroup className="form-item text-input" style={{ width: "100%" }}>
                  <Label>Address</Label>
                  <Input
                    type="text"
                    value={selectedOrder.bpaadd}
                    onChange={onChangeAddress}
                  />
                </FormGroup>

                <FormGroup
                  className="form-item text-input"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
                >
                  <Label
                    htmlFor="bpdcry"
                    className="text-sm font-bold text-gray-900 mb-1 block"
                  >
                    City Name
                  </Label>
                  <Input
                    type="select"
                    name="bpdcry"
                    id="bpdcry"
                    value={selectedOrder.bpdcry}
                    onChange={onChangeCity}
                    className="h-[36px] w-[250px] text-sm"
                  >
                    <option value="">-- Select City --</option>
                    <option value="BLR">Bangalore</option>
                    <option value="DEL">Delhi</option>
                    <option value="MUM">Mumbai</option>
                  </Input>
                </FormGroup>





                <FormGroup className="form-item text-input" style={{ width: "100%" }}>
                  <Label>Address Line</Label>
                  <div className="d-flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <Input
                        key={i}
                        type="text"
                        name="addressLine"
                        placeholder={`Line ${i + 1}`}
                        value={selectedOrder.addressLine[i] || ""}
                        onChange={(e) => onChangeAddressLine(e, i)}
                      />
                    ))}
                  </div>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="latitude">Latitude</Label>
                  <Input
                    type="text"
                    name="latitude"
                    id="latitude"
                    placeholder="Enter Latitude"
                    value={selectedOrder.latitude || ""}
                    onChange={onChangeCoordinates}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="longitude">Longitude</Label>
                  <Input
                    type="text"
                    name="longitude"
                    id="longitude"
                    placeholder="Enter Longitude"
                    value={selectedOrder.longitude || ""}
                    onChange={onChangeCoordinates}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="updatedThrough">Updated Through</Label>
                  <Input
                    type="text"
                    name="updatedThrough"
                    id="updatedThrough"
                    value={selectedOrder.updatedThrough || ""}
                    onChange={onChangeUpdatedFields}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="updatedUser">Updated User</Label>
                  <Input
                    type="text"
                    name="updatedUser"
                    id="updatedUser"
                    value={selectedOrder.updatedUser || ""}
                    onChange={onChangeUpdatedFields}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="updatedDate">Updated Date</Label>
                  <Input
                    type="date"
                    name="updatedDate"
                    id="updatedDate"
                    value={selectedOrder.updatedDate || ""}
                    onChange={onChangeUpdatedFields}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" || e.key === "Delete") {
                        setSelectedOrder({
                          ...selectedOrder,
                          updatedDate: "",
                        });
                      }
                    }}
                  />
                </FormGroup>
              </div>
            </div>

            <div id="packing" className="section-header mt-3">
              <h3 >Packing</h3>

              <div className="section-body">

                <FormGroup className="form-item text-input">
                  <Label for="netwei">Net Weight</Label>
                  <Input
                    type="text"
                    name="netwei"
                    id="netwei"
                    value={selectedOrder.netwei || ""}
                    onChange={onChangePackingFields}
                  />
                </FormGroup>


                <FormGroup className="form-item text-input">
                  <Label for="weu">Weight Unit</Label>
                  <Input
                    type="text"
                    name="weu"
                    id="weu"
                    value={selectedOrder.weu || ""}
                    onChange={onChangePackingFields}
                    placeholder="lb"
                  />
                </FormGroup>


                <FormGroup className="form-item text-input">
                  <Label for="growei">Volume</Label>
                  <Input
                    type="text"
                    name="growei"
                    id="growei"
                    value={selectedOrder.growei || ""}
                    onChange={onChangePackingFields}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label for="volunit">Volume Unit</Label>
                  <Input
                    type="text"
                    name="volunit"
                    id="volunit"
                    value={selectedOrder.volunit || ""}
                    onChange={onChangePackingFields}
                    placeholder="gallons"
                  />
                </FormGroup>
              </div>
            </div>

          </Form>

        ) : (
          <p className="text-center">No site selected</p>
        )}


      </CardBody>


      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the vehicle class: {selectedOrder?.className}?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDeleteModal}>No</Button>
          <Button color="danger" onClick={confirmDelete}>Yes, Delete</Button>
        </ModalFooter>
      </Modal>
    </Card >
  );
}

export default RightSide;
