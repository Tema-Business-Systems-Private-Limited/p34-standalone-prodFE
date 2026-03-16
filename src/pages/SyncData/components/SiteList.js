import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { fetchAllSites } from "../../../service"; // adjust path
import RefreshIcon from "@mui/icons-material/Refresh";

export default function SiteList() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const sitesPerPage = 6; // 👈 same as usersPerPage

  // Fetch sites on first load
  useEffect(() => {
    loadSites();
  }, []);

  // Common function for fetching
  const loadSites = async () => {
    try {
      setLoading(true);
      const response = await fetchAllSites();
      setSites(response.data);
      console.log("Fetched sites:", response);
    } catch (error) {
      console.error("Error fetching sites:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Refresh handler
  const handleRefresh = () => {
    setCurrentPage(1);
    loadSites();
  };

  // Filter sites based on search term
  const filteredSites = sites?.filter((site) =>
    Object.values(site).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastSite = currentPage * sitesPerPage;
  const indexOfFirstSite = indexOfLastSite - sitesPerPage;
  const currentSites = filteredSites.slice(indexOfFirstSite, indexOfLastSite);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const displayTmsFlag = (xtmsfcy) => {
    if (xtmsfcy === 2) return "Active";
    if (xtmsfcy === 1) return "Inactive";
    return "Inactive";
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
                  {/* Header */}
                  <Row style={{ height: "60px" }} className="mb-4">
                    <Col md="6" className="d-flex align-items-center">
                      <h2 className="h1 mb-0 text-black text-3xl font-bold">
                        Sites
                      </h2>
                    </Col>
<Col md="6" className="d-flex justify-content-end align-items-center">
  {/* Search bar with same style as UsersList */}
  <div className="relative flex-shrink-0" style={{ width: '600px' }}>
    <span className="absolute inset-y-0 left-5 flex items-center text-gray-500 text-xl pointer-events-none">
      🔍
    </span>
    <input
      type="text"
      placeholder="Search sites..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // reset to page 1 on search
      }}
      className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  </div>
            <button
            onClick={handleRefresh}
            disabled={loading}
            className={`p-3 rounded-full bg-gray-100 shadow-md transition flex items-center justify-center ${
              loading ? "animate-spin" : "hover:bg-gray-200"
            }`}
            title="Refresh Data"
          >
            <RefreshIcon className="text-blue-600" />
          </button>
</Col>

                  </Row>

                  {/* Table */}
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table bordered>
                        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-black uppercase text-sm tracking-wider shadow-sm">
                          <tr className="font-bold text-center">
                            <th className="px-6 py-4 font-semibold">Site ID</th>
                            <th className="px-6 py-4 font-semibold">Description</th>
                            <th className="px-6 py-4 font-semibold">TMS Flag</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
                          {loading ? (
                            <tr>
                              <td colSpan="4" className="text-center py-4">Loading...</td>
                            </tr>
                          ) : currentSites.length > 0 ? (
                            currentSites.map((site) => (
                              <tr
                                key={site.siteId}
                                className="hover:bg-blue-50 transition duration-200 text-center odd:bg-gray-50"
                              >
                                <td className="px-6 py-3">{site.siteId}</td>
                                <td className="px-6 py-3">{site.siteName}</td>
                                <td className="px-6 py-3">{displayTmsFlag(site.xtmsfcy)}</td>
                                <td className="px-6 py-3">
                                  <Link to={`/syncdata/site/${site.siteId}`}>
                                  <EditIcon
                                    style={{ color: "orange", cursor: "pointer" }}
                                    className="inline-flex items-center text-sm hover:text-orange-800 font-medium transition mr-3"
                                  />
                                  </Link>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center py-4">No sites available</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>

                  {/* Pagination */}
                  <Pagination className="flex justify-end mt-4">
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
                    </PaginationItem>
                    {[...Array(Math.ceil(filteredSites.length / sitesPerPage))].map(
                      (_, index) => (
                        <PaginationItem key={index} active={index + 1 === currentPage}>
                          <PaginationLink onClick={() => paginate(index + 1)}>
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem
                      disabled={currentPage === Math.ceil(filteredSites.length / sitesPerPage)}
                    >
                      <PaginationLink next onClick={() => paginate(currentPage + 1)} />
                    </PaginationItem>
                  </Pagination>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
