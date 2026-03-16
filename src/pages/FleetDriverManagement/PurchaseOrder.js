import React, { useState, useEffect, useRef } from "react";
import { Badge} from "reactstrap";
import ResizableLayout from "./ResizableLayout";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Select from "react-select";
import RightSection from "./RightSection";

const ITEMS_PER_PAGE = 8;
const rowHeight = 56;

const associations = [
  {
    linkType: "Trailer",
    trailer: "Trailer",
    weight: 45000.0,
    weightUOM: "LB",
    weightDescription: "Pound",
    volume: 40000.0,
    volumeUOM: "GL",
    volumeDescription: "Gallon",
    noOfAxle: 2,
  },
  {
    linkType: "Trailer2",
    trailer: "Trailer2",
    weight: 35000.0,
    weightUOM: "LB",
    weightDescription: "Pound",
    volume: 50000.0,
    volumeUOM: "GL",
    volumeDescription: "Gallon",
    noOfAxle: 4,
  },
];


export default function PurchaseOrderManager({ selectedOrder, setSelectedOrder, isCreate, setCreate, driverList, setDriverList, filteredOrders, setFilteredOrders, searchTerm, setSearchTerm, errors, setErrors, handleEditTrailer, editTrailer, setEditTrailer, handleDeleteClick,isLoading,setLoader }) {
  const [currentPage, setCurrentPage] = useState(1);
  // const [isCreate, setCreate] = useState(false);
  const [commonData, setCommonData] = useState([]);
  const [siteFilter, setSiteFilter] = useState("");
  const [visibleRows, setVisibleRows] = useState(5);
  const tableContainerRef = useRef();


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
      setCommonData(res);
      // setLoader(false)
    } catch (error) {
      // setLoader(false)
      console.log("Error while getting common data");
    }
  }

  async function fetchDriverList() {
    setLoader(true)
    setLoader(true);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllDriversList`
      ).then((response) => {
        if (!response.ok) {
          throw new Error("Error while getting drivers");
        }
        return response.json();
      });
      setDriverList(res);
      setFilteredOrders(res);
      setLoader(false);
    } catch (error) {
      console.log("Error while getting trailers");
      setLoader(false);
    } finally {
      setLoader(false);
    }
  }

   useEffect(() => {
    if (isLoading && tableContainerRef.current) {
      const containerHeight = tableContainerRef.current.clientHeight;
      const rowCount = Math.floor(containerHeight / rowHeight);
      setVisibleRows(rowCount || 5);
    }
  }, [isLoading]);

  useEffect(() => {
    fetchDriverList();
    fetchCommonData();
  }, []);

  useEffect(() => {
    const results = driverList.filter((order) => {
      const matchesSite = siteFilter ? order.fcy === siteFilter : true;

      if (!matchesSite) return false;

      const matchesSearch = searchTerm
        ? Object.values(order).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : true;

      return matchesSearch;
    });

    setFilteredOrders(results);
    setCurrentPage(1);
  }, [searchTerm, siteFilter, driverList]);

  const handleUpdate = async () => {
    setLoader(true)
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
          setCreate(false);
        } else {
          toast.error("Error updating driver", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false)
      } catch (error) {
        setLoader(false)
        console.error("Error updating driver", error);
      }
    } else {
      try {
        setLoader(true)
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
          fetchDriverList();
          setSearchTerm("");
          setCreate(false);
        } else {
          toast.error("Error creating driver", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false)
      } catch (error) {
        setLoader(false)
        console.error("Error creating driver:", error);
      }
    }
  };

  const handleDelete = async () => {
    setLoader(true)
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteDriverById?driverId=${selectedOrder.driverId}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Driver deleted successfully", {
          autoClose: 5000,
          position: "top-right",
        });
        setSelectedOrder(null);
        fetchDriverList();
        setSearchTerm("");

      } else {
        toast.error("Error deleting driver", {
          autoClose: 5000,
          position: "top-right",
        });
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.error("Error deleting driver:", error);
    }
  };

  const displayStatus = (active) => {

    if (active === 2)
      return 'Active'
    else
      return 'Inactive'

  }
  const statusColor = {
    2: 'success',
    0: 'warning',
    1: 'danger',
    4: 'info',
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setCreate(false);
    setErrors({
      user: '',
      style: '',
      country: ''
    });
  };

  const onClickCreateDriver = () => {
    // setSelectedOrder(newDriverObj);
    setCreate(true);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredOrders.length / ITEMS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  const siteOptions = [
    { value: "", label: "All Sites" },
    ...[...new Set(driverList.map((d) => d.fcy))].filter(Boolean).map((site) => ({
      value: site,
      label: site,
    })),
  ];

  return (
    <div className="mt-5">
      {isCreate || editTrailer ? (
        <RightSection
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          associations={associations}
          handleUpdate={handleUpdate}
          isCreate={isCreate}
          handleDelete={handleDelete}
          commonData={commonData}
          errors={errors}
          setErrors={setErrors}
          setEditTrailer={setEditTrailer}
          setCreate={setCreate}
        />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 px-x">
            <Select
              isClearable
              options={siteOptions}
              value={siteOptions.find((option) => option.value === siteFilter)}
              onChange={(selectedOption) => {
                setSiteFilter(selectedOption ? selectedOption.value : "");
                setCurrentPage(1); // optional, to reset pagination
              }}
              placeholder="Select Site"
              styles={{
                control: (base, state) => ({
                  ...base,
                  width: 300,
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  borderRadius: '9999px',
                  borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
                  boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
                  '&:hover': {
                    borderColor: '#3b82f6',
                  },
                  minHeight: '42px',
                }),
                placeholder: (base) => ({
                  ...base,
                  color: '#4b5563',
                }),
                indicatorsContainer: (base) => ({ 
                  ...base,
                  paddingRight: '6px',
                }),
                clearIndicator: (base) => ({
                  ...base,
                  padding: '4px',
                  cursor: 'pointer',
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  padding: '4px',
                  cursor: 'pointer',
                }),
              }}
            />
            <input
              type="text"
              placeholder="🔍 Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 px-4 py-3 border border-gray-800 shadow-lg focus:shadow-xl rounded-full text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="bg-white shadow-sm rounded">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto" ref={tableContainerRef}>
                <table className="min-w-full text-left border-collapse">
                  <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-black uppercase text-sm tracking-wider shadow-sm">
                    <tr className="font-bold text-center">
                      <th className="px-6 py-4 font-semibold">Loader ID</th>
                      <th className="px-6 py-4 font-semibold">Driver</th>
                      <th className="px-6 py-4 font-semibold">Carrier</th>
                      <th className="px-6 py-4 font-semibold">Site</th>
                      <th className="px-6 py-4 font-semibold">Active</th>
                      <th className="px-6 py-4 font-semibold ">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
                    {isLoading
                      ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                        <tr key={i} className="animate-pulse text-center">
                          {Array.from({ length: 6 }).map((__, j) => (
                            <td key={j} className="px-6 py-4">
                              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                            </td>
                          ))}
                        </tr>
                      ))
                      : currentItems.map((order, i) => (
                        <tr
                          key={i}
                          className="hover:bg-blue-50 transition duration-200 text-center odd:bg-gray-50"
                          onClick={() => handleOrderSelect(order)}
                          style={{
                            cursor: "pointer",
                            backgroundColor:
                              selectedOrder?.driverId === order?.driverId ? "lightblue" : "",
                          }}
                        >
                          <td className="px-6 py-3 font-medium whitespace-nowrap">{order.driverId}</td>
                          <td className="px-6 py-3 whitespace-nowrap">{order.driver}</td>
                          <td className="px-6 py-3 whitespace-nowrap">{order.bptnum}</td>
                          <td className="px-6 py-3 whitespace-nowrap">{order.fcy}</td>
                          <td className="px-6 py-3">
                            <Badge color={statusColor[order.active]} pill className="px-3 py-2">
                              {displayStatus(order.active)}
                            </Badge>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            <EditIcon
                              style={{ color: "orange" }}
                              className="inline-flex items-center text-sm hover:text-orange-800 font-medium transition mr-3"
                              onClick={() => handleEditTrailer(order)}
                            />
                            <DeleteIcon
                              className="inline-flex items-center text-sm text-red-600 hover:text-red-800 font-medium transition"
                              onClick={() => {
                                setSelectedOrder(order);
                                handleDeleteClick();
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* {filteredOrders.length > ITEMS_PER_PAGE && (
            <Pagination className="justify-content-center mt-4">
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  previous
                  onClick={() => setCurrentPage(currentPage - 1)}
                  style={{
                    backgroundColor: "#007bff",
                    borderColor: "white",
                    color: "white",
                    padding: "8px 15px",
                    fontSize: "1.1rem",
                  }}
                />
              </PaginationItem>
              <PaginationItem disabled={currentPage === pageNumbers.length}>
                <PaginationLink
                  next
                  onClick={() => setCurrentPage(currentPage + 1)}
                  style={{
                    backgroundColor: "#007bff",
                    borderColor: "white",
                    color: "white",
                    padding: "8px 15px",
                    fontSize: "1.1rem",
                  }}
                />
              </PaginationItem>
            </Pagination>
          )} */}
          {filteredOrders.length > ITEMS_PER_PAGE && (
            <div className="flex justify-end mt-6">
              <ul className="inline-flex items-center space-x-1">
                {/* Previous Button */}
                <li>
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                  >
                    Previous
                  </button>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => setCurrentPage(number)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === number
                        ? "bg-blue-700 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                      {number}
                    </button>
                  </li>
                ))}

                {/* Next Button */}
                <li>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === pageNumbers.length
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          )}


        </>
      )}
    </div>
  );


  // return (
  //   <ResizableLayout
  //     leftSide={LeftSide}
  //     rightSide={RightSide}
  //     initialLeftWidth={40}
  //     minLeftWidth={20}
  //     maxLeftWidth={80}
  //     selectedOrder={selectedOrder}
  //     setSelectedOrder={setSelectedOrder}
  //     associations={associations}
  //     handleUpdate={handleUpdate}
  //     isCreate={isCreate}
  //     handleDelete={handleDelete}
  //     commonData={commonData}
  //     errors={errors}
  //     setErrors={setErrors}
  //   />
  // );
}
