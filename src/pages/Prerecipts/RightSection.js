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




  const handlePreciptChange = (e) => {
    const { value } = e.target;
    setSelectedOrder((prev) => ({
      ...prev,
      precipt: value,
    }));
  };


  const handleSupplierSelect = (value) => {
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




  const onChangeRecepitDate = (date) => {
    setSelectedOrder((prev) => ({
      ...prev,
      recepitDate: date,
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
                    { id: "lines", label: "lines" },
                    



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
                <Label for="precipt">Precipt</Label>
                <Input
                  type="text"
                  id="precipt"
                  name="precipt"
                  value={selectedOrder?.precipt || ""}
                  onChange={handlePreciptChange}
                  placeholder="Enter Precipt"
                />
              </FormGroup>
              <FormGroup className="form-item text-input">
                <Label for="supplier">
                  Supplier
                </Label>

                <Select
                  options={commonData?.supplierList || []}
                  value={
                    (commonData?.supplierList || []).find(
                      (option) => option.value === selectedOrder.supplier
                    ) || null
                  }
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )}
                  onChange={(selectedOption) =>
                    handleSupplierSelect(selectedOption ? selectedOption.value : null)
                  }
                  placeholder="Select"
                  isClearable
                />

                {error.supplier && (
                  <div className="text-red-600 text-xs mt-1">{error.supplier}</div>
                )}
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="precipt">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={selectedOrder?.address || ""}
                  onChange={handleAddressChange}
                  placeholder="Enter Address"
                />
              </FormGroup>
              <FormGroup className="form-item text-input">
                <Label for="deliverCode">
                  Deliver Code <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>

                <Select
                  options={commonData?.deliverCodeList || []}
                  value={
                    (commonData?.deliverCodeList || []).find(
                      (option) => option.value === selectedOrder.deliverCode
                    ) || null
                  }
                  formatOptionLabel={(option) => (
                    <div>
                      {option.value} ({option.label})
                    </div>
                  )}
                  onChange={(selectedOption) =>
                    handleDeliverCodeSelect(selectedOption ? selectedOption.value : null)
                  }
                  placeholder="Select"
                  isClearable
                />

                {error.deliverCode && (
                  <div className="text-red-600 text-xs mt-1">{error.deliverCode}</div>
                )}
              </FormGroup>
              <FormGroup className="form-item text-input">
                <Label for="precipt">Transportation Status</Label>
                <Input
                  type="text"
                  id="transportation status"
                  name="transportation status"
                  value={selectedOrder?.transtatus || ""}
                  onChange={handleTransportationStatus}
                  placeholder="Enter Address"
                />
              </FormGroup>

              <div className="d-flex flex-wrap gap-4">
                <FormGroup className="form-item text-input" style={{ width: "300px", flexShrink: 0 }}>

                  <Label for="resec">Rescheduled / Cancelled</Label>
                  <Input
                    type="text"
                    id="resec"
                    name="resec"
                    value={selectedOrder?.resec || ""}
                    onChange={handleRescheduledOrCancellation}
                    placeholder="Enter Status"
                  />
                </FormGroup>
                <FormGroup className="form-item text-input" style={{ width: "300px", flexShrink: 0 }}>

                  <Label for="resec">Rescheduled / Cancelled</Label>
                  <Input
                    type="text"
                    id="resec"
                    name="resec"
                    value={selectedOrder?.resec || ""}
                    onChange={handleRescheduledOrCancellation}
                    placeholder="Enter Status"
                  />
                </FormGroup>









                <FormGroup>
                  <Label>Recepit Date</Label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <DatePicker
                      selected={
                        selectedOrder.recepitDate &&
                          selectedOrder.recepitDate !== "1753-01-01T00:00:00.000+00:00"
                          ? new Date(selectedOrder.recepitDate)
                          : null
                      }
                      onChange={(date) => onChangeRecepitDate(date)}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="MM/DD/YYYY"
                      className="form-control"
                      isClearable
                    />
                  </div>
                </FormGroup>

              </div>
            </div>










            <div id="lines" className="mt-3 border rounded">
              {/* Header Section */}
              <div className="d-flex justify-content-between align-items-center px-3 py-2 border-b bg-gray-100">
                <div className="d-flex align-items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">Lines</h3>
                  <Button color="primary" size="sm" onClick={handleAddLineRow}>
                    +
                  </Button>
                </div>
              </div>

              {/* Table Body */}
              <div className="overflow-x-auto">
                <Table responsive bordered className="min-w-[1600px] w-full text-center mb-0">
                  <thead>
                    <tr style={{ backgroundColor: "#CCD6DB", color: "black" }}>
                      <th style={{ width: 150 }}>Sr No</th>
                      <th style={{ width: 150 }}>Purchase Order</th>
                      <th style={{ width: 150 }}>Order No</th>
                      <th style={{ width: 150 }}>Product</th>
                      <th style={{ width: 150 }}>Description 1</th>
                      <th style={{ width: 150 }}>Description</th>
                      <th style={{ width: 150 }}>Unit</th>
                      <th style={{ width: 150 }}>Quantity</th>
                      <th style={{ width: 150 }}>Gross Price</th>
                      <th style={{ width: 150 }}>Discount/Charge 1</th>
                      <th style={{ width: 150 }}>Discount/Charge 2</th>
                      <th style={{ width: 150 }}>Discount/Charge 3</th>
                      <th style={{ width: 150 }}>Net Price</th>
                      <th style={{ width: 150 }}>Production</th>
                      <th style={{ width: 150 }}>Line Amount</th>
                      <th style={{ width: 150 }}>Tax</th>
                      <th style={{ width: 150 }}>Tax 2</th>
                      <th style={{ width: 150 }}>Tax Amount</th>
                      <th style={{ width: 150 }}>Line Amount + Tax</th>
                      <th style={{ width: 150 }}>Starting Serial No</th>
                      <th style={{ width: 150 }}>Ending Serial No</th>
                      <th style={{ width: 150 }}>Weight</th>
                      <th style={{ width: 150 }}>Description 2</th>
                      <th style={{ width: 150 }}>Contact No</th>
                      <th style={{ width: 150 }}>Description 3</th>
                      <th style={{ width: 150 }}>Update Flag</th>
                      <th style={{ width: 150 }}>Contract Line</th>
                      <th style={{ width: 150 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {linesTableData.length > 0 ? (
                      linesTableData.map((row, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>

                          {/* Dropdown Columns */}
                          {["purchaseOrder", "orderNo", "product", "unit"].map((key) => (
                            <td key={key}>
                              <Select
                                options={commonData?.typeList}
                                value={commonData?.typeList.find((opt) => opt.value === row[key]) || null}
                                onChange={(selected) =>
                                  handleLineDropdownChange(index, key, selected ? selected.value : "")
                                }
                                isClearable
                                placeholder="Select"
                                menuPortalTarget={document.body} // Mount to body
                                styles={{
                                  control: (base) => ({
                                    ...base,
                                    minHeight: 34,
                                    fontSize: 14,
                                    zIndex: 2,
                                    boxShadow: "none",
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
                          ))}

                          {/* Input Fields */}
                          {[
                            "description1", "description", "quantity", "grossPrice", "discountCharge1",
                            "discountCharge2", "discountCharge3", "netPrice", "production", "lineAmount",
                            "tax", "tax2", "taxAmount", "lineAmountWithTax", "startingSerialNo",
                            "endingSerialNo", "weight", "description2", "contactNo", "description3",
                            "updateFlag", "contractLine"
                          ].map((key) => (
                            <td key={key}>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={row[key] || ""}
                                onChange={(e) => handleLineInputChange(index, key, e.target.value)}
                                style={{ width: "150px" }}
                              />
                            </td>
                          ))}

                          {/* Actions */}
                          <td>
                            <Button color="danger" size="sm" onClick={() => handleRemoveLineRow(index)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={28} className="text-center text-muted">
                          No data available. Click "+" to add a row.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>




            <div className="section-header mt-3">
              <h3>Capacity</h3>


              <div className="section-body">
                <FormGroup className="form-item text-input" style={{ width: "300px", flexShrink: 0 }}>

                  <Label for="resec">Gross Weight</Label>
                  <Input
                    type="text"
                    id="grossw"
                    name="grossw"
                    value={selectedOrder?.grossw || ""}
                    onChange={handleChangeGrossWeight}
                    placeholder="Enter Weight"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input" style={{ width: "300px", flexShrink: 0 }}>

                  <Label for="resec">Weight Unit</Label>
                  <Input
                    type="text"
                    id="weightu"
                    name="weightu"
                    value={selectedOrder?.weightu || ""}
                    onChange={handleChangeWeightUnit}
                    placeholder="Enter Unit"
                  />
                </FormGroup>
              </div>
            </div>


            <div className="section-header mt-3">
              <h3>Transportation</h3>
              <div className="section-body">
                <FormGroup className="form-item text-input" style={{ width: "300px", flexShrink: 0 }}>
                  <Label for="lati">Latitude</Label>
                  <Input
                    type="text"
                    id="lati"
                    name="lati"
                    value={selectedOrder?.lati || ""}
                    onChange={handleChangeLatitude}
                    placeholder="Enter Latitude"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input" style={{ width: "300px", flexShrink: 0 }}>
                  <Label for="long">Longitude</Label>
                  <Input
                    type="text"
                    id="long"
                    name="long"
                    value={selectedOrder?.long || ""}
                    onChange={handleChangeLongitude}
                    placeholder="Enter Longitude"
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
