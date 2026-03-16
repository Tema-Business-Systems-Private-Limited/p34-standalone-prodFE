import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurchaseOrder from "./PurchaseOrder";
import "./css/vehicleClass.css";
import { Link } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "react-select";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ThreeDotMenu from "./components/ThreeDotMenu";
import ErrorModal from "../VehicleManagement/components/ErrorModal";
import DriverListComp from "./components/DriverListComp";
import RightSide from "./RightSection";
const newDriverObj = {
  rowId: null,
  updTick: 0,
  driverId: "",
  driver: "",
  active: 1,
  bptnum: "",
  lanmain: "",
  lansec: "",
  cry: "",
  bir: "",
  credattim: "",
  upddattim: "",
  auuid: "",
  creusr: "",
  updusr: "",
  bpaaddlig0: "",
  bpaaddlig1: "",
  bpaaddlig2: "",
  poscod: "",
  cty: "",
  mob: "",
  web: "",
  licenum: "",
  licedat: "",
  licetyp: 0,
  validat: "",
  delivby: "",
  lastvime: "",
  fcy: "",
  sat: "",
  tel0: "",
  tel1: "",
  tel2: "",
  tel3: "",
  tel4: "",
  xuser: "",
  xpwd: "",
  xpwd1: "",
  xsigcon: 1,
  xcamcon: 1,
  xper: 0,
  xlgnflg: 1,
  xbus: "",
  xloginseqno: "",
  xbadnum: "",
  xadrdat: "",
  xdocno: "",
  xx10cGeox: "",
  xx10cGeoy: "",
  xlncstarttim: "",
  xlncdur: "",
  styzon: "",
  xpaycon: 1,
  xuvycod: "",
  xskpcon: 1,
  xrescon: 1,
  xqtychgcon: 1,
  xspotcon: 1,
  xpickupcon: 1,
  xsihcon: 1,
  xlogflag: 0,
  xmacadd: "",
  xdeposit: 0,
  xgeocon: 1,
  xnooftrips: 0,
  xsalesrep: 1,
  xdriver: 1,
  xdsd: 1,
  xsalrout: 1,
  xfc0: "",
  xfc1: "",
  xfc2: "",
  xfc3: "",
  xfc4: "",
  xfc5: "",
  xfc6: "",
  xfc7: "",
  xfc8: "",
  xfc9: "",
  xcondriv: 1,
  x1cunion: 0,
  x10cmon: 1,
  x10ctues: 1,
  x10cwed: 1,
  x10cthu: 1,
  x10cfri: 1,
  x10csat: 1,
  x10csun: 1,
  x1coverhrs: 0,
  xmaxhrsday: 0,
  xmaxhrsweek: 0,
  xdriverhrs: 0,
  xallvehicle: 1,
  xuvystrdat: "",
  xuvyenddat: "",
  xlonghaul: 1,
  xvehicleclas: "",
  xvehicleclas1: "",
  xvehicleclas2: "",
  xvehicleclas3: "",
  xvehicleclas4: "",
  xvehicleclas5: "",
  xvehicleclas6: "",
  xvehicleclas7: "",
  xvehicleclas8: "",
  xvehicleclas9: "",
  note: "",
  x10csup: 1,
  x10csupflg: 1,
  documentList: [],
  siteList: [],
  vehicleClassList: [],
  unavailableDaysList: [],
  image: null,
};
const apiUrl = process.env.REACT_APP_API_URL;

