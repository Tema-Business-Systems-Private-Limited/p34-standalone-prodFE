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
//                             Driver Management
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
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurchaseOrder from "./PurchaseOrder";
import "./css/vehicleClass.css";
import { Link } from "react-router-dom";
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
const newDriverObj = {
  rowId: null,
  updTick: 0,
  driverId: "",
  driver: "",
  active: 1,
  bptnum: "",
  lanmain: "",
  lansec: "",
  cry: "",
  bir: "",
  credattim: "",
  upddattim: "",
  auuid: "",
  creusr: "",
  updusr: "",
  bpaaddlig0: "",
  bpaaddlig1: "",
  bpaaddlig2: "",
  poscod: "",
  cty: "",
  mob: "",
  web: "",
  licenum: "",
  licedat: "",
  licetyp: 1,
  validat: "",
  delivby: "",
  lastvime: "",
  fcy: "",
  sat: "",
  tel0: "",
  tel1: "",
  tel2: "",
  tel3: "",
  tel4: "",
  xuser: "",
  xpwd: "",
  xpwd1: "",
  xsigcon: 1,
  xcamcon: 1,
  xper: 1,
  xlgnflg: 1,
  xbus: "",
  xloginseqno: "",
  xbadnum: "",
  xadrdat: "",
  xdocno: "",
  xx10cGeox: "",
  xx10cGeoy: "",
  xlncstarttim: "",
  xlncdur: "",
  styzon: "",
  xpaycon: 1,
  xuvycod: "",
  xskpcon: 1,
  xrescon: 1,
  xqtychgcon: 1,
  xspotcon: 1,
  xpickupcon: 1,
  xsihcon: 1,
  xlogflag: 0,
  xmacadd: "",
  xdeposit: 0,
  xgeocon: 1,
  xnooftrips: 0,
  xsalerep: 1,
  xdriver: 1,
  xdsd: 1,
  xsalrout: 1,
  xfc0: "",
  xfc1: "",
  xfc2: "",
  xfc3: "",
  xfc4: "",
  xfc5: "",
  xfc6: "",
  xfc7: "",
  xfc8: "",
  xfc9: "",
  xcondriv: 1,
  x1cunion: 0,
  x10cmon: 1,
  x10ctues: 1,
  x10cwed: 1,
  x10cthu: 1,
  x10cfri: 1,
  x10csat: 1,
  x10csun: 1,
  x1coverhrs: 0,
  xmaxhrsday: 0,
  xmaxhrsweek: 0,
  xdriverhrs: 0,
  xallvehicle: 1,
  xuvystrdat: "",
  xuvyenddat: "",
  xlonghaul: 1,
  xvehicleclas: "",
  xvehicleclas1: "",
  xvehicleclas2: "",
  xvehicleclas3: "",
  xvehicleclas4: "",
  xvehicleclas5: "",
  xvehicleclas6: "",
  xvehicleclas7: "",
  xvehicleclas8: "",
  xvehicleclas9: "",
  note: "",
  x10csup: 1,
  x10csupflg: 1,
};
const apiUrl = process.env.REACT_APP_API_URL;

const UserManagement = () => {
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [sites, setSites] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState({});
  const [listUsersDisplay, setListUsersDisplay] = useState("block");
  const [detailUserDisplay, setDetailUserDisplay] = useState("none");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreate, setCreate] = useState(false);

  const onClickCreateDriver = () => {
    setSelectedOrder(newDriverObj);
    setCreate(true);
  };
  console.log(selectedOrder, "this is selected order checking in index");
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
                        backgroundColor: "currentcolor",
                        height: "50px",
                      }}
                    >
                      <Col md="6" className="d-flex align-items-center">
                        <CardTitle
                          className="h1 mb-0"
                          style={{ color: "white" }}
                        >
                          Driver Management
                        </CardTitle>
                      </Col>

                      <Col className="d-flex justify-content-end align-items-center h-100">
                        <Button
                          style={{
                            borderRadius: "50px",
                            padding: "0.4rem 1.5rem",
                          }}
                          color="success"
                          onClick={onClickCreateDriver}
                          className="mt-1 ml-2"
                        >
                          Create Driver
                        </Button>
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
