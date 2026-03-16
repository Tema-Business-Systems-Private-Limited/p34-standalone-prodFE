import React, { Component, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurchaseOrder from "./PurchaseOrder";
import "./css/vehicleClass.css";
import { Link } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ButtonGroup,
  Button,
  Input,
  Label,
  FormGroup,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import ThreeDotMenu from "./components/ThreeDotMenu";

const apiUrl = process.env.REACT_APP_API_URL;
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
const UserManagement = () => {
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [sites, setSites] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState({});
  const [listUsers, setListUsers] = useState("block");
  const [detailUser, setDetailUser] = useState("none");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreate, setCreate] = useState(false);

  const onClickCreateVehicle = () => {
    setSelectedOrder(newVehicleClassObj);
    setCreate(true);
  };

  async function fetchUpdatedVehClassOnRefresh(codeyve) {
    setLoader(true);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getVehicleClassByClass?className=${codeyve}`;

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
      console.log("Vehicle Data:", data); // Handle the data as needed
      return data;
    } catch (error) {
      setLoader(false);
      console.error("Error fetching vehicle data:", error);
      throw error; // Re-throw the error for further handling if needed
    }
  }

  return (
    <React.Fragment>
      <div className="page-content pb-0">
        <ToastContainer />
        <Container fluid>
          <LoadingOverlay active={loader} spinner text="Loading please wait...">
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <Row
                      style={{
                        // backgroundColor: "currentcolor",
                        height: "60px",
                      }}
                       className="bg-light"
                    >
                      <Col md="6" className="d-flex align-items-center">
                        <CardTitle
                         className="h1 mb-0"
                         style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                          Vehicle Class
                        </CardTitle>
                      </Col>
                      <Col
                        md="6"
                        className="d-flex justify-content-end align-items-center h-100"
                      >
                        {/* <Button color="success" outline className="m-1">
                          Vehicle Class Association
                        </Button> */}

                        <Button
                          style={{
                            borderRadius: "50px",
                            padding: "0.4rem 1.5rem",
                          }}
                          className="mr-2"
                          color="success"
                          onClick={onClickCreateVehicle}
                        >
                          Create Vehicle Class
                        </Button>

                        {selectedOrder && (
                          <RefreshIcon
                            onClick={() =>
                              fetchUpdatedVehClassOnRefresh(selectedOrder.className)
                            }
                            style={{
                              color: "#198754",
                              cursor: "pointer",
                              fontSize: "30px",
                            }}
                          />
                        )}
                      </Col>
                    </Row>
                    <PurchaseOrder
                      selectedOrder={selectedOrder}
                      setSelectedOrder={setSelectedOrder}
                      isCreate={isCreate}
                      setCreate={setCreate}
                      setLoader={setLoader}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </LoadingOverlay>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserManagement;
