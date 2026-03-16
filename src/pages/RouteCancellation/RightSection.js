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
import { toast } from 'react-toastify';
import siteClass from "./css/siteClass.css";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import 'react-toastify/dist/ReactToastify.css';


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




  const [dates, setDates] = useState({
    xdatref: null,
    xdateto: null,
  });
const [searchValue, setSearchValue] = useState(""); 
  const handleDateChange = (key, value) => {

    if (key === "xdatref" && dates.xdateto && value > dates.xdateto) {
      toast.error("From Date cannot be later than To Date.");
      return;
    }


    if (key === "xdateto" && dates.xdatref && value < dates.xdatref) {
      toast.error("To Date cannot be earlier than From Date.");
      return;
    }

    setDates(prev => ({ ...prev, [key]: value }));
  };


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

  const handleInfoRowChange = (index, field, value) => {
    setInfoRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  };

  const isLastInfoRowFilled = () => {
    const last = infoRows[infoRows.length - 1];
    return (
      last.routing.trim() &&
      last.routeDate.trim() &&
      last.vehicleCode.trim() &&
      last.trip.trim() &&
      last.loaderId.trim() &&
      last.lvsNumber.trim()
    );
  };

  const handleAddInfoRow = () => {
    if (!isLastInfoRowFilled()) return;
    setInfoRows((prev) => [
      ...prev,
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
  };

  const handleDeleteInfoRow = (index) => {
    if (index === 0 && infoRows.length === 1) return;
    if (index === 0 && infoRows.length > 1) {
      // Prevent deleting first row unless another exists
      setInfoRows((prev) => prev.slice(1));
    } else {
      setInfoRows((prev) => prev.filter((_, i) => i !== index));
    }
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




















































  const handleSearch = () => {
    if (!searchValue.trim()) {
      
      return;
    }
    console.log("Searching for:", searchValue);
    // 🔹 Add your API call or filter logic here
  };




  const handleLvsChange = (selectedOption) => {
    setSelectedOrder((prev) => ({
      ...prev,
      xhlvsnum: selectedOption ? selectedOption.value : "",
    }));
  };
  const [selectAll, setSelectAll] = useState(false);




  // Placeholder handlers (still empty)

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

        {/* {selectedOrder ? ( */}
        {
          <Form>
            <div className="sticky top-0 z-10 bg-white shadow-sm">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-6 border-b px-4 pt-2 text-base font-medium whitespace-nowrap min-w-max">
                  {[
                    { id: "home", label: "Home" },
                    { id: "selection", label: "Selection" },
                    { id: "information", label: "Information" },



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
              <div className="flex flex-wrap items-end gap-6">
                {/* Site field */}
                <div className="flex flex-col w-[350px]">
                  <Label htmlFor="site" className="text-sm font-medium text-gray-700 mb-1">
                    Site <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    options={commonData?.supplierList || []}
                    value={
                      (commonData?.supplierList || []).find(
                        (option) => option.value === selectedOrder?.xfcy
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
                        fontSize: '0.875rem',
                        width: '350px',
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
                </div>

                {/* From Date */}
                <div className="flex flex-col w-[200px]">
                  <Label htmlFor="fromDate" className="text-sm font-medium text-gray-700 mb-1">
                    From Date
                  </Label>
                  <DatePicker
                    selected={dates.xdatref}
                    onChange={(date) => handleDateChange("xdatref", date)}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="DD-MM-YYYY"
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
                    isClearable
                  />
                </div>

                {/* To Date */}
                <div className="flex flex-col w-[200px]">
                  <Label htmlFor="toDate" className="text-sm font-medium text-gray-700 mb-1">
                    To Date
                  </Label>
                  <DatePicker
                    selected={dates.xdateto}
                    onChange={(date) => handleDateChange("xdateto", date)}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="DD-MM-YYYY"
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
                    isClearable
                  />
                 
                </div>
                
             
               
              </div>
            </div>






            <div id="selection" className="section-header mt-3">
              <h3 className="text-lg font-semibold">Selections</h3>
            </div>

            <div className="section-body">

              <Label htmlFor="xhlvsnum" className="text-sm font-medium text-gray-700 mb-1 block">
                LVS Number
              </Label>


              <div className="flex items-center gap-4">

                <div className="min-w-[350px]">
                  <Select
                    id="xhlvsnum"
                    name="xhlvsnum"
                    options={[
                      { value: 'LVS-001', label: 'LVS-001' },
                      { value: 'LVS-002', label: 'LVS-002' },
                      { value: 'LVS-003', label: 'LVS-003' },
                    ]}
                    value={[
                      { value: 'LVS-001', label: 'LVS-001' },
                      { value: 'LVS-002', label: 'LVS-002' },
                      { value: 'LVS-003', label: 'LVS-003' },
                    ].find(opt => opt.value === selectedOrder?.xhlvsnum) || null}
                    onChange={handleLvsChange}
                    placeholder="Select LVS Number"
                    isClearable
                    className="text-sm"
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: '36px',
                        height: '36px',
                        fontSize: '0.875rem',
                        width: '350px',
                        boxShadow: 'none',
                        borderColor: state.isFocused ? '#d1d5db' : provided.borderColor,
                        '&:hover': {
                          borderColor: '#a1a1aa',
                        },
                      }),
                    }}
                  />

                  {error?.xhlvsnum && (
                    <div className="text-red-600 text-xs mt-1">{error.xhlvsnum}</div>
                  )}
                </div>


                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => setSelectAll(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {selectAll ? "Deselect All" : "Select All"}
                  </span>
                </div>
              </div>
            </div>






            <div id="information" className="mt-3">

              <div className="section-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-0">Information</h3>

                  <button
                    onClick={handleAddInfoRow}
                    className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={!isLastInfoRowFilled()}
                  >
                    +
                  </button>
                </div>
              </div>

              <table className="min-w-full table-auto border text-sm text-gray-700">
                <thead className="bg-gray-100 font-semibold">
                  <tr>
                    <th className="border px-3 py-2 text-center">Sr No</th>
                    <th className="border px-3 py-2 text-center">Select</th>
                    <th className="border px-3 py-2 text-center">Vehicle Routing</th>
                    <th className="border px-3 py-2 text-center">Route Date</th>
                    <th className="border px-3 py-2 text-center">Vehicle Code</th>
                    <th className="border px-3 py-2 text-center">Trip</th>
                    <th className="border px-3 py-2 text-center">Loader ID</th>
                    <th className="border px-3 py-2 text-center">VR Validated</th>
                    <th className="border px-3 py-2 text-center">LVS Number</th>
                    <th className="border px-3 py-2 text-center">LVS Validated</th>
                    <th className="border px-3 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {infoRows.map((row, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50 text-center">
                      <td className="border px-2 py-1">{index + 1}</td>
                      <td className="border px-2 py-1">
                        <input
                          type="text"
                          value={row.select || ""}
                          onChange={(e) => handleInfoRowChange(index, "select", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="text"
                          value={row.routing || ""}
                          onChange={(e) => handleInfoRowChange(index, "routing", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="date"
                          value={row.routeDate || ""}
                          onChange={(e) => handleInfoRowChange(index, "routeDate", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="text"
                          value={row.vehicleCode || ""}
                          onChange={(e) => handleInfoRowChange(index, "vehicleCode", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="text"
                          value={row.trip || ""}
                          onChange={(e) => handleInfoRowChange(index, "trip", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="text"
                          value={row.loaderId || ""}
                          onChange={(e) => handleInfoRowChange(index, "loaderId", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="text"
                          value={row.vrValidated || ""}
                          onChange={(e) => handleInfoRowChange(index, "vrValidated", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="text"
                          value={row.lvsNumber || ""}
                          onChange={(e) => handleInfoRowChange(index, "lvsNumber", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="text"
                          value={row.lvsValidated || ""}
                          onChange={(e) => handleInfoRowChange(index, "lvsValidated", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <button
                          onClick={() => handleDeleteInfoRow(index)}
                          className="text-red-600 text-sm disabled:opacity-50"
                          disabled={index === 0 && infoRows.length === 1}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>



























          </Form>



        }


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
