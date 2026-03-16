// import React, { Component } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import LoadingOverlay from "react-loading-overlay";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PurchaseOrder from "./PurchaseOrder";
// import "./css/vehicleManagement.css";
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
//                             Management of Vehicles
//                           </CardTitle>
//                         </Col>
//                         {/* <Col className="d-flex justify-content-end algin-items-center h-100">
//                           <ThreeDotMenu />
//                         </Col> */}
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
import "./css/vehicleManagement.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
// import ThreeDotMenu from "./components/ThreeDotMenu";
import RefreshIcon from "@mui/icons-material/Refresh";
// const EmptyFields = {
//   rowId: null,
//   updTick: "",
//   codeyve: "",
//   name: "",
//   startdepotn: "",
//   enddepotname: "",
//   startdepots: "",
//   enddepotserv: "",
//   earliestStart: "",
//   latestStart: "",
//   arriveDepart: "",
//   capacities: "",
//   fixedCost: "",
//   costPerUnitT: "",
//   costPerUnitD: "",
//   overtTimeStart: "",
//   costPerUnitO: "",
//   maxOrderCOU: "",
//   maxTotalTime: "",
//   maxTotalTrav: "",
//   maxTotalDist: "",
//   specialtynam: "",
//   assignmentru: "",
//   fcy: "",
//   bptNum: "",
//   vol: "",
//   vou: "",
//   createDateTime: "",
//   updateDateTime: "",
//   auuid: "",
//   createUser: "",
//   updateUser: "",
//   depotName0: "",
//   depotName1: "",
//   depotName2: "",
//   depotName3: "",
//   depotName4: "",
//   depotName5: "",
//   depotName6: "",
//   depotName7: "",
//   depotName8: "",
//   depotName9: "",
//   serviceTime0: "",
//   serviceTime1: "",
//   serviceTime2: "",
//   serviceTime3: "",
//   serviceTime4: "",
//   serviceTime5: "",
//   serviceTime6: "",
//   serviceTime7: "",
//   serviceTime8: "",
//   serviceTime9: "",
//   allDriver: "",
//   uvycod: "",
//   styzon: "",
//   longueur: "",
//   largeur: "",
//   dimlarg1: "",
//   dimlarg2: "",
//   dimlarg3: "",
//   dimlarg4: "",
//   dimlarg5: "",
//   dimlarg6: "",
//   sectorId: "",
//   ownerShip: "",
//   primmet: "",
//   secdmet: "",
//   reference: "",
//   lastinsp: "",
//   inspexp: "",
//   gpsId: "",
//   mobtrac: "",
//   mobrad: "",
//   fireExit: "",
//   licref: "",
//   licexp: "",
//   licnot: "",
//   vendor: "",
//   insexp: "",
//   insref: "",
//   insnot: "",
//   aasref: "",
//   category: "",
//   brand: "",
//   model: "",
//   color: "",
//   fuelType: "",
//   engicc: "",
//   chasnum: "",
//   insYear: "",
//   roaYear: "",
//   co2em: "",
//   driverId0: "",
//   driverId1: "",
//   driverId2: "",
//   driverId3: "",
//   driverId4: "",
//   driverId5: "",
//   driverId6: "",
//   driverId7: "",
//   driverId8: "",
//   driverId9: "",
//   emptmass: "",
//   gromass: "",
//   pourtol: "",
//   tclcod0: "",
//   tclcod1: "",
//   tclcod2: "",
//   tclcod3: "",
//   tclcod4: "",
//   tclcod5: "",
//   tclcod6: "",
//   tclcod7: "",
//   tclcod8: "",
//   tclcod9: "",
//   allTclCod: "",
//   bpcNum0: "",
//   bpcNum1: "",
//   bpcNum2: "",
//   bpcNum3: "",
//   bpcNum4: "",
//   bpcNum5: "",
//   bpcNum6: "",
//   bpcNum7: "",
//   bpcNum8: "",
//   bpcNum9: "",
//   allBPCNum: "",
//   trailer: "",
//   sdhtyp: "",
//   xloc: "",
//   xloctyp: "",
//   xissemirate: "",
//   xper: "",
//   qty: "",
//   xhelper: "",
//   xslman: "",
//   xtechn: "",
//   xacvflg: "",
//   xtsicod: "",
//   xtsicod1: "",
//   xtsicod2: "",
//   xtsicod3: "",
//   xtsicod4: "",
//   xtsicod5: "",
//   xtsicod6: "",
//   xtsicod7: "",
//   xtsicod8: "",
//   xtsicod9: "",
//   xbus2: "",
//   xtolerance: "",
//   xx10clictype: "",
//   xcuralldri: "",
//   xdate: "",
//   xtime: "",
//   xcodometer: "",
//   xx10csercode: "",
//   xalldriver: "",
//   xinsman: "",
//   xcurmtre: "",
//   xdelinspec: "",
//   xretinspec: "",
//   xmeter: "",
//   xlastdate: "",
//   xlasttime: "",
//   xmtunt: "",
//   cur: "",
//   xunits3: "",
//   xcodometer1: "",
//   xlastdate1: "",
//   xlasttime1: "",
//   lastinsp1: "",
//   xvfcap: "",
//   xvfcu: "",
//   xhgth: "",
//   xlength: "",
//   xwidth: "",
//   xyearofman: "",
//   xoperation: "",
//   xnbpallet: "",
//   xbathght: "",
//   xgndocc: "",
//   xloadbay: "",
//   xtailgate: "",
//   xvol: "",
//   xweu: "",
//   xmaxtotaldis: "",
//   xequipid: "",
//   xequipid1: "",
//   xequipid2: "",
//   xequipid3: "",
//   xequipid4: "",
//   xmaxspeed: "",
//   x10cskillcri: "",
//   xinsptyp0: "",
//   xinsptyp1: "",
//   xinsptyp2: "",
//   xinsptyp3: "",
//   xlstchk0: "",
//   xlstchk1: "",
//   xlstchk2: "",
//   xlstchk3: "",
//   xperiodicity0: "",
//   xperiodicity1: "",
//   xperiodicity2: "",
//   xperiodicity3: "",
//   xnextvisit0: "",
//   xnextvisit1: "",
//   xnextvisit2: "",
//   xnextvisit3: "",
//   xtypein0: "",
//   xtypein1: "",
//   xtypein2: "",
//   xtypein3: "",
//   xxdate: "",
//   xdrn: "",
//   equipnot: "",
//   vyear: "",
//   xvehTyp: "",
// };

