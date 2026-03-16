import React, { useState, useEffect } from "react";
import {
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

export default function PurchaseOrderManager({ selectedOrder, setSelectedOrder, isCreate, setCreate, setLoader, error, setError, searchTerm, setSearchTerm, vehicleClassList, setVehicleClassList, filteredOrders, setFilteredOrders, loader }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [commonData, setCommonData] = useState([]);
 
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

  async function fetchVehicleClassList() {
    setLoader(true)
    try {
      let res = await fetch(
        `${apiUrl}/api/v1/fleet/getAllVehicleClassList`
      ).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      });
      setSelectedOrder(res[0])
      setVehicleClassList(res);
      setFilteredOrders(res);
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("Error while getting vehicle classes");
    }
  }

  useEffect(() => {
    fetchVehicleClassList();
    fetchCommonData();
  }, []);

  const handleUpdate = async () => {
    if (!isCreate) {
      setLoader(true)
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
          setLoader(false)
        } else {
          toast.error("Error updating vehicle class", {
            autoClose: 5000,
            position: "top-right",
          });
        }
      } catch (error) {
        setLoader(false)
        console.error("Error updating vehicle class:", error);
      }
    } else {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/createVehicleClass`;
        setLoader(true)
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

        } else {
          toast.error("Error creating vehicle class", {
            autoClose: 5000,
            position: "top-right",
          });
        }
        setLoader(false)
      } catch (error) {
        setLoader(false)
        console.error("Error creating vehicle class:", error);
      }
    }
  };

  const handleDelete = async () => {
    setLoader(true)
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteVehicleClassByClass?className=${selectedOrder.className}`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
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

      } else {
        toast.error("Error deleting vehicle class", {
          autoClose: 5000,
          position: "top-right",
        });
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.error("Error deleting vehicle class:", error);
    }
  };

  useEffect(() => {
    const results = vehicleClassList.filter((order) =>
      Object.values(order).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    console.log(results, "results checking for state set");
    setFilteredOrders(results);
    setCurrentPage(1);
  }, [searchTerm, vehicleClassList]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredOrders.length / ITEMS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }


  console.log(selectedOrder, "this is selected order checking")
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
        {/* <Table hover responsive striped>
          <thead>
          <tr className="bg-secondary" style={{fontWeight:"bold", color:"white"}}>
              <th>Class Code</th>
              <th>Description</th>
              <th>Active</th>
              <th>Type</th>
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
                  backgroundColor: selectedOrder?.className === order?.className ? "lightblue" : "",
                }}  
              >
                <td>{order.className}</td>
                <td>{order.desc}</td>
                <td> <Badge color={statusColor[order.enaFlag]} pill className="px-3 py-2">
                  { displayStatus(order.enaFlag)}
                    </Badge></td>
                <td>{order.typ === 1 ? "Single Unit" : "Multi Unit"}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
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
      error={error}
      setError={setError}
      commonData={commonData}
    />
  );
}
