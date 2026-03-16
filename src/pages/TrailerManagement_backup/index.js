// import React, { Component } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import LoadingOverlay from "react-loading-overlay";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PurchaseOrder from "./PurchaseOrder";
// import "./css/vehicleClass.css";
// import { Link } from 'react-router-dom';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
//   Nav,
//   NavItem,
//   NavLink,
//   TabContent,
//   TabPane,
//   ButtonGroup,
//   Button,
//   Input,
//   Label,
//   FormGroup,
//   Table,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Form,
// } from "reactstrap";
// import ThreeDotMenu from "./components/ThreeDotMenu";

// const apiUrl = process.env.REACT_APP_API_URL;

// export default class UserManagement extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loader: false,
//       users: [],
//       addUser: false,
//       editUser: false,
//       selectedUser: "",
//       sites: [],
//       selectedUserDetails: {},
//       listusers: "block",
//       detailuser: "none",
//     };
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <div
//           className="page-content pb-0"
//           // style={{ height: "100vh", margin: 0, overflow: "hidden" }}
//         >
//           <ToastContainer />
//           <Container fluid>
//             <LoadingOverlay
//               active={this.state.loader}
//               spinner
//               text="Loading please wait..."
//             >
//               <Row>
//                 <Col xs="12">
//                   <Card>
//                     <CardBody>
//                       <Row
//                         style={{
//                           backgroundColor: "currentcolor",
//                           height: "50px",
//                         }}
//                       >
//                         <Col md="6" className="d-flex align-items-center">
//                           <CardTitle
//                             className="h1 mb-0 "
//                             style={{ color: "white" }}
//                           >
//                             Trailer
//                           </CardTitle>
//                         </Col>
//                       </Row>
//                       <PurchaseOrder />
//                     </CardBody>
//                   </Card>
//                 </Col>
//               </Row>
//             </LoadingOverlay>
//           </Container>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import RefreshIcon from "@mui/icons-material/Refresh";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurchaseOrder from "./PurchaseOrder";
import "./css/vehicleClass.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";

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

  const onClickCreateTrailer = () => {
    setSelectedOrder(newTrailerObj);
    setCreate(true);
  };

  async function fetchUpdatedTrailerOnRefresh(trailer) {
    setLoader(true);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getTrailerByTrailerCode?trailer=${trailer}`;

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
      console.error("Error fetching trailer data:", error);
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
                          // style={{ color: "white" }}
                        >
                          Trailer
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
                          className="mr-2"
                          color="success"
                          style={{
                            borderRadius: "50px",
                            padding: "0.4rem 1.5rem",
                          }}
                          onClick={onClickCreateTrailer}
                        >
                          Create Trailer
                        </Button>
                        {selectedOrder && (
                          <RefreshIcon
                            onClick={() =>
                              fetchUpdatedTrailerOnRefresh(
                                selectedOrder.trailer
                              )
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
