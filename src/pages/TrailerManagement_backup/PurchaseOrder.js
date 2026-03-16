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

const newTrailerObj = {
  rowid: null,
  updTick: 0,           
  trailer: "",
  des: "",
  type: "",
  linkTo: "",
  maxLen: "",
  maxWid: "",
  maxFH: "",
  maxLovol: "",
  maxLoams: "",
  curbWei: "",
  gvwr: "",
  nbaxle: "",
  make: "",
  model: "",
  annee: "",
  lastInsp: "",
  comment: "",
  creatDateTime: "",
  updateDateTime: "",
  auuid: "",
  fcy: "",
  xmaxlovol: "L",
  xmaxloams: "KG",
  xtrktyp: " ",
  xtracpy: " ",
  xadrcer: " ",
  xtrkisoa: 1,
  aasref: " ",
  xdeposit: 1,
  xsideope: 0,
  longueur: 3,
  largeur: 1,
  xseril: 0,
  xsermgtcod: 0,
  xlotmgtcod: 0,
  xstomgtcod: 0,
  xrentable: 0,
  xgndocc: 0.0,
  xacccod: "",
  xsalesunit: "",
  xtailgate: 0,
  styzon: "",
  xuvycod: "",
  xbathght: 0.0,
  xinsptyp0: "",
  xinsptyp1: "",
  xlstchk0: "",
  xlstchk1: "",
  xperiodicity0: 0,
  xperiodicity1: 0,
  xnextvisit0: "",
  xnextvisit1: "",
  xtypein0: 0,
  xtypein1: 0,
  xmaxpalcou: 0,
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
//const apiUrl = process.env.REACT_APP_API_URL;

export default function PurchaseOrderManager({selectedOrder,setSelectedOrder,isCreate,setCreate,setLoader}) {
  // const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [trailerList, setTrailerList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState(trailerList);
  // const [isCreate, setCreate] = useState(false);
  const [commonData, setCommonData] = useState([]);

  async function fetchCommonData() {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getTrailerCommonData`
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

  async function fetchTrailerList() {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllTrailers`).then(
        (response) => {
          // Check if response is successful
          if (!response.ok) {
            throw new Error("Error while getting trailers");
          }
          return response.json(); // Parse JSON data
        }
      );
      setTrailerList(res);
      setFilteredOrders(res);
    } catch (error) {
      console.log("Error while getting trailers");
    }
  }

  useEffect(() => {
    fetchTrailerList();
    fetchCommonData();
  }, []);

  const handleUpdate = async () => {
    if (!isCreate) {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/updateTrailer`;

        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Trailer updated successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchTrailerList();
          setSearchTerm("");
        } else {
          toast.error("Error updating trailer", {
            autoClose: 5000,
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Error updating trailer", error);
      }
    } else {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/createTrailer`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOrder),
        });

        if (response.ok) {
          toast.success("Trailer created successfully", {
            autoClose: 5000,
            position: "top-right",
          });
          fetchTrailerList();
          setSearchTerm("");
        } else {
          toast.error("Error creating trailer", {
            autoClose: 5000,
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Error creating trailer:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteTrailerByTrailerCode?trailer=${selectedOrder.trailer}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Trailer deleted successfully", {
          autoClose: 5000,
          position: "top-right",
        });
        setSelectedOrder(null);
        fetchTrailerList();
        setSearchTerm("");
      } else {
        toast.error("Error deleting trailer", {
          autoClose: 5000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error deleting trailer:", error);
    }
  };

  useEffect(() => {
    const results = trailerList.filter((order) =>
      Object.values(order).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    console.log(results, "results checking for state set");
    setFilteredOrders(results);
    setCurrentPage(1);
  }, [searchTerm, trailerList]);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setCreate(false);
  };

  const onClickCreateTrailer = () => {
    setSelectedOrder(newTrailerObj);
    setCreate(true);
  };

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
      <CardHeader className="d-flex justify-content-between align-items-center  bg-white">
        <div className="flex-grow-1 mr-3">
          <Input
            type="text"
            placeholder="Search trailer..."
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
          onClick={onClickCreateTrailer}
          className="mt-1 ml-2"
        >
          Create Trailer
        </Button> */}
      </CardHeader>
      <CardBody
        className="overflow-auto"
        style={{ height: "calc(100vh - 156px)" }}
      >
        <Table hover responsive striped>
          <thead>
            <tr>
              <th>Trailer</th>
              <th>Description</th>
              <th>Site</th>
              <th>Type</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr
                key={order.rowid}
                onClick={() => handleOrderSelect(order)}
                style={{ cursor: "pointer" }}
              >
                <td>{order.trailer}</td>
                <td>{order.des}</td>
                <td>{order.fcy}</td>
                <td>{order.type}</td>
                <td>{order.model}</td>
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
    />
  );
}
