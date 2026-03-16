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
import { toast } from "react-toastify";


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















  const [infoRows, setInfoRows] = useState([
    {
      select: false,
      routing: "",
      routeDate: "",
      vehicleCode: "",
      trip: "",
      loaderId: "",
      vrValidated: false,
      lvsNumber: "",
      lvsValidated: false,
    },
  ]);




  const [linesTableData, setLinesTableData] = useState([
    {
      purchaseOrder: "",
      orderNo: "",
      product: "",
      unit: "",
      description1: "",
      description: "",
      quantity: "",
      grossPrice: "",
      discountCharge1: "",
      discountCharge2: "",
      discountCharge3: "",
      netPrice: "",
      production: "",
      lineAmount: "",
      tax: "",
      tax2: "",
      taxAmount: "",
      lineAmountWithTax: "",
      startingSerialNo: "",
      endingSerialNo: "",
      weight: "",
      description2: "",
      contactNo: "",
      description3: "",
      updateFlag: "",
      contractLine: "",
    },
  ]);

  const handleAddLineRow = () => {
    const lastRow = linesTableData[linesTableData.length - 1];

    const requiredFields = [
      "purchaseOrder", "orderNo", "product", "unit", "quantity", "grossPrice",
      "netPrice", "lineAmount", "tax", "lineAmountWithTax"
    ];

    const isLastRowFilled = lastRow && requiredFields.every(
      (key) => lastRow[key] !== "" && lastRow[key] !== null && lastRow[key] !== undefined
    );

    if (!isLastRowFilled) {
      toast.error("Please fill in all required fields before adding a new row.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLinesTableData((prev) => [
      ...prev,
      {
        purchaseOrder: "",
        orderNo: "",
        product: "",
        unit: "",
        description1: "",
        description: "",
        quantity: "",
        grossPrice: "",
        discountCharge1: "",
        discountCharge2: "",
        discountCharge3: "",
        netPrice: "",
        production: "",
        lineAmount: "",
        tax: "",
        tax2: "",
        taxAmount: "",
        lineAmountWithTax: "",
        startingSerialNo: "",
        endingSerialNo: "",
        weight: "",
        description2: "",
        contactNo: "",
        description3: "",
        updateFlag: "",
        contractLine: "",
      },
    ]);
  };


  const handleRemoveLineRow = (index) => {
    const updated = [...linesTableData];
    updated.splice(index, 1);
    setLinesTableData(updated);
  };

  const handleLineInputChange = (index, key, value) => {
    const updated = [...linesTableData];
    updated[index][key] = value;
    setLinesTableData(updated);
  };

  const handleLineDropdownChange = (index, key, value) => {
    const updated = [...linesTableData];
    updated[index][key] = value;
    setLinesTableData(updated);
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
      xfcy: value,
    }));
  };
  const handleTypeSelect = (value) => {
    setSelectedOrder((prevState) => ({
      ...prevState,
      type: value,
    }));
  };




  const handlePreciptChange = (e) => {
    const { value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      precipt: value,
    }));
  };


  const handleNumberSelect = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      supplier: value,
    }));
  };
   const handleSoldToSelect = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      supplier: value,
    }));
  };


   const handleCurrencySelect = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      supplier: value,
    }));
  };



  const handleAddressChange = (e) => {
    const { value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      address: value,
    }));
  };


  const handleDeliverCodeSelect = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      deliverCode: value,
    }));
  };




  const handleTransportationStatus = (e) => {
    const { value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      transtatus: value,
    }));
  };


  const handleRescheduledOrCancellation = (e) => {
    const { value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      resec: value,
    }));
  };




  const onChangeSalesDate = (date) => {
    setSelectedOrder((prev) => ({
      ...prev,
      salesDate: date,
    }));
  };






  const handleChangeGrossWeight = (e) => {
    const { value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      grossw: value,
    }));
  };



  const handleChangeLatitude = (e) => {
    const { value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      lati: value,
    }));
  };

  const handleChangeLongitude = (e) => {
    const { value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      long: value,
    }));
  };


  const handleChangeWeightUnit = (e) => {
    const { value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      weigthu: value,
    }));
  };















































  const confirmDelete = () => { };



  return (

    <Card className=" m-0" style={{ color: "black", fontSize: "16px" }}>
      <CardBody
        className="relative py-0 px-2 m-0 overflow-y-auto"
        style={{
           height: "calc(100vh - 80px)",
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
              <FormGroup className="form-item text-input">
                <Label for="site">
                  Site <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>

                <Select
                  options={commonData?.supplierList || []}
                  value={
                    (commonData?.supplierList || []).find(
                      (option) => option.value === selectedOrder.xfcy
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
                  <div className="text-red-600 text-xs mt-1">{error.site}</div>
                )}
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="type">
                  Type <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>

                <Select
                  options={commonData?.supplierList || []}
                  value={
                    (commonData?.supplierList || []).find(
                      (option) => option.value === selectedOrder.type
                    ) || null
                  }
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )}
                  onChange={(selectedOption) =>
                    handleTypeSelect(selectedOption ? selectedOption.value : null)
                  }
                  placeholder="Select"
                  isClearable
                />

                {error.site && (
                  <div className="text-red-600 text-xs mt-1">{error.site}</div>
                )}
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="number">
                  Number
                </Label>

                <Select
                  options={commonData?.supplierList || []}
                  value={
                    (commonData?.supplierList || []).find(
                      (option) => option.value === selectedOrder.number
                    ) || null
                  }
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )}
                  onChange={(selectedOption) =>
                    handleNumberSelect(selectedOption ? selectedOption.value : null)
                  }
                  placeholder="Select"
                  isClearable
                />

                {error.supplier && (
                  <div className="text-red-600 text-xs mt-1">{error.supplier}</div>
                )}
              </FormGroup>




              <FormGroup>
                <Label> Date
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <DatePicker
                    selected={
                      selectedOrder.salesDate &&
                        selectedOrder.salesDate !== "1753-01-01T00:00:00.000+00:00"
                        ? new Date(selectedOrder.salesDate)
                        : null
                    }
                    onChange={(date) => onChangeSalesDate(date)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="MM/DD/YYYY"
                    className="form-control"
                    isClearable
                  />
                </div>
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="soldto">
                  Sold-To
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>

                <Select
                  options={commonData?.supplierList || []}
                  value={
                    (commonData?.supplierList || []).find(
                      (option) => option.value === selectedOrder.soldto
                    ) || null
                  }
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )}
                  onChange={(selectedOption) =>
                    handleSoldToSelect(selectedOption ? selectedOption.value : null)
                  }
                  placeholder="Select"
                  isClearable
                />

                {error.supplier && (
                  <div className="text-red-600 text-xs mt-1">{error.supplier}</div>
                )}
              </FormGroup>


               <FormGroup className="form-item text-input">
                <Label for="currency">
                  Currency
                </Label>

                <Select
                  options={commonData?.supplierList || []}
                  value={
                    (commonData?.supplierList || []).find(
                      (option) => option.value === selectedOrder.currency
                    ) || null
                  }
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )}
                  onChange={(selectedOption) =>
                    handleCurrencySelect(selectedOption ? selectedOption.value : null)
                  }
                  placeholder="Select"
                  isClearable
                />

                {error.supplier && (
                  <div className="text-red-600 text-xs mt-1">{error.supplier}</div>
                )}
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
