import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import RefreshIcon from "@mui/icons-material/Refresh";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import PurchaseOrder from "./PurchaseOrder";
import "./css/vehicleClass.css";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TrailerList from "./components/TrailerList";
import { useEffect } from "react";
import RightSide from "./RightSection";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "react-select";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import ErrorModal from "./components/ErrorModal";
import { number } from "echarts";

const newTrailerObj = {
  rowid: null,
  updTick: 0,
  trailer: "",
  des: "",
  type: "",
  linkTo: "",
  maxLen: "",
  maxWid: "",
  maxFH: "",
  maxLovol: "",
  maxLoams: "",
  curbWei: "",
  gvwr: "",
  nbaxle: "",
  make: "",
  model: "",
  annee: "",
  lastInsp: "",
  comment: "",
  creatDateTime: "",
  updateDateTime: "",
  auuid: "",
  fcy: "",
  xmaxlovol: "L",
  xmaxloams: "KG",
  xtrktyp: " ",
  xtracpy: " ",
  xadrcer: " ",
  xtrkisoa: 1,
  aasref: " ",
  xdeposit: 1,
  xsideope: 0,
  longueur: 3,
  largeur: 1,
  xseril: 0,
  xsermgtcod: 0,
  xlotmgtcod: 0,
  xstomgtcod: 0,
  xrentable: 0,
  xgndocc: 0.0,
  xacccod: "",
  xsalesunit: "",
  xtailgate: 0,
  styzon: "",
  xuvycod: "",
  xbathght: 0.0,
  xinsptyp0: "",
  xinsptyp1: "",
  xlstchk0: "",
  xlstchk1: "",
  xperiodicity0: 0,
  xperiodicity1: 0,
  xnextvisit0: "",
  xnextvisit1: "",
  xtypein0: 0,
  xtypein1: 0,
  xmaxpalcou: 0,
  compartmentList: [],
  technicalInspectionList: [],
};

