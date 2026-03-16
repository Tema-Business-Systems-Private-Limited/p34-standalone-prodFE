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
import { toast } from 'react-toastify';



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
    const last = addresses[addresses.length - 1];

    const isEmpty =
      !last?.codar?.trim() &&
      !last?.xx10c_geoy?.trim() &&
      !last?.xx10c_geox?.trim() &&
      !last?.xx10c_servt?.trim() &&
      !last?.xupdvia?.trim() &&
      !last?.xupdusr?.trim() &&
      !last?.xupddatei?.trim();

    if (isEmpty) {
      toast.error("Please fill the previous address before adding a new one.");
      return;
    }

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


  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
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
            {/* Top Tab Navigation */}
            <div className="sticky top-0 z-10 bg-white shadow-sm">
              <div className="flex space-x-6 border-b px-4 pt-2 text-base font-medium">
                {[
                  { id: "home", label: "Home" },
                  { id: "identity", label: "Indentity" },
                  { id: "intersite", label: "Intersite" },

                  { id: "addresses", label: "Addresses" },
                  { id: "defaultaddress", label: "Default Address" },

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
              <div className="flex flex-wrap gap-6 items-start">

                {/* Category dropdown */}
                <FormGroup className="form-item text-input">
                  <Label htmlFor="site" className="text-sm font-bold text-gray-900 mb-1 block">
                    Category <span className="text-red-600 ml-1">*</span>
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
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: '36px',
                        height: '36px',
                        width: '250px',
                        fontSize: '0.875rem',
                        boxShadow: 'none',
                        borderColor: state.isFocused ? '#d1d5db' : provided.borderColor,
                        '&:hover': {
                          borderColor: '#a1a1aa',
                        },
                      }),
                    }}
                  />
                  {error.site && (
                    <div className="text-red-600 text-xs mt-1">{error.site}</div>
                  )}
                </FormGroup>

                <FormGroup
                  check
                  className="form-item checkbox-input mt-4"
                  style={{ minWidth: "120px", marginLeft: "35px" }}
                >
                  <Label
                    check
                    className="flex items-center gap-2"
                    style={{ position: "relative", margintop: "-30px" }}
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

                {/* Supplier input */}
                <FormGroup className="form-item text-input">
                  <Label className="text-sm font-bold text-gray-900 mb-1 block">
                    Supplier
                  </Label>
                  <Input
                    type="text"
                    value={selectedOrder.suppliername}
                    onChange={onChangeSupname}
                    className="h-[36px] w-[250px] text-sm"
                  />
                </FormGroup>

              </div>
            </div>



            <div id="identity" className="section-header mt-3">
              <h3>Identity</h3>
            </div>
            <div className="section-body">

              <FormGroup className="form-item text-input">
                <Label>Short Description</Label>
                <Input
                  type="text"
                  value={selectedOrder.bprsho}
                  onChange={onChangeShortDescription}
                />
              </FormGroup>

              <FormGroup>
                <Label>Acronym</Label>
                <Input
                  type="text"
                  value={selectedOrder.bprlog}
                  onChange={onChangeAcronym}
                />
              </FormGroup>
              <FormGroup className="form-item text-input">
                <Label>Country </Label>
                <Select
                  options={commonData?.countryList || []}
                  value={
                    (commonData?.countryList || []).find(
                      (option) => option.value === selectedOrder.cry
                    ) || null
                  }
                  onChange={(selectedOption) =>
                    onChangeCountry(selectedOption ? selectedOption.value : null)
                  }
                  placeholder="Select"
                  isClearable
                />

              </FormGroup>
              <FormGroup>
                <Label>Company name 1</Label>
                <Input
                  type="text"
                  value={selectedOrder.bprnam1}
                  onChange={onChangeCompany1}
                />
              </FormGroup>

              <FormGroup>
                <Label>Company name 2</Label>
                <Input
                  type="text"
                  value={selectedOrder.bprnam2}
                  onChange={onChangeCompany2}
                />
              </FormGroup>

              <FormGroup
                check
                className="form-item checkbox-input mt-4"
                style={{ minWidth: "120px", marginLeft: "35px" }}
              >
                <Label
                  check
                  className="flex items-center gap-2"
                  style={{ position: "relative", margintop: "-30px" }}
                >
                  <Input
                    type="checkbox"
                    checked={selectedOrder.legett === 1}
                    onChange={(e) => handleCheckboxChange("legett", e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium ml-2">Natural Person</span>

                </Label>
              </FormGroup>

              <FormGroup
                check
                className="form-item checkbox-input mt-4"
                style={{ minWidth: "120px", marginLeft: "35px" }}
              >
                <Label
                  check
                  className="flex items-center gap-2"
                  style={{ position: "relative", margintop: "-30px" }}
                >
                  <Input
                    type="checkbox"
                    checked={selectedOrder.bprfbdmag === 1}
                    onChange={(e) => handleCheckboxChange("legett", e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium ml-2">Mailing Prohibited</span>

                </Label>
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
                style={{ minWidth: "120px", marginLeft: "35px" }}
              >
                <Label
                  check
                  className="flex items-center gap-2"
                  style={{ position: "relative", margintop: "-30px" }}
                >
                  <Input
                    type="checkbox"
                    checked={selectedOrder.verified === 1}
                    onChange={(e) => handleVerifiedChange(e.target.checked)}
                    className="w-5 h-5"

                  />
                  <span className="text-sm font-medium ml-2">Verified</span>
                </Label>
              </FormGroup>
            </div>
            <div id="intersite" className="section-header mt-3">
              <h3 className>Intersite</h3>
            </div>

            <div className="section-body">

              <FormGroup check className="form-item">
                <Label check className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    checked={selectedOrder.betfcy === 1}
                    onChange={(e) => handleIntersiteChange(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-lg font-medium ml-2">Intersite</span>
                </Label>
              </FormGroup>


              <FormGroup className="form-item">
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

            <div id="addresses" className="mt-3">
              <div className="section-header d-flex justify-content-between align-items-center mb-0">
                <div className="d-flex align-items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">
                    Addresses
                  </h3>

                  <Button color="primary" size="sm" onClick={handleAddAddress}>
                    +
                  </Button>
                </div>
              </div>

              <div className="table-responsive">
                <Table responsive striped bordered hover className="mb-0">
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
                            onClick={() => handleDeleteAddress(index)}
                            disabled={addresses.length === 1}
                            title={
                              addresses.length === 1
                                ? "At least one address is required"
                                : "Delete Address"
                            }
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button>
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



            <div id="defaultaddress" className="section-header mt-3">
              <h3 className>Default Address</h3>
            </div>
            <div className="section-body">

              <FormGroup check className="form-item">
                <Label>Longitude</Label>
                <Input
                  type="text"
                  value={selectedOrder.longitude}
                  onChange={(e) => handleFieldChange("longitude", e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Latitude</Label>
                <Input
                  type="text"
                  value={selectedOrder.latitude}
                  onChange={(e) => handleFieldChange("latitude", e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Service Time</Label>
                <Input
                  type="text"
                  value={selectedOrder.serviceTime}
                  onChange={(e) => handleFieldChange("serviceTime", e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Waiting Time</Label>
                <Input
                  type="text"
                  value={selectedOrder.waitingTime}
                  onChange={(e) => handleFieldChange("waitingTime", e.target.value)}
                />
              </FormGroup>

              <FormGroup>
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

              <FormGroup>
                <Label>Pickup Time Frame</Label>
                <Input
                  type="text"
                  value={selectedOrder.pickupTimeFrame}
                  onChange={(e) => handleFieldChange("pickupTimeFrame", e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Updated User</Label>
                <Input
                  type="text"
                  value={selectedOrder.updatedUser}
                  onChange={(e) => handleFieldChange("updatedUser", e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Updated Through</Label>
                <Input
                  type="text"
                  value={selectedOrder.updatedThrough}
                  onChange={(e) => handleFieldChange("updatedThrough", e.target.value)}
                />
              </FormGroup>

              <FormGroup>
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
