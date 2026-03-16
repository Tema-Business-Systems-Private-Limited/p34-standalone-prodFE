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
import { toast } from "react-toastify";
import { fetchCommonDataFleet } from "../../service";

const EmptyFields = {
  rowId: null,
  updTick: "",
  codeyve: "",
  name: "",
  startdepotn: "",
  enddepotname: "",
  startdepots: "",
  enddepotserv: "",
  earliestStart: "",
  latestStart: "",
  arriveDepart: "",
  capacities: "",
  fixedCost: "",
  costPerUnitT: "",
  costPerUnitD: "",
  overtTimeStart: "",
  costPerUnitO: "",
  maxOrderCOU: "",
  maxTotalTime: "",
  maxTotalTrav: "",
  maxTotalDist: "",
  specialtynam: "",
  assignmentru: "",
  fcy: "",
  bptNum: "",
  vol: "",
  vou: "",
  createDateTime: "",
  updateDateTime: "",
  auuid: "",
  createUser: "",
  updateUser: "",
  depotName0: "",
  depotName1: "",
  depotName2: "",
  depotName3: "",
  depotName4: "",
  depotName5: "",
  depotName6: "",
  depotName7: "",
  depotName8: "",
  depotName9: "",
  serviceTime0: "",
  serviceTime1: "",
  serviceTime2: "",
  serviceTime3: "",
  serviceTime4: "",
  serviceTime5: "",
  serviceTime6: "",
  serviceTime7: "",
  serviceTime8: "",
  serviceTime9: "",
  allDriver: "",
  uvycod: "",
  styzon: "",
  longueur: "",
  largeur: "",
  dimlarg1: "",
  dimlarg2: "",
  dimlarg3: "",
  dimlarg4: "",
  dimlarg5: "",
  dimlarg6: "",
  sectorId: "",
  ownerShip: "",
  primmet: "",
  secdmet: "",
  reference: "",
  lastinsp: "",
  inspexp: "",
  gpsId: "",
  mobtrac: "",
  mobrad: "",
  fireExit: "",
  licref: "",
  licexp: "",
  licnot: "",
  vendor: "",
  insexp: "",
  insref: "",
  insnot: "",
  aasref: "",
  category: "",
  brand: "",
  model: "",
  color: "",
  fuelType: "",
  engicc: "",
  chasnum: "",
  insYear: "",
  roaYear: "",
  co2em: "",
  driverId0: "",
  driverId1: "",
  driverId2: "",
  driverId3: "",
  driverId4: "",
  driverId5: "",
  driverId6: "",
  driverId7: "",
  driverId8: "",
  driverId9: "",
  emptmass: "",
  gromass: "",
  pourtol: "",
  tclcod0: "",
  tclcod1: "",
  tclcod2: "",
  tclcod3: "",
  tclcod4: "",
  tclcod5: "",
  tclcod6: "",
  tclcod7: "",
  tclcod8: "",
  tclcod9: "",
  allTclCod: "",
  bpcNum0: "",
  bpcNum1: "",
  bpcNum2: "",
  bpcNum3: "",
  bpcNum4: "",
  bpcNum5: "",
  bpcNum6: "",
  bpcNum7: "",
  bpcNum8: "",
  bpcNum9: "",
  allBPCNum: "",
  trailer: "",
  sdhtyp: "",
  xloc: "",
  xloctyp: "",
  xissemirate: "",
  xper: "",
  qty: "",
  xhelper: "",
  xslman: "",
  xtechn: "",
  xacvflg: "",
  xtsicod: "",
  xtsicod1: "",
  xtsicod2: "",
  xtsicod3: "",
  xtsicod4: "",
  xtsicod5: "",
  xtsicod6: "",
  xtsicod7: "",
  xtsicod8: "",
  xtsicod9: "",
  xbus2: "",
  xtolerance: "",
  xx10clictype: "",
  xcuralldri: "",
  xdate: "",
  xtime: "",
  xcodometer: "",
  xx10csercode: "",
  xalldriver: "",
  xinsman: "",
  xcurmtre: "",
  xdelinspec: "",
  xretinspec: "",
  xmeter: "",
  xlastdate: "",
  xlasttime: "",
  xmtunt: "",
  cur: "",
  xunits3: "",
  xcodometer1: "",
  xlastdate1: "",
  xlasttime1: "",
  lastinsp1: "",
  xvfcap: "",
  xvfcu: "",
  xhgth: "",
  xlength: "",
  xwidth: "",
  xyearofman: "",
  xoperation: "",
  xnbpallet: "",
  xbathght: "",
  xgndocc: "",
  xloadbay: "",
  xtailgate: "",
  xvol: "",
  xweu: "",
  xmaxtotaldis: "",
  xequipid: "",
  xequipid1: "",
  xequipid2: "",
  xequipid3: "",
  xequipid4: "",
  xmaxspeed: "",
  x10cskillcri: "",
  xinsptyp0: "",
  xinsptyp1: "",
  xinsptyp2: "",
  xinsptyp3: "",
  xlstchk0: "",
  xlstchk1: "",
  xlstchk2: "",
  xlstchk3: "",
  xperiodicity0: "",
  xperiodicity1: "",
  xperiodicity2: "",
  xperiodicity3: "",
  xnextvisit0: "",
  xnextvisit1: "",
  xnextvisit2: "",
  xnextvisit3: "",
  xtypein0: "",
  xtypein1: "",
  xtypein2: "",
  xtypein3: "",
  xxdate: "",
  xdrn: "",
  equipnot: "",
  vyear: "",
  xvehTyp: "",
};

