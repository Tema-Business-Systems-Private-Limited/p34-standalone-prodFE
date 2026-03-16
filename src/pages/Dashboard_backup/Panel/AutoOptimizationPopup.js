import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment-timezone";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { styled } from "@mui/material/styles";
import {
  Row,
  Col,
  CardTitle,
  Card,
  CardHeader,
  CardBody,
  Table,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const AutoOptimizationPopup = (props) => {
  //   const [isOpen, setIsOpen] = useState(props.modalState);

  //   useEffect(() => {
  //     setIsOpen(props.show);
  //   }, [props]);

  // State to manage the selected items

  const [filteredVehicles, setFilteredVehicles] = useState(props.vehicles);
  const [filteredDrivers, setFilteredDrivers] = useState(props.drivers);

  console.log(props.vehicles, "these are filtered vehiclessssssssssssss");

  console.log(props.drivers, "these are filtered drives");
  const [filteredDrops, setFilteredDrops] = useState([]);
  const [filteredPickUps, setFilteredPickUps] = useState([]);

  const [selectedDropDocuments, setSelectedDropDocuments] = useState([]);
  const [selectedPickupDocuments, setSelectedPickupDocuments] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [propsDocumentList, setPropsDocumentList] = useState([]);
  const [dropsList, setDropsList] = useState([]);
  const [pickUpsList, setPickUpsList] = useState([]);
  const animatedComponents = makeAnimated();
  //   for documents
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [selectedVehicleClass, setSelectedVehicleClass] = useState([]);
  const [selectedRouteCode, setSelectedRouteCode] = useState(null);
  const [activeTab, setActiveTab] = useState("Vehicles"); // Default active tab

  console.log(activeTab, "checking active tab");
  console.log(selectedDocuments, "selected documents using checkbox");

  // Function to toggle selection of an item
  const toggleSelect = (item) => {
    const selectedIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.codeyve === item.codeyve
    );

    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems.push(item);
    } else {
      newSelectedItems = newSelectedItems.filter(
        (selectedItem) => selectedItem.codeyve !== item.codeyve
      );
    }

    setSelectedItems(newSelectedItems);
  };

  //   for documents

  const toggleSelectDropDocument = (item) => {
    const selectedIndex = selectedDropDocuments.findIndex(
      (selectedItem) => selectedItem.docnum === item.docnum
    );

    let newSelectedDocuments = [...selectedDropDocuments];

    if (selectedIndex === -1) {
      newSelectedDocuments.push(item);
    } else {
      newSelectedDocuments = newSelectedDocuments.filter(
        (selectedItem) => selectedItem.docnum !== item.docnum
      );
    }

    setSelectedDropDocuments(newSelectedDocuments);
  };

  const toggleSelectPickupDocument = (item) => {
    const selectedIndex = selectedPickupDocuments.findIndex(
      (selectedItem) => selectedItem.docnum === item.docnum
    );

    let newSelectedDocuments = [...selectedPickupDocuments];

    if (selectedIndex === -1) {
      newSelectedDocuments.push(item);
    } else {
      newSelectedDocuments = newSelectedDocuments.filter(
        (selectedItem) => selectedItem.docnum !== item.docnum
      );
    }

    setSelectedPickupDocuments(newSelectedDocuments);
  };

  const toggleSelectDriver = (item) => {
    console.log("selected driver is", item);
    const selectedIndex = selectedDrivers.findIndex(
      (selectedItem) => selectedItem.driverid === item.driverid
    );

    let newSelectedDrivers = [...selectedDrivers];

    if (selectedIndex === -1) {
      newSelectedDrivers.push(item);
    } else {
      newSelectedDrivers = newSelectedDrivers.filter(
        (selectedItem) => selectedItem.driverid !== item.driverid
      );
    }
    setSelectedDrivers(newSelectedDrivers);
  };

  // Function to handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems([...filteredVehicles]);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectAllDrops = (e) => {
    setSelectedDropDocuments(e.target.checked ? filteredDrops : []);
  };

  const handleDriverSelect = (driver) => {
    setSelectedDrivers((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (selectedDriver) => selectedDriver.driverid === driver.driverid
      );

      const updatedSelection = isAlreadySelected
        ? prevSelected.filter(
            (selectedDriver) => selectedDriver.driverid !== driver.driverid
          )
        : [...prevSelected, driver];

      console.log("Updated Selection:", updatedSelection);
      return updatedSelection;
    });
  };

  const handleSelectAllPickups = (e) => {
    setSelectedPickupDocuments(e.target.checked ? filteredPickUps : []);
  };

  const handleSelectAllDrivers = (e) => {
    setSelectedDrivers(e.target.checked ? props.drivers : []);
  };

  // Function to handle select all
  // Function to handle select all
  const handleSelectAllDocuments = (e, type) => {
    let relevantList = [];
    if (type === "drops") {
      relevantList = filteredDrops;
    } else {
      relevantList = filteredPickUps;
    }
    setSelectedDocuments(e.target.checked ? relevantList : []);
  };

  //   console.log(props.dropsPanel, "all documents")

  const filteredDropsPanel = propsDocumentList.filter(
    (item) =>
      (item.type === "open" || item.type === "Allocated") &&
      (item.dlvystatus === "0" || item.dlvystatus === "8")
  );

  //clear all selection from input checkboxes

  //  const getVehicleClassesfromVehicles = props.ve
  const uniqueVehicleClasses = [
    ...new Set(props.vehicles?.map((vehicle) => vehicle.catego)),
  ].map((vehicleClass) => ({ label: vehicleClass, value: vehicleClass }));

  console.log(uniqueVehicleClasses, "these are unique vehicle classss");
  const routeCodesList = props?.routecodes?.map((r) => ({
    label: r.routeDesc,
    value: r.routeDesc,
  }));

  const clearSelections = () => {
    setSelectedItems([]);
    setSelectedDocuments([]);
    setSelectedPickupDocuments([]);
    setSelectedDropDocuments([]);
    setSelectedDrivers([]);
  };

  const generateRoutefromSelections = () => {
    console.log("data from selection");
    const allSelectedDocuments = [
      ...selectedDropDocuments,
      ...selectedPickupDocuments,
    ];

    console.log("data from selection- vehicles", selectedItems);
    console.log("data from selection", selectedDocuments);
    props.autofromselection(
      allSelectedDocuments,
      selectedItems,
      selectedDrivers
    );
    props.openPopupAuto(false);
    setSelectedItems([]);
    // setSelectedDocuments([])
    setSelectedDropDocuments([]);
    setSelectedPickupDocuments([]);
    setSelectedDrivers([]);
  };

  const handleSelect = (key) => {
    setActiveTab(key); // Update the active tab
  };

  console.log(props.modalState, "this is state from index");
  console.log(props.vehicles, "all vehicles");

  console.log(filteredDropsPanel, "this is filtered data");

  useEffect(() => {
    let docsPanel = [];
    let dropsList = [],
      pickUpsList = [];
    if (
      props.dropsPanel &&
      (props.dropsPanel.drops.length > 0 || props.dropsPanel.pickUps.length > 0)
    ) {
      for (let jj = 0; jj < props.dropsPanel.drops.length; jj++) {
        let doc = props.dropsPanel.drops[jj];

        if (doc.dlvystatus == "8") {
          docsPanel.push(doc);
          dropsList.push(doc);
        }
      }

      for (let jk = 0; jk < props.dropsPanel.pickUps.length; jk++) {
        let doc = props.dropsPanel.pickUps[jk];

        if (doc.dlvystatus == "8") {
          docsPanel.push(doc);
          pickUpsList.push(doc);
        }
      }
      setPropsDocumentList(docsPanel);
      setDropsList(dropsList);
      setPickUpsList(pickUpsList);

      console.log(dropsList, "this is droplistttttttttttt");

      console.log(pickUpsList, "this is pickuplisttttttttttttttttt");
      setFilteredDrops(dropsList);
      setFilteredPickUps(pickUpsList);
    }
    setFilteredDrivers(props.drivers);
    setFilteredVehicles(props.vehicles);
  }, [props.dropsPanel, props.vehicles, props.drivers]);

  const handleChange = (selectedOptions) => {
    //  setSelected(selectedOptions);
    //  const selectedValues = selectedOptions.map((option) => option.value);
    //  props.setSelectedVehicleCodes(selectedValues.toString());
    //  props.selectedVehicleCodeArr(selectedValues);
  };

  // const handleChangeRoutecode = (option) => {
  //   console.log("T111 Route code ", option);
  //   setSelectedRouteCode(option);
  //   if (option) {
  //     const filteredDrops = dropsList.filter(
  //       (doc) => doc.routeCodeDesc === option.value
  //     );
  //     const filteredPickUps = pickUpsList.filter(
  //       (doc) => doc.routeCodeDesc === option.value
  //     );
  //     setFilteredDrops(filteredDrops);
  //     setFilteredPickUps(filteredPickUps);
  //   } else {
  //     setFilteredDrops(dropsList);
  //     setFilteredPickUps(pickUpsList);
  //   }
  // };
  const handleChangeRoutecode = (selectedOptions) => {
    console.log("T111 Route codes ", selectedOptions);
    setSelectedRouteCode(selectedOptions);

    if (selectedOptions && selectedOptions.length > 0) {
      // Extract the values from the selected options
      const selectedValues = selectedOptions.map((option) => option.value);

      // Filter the drops and pickups based on the selected route codes
      const filteredDrops = dropsList.filter((doc) =>
        selectedValues.includes(doc.routeCodeDesc)
      );
      const filteredPickUps = pickUpsList.filter((doc) =>
        selectedValues.includes(doc.routeCodeDesc)
      );
      console.log(
        filteredDrops,
        filteredPickUps,
        "these are filtered drops and pickups"
      );

      setFilteredDrops(filteredDrops);
      setFilteredPickUps(filteredPickUps);
    } else {
      // If no options are selected, reset to the full list
      setFilteredDrops(dropsList);
      setFilteredPickUps(pickUpsList);
    }
  };

  // const handleChangeVehicleclass = (option) => {
  //   setSelectedVehicleClass(option);
  //   if (option) {
  //     const filtered = props.vehicles.filter(
  //       (vehicle) => vehicle.catego === option.value
  //     );
  //     setFilteredVehicles(filtered);
  //   } else {
  //     setFilteredVehicles(props.vehicles);
  //   }
  // };

  const handleChangeVehicleclass = (option) => {
    setSelectedVehicleClass(option);
    if (option) {
      // getting vehicle clsss
      let selectedClass = option.map((opt) => opt.value);

      console.log(selectedClass, "selected classsss");

      const filtered = props.vehicles.filter((vehicle) =>
        selectedClass.includes(vehicle.catego)
      );
      setFilteredVehicles(filtered);
    } else {
      setFilteredVehicles(props.vehicles);
    }
  };
  return (
    <Dialog
      onClose={() => this.props.openPopupAuto(false)}
      open={props.modalState}
      disableEscapeKeyDown={true}
      // style={{width:"100%"}}
      maxWidth="xl"
      // PaperComponent={StyledPaper}
      //   Width="xl"
      // fullWidth

      PaperProps={{
        sx: {
          width: "80%",
          // maxWidth: "1500px!important",
        },
      }}
    >
      <DialogTitle>
        {" "}
        <Typography variant="h4" className="modal-header-bg text-white">
          Choose Vehicles, Drivers and Documents for Auto Route Generate
        </Typography>
      </DialogTitle>
      <DialogContent>
        <>
          <Card>
            {/* <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
              <CardTitle
                tag="h4"
                className="mb-0"
                style={{ fontWeight: "bold" }}
              >
                BASIC INFO
              </CardTitle>
            </CardHeader> */}
            <CardBody>
              {/* this is heding of table */}
              <Row style={{ border: "1px solid black" }}>
                <Col
                  className="p-3"
                  md="6"
                  style={{ borderRight: "1px solid black" }}
                >
                  {/* this is heading  */}
                  <Row className="flex">
                    <Col>
                      <h5
                        className="text-left"
                        style={{ color: "#3B82F6", paddingTop: "10px" }}
                      >
                        Vehicles
                      </h5>
                    </Col>

                    {activeTab === "Vehicles" && (
                      <Col>
                        <Select
                          options={uniqueVehicleClasses}
                          value={selectedVehicleClass}
                          onChange={handleChangeVehicleclass}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          placeholder="Vehicle Class"
                          components={animatedComponents}
                          isClearable
                          isMulti
                        />
                      </Col>
                    )}
                  </Row>
                </Col>

                <Col md="6" className="p-3">
                  {/* this is heading */}
                  <Row className="flex">
                    <Col>
                      <h5
                        className="text-left"
                        style={{ color: "#3B82F6", paddingTop: "10px" }}
                      >
                        Documents
                      </h5>
                    </Col>
                    <Col>
                      <Select
                        options={routeCodesList}
                        value={selectedRouteCode}
                        onChange={handleChangeRoutecode}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        placeholder="Route Code"
                        components={animatedComponents}
                        isClearable
                        isMulti
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row style={{ border: "1px solid black", borderTop: 0 }}>
                <Col
                  md="6"
                  className="text-center"
                  style={{ borderRight: "1px solid black" }}
                >
                  <Tabs
                    defaultActiveKey="Vehicles"
                    id="document-tabs"
                    className="w-100"
                    onSelect={handleSelect} // Added this to update activeTab
                  >
                    {/* tab for vehicles */}
                    <Tab eventKey="Vehicles" title="Vehicles">
                      <Row className="">
                        <div
                          style={{
                            height:"350px",
                            // overflow: "auto",
                            width: "100%",
                          }}
                        >
                          <table className="w-100 table-striped">
                            <thead>
                              <tr
                                className="text-center"
                                style={{
                                  height: "50px",
                                  backgroundColor: "#9396a4",
                                  position: "sticky",
                                  top: 0,
                                }}
                              >
                                <th style={{ padding: "0 0 0 20px" }}>
                                  <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={
                                      selectedItems.length ===
                                        filteredVehicles.length &&
                                      filteredVehicles.length > 0
                                    }
                                  />
                                </th>
                                <th>VEHICLE CODE</th>
                                <th>VEHICLE NAME</th>
                                <th>VEHICLE CLASS</th>
                                <th>DRIVER NAME</th>
                                <th>DRIVER ID</th>
                              </tr>
                            </thead>
                            <tbody className="mt-3 table-striped">
                              {filteredVehicles &&
                                filteredVehicles.map((item, index) => (
                                  <tr key={index} className="text-center">
                                    <td style={{ padding: "0 0 0 20px" }}>
                                      <input
                                        type="checkbox"
                                        onChange={() => toggleSelect(item)}
                                        checked={selectedItems.some(
                                          (selectedItem) =>
                                            selectedItem.codeyve ===
                                            item.codeyve
                                        )}
                                      />
                                    </td>
                                    <td>{item.codeyve}</td>
                                    <td>{item.name}</td>
                                    <td>{item.className}</td>
                                    <td>
                                      {item.drivername
                                        ? item.drivername
                                        : "---"}
                                    </td>
                                    <td>
                                      {item.driverid ? item.driverid : "---"}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </Row>
                    </Tab>

                    {/* tab for drivers */}
                    <Tab eventKey="Drivers" title="Drivers">
                      <Row className="">
                        <div
                          style={{
                          
                            height: "350px",
                            // overflow: "auto",
                            width: "100%",
                          }}
                        >
                          <table className="w-100 table-striped">
                            <thead>
                              <tr
                                className="text-center"
                              
                                style={{
                                  height: "50px",
                                  backgroundColor: "#9396a4",
                                  position: "sticky",
                                  top: 0,
                                }}
                              >
                                <th style={{ padding: "0 0 0 20px" }}>
                                  <input
                                    type="checkbox"
                                    // Optional: Handle "select all"
                                    onChange={handleSelectAllDrivers}
                                    checked={
                                      selectedDrivers.length ===
                                        filteredDrivers.length &&
                                      filteredDrivers.length > 0
                                    }
                                  />
                                </th>
                                <th>DRIVER CODE</th>
                                <th>DRIVER NAME</th>
                              </tr>
                            </thead>
                            <tbody className="mt-3 table-striped">
                              {filteredDrivers &&
                                filteredDrivers.map((item, index) => (
                                  <tr key={index} className="text-center">
                                    <td style={{ padding: "0 0 0 20px" }}>
                                      <input
                                        type="checkbox"
                                        onChange={() =>
                                          toggleSelectDriver(item)
                                        }
                                        checked={selectedDrivers.some(
                                          (selectedItem) =>
                                            selectedItem.driverid ===
                                            item.driverid
                                        )}
                                      />
                                    </td>
                                    <td>{item.driverid}</td>
                                    <td>{item.driver}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </Row>
                    </Tab>
                  </Tabs>
                </Col>
                <Col md="6">
                  {/* Tabs for Drops and Pickups */}
                  <Tabs
                    defaultActiveKey="drops"
                    id="document-tabs"
                    className="w-100"
                  >
                    <Tab eventKey="drops" title="Drops">
                      <Row>
                        <div
                          style={{
                            height: "350px",
                          }}
                        >
                          <table className="table-striped">
                            <thead>
                              <tr
                                className="text-center"
                                style={{
                                  height: "50px",
                                  backgroundColor: "#9396a4",
                                  position: "sticky",
                                  top: 0,
                                }}
                              >
                                <th style={{ padding: "0 0 0 20px" }}>
                                  <input
                                    type="checkbox"
                                    // onChange={handleSelectAllDocuments}
                                    onChange={(e) => handleSelectAllDrops(e)}
                                    checked={
                                      selectedDropDocuments.length ===
                                        filteredDrops.length &&
                                      filteredDrops.length > 0
                                    }
                                  />
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  DOCUMENT NUMBER
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  DATE
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Client Code
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Client name
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Route Code
                                </th>
                                {/* <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Reference
                                </th> */}
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  DOCUMENT TYPE
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredDrops.map((item, index) => (
                                <tr key={index} className="text-center">
                                  <td style={{ padding: "0 0 0 20px" }}>
                                    <input
                                      type="checkbox"
                                      onChange={() =>
                                        toggleSelectDropDocument(item)
                                      }
                                      checked={selectedDropDocuments.some(
                                        (selectedItem) =>
                                          selectedItem.docnum === item.docnum
                                      )}
                                    />
                                  </td>
                                  <td>{item.docnum}</td>
                                  <td style={{ whiteSpace: "nowrap" }}>
                                    {moment(item.docdate).format("MM-DD-YYYY")}
                                  </td>
                                  <td>{item.bpcode}</td>
                                  <td>{item.bpname}</td>
                                  <td>{item.routeCodeDesc}</td>
                                  {/* <td>{item.reference}</td> */}
                                  <td>{item.routeTag}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Row>
                    </Tab>

                    <Tab eventKey="pickups" title="Pickups">
                      <Row>
                        <div
                          style={{
                            height: "350px",
                          }}
                        >
                          <table className="table-striped">
                            <thead>
                              <tr
                                className="text-center"
                                style={{
                                  height: "50px",
                                  backgroundColor: "#9396a4",
                                  position: "sticky",
                                  top: 0,
                                }}
                              >
                                <th style={{ padding: "0 0 0 20px" }}>
                                  <input
                                    type="checkbox"
                                    onChange={(e) => handleSelectAllPickups(e)}
                                    checked={
                                      selectedPickupDocuments.length ===
                                        filteredPickUps.length &&
                                      filteredPickUps.length > 0
                                    }
                                  />
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  DOCUMENT NUMBER
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  DATE
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Client Code
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Client name
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Route Code
                                </th>
                                {/* <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Reference
                                </th> */}
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  DOCUMENT TYPE
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPickUps.map((item, index) => (
                                <tr key={index} className="text-center">
                                  <td style={{ padding: "0 0 0 20px" }}>
                                    <input
                                      type="checkbox"
                                      onChange={() =>
                                        toggleSelectPickupDocument(item)
                                      }
                                      checked={selectedPickupDocuments.some(
                                        (selectedItem) =>
                                          selectedItem.docnum === item.docnum
                                      )}
                                    />
                                  </td>
                                  <td>{item.docnum}</td>
                                  <td style={{ whiteSpace: "nowrap" }}>
                                    {moment(item.docdate).format("MM-DD-YYYY")}
                                  </td>
                                  <td>{item.bpcode}</td>
                                  <td>{item.bpname}</td>
                                  <td>{item.routeCodeDesc}</td>
                                  {/* <td>{item.reference}</td> */}
                                  <td>{item.routeTag}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Row>
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </>
      </DialogContent>
      <DialogActions>
        {/* <button
          onClick={generateRoutefromSelections}
          // color="success"
          className="button-custom-green"
          // variant="contained"
        >
          Submit
        </button> */}
        {((selectedDropDocuments.length > 0 && selectedItems.length > 0) ||
          (selectedPickupDocuments.length > 0 && selectedItems.length > 0)) && (
          <>
            <button
              onClick={clearSelections}
              // color="error"
              className="button-custom-red"
              // variant="contained"
            >
              Clear
            </button>
            <button
              onClick={generateRoutefromSelections}
              // color="success"
              className="button-custom-green"
              // variant="contained"
            >
              Submit
            </button>
          </>
        )}

        <button
          className="button-custom"
          color="primary"
          onClick={() => props.openPopupAuto(false)}
          // variant="contained"
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default AutoOptimizationPopup;
