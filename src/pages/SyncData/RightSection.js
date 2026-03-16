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
  Toast,
} from "reactstrap";
import Select from "react-select";
import syncDataClass from "./css/syncDataClass.css";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
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
  siteList
}) => {
  const optionInsGeoCordinates = [
    { value: "1", label: "Block" },
    { value: "2", label: "Allow" },
  ];

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [activeTab, setActiveTab] = useState("home");
  const fileInputRef = useRef(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [siteDetails, setSiteDetails] = useState({});
  const [contactsData, setContactsData] = useState([
    { code: "", lastName: "" }
  ]);

  const [hasShownToast, setHasShownToast] = useState(false);

  const handleScrollTo = (event, id) => {
    event.preventDefault();
    const targetElement = document.getElementById(id);
    const cardBody = document.getElementById("cardbody");
    if (targetElement && cardBody) {
      const targetPosition = targetElement.offsetTop - 90;
      cardBody.scrollTo({ top: targetPosition, behavior: "smooth" });
      setActiveTab(id);
    }
  };






  const handleSiteSelect = (fcy) => {
    if (!siteList) return;
    const selected = siteList.find(site => site.fcy === fcy);
    setSelectedSite(fcy);
    setSiteDetails(selected);
    setSelectedOrder(prev => ({ ...prev, fcy }));  // <-- probably you'll want to reflect it here too
  };


  const onChangeDescription = (e) => {
    setSelectedOrder({ ...selectedOrder, fcynam: e.target.value });
  };

  const handleChangeTypeList = (selectedOption) => {
    setSelectedOrder({ ...selectedOrder, x1cgeoso: Number(selectedOption.value) });
  };

  const onChangeShortDescription = (e) => {
    setSelectedOrder({ ...selectedOrder, fcysho: e.target.value });
  };

  const onChangeSiteTax = (e) => {
    setSelectedOrder({ ...selectedOrder, crn: e.target.value });
  }
  const onChangeSicCode = (e) => {
    setSelectedOrder({ ...selectedOrder, naf: e.target.value });
  }
  const onChangeLatitude = (e) => {
    setSelectedOrder({ ...selectedOrder, xx10c_geox: e.target.value });
  }

  const onChangeLegalCompany = (e) => {
    setSelectedOrder({ ...selectedOrder, legcpy: e.target.value });
  };


  const onChangeLongitude = (e) => {
    setSelectedOrder({ ...selectedOrder, xx10c_geox: e.target.value });
  };
  const handleTmsRouteCheckboxChange = (e) => {
    setSelectedOrder({
      ...selectedOrder,
      xtmsfcy: selectedOrder.xtmsfcy === 1 ? 2 : 1,
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
    const list = selectedOrder.analyticalDimension || [];

    const hasEmptyRow = list.some((row) => {
      return (
        !row.dimensionType?.trim() ||
        !row.analyticalDimension?.trim()
      );
    });

    if (hasEmptyRow) {
      if (!hasShownToast) {
        toast.error("Please fill all existing analytical dimension rows before adding a new one.");
        setHasShownToast(true);
      }
      return;
    }


    setHasShownToast(false);

    const newRow = {
      dimensionType: "",
      dimensionTypeDescription: "",
      analyticalDimension: "",
      analyticalDimensionDescription: ""
    };

    setSelectedOrder({
      ...selectedOrder,
      analyticalDimension: [...list, newRow]
    });
  };



  // const addAnalyticalDimension = () => {
  //   const list = selectedOrder.analyticalDimension || [];

  //   const hasEmptyRow = list.some((row) => {
  //     return (
  //       !row.dimensionType?.trim() ||
  //       !row.analyticalDimension?.trim()
  //     );
  //   });

  //   if (hasEmptyRow) {
  //     toast.error("Please fill all existing analytical dimension rows before adding a new one.");
  //     return;
  //   }

  //   const newRow = {
  //     dimensionType: "",
  //     dimensionTypeDescription: "",
  //     analyticalDimension: "",
  //     analyticalDimensionDescription: ""
  //   };

  //   setSelectedOrder({
  //     ...selectedOrder,
  //     analyticalDimension: [...list, newRow]
  //   });
  // };

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



  const handleAddressChange = (index, value) => {
    const updated = [...selectedOrder.addresses];
    updated[index] = value;

    console.log(" Address updated:", updated);

    setSelectedOrder({ ...selectedOrder, addresses: updated });
  };

  const handleAddAddress = () => {
    const currentAddresses = selectedOrder.addresses || [];


    const hasEmptyAddress = currentAddresses.some(addr => !addr || addr.trim() === "");

    if (hasEmptyAddress) {
      toast.error("Please fill all existing address fields before adding a new one.");
      return;
    }

    const updated = [...currentAddresses, ""];
    console.log("Address added:", updated);

    setSelectedOrder({ ...selectedOrder, addresses: updated });
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
    // Check if any existing row is completely empty (important fields only)
    const hasEmptyRow = bankTableData.some((row) =>
      !row.bankAcctNumber?.trim() || !row.country?.trim()
    );

    if (hasEmptyRow) {
      toast.error("Please fill the existing bank details before adding a new one.");
      return;
    }

    // Add new row
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

    // Prevent deleting last row if it's the only one and still empty
    if (updated.length === 1) {
      const onlyRow = updated[0];
      const isEmpty =
        !onlyRow.bankAcctNumber?.trim() && !onlyRow.country?.trim();

      if (isEmpty) {
        toast.error("Cannot delete the only empty row.");
        return;
      }
    }

    updated.splice(index, 1);
    setBankTableData(updated);
  };


  const handleContactsTableChange = (action, index = null, key = null, value = null) => {
    const updated = [...contactsData];

    if (action === "add") {
      const hasEmptyRow = updated.some(row =>
        !row.code?.trim() || !row.lastName?.trim()
      );

      if (hasEmptyRow) {
        toast.error("Please complete all contact fields before adding a new row.");
        return;
      }

      updated.push({ code: "", lastName: "" });
    }

    else if (action === "update" && index !== null && key) {
      updated[index][key] = value;
    }

    else if (action === "remove" && index !== null) {

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


  // Placeholder handlers (still empty)
  const handleCheckboxChange = () => { };
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

    <Card className="h-100 m-0 mt-10" style={{ color: "black", fontSize: "16px" }}>
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
              <div className="mb-2 flex space-x-6 border-b px-4 pt-2 text-base font-medium">
                {[
                  { id: "home", label: "Home" },
                  { id: "general", label: "General" },
                  { id: "transportation", label: "Tranportation" },
                  { id: "acct", label: "Acct" },
                  { id: "addresses", label: "Addresses" },
                  { id: "telephone", label: "Telephone" },
                  { id: "email", label: "Email" },
                  { id: "bankDetails", label: "Bank Details" },
                  { id: "contacts", label: "Contacts" },

                  { id: "details", label: "Details" },
                  { id: "das2", label: "Das 2" },
                  { id: "warehouse", label: "Warehouse" },
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

            {/* HOME TAB */}
            <div id="home" className="mt-1 mb-2 responsive-form">
              <div className="flex flex-wrap gap-6">
                {/* Site field */}
                <FormGroup className="form-item text-input">
                  <Label htmlFor="site" className="text-sm font-medium text-gray-700 mb-1">
                    Site <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    options={commonData?.siteList || []}
                    value={
                      (commonData?.siteList || []).find(
                        (option) => option.value === selectedOrder.fcy
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
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: '36px',
                        height: '36px',
                        width: '250px', // ✅ width for select
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
                    <div className="text-red-600 text-xs mt-1">
                      {error.site}
                    </div>
                  )}
                </FormGroup>

                {/* Description field */}
                <FormGroup className="form-item text-input">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Description</Label>
                  <Input
                    type="text"
                    className="w-[250px] h-[36px] text-sm"
                    value={selectedOrder.fcynam}
                    onChange={onChangeDescription}
                  />
                </FormGroup>

                {/* Geo-Coordinate SO */}
                <FormGroup className="form-item text-input">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Geo-Coordinate SO</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value == selectedOrder.x1cgeoso) || null}
                    onChange={handleChangeTypeList}
                    isClearable
                    placeholder="Select"
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: '36px',
                        height: '36px',
                        width: '250px', // ✅ consistent width
                        fontSize: '0.875rem',
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

            {/* GENERAL TAB */}

            <div id="general" className="section-header">
              <h3>General</h3>
              <div className="section-body">
                <FormGroup>
                  <Label>Short Description</Label>
                  <Input
                    type="text"
                    value={selectedOrder.fcysho}
                    onChange={onChangeShortDescription}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Legal Company</Label>
                  <Input
                    type="text"
                    value={selectedOrder.legcpy}
                    onChange={onChangeLegalCompany}
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
                  <Label>Site tax ID no.</Label>
                  <Input
                    type="text"
                    value={selectedOrder.crn}
                    onChange={onChangeSiteTax}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>SIC code</Label>
                  <Input
                    type="text"
                    value={selectedOrder.naf}
                    onChange={onChangeSicCode}
                  />
                </FormGroup>
                <div />
              </div>





              {/* Add other form groups as needed */}
            </div>

            <div id="transportation" className="section-header">
              <h3>Transportation</h3>
              <div className="section-body">
                <FormGroup>
                  <Label>Latitude</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xx10c_geox}
                    onChange={onChangeLatitude}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Longitude</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xx10c_geoy}
                    onChange={onChangeLongitude}
                  />
                </FormGroup>
                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.xtmsfcy === 2 ? true : false}
                      onChange={handleTmsRouteCheckboxChange}
                    />
                    TMS Route planning
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>Updated User</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xupdusr}
                    onChange={onChangeUpdatedUser}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Updated Date</Label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Input
                      type="date"
                      value={
                        selectedOrder.xupddate &&
                          selectedOrder.xupddate !== "1753-01-01T00:00:00.000+00:00"
                          ? new Date(selectedOrder.xupddate).toISOString().slice(0, 10)
                          : ""
                      }
                      onChange={onChangeUpdatedDate}
                      id="updatedDate"
                      className="form-control"
                    />

                  </div>
                </FormGroup>
                <FormGroup>
                  <Label>Updated Through</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value == selectedOrder.xupdvia) || null}
                    onChange={onChangeUpdatedThrough}
                    isClearable
                    placeholder="Select"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Products base pricelist</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value == selectedOrder.xbaseprllst) || null}
                    onChange={onChangeProdList}
                    isClearable
                    placeholder="Select"
                  />
                </FormGroup>
              </div>
            </div>
            <div id="acct" className="section-header">
              <h3>Acct Financials</h3>
              <div className="section-body">
                <div className="flex flex-wrap gap-6 items-start">
                  {/* Checkbox Field */}
                  <FormGroup check className="form-item checkbox-input">
                    <Label check className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Input
                        type="checkbox"
                        checked={selectedOrder.finflg === 2}
                        onChange={handleCheckFinancial}
                        className="form-checkbox h-4 w-4 mt-[6px]"
                      />
                      Financial Site
                    </Label>
                  </FormGroup>

                  {/* Financial Site Select */}
                  <FormGroup className="form-item text-input">
                    <Label className="text-sm font-medium text-gray-700 mb-1">
                      Financial Site
                    </Label>
                    <Select
                      options={commonData?.typeList}
                      value={
                        commonData?.typeList.find(opt => opt.value == selectedOrder.finsite) || null
                      }
                      onChange={onChangeFinanceSite}
                      isClearable
                      placeholder="Select"
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
                  </FormGroup>

                  {/* Accounting Code Select */}
                  <FormGroup className="form-item text-input">
                    <Label className="text-sm font-medium text-gray-700 mb-1">
                      Accounting Code <span className="text-red-600">*</span>
                    </Label>
                    <Select
                      options={commonData?.typeList}
                      value={
                        commonData?.typeList.find(opt => opt.value == selectedOrder.acccod) || null
                      }
                      onChange={onChangeAccounting}
                      isClearable
                      placeholder="Select"
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
                  </FormGroup>
                </div>

              </div>
            </div>

            <div id="analyticaldimensions" className="mt-3">

              <div className="section-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">Analytical Dimensions</h3>

                  <Button color="primary" size="sm" onClick={addAnalyticalDimension}>
                    +
                  </Button>
                </div>
              </div>


              <Table responsive striped bordered hover className="no-margin-table">
                <thead>
                  <tr className="text-center" style={{ color: "black" }}>
                    <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                    <th style={{ background: "#CCD6DB" }}>Dimension Type</th>
                    <th style={{ background: "#CCD6DB" }}>Description</th>
                    <th style={{ background: "#CCD6DB" }}>Analytical Dimension</th>
                    <th style={{ background: "#CCD6DB" }}>Description</th>
                    <th style={{ background: "#CCD6DB" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.analyticalDimension?.map((row, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>

                      <td>
                        <Input
                          type="text"
                          value={row.dimensionType}
                          onChange={(e) => handleAnalyticalDimensionChange(index, "dimensionType", e.target.value)}
                        />
                      </td>

                      <td>
                        <Input
                          type="text"
                          value={row.dimensionTypeDescription}
                          onChange={(e) => handleAnalyticalDimensionChange(index, "dimensionTypeDescription", e.target.value)}
                        />
                      </td>

                      <td>
                        <Input
                          type="text"
                          value={row.analyticalDimension}
                          onChange={(e) => handleAnalyticalDimensionChange(index, "analyticalDimension", e.target.value)}
                        />
                      </td>

                      <td>
                        <Input
                          type="text"
                          value={row.analyticalDimensionDescription}
                          onChange={(e) => handleAnalyticalDimensionChange(index, "analyticalDimensionDescription", e.target.value)}
                        />
                      </td>

                      <td>
                        <Button color="danger" size="sm" onClick={() => removeAnalyticalDimension(index)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* Addresses Section */}
            <div id="addresses" className="mt-0">

              <div className="section-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">Addresses</h3>

                  <Button color="primary" size="sm" onClick={handleAddAddress}>
                    +
                  </Button>
                </div>
              </div>

              <Table responsive striped bordered hover className>
                <thead>
                  <tr className="text-center" style={{ color: "black" }}>
                    <th style={{ background: "#CCD6DB" }}>Sr. No</th>
                    <th style={{ background: "#CCD6DB" }}>Address</th>
                    <th style={{ background: "#CCD6DB" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedOrder.addresses || []).map((address, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>
                        <Input
                          type="text"
                          value={address}
                          onChange={(e) => handleAddressChange(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => handleRemoveAddress(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>



            <div className="section-header">
              <h3>Details</h3>
              <div className="section-body">
                <FormGroup>
                  <Label>Code</Label>
                  <Input
                    type="text"
                    value={selectedOrder.code}
                    onChange={onChangeCode}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xbpades}
                    onChange={onChangeDetailDescription}
                  />
                </FormGroup>
                <FormGroup className="form-item text-input">
                  <Label>Country</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value == selectedOrder.xbpacry) || null}
                    onChange={onChangeDetailCountry}
                    isClearable
                    placeholder="Select"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>(Country)Description</Label>
                  <Input
                    type="text"
                    value={selectedOrder.countrydes}
                    onChange={onChangeDetailDescriptionCountry}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Type</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value == selectedOrder.xaddtypsa) || null}
                    onChange={onChangeDetailType}
                    isClearable
                    placeholder="Select"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Type Service</Label>
                  <Input
                    type="text"
                    value={selectedOrder.typser}
                    onChange={onChangeDetailTypeService}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Unit/Postal Number</Label>
                  <Input
                    type="number"
                    value={selectedOrder.xaddposnbrsa}
                    onChange={onChangeDetailUnitPostal}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Complex</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xaddcpxsa}
                    onChange={onChangeDetailComplex}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Address 1</Label>
                  <Input
                    type="text"
                    name="xaddlig1"
                    value={selectedOrder.xaddlig1}
                    onChange={onChangeDetailAddress}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Address 2</Label>
                  <Input
                    type="text"
                    name="xaddlig2"
                    value={selectedOrder.xaddlig2}
                    onChange={onChangeDetailAddress}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Address 3</Label>
                  <Input
                    type="text"
                    name="xaddlig3"
                    value={selectedOrder.xaddlig3}
                    onChange={onChangeDetailAddress}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Suburb / District</Label>
                  <Input
                    type="text"
                    name="xaddsubasa"
                    value={selectedOrder.xaddsubasa}
                    onChange={onChangeDetailAddress}
                  />
                </FormGroup>
                <FormGroup className="form-item text-input">
                  <Label>Postal Code</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.xposcod) || null}
                    onChange={(selected) => onChangeCityStatePostal("xposcod", selected)}
                    isClearable
                    placeholder="Select Postal Code"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>City</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.xcty) || null}
                    onChange={(selected) => onChangeCityStatePostal("xcty", selected)}
                    isClearable
                    placeholder="Select City"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>State</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.xsat) || null}
                    onChange={(selected) => onChangeCityStatePostal("xsat", selected)}
                    isClearable
                    placeholder="Select State"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Website</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xfcyweb}
                    onChange={onChangeDetailWebsite}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>External Identifier</Label>
                  <Input
                    type="text"
                    value={selectedOrder.xextnum}
                    onChange={onChangeDetailExternal}
                  />
                </FormGroup>
                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.xbpaaddflg === 2 ? true : false}
                      onChange={onCheckDefaultAddress}
                    />
                    Default Address
                  </Label>
                </FormGroup>
              </div>
            </div>

            <div id="telephone" className="section-header">
              <h3>Telephone</h3>
              <div className="section-body">

                <FormGroup>
                  <Label>Landline</Label>
                  <Input
                    type="text"
                    name="xtel1"
                    value={selectedOrder.xtel1}
                    onChange={onChangeTelephone}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Fax</Label>
                  <Input
                    type="text"
                    name="xtel2"
                    value={selectedOrder.xtel2}
                    onChange={onChangeTelephone}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Toll Free</Label>
                  <Input
                    type="text"
                    name="xtel3"
                    value={selectedOrder.xtel3}
                    onChange={onChangeTelephone}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Other</Label>
                  <Input
                    type="text"
                    name="xtel4"
                    value={selectedOrder.xtel4}
                    onChange={onChangeTelephone}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Mobile</Label>
                  <Input
                    type="text"
                    name="xtel5"
                    value={selectedOrder.xtel5}
                    onChange={onChangeTelephone}
                  />
                </FormGroup>


              </div>
            </div>

            <div id="email" className="section-header">
              <h3>Email</h3>
              <div className="section-body">
                <FormGroup className="form-item text-input">
                  <Label>Email</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.xweb1) || null}
                    onChange={(selected) => onChangeEmail("xweb1", selected)}
                    isClearable
                    placeholder="Select Email"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Other Email 2</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.xweb2) || null}
                    onChange={(selected) => onChangeEmail("xweb2", selected)}
                    isClearable
                    placeholder="Select Email"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Other Email 3</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.xweb3) || null}
                    onChange={(selected) => onChangeEmail("xweb3", selected)}
                    isClearable
                    placeholder="Select Email"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Other Email 4</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.xweb4) || null}
                    onChange={(selected) => onChangeEmail("xweb4", selected)}
                    isClearable
                    placeholder="Select Email"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Other Email 5</Label>
                  <Select
                    options={commonData?.typeList}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.xweb5) || null}
                    onChange={(selected) => onChangeEmail("xweb5", selected)}
                    isClearable
                    placeholder="Select Email"
                  />
                </FormGroup>
              </div>

            </div>
            <div id="bankDetails" className="mt-3">

              <div className="section-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">Bank Details</h3>

                  <Button color="primary" size="sm" onClick={handleAddRow}>
                    +
                  </Button>
                </div>
              </div>


              <div
                className="custom-divider px-3 py-3 overflow-x-auto"
                style={{ minHeight: "fit-content" }}
              >
                <Table
                  responsive
                  bordered

                  className="min-w-[1000px] w-full text-center mt-2"
                >
                  <thead>
                    <tr style={{ backgroundColor: "#CCD6DB", color: "black" }}>
                      <th>Sr No</th>
                      <th>Country</th>
                      <th>Bank Acct Number</th>
                      <th>Default</th>
                      <th>Address</th>
                      <th>ISR Customer No</th>
                      <th>Paying Bank</th>
                      <th>Beneficiary</th>
                      <th>Paying Bank 2</th>
                      <th>Paying Bank 3</th>
                      <th>Paying Bank 4</th>
                      <th>BIC Code</th>
                      <th>Intermediary Bank</th>
                      <th>Paying Bank 1</th>
                      <th>Paying Bank 2</th>
                      <th>Paying Bank 3</th>
                      <th>BIC Code</th>
                      <th>Country</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankTableData.length > 0 ? (
                      bankTableData.map((row, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          {[
                            "country", "bankAcctNumber", "isDefault", "address", "isrCustomerNo",
                            "payingBank", "beneficiary", "payingBank2", "payingBank3", "payingBank4",
                            "bicCode1", "intermediaryBank", "payingBank1", "payingBank22", "payingBank33",
                            "bicCode2", "country2"
                          ].map((key) => (
                            <td key={key}>
                              <Select
                                options={commonData?.typeList}
                                value={commonData?.typeList.find(opt => opt.value === row[key]) || null}
                                onChange={(selected) =>
                                  handleDropdownChange(index, key, selected ? selected.value : "")
                                }
                                isClearable
                                placeholder="Select"
                                menuPortalTarget={document.body} // <--- This ensures the menu is rendered on body
                                styles={{
                                  control: (base) => ({
                                    ...base,
                                    minHeight: 34,
                                    fontSize: 14,
                                    zIndex: 2, // keeps control on top
                                  }),
                                  container: (base) => ({
                                    ...base,
                                    minWidth: 150,
                                  }),
                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999, // <--- Forces dropdown to be above everything
                                  }),
                                }}
                              />

                              {/* <Select
                                options={commonData?.typeList}
                                value={commonData?.typeList.find(opt => opt.value === row[key]) || null}
                                onChange={(selected) => handleDropdownChange(index, key, selected ? selected.value : "")}
                                isClearable
                                placeholder="Select"
                                styles={{
                                  control: (base) => ({ ...base, minHeight: 34, fontSize: 14 }),
                                  container: (base) => ({ ...base, minWidth: 150 }),
                                }}
                              /> */}
                            </td>
                          ))}
                          <td>
                            <Button color="danger" size="sm" onClick={() => handleRemoveRow(index)}>
                              Delete
                            </Button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={19} className="text-center text-muted">
                          No data available. Click "Add Row" to begin.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>


              </div>
            </div>
            <div id="contacts" className="mt-3">

              <div className="section-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">Contacts</h3>

                  <Button color="primary" size="sm" onClick={() => handleContactsTableChange("add")}>
                    +
                  </Button>
                </div>
              </div>

              <Table responsive striped bordered hover className>
                <thead>
                  <tr className="text-center" style={{ color: "black" }}>
                    <th style={{ background: "#CCD6DB" }}>Sr.No</th>
                    <th style={{ background: "#CCD6DB" }}>Code</th>
                    <th style={{ background: "#CCD6DB" }}>Last Name</th>
                    <th style={{ background: "#CCD6DB" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contactsData.length > 0 ? (
                    contactsData.map((row, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>

                        <td>
                          <Select
                            options={commonData?.typeList || []}
                            value={commonData?.typeList.find((opt) => opt.value === row.code) || null}
                            onChange={(selected) =>
                              handleContactsTableChange(
                                "update",
                                index,
                                "code",
                                selected ? selected.value : ""
                              )
                            }
                            isClearable
                            placeholder="Select Code"
                            menuPortalTarget={document.body} // ✅ Renders menu on body
                            styles={{
                              control: (base) => ({
                                ...base,
                                minHeight: 34,
                                fontSize: 14,
                              }),
                              container: (base) => ({
                                ...base,
                                minWidth: 150,
                              }),
                              menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999, 
                              }),
                            }}
                          />
                        </td>


                        <td>
                          <Input
                            type="text"
                            value={row.lastName}
                            onChange={(e) =>
                              handleContactsTableChange("update", index, "lastName", e.target.value)
                            }
                          />
                        </td>

                        <td>
                          <Button color="danger" size="sm" onClick={() => handleContactsTableChange("remove", index)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center text-muted">
                        No contact data available. Click "+" to add.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">

                <FormGroup>
                  <Label>Code</Label>
                  <Input
                    type="text"
                    name="xtel5"
                    value={selectedOrder.contactcode}
                    onChange={onChangeContactCode}
                  />
                </FormGroup>
                <FormGroup className="form-item text-input">
                  <Label>Title </Label>
                  <Select
                    options={commonData?.countryList || []}
                    value={
                      (commonData?.countryList || []).find(
                        (option) => option.value === selectedOrder.kcntttl
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      onChangeTitle(selectedOption ? selectedOption.value : null)
                    }
                    placeholder="Select"
                    isClearable
                  />

                </FormGroup>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="xtel5"
                    value={selectedOrder.kcntlna}
                    onChange={onChangeLastName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="xtel5"
                    value={selectedOrder.kcntfna}
                    onChange={onChangeFirstName}
                  />
                </FormGroup>
                <FormGroup className="form-item text-input">
                  <Label>Function</Label>
                  <Select
                    options={commonData?.countryList || []}
                    value={
                      (commonData?.countryList || []).find(
                        (option) => option.value === selectedOrder.kcntfnc
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      onChangeFunction(selectedOption ? selectedOption.value : null)
                    }
                    placeholder="Select"
                    isClearable
                  />

                </FormGroup>
                <FormGroup>
                  <Label>Department</Label>
                  <Input
                    type="text"
                    name="xtel5"
                    value={selectedOrder.kcntsrv}
                    onChange={onChangeDepartment}
                  />
                </FormGroup>
                <FormGroup className="form-item text-input">
                  <Label>Role</Label>
                  <Select
                    options={commonData?.countryList || []}
                    value={
                      (commonData?.countryList || []).find(
                        (option) => option.value === selectedOrder.kcntmss
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      onChangeRole(selectedOption ? selectedOption.value : null)
                    }
                    placeholder="Select"
                    isClearable
                  />

                </FormGroup>
                <FormGroup className="form-item text-input">
                  <Label>Language</Label>
                  <Select
                    options={commonData?.typeList || []}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.kcntlan) || null}
                    onChange={(selected) => handleKcntDropdownChange("kcntlan", selected)}
                    isClearable
                    placeholder="Select Language"
                  />
                </FormGroup>
                <FormGroup className="form-item text-input">
                  <Label>Date of Birth</Label>
                  <DatePicker
                    selected={selectedOrder.dob}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                    className="form-control"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    isClearable
                  />
                </FormGroup>



                {/* Category */}
                <FormGroup className="form-item text-input">
                  <Label>Category</Label>
                  <Select
                    options={commonData?.typeList || []}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.kcntcat) || null}
                    onChange={(selected) => handleKcntDropdownChange("kcntcat", selected)}
                    isClearable
                    placeholder="Select Category"
                  />
                </FormGroup>

                {/* Address */}
                <FormGroup className="form-item text-input">
                  <Label>Address</Label>
                  <Select
                    options={commonData?.typeList || []}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.kcntadd) || null}
                    onChange={(selected) => handleKcntDropdownChange("kcntadd", selected)}
                    isClearable
                    placeholder="Select Address"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Email</Label>
                  <Select
                    options={commonData?.countryList || []}
                    value={
                      (commonData?.countryList || []).find(
                        (option) => option.value === selectedOrder.kcntweb
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      onChangeConEmail(selectedOption ? selectedOption.value : null)
                    }
                    placeholder="Select"
                    isClearable
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Telephone</Label>
                  <Input
                    type="text"
                    name="kcnttel"
                    value={selectedOrder.kcnttel || ""}
                    onChange={handleKcntInputChange}
                  />
                </FormGroup>

                {/* Fax */}
                <FormGroup>
                  <Label>Fax</Label>
                  <Input
                    type="text"
                    name="kcntfax"
                    value={selectedOrder.kcntfax || ""}
                    onChange={handleKcntInputChange}
                  />
                </FormGroup>

                {/* Mobile */}
                <FormGroup>
                  <Label>Mobile</Label>
                  <Input
                    type="text"
                    name="kcntmob"
                    value={selectedOrder.kcntmob || ""}
                    onChange={handleKcntInputChange}
                  />
                </FormGroup>


                <FormGroup className="form-item text-input">
                  <Label>Type</Label>
                  <Select
                    options={commonData?.typeList || []}
                    value={commonData?.typeList.find(opt => opt.value === selectedOrder.krsacnttyp) || null}
                    onChange={(selected) =>
                      handleContactFieldChange("krsacnttyp", selected ? selected.value : "")
                    }
                    isClearable
                    placeholder="Select Type"
                  />
                </FormGroup>


                <FormGroup check className="form-item checkbox-input mt-2">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.kcntfbdmag === 2}
                      onChange={() =>
                        handleContactFieldChange(
                          "kcntfbdmag",
                          selectedOrder.kcntfbdmag === 2 ? 1 : 2
                        )
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-lg font-medium ml-2">Mailing Prohibited</span>
                  </Label>
                </FormGroup>


                <FormGroup check className="form-item checkbox-input mt-2">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.kcntflg === 2}
                      onChange={() =>
                        handleContactFieldChange(
                          "kcntflg",
                          selectedOrder.kcntflg === 2 ? 1 : 2
                        )
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-lg font-medium ml-2">Default Contact</span>
                  </Label>
                </FormGroup>
              </div>
            </div>





            <div id="details" className="section-header">
              <h3>Details</h3>
              <div className="section-body">




                <FormGroup className="form-item text-input">
                  <Label>DAS2 Site</Label>
                  <Select
                    options={commonData?.siteList || []}
                    value={
                      (commonData?.siteList || []).find(
                        (option) => option.value === selectedOrder.das2site
                      ) || null
                    }
                    onChange={(selected) =>
                      handleDasFieldsChange("das2site", selected ? selected.value : "")
                    }
                    isClearable
                    placeholder="Select Site"
                  />
                </FormGroup>


                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.mfgflg === 2}
                      onChange={() =>
                        handleDasFieldsChange("mfgflg", selectedOrder.mfgflg === 2 ? 1 : 2)
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-lg font-medium ml-2">Manufacturing</span>
                  </Label>
                </FormGroup>

                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.salflg === 2}
                      onChange={() =>
                        handleDasFieldsChange("salflg", selectedOrder.salflg === 2 ? 1 : 2)
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-lg font-medium ml-2">Sales</span>
                  </Label>
                </FormGroup>


                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.purflg === 2}
                      onChange={() =>
                        handleDasFieldsChange("purflg", selectedOrder.purflg === 2 ? 1 : 2)
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-lg font-medium ml-2">Purchase</span>
                  </Label>
                </FormGroup>

                {/* Stock */}
                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.wrhflg === 2}
                      onChange={() =>
                        handleDasFieldsChange("wrhflg", selectedOrder.wrhflg === 2 ? 1 : 2)
                      }
                      className="w-5 h-5"
                    />

                    <span className="text-lg font-medium ml-2">Stock</span>
                  </Label>
                </FormGroup>

              </div>
            </div>
            <div id="defaultworkdays" className="section-header">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Default Workdays</h3>

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
                            handleWorkdaysChange(day.key, e.target.checked)
                          }
                          className="w-5 h-5"
                        />
                        <span className="text-lg font-medium ml-2">{day.label}</span>
                      </Label>
                    </FormGroup>
                  ))}
                </div>

                <FormGroup className="form-item text-input mt-4">
                  <Label>Unavailable</Label>
                  <Select
                    options={commonData?.typeList || []}
                    value={
                      (commonData?.typeList || []).find(
                        (option) => option.value === selectedOrder.uvycod
                      ) || null
                    }
                    onChange={(selected) =>
                      setSelectedOrder((prev) => ({
                        ...prev,
                        uvycod: selected ? selected.value : "",
                      }))
                    }
                    isClearable
                    placeholder="Select"
                  />
                </FormGroup>
              </div>
            </div>
            <div id="miscelleneous" className="section-header">
              <h3>Miscellaneous</h3>
              <div className="section-body">
                <FormGroup className="form-item text-input">
                  <Label>Carrier</Label>
                  <Select
                    options={commonData?.typeList || []}
                    value={
                      (commonData?.typeList || []).find(
                        (opt) => opt.value === selectedOrder.bptnum
                      ) || null
                    }
                    onChange={(selected) => handleCarrierAndBankChange("bptnum", selected)}
                    isClearable
                    placeholder="Select Carrier"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Payment Bank</Label>
                  <Select
                    options={commonData?.typeList || []}
                    value={
                      (commonData?.typeList || []).find(
                        (opt) => opt.value === selectedOrder.payban
                      ) || null
                    }
                    onChange={(selected) => handleCarrierAndBankChange("payban", selected)}
                    isClearable
                    placeholder="Select Payment Bank"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Transp. Starting Hour (hh:mm)</Label>
                  <Input
                    type="text"
                    maxLength={5}
                    placeholder="hh:mm"
                    value={selectedOrder.strhou}
                    onChange={(e) => handleTimeChange("strhou", e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Transp. Ending Hour (hh:mm)</Label>
                  <Input
                    type="text"
                    maxLength={5}
                    placeholder="hh:mm"
                    value={selectedOrder.endhou}
                    onChange={(e) => handleTimeChange("endhou", e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>
            <div id="das2" className="section-header">
              <h3>Das-2 Address</h3>
              <div className="section-body">

                {/* First row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormGroup>
                    <Label>Company name</Label>
                    <Input
                      type="text"
                      value={selectedOrder.companyName || ""}
                      onChange={(e) => handleDas2Change("companyName", e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Address complement</Label>
                    <Input
                      type="text"
                      value={selectedOrder.addressComplement || ""}
                      onChange={(e) => handleDas2Change("addressComplement", e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Street number</Label>
                    <Input
                      type="text"
                      value={selectedOrder.streetNumber || ""}
                      onChange={(e) => handleDas2Change("streetNumber", e.target.value)}
                    />
                  </FormGroup>
                </div>

                {/* Second row */}

                <FormGroup>
                  <Label>Street</Label>
                  <Input
                    type="text"
                    value={selectedOrder.street || ""}
                    onChange={(e) => handleDas2Change("street", e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Municipality code</Label>
                  <Input
                    type="text"
                    value={selectedOrder.municipalityCode || ""}
                    onChange={(e) => handleDas2Change("municipalityCode", e.target.value)}
                  />
                </FormGroup>


                <FormGroup className="form-item text-input">
                  <Label>Municipality</Label>
                  <Select
                    options={commonData?.municipalityList || []}
                    value={commonData?.municipalityList?.find(opt => opt.value === selectedOrder.municipality) || null}
                    onChange={(selected) => handleDas2Change("municipality", selected?.value || "")}
                    isClearable
                    placeholder="Select Municipality"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Postal code</Label>
                  <Select
                    options={commonData?.postalCodeList || []}
                    value={commonData?.postalCodeList?.find(opt => opt.value === selectedOrder.postalCode) || null}
                    onChange={(selected) => handleDas2Change("postalCode", selected?.value || "")}
                    isClearable
                    placeholder="Select Postal Code"
                  />
                </FormGroup>



                <FormGroup className="form-item text-input">
                  <Label>Distributor office</Label>
                  <Select
                    options={commonData?.distributorList || []}
                    value={commonData?.distributorList?.find(opt => opt.value === selectedOrder.distributorOffice) || null}
                    onChange={(selected) => handleDas2Change("distributorOffice", selected?.value || "")}
                    isClearable
                    placeholder="Select Office"
                  />
                </FormGroup>


                {/* Fifth row */}

                <FormGroup>
                  <Label>Site tax ID no.</Label>
                  <Input
                    type="text"
                    value={selectedOrder.siteTaxId || ""}
                    onChange={(e) => handleDas2Change("siteTaxId", e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Site tax ID no. on 01/01</Label>
                  <Input
                    type="text"
                    value={selectedOrder.siteTaxId0101 || ""}
                    onChange={(e) => handleDas2Change("siteTaxId0101", e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>SIC code</Label>
                  <Input
                    type="text"
                    value={selectedOrder.sicCode || ""}
                    onChange={(e) => handleDas2Change("sicCode", e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>URSSAF code</Label>
                  <Input
                    type="text"
                    value={selectedOrder.urssafCode || ""}
                    onChange={(e) => handleDas2Change("urssafCode", e.target.value)}
                  />
                </FormGroup>



                <FormGroup>
                  <Label>URSSAF account</Label>
                  <Input
                    type="text"
                    value={selectedOrder.urssafAccount || ""}
                    onChange={(e) => handleDas2Change("urssafAccount", e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form-item text-input">
                  <Label>DAS2 Number</Label>
                  <Select
                    options={commonData?.typeList || []}
                    value={
                      (commonData?.typeList || []).find(
                        (opt) => opt.value === selectedOrder.das2num
                      ) || null
                    }
                    onChange={(selected) =>
                      handleLegalFieldsChange("das2num", selected ? selected.value : "")
                    }
                    isClearable
                    placeholder="Select DAS2 Number"
                  />
                </FormGroup>


                <FormGroup>
                  <Label>CRAM Number</Label>
                  <Input
                    type="text"
                    value={selectedOrder.cramnum}
                    onChange={(e) =>
                      handleLegalFieldsChange("cramnum", e.target.value)
                    }
                  />
                </FormGroup>


                <FormGroup>
                  <Label>Business</Label>
                  <Input
                    type="text"
                    value={selectedOrder.buscod}
                    onChange={(e) =>
                      handleLegalFieldsChange("buscod", e.target.value)
                    }
                  />
                </FormGroup>


                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.taxsalflg === 2}
                      onChange={() =>
                        handleLegalFieldsChange(
                          "taxsalflg",
                          selectedOrder.taxsalflg === 2 ? 1 : 2
                        )
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-lg font-medium ml-2">Tax on salaries</span>
                  </Label>
                </FormGroup>
              </div>


            </div>
            <div id="das2signer" className="section-header">
              <h3>Das 2-Signer</h3>
              <div className="section-body">

                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    value={selectedOrder.lstnam}
                    onChange={(e) => handleContactInfoChange("lstnam", e.target.value)}
                  />
                </FormGroup>


                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    value={selectedOrder.fstnam}
                    onChange={(e) => handleContactInfoChange("fstnam", e.target.value)}
                  />
                </FormGroup>


                <FormGroup>
                  <Label>Telephone</Label>
                  <Input
                    type="text"
                    value={selectedOrder.tel}
                    onChange={(e) => handleContactInfoChange("tel", e.target.value)}
                  />
                </FormGroup>


                <FormGroup className="form-item text-input">
                  <Label>Email Address</Label>
                  <Select
                    options={commonData?.typeList || []}
                    value={
                      (commonData?.typeList || []).find(
                        (opt) => opt.value === selectedOrder.email
                      ) || null
                    }
                    onChange={(selected) =>
                      handleContactInfoChange("email", selected ? selected.value : "")
                    }
                    isClearable
                    placeholder="Select Email"
                  />
                </FormGroup>


                <FormGroup>
                  <Label>Function</Label>
                  <Input
                    type="text"
                    value={selectedOrder.func}
                    onChange={(e) => handleContactInfoChange("func", e.target.value)}
                  />
                </FormGroup>

              </div>
            </div>

            <div id="warehouse" className="section-header">
              <h3>Warehouse Management</h3>
              <div className="section-body">
                <FormGroup check className="form-item checkbox-input">
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={selectedOrder.whsmgtflg === 2}
                      onChange={handleWarehouseCheckboxChange}
                      className="w-5 h-5"
                    />
                    <span className="text-lg font-medium ml-2">Warehouse Management</span>
                  </Label>
                </FormGroup>

                <div className="mt-3 responsive-form">
                  <h3 className="text-bold">Default Warehouse</h3>

                  {[
                    { key: "whrec", label: "Receipt" },
                    { key: "whintrec", label: "Internal receipt movement" },
                    { key: "whdelret", label: "Delivery return" },
                    { key: "whstkrint", label: "Stock reintegration" },
                    { key: "whship", label: "Shipment" },
                    { key: "whmatcon", label: "Material consumption" },
                    { key: "whintiss", label: "Internal issue movement" },
                    { key: "whsubdes", label: "Subcontract dispatch" },
                    { key: "whsubcon", label: "Subcontract consumption" },
                  ].map(({ key, label }) => (
                    <FormGroup key={key} className="form-item text-input">
                      <Label>{label}</Label>
                      <Select
                        options={commonData?.typeList || []}
                        value={
                          (commonData?.typeList || []).find(
                            (opt) => opt.value === selectedOrder[key]
                          ) || null
                        }
                        onChange={(selected) =>
                          handleDefaultWarehouseChange(key, selected ? selected.value : "")
                        }
                        isClearable
                        placeholder="Select"
                        isDisabled={selectedOrder.whsmgtflg !== 2}
                      />
                    </FormGroup>
                  ))}
                </div>

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
