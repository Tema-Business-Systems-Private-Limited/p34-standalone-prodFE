import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

import PurchaseOrder from "./PurchaseOrder";
import "./css/vehicleManagement.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EvStationIcon from "@mui/icons-material/EvStation";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";

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
  PaginationLink,
} from "reactstrap";
// import ThreeDotMenu from "./components/ThreeDotMenu";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import ErrorModal from "./components/ErrorModal";
import ErrorModalValidation from "./components/ErrorModalValidation";
import { fetchCommonDataFleet, fetchSitesByUser } from "../../service";
import VehicleListComp from "./components/VehicleList";
import RightSide from "./RightSection";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EmptyFields = {
  rowid: null,
  code: "",
  registration: "",
  site: "",
  activeFlag: "",
  ownership: "",
  vehicleClass: "",
  carrier: "",
  trailer: "",
  startDepotName: "",
  endDepotName: "",
  brand: "",
  model: "",
  color: "",
  fuelType: "",
  location: "",
  engineCC: "",
  chasisNum: "",
  yearOfManufacture: "",
  performance: "",
  insuranceAmountYearly: "",
  roadTaxAmountYearly: "",
  emptyVehicleMass: "",
  grossVehicleMass: "",
  tolerance: "",
  skillCriteria: "",
  loadingTime: "",
  offloadingTime: "",
  earliestStartTime: "",
  latestStartTime: "",
  availableHours: "",
  costPerUnitOverTime: "",
  costPerUnitDistance: "",
  costPerUnitTime: "",
  fixedCost: "",
  totalMaxDistance: "",
  maxTotalTime: "",
  maxTotalTravelTime: "",
  maxSpeed: "",
  overTimeHrs: "",
  maxAllowedWeight: "",
  maxAllowedVolume: "",
  quantity: "",
  maxOrderCount: "",
  noOfPallets: "",
  stackHeight: "",
  surfaceSol: "",
  vehicleFuelCapacity: "",
  vehicleFuelUnits: "",
  currentDriver: "",
  date: "",
  time: "",
  co2Coef: "",
  unavailable: "",
  style: "",
  routeRenewalsList: [],
  allDriverFlag: "",
  driverIds: [],
  allCustomerFlag: "",
  customerIds: [],
  allCategoryFlag: "",
  categoryIds: [],
  currentOdometerReading: "",
  lastUpdateDate: "",
  lastUpdateTime: "",
  reference: "",
  lastInsp: "",
  expiryInsp: "",
  vehicleAllocationInsp: "",
  returnVehicleInsp: "",
  gpsTrackerId: "",
  refGMSmobile: "",
  trackingWebServices: "",
  mobileRadio: "",
  fireExtinguisher: "",
  equipmentNotes: "",
  technicalInspectionList: [],
  asset: "",
  licenseReference: "",
  expiration: "",
  note: "",
  supplier: "",
  insuranceExpiration: "",
  insuranceReference: "",
  insuranceNote: "",
  documentList: [],
  transactionHistoryList: [],
  xallrutcds: 0,
  routesList: [],

};

const UserManagement = () => {
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showChassisDuplicateModal, setShowChassisDuplicateModal] = useState(false);
  const [showCodeDuplicateModal, setShowCodeDuplicateModal] = useState(false);
  const [duplicateCodeVehicle, setDuplicateCodeVehicle] = useState(null);

  const [duplicateVehicle, setDuplicateVehicle] = useState(null);
  const [errors, setErrors] = useState({});