const ITEMS_PER_PAGE = 8;

export default function PurchaseOrderManager({selectedOrder,setSelectedOrder,isCreate,setCreate,setLoader}) {
  // const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [VehicleList, setVehicleList] = useState([]);
  const [commonData, setCommonData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  // const [isCreate, setCreate] = useState(false);


  console.log(commonData, "this is common data check")
  useEffect(() => {
    console.log(filteredOrders, "checking filtered orders");
    // const results = mockPurchaseOrders?.filter((order) =>
    //   Object.values(order).some((value) =>
    //     value?.toLowerCase().includes(searchTerm?.toLowerCase())
    //   )
    // );
    const results = VehicleList.filter((order) =>
      Object.values(order).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    console.log(results, "results checking for state set");
    setFilteredOrders(results);
    setCurrentPage(1);
  }, [searchTerm]);

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

  const onClickCreateVehicle = () => {
    setSelectedOrder(EmptyFields);
    setCreate(true);
  };

  console.log(currentItems, "thiese are current items");

  async function fetcheVehicleList() {
    setLoader(true)
    try {
      let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/fleet/getAllVehicles`
      );
      setLoader(false)
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Error while getting vehicles");
      }

      // Parse JSON data
      let res = await response.json();
      console.log(res, "this is res from veh");

      setVehicleList(res);
      setFilteredOrders(res);
    } catch (error) {
      setLoader(false)
      console.error("Error while getting trailers:", error.message);
    }
  }

  function fetchCommonDataService() {
    fetchCommonDataFleet()
      .then((data) => {
        // console.log(data); // Process your data here
        setCommonData(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching fleet data:", error);
      });
  }


  console.log(selectedOrder,"we are creating new vehicle here...")


    const handleSave = async () => {
      if (!isCreate) {
        try {
          const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/updateVehicle`;
  
          const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedOrder),
          });
  
          if (response.ok) {
            toast.success("Vehicle updated successfully", {
              autoClose: 5000,
              position: "top-right",
            });
            fetcheVehicleList();
            setSearchTerm("");
          } else {
            toast.error("Error updating vehicle", {
              autoClose: 5000,
              position: "top-right",
            });
          }
        } catch (error) {
          console.error("Error updating vehicle", error);
        }
      } else {
        try {
          const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/createVehicle`;
  
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedOrder),
          });
  
          if (response.ok) {
            toast.success("Vehicle created successfully", {
              autoClose: 5000,
              position: "top-right",
            });
            fetcheVehicleList();
            setSearchTerm("");
          } else {
            toast.error("Error creating Vehicle", {
              autoClose: 5000,
              position: "top-right",
            });
          }
        } catch (error) {
          console.error("Error creating Vehicle:", error);
        }
      }
    };


    

      const handleDelete = async () => {
        try {
          const apiUrl = `${process.env.REACT_APP_API_URL}/api/v1/fleet/deleteVehicleByCodeyve?codeyve=${selectedOrder.code}`;
          const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.ok) {
            toast.success("Vehicle deleted successfully", {
              autoClose: 5000,
              position: "top-right",
            });
            setSelectedOrder(null);
            fetcheVehicleList();
            setSearchTerm("");
          } else {
            toast.error("Error deleting driver", {
              autoClose: 5000,
              position: "top-right",
            });
          }
        } catch (error) {
          console.error("Error deleting driver:", error);
        }
      };

  useEffect(() => {
    fetcheVehicleList();
    fetchCommonDataService();
  }, []);

  console.log(commonData, "this is common data");

  const LeftSide = (
    <Card className="h-100 m-0 p-0">
      <CardHeader className="d-flex justify-content-between align-items-center bg-white">
        <div className="flex-grow-1 mr-3">
          <Input
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredOrders.length > ITEMS_PER_PAGE && (
          <Pagination className="mb-0">
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink
                previous
                onClick={() => setCurrentPage(currentPage - 1)}
                style={{
                  backgroundColor: "#007bff",
                  borderColor: "white",
                  color: "white",
                  padding: "10px 15px",
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
                  padding: "10px 15px",
                  fontSize: "1.1rem",
                }}
              />
            </PaginationItem>
          </Pagination>
        )}

        {/* <Button
          color="success"
          onClick={onClickCreateVehicle}
          className="mt-1 ml-2"
        >
          Create Vehicle
        </Button> */}
      </CardHeader>
      <CardBody
        className="overflow-auto"
        style={{ height: "calc(100vh - 156px)" }}
      >
        <Table hover responsive striped>
          <thead>
            <tr>
              <th>Vehicle Code</th>
              <th>License Plate</th>
              <th>Site</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr
                key={order.id}
                onClick={() => handleOrderSelect(order)}
                style={{ cursor: "pointer" }}
              >
                <td>{order.code}</td>
                <td>{order.registration}</td>
                <td>{order.site}</td>
                <td>{order.activeFlag == 2 ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Remove or comment out this block
        {filteredOrders.length > ITEMS_PER_PAGE && (
          <Pagination className="justify-content-center mt-3">
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)} />
            </PaginationItem>
            <PaginationItem disabled={currentPage === pageNumbers.length}>
              <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)} />
            </PaginationItem>
          </Pagination>
        )}
        */}
      </CardBody>
    </Card>
  );

  // const RightSide = (
  //   <Card className="h-100 m-0">
  //     <CardBody
  //       className="overflow-auto"
  //       style={{ height: "calc(100vh - 156px)" }}
  //     >
  //       {selectedOrder ? (
  //         <Form>
  //           <FormGroup>
  //             <Label for="typeOfOrder">Code</Label>
  //             <Input
  //               type="text"
  //               name="typeOfOrder"
  //               id="typeOfOrder"
  //               value={selectedOrder.code}
  //               readOnly
  //             />
  //           </FormGroup>
  //           <FormGroup>
  //             <Label for="order">License Plate</Label>
  //             <Input
  //               type="text"
  //               name="order"
  //               id="order"
  //               value={selectedOrder.id}
  //               readOnly
  //             />
  //           </FormGroup>

  //           <FormGroup>
  //             <Label for="orderSite">Site</Label>
  //             <Input
  //               type="select"
  //               name="orderSite"
  //               id="orderSite"
  //               value={selectedOrder.orderSite}
  //             >
  //               <option>{selectedOrder.orderSite}</option>
  //             </Input>
  //           </FormGroup>
  //           <FormGroup check className="mb-3">
  //             <Label check>
  //               <Input
  //                 type="checkbox"
  //                 checked={selectedOrder.active}
  //                 onChange={() => {
  //                   setSelectedOrder({
  //                     ...selectedOrder,
  //                     active: !selectedOrder.active,
  //                   });
  //                 }}
  //               />{" "}
  //               Active
  //             </Label>
  //           </FormGroup>
  //           <FormGroup>
  //             <Label for="code">Vehicle Class</Label>
  //             <Input
  //               type="select"
  //               name="code"
  //               id="code"
  //               value={selectedOrder.code}
  //             >
  //               <option>{selectedOrder.code}</option>
  //             </Input>
  //           </FormGroup>
  //           <Button color="primary">Save Changes</Button>
  //         </Form>
  //       ) : (
  //         <p>Select a Vehicle to view details</p>
  //       )}
  //     </CardBody>
  //   </Card>
  // );

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
                <Label for="typeOfOrder">Code</Label>
                <Input
                  type="text"
                  name="typeOfOrder"
                  id="typeOfOrder"
                  value={selectedOrder.code}
                  readOnly
                />
              </FormGroup>

              {/* Text Input */}
              <FormGroup className="form-item text-input">
                <Label for="order">License Plate</Label>
                <Input
                  type="text"
                  name="order"
                  id="order"
                  value={selectedOrder.id}
                  readOnly
                />
              </FormGroup>

              {/* Dropdown */}
              {/* <FormGroup className="form-item dropdown-input">
                <Label for="orderSite">Site</Label>
                <Input
                  type="select"
                  name="orderSite"
                  id="orderSite"
                  value={selectedOrder.orderSite}
                >
                  <option>{selectedOrder.orderSite}</option>
                </Input>
              </FormGroup> */}

          

              {/* Checkbox */}
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
      isCreate={isCreate}
      setSelectedOrder={setSelectedOrder}
      commonData={commonData}
      handleUpdate={handleSave}
      handleDelete={handleDelete}
    />
  );
}