const UserManagement = () => {
  const [loader, setLoader] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreate, setCreate] = useState(false);
  const [driverList, setDriverList] = useState([]);
  // const [filteredOrders, setFilteredOrders] = useState(driverList);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [editTrailer, setEditTrailer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [commonData, setCommonData] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [siteOptions, setSiteOptions] = useState([]);
  const driversPerPage = 7;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [showDriverDuplicateModal, setShowDriverDuplicateModal] = useState(false);




  const [errors, setErrors] = useState({
    user: "",
    style: "",
    site: "",
    country: "",
    postalCode: "",
  });



  useEffect(() => {
    if (commonData?.siteList?.length > 0) {
      const options = commonData.siteList.map(site => ({
        value: site.value,
        label: site.value
      }));
      setSiteOptions(options);
    }
  }, [commonData]);

  const filteredDrivers = driverList.filter(driver => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (driver.driverId ?? "").toLowerCase().includes(search) ||
      (driver.driver ?? "").toLowerCase().includes(search) ||
      (driver.bptnum ?? "").toLowerCase().includes(search) ||
      (driver.fcy ?? "").toLowerCase().includes(search)

    const matchesSite = selectedSite
      ? driver.fcy === selectedSite
      : true;

    return matchesSearch && matchesSite;
  });

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentItems = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);
  const resetDriverForm = () => {
    setSelectedOrder(newDriverObj);
    setErrors({
      user: "",
      style: "",
      site: "",
      country: "",
      postalCode: "",
    });
    setShowErrorModal(false);
    setShowDriverDuplicateModal(false);
  };


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  const onClickCreateDriver = () => {
    
    setSelectedOrder(newDriverObj);
    setCreate(true);
    setEditTrailer(false);
  };

  // async function fetchDriverList() {
  //   setLoader(true);
  //   try {
  //     let res = await fetch(
  //       `${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllDriversList`
  //     ).then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Error while getting drivers");
  //       }
  //       return response.json();
  //     });
  //     setDriverList(res);
  //     setLoader(false);
  //   } catch (error) {
  //     console.log("Error while getting trailers");
  //   }
  // }
  async function fetchDriverList(showToast = false) {
    setLoader(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllDriversList`
      );
      if (!res.ok) {
        throw new Error("Error while getting drivers");
      }
      const data = await res.json();
      setDriverList(data);

      if (showToast) {
        toast.success("Driver list refreshed successfully!", {
          autoClose: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error while getting drivers", error);
      if (showToast) {
        toast.error("Failed to refresh driver data", {
          autoClose: 3000,
          position: "top-right",
        });
      }
    } finally {
      setLoader(false);
    }
  }

  async function fetchUpdatedDriverOnRefresh(codeyve) {
    console.log(codeyve, "codeyve")
    setLoader(true);

    try {
      if (codeyve) {
        const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getDriverById?driverId=${codeyve}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSelectedOrder(data);

        toast.success("Driver data refreshed successfully!", {
          autoClose: 3000,
          position: "top-right",
        });

        return data;
      } else {
        await fetchDriverList();
        toast.success("Driver list refreshed successfully!", {
          autoClose: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to refresh driver data", {
        autoClose: 3000,
        position: "top-right",
      });
      console.error("Error refreshing driver data:", error);
    } finally {
      setLoader(false);
    }
  }

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteClick = (driver) => {
    setSelectedOrder(driver);
    toggleDeleteModal();
  };

  const handleDelete = async () => {
    setLoader(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteDriverById?driverId=${selectedOrder.driverId}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSelectedOrder(null);
        setSearchTerm("");
        await fetchDriverList();

        toast.success("Driver deleted successfully", {
          autoClose: 3000,
          position: "top-right",
        });
      } else {
        toast.error("Error deleting driver", {
          autoClose: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast.error("Failed to delete driver", {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoader(false);
    }
  };

  const confirmDelete = async () => {
    toggleDeleteModal();
    await handleDelete();
  };

  const handleUpdate = async () => {
    setLoader(true);
    if (!isCreate) {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/updateDriver`;

        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Driver updated successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchDriverList();
          setSearchTerm("");
          // handleBackButton();
        } else {
          toast.error("Error updating driver", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error updating driver", error);
      }
    } else {
      try {
        setLoader(true);
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/createDriver`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Driver created successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          await fetchDriverList();
          setSearchTerm("");
          // setSelectedOrder(newDriverObj);
          // handleBackButton();
        } else {
          toast.error("Error creating driver", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error creating driver:", error);
      }
    }
  };





  const handleClick = () => {
    const newErrors = {};
    let formValid = true;

    setShowErrorModal(false);

    // User ID
    if (!selectedOrder?.driverId?.trim()) {
      formValid = false;
      newErrors.user = "This field is mandatory";
    }

    // Duplicate check (ONLY if userId exists)
    if (
      isCreate &&
      selectedOrder?.driverId?.trim() &&
      driverList.some(
        d =>
          d.driverId?.trim().toLowerCase() ===
          selectedOrder.driverId.trim().toLowerCase()
      )
    ) {
      setShowDriverDuplicateModal(true);
      return;
    }

    // Site
    if (!selectedOrder?.fcy?.trim()) {
      formValid = false;
      newErrors.site = "This field is mandatory";
    }

    // Style
    if (!selectedOrder?.styzon?.trim()) {
      formValid = false;
      newErrors.style = "This field is mandatory";
    }

    // Country
    if (!selectedOrder?.cry?.trim()) {
      formValid = false;
      newErrors.country = "This field is mandatory";
    }

    // Postal Code
    if (!selectedOrder?.poscod?.trim()) {
      formValid = false;
      newErrors.postalCode = "This field is mandatory";
    }

    if (!formValid) {
      setErrors(newErrors);
      setShowErrorModal(true);
      return;
    }

    // ✅ All good
    handleUpdate();


  };



  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleEditTrailer = (trailer) => {
    console.log(trailer, "this is trialer");

    setSelectedOrder(trailer)
    setEditTrailer(true)
    setCreate(false)
  }

  const handleBackButton = () => {
    setCreate(false);
    setSelectedOrder(null);
    setErrors({});
    setEditTrailer(false);
  }

  async function fetchCommonData() {
    // setLoader(true)
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getDriverCommonData`
      ).then((response) => {
        if (!response.ok) {
          throw new Error("Error while getting common data");
        }
        return response.json();
      });
      console.log("commonData ===>", res);
      setCommonData(res);
      // setLoader(false)
    } catch (error) {
      // setLoader(false)
      console.log("Error while getting common data");
    }
  }

  useEffect(() => {
    fetchCommonData();
    fetchDriverList();
  }, [])

  return (
    <React.Fragment>
      <div className="page-content pb-0">
        <ToastContainer />
        <Container fluid>
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <Row style={{
                    height: "60px",
                  }}
                    className="mb-4">
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle className="h1 mb-0 text-3xl font-bold">
                        {isCreate
                          ? "Create Driver"
                          : editTrailer
                            ? "Update Driver"
                            : "Driver Management"}
                      </CardTitle>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center h-100">
                      <Toolbar style={{ gap: "10px" }}>
                        {!isCreate && !editTrailer && (
                          <>
                            <Tooltip title="Create Driver">
                              <IconButton
                                style={{ backgroundColor: "#8B5CF6" }}
                                onClick={onClickCreateDriver}
                              >
                                <AddBoxIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            {/* <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() => fetchUpdatedDriverOnRefresh(selectedOrder?.driverId)}
                              >
                                <RefreshIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip> */}
                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() => fetchDriverList(true)}
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

                            <Tooltip title="Clear Form">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() => {
                                  setSelectedOrder(newDriverObj);
                                   resetDriverForm();
                                  toast.success("Driver form cleared successfully!", {
                                    autoClose: 3000,
                                    position: "top-right",
                                  });
                                }}
                              >
                                <RefreshIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}

                        {editTrailer && (


                          <>
                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={async () => {
                                  if (selectedOrder?.driverId) {
                                    await fetchUpdatedDriverOnRefresh(selectedOrder.driverId);

                                  }
                                }}
                              >
                                <RefreshIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Save">
                              <IconButton
                                style={{ backgroundColor: "#34D399" }}
                                onClick={handleClick}
                              >
                                <SaveIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}

                        {(isCreate || editTrailer) && (
                          <Tooltip title="Back to Table">
                            <IconButton
                              style={{ backgroundColor: "#64748B" }}
                              onClick={handleBackButton}
                            >
                              <ArrowBackIcon style={{ fontSize: 25, color: "white" }} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Toolbar>
                    </Col>
                  </Row>
                  {
                    (!isCreate && !editTrailer) && (
                      <div className="flex justify-between items-center gap-4 mb-6">
                        <Select
                          isClearable
                          options={siteOptions}
                          value={siteOptions.find(option => option.value === selectedSite)}
                          onChange={(selectedOption) => {
                            setSelectedSite(selectedOption ? selectedOption.value : "");
                            setCurrentPage(1);
                          }}
                          styles={{
                            control: (base) => ({
                              ...base,
                              width: 300,
                              borderRadius: '9999px',
                              padding: '2px',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                              borderColor: '#d1d5db',
                            }),
                          }}
                          placeholder="Filter by Site"
                        />
                        <div className="relative" style={{ width: '600px' }}>
                          <span className="absolute inset-y-0 left-5 flex items-center text-gray-500 text-xl pointer-events-none">🔍</span>
                          <input
                            type="text"
                            placeholder="Search driver..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>
                    )
                  }
                  {
                    isCreate || editTrailer ? (
                      <RightSide
                        selectedOrder={selectedOrder}
                        setSelectedOrder={setSelectedOrder}
                        handleUpdate={handleUpdate}
                        isCreate={isCreate}
                        handleDelete={handleDelete}
                        commonData={commonData}
                        errors={errors}
                        setErrors={setErrors}
                      />
                    ) : (
                      <>
                        <DriverListComp
                          driverList={currentItems}
                          handleEditDriver={handleEditTrailer}
                          handleDeleteClick={handleDeleteClick}
                          loader={loader}
                        />
                        <div className="d-flex justify-content-end">
                          <Pagination className="justify-content-center mt-4">
                            <PaginationItem disabled={currentPage === 1}>
                              <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
                            </PaginationItem>

                            {Array.from({
                              length: Math.ceil(filteredDrivers.length / driversPerPage),
                            }).map((_, index) => (
                              <PaginationItem key={index} active={index + 1 === currentPage}>
                                <PaginationLink onClick={() => paginate(index + 1)}>
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            <PaginationItem
                              disabled={currentPage === Math.ceil(filteredDrivers.length / driversPerPage)}
                            >
                              <PaginationLink next onClick={() => paginate(currentPage + 1)} />
                            </PaginationItem>
                          </Pagination>
                        </div>
                      </>
                    )
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
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
              Are you sure you want to delete the Driver:{" "}
              <span className="font-semibold">{selectedOrder?.driverId}</span>?
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
      {showDriverDuplicateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center bg-gray-100 px-6 py-4 rounded-t-xl">
              <h3 className="text-lg font-semibold text-gray-800">
                Duplicate Driver
              </h3>
              <button
                onClick={() => setShowDriverDuplicateModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="px-6 py-4 bg-gray-50 text-gray-800">

              <br />
              Driver ID <strong>{selectedOrder?.driverId}</strong> is already present.
              <br />
              Please go back to the table and update the existing record.
            </div>

            <div className="flex justify-end items-center gap-2 px-6 py-4 bg-gray-100 rounded-b-xl">
              <button
                onClick={() => setShowDriverDuplicateModal(false)}
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
      />
    </React.Fragment>
  );
};

export default UserManagement;
