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
      tclcod: value,
    }));
  };


  commonData.productList = [
    { value: "P001", label: "Product 1", description: "Desc 1" },
    { value: "P002", label: "Product 2", description: "Desc 2" },
    { value: "P003", label: "Product 3", description: "Desc 3" },
  ];


  const handleProductStatusChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      itmsta: value,
    }));


    if (value) {
      setError((prev) => ({
        ...prev,
        itmsta: "",
      }));
    }
  };

  const handleProductChange = (itmref, description = "") => {
    setSelectedOrder((prev) => ({
      ...prev,
      itmref,
      des1axx: description,
    }));

    setError((prev) => ({
      ...prev,
      itmref: "",
      des1axx: "",
    }));
  };

  const handleDescriptionChange = (desc) => {
    setSelectedOrder((prev) => ({
      ...prev,
      des1axx: desc,
    }));

    if (desc.trim()) {
      setError((prev) => ({
        ...prev,
        des1axx: "",
      }));
    }
  };


  const handleStockUnitChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      stu: value,
    }));

    if (value.trim()) {
      setError((prev) => ({
        ...prev,
        stu: "",
      }));
    }
  };
  const handleWeightUnitChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      weu: value,
    }));

    if (value.trim()) {
      setError((prev) => ({
        ...prev,
        weu: "",
      }));
    }
  };

  const handleWeightQuantityChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      itmwei: value,
    }));

    if (value.trim()) {
      setError((prev) => ({
        ...prev,
        itmwei: "",
      }));
    }
  };


  const handleVolumeUnitChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      vou: value,
    }));
  };

  const handleVolumeChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      itmvou: value,
    }));
  };

  const handlePurchaseUnitChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      puu: value,
    }));
  };

  const handlePurStkConvChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      puustk: value,
    }));
  };

  const handleSalesUnitChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      sau: value,
    }));
  };

  const handleSalStkConvChange = (value) => {
    setSelectedOrder((prev) => ({
      ...prev,
      salstk: value,
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
                    { id: "management", label: "Management" },
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
                  Category{" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>


                <Select
                  options={commonData?.supplierList || []}
                  value={
                    (commonData?.supplierList || []).find(
                      (option) => option.value === selectedOrder.tclcod
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
                />


                {error.site && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    {error.site}
                  </div>
                )}
              </FormGroup>
              <FormGroup className="form-item text-input">
                <Label for="productStatus">
                  Product Status <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </Label>

                <Select
                  options={[
                    { value: "ACTIVE", label: "Active" },
                    { value: "IN_DEV", label: "In Development" },
                    { value: "SHORTAGE", label: "On Shortage" },
                    { value: "NOT_RENEWED", label: "Not Renewed" },
                    { value: "OBSOLETE", label: "Obsolete" },
                    { value: "NOT_USABLE", label: "Not Usable" },
                  ]}
                  value={
                    [
                      { value: "ACTIVE", label: "Active" },
                      { value: "IN_DEV", label: "In Development" },
                      { value: "SHORTAGE", label: "On Shortage" },
                      { value: "NOT_RENEWED", label: "Not Renewed" },
                      { value: "OBSOLETE", label: "Obsolete" },
                      { value: "NOT_USABLE", label: "Not Usable" },
                    ].find((option) => option.value === selectedOrder.itmsta) || null
                  }
                  onChange={(selectedOption) =>
                    handleProductStatusChange(selectedOption ? selectedOption.value : "")
                  }
                  placeholder="Select"
                  isClearable
                />

                {error.itmsta && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.itmsta}
                  </div>
                )}
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label for="product">
                  Product <span className="text-danger">*</span>
                </Label>

                <Select
                  options={commonData?.productList || []}
                  value={
                    (commonData?.productList || []).find(
                      (option) => option.value === selectedOrder.itmref
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    if (selectedOption) {

                      handleProductChange(selectedOption.value, selectedOption.description);
                    } else {

                      handleProductChange("", "");
                    }
                  }}
                  placeholder="Select a product"
                  isClearable
                />

              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label for="description">
                  Description <span className="text-danger">*</span>
                </Label>

                <Input
                  type="text"
                  value={selectedOrder.des1axx}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  placeholder="Enter or edit product description"
                  required
                />

                {error.des1axx && (
                  <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error.des1axx}
                  </div>
                )}
              </FormGroup>

            </div>



            <div id="management" className="mt-3">
              {/* Section Header */}
              <div className="section-header">
                <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">
                  Management
                </h3>
                <h3 className="text-md font-semibold text-gray-800 mt-0 mb-2">
                  Unit of Measure
                </h3>
              </div>

              <div className="section-body">
                <FormGroup className="form-item text-input mt-2">
                  <Label className="fw-bold">
                    Stock Unit <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="select"
                    value={selectedOrder.stu}
                    onChange={(e) => handleStockUnitChange(e.target.value)}
                    required
                    className="form-select block w-48 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                  >
                    <option value="">Select Stock Unit</option>
                    {(commonData?.stockUnitList || []).map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </Input>
                  {error.stu && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {error.stu}
                    </div>
                  )}
                </FormGroup>
              

              {/* Line 1 */}
              <div className="d-flex gap-4 mt-2 flex-wrap">
                <FormGroup className="form-item text-input">
                  <Label className="fw-bold">Weight Unit</Label>
                  <Input
                    type="select"
                    value={selectedOrder.weu}
                    onChange={(e) => handleWeightUnitChange(e.target.value)}
                    required
                    className="form-select block w-full border border-gray-400 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                  >
                    <option value="">Select Weight Unit</option>
                    {(commonData?.weightUnitList || []).map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </Input>
                  {error.weu && (
                    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                      {error.weu}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>stk.weight</Label>
                  <Input
                    type="text"
                    value={selectedOrder.itmwei}
                    onChange={(e) => handleWeightQuantityChange(e.target.value)}
                    placeholder="Enter quantity"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Volume Unit</Label>
                  <Input
                    type="select"
                    value={selectedOrder.vou}
                    onChange={(e) => handleVolumeUnitChange(e.target.value)}
                  >
                    <option value="">Select Volume Unit</option>
                    {(commonData?.volumeUnitList || []).map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>stk.volume</Label>
                  <Input
                    type="text"
                    value={selectedOrder.itmvou}
                    onChange={(e) => handleVolumeChange(e.target.value)}
                    placeholder="Enter volume"
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>Purchase Unit</Label>
                  <Input
                    type="select"
                    value={selectedOrder.puu}
                    onChange={(e) => handlePurchaseUnitChange(e.target.value)}
                  >
                    <option value="">Select Purchase Unit</option>
                    {(commonData?.purchaseUnitList || []).map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>PUR-STK conv.</Label>
                  <Input
                    type="text"
                    value={selectedOrder.puustk}
                    onChange={(e) => handlePurStkConvChange(e.target.value)}
                  />
                </FormGroup>
              </div>

              {/* Line 2 */}
              <div className="d-flex gap-4 mt-2 flex-wrap">
                <FormGroup className="form-item text-input">
                  <Label>Sales Unit</Label>
                  <Input
                    type="select"
                    value={selectedOrder.sau}
                    onChange={(e) => handleSalesUnitChange(e.target.value)}
                  >
                    <option value="">Select Sales Unit</option>
                    {(commonData?.salesUnitList || []).map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label>SAL-STK conv.</Label>
                  <Input
                    type="text"
                    value={selectedOrder.salstk}
                    onChange={(e) => handleSalStkConvChange(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>
          </div>




          </Form>

      ) : (
      <p className="text-center">No site selected</p>
        )}


    </CardBody>


      {/* Delete Confirmation Modal */ }
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
