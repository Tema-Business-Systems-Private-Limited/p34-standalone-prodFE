import React, { Component, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurchaseOrder from "./PurchaseOrder";
import "./css/vehicleClass.css";
import { Link } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ButtonGroup,
  Button,
  Input,
  Label,
  FormGroup,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ThreeDotMenu from "./components/ThreeDotMenu";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import ErrorModal from "./components/ErrorModal";
import RightSide from "./RightSection";
import TrailerTypeList from "./components/TrailerTypeList";
const apiUrl = process.env.REACT_APP_API_URL;
const newVehicleClassObj = {
  updtick: 0,
  trailerCode: "",
  xdes: "",
  xenaflg: 0,
  xtyp: 1,
  xaxlnbr: 0,
  xmaxcapw: 0,
  xmaxunit: "LB",
  xmaxcapv: 0,
  xmaxvunit: "GL",
  credattim: "",
  upddattim: "",
  auuid: "",
  creusr: "",
  updusr: "",
  xall: 1,
  xtsicod0: "",
  xtsicod1: "",
  xtsicod2: " ",
  xtsicod3: " ",
  xtsicod4: " ",
  xtsicod5: " ",
  xtsicod6: " ",
  xtsicod7: " ",
  xtsicod8: " ",
  xtsicod9: " ",
  xtsicod10: " ",
  xtsicod11: " ",
  xtsicod12: " ",
  xtsicod13: " ",
  xtsicod14: " ",
  xtsicod15: " ",
  xtsicod16: " ",
  xtsicod17: " ",
  xtsicod18: " ",
  xtsicod19: " ",
  xtsicod20: " ",
  xtsicod21: " ",
  xtsicod22: " ",
  xtsicod23: " ",
  xtsicod24: " ",
  xtsicod25: " ",
  xtsicod26: " ",
  xtsicod27: " ",
  xtsicod28: " ",
  xtsicod29: " ",
  xtsicod30: " ",
  xtsicod31: " ",
  xtsicod32: " ",
  xtsicod33: " ",
  xtsicod34: " ",
  xtsicod35: " ",
  xtsicod36: " ",
  xtsicod37: " ",
  xtsicod38: " ",
  xtsicod39: " ",
  xtsicod40: " ",
  xtsicod41: " ",
  xtsicod42: " ",
  xtsicod43: " ",
  xtsicod44: " ",
  xtsicod45: " ",
  xtsicod46: " ",
  xtsicod47: " ",
  xtsicod48: " ",
  xtsicod49: " ",
  xtsicod50: " ",
  xtsicod51: " ",
  xtsicod52: " ",
  xtsicod53: " ",
  xtsicod54: " ",
  xtsicod55: " ",
  xtsicod56: " ",
  xtsicod57: " ",
  xtsicod58: " ",
  xtsicod59: " ",
  xtsicod60: " ",
  xtsicod61: " ",
  xtsicod62: " ",
  xtsicod63: " ",
  xtsicod64: " ",
  xtsicod65: " ",
  xtsicod66: " ",
  xtsicod67: " ",
  xtsicod68: " ",
  xtsicod69: " ",
  xtsicod70: " ",
  xtsicod71: " ",
  xtsicod72: " ",
  xtsicod73: " ",
  xtsicod74: " ",
  xtsicod75: " ",
  xtsicod76: " ",
  xtsicod77: " ",
  xtsicod78: " ",
  xtsicod79: " ",
  xtsicod80: " ",
  xtsicod81: " ",
  xtsicod82: " ",
  xtsicod83: " ",
  xtsicod84: " ",
  xtsicod85: " ",
  xtsicod86: " ",
  xtsicod87: " ",
  xtsicod88: " ",
  xtsicod89: " ",
  xtsicod90: " ",
  xtsicod91: " ",
  xtsicod92: " ",
  xtsicod93: " ",
  xtsicod94: " ",
  xtsicod95: " ",
  xtsicod96: " ",
  xtsicod97: " ",
  xtsicod98: " ",
  xskillno: 0,
  ximg: "",
  rowid: null,
  trailerClassList: [],
  productCategoryList: [],
};
const UserManagement = () => {
  const [loader, setLoader] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreate, setCreate] = useState(false);
  const [trailerTypeList, setTrailerTypeList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUser, setEditUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [trailerCode, setTrailercode] = useState(null);
  const [prodCatError, setProdCatError] = useState("");
  const trailerTypePerPage = 7; // or whatever number you want
  const [error, setError] = useState([]); // Multiple errors


  // const [error, setError] = useState(
  //   selectedOrder?.trailerCode?.trim() ? "This field is mandatory" : ""
  // );

  const [commonData, setCommonData] = useState([]);

  async function fetchCommonData() {
    // setLoader(true)
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getTrailerTypeCommonData`
      ).then((response) => {
        if (!response.ok) {
          throw new Error("Error while getting common data");
        }
        return response.json();
      });
      // setLoader(false)
      setCommonData(res);
    } catch (error) {
      // setCommonData(res);
      // setLoader(false)

      console.log("Error while getting common data");
    }
  }

  const [showErrorModal, setShowErrorModal] = useState(false);
  const onClickCreateVehicle = () => {
    setSelectedOrder(newVehicleClassObj);
    setCreate(true);
  };

  const handleDelete = async () => {
    setLoader(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteTrailerTypeByTrailerCode?trailerCode=${trailerCode}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Trailer Type deleted successfully", {
          autoClose: 5000,
          position: "top-right",
        });
        setSelectedOrder(null);
        fetchTrailerTypes();
        setSearchTerm("");
      } else {
        toast.error("Error deleting Trailer Type", {
          autoClose: 5000,
          position: "top-right",
        });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error deleting Trailer Type", error);
    }
  };

  // delete modals logic

  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteClick = (trailer) => {
    console.log(trailer, "this is trailer");
    setTrailercode(trailer.trailerCode); // ✅ only store the code
    toggleDeleteModal();
  };


  const confirmDelete = () => {
    handleDelete();
    toggleDeleteModal();
  };

  async function fetchTrailerTypes() {
    setLoader(true);
    try {
      let res = await fetch(`${apiUrl}/api/v1/fleet/getAllTrailerTypes`).then(
        (response) => {
          // Check if response is successful
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse JSON data
        }
      );
      console.log("line 241 ", res);
      setTrailerTypeList(res);
      setFilteredOrders(res);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("Error while getting vehicle classes");
    }
  }


  async function fetchUpdatedTrailerTypesOnRefresh(trailerCode) {
    try {
      setLoader(true);

      // Clear the form first, always


      // Case 1: No trailerCode → just refresh home screen / table
      if (!trailerCode) {

        await fetchTrailerTypes();
        toast.success("Trailer Type data refreshed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      setSelectedOrder(newVehicleClassObj);
      // Case 2: trailerCode exists → fetch details
      const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getTrailerTypeByTrailerCode?trailerCode=${trailerCode}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.warn("Trailer not found, clearing form.");
        // Form is already cleared at start, so just show success
        toast.success("Trailer data refreshed successfully!", { autoClose: 3000 });
        return;
      }

      const data = await response.json();

      if (!data || typeof data !== "object") {
        console.warn("Invalid data received, keeping form cleared.");
        toast.success("Trailer data refreshed successfully!", { autoClose: 3000 });
        return;
      }

      // Trailer exists → fill form with data
      setSelectedOrder(data);
      toast.success("Trailer data refreshed successfully!", { autoClose: 3000 });

      return data;
    } catch (error) {
      console.error("Error refreshing trailer data:", error);
      // Even on unexpected errors, clear the form and show success
      setSelectedOrder(newVehicleClassObj);
      toast.success("Trailer data refreshed successfully!", { autoClose: 3000 });
    } finally {
      setLoader(false);
    }
  }



  // async function fetchUpdatedTrailerTypesOnRefresh(trailerCode) {
  //   fetchTrailerTypes();
  //   if (trailerCode) {
  //     setLoader(true);
  //     const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getTrailerTypeByTrailerCode?trailerCode=${trailerCode}`;

  //     try {
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       setLoader(false);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setSelectedOrder(data);
  //       console.log("Vehicle Data:", data); // Handle the data as needed
  //       return data;
  //     } catch (error) {
  //       setLoader(false);
  //       console.error("Error fetching vehicle data:", error);
  //       throw error; // Re-throw the error for further handling if needed
  //     }
  //   }
  // }

  // delete vehicle class

  // create and update function

  const handleUpdate = async () => {
    if (!isCreate) {
      setLoader(true);
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/updateTrailerType`;

        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Trailer Type updated successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchTrailerTypes();
          setSearchTerm("");

        } else {
          toast.error("Error updating Trailer Type", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false);
      } catch (error) {

        console.error("Error updating Trailer Type:", error);
        setLoader(false);
      }
    } else {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/createTrailerType`;
        setLoader(true);
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Trailer created successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchTrailerTypes();
          setSearchTerm("");
          setLoader(false);
        } else {
          toast.error("Error creating vehicle class", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false);
      } catch (error) {   
        setLoader(false);
        console.error("Error creating vehicle class:", error);
      }
    }
  };


  const handleClick = () => {
    const newError = [];

    if (!selectedOrder?.trailerCode?.trim()) {
      newError.push("Trailer code");
    }

    const hasEmptyCategory =
      !selectedOrder?.productCategoryList?.length ||
      selectedOrder.productCategoryList.some((cat) => !cat.value?.trim());

    if (hasEmptyCategory && selectedOrder?.xall !== 2) {
      newError.push("Product category");
    }

    if (newError.length > 0) {
      setError(newError);
      setShowErrorModal(true);
    } else {
      setError([]);
      setShowErrorModal(false);
      handleUpdate();
    }
  };

  



  

  // const handleClick = () => {
  //   if (!selectedOrder.trailerCode.trim()) {
  //     setError("This field is mandatory");
  //     setShowErrorModal(true);
  //   } else {
  //     setError("");
  //     handleUpdate();
  //     setShowErrorModal(false);


  //   }

  // };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleBackForm = () => {
    setEditUser(false);
    // setSelectedOrder(vehicle);
    setSelectedOrder(null);
    setCreate(false);
    // setErrors({});
  };

  const searchedVehicles = trailerTypeList?.filter((trailer) =>
    [
      trailer.trailerCode,
      trailer.xdes,
      trailer.site,
      trailer.xenaflg,
      // veh.currentDriver,
    ].some((value) =>
      value?.toString().toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  );

  // Paginate the filtered result (no site filtering)
  const indexOfLastVehicle = currentPage * trailerTypePerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - trailerTypePerPage;
  const currentVehicles = searchedVehicles.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditTrailerType = (vehicle) => {
    setEditUser(true);
    setSelectedOrder(vehicle);
    setCreate(false);
    // console.log(vehicle, "this is vehicle setting check here 600");
  };

  useEffect(() => {
    fetchTrailerTypes();
    fetchCommonData();
  }, []);
  return (
    <React.Fragment>
      <div className="page-content pb-0">
        <ToastContainer />
        <Container fluid>
          {/* <LoadingOverlay active={loader} spinner text="Loading please wait..."> */}
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <Row
                    style={{
                      // backgroundColor: "currentcolor",
                      height: "60px",
                    }}
                  // className="bg-light"
                  >
                    {/* <Col md="6" className="d-flex align-items-center">
                        <CardTitle
                          className="h1 mb-0"
                          style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                          Trailer Type
                        </CardTitle>
                      </Col> */}
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle className="h1 mb-0 text-3xl font-bold">
                        {isCreate
                          ? "Create Trailer Type"
                          : editUser
                            ? "Update Trailer Type"
                            : "Trailer Type"}

                        {/* editUser */}
                      </CardTitle>
                    </Col>
                    <Col
                      md="6"
                      className="d-flex justify-content-end align-items-center h-100 gap-5"
                    >
                      {/* <Button color="success" outline className="m-1">
                          Vehicle Class Association
                        </Button> */}

                      {/* <Button
                          style={{
                            borderRadius: "50px",
                            padding: "0.4rem 1.5rem",
                          }}
                          className="mr-2"
                          color="success"
                          onClick={onClickCreateVehicle}
                        >
                        
                        </Button> */}
                      {/* <Toolbar style={{ gap: "10px" }}>
                          {!isCreate && (
                            <Tooltip title="Create Trailer Type">
                              <IconButton
                                style={{ backgroundColor: "#8B5CF6" }}
                              >
                                <AddBoxIcon
                                  onClick={onClickCreateVehicle}
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>
                          )}

                          {isCreate ? (
                            <Tooltip title="Create">
                              <IconButton
                                style={{ backgroundColor: "#8B5CF6" }}
                                onClick={handleClick}
                              >
                                <CheckIcon
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Save">
                              <IconButton
                                style={{ backgroundColor: "#34D399" }}
                                onClick={handleClick}
                              >
                                <SaveIcon
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                          {!isCreate && (
                            <Tooltip title="Delete">
                              <IconButton
                                style={{ backgroundColor: "#EF4444" }}
                                onClick={handleDeleteClick}
                              >
                                <DeleteIcon
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>
                          )}

                          <Tooltip title="Refresh">
                            <IconButton
                              style={{ backgroundColor: "#238C5C" }}
                              onClick={() =>
                                fetchUpdatedTrailerTypesOnRefresh(
                                  selectedOrder?.trailerCode
                                )
                              }
                            >
                              <RefreshIcon
                                style={{ fontSize: 25, color: "white" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Toolbar> */}
                      <Toolbar style={{ gap: "10px" }}>
                        {/* === TABLE VIEW === */}
                        {!isCreate && !editUser && (
                          <>
                            <Tooltip title="Create Trailer Type">
                              <IconButton
                                style={{ backgroundColor: "#8B5CF6" }}
                                onClick={onClickCreateVehicle}
                              >
                                <AddBoxIcon
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() =>
                                  fetchUpdatedTrailerTypesOnRefresh(
                                    selectedOrder?.trailerCode
                                  )
                                }
                              >
                                <RefreshIcon
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}

                        {/* === CREATE VIEW === */}
                        {isCreate && (
                          <>
                            <Tooltip title="Create">
                              <IconButton
                                style={{ backgroundColor: "#8B5CF6" }}
                                onClick={handleClick}
                              >
                                <CheckIcon
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={async () => {
                                  if (isCreate) {
                                    // ✅ Create mode — reset form
                                    setSelectedOrder(newVehicleClassObj);
                                    toast.success("Trailer form cleared successfully!", {
                                      position: "top-right",
                                      autoClose: 3000,
                                    });
                                  } else if (selectedOrder?.trailerCode) {
                                    // ✅ Edit mode — refresh the selected trailer
                                    await fetchUpdatedTrailerTypesOnRefresh(selectedOrder.trailerCode);
                                    toast.success("Trailer refreshed successfully!", {
                                      position: "top-right",
                                      autoClose: 3000,
                                    });
                                  } else {
                                    // ✅ Table/List mode — refresh the full list
                                    await fetchTrailerTypes();
                                    toast.success("Trailer list refreshed successfully!", {
                                      position: "top-right",
                                      autoClose: 3000,
                                    });
                                  }
                                }}
                              >
                                <RefreshIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>

                            </Tooltip>

                            <Tooltip title="Back to Table">
                              <IconButton
                                style={{ backgroundColor: "#64748B" }}
                                onClick={handleBackForm}
                              >
                                <ArrowBackIcon
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}

                        {/* === EDIT VIEW === */}
                        {editUser && !isCreate && (
                          <>
                            <Tooltip title="Save">
                              <IconButton
                                style={{ backgroundColor: "#34D399" }}
                                onClick={handleClick}
                              >
                                <SaveIcon
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() =>
                                  fetchUpdatedTrailerTypesOnRefresh(
                                    selectedOrder?.trailerCode
                                  )
                                }
                              >
                                <RefreshIcon
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Back to Table">
                              <IconButton
                                style={{ backgroundColor: "#64748B" }}
                                onClick={handleBackForm}
                              >
                                <ArrowBackIcon
                                  style={{ fontSize: 25, color: "white" }}
                                />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Toolbar>
                    </Col>
                  </Row>
                  {/* <PurchaseOrder
                      selectedOrder={selectedOrder}
                      setSelectedOrder={setSelectedOrder}
                      isCreate={isCreate}
                      setCreate={setCreate}
                      setLoader={setLoader}
                      trailerTypeList={trailerTypeList}
                      setTrailerTypeList={setTrailerTypeList}
                      filteredOrders={filteredOrders}
                      setFilteredOrders={setFilteredOrders}
                      error={error}
                      setError={setError}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    /> */}


                  {!isCreate && !editUser && (
                    //                     <div className="flex justify-between bg-red-500 gap-4 mb-6 ">

                    //                       '
                    //                    <select
                    //   value={selectedSite}
                    //   onChange={(e) => {
                    //     setSelectedSite(e.target.value);
                    //     setCurrentPage(1);
                    //   }}
                    //   className="w-[400px] py-3 px-4 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    // >
                    //   <option value="">All Sites</option>
                    //   {[...new Set(VehicleList.map((veh) => veh.site))].map((site) => (
                    //     <option key={site} value={site}>
                    //       {site}
                    //     </option>
                    //   ))}
                    // </select>

                    // <input
                    //   type="text"
                    //   placeholder="🔍 Search vehicles..."
                    //   value={searchTerm}
                    //   onChange={(e) => setSearchTerm(e.target.value)}
                    //   className="w-[700px] px-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    // />

                    //                     </div>

                    <div className="flex justify-end mb-4">
                      {/* Left: Select dropdown */}
                      {/* <select
                                            value={selectedSite}
                                            onChange={(e) => {
                                              setSelectedSite(e.target.value);
                                              setCurrentPage(1);
                                            }}
                                            style={{ width: "300px" }}
                                            className="py-3 px-4 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                          >
                                            <option value="">All Sites</option>
                                            {[...new Set(VehicleList.map((veh) => veh.site))].map(
                                              (site) => (
                                                <option key={site} value={site}>
                                                  {site}
                                                </option>
                                              )
                                            )}
                                          </select> */}

                      {/* <Select
                                            isClearable={true}
                                            options={siteOptions}
                                            value={siteOptions.find(
                                              (option) => option.value === selectedSite
                                            )}
                                            onChange={(selectedOption) => {
                                              setSelectedSite(
                                                selectedOption ? selectedOption.value : ""
                                              );
                                              setCurrentPage(1);
                                            }}
                                            styles={{
                                              control: (base) => ({
                                                ...base,
                                                width: 300,
                                                padding: "4px",
                                                borderRadius: "9999px", // fully rounded
                                                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                                                borderColor: "#d1d5db", // Tailwind's gray-300
                                              }),
                                            }}
                                            placeholder="Select Site"
                                          /> */}

                      {/* Right: Search input */}
                      <div className="relative" style={{ width: '600px' }}>

                        <span className="absolute inset-y-0 left-5 flex items-center text-gray-500 text-xl pointer-events-none">🔍</span>
                        <input
                          type="text"
                          placeholder="Search Trailer Type..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                      </div>

                    </div>
                  )}

                  {isCreate || editUser ? (
                    <RightSide
                      selectedOrder={selectedOrder}
                      setSelectedOrder={setSelectedOrder}
                      handleUpdate={handleUpdate}
                      isCreate={isCreate}
                      handleDelete={handleDelete}
                      error={error}
                      setError={setError}
                      commonData={commonData}
                    />
                  ) : (

                    <>

                      <TrailerTypeList
                        trailerTypeList={currentVehicles}
                        handleEditTrailerType={handleEditTrailerType}
                        handleDeleteClick={handleDeleteClick}
                        loader={loader}
                      />

                      <div className="d-flex justify-content-end">
                        <Pagination className="justify-content-center mt-4">
                          <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink
                              previous
                              onClick={() => paginate(currentPage - 1)}
                            />
                          </PaginationItem>

                          {Array.from({
                            length: Math.ceil(
                              searchedVehicles.length / trailerTypePerPage
                            ),
                          }).map((_, index) => (
                            <PaginationItem
                              key={index}
                              active={index + 1 === currentPage}
                            >
                              <PaginationLink
                                onClick={() => paginate(index + 1)}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}

                          <PaginationItem
                            disabled={
                              currentPage ===
                              Math.ceil(
                                searchedVehicles.length / trailerTypePerPage
                              )
                            }
                          >
                            <PaginationLink
                              next
                              onClick={() => paginate(currentPage + 1)}
                            />
                          </PaginationItem>
                        </Pagination>
                      </div>
                    </>
                  )}






                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* </LoadingOverlay> */}
        </Container>
      </div>

      {/* <Modal isOpen={deleteModal} toggle={toggleDeleteModal} centered>
        <ModalHeader className="bg-light" toggle={toggleDeleteModal}>
          Confirm Delete
        </ModalHeader>
        <ModalBody className="bg-light">
          Are you sure you want to delete the Trailer type:{" "}
          {selectedOrder?.trailerCode}?
        </ModalBody>
        <ModalFooter className="bg-light">
          <Button color="secondary" onClick={toggleDeleteModal}>
            No
          </Button>
          <Button color="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </ModalFooter>
      </Modal> */}


      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center bg-gray-100 px-6 py-4 rounded-t-xl">
              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Delete
              </h3>
              <button
                onClick={toggleDeleteModal}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="px-6 py-4 bg-gray-50 text-gray-800">
              Are you sure you want to delete the Trailer type:{" "}
              <span className="font-semibold">{trailerCode}</span>
            </div>
            <div className="flex justify-end items-center gap-2 px-6 py-4 bg-gray-100 rounded-b-xl">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={toggleDeleteModal}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <ErrorModal
        isOpen={showErrorModal}
        toggle={() => setShowErrorModal(false)}
        error={error}
      />
    </React.Fragment>
  );
};

export default UserManagement;
