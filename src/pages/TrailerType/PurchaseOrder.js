import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
} from "reactstrap";
import { Search } from "react-feather";
import ResizableLayout from "./ResizableLayout";
import { ToastContainer, toast } from "react-toastify";

// Mock data for purchase orders

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

const ITEMS_PER_PAGE = 10;
const apiUrl = process.env.REACT_APP_API_URL;

export default function PurchaseOrderManager({
  selectedOrder,
  setSelectedOrder,
  isCreate,
  setCreate,
  setLoader,
  trailerTypeList,
  setTrailerTypeList,
  filteredOrders,
  setFilteredOrders,
  error,
  setError,
  searchTerm,
  setSearchTerm,
}) {
  const [currentPage, setCurrentPage] = useState(1);

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

  async function fetchTrailerTypeList() {
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
      setSelectedOrder(res[0]);
      setTrailerTypeList(res);
      setFilteredOrders(res);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("Error while getting Trailer types");
    }
  }

  useEffect(() => {
    fetchTrailerTypeList();
    fetchCommonData();
  }, []);

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
          toast.success("Trailer type updated successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchTrailerTypeList();
          setSearchTerm("");
          setLoader(false);
        } else {
          toast.error("Error updating Trailer type", {
            autoClose: 5000,
            position: "top-right",
          });
        }
      } catch (error) {
        setLoader(false);
        console.error("Error updating Trailer type:", error);
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
          toast.success("Trailer type created successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchTrailerTypeList();
          setSearchTerm("");
        } else {
          toast.error("Error creating Trailer type", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error creating Trailer type:", error);
      }
    }
  };

  const handleDelete = async () => {
    setLoader(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteTrailerTypeByTrailerCode?trailerCode=${selectedOrder.trailerCode}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Trailer type deleted successfully", {
          autoClose: 5000,
          position: "top-right",
        });
        setSelectedOrder(null);
        fetchTrailerTypeList();
        setSearchTerm("");
      } else {
        toast.error("Error deleting trailer type", {
          autoClose: 5000,
          position: "top-right",
        });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error deleting trailer type:", error);
    }
  };
  useEffect(() => {
  const results = trailerTypeList.filter(
    (order) =>
      order.trailerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.xdes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(results, "filtered trailer types");
  setFilteredOrders(results);
  setCurrentPage(1);
}, [searchTerm, trailerTypeList]);


  // useEffect(() => {
  //   const results = trailerTypeList.filter((order) =>
  //     Object.values(order).some(
  //       (value) =>
  //         typeof value === "string" &&
  //         value.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );

  //   console.log(results, "results checking for state set");
  //   setFilteredOrders(results);
  //   setCurrentPage(1);
  // }, [searchTerm, trailerTypeList]);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setCreate(false);
    setError("");
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredOrders.length / ITEMS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  const displayStatus = (active) => {
    if (active === 2) return "Active";
    else return "Inactive";
  };
  const statusColor = {
    2: "success",
    0: "warning",
    1: "danger",
    4: "info",
  };

  console.log(selectedOrder, "this is selected order checking");
  const LeftSide = (
    <Card className="h-100 m-0">
      <CardHeader className="d-flex justify-content-between align-items-center bg-white">
        <div className="flex-grow-1 mr-3">
          <Input
            type="text"
            placeholder="Search vehicle class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredOrders.length > ITEMS_PER_PAGE && (
          <Pagination className="mb-2">
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
        )}
        {/* <Button
          color="success"
          onClick={onClickCreateVehicleClass}
          className="mt-1 ml-2"
        >
          Create Vehicle Class
        </Button> */}
      </CardHeader>
      <CardBody
        className="overflow-auto"
        style={{ height: "calc(80vh - 156px)" }}
      >
        <Table hover responsive striped>
          <thead>
            <tr
              className="bg-secondary"
              style={{ fontWeight: "bold", color: "white" }}
            >
              <th>Trailer Code</th>
              <th>Description</th>
              <th>Active</th>
              {/* <th>Type</th> */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr
                key={order.rowid}
                onClick={() => handleOrderSelect(order)}
                style={{
                  cursor: "pointer",
                  transition: "background-color 0.7s ease-in-out",
                  backgroundColor:
                    selectedOrder?.trailerCode === order?.trailerCode
                      ? "lightblue"
                      : "",
                }}
              >
                <td>{order.trailerCode}</td>
                <td>{order.xdes}</td>
                <td>
                  <Badge
                    color={statusColor[order.xenaflg]}
                    pill
                    className="px-3 py-2"
                  >
                    {displayStatus(order.xenaflg)}
                  </Badge>
                </td>
                {/* <td>{order.type === 1 ? "Single Unit" : "Multi Unit"}</td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );

  return (
    <ResizableLayout
      leftSide={LeftSide}
      initialLeftWidth={40}
      minLeftWidth={20}
      maxLeftWidth={80}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      associations={associations}
      handleUpdate={handleUpdate}
      isCreate={isCreate}
      handleDelete={handleDelete}
      error={error}
      setError={setError}
      commonData={commonData}
    />
  );
}
