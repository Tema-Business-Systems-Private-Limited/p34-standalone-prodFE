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
} from "reactstrap";
import { Search } from "react-feather";
import ResizableLayout from "./ResizableLayout";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

// Mock data for purchase orders
const newVehicleClassObj = {
  rowid: null,
  desc: "",
  className: "",
  enaFlag: 2,
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

const mockPurchaseOrders = [
  {
    id: 1,
    date: "12/01/24",
    description: "Bobtail truck and tanker",
    code: "BOBTAIL",
    active: true,
    type: "Single unit",
    country: "US",
    noOfAxle: 2,
    maxWeight: 45000.0,
    weightUOM: "LB",
    maxVolume: 40000,
    volumeUOM: "GL",
    skillNumber: 0,
    inspCheckIn: "INS024110002",
    inspCheckInMndt: "No",
    inspCheckOut: "INS024110003",
    inspCheckOutMndt: "No",
  },
  {
    id: 2,
    date: "12/01/24",
    description: "26ft Box Truck rigged",
    code: "BOXTRUCK",
    active: true,
    type: "Single unit",
  },
  {
    id: 3,
    date: "12/01/24",
    description: "Central Oil Vehicle Class",
    code: "CO100",
    active: true,
    type: "Single unit",
  },
  {
    id: 4,
    date: "12/01/24",
    description: "Truck Tractor with 5th wheel",
    code: "TRACTOR",
    active: true,
    type: "Single unit",
  },
  {
    id: 5,
    date: "12/01/24",
    description: "Bobtail truck and tanker",
    code: "BOBTAIL",
    active: true,
    type: "Single unit",
  },
  {
    id: 6,
    date: "12/01/24",
    description: "Bobtail truck and tanker",
    code: "BOBTAIL",
    active: true,
    type: "Single unit",
  },
  {
    id: 7,
    date: "12/01/24",
    description: "Bobtail truck and tanker",
    code: "BOBTAIL",
    active: true,
    type: "Single unit",
  },
];

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
  allocationList,
  setAllocationList,
  filteredOrders,
  setFilteredOrders,
  errors,
  setErrors,
  searchTerm,
  setSearchTerm,
}) {
  // const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // const [isCreate, setCreate] = useState(false);

  const [commonData, setCommonData] = useState([]);

  
  
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

  async function fetchAllocationsList() {
    setLoader(true);
    try {
      let res = await fetch(
        `${apiUrl}/api/v1/fleet/getAllAllocationsList`
      ).then((response) => {
        // Check if response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON data
      });
      setSelectedOrder(res[0]?res[0]:null)
      setAllocationList(res);
      setFilteredOrders(res);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("Error while getting vehicle classes");
    }
  }

  useEffect(() => {
    fetchAllocationsList();
    fetchCommonData();
  }, []);

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
          toast.success("Allocation updated successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchAllocationsList();
          setSearchTerm("");
          setLoader(false);
        } else {
          toast.error("Error updating allocation", {
            autoClose: 5000,
            position: "top-right",
          });
        }
      } catch (error) {
        setLoader(false);
        console.error("Error updating allocation:", error);
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
          toast.success("Allocation created successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchAllocationsList();
          setSearchTerm("");
        } else {
          toast.error("Error creating allocation", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error creating allocation:", error);
      }
    }
  };

  const handleDelete = async () => {
    setLoader(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteAllocationByTransaction?transactionNumber=${selectedOrder.transactionNumber}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Allocation deleted successfully", {
          autoClose: 5000,
          position: "top-right",
        });
        setSelectedOrder(null);
        fetchAllocationsList();
        setSearchTerm("");
      } else {
        toast.error("Error deleting allocation", {
          autoClose: 5000,
          position: "top-right",
        });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error deleting allocation:", error);
    }
  };

  useEffect(() => {
    const results = allocationList.filter((order) =>
      Object.values(order).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    console.log(results, "results checking for state set");
    setFilteredOrders(results);
    setCurrentPage(1);
  }, [searchTerm, allocationList]);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setCreate(false);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredOrders.length / ITEMS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  console.log(selectedOrder, "this is selected order checking");
  const LeftSide = (
    <Card className="h-100 m-0">
      <CardHeader className="d-flex justify-content-between align-items-center bg-white">
        <div className="flex-grow-1 mr-3">
          <Input
            type="text"
            placeholder="Search allocation..."
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
            <tr className="bg-secondary" style={{fontWeight:"bold", color:"white"}}>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
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
                  backgroundColor: selectedOrder?.transactionNumber === order?.transactionNumber ? "lightblue" : "",
                }}                
              >
                <td>{order.vehicleNumber}</td>
                <td>{order.driverId}</td>
                <td>
                  {order.startDate !== "1753-01-01T00:00:00.000+00:00"
                    ? moment(order.startDate).format("MM/DD/YY")
                    : ""}
                </td>
                <td>
                  {order.endDate !== "1753-01-01T00:00:00.000+00:00"
                    ? moment(order.endDate).format("MM/DD/YY")
                    : ""}
                </td>
                <td>
                  {
                    commonData?.statusList?.find(
                      (item) => item.value == order.status
                    )?.label
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );

  const RightSide = (
    <Card className="h-100 m-0">
      <CardBody
        className="overflow-auto"
        style={{ height: "calc(100vh - 156px)" }}
      >
        {selectedOrder ? (
          <Form>
            {/* Responsive Form Layout */}
            <div className="responsive-form">
              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="typeOfOrder">Class Code</Label>
                <Input
                  type="text"
                  name="classCode"
                  id="classCode"
                  value={selectedOrder.code}
                  readOnly
                />
              </FormGroup>

              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="order">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={selectedOrder.description}
                  readOnly
                />
              </FormGroup>

              <FormGroup check className="form-item checkbox-input">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={selectedOrder.active}
                    onChange={() => {
                      setSelectedOrder({
                        ...selectedOrder,
                        active: !selectedOrder.active,
                      });
                    }}
                  />{" "}
                  Active
                </Label>
              </FormGroup>

              {/* Dropdown */}
              <FormGroup className="form-item dropdown-input">
                <Label for="orderSite">Site</Label>
                <Input
                  type="select"
                  name="orderSite"
                  id="orderSite"
                  value={selectedOrder.orderSite}
                >
                  <option>{selectedOrder.orderSite}</option>
                </Input>
              </FormGroup>

              {/* Dropdown */}
              <FormGroup className="form-item dropdown-input">
                <Label for="vehicleClass">Vehicle Class</Label>
                <Input
                  type="select"
                  name="vehicleClass"
                  id="vehicleClass"
                  value={selectedOrder.code}
                >
                  <option>{selectedOrder.code}</option>
                </Input>
              </FormGroup>

              {/* Save Button */}
              <div className="form-item button-input">
                <Button color="primary" block>
                  Save Changes
                </Button>
              </div>
            </div>
          </Form>
        ) : (
          <p>Select a Vehicle to view details</p>
        )}
      </CardBody>
    </Card>
  );

  return (
    <ResizableLayout
      leftSide={LeftSide}
      rightSide={RightSide}
      initialLeftWidth={40}
      minLeftWidth={20}
      maxLeftWidth={80}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      associations={associations}
      handleUpdate={handleUpdate}
      isCreate={isCreate}
      handleDelete={handleDelete}
      errors={errors}
      setErrors={setErrors}
      commonData={commonData}
    />
  );
}
