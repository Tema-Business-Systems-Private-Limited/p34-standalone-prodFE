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
import ResizableLayout from "./ResizableLayout";
import { toast } from "react-toastify";



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
//const apiUrl = process.env.REACT_APP_API_URL;

export default function PurchaseOrderManager({selectedOrder,setSelectedOrder,isCreate,setCreate,setLoader}) {
  // const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [driverList, setDriverList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState(driverList);
  // const [isCreate, setCreate] = useState(false);
  const [commonData, setCommonData] = useState([]);
  const [errors, setErrors] = useState({
    user: selectedOrder?.driverId.trim()?"This field is mandatory":"",
    style: selectedOrder?.styzon.trim()?"This field is mandatory":"",
    country: selectedOrder?.cry.trim()?"This field is mandatory":""
  });
  

  async function fetchCommonData() {
    setLoader(true)
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
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("Error while getting common data");
    }
  }

  async function fetchDriverList() {
    setLoader(true)
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllDriversList`
      ).then((response) => {
        // Check if response is successful
        if (!response.ok) {
          throw new Error("Error while getting drivers");
        }
        return response.json(); // Parse JSON data
      });
      setDriverList(res);
      setFilteredOrders(res); 
      setLoader(false);

    } catch (error) {
      console.log("Error while getting trailers");
    }
  }

  useEffect(() => {
    fetchDriverList();
    fetchCommonData();
  }, []);

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

  useEffect(() => {
    const results = driverList.filter((order) =>
      Object.values(order).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    console.log(results, "results checking for state set");
    setFilteredOrders(results);
    setCurrentPage(1);
  }, [searchTerm, driverList]);

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

  const LeftSide = (
    <Card className="h-100 m-0">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <div className="flex-grow-1 mr-3">
          <Input
            type="text"
            placeholder="Search driver..."
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
      
      </CardHeader>
      <CardBody
        className="overflow-auto"
        style={{ height: "calc(100vh - 156px)" }}
      >
        <Table hover responsive striped>
          <thead>
            <tr>
              <th>Loader ID</th>
              <th>Driver</th>
              <th>Carrier</th>
              <th>Site</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order,i) => (
              <tr
                key={i}
                onClick={() => handleOrderSelect(order)}
                style={{ cursor: "pointer" }}
              >
                <td>{order.driverId}</td>
                <td>{order.driver}</td>
                <td>{order.bptnum}</td>
                <td>{order.fcy}</td>
                <td>{order.active === 2 ? "Yes" : "No"}</td>
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
      commonData={commonData}
      errors={errors}
      setErrors={setErrors}
    />
  );
}
