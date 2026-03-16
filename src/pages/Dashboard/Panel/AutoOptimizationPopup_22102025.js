import React, { useState, useEffect, useMemo } from "react";
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
import { ToastContainer, toast } from "react-toastify";

const AutoOptimizationPopup = (props) => {
  //   const isOpen, setIsOpen] = useState(props.modalState);

  //   useEffect(() => {
  //     setIsOpen(props.show);
  //   }, [props]);

  // State to manage the selected items

  const [filteredVehicles, setFilteredVehicles] = useState(props.vehicles);
  const [filteredDrivers, setFilteredDrivers] = useState(props.drivers);
const [excludeUsedVehicles, setExcludeUsedVehicles] = useState(false);
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


const usedVehicleCodes = useMemo(() => {
  // tripsList has "code"
  return new Set((props.tripsList || []).map((t) => String(t.code)));
}, [props.tripsList]);

const isVehicleAvailable = (vehicle) =>
  !usedVehicleCodes.has(String(vehicle.codeyve));


const filterVehicles = (
  baseList,
  search = searchTerm,
  classes = selectedVehicleClass,
  excludeUsed = excludeUsedVehicles
) => {
  let list = baseList || [];

  if (classes?.length) {
    const selectedClassVals = classes.map((o) => o.value);
    list = list.filter((v) => selectedClassVals.includes(v.catego));
  }

  if (excludeUsed) {
    list = list.filter(isVehicleAvailable);
  }

  if (search?.trim()) {
    const q = search.toLowerCase();
    list = list.filter((item) =>
      Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(q)
      )
    );
  }

  return list;
};

// Recompute filteredVehicles whenever filters change
useEffect(() => {
  setFilteredVehicles(filterVehicles(props.vehicles));
}, [
  props.vehicles,
  selectedVehicleClass,
  searchTerm,
  excludeUsedVehicles,
  usedVehicleCodes,
]);

// If "Exclude Used Vehicles" is turned on, remove any selected used vehicles
useEffect(() => {
  if (excludeUsedVehicles) {
    setSelectedItems((prev) => prev.filter(isVehicleAvailable));
  }
}, [excludeUsedVehicles, usedVehicleCodes]);

