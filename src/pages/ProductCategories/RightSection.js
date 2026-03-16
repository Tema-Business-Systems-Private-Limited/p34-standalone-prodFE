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
import { components } from 'react-select';
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
  const [isMainCategoryChecked, setIsMainCategoryChecked] = useState(false);






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

  const handleMainCategoryToggle = (e) => {
    setIsMainCategoryChecked(e.target.checked);
  };

  const handleProductCategoryChange = (e) => {
    const { name, checked } = e.target;
    setProductCategoryOptions(prev => ({
      ...prev,
      [name]: checked,
    }));
  };


  const [miscellaneous, setMiscellaneous] = useState({
    abccls: '',
    cfglin: '',
    itmsfttyp: '',
  });

  const [productCategoryOptions, setProductCategoryOptions] = useState({
    service: false,
    phantom: false,
    tools: false,
    generic: false,
    maintenance: false,
  });







  const onChangePackingExtras = (e) => {
    const { name, value } = e.target;
    setSelectedOrder({
      ...selectedOrder,
      [name]: value,
    });
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



  const onChangeDescriptionFields = (e) => {
    const { name, value } = e.target;
    setSelectedOrder({
      ...selectedOrder,
      [name]: value,
    });
  };



  const [isMainFlowChecked, setIsMainFlowChecked] = useState(false);

  const [flowTypeOptions, setFlowTypeOptions] = useState({
    bought: false,
    sold: false,
    manufactured: false,
    deliverable: false,
    subcontracted: false,
  });


  const handleMainFlowToggle = (e) => {
    setIsMainFlowChecked(e.target.checked);
  };

  const handleFlowTypeChange = (e) => {
    const { name, checked } = e.target;
    setFlowTypeOptions(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleMiscChange = (e) => {
    const { name, value } = e.target;
    setMiscellaneous(prev => ({
      ...prev,
      [name]: value,
    }));
  };



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
                    { id: "description", label: "Description" },




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
            <div id="home" className="section-header mt-3 mb-3">
              <h3 >Home</h3>

              <div className="section-body">

                <FormGroup className="form-item text-input">
                  <Label htmlFor="tclcod" className="text-sm font-bold text-gray-900 mb-1 block">
                    Category <span className="text-red-600">*</span>
                  </Label>

                  <Select
                    id="tclcod"
                    name="tclcod"
                    options={[
                      
                      { value: "CAT1", label: "Category 1" },
                      { value: "CAT2", label: "Category 2" },
                      { value: "CAT3", label: "Category 3" },
                    ]}
                    value={
                      [
                        
                        { value: "CAT1", label: "Category 1" },
                        { value: "CAT2", label: "Category 2" },
                        { value: "CAT3", label: "Category 3" },
                      ].find(opt => opt.value === selectedOrder.tclcod) || null
                    }
                    onChange={(selected) =>
                      onChangePackingExtras({
                        target: { name: "tclcod", value: selected?.value || "" },
                      })
                    }
                    placeholder="Select"
                    isClearable
                    className="text-sm"
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: "36px",
                        height: "36px",
                        width: "250px",     // 👈 Keep consistent width
                        fontSize: "0.875rem",
                        boxShadow: "none",
                        borderColor: state.isFocused ? "#d1d5db" : provided.borderColor,
                        "&:hover": {
                          borderColor: "#a1a1aa",
                        },
                      }),
                    }}
                  />
                </FormGroup>

                <FormGroup className="form-item text-input">
                  <Label htmlFor="tclaxx" className="text-sm font-bold text-gray-900 mb-1 block">
                    Description
                  </Label>
                  <Input
                    type="text"
                    name="tclaxx"
                    id="tclaxx"
                    value={selectedOrder.tclaxx || ""}
                    onChange={onChangePackingExtras}
                    className="text-sm"
                    style={{
                      height: "36px",       // 👈 Match Select height
                      width: "250px",       // 👈 Match Select width
                      fontSize: "0.875rem", // 👈 Match Select font size
                    }}
                  />
                </FormGroup>



                <FormGroup
                  check
                  className="form-item checkbox-input mt-4"
                  style={{ minWidth: "120px", marginLeft: "-20" }} // Removed left margin
                >
                  <Label
                    check
                    className="flex items-center gap-2"
                    style={{ position: "relative", top: "0px" }}
                  >
                    <Input
                      type="checkbox"
                      name="xtmsspical"
                      checked={selectedOrder.xtmsspical || false}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          xtmsspical: e.target.checked,
                        })
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium ml-2">TMS Category</span>
                  </Label>
                </FormGroup>



                <FormGroup className="form-item text-input">
                  <Label htmlFor="xskills" className="text-sm font-bold text-gray-900 mb-1 block">
                    Skill No
                  </Label>

                  <Select
                    id="xskills"
                    name="xskills"
                    options={[
                      
                      { value: "SKILL1", label: "Skill 1" },
                      { value: "SKILL2", label: "Skill 2" },
                      { value: "SKILL3", label: "Skill 3" },
                    ]}
                    value={
                      [
                        
                        { value: "SKILL1", label: "Skill 1" },
                        { value: "SKILL2", label: "Skill 2" },
                        { value: "SKILL3", label: "Skill 3" },
                      ].find(opt => opt.value === selectedOrder.xskills) || null
                    }
                    onChange={(selected) =>
                      onChangePackingExtras({
                        target: { name: "xskills", value: selected?.value || "" },
                      })
                    }
                    placeholder="Select"
                    isClearable
                    className="text-sm"
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: "36px",
                        height: "36px",
                        width: "250px",
                        fontSize: "0.875rem",
                        boxShadow: "none",
                        borderColor: state.isFocused ? "#d1d5db" : provided.borderColor,
                        "&:hover": {
                          borderColor: "#a1a1aa",
                        },
                      }),
                    }}
                  />
                </FormGroup>

              </div>
            </div>
            <div id="description" className="section-header">
              <h2 className="font-bold text-xl text-gray-900">
                Description (Characteristics)
              </h2>

              {/* <h3 className="text-sm font-normal text-gray-200">
                Characteristics
              </h3> */}
            </div>
            <div className="section-body">


              {/* Fields */}
              <FormGroup className="form-item text-input">
                <Label htmlFor="tclshoaxx" className="text-sm font-bold text-gray-900 mb-1 block">
                  Short Description
                </Label>
                <Input
                  type="text"
                  name="tclshoaxx"
                  id="tclshoaxx"
                  value={selectedOrder.tclshoaxx || ""}
                  onChange={onChangeDescriptionFields}
                  className="text-sm"
                  style={{
                    height: "36px",       // Match Select height
                    width: "350px",       // Match Select width
                    fontSize: "0.875rem", // Match Select font size
                    borderColor: "#d1d5db",
                  }}
                />
              </FormGroup>

              <FormGroup className="form-item text-input">
                <Label htmlFor="itmrefcou" className="text-sm font-bold text-gray-900 mb-1 block">
                  Product Sequence
                </Label>

                <Select
                  id="itmrefcou"
                  name="itmrefcou"
                  options={[
                    { value: "SEQ1", label: "Sequence 1" },
                    { value: "SEQ2", label: "Sequence 2" },
                    { value: "SEQ3", label: "Sequence 3" },
                  ]}
                  value={[
                    { value: "SEQ1", label: "Sequence 1" },
                    { value: "SEQ2", label: "Sequence 2" },
                    { value: "SEQ3", label: "Sequence 3" },
                  ].find(opt => opt.value === selectedOrder.itmrefcou) || null}
                  onChange={(selected) =>
                    onChangeDescriptionFields({
                      target: { name: "itmrefcou", value: selected?.value || "" },
                    })
                  }
                  placeholder="Select"
                  isClearable
                  className="text-sm"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: "36px",
                      height: "36px",
                      width: "350px",
                      fontSize: "0.875rem",
                      boxShadow: "none",
                      borderColor: state.isFocused ? "#d1d5db" : provided.borderColor,
                      "&:hover": {
                        borderColor: "#a1a1aa",
                      },
                    }),
                  }}
                />
              </FormGroup>


              <FormGroup className="form-item text-input">
                <Label htmlFor="itmcremod" className="text-sm font-bold text-gray-900 mb-1 block">
                  Creation Method
                </Label>

                <Select
                  id="itmcremod"
                  name="itmcremod"
                  options={[

                    { value: "DIRECT", label: "Direct" },
                    { value: "VALIDATION", label: "With Validation" },
                  ]}
                  value={
                    [
                      { value: "", label: "Select" },
                      { value: "DIRECT", label: "Direct" },
                      { value: "VALIDATION", label: "With Validation" },
                    ].find(opt => opt.value === selectedOrder.itmcremod) || null
                  }
                  onChange={(selected) =>
                    onChangeDescriptionFields({
                      target: { name: "itmcremod", value: selected?.value || "" },
                    })
                  }
                  placeholder="Select"
                  isClearable
                  className="text-sm"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: "36px",
                      height: "36px",
                      width: "350px",
                      fontSize: "0.875rem",
                      boxShadow: "none",
                      borderColor: state.isFocused ? "#d1d5db" : provided.borderColor,
                      "&:hover": {
                        borderColor: "#a1a1aa",
                      },
                    }),
                  }}
                />
              </FormGroup>

            </div>



            <div id="manager">
              {/* Section Header */}
              <div className="section-header mt-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">
                  Manager
                </h3>
              </div>

              {/* Section Body */}
              <div className="section-body">
                <FormGroup className="form-item text-input min-w-[240px] flex-1">
                  <Label htmlFor="plaacs" className="text-sm font-bold text-gray-900 mb-1 block">
                    Access Code
                  </Label>
                  <Select
                    id="plaacs"
                    name="plaacs"
                    options={[

                      { value: 'ACC1', label: 'Access 1' },
                      { value: 'ACC2', label: 'Access 2' },
                    ]}
                    value={[
                      { value: '', label: 'Select' },
                      { value: 'ACC1', label: 'Access 1' },
                      { value: 'ACC2', label: 'Access 2' },
                    ].find(opt => opt.value === selectedOrder.plaacs) || { value: '', label: 'Select' }}
                    onChange={(selected) =>
                      onChangeDescriptionFields({
                        target: { name: 'plaacs', value: selected?.value || '' },
                      })
                    }
                    placeholder="Select"
                    isClearable
                    className="text-sm"
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: '36px',
                        height: '36px',
                        width: '100%',
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


                <FormGroup className="form-item text-input min-w-[240px] flex-1">
                  <Label htmlFor="buy" className="text-sm font-bold text-gray-900 mb-1 block">
                    Buyer
                  </Label>
                  <Select
                    id="buy"
                    name="buy"
                    options={[

                      { value: 'BUYER1', label: 'Buyer 1' },
                      { value: 'BUYER2', label: 'Buyer 2' },
                    ]}
                    value={[
                      { value: '', label: 'Select' },
                      { value: 'BUYER1', label: 'Buyer 1' },
                      { value: 'BUYER2', label: 'Buyer 2' },
                    ].find(opt => opt.value === selectedOrder.buy) || { value: '', label: 'Select' }}
                    onChange={(selected) =>
                      onChangeDescriptionFields({
                        target: { name: 'buy', value: selected?.value || '' },
                      })
                    }
                    placeholder="Select"
                    isClearable
                    className="text-sm"
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: '36px',
                        height: '36px',
                        width: '100%',
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


                <FormGroup className="form-item text-input min-w-[240px] flex-1">
                  <Label htmlFor="planner" className="text-sm font-bold text-gray-900 mb-1 block">
                    Planner
                  </Label>
                  <Select
                    id="planner"
                    name="planner"
                    options={[

                      { value: 'PLN1', label: 'Planner 1' },
                      { value: 'PLN2', label: 'Planner 2' },
                    ]}
                    value={[
                      { value: '', label: 'Select' },
                      { value: 'PLN1', label: 'Planner 1' },
                      { value: 'PLN2', label: 'Planner 2' },
                    ].find(opt => opt.value === selectedOrder.planner) || { value: '', label: 'Select' }}
                    onChange={(selected) =>
                      onChangeDescriptionFields({
                        target: { name: 'planner', value: selected?.value || '' },
                      })
                    }
                    placeholder="Select"
                    isClearable
                    className="text-sm"
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: '36px',
                        height: '36px',
                        width: '100%',
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


            <div id="product-category-checkboxes" className="mt-3">
              {/* Section Header */}
              <div className="section-header">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isMainCategoryChecked}
                    onChange={handleMainCategoryToggle}
                    className="w-5 h-5"
                  />
                  <label className="text-lg font-semibold">Product Category</label>
                </div>
              </div>

              {/* Section Body */}
              <div className="section-body">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pl-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="service"
                      checked={productCategoryOptions.service}
                      onChange={handleProductCategoryChange}
                      disabled={isMainCategoryChecked}
                      className="w-5 h-5"
                    />
                    Service
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="phantom"
                      checked={productCategoryOptions.phantom}
                      onChange={handleProductCategoryChange}
                      disabled={isMainCategoryChecked}
                      className="w-5 h-5"
                    />
                    Phantom
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="tools"
                      checked={productCategoryOptions.tools}
                      onChange={handleProductCategoryChange}
                      disabled={isMainCategoryChecked}
                      className="w-5 h-5"
                    />
                    Tools
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="generic"
                      checked={productCategoryOptions.generic}
                      onChange={handleProductCategoryChange}
                      disabled={isMainCategoryChecked}
                      className="w-5 h-5"
                    />
                    Generic
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="maintenance"
                      checked={productCategoryOptions.maintenance}
                      onChange={handleProductCategoryChange}
                      disabled={isMainCategoryChecked}
                      className="w-5 h-5"
                    />
                    Maintenance
                  </label>
                </div>
              </div>
            </div>



            <div id="flow-types-checkboxes" className="mt-3">
              <div className="section-header">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isMainFlowChecked}
                    onChange={handleMainFlowToggle}
                    className="w-5 h-5"
                  />
                  <label className="text-lg font-semibold">Flow Types</label>
                </div>
              </div>

              <div className="section-body">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pl-1">
                  {[
                    { name: "bought", label: "Bought" },
                    { name: "sold", label: "Sold" },
                    { name: "manufactured", label: "Manufactured" },
                    { name: "deliverable", label: "Deliverable" },
                    { name: "subcontracted", label: "Subcontracted" },
                  ].map((item) => (
                    <label key={item.name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={item.name}
                        checked={flowTypeOptions[item.name]}
                        onChange={handleFlowTypeChange}
                        disabled={isMainFlowChecked}
                        className="w-5 h-5"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>


            <div id="miscellaneous-section" className="mt-3">
              <div className="section-header">
                <label className="text-lg font-semibold">Miscellaneous</label>
              </div>

              <div className="section-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {/* ABC ABC Class */}
                  <div className="form-item text-input min-w-[240px] flex-1">
                    <label htmlFor="abccls" className="block text-sm font-bold text-gray-900 mb-1">
                      ABC ABC class
                    </label>
                    <Select
                      id="abccls"
                      name="abccls"
                      options={[
                        { value: 'A', label: 'A' },
                        { value: 'B', label: 'B' },
                        { value: 'C', label: 'C' },
                      ]}
                      value={[
                        { value: 'A', label: 'A' },
                        { value: 'B', label: 'B' },
                        { value: 'C', label: 'C' },
                      ].find(opt => opt.value === miscellaneous.abccls) || { value: '', label: '-- Select ABC class --' }}
                      onChange={(selected) =>
                        handleMiscChange({
                          target: { name: 'abccls', value: selected?.value || '' },
                        })
                      }
                      placeholder="Select ABC class"
                      isClearable
                      className="text-sm"
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      styles={{
                        ...customSelectStyles,
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />

                  </div>



                  <div className="form-item text-input min-w-[240px] flex-1">
                    <label htmlFor="cfglin" className="block text-sm font-bold text-gray-900 mb-1">
                      Product line
                    </label>
                    <Select
                      id="cfglin"
                      name="cfglin"
                      options={[

                        { value: 'Line1', label: 'Line 1' },
                        { value: 'Line2', label: 'Line 2' },
                        { value: 'Line3', label: 'Line 3' },
                      ]}
                      value={[

                        { value: 'Line1', label: 'Line 1' },
                        { value: 'Line2', label: 'Line 2' },
                        { value: 'Line3', label: 'Line 3' },
                      ].find(opt => opt.value === miscellaneous.cfglin) || { value: '', label: '-- Select Product Line --' }}
                      onChange={(selected) =>
                        handleMiscChange({
                          target: { name: 'cfglin', value: selected?.value || '' },
                        })
                      }
                      placeholder="Select Product Line"
                      isClearable
                      className="text-sm"
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      styles={{
                        ...customSelectStyles,
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  </div>


                  <div className="form-item text-input min-w-[240px] flex-1">
                    <label htmlFor="itmsfttyp" className="block text-sm font-bold text-gray-900 mb-1">
                      SAF-T product type
                    </label>
                    <Select
                      id="itmsfttyp"
                      name="itmsfttyp"
                      options={[

                        { value: 'FinishedGoods', label: 'Finished Goods' },
                        { value: 'RawMaterial', label: 'Raw Material' },
                        { value: 'Service', label: 'Service' },
                      ]}
                      value={[

                        { value: 'FinishedGoods', label: 'Finished Goods' },
                        { value: 'RawMaterial', label: 'Raw Material' },
                        { value: 'Service', label: 'Service' },
                      ].find(opt => opt.value === miscellaneous.itmsfttyp) || { value: '', label: '-- Select SAF-T Type --' }}
                      onChange={(selected) =>
                        handleMiscChange({
                          target: { name: 'itmsfttyp', value: selected?.value || '' },
                        })
                      }
                      placeholder="Select SAF-T Type"
                      isClearable
                      className="text-sm"
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      styles={{
                        ...customSelectStyles,
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  </div>

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
