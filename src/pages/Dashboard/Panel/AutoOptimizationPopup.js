import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment-timezone";
import Flatpickr from "react-flatpickr";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
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
import AlertNewOver from "./AlertNew_over";

const AutoOptimizationPopup = (props) => {
  //   const isOpen, setIsOpen] = useState(props.modalState);

  //   useEffect(() => {
  //     setIsOpen(props.show);
  //   }, [props]);

  // State to manage the selected items

  const [filteredVehicles, setFilteredVehicles] = useState(props.vehicles);
  const [filteredDrivers, setFilteredDrivers] = useState(props.drivers);
  const [tolls, setTolls] = useState(true);

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
  const [activeDTab, setActiveDTab] = useState("Drops");
    const [tooltip, setTooltip] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");
  const [searchDTerm, setSearchDTerm] = useState("");
  const [startDateChange, setStartDateChange] = useState("");
  const [endDateChange, setEndDateChange] = useState("");

  const tabButtonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none", // Remove default border if necessary
  };


    const handleMouseEnter = (item) => {
     console.log("T1212 mouse enter");
     setTooltip(true)
    };

    const handleMouseLeave = () => {
     console.log("T1212 mouse leave");
      setTooltip(false)
    };

  // Define the active tab button style
  const activeTabButtonStyle = {
    backgroundColor: "#044C84", // Active tab color
    color: "white", // Active tab text color
  };

  // Define the inactive tab button style
  const inactiveTabButtonStyle = {
    backgroundColor: "white",
     border : 'none',// Inactive tab color
    color: "black", // Inactive tab text color
  };

   const handleSearchDChange = (e) => {
      if (e.target.value.trim().length == 0) {
        if (selectedRouteCode?.length > 0) {
          const selectedValues = selectedRouteCode.map((option) => option.value);
          const filteredDrops = dropsList.filter((doc) =>
            selectedValues.includes(doc.routeCodeDesc)
          );
          const filteredPickUps = pickUpsList.filter((doc) =>
            selectedValues.includes(doc.routeCodeDesc)
          );
          setFilteredDrops(filteredDrops);
          setFilteredPickUps(filteredPickUps);
        } else {
          setFilteredDrops(dropsList);
          setFilteredPickUps(pickUpsList);
        }
      } else {
        console.log("402:", activeTab);

        if (activeDTab === "Pickups") {
          if (selectedRouteCode?.length > 0) {
            const selectedValues = selectedRouteCode.map(
              (option) => option.value
            );
            const filteredPickUps = pickUpsList.filter((doc) =>
              selectedValues.includes(doc.routeCodeDesc)
            );
            const filteredPickupData = filteredPickUps.filter((item) =>
              Object.keys(item).some((key) =>
                String(item[key])
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
            setFilteredPickUps(filteredPickupData);
          } else {
            const filteredPickupData = pickUpsList.filter((item) =>
              Object.keys(item).some((key) =>
                String(item[key])
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
            setFilteredPickUps(filteredPickupData);
          }
        } else {
          if (selectedRouteCode?.length > 0) {
            const selectedValues = selectedRouteCode.map(
              (option) => option.value
            );
            const filteredDrops = dropsList.filter((doc) =>
              selectedValues.includes(doc.routeCodeDesc)
            );
            const filteredDropsData = filteredDrops.filter((item) =>
              Object.keys(item).some((key) =>
                String(item[key])
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
            setFilteredDrops(filteredDropsData);
          } else {
            const filteredDropsData = dropsList.filter((item) =>
              Object.keys(item).some((key) =>
                String(item[key])
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
            setFilteredDrops(filteredDropsData);
          }
        }
      }
      setSearchDTerm(e.target.value);
    };



 const convertMinutesToHHMM = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };


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


      return updatedSelection;
    });
  };



 const handleSearchChange = (e) => {
    if (e.target.value.trim().length == 0) {
      if (selectedVehicleClass?.length > 0) {
        let selectedClass = selectedVehicleClass.map((opt) => opt.value);
        const filtered = props.vehicles.filter((vehicle) =>
          selectedClass.includes(vehicle.catego)
        );
        setFilteredVehicles(filtered);
      } else {
        setFilteredVehicles(props.vehicles);
      }
      setFilteredDrivers(props.drivers);
    } else {
      if (activeTab === "Vehicles") {
        console.log("446 ", selectedVehicleClass);
        if (selectedVehicleClass?.length > 0) {
          let selectedClass = selectedVehicleClass.map((opt) => opt.value);
          const filtered = props.vehicles.filter((vehicle) =>
            selectedClass.includes(vehicle.catego)
          );
          const filteredVData = filtered.filter((item) =>
            Object.keys(item).some((key) =>
              String(item[key])
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            )
          );
          setFilteredVehicles(filteredVData);
        } else {
          const filteredVData = props.vehicles.filter((item) =>
            Object.keys(item).some((key) =>
              String(item[key])
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            )
          );
          setFilteredVehicles(filteredVData);
        }
      } else {
        const filteredData = props.drivers.filter((item) =>
          Object.keys(item).some((key) =>
            String(item[key])
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          )
        );
        setFilteredDrivers(filteredData);
      }
    }
    setSearchTerm(e.target.value);
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

 // console.log(uniqueVehicleClasses, "these are unique vehicle classss");
  const routeCodesList = props?.routecodes?.map((r) => ({
    label: r.routeDesc,
    value: r.routeDesc,
  }));


  const changeTolls = () => {
      setTolls(!tolls);
  }

  const clearSelections = () => {
    setSelectedItems([]);
    setSelectedDocuments([]);
    setSelectedPickupDocuments([]);
    setSelectedDropDocuments([]);
    setSelectedDrivers([]);
  };


  const CloseAutoGeneratePopUp = () => {

   props.openPopupAuto(false);

    setSelectedItems([]);
       // setSelectedDocuments([])
       setSelectedDropDocuments([]);
       setSelectedPickupDocuments([]);
       setSelectedDrivers([]);
       setActiveTab("Vehicles");
       setActiveDTab("Drops");

  }

  const generateRoutefromSelections = () => {

    const allSelectedDocuments = [
      ...selectedDropDocuments,
      ...selectedPickupDocuments,
    ];
   console.log("T222 data", props.codeExecution)
   if(props.codeExecution) {
console.log("T222 data if", props.codeExecution)
    props.autofromselection(
         allSelectedDocuments,
         selectedItems,
         selectedDrivers
       );
   }
   else {
console.log("T222 data else", props.codeExecution)
   props.autofromselection_nextBilloins(
   allSelectedDocuments,
         selectedItems,
         selectedDrivers
   );
   }
//  arcgis


/*
props.autofromselectionARCGIS_update(
      allSelectedDocuments,
      selectedItems,
      selectedDrivers
    );




    props.autofromselection(
      allSelectedDocuments,
      selectedItems,
      selectedDrivers
    );
    */
    props.openPopupAuto(false);
    setSelectedItems([]);
    // setSelectedDocuments([])
    setSelectedDropDocuments([]);
    setSelectedPickupDocuments([]);
    setSelectedDrivers([]);
    setActiveTab("Vehicles");
    setActiveDTab("Drops")
  };

  const handleSelect = (key) => {
    setActiveTab(key); // Update the active tab
  };


  const handleSelectDocs = (key) => {
    setActiveDTab(key);
   }



useEffect(() => {
    console.log(
      startDateChange,
      endDateChange,
      "this is checking date use effect 716"
    );

    console.log(startDateChange, endDateChange);
    if (startDateChange || endDateChange) {
      props.documentsDateRange(
        startDateChange || props.docsStartDate,
        endDateChange || props.docsEndDate
      );
    }
  }, [startDateChange, endDateChange]);



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

        if (doc.dlvystatus == "8" || doc.dlvystatus == "0") {
          docsPanel.push(doc);
          dropsList.push(doc);
        }
      }

      for (let jk = 0; jk < props.dropsPanel.pickUps.length; jk++) {
        let doc = props.dropsPanel.pickUps[jk];

        if (doc.dlvystatus == "8" || doc.dlvystatus == "0") {
          docsPanel.push(doc);
          pickUpsList.push(doc);
        }
      }
      setPropsDocumentList(docsPanel);
      setDropsList(dropsList);
      setPickUpsList(pickUpsList);


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


    const ondocumentsEndDateRange = (date) => {
      console.log("on End Date change: ", date);

      const endDate = moment(date[0]).format("YYYY-MM-DD");
      console.log("Formatted End Date: ", endDate);

      // Ensure startDateChange is defined, fallback to props.docsStartDate
      const startDate = startDateChange || props.docsStartDate;

      setEndDateChange(endDate);

      if (moment(endDate).isBefore(moment(startDate))) {
        window.alert("End date cannot be less than start date!");
        return; // Stop execution if condition is met
      }

      props.documentsDateRange(startDateChange, endDate);
    };


  const handleChangeRoutecode = (selectedOptions) => {
    setSelectedRouteCode(selectedOptions);

    if (selectedOptions && selectedOptions.length > 0) {
      // Extract the values from the selected options
      const selectedValues = selectedOptions.map((option) => option.value);

      // Filter the drops and pickups based on the selected route codes
      const filteredDrops = dropsList.filter((doc) =>
        selectedValues.includes(doc.routeCodeDesc)
      );
      const finalfilteredDrops = filteredDrops.filter((item) =>
        Object.keys(item).some((key) =>
          String(item[key]).toLowerCase().includes(searchDTerm.toLowerCase())
        )
      );

      const filteredPickUps = pickUpsList.filter((doc) =>
        selectedValues.includes(doc.routeCodeDesc)
      );
      const finalfilteredPickUps = filteredPickUps.filter((item) =>
        Object.keys(item).some((key) =>
          String(item[key]).toLowerCase().includes(searchDTerm.toLowerCase())
        )
      );

      setFilteredDrops(finalfilteredDrops);
      setFilteredPickUps(finalfilteredPickUps);
    } else {
      // If no options are selected, reset to the full list
      const finalfilteredDrops = dropsList.filter((item) =>
        Object.keys(item).some((key) =>
          String(item[key]).toLowerCase().includes(searchDTerm.toLowerCase())
        )
      );
      setFilteredDrops(finalfilteredDrops);

      const finalfilteredPickUps = pickUpsList.filter((item) =>
        Object.keys(item).some((key) =>
          String(item[key]).toLowerCase().includes(searchDTerm.toLowerCase())
        )
      );
      setFilteredPickUps(finalfilteredPickUps);
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


      const filtered = props.vehicles.filter((vehicle) =>
        selectedClass.includes(vehicle.catego)
      );

        const filteredData = filtered.filter((item) =>
              Object.keys(item).some((key) =>
                String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
              )
            );


      setFilteredVehicles(filtered);
    } else {

      const filteredData = props.vehicles.filter((item) =>
              Object.keys(item).some((key) =>
                String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
              )
            );

      setFilteredVehicles(props.vehicles);
    }
  };
  return (
    <Dialog
      onClose={() => this.props.openPopupAuto(false)}
      open={props.modalState}
      disableEscapeKeyDown={true}
      // style={{width:"100%"}}
      maxWidth="xxl"
      // PaperComponent={StyledPaper}
      //   Width="xl"
      // fullWidth

      PaperProps={{
        sx: {
          width: "200%",
          // maxWidth: "1500px!important",
        },
      }}
    >
     <Card >
           <CardHeader style={{backgroundColor : "#044C84", color : "white"}} >
             <CardTitle style = {{fontSize : "25px"}}>
              Auto Trip Generation : Please select Vehicles, Drivers and Documents
             </CardTitle>
           </CardHeader>
      <CardBody>
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
              <Row style={{ border: "1px solid #044C84" }}>
                <Col
                  className="p-3"
                  md="6"
                  style={{ borderRight: "1px solid #044C84" }}
                >
                  {/* this is heading  */}
                  <Row className="flex">
                    <Col>
                      <h5
                        className="text-left"
                        style={{ color: "#044C84", paddingTop: "10px" }}
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
                          styles={{
                                placeholder: (provided) => ({
                                  ...provided,
                                  color: '#044C84', fontWeight : 800 // Set the desired color for the placeholder
                                }),
                                control: (provided) => ({
                                        ...provided,
                                        borderColor: '#044C84', // Set the desired border color
                                      }),
                              }}
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
                        style={{ color: "#044C84", paddingTop: "10px" }}
                      >
                        Documents
                      </h5>
                    </Col>
                    <Col>
                                            <FormGroup>
                                              <span
                                                style={{ color: "#505D69", fontWeight: "bold" }}
                                              >
                                                Start Date{" "}
                                              </span>
                                              {/* <Flatpickr
                                                className="form-control"
                                                dateFormat="m/d/Y"
                                                style={{ width: "auto", fontWeight: "bold" }}
                                                value={props.docsStartDate}
                                                onChange={(date) => {
                                                  const selectedDate = moment(date[0]).format(
                                                    "YYYY-MM-DD"
                                                  );
                                                  // setStartDateChange(selectedDate);
                                                  // console.log(date[0], endDateChange ,"836");
                                                  if (moment(endDateChange || props.docsEndDate).isAfter(moment(selectedDate))) {
                                                    console.log("❌ Start date cannot be after end date.");
                                                    return; // Stop state update
                                                  }

                                                  setStartDateChange(selectedDate);


                                                }}
                                              /> */}

                                              <Flatpickr
                                                className="form-control"
                                                dateFormat="m/d/Y"
                                                style={{ width: "auto", fontWeight: "bold" }}
                                                value={
                                                  props.docsStartDate
                                                    ? props.docsStartDate
                                                    : null
                                                }
                                                onChange={(date) => {
                                                  const selectedDate = moment(date[0]).format(
                                                    "YYYY-MM-DD"
                                                  );
                                                  // console.log(
                                                  //   moment(selectedDate).isAfter(
                                                  //     moment(endDateChange || props.docsEndDate)
                                                  //   ),
                                                  //   "checking codes abctest"
                                                  // );
                                                  // Check if start date is after the end date
                                                  // if (
                                                  //   moment(selectedDate).isAfter(
                                                  //     moment(props.docsEndDate || endDateChange)
                                                  //   )
                                                  // ) {
                                                  //   // window.alert(
                                                  //   //   "Start date cannot be after end date."
                                                  //   // );
                                                  //   toast.error("Start date cannot be after end date")
                                                  //   return; // Stop state update
                                                  // }

                                                  setStartDateChange(selectedDate);
                                                }}
                                              />
                                            </FormGroup>
                                          </Col>
                                          <Col>
                                            <FormGroup>
                                              <span
                                                style={{ color: "#505D69", fontWeight: "bold" }}
                                              >
                                                End Date{" "}
                                              </span>
                                              <Flatpickr
                                                className="form-control"
                                                dateFormat="m/d/Y"
                                                style={{ width: "auto", fontWeight: "bold" }}
                                                value={
                                                  props.docsEndDate
                                                    ? props.docsEndDate
                                                    : null
                                                }
                                                onChange={(date) => {
                                                  const selectedDate = moment(date[0]).format(
                                                    "YYYY-MM-DD"
                                                  );
                                                  // setEndDateChange(selectedDate);

                                                  // console.log(startDateChange || props.docsStartDate,selectedDate ,"checking both dates end date")
                                                  // Prevent selection if end date is before the current start date

                                                  // console.log(moment(startDateChange || props.docsStartDate).isAfter(moment(selectedDate)) ,"872")
                                                  // if (
                                                  //   moment(
                                                  //      props.docsStartDate ||startDateChange
                                                  //   ).isAfter(moment(selectedDate))
                                                  // ) {
                                                  //   // window.alert(
                                                  //   //   "End date cannot be before start date."
                                                  //   // );

                                                  //   toast.error("End date cannot be before start date.")
                                                  //   return; // Stop state update
                                                  // }
                                                  setEndDateChange(selectedDate);
                                                }}
                                              />
                                            </FormGroup>
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
                        styles={{
                                                        placeholder: (provided) => ({
                                                          ...provided,
                                                          color: '#044C84', fontWeight : 800 // Set the desired color for the placeholder
                                                        }),
                                                        control: (provided) => ({
                                                                ...provided,
                                                                borderColor: '#044C84', // Set the desired border color
                                                              }),
                                                      }}
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
                  className="text-left relative"
                  style={{ borderRight: "1px solid black" }}
                >
                 <div className="d-flex justify-content-between">
                                      <div className="w-100">
                  <Tabs
                    defaultActiveKey="Vehicles"
                    id="document-tabs"
                    className="w-100"
                    onSelect={handleSelect}
                     // Added this to update activeTab

                  >
                    {/* tab for vehicles */}
                    <Tab eventKey="Vehicles"

                     title={
                              <div
                                style={{
                                  ...tabButtonStyle,
                                  ...(activeTab === "Vehicles" ? activeTabButtonStyle : inactiveTabButtonStyle),
                                }}
                              >
                                Vehicles
                              </div>
                            }
                    >
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
                                className="text-left"
                                style={{
                                  height: "50px",
                                  backgroundColor: "#6893b5",
                                  color : "white",
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
                                <th>Vehicle Code</th>
                                <th>Vehicle Name</th>
                                <th>Vehicle Class</th>
                                <th>Trailer</th>
                                <th>Driver Name</th>
                                <th>Driver Code</th>
                              </tr>
                            </thead>
                            <tbody className="mt-3 table-striped">
                              {filteredVehicles &&
                                filteredVehicles.map((item, index) => (
                                  <tr key={index} className="text-left">
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
                                    <td
                                    onMouseEnter={() => handleMouseEnter(item)}
                                    onMouseLeave={handleMouseLeave}
                                    >{item.codeyve}</td>
                                    <td>{item.name}</td>
                                    <td>{item.className}</td>
                                    <td>{item.trailer}</td>
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
                    <Tab eventKey="Drivers" title={
                                                                          <div
                                                                            style={{
                                                                              ...tabButtonStyle,
                                                                              ...(activeTab === "Drivers" ? activeTabButtonStyle : inactiveTabButtonStyle),
                                                                            }}
                                                                          >
                                                                            Drivers
                                                                          </div>
                                                                        }>
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
                                className="text-left"

                                style={{
                                  height: "50px",
                                   backgroundColor: "#6893b5",
                                                                    color : "white",
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
                                <th>Driver Code</th>
                                <th>Driver Name</th>
                                <th> Day Worked Hrs</th>
                                <th> Weekly Worked  Hrs</th>
                                <th> Monthly Worked  Hrs</th>
                              </tr>
                            </thead>
                            <tbody className="mt-3 table-striped">
                              {filteredDrivers &&
                                filteredDrivers.map((item, index) => (
                                  <tr key={index} className="text-left">
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
                                    <td>{item.dayWorkedHrs === 0 ? item.dayWorkedHrs : convertMinutesToHHMM(item.dayWorkedHrs) }</td>
                                    <td>{item.weeklyWorkedHrs === 0 ? item.weeklyWorkedHrs : convertMinutesToHHMM(item.weeklyWorkedHrs) }</td>
                                    <td>{item.monthWorkedHrs === 0 ? item.monthWorkedHrs : convertMinutesToHHMM(item.monthWorkedHrs)}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </Row>
                    </Tab>
                  </Tabs>
                         </div>
                                        <div
                                          style={{
                                            position: "absolute",
                                            top: "5px",
                                            right: "10px",
                                          }}
                                        >
                                          <input
                                            type="text"
                                            className="mt-2 form-control"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            style={{ width: "200px", marginLeft: "10px" }}
                                          />
                                        </div>
                                      </div>
                </Col>
                <Col md="6" className="relative">
                  {/* Tabs for Drops and Pickups */}
                    <div className="d-flex justify-content-between">
                                        <div className="w-100">

                  <Tabs
                    defaultActiveKey="Drops"
                    id="document-tabs2"
                    className="w-100"
                    onSelect={handleSelectDocs}
                  >
                    <Tab eventKey="Drops"
                    title={
                                                  <div
                                                    style={{
                                                      ...tabButtonStyle,
                                                      ...(activeDTab === "Drops" ? activeTabButtonStyle : inactiveTabButtonStyle),
                                                    }}
                                                  >
                                                    Deliveries
                                                  </div>
                                                }

                    >
                      <Row>
                        <div
                          style={{
                            height: "350px",
                             width: "100%",
                          }}
                        >
                          <table className="w-100 table-striped">
                            <thead>
                              <tr
                                className="text-left"
                                style={{
                                  height: "50px",
                                   backgroundColor: "#6893b5",
                                                                    color : "white",
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
                                  Document Number
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Date
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
                                  Client Name
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
                                  Document Type
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredDrops.map((item, index) => (
                                <tr key={index} className="text-left">
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

                    <Tab eventKey="Pickups"
                    title={
                                                  <div
                                                    style={{
                                                      ...tabButtonStyle,
                                                      ...(activeDTab === "Pickups" ? activeTabButtonStyle : inactiveTabButtonStyle),
                                                    }}
                                                  >
                                                    Pickups
                                                  </div>
                                                }


                    >
                      <Row>
                        <div
                          style={{
                            height: "350px",
                             width: "100%",
                          }}
                        >
                          <table className="w-100 table-striped">
                            <thead>
                              <tr
                                className="text-left"
                                style={{
                                  height: "50px",
                                   backgroundColor: "#6893b5",
                                                                    color : "white",
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
                                  Document Number
                                </th>
                                <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Date
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
                                  Client Name
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
                                  Document Type
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPickUps.map((item, index) => (
                                <tr key={index} className="text-left">
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
                   </div>
                  <div
                                          style={{
                                            position: "absolute",
                                            top: "5px",
                                            right: "10px",
                                          }}
                                        >
                                          <input
                                            type="text"
                                            className="mt-2 form-control"
                                            placeholder="Search..."
                                            value={searchDTerm}
                                            onChange={handleSearchDChange}
                                            style={{ width: "200px" }}
                                          />
                                        </div>
                                        </div>

                </Col>
              </Row>
            </CardBody>
          </Card>
        </>
        {/* <button
          onClick={generateRoutefromSelections}
          // color="success"
          className="button-custom-green"
          // variant="contained"
        >
          Submit
        </button> */}
           <div className="custom-control mb-0 mr-4 ml-4">

                        </div>
         <div style={{display : "flex", justifyContent : "flex-end", gap : "20px"}}>
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
              onClick={() => generateRoutefromSelections()}
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
          onClick={() => CloseAutoGeneratePopUp()}
          // variant="contained"
        >
          Close
        </button>
        </div>

        </CardBody>
      </Card>

      </Dialog>
  );
};

export default AutoOptimizationPopup;
