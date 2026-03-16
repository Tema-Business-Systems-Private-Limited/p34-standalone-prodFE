import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/vehicleClass.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import RightSide from "./RightSection";
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
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import ErrorModal from "./components/ErrorModal";
import VehicleClassList from "./components/VehicleClassList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "react-select";

const apiUrl = process.env.REACT_APP_API_URL;
const newVehicleClassObj = {
  rowid: null,
  desc: "",
  className: "",
  enaFlag: 0,
  typ: "",
  cry: "",
  axlnbr: 0,
  xmaxcapw: 0.0,
  xmaxunit: "LB",
  xmaxcapv: 0.0,
  xmaxvunit: "GL",
  xskillno: 0,
  xinspin: "",
  xmanin: 0,
  xinspout: "",
  xmanout: 0,
};
const UserManagement = () => {
  const [loader, setLoader] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreate, setCreate] = useState(false);
  const [vehicleClassList, setVehicleClassList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [commonData, setCommonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
const [showClassDuplicateModal, setShowClassDuplicateModal] = useState(false);


  const [error, setError] = useState(
    selectedOrder?.className.trim() ? "This field is mandatory" : ""
  );
  const [showErrorModal, setShowErrorModal] = useState(false);

  const vehiclePerPage = 7;

  useEffect(() => {
    fetchCommonData();
    fetchVehicleClassList();
  }, [])

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  useEffect(() => {
    if (vehicleClassList.length > 0) {
      const uniqueTypes = Array.from(
        new Set(vehicleClassList.map(v => v.typ).filter(typ => typ !== 0))
      );
      const options = uniqueTypes.map(type => ({
        value: type,
        label: type === 1 ? "Single Unit" : type === 2 ? "Multi Unit" : `Type ${type}`
      }));
      setTypeOptions(options);
    }
  }, [vehicleClassList]);


  // useEffect(() => {
  //   if (vehicleClassList.length > 0) {
  //     const uniqueTypes = Array.from(new Set(vehicleClassList.map(v => v.typ)));
  //     const options = uniqueTypes.map(type => ({
  //       value: type,
  //       label: type === 1 ? "Single Unit" : type === 2 ? "Multi Unit" : `Type ${type}`
  //     }));
  //     setTypeOptions(options);
  //   }
  // }, [vehicleClassList]);

  const filteredVehicleClasses = vehicleClassList.filter(vehicleClass => {
    const matchesSearch = Object.values(vehicleClass)
      .some(val => val?.toString().toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType
      ? vehicleClass.typ === selectedType
      : true;

    return matchesSearch && matchesType;
  });

  const indexOfLastItem = currentPage * vehiclePerPage;
  const indexOfFirstItem = indexOfLastItem - vehiclePerPage;
  const currentItems = filteredVehicleClasses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onClickCreateVehicle = () => {
    setSelectedOrder({ ...newVehicleClassObj });
    setCreate(true);
    setEditUser(false);
  };

  const handleBackButton = () => {
    setCreate(false);
    setError("");
    setEditUser(false);
  }
  const handleDelete = async () => {
    if (!selectedOrder?.className) {
      toast.error("No Vehicle class selected to delete.")
      return;
    }
    setLoader(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteVehicleClassByClass?className=${selectedOrder.className}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Vehicle class deleted successfully", {
          autoClose: 5000,
          position: "top-right",
        });
        setSelectedOrder(null);
        fetchVehicleClassList();
        setSearchTerm("");
        setCreate(false);
        setEditUser(false);
      } else {
        toast.error("Error deleting vehicle class", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error deleting vehicle class:", error);
      toast.error("An error occurred while deleting the vehicle class.");
    } finally {
      setLoader(false);
    }
  };

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteClick = (vehicleClass) => {
    setSelectedOrder(vehicleClass);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    handleDelete();
    toggleDeleteModal();
  };

  async function fetchVehicleClassList() {
    setLoader(true);
    try {
      let res = await fetch(
        `${apiUrl}/api/v1/fleet/getAllVehicleClassList`
      ).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      });
      setVehicleClassList(res);
      setFilteredOrders(res);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("Error while getting vehicle classes");
    }
  }

  const handleUpdate = async () => {
    if (!isCreate) {
      setLoader(true);
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/updateVehicleClass`;

        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Vehicle class updated successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchVehicleClassList();
          setSearchTerm("");
          setLoader(false);

        } else {
          toast.error("Error updating vehicle class", {
            autoClose: 5000,
            position: "top-right",
          });
        }
      } catch (error) {
        setLoader(false);
        console.error("Error updating vehicle class:", error);
      }
    } else {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/createVehicleClass`;
        setLoader(true);
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Vehicle class created successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchVehicleClassList();
          setSearchTerm("");
          // handleBackButton();
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
  const className = selectedOrder?.className?.trim();

  if (!className) {
    setError("This field is mandatory");
    setShowErrorModal(true);
    return;
  }

  if (isCreate) {
    const isDuplicate = vehicleClassList.some(
      (item) =>
        item.className?.toLowerCase() === className.toLowerCase()
    );

    if (isDuplicate) {
      setShowClassDuplicateModal(true);
      return;
    }
  }

  setError("");
  setShowErrorModal(false);
  handleUpdate();
};


  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
  const handleEditVehicleClass = (VehicleClass) => {
    setSelectedOrder(VehicleClass);
    setCreate(false);
    setEditUser(true);
  }

  async function fetchCommonData() {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getVehicleClassCommonData`
      ).then((response) => {
        if (!response.ok) {
          throw new Error("Error while getting common data");
        }
        return response.json();
      });
      setCommonData(res);
    } catch (error) {
      console.log("Error while getting common data");
    }
  }

  return (
    <React.Fragment>
      <div className="page-content pb-0">
        <ToastContainer />
        <Container fluid>
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <Row
                    style={{
                      height: "60px",
                    }}
                    className="mb-4"
                  >
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle className="h1 mb-0 text-3xl font-bold">
                        {isCreate
                          ? "Create Vehicle Class"
                          : editUser
                            ? "Update Vehicle Class"
                            : "Vehicle Class"}
                      </CardTitle>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center h-100">
                      <Toolbar style={{ gap: "10px" }}>
                        {!isCreate && !editUser && (
                          <>
                            <Tooltip title="Create Vehicle Class">
                              <IconButton
                                style={{ backgroundColor: "#8B5CF6" }}
                                onClick={onClickCreateVehicle}
                              >
                                <AddBoxIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() => {
                                  fetchVehicleClassList();
                                  toast.success("Refreshed successfully!", {
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
                        {isCreate && (
                          <>
                            <Tooltip title="Create">
                              <IconButton
                                type="button"  // <- this stops form submission
                                style={{ backgroundColor: "#8B5CF6" }}
                                onClick={handleClick}
                              >
                                <CheckIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Clear Form">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={async () => {
                                  if (isCreate) {
                                    // ✅ Create mode — reset vehicle class form
                                    setSelectedOrder(newVehicleClassObj);
                                    toast.success("Refreshed successfully!", {
                                      autoClose: 3000,
                                      position: "top-right",
                                    });
                                  } else if (selectedOrder?.code) {
                                    // ✅ Edit mode — refresh selected vehicle class
                                    await handleClick(selectedOrder.code);
                                    toast.success("Vehicle class refreshed successfully!", {
                                      autoClose: 3000,
                                      position: "top-right",
                                    });
                                  } else {
                                    // ✅ Table/List mode — refresh full vehicle class list
                                    await fetchVehicleClassList();
                                    toast.success("Refreshed successfully!", {
                                      autoClose: 3000,
                                      position: "top-right",
                                    });
                                  }
                                }}
                              >
                                <RefreshIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>

                            </Tooltip>
                          </>
                        )}
                        {editUser && (
                          <>
                            <Tooltip title="Save">
                              <IconButton
                                type="button"  // <- same fix here
                                style={{ backgroundColor: "#34D399" }}
                                onClick={handleClick}
                              >
                                <SaveIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        {(isCreate || editUser) && (
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
                    (!isCreate && !editUser) && (
                      <div className="flex justify-between items-center gap-4 mb-6 w-full">
                        {/* Left: Type Filter */}
                        <div className="flex-shrink-0">
                          <Select
                            isClearable
                            options={typeOptions}
                            value={typeOptions.find(option => option.value === selectedType)}
                            onChange={(selectedOption) => {
                              setSelectedType(selectedOption ? selectedOption.value : "");
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
                            placeholder="Filter by Type"
                          />
                        </div>

                        {/* Right: Search Field */}
                        <div className="relative flex-shrink-0" style={{ width: '600px' }}>
                          <span className="absolute inset-y-0 left-5 flex items-center text-gray-500 text-xl pointer-events-none">🔍</span>
                          <input
                            type="text"
                            placeholder="Search Vehicle Class..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>

                    )
                  }

                  {
                    isCreate || editUser ? (
                      <RightSide
                        handleDeleteVehClass={handleDelete}
                        commonData={commonData}
                        isCreate={isCreate}
                        selectedOrder={selectedOrder}
                        setSelectedOrder={setSelectedOrder}
                        error={error}
                        setError={setError}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                      />
                    ) : (
                      <>
                        <VehicleClassList
                          currentItems={currentItems}
                          handleEditVehicle={handleEditVehicleClass}
                          handleDeleteClick={handleDeleteClick}
                          loader={loader}
                        />
                        <div className="d-flex justify-content-end">
                          <Pagination className="justify-content-center mt-4">
                            <PaginationItem disabled={currentPage === 1}>
                              <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
                            </PaginationItem>

                            {Array.from({
                              length: Math.ceil(filteredVehicleClasses.length / vehiclePerPage),
                            }).map((_, index) => (
                              <PaginationItem key={index} active={index + 1 === currentPage}>
                                <PaginationLink onClick={() => paginate(index + 1)}>
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}

                            <PaginationItem
                              disabled={currentPage === Math.ceil(filteredVehicleClasses.length / vehiclePerPage)}
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
              Are you sure you want to delete the Vehicle class:{" "}
              <span className="font-semibold">{selectedOrder?.className}</span>?
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
    {showClassDuplicateModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
      <div className="flex justify-between items-center bg-gray-100 px-6 py-4 rounded-t-xl">
        <h3 className="text-lg font-semibold text-gray-800">
          Duplicate Vehicle Class
        </h3>
        <button
          onClick={() => setShowClassDuplicateModal(false)}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>
      </div>

      <div className="px-6 py-4 bg-gray-50 text-gray-800">
      
        <br />
        Vehicle class <strong>{selectedOrder?.className}</strong> is already present.
        <br />
        Please go back to the table and update the existing record.
      </div>

      <div className="flex justify-end items-center gap-2 px-6 py-4 bg-gray-100 rounded-b-xl">
        <button
          onClick={() => setShowClassDuplicateModal(false)}
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
        error={"Class code"}
      />
    </React.Fragment>
  );
};

export default UserManagement;
