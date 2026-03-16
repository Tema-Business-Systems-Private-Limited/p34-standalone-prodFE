import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RightSide from "./RightSection";
import CategoriesList from "./components/CategoriesList";

import RefreshIcon from "@mui/icons-material/Refresh";
import {
  container,
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
import { Container } from "reactstrap";
import ErrorModal from "./components/ErrorModal";
import siteClass from "./css/siteClass.css";


import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "react-select";

const apiUrl = process.env.REACT_APP_API_URL;
const newSiteClassObj = {
tclcod:"",
tclaxx:"",
xtmsspcial:"",
xskills:"",
tclshoaxx:"",
itmrefcou:"",
itmcremod:""
}
const SiteConfiguration = () => {
  const [loader, setLoader] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreate, setCreate] = useState(false);
  const [geoList, setGeoList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [supplierList, setSupplierList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const [selectedSite, setSelectedSite] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [trailerToDelete, setTrailerToDelete] = useState(null);
  const [commonData, setCommonData] = useState({
    typeList: [],
    countryList: [],
    inspectionList: [],
  });

  const [error, setError] = useState({});


  const onClickCreateSite = () => {
    setSelectedOrder(newSiteClassObj);
    setCreate(true);
  };


  async function fetchUpdatedSiteOnRefresh(site) {
    setLoader(true);
    setSelectedOrder(newSiteClassObj);
    const url = " "

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoader(false);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSelectedOrder(data);
      console.log("Trailer Data:", data);


      toast.success("Trailer data refreshed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      return data;
    } catch (error) {
      setLoader(false);
      console.error("Error fetching trailer data:", error);

      toast.error("Failed to refresh trailer data.", {
        position: "top-right",
        autoClose: 3000,
      });

      throw error;
    }
  }
  const handleClick = () => { };
  const handleUpdate = () => {
    console.log("Update called", selectedOrder);
  };

  const fetchTrailerList = () => { };
  const handleDelete = () => { };
  const handleSearch = () => { };
  const toggleDeleteModal = () => { };
  const confirmDelete = () => { };
  const [trailersPerPage, setTrailersPerPage] = useState(10);
  const [siteFilteredOrders, setSiteFilteredOrders] = useState([]);



  useEffect(() => {
    if (geoList.length > 0) {
      const uniqueTypes = Array.from(
        new Set(geoList.map((g) => g.x1cgeoso).filter((x1cgeoso) => x1cgeoso !== 0))
      );
      const options = uniqueTypes.map((type) => ({
        value: type,
        label: type === 1 ? "Allow" : type === 2 ? "Deny" : `Type ${type}`,
      }));
      setTypeOptions(options);
    }
  }, [geoList]);

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
                          ? "Create Product Category"
                          : editUser
                            ? "Update Product Category Stop"
                            : "Product Category"}
                      </CardTitle>
                    </Col>

                    <Col md="6" className="d-flex justify-content-end align-items-center h-100">
                      <Toolbar style={{ gap: "10px" }}>

                        {!isCreate && !editUser && (
                          <>
                            <Tooltip title="Create product Category">
                              <IconButton style={{ backgroundColor: "#8B5CF6" }} onClick={onClickCreateSite}>
                                <AddBoxIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() => {
                                  if (isCreate) {
                                    // if in create mode — reset form
                                    setSelectedOrder(newSiteClassObj);
                                    toast.success("Product category form cleared successfully!", {
                                      position: "top-right",
                                      autoClose: 3000,
                                    });
                                  } else if (editUser && selectedOrder?.trailer) {
                                    // if in edit mode — refresh selected trailer
                                    fetchUpdatedSiteOnRefresh(selectedOrder.trailer);
                                  } else {
                                    // in table/list mode — refresh the full list
                                    fetchTrailerList();
                                  }
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
                              <IconButton style={{ backgroundColor: "#8B5CF6" }} onClick={handleClick}>
                                <CheckIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() => {
                                  setSelectedOrder(newSiteClassObj);
                                  toast.success("Product category form cleared successfully!", {
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
                                onClick={() => fetchUpdatedSiteOnRefresh(selectedOrder?.trailer)}
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
                      selectedOrder={selectedOrder}
                      setSelectedOrder={setSelectedOrder}
                      handleUpdate={handleUpdate}
                      isCreate={isCreate}
                      handleDelete={handleDelete}
                      error={error}
                      setError={setError}
                      commonData={commonData}
                      categoriesList={categoriesList}
                    />
                  ) : (
                    <>
                      {/* Search & Filter */}
                      <div className="flex justify-between items-center gap-4 mb-6">
                        <Select
                          isClearable={true}
                          options={[
                            { value: "", label: "All Category" },
                            ...categoriesList.map((site) => ({ value: site, label: site })),
                          ]}
                          value={
                            selectedSite
                              ? { value: selectedSite, label: selectedSite }
                              : { value: "", label: "All Category" }
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
                            placeholder="Search product category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>

                      {/* Trailer List */}

                      <CategoriesList
                        categoriesList={categoriesList}
                      // sitelist={siteFilteredOrders.slice(
                      //   (currentPage - 1) * trailersPerPage,
                      //   currentPage * trailersPerPage
                      // )}
                      // handleEditTrailer={handleEditTrailer}
                      // handleDeleteClick={handleDeleteClick}
                      // loader={loader}
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

export default SiteConfiguration;

