import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import RightSide from "./RightSection";
import SiteList from "./components/SiteList";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "react-select";
import ErrorModal from "./components/ErrorModal";

const newSiteClassObj = {
  siteId: "",
  siteName: "",
  fcysho: "",
  cry: "",
  bpaadd: "",
  updusr: "",
  upddat: "",
  credattim: "",
  upddattim: "",
  xx10cGeoy: "",
  xx10cGeox: "",
  xtmsfcy: 0,
  xupdusr: "",
  xupdate: "",
  x1cgeoso: 0,
  xadd: "",
  xadddes: "",
  locategeoby: "",
  rowid: null,
};

const SiteConfiguration = () => {
  const [loader, setLoader] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreate, setCreate] = useState(false);
  const [geoList, setGeoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [siteOptions, setSiteOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [typeOptions, setTypeOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [siteList, setSiteList] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [trailerToDelete, setTrailerToDelete] = useState(null);
  const [commonData, setCommonData] = useState({
    siteList: [],
    typeList: [],
    countryList: [],
    inspectionList: [],
  });
  const [error, setError] = useState({});
  const [trailersPerPage] = useState(7);

  // 🔹 API Calls
  const fetchCommonData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getDriverCommonData`
      );
      if (!res.ok) throw new Error("Error while getting common data");
      const data = await res.json();
      setCommonData(data);
    } catch {
      console.log("Error while getting common data");
    }
  };

  const fetchSiteList = async (showToast = false) => {
    setLoader(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/sync/allsites`
      );
      if (!res.ok) throw new Error("Error while getting sites");
      const data = await res.json();
      setSiteList(data.data);
      if (showToast) {
        toast.success("Site list refreshed successfully!", {
          autoClose: 3000,
          position: "top-right",
        });
      }
    } catch {
      if (showToast) {
        toast.error("Failed to refresh site data", {
          autoClose: 3000,
          position: "top-right",
        });
      }
    } finally {
      setLoader(false);
    }
  };

  const fetchUpdatedSiteOnRefresh = async (siteId) => {
    setLoader(true);
    try {
      if (siteId) {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/sync/allsites=${siteId}`
        );
        if (!res.ok) throw new Error("Error fetching site data");
        const data = await res.json();
        setSelectedOrder(data);
        toast.success("Site data refreshed successfully!", {
          autoClose: 3000,
          position: "top-right",
        });
      } else {
        await fetchSiteList(true);
      }
    } catch {
      toast.error("Failed to refresh site data", {
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setLoader(false);
    }
  };

  // 🔹 Handlers
  const onClickCreateSite = () => {
    setSelectedOrder(newSiteClassObj);
    setCreate(true);
  };

  // 🔹 Effects
  useEffect(() => {
    fetchCommonData();
    fetchSiteList();
  }, []);

  useEffect(() => {
    if (commonData?.siteList?.length > 0) {
      const options = commonData.siteList.map((site) => ({
        value: site.value,
        label: site.value,
      }));
      setSiteOptions(options);
    }
  }, [commonData]);

  useEffect(() => {
    if (geoList.length > 0) {
      const uniqueTypes = Array.from(
        new Set(geoList.map((g) => g.x1cgeoso).filter((x) => x !== 0))
      );
      const options = uniqueTypes.map((type) => ({
        value: type,
        label: type === 1 ? "Allow" : type === 2 ? "Deny" : `Type ${type}`,
      }));
      setTypeOptions(options);
    }
  }, [geoList]);

  // 🔹 Filtering + Pagination
  const filteredSites = siteList.filter(site => {
  const search = searchTerm?.toLowerCase() || "";

  const matchesSearch =
    (site.siteId ?? "").toLowerCase().includes(search) ||
    (site.siteName ?? "").toLowerCase().includes(search) 
 

  const matchesSelectedSite = selectedSite
    ? site.siteId === selectedSite
    : true;

  return matchesSearch && matchesSelectedSite;
});



  const totalPages = Math.ceil(filteredSites.length / trailersPerPage);
  const paginatedSites = filteredSites.slice(
    (currentPage - 1) * trailersPerPage,
    currentPage * trailersPerPage
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
                  {/* Header Toolbar */}
                  <Row style={{ height: "60px" }} className="mb-4">
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle className="h1 mb-0 text-3xl font-bold">
                        {isCreate
                          ? "Sites"
                          : editUser
                            ? "Update Sites"
                            : "Site Configuration"}
                      </CardTitle>
                    </Col>
                    <Col
                      md="6"
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Toolbar style={{ gap: "10px" }}>
                        {!isCreate && !editUser && (
                          <>
                            <Tooltip title="Create Site Configuration">
                              <IconButton
                                style={{ backgroundColor: "#8B5CF6" }}
                                onClick={onClickCreateSite}
                              >
                                <AddBoxIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() => fetchSiteList(true)}
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
                                onClick={() => console.log("Create clicked")}
                              >
                                <CheckIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Clear Form">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() => setSelectedOrder(newSiteClassObj)}
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
                        {editUser && !isCreate && (
                          <>
                            <Tooltip title="Save">
                              <IconButton
                                style={{ backgroundColor: "#34D399" }}
                                onClick={() => console.log("Save clicked")}
                              >
                                <SaveIcon style={{ fontSize: 25, color: "white" }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Refresh">
                              <IconButton
                                style={{ backgroundColor: "#238C5C" }}
                                onClick={() =>
                                  fetchUpdatedSiteOnRefresh(selectedOrder?.siteId)
                                }
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

                  {/* Main Content */}
                  {isCreate || editUser ? (
                    <RightSide
                      selectedOrder={selectedOrder}
                      setSelectedOrder={setSelectedOrder}
                      isCreate={isCreate}
                      error={error}
                      setError={setError}
                      commonData={commonData}
                      siteList={siteList}
                    />
                  ) : (
                    <>
                      {/* Search & Filter */}
                      <div className="flex justify-end items-center gap-4 mb-6">
                        {/* <Select
                          isClearable
                          options={[
                            { value: "", label: "All Sites" },
                            ...siteList.map((site) => ({
                              value: site.siteId,
                              // label: site.siteName,
                            })),
                          ]}
                          value={
                            selectedSite
                              ? { value: selectedSite.siteId }
                              : { value: "", label: "All Sites" }
                          }
                          onChange={(selectedOption) => {
                            setSelectedSite(selectedOption?.value || "");
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
                        /> */}
                        <div className="relative" style={{ width: "600px" }}>
                          <span className="absolute inset-y-0 left-5 flex items-center text-gray-500 text-xl pointer-events-none">
                            🔍
                          </span>
                          <input
                            type="text"
                            placeholder="Search Site..."
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setCurrentPage(1);
                            }}
                            className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>

                      {/* Site List */}
                      <SiteList siteList={paginatedSites} loader={loader} />

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

                          {Array.from({ length: totalPages }).map((_, index) => (
                            <PaginationItem
                              key={index}
                              active={index + 1 === currentPage}
                            >
                              <PaginationLink
                                onClick={() => setCurrentPage(index + 1)}
                                style={{
                                  border: "1px solid #ccc",
                                  color:
                                    index + 1 === currentPage ? "#fff" : "#5664D2",
                                  backgroundColor:
                                    index + 1 === currentPage ? "#6366F1" : "white",
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

                          <PaginationItem disabled={currentPage === totalPages}>
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
                onClick={() => setDeleteModal(false)}
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
                onClick={() => console.log("Confirm delete")}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteModal(false)}
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