const EmptyFields ={
  rowid:null,
  "code": "",
  "registration": "",
  "site": "",
  "activeFlag": "",
  "ownership": "",
  "vehicleClass": "",
  "carrier": "",
  "trailer": "",
  "startDepotName": "",
  "endDepotName": "",
  "brand": "",
  "model": "",
  "color": "",
  "fuelType": "",
  "location": "",
  "engineCC": "",
  "chasisNum": "",
  "yearOfManufacture": "",
  "performance": "",
  "insuranceAmountYearly": "",
  "roadTaxAmountYearly": "",
  "emptyVehicleMass": "",
  "grossVehicleMass": "",
  "tolerance": "",
  "skillCriteria": "",
  "loadingTime": "",
  "offloadingTime": "",
  "earliestStartTime": "",
  "latestStartTime": "",
  "availableHours": "",
  "costPerUnitOverTime": "",
  "costPerUnitDistance": "",
  "costPerUnitTime": "",
  "fixedCost": "",
  "totalMaxDistance": "",
  "maxTotalTime": "",
  "maxTotalTravelTime": "",
  "maxSpeed": "",
  "overTimeHrs": "",
  "maxAllowedWeight": "",
  "maxAllowedVolume": "",
  "quantity": "",
  "maxOrderCount": "",
  "noOfPallets": "",
  "stackHeight": "",
  "surfaceSol": "",
  "vehicleFuelCapacity": "",
  "vehicleFuelUnits": "",
  "currentDriver": "",
  "date": "",
  "time": "",
  "co2Coef": "",
  "unavailable": "",
  "style": "",
  "routeRenewalsList": [],
  "allDriverFlag": "",
  "driverIds": [],
  "allCustomerFlag": "",
  "customerIds": [],
  "allCategoryFlag": "",
  "categoryIds": [],
  "currentOdometerReading": "",
  "lastUpdateDate": "",
  "lastUpdateTime": "",
  "reference": "",
  "lastInsp": "",
  "expiryInsp": "",
  "vehicleAllocationInsp": "",
  "returnVehicleInsp": "",
  "gpsTrackerId": "",
  "refGMSmobile": "",
  "trackingWebServices": "",
  "mobileRadio": "",
  "fireExtinguisher": "",
  "equipmentNotes": "",
  "technicalInspectionList": [],
  "asset": "",
  "licenseReference": "",
  "expiration": "",
  "note": "",
  "supplier": "",
  "insuranceExpiration": "",
  "insuranceReference": "",
  "insuranceNote": "",
  "documentList": [],
  "transactionHistoryList": []
}


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
    setSelectedOrder(EmptyFields);
    setCreate(true);
  };

  async function fetchUpdatedVehOnRefresh(codeyve) {
    setLoader(true);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/fleet/getVehicleByCodeyve?codeyve=${codeyve}`;

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


  console.log(selectedOrder, "this is selected order checking from inded")
  return (
    <React.Fragment>
      <div
        className="page-content pb-0"
        // style={{ height: "100vh", margin: 0, overflow: "hidden" }}
      >
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
                          Management of Vehicles
                        </CardTitle>
                      </Col>

                      <Col className="d-flex justify-content-end align-items-center h-100">
                        <Button
                          style={{
                            borderRadius: "50px",
                            padding: "0.4rem 1.5rem",
                          }}
                          className="mr-2"
                          color="success"
                          onClick={onClickCreateVehicle}
                        >
                          Create Vehicle
                        </Button>

                        <Button
                          style={{
                            borderRadius: "50px",
                            padding: "0.4rem 1.5rem",
                          }}
                          className="mr-2"
                          color="success"
                        >
                          Driver Allocation Inquiry
                        </Button>

                        <Button
                          style={{
                            borderRadius: "50px",
                            padding: "0.4rem 1.5rem",
                          }}
                          className="mr-2"
                          color="success"
                        >
                          Fuel Log Inquiry
                        </Button>

                        {selectedOrder && (
                          <RefreshIcon
                            onClick={() =>
                              fetchUpdatedVehOnRefresh(selectedOrder.code)
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