const [selectedOrder, setSelectedOrder] = useState(EmptyFields);


  const [sites, setSites] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState({});
  const [listUsers, setListUsers] = useState("block");
  const [detailUser, setDetailUser] = useState("none");
 
  const [isCreate, setCreate] = useState(false);
  const [VehicleList, setVehicleList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [validationMessage, setValidationMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [siteList, setSiteList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [vehiclePerPage] = useState(6);
  const [commonData, setCommonData] = useState([]);


  const [deleteVehId, setDeleteVehId] = useState("");
  const [selectedSite, setSelectedSite] = useState("");

  const vehiclePerPage = 7; // or whatever number you want

  console.log(VehicleList, "this is vehicle list after fetching");
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteClick = (veh) => {
    setDeleteVehId(veh.code);
    setSelectedOrder(veh);
    toggleDeleteModal(!deleteModal);
  };

  const onClickCreateVehicle = () => {
    setSelectedOrder(EmptyFields);
    setCreate(true);
  };


 const isDuplicateVehicleCode = () => {
  if (!selectedOrder?.code) return false;

  const foundVehicle = VehicleList.find(
    (veh) =>
      veh.code?.toLowerCase() === selectedOrder.code.toLowerCase() &&
      (!editUser || veh.code !== selectedOrder.code)
  );

  if (foundVehicle) {
    setDuplicateCodeVehicle(foundVehicle);
    setShowCodeDuplicateModal(true);
    return true;
  }

  return false;
};



  async function fetcheVehicleList() {
    setLoader(true);
    try {
      let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllVehicles`
      );
      setLoader(false);
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Error while getting vehicles");
      }

      // Parse JSON data
      let res = await response.json();

      setVehicleList(res);
      setFilteredOrders(res);
    } catch (error) {
      setLoader(false);
    }
  }

  async function fetchUpdatedVehOnRefresh(codeyve) {
    try {
      setLoader(true);

      // Always clear form first
      setSelectedOrder(EmptyFields);

      // Case 1: No codeyve → refresh vehicle list only
      if (!codeyve) {
        await fetcheVehicleList();
        toast.success("Vehicle list refreshed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      // Case 2: codeyve exists → fetch vehicle details
      const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getVehicleByCodeyve?codeyve=${codeyve}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.warn("Vehicle not found, keeping form cleared.");
        toast.success("Refreshed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const data = await response.json();

      if (!data || typeof data !== "object") {
        console.warn("Invalid vehicle data, keeping form cleared.");
        toast.success("Refreshed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      // Vehicle exists → fill form
      setSelectedOrder(data);
      toast.success("Refreshed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      return data;
    } catch (error) {
      console.error("Error refreshing vehicle data:", error);
      setSelectedOrder(EmptyFields);
      toast.success("Refreshed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoader(false);
    }
  }


  // async function fetchUpdatedVehOnRefresh(codeyve) {
  //   fetcheVehicleList();
  //   if (codeyve) {
  //     setLoader(true);
  //     const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getVehicleByCodeyve?codeyve=${codeyve}`;

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







  const handleDelete = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteVehicleByCodeyve?codeyve=${deleteVehId}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Vehicle deleted successfully", {
          autoClose: 5000,
          position: "top-right",
        });
        setSelectedOrder(EmptyFields);

        fetcheVehicleList();
        setSearchTerm("");
      } else {
        toast.error("Error deleting driver", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    } catch (error) { }
  };



const resetForm = () => {
  setSelectedOrder(EmptyFields);
  setErrors({});
  setValidationMessage("");
  setShowErrorModal(false);
  setShowValidationModal(false);
};


  const isDuplicateChassis = () => {
    const foundVehicle = VehicleList.find(
      (veh) =>
        veh.chasisNum.toLowerCase() === selectedOrder.chasisNum.toLowerCase() &&
        veh.code !== selectedOrder.code // skip current vehicle on edit
    );

    if (foundVehicle) {
      setDuplicateVehicle(foundVehicle);
      setShowChassisDuplicateModal(true);
      return true;
    }

    return false;
  };


  const confirmDelete = () => {
    handleDelete();
    toggleDeleteModal();
  };
  const handleBackForm = () => {
    setEditUser(false);
   setSelectedOrder(EmptyFields);
    
    setCreate(false);
    setErrors({});
  };

  const handleSave = async () => {
    if (!isCreate) {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/updateVehicle`;

        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Vehicle updated successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          // handleBackForm();
          fetcheVehicleList();
          setSearchTerm("");
          setLoader(false);
        } else {
          toast.error("Error updating vehicle", {
            autoClose: 5000,
            position: "top-right",
          });
        }
      } catch (error) { }
    } else {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/createVehicle`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Vehicle created successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetcheVehicleList();
          setSearchTerm("");
          setLoader(false);
          // handleBackForm();
        } else {
          toast.error("Error creating Vehicle", {
            autoClose: 5000,
            position: "top-right",
          });
        }
      } catch (error) { }
    }
  };

  // create update vehicle

  const handleClick = () => {
    let formValid = true;

    if (isDuplicateVehicleCode()) {
      return;
    }
    if (isDuplicateChassis()) {
      return;
    }


    const newErrors = {};
    if (!selectedOrder.code.trim()) {
      formValid = false;
      newErrors.code = "This field is mandatory";
    }

    // console.log(!selectedOrder.licensePlate.trim(),"licance plate 392");
    console.log(selectedOrder, "this is selected order 393")

    if (!selectedOrder.registration.trim()) {
      formValid = false;
      newErrors.registration = "This field is mandatory";
    }

    if (!selectedOrder.site.trim()) {
      formValid = false;
      newErrors.site = "This field is mandatory";
    }

    if (!selectedOrder.vehicleClass.trim()) {
      formValid = false;
      newErrors.vehicleClass = "This field is mandatory";
    }

    if (!selectedOrder.carrier.trim()) {
      formValid = false;
      newErrors.carrier = "This field is mandatory";
    }

    if (!selectedOrder.startDepotName.trim()) {
      formValid = false;
      newErrors.startDepotName = "This field is mandatory";
    }

    if (!selectedOrder.endDepotName.trim()) {
      formValid = false;
      newErrors.endDepotName = "This field is mandatory";
    }

    if (!selectedOrder.chasisNum.trim()) {
      formValid = false;
      newErrors.chasisNum = "This field is mandatory";
    }

    if (!selectedOrder.earliestStartTime.trim()) {
      formValid = false;
      newErrors.earliestStartTime = "This field is mandatory";
    }

    if (!selectedOrder.latestStartTime.trim()) {
      formValid = false;
      newErrors.latestStartTime = "This field is mandatory";
    }

    if (
      isNaN(selectedOrder.costPerUnitTime) ||
      selectedOrder.costPerUnitTime === ""
    ) {
      formValid = false;
      newErrors.costPerUnitTime =
        "This field is mandatory and must be a valid number";
    }
    if (
      isNaN(selectedOrder.fixedCost) ||
      selectedOrder.fixedCost === ""
    ) {
      formValid = false;
      newErrors.fixedCost =
        "This field is mandatory and must be a valid number";
    }
    if (
      isNaN(selectedOrder.costPerUnitOverTime) ||
      selectedOrder.costPerUnitOverTime === ""
    ) {
      formValid = false;
      newErrors.costPerUnitOverTime =
        "This field is mandatory and must be a valid number";
    }
    if (
      selectedOrder.costPerUnitDistance == null ||
      isNaN(selectedOrder.costPerUnitDistance) ||
      selectedOrder.costPerUnitDistance === ""
    ) {
      formValid = false;
      newErrors.costPerUnitDistance =
        "This field is mandatory and must be a valid number";
    }

    if (
      selectedOrder.totalMaxDistance == null ||
      isNaN(selectedOrder.totalMaxDistance) ||
      selectedOrder.totalMaxDistance === ""
    ) {
      formValid = false;
      newErrors.totalMaxDistance =
        "This field is mandatory and must be a valid number";
    }



    if (
      selectedOrder.maxTotalTime == null ||
      isNaN(selectedOrder.maxTotalTime) ||
      selectedOrder.maxTotalTime === ""
    ) {
      formValid = false;
      newErrors.maxTotalTime =
        "This field is mandatory and must be a valid number";
    }

    if (
      selectedOrder.maxTotalTravelTime == null ||
      isNaN(selectedOrder.maxTotalTravelTime) ||
      selectedOrder.maxTotalTravelTime === ""
    ) {
      formValid = false;
      newErrors.maxTotalTravelTime =
        "This field is mandatory and must be a valid number";
    }

    if (
      selectedOrder.maxAllowedVolume == null ||
      isNaN(selectedOrder.maxAllowedVolume) ||
      selectedOrder.maxAllowedVolume === ""
    ) {
      formValid = false;
      newErrors.maxAllowedVolume =
        "This field is mandatory and must be a valid number";
    }

    if (
      selectedOrder.maxAllowedWeight == null ||
      isNaN(selectedOrder.maxAllowedWeight) ||
      selectedOrder.maxAllowedWeight === ""
    ) {
      formValid = false;
      newErrors.maxAllowedWeight =
        "This field is mandatory and must be a valid number";
    }

    if (!selectedOrder.style.trim()) {
      formValid = false;
      newErrors.style = "This field is mandatory";
    }


    if (formValid) {
      setShowErrorModal(false);
      handleSave();
    } else {
      setValidationMessage("");
      setErrors(newErrors);
      setShowErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleCloseValidationModal = () => {
    setShowValidationModal(false);
  };

  function fetchCommonDataService() {
    fetchCommonDataFleet()
      .then((data) => {
        // console.log(data); // Process your data here
        setCommonData(data[0]);
      })
      .catch((error) => { });
  }


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSite]);

  // Generate unique site options
  const siteOptions = [
    { value: "", label: "All Sites" },
    ...[...new Set(VehicleList.map((veh) => veh.site))].map((site) => ({
      value: site,
      label: site,
    })),
  ];

  // console.log(VehicleList, "this is vehicle list before filter 552");

  // console.log(searchTerm, "search term before filter");

  //   const filteredVeh = VehicleList?.filter(user =>
  //   Object.values(user).some(value =>
  //     value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );
  // Step 1: Filter based on search term
  const searchedVehicles = VehicleList?.filter((veh) =>
    [
      veh.code,
      veh.registration,
      veh.site,
      veh.vehicleClass,
      veh.currentDriver,
    ].some((value) =>
      value?.toString().toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  );

  // Step 2: Further filter by site selection
  const siteFilteredVehicles = selectedSite
    ? searchedVehicles.filter((veh) => veh.site === selectedSite)
    : searchedVehicles;

  // Step 3: Paginate the filtered result
  const indexOfLastVehicle = currentPage * vehiclePerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclePerPage;
  const currentVehicles = siteFilteredVehicles.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // edit vehicle

  const handleEditVehicle = (vehicle) => {
    setEditUser(true);
    setSelectedOrder(vehicle);
    setCreate(false);
    // console.log(vehicle, "this is vehicle setting check here 600");
  };
  useEffect(() => {
  fetcheVehicleList();       // ✅ load list on page load
  fetchCommonDataService();  // ✅ load dropdown/common data
}, []);


  return (
    <React.Fragment>
      <div
        className="page-content pb-0"
      // style={{ height: "100vh", margin: 0, overflow: "hidden" }}
      >
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
                    className="mb-4"
                  >
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle className="h1 mb-0 text-3xl font-bold">
                        {isCreate
                          ? "Create Vehicles"
                          : editUser
                            ? "Update Vehicle"
                            : "Management of Vehicles"}

                        {/* editUser */}
                      </CardTitle>
                    </Col>

                    <Col
                      md="6"
                      className="d-flex justify-content-end align-items-center h-100"
                    >


                      <Toolbar style={{ gap: "10px" }}>
                        {/* === TABLE VIEW === */}
                        {!isCreate && !editUser && (
                          <>
                            <Tooltip title="Create Vehicle">
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
                                  fetchUpdatedVehOnRefresh(selectedOrder?.code)
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
                                    // setSelectedOrder(EmptyFields);
                                    resetForm();
                                    toast.success("Refreshed successfully!", {
                                      position: "top-right",
                                      autoClose: 3000,
                                    });
                                  } else if (selectedOrder?.code) {
                                    // ✅ Edit mode — refresh selected vehicle
                                    setErrors({});
                                    await fetchUpdatedVehOnRefresh(selectedOrder.code);
                                    toast.success("Vehicles refreshed successfully!", {
                                      position: "top-right",
                                      autoClose: 3000,
                                    });
                                  } else {
                                    // ✅ Table/List mode — refresh the full list
                                    await fetcheVehicleList()
                                    toast.success("Vehicle list refreshed successfully!", {
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
                                  fetchUpdatedVehOnRefresh(selectedOrder?.code)
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
                      VehicleList={VehicleList}
                      setVehicleList={setVehicleList}
                      filteredOrders={filteredOrders}
                      setFilteredOrders={setFilteredOrders}
                      handleDelete={handleDelete}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      errors={errors}
                      setErrors={setErrors}
                      handleSave={handleSave}
                      validationMessage={validationMessage}
                      setValidationMessage={setValidationMessage}
                      showValidationModal={showValidationModal}
                      setShowValidationModal={setShowValidationModal}
                      siteList={siteList}
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
                    <div className="flex justify-between items-center mb-6">
                      {/* Left: Site Filter */}
                      <div>
                        <Select
                          isClearable={true}
                          options={siteOptions}
                          value={siteOptions.find((option) => option.value === selectedSite)}
                          onChange={(selectedOption) => {
                            setSelectedSite(selectedOption ? selectedOption.value : "");
                            setCurrentPage(1);
                          }}
                          styles={{
                            control: (base) => ({
                              ...base,
                              width: 300,
                              padding: '4px',
                              borderRadius: '9999px',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                              borderColor: '#d1d5db',
                            }),
                          }}
                          placeholder="Select Site"
                        />
                      </div>

                      {/* Right: Search Field */}
                      <div className="relative" style={{ width: '600px' }}>
                        <span className="absolute inset-y-0 left-5 flex items-center text-gray-500 text-xl pointer-events-none">🔍</span>
                        <input
                          type="text"
                          placeholder="Search vehicle..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                      </div>
                    </div>














                  )}

                  {isCreate || editUser ? (
                    <RightSide
                      handleDeleteVeh={handleDelete}
                      commonData={commonData}
                      isCreate={isCreate}
                      selectedOrder={selectedOrder}
                      setSelectedOrder={setSelectedOrder}
                      errors={errors}
                      setErrors={setErrors}
                      validationMessage={validationMessage}
                      setValidationMessage={setValidationMessage}
                      showValidationModal={showValidationModal}
                      setShowValidationModal={setShowValidationModal}
                      siteList={siteList}
                    />
                  ) : (
                    <>
                      <VehicleListComp
                        VehicleList={currentVehicles}
                        handleEditVehicle={handleEditVehicle}
                        handleDeleteClick={handleDeleteClick}
                        loader={loader}
                      />

                      {/* Pagination logic is here */}

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
                              siteFilteredVehicles.length / vehiclePerPage
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
                                siteFilteredVehicles.length / vehiclePerPage
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
          Are you sure you want to delete the Vehicle: {selectedOrder?.code}?
        </ModalBody>
        <ModalFooter className="bg-light">
          <Button
            style={{
              borderRadius: "50px",
              padding: "0.4rem 1.5rem",
            }}
            color="danger"
            onClick={confirmDelete}
          >
            Yes
          </Button>
          <Button
            style={{
              borderRadius: "50px",
              padding: "0.4rem 1.5rem",
            }}
            color="secondary"
            onClick={toggleDeleteModal}
          >
            No
          </Button>
        </ModalFooter>
      </Modal> */}
      {
        deleteModal && (
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
                Are you sure you want to delete the Vehicle:{" "}
                <span className="font-semibold">{selectedOrder?.code}</span>?
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
        )
      }
      {showCodeDuplicateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center bg-gray-100 px-6 py-4 rounded-t-xl">
              <h3 className="text-lg font-semibold text-gray-800">
                Duplicate Vehicle Code
              </h3>
              <button
                onClick={() => setShowCodeDuplicateModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="px-6 py-4 bg-gray-50 text-gray-800">
              <strong>This vehicle already exists.</strong>
              <br />
              Vehicle code <strong>{selectedOrder.code}</strong> is already present.
              <br />
              Please go back to the table and update the existing record.
            </div>

            <div className="flex justify-end items-center gap-2 px-6 py-4 bg-gray-100 rounded-b-xl">
              <button
                onClick={() => setShowCodeDuplicateModal(false)}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}


      <ErrorModal

        isOpen={showErrorModal}
        toggle={handleCloseErrorModal}
        errors={errors}
        validation={validationMessage}
      />
      {/* 
      <ErrorModalValidation
        isOpen={showValidationModal}
        toggle={handleCloseValidationModal}
        validation={validationMessage}
      /> */}
      {
        showChassisDuplicateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
              <div className="flex justify-between items-center bg-gray-100 px-6 py-4 rounded-t-xl">
                <h3 className="text-lg font-semibold text-gray-800">Duplicate Chassis Number</h3>
                <button
                  onClick={() => setShowChassisDuplicateModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="px-6 py-4 bg-gray-50 text-gray-800">
                Chassis number <strong>{selectedOrder.chasisNum}</strong> is already allocated to vehicle code:{" "}
                <strong>{duplicateVehicle?.code}</strong>.
              </div>
              <div className="flex justify-end items-center gap-2 px-6 py-4 bg-gray-100 rounded-b-xl">
                <button
                  onClick={() => setShowChassisDuplicateModal(false)}
                  className="bg-red-300 text-red-800 px-6 py-2 rounded-full hover:bg-red-400 transition"
                >
                  ok
                </button>
              </div>
            </div>
          </div>
        )
      }



    </React.Fragment >
  );
};

export default UserManagement;
