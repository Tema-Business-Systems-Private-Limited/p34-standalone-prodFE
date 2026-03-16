import React, { Component, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurchaseOrder from "./PurchaseOrder";
import "../VehicleClass/css/vehicleClass.css";
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
import VehicleAllocationList from "./components/VehicleAllocationList";
import RightSide from "./RightSection";
const apiUrl = process.env.REACT_APP_API_URL;
const newAllocationObj = {
  updTick: 0,
  transactionNumber: "",
  vehicleNumber: "",
  driverId: "",
  licenseNumber: "",
  startDate: null,
  startTime: "",
  endDate: "1753-01-01T00:00:00.000+00:00",
  endTime: "",
  xlicensetype: 0,
  truckType: 0,
  mobile: "",
  credAttim: "",
  updDattim: "",
  creUsr: "",
  updUsr: "",
  vehicleClass: "",
  odoStart: 0,
  odoEnd: 0,
  driverName: "",
  status: 0,
  licenseType: 0,
  rowId: null,
  xman: 0,
  xvdate: "",
  xunits: "",
  xunits1: "",
  xallSTime: "",
  xallETime: "",
  xdinsNum: "",
  xrinsNum: "",
  auuid: "",
  xretInspec: "",
  xdelInspec: "",
  xvalidate: 0,
  xvtime: "",
};
const UserManagement = () => {
  const [loader, setLoader] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreate, setCreate] = useState(false);
  const [allocationList, setAllocationList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errors, setErrors] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [editUser, setEditUser] = useState(false);
  const [transactionNum, setTransactionNum] = useState("");
  const VehicleAllocationPerPage = 7; // or whatever number you want
  const [commonData, setCommonData] = useState([]);
  const onClickCreateAllocation = () => {
    setSelectedOrder(newAllocationObj);
    setCreate(true);
  };

  const handleDelete = async () => {
    setLoader(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteAllocationByTransaction?transactionNumber=${transactionNum}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("association deleted successfully", {
          autoClose: 5000,
          position: "top-right",
        });
        setSelectedOrder(null);
        fetchAllocationsList();
        setSearchTerm("");
      } else {
        toast.error("Error deleting association", {
          autoClose: 5000,
          position: "top-right",
        });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error deleting association:", error);
    }
  };

  // delete modals logic

  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteClick = (transactionNumber) => {
    setTransactionNum(transactionNumber)
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    handleDelete();
    toggleDeleteModal();
  };

  async function fetchAllocationsList() {
    setLoader(true);
    try {
      let response = await fetch(
        `${apiUrl}/api/v1/fleet/getAllAllocationsList`
      );
      setLoader(false);
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Error while getting vehicles");
      }

      // Parse JSON data
      let res = await response.json();
      setAllocationList(res);
      setFilteredOrders(res);
    } catch (error) {
      setLoader(false);
      console.log("Error while getting associations");
    }
  }



  async function fetchUpdatedAllocationOnRefresh(transactionNumber) {
  try {
    setLoader(true);

    // Case 1: No transactionNumber → Refresh full list
    if (!transactionNumber) {
      console.log("Refreshing allocation list...");
      await fetchAllocationsList(); // Refresh list
      setSelectedOrder(newAllocationObj);
      toast.success("Allocation list refreshed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Case 2: transactionNumber exists → Refresh a specific allocation
    console.log(`Refreshing allocation data for transaction: ${transactionNumber}`);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllocationByTransactionNumber?transactionNumber=${transactionNumber}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.warn("Allocation not found, resetting form.");
      setSelectedOrder(newAllocationObj);
      toast.success("Allocation data refreshed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const data = await response.json();
    if (!data || typeof data !== "object") {
      console.warn("Invalid allocation data received.");
      setSelectedOrder(newAllocationObj);
      toast.success("Allocation data refreshed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Allocation found → set data
    setSelectedOrder(data);
    toast.success("Allocation data refreshed successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    return data;

  } catch (error) {
    console.error("Error refreshing allocation data:", error);
    setSelectedOrder(newAllocationObj);
    toast.success("Allocation data refreshed successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  } finally {
    setLoader(false);
  }
}

  // async function fetchUpdatedAllocationOnRefresh(transactionNumber) {
  //   fetchAllocationsList();
  //   if (transactionNumber) {
  //     setLoader(true);
  //     const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllocationByTransactionNumber?transactionNumber=${transactionNumber}`;

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
  //       console.log("Allocation Data:", data);
  //       return data;
  //     } catch (error) {
  //       setLoader(false);
  //       console.error("Error fetching vehicle data:", error);
  //       throw error; // Re-throw the error for further handling if needed
  //     }
  //   } else {
  //     setSelectedOrder(newAllocationObj);
  //   }
  // }

  // delete association

  // create and update function

  const handleUpdate = async () => {
    if (!isCreate) {
      setLoader(true);
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/updateAllocation`;

        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("association updated successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchAllocationsList();
          setSearchTerm("");
          setLoader(false);
        } else {
          toast.error("Error updating association", {
            autoClose: 5000,
            position: "top-right",
          });
        }
      } catch (error) {
        setLoader(false);
        console.error("Error updating association:", error);
      }
    } else {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/createAllocation`;
        setLoader(true);
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("association created successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          let createdObj = await response.json();
          setSelectedOrder(createdObj.allocation);
          fetchAllocationsList();
          setSearchTerm("");
          // setCreate(false);
        } else {
          toast.error("Error creating association", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error creating association:", error);
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = {};
    if (!selectedOrder.vehicleNumber.trim()) {
      formValid = false;
      newErrors.vehicleNo = "This field is mandatory";
    }

    if (!selectedOrder.startTime.trim()) {
      formValid = false;
      newErrors.startTime = "This field is mandatory";
    }

    if (!selectedOrder.driverId.trim()) {
      formValid = false;
      newErrors.driverId = "This field is mandatory";
    }

    setErrors(newErrors);

    if (formValid) {
      handleUpdate();
      setShowErrorModal(false);
    } else {
      setShowErrorModal(true);
    }
  };

  async function fetchCommonData() {
    // setLoader(true)
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllocationCommonData`
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

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  // Step 1: Filter based on search term
  const searchedVehicleAllocation = allocationList?.filter((veh) =>
    [
      veh.vehicleNumber,
      veh.driverId,
      veh.driverName,
      veh.startDate,
      veh.endDate,
    ].some((value) =>
      value?.toString().toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  );

  // Step 2: Paginate the filtered result
  const indexOfLastVehicle = currentPage * VehicleAllocationPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - VehicleAllocationPerPage;
  const currentVehicleAllocation = searchedVehicleAllocation.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchAllocationsList();
    fetchCommonData();
  }, []);

  const handleEditVehicle = (vehicle) => {
    setEditUser(true);
    setSelectedOrder(vehicle);
    setCreate(false);
    // console.log(vehicle, "this is vehicle setting check here 600");
  };

  const handleBackForm = () => {
    setEditUser(false);
    // setSelectedOrder(vehicle);
    setSelectedOrder(null);
    setCreate(false);
    setErrors({});
  };
  return (
    <React.Fragment>
      <div className="page-content pb-0">
        <ToastContainer />
        <Container fluid>
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <Row style={{ height: "60px" }} className="mb-4">
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle className="h1 mb-0 text-3xl font-bold">
                        {isCreate
                          ? "Create Allocation"
                          : editUser
                            ? "Update Allocation"
                            : "Vehicle Allocation to Drivers"}
                      </CardTitle>
                    </Col>

                    <Col
                      md="6"
                      className="d-flex justify-content-end align-items-center h-100"
                    >
                      <Toolbar style={{ gap: "10px" }}>
                        {!isCreate && !editUser && (
                          <>
                            <Tooltip title="Create Association">
                              <IconButton
                                style={{ backgroundColor: "#8B5CF6" }}
                                onClick={onClickCreateAllocation}
                              >
                                <AddBoxIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() =>
                                  fetchUpdatedAllocationOnRefresh(selectedOrder?.code)
                                }
                              >
                                <RefreshIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}

                        {isCreate && (
                          <>
                            <Tooltip title="Create">
                              <IconButton
                                style={{ backgroundColor: "#8B5CF6" }}
                                onClick={handleClick}
                              >
                                <CheckIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() =>
                                  fetchUpdatedAllocationOnRefresh(selectedOrder?.code)
                                }
                              >
                                <RefreshIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Back to Table">
                              <IconButton
                                style={{ backgroundColor: "#64748B" }}
                                onClick={handleBackForm}
                              >
                                <ArrowBackIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}

                        {editUser && !isCreate && (
                          <>
                            <Tooltip title="Save">
                              <IconButton
                                style={{ backgroundColor: "#34D399" }}
                                onClick={handleClick}
                              >
                                <SaveIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Back to Table">
                              <IconButton
                                style={{ backgroundColor: "#64748B" }}
                                onClick={handleBackForm}
                              >
                                <ArrowBackIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Toolbar>
                    </Col>
                  </Row>

                  {/* ✅ Show search bar only in List view */}
                  {!isCreate && !editUser && (
                    <div className="flex justify-end items-center mb-6">
                      <div className="relative" style={{ width: '680px' }}>
                        <span className="absolute inset-y-0 left-4 flex items-center text-gray-500 text-xl pointer-events-none">🔍</span>
                        <input
                          type="text"
                          placeholder="Search driver..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                      </div>
                    </div>



                  )}

                  {/* Create / Edit Form */}
                  {isCreate || editUser ? (
                    <RightSide
                      selectedOrder={selectedOrder}
                      setSelectedOrder={setSelectedOrder}
                      handleUpdate={handleUpdate}
                      isCreate={isCreate}
                      handleDelete={handleDelete}
                      errors={errors}
                      setErrors={setErrors}
                      commonData={commonData}
                    />
                  ) : (
                    <>
                      <VehicleAllocationList
                        VehicleAllocationList={currentVehicleAllocation}
                        handleEditVehicle={handleEditVehicle}
                        loader={loader}
                        handleDeleteClick={handleDeleteClick}
                      />

                      <div className="d-flex justify-content-end">
                        <Pagination className="justify-content-center mt-4">
                          <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
                          </PaginationItem>

                          {Array.from({
                            length: Math.ceil(
                              searchedVehicleAllocation.length / VehicleAllocationPerPage
                            ),
                          }).map((_, index) => (
                            <PaginationItem
                              key={index}
                              active={index + 1 === currentPage}
                            >
                              <PaginationLink onClick={() => paginate(index + 1)}>
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}

                          <PaginationItem
                            disabled={
                              currentPage ===
                              Math.ceil(
                                searchedVehicleAllocation.length / VehicleAllocationPerPage
                              )
                            }
                          >
                            <PaginationLink next onClick={() => paginate(currentPage + 1)} />
                          </PaginationItem>
                        </Pagination>
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Error & Delete Modals */}
        {deleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
              <div className="flex justify-between items-center bg-gray-100 px-6 py-4 rounded-t-xl">
                <h3 className="text-lg font-semibold text-gray-800">Confirm Delete</h3>
                <button
                  onClick={toggleDeleteModal}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="px-6 py-4 bg-gray-50 text-gray-800">
                Are you sure you want to delete the association:
                <span className="font-semibold"> {transactionNum}</span>?
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
          toggle={handleCloseErrorModal}
          errors={errors}
        />
      </div>
    </React.Fragment>
  );


  // return (
  //   <React.Fragment>
  //     <div className="page-content pb-0">
  //       <ToastContainer />
  //       <Container fluid>
  //         {/* <LoadingOverlay active={loader} spinner text="Loading please wait..."> */}
  //         <Row>
  //           <Col xs="12">
  //             <Card>
  //               <CardBody>
  //                 <Row
  //                   style={{
  //                     // backgroundColor: "currentcolor",
  //                     height: "60px",
  //                   }}
  //                   className="mb-4"
  //                 >
  //                   <Col md="6" className="d-flex align-items-center">
  //                     <CardTitle className="h1 mb-0 text-3xl font-bold">
  //                       {isCreate
  //                         ? "Create Allocation"
  //                         : editUser
  //                         ? "Update Allocation"
  //                         : "Vehicle Allocation to Drivers"}

  //                       {/* editUser */}
  //                     </CardTitle>
  //                   </Col>

  //                   <Col
  //                     md="6"
  //                     className="d-flex justify-content-end align-items-center h-100"
  //                   >
  //                     {/* <Button
  //                                             style={{
  //                                               borderRadius: "50px",
  //                                               padding: "0.4rem 1.5rem",
  //                                             }}
  //                                             className="mr-2"
  //                                             color="success"
  //                                             onClick={onClickCreateVehicle}
  //                                           >
  //                                             Create Vehicle
  //                                           </Button > */}

  //                     {/* <Toolbar style={{ gap: "10px" }}>
  //                                             {(!isCreate || !editUser) && (
  //                                               <>


  //                                                 <Tooltip title="Create Vehicle">
  //                                                 <IconButton
  //                                                   style={{ backgroundColor: "#8B5CF6" }}
  //                                                 >
  //                                                   <AddBoxIcon
  //                                                     onClick={onClickCreateVehicle}
  //                                                     style={{ fontSize: 25, color: "white" }}
  //                                                   />
  //                                                 </IconButton>
  //                                               </Tooltip>

  //                                                 <Tooltip title="Refresh">
  //                                               <IconButton
  //                                                 style={{ backgroundColor: "#238C5C" }}
  //                                                 onClick={() =>
  //                                                   fetchUpdatedVehOnRefresh(selectedOrder?.code)
  //                                                 }
  //                                               >
  //                                                 <RefreshIcon
  //                                                   style={{ fontSize: 25, color: "white" }}
  //                                                 />
  //                                               </IconButton>
  //                                             </Tooltip>
  //                                               </>
  //                                             )}


  //                                             {
  //                                               isCreate &&(
  //                                              <>
  //                                                  <Tooltip title="Create">
  //                                                   <IconButton
  //                                                     style={{ backgroundColor: "#8B5CF6" }}
  //                                                     onClick={handleClick}
  //                                                   >
  //                                                     <CheckIcon
  //                                                       style={{ fontSize: 25, color: "white" }}
  //                                                     />
  //                                                   </IconButton>
  //                                                 </Tooltip>

  //                                                 <Tooltip title="Refresh">
  //                                               <IconButton
  //                                                 style={{ backgroundColor: "#238C5C" }}
  //                                                 onClick={() =>
  //                                                   fetchUpdatedVehOnRefresh(selectedOrder?.code)
  //                                                 }
  //                                               >
  //                                                 <RefreshIcon
  //                                                   style={{ fontSize: 25, color: "white" }}
  //                                                 />
  //                                               </IconButton>
  //                                             </Tooltip>
  //                                              </>
  //                                               )
  //                                             }

  //                                               {editUser && (
  //                                            <>
  //                                             <Tooltip title="Save">
  //                                               <IconButton
  //                                                 style={{ backgroundColor: "#34D399" }}
  //                                                 onClick={handleClick}
  //                                               >
  //                                                 <SaveIcon
  //                                                   style={{ fontSize: 25, color: "white" }}
  //                                                 />
  //                                               </IconButton>
  //                                             </Tooltip>

  //                                              <Tooltip title="Refresh">
  //                                               <IconButton
  //                                                 style={{ backgroundColor: "#238C5C" }}
  //                                                 onClick={() =>
  //                                                   fetchUpdatedVehOnRefresh(selectedOrder?.code)
  //                                                 }
  //                                               >
  //                                                 <RefreshIcon
  //                                                   style={{ fontSize: 25, color: "white" }}
  //                                                 />
  //                                               </IconButton>
  //                                             </Tooltip>
  //                                            </>
  //                                           )}


  //                                           {
  //                                             (isCreate  || editUser) &&(
  //                                                <IconButton
  //                                                   style={{ backgroundColor: "#64748B" }}
  //                                                   onClick={handleBackForm}
  //                                                 >
  //                                                   <ArrowBackIcon
  //                                                     style={{ fontSize: 25, color: "white" }}
  //                                                   />
  //                                                 </IconButton>
  //                                             )
  //                                           }


  //                                           </Toolbar> */}

  //                     <Toolbar style={{ gap: "10px" }}>
  //                       {/* === TABLE VIEW === */}
  //                       {!isCreate && !editUser && (
  //                         <>
  //                           <Tooltip title="Create Vehicle">
  //                             <IconButton
  //                               style={{ backgroundColor: "#8B5CF6" }}
  //                               onClick={onClickCreateAllocation}
  //                             >
  //                               <AddBoxIcon
  //                                 style={{ fontSize: 25, color: "white" }}
  //                               />
  //                             </IconButton>
  //                           </Tooltip>

  //                           <Tooltip title="Refresh">
  //                             <IconButton
  //                               style={{ backgroundColor: "#238C5C" }}
  //                               onClick={() =>
  //                                 fetchUpdatedAllocationOnRefresh(
  //                                   selectedOrder?.code
  //                                 )
  //                               }
  //                             >
  //                               <RefreshIcon
  //                                 style={{ fontSize: 25, color: "white" }}
  //                               />
  //                             </IconButton>
  //                           </Tooltip>
  //                         </>
  //                       )}

  //                       {/* === CREATE VIEW === */}
  //                       {isCreate && (
  //                         <>
  //                           <Tooltip title="Create">
  //                             <IconButton
  //                               style={{ backgroundColor: "#8B5CF6" }}
  //                               onClick={handleClick}
  //                             >
  //                               <CheckIcon
  //                                 style={{ fontSize: 25, color: "white" }}
  //                               />
  //                             </IconButton>
  //                           </Tooltip>

  //                           <Tooltip title="Refresh">
  //                             <IconButton
  //                               style={{ backgroundColor: "#238C5C" }}
  //                               onClick={() =>
  //                                 fetchUpdatedAllocationOnRefresh(
  //                                   selectedOrder?.code
  //                                 )
  //                               }
  //                             >
  //                               <RefreshIcon
  //                                 style={{ fontSize: 25, color: "white" }}
  //                               />
  //                             </IconButton>
  //                           </Tooltip>

  //                           <Tooltip title="Back to Table">
  //                             <IconButton
  //                               style={{ backgroundColor: "#64748B" }}
  //                               onClick={handleBackForm}
  //                             >
  //                               <ArrowBackIcon
  //                                 style={{ fontSize: 25, color: "white" }}
  //                               />
  //                             </IconButton>
  //                           </Tooltip>
  //                         </>
  //                       )}

  //                       {/* === EDIT VIEW === */}
  //                       {editUser && !isCreate && (
  //                         <>
  //                           <Tooltip title="Save">
  //                             <IconButton
  //                               style={{ backgroundColor: "#34D399" }}
  //                               onClick={handleClick}
  //                             >
  //                               <SaveIcon
  //                                 style={{ fontSize: 25, color: "white" }}
  //                               />
  //                             </IconButton>
  //                           </Tooltip>

  //                           {/* <Tooltip title="Refresh">
  //                             <IconButton
  //                               style={{ backgroundColor: "#238C5C" }}
  //                               onClick={() =>
  //                                 fetchUpdatedAllocationOnRefresh(
  //                                   selectedOrder?.code
  //                                 )
  //                               }
  //                             >
  //                               <RefreshIcon
  //                                 style={{ fontSize: 25, color: "white" }}
  //                               />
  //                             </IconButton>
  //                           </Tooltip> */}

  //                           <Tooltip title="Back to Table">
  //                             <IconButton
  //                               style={{ backgroundColor: "#64748B" }}
  //                               onClick={handleBackForm}
  //                             >
  //                               <ArrowBackIcon
  //                                 style={{ fontSize: 25, color: "white" }}
  //                               />
  //                             </IconButton>
  //                           </Tooltip>
  //                         </>
  //                       )}
  //                     </Toolbar>
  //                   </Col>
  //                 </Row>
  //                 {/* <PurchaseOrder
  //                     selectedOrder={selectedOrder}
  //                     setSelectedOrder={setSelectedOrder}
  //                     isCreate={isCreate}
  //                     setCreate={setCreate}
  //                     setLoader={setLoader}
  //                     allocationList={allocationList}
  //                     setAllocationList={setAllocationList}
  //                     filteredOrders={filteredOrders}
  //                     setFilteredOrders={setFilteredOrders}
  //                     searchTerm={searchTerm}
  //                     setSearchTerm={setSearchTerm}
  //                     errors={errors}
  //                     setErrors={setErrors}
  //                   /> */}

  //                 <div className="flex justify-between items-center  gap-4 mb-6">
  //                   {/* Left: Select dropdown */}
  //                   {/* <select
  //                                           value={selectedSite}
  //                                           onChange={(e) => {
  //                                             setSelectedSite(e.target.value);
  //                                             setCurrentPage(1);
  //                                           }}
  //                                           style={{ width: "300px" }}
  //                                           className="py-3 px-4 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  //                                         >
  //                                           <option value="">All Sites</option>
  //                                           {[...new Set(VehicleList.map((veh) => veh.site))].map(
  //                                             (site) => (
  //                                               <option key={site} value={site}>
  //                                                 {site}
  //                                               </option>
  //                                             )
  //                                           )}
  //                                         </select> */}

  //                   {/* Right: Search input */}

  //                 </div>
  //                 {isCreate || editUser ? (
  //                   <RightSide
  //                     selectedOrder={selectedOrder}
  //                     setSelectedOrder={setSelectedOrder}
  //                     handleUpdate={handleUpdate}
  //                     isCreate={isCreate}
  //                     handleDelete={handleDelete}
  //                     errors={errors}
  //                     setErrors={setErrors}
  //                     commonData={commonData}

  //                   />
  //                 ) : (
  //                   <>
  //                     <VehicleAllocationList
  //                       VehicleAllocationList={currentVehicleAllocation}
  //                       handleEditVehicle={handleEditVehicle}
  //                       loader={loader}
  //                        handleDeleteClick={handleDeleteClick}
  //                     />
  //                     <div className="d-flex justify-content-end">
  //                       <Pagination className="justify-content-center mt-4">
  //                         <PaginationItem disabled={currentPage === 1}>
  //                           <PaginationLink
  //                             previous
  //                             onClick={() => paginate(currentPage - 1)}
  //                           />
  //                         </PaginationItem>

  //                         {Array.from({
  //                           length: Math.ceil(
  //                             searchedVehicleAllocation.length /
  //                               VehicleAllocationPerPage
  //                           ),
  //                         }).map((_, index) => (
  //                           <PaginationItem
  //                             key={index}
  //                             active={index + 1 === currentPage}
  //                           >
  //                             <PaginationLink
  //                               onClick={() => paginate(index + 1)}
  //                             >
  //                               {index + 1}
  //                             </PaginationLink>
  //                           </PaginationItem>
  //                         ))}

  //                         <PaginationItem
  //                           disabled={
  //                             currentPage ===
  //                             Math.ceil(
  //                               searchedVehicleAllocation.length /
  //                                 VehicleAllocationPerPage
  //                             )
  //                           }
  //                         >
  //                           <PaginationLink
  //                             next
  //                             onClick={() => paginate(currentPage + 1)}
  //                           />
  //                         </PaginationItem>
  //                       </Pagination>
  //                     </div>
  //                   </>
  //                 )}
  //               </CardBody>
  //             </Card>
  //           </Col>
  //         </Row>
  //         {/* </LoadingOverlay> */}
  //       </Container>
  //     </div>

  //     {/* <Modal isOpen={deleteModal} toggle={toggleDeleteModal} centered>
  //       <ModalHeader className="bg-light" toggle={toggleDeleteModal}>
  //         Confirm Delete
  //       </ModalHeader>
  //       <ModalBody className="bg-light">
  //         Are you sure you want to delete the association:{" "}
  //         {selectedOrder?.transactionNumber}?
  //       </ModalBody>
  //       <ModalFooter className="bg-light">
  //         <Button color="secondary" onClick={toggleDeleteModal}>
  //           No
  //         </Button>
  //         <Button color="danger" onClick={confirmDelete}>
  //           Yes
  //         </Button>
  //       </ModalFooter>
  //     </Modal> */}

  //      {deleteModal && (
  //       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  //         <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
  //           <div className="flex justify-between items-center bg-gray-100 px-6 py-4 rounded-t-xl">
  //             <h3 className="text-lg font-semibold text-gray-800">
  //               Confirm Delete
  //             </h3>
  //             <button
  //               onClick={toggleDeleteModal}
  //               className="text-gray-500 hover:text-gray-700 text-xl font-bold"
  //             >
  //               &times;
  //             </button>
  //           </div>
  //           <div className="px-6 py-4 bg-gray-50 text-gray-800">
  //        Are you sure you want to delete the association:{" "}
  //             <span className="font-semibold">{transactionNum}</span>?
  //           </div>
  //           <div className="flex justify-end items-center gap-2 px-6 py-4 bg-gray-100 rounded-b-xl">
  //             <button
  //               onClick={confirmDelete}
  //               className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
  //             >
  //               Yes
  //             </button>
  //             <button
  //               onClick={toggleDeleteModal}
  //               className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
  //             >
  //               No
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //     <ErrorModal
  //       isOpen={showErrorModal}
  //       toggle={handleCloseErrorModal}
  //       errors={errors}
  //     />
  //   </React.Fragment>
  // );
};

export default UserManagement;