const UserManagement = () => {
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [siteList, setSiteList] = useState([]);
  const [commonData, setCommonData] = useState({});
  const [selectedSite, setSelectedSite] = useState("All Sites");
  const [currentPage, setCurrentPage] = useState(1);
  const trailersPerPage = 6;



  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [sites, setSites] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState({});
  const [listUsers, setListUsers] = useState("block");
  const [detailUser, setDetailUser] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreate, setCreate] = useState(false);
  const [trailerList, setTrailerList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [trailerToDelete, setTrailerToDelete] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [error, setError] = useState({});

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  console.log(
    selectedOrder?.maxLoams,
    "checking error things in trailer management"
  );
  const onClickCreateTrailer = () => {
    setSelectedOrder(newTrailerObj);
    setCreate(true);
  };


  const resetTrailerForm = () => {
  setSelectedOrder(newTrailerObj); 
  setError({});                    
  setMissingFields([]);            
  setShowErrorModal(false);        
};



  async function fetchCommonData() {
    // setLoader(true)
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getTrailerCommonData`
      ).then((response) => {
        if (!response.ok) {
          throw new Error("Error while getting common data");
        }
        return response.json();
      });
      // setLoader(false)
      setCommonData(res);
    } catch (error) {
      console.log("Error while getting common data");
      // setLoader(false)
    }
  }
  useEffect(() => {
    fetchTrailerList();
    fetchCommonData();
  }, []);
  useEffect(() => {
    const uniqueSites = Array.from(new Set(trailerList.map(item => item.fcy))).filter(Boolean);
    setSiteList(uniqueSites);
  }, [trailerList]);
  useEffect(() => {
    setFilteredOrders(trailerList);
    setSelectedSite("");
  }, [trailerList]);



  async function fetchTrailerList() {
    setLoader(true);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllTrailers`
      ).then((response) => {
        // Check if response is successful
        if (!response.ok) {
          throw new Error("Error while getting trailers");
        }
        return response.json(); // Parse JSON data
      });
      setLoader(false);
      setTrailerList(res);
      setFilteredOrders(res);
    } catch (error) {
      setLoader(false);
      console.log("Error while getting trailers");
    }
  }

  async function fetchUpdatedTrailerOnRefresh(trailer) {
    try {
      setLoader(true);
      console.log("Tailer299", trailer)
      // Case 1: No trailer code → Home screen / table refresh
      if (!trailer) {
        console.log("Refreshing table/home screen data...");
        await fetchTrailerList(); // your existing table fetch
        toast.success("Trailer data refreshed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      // Case 2: trailer code exists → RightSection form refresh
      console.log(`Refreshing trailer data for code: ${trailer}`);

      // Clear form first
      setSelectedOrder(newTrailerObj);

      const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getTrailerByTrailerCode?trailer=${trailer}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.warn("Trailer not found, keeping form cleared.");
        // Form already cleared, show success toast anyway
        toast.success("Trailer data refreshed successfully!", { autoClose: 3000 });
        return;
      }

      const data = await response.json();

      if (!data || typeof data !== "object") {
        console.warn("Invalid data received, keeping form cleared.");
        toast.success("Trailer data refreshed successfully!", { autoClose: 3000 });
        return;
      }

      // Trailer exists → populate form
      setSelectedOrder(data);
      toast.success("Trailer data refreshed successfully!", { autoClose: 3000 });

      return data;
    } catch (error) {
      console.error("Error refreshing trailer data:", error);
      // Even on unexpected errors, clear form and show success
      setSelectedOrder(newTrailerObj);
      toast.success("Trailer data refreshed successfully!", { autoClose: 3000 });
    } finally {
      setLoader(false);
    }
  }



  // async function fetchUpdatedTrailerOnRefresh(trailer) {
  //   fetchTrailerList();
  //   if (trailer) {
  //     setLoader(true);
  //     const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getTrailerByTrailerCode?trailer=${trailer}`;

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
  //       console.error("Error fetching trailer data:", error);
  //       throw error; // Re-throw the error for further handling if needed
  //     }
  //   }
  // }

  // Delete api for trailer
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredOrders(trailerList);
      return;
    }

    const filtered = trailerList.filter((item) =>
      (item.trailer || "").toLowerCase().includes(value.toLowerCase()) ||
      (item.fcy || "").toLowerCase().includes(value.toLowerCase()) ||  // corrected this line
      (item.type || "").toLowerCase().includes(value.toLowerCase())
    );

    setFilteredOrders(filtered);
  };

  const handleDeleteClick = (trailer) => {
    if (!trailer) {
      toast.error("No trailer selected for deletion");
      return;
    }
    console.log("Selected trailer for deletion:", trailer);
    setTrailerToDelete(trailer);
    toggleDeleteModal();
  };



  const confirmDelete = () => {
    console.log("Confirm delete clicked. Deleting:", trailerToDelete);
    handleDelete(trailerToDelete);
  };

  const handleSiteFilter = (site) => {
    setSelectedSite(site);

    if (site.trim() === "" || site === "All Sites") {
      setFilteredOrders(trailerList);
    } else {
      const filtered = trailerList.filter(item =>
        (item.fcy || "").toLowerCase() === site.toLowerCase()
      );
      setFilteredOrders(filtered);
    }
  };





  const handleDelete = async (trailer) => {
    if (!trailer?.trailer) {
      toast.error("No trailer selected for deletion.", {
        position: "top-right",
      });
      return;
    }

    setLoader(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteTrailerByTrailerCode?trailer=${trailer.trailer}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Trailer deleted successfully", {
          autoClose: 5000,
          position: "top-right",
        });
        fetchTrailerList();  
        setSearchTerm("");
      } else {
        toast.error("Error deleting trailer", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error deleting trailer:", error);
      toast.error("Error deleting trailer", {
        autoClose: 5000,
        position: "top-right",
      });
    }
    setLoader(false);
    toggleDeleteModal();
    setTrailerToDelete(null);
  };



  const handleUpdate = async () => {
    setLoader(true);
    if (!isCreate) {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/updateTrailer`;

        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Trailer updated successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchTrailerList();
          setSearchTerm("");
        } else {
          toast.error("Error updating trailer", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false);
      } catch (error) {
        console.error("Error updating trailer", error);
        setLoader(false);
      }
    } else {
      try {
        setLoader(true);
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/createTrailer`;

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
          fetchTrailerList();
          setSearchTerm("");
          // setSelectedOrder(newTrailerObj);
          setLoader(false);
        } else {
          toast.error("Error creating trailer", {
            autoClose: 5000,
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Error creating trailer:", error);
        setLoader(false);
      }
    }
  };

  const handleClick = () => {
    let formValid = true;
    const newErrors = {};
    const missing = [];

    // Trailer
    if (!selectedOrder.trailer?.trim()) {
      formValid = false;
      newErrors.trailer = "This field is mandatory";
      missing.push("Trailer");
    }

    // Site
    if (!selectedOrder.fcy?.trim()) {
      formValid = false;
      newErrors.site = "This field is mandatory";
      missing.push("Site");
    }

    // Type
    if (!selectedOrder.type?.trim()) {
      formValid = false;
      newErrors.type = "This field is mandatory";
      missing.push("Type");
    }

    // Style
    if (!selectedOrder.styzon?.trim()) {
      formValid = false;
      newErrors.style = "This field is mandatory";
      missing.push("Style");
    }

    // Max Length
    if (
      selectedOrder.maxLen === null ||
      selectedOrder.maxLen === undefined ||
      selectedOrder.maxLen <= 0
    ) {
      formValid = false;
      newErrors.maxLength = "This field is mandatory";
      missing.push("Max Length");
    }

    // Max Width
    if (
      selectedOrder.maxWid === null ||
      selectedOrder.maxWid === undefined ||
      selectedOrder.maxWid <= 0
    ) {
      formValid = false;
      newErrors.maxWidth = "This field is mandatory";
      missing.push("Max Width");
    }

    // Curb Weight
    if (
      selectedOrder.curbWei === null ||
      selectedOrder.curbWei === undefined ||
      selectedOrder.curbWei <= 0
    ) {
      formValid = false;
      newErrors.crubWeight = "This field is mandatory";
      missing.push("Curb Weight");
    }

    // Max Loading Mass
    if (
      selectedOrder.maxLoams === null ||
      selectedOrder.maxLoams === undefined ||
      selectedOrder.maxLoams <= 0
    ) {
      formValid = false;
      newErrors.maxLoadingMass = "This field is mandatory";
      missing.push("Max Loading Mass");
    }

    // Max Freight Height
    if (
      selectedOrder.maxFH === null ||
      selectedOrder.maxFH === undefined ||
      selectedOrder.maxFH <= 0
    ) {
      formValid = false;
      newErrors.maxFreightHeight = "This field is mandatory";
      missing.push("Max Freight Height");
    }

    // GVWR
    if (
      selectedOrder.gvwr === null ||
      selectedOrder.gvwr === undefined ||
      selectedOrder.gvwr <= 0
    ) {
      formValid = false;
      newErrors.gvwr = "This field is mandatory";
      missing.push("GVWR");
    }

    // Max Load Volume
    // if (
    //   selectedOrder.maxLovol === null ||
    //   selectedOrder.maxLovol === undefined ||
    //   selectedOrder.maxLovol <= 0
    // ) {
    //   formValid = false;
    //   newErrors.maxLoadVol = "This field is mandatory";
    //   missing.push("Max Load Volume");
    // }
    // if (
    //   selectedOrder.xbathght === null ||
    //   selectedOrder.xbathght === undefined ||
    //   selectedOrder.xbathght <= 0
    // ) {
    //   formValid = false;
    //   newErrors.xbathght = "This field is mandatory";
    //   missing.push("Max Stack height");
    // }
    // if (
    //   selectedOrder.xgndocc === null ||
    //   selectedOrder.xgndocc === undefined ||
    //   selectedOrder.xgndocc <= 0
    // ) {
    //   formValid = false;
    //   newErrors.xgndocc = "This field is mandatory";
    //   missing.push("Ground Occupancy");
    // }

    // Set errors for inline fields
    setError(newErrors);

    // Set popup modal fields
    setMissingFields(missing);

    // Decide flow
    if (formValid) {
      handleUpdate(); // or saveData()
      setShowErrorModal(false);
    } else {
      setShowErrorModal(true);
    }
  };


  console.log(loader, "checking loader");
  const handleEditTrailer = (trailer) => {
    setEditUser(true);
    setSelectedOrder(trailer);
    setCreate(false);
    // console.log(vehicle, "this is vehicle setting check here 600");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const siteFilteredOrders = filteredOrders.filter(
    (trailer) =>
      selectedSite
        ? trailer.fcy?.trim().toLowerCase() === selectedSite.trim().toLowerCase()
        : true
  );




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
                          ? "Create Trailer"
                          : editUser
                            ? "Update Trailer"
                            : "Management of Trailer"}
                      </CardTitle>
                    </Col>

                    <Col md="6" className="d-flex justify-content-end align-items-center h-100">
                      <Toolbar style={{ gap: "10px" }}>
                        {/* TABLE VIEW */}
                        {!isCreate && !editUser && (
                          <>
                            <Tooltip title="Create Trailer">
                              <IconButton style={{ backgroundColor: "#8B5CF6" }} onClick={onClickCreateTrailer}>
                                <AddBoxIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={async () => {
                                  if (isCreate) {
                                    // Create mode — reset form
                                    setSelectedOrder(newTrailerObj);
                                    toast.success("Trailer form cleared successfully!", {
                                      position: "top-right",
                                      autoClose: 3000,
                                    });
                                  } else if (editUser && selectedOrder?.trailer) {
                                    // Edit mode — refresh selected trailer
                                    fetchUpdatedTrailerOnRefresh(selectedOrder.trailer);
                                  } else {
                                    // Table/List mode — refresh the full list
                                    await fetchTrailerList();
                                    toast.success("Refreshed successfully!", {
                                      position: "top-right",
                                      autoClose: 3000,
                                    });
                                  }
                                }}
                              >
                                <RefreshIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                          </>
                        )}

                        {/* CREATE VIEW */}
                        {isCreate && (
                          <>
                            <Tooltip title="Create">
                              <IconButton style={{ backgroundColor: "#8B5CF6" }} onClick={handleClick}>
                                <CheckIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() => {
                                   resetTrailerForm();
                                  setSelectedOrder(newTrailerObj);
                                  toast.success("Refreshed successfully!", {
                                    position: "top-right",
                                    autoClose: 3000,
                                  });
                                }}
                              >
                                <RefreshIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Back to Table">
                              <IconButton
                                style={{ backgroundColor: "#64748B" }}
                                onClick={() => {
                                  setCreate(false);
                                  setSelectedOrder(null);
                                  setErrors({});
                                  setError({});
                                  setMissingFields([]);
                                  setShowErrorModal(false);
                                  setEditUser(false);
                                }}
                              >
                                <ArrowBackIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}

                        {/* EDIT VIEW */}
                        {editUser && !isCreate && (
                          <>
                            <Tooltip title="Save">
                              <IconButton style={{ backgroundColor: "#34D399" }} onClick={handleClick}>
                                <SaveIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() => fetchUpdatedTrailerOnRefresh(selectedOrder?.trailer)}
                              >
                                <RefreshIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Back to Table">
                              <IconButton
                                style={{ backgroundColor: "#64748B" }}
                                onClick={() => {
                                  setCreate(false);
                                  setSelectedOrder(null);
                                  setErrors({});
                                  setEditUser(false);
                                }}
                              >
                                <ArrowBackIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Toolbar>
                    </Col>
                  </Row>

                  {isCreate || editUser ? (
                    <RightSide
                      handledeleteTra={handleDelete}
                      commonData={commonData}
                      isCreate={isCreate}
                      selectedOrder={selectedOrder}
                      setSelectedOrder={setSelectedOrder}
                      errors={errors}
                      setErrors={setErrors}

                      siteList={siteList}
                      error={error}
                      setError={setError}
                    />
                  ) : (
                    <>
                      {/* Search & Filter */}
                      <div className="flex justify-between items-center gap-4 mb-6">
                        <Select
                          isClearable={true}
                          options={[
                            { value: "", label: "All Sites" },
                            ...siteList.map((site) => ({ value: site, label: site })),
                          ]}
                          value={
                            selectedSite
                              ? { value: selectedSite, label: selectedSite }
                              : { value: "", label: "All Sites" }
                          }
                          onChange={(selectedOption) => {
                            setSelectedSite(selectedOption ? selectedOption.value : "");
                            setCurrentPage(1);
                          }}
                          styles={{
                            control: (base) => ({
                              ...base,
                              width: 300,
                              padding: "4px",
                              borderRadius: "9999px",
                              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                              borderColor: "#d1d5db",
                            }),
                          }}
                          placeholder="Select Site"
                        />


                        <div className="relative" style={{ width: '600px' }}>
                          <span className="absolute inset-y-0 left-5 flex items-center text-gray-500 text-xl pointer-events-none">🔍</span>
                          <input
                            type="text"
                            placeholder="Search Trailer..."
                            value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            onChange={handleSearch}
                            className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>

                      {/* Trailer List */}

                      <TrailerList
                        trailerList={siteFilteredOrders.slice(
                          (currentPage - 1) * trailersPerPage,
                          currentPage * trailersPerPage
                        )}
                        handleEditTrailer={handleEditTrailer}
                        handleDeleteClick={handleDeleteClick}
                        loader={loader}
                      />




                      {/* Pagination */}
                      <div className="d-flex justify-content-end">
                        <Pagination className="justify-content-center mt-4">
                          <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink
                              previous
                              onClick={() => setCurrentPage(currentPage - 1)}
                              style={{ border: "1px solid #ccc", color: "#5664D2" }}
                            />
                          </PaginationItem>

                          {Array.from({ length: Math.ceil(siteFilteredOrders.length / trailersPerPage) }).map((_, index) => (
                            <PaginationItem key={index} active={index + 1 === currentPage}>
                              <PaginationLink
                                onClick={() => setCurrentPage(index + 1)}
                                style={{
                                  border: "1px solid #ccc",
                                  color: index + 1 === currentPage ? "#fff" : "#5664D2",
                                  backgroundColor: index + 1 === currentPage ? "#6366F1" : "white",
                                  fontWeight: "500",
                                  borderRadius: "0px",
                                  minWidth: "40px",
                                  textAlign: "center",
                                }}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}

                          <PaginationItem disabled={currentPage === Math.ceil(siteFilteredOrders.length / trailersPerPage)}>
                            <PaginationLink
                              next
                              onClick={() => setCurrentPage(currentPage + 1)}
                              style={{ border: "1px solid #ccc", color: "#5664D2" }}
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
        </Container>
      </div>

      {/* Delete Modal */}
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
              Are you sure you want to delete the Trailer:{" "}
              <span className="font-semibold">{trailerToDelete?.trailer}</span>?
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
        errors={missingFields}
      />
    </React.Fragment>
  );
};

export default UserManagement;