const tripCountsByVehicle = useMemo(() => {
  const counts = {};
  (props.tripsList || []).forEach((trip) => {
    const key = String(trip.code || "");
    if (!key) return;
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
}, [props.tripsList]);


  const tabButtonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none", // Remove default border if necessary
  };

  const handleMouseEnter = (item) => {
    console.log("T1212 mouse enter");
    setTooltip(true);
  };

  const handleMouseLeave = () => {
    console.log("T1212 mouse leave");
    setTooltip(false);
  };

  // Define the active tab button style
  const activeTabButtonStyle = {
    backgroundColor: "#044C84", // Active tab color
    color: "white", // Active tab text color
  };

  // Define the inactive tab button style
  const inactiveTabButtonStyle = {
    backgroundColor: "white",
    border: "none", // Inactive tab color
    color: "black", // Inactive tab text color
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


  // helper to coerce numbers
  const toNum = (v) => (v == null || v === "" || isNaN(Number(v)) ? 0 : Number(v));

  const documentTotals = useMemo(() => {
    const sum = (arr) =>
      arr.reduce(
        (acc, it) => {
          acc.pallets += toNum(it.noofCases); // your UI labels "Pallet Count" uses noofCases
          acc.cases += toNum(it.mainCases);   // your UI labels "Cases Count" uses mainCases
          acc.count += 1;
          return acc;
        },
        { pallets: 0, cases: 0 , count : 0 }
      );

    const drops = sum(selectedDropDocuments);
    const pickups = sum(selectedPickupDocuments);

    return {
      // combined totals (for the header)

      pallets: drops.pallets + pickups.pallets,
      cases: drops.cases + pickups.cases,
      count : drops.count + pickups.count,
      // per-tab (if you ever want to show them)
      drops,
      pickups,
    };
  }, [selectedDropDocuments, selectedPickupDocuments]);


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

  const clearSelections = () => {
    setSelectedItems([]);
    setSelectedDocuments([]);
    setSelectedPickupDocuments([]);
    setSelectedDropDocuments([]);
    setSelectedDrivers([]);
    setSelectedVehicleClass([]);
    setSelectedRouteCode([]);
    setFilteredDrivers(props.drivers);
    setFilteredVehicles(props.vehicles);
    setFilteredDrops(dropsList);
    setFilteredPickUps(pickUpsList);
    setSearchTerm("");
    setSearchDTerm("");
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
    setSelectedVehicleClass([]);
    setSelectedRouteCode([]);
    setFilteredDrivers(props.drivers);
    setFilteredVehicles(props.vehicles);
    setFilteredDrops(dropsList);
    setFilteredPickUps(pickUpsList);
    setSearchTerm("");
    setSearchDTerm("");
  };

  const generateRoutefromSelections = () => {
    const allSelectedDocuments = [
      ...selectedDropDocuments,
      ...selectedPickupDocuments,
    ];

    // let allowproceed  = true;
    const totalSelectedDrivers = selectedDrivers.length;
    const totalSelectedVehicles = selectedItems.length;

    console.log("TBBB selected Vehicles are", totalSelectedVehicles)

    console.log("TBBB selected array Vehicles are", selectedItems)

  proceedWithRoute();
    /*
    const allowProps = totalSelectedDrivers >= totalSelectedVehicles;

    if (allowProps) {
      proceedWithRoute();
    } else {
      const userConfirmed = window.confirm(
        "More vehicles than drivers have been selected. Are you sure you want to continue?"
      );

      if (userConfirmed) {
        proceedWithRoute();
      }
    }
    */
  };

  const proceedWithRoute = () => {

    console.log("TBBB at proceed with route")
    const allSelectedDocuments = [
      ...selectedDropDocuments,
      ...selectedPickupDocuments,
    ];

    const selectedVehiclesToSend = excludeUsedVehicles
        ? selectedItems.filter(isVehicleAvailable)
        : selectedItems;

      props.autofromselection_nextBilloins(
       allSelectedDocuments,
             selectedVehiclesToSend,
             selectedDrivers
       );
    props.openPopupAuto(false);
    setSelectedItems([]);
    // setSelectedDocuments([])
    setSelectedDropDocuments([]);
    setSelectedPickupDocuments([]);
    setSelectedDrivers([]);
    setActiveTab("Vehicles");
    setActiveDTab("Drops");
    setSelectedVehicleClass([]);
    setSelectedRouteCode([]);
    setSearchTerm("");
    setSearchDTerm("");
    setExcludeUsedVehicles(false);
  };

  const handleSelect = (key) => {
    setActiveTab(key);
    setSearchTerm(""); // Update the active tab
    setFilteredVehicles(props.vehicles);
    setFilteredDrivers(props.drivers);
  };

  const handleSelectDocs = (key) => {
    setActiveDTab(key);
    setSearchDTerm("");
    if (selectedRouteCode && selectedRouteCode?.length > 0) {
      // Extract the values from the selected options
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
  };

  useEffect(() => {
    let docsPanel = [];
    let dropsList = [],
      pickUpsList = [];
    if ( props?.dropsPanel && (props?.dropsPanel?.drops?.length > 0 || props?.dropsPanel?.pickUps?.length > 0) )
    {
      for (let jj = 0; jj < props?.dropsPanel.drops.length; jj++) {
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
   setFilteredVehicles(filterVehicles(props.vehicles, searchTerm, option));
 };


  const handleChangeVehicleclass_backup_09102025 = (option) => {
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
      setFilteredVehicles(filteredData);
    } else {
      const filteredData = props.vehicles.filter((item) =>
        Object.keys(item).some((key) =>
          String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredVehicles(filteredData);
    }
  };


const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchTerm(value);
  setFilteredVehicles(filterVehicles(props.vehicles, value));
};


  const handleSearchChange_backup_09102025 = (e) => {
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

  // const ondocumentsStartDateRange = (date) => {
  //   console.log("on Start Date change,  ", date);
  //   const startDate = moment(date[0]).format("YYYY-MM-DD");
  //   // console.log("on Start Date change, 2",e.target.value)
  //   // const startDate = moment.tz(e, "").format("YYYY-MM-DD");
  //   console.log("on Start Date change, ,", startDate);

  //   //  props.documentsDateRange(startDate, props.docsEndDate);
  //   setStartDateChange(startDate);
  //   props.documentsDateRange(
  //     startDate || props.docsStartDate,
  //     endDateChange || props.docsEndDate
  //   );

  // };
  const ondocumentsStartDateRange = (date) => {
    console.log("on Start Date change: ", date);

    const startDate = moment(date[0]).format("YYYY-MM-DD");
    console.log("Formatted Start Date: ", startDate);

    // Ensure endDateChange is defined, fallback to props.docsEndDate
    //const endDate = endDateChange || props.docsEndDate;

    const endDate = endDateChange
      ? moment(endDateChange).format("YYYY-MM-DD")
      : moment(props.docsEndDate).format("YYYY-MM-DD");

    setStartDateChange(startDate);

    if (moment(startDate).isAfter(moment(endDate))) {
      window.alert("Start date cannot be greater than end date!");
      return; // Stop execution if condition is met
    }

    props.documentsDateRange(startDate, endDateChange);
  };

  // const ondocumentsEndDateRange = (date) => {
  //   console.log("on End Date change, ", date);
  //   const EndDate = moment(date[0]).format("YYYY-MM-DD");
  //   // const  = moment.tz(e, "").format("YYYY-MM-DD");
  //   console.log("on End Date change, ,", EndDate);

  //   setEndDateChange(EndDate);

  //   props.documentsDateRange(
  //     startDateChange || props.docsStartDate,
  //     EndDate || props.docsEndDate
  //   );

  // };

  const ondocumentsEndDateRange = (date) => {
    console.log("on End Date change: ", date);

    const endDate = moment(date[0]).format("YYYY-MM-DD");
    console.log("Formatted End Date: ", endDate);

    // Ensure startDateChange is defined, fallback to props.docsStartDate
   // const startDate = startDateChange || props.docsStartDate;

    const startDate = startDateChange
      ? moment(startDateChange).format("YYYY-MM-DD")
      : moment(props.docsStartDate).format("YYYY-MM-DD");

    setEndDateChange(endDate);

    if (moment(endDate).isBefore(moment(startDate))) {
      window.alert("End date cannot be less than start date!");
      return; // Stop execution if condition is met
    }

    props.documentsDateRange(startDate, endDate);
  };

  //  docsEndDate: edate,
  //  docsStartDate: sdate,

  console.log(
    startDateChange,
    endDateChange,
    "this is start date change and end date change"
  );

  // const handleDateChangeStartEnd = (startDate, endDate) => {
  //   if ((startDateChange || props.docsStartDate) && (endDateChange || props.docsEndDate)) {
  //     // console.log(startDateChange || props.docsStartDate, endDateChange || props.docsEndDate, "Updated");
  //     props.documentsDateRange(startDateChange || props.docsStartDate, endDateChange || props.docsEndDate);
  //   }
  // };

 const fmt = (n, maxFrac = 3) => {
   const num = Number(n || 0);
   if (isNaN(num)) return "0";
   return num.toLocaleString(undefined, { maximumFractionDigits: maxFrac });
 };

const fmtPallets = (n) => {
  const num = Number(n || 0);
  if (isNaN(num)) return "0.0000";
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
};

const fmtCases = (n) => {
  const num = Number(n || 0);
  if (isNaN(num)) return "0";
  return num.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
};
useEffect(() => {
  console.log(
    startDateChange,
    endDateChange,
    "this is checking date use effect 716"
  );

  if (startDateChange || endDateChange) {
    const formattedStartDate = moment(
      startDateChange || props.docsStartDate
    ).format("YYYY-MM-DD");

    const formattedEndDate = moment(
      endDateChange || props.docsEndDate
    ).format("YYYY-MM-DD");

    console.log("Formatted Dates:", formattedStartDate, formattedEndDate);

    props.documentsDateRange(formattedStartDate, formattedEndDate);
  }
}, [startDateChange, endDateChange]);


/*
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
  */

  console.log(
    props.docsStartDate,
    props.docsEndDate,
    "start end date props check"
  );
    console.log("props of tripsList", props.tripsList)
  return (
    <Dialog
      onClose={() => props.openPopupAuto(false)}
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
      <Card>
        <CardHeader style={{ backgroundColor: "#044C84", color: "white" }}>
          <CardTitle style={{ fontSize: "25px" }}>
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
                   <div style={{ display: "flex", gap: "10px", justifyContent : 'flex-end' }}>
                     <span
                                             className="badge bg-light text-dark"
                                             style={{
                                               fontSize: "14px",
                                               fontWeight: 600,
                                               padding: "8px 12px",
                                             }}
                                           >
                                             Orders : <span style={{ fontWeight: 700 }}> {fmtCases(documentTotals.count)}  </span>
                                           </span>

                      <span
                        className="badge bg-light text-dark"
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          padding: "8px 12px",
                        }}
                      >
                        Pallets: <span style={{ fontWeight: 700 }}> {fmtPallets(documentTotals.pallets)} PAL </span>
                      </span>
                      <span
                        className="badge bg-light text-dark"
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          padding: "8px 12px",
                        }}
                      >
                        Cases: <span style={{ fontWeight: 700 }}> {fmtCases(documentTotals.cases)} CS </span>
                      </span>
                    </div>
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
                          {activeTab === "Vehicles" ? "Vehicles" : "Drivers"}
                        </h5>
                      </Col>

                      {activeTab === "Vehicles" && (
                        <>
                       <Col xs="auto" className="d-flex align-items-center">
                         <FormGroup check style={{ marginTop: 8 }}>
                           <Label check style={{ fontWeight: 600, color: "#044C84", whiteSpace: "nowrap" }}>
                             <Input
                               type="checkbox"
                               checked={excludeUsedVehicles}
                               onChange={(e) => setExcludeUsedVehicles(e.target.checked)}
                             />{" "}
                             Exclude Scheduled Vehicles
                           </Label>
                         </FormGroup>
                       </Col>
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
                                color: "#044C84",
                                fontWeight: 800, // Set the desired color for the placeholder
                              }),
                              control: (provided) => ({
                                ...provided,
                                borderColor: "#044C84", // Set the desired border color
                              }),
                            }}
                            components={animatedComponents}
                            isClearable
                            isMulti
                          />
                        </Col>
                        </>
                      )}
                    </Row>
                  </Col>

                  <Col md="6" className="p-3">
                    {/* this is heading */}
                    <Row className="flex">
                     <Col className="d-flex align-items-start gap-2 flex-wrap">
                       <h5
                         className="text-left mb-0"
                         style={{ color: "#044C84", paddingTop: "10px" }}
                       >
                         Documents
                       </h5>

                       {/* Live totals across Drops + Pickups */}

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
                              color: "#044C84",
                              fontWeight: 800, // Set the desired color for the placeholder
                            }),
                            control: (provided) => ({
                              ...provided,
                              borderColor: "#044C84", // Set the desired border color
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
                          <Tab
                            eventKey="Vehicles"
                            title={
                              <div
                                style={{
                                  ...tabButtonStyle,
                                  ...(activeTab === "Vehicles"
                                    ? activeTabButtonStyle
                                    : inactiveTabButtonStyle),
                                }}
                              >
                                Vehicles
                              </div>
                            }
                          >
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
                                        color: "white",
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
                                      <th>Vehicle Status</th>
                                      <th>Trips Count</th>
                                      <th>Vehicle Class</th>
                                      <th>Driver Name</th>
                                      <th>Driver Code</th>
                                      <th>Max Pallet</th>
                                    </tr>
                                  </thead>
                                  <tbody className="mt-3 table-striped">
                                    {filteredVehicles &&
                                      filteredVehicles.map((item, index) => {
                                        const trips = tripCountsByVehicle[item.codeyve] || 0;
                                           const status = trips > 0 ? "Scheduled" : "Available";
                                       return (

                                        <tr key={index} className="text-left">
                                          <td style={{ padding: "0 0 0 20px" }}>
                                            <input
                                              type="checkbox"
                                              onChange={() =>
                                                toggleSelect(item)
                                              }
                                              checked={selectedItems.some(
                                                (selectedItem) =>
                                                  selectedItem.codeyve ===
                                                  item.codeyve
                                              )}
                                            />
                                          </td>
                                          <td
                                            onMouseEnter={() =>
                                              handleMouseEnter(item)
                                            }
                                            onMouseLeave={handleMouseLeave}
                                          >
                                            {item.codeyve}
                                          </td>
                                          <td>{item.name}</td>
                                          <td><span
                                                className={`badge ${status === 'Scheduled' ? 'bg-warning' : 'bg-success'}`}
                                                style={{
                                                  fontSize: '10px',
                                                  fontWeight: '600',
                                                  padding: '8px 14px',
                                                  borderRadius: '12px',
                                                  letterSpacing: '0.3px',
                                                  textTransform: 'uppercase',
                                                }}
                                              >
                                                {status}
                                              </span></td>
                                          <td><span style={{ padding: '8px 14px',fontWeight: '600' }} >
                                                {trips}
                                              </span></td>
                                          <td>{item.className}</td>
                                          <td>
                                            {item.drivername
                                              ? item.drivername
                                              : "---"}
                                          </td>
                                          <td>
                                            {item.driverid
                                              ? item.driverid
                                              : "---"}
                                          </td>
                                          <td>{item.maxqty} PAL</td>
                                        </tr>
                                        );
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            </Row>
                          </Tab>

                          {/* tab for drivers */}
                          <Tab
                            eventKey="Drivers"
                            title={
                              <div
                                style={{
                                  ...tabButtonStyle,
                                  ...(activeTab === "Drivers"
                                    ? activeTabButtonStyle
                                    : inactiveTabButtonStyle),
                                }}
                              >
                                Drivers
                              </div>
                            }
                          >
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
                                        color: "white",
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
                          <Tab
                            eventKey="Drops"
                            title={
                              <div
                                style={{
                                  ...tabButtonStyle,
                                  ...(activeDTab === "Drops"
                                    ? activeTabButtonStyle
                                    : inactiveTabButtonStyle),
                                }}
                              >
                                Deliveries
                              </div>
                            }
                          >
                            <Row>
                              {props.loader ? (
                                <div
                                  style={{
                                    height: "350px",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  <p className="text-center">Loading...</p>
                                </div>
                              ) : (
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
                                          color: "white",
                                          position: "sticky",
                                          top: 0,
                                        }}
                                      >
                                        <th style={{ padding: "0 0 0 20px" }}>
                                          <input
                                            type="checkbox"
                                            // onChange={handleSelectAllDocuments}
                                            onChange={(e) =>
                                              handleSelectAllDrops(e)
                                            }
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
                                          Customer
                                        </th>
                                        <th
                                          style={{
                                            padding: "10px",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          Name
                                        </th>
                                        <th
                                          style={{
                                            padding: "10px",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          Route Code
                                        </th>
                                       <th
                                                                                                                        style={{
                                                                                                                          padding: "10px",
                                                                                                                          whiteSpace: "nowrap",
                                                                                                                        }}
                                                                                                                      >
                                                                                                                        Pallets
                                                                                                                      </th>
                                                                                                                      <th
                                                                                                                                                                style={{
                                                                                                                                                                  padding: "20px",
                                                                                                                                                                  whiteSpace: "nowrap",
                                                                                                                                                                }}
                                                                                                                                                              >
                                                                                                                                                                Cases
                                                                                                                                                              </th>
                                        {/* <th
                                  style={{
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Reference
                                </th> */}

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
                                                  selectedItem.docnum ===
                                                  item.docnum
                                              )}
                                            />
                                          </td>
                                          <td>{item.docnum}</td>
                                          <td style={{ whiteSpace: "nowrap" }}>
                                            {moment(item.docdate).format(
                                              "MM-DD-YYYY"
                                            )}
                                          </td>
                                          <td>{item.bpcode}</td>
                                          <td>{item.bpname}</td>
                                          <td>{item.routeCodeDesc}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{item.noofCases} PAL</td>
                                                                                    <td>{parseInt(item.mainCases)} CS</td>
                                          {/* <td>{item.reference}</td> */}

                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </Row>
                          </Tab>

                          <Tab
                            eventKey="Pickups"
                            title={
                              <div
                                style={{
                                  ...tabButtonStyle,
                                  ...(activeDTab === "Pickups"
                                    ? activeTabButtonStyle
                                    : inactiveTabButtonStyle),
                                }}
                              >
                                Pickups
                              </div>
                            }
                          >
                            <Row>
                              {props.loader ? (
                                <div
                                  style={{
                                    height: "350px",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  <p className="text-center">Loading...</p>
                                </div>
                              ) : (
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
                                          color: "white",
                                          position: "sticky",
                                          top: 0,
                                        }}
                                      >
                                        <th style={{ padding: "0 0 0 20px" }}>
                                          <input
                                            type="checkbox"
                                            onChange={(e) =>
                                              handleSelectAllPickups(e)
                                            }
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
                                        <th
                                                                                  style={{
                                                                                    padding: "10px",
                                                                                    whiteSpace: "nowrap",
                                                                                  }}
                                                                                >
                                                                                  Pallet Count
                                                                                </th>
                                                                                <th
                                                                                                                          style={{
                                                                                                                            padding: "10px",
                                                                                                                            whiteSpace: "nowrap",
                                                                                                                          }}
                                                                                                                        >
                                                                                                                          Cases Count
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
                                                  selectedItem.docnum ===
                                                  item.docnum
                                              )}
                                            />
                                          </td>
                                          <td>{item.docnum}</td>
                                          <td style={{ whiteSpace: "nowrap" }}>
                                            {moment(item.docdate).format(
                                              "MM-DD-YYYY"
                                            )}
                                          </td>
                                          <td>{item.bpcode}</td>
                                          <td>{item.bpname}</td>
                                          <td>{item.routeCodeDesc}</td>
                                          <td>{item.noofCases} PAL</td>
                                          <td>{item.mainCases} CS</td>
                                          {/* <td>{item.reference}</td> */}
                                          <td>{item.routeTag}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
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
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
          >
            {((selectedDropDocuments.length > 0 && selectedItems.length > 0) ||
              (selectedPickupDocuments.length > 0 &&
                selectedItems.length > 0)) && (
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
