import React, { Component } from "react";
import Select from "react-select";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "./Panel/Alert";
import AlertArray from "./Panel/AlertArray";
import AlertSummary from "./Panel/AlertSummary";
import moment from "moment";
import SideNav from "./Nav1/SideNav";
import {
  ConfirmLVS,
  fetchAPI,
  ToAllocationFetchData,
  ToAllocationSubmitData,
  ToLocationsFetchData,
  ToPickData,
  ToStaggingLocationFetchData,
} from "../../service";
import { fetchPanel } from "../../service";
import { fetchTrips } from "../../service";
import { fetchDropsPanel } from "../../service";
import { fetchDropsPanelwithRange } from "../../service";
import { fetchVR, fetchLVS } from "../../service";
import VehiclePanel from "./Panel/VehiclePanel";
import DocumentsPanel from "./Panel/DocumentsPanel";
import AddUpdateTrip1 from "./Panel/AddUpdateTrip1";
import TripsList3 from "./Panel/TripsList3";
import VrHeader from "./Panel/VrHeader";
import VrStops3 from "./Panel/VrStops3";
import Timeline from "./Panel/Timeline";
import RouteMap1 from "./Panel/RouteMap1";
import IndividualRouteMap2 from "./Panel/IndividualRouteMap2";
import VrTotals from "./Panel/VrTotals";
import RouteDetails from "./RouteDetail";
import "./dashboard.scss";
import AutoOptimizationPopup from "./Panel/AutoOptimizationPopup";
import LVSToPickTabs from "../Scheduler2/Panel/ToPickTabs";
import LVSToAllocationTabs from "../Scheduler2/Panel/ToAllocationTabs";

import {
  convertHrToSec,
  convertSecToMin,
  secondsToHms,
  splitTimeAndConv2Sec,
  splitTimeAndAddtimeAndConv2Sec,
  convertSecToHr,
  formatTime,
  formatHHMM,
  splitTime,
  convertHrToMin,
} from "./converterFunctions/converterFunctions";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
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
import classnames from "classnames";

//Import Components
import MiniWidgets from "./MiniWidgets";
import RouteInfoRenderer from "./RouteInfoRenderer";

const optionGroup = [
  { label: "CORPS", value: "corps" },
  { label: "WASTE", value: "waste" },
];

const apiUrl = process.env.REACT_APP_API_URL;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "Vehicles",
      checkedToPlan: false,
      checkedDeliverables: false,
      checkedInProcess: false,
      checked5days: false,
      isDragged: false,
      breadcrumbItems: [
        { title: "Route Planner", link: "#" },
        { title: "Dashboard", link: "#" },
      ],
      optiError: {
        docnum: "",
        skillerrorflg: false,
        skillmessage: "",
        capacatyflg: false,
        capacityError: "",
        generalflg: false,
        genearalError: "",
      },
      isTimeline: false,
      vehicleShow: "block",
      IsAllTripsSelected: false,
      updatetypeTrip: false,
      RouteoptiShow: "none",
      vrShow: "none",
      vrlist: [],
      deliverySite: "",
      loader: false,
      addAlertShow: false,
      errorMessage: "",
      addAlertArrayShow: false,
      addAlertSummaryShow: false,
      errorSummartMessage: "",
      errorArrayMessage: "",
      searchVString: "",
      searchTripString: "",
      searchTString: "",
      searchEString: "",
        docsStartDate: new Date(),
            docsEndDate: new Date(),
      searchDString: "",
      searchDrpString: "",
      searchPckString: "",
      selectedRouteCode: {
        id: "All",
      },
      selectedRoutecodeValue: "",
      RouteCode: null,
      selectedRouteCodeArr: [],
      triplock: false,
      panelSearchString: "",
      vrdetaillist: [],
      openAutoPopup: false,
      selectedDocuments: [],
      loadvehstock: [],
      slectedTrips: [],
      selectedTripData: {},
      checkedsameVehicles: false,
      documentPanel_date: "",
      defaultdocprocess: 90,
      codeExecution: false,
      documentPanel_dateflg: false,
      documentPanel_5dayscheck: false,
      allowedDrivers: [],
      allAllowedDrivers: false,
      allAllowedTrailers: false,
      vehicleDropped: false,
      droppedTrailers: [],
      allowedTrailers: [],
      isDetail: false,
      date: new Date(),
      sites: null,
      selectedSite: {
        id: "All",
      },
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      toPickDataList: [],
      vrlist: [],
      StaggingFromLoc: "",
      toAllocationDataList: [],
      selectedSiteValue: "",
      StaggingFromLocIndex: 0,
      StaggingToLoc: "",
      StaggingToLocIndex:0,
      StaggingFromLoc2: "",
      StaggingFromLoc2Index: 0,
      StaggingToLoc2: "",
      StaggingToLoc2Index: 0,
      guageTrip: {},
      selectedMultipleSites: "",
      markers: [],
      geoData: [],
      mapChanged: false,
      clearTrips: false,
      trips: [],
      isTimeline: false,
      isDetail: false,
      selectedVrIndex: "",
      selectedVrValidated: "",
      slectedTrips: [],
      clickedTrips: [],
      selectedTripData: {},
      default_date: new Date().toDateString().replace(/-/g, "/"),
      dropDate: new Date().toDateString().replace(/-/g, "/"),
      selectedPlace: {},
      vehiclePanel: {
        vehicles: [],
        equipments: [],
        trails: [],
        drivers: [],
      },
      dropsPanel: {
        drops: [],
        pickUps: [],
      },
      dataTransfer: {
        currentCard: "",
        type: "",
        id: "",
        index: -1,
      },
      tripColor: [
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
      ],
      tripbgColor: [
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
        "#26a541",
      ],
      pickOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      dropOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      equpOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      diverOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      vehOrder: [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
      ],
      trailOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      topDetails: {
        vehicleCount: 0,
        routesCount: 0,
        assignedOrders: 0,
        unassignedOrders: 0,
        travelTime: 0,
        serviceTime: 0,
        DropProdCount: 0,
        PickupProdCount: 0,
      },
      tripsPanel: [],
      selectedSitesArr: [],
      reports: [
        {
          icon: "ri-truck-line",
          background: "bg-secondary",
          title: "Vehicles",
          value: "0",
        },
        {
          icon: "ri-route-line",
          background: "bg-primary",
          title: "Routes",
          value: "0",
        },
        {
          icon: "ri-checkbox-circle-line",
          background: "bg-success",
          title: "Assigned Orders",
          value: "0",
        },
        {
          icon: "ri-close-circle-line",
          background: "bg-warning",
          title: "Not Assigned Orders",
          value: "0",
        },
        {
          icon: "ri-logout-box-r-line",
          background: "bg-danger",
          title: "Total Delivery Qty",
          value: "0",
        },
        {
          icon: "ri-logout-box-line",
          background: "bg-info",
          title: "Total Pickup Qty",
          value: "0",
        },
      ],
      googeMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAgLp4IWxgo22lGxq-gP7_0p2bDJA_tbcc&v=3.exp&libraries=geometry,drawing,places",
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.handleDefault = this.handleDefault.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);
    this.tog_standard = this.tog_standard.bind(this);
    this.googleMapRef = React.createRef();
  }

  tog_standard() {
    this.setState((prevState) => ({
      modal_standard: !prevState.modal_standard,
    }));
    this.removeBodyCss();
  }

  removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  toggleDetail(flag) {
    if (this.state.isDetail !== flag) {
      this.setState({ isDetail: flag });
    }
  }
  updateMagChaged = () => {
    this.setState({
      mapChanged: false,
    });
  };

  updateVehSearchTerm = (event) => {
    this.setState({ searchVString: event.target.value });
  };
  updateTrailSearchTerm = (event) => {
    this.setState({ searchTString: event.target.value });
  };
  updateEquSearchTerm = (event) => {
    this.setState({ searchEString: event.target.value });
  };
  updateDriverSearchTerm = (event) => {
    this.setState({ searchDString: event.target.value });
  };
  updateDropSearchTerm = (event) => {
    this.setState({ searchDrpString: event.target.value });
  };
  updatePickupSearchTerm = (event) => {
    this.setState({ searchPckString: event.target.value });
  };

  onDocmessage = (docNum, msg, Msgtype) => {
    // console.log("inside at app", docNum + "-" + msg + "-" + Msgtype);
    var currentGeoData = this.state.geoData;
    var currentMarkers = this.state.markers;
    var trips = [];
    var geoData = [];
    var currMarkers = [];
    var trip = this.state.trips[0];

    currentGeoData &&
      currentGeoData.map((geoData, index) => {
        if (geoData.docnum && geoData.docnum === docNum) {
          if (Msgtype === "doc") {
            geoData.noteMessage = msg;
          } else if (Msgtype === "carrier") {
            geoData.CarrierMessage = msg;
          } else {
            geoData.loaderMessage = msg;
          }
        }
      });

    currentMarkers &&
      currentMarkers.map((currMarker, index) => {
        if (currMarker.docnum && currMarker.docnum === docNum) {
          currMarker.noteMessage = msg;
        }
      });
    trip &&
      trip.totalObject &&
      trip.totalObject.selectedTripData &&
      trip.totalObject.selectedTripData.map((TripData) => {
        if (TripData.docnum && TripData.docnum === docNum) {
          if (Msgtype === "doc") {
            // console.log("inside doc type at app", Msgtype);
            TripData.noteMessage = msg;
          } else if (Msgtype === "carrier") {
            // console.log("inside car type at app", Msgtype);
            TripData.CarrierMessage = msg;
          } else {
            // console.log("inside loader type at app", Msgtype);
            TripData.LoaderMessage = msg;
          }
        }
      });

    geoData.push(currentGeoData);
    currMarkers.push(currentMarkers);
    trips.push(trip);

    this.setState({
      markers: currentMarkers,
      geoData: currentGeoData,
      trips: trips,
    });
  };

  updateTripsSearchTerm = (event) => {
    this.setState({ searchTripString: event.target.value });
  };

  colourDivs = (allDrivers, dlist, allTrailers, tlist) => {
    // console.log("T22 - inside  index, change colorDivs");
    this.setState({
      allAllowedDrivers: allDrivers,
      allAllowedTrailers: allTrailers,
      allowedDrivers: dlist,
      vehicleDropped: true,
      allowedTrailers: tlist,
    });
  };
  colourDocDivs = (drpTrailer) => {
    if (drpTrailer !== null || drpTrailer !== "") {
      this.setState({
        trailerDropped: true,
        droppedTrailers: drpTrailer,
      });
    }
  };

  setCurrentRoutecode = (selectedOption) => {
    var currSelected = {};
    this.state.RouteCode &&
      this.state.RouteCode.map((routecode) => {
        if (selectedOption[0] === routecode.routeNo) {
          currSelected = routecode;
          currSelected.city = routecode.routeDesc;
        }
      });
    this.setState({
      selectedRouteCode: currSelected,
      //selectedMultipleSites: selectedOption
    });
  };

  RouteCodeArr = (val) => {
    this.setCurrentRoutecode(val);
    this.setState({ selectedRouteCodeArr: val });
  };

  sortPickup = (type, index) => {
    var cusDropsPanel = this.state.dropsPanel;
    var cusPick = this.state.dropsPanel.pickUps;
    var picOrder = this.state.pickOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("docnum" === type) {
        cusPick.sort((a, b) => (a.docnum < b.docnum ? 1 : -1));
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site < b.site ? 1 : -1));
      }
      if ("bpcode" === type) {
        cusPick.sort((a, b) => (a.bpcode < b.bpcode ? 1 : -1));
      }
      if ("bpname" === type) {
        cusPick.sort((a, b) => (a.bpname < b.bpname ? 1 : -1));
      }
      if ("doctype" === type) {
        cusPick.sort((a, b) => (a.doctype < b.doctype ? 1 : -1));
      }
      if ("poscode" === type) {
        cusPick.sort((a, b) => (a.poscode < b.poscode ? 1 : -1));
      }
      if ("netweight" === type) {
        cusPick.sort((a, b) => (a.netweight < b.netweight ? 1 : -1));
      }
      if ("volume" === type) {
        cusPick.sort((a, b) => (a.volume < b.volume ? 1 : -1));
      }
      if ("vehicleCode" === type) {
        cusPick.sort((a, b) => (a.vehicleCode < b.vehicleCode ? 1 : -1));
      }
      if ("type" === type) {
        cusPick.sort((a, b) => (a.type < b.type ? 1 : -1));
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site < b.site ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("docnum" === type) {
        cusPick.sort((a, b) => (a.docnum > b.docnum ? 1 : -1));
      }
      if ("bpcode" === type) {
        cusPick.sort((a, b) => (a.bpcode > b.bpcode ? 1 : -1));
      }
      if ("bpname" === type) {
        cusPick.sort((a, b) => (a.bpname > b.bpname ? 1 : -1));
      }
      if ("doctype" === type) {
        cusPick.sort((a, b) => (a.doctype > b.doctype ? 1 : -1));
      }
      if ("poscode" === type) {
        cusPick.sort((a, b) => (a.poscode > b.poscode ? 1 : -1));
      }
      if ("netweight" === type) {
        cusPick.sort((a, b) => (a.netweight > b.netweight ? 1 : -1));
      }
      if ("volume" === type) {
        cusPick.sort((a, b) => (a.volume > b.volume ? 1 : -1));
      }
      if ("vehicleCode" === type) {
        cusPick.sort((a, b) => (a.vehicleCode > b.vehicleCode ? 1 : -1));
      }
      if ("type" === type) {
        cusPick.sort((a, b) => (a.type > b.type ? 1 : -1));
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site > b.site ? 1 : -1));
      }
    }
    cusDropsPanel.pickUps = cusPick;
    this.setState({
      dropsPanel: cusDropsPanel,
      pickOrder: picOrder,
      mapChanged: false,
    });
  };

  sortDrop = (type, index) => {
    var cusDropsPanel = this.state.dropsPanel;
    var cusPick = this.state.dropsPanel.drops;
    var picOrder = this.state.dropOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("docnum" === type) {
        cusPick.sort((a, b) => (a.docnum < b.docnum ? 1 : -1));
      }
      if ("bpcode" === type) {
        cusPick.sort((a, b) => (a.bpcode < b.bpcode ? 1 : -1));
      }
      if ("bpname" === type) {
        cusPick.sort((a, b) => (a.bpname < b.bpname ? 1 : -1));
      }
      if ("doctype" === type) {
        cusPick.sort((a, b) => (a.doctype < b.doctype ? 1 : -1));
      }
      if ("poscode" === type) {
        cusPick.sort((a, b) => (a.poscode < b.poscode ? 1 : -1));
      }
      if ("netweight" === type) {
        cusPick.sort((a, b) => (a.netweight < b.netweight ? 1 : -1));
      }
      if ("volume" === type) {
        cusPick.sort((a, b) => (a.volume < b.volume ? 1 : -1));
      }
      if ("vehicleCode" === type) {
        cusPick.sort((a, b) => (a.vehicleCode < b.vehicleCode ? 1 : -1));
      }
      if ("type" === type) {
        cusPick.sort((a, b) => (a.type < b.type ? 1 : -1));
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site < b.site ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("docnum" === type) {
        cusPick.sort((a, b) => (a.docnum > b.docnum ? 1 : -1));
      }
      if ("bpcode" === type) {
        cusPick.sort((a, b) => (a.bpcode > b.bpcode ? 1 : -1));
      }
      if ("bpname" === type) {
        cusPick.sort((a, b) => (a.bpname > b.bpname ? 1 : -1));
      }
      if ("doctype" === type) {
        cusPick.sort((a, b) => (a.doctype > b.doctype ? 1 : -1));
      }
      if ("poscode" === type) {
        cusPick.sort((a, b) => (a.poscode > b.poscode ? 1 : -1));
      }
      if ("netweight" === type) {
        cusPick.sort((a, b) => (a.netweight > b.netweight ? 1 : -1));
      }
      if ("volume" === type) {
        cusPick.sort((a, b) => (a.volume > b.volume ? 1 : -1));
      }
      if ("vehicleCode" === type) {
        cusPick.sort((a, b) => (a.vehicleCode > b.vehicleCode ? 1 : -1));
      }
      if ("type" === type) {
        cusPick.sort((a, b) => (a.type > b.type ? 1 : -1));
      }
      if ("site" === type) {
        cusPick.sort((a, b) => (a.site > b.site ? 1 : -1));
      }
    }
    cusDropsPanel.drops = cusPick;
    this.setState({
      dropsPanel: cusDropsPanel,
      dropOrder: picOrder,
      mapChanged: false,
    });
  };

  sortEquipement = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.equipments;
    var picOrder = this.state.equpOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("xequipid" === type) {
        cusPick.sort((a, b) => (a.xequipid < b.xequipid ? 1 : -1));
      }
      if ("xdescript" === type) {
        cusPick.sort((a, b) => (a.xdescript < b.xdescript ? 1 : -1));
      }
      if ("xequiptyp" === type) {
        cusPick.sort((a, b) => (a.xequiptyp < b.xequiptyp ? 1 : -1));
      }
      if ("xcodeyve" === type) {
        cusPick.sort((a, b) => (a.xcodeyve < b.xcodeyve ? 1 : -1));
      }
      if ("xfcy" === type) {
        cusPick.sort((a, b) => (a.xfcy < b.xfcy ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("xequipid" === type) {
        cusPick.sort((a, b) => (a.xequipid > b.xequipid ? 1 : -1));
      }
      if ("xdescript" === type) {
        cusPick.sort((a, b) => (a.xdescript > b.xdescript ? 1 : -1));
      }
      if ("xequiptyp" === type) {
        cusPick.sort((a, b) => (a.xequiptyp > b.xequiptyp ? 1 : -1));
      }
      if ("xcodeyve" === type) {
        cusPick.sort((a, b) => (a.xcodeyve > b.xcodeyve ? 1 : -1));
      }
      if ("xfcy" === type) {
        cusPick.sort((a, b) => (a.xfcy > b.xfcy ? 1 : -1));
      }
    }
    cusDropsPanel.equipments = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      equpOrder: picOrder,
      mapChanged: false,
    });
  };

  sortDriver = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.drivers;
    var picOrder = this.state.diverOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("driverid" === type) {
        cusPick.sort((a, b) => (a.driverid < b.driverid ? 1 : -1));
      }
      if ("driver" === type) {
        cusPick.sort((a, b) => (a.driver < b.driver ? 1 : -1));
      }
      if ("licenum" === type) {
        cusPick.sort((a, b) => (a.licenum < b.licenum ? 1 : -1));
      }
      if ("licedat" === type) {
        cusPick.sort((a, b) => (a.licedat < b.licedat ? 1 : -1));
      }
      if ("cty" === type) {
        cusPick.sort((a, b) => (a.cty < b.cty ? 1 : -1));
      }
      if ("poscod" === type) {
        cusPick.sort((a, b) => (a.poscod < b.poscod ? 1 : -1));
      }
      if ("cry" === type) {
        cusPick.sort((a, b) => (a.cry < b.cry ? 1 : -1));
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy < b.fcy ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("driverid" === type) {
        cusPick.sort((a, b) => (a.driverid > b.driverid ? 1 : -1));
      }
      if ("driver" === type) {
        cusPick.sort((a, b) => (a.driver > b.driver ? 1 : -1));
      }
      if ("licenum" === type) {
        cusPick.sort((a, b) => (a.licenum > b.licenum ? 1 : -1));
      }
      if ("licedat" === type) {
        cusPick.sort((a, b) => (a.licedat > b.licedat ? 1 : -1));
      }
      if ("cty" === type) {
        cusPick.sort((a, b) => (a.cty > b.cty ? 1 : -1));
      }
      if ("poscod" === type) {
        cusPick.sort((a, b) => (a.poscod > b.poscod ? 1 : -1));
      }
      if ("cry" === type) {
        cusPick.sort((a, b) => (a.cry > b.cry ? 1 : -1));
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy > b.fcy ? 1 : -1));
      }
    }
    cusDropsPanel.drivers = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      diverOrder: picOrder,
      mapChanged: false,
    });
  };

  sortVehicles = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.vehicles;
    var picOrder = this.state.vehOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("codeyve" === type) {
        cusPick.sort((a, b) => (a.codeyve < b.codeyve ? 1 : -1));
      }
      if ("name" === type) {
        cusPick.sort((a, b) => (a.name < b.name ? 1 : -1));
      }
      if ("startdepotn" === type) {
        cusPick.sort((a, b) => (a.startdepotn < b.startdepotn ? 1 : -1));
      }
      if ("enddepotname" === type) {
        cusPick.sort((a, b) => (a.enddepotname < b.enddepotname ? 1 : -1));
      }
      if ("drivername" === type) {
        cusPick.sort((a, b) => (a.drivername < b.drivername ? 1 : -1));
      }
      if ("lateral" === type) {
        cusPick.sort((a, b) => (a.lateral < b.lateral ? 1 : -1));
      }
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer < b.trailer ? 1 : -1));
      }
      if ("catego" === type) {
        cusPick.sort((a, b) => (a.catego < b.catego ? 1 : -1));
      }
      if ("capacities" === type) {
        cusPick.sort((a, b) => (a.capacities < b.capacities ? 1 : -1));
      }
      if ("vol" === type) {
        cusPick.sort((a, b) => (a.vol < b.vol ? 1 : -1));
      }
      if ("maxordercnt" === type) {
        cusPick.sort((a, b) => (a.maxordercnt < b.maxordercnt ? 1 : -1));
      }
      if ("maxqty" === type) {
        cusPick.sort((a, b) => (a.maxqty < b.maxqty ? 1 : -1));
      }
      if ("starttime" === type) {
        cusPick.sort((a, b) => (a.starttime < b.starttime ? 1 : -1));
      }
      if ("lateststarttime" === type) {
        cusPick.sort((a, b) =>
          a.lateststarttime < b.lateststarttime ? 1 : -1
        );
      }
      if ("maxtotaldist" === type) {
        cusPick.sort((a, b) => (a.maxtotaldist < b.maxtotaldist ? 1 : -1));
      }
      if ("maxtotaltime" === type) {
        cusPick.sort((a, b) => (a.maxtotaltime < b.maxtotaltime ? 1 : -1));
      }
      if ("maxtotaltrvtime" === type) {
        cusPick.sort((a, b) =>
          a.maxtotaltrvtime < b.maxtotaltrvtime ? 1 : -1
        );
      }
      if ("bptnum" === type) {
        cusPick.sort((a, b) => (a.bptnum < b.bptnum ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("codeyve" === type) {
        cusPick.sort((a, b) => (a.codeyve > b.codeyve ? 1 : -1));
      }
      if ("name" === type) {
        cusPick.sort((a, b) => (a.name > b.name ? 1 : -1));
      }
      if ("startdepotn" === type) {
        cusPick.sort((a, b) => (a.startdepotn > b.startdepotn ? 1 : -1));
      }
      if ("enddepotname" === type) {
        cusPick.sort((a, b) => (a.enddepotname > b.enddepotname ? 1 : -1));
      }
      if ("drivername" === type) {
        cusPick.sort((a, b) => (a.drivername > b.drivername ? 1 : -1));
      }
      if ("lateral" === type) {
        cusPick.sort((a, b) => (a.lateral > b.lateral ? 1 : -1));
      }
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer > b.trailer ? 1 : -1));
      }
      if ("catego" === type) {
        cusPick.sort((a, b) => (a.catego > b.catego ? 1 : -1));
      }
      if ("starttime" === type) {
        cusPick.sort((a, b) => (a.starttime > b.starttime ? 1 : -1));
      }
      if ("lateststarttime" === type) {
        cusPick.sort((a, b) =>
          a.lateststarttime > b.lateststarttime ? 1 : -1
        );
      }
      if ("capacities" === type) {
        cusPick.sort((a, b) => (a.capacities > b.capacities ? 1 : -1));
      }
      if ("vol" === type) {
        cusPick.sort((a, b) => (a.vol > b.vol ? 1 : -1));
      }
      if ("maxordercnt" === type) {
        cusPick.sort((a, b) => (a.maxordercnt > b.maxordercnt ? 1 : -1));
      }
      if ("maxqty" === type) {
        cusPick.sort((a, b) => (a.maxqty > b.maxqty ? 1 : -1));
      }
      if ("maxtotaldist" === type) {
        cusPick.sort((a, b) => (a.maxtotaldist > b.maxtotaldist ? 1 : -1));
      }
      if ("maxtotaltime" === type) {
        cusPick.sort((a, b) => (a.maxtotaltime > b.maxtotaltime ? 1 : -1));
      }
      if ("maxtotaltrvtime" === type) {
        cusPick.sort((a, b) =>
          a.maxtotaltrvtime > b.maxtotaltrvtime ? 1 : -1
        );
      }
      if ("bptnum" === type) {
        cusPick.sort((a, b) => (a.bptnum > b.bptnum ? 1 : -1));
      }
    }
    cusDropsPanel.vehicles = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      vehOrder: picOrder,
      mapChanged: false,
    });
  };

  sortTrailer = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel;
    var cusPick = this.state.vehiclePanel.trails;
    var picOrder = this.state.trailOrder;
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0;
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer < b.trailer ? 1 : -1));
      }
      if ("des" === type) {
        cusPick.sort((a, b) => (a.des < b.des ? 1 : -1));
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy < b.fcy ? 1 : -1));
      }
      if ("typ" === type) {
        cusPick.sort((a, b) => (a.typ < b.typ ? 1 : -1));
      }
      if ("model" === type) {
        cusPick.sort((a, b) => (a.model < b.model ? 1 : -1));
      }
      if ("maxloams" === type) {
        cusPick.sort((a, b) => (a.maxloams < b.maxloams ? 1 : -1));
      }
      if ("maxlovol" === type) {
        cusPick.sort((a, b) => (a.maxlovol < b.maxlovol ? 1 : -1));
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1;
      if ("trailer" === type) {
        cusPick.sort((a, b) => (a.trailer > b.trailer ? 1 : -1));
      }
      if ("des" === type) {
        cusPick.sort((a, b) => (a.des > b.des ? 1 : -1));
      }
      if ("fcy" === type) {
        cusPick.sort((a, b) => (a.fcy > b.fcy ? 1 : -1));
      }
      if ("typ" === type) {
        cusPick.sort((a, b) => (a.typ > b.typ ? 1 : -1));
      }
      if ("model" === type) {
        cusPick.sort((a, b) => (a.model > b.model ? 1 : -1));
      }
      if ("maxloams" === type) {
        cusPick.sort((a, b) => (a.maxloams > b.maxloams ? 1 : -1));
      }
      if ("maxlovol" === type) {
        cusPick.sort((a, b) => (a.maxlovol > b.maxlovol ? 1 : -1));
      }
    }
    cusDropsPanel.trails = cusPick;
    this.setState({
      vehiclePanel: cusDropsPanel,
      trailOrder: picOrder,
      mapChanged: false,
    });
  };

  //  await this.submitRoutesforTripsCreationOSRMManually(res.result.routes, selSite, vehObject, processtrip,[], res.result,jobId);

  submitRoutesforTripsCreationOSRMManually = async (
    routes,
    site,
    Vehicle,
    alreadyTrip,
    res,
    result,
    JOBID,
    assignedShipments,
    assignedJobs,
    from
  ) => {
    // console.log("OSRM inside last step")
    this.setState({ loader: true });
    let existingTrip = alreadyTrip;
    var RouteprocessedData = [];
    var sameProcessUsedDriversList = [];
    var TripsfromRoutes = [];
    // console.log("OSRM Auto Routes data are", routes);
    for (let k = 0; k < routes.length; k++) {
      var currRoute = routes[k];
      var Veh = routes[k].description;
      var auto_tot_travel_time = formatTime(routes[k].duration);
      var auto_total_time = (routes[k].duration + routes[k].service) / 60 / 60;
      var auto_service_time = routes[k].service / 60 / 60;
      var auto_tot_distance = routes[k].distance / 1000;
      // // console.log("OSRM Auto  veh are",Vehicle);
      var dropObject = [],
        pickupObject = [],
        drops = 0,
        pickups = 0;
      var startTime = "",
        endTime = "";
      var totalWeight = 0;
      var ddate = "";
      var totalVolume = 0;
      var fld_per_capacity = 0;
      var fld_per_volume = 0;
      var fld_doc_capacity = 0;
      var fld_doc_volume = 0;
      var fld_doc_qty = 0;
      var fld_uom_qty = "";
      var flds_doc_capacity = "";
      var flds_per_capacity = "";
      var flds_doc_volume = "";
      var flds_per_volume = "";
      var fld_uom_capacity = "";
      var fld_uom_volume = "";
      var weight = "";
      var volume = "";
      var vol_unit = "";
      var wei_unit = "";
      var percentageMass = 0;
      var percentageVolume = 0;
      var VehicleObject = Vehicle;
      var flds_uom_capacity = "";
      var flds_uom_volume = "";
      var vehobj = [];
      var itemTrip = {
        selectedTripData: [],
        timelineInterval: [],
        equipments: [],
        trailers: [],
        quantities: [],
      };
      var timelneInterval = [];
      // itemTrip.selectedTripData = GroupedObjects;
      // itemTrip.timelineInterval = [];
      itemTrip.equipments = [];
      itemTrip.trailers = [];
      itemTrip.quantities = [];
      var freqtype = false;
      var appointmentExist = false;

      // loop thorugh the documents steps
   let tempBreakno = 0;
      for (let t = 0; t < currRoute.steps.length; t++) {
        var ttime = "";
        var currTask = currRoute.steps[t];
        // // console.log("OSRM Auto  curr task are",currTask);
        if (currTask.type !== "start" && currTask.type !== "end") {
          var docno = currTask.description;
          console.log("THHH OSRM Auto  curr task is job", currTask);
          if (
            currTask.type === "job" ||
            currTask.type === "pickup" ||
            currTask.type === "delivery"
          ) {
            const combinedArray = [
              ...this.state.dropsPanel.drops,
              ...this.state.dropsPanel.pickUps,
            ];
            console.log("OSRM Auto  curr combinedArray ", combinedArray);
            for (let d = 0; d < combinedArray.length; d++) {
              var currDoc = combinedArray[d];
              console.log("OSRM Auto  curr doc is job,", currDoc);
              var SelectedDoc = [];
              if (currDoc.docnum === docno) {
                currDoc.vehicleCode = Veh;
                currDoc.arrival = secondsToHms(currTask.arrival);
                currDoc.time = convertSecToMin(currTask.duration);
                // console.log("OSRM curr task", currTask)
                // console.log("OSRM curr task", currTask)
                let tempwaittime = convertHrToSec(currDoc.waitingTime);
                let tempservicetime = currTask.service - tempwaittime;
                currDoc.serTime = secondsToHms(tempservicetime);
                // console.log("OSRM curr task", currDoc.serTime)
                currDoc.distance = currTask.distance / 1000;
                currDoc.end = secondsToHms(currTask.arrival + currTask.service);
                ttime = currDoc.arrival;
                if (currDoc.doctype === "PRECEIPT") {
                  pickups = pickups + 1;
                  currDoc.panelType = "pickup";
                  pickupObject.push(currDoc);
                  fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                  fld_doc_volume = fld_doc_volume + currDoc.volume;

                  let tempqty = 0,
                    tempuom = "";
                  currDoc.products &&
                    currDoc.products.length > 0 &&
                    currDoc.products.map((prod, index) => {
                      tempqty = tempqty + parseInt(prod.quantity);
                      tempuom = prod.uom;
                    });
                  fld_doc_qty = fld_doc_qty + tempqty;
                  // fld_uom_qty = fld_uom_qty + tempuom;
                  if (!fld_uom_qty.includes(tempuom)) {
                    fld_uom_qty += tempuom;
                  }
                } else {
                  drops = drops + 1;
                  currDoc.panelType = "drop";
                  dropObject.push(currDoc);
                  fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                  fld_doc_volume = fld_doc_volume + currDoc.volume;

                  let tempqty = 0,
                    tempuom = "";
                  currDoc.products &&
                    currDoc.products.length > 0 &&
                    currDoc.products.map((prod, index) => {
                      tempqty = tempqty + parseInt(prod.quantity);
                      tempuom = prod.uom;
                    });
                  fld_doc_qty = fld_doc_qty + tempqty;
                  // fld_uom_qty = fld_uom_qty + tempuom;
                  if (!fld_uom_qty.includes(tempuom)) {
                    fld_uom_qty += tempuom;
                  }
                }
                itemTrip.selectedTripData.push(currDoc);
                totalWeight = totalWeight + parseFloat(currDoc.netweight);
                totalVolume = totalVolume + parseFloat(currDoc.volume);
                break;
              }
            }
            //end of search task with document panel
          } else if (currTask.type === "layover") {
            console.log("THHH at layover");
            let currDoc = {};
            currDoc.vehicleCode = Veh;


            tempBreakno = tempBreakno + 1;
                      currDoc.vehicleCode = Veh;
                      currDoc.doctype = "BREAK";
                      currDoc.breaktype = 1;
                      currDoc.site = site;
                      currDoc.docdate = moment.tz(ddate, "").format("YYYY-MM-DD");
                      currDoc.docnum = "Break" + tempBreakno;
                      ttime = secondsToHms(currTask.arrival);
                      // console.log("OSRM curr task", currTask)
                      // console.log("OSRM curr task", currTask)
                      //    let tempwaittime = convertHrToSec(currDoc.waitingTime)

                      // console.log("OSRM curr task", currDoc.serTime)
            currDoc.type = currTask.type;
            currDoc.arrival = secondsToHms(currTask.arrival);
            currDoc.time = convertSecToMin(currTask.duration);
            // console.log("OSRM curr task", currTask)
            // console.log("OSRM curr task", currTask)
            //    let tempwaittime = convertHrToSec(currDoc.waitingTime)
            let tempservicetime = currTask.service; //- tempwaittime;
            currDoc.serTime = secondsToHms(tempservicetime);
             currDoc.waitingTime = 0;
                                  currDoc.serviceTime = convertSecToHr(tempservicetime);
            // console.log("OSRM curr task", currDoc.serTime)
            currDoc.distance = currTask.distance / 1000;
            currDoc.end = secondsToHms(currTask.arrival + currTask.service);
            itemTrip.selectedTripData.push(currDoc);
          }
        } // end of if, task
        else if (currTask.type === "start") {
          // // console.log("OSRM start task",currTask.arrival);
          startTime = secondsToHms(currTask.arrival);
          ttime = startTime;
        } else if (currTask.type === "end") {
          endTime = secondsToHms(currTask.arrival);
          ttime = endTime;
          // // console.log("OSRM end task",currTask.arrival);
        }

        //for timeline
        var index = t * 12;
        timelneInterval.push({ value: index, label: ttime });

        // // console.log("OSRM timline data  =",timelneInterval);
      } // end of steps
      // totalWeight = 0 //totalWeight + parseInt(docItem.obbject.netweight);
      // totalVolume = 0 //totalVolume + parseInt(docItem.obbject.volume);
      ddate = existingTrip.docdate;

      itemTrip.timelineInterval = timelneInterval;
      var TimelineInterval = VehicleObject.timelineInterval;
      var stops = pickups + drops;
      var site = VehicleObject.fcy;
      var capacity = VehicleObject.capacities;
      var fld_tot_capacity = VehicleObject.capacities;
      var fld_tot_volume = VehicleObject.vol;
      var fld_uom_capacity = VehicleObject.xweu;
      var fld_uom_volume = VehicleObject.xvol;

      fld_per_capacity = Math.round(
        (fld_doc_capacity / fld_tot_capacity) * 100
      );
      fld_per_volume = Math.round((fld_doc_volume / fld_tot_volume) * 100);

      // // console.log("OSRM Vehicle Object =",VehicleObject);
      var volume = VehicleObject.vol;
      //  var StartTime = VehicleObject.timelineInterval[0].label;
      vehobj = VehicleObject;
      flds_uom_capacity = VehicleObject.xweu;
      flds_uom_volume = VehicleObject.xvol;

      if (totalWeight > 0) {
        // Convert totalWeight and capacity to floating-point numbers
        let weight = parseFloat(totalWeight);
        let cap = parseFloat(capacity);

        // Calculate the percentage mass and format it to one decimal place
        percentageMass = ((weight / cap) * 100).toFixed(2);

        // Store values as floating-point numbers
        flds_doc_capacity = weight;
        flds_per_capacity = percentageMass;
      }

      if (totalVolume > 0) {
        // Convert totalVolume and volume to floating-point numbers
        let volumeVal = parseFloat(totalVolume);
        let vol = parseFloat(volume);

        // Calculate the percentage volume and format it to one decimal place
        percentageVolume = ((volumeVal / vol) * 100).toFixed(2);

        // console.log(percentageVolume, "this is percentage volume afer calaulation")
        // Store values as floating-point numbers
        flds_doc_volume = volumeVal;
        flds_per_volume = percentageVolume;
      }
      totalVolume =
        totalVolume % 1 === 0
          ? totalVolume.toString() // If the number is an integer, show it without decimals
          : totalVolume.toFixed(2); // Otherwise, show it rounded to three decimal places

      totalWeight =
        totalWeight % 1 === 0 ? totalWeight.toString() : totalWeight.toFixed(2);

      var today = new Date();
      var execdate = today.getDate();

      existingTrip.date = moment.tz(ddate, "").format("YYYY-MM-DD");
      existingTrip.docdate = moment.tz(ddate, "").format("YYYY-MM-DD");
      existingTrip.datexec = today;
      existingTrip.endDate = ddate;
      existingTrip.tot_capacity = fld_tot_capacity;
      existingTrip.tot_volume = fld_tot_volume;
      existingTrip.doc_capacity = fld_doc_capacity;
      existingTrip.doc_volume = fld_doc_volume;
      existingTrip.doc_qty = fld_doc_qty;
      existingTrip.uom_qty = fld_uom_qty;
      existingTrip.per_capacity = fld_per_capacity;
      existingTrip.per_volume = fld_per_volume;
      existingTrip.uom_capacity = fld_uom_capacity;
      existingTrip.uom_volume = fld_uom_volume;
      existingTrip.generatedBy = "AutoMScheduler";
      existingTrip.vehicleObject = vehobj;
      existingTrip.optistatus = "Optimized";
      existingTrip.capacities = capacity;
      existingTrip.adeptime = startTime;
      existingTrip.startTime = startTime;
      existingTrip.endTime = endTime;
      existingTrip.pickups = pickups;
      existingTrip.lock = false;
      existingTrip.pickupObject = pickupObject;
      existingTrip.dropObject = dropObject;
      existingTrip.totalObject = itemTrip;
      existingTrip.drops = drops;
      existingTrip.stops = stops;
      existingTrip.startIndex = stops;
      existingTrip.pickUps = pickups;
      existingTrip.timelineInterval = TimelineInterval;
      existingTrip.weightPercentage = percentageMass;
      existingTrip.volumePercentage = percentageVolume;
      existingTrip.totalWeight = totalWeight + " " + flds_uom_capacity;
      existingTrip.totalVolume = totalVolume + " " + flds_uom_volume;
      existingTrip.travelTime = auto_tot_travel_time;
      existingTrip.serviceTime = auto_service_time;
      existingTrip.totalTime = auto_total_time;
      existingTrip.totalDistance = auto_tot_distance;
      existingTrip.pickups = pickups;
      existingTrip.route = true;
      /*

        // // console.log("OSRM Auto Routes data are",routes[k]);
        var trip = {
          arrSite: site,
          code: Veh,
          date: moment.tz(ddate, '').format("YYYY-MM-DD"),
          docdate: moment.tz(ddate, '').format("YYYY-MM-DD"),
          endDate       : ddate,
          depSite: site,
          freqExist: freqtype,
          appointment: appointmentExist,
          poProcessed: false,
          tot_capacity: fld_tot_capacity,
          tot_volume: fld_tot_volume,
          doc_capacity: fld_doc_capacity,
          doc_volume: fld_doc_volume,
          per_capacity: fld_per_capacity,
          per_volume: fld_per_volume,
          uom_capacity: fld_uom_capacity,
          uom_volume: fld_uom_volume,
          dlvystatus: 0,
          lvsno: null,
          credattim: new Date(),
          upddattim: new Date(),
          // datexec : new Date(),
          datexec: new Date(),
          driverName: defaultDrivername,
          driverId: defaultDriver,
          generatedBy: 'AutoScheduler',
          defaultDriver: '',
          trailers: defaultTrailerCount_a,
          site: site,
          equipments: 0,
          vehicleObject: vehobj,
          optistatus: 'Optimized',
          capacities: capacity,
          adeptime: startTime,
          startTime: startTime,
          endTime: endTime,
          trips: 1,
          pickups: pickups,
          lock: false,
          pickupObject: pickupObject,
          dropObject: dropObject,
          totalObject: itemTrip,
          equipmentObject: [],
          trialerObject: defaultTrailerObject_a,
          drops: drops,
          stops: stops,
          startIndex: stops,
          pickUps: pickups,
          timelineInterval: TimelineInterval,
          trailerList: [],
          trailerLink: '',
          forceSeq: false,
          currDropsPanel: {
            drops: [],
            pickUps: []
          },
          pickups: pickups,
          alldrivers: '',
          weightPercentage: percentageMass,
          volumePercentage: percentageVolume,
          totalWeight: totalWeight + " " + wei_unit,
          totalVolume: totalVolume + " " + vol_unit,
          travelTime: auto_tot_travel_time,
          serviceTime: auto_service_time,
          totalTime: auto_total_time,
          totalDistance: 0,
          fixedCost: 0,
          totalCost: 0,
          distanceCost: 0,
          regularCost: 0,
          overtimeCost: 0,
          timeCost: 0,
          driverslist: '',
          allcustomers: '',
          customerlist: '',

        }
        */

      RouteprocessedData.push(existingTrip);
    }
    // // console.log("OSRM Final TripsList =",RouteprocessedData);
    TripsfromRoutes = RouteprocessedData;
    // // console.log(TripsfromRoutes);
    //   this.ConfirmScheduledTrips(TripsfromRoutes);
    /*
            fetch(`${process.env.REACT_APP_API_URL}/api/v1/transport/trips`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trips)
              }).then((response) => {
                // // console.log("inside after trip - response",response);
                this.handleErrors(response);
              }).then(function (response) {

              }).then(() => {
                // // console.log("inside submit Trips",this.state.date);
                this.handleDateRangeChange();
              }).then(() => {
                this.setState({ laoder: false, checkedTrip: false, isDetail: false });
                this.notifySucess("Trip Added/Updated Sucessfully");
              }).catch(error => {
                this.handleDateRangeChange();
                this.setState({ loader: false });
                this.notifyError("Please add proper trip to add or update, with vehicle, drops and pickups");
              });

              */
    try {
      let fresponse = await fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/trips`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(TripsfromRoutes),
        }
      );

      if (fresponse.status === 200) {
        this.reloadTrips();
        this.notifySucess("Trip Optimised Successfully");
        this.setState({ loader: false });
      } else {
        this.notifyError("Trip is not optimised properly");
      }
    } catch (error) {
      console.error("Error in processing trip:", error);
      this.setState({
        errorMessage: "Error in processing trip",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  convertDateTimeToSeconds = (datetimeString) => {
    const date = new Date(datetimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 3600 + minutes * 60;
  };

  NB_manuallytrip = async (optitrip, from, updatedDAtefromTimeline, OptimisationFlag) => {
    this.setState({ loader: true });
    let processtrip = optitrip;

    let vehile_profile_options = {
      routing: {
        mode: "car",
        traffic_timestamp: 1724679300,
        profiles: {
          car: {
            mode: "car",
            avoid: ["highway"],
          },
          minivan: {
            mode: "truck",
            truck_weight: 10000,
            truck_size: "200,210,400",
            avoid: ["toll", "left_turn"],
          },
        },
      },
    };

    let postAPICode =
      "https://api.nextbillion.io/optimization/v2?key=b1cebb49fcaa4366abcb19cfb12b43b3";

    let locationArraybefore = [];

    // console.log("to process trip is", processtrip)
    let selectedTripdata = processtrip.totalObject.selectedTripData;
    // get site details
    let VehListM = [],
      DocListM = [];
       let VehicleID_Relations = '';
    let veh = {},
      vehObject = {};
    let siteLatM, siteLangM;
    let docM = {};
    let selSite = this.state.selectedMultipleSites[0];
    // // console.log("OSRM- sel site", selSite);
    this.state.sites.map((site) => {
      if (selSite === site.id) {
        siteLatM = site.lat;
        siteLangM = site.lng;

        let newCoord = `${siteLatM},${siteLangM}`;
        locationArraybefore.push(newCoord);
      }
    });

    // get vehicle from the vehicle list

    for (let vi = 0; vi < this.state.vehiclePanel.vehicles.length; vi++) {
      let tempveh = this.state.vehiclePanel.vehicles[vi];
      if (processtrip.code === tempveh.codeyve) {
        vehObject = tempveh;
        let MVeh = {};

        // // console.log("OSRM tempveh info", tempveh);
        MVeh.max_travel_time = convertHrToSec(tempveh.maxtotaltrvtime);

        if (tempveh.xmaxtotaldis === "Miles") {
          MVeh.max_distance = Math.round(tempveh.maxtotaldist * 1609.34);
        } else {
          MVeh.max_distance = Math.round(tempveh.maxtotaldist * 1000);
        }
        MVeh.capacity = [parseInt(tempveh.capacities), parseInt(tempveh.vol)];
        MVeh.id = tempveh.codeyve;
         VehicleID_Relations = tempveh.codeyve;
        MVeh.start_index = 0;
        MVeh.end_index = 0;

        MVeh.description = tempveh.codeyve;
        let starttime = splitTimeAndConv2Sec(tempveh.starttime);
        if (from === "TimeLine") {
          starttime = this.convertDateTimeToSeconds(updatedDAtefromTimeline);
        }
        let loadingHrs = convertHrToSec(tempveh.startdepots);
        let stime = starttime + loadingHrs;
        // // console.log("loading hrs =",loadingHrs);
        let etime = splitTimeAndAddtimeAndConv2Sec(
          tempveh.starttime,
          tempveh.overtimestar
        );
        let timew = [stime, etime];
        let geo = [siteLangM, siteLatM];

        MVeh.time_window = timew;
        MVeh.start = geo;
        MVeh.end = geo;
        // // console.log("tempveh.skills:", tempveh.skills);
        var array = JSON.parse("[" + tempveh.skills + "]");
        MVeh.skills = array;
        if (veh.maxordercnt > 0) {
          MVeh.max_tasks = 99;
        } else {
          MVeh.max_tasks = 99;
        }
        let breakArray = [];
        let Break1 = {
          id: 1,
          time_windows: [[1662105600, 1662148800]],
          service: 120,
        };

        breakArray.push(Break1);

        MVeh.breaks = breakArray;
        let continousdrivingBreak = {
          max_continuous_driving: 14400,
          layover_duration: 900,
        };
        MVeh.drive_time_layover_config = continousdrivingBreak; // continous break based on driving
        //   MVeh.profile =  "car";

        // // console.log("OSRM Vehicle details",Veh)
        VehListM.push(MVeh);
        break;
      }
    }

    // get the list of documents to process
    const jobs = [];
    const shipments = [];
    const receiptPickupMap = {};
    const receiptsObj = {};
    const relations = [];
    let idCounter = 1; // Start ID from 1
let relationSteps = [{ "type": "start" }];

    for (let j1 = 0; j1 < selectedTripdata.length; j1++) {


      let item = selectedTripdata[j1];

      if(item.doctype !== 'BREAK') {

      if (item.doctype === "PRECEIPT" && item.docnum) {
        const id = idCounter++;

        let newCoord = `${item.lat},${item.lng}`;
        let loc_index = locationArraybefore.push(newCoord) - 1; // Get the index

        // Convert skills to an array (handle empty case)
        //   const skills = item.skills ? JSON.parse("[" + item.skills + "]") : [];

        let skillsArray;
        try {
          let parsedSkills = JSON.parse("[" + item.skills + "]");
          if (
            Array.isArray(parsedSkills) &&
            parsedSkills.every((skill) => typeof skill === "number")
          ) {
            skillsArray = parsedSkills;
            // loc_i = loc_i + 1;
          } else {
            console.warn(
              `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
            );
            // **Exclude the entire document**
          }
        } catch (e) {
          console.warn(
            `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
          );
          // **Exclude the entire document**
        }

        if (item.pairedDoc && item.pairedDoc.trim() !== "") {
          receiptPickupMap[item.docnum] = id;
          receiptsObj[item.docnum] = {
            id: id,
            location_index: loc_index, // Replace with real coordinates
            service: parseInt(convertHrToSec(item.serviceTime)) + parseInt(convertHrToSec(item.waitingTime)),
            amount: [parseInt(item.netweight), parseInt(item.volume)],
            description: item.docnum,
            skills: skillsArray,
            priority: parseInt(item.priority),
          };

          shipments.push({
            pickup: receiptsObj[item.docnum],
          });
           relationSteps.push({ "type": "pickup", "id": id }); // Add to relations
        } else {
          jobs.push({
            id: id,
            location_index: loc_index, // Replace with real coordinates
            service: parseInt(convertHrToSec(item.serviceTime)) + parseInt(convertHrToSec(item.waitingTime)),
            amount: [parseInt(item.netweight), parseInt(item.volume)],
            description: item.docnum,
            skills: skillsArray,
            priority: parseInt(item.priority),
          });
           relationSteps.push({ "type": "job", "id": id }); // Add to relations
        }
      }

        }
    }

    for (let j = 0; j < selectedTripdata.length; j++) {

      let item = selectedTripdata[j];
           if(item.doctype !== 'BREAK') {
      if (item.doctype !== "PRECEIPT" && item.docnum) {
        const deliveryId = idCounter++;

        let newCoord = `${item.lat},${item.lng}`;
        let loc_index = locationArraybefore.push(newCoord) - 1; // Get the index

        // Convert skills to an array (handle empty case)
        let skillsArray;
        try {
          let parsedSkills = JSON.parse("[" + item.skills + "]");
          if (
            Array.isArray(parsedSkills) &&
            parsedSkills.every((skill) => typeof skill === "number")
          ) {
            skillsArray = parsedSkills;
            // loc_i = loc_i + 1;
          } else {
            console.warn(
              `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
            );
            // **Exclude the entire document**
          }
        } catch (e) {
          console.warn(
            `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
          );
          // **Exclude the entire document**
        }

        if (item.pairedDoc.trim() !== "" && receiptPickupMap[item.pairedDoc]) {
          // If delivery is linked to a receipt, create a shipment
          const shipment = shipments.find(
            (s) => s.pickup.id === receiptPickupMap[item.pairedDoc]
          );

          if (shipment) {
            // Add delivery to the existing shipment
            const deliveryKey = shipment.delivery
              ? `delivery_${Object.keys(shipment).length - 1}`
              : "delivery";

            shipment[deliveryKey] = {
              id: deliveryId,
              location_index: loc_index,
              service: parseInt(convertHrToSec(item.serviceTime)) + parseInt(convertHrToSec(item.waitingTime)),
              amount: [parseInt(item.netweight), parseInt(item.volume)],
              description: item.docnum,
              skills: skillsArray,
              priority: parseInt(item.priority),
            };
             relationSteps.push({ "type": "delivery", "id": deliveryId }); // Add delivery to relations
          } else {
            // Paired document exists but is not in reality
            jobs.push({
              id: deliveryId,
              location_index: loc_index, // Replace with real coordinates
              service: parseInt(convertHrToSec(item.serviceTime)) + parseInt(convertHrToSec(item.waitingTime)),
              amount: [parseInt(item.netweight), parseInt(item.volume)],
              description: item.docnum,
              skills: skillsArray,
              priority: parseInt(item.priority),
            });
            relationSteps.push({ "type": "job", "id": deliveryId }); // Add job to relations
          }
        } else {
          // If no pairing, add as a standalone job
          if (item.pairedDoc.trim() === "") {
            jobs.push({
              id: deliveryId,
              location_index: loc_index, // Replace with real coordinates
              service: parseInt(convertHrToSec(item.serviceTime)) + parseInt(convertHrToSec(item.waitingTime)),
              amount: [parseInt(item.netweight), parseInt(item.volume)],
              description: item.docnum,
              skills: skillsArray,
              priority: parseInt(item.priority),
            });
             relationSteps.push({ "type": "job", "id": deliveryId }); // Add to relations
          }
        }
      }
      //  DocListM.push(Doc);
        }
    }

  relationSteps.push({ "type": "end" });


   if(!OptimisationFlag) {
      relations.push({
        "type": "in_sequence",
        "steps": relationSteps,
        "vehicle": VehicleID_Relations // Ensure it follows the same vehicle route
      });



      relations.push({
        "type": "in_same_route",
        "steps": relationSteps
      });
      }


    let finallocationList = locationArraybefore; // for another type optimisation this.formatLocationCoordinates(locationArraybefore);
    let locactionsFinal = {
      id: 1,
      location: finallocationList,
    };

    let nextBillonObject = {
      jobs: jobs,
      shipments: shipments,
      options: vehile_profile_options,
      //   "options": vehile_profile_options,
      locations: locactionsFinal,
      "relations": relations,
      vehicles: VehListM,
    };

    try {
      let response = await fetch(`${postAPICode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextBillonObject),
      });
      console.log("THHH response", response);
      if (response.status === 200) {
        if (!response.ok) {
          const errorDetails = await response.json();
          console.error("THHH Error:", errorDetails);
          this.setState({ loader: false });
        } else {
          const data = await response.json();
          console.log("THHH Response:", data);
          await this.OrganiseNextBillionsResponse_GroupOptimise(
            data,
            selSite,
            vehObject,
            processtrip
          ); //  await this.submitRoutesforTripsCreationOSRMManually(response.routes, selSite, vehObject, processtrip,[], response);
          this.setState({ loader: false });
        }
      } else {
        console.error("THHH Error in ArcGIS response:", response.status);
        this.setState({ loader: false });
      }
    } catch (error) {
      console.error("Error in processing trip:", error);
      this.setState({
        errorMessage: "Error in processing trip",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  OSRM_manuallytrip = async (optitrip) => {
    this.setState({ loader: true });
    let processtrip = optitrip;
    // console.log("to process trip is", processtrip)
    let selectedTripdata = processtrip.totalObject.selectedTripData;
    // get site details
    let VehListM = [],
      DocListM = [];
    let veh = {},
      vehObject = {};
    let siteLatM, siteLangM;
    let docM = {};
    let selSite = this.state.selectedMultipleSites[0];
    // // console.log("OSRM- sel site", selSite);
    this.state.sites.map((site) => {
      if (selSite === site.id) {
        siteLatM = site.lat;
        siteLangM = site.lng;
      }
    });

    // get vehicle from the vehicle list

    for (let vi = 0; vi < this.state.vehiclePanel.vehicles.length; vi++) {
      let tempveh = this.state.vehiclePanel.vehicles[vi];
      if (processtrip.code === tempveh.codeyve) {
        vehObject = tempveh;
        let MVeh = {};

        // // console.log("OSRM tempveh info", tempveh);
        MVeh.max_travel_time = convertHrToSec(tempveh.maxtotaltrvtime);
        MVeh.capacity = [tempveh.capacities];
        MVeh.id = 1;
        MVeh.description = tempveh.codeyve;
        let starttime = splitTimeAndConv2Sec(tempveh.starttime);
        let loadingHrs = convertHrToSec(tempveh.startdepots);
        let stime = starttime + loadingHrs;
        // // console.log("loading hrs =",loadingHrs);
        let etime = splitTimeAndAddtimeAndConv2Sec(
          tempveh.starttime,
          tempveh.overtimestar
        );
        let timew = [stime, etime];
        let geo = [siteLangM, siteLatM];

        MVeh.time_window = timew;
        MVeh.start = geo;
        MVeh.end = geo;
        // // console.log("tempveh.skills:", tempveh.skills);
        var array = JSON.parse("[" + tempveh.skills + "]");
        MVeh.skills = array;
        if (veh.maxordercnt > 0) {
          MVeh.max_tasks = 99;
        } else {
          MVeh.max_tasks = 99;
        }
        // // console.log("OSRM Vehicle details",Veh)
        VehListM.push(MVeh);
        break;
      }
    }

    // get the list of documents to process

    for (let j = 0; j < selectedTripdata.length; j++) {
      let doc = selectedTripdata[j];
      var Doc = {};
      // // console.log("OSRM doc count =",j);
      // // console.log("OSRM doc info",doc);
      Doc.id = j + 1;
      Doc.description = doc.docnum;
      // // console.log("OSRM doc ",doc);

      var FromArr;
      var fromflag = false;
      var toflag = false;
      if (doc.fromTime.length > 0) {
        FromArr = doc.fromTime.split(" ");
        fromflag = true;
      }
      var ToArr;
      if (doc.toTime.length > 0) {
        ToArr = doc.toTime.split(" ");
        toflag = true;
      }

      // // console.log("OSRM doc from",FromArr);
      // // console.log("OSRM doc to",ToArr);

      var timeWindw = [];

      fromflag &&
        FromArr.map((ft, index) => {
          var tt = [];
          // // console.log("OSRM doc ft",ft);
          tt.push(splitTimeAndConv2Sec(ft));
          // // console.log("OSRM doc tt",ToArr[index]);
          tt.push(splitTimeAndConv2Sec(ToArr[index]));

          timeWindw.push(tt);
        });

      // // console.log("OSRM doc Final Time Window",timeWindw);

      var DocLat, DocLang;
      DocLat = doc.lat;
      DocLang = doc.lng;
      Doc.location = [DocLang, DocLat];
      Doc.priority = doc.priority;
      Doc.amount = [Math.round(doc.netweight)];
      // // console.log("doc.skills:", doc.skills);

      // var array1 = JSON.parse("[" + doc.skills + "]");
      // Doc.skills = array1;
      //  Veh.skills = array;
      // Doc.skills = (doc.skills).split(',');
      let wtime =
        convertHrToSec(doc.waitingTime) + convertHrToSec(doc.serviceTime);
      Doc.service = parseInt(wtime);
      let ps,
        pe = 0;
      let ds,
        de = 0;

      if (fromflag) {
        Doc.time_windows = timeWindw;
      }
      /*
            ps = VehStartTime + 10800;
            ds = VehStartTime ;
            pe = VehEndTime ;
            de = VehStartTime + 10800;
            if(doc.doctype === "PRECEIPT") {
              //Doc.time_windows = [0,28800]
            //Doc.time_window = [36000, 54000];
            Doc.time_windows = [[ps, pe]];

            }
            else {
         Doc.time_windows =[[ds,de]];
            }
      */

      // // console.log("OSRM Document details",Doc);
      DocListM.push(Doc);
    }

    //process for the JSON file
    var processedData = {};
    processedData.vehicles = VehListM;
    processedData.jobs = DocListM;
    processedData.options = {
      g: true,
    };

    try {
      let response = await fetch("https://maps.tema-systems.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedData),
      });
      if (response.status === 200) {
        let res = await response.json();
        // console.log("OSRM - opti route count abcd", res);
        if (res.routes.length > 0) {
          // console.log("OSRM - opti route count", res.routes.length);
          await this.submitRoutesforTripsCreationOSRMManually(
            res.routes,
            selSite,
            vehObject,
            processtrip,
            [],
            res
          );
        } else {
          this.setState({
            errorMessage:
              "Trip are not optimized, Due to Documents are Not In Range",
            loader: false,
            addAlertShow: true,
          });
        }
      } else {
        this.setState({
          errorMessage:
            "Trip is not optimized, Due to Documents are Not In Range",
          loader: false,
          addAlertShow: true,
        });
      }
    } catch (error) {
      console.error("Error in processing trip:", error);
      this.setState({
        errorMessage: "Error in processing trip",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  OptimisemanuallywithNB = async (Optimisedtrips) => {
    // console.log("TOOO to be optimise trips", Optimisedtrips);

    for (let tt = 0; tt < Optimisedtrips.length; tt++) {
      await this.NB_manuallytrip(Optimisedtrips[tt]);
    }
  };

  manualNextBillions = (tripData, selectedDate, OptimisationFlag) => {
    console.log("T222 trip details are", tripData);
    console.log("T222 trip details are 2", selectedDate);
    this.NB_manuallytrip(tripData, "TimeLine", selectedDate, OptimisationFlag);

    this.toggleDetail(false);
    //toggleDetail
  };

  OptimisemanuallywithOSRM = async (Optimisedtrips) => {
    // console.log("TOOO to be optimise trips", Optimisedtrips);

    for (let tt = 0; tt < Optimisedtrips.length; tt++) {
      await this.OSRM_manuallytrip(Optimisedtrips[tt]);
    }
  };

  groupNextBillionsOptmiseTrips = () => {
    // console.log("TOOO in index group optmise ")
    let OptimisedtripsPanel = this.state.tripsPanel;
    let Optimisedtrips = [];
    for (let ttrip in OptimisedtripsPanel) {
      // console.log("TOOO in index each trip is ", OptimisedtripsPanel[ttrip])
      if (OptimisedtripsPanel[ttrip].optistatus === "Open") {
        Optimisedtrips.push(OptimisedtripsPanel[ttrip]);
      }
    }

    // console.log("TOOO in index group optmise trips are", Optimisedtrips)
    if (Optimisedtrips.length > 0) {
      this.OptimisemanuallywithNB(Optimisedtrips);
    } else {
      this.setState({
        errorMessage: "No trips are in open status to do optimization.",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  groupOptmiseTrips = () => {
    // console.log("TOOO in index group optmise ")
    let OptimisedtripsPanel = this.state.tripsPanel;
    let Optimisedtrips = [];
    for (let ttrip in OptimisedtripsPanel) {
      // console.log("TOOO in index each trip is ", OptimisedtripsPanel[ttrip])
      if (OptimisedtripsPanel[ttrip].optistatus === "Open") {
        Optimisedtrips.push(OptimisedtripsPanel[ttrip]);
      }
    }

    // console.log("TOOO in index group optmise trips are", Optimisedtrips)
    if (Optimisedtrips.length > 0) {
      this.OptimisemanuallywithOSRM(Optimisedtrips);
    } else {
      this.setState({
        errorMessage: "No trips are in open status to do optimization.",
        loader: false,
        addAlertShow: true,
      });
    }
  };



  Exceptionalanalysis = (
    selectedDocs,
    SelectedVehicles,
    res,
    assignedShipments,
    assignedJobs,
    from
  ) =>
  {
 

    console.log(from ,"TEEE this is res for unassigned docs 2280")
    let totalSelectedDocs = selectedDocs.length;
    let unassignedDocs = res.unassigned && res.unassigned.length > 0 ? res.unassigned : [];
         let unassignedDocCount = unassignedDocs.length;
          console.log(" TEEE this is res for unassigned docs 2280", unassignedDocs)
    // let unassignedDocCount = res.unassigned.length;
    // let unassignedDocs = res.unassigned;
    let tripstempList = res.routes && res.routes.length > 0 ? res.routes : [];
    let trips = tripstempList.length ;
    let assignedDocs = totalSelectedDocs - unassignedDocCount;
    let glabalSummaryOBject = "";
    let summarybox = [];

    let selVeh = SelectedVehicles;

 console.log("TEEE assigned from are ", from);
    console.log("TEEE assigned jobs are ", assignedJobs);

    console.log("TEEE assigned shipments are ", assignedShipments);

    console.log("TEEE selected  docs are ", selectedDocs);

    console.log("TEEE selected vehicles are ", SelectedVehicles);

    //  let tempselDocs = [];
    //                    unassignedDocs.map((undoc, index) => {
    //                                 for (let tempdoc of selectedDocs) {
    //
    //                                                 if(tempdoc.docnum === undoc.description) {
    //                                                   tempselDocs.push(tempdoc);
    //                                                   break;
    //                                             }
    //                                             }
    //                    })

    let tempselDocs = [];


    if(from === "auto_next"){



unassignedDocs.forEach((undoc) => {
    let matchedJob = null;
    let matchedShipment = null;

    if (undoc.type === "job") {
        // Find a matching job
        matchedJob = assignedJobs.find(job => job.id === undoc.id);
    } else if (undoc.type === "delivery" || undoc.type === 'shipment') {
        // Find a matching shipment
        matchedShipment = assignedShipments.find(shipment =>
            shipment.delivery.id === undoc.id || shipment.pickup.id === undoc.id
        );
    }
    // If a job or shipment is found, check against selDocs
    if (matchedJob) {
      //  let matchedDocs = selectedDocs.filter(selDoc => selDoc.docnum === matchedJob.description);
        let matchedDocs = selectedDocs
                .filter(selDoc => selDoc.docnum === matchedJob.description)
                .map(selDoc => ({
                    ...selDoc,
                    reason: undoc.reason // Add the reason from unassignedDocs
                }));

        tempselDocs.push(...matchedDocs);
    }

   if (matchedShipment) {
       let matchedDocs = selectedDocs
           .filter(selDoc =>
               selDoc.docnum === matchedShipment.delivery.description ||
               selDoc.docnum === matchedShipment.pickup.description
           )
           .map(selDoc => ({
               ...selDoc,
               reason: undoc.reason // Add the reason from unassignedDocs
           }));
       tempselDocs.push(...matchedDocs);
   }
});
console.log("TEEE Final tempselDocs:", tempselDocs);
    }
    else {
      unassignedDocs.map((undoc, index) => {
        for (let tempdoc of selectedDocs) {
          if (tempdoc.docnum === undoc.description) {
            tempselDocs.push(tempdoc);
            break;
          }
        }
      });
    }

    console.log("TEEE Matched Documents:", tempselDocs);

    summarybox.push(
      ` ${trips} trips have been auto generated containing a total of  ${assignedDocs} documents  \n`
    );
    summarybox.push(
      `${unassignedDocCount} out of ${totalSelectedDocs} documents have been excluded from the trip auto-generation process. \n`
    );

    // summarybox.push(glabalSummaryOBject);
    // `Trips ${trips} are generated with ${assignedDocs} Documents  \n`;

    let errorbox = [];

    // console.log("TCCC selected document data =",tempselDocs)

    tempselDocs.forEach((doc) => {
      let glbalmissingskill = [];
      let tempoptiError = {
        docnum: "",
        skillerrorflg: false,
        skillmessage: "",
        capacatyflg: false,
        capacityError: "",
        generalflg: false,
        genearalError: "",
      };
      // let glabalerrorOBject = [];

      let isSkillMatchFoundflg = false;
      let docskill = JSON.parse("[" + doc.skills + "]");
      let tcapacatyflg = false;
      let tskillflg = false;
      let tvolumeflg = false;
      let prodCodevehList = [];
      let routeCodeVehList = [];
      let timewindowVehList = [];
      let capacityVehList = [];
      let volumeVehList = [];
      let vehClassVehList = [];
      let TimewindowforDoc = [];
      selVeh.forEach((veh) => {
        let missingSkillsForDoc = [];

        // Check if all skills of doc are in veh's skills
        let varray = JSON.parse("[" + veh.skills + "]");
        //  Veh.skills = array
        //   let vehskill = ;
        //  const isSubset = docskill.every((skill) => varray.includes(skill));
        const missingSkills = docskill.filter(
          (skill) => !varray.includes(skill)
        );

        // console.log (veh.codeyve,"TTT doc - veh subset", missingSkills)

        if (missingSkills.length === 0) {
          // If no missing skills, it's a match
          if (veh.capacities < doc.netweight) {
            tcapacatyflg = true;
            capacityVehList.push(veh.codeyve);
          }
          // volume check
          if (veh.vol < doc.volume) {
            tvolumeflg = true;
            volumeVehList.push(veh.codeyve);
          }
        } else {
          // If there are missing skills, collect them
          isSkillMatchFoundflg = true;
          missingSkillsForDoc.push(...missingSkills);
          glbalmissingskill.push(...missingSkills);

          if (veh.capacities < doc.netweight) {
            tcapacatyflg = true;
            capacityVehList.push(veh.codeyve);
          }
          // volume check
          if (veh.vol < doc.volume) {
            tvolumeflg = true;
            volumeVehList.push(veh.codeyve);
          }
          // assign the not mathced skills to the vehicle array
          const tempuniqueMissingSkills = [...new Set(missingSkills)];
          const temprouteCodeErrors = tempuniqueMissingSkills.filter(
            (skill) => skill >= -1 && skill <= 100
          );
          const tempproductCategoryErrors = tempuniqueMissingSkills.filter(
            (skill) => skill > 100 && skill <= 200
          );
          const tempvehicleClassErrors = tempuniqueMissingSkills.filter(
            (skill) => skill > 200
          );

          if (temprouteCodeErrors.length > 0) {
            routeCodeVehList.push(veh.codeyve);
          }
          if (tempproductCategoryErrors.length > 0) {
            prodCodevehList.push(veh.codeyve);
          }
          if (tempvehicleClassErrors.length > 0) {
            vehClassVehList.push(veh.codeyve);
          }
        }
      });

     if(doc.reason && doc.reason.length > 0) {

          let errorMessagesArray = [];
          errorMessagesArray.push(` ${doc.docnum} -   ${doc.reason}.`);
               let glabalerrorOBject = errorMessagesArray;

                   errorbox.push(glabalerrorOBject + "\n");

           }
     else if (!tvolumeflg || !tcapacatyflg || !isSkillMatchFoundflg) {
        tempoptiError.docnum = doc.docnum;
        let tmsg = "",
          timeWindowStr = "";
        let errorMessagesArray = [];

        if (doc.fromTime.length > 0) {
          const fromTimes = this.TimeWindow_splitTime(doc.fromTime); // Split into ["0700", "0900"]
          const toTimes = this.TimeWindow_splitTime(doc.toTime); // Split into ["0800", "1030"]

          //               for (let i = 0; i < fromTimes.length; i++) {
          //                   TimewindowforDoc.push(`${fromTimes[i]}-${toTimes[i]}`); // Combine each pair into a time range
          //               }

          const timeRanges = fromTimes.map(
            (fromTime, index) => `${fromTime}-${toTimes[index]}`
          );
          timeWindowStr = `(${timeRanges.join(", ")})`; // Format as a single string
        }

        //           if((doc.fromTime).length > 0) {
        //
        //                   TimewindowforDoc.push(splitTime(doc.fromTime))
        //                    TimewindowforDoc.push(splitTime(doc.toTime))
        //                        timeWindowStr = `(${TimewindowforDoc[0]} - ${TimewindowforDoc[1]})`;
        //                 }

        if (vehClassVehList.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded as the Customer's assigned Vehicle Class does not match  of these vehicles  ${vehClassVehList}.`
          );
        }
        if (prodCodevehList.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded as it contains products not matching the selected vehicles' ${prodCodevehList}  product categories .`
          );
        }
        if (routeCodeVehList.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded as the customer's assigned RouteCode does not match any of the selected vehicles ${routeCodeVehList}.`
          );
        }
        if (capacityVehList.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded due to Weight Capacity restriction on the selected vehicles ${capacityVehList}.`
          );
        }
        if (volumeVehList.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded due to Volume Capacity restriction on the selected vehicles ${volumeVehList}.`
          );
        }
        if (TimewindowforDoc.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded due to Delivery Time Frame restriction ${timeWindowStr}.`
          );
        }

        if (errorMessagesArray.length < 1) {
          if (TimewindowforDoc.length > 0) {
            errorMessagesArray.push(
              ` ${doc.docnum} has been excluded due to Delivery Time Frame restriction ${timeWindowStr}.`
            );
          } else {
            errorMessagesArray.push(
              ` ${doc.docnum} has been excluded due to the vehicles weight/volume capacity was full in the current trip.`
            );
          }
        }

        // glabalerrorOBject = glabalerrorOBject + "\n";
        //  const glabalerrorOBject = errorMessagesArray.join('\n');
        let glabalerrorOBject = errorMessagesArray
          .map((msg) => msg + "\n")
          .join("");

        errorbox.push(glabalerrorOBject + "\n");
      } else {
      }
    });

    //   errorbox.push(glabalerrorOBject);

    const finalErrorMessage = errorbox.join("\n");

    this.setState({
      errorArrayMessage: errorbox,
      errorSummartMessage: summarybox,
      loader: false,
      addAlertSummaryShow: true,
    });
  };



    documentsDateRange = (sdate, edate) => {
      // Validate start and end dates before proceedi
      //
      // ng

      const startDate = moment(sdate, "YYYY-MM-DD");
  const endDate = moment(edate, "YYYY-MM-DD");

      // console.log(sdate,edate,"this is 2071")

      this.setState({
        loader: true,
      });

      if (startDate.isAfter(endDate)) {


        this.notifyError("Start date cannot be greater than end date.");
        this.setState({
          loader: false,
        });
      } else if (endDate.isBefore(startDate)) {
        this.notifyError("End date cannot be less than start date.");
        this.setState({
          loader: false,
        });
      } else {
        fetchDropsPanelwithRange(
          this.state.selectedMultipleSites,
          sdate,
          edate
        ).then(([res1]) => {
          this.setState({
            docsEndDate: edate,
            docsStartDate: sdate,
            dropsPanel: res1,
            loader: false,
          });
        }).catch((err)=>{
          // this.notifyError("End date cannot be less than start date.")
        console.log("Error checking in err document date change",err)
        this.setState({
          loader: false,
        });
        });
      }
    };


  dateTimeToMilliseconds = (dateString, timeString) => {
    console.log("Split time of ", timeString);
    //const [hours, minutes] = timeString?.split(':').map(Number);

    // Create a Date object from the date string
    const date = new Date(dateString);

    date.setSeconds(timeString);

    // Set the time (hours and minutes) on the Date object
    //  date.setHours(hours, minutes, 0, 0);

    // Convert to milliseconds since the Unix epoch
    return date.getTime();
  };

  getEpochFromDateTime = (dateString, timeString) => {
    // Combine date and time into an ISO format
    const dateTimeString = `${dateString}T${timeString}`;

    // Convert to epoch (seconds)
    return Math.floor(new Date(dateTimeString).getTime() / 1000);
  };

  formatLocationCoordinates = (coordsArray) => {
    return coordsArray.join(" | ");
  };

  autofromselection_nextBilloins = async (SelDocs, selVeh, selDrivers) => {

     this.setState({ loader: true });
    let postAPICode =
      "https://api.nextbillion.io/optimization/v2?key=b1cebb49fcaa4366abcb19cfb12b43b3";

    let locationArraybefore = [];

    let vehile_profile_options = {
      routing: {
        mode: "car",
        traffic_timestamp: 1724679300,
        profiles: {
          car: {
            mode: "car",
            avoid: ["highway"],
          },
          minivan: {
            mode: "truck",
          },
        },
      },
    };

    let tempTripPanel = this.state.tripsPanel;
    let resArr = [];
    let ddate = this.state.date;
    let formatedDate = moment.tz(ddate, "").format("YYYY-MM-DD");
    tempTripPanel.filter((item) => {
      resArr.push(item);
    });
    let BreakFeatures = [];

    let VehStartTime, VehEndTime;
    console.log("nextbillions selvehicle ", selVeh);
    if (selVeh.length > 0 && SelDocs.length > 0) {
      this.setState({ loader: true });

      let VehList = [],
        DocList = [];
      let DocListFeatures = [];
      let DeportListFeatures = [];
      let VehListFeatures = [];

      let siteLat, siteLang;
      let SiteLevelBreakDuration = 0;
      let SiteLevelDrivingBetweenBrks = 0;


      let selSite = this.state.selectedMultipleSites[0];
      this.state.sites.map((site) => {
          console.log("T$$$ at next billions", site)
        if (selSite === site.id) {
          siteLat = site.lat;
          siteLang = site.lng;

         SiteLevelBreakDuration = parseInt(convertHrToSec(site.driverBreakDuration));
         SiteLevelDrivingBetweenBrks = parseInt(site.drivingHrsBtwBreak * 60 * 60);

          let newCoord = `${siteLat},${siteLang}`;
          locationArraybefore.push(newCoord);
        }
      });

      for (let i = 0; i < selVeh.length; i++) {
        let Veh = {};
        let veh = selVeh[i];

        let sflag = false;
        let prevEndTime = 0;

        for (let t = 0; t < resArr.length; t++) {
          console.log("Tkkk insdie forloop of existing trip");
          let currtrip = resArr[t];
          if (currtrip.code === veh.codeyve) {
            sflag = true;
            console.log("Tkkk insdie forloop of same trip", currtrip.code);
            let endTime = splitTimeAndConv2Sec(currtrip.endTime);
            let unloadingtime = convertHrToSec(veh.enddepotserv);
            prevEndTime = endTime + unloadingtime;
          }
        }

        if (!sflag) {
          prevEndTime = splitTimeAndConv2Sec(veh.starttime);
          console.log("Tkkk insdie not prev trip ", prevEndTime);
        }

        let starttime = prevEndTime;
        let loadingHrs = convertHrToSec(veh.startdepots);
        let stime = starttime + loadingHrs;
        let etime = splitTimeAndAddtimeAndConv2Sec(
          veh.starttime,
          veh.overtimestar
        );
        console.log("ARCGIS time ", stime < etime);

        Veh.id = veh.codeyve;
        Veh.start_index = 0;
        Veh.end_index = 1;

        Veh.name = veh.codeyve;
        Veh.description = veh.codeyve;
        Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
      //  Veh.capacities = [parseInt(veh.capacities), parseInt(veh.vol)];

Veh.capacity = [parseInt(veh.capacities), parseInt(veh.vol)];
        if (veh.xmaxtotaldis === "Miles") {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1609.34);
        } else {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1000);
        }

        let timew = [stime, etime];
        let geo = [siteLang, siteLat];
        Veh.time_window = timew;

        Veh.skills = JSON.parse(`[${veh.skills}]`);
        Veh.max_tasks = veh.maxordercnt > 0 ? veh.maxordercnt : 3;

        VehEndTime = etime;
        VehStartTime = stime;
        let earliestSTateTime = this.dateTimeToMilliseconds(ddate, stime);
        let tempdddd = earliestSTateTime / 1000;

        let breakArray = [];

        let Break1 = {
          id: 1,
          time_windows: [[1662105600, 1662148800]],
          service: 120,
        };

        breakArray.push(Break1);

        Veh.breaks = breakArray;
        let continousdrivingBreak = {
          max_continuous_driving: SiteLevelDrivingBetweenBrks,  //21600, // 4hrs of driving continously
          layover_duration: SiteLevelBreakDuration, // 900
        };
        Veh.drive_time_layover_config = continousdrivingBreak; // continous break based on driving
     //   Veh.profile = "minivan";
        VehList.push(Veh);
      }

      let maxDoc = this.state.defaultdocprocess;
      let docprocessedCount = 0;

      const jobs = [];
      const shipments = [];
      const receiptPickupMap = {};
      const receiptsObj = {};
      let idCounter = 1; // Start ID from 1
let weightKey = "";

      // First, organize all receipts
      SelDocs.forEach((item) => {
        if (item.doctype === "PRECEIPT" && item.docnum) {
          const id = idCounter++;

          let newCoord = `${item.lat},${item.lng}`;
          let loc_index = locationArraybefore.push(newCoord) - 1; // Get the index

          // Convert skills to an array (handle empty case)
          //   const skills = item.skills ? JSON.parse("[" + item.skills + "]") : [];

          let skillsArray;
          try {
            let parsedSkills = JSON.parse("[" + item.skills + "]");
            if (
              Array.isArray(parsedSkills) &&
              parsedSkills.every((skill) => typeof skill === "number")
            ) {
              skillsArray = parsedSkills;
              // loc_i = loc_i + 1;
            } else {
              console.warn(
                `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
              );
              // **Exclude the entire document**
            }
          } catch (e) {
            console.warn(
              `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
            );
            // **Exclude the entire document**
          }

          if (item.pairedDoc && item.pairedDoc.trim() !== "") {

            if(item.doctype == "PICK" || item.doctype == "DLV" || item.doctype == "MISCDROP"){
                          weightKey = "delivery"
                        }else if(item.doctype == "RETURN" || item.doctype == "MISCPICK" || item.doctype == "PRECEIPT"){
                          weightKey = "pickup"
                        }



            receiptPickupMap[item.docnum] = id;
            receiptsObj[item.docnum] = {
              id: id,
              location_index: loc_index, // Replace with real coordinates
              service: parseInt(convertHrToSec(item.serviceTime)) + parseInt(convertHrToSec(item.waitingTime)),
              [weightKey]: [parseInt(item.netweight), parseInt(item.volume)],
              description: item.docnum,
              skills: skillsArray,
              priority: parseInt(item.priority),
            };

            shipments.push({
              pickup: receiptsObj[item.docnum],
            });
          } else {

             if(item.doctype == "PICK" || item.doctype == "DLV" || item.doctype == "MISCDROP"){
                                     weightKey = "delivery"
                                   }else if(item.doctype == "RETURN" || item.doctype == "MISCPICK" || item.doctype == "PRECEIPT"){
                                     weightKey = "pickup"
                                   }



            jobs.push({
              id: id,
              location_index: loc_index, // Replace with real coordinates
              service: parseInt(convertHrToSec(item.serviceTime)) + parseInt(convertHrToSec(item.waitingTime)),
               [weightKey]: [parseInt(item.netweight), parseInt(item.volume)],
              description: item.docnum,
              skills: skillsArray,
              priority: parseInt(item.priority),
            });
          }
        }
      });

      // Process Deliveries
      SelDocs.forEach((item) => {
        if (item.doctype !== "PRECEIPT" && item.docnum) {


            if(item.doctype == "PICK" || item.doctype == "DLV" || item.doctype == "MISCDROP"){
                                               weightKey = "delivery"
                                             }else if(item.doctype == "RETURN" || item.doctype == "MISCPICK" || item.doctype == "PRECEIPT"){
                                               weightKey = "pickup"
                                             }


          const deliveryId = idCounter++;

          let newCoord = `${item.lat},${item.lng}`;
          let loc_index = locationArraybefore.push(newCoord) - 1; // Get the index

          // Convert skills to an array (handle empty case)
          let skillsArray;
          try {
            let parsedSkills = JSON.parse("[" + item.skills + "]");
            if (
              Array.isArray(parsedSkills) &&
              parsedSkills.every((skill) => typeof skill === "number")
            ) {
              skillsArray = parsedSkills;
              // loc_i = loc_i + 1;
            } else {
              console.warn(
                `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
              );
              // **Exclude the entire document**
            }
          } catch (e) {
            console.warn(
              `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
            );
            // **Exclude the entire document**
          }

          if (
            item.pairedDoc.trim() !== "" &&
            receiptPickupMap[item.pairedDoc]
          ) {
            // If delivery is linked to a receipt, create a shipment
            const shipment = shipments.find(
              (s) => s.pickup.id === receiptPickupMap[item.pairedDoc]
            );

              if(item.doctype == "PICK" || item.doctype == "DLV" || item.doctype == "MISCDROP"){
                                                 weightKey = "delivery"
                                               }else if(item.doctype == "RETURN" || item.doctype == "MISCPICK" || item.doctype == "PRECEIPT"){
                                                 weightKey = "pickup"
                                               }


            if (shipment) {
              // Add delivery to the existing shipment
              const deliveryKey = shipment.delivery
                ? `delivery_${Object.keys(shipment).length - 1}`
                : "delivery";

              shipment[deliveryKey] = {
                id: deliveryId,
                location_index: loc_index,
                service: parseInt(convertHrToSec(item.serviceTime)) + parseInt(convertHrToSec(item.waitingTime)),
                [weightKey]: [parseInt(item.netweight), parseInt(item.volume)],
                description: item.docnum,
                skills: skillsArray,
                priority: parseInt(item.priority),
              };
            } else {
              // Paired document exists but is not in reality

               if(item.doctype == "PICK" || item.doctype == "DLV" || item.doctype == "MISCDROP"){
                                                  weightKey = "delivery"
                                                }else if(item.doctype == "RETURN" || item.doctype == "MISCPICK" || item.doctype == "PRECEIPT"){
                                                  weightKey = "pickup"
                                                }



              jobs.push({
                id: deliveryId,
                location_index: loc_index, // Replace with real coordinates
                service: parseInt(convertHrToSec(item.serviceTime)) + parseInt(convertHrToSec(item.waitingTime)),
                [weightKey]: [parseInt(item.netweight), parseInt(item.volume)],
                description: item.docnum,
                skills: skillsArray,
                priority: parseInt(item.priority),
              });
            }
          } else {
            // If no pairing, add as a standalone job
            if (item.pairedDoc.trim() === "") {

               if(item.doctype == "PICK" || item.doctype == "DLV" || item.doctype == "MISCDROP"){
                                                  weightKey = "delivery"
                                                }else if(item.doctype == "RETURN" || item.doctype == "MISCPICK" || item.doctype == "PRECEIPT"){
                                                  weightKey = "pickup"
                                                }




              jobs.push({
                id: deliveryId,
                location_index: loc_index, // Replace with real coordinates
                service: parseInt(convertHrToSec(item.serviceTime)) + parseInt(convertHrToSec(item.waitingTime)),
                [weightKey]: [parseInt(item.netweight), parseInt(item.volume)],
                description: item.docnum,
                skills: skillsArray,
                priority: parseInt(item.priority),
              });
            }
          }
        }
      });

      let finallocationList = locationArraybefore; // for another type optimisation this.formatLocationCoordinates(locationArraybefore);

      let locactionsFinal = {
        id: 1,
        location: finallocationList,
      };

      let nextBillonObject = {
        jobs: jobs,
        shipments: shipments,
      //  options: vehile_profile_options,
        locations: locactionsFinal,
        vehicles: VehList,
      };

      let response = await fetch(`${postAPICode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextBillonObject),
      });
      console.log("THHH response", response);
      if (response.status === 200) {
        console.log("THHH response if", response);
        if (!response.ok) {
          const errorDetails = await response.json();
          console.error("THHH Error:", errorDetails);
          this.setState({ loader: false });
        } else {
          const data = await response.json();
          console.log("THHH Response:", data);
          await this.OrganiseNextBillionsResponse(
            data,
            selSite,
            SelDocs,
            selVeh,
            selDrivers,
            jobs,
            shipments,
            "auto_next"
          );
          this.setState({ loader: false });
        }
      } else {
        console.error("TEEE Error in ArcGIS response status:", response.status);
                  console.error("TEEE Error in ArcGIS response data :", response.data);
                  console.error("TEEE Error in ArcGIS respośnse data :", response.message);
                  const data = await response.json();
                                console.log("TEEE Response: else", data);

                  const originalMessage = data.message || data.msg || ""; // Use whichever exists, or default to an empty string

                  const updatedMessage = originalMessage
                    .replaceAll("NextBillion", "TEMA")
                    .replaceAll("support@nextbillion.ai", "support@tema-systems.com");

                  console.log(updatedMessage);


                   this.setState({
                               errorMessage:  updatedMessage,
                               addAlertShow: true,
                               loader: false
                                });

      }
    } else {
      this.setState({
        errorMessage:
          selVeh.length === 0
            ? "There are no vehicles selected."
            : "There are no documents selected.",
        addAlertShow: true,
      });
    }
  };


  formatTimestamp = (milliseconds) => {
    const date = new Date(milliseconds);

    // Format the date as MM/DD/YYYY
    const formattedDate = `${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getUTCDate()
      .toString()
      .padStart(2, "0")}/${date.getUTCFullYear()}`;

    // Format the time as HH:MM
    //  const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    // Calculate time in seconds from the start of the day
    const hoursInSeconds = date.getUTCHours() * 3600; // Convert hours to seconds
    const minutesInSeconds = date.getUTCMinutes() * 60; // Convert minutes to seconds
    const seconds = date.getUTCSeconds(); // Get remaining seconds

    const timeInSeconds = hoursInSeconds + minutesInSeconds + seconds;

    return { date: formattedDate, time: timeInSeconds };
  };

  formatTimestampHHMM = (milliseconds) => {
    console.log("ArcGIS formatedDAte milliscs ", milliseconds);
    const date = new Date(milliseconds);

    // Format the date as MM/DD/YYYY
    const formattedDate = `${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getUTCDate()
      .toString()
      .padStart(2, "0")}/${date.getUTCFullYear()}`;

    // Format the time as HH:MM
    const formattedTime = `${date
      .getUTCHours()
      .toString()
      .padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}`;

    console.log("ArcGIS  formatteddate ", formattedDate);

    //console.log("ArcGIS formatedDAte formatteddate ", formattedDate)
    console.log("ArcGIS  formattedTime ", formattedTime);

    return { date: formattedDate, time: formattedTime };
  };

  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  OrganiseNextBillionsResponse_GroupOptimise = async (
    data,
    selSite,
    vehObject,
    processtrip,
    assignedJobs,
    assignedShipments,
  ) => {
    try {
      const apiKey = "b1cebb49fcaa4366abcb19cfb12b43b3";
      const jobId = data.id;
      const postAPICodewithId = `https://api.nextbillion.io/optimization/v2/result?id=${jobId}&key=${apiKey}`;

      let attempt = 0;
      const maxAttempts = 20; // Stop after 20 tries (200 seconds)

      while (attempt < maxAttempts) {
        await new Promise((res) => setTimeout(res, 10000)); // Wait for 10 seconds before each retry
        attempt++;

        const response = await fetch(postAPICodewithId, { method: "GET" });

        if (response.status !== 200) {
          this.setState({
            errorMessage: "Something went wrong while fetching the route.",
            addAlertShow: true,
            loader: false,
          });
          throw new Error("Failed to fetch route optimization result");
        }

        const res = await response.json();
        console.log(`Attempt ${attempt}: API Response:`, res);

        if (res.status !== "Ok") {
          throw new Error(`API Error: ${res.message || "Unknown error"}`);
        }

        if (
          res.message === "Job still processing" ||
          !res.result ||
          res.result.routes && res.result.routes.length === 0
        ) {
          console.log(
            `Attempt ${attempt}: Job still processing, retrying in 10 seconds...`
          );
          continue;
        }

        // Job completed, process the result
        console.log("Route Optimization Result:", res.result);
        //     this.submitRoutesforTripsCreation(res.result.routes, selSite, SelDocs, selDrivers, selVeh, res.result, jobId);
        await this.submitRoutesforTripsCreationOSRMManually(
          res.result.routes,
          selSite,
          vehObject,
          processtrip,
          [],
          res.result,
          jobId,
          assignedShipments,
          assignedJobs,
          "next"
        );

        return;
      }

      console.log("Max retries reached (200 seconds), stopping.");
      this.setState({
        errorMessage:
          "Route optimization took too long. Please try again later.",
        addAlertShow: true,
        loader: false,
      });
    } catch (error) {
      console.error("Error:", error);
      this.setState({
        errorMessage: error.message || "An error occurred",
        addAlertShow: true,
        loader: false,
      });
    }
  };

  OrganiseNextBillionsResponse = async (
    data,
    selSite,
    SelDocs,
    selVeh,
    selDrivers,
    assignedJobs,
    assignedShipments,
    from
  ) => {
    try {
      const apiKey = "b1cebb49fcaa4366abcb19cfb12b43b3";
      const jobId = data.id;
      const postAPICodewithId = `https://api.nextbillion.io/optimization/v2/result?id=${jobId}&key=${apiKey}`;

      let attempt = 0;
      const maxAttempts = 50; // Stop after 20 tries (200 seconds)
      let loopflg =  true;

      while (attempt < maxAttempts && loopflg) {
        await new Promise((res) => setTimeout(res, 10000)); // Wait for 10 seconds before each retry
        attempt++;

        const response = await fetch(postAPICodewithId, { method: "GET" });

        if (response.status !== 200) {
           loopflg = false;
          this.setState({
            errorMessage: "Something went wrong while fetching the route.",
            addAlertShow: true,
            loader: false,
          });
          throw new Error("Failed to fetch route optimization result");
        }

        const res = await response.json();
        console.log(`Attempt ${attempt}: API Response:`, res);

        if (res.status !== "Ok") {
          loopflg = false;
          throw new Error(`API Error: ${res.message || "Unknown error"}`);
        }

        if (
          res.message === "Job still processing" ||
          !res.result ||
          res.result.routes && res.result.routes.length === 0
        ) {
          console.log(
            `Attempt ${attempt}: Job still processing, retrying in 10 seconds...`
          );
          continue;
          }
             else if (res.result?.routes?.length > 0) {
                      loopflg = false;
                    console.log("Route Optimization Result:", res.result);
                    this.submitRoutesforTripsCreation(
                      res.result.routes,
                      selSite,
                      SelDocs,
                      selDrivers,
                      selVeh,
                      res.result,
                      jobId,
                      assignedShipments,
                      assignedJobs,
                      "auto_next"
                    );
                    return;
                  }
         else if(res.message === "" && res.result && res.result?.unassigned.length > 0 ) {
                      loopflg = false;
                        this.Exceptionalanalysis(
                                   SelDocs,
                                   selVeh,
                                   res.result,
                                   assignedShipments,
                                   assignedJobs,
                                   'auto_next'
                                 );
                            break; // Stop the while loop
                            return;
                  }


        }
//        else {
//          if (res.message === "" && res.result && res.result.unassigned.length > 0) {
//            let unassignedList = res.result.unassigned;
//
// this.Exceptionalanalysis(
//                                   SelDocs,
//                                   selVeh,
//                                   res,
//                                   assignedShipments,
//                                   assignedJobs,
//                                   'auto_next'
//                                 );
//            //unassignedList
//
//            // assignedJobs
//            // assignedShipments
//
//
//
//            // Create a mapping from docnum to details in outputList
//
//break;
//            // Process unassigned list
//          return;
//               }
//        }
        // Job completed, process the result


   if(attempt === 50) {
      console.log("Max retries reached (200 seconds), stopping.");
      this.setState({
        errorMessage:
          "Route optimization took too long. Please try again later.",
        addAlertShow: true,
        loader: false,
      });
      }
    } catch (error) {
      console.error("Error:", error);
      this.setState({
        errorMessage: error.message || "An error occurred",
        addAlertShow: true,
        loader: false,
      });
    }
  };

  OrganiseAcrgisResponse = (data, selDocs, selVeh, selDrivers) => {
    let tripList = [];
    let routeList = [];
    let RouteprocessedData = [];
    let sameProcessUsedDriversList = [];
    let TripsfromRoutes = [];
    let allocatedDrivers = [];

    data.results.forEach((result) => {
      if (result.paramName === "out_stops" && result.value.features) {
        const stops = result.value.features;
        const groupedByVehicle = this.groupBy(stops, "RouteName"); // Assuming "VehicleID" groups stops by vehicle
        console.log("ArcGIS Response groupby are:", groupedByVehicle);

        Object.entries(groupedByVehicle).forEach(([vehicle, stops]) => {
          // Sort stops by their sequence number to maintain the correct order
          console.log("ArcGIS Response result are:", result);

          const trip = {
            vehicle: vehicle,
            stopsList: this.sortStopsBySequence(stops),
          };
          tripList.push(trip);
        });
      }
      if (result.paramName === "out_routes" && result.value.features) {
        // let tempvehroute = {};
        const routesVehicle = result.value.features;
        console.log("ArcGIS Response routesVehicle are:", routesVehicle);
        routesVehicle.map((route, i) => {
          let tempvehroute = route.attributes;
          routeList.push(tempvehroute);
        });
      }
    });

    console.log("ArcGIS Response routeTrips  are:", routeList);
    console.log("ArcGIS Response trips are:", tripList);
    //this.submitfromArCGIS(routeList, tripList);

    for (let k = 0; k < routeList.length; k++) {
      var currRoute = routeList[k];
      var Vehicle = {},
        Veh = routeList[k].Name;

      var auto_tot_travel_time = formatTime(routeList[k].TotalTravelTime);

      // console.log(auto_tot_travel_time ,"this is total travel time")
      var auto_total_time = routeList[k].TotalTime / 60 / 60;
      var auto_service_time = routeList[k].TotalOrderServiceTime / 60 / 60;
      var auto_tot_distance = routeList[k].TotalDistance;

      // var totalcost = 0, fixedCost = 0, overtimeCost = 0;
      var fdistanceCost = 0,
        ftimeCost = 0,
        ftotalCost = 0,
        fovertimecost = 0,
        fRegularcost = 0,
        ffixedcost = 0;

      for (let i = 0; i < this.state.vehiclePanel.vehicles.length; i++) {
        if (Veh == this.state.vehiclePanel.vehicles[i].codeyve) {
          Vehicle = this.state.vehiclePanel.vehicles[i];
        }
      }

      var dropObject = [],
        pickupObject = [],
        drops = 0,
        pickups = 0;
      var startTime = "",
        endTime = "";
      var totalWeight = 0;
      var ddate = "";
      var totalVolume = 0;
      var fld_doc_capacity = 0;
      var fld_uom_volume = "";
      var fld_uom_capacity = "";
      var flds_uom_volume = "";
      var fld_doc_volume = 0;
      var flds_uom_capacity = "";
      var fld_doc_qty = 0;
      var flds_per_volume = "";
      var fld_uom_qty = "";
      var weight = "";
      var volume = "";
      var vol_unit = "";
      var wei_unit = "";
      var percentageMass = 0;
      var percentageVolume = 0;
      var VehicleObject = Vehicle;
      var flds_per_capacity = 0;
      var flds_doc_capacity = 0;
      var flds_doc_volume = 0;
      var vehobj = [];
      var itemTrip = {
        selectedTripData: [],
        timelineInterval: [],
        equipments: [],
        trailers: [],
        quantities: [],
      };
      var timelneInterval = [];
      // itemTrip.selectedTripData = GroupedObjects;
      // itemTrip.timelineInterval = [];
      itemTrip.equipments = [];
      itemTrip.trailers = [];
      itemTrip.quantities = [];
      var freqtype = false;
      var appointmentExist = false;

      console.log("ArcGIS Response DocsSteps", tripList);

      // fetch the exact docList
      const matchingDoc = tripList.find((doc) => doc.vehicle === Veh);

      startTime = this.formatTimestampHHMM(currRoute.StartTime).time;
      endTime = this.formatTimestampHHMM(currRoute.EndTime).time;
      let tempendDate = this.formatTimestampHHMM(currRoute.EndTime).date;

      console.log("ArcGIS Response matching Doc", matchingDoc);
      let DocsSteps = matchingDoc.stopsList;

      console.log("ArcGIS Response DocsSteps", DocsSteps);

      // loop thorugh the documents steps

      for (let t = 0; t < DocsSteps.length; t++) {
        var ttime = "";
        var currTask = DocsSteps[t].attributes;
        let previous_distance = 0;
        let previous_travel_time = 0;
        ddate = this.state.date;
        // console.log("OSRM Auto  curr task are", currTask);
        if (currTask.StopType !== 1 && currTask.StopType !== 2) {
          var docno = currTask.Name;
          // console.log("OSRM Auto  curr task is job");
          for (let d = 0; d < selDocs.length; d++) {
            var currDoc = selDocs[d];
            // console.log("OSRM Auto  curr doc is job,", currDoc);
            var SelectedDoc = [];
            if (currDoc.docnum === docno) {
              currDoc.vehicleCode = Veh;
              let Arrivardetails = this.formatTimestamp(currTask.ArriveTime);
              let DepartureDetails = this.formatTimestamp(currTask.DepartTime);
              currDoc.arrival = secondsToHms(Arrivardetails.time);
              currDoc.time = convertSecToMin(currTask.FromPrevTravelTime);
              let tempwaittime = convertHrToSec(currDoc.waitingTime);
              let tempservicetime = convertHrToSec(currDoc.service);
              currDoc.serTime = formatTime(currDoc.serviceTime);
              currDoc.distance = currTask.FromPrevDistance;
              currDoc.startDate = moment
                .tz(Arrivardetails.date, "")
                .format("YYYY-MM-DD");
              currDoc.endDate = moment
                .tz(DepartureDetails.date, "")
                .format("YYYY-MM-DD");
              currDoc.end = secondsToHms(DepartureDetails.time);
              ttime = currDoc.end;
              if (currDoc.doctype === "PRECEIPT") {
                pickups = pickups + 1;
                currDoc.panelType = "pickup";
                pickupObject.push(currDoc);
                fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                fld_doc_volume = fld_doc_volume + currDoc.volume;

                let tempqty = 0,
                  tempuom = "";
                currDoc.products &&
                  currDoc.products.length > 0 &&
                  currDoc.products.map((prod, index) => {
                    tempqty = tempqty + parseInt(prod.quantity);
                    tempuom = prod.uom;
                  });
                fld_doc_qty = fld_doc_qty + tempqty;
                // fld_uom_qty = fld_uom_qty + tempuom;
                if (!fld_uom_qty.includes(tempuom)) {
                  fld_uom_qty += tempuom;
                }
              } else {
                drops = drops + 1;
                currDoc.panelType = "drop";
                dropObject.push(currDoc);
                fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                fld_doc_volume = fld_doc_volume + currDoc.volume;
                let tempqty = 0,
                  tempuom = "";
                currDoc.products &&
                  currDoc.products.length > 0 &&
                  currDoc.products.map((prod, index) => {
                    tempqty = tempqty + parseInt(prod.quantity);
                    tempuom = prod.uom;
                  });
                fld_doc_qty = fld_doc_qty + tempqty;
                // fld_uom_qty = fld_uom_qty + tempuom;

                if (!fld_uom_qty.includes(tempuom)) {
                  fld_uom_qty += tempuom;
                }
              }
              itemTrip.selectedTripData.push(currDoc);
              totalWeight = totalWeight + parseFloat(currDoc.netweight);
              totalVolume = totalVolume + parseFloat(currDoc.volume);
              break;
            }
          }
          //end of search task with document panel
        } // end of if, task
        else {
          ttime = secondsToHms(this.formatTimestamp(currTask.DepartTime).time);
        }

        //for timeline
        var index = t * 12;
        timelneInterval.push({ value: index, label: ttime });

        // console.log("OSRM timline data  =", timelneInterval);
      }

      itemTrip.timelineInterval = timelneInterval;
      var TimelineInterval = VehicleObject.timelineInterval;
      var stops = pickups + drops;
      var site = VehicleObject.fcy;
      var capacity = VehicleObject.capacities;

      fdistanceCost = VehicleObject.costperunitd * Number(auto_tot_distance);
      if (auto_total_time > VehicleObject.overtimestar) {
        fovertimecost =
          (auto_total_time - VehicleObject.overtimestar) *
          VehicleObject.costperunito;
        fRegularcost = VehicleObject.overtimestar * VehicleObject.costperunitt;
        ftimeCost = Math.round(fovertimecost + fRegularcost);
      } else {
        fRegularcost = VehicleObject.costperunitt * auto_total_time;
        ftimeCost = fRegularcost;
      }
      ffixedcost = VehicleObject.fixedcost;
      ftotalCost = VehicleObject.fixedcost + fdistanceCost + ftimeCost;
      var defaultDriver = "",
        defaultDrivername = "";

      // console.log("T1212 active drivers =", VehicleObject);
      if (
        VehicleObject.driverid === " " ||
        VehicleObject.driverid === "" ||
        VehicleObject.driverid === null
      ) {
        //assign some random driver from the active drivers
        var activeDrivers = this.state.vehiclePanel.drivers;
        var tempTripPanel = this.state.tripsPanel;
        var sflag = false;
        var dflag = false;

        let driverflg = false;
        let ExistingTripdata = [];

        let temptrip2 = this.state.tripsPanel;
        if (temptrip2.length > 0) {
          for (let i = 0; i < temptrip2.length; i++) {
            const acttrip = temptrip2[i];
            if (acttrip.code === Veh) {
              // console.log("T1212 same veh exist", acttrip.code)
              // defaultdriver = trip.driverid;
              defaultDriver = acttrip.driverid;
              defaultDrivername = acttrip.driverName;
              driverflg = true;
              break; // Exit the loop when driverflg is true
            } else {
              if (trip && trip.driver !== null) {
                allocatedDrivers.push(trip.driver);
              }
              // ExistingTripdata.push(tripData);
            }
          }
        }
        // console.log("T1212 allocated drivers =", allocatedDrivers);

        // console.log("T1212 selected drivers =", selDrivers);
        if (!driverflg && selDrivers?.length > 0) {
          if (allocatedDrivers.length > 0) {
            // console.log("T1212 trip exist driver not match");
            for (let seldriver of selDrivers) {
              if (!allocatedDrivers.includes(seldriver.driverid)) {
                // console.log("T1212 driver not used , random driver", seldriver);
                driverflg = true;
                defaultDriver = seldriver.driverid;
                defaultDrivername = seldriver.driver;
                allocatedDrivers.push(seldriver.driverid);
                break; // Exit the loop if a driver is not allocated
              }
            }
          } else {
            // console.log("T1212 active drivers complete first if=");
            defaultDriver = selDrivers[0].driverid;
            defaultDrivername = selDrivers[0].driver;
            allocatedDrivers.push(selDrivers[0].driverid);
          }
        }
      } else {
        // console.log("T1212 - vehicle driver");
        defaultDriver = VehicleObject.driverid;
        if (
          VehicleObject.drivername != null ||
          VehicleObject.drivername != ""
        ) {
          defaultDrivername = VehicleObject.drivername;
        }

        // console.log("T1212 active default driver assigned =", defaultDriver);
      }

      // console.log("T1212 active default driver assigned 2 =", defaultDriver);
      // console.log("OSRM Vehicle Object =", VehicleObject);
      var volume = VehicleObject.vol;
      //  var StartTime = VehicleObject.timelineInterval[0].label;
      vehobj = VehicleObject;
      flds_uom_capacity = VehicleObject.xweu;
      fld_uom_capacity = VehicleObject.xweu;
      flds_uom_volume = VehicleObject.xvol;
      fld_uom_volume = VehicleObject.xvol;
      var dddd1 = new Date();
      let h = (dddd1.getHours() < 10 ? "0" : "") + dddd1.getHours();
      let m = (dddd1.getMinutes() < 10 ? "0" : "") + dddd1.getMinutes();
      let currtime = h + ":" + m;

      // if (totalWeight > 0) {
      //   percentageMass = 0; //((parseInt(totalWeight) / parseInt(capacity)) * 100).toFixed(1);
      // }

      // if (totalVolume > 0) {
      //   percentageVolume = 0; //((parseInt(totalVolume) / parseInt(volume)) * 100).toFixed(1);
      // }
      if (totalWeight > 0) {
        // Convert totalWeight and capacity to floating-point numbers
        let weight = parseFloat(totalWeight);
        let cap = parseFloat(capacity);

        // Calculate the percentage mass and format it to one decimal place
        percentageMass = ((weight / cap) * 100).toFixed(2);

        // Store values as floating-point numbers
        flds_doc_capacity = weight;
        flds_per_capacity = percentageMass;
      }

      if (totalVolume > 0) {
        // Convert totalVolume and volume to floating-point numbers
        let volumeVal = parseFloat(totalVolume);
        let vol = parseFloat(volume);

        // Calculate the percentage volume and format it to one decimal place
        percentageVolume = ((volumeVal / vol) * 100).toFixed(2);

        // console.log(percentageVolume, "this is percentage volume afer calaulation")
        // Store values as floating-point numbers
        flds_doc_volume = volumeVal;
        flds_per_volume = percentageVolume;
      }
      totalVolume =
        totalVolume % 1 === 0
          ? totalVolume.toString() // If the number is an integer, show it without decimals
          : totalVolume.toFixed(2); // Otherwise, show it rounded to three decimal places

      totalWeight =
        totalWeight % 1 === 0 ? totalWeight.toString() : totalWeight.toFixed(2);
      var today = new Date();
      var execdate = today.getDate();

      // console.log("OSRM Auto Routes data are", routes[k]);
      var trip = {
        arrSite: site,
        code: Veh,
        date: moment.tz(ddate, "").format("YYYY-MM-DD"),
        docdate: moment.tz(ddate, "").format("YYYY-MM-DD"),
        endDate: moment.tz(tempendDate, "").format("YYYY-MM-DD"),
        depSite: site,
        freqExist: freqtype,
        appointment: appointmentExist,
        poProcessed: false,
        dlvystatus: 0,
        lvsno: null,
        credattim: new Date(),
        upddattim: new Date(),
        heuexec: currtime,
        // datexec : new Date(),
        datexec: new Date(),
        driverName: defaultDrivername,
        driverId: defaultDriver,
        generatedBy: "AutoScheduler",
        defaultDriver: "",
        trailers: 0,
        site: site,
        equipments: 0,
        vehicleObject: vehobj,
        optistatus: "Optimized",
        capacities: capacity,
        adeptime: startTime,
        startTime: startTime,
        endTime: endTime,
        trips: 1,
        pickups: pickups,
        lock: false,
        pickupObject: pickupObject,
        dropObject: dropObject,
        totalObject: itemTrip,
        equipmentObject: [],
        trialerObject: [],
        drops: drops,
        stops: stops,
        startIndex: stops,
        pickUps: pickups,
        timelineInterval: TimelineInterval,
        trailerList: [],
        trailerLink: "",
        forceSeq: false,
        currDropsPanel: {
          drops: [],
          pickUps: [],
        },
        pickups: pickups,
        alldrivers: "",
        weightPercentage: percentageMass,
        volumePercentage: percentageVolume,
        totalWeight: totalWeight + " " + flds_uom_capacity,
        totalVolume: totalVolume + " " + flds_uom_volume,
        travelTime: auto_tot_travel_time,
        serviceTime: auto_service_time,
        totalTime: auto_total_time,
        totalDistance: auto_tot_distance,
        per_capacity: percentageMass,
        per_volume: percentageVolume,
        doc_capacity: fld_doc_capacity,
        uom_capacity: fld_uom_capacity,
        uom_volume: fld_uom_volume,
        doc_volume: fld_doc_volume,
        tot_capacity: totalWeight,
        tot_volume: totalVolume,
        uom_qty: fld_uom_qty,
        doc_qty: fld_doc_qty,
        fixedCost: ffixedcost,
        totalCost: ftotalCost,
        distanceCost: fdistanceCost,
        regularCost: fRegularcost,
        overtimeCost: fovertimecost,
        timeCost: ftimeCost,
        driverslist: "",
        allcustomers: "",
        customerlist: "",
      };

      RouteprocessedData.push(trip);
    }
    // console.log("OSRM Final TripsList =", RouteprocessedData);
    TripsfromRoutes = RouteprocessedData;
    // console.log(TripsfromRoutes);

    this.ConfirmScheduledTrips(TripsfromRoutes, selDocs, selVeh, "");
  };

  groupBy = (array, key) => {
    return array.reduce((result, currentItem) => {
      const group = currentItem.attributes[key];
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(currentItem);
      return result;
    }, {});
  };

  sortStopsBySequence = (stops) => {
    return stops.sort((a, b) => a.attributes.Sequence - b.attributes.Sequence);
  };

  // Helper function to generate the token
  getArcGISToken = async (username, password) => {
    const tokenUrl = "https://www.arcgis.com/sharing/rest/generateToken";

    const params = new URLSearchParams({
      username: username,
      password: password,
      referer: "http://www.arcgis.com", // or your application URL
      f: "json",
    });

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ArcGIS token");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message || "Error generating token");
      }

      return data.token;
    } catch (error) {
      console.error("Error in getArcGISToken:", error);
      throw error;
    }
  };


  autofromselection = (SelDocs, selVeh, selDrivers) => {
    console.log(
      "autofromselection in dashboard index",
      SelDocs,
      selVeh,
      selDrivers
    );
    let tempTripPanel = this.state.tripsPanel;

    if (selVeh.length > 0 && SelDocs.length > 0) {
      this.setState({ loader: true });

      let VehList = [],
        DocList = [];
      let sameVehiclesflag = this.state.checkedsameVehicles;
      let VehStartTime, VehEndTime;
      var siteLat, siteLang;
      var doc = {};
      var selSite = this.state.selectedMultipleSites[0];

      this.state.sites.map((site) => {
        if (selSite === site.id) {
          siteLat = site.lat;
          siteLang = site.lng;
        }
      });

      let resArr = [];
      tempTripPanel.filter(function (item) {
        //  var i = resArr.findIndex((x) => x.code == item.code);
        //  if (i <= -1) {
        resArr.push(item);
        //  }
        //  return null;
      });

      for (let i = 0; i < selVeh.length; i++) {
        var Veh = {};
        let veh = selVeh[i];

        var sflag = false;
        var prevEndTime = 0;

        for (let t = 0; t < resArr.length; t++) {
          var currtrip = resArr[t];
          if (currtrip.code === veh.codeyve) {
            sflag = true;
            var endTime = splitTimeAndConv2Sec(currtrip.endTime);
            var unloadingtime = convertHrToSec(veh.enddepotserv);
            prevEndTime = endTime + unloadingtime;
          }
        }

        if (!sameVehiclesflag && !sflag) {
          Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
          // Veh.capacity = [parseInt(veh.capacities),parseInt(veh.vol), parseInt(veh.totalCases)];
          Veh.capacity = [parseInt(veh.capacities), parseInt(veh.vol)];

          Veh.id = i + 1;
          Veh.description = veh.codeyve;
          let starttime = splitTimeAndConv2Sec(veh.starttime);
          let loadingHrs = convertHrToSec(veh.startdepots);
          let stime = starttime + loadingHrs;
          let etime = splitTimeAndAddtimeAndConv2Sec(
            veh.starttime,
            veh.overtimestar
          );
          let timew = [stime, etime];
          let geo = [siteLang, siteLat];

          Veh.time_window = timew;
          Veh.start = geo;
          Veh.end = geo;
          var array = JSON.parse("[" + veh.skills + "]");
          Veh.skills = array;
          if (veh.maxordercnt > 0) {
            Veh.max_tasks = veh.maxordercnt;
          } else {
            Veh.max_tasks = 3;
          }
          VehList.push(Veh);
          VehEndTime = etime;
          VehStartTime = stime;
        } else if (sameVehiclesflag || sflag) {
          let starttime = prevEndTime;
          let loadingHrs = convertHrToSec(veh.startdepots);
          let stime = starttime + loadingHrs;
          let etime = splitTimeAndAddtimeAndConv2Sec(
            veh.starttime,
            veh.overtimestar
          );

          if (stime < etime) {
            Veh.id = i + 1;
            Veh.description = veh.codeyve;
            Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
            //   Veh.capacity = [parseInt(veh.capacities) , parseInt(veh.vol), parseInt(veh.totalCases)];
            Veh.capacity = [parseInt(veh.capacities), parseInt(veh.vol)];

            let timew = [stime, etime];
            let geo = [siteLang, siteLat];
            Veh.time_window = timew;
            Veh.start = geo;
            Veh.end = geo;
            var array = JSON.parse("[" + veh.skills + "]");
            Veh.skills = array;
            if (veh.maxordercnt > 0) {
              Veh.max_tasks = veh.maxordercnt;
            } else {
              Veh.max_tasks = 3;
            }

            VehList.push(Veh);
            VehEndTime = etime;
            VehStartTime = stime;
          }
        }
      }
      let maxDoc = this.state.defaultdocprocess;
      let docprocessedCount = 0;
      for (let j = 0; j < SelDocs.length; j++) {
        let doc = SelDocs[j];
        if (
          (doc.type === "open" || doc.type === "Allocated") &&
          (doc.dlvystatus === "0" || doc.dlvystatus === "8") &&
          docprocessedCount < maxDoc
        ) {
          var Doc = {};
          Doc.id = j + 1;
          Doc.description = doc.docnum;

          var FromArr;
          var fromflag = false;
          var toflag = false;
          if (doc.fromTime.length > 0) {
            FromArr = doc.fromTime.split(" ");
            fromflag = true;
          }
          var ToArr;
          if (doc.toTime.length > 0) {
            ToArr = doc.toTime.split(" ");
            toflag = true;
          }

          var timeWindw = [];

          fromflag &&
            FromArr.map((ft, index) => {
              var tt = [];
              tt.push(splitTimeAndConv2Sec(ft));
              tt.push(splitTimeAndConv2Sec(ToArr[index]));

              timeWindw.push(tt);
            });

          var DocLat, DocLang;
          DocLat = doc.lat;
          DocLang = doc.lng;
          Doc.location = [DocLang, DocLat];
          Doc.priority = parseInt(doc.priority, 10);
          //   Doc.amount = [parseInt(doc.netweight) , parseInt(doc.volume), parseInt(doc.noofcases)];
          Doc.amount = [parseInt(doc.netweight), parseInt(doc.volume)];
          //   var array1 = JSON.parse('[' + doc.skills + ']')

          //  Veh.skills = array1;
          // Doc.skills = (doc.skills).split(',');

          let skillsArray;
          try {
            let parsedSkills = JSON.parse("[" + doc.skills + "]");
            if (
              Array.isArray(parsedSkills) &&
              parsedSkills.every((skill) => typeof skill === "number")
            ) {
              skillsArray = parsedSkills;
            } else {
              console.warn(
                `Skipping document ${doc.docnum} due to invalid skills format: ${doc.skills}`
              );
              continue; // **Exclude the entire document**
            }
          } catch (e) {
            console.warn(
              `Skipping document ${doc.docnum} due to JSON parsing error in skills: ${doc.skills}`
            );
            continue; // **Exclude the entire document**
          }

          Doc.skills = skillsArray;
          let wtime =
            convertHrToSec(doc.waitingTime) + convertHrToSec(doc.serviceTime);

          Doc.service = parseInt(wtime);
          let ps,
            pe = 0;
          let ds,
            de = 0;

          if (fromflag) {
            Doc.time_windows = timeWindw;
          }

          // // console.log("OSRM Document details",Doc);
          DocList.push(Doc);
          docprocessedCount = docprocessedCount + 1;
        }
      }
      // // console.log("OSRM Document Final List",DocList);

      //process for the JSON file
      var processedData = {};
      processedData.vehicles = VehList;
      processedData.jobs = DocList;
      processedData.options = {
        g: true,
      };
      // // console.log(processedData ,"this is processed data from ours side")

      // // console.log(processedData.jobs[0].amount[1],processedData.vehicles[0].capacity[1] ,"this is comparison of doc and vehicle volume")

      // if(processedData.jobs[0].amount[1]>processedData.vehicles[0].capacity[1]){
      //   this.setState({
      //     errorMessage:
      //       `Documet Volume is (${processedData.jobs[0].amount[1]}) is more then Vehicle Volume (${processedData.vehicles[0].capacity[1]})`,
      //     loader: false,
      //     addAlertShow: true,
      //   });
      //   return;
      // }

      // if(processedData.jobs[0].amount[0]>processedData.vehicles[0].capacity[0]){
      //   this.setState({
      //     errorMessage:
      //       `Documet Weight is (${processedData.jobs[0].amount[0]}) is more then Vehicle Weight (${processedData.vehicles[0].capacity[0]})`,
      //     loader: false,
      //     addAlertShow: true,
      //   });
      //   return;
      // }

      // // console.log(" selected site = ", this.state.selectedSite);
      // // console.log(" list of sites are", this.state.sites);

      // // console.log("OSRM proccessed data =",processedData)
      // latest - 34.171.208.219
      // v10   - 34.134.143.219
      //new frane  - 34.118.143.128
      //34.136.15.124
      //34.132.234.177
      // US-west instance 34.95.36.63
      // 35.223.68.187 - new USA north america
      // 35.239.36.13  - great Britan & France
      //https://maps-ustema-systems.com

      //latest - 22/08/23 --- http://34.118.143.128:3000

      let ssitecur = this.state.selectedSite && this.state.selectedSite.id;
      let uurl = "";

      uurl = "https://maps.tema-systems.com";

      /*
       if(ssitecur === 'BERTO' || ssitecur ==== 'EXODU') {
          uurl = 'http://35.223.68.187:3000'
       }
       else {
         uurl = 'http://35.239.36.13:3000'
       }
    */
      // console.log("OSRM inside BEFORE OSRM - response");
      fetch(uurl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedData),
      })
        .then((response) => {
          // console.log("OSRM inside after OSRM - response", response);
          if (response.status === 200) {
            return response.json();
          } else {
            this.setState({
              errorMessage:
                "The selected documents' coordinates are either out of range or incorrect.",
              addAlertShow: true,
              loader: false,
            });
          }
        })
        .then((res) => {
          // console.log("OSRM - opti result",res);
          if (res.routes.length > 0) {
            // // console.log("OSRM - opti route count",res.routes.length);
            this.submitRoutesforTripsCreation(
              res.routes,
              selSite,
              SelDocs,
              selDrivers,
              selVeh,
              res,
              "",
              "",
              "",
              "auto_old"
            );
          } else {
            // console.log("TTTT Selected Docs = ", SelDocs)
            // console.log("TTTT Selected Veh = ", selVeh)
            let errorbox = [];

            SelDocs.forEach((doc) => {
              let glbalmissingskill = [];
              let tempoptiError = {
                docnum: "",
                skillerrorflg: false,
                skillmessage: "",
                capacatyflg: false,
                capacityError: "",
                generalflg: false,
                genearalError: "",
              };
              let glabalerrorOBject = "";

              let isSkillMatchFoundflg = false;
              let docskill = JSON.parse("[" + doc.skills + "]");
              let tcapacatyflg = false;
              let tskillflg = false;
              let tvolumeflg = false;
              let prodCodevehList = [];
              let routeCodeVehList = [];
              let timewindowVehList = [];
              let capacityVehList = [];
              let volumeVehList = [];
              let vehClassVehList = [];
              let TimewindowforDoc = [];
              selVeh.forEach((veh) => {
                let missingSkillsForDoc = [];

                // Check if all skills of doc are in veh's skills
                let varray = JSON.parse("[" + veh.skills + "]");
                //  Veh.skills = array
                //   let vehskill = ;
                //  const isSubset = docskill.every((skill) => varray.includes(skill));
                const missingSkills = docskill.filter(
                  (skill) => !varray.includes(skill)
                );

                // console.log (veh.codeyve,"TTT doc - veh subset", missingSkills)

                if (missingSkills.length === 0) {
                  // If no missing skills, it's a match
                  if (veh.capacities < doc.netweight) {
                    tcapacatyflg = true;
                    capacityVehList.push(veh.codeyve);
                  }
                  // volume check
                  if (veh.vol < doc.volume) {
                    tvolumeflg = true;
                    volumeVehList.push(veh.codeyve);
                  }
                } else {
                  // If there are missing skills, collect them
                  isSkillMatchFoundflg = true;
                  missingSkillsForDoc.push(...missingSkills);
                  glbalmissingskill.push(...missingSkills);

                  if (veh.capacities < doc.netweight) {
                    tcapacatyflg = true;
                    capacityVehList.push(veh.codeyve);
                  }
                  // volume check
                  if (veh.vol < doc.volume) {
                    tvolumeflg = true;
                    volumeVehList.push(veh.codeyve);
                  }

                  // assign the not mathced skills to the vehicle array
                  const tempuniqueMissingSkills = [...new Set(missingSkills)];
                  const temprouteCodeErrors = tempuniqueMissingSkills.filter(
                    (skill) => skill >= -1 && skill <= 100
                  );
                  const tempproductCategoryErrors =
                    tempuniqueMissingSkills.filter(
                      (skill) => skill > 100 && skill <= 200
                    );
                  const tempvehicleClassErrors = tempuniqueMissingSkills.filter(
                    (skill) => skill > 200
                  );

                  if (temprouteCodeErrors.length > 0) {
                    routeCodeVehList.push(veh.codeyve);
                  }
                  if (tempproductCategoryErrors.length > 0) {
                    prodCodevehList.push(veh.codeyve);
                  }
                  if (tempvehicleClassErrors.length > 0) {
                    vehClassVehList.push(veh.codeyve);
                  }
                }
              });

              /*
  // If no vehicle has matching skills for this document, set an error
  if (!isSkillMatchFoundflg) {
        // console.log("TTT something is not matched", doc.docnum)
   // optiError.skillmessage = `No vehicle found with the required skills for document ${doc.docnum}`;
  }
*/

              if (!tvolumeflg || !tcapacatyflg || !isSkillMatchFoundflg) {
                tempoptiError.docnum = doc.docnum;
                let tmsg = "";

                if (doc.fromTime.length > 0) {
                  const fromTimes = this.TimeWindow_splitTime(doc.fromTime); // Split into ["0700", "0900"]
                  const toTimes = this.TimeWindow_splitTime(doc.toTime); // Split into ["0800", "1030"]
                  console.log("T222 timewindow from", fromTimes);
                  for (let i = 0; i < fromTimes.length; i++) {
                    TimewindowforDoc.push(`${fromTimes[i]}-${toTimes[i]}`); // Combine each pair into a time range
                  }
                }
                console.log("T222 timewindow from", TimewindowforDoc);

                /*
         if((doc.fromTime).length > 0) {

                         TimewindowforDoc.push(splitTime(doc.fromTime))
                          TimewindowforDoc.push(splitTime(doc.toTime))
                       }
*/

                if (vehClassVehList.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded as the Customer's assigned Vehicle Class does not match  of these vehicles  ${vehClassVehList}. \n`;
                }
                if (prodCodevehList.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded as it contains products not matching the selected vehicles' ${prodCodevehList}  product categories . \n`;
                }
                if (routeCodeVehList.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded as the customer's assigned RouteCode does not match any of the selected vehicles ${routeCodeVehList}. \n`;
                }
                if (capacityVehList.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded due to Weight Capacity restriction on the selected vehicles ${capacityVehList}. \n`;
                }
                if (volumeVehList.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded due to Volume Capacity restriction on the selected vehicles ${volumeVehList}. \n`;
                }
                if (TimewindowforDoc.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded due to Delivery Time Frame restriction (${TimewindowforDoc}) . \n`;
                }

                if (glabalerrorOBject.length < 1) {
                  if (TimewindowforDoc.length > 0) {
                    glabalerrorOBject =
                      glabalerrorOBject +
                      `Document ${doc.docnum} has been excluded due to Delivery Time Frame restriction (${TimewindowforDoc}). \n`;
                  } else {
                    // console.log("TTT temp object nothing = ", doc.docnum);
                    glabalerrorOBject = `Document ${doc.docnum} has been excluded due to the vehicles weight/volume capacity was full in the current trip. \n`;
                  }
                }

                //
                //
                //     if(vehClassVehList.length > 0) {
                //      glabalerrorOBject = glabalerrorOBject + `Document ${doc.docnum} does not matched with VehicleClass of the  ${vehClassVehList} vehicles. \n`;
                //     }
                //    if(prodCodevehList.length > 0) {
                //      glabalerrorOBject = glabalerrorOBject + `Document ${doc.docnum} does not matched with Product Category of the  ${prodCodevehList} vehicles. \n`;
                //    }
                //   if(routeCodeVehList.length > 0) {
                //      glabalerrorOBject = glabalerrorOBject + `Document ${doc.docnum} does not matched with RouteCode of the  ${routeCodeVehList} vehicles. \n`;
                //   }
                //    if(capacityVehList.length > 0) {
                //       glabalerrorOBject = glabalerrorOBject + `Document ${doc.docnum} does not matched with Weight Capacity of the ${capacityVehList} vehicles. \n`;
                //    }
                //   if(volumeVehList.length > 0) {
                //     glabalerrorOBject = glabalerrorOBject + `Document ${doc.docnum} does not matched with Volume Capacity of the ${volumeVehList} vehicles. \n`;
                //   }
                //

                /*
      if(isSkillMatchFoundflg) {

       const uniqueMissingSkills = [...new Set(glbalmissingskill)];
        const routeCodeErrors = uniqueMissingSkills.filter((skill) => skill >= -1 && skill <= 100);
           const productCategoryErrors = uniqueMissingSkills.filter((skill) => skill > 100 && skill <= 200);
           const vehicleClassErrors = uniqueMissingSkills.filter((skill) => skill > 200);

        if (routeCodeErrors.length > 0) {
                 tmsg = tmsg + "RouteCodes  ";
        }
         if (productCategoryErrors.length > 0) {
                         tmsg = tmsg + "ProductCategory ";
         }
          if (vehicleClassErrors.length > 0) {
                                  tmsg = tmsg + "Vehicle Class ";
                  }

         if(tcapacatyflg) {
                           tmsg = tmsg + "Capacity ";
                           }

          if(tvolumeflg)         {

          tmsg = tmsg + "Volume ";
          }


      tempoptiError.skillerrorflg = isSkillMatchFoundflg;
                  tempoptiError.skillmessage = `Document ${doc.docnum} is not matched with  ${tmsg} with all the selected vehicles`;
                glabalerrorOBject = `Document ${doc.docnum} is not matched with  ${tmsg} with all the selected vehicles. \n`;
                  }
     else if(tcapacatyflg) {

                if(tvolumeflg) {
                    tempoptiError.capacatyflg = tcapacatyflg;
                                  tempoptiError.capacityError = `Document ${doc.docnum} capacity is  not sufficient with selected vehicles Capacity`;
                                  glabalerrorOBject = `Document ${doc.docnum} has capacity & Volume is  not sufficient with selected vehicles Capacity & Volume. \n`;
                }
               else {
                  tempoptiError.capacatyflg = tcapacatyflg;
                  tempoptiError.capacityError = `Document ${doc.docnum} capacity is  not sufficient with selected vehicles Capacity`;
                  glabalerrorOBject = `Document ${doc.docnum} is capacity is  not sufficient with selected vehicles Capacity. \n`;
              }

                  }
     else if(tvolumeflg)         {
                  tempoptiError.generalflg = tvolumeflg;
                  tempoptiError.genearalError = `Document ${doc.docnum} volume is not sufficient with selected vehicles volume`;
                 glabalerrorOBject = `Document ${doc.docnum} volume is not sufficient with selected vehicles volume. \n`;
                  }
                  else {
                  }



  }
     */
                // console.log("TTT temp object = ", tempoptiError);
                glabalerrorOBject = glabalerrorOBject + "\n";
                // console.log("TTT temp glabalerrorOBject = ", glabalerrorOBject);
                errorbox.push(glabalerrorOBject);
              }
            });
            const finalErrorMessage = errorbox.join("\n");

            // console.log("TTT error box = ", errorbox);
            this.setState({
              errorArrayMessage: errorbox,
              loader: false,
              addAlertArrayShow: true,
            });
          }
        });
      // console.log("OSRM Out of response");
    } else {
      if (selVeh.length === 0) {
        this.setState({
          errorMessage: "There are no vehicles selected.",
          addAlertShow: true,
        });
      } else {
        this.setState({
          errorMessage: "There are no documents selected.",
          addAlertShow: true,
        });
      }
    }
  };

  openPopupAuto = (val) => {
    this.setState({
      openAutoPopup: val,
    });
  };

  disableDivs = (index, type, docNum) => {
    // console.log("T31  inside disableDivs ", index);
    // console.log("T31  inside disableDivs type", type);
    // console.log("T31  inside disableDivs docnum", docNum);
    var currVehPanel = this.state.vehiclePanel;
    var currDropsPanel = this.state.dropsPanel;

    if (type === "vehicle") {
      var currVeh = currVehPanel.vehicles;
      currVeh[index].isDropped = true;
      currVeh[index].type = "selected";
      currVehPanel.vehicles = currVeh;
    }
    if (type === "trailer") {
      var currVeh = currVehPanel.trails;
      currVeh[index].isDropped = true;
      currVeh[index].type = "selected";
      currVehPanel.trails = currVeh;
    }
    if (type === "driver") {
      var currVeh = currVehPanel.drivers;
      currVeh[index].isDropped = true;
      currVeh[index].type = "selected";
      currVehPanel.drivers = currVeh;
    }
    if (type === "equipment") {
      var currVeh = currVehPanel.equipments;
      currVeh[index].isDropped = true;
      currVeh[index].type = "selected";
      currVehPanel.equipments = currVeh;
    }
    if (type === "pickup") {
      var currVeh = currDropsPanel.pickUps;

      if (this.state.checkedToPlan || this.state.searchPanel) {
        if (currDropsPanel.pickUps && currDropsPanel.pickUps.length > 0) {
          currDropsPanel.pickUps.map((pickups, i) => {
            if (pickups.docnum === docNum) {
              currVeh[i].isDropped = true;
              currVeh[i].type = "selected";
            }
          });
        }
      } else {
        currVeh[index].isDropped = true;
        currVeh[index].type = "selected";
      }
      currDropsPanel.pickUps = currVeh;
    }
    if (type === "drops") {
      // console.log("T31 inside drop - disable");
      var currVeh = currDropsPanel.drops;
      // console.log("T31 inside drop - disable CurrVel", currVeh);
      // console.log("T31 inside drop - disable if");
      if (currDropsPanel.drops && currDropsPanel.drops.length > 0) {
        currDropsPanel.drops.map((drops, i) => {
          if (drops.docnum === docNum) {
            currVeh[i].isDropped = true;
            currVeh[i].type = "selected";
          }
        });
      }
      currDropsPanel.drops = currVeh;
    }
    this.setState({
      vehiclePanel: currVehPanel,
      dropsPanel: currDropsPanel,
    });
  };

  UnlockConfirmTrip = (ClickedTrip) => {
    this.confirmTrip(ClickedTrip, "unlock");
  };

  submitTrips = (trips) => {
    this.setState({ loader: true });
    fetch(`${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        // console.log("inside after trip - response", response);
        this.handleErrors(response);
      })
      .then(function (response) {})
      .then(() => {
        // console.log("inside submit Trips", this.state.date);
        this.handleDateChange(this.state.date);
      })
      .then(() => {
        this.setState({
          loader: false,
          checkedTrip: false,
          isDetail: false,
          updatetypeTrip: false,
        });

        let checkBoxAllTrips = document.getElementById("tripsCheckBoxAll");
        if (checkBoxAllTrips && checkBoxAllTrips.checked) {
          checkBoxAllTrips.checked = false;
        }
        this.notifySucess("Trip Added/Updated Sucessfully");
      })
      .catch((error) => {
        this.handleDateChange(this.state.date);
        this.setState({ loader: false });
        this.notifyError(
          "Please add proper trip to add or update, with vehicle, drops and pickups"
        );
      });
  };

  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  confirmTrip = (trip, route, routesSchedule, newGeoData) => {
    console.log("T222 insdie confirm Trip");
    this.setState({ loader: true });
    if (
      (trip.timelineInterval != undefined &&
        trip.timelineInterval.length > 0) ||
      route === "unlock" ||
      route === "loaderMsg" ||
      route === "ForceSeq" ||
      route === "Open"
    ) {
      // trip.site = this.state.selectedSite.id;
      this.setState({ selectedSite: trip.site });
      this.setState({ selectedSiteValue: trip.site });
      var today = new Date();
      var execdate = today.getDate();
      var hr = today.getHours();
      if (hr <= 9) {
        hr = "0" + hr;
      }
      var min = today.getMinutes();
      if (min <= 9) {
        min = "0" + min;
      }
      var time = hr + ":" + min;
      trip.heuexec = time;
      if (route === "route") {
        /*
        var today = new Date;
        var execdate = today.getDate();
        var hr = today.getHours()
        if (hr <= 9) {
          hr = "0" + hr;
        }
        var min = today.getMinutes();
        if (min <= 9) {
          min = "0" + min;
        }
        var time = hr + ":" + min;
        trip.datexec = today;
        trip.heuexec = time;
        */
        trip.datexec = today;
        trip.date = moment.tz(this.state.date, "").format("YYYY-MM-DD");
        //trip.date = this.state.date;
        trip.startTime = routesSchedule.startTime;
        trip.endTime = routesSchedule.endTime;
        trip.startDate = routesSchedule.startDate;
        trip.endDate = routesSchedule.endDate;
        trip.travelTime = routesSchedule.tripData.tripTravelTime;
        trip.serviceTime = routesSchedule.tripData.tripTotalServiceTime;
        trip.totalTime = routesSchedule.tripData.tripTotalTime;
        trip.totalDistance = routesSchedule.tripData.totalDistance;
        trip.route = true;
        trip.fixedCost = routesSchedule.cost.fixedCost;
        trip.totalCost = routesSchedule.cost.totalCost;
        trip.distanceCost = routesSchedule.cost.distanceCost;
        trip.regularCost = routesSchedule.cost.Regularcost;
        trip.overtimeCost = routesSchedule.cost.overtimecost;
        trip.timeCost = routesSchedule.cost.timeCost;
        trip.optistatus = "Optimized";
        trip.generatedBy = "MScheduler";
        trip.uomTime = "Hr";
        trip.uomDistance = "Kms";
        trip.route = true;
      } else if (route === "unlock") {
        trip.lock = false;
        trip.lockP = true;
        trip.date = moment.tz(this.state.date, "").format("YYYY-MM-DD");
        trip.route = true;
      } else if (route === "loaderMsg" || route === "ForceSeq") {
        // trip.loaderInfo =
        trip.date = moment.tz(this.state.date, "").format("YYYY-MM-DD");
        trip.route = false;
      } else {
        trip.date = moment.tz(this.state.date, "").format("YYYY-MM-DD");
        trip.endDate = "";
        trip.optistatus = "Open";
        trip.generatedBy = "MScheduler";
        trip.route = false;
      }
      var totalWeight = 0;
      var totalVolume = 0;
      var weight = "";
      var volume = "";
      for (var i = 0; i < trip.pickupObject.length; i++) {
        totalWeight = totalWeight + parseFloat(trip.pickupObject[i].netweight);
        totalVolume = totalVolume + parseFloat(trip.pickupObject[i].volume);
        if (weight == "") {
          weight = trip.pickupObject[i].weightunit;
        }
        if (volume == "") {
          volume = trip.pickupObject[i].volume_unit;
        }
      }

      for (var i = 0; i < trip.dropObject.length; i++) {
        totalWeight = totalWeight + parseFloat(trip.dropObject[i].netweight);
        totalVolume = totalVolume + parseFloat(trip.dropObject[i].volume);
        if (weight == "") {
          weight = trip.dropObject[i].weightunit;
        }
        if (volume == "") {
          volume = trip.dropObject[i].volume_unit;
        }
      }

      var percentageMass = 0;
      var percentageVolume = 0;

      if (totalWeight > 0) {
        percentageMass = (
          (parseFloat(totalWeight) / parseFloat(trip.capacities)) *
          100
        ).toFixed(2);
      }

      if (totalVolume > 0) {
        percentageVolume = (
          (parseFloat(totalVolume) / parseFloat(trip.vehicleObject.vol)) *
          100
        ).toFixed(2);
      }

      trip.weightPercentage = percentageMass;
      trip.volumePercentage = percentageVolume;
      trip.per_capacity = percentageMass;
      trip.per_volume = percentageVolume;
      trip.totalWeight = totalWeight + " " + weight;
      trip.totalVolume = totalVolume.toFixed(2) + " " + volume;
      trip.doc_capacity = totalWeight;
      trip.doc_volume = totalVolume;
      trip.uom_capacity = weight;
      trip.uom_volume = volume;
      var itemTrips = [];
      this.refreshTrips();
      var itemTrip = {};

      if (route === "unlock" || route === "loaderMsg" || route === "ForceSeq") {
        itemTrips.push(trip);
      } else {
        if (route === "route") {
          if (routesSchedule) {
            while (
              this.state.tripsPanel[this.state.selectedIndex].timelineInterval
                .length > 0
            ) {
              this.state.tripsPanel[
                this.state.selectedIndex
              ].timelineInterval.pop();
            }
            this.state.tripsPanel[
              this.state.selectedIndex
            ].timelineInterval.push({
              value: 0,
              label: routesSchedule.startTime,
            });
            routesSchedule.routesData.map((data, index) => {
              let values;
              values = (index + 1) * 12;
              this.state.tripsPanel[
                this.state.selectedIndex
              ].timelineInterval.push({ value: values, label: data.end });
            });
          }
          itemTrip.timelineInterval =
            this.state.tripsPanel[this.state.selectedIndex].timelineInterval;
          itemTrip.selectedTripData = newGeoData;
        } else {
          var tempslectedTrips = [];
          for (var l = 0; l < this.state.slectedTrips.length; l++) {
            var tempDoc = this.state.slectedTrips[l];
            tempDoc.vehicleCode = trip.code;
            tempslectedTrips.push(tempDoc);
          }
          itemTrip.selectedTripData = tempslectedTrips;
          itemTrip.timelineInterval = trip.timelineInterval;
        }
        itemTrip.equipments = this.state.equipments;
        itemTrip.trailers = this.state.trailers;
        itemTrip.quantities = this.state.quantities;
        if (
          this.state.tripsPanel &&
          this.state.tripsPanel[this.state.selectedIndex] &&
          this.state.tripsPanel[this.state.selectedIndex].totalObject &&
          this.state.tripsPanel[this.state.selectedIndex].totalObject.logData
        ) {
          itemTrip.logData =
            this.state.tripsPanel[this.state.selectedIndex].totalObject.logData;
        } else {
          itemTrip.logData = [];
        }

        trip.totalObject = itemTrip;
        if (this.state.reorder) {
          trip.reorder = this.state.reorder;
        } else {
          trip.reorder = false;
        }

        this.setState({ reorder: false });
        itemTrips.push(trip);
        if (
          this.state.docType &&
          this.state.docType.length > 0 &&
          this.state.deletedVehicleCode &&
          this.state.deletedVehicleCode.length > 0
        ) {
          let tripPanel = this.state.tripsPanel;
          tripPanel.map((trip) => {
            if (trip.code === this.state.deletedVehicleCode) {
              trip.optistatus = null;
            }
          });
          this.setState({ tripsPanel: tripPanel });
          this.setState({ docType: "" });
          this.setState({ deletedVehicleCode: "" });
        }
      }
      var user = JSON.parse(localStorage.getItem("authUser"));
      let details = {
        loginUser: user.username,
        dateTime: new Date().toDateString().replace(/-/g, "/"),
        type: "",
      };

      if (
        itemTrips[0].totalObject.logData &&
        itemTrips[0].totalObject.logData.length > 0
      ) {
        if (route && route.length > 0) {
          details.type = route;
        } else {
          details.type = "modify";
        }
        itemTrips[0].totalObject.logData.push(details);
      } else {
        itemTrips[0].totalObject.logData = [];
        details.type = "create";
        itemTrips[0].totalObject.logData.push(details);
      }

      this.submitTrips(itemTrips);
      var currDropsPanel = this.state.dropsPanel;
      var drops = currDropsPanel.drops;
      var pickUps = currDropsPanel.pickUps;

      for (var i = 0; i < trip.dropObject.length; i++) {
        for (var j = 0; j < drops.length; j++) {
          if (trip.dropObject[i].docnum === drops[j].docnum) {
            drops[j].vehicleCode = trip.code;
            drops[j].type = "Allocated";
          }
        }
      }

      for (var i = 0; i < trip.pickupObject.length; i++) {
        for (var j = 0; j < pickUps.length; j++) {
          if (trip.pickupObject[i].docnum === pickUps[j].docnum) {
            pickUps[j].vehicleCode = trip.code;
            pickUps[j].type = "Allocated";
          }
        }
      }

      currDropsPanel.drops = drops;
      currDropsPanel.pickUps = pickUps;
    } else {
      this.handleDateChange(this.state.date);
      this.notifyError("Vehicle is mandatory");
    }
  };

  refreshTrips = () => {
    this.updateGeoLocations();
    this.removeTrips();
  };

  filterTrans_depSite = (site) => {
    this.setState({ deliverySite: site });
  };

  /*

        updateTrip = (trip) => {
          this.setState({
            trips: trip
          });
          // this.removeMarkers();
        }

*/

  // onTripDelete = (index, docnum, vtype, vcode) => {
  //   var currentGeoData = this.state.geoData;
  //   var currentMarkers = this.state.markers;
  //   var geoData = [];
  //   var currMarkers = [];
  //   var currDropsPanel = this.state.dropsPanel;
  //   var drops = currDropsPanel.drops;
  //   var pickUps = currDropsPanel.pickUps;
  //   var trips = [];
  //   var trip = this.state.trips[0];
  //   var removeDocs = [];

  //   if (currentGeoData[index].panelType == "pickup") {
  //     var pickCount = trip.pickups;
  //     trip.pickups = pickCount - 1;
  //     removeDocs.push(docnum);
  //     for (var i = 0; i < pickUps.length; i++) {
  //       if (pickUps[i].docnum == docnum) {
  //         pickUps[i].type = "open";
  //         pickUps[i].vehicleCode = "";
  //       }
  //     }

  //     //to get Paired document for the deleted Pikcup element
  //     for (var k = 0; k < trip.pickupObject.length; k++) {
  //       if (trip.pickupObject[k].docnum === docnum) {
  //         if (
  //           trip.pickupObject[k].pairedDoc != undefined &&
  //           trip.pickupObject[k].pairedDoc != " "
  //         ) {
  //           var dropCount = trip.drops;
  //           trip.drops = dropCount - 1;
  //           removeDocs.push(trip.pickupObject[k].pairedDoc);
  //         }
  //         for (var j = 0; j < drops.length; j++) {
  //           if (drops[j].docnum == trip.pickupObject[k].pairedDoc) {
  //             drops[j].type = "open";
  //             drops[j].vehicleCode = "";
  //           }
  //         }
  //       }
  //     }
  //   }

  //   if (currentGeoData[index].panelType == "drop") {
  //     var dropCount = trip.drops;
  //     trip.drops = dropCount - 1;
  //     removeDocs.push(docnum);
  //     for (var j = 0; j < drops.length; j++) {
  //       if (drops[j].docnum == docnum) {
  //         drops[j].type = "open";
  //         drops[j].vehicleCode = "";
  //       }
  //     }

  //     //to get Paired document for the deleted Drop element
  //     for (var k = 0; k < trip.dropObject.length; k++) {
  //       if (trip.dropObject[k].docnum === docnum) {
  //         if (
  //           trip.dropObject[k].pairedDoc != undefined &&
  //           trip.dropObject[k].pairedDoc != " "
  //         ) {
  //           var pickCount = trip.pickups;
  //           trip.pickups = pickCount - 1;
  //           removeDocs.push(trip.dropObject[k].pairedDoc);
  //         }
  //         for (var i = 0; i < pickUps.length; i++) {
  //           if (pickUps[i].docnum == trip.dropObject[k].pairedDoc) {
  //             pickUps[i].type = "open";
  //             pickUps[i].vehicleCode = "";
  //           }
  //         }
  //       }
  //     }
  //   }

  //   currDropsPanel.drops = drops;
  //   currDropsPanel.pickUps = pickUps;
  //   var stops = parseInt(trip.pickups) + parseInt(trip.drops);
  //   trip.startIndex = stops;
  //   trip.stops = stops;
  //   for (var i = 0; i < currentGeoData.length; i++) {
  //     if (!removeDocs.includes(currentGeoData[i].docnum)) {
  //       geoData.push(currentGeoData[i]);
  //     }
  //   }

  //   for (var i = 0; i < currentMarkers.length; i++) {
  //     if (!removeDocs.includes(currentMarkers[i].docnum)) {
  //       currMarkers.push(currentMarkers[i]);
  //     }
  //   }
  //   var currSelectedTrips = this.state.slectedTrips;
  //   var selectedTrips = [];

  //   for (var i = 0; i < currSelectedTrips.length; i++) {
  //     if (!removeDocs.includes(currSelectedTrips[i].docnum)) {
  //       selectedTrips.push(currSelectedTrips[i]);
  //     }
  //   }
  //   var pickupObject = [];
  //   for (var i = 0; i < trip.pickupObject.length; i++) {
  //     if (!removeDocs.includes(trip.pickupObject[i].docnum)) {
  //       pickupObject.push(trip.pickupObject[i]);
  //     }
  //   }
  //   var dropObject = [];
  //   for (var i = 0; i < trip.dropObject.length; i++) {
  //     if (!removeDocs.includes(trip.dropObject[i].docnum)) {
  //       dropObject.push(trip.dropObject[i]);
  //     }
  //   }

  //   trip.pickupObject = pickupObject;
  //   trip.dropObject = dropObject;

  //   var tripColor = [
  //     "#e0e0e0",
  //     "#e0e0e0",
  //     "#e0e0e0",
  //     "#e0e0e0",
  //     "#e0e0e0",
  //     "#e0e0e0",
  //     "#e0e0e0",
  //     "#e0e0e0",
  //     "#e0e0e0",
  //   ];

  //   var count = selectedTrips.length;
  //   for (var i = 0; i < count; i++) {
  //     if (selectedTrips[i].panelType === "drop") {
  //       tripColor[i] = "#7ace4c";
  //     } else if (selectedTrips[i].panelType === "pickup") {
  //       tripColor[i] = "#09aaed";
  //     }
  //   }
  //   trips.push(trip);
  //   this.setState({
  //     markers: currMarkers,
  //     geoData: geoData,
  //     trips: trips,
  //     tripColor: tripColor,
  //     slectedTrips: selectedTrips,
  //     selectedTripData: selectedTrips[count - 1],
  //     left: count * 55,
  //     dropsPanel: currDropsPanel,
  //     mapChanged: true,
  //     docType: vtype,
  //     deletedVehicleCode: vcode,
  //   });
  // };

  updateTimeLine = () => {
    var elements = document.getElementsByName("docNum");
    var docElements = [];
    var currTripsLine = this.state.slectedTrips;
    var tripColor = [
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
    ];
    for (var k = 0; k < currTripsLine.length; k++) {
      if (currTripsLine[k].docnum == undefined) {
        docElements.push(currTripsLine[k]);
      }
    }
    for (var i = 0; i < elements.length; i++) {
      for (var j = 0; j < currTripsLine.length; j++) {
        if (elements[i].innerText === currTripsLine[j].docnum) {
          docElements.push(currTripsLine[j]);
          if (currTripsLine[j].panelType === "drop") {
            tripColor[docElements.length - 1] = "#7ace4c";
          } else if (currTripsLine[j].panelType === "pickup") {
            tripColor[docElements.length - 1] = "#09aaed";
          } else {
            tripColor[docElements.length - 1] = "#ed3309";
          }
        }
      }
    }
    this.setState({
      reorder: true,
      tripColor: tripColor,
      slectedTrips: docElements,
      selectedTripData: docElements[docElements.length - 1],
      left: docElements.length * 55,
    });
  };

  changeDate = (day, dayflag, from) => {
    // console.log("T444 inside chagneDAte-day", day, dayflag, from);

    var flagconsider = false;
    if (from == "checked") {
      // console.log("T222 from checked ", from);
      flagconsider = dayflag;
      // console.log("T222 from flagconsider ", flagconsider);
    } else if (from == "buttons") {
      // console.log("T222 from button", from);
      flagconsider = this.state.checked5days;
      // console.log("T222 from flagconsider", flagconsider);
    }

    // console.log("T21 inside chageDAte");
    var currDate = moment(this.state.dropDate).add(day, "days");
    var newDate = moment(currDate).format("YYYY-MM-DD");
    var sdate = moment(currDate).add(-5, "days");
    var edate = moment(currDate).add(5, "days");
    var newStartDate = moment(sdate).format("YYYY-MM-DD");
    var newEndDate = moment(edate).format("YYYY-MM-DD");
    // console.log("T444 inside chagneDAte-currdate", currDate);

    if (flagconsider) {
      // console.log("T222 inside changeDAte checked5days true");
      fetchDropsPanelwithRange(
        this.state.selectedMultipleSites,
        newStartDate,
        newEndDate
      )
        .then(([res1]) => {
          var dropsP = res1;
          // console.log("drops panel after result", res1);
          // this.filterDropsDiv(newDate, dropsP);
          // console.log("drops panel after filter", dropsP);
          this.setState({
            dropDate: new Date(newDate.replace(/-/g, "/")).toDateString(),
            dropsPanel: dropsP,
          });
          if (day == 0 && from !== "deleteTrip") {
            this.notifySucess("Documents Refreshed Successfully");
          }
        })
        .catch((error) => {});
    } else {
      // console.log("T222 inside changeDAte checked5days false");

      fetchDropsPanel(this.state.selectedMultipleSites, newDate)
        .then(([res1]) => {
          var dropsP = res1;
          // console.log("drops panel after result", dropsP);
          // this.filterDropsDiv(newDate, dropsP);
          // console.log("drops panel after filter", dropsP);
          this.setState({
            dropDate: new Date(newDate.replace(/-/g, "/")).toDateString(),
            dropsPanel: dropsP,
          });
          if (day == 0 && from !== "deleteTrip") {
            this.notifySucess("Documents Refreshed Successfully");
          }
        })
        .catch((error) => {});
    }
  };

  checked5days = (checked) => {
    // console.log("T222 inside checked5days", checked);
    this.setState({ checked5days: checked });
    this.changeDate(0, checked, "checked");
  };

  filterDropsDiv = (day, dropsPanel) => {
    var currDate = moment.tz(this.state.date).format("YYYY-MM-DD");
    var status = false;
    if (currDate > day) {
      status = true;
    } else if (currDate < day) {
      status = true;
    } else {
      status = true;
    }

    if (status) {
      var trips = this.state.slectedTrips;
      for (var i = 0; i < dropsPanel.drops.length; i++) {
        for (var j = 0; j < trips.length; j++) {
          if (trips[j].docnum == dropsPanel.drops[i].docnum) {
            dropsPanel.drops[i].type = "selected";
            dropsPanel.drops[i].vehicleCode = trips[j].vehicleCode;
          }
        }
      }
      for (var i = 0; i < dropsPanel.pickUps.length; i++) {
        for (var j = 0; j < trips.length; j++) {
          if (trips[j].docnum == dropsPanel.pickUps[i].docnum) {
            dropsPanel.pickUps[i].type = "selected";
            dropsPanel.pickUps[i].vehicleCode = trips[j].vehicleCode;
          }
        }
      }
    }
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  checkedToPlan = (checked) => {
    this.setState({ checkedToPlan: checked });
  };

  checkedDeliverables = (checked) => {
    this.setState({ checkedDeliverables: checked });
  };

  checkedInProcess = (checked) => {
    this.setState({ checkedInProcess: checked });
  };

  updateTopBar = () => {
    var trips = this.state.tripsPanel;
    var vehicleList = [];
    var routesCount = 0;
    var Drop_prodCount = 0;
    var Pickup_prodCount = 0;
    var assignedOrders = 0;
    var unassignedOrders = 0;
    for (var i = 0; i < trips.length; i++) {
      if (!vehicleList.includes(trips[i].code)) {
        vehicleList.push(trips[i].code);
      }
      routesCount += 1;
    }
    for (var i = 0; i < trips.length; i++) {
      var dropobj = [];
      var pickupobj = [];

      if (null !== trips[i].dropObject) {
        for (var j = 0; j < trips[i].dropObject.length; j++) {
          for (var k = 0; k < trips[i].dropObject[j].products.length; k++) {
            Drop_prodCount += parseInt(
              trips[i].dropObject[j].products[k].quantity
            );
          }
        }
      }

      if (null !== trips[i].pickupObject) {
        for (var j = 0; j < trips[i].pickupObject.length; j++) {
          for (var k = 0; k < trips[i].pickupObject[j].products.length; k++) {
            Pickup_prodCount += parseInt(
              trips[i].pickupObject[j].products[k].quantity
            );
          }
        }
      }
    }

    var drops = this.state.dropsPanel.drops;
    var pickups = this.state.dropsPanel.pickUps;
    for (var j = 0; j < drops.length; j++) {
      if (drops[j].type != "open") {
        assignedOrders += 1;
      } else {
        unassignedOrders += 1;
      }
    }
    for (var k = 0; k < pickups.length; k++) {
      if (pickups[k].type != "open") {
        assignedOrders += 1;
      } else {
        unassignedOrders += 1;
      }
    }
    unassignedOrders =
      this.state.dropsPanel.drops.length +
      this.state.dropsPanel.pickUps.length -
      assignedOrders;
    var topDetails = {};
    topDetails.vehicleCount = vehicleList.length;
    topDetails.routesCount = routesCount;
    topDetails.assignedOrders = assignedOrders;
    topDetails.unassignedOrders = unassignedOrders;
    topDetails.travelTime = 0;
    topDetails.serviceTime = 0;

    topDetails.DropProdCount = Drop_prodCount;
    topDetails.PickupProdCount = Pickup_prodCount;
    this.setState({
      topDetails: topDetails,
    });
  };

  handleMulti = (sites) => {
    this.setState({ sites });
  };

  handleDefault(date) {
    this.setState({
      default_date: date,
       docsStartDate: date,
            docsEndDate: date,
      date: date,
    });
  }

  onMarkerClick(props, marker, e) {
    alert("You clicked in this marker");
  }

  Timeline_SelectedSite = () => {
    let optionItems = [];
    var optionSelected = {};
    var selectedSite = {};
    var placeHolder = "All";
    this.state.sites &&
      this.state.sites.length > 0 &&
      this.state.sites.map((site) => {
        if (site.id == this.state.selectedSite) {
          selectedSite = site;
          placeHolder = site.value;
          optionSelected.value = site.id;
          optionSelected.label = site.value + "(" + site.id + ")";
        }
        optionItems.push({
          value: site.id,
          label: site.value + "(" + site.id + ")",
        });
      });
  };

  setCurrentSite = (selectedOption) => {
    var currSelected = {};
    this.state.sites &&
      this.state.sites.map((site) => {
        if (selectedOption[0] === site.id) {
          currSelected = site;
          currSelected.city = site.value;
        }
      });
    this.setState({
      selectedSite: currSelected,
      selectedMultipleSites: selectedOption,
    });
  };

  refreshAllPanels = () => {
    const emptyTrip = [];
    this.setState({
      loader: true,
      selectedDocuments: [],
      trips: emptyTrip,
    });
    // console.log("T11 inside refreshAllpanels", this.state.trips);
    // console.log("T11 inside refreshAllpanels", this.state.date);
    this.handleDateChange(this.state.date);
  };

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var timeLineContainer = document.querySelector(".timeline-container");
    var dropZone = {
      getContainer: function () {
        return timeLineContainer;
      },
      onDragStop: function (params) {
        const el = document.querySelector(".timeline-data");
        el.classList.remove("d-none");
        // var el = document.createElement("div");
        // el.classList.add("tile");
        // el.innerHTML =
        //   '<div class="id">' + params.node.data.vehicle_code + "</div>";
        // timeLineContainer.appendChild(el);
      },
    };
    params.api.addRowDropZone(dropZone);
  }

  sitesArr = (val) => {
    this.setCurrentSite(val);
    this.setState({ selectedSitesArr: val });
  };

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem("authUser"));
    // const currDate = moment
    //   .tz(new Date().toDateString().replace(/-/g, "/"))
    //   .format("YYYY-MM-DD");
    // console.log("T11 component did mount", currDate);
    // console.log("T11 component did mount", this.state.date);
    Promise.all([
      fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/usrsites?user=` +
          user.username
      ),
    ])
      .then(([res1]) => {
        return Promise.all([res1.json()]);
      })
      .then(([res1]) => {
        this.setState({
          sites: res1,
        });
      });
  }

  updateSelectedSite = (siteId) => {
    var curSites = this.state.sites;
    for (var i = 0; i < curSites.length; i++) {
      if (curSites[i].id == siteId) {
        this.setState({ selectedSite: curSites[i] });
      }
    }
  };

  handleSiteChange = (selectedOption) => {
    this.setState({ loader: true });
    // console.log("site change", selectedOption);
    // console.log("date =", this.state.date);
    this.setCurrentSite(selectedOption);
    const currDate = moment.tz(this.state.date, "").format("YYYY-MM-DD");
    // console.log("after assign current date =", currDate);
    fetchAPI(selectedOption, currDate)
      .then(([res1, res2, res3, res4]) => {
        this.setState({
          vehiclePanel: res1,
          deliverySite: "",
          updatedArrSite: "",
          dropsPanel: res2,
          tripsPanel: res3,
          RouteCode: res4,
          loader: false,
        });
      })
      .then(() => {
        this.updateTopBar();
        this.refreshSite();
      })
      .catch((error) => {});
  };

  refreshSite = () => {
    this.updateGeoLocations();
    this.enableDroppedDiv();
    this.removeTrips();
  };

  updateGeoLocations = () => {
    this.removeMarkers();
    this.setState({
      mapChanged: true,
    });
  };

  removeMarkers = () => {
    this.setState(
      {
        markers: [],
        geoData: [],
      },
      this.addStateMarker
    );
  };

  addStateMarker = () => {
    if (this.state.selectedSite.lat != undefined) {
      let currMarkers;
      if (this.state.markers.length > 0) {
        currMarkers = this.state.markers;
      } else {
        currMarkers = [];
        currMarkers.push(this.state.selectedSite);

        let currDropsList = this.state.dropsPanel.drops;
        let currPickupsList = this.state.dropsPanel.pickUps;

        // console.log("T222 add STatemarker Drops =", currDropsList);
        // console.log("T222 add STatemarker Pikcups =", currPickupsList);

        for (let di = 0; di < currDropsList.length; di++) {
          if (
            currDropsList[di].dlvystatus === "0" ||
            currDropsList[di].dlvystatus === "8"
          ) {
            currDropsList[di].panelType = "drop";
            currMarkers.push(currDropsList[di]);
          }
        }

        for (let pi = 0; pi < currPickupsList.length; pi++) {
          if (
            currPickupsList[pi].dlvystatus === "0" ||
            currPickupsList[pi].dlvystatus === "8"
          ) {
            currPickupsList[pi].panelType = "pickup";
            currMarkers.push(currPickupsList[pi]);
          }
        }
      }
      this.setState({
        markers: currMarkers,
        mapChanged: true,
      });
    }
  };

  removeGeoMarkers = () => {
    var currMarkers = [];
    this.setState({
      geoMarkers: currMarkers,
    });
  };

  addUpdateType = () => {
    this.setState({
      updatetypeTrip: true,
    });
  };

  addGeoLocations = (geoObj) => {
    const currMarkers = this.state.markers;
    currMarkers.push(geoObj);
    // currMarkers = this.startAndEndDeport(currMarkers, this.state.trips[0])
    this.setState({
      markers: currMarkers,
      mapChanged: true,
    });
  };

  addGeoList = (geoData, index) => {
    const currData = this.state.geoData;
    currData.push(geoData);
    var selectedTrips = this.state.slectedTrips;
    selectedTrips.push(geoData);
    var tripColor = this.state.tripColor;

    if (geoData.panelType === "drop") {
      tripColor[index - 1] = "#7ace4c";
    } else if (geoData.panelType === "pickup") {
      tripColor[index - 1] = "#09aaed";
    } else {
      tripColor[index - 1] = "#ed3309";
    }

    this.setState({
      geoData: currData,
      tripColor: tripColor,
      selectedTripData: geoData,
      slectedTrips: selectedTrips,
      left: index * 55,
    });
  };

  addSelectedTrips = (count) => {
    var slctTrips = this.state.slectedTrips;
    var emptyTrip = {};
    for (var i = 0; i < count; i++) {
      slctTrips.push(emptyTrip);
    }
    this.setState({
      slectedTrips: slctTrips,
      left: count,
    });
  };

  handleDateChange = (date) => {
    this.setState({ loader: true });
    // console.log("T11 sync,inside handleDatechagne", date);
    const currDate = moment.tz(date, "").format("YYYY-MM-DD");
    // console.log("T11 sync,inside handleDatechagne", currDate);

    let value = this.state.selectedMultipleSites;
    fetchAPI(value, currDate)
      .then(([res1, res2, res3, res4, status1, status2, status3, status4]) => {
        /*
          if(status1 === 200 && status2 === 200 && status3 === 200){
                   this.setState({loading: false})
          }
          */

        this.setState({
          date: currDate,
          default_date: currDate,
           docsStartDate: date,
                    docsEndDate: date,
          dropDate: currDate,
          deliverySite: "",
          trips: [],
          updatedArrSite: "",
          allowedDrivers: [],
          trailers: [],
          allAllowedDrivers: false,
          checked5days: false,
          vehicleDropped: false,
          trailerDropped: false,
          allowedTrailers: [],
          droppedTrailers: [],
          allAllowedTrailers: false,
          dropDate: currDate,
          vehiclePanel: res1,
          dropsPanel: res2,
          tripsPanel: res3,
          RouteCode: res4,
          loader: false,
        });
      })
      .then(() => {
        this.updateTopBar();
        this.refreshSite();
      })
      .catch((error) => {});
  };

  onVRhide = () => {
    this.setState({
      vehicleShow: "block",
      RouteoptiShow: "none",
      vrShow: "none",
    });
    // this.handleDateChange(this.state.date);
  };


  
    onVrRefresh = (vrnum) => {
      fetchVR(vrnum)
        .then(([res1, res2, res3]) => {
          this.setState({
            vrlist: res1,
            vrdetaillist: res2,
            loadvehstock: res3,
            loader: false,
          });
        })
        .then(() => { })
        .catch((error) => {
          // history.push('/');
        });
    };

  getDatabyStaggingLocations = (vrnum, from) => {
    this.setState({ loader: true });
    let fromloctyp = this.state.StaggingFromLoc;
    let toloctyp = this.state.StaggingFromLoc;
    if (this.state.StaggingToLoc.length > 0) {
      toloctyp = this.state.StaggingToLoc;
    }

    let floc = "";
    let tloc = "";
    if (this.state.StaggingFromLoc2.length > 0) {
      floc = this.state.StaggingFromLoc2;
      if (this.state.StaggingToLoc2.length > 0) {
        tloc = this.state.StaggingToLoc2;
      } else {
        tloc = this.state.StaggingFromLoc2;
      }
    } else {
      floc = "";
      tloc = "";
    }

    ToAllocationFetchData(vrnum, fromloctyp, toloctyp, floc, tloc).then(
      (res) => {
        console.log("after soap completes The result is Allocation data", res);
        var statuscode = res.children[1].children;
        var statusmessage = res.children[1].children[1];
        console.log("status code allocation =", statuscode);
        console.log("status code type allocation =", typeof statuscode);
        //  if(statuscode == 2) {
        console.log("status code if");
        this.notifySucess("Locations updated successfully");
        //      var tripsPanels = this.state.tripsPanel;
        // var selVR_num = tripsPanels[i].itemCode;
        //  fetchVR(selVR_num)
        this.setState({
          loader: false,
          toAllocationDataList: statuscode,

          vehicleShow: "none",
          schedulerShow: "none",
          RouteoptiShow: "none",
          vrShow: "none",
          toPickdetailsShow: "none",
          toAllocationdetailsShow: "block",
          vehicleChecked: "none",
        });
        /*
                                else {
                                   console.log("status code else")
                                  this.notifyError("Can't fetch To Pick Data", statusmessage);
                                    this.setState({ loader: false });
                                }
                                */

        if (from === "allocation") {
          this.onVrRefresh(vrnum);
        }
      }
    );
  };

  onVRClick = (i, tmsValidated) => {
    this.setState({ loader: true });
    // console.log("inside onVRclieck at index",i);
    // console.log("inside onVRclieck at index - tmsvalida",tmsValidated);
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var selVR_num = tripsPanels[i].itemCode;
    var ClickedVR = tripsPanels[i];

    var sel_Driver_name = tripsPanels[i].driverName;
    //caling API

    // let Ispktkct = false,
    //   IsOnlyReceipt = false;
    // {
    //   tripsPanels[i].dropObject.length > 0 &&
    //     console.log("Hide and seek - LVS Workflow 1");
    //   for (let ij = 0; ij < tripsPanels[i].dropObject.length; ij++) {
    //     console.log("Hide and seek - LVS Workflow 2", ij);
    //     let dropobj = tripsPanels[i].dropObject[ij];
    //     if (!Ispktkct) {
    //       if ((dropobj.doctype === 'PICK' || dropobj.doctype === 'DLV')) {
    //         Ispktkct = true;
    //       }
    //     }
    //   }
    // }

    // if (
    //   tripsPanels[i].pickupObject.length > 0 &&
    //   tripsPanels[i].dropObject.length === 0
    // ) {
    //   IsOnlyReceipt = true;
    // }

    let Ispktkct = false,
      IsOnlyReceipt = false,
      OnlyDeliveryflg = false;
    console.log("Hide and seek - LVS Workflow Ispktkct", Ispktkct);
    console.log("Hide and seek - LVS Workflow trip Object", tripsPanels[i]);
    {
      tripsPanels[i].dropObject.length > 0 &&
        console.log("Hide and seek - LVS Workflow 1", tripsPanels[i]);

      for (let ij = 0; ij < tripsPanels[i].dropObject.length; ij++) {
        console.log("Hide and seek - LVS Workflow 2", ij);
        let dropobj = tripsPanels[i].dropObject[ij];
        console.log("Hide and seek - LVS Workflow 3", dropobj);
        // pairedDoc
        // if (!Ispktkct) {
        //   if (dropobj.doctype === 'PICK' || dropobj.doctype === 'DLV') {
        //     Ispktkct = true;
        //   }
        // }
        if (!Ispktkct) {
          if (
            dropobj.doctype === "PICK" &&
            dropobj.pairedDoc.trim().length < 1
            // || (dropobj.doctype === 'DLV' && dropobj.pairedDoc.trim().length < 1)
          ) {
            Ispktkct = true;
          }
        }

        if (!OnlyDeliveryflg) {
          if (
            dropobj.doctype === "DLV" &&
            dropobj.pairedDoc.trim().length < 1
          ) {
            OnlyDeliveryflg = true;
          }
        }
      }
    }
    if (!Ispktkct && !OnlyDeliveryflg) {
      IsOnlyReceipt = true;
    }

    fetchVR(selVR_num)
      .then(([res1, res2, res3]) => {
        this.setState({
          vrlist: res1,
          vrdetaillist: res2,
          loadvehstock: res3,

          loader: false,
        });
      })
      .then(() => {})
      .catch((error) => {
        //  history.push('/');
      });
    // console.log("inside VR click",this.state.markers);
    if (this.state.markers && this.state.markers.length == 0) {
      // console.log("inside VR click inside if");
      this.state.sites.map((site) => {
        if (this.state.selectedSite === site.id) {
          let marker = [];
          marker.push(site);
          this.setState({ markers: marker });
        }
      });
    }
    this.setState({
      clickedTrips: ClickedVR,
      selectedVrIndex: i,
      selectedVrValidated: tmsValidated,
      onlyReceiptflg: IsOnlyReceipt,
      IsPickTicket: Ispktkct,
      IsOnlyDeliveryflg: OnlyDeliveryflg,
      vehicleShow: "none",
      RouteoptiShow: "none",
      schedulerShow: "none",
      vrShow: "block",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      vehicleChecked: "none",
    });
  };

  handleRouteCodeChange = (selectedRouteCodes) => {
    this.setCurrentRoutecode(selectedRouteCodes);
  };

  // onVRClick = (i, tmsValidated) => {
  //   // console.log("inside onVRclieck at index", i);
  //   // console.log("inside onVRclieck at index - tmsvalida", tmsValidated);
  //   var tripsPanels = this.state.tripsPanel;
  //   var selectedTrip = [];
  //   var selectedTrips = [];
  //   var trailers = [];
  //   var selVR_num = tripsPanels[i].itemCode;
  //   var ClickedVR = tripsPanels[i];

  //   var sel_Driver_name = tripsPanels[i].driverName;
  //   //caling API

  //   fetchVR(selVR_num)
  //     .then(([res1, res2, res3]) => {
  //       this.setState({
  //         vrlist: res1,
  //         vrdetaillist: res2,
  //         loadvehstock: res3,
  //       });
  //     })
  //     .then(() => { })
  //     .catch((error) => {
  //       //  history.push('/');
  //     });
  //   // console.log("inside VR click", this.state.markers);
  //   if (this.state.markers && this.state.markers.length == 0) {
  //     // console.log("inside VR click inside if");
  //     this.state.sites.map((site) => {
  //       if (this.state.selectedSite === site.id) {
  //         let marker = [];
  //         marker.push(site);
  //         this.setState({ markers: marker });
  //       }
  //     });
  //   }
  //   this.setState({
  //     clickedTrips: ClickedVR,
  //     selectedVrIndex: i,
  //     selectedVrValidated: tmsValidated,
  //     vehicleShow: "none",
  //     RouteoptiShow: "none",
  //     vrShow: "block",
  //   });
  // };

  /*
  updateTripsGeoLocations = (index , status) => {
   // var checkboxes = document.getElementsByName("tripsCheckBox");
    // console.log("inside updateTripgeo");
   var checkboxes = this.state.tripsPanel;
    const currMarkers = [];
    const currGeoData = [];
    if (typeof (this.state.selectedSite) === "string") {
      if (this.state.sites.length > 0) {
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers.push(site)
          }
        })
      }
    } else if (this.state.selectedSite.lat != undefined) {
      currMarkers.push(this.state.selectedSite);
    }

    if (status) {
       // console.log("inside updateTripgeo if",status);
      this.removeTrips();
//      checkboxes[index].checked = true;

      this.updateTripsPanel(currMarkers, currGeoData, index);
      this.setState({ selectedIndex: index, checkedTrip: true, RouteoptiShow:'block' })
    } else {
     // console.log("inside updateTripgeo else",status);
      this.removeTrips();
      let marker = [];
      marker.push(currMarkers[0])
      this.setState({
        markers: marker, mapChanged: true,
        geoData: currGeoData, tripsChecked: [], checkedTrip: false
      });
    }
  }
*/

  OnChangeFromStagginLocation2 = (newValue, site, index) => {
    this.setState({
      StaggingFromLoc2: newValue,
      StaggingFromLoc2Index: index,
      StaggingToLoc2: "",
      StaggingToLoc2Index: -1,
    });
  };

  OnChangeFromStagginLocation = (newValue, site, index) => {
    this.setState({ loader: true });
    // load locations based on Type selection
    let fromloc = newValue;
    let toloc = newValue;
    if (this.state.StaggingToLoc.length > 0) {
      toloc = this.state.StaggingToLoc;
    }

    ToLocationsFetchData(site, fromloc, toloc).then((res) => {
      console.log("after soap completes The result is location data", res);
      var statuscode = res.children[1].children;
      var statusmessage = res.children[1].children[1];
      console.log("status code allocation =", statuscode);
      console.log("status code type allocation =", typeof statuscode);
      //  if(statuscode == 2) {
      console.log("status code if");
      this.notifySucess("Locations updated successfully");
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)

      this.setState({
        StaggingFromLoc: newValue,
        StaggingFromLocIndex: index,
        StaggingToLoc: "",
        StaggingToLocIndex: -1,
        StaggingFromLoc2: "",
        StaggingFromLoc2Index: -1,
        StaggingToLoc2: "",
        StaggingToLoc2Index: -1,
        loader: false,
        toStaggingLocationList2: statuscode,
      });
    });
  };

  OnChangeToStagginLocation2 = (newValue, site, index) => {
    this.setState({
      StaggingToLoc2: newValue,
      StaggingToLoc2Index: index,
    });
  };

  OnChangeToStagginLocation = (newValue, site, index) => {
    let fromloc = this.state.StaggingFromLoc;
    let toloc = newValue;
    console.log("loc from", this.state.StaggingFromLoc);
    ToLocationsFetchData(site, fromloc, toloc).then((res) => {
      console.log("after soap completes The result is location data", res);
      var statuscode = res.children[1].children;
      var statusmessage = res.children[1].children[1];
      console.log("status code allocation =", statuscode);
      console.log("status code type allocation =", typeof statuscode);
      //  if(statuscode == 2) {
      console.log("status code if");
      this.notifySucess("Locations updated successfully");
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)

      this.setState({
        StaggingToLoc: newValue,
        StaggingToLocIndex: index,
        loader: false,
        toStaggingLocationList2: statuscode,
        StaggingFromLoc2: "",
        StaggingFromLoc2Index: -1,
        StaggingToLoc2: "",
        StaggingToLoc2Index: -1,
      });
    });
  };

  onHideToPickLVSShow = () => {
    this.setState({
      vehicleShow: "none",
      schedulerShow: "none",
      RouteoptiShow: "none",
      vrShow: "block",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      vehicleChecked: "none",
      toPickDataList: [],
      toAllocationDataList: [],
      toStaggingLocationList: [],
      toStaggingLocationList2: [],
      toLogDataList: [],
      StaggingFromLoc: "",
      StaggingFromLocIndex: -1,
      StaggingToLoc: "",
      StaggingToLocIndex: -1,
      StaggingFromLoc2: "",
      StaggingFromLoc2Index: -1,
      StaggingToLoc2: "",
      StaggingToLoc2Index: -1,
    });
  };

  getDatabyStaggingLocations = (vrnum, from) => {
    this.setState({ loader: true });
    let fromloctyp = this.state.StaggingFromLoc;
    let toloctyp = this.state.StaggingFromLoc;
    if (this.state.StaggingToLoc.length > 0) {
      toloctyp = this.state.StaggingToLoc;
    }

    let floc = "";
    let tloc = "";
    if (this.state.StaggingFromLoc2.length > 0) {
      floc = this.state.StaggingFromLoc2;
      if (this.state.StaggingToLoc2.length > 0) {
        tloc = this.state.StaggingToLoc2;
      } else {
        tloc = this.state.StaggingFromLoc2;
      }
    } else {
      floc = "";
      tloc = "";
    }

    ToAllocationFetchData(vrnum, fromloctyp, toloctyp, floc, tloc).then(
      (res) => {
        console.log("after soap completes The result is Allocation data", res);
        var statuscode = res.children[1].children;
        var statusmessage = res.children[1].children[1];
        console.log("status code allocation =", statuscode);
        console.log("status code type allocation =", typeof statuscode);
        //  if(statuscode == 2) {
        console.log("status code if");
        this.notifySucess("Locations updated successfully");
        //      var tripsPanels = this.state.tripsPanel;
        // var selVR_num = tripsPanels[i].itemCode;
        //  fetchVR(selVR_num)
        this.setState({
          loader: false,
          toAllocationDataList: statuscode,

          vehicleShow: "none",
          schedulerShow: "none",
          RouteoptiShow: "none",
          vrShow: "none",
          toPickdetailsShow: "none",
          toAllocationdetailsShow: "block",
          vehicleChecked: "none",
        });
        /*
                              else {
                                 console.log("status code else")
                                this.notifyError("Can't fetch To Pick Data", statusmessage);
                                  this.setState({ loader: false });
                              }
                              */

        if (from === "allocation") {
          this.onVrRefresh(vrnum);
        }
      }
    );
  };

  ToPickDatafromVR = (vrnum) => {
    this.setState({ loader: true });
    // console.log("s1 - inside validate");
    //   var tripsPanels = this.state.tripsPanel;
    //   var ClickedTrip = tripsPanels[i];
    //   let trips = ClickedTrip;
    ToPickData(vrnum).then((res) => {
      console.log("after soap completes The result is pick data", res);
      var statuscode = res.children[1].children;
      var statusmessage = res.children[1].children[1];
      console.log("status code =", statuscode);
      console.log("status code type =", typeof statuscode);
      //  if(statuscode == 2) {
      console.log("status code if");
      this.notifySucess("TO Pick data fetched Sucessfully");
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)
      this.setState({
        loader: false,
        toPickDataList: statuscode,

        vehicleShow: "none",
        schedulerShow: "none",
        RouteoptiShow: "none",
        vrShow: "none",
        toPickdetailsShow: "block",
        toAllocationdetailsShow: "none",
        vehicleChecked: "none",
      });
      /*
                              else {
                                 console.log("status code else")
                                this.notifyError("Can't fetch To Pick Data", statusmessage);
                                  this.setState({ loader: false });
                              }
                              */
    });
  };

  ToAllocationGetDatafromVR = (vrnum, site, from) => {
    this.setState({ loader: true });
    // console.log("s1 - inside validate");
    //   var tripsPanels = this.state.tripsPanel;
    //   var ClickedTrip = tripsPanels[i];
    //   let trips = ClickedTrip;

    ToStaggingLocationFetchData(site).then((res1) => {
      console.log(
        "after soap completes The result is Allocation data res1",
        res1
      );
      var statuscode1 = res1.children[2].children;
      var statusmessage1 = res1.children[1].children[1];
      console.log("status code allocation =", statuscode1);
      console.log("status code type allocation =", typeof statuscode1);
      //  if(statuscode == 2) {
      console.log("status code if");
      // this.notifySucess("TO Pick data fetched Sucessfully", statusmessage);
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)
      this.setState({
        //   loader : false,
        toStaggingLocationList: statuscode1,
      });
    });
    console.log("data from loc=", this.state.StaggingFromLoc);
    console.log("data to loc=", this.state.StaggingToLoc);

    let fromloc = this.state.StaggingFromLoc;
    let toloc = this.state.StaggingToLoc;
    ToAllocationFetchData(vrnum, fromloc, toloc).then((res) => {
      console.log("after soap completes The result is Allocation data", res);
      var statuscode = res.children[1].children;
      var statusmessage = res.children[1].children[1];
      console.log("status code allocation =", statuscode);
      console.log("status code type allocation =", typeof statuscode);
      //  if(statuscode == 2) {
      console.log("status code if");
      this.notifySucess("Allocation Data loaded successfully");
      //      var tripsPanels = this.state.tripsPanel;
      // var selVR_num = tripsPanels[i].itemCode;
      //  fetchVR(selVR_num)
      this.setState({
        loader: false,
        toAllocationDataList: statuscode,

        vehicleShow: "none",
        schedulerShow: "none",
        RouteoptiShow: "none",
        vrShow: "none",
        toPickdetailsShow: "none",
        toAllocationdetailsShow: "block",
        vehicleChecked: "none",
      });
      /*
                                else {
                                   console.log("status code else")
                                  this.notifyError("Can't fetch To Pick Data", statusmessage);
                                    this.setState({ loader: false });
                                }
                                */

      if (from === "allocation") {
        this.onVrRefresh(vrnum);
      }
    });
  };

  SubmitforAllocation = (site, vrcode) => {
    console.log("inside Allocation at index", this.state.StaggingFromLoc);
    console.log("inside Allocation at index", this.state.StaggingToLoc);
    console.log("inside Allocation at index");
    var currentAllocationData = this.state.toAllocationDataList;
    this.setState({
      loader: true,
    });
    // console.log("inside final lock tripp");
    //  var tripsPanel = this.state.tripsPanel;
    //  tripsPanel[index].lock = true;

    var arrayoftemppt = [];
    for (let i2 = 0; i2 < currentAllocationData.length; i2++) {
      var pickticket = currentAllocationData[i2];
      console.log("allocation pick details = ", pickticket);
      //      if(pickticket.children[9].value === 'Global') {

      console.log("allocation pick details matched global = ", pickticket);
      var temppicktkct = {};
      temppicktkct.prhnum = pickticket.children[0].value;
      temppicktkct.lineno = pickticket.children[1].value;
      temppicktkct.site = site;
      temppicktkct.count = pickticket.children[12].value;
      temppicktkct.lot = "";
      temppicktkct.prod = pickticket.children[3].value;
      temppicktkct.qty = pickticket.children[5].value;
      temppicktkct.stocount = pickticket.children[12].value;
      temppicktkct.vrnum = vrcode;
      //  temppicktkct.qty = pickticket.children[7].value;
      //   temppicktkct.lot = pickticket.children[3].value
      console.log("allocation temp pick details = ", temppicktkct);
      arrayoftemppt.push(temppicktkct);
      //     }
    }
    console.log("allocation pick details total= ", arrayoftemppt);

    //if(arrayoftemppt.length > 0) {
    fetch(`${apiUrl}/api/v1/transport/allocation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arrayoftemppt),
    }).then((response) => {
      console.log("after allocation submit", response);
      if (response.status === 200) {
        ToAllocationSubmitData(vrcode).then((res) => {
          console.log(
            "after soap completes The result is Allocation data",
            res
          );
          //  if(statuscode == 2) {
          console.log("status code if");
          this.notifySucess("Allocation Sucessfully Completed");
          if (this.state.StaggingFromLoc2.length > 0) {
            console.log("allocation if data");
            this.getDatabyStaggingLocations(vrcode, "allocation");
            //  this.onVrRefresh(vrcode);
          } else {
            console.log("allocation else data");
            this.ToAllocationGetDatafromVR(vrcode, site, "allocation");
            // this.onVrRefresh(vrcode);
          }
          //      var tripsPanels = this.state.tripsPanel;
          // var selVR_num = tripsPanels[i].itemCode;
          //  fetchVR(selVR_num)

          //    this.ToAllocationGetDatafromVR(vrcode,site);
        });
      } else {
        this.notifyError("Allocation Failed");
      }
    });

    /*
    
      console.log("inside Allocation at index", this.state.StaggingFromLoc);
        console.log("inside Allocation at index", this.state.StaggingToLoc);
     console.log("inside Allocation at index 2", this.state.StaggingFromLoc2);
        console.log("inside Allocation at index 2", this.state.StaggingToLoc2);
      if(this.state.StaggingFromLoc2.length > 0) {
          this.getDatabyStaggingLocations(vrcode, 'allocation');
         // this.onVrRefresh(vrcode)
        }
      else {
           this.ToAllocationGetDatafromVR(vrcode,site, 'allocation');
         //  this.onVrRefresh(vrcode)
       }
    
    */
  };

  updateSelectedTrip = (count) => {
    var selectedTrips = this.state.slectedTrips;
    this.setState({
      selectedTripData: selectedTrips[count],
      left: (count + 1) * 55,
    });
  };

  updateTripsPanel = (currMarkers, currGeoData, i) => {
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var equipments = [];
    var quantities = [];
    var gTrip = this.state.guageTrip;
    gTrip = tripsPanels[i];
    var slectTrip = tripsPanels[i].totalObject;
    tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
    selectedTrips = slectTrip.selectedTripData;
    trailers = slectTrip.trailers;
    equipments = slectTrip.equipments;
    quantities = slectTrip.quantities;
    selectedTrip.push(tripsPanels[i]);
    /*
    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
      currMarkers.push(tripsPanels[i].dropObject[j]);
    }
    for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
      tripsPanels[i].pickupObject[k].type = "pickup";
      tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock;
      currMarkers.push(tripsPanels[i].pickupObject[k]);
    }
    */

    let selectedDataforaTrip = tripsPanels[i].totalObject.selectedTripData;
    let VehicleColor = tripsPanels[i].vehicleObject.color;
    for (let tpl = 0; tpl < selectedDataforaTrip.length; tpl++) {
      let tempselectedDate = selectedDataforaTrip[tpl];
      if (tempselectedDate.doctype === "PICK") {
        // tempselectedDate.itemCode = tripsPanels[i].itemCode;
        // currDropsList[di].panelType = 'drop';
        tempselectedDate.panelType = "drop";
        tempselectedDate.lock = tripsPanels[i].lock;
        tempselectedDate.VehicleColor = VehicleColor;
        tempselectedDate.itemCode = tripsPanels[i].itemCode;
        tempselectedDate.seq = tpl + 1;
        currMarkers.push(tempselectedDate);
        //  currGeoData.push(tempselectedDate);
      } else {
        tempselectedDate.panelType = "pickup";
        tempselectedDate.seq = tpl + 1;
        tempselectedDate.lock = tripsPanels[i].lock;
        tempselectedDate.itemCode = tripsPanels[i].itemCode;
        tempselectedDate.VehicleColor = VehicleColor;
        currMarkers.push(tempselectedDate);
        //     currGeoData.push(tempselectedDate);
      }
    }

    // assign to plan document to the list
    let currDropsList = this.state.dropsPanel.drops;
    let currPickupsList = this.state.dropsPanel.pickUps;

    // console.log("T222 add STatemarker Drops =", currDropsList);
    // console.log("T222 add STatemarker Pikcups =", currPickupsList);

    for (let di = 0; di < currDropsList.length; di++) {
      if (
        currDropsList[di].dlvystatus === "0" ||
        currDropsList[di].dlvystatus === "8"
      ) {
        currDropsList[di].panelType = "drop";
        currMarkers.push(currDropsList[di]);
      }
    }

    for (let pi = 0; pi < currPickupsList.length; pi++) {
      if (
        currPickupsList[pi].dlvystatus === "0" ||
        currPickupsList[pi].dlvystatus === "8"
      ) {
        currPickupsList[pi].panelType = "pickup";
        currMarkers.push(currPickupsList[pi]);
      }
    }

    this.updateSelectedTrip(selectedTrips.length);
    var tripColor = [
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
    ];
    var count = selectedTrips.length;
    var tempSelectedDocs = [];
    for (var i = 0; i < selectedTrips.length; i++) {
      if (Object.keys(selectedTrips[i]).length != 0) {
        if (selectedTrips[i].panelType === "drop") {
          tripColor[i] = "#7ace4c";
        } else if (selectedTrips[i].panelType === "pickup") {
          tripColor[i] = "#09aaed";
        } else {
          tripColor[i] = "#ed3309";
        }

        currGeoData.push(selectedTrips[i]);
      }
    }
    this.setState({
      trips: selectedTrip,
      guageTrip: gTrip,
      tripColor: tripColor,
      selectedDocuments: tempSelectedDocs,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[count - 1],
      left: count * 55,
      trailers: trailers,
      equipments: equipments,
      quantities: quantities,
      geoData: currGeoData,
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: selectedTrip,
    });
  };

  removeTrips = () => {
    // this.clearAllCheckBoxes();
    this.setState({
      trips: [],
      guageTrip: {},
      selectedTrips: 0,
      trailers: [],
      equipments: [],
      quantities: [],
      left: 0,
      selectedTripData: {},
      tripColor: [
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
      ],
      slectedTrips: [],
    });
  };

  handleDragStart = (event, valueObj, type, index, id) => {
    // console.log("3 inside handldragStart at index - event", event);
    // console.log("3 inside handldragStart at index - valueobj", valueObj);
    // console.log("3 inside handldragStart at index - type", type);
    // console.log("3 inside handldragStart at index - index", index);
    if (type === "vehicle") {
      // console.log("selected Date =", this.state.date);
      const currDate = moment.tz(this.state.date, "").format("YYYY-MM-DD");
      const url =
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/prevtrpsite?veh=` +
        valueObj.codeyve +
        "&date=" +
        currDate;
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          let endSite = "";
          if (res.arrSite && res.arrSite.length > 0) {
            endSite = res.arrSite;
            this.setState({ updatedArrSite: endSite });
          } else {
            endSite = valueObj.startdepotn;
            this.setState({ updatedArrSite: "" });
          }
          let latestMarkers = this.state.markers;
          let currMarkers = [];
          if (latestMarkers && latestMarkers.length > 0) {
            latestMarkers.map((marker) => {
              if (marker.panelType) {
                currMarkers.push(marker);
              }
            });
          }
          let arrivalSite = {};
          if (this.state.sites && this.state.sites.length > 0) {
            this.state.sites.map((site) => {
              if (site.id === endSite) {
                currMarkers.unshift(site);
              }
              if (site.id === valueObj.enddepotname) {
                arrivalSite.city = site.value;
                arrivalSite.docnum = site.value;
                arrivalSite.idd = site.id;
                arrivalSite.lat = site.lat;
                arrivalSite.lng = site.lng;
                arrivalSite.value = site.value;
                arrivalSite.arrivalCheck = "arrival";
              }
            });
          }
          if (
            !(
              currMarkers[0].lat === arrivalSite.lat &&
              currMarkers[0].lng === arrivalSite.lng
            )
          ) {
            currMarkers.push(arrivalSite);
          }
          this.setState({
            markers: currMarkers,
            mapChanged: true,
            tripsChecked: [],
          });
        });
    }

    /*
    // console.log("3 inside handleDragStart",event)
 let draggedData = {};
    draggedData.currentCard = JSON.stringify(valueObj);
    draggedData.type = type;
    draggedData.id = type + index;
    draggedData.index = index;

   this.setState({
        dataTransfer : draggedData,
        isDragged : true
   });
*/
    event.dataTransfer.setData("currentCard", JSON.stringify(valueObj));
    event.dataTransfer.setData("type", type);
    event.dataTransfer.setData("row-id", id);
    event.dataTransfer.setData("index", index);

    // console.log("3 inside handledrag - dataTranser after", event);
    // console.log("3 inside handledrag - is dragged after", event.dataTransfer);
  };

  enableDivs = (trails, type) => {
    let vPanel = this.state.vehiclePanel;
    vPanel.trails.map((vTrial) => {
      trails.map((trail) => {
        if (trail.trailer === vTrial.trailer) {
          vTrial.type = "open";
        }
      });
    });
    this.setState({ vehiclePanel: vPanel });
  };

  updateClearTripsFlag = () => {
    this.setState({
      clearTrips: false,
    });
  };

  handleArrSite = (siteLabel, type) => {
    let currMarkers = this.state.markers;
    let arrivalSite = {};
    let depSite = {};
    if (currMarkers && currMarkers.length > 0) {
      currMarkers.map((marker) => {
        this.state.sites &&
          this.state.sites.map((site) => {
            if (type === "end" && site.id === siteLabel) {
              if (marker.arrivalCheck === "arrival") {
                let removeObjIndex = currMarkers.findIndex(
                  (data) => data.arrivalCheck === "arrival"
                );
                currMarkers.splice(removeObjIndex, 1);
                arrivalSite.city = site.value;
                arrivalSite.docnum = site.value;
                arrivalSite.idd = site.id;
                arrivalSite.lat = site.lat;
                arrivalSite.lng = site.lng;
                arrivalSite.value = site.value;
                arrivalSite.arrivalCheck = "arrival";
              } else {
                arrivalSite.city = site.value;
                arrivalSite.docnum = site.value;
                arrivalSite.idd = site.id;
                arrivalSite.lat = site.lat;
                arrivalSite.lng = site.lng;
                arrivalSite.value = site.value;
                arrivalSite.arrivalCheck = "arrival";
              }
            }

            if (type === "start" && site.id === siteLabel) {
              depSite.city = site.value;
              depSite.docnum = site.value;
              depSite.id = site.id;
              depSite.lat = site.lat;
              depSite.lng = site.lng;
              depSite.value = site.value;
            }
          });
      });
      if (
        type === "end" &&
        !(
          currMarkers[0].lat === arrivalSite.lat &&
          currMarkers[0].lng === arrivalSite.lng
        )
      ) {
        if (Object.keys(arrivalSite).length > 0) {
          currMarkers.push(arrivalSite);
        }
      }
      if (
        type === "start" &&
        !(
          currMarkers[0].lat === depSite.lat &&
          currMarkers[0].lng === depSite.lng
        )
      ) {
        if (Object.keys(depSite).length > 0) {
          currMarkers = [];
          currMarkers.push(depSite);
        }
      }
    }
    this.setState({
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: [],
    });
  };

  updateResetTrip = (trip) => {
    this.setState({
      trips: trip,
      equipments: [],
    });
    this.removeMarkers();
  };

  dropResetObj = (trip) => {
    if (
      this.state.dropsPanel &&
      this.state.dropsPanel &&
      this.state.dropsPanel.drops.length > 0
    ) {
      let dropsPanel = this.state.dropsPanel;
      var drops = dropsPanel.drops;
      var pickUps = dropsPanel.pickUps;
      drops.map((drop) => {
        if (trip.dropObj && trip.dropObj.length > 0) {
          trip.dropObj.map((dropOb) => {
            if (drop.docnum === dropOb.docnum) {
              drop.type = "open";
            }
          });
        }
      });
      pickUps.map((pickUp) => {
        if (trip.pickupObject && trip.pickupObject.length > 0) {
          trip.pickupObject.map((pickOb) => {
            if (pickUp.docnum === pickOb.docnum) {
              pickUp.type = "open";
            }
          });
        }
      });

      dropsPanel.drops = drops;
      dropsPanel.pickUps = pickUps;
      this.setState({ dropsPanel: dropsPanel });
    }
  };

  updateTrip = (trip) => {
    var SelectedDocs = [];
    // console.log("T00 inside updateTrip ", trip);
    // console.log("T00 inside updateTrip dropObjects ", trip[0].dropObject);
    for (var j = 0; j < trip[0].dropObject.length; j++) {
      // console.log("T00 inside drop j =", j);
      SelectedDocs.push(trip[0].dropObject[j].docnum);
    }
    for (var k = 0; k < trip[0].pickupObject.length; k++) {
      SelectedDocs.push(trip[0].pickupObject[k].docnum);
    }

    this.setState({
      trips: trip,
      selectedDocuments: SelectedDocs,
    });
    // this.removeMarkers();
  };

  updateTrialers = (trailer) => {
    this.setState({
      trailers: trailer,
    });
  };

  updateQuantities = (quantity) => {
    this.setState({
      quantities: quantity,
    });
  };

  updateEqupments = (equipment) => {
    this.setState({
      equipments: equipment,
    });
  };

  updateTripCount = () => {
    var tripCount = this.state.selectedTrips;
    tripCount += 12;
    this.setState({
      selectedTrips: tripCount,
    });
  };

  removeTrips = () => {
    this.clearAllCheckBoxes();
    this.setState({
      trips: [],
      guageTrip: {},
      selectedTrips: 0,
      trailers: [],
      equipments: [],
      quantities: [],
      left: 0,
      selectedTripData: {},
      tripColor: [
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
      ],
      slectedTrips: [],
    });
  };

  clearTrailers = () => {
    this.setState({
      trailers: [],
    });
  };

  clearEquipments = () => {
    this.setState({
      equipments: [],
      quantities: [],
    });
  };

  disableDroppedDiv = (divTag) => {
    // console.log("T31 inside disable Drooped Div", divTag);
    var temp = "[row-id=" + divTag + "]";
    //  var htmlDiv = document.getElementById(divTag);
    // console.log("T31 inside disable Drooped Div temp", temp);
    var htmlDiv = document.querySelectorAll(temp);
    var { droppedDivs } = this.state;
    // console.log("T31 inside disable Drooped Div htmldiv", htmlDiv);
    droppedDivs.push(temp);
    this.setState({ droppedDivs });
  };

  enableDroppedDiv = () => {
    var currVehPanel = this.state.vehiclePanel;
    var currDropsPanel = this.state.dropsPanel;
    var vehicles = currVehPanel.vehicles;
    var equipments = currVehPanel.equipments;
    var drivers = currVehPanel.drivers;
    var trails = currVehPanel.trails;
    var drops = currDropsPanel.drops;
    var pickUps = currDropsPanel.pickUps;

    for (var i = 0; i < vehicles.length; i++) {
      if (vehicles[i].isDropped) {
        vehicles[i].type = "open";
      }
    }
    for (var i = 0; i < equipments.length; i++) {
      if (equipments[i].isDropped) {
        equipments[i].type = "open";
      }
    }
    for (var i = 0; i < drivers.length; i++) {
      if (drivers[i].isDropped) {
        drivers[i].type = "open";
      }
    }
    for (var i = 0; i < trails.length; i++) {
      if (trails[i].isDropped) {
        trails[i].type = "open";
      }
    }
    currVehPanel.vehicles = vehicles;
    currVehPanel.equipments = equipments;
    currVehPanel.drivers = drivers;
    currVehPanel.trails = trails;

    for (var i = 0; i < drops.length; i++) {
      if (drops[i].isDropped && drops[i].type != "Allocated") {
        drops[i].type = "open";
      }
    }
    for (var i = 0; i < pickUps.length; i++) {
      if (pickUps[i].isDropped && pickUps[i].type != "Allocated") {
        pickUps[i].type = "open";
      }
    }

    currDropsPanel.drops = drops;
    currDropsPanel.pickUps = pickUps;

    this.setState({
      vehiclePanel: currVehPanel,
      dropsPanel: currDropsPanel,
    });
  };

  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  updateTripValue = (count, tripData) => {
    var currLeft = this.state.left;
    var tripColor = this.state.tripColor;
    if (tripData.panelType === "drop") {
      tripColor[count] = "#7ace4c";
    } else if (tripData.panelType === "pickup") {
      tripColor[count] = "#09aaed";
    } else {
      tripColor[count] = "#ed3309";
    }

    var currSlectedTrips = this.state.slectedTrips;
    currSlectedTrips.push(tripData);
    setTimeout(() => {
      this.setState({
        left: currLeft + 55,
        tripColor: tripColor,
        selectedTripData: tripData,
        slectedTrips: currSlectedTrips,
      });
    }, 10);
  };

  updateSelectedTrip = (count) => {
    var selectedTrips = this.state.slectedTrips;
    this.setState({
      selectedTripData: selectedTrips[count],
      left: (count + 1) * 55,
    });
  };

  onValidateAll = () => {
    this.setState({ loader: true });
    var tripsPanel = this.state.tripsPanel;
    var ValidateTrips = [];
    var Validatecount = 0;
    for (let i = 0; i < tripsPanel.length; i++) {
      var trip = tripsPanel[i];
      if (
        trip.lock &&
        !trip.tmsValidated &&
        trip.pendingDocStatus === "Deliverable"
      ) {
        Validatecount = Validatecount + 1;
        // console.log("OSRM docdate =", trip.docdate);
        ValidateTrips.push(trip);
      }
    }
    if (Validatecount > 0) {
      fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/groupvalidate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ValidateTrips),
        }
      )
        .then((response) => {
          this.handleErrors(response);
        })
        .then(function (response) {})
        .then(() => {
          this.handleDateChange(this.state.date);
        })
        .then(() => {
          this.setState({ loader: false });
          this.notifySucess("Trips Validated Sucessfully");
        })
        .catch((error) => {
          this.handleDateChange(this.state.date);
          this.setState({ loader: false });
          this.notifyError("Can't validate the Trips");
        });
    } else {
      this.setState({
        loader: false,
        errorMessage:
          "Some trips were not validated due to documents not being in Deliverable status. Please make sure all the Documents are in Deliverable status and try again.",
        addAlertShow: true,
      });
    }
  };

  validate = (i) => {
    this.setState({ loader: true });
    // console.log("s1 - inside validate");
    var tripsPanels = this.state.tripsPanel;
    var ClickedTrip = tripsPanels[i];
    let trips = ClickedTrip;
    fetch(`${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        this.handleErrors(response);
      })
      .then(function (response) {})
      .then(() => {
        this.handleDateChange(this.state.date);
      })
      .then(() => {
        this.updateMaprelatedstuff(i);
      })
      .then(() => {
        this.setState({ laoder: false });
        this.notifySucess("Trip Validated Sucessfully");
        // call vrClick functionality
      })
      .catch((error) => {
        this.handleDateChange(this.state.date);
        this.setState({ loader: false });
        this.notifyError("Can't validate the Trip");
      });
  };

   confirmLVSbyCode = (lvscode, i, pageType) => {
      this.setState({ loader: true });
      // console.log("s1 - inside validate");
      var tripsPanels = this.state.tripsPanel;
      var ClickedTrip = tripsPanels[i];
      let trips = ClickedTrip;
      ConfirmLVS(lvscode).then((res) => {
        console.log("after soap completes The result is", res);
        var statuscode = res.children[1].children[0].value;
        var statusmessage = res.children[1].children[1].value;
        console.log("status code =", statuscode);
        console.log("status code type =", typeof statuscode);
        if (statuscode == 2) {
          console.log("status code if");
          this.notifySucess("LVS Confirmed Sucessfully", statusmessage);
          var tripsPanels = this.state.tripsPanel;
          var selVR_num = tripsPanels[i].itemCode;
          fetchVR(selVR_num).then(([res1, res2, res3]) => {
            this.setState({
              vrlist: res1,
              vrdetaillist: res2,
              loadvehstock: res3,
              loader: false,
            });
            if (res3.xstoflg === 4) { this.notifySucess("Stock loaded into the truck/trailer successfully") }
            else {
              this.notifyError("Stock didn't loaded into the truck/trailer, Please verify");
            }
          });
        } else {
          console.log("status code else");
          this.notifyError("Can't Confirm the LVS", statusmessage);
          this.setState({ loader: false });
        }
      });
    };


  validateonly = (i, pageType) => {

    console.log(i,pageType ,"this is validate only 7465")
    this.setState({ loader: true });
    // console.log("s1 - inside validate");
    var tripsPanels = this.state.tripsPanel;
    var ClickedTrip = tripsPanels[i];
    let trips = ClickedTrip;
    fetch(`${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        this.handleErrors(response);
      })
      .then(() => {
        this.setState({ loader: false });
        this.notifySucess("Trip Validated Sucessfully");
        // call vrClick functionality
        if (pageType === "vrHeader") {
          var tripsPanels = this.state.tripsPanel;
          var selVR_num = tripsPanels[i].itemCode;
          fetchLVS(selVR_num)
            .then(([res1]) => {
              this.setState({
                loadvehstock: res1,
              });
            })
            .then(() => {
              this.setState({ selectedVrValidated: true });
            })
            .catch((error) => {
              // history.push('/');
            });
        }
      })
      .catch((error) => {
        this.handleDateChange(this.state.date);
        this.setState({ loader: false });
        this.notifyError("Can't validate the Trip");
      });
  };

  updateMaprelatedstuff(index) {
    const currMarkers = [];
    const currGeoData = [];
    if (typeof this.state.selectedSite === "string") {
      if (this.state.sites.length > 0) {
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers.push(site);
          }
        });
      }
    } else if (this.state.selectedSite.lat != undefined) {
      currMarkers.push(this.state.selectedSite);
    }
    this.removeTrips();
    this.updateTripsPanel(currMarkers, currGeoData, index);
  }

  updateTripsGeolocationbeforelock = (index) => {
    const currMarkers_bl = [];
    const currGeoData_bl = [];
    if (typeof this.state.selectedSite === "string") {
      if (this.state.sites.length > 0) {
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers_bl.push(site);
          }
        });
      }
    } else if (this.state.selectedSite.lat != undefined) {
      currMarkers_bl.push(this.state.selectedSite);
    }
    this.updateTripsPanel_beforeLocking(currMarkers_bl, index);
  };

  updateTripsGeoLocations = (index) => {
    var checkboxes = document.getElementsByName("tripsCheckBox");
    const currMarkers = [];
    const currGeoData = [];
    if (typeof this.state.selectedSite === "string") {
      if (this.state.sites.length > 0) {
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers.push(site);
          }
        });
      }
    } else if (this.state.selectedSite.lat != undefined) {
      currMarkers.push(this.state.selectedSite);
    }

    //to assign to plan documents to the maps

    if (checkboxes[index].checked) {
      this.removeTrips();
      checkboxes[index].checked = true;

      this.updateTripsPanel(currMarkers, currGeoData, index);
      this.setState({ selectedIndex: index, checkedTrip: true });
    } else {
      this.removeTrips();
      let marker = [];
      marker.push(currMarkers[0]);
      this.setState({
        markers: marker,
        mapChanged: true,
        geoData: currGeoData,
        tripsChecked: [],
        checkedTrip: false,
      });
    }
  };

  ResetUpdateTrip() {
    const currMarkers = [];
    const currGeoData = [];
    this.setState({
      markers: currMarkers,
      geoData: currGeoData,
      trailers: [],
      equipments: [],
      quantities: [],
      left: 0,
      selectedTripData: {},
      tripColor: [
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
        "#e0e0e0",
      ],
      slectedTrips: [],
    });
  }

  updateTripsPanel_beforeLocking(currMarkers_bl, i) {
    var tripsPanels = this.state.tripsPanel;
    var tripsList_bl = tripsPanels[i];
    var slectTrip_bl = tripsPanels[i].totalObject;
    var selectedTrip_bl = slectTrip_bl.selectedTripData;
    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
      currMarkers_bl.push(tripsPanels[i].dropObject[j]);
    }
    for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
      tripsPanels[i].pickupObject[k].type = "pickup";
      tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock;
      currMarkers_bl.push(tripsPanels[i].pickupObject[k]);
    }
    this.setState({
      clickedTrips: tripsList_bl,
      bl_tripsList: tripsList_bl,
      bl_selectedTripData: selectedTrip_bl,
      bl_markers: currMarkers_bl,
      triplock: false,
      vehicleShow: "none",
      RouteoptiShow: "none",
      vrShow: "block",
    });
  }

  updateTripsPanel = (currMarkers, currGeoData, i) => {
    var tripsPanels = this.state.tripsPanel;
    var selectedTrip = [];
    var selectedTrips = [];
    var trailers = [];
    var equipments = [];
    var quantities = [];
    var gTrip = this.state.guageTrip;
    gTrip = tripsPanels[i];
    var slectTrip = tripsPanels[i].totalObject;
    tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
    selectedTrips = slectTrip.selectedTripData;
    trailers = slectTrip.trailers;
    equipments = slectTrip.equipments;
    quantities = slectTrip.quantities;
    selectedTrip.push(tripsPanels[i]);

    /*
    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
      currMarkers.push(tripsPanels[i].dropObject[j]);
    }
    for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
      tripsPanels[i].pickupObject[k].type = "pickup";
      tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode;
      tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock;
      currMarkers.push(tripsPanels[i].pickupObject[k]);
    }
*/

    let selectedDataforaTrip = tripsPanels[i].totalObject.selectedTripData;
    let VehicleColor = tripsPanels[i].vehicleObject.color;
    for (let tpl = 0; tpl < selectedDataforaTrip.length; tpl++) {
      let tempselectedDate = selectedDataforaTrip[tpl];
      if (tempselectedDate.doctype === "PICK") {
        // tempselectedDate.itemCode = tripsPanels[i].itemCode;
        // currDropsList[di].panelType = 'drop';
        tempselectedDate.panelType = "drop";
        tempselectedDate.lock = tripsPanels[i].lock;
        tempselectedDate.VehicleColor = VehicleColor;
        tempselectedDate.itemCode = tripsPanels[i].itemCode;
        tempselectedDate.seq = tpl + 1;
        currMarkers.push(tempselectedDate);
        //  currGeoData.push(tempselectedDate);
      } else {
        tempselectedDate.panelType = "pickup";
        tempselectedDate.seq = tpl + 1;
        tempselectedDate.lock = tripsPanels[i].lock;
        tempselectedDate.itemCode = tripsPanels[i].itemCode;
        tempselectedDate.VehicleColor = VehicleColor;
        currMarkers.push(tempselectedDate);
        //     currGeoData.push(tempselectedDate);
      }
    }

    // add To Plan document to the trip as well
    let currDropsList = this.state.dropsPanel.drops;
    let currPickupsList = this.state.dropsPanel.pickUps;

    // console.log("T222 add STatemarker Drops =", currDropsList);
    // console.log("T222 add STatemarker Pikcups =", currPickupsList);

    for (let di = 0; di < currDropsList.length; di++) {
      if (
        currDropsList[di].dlvystatus === "0" ||
        currDropsList[di].dlvystatus === "8"
      ) {
        currDropsList[di].panelType = "drop";
        currMarkers.push(currDropsList[di]);
      }
    }

    for (let pi = 0; pi < currPickupsList.length; pi++) {
      if (
        currPickupsList[pi].dlvystatus === "0" ||
        currPickupsList[pi].dlvystatus === "8"
      ) {
        currPickupsList[pi].panelType = "pickup";
        currMarkers.push(currPickupsList[pi]);
      }
    }

    this.updateSelectedTrip(selectedTrips.length);
    var tripColor = [
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
    ];
    var count = selectedTrips.length;
    var selectedDocs = [];
    for (var i = 0; i < selectedTrips.length; i++) {
      if (Object.keys(selectedTrips[i]).length != 0) {
        if (selectedTrips[i].panelType === "drop") {
          selectedDocs.push(selectedTrips[i].docnum);
          tripColor[i] = "#7ace4c";
        } else if (selectedTrips[i].panelType === "pickup") {
          selectedDocs.push(selectedTrips[i].docnum);
          tripColor[i] = "#09aaed";
        } else {
          tripColor[i] = "#ed3309";
        }
        currGeoData.push(selectedTrips[i]);
      }
    }
    this.setState({
      trips: selectedTrip,
      guageTrip: gTrip,
      tripColor: tripColor,
      selectedDocuments: selectedDocs,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[count - 1],
      left: count * 55,
      trailers: trailers,
      equipments: equipments,
      quantities: quantities,
      geoData: currGeoData,
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: selectedTrip,
    });
  };

  onSaveNotes = (note) => {
    this.setState({
      notes: note,
    });
  };

  clearAllCheckBoxes = () => {
    var checkboxes = document.getElementsByName("tripsCheckBox");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  };

  selectAllTripsPanel = () => {
    this.removeTrips();
    var checkB = document.getElementById("tripsCheckBoxAll");
    const currMarkers = [];
    const currGeoData = [];
    if (this.state.selectedSite.lat != undefined) {
      currMarkers.push(this.state.selectedSite);
    }
    if (checkB.checked) {
      var checkboxes = document.getElementsByName("tripsCheckBox");
      var tripsPanels = this.state.tripsPanel;
      for (var i = 0; i < checkboxes.length; i++) {
        var checkBox = checkboxes[i];
        checkBox.checked = true;
        if (
          null !== tripsPanels[i].dropObject &&
          null !== tripsPanels[i].pickupObject
        ) {
          /*
          for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
            tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
            tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
            currMarkers.push(tripsPanels[i].dropObject[j]);
            currGeoData.push(tripsPanels[i].dropObject[j]);
          }
          for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
            tripsPanels[i].pickupObject[k].type = "pickup";
            tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode;
            tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock;
            currMarkers.push(tripsPanels[i].pickupObject[k]);
            currGeoData.push(tripsPanels[i].pickupObject[k]);
          }
          */
          let selectedDataforaTrip =
            tripsPanels[i].totalObject.selectedTripData;
          let VehicleColor = tripsPanels[i].vehicleObject.color;
          for (let tpl = 0; tpl < selectedDataforaTrip.length; tpl++) {
            let tempselectedDate = selectedDataforaTrip[tpl];
            if (tempselectedDate.doctype === "PICK") {
              // tempselectedDate.itemCode = tripsPanels[i].itemCode;
              // currDropsList[di].panelType = 'drop';
              tempselectedDate.panelType = "drop";
              tempselectedDate.VehicleColor = VehicleColor;
              tempselectedDate.itemCode = tripsPanels[i].itemCode;
              tempselectedDate.seq = tpl + 1;
              currMarkers.push(tempselectedDate);
              currGeoData.push(tempselectedDate);
            } else {
              tempselectedDate.panelType = "pickup";
              tempselectedDate.seq = tpl + 1;
              tempselectedDate.itemCode = tripsPanels[i].itemCode;
              tempselectedDate.VehicleColor = VehicleColor;
              currMarkers.push(tempselectedDate);
              currGeoData.push(tempselectedDate);
            }
          }
        }
      }
      this.setState({
        selectedTripData: tripsPanels,
        tripsChecked: tripsPanels,
        IsAllTripsSelected: true,
      });

      // to the update to plan markers to it
      // assign to plan document to the list
      let currDropsList = this.state.dropsPanel.drops;
      let currPickupsList = this.state.dropsPanel.pickUps;

      // console.log("T222 add STatemarker Drops =", currDropsList);
      // console.log("T222 add STatemarker Pikcups =", currPickupsList);

      for (let di = 0; di < currDropsList.length; di++) {
        if (
          currDropsList[di].dlvystatus === "0" ||
          currDropsList[di].dlvystatus === "8"
        ) {
          currDropsList[di].panelType = "drop";
          currMarkers.push(currDropsList[di]);
        }
      }

      for (let pi = 0; pi < currPickupsList.length; pi++) {
        if (
          currPickupsList[pi].dlvystatus === "0" ||
          currPickupsList[pi].dlvystatus === "8"
        ) {
          currPickupsList[pi].panelType = "pickup";
          currMarkers.push(currPickupsList[pi]);
        }
      }
    } else {
      var checkboxes = document.getElementsByName("tripsCheckBox");
      for (var i = 0; i < checkboxes.length; i++) {
        var checkBox = checkboxes[i];
        checkBox.checked = false;
      }
      this.setState({
        IsAllTripsSelected: false,
      });
    }

    this.setState({
      markers: currMarkers,
      geoData: currGeoData,
      mapChanged: true,
    });
  };

  updateSelectedDocList = (docnum) => {
    // console.log("T00 insdie updatedseletedDocList =", docnum);
    var currentSelectedDocs = this.state.selectedDocuments;
    currentSelectedDocs.push(docnum);
    this.setState = {
      selectedDocuments: currentSelectedDocs,
    };
  };

  updateTimeLine = () => {
    var elements = document.getElementsByName("docNum");
    var docElements = [];
    var currTripsLine = this.state.slectedTrips;
    var tripColor = [
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
    ];
    for (var k = 0; k < currTripsLine.length; k++) {
      if (currTripsLine[k].docnum == undefined) {
        docElements.push(currTripsLine[k]);
      }
    }
    for (var i = 0; i < elements.length; i++) {
      for (var j = 0; j < currTripsLine.length; j++) {
        if (elements[i].innerText === currTripsLine[j].docnum) {
          docElements.push(currTripsLine[j]);
          if (currTripsLine[j].panelType === "drop") {
            tripColor[docElements.length - 1] = "#7ace4c";
          } else if (currTripsLine[j].panelType === "pickup") {
            tripColor[docElements.length - 1] = "#09aaed";
          } else {
            tripColor[docElements.length - 1] = "#ed3309";
          }
        }
      }
    }
    this.setState({
      reorder: true,
      tripColor: tripColor,
      slectedTrips: docElements,
      selectedTripData: docElements[docElements.length - 1],
      left: docElements.length * 55,
    });
  };

  // onVRClick = (i, tmsValidated) => {
  //   var tripsPanels = this.state.tripsPanel;
  //   var selectedTrip = [];
  //   var selectedTrips = [];
  //   var trailers = [];
  //   var selVR_num = tripsPanels[i].itemCode;
  //   var ClickedVR = tripsPanels[i];

  //   var sel_Driver_name = tripsPanels[i].driverName;
  //   //caling API

  //   fetchVR(selVR_num)
  //     .then(([res1, res2, res3]) => {
  //       this.setState({
  //         vrlist: res1,
  //         vrdetaillist: res2,
  //         loadvehstock: res3,
  //       });
  //     })
  //     .then(() => { })
  //     .catch((error) => {
  //       // history.push('/');
  //     });
  //   if (this.state.markers && this.state.markers.length == 0) {
  //     this.state.sites.map((site) => {
  //       if (this.state.selectedSite === site.id) {
  //         let marker = [];
  //         marker.push(site);
  //         this.setState({ markers: marker });
  //       }
  //     });
  //   }
  //   this.setState({
  //     clickedTrips: ClickedVR,
  //     selectedVrIndex: i,
  //     selectedVrValidated: tmsValidated,
  //     triplock: true,
  //     vehicleShow: "none",
  //     RouteoptiShow: "none",
  //     vrShow: "block",
  //   });
  // };

  // onVRhide = () => {
  //   this.reloadTrips();
  //   this.setState({
  //     vehicleShow: "block",
  //     RouteoptiShow: "none",
  //     vrShow: "none",
  //   });
  // };

  onVRhide = () => {
    this.setState({
      vehicleShow: "block",
      schedulerShow: "block",
      IsPickTicket: false,
      IsOnlyDeliveryflg: false,
      onlyReceiptflg: false,
      RouteoptiShow: "none",
      vrShow: "none",
      toPickdetailsShow: "none",
      toAllocationdetailsShow: "none",
      vehicleChecked: "none",
      //   toAllocationDataList : [],
      toPickDataList: [],
      toAllocationDataList: [],
      toStaggingLocationList: [],
      toStaggingLocationList2: [],
      toLogDataList: [],
      StaggingFromLoc: "",
      StaggingFromLocIndex: 0,
      StaggingToLoc: "",
      StaggingToLocIndex: 0,
      StaggingFromLoc2: "",
      StaggingFromLoc2Index: 0,
      StaggingToLoc2: "",
      StaggingToLoc2Index: 0,
    });
  };

  onRouteoptihide = () => {
    this.setState({
      vehicleShow: "block",
      RouteoptiShow: "none",
      vrShow: "none",
    });
  };

  onLoadermessage = (tripindex, msg) => {
    var tripsPanels = this.state.tripsPanel;
    var tripsList_loader = tripsPanels[tripindex];
    tripsList_loader.loaderInfo = msg;

    // console.log("loader msg - trip", tripsList_loader);
    this.confirmTrip(tripsList_loader, "loaderMsg");
  };

  onForcesequnceCheck = (tripindex, msg) => {
    // console.log("foced check msg - trip", msg);
    var tripsPanels = this.state.tripsPanel;
    var trips = [];
    var tripsList_force = tripsPanels[tripindex];
    tripsList_force.date = moment.tz(this.state.date, "").format("YYYY-MM-DD");
    if (msg) {
      tripsList_force.forceSeq = true;
    } else {
      tripsList_force.forceSeq = false;
    }
    trips.push(tripsList_force);
    this.submitTrips(trips);
  };

  onDocmessage = (docNum, msg, Msgtype) => {
    var currentGeoData = this.state.geoData;
    var currentMarkers = this.state.markers;
    var trips = [];
    var geoData = [];
    var currMarkers = [];
    var trip = this.state.trips[0];

    currentGeoData &&
      currentGeoData.map((geoData, index) => {
        if (geoData.docnum && geoData.docnum === docNum) {
          if (Msgtype === "doc") {
            geoData.noteMessage = msg;
          } else if (Msgtype === "carrier") {
            geoData.CarrierMessage = msg;
          } else {
            geoData.loaderMessage = msg;
          }
        }
      });

    currentMarkers &&
      currentMarkers.map((currMarker, index) => {
        if (currMarker.docnum && currMarker.docnum === docNum) {
          currMarker.noteMessage = msg;
        }
      });
    trip &&
      trip.totalObject &&
      trip.totalObject.selectedTripData &&
      trip.totalObject.selectedTripData.map((TripData) => {
        if (TripData.docnum && TripData.docnum === docNum) {
          if (Msgtype === "doc") {
            // console.log("inside doc type at app", Msgtype);
            TripData.noteMessage = msg;
          } else if (Msgtype === "carrier") {
            TripData.CarrierMessage = msg;
          } else {
            TripData.LoaderMessage = msg;
          }
        }
      });

    geoData.push(currentGeoData);
    currMarkers.push(currentMarkers);
    trips.push(trip);

    this.setState({
      markers: currentMarkers,
      geoData: currentGeoData,
      trips: trips,
    });
  };

  addDocument2ExistingTrip = (data, tripcode, insertPosition) => {
    let tripsList = this.state.tripsPanel;
    let targetTrip;
    let currentTrip = [];
    for (let im = 0; im < tripsList.length; im++) {
      if (tripsList[im].itemCode === tripcode) {
        targetTrip = tripsList[im];
        break;
      }
    }

    console.log("T222 drag targetTrip", targetTrip);

    data.panelType = "drop";
    data.vehicleCode = targetTrip.code;
    data.itemCode = targetTrip.itemCode;
    targetTrip.doc_capacity =
      parseFloat(targetTrip.doc_capacity, 10) + data.netweight;
    targetTrip.doc_volume =
      parseFloat(targetTrip.doc_volume, 10) + parseFloat(data.volume);
    // targetTrip.doc_qty = parseInt(targetTrip.doc_qty) + tempqty;
    //targetTrip.uom_capacity = data.weightunit;
    // targetTrip.uom_volume = data.volume_unit;selectedTripData // totalObject
    let selectedTripList = [];
    selectedTripList = targetTrip.totalObject.selectedTripData;

    // data isthe insertion document
    if (insertPosition === 0) {
      selectedTripList.push(data);
    } else {
      selectedTripList.splice(insertPosition, 0, data);
    }
    // selectedTripList.push(data);
    targetTrip.totalObject.selectedTripData = selectedTripList;
    targetTrip.dropObject.push(data);
    targetTrip.drops += 1;
    targetTrip.startIndex += 1;
    targetTrip.stops = targetTrip.pickups + targetTrip.drops;
    targetTrip.date = moment.tz(targetTrip.docdate, "").format("YYYY-MM-DD");
    targetTrip.endDate = "";
    targetTrip.optistatus = "Open";
    targetTrip.generatedBy = "MScheduler";
    targetTrip.route = false;
    currentTrip.push(targetTrip);
    //   this.props.updateTrip(currentTrip);

    console.log("T222 drag after modification targetTrip", targetTrip);
    this.submitTrips(currentTrip);
  };

  ToPlan2TripDocuments = (source, target) => {
    console.log("T222 drag at index", source);
    console.log("T222 drag at index", target);

    // let insertPosition  = target.seq ? target.seq :

    if (target.itemCode === "" || target.itemCode === undefined) {
      console.log("T222 drag at index", target);

      // notifySucess = (message) => toast.success(message, { autoClose: 3000 });

      // notifyError = (message) => toast.error('Cannot drag ToPlan document to another ToPlan document', { autoClose: 3000 });
      // this.notifyError('Cannot drag ToPlan document to another ToPlan document');
      window.alert(
        "Cannot drag the To plan document to another To Plan document"
      );
      //   window.alert("Document added successfully");
    } else {
      let tripcode = target.itemCode;
      let insertPosition = target.seq ? target.seq : 0;
      this.addDocument2ExistingTrip(source, tripcode, insertPosition);
      //  this.notifySucess('Document added successfully')
      window.alert("Document added successfully");
    }
  };

  onTripDelete = (index, docnum, vtype, vcode) => {
    // console.log("inside app after delete button clicked", index, docnum, vtype, vcode);
    var currentGeoData = this.state.geoData;
    var currentMarkers = this.state.markers;
    var geoData = [];
    var currMarkers = [];
    var currDropsPanel = this.state.dropsPanel;
    var drops = currDropsPanel.drops;
    var pickUps = currDropsPanel.pickUps;
    var trips = [];
    var trip = this.state.trips[0];
    var removeDocs = [];

    // console.log(trip, "this is selected trip from delete trip")

    if (currentGeoData[index].panelType == "pickup") {
      var pickCount = trip.pickups;
      trip.pickups = pickCount - 1;
      removeDocs.push(docnum);
      for (var i = 0; i < pickUps.length; i++) {
        if (pickUps[i].docnum == docnum) {
          pickUps[i].type = "open";
          pickUps[i].vehicleCode = "";
        }
      }

      //to get Paired document for the deleted Pikcup element
      for (var k = 0; k < trip.pickupObject.length; k++) {
        if (trip.pickupObject[k].docnum === docnum) {
          if (
            trip.pickupObject[k].pairedDoc != undefined &&
            trip.pickupObject[k].pairedDoc != " "
          ) {
            var dropCount = trip.drops;
            trip.drops = dropCount - 1;
            removeDocs.push(trip.pickupObject[k].pairedDoc);
          }
          for (var j = 0; j < drops.length; j++) {
            if (drops[j].docnum == trip.pickupObject[k].pairedDoc) {
              drops[j].type = "open";
              drops[j].vehicleCode = "";
            }
          }
        }
      }
    }

    if (currentGeoData[index].panelType == "drop") {
      var dropCount = trip.drops;
      trip.drops = dropCount - 1;
      removeDocs.push(docnum);
      for (var j = 0; j < drops.length; j++) {
        if (drops[j].docnum == docnum) {
          drops[j].type = "open";
          drops[j].vehicleCode = "";
          trip.doc_capacity = trip.doc_capacity - drops[j].netweight;
          trip.doc_volume = trip.doc_volume - drops[j].volume;

          let deletedQty = drops[j].products.reduce((acc, product) => {
            return acc + Number(product.quantity || 0); // Sum the qty values, defaulting to 0 if qty is undefined
          }, 0);

          trip.doc_qty = trip.doc_qty - deletedQty;
        }
      }

      //to get Paired document for the deleted Drop element
      for (var k = 0; k < trip.dropObject.length; k++) {
        if (trip.dropObject[k].docnum === docnum) {
          if (
            trip.dropObject[k].pairedDoc != undefined &&
            trip.dropObject[k].pairedDoc != " "
          ) {
            var pickCount = trip.pickups;
            trip.pickups = pickCount - 1;
            removeDocs.push(trip.dropObject[k].pairedDoc);
          }
          for (var i = 0; i < pickUps.length; i++) {
            if (pickUps[i].docnum == trip.dropObject[k].pairedDoc) {
              pickUps[i].type = "open";
              pickUps[i].vehicleCode = "";
            }
          }
        }
      }
    }

    currDropsPanel.drops = drops;
    currDropsPanel.pickUps = pickUps;
    var stops = parseInt(trip.pickups) + parseInt(trip.drops);
    trip.startIndex = stops;
    trip.stops = stops;
    for (var i = 0; i < currentGeoData.length; i++) {
      if (!removeDocs.includes(currentGeoData[i].docnum)) {
        geoData.push(currentGeoData[i]);
      }
    }

    for (var i = 0; i < currentMarkers.length; i++) {
      if (!removeDocs.includes(currentMarkers[i].docnum)) {
        currMarkers.push(currentMarkers[i]);
      }
    }
    var currSelectedTrips = this.state.slectedTrips;
    var selectedTrips = [];

    for (var i = 0; i < currSelectedTrips.length; i++) {
      if (!removeDocs.includes(currSelectedTrips[i].docnum)) {
        selectedTrips.push(currSelectedTrips[i]);
      }
    }
    var pickupObject = [];
    for (var i = 0; i < trip.pickupObject.length; i++) {
      if (!removeDocs.includes(trip.pickupObject[i].docnum)) {
        pickupObject.push(trip.pickupObject[i]);
      }
    }
    var dropObject = [];
    for (var i = 0; i < trip.dropObject.length; i++) {
      if (!removeDocs.includes(trip.dropObject[i].docnum)) {
        dropObject.push(trip.dropObject[i]);
      }
    }

    trip.pickupObject = pickupObject;
    trip.dropObject = dropObject;

    var tripColor = [
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
      "#e0e0e0",
    ];

    var count = selectedTrips.length;
    for (var i = 0; i < count; i++) {
      if (selectedTrips[i].panelType === "drop") {
        tripColor[i] = "#7ace4c";
      } else if (selectedTrips[i].panelType === "pickup") {
        tripColor[i] = "#09aaed";
      } else {
        tripColor[i] = "#ed3309";
      }
    }
    trips.push(trip);
    this.setState({
      markers: currMarkers,
      geoData: geoData,
      trips: trips,
      tripColor: tripColor,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[count - 1],
      left: count * 55,
      dropsPanel: currDropsPanel,
      mapChanged: true,
      docType: vtype,
      deletedVehicleCode: vcode,
    });
  };
  // end of onTrip Delete
  lockTrip = (trips, index) => {
    this.setState({ loader: true });
    // console.log("inside final lock tripp");
    var tripsPanel = this.state.tripsPanel;
    tripsPanel[index].lock = true;
    fetch(
      `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/lock/trips`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trips),
      }
    )
      .then((response) => {
        this.reloadTrips();
        this.setState({
          loader: false,
        });
        this.notifySucess("Trip Locked Sucessfully");
      })
      .catch((error) => {
        this.setState({ loader: false });
        this.notifyError("Unable to Lock the Trip");
      });
  };

  onLockRecord = (index, lockP) => {
    var tripsPanel = this.state.tripsPanel;
    var trips = [];
    var trip = tripsPanel[index];
    trip.date = this.state.date;
    trip.lockP = lockP;
    trips.push(trip);
    var user = JSON.parse(localStorage.getItem("authUser"));
    let details = {
      loginUser: user.username,
      dateTime: new Date().toDateString().replace(/-/g, "/"),
      type: "lock",
    };
    if (
      trips[0].totalObject &&
      trips[0].totalObject.logData &&
      trips[0].totalObject.logData.length > 0
    ) {
      trips[0].totalObject.logData.push(details);
    }
    this.lockTrip(trips, index);
  };

  onCompleteTripDelete = (index, tripcode) => {
    var tripsPanel = this.state.tripsPanel;
    var trips = [];
    var trip = tripsPanel[index];
    trips.push(trip);
    this.deleteTrip(trips, index);
    // this.dropResetObj(trip,"completeDelete");
    this.setState({
      guageTrip: {},
      geoData: [],
      markers: [],
      mapChanged: true,
      trips: [],
      slectedTrips: [],
      checkedTrip: false,
    });
    //this.reloadTrips();
  };

  reloadTrips = () => {
    const currDate = moment.tz(this.state.date, "").format("YYYY-MM-DD");
    let value = this.state.selectedMultipleSites;
    fetchTrips(value, currDate)
      .then(([res1]) => {
        this.setState({
          tripsPanel: res1,
        });
      })
      .then(() => {
        // this.changeDate(0, false, "buttons");
      });
  };

  deleteTrip = (trips, index) => {
    this.setState({ loader: true });
    var tripsPanel = this.state.tripsPanel;
    tripsPanel[index].lock = true;
    const currDate = moment.tz(this.state.date, "").format("YYYY-MM-DD");
    let value = this.state.selectedMultipleSites;
    fetch(
      `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/delete/trip`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trips),
      }
    ).then((response) => {
      if (response.status == 200) {
        // this.reloadTrips();
        // this.changeDate(0, '', "deleteTrip");
        this.refreshAllPanels();
        this.setState({ loader: false });
        //  this.handlePanelsUpdate(currDate);
        this.notifySucess("Trip deleted Sucessfully");
      } else {
        this.setState({ loader: false });
        this.notifyError("ERROR");
      }
    });
  };
  unlockTrip = () => {
    var totalTrips = [];
    var ctrips = this.state.trips[0];
    var tripsPan = this.state.tripsPanel;
    for (var i = 0; i < tripsPan.length; i++) {
      if (ctrips.itemCode == tripsPan[i].itemCode) {
        tripsPan[i].lock = false;
        tripsPan[i].lockP = true;
      }
    }
    ctrips.lock = false;
    totalTrips.push(ctrips);
    this.setState({
      trips: totalTrips,
      tripsPanel: tripsPan,
    });
  };
  getRouteSchedulerApp = (routesSchedule, optimisedindex, auto) => {
    var data = [];
    var newGeoData = [];
    if (auto) {
      var tempoptimisedIndex = [];

      //map
      const tempdata = optimisedindex.map((order, index) => {
        for (var i = 0; i < order.length; i++) {
          tempoptimisedIndex.push(order[i].optimizedIndex);
        }
      });
      var tempGeoData = this.state.geoData;
      routesSchedule.routesData.map((route, routeIndex) => {
        var matched = false;

        var optimiseddataindex = tempoptimisedIndex[routeIndex];

        tempGeoData.map((geo, geoIndex) => {
          if (geoIndex === optimiseddataindex) {
            data = { ...geo, ...route };
            matched = true;
          }
        });
        if (matched === true) {
          newGeoData.push(data);
        }
      });
    } else {
      var data = [];
      var newGeoData = [];
      this.state.geoData.map((geo, geoIndex) => {
        routesSchedule.routesData.map((route, routeIndex) => {
          if (geoIndex === routeIndex) {
            data = { ...geo, ...route };
          }
        });
        newGeoData.push(data);
      });
    }
    this.setState({ geoData: newGeoData });
    this.setState({ routeSchedulerTime: routesSchedule });
    this.confirmTrip(routesSchedule.trips, "route", routesSchedule, newGeoData);
  };
  notifySucess = (message) => toast.success(message, { autoClose: 3000 });

  notifyError = (message) =>
    toast.error(message, { autoClose: 3000, style: { zIndex: 1050 } });

  OncheckedSameVehicles = (checked) => {
    this.setState({
      checkedsameVehicles: checked,
    });
  };

  groupunlockTrips = () => {
    this.setState({ loader: true });
    var tripsPanel = this.state.tripsPanel;
    var lockedTrips = [];
    var UnLockcount = 0;
    var driverCnt = 0;
    for (let i = 0; i < tripsPanel.length; i++) {
      var trip = tripsPanel[i];

      if (trip.lock && !trip.tmsValidated) {
        UnLockcount = UnLockcount + 1;
        // console.log("OSRM docdate =", trip.docdate);
        let tripdate = moment.tz(trip.docdate, "").format("YYYY-MM-DD");
        trip.date = tripdate;
        trip.lock = false;
        trip.lockP = true;
        lockedTrips.push(trip);
      }
    }

    console.log("THHH drivers count =", driverCnt);

    if (UnLockcount > 0) {
      fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/unlock/multipletrips`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lockedTrips),
        }
      ).then((response) => {
        this.reloadTrips();
        this.setState({
          // tripsPanel: tripsPanel,
          loader: false,
        });
        this.notifySucess("Trips are Unlocked Sucessfully");
      });
    } else {
      this.setState({
        errorMessage: "No Trips are available for Unlocking",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  grouplockTrips = () => {
    this.setState({ loader: true });
    var tripsPanel = this.state.tripsPanel;
    var unlockedTrips = [];
    var Lockcount = 0;
    var driverCnt = 0;
    for (let i = 0; i < tripsPanel.length; i++) {
      var trip = tripsPanel[i];

      if (!trip.lock && (!trip.driverName || trip.driverName === "null")) {
        driverCnt = driverCnt + 1;
      }

      if (!trip.lock && trip.optistatus !== "Open") {
        Lockcount = Lockcount + 1;
        // console.log("OSRM docdate =", trip.docdate);
        let tripdate = moment.tz(trip.docdate, "").format("YYYY-MM-DD");
        trip.date = tripdate;
        trip.lock = true;
        unlockedTrips.push(trip);
      }
    }

    // console.log("THHH drivers count =", driverCnt)

    if (driverCnt > 0) {
      this.refreshAllPanels();
      this.setState({
        errorMessage: `The driver is missing in ${driverCnt} ${
          driverCnt == 1 ? "trip" : "trips"
        }.`,
        loader: false,
        addAlertShow: true,
      });
    } else if (Lockcount > 0) {
      fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/lock/multipletrips`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(unlockedTrips),
        }
      ).then((response) => {
        this.notifySucess("Trips are Locked Sucessfully");
        this.setState({
          tripsPanel: tripsPanel,
          loader: false,
        });
      });
    } else {
      this.setState({
        errorMessage: "No Trips are available for Locking",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  onDocProcessChange = (val) => {
    this.setState({
      defaultdocprocess: val,
    });
  };

  handleCodeExecution = (vlaue) => {
    this.setState({
      codeExecution: vlaue,
    });
  };

  OncheckedSameVehicles = (checked) => {
    this.setState({
      checkedsameVehicles: checked,
    });
  };

  autoResetTrips = () => {
    // console.log("T333 inside auto reset Trips");
    this.setState({ loader: true });
    var tripsPanel = this.state.tripsPanel;
    var unlockedTrips = [];
    var deletecount = 0;

    for (let i = 0; i < tripsPanel.length; i++) {
      var trip = tripsPanel[i];
      if (!trip.lock) {
        deletecount = deletecount + 1;
        unlockedTrips.push(trip);
      }
    }

    if (deletecount > 0) {
      // console.log("Trips are reeadyy to delete =", unlockedTrips);
      fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/delete/trips`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(unlockedTrips),
        }
      ).then((response) => {
        // this.reloadTrips();
        this.refreshAllPanels();
        //  this.handlePanelsUpdate(currDate);
        this.setState({ loader: false });
        this.notifySucess("Trips deleted Sucessfully");
        this.onRouteoptihide();
      });
    } else {
      this.setState({
        errorMessage: "No Trips are available for Deletion",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  autoGenerateTrips = () => {
    //filter the trips panle and sort it
    var tempTripPanel = this.state.tripsPanel;
    var orginalTripOrder = this.state.tripsPanel;
    // console.log("OSRM trip before trip", tempTripPanel);

    tempTripPanel.sort(
      (a, b) => b.code.localeCompare(a.code) || b.trips - a.trips
    );

    // console.log("OSRM trip after trip", tempTripPanel);

    const key = "code";

    // let uniqueTripListByCode = [...new Map(tempTripPanel.map((item) => [item["code"], item])).values(),];

    var resArr = [];
    tempTripPanel.filter(function (item) {
      var i = resArr.findIndex((x) => x.code == item.code);
      if (i <= -1) {
        resArr.push(item);
      }
      return null;
    });

    this.setState({ loader: true });
    var sameVehiclesflag = this.state.checkedsameVehicles;
    var DocCount = 0;
    var docsPanel = [];
    let VehStartTime, VehEndTime;
    for (let jj = 0; jj < this.state.dropsPanel.drops.length; jj++) {
      let doc = this.state.dropsPanel.drops[jj];
      docsPanel.push(doc);
      if (
        doc.type === "open" &&
        (doc.dlvystatus === "0" || doc.dlvystatus === "8")
      ) {
        DocCount = DocCount + 1;
      }
    }

    for (let jk = 0; jk < this.state.dropsPanel.pickUps.length; jk++) {
      let doc = this.state.dropsPanel.pickUps[jk];
      docsPanel.push(doc);
      if (
        doc.type === "open" &&
        (doc.dlvystatus === "0" || doc.dlvystatus === "8")
      ) {
        DocCount = DocCount + 1;
      }
    }

    if (DocCount > 0) {
      // console.log("OSRM");
      // console.log("OSRM- vehicles", this.state.vehiclePanel.vehicles);
      // console.log("OSRM- drivers", this.state.vehiclePanel.vehicles);
      //  // console.log("OSRM- documents", this.state.docsPanel);
      // console.log("OSRM- site", this.state.selectedMultipleSites);
      var VehList = [],
        DocList = [];
      var siteLat, siteLang;
      var doc = {};
      var selSite = this.state.selectedMultipleSites[0];
      // console.log("OSRM- sel site", selSite);
      this.state.sites.map((site) => {
        if (selSite === site.id) {
          siteLat = site.lat;
          siteLang = site.lng;
        }
      });

      for (let i = 0; i < this.state.vehiclePanel.vehicles.length; i++) {
        var Veh = {};
        let veh = this.state.vehiclePanel.vehicles[i];
        // console.log("OSRM veh count =", i);
        // console.log("OSRM veh info", veh);
        var sflag = false;
        var prevEndTime = 0;
        // console.log("T1212 OSRM before incre PrevEndtime", prevEndTime);
        // console.log("T1212 OSRM resArr", resArr);
        for (let t = 0; t < resArr.length; t++) {
          var currtrip = resArr[t];
          // console.log("T1212  resArr current ", currtrip);
          if (currtrip.code === veh.codeyve) {
            sflag = true;
            var endTime = splitTimeAndConv2Sec(currtrip.endTime);
            var unloadingtime = convertHrToSec(veh.enddepotserv);
            prevEndTime = endTime + unloadingtime;
            // console.log("T1212 OSRM incre PrevEndtime", prevEndTime);
          }
        }

        if (!sameVehiclesflag && !sflag) {
          Veh.id = i + 1;
          Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
          Veh.capacity = [veh.capacities];

          Veh.description = veh.codeyve;
          let starttime = splitTimeAndConv2Sec(veh.starttime);
          let loadingHrs = convertHrToSec(veh.startdepots);
          let stime = starttime + loadingHrs;
          // console.log("loading hrs =", loadingHrs);
          let etime = splitTimeAndAddtimeAndConv2Sec(
            veh.starttime,
            veh.overtimestar
          );
          let timew = [stime, etime];
          let geo = [siteLang, siteLat];
          Veh.time_window = timew;
          Veh.start = geo;
          Veh.end = geo;
          //  var array = JSON.parse("[" + veh.skills + "]");
          Veh.skills = [];
          if (veh.maxordercnt > 0) {
            Veh.max_tasks = veh.maxordercnt;
          } else {
            Veh.max_tasks = 3;
          }
          // console.log("OSRM Vehicle details", Veh);
          VehList.push(Veh);
          VehEndTime = etime;
          VehStartTime = stime;
        } else if (sameVehiclesflag && sflag) {
          // console.log("T1212  OSRM after preventime =", prevEndTime);
          let starttime = prevEndTime;
          let loadingHrs = convertHrToSec(veh.startdepots);
          let stime = starttime + loadingHrs;
          // console.log("T1212  OSRM incre loading loadinghrs =", loadingHrs);
          // console.log("T1212 OSRM incre loading stime hrs =", stime);
          let etime = splitTimeAndAddtimeAndConv2Sec(
            veh.starttime,
            veh.overtimestar
          );

          if (stime < etime) {
            Veh.id = i + 1;
            Veh.description = veh.codeyve;
            Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
            Veh.capacity = [veh.capacities];

            // console.log("OSRM incre etime  hrs =", etime);
            let timew = [stime, etime];
            let geo = [siteLat, siteLang];
            Veh.time_window = timew;
            Veh.start = geo;
            Veh.end = geo;
            // var array = JSON.parse("[" + veh.skills + "]");
            Veh.skills = [];
            if (veh.maxordercnt > 0) {
              Veh.max_tasks = veh.maxordercnt;
            } else {
              Veh.max_tasks = 3;
            }

            // console.log("OSRM Vehicle details", Veh);
            VehList.push(Veh);
            VehEndTime = etime;
            VehStartTime = stime;
          }
        }
      }
      // console.log("OSRM Vehicle Final List", VehList);
      let maxDoc = this.state.defaultdocprocess;
      let docprocessedCount = 0;
      for (let j = 0; j < docsPanel.length; j++) {
        let doc = docsPanel[j];
        if (
          doc.type === "open" &&
          (doc.dlvystatus === "0" || doc.dlvystatus === "8") &&
          docprocessedCount < maxDoc
        ) {
          var Doc = {};
          // console.log("OSRM doc count =", j);
          // console.log("OSRM doc info", doc);
          Doc.id = j + 1;
          Doc.description = doc.docnum;

          var FromArr;
          var fromflag = false;
          var toflag = false;
          var ToArr;
          if (doc.fromTime.length > 0) {
            FromArr = doc.fromTime.split(" ");
            fromflag = true;
          }

          if (doc.toTime.length > 0) {
            ToArr = doc.toTime.split(" ");
            toflag = true;
          }

          // console.log("OSRM doc from", FromArr);
          // console.log("OSRM doc to", ToArr);

          var timeWindw = [];

          fromflag &&
            FromArr.map((ft, index) => {
              var tt = [];
              // console.log("OSRM doc ft", ft);
              tt.push(splitTimeAndConv2Sec(ft));
              // console.log("OSRM doc tt", ToArr[index]);
              tt.push(splitTimeAndConv2Sec(ToArr[index]));

              timeWindw.push(tt);
            });

          // console.log("OSRM doc Final Time Window", timeWindw);

          var DocLat, DocLang;
          DocLat = doc.lat;
          DocLang = doc.lng;
          Doc.location = [DocLat, DocLang];
          Doc.priority = doc.priority;
          Doc.amount = [Math.round(doc.netweight)];
          // var array1 =   JSON.parse("[" + doc.skills + "]");
          //       Veh.skills = array1;
          ////  Doc.skills = (doc.skills).split(',');
          // Doc.skills = array1;
          let wtime =
            convertHrToSec(doc.waitingTime) + convertHrToSec(doc.serviceTime);
          Doc.service = parseInt(wtime);
          let ps,
            pe = 0;
          let ds,
            de = 0;

          if (fromflag) {
            Doc.time_windows = timeWindw;
          }

          /*
      ps = VehStartTime + 10800;
      ds = VehStartTime ;
      pe = VehEndTime ;
      de = VehStartTime + 10800;
      if(doc.doctype === "PRECEIPT") {
        //Doc.time_windows = [0,28800]
      //Doc.time_window = [36000, 54000];
      Doc.time_windows = [[ps, pe]];

      }
      else {
   Doc.time_windows =[[ds,de]];
      }
*/

          // console.log("OSRM Document details", Doc);
          DocList.push(Doc);
          docprocessedCount = docprocessedCount + 1;
        }
      }
      // console.log("OSRM Document Final List", DocList);

      //process for the JSON file
      var processedData = {};
      processedData.vehicles = VehList;
      processedData.jobs = DocList;
      processedData.options = {
        g: false,
      };

      // console.log("OSRM proccessed data =", processedData);
      // latest - 34.171.208.219
      // v10   - 34.134.143.219
      //new frane  - 35.193.234.153
      // https://maps.tema-systems.com
      // US-west instance 34.95.36.63

      fetch("https://maps.tema-systems.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedData),
      })
        .then((response) => {
          // console.log("OSRM inside after OSRM - response", response);
          if (response.status === 200) {
            return response.json();
          } else {
            var StatusErrorMsg = response.statusText;
            this.setState({
              errorMessage: { StatusErrorMsg },
              loader: false,
              addAlertShow: true,
            });
          }
        })
        .then((res) => {
          // console.log("OSRM - opti result", res);
          // console.log("OSRM - opti result", res);
          if (res.routes.length > 0) {
            // console.log("OSRM - opti route count", res.routes.length);
            this.submitRoutesforTripsCreation(
              res.routes,
              selSite,
              docsPanel,
              [],
              [],
              res
            );
          } else {
            this.setState({
              errorMessage: "something  wrong with the data ,  please check",
              loader: false,
              addAlertShow: true,
            });
          }
        });
    } else {
      this.setState({
        errorMessage: "No Documents are available for Trips creation",
        loader: false,
        addAlertShow: true,
      });
    }
  };

  TimeWindow_splitTime = (timeString) => {
    // Split the timeString into individual times
    return timeString.split(" ");
  };

  submitRoutesforTripsCreation = (
    routes,
    site,
    docsPanel,
    selDrivers,
    SelVehicles,
    res,
    jobid,
    assignedShipments,
    assignedJobs,
    from
  ) => {
    var RouteprocessedData = [];
    var sameProcessUsedDriversList = [];
    var TripsfromRoutes = [];
    let allocatedDrivers = [];
    // console.log("OSRM Auto Routes data are", routes);
    for (let k = 0; k < routes.length; k++) {
      var currRoute = routes[k];
      var Vehicle = {},
        Veh = routes[k].description;

      let  dtdate = this.state.date;

      let startStep = currRoute.steps.find(step => step.type === "start");
      let startArrivalSeconds = startStep ? startStep.arrival : 0;

      // Convert start seconds to HH:mm
      let startHour = Math.floor(startArrivalSeconds / 3600);
      let startMinute = Math.floor((startArrivalSeconds % 3600) / 60);

      // Pad single digits
      startHour = startHour.toString().padStart(2, '0');
      startMinute = startMinute.toString().padStart(2, '0');

      let tempstartTime = `${startHour}:${startMinute}`;

      // Step 3: Calculate total travel time (already have this)
      let totalDurationInHours = (currRoute.duration + currRoute.service) / 3600; // 3600 seconds = 1 hour
      let totalDurationInMinutes = totalDurationInHours * 60;

      // Step 4: Combine date + time properly
      let startDateTime = moment(dtdate + " " + tempstartTime, "YYYY-MM-DD HH:mm");
      let endDateTime = startDateTime.clone().add(totalDurationInMinutes, 'minutes');

      // Step 5: Format properly
      let finalStartDate = startDateTime.format("YYYY-MM-DD");
      let finalStartTime = startDateTime.format("HH:mm");
      let finalEndDate = endDateTime.format("YYYY-MM-DD");
      let finalEndTime = endDateTime.format("HH:mm");




      var auto_tot_travel_time = formatTime(routes[k].duration);

      // console.log(auto_tot_travel_time ,"this is total travel time")
      var auto_total_time = (routes[k].duration + routes[k].service) / 60 / 60;
      var auto_service_time = routes[k].service / 60 / 60;
      var auto_tot_distance = routes[k].distance / 1000;

      // var totalcost = 0, fixedCost = 0, overtimeCost = 0;
      var fdistanceCost = 0,
        ftimeCost = 0,
        ftotalCost = 0,
        fovertimecost = 0,
        fRegularcost = 0,
        ffixedcost = 0;

      // // console.log(auto_total_time,auto_service_time,auto_tot_distance ,"this res from osrm checking")

      // console.log("OSRM Auto Routes veh are", routes[k].description);
      for (let i = 0; i < this.state.vehiclePanel.vehicles.length; i++) {
        let tempvveh = this.state.vehiclePanel.vehicles[i];
        // should not use the vehicle when driver is already allocated

        if (
          tempvveh.driverid === " " ||
          tempvveh.driverid === "" ||
          tempvveh.driverid === null
        ) {
        } else {
          allocatedDrivers.push(tempvveh.driverid);
        }

        // select the vehicle from the list
        if (Veh == this.state.vehiclePanel.vehicles[i].codeyve) {
          Vehicle = this.state.vehiclePanel.vehicles[i];
        }
      }







      // console.log("OSRM Auto  veh are", Vehicle);

      // console.log("OSRM Auto  drivers are", selDrivers);
      var dropObject = [],
        pickupObject = [],
        drops = 0,
        pickups = 0;
      var startTime = "",
        endTime = "";
      var totalWeight = 0;
      var ddate = "";
      var totalVolume = 0;
      var fld_doc_capacity = 0;
      var fld_uom_volume = "";
      var fld_uom_capacity = "";
      var flds_uom_volume = "";
      var fld_doc_volume = 0;
      var flds_uom_capacity = "";
      var fld_doc_qty = 0;
      var flds_per_volume = "";
      var fld_uom_qty = "";
      var weight = "";
      var volume = "";
      var vol_unit = "";
      var wei_unit = "";
      var percentageMass = 0;
      var percentageVolume = 0;
      var VehicleObject = Vehicle;
      var flds_per_capacity = 0;
      var flds_doc_capacity = 0;
      var flds_doc_volume = 0;
      var vehobj = [];
      var itemTrip = {
        selectedTripData: [],
        timelineInterval: [],
        equipments: [],
        trailers: [],
        quantities: [],
      };
      var timelneInterval = [];
      // itemTrip.selectedTripData = GroupedObjects;
      // itemTrip.timelineInterval = [];
      itemTrip.equipments = [];
      itemTrip.trailers = [];
      itemTrip.quantities = [];
      var freqtype = false;
      var appointmentExist = false;

      // loop thorugh the documents steps
      let tempBreakno = 0;
    //  let tripStartDateTime = moment(ddate + " " + startTime, "YYYY-MM-DD HH:mm");


let ttstartStep = currRoute.steps.find(step => step.type === "start");
let tripStartDateTime;

if (ttstartStep) {
    let startArrivalSec = startStep.arrival || 0;
    let startDate = moment(dtdate, "YYYY-MM-DD");
    tripStartDateTime = startDate.clone().add(startArrivalSec, 'seconds');
} else {
    tripStartDateTime = moment(dtdate, "YYYY-MM-DD HH:mm");
}
      for (let t = 0; t < currRoute.steps.length; t++) {
        var ttime = "";
        var currTask = currRoute.steps[t];
        ddate = this.state.date;



         // Calculate proper arrival and end times for each step
          let arrivalSec = currTask.arrival || 0;
          let serviceSec = currTask.service || 0;

          let stepArrivalDT = tripStartDateTime.clone().add(arrivalSec, 'seconds');
          let stepEndDT = stepArrivalDT.clone().add(serviceSec, 'seconds');

          let formattedArrivalDate = stepArrivalDT.format("YYYY-MM-DD");
          let formattedArrivalTime = stepArrivalDT.format("HH:mm");
          let formattedEndTime = stepEndDT.format("HH:mm");
          let formattedEndDate = stepEndDT.format("YYYY-MM-DD");


        console.log("THHH OSRM Auto  curr task are", currTask);
        if (
          currTask.type === "job" ||
          currTask.type === "pickup" ||
          currTask.type === "delivery"
        ) {
          if (currTask.type !== "start" && currTask.type !== "end") {
            var docno = currTask.description;
            // console.log("OSRM Auto  curr task is job");
            for (let d = 0; d < docsPanel.length; d++) {
              var currDoc = docsPanel[d];
              // console.log("OSRM Auto  curr doc is job,", currDoc);
              var SelectedDoc = [];
              if (currDoc.docnum === docno) {
                currDoc.vehicleCode = Veh;
                currDoc.arrival = formattedArrivalTime;
                currDoc.time = convertSecToMin(currTask.duration);
                let tempwaittime = convertHrToSec(currDoc.waitingTime);
                let tempservicetime = currTask.service; //- tempwaittime;
                currDoc.serTime = secondsToHms(tempservicetime);
                currDoc.distance = currTask.distance / 1000;
                currDoc.startDate = formattedArrivalDate;
                currDoc.endDate = formattedEndDate;
                currDoc.end = formattedEndTime;
                ttime = secondsToHms(currTask.arrival);
                if (currDoc.doctype === "PRECEIPT") {
                  pickups = pickups + 1;
                  currDoc.panelType = "pickup";
                  pickupObject.push(currDoc);
                  fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                  fld_doc_volume = fld_doc_volume + currDoc.volume;

                  let tempqty = 0,
                    tempuom = "";
                  currDoc.products &&
                    currDoc.products.length > 0 &&
                    currDoc.products.map((prod, index) => {
                      tempqty = tempqty + parseInt(prod.quantity);
                      tempuom = prod.uom;
                    });
                  fld_doc_qty = fld_doc_qty + tempqty;
                  // fld_uom_qty = fld_uom_qty + tempuom;
                  if (!fld_uom_qty.includes(tempuom)) {
                    fld_uom_qty += tempuom;
                  }
                } else {
                  drops = drops + 1;
                  currDoc.panelType = "drop";
                  dropObject.push(currDoc);
                  fld_doc_capacity = fld_doc_capacity + currDoc.netweight;
                  fld_doc_volume = fld_doc_volume + currDoc.volume;
                  let tempqty = 0,
                    tempuom = "";
                  currDoc.products &&
                    currDoc.products.length > 0 &&
                    currDoc.products.map((prod, index) => {
                      tempqty = tempqty + parseInt(prod.quantity);
                      tempuom = prod.uom;
                    });
                  fld_doc_qty = fld_doc_qty + tempqty;
                  // fld_uom_qty = fld_uom_qty + tempuom;

                  if (!fld_uom_qty.includes(tempuom)) {
                    fld_uom_qty += tempuom;
                  }
                }
                itemTrip.selectedTripData.push(currDoc);
                totalWeight = totalWeight + parseFloat(currDoc.netweight);
                totalVolume = totalVolume + parseFloat(currDoc.volume);
                break;
              }
            }
            //end of search task with document panel
          } // end of if, task
        } else if (currTask.type === "layover") {
          let currDoc = {};
          tempBreakno = tempBreakno + 1;
          currDoc.vehicleCode = Veh;
          currDoc.type = currTask.type;
          currDoc.doctype = "BREAK";
          currDoc.breaktype = 1;
          currDoc.site = site;
          currDoc.docdate = formattedArrivalDate;
          currDoc.docnum = "Break" + tempBreakno;
          ttime = secondsToHms(currTask.arrival);
          currDoc.arrival = formattedArrivalTime;
          currDoc.time = convertSecToMin(currTask.duration);
          // console.log("OSRM curr task", currTask)
          // console.log("OSRM curr task", currTask)
          //    let tempwaittime = convertHrToSec(currDoc.waitingTime)
          let tempservicetime = currTask.service; //- tempwaittime;
          currDoc.serTime = secondsToHms(tempservicetime);
          currDoc.waitingTime = 0;
          currDoc.serviceTime = convertSecToHr(tempservicetime);
          // console.log("OSRM curr task", currDoc.serTime)
          currDoc.distance = currTask.distance / 1000;
          currDoc.end = formattedEndTime;

          itemTrip.selectedTripData.push(currDoc);
        } else if (currTask.type === "start") {
          // console.log("OSRM start task", currTask.arrival);
          startTime = formattedArrivalTime;
          ttime = secondsToHms(currTask.arrival);
        } else if (currTask.type === "end") {
          endTime = formattedArrivalTime;
          ttime = secondsToHms(currTask.arrival);
          // console.log("OSRM end task", currTask.arrival);
        }
        //for timeline
        var index = t * 12;
        timelneInterval.push({ value: index, label: ttime });

        // console.log("OSRM timline data  =", timelneInterval);
      } // end of steps
      // totalWeight = 0; //totalWeight + parseInt(docItem.obbject.netweight);
      // totalVolume = 0; //totalVolume + parseInt(docItem.obbject.volume);

      itemTrip.timelineInterval = timelneInterval;
      var TimelineInterval = VehicleObject.timelineInterval;
      var stops = pickups + drops;
      var site = VehicleObject.fcy;
      var capacity = VehicleObject.capacities;

      fdistanceCost = VehicleObject.costperunitd * Number(auto_tot_distance);
      if (auto_total_time > VehicleObject.overtimestar) {
        fovertimecost =
          (auto_total_time - VehicleObject.overtimestar) *
          VehicleObject.costperunito;
        fRegularcost = VehicleObject.overtimestar * VehicleObject.costperunitt;
        ftimeCost = Math.round(fovertimecost + fRegularcost);
      } else {
        fRegularcost = VehicleObject.costperunitt * auto_total_time;
        ftimeCost = fRegularcost;
      }
      ffixedcost = VehicleObject.fixedcost;
      ftotalCost = VehicleObject.fixedcost + fdistanceCost + ftimeCost;
      var defaultDriver = "",
        defaultDrivername = "";

      // console.log("T1212 active drivers =", VehicleObject);
      if (
        VehicleObject.driverid === " " ||
        VehicleObject.driverid === "" ||
        VehicleObject.driverid === null
      ) {
        //assign some random driver from the active drivers
        var activeDrivers = this.state.vehiclePanel.drivers;
        var tempTripPanel = this.state.tripsPanel;
        var sflag = false;
        var dflag = false;

        let driverflg = false;
        let ExistingTripdata = [];

        let temptrip2 = this.state.tripsPanel;
        if (temptrip2.length > 0) {
          for (let i = 0; i < temptrip2.length; i++) {
            const acttrip = temptrip2[i];
            if (acttrip.code === Veh) {
              // console.log("T1212 same veh exist", acttrip.code)
              // defaultdriver = trip.driverid;
              defaultDriver = acttrip.driverid;
              defaultDrivername = acttrip.driverName;
              driverflg = true;
              break; // Exit the loop when driverflg is true
            } else {
              if (trip && trip.driver !== null) {
                allocatedDrivers.push(trip.driver);
              }
              // ExistingTripdata.push(tripData);
            }
          }
        }
        // console.log("T1212 allocated drivers =", allocatedDrivers);

         console.log("T1212 selected drivers =", selDrivers);

        let tempSortedList = this.sortDrivers(selDrivers);

     console.log("T1212 selected sorted drivers =", tempSortedList);


        if (!driverflg && tempSortedList?.length > 0) {
          if (allocatedDrivers.length > 0) {
            // console.log("T1212 trip exist driver not match");
            for (let seldriver of tempSortedList) {
              if (!allocatedDrivers.includes(seldriver.driverid)) {
                // console.log("T1212 driver not used , random driver", seldriver);
                driverflg = true;
                defaultDriver = seldriver.driverid;
                defaultDrivername = seldriver.driver;
                allocatedDrivers.push(seldriver.driverid);
                break; // Exit the loop if a driver is not allocated
              }
            }
          } else {
            // console.log("T1212 active drivers complete first if=");
            defaultDriver = tempSortedList[0].driverid;
            defaultDrivername = tempSortedList[0].driver;
            allocatedDrivers.push(tempSortedList[0].driverid);
          }
        }
      } else {
        // console.log("T1212 - vehicle driver");
        defaultDriver = VehicleObject.driverid;
        if (
          VehicleObject.drivername != null ||
          VehicleObject.drivername != ""
        ) {
          defaultDrivername = VehicleObject.drivername;
        }

        // console.log("T1212 active default driver assigned =", defaultDriver);
      }

      // console.log("T1212 active default driver assigned 2 =", defaultDriver);
      // console.log("OSRM Vehicle Object =", VehicleObject);















      var volume = VehicleObject.vol;
      //  var StartTime = VehicleObject.timelineInterval[0].label;
      vehobj = VehicleObject;
      flds_uom_capacity = VehicleObject.xweu;
      fld_uom_capacity = VehicleObject.xweu;
      flds_uom_volume = VehicleObject.xvol;
      fld_uom_volume = VehicleObject.xvol;
      var dddd1 = new Date();
      let h = (dddd1.getHours() < 10 ? "0" : "") + dddd1.getHours();
      let m = (dddd1.getMinutes() < 10 ? "0" : "") + dddd1.getMinutes();
      let currtime = h + ":" + m;



      // default trailer assignment
      var defaultTrailer_a = "",
        defaultTrailerCount_a = 0,
        defaultTrailerObject_a = [];
      var trailers = this.state.vehiclePanel.trails;
      if (VehicleObject.trailer === " " || VehicleObject.trailer === "") {
      } else {
        defaultTrailer_a = VehicleObject.trailer;
        defaultTrailerCount_a = defaultTrailerCount_a + 1;
        //loop thorugh all the trailers and assign

        trailers &&
          trailers.length > 0 &&
          trailers.map((trail) => {
            if (trail.trailer === VehicleObject.trailer) {
              defaultTrailerObject_a.push(trail);
            //  fld_tot_volume =
              //  parseInt(fld_tot_volume) + parseInt(trail.maxlovol);
          //    fld_tot_capacity =
              //  parseInt(fld_tot_capacity) + parseInt(trail.maxloams);
            }
          });
      }

      //end of trailer assignment
      // if (totalWeight > 0) {
      //   percentageMass = 0; //((parseInt(totalWeight) / parseInt(capacity)) * 100).toFixed(1);
      // }

      // if (totalVolume > 0) {
      //   percentageVolume = 0; //((parseInt(totalVolume) / parseInt(volume)) * 100).toFixed(1);
      // }
      if (totalWeight > 0) {
        // Convert totalWeight and capacity to floating-point numbers
        let weight = parseFloat(totalWeight);
        let cap = parseFloat(capacity);

        // Calculate the percentage mass and format it to one decimal place
        percentageMass = ((weight / cap) * 100).toFixed(2);

        // Store values as floating-point numbers
        flds_doc_capacity = weight;
        flds_per_capacity = percentageMass;
      }

      if (totalVolume > 0) {
        // Convert totalVolume and volume to floating-point numbers
        let volumeVal = parseFloat(totalVolume);
        let vol = parseFloat(volume);

        // Calculate the percentage volume and format it to one decimal place
        percentageVolume = ((volumeVal / vol) * 100).toFixed(2);

        // console.log(percentageVolume, "this is percentage volume afer calaulation")
        // Store values as floating-point numbers
        flds_doc_volume = volumeVal;
        flds_per_volume = percentageVolume;
      }
      totalVolume =
        totalVolume % 1 === 0
          ? totalVolume.toString() // If the number is an integer, show it without decimals
          : totalVolume.toFixed(2); // Otherwise, show it rounded to three decimal places

      totalWeight =
        totalWeight % 1 === 0 ? totalWeight.toString() : totalWeight.toFixed(2);
      var today = new Date();
      var execdate = today.getDate();

      // console.log("OSRM Auto Routes data are", routes[k]);
      var trip = {
        arrSite: site,
        code: Veh,
        date: moment.tz(finalStartDate, "").format("YYYY-MM-DD"),
        docdate: moment.tz(finalStartDate, "").format("YYYY-MM-DD"),
        endDate: finalEndDate,
        depSite: site,
        jobId: jobid,
        freqExist: freqtype,
        appointment: appointmentExist,
        poProcessed: false,
        dlvystatus: 0,
        lvsno: null,
        credattim: new Date(),
        upddattim: new Date(),
        heuexec: currtime,
        // datexec : new Date(),
        datexec: new Date(),
        driverName: defaultDrivername,
        driverId: defaultDriver,
        generatedBy: "AutoScheduler",
        defaultDriver: "",
        trailers: defaultTrailerCount_a,
        site: site,
        equipments: 0,
        vehicleObject: vehobj,
        optistatus: "Optimized",
        capacities: capacity,
        adeptime: finalStartTime,
        startTime: finalStartTime,
        endTime: finalEndTime,
        trips: 1,
        pickups: pickups,
        lock: false,
        pickupObject: pickupObject,
        dropObject: dropObject,
        totalObject: itemTrip,
        equipmentObject: [],
        trialerObject: [],
        drops: drops,
        stops: stops,
        startIndex: stops,
        pickUps: pickups,
        timelineInterval: TimelineInterval,
        trailerLink: "",
         trailerList: [],
        trialerObject: defaultTrailerObject_a,
        forceSeq: false,
        currDropsPanel: {
          drops: [],
          pickUps: [],
        },
        pickups: pickups,
        alldrivers: "",
        weightPercentage: percentageMass,
        volumePercentage: percentageVolume,
        totalWeight: fld_doc_capacity + " " + flds_uom_capacity,
        totalVolume: fld_doc_volume + " " + flds_uom_volume,
        travelTime: auto_tot_travel_time,
        serviceTime: auto_service_time,
        totalTime: auto_total_time,
        totalDistance: auto_tot_distance,
        per_capacity: percentageMass,
        per_volume: percentageVolume,
        doc_capacity: fld_doc_capacity,
        uom_capacity: fld_uom_capacity,
        uom_volume: fld_uom_volume,
        doc_volume: fld_doc_volume,
        tot_capacity: totalWeight,
        tot_volume: totalVolume,
        uom_qty: fld_uom_qty,
        doc_qty: fld_doc_qty,
        fixedCost: ffixedcost,
        totalCost: ftotalCost,
        distanceCost: fdistanceCost,
        regularCost: fRegularcost,
        overtimeCost: fovertimecost,
        timeCost: ftimeCost,
        driverslist: "",
        allcustomers: "",
        customerlist: "",
      };

      RouteprocessedData.push(trip);
    }
    console.log("OSRM Final assigned Jobs =", assignedJobs);
    console.log("OSRM Final assigned Shipments =", assignedShipments);
    TripsfromRoutes = RouteprocessedData;
    // console.log(TripsfromRoutes);
    this.ConfirmScheduledTrips(
      TripsfromRoutes,
      docsPanel,
      SelVehicles,
      res,
      from,
      assignedShipments,
      assignedJobs
    );
  };


   sortDrivers = (drivers) => {
    return [...drivers].sort((a, b) => {
      if (a.dayWorkedHrs !== b.dayWorkedHrs) {
        return a.dayWorkedHrs - b.dayWorkedHrs;
      }
      if (a.weeklyWorkedHrs !== b.weeklyWorkedHrs) {
        return a.weeklyWorkedHrs - b.weeklyWorkedHrs;
      }
      return a.monthWorkedHrs - b.monthWorkedHrs;
    });
  };


  ConfirmScheduledTrips = (
    trips,
    selDocs,
    SelVeh,
    res,
    from,
    assignedShipments,
    assignedJobs
  ) => {
    this.setState({ loader: true });
    fetch(`${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        console.log("TEEEE inside after trip - response", response);
        this.handleErrors(response);
      })
      .then(function (response) {})
      .then(() => {
        // console.log("inside submit Trips", this.state.date);
        this.handleDateChange(this.state.date);
      })
      .then(() => {
        this.setState({ laoder: false, checkedTrip: false, isDetail: false });
        this.notifySucess("Trip Added/Updated Sucessfully");

        console.log("TCCC result of OSRM 1= ", selDocs);
        console.log("TCCC result of OSRM 2= ", res);

        //  this.Exceptionalanalysis(selDocs, SelVeh, res)
        if (from === "auto_next" || from === "auto_old") {
          this.Exceptionalanalysis(
            selDocs,
            SelVeh,
            res,
            assignedShipments,
            assignedJobs,
            from
          );
        }
      })
      .catch((error) => {
        console.log(error ,"this is error message in conform schedule trips")
        this.handleDateChange(this.state.date);
        this.setState({ loader: false });
        this.notifyError(
          "Please add proper trip to add or update, with vehicle, drops and pickups"
        );
      });
  };

  render() {
    // console.log(this.state.vehiclePanel.vehicles, "these are vehiclesssssssssssssssssssssssssssssssssss")
    console.log(this.state.toAllocationdetailsShow ,"9093 allocation details show")
    console.log(this.state.toPickdetailsShow, "9451 allocation details show")
    let addAlertClose = () => this.setState({ addAlertShow: false });
    let addAlertArrayClose = () => this.setState({ addAlertArrayShow: false });
    let addAlertSummaryClose = () =>
      this.setState({ addAlertSummaryShow: false });
    let optionItems = [];
    var optionSelected = {};
    var selectedSite = {};
    var placeHolder = "All";

    this.state.sites &&
      this.state.sites.length > 0 &&
      this.state.sites.map((site) => {
        /*
            if(site.id == this.selectedSite.id) {
                selectedSite = site;
                placeHolder = site.value;
                optionSelected.value = site.id;
                optionSelected.label = (site.value + "(" + site.id + ")");
            }
            */
        optionItems.push({
          value: site.id,
          label: site.value + "(" + site.id + ")",
        });
      });
    const { sites } = this.state;

    let siteDetails = {};

    if (this.state.markers && this.state.markers[0]) {
      this.state.sites &&
        this.state.sites.map((site) => {
          if (site.id === this.state.markers[0].id) {
            siteDetails = { lat: site.lat, lng: site.lng };
          }
        });
    } else if (this.state.bl_markers && this.state.bl_markers[0]) {
      this.state.sites &&
        this.state.sites.map((site) => {
          if (site.id === this.state.bl_markers[0].id) {
            siteDetails = { lat: site.lat, lng: site.lng };
          }
        });
    }

    return (
      <React.Fragment>
        <div className="page-content pb-0">
          <ToastContainer />
          <Container fluid>
            <LoadingOverlay
              active={this.state.loader}
              spinner
              text="Loading please wait..."
            >
              <SideNav
                sites={this.state.sites}
                openPopupAuto={this.openPopupAuto}
                routecodes={this.state.RouteCode}
                groupOptmiseTrips={this.groupOptmiseTrips}
                groupNextBillionsOptmiseTrips={
                  this.groupNextBillionsOptmiseTrips
                }
                handleRouteCodeChange={this.handleRouteCodeChange}
                RouteCodeArr={this.RouteCodeArr}
                selectedRouteCodeArr={this.selectedRouteCodeArr}
                selectedSitesArr={this.state.selectedSitesArr}
                selectedSite={this.state.selectedSiteValue}
                handleSiteChange={this.handleSiteChange}
                sitesArr={this.sitesArr}
                selectedDate={this.state.date}
                handleDateChange={this.handleDateChange}
                onVRhide={this.onVRhide}
                vrShow={this.state.vrShow}
                vehicleShow={this.state.vehicleShow}
                RouteoptiShow={this.state.RouteoptiShow}
                guageTrip={this.state.guageTrip}
                vehiclePanel={this.state.vehiclePanel}
                getValuestoApp={(routesSchedule, optiindex, auto) =>
                  this.getRouteSchedulerApp(routesSchedule, optiindex, auto)
                }
                tripsPanel={this.state.tripsPanel}
                refreshAllPanels={this.refreshAllPanels}
                groupOptimisation={this.groupOptimisation}
                notifySucess={this.notifySucess}
                dropsPanel={this.state.dropsPanel}
                autoGenerateTrips={this.autoGenerateTrips}
                OncheckedSameVehicles={this.OncheckedSameVehicles}
                samevehicleChecked={this.state.checkedsameVehicles}
                autoResetTrips={this.autoResetTrips}
                grouplockTrips={this.grouplockTrips}
                groupunlockTrips={this.groupunlockTrips}
                onValidateAll={this.onValidateAll}
                onDocProcessChange={this.onDocProcessChange}
                defaultprocessDocs={this.state.defaultdocprocess}
                handleCodeExecution={this.handleCodeExecution}
                oldCode={this.state.codeExecution}
              ></SideNav>
              <section style={{ display: this.state.vehicleShow }}>
                <Row className="mt-3">
                  <Col xs="12">
                    <Row>
                      <MiniWidgets topDetails={this.state.topDetails} />
                    </Row>
                  </Col>

                  <Col md="6">
                    <VehiclePanel
                      curVehiclePanel={this.state.vehiclePanel}
                      handleDragStart={this.handleDragStart}
                      allAllowedDrivers={this.state.allAllowedDrivers}
                      vehicleDropped={this.state.vehicleDropped}
                      allowedDrivers={this.state.allowedDrivers}
                      allowedTrailers={this.state.allowedTrailers}
                      allAllowedTrailers={this.state.allAllowedTrailers}
                      searchVeh={this.state.searchVString}
                      searchTra={this.state.searchTString}
                      searchEqu={this.state.searchEString}
                      searchDrv={this.state.searchDString}
                      updateVehSearchTerm={this.updateVehSearchTerm}
                      updateTrailSearchTerm={this.updateTrailSearchTerm}
                      updateDriverSearchTerm={this.updateDriverSearchTerm}
                      updateEquSearchTerm={this.updateEquSearchTerm}
                      sortEquipement={this.sortEquipement}
                      equpOrder={this.state.equpOrder}
                      sortDriver={this.sortDriver}
                      diverOrder={this.state.diverOrder}
                      sortVehicles={this.sortVehicles}
                      vehOrder={this.state.vehOrder}
                      sortTrailer={this.sortTrailer}
                      trailOrder={this.state.trailOrder}
                    />
                  </Col>
                  <Col md="6">
                    <DocumentsPanel
                      checkedToPlan={this.checkedToPlan}
                      checkedInProcess={this.checkedInProcess}
                      checkedDeliverables={this.checkedDeliverables}
                      selectedRouteCodeArr={this.state.selectedRouteCodeArr}
                      checked5days={this.checked5days}
                      daysCheckedIn={this.state.checked5days}
                      dropsPanel={this.state.dropsPanel}
                      changeDate={this.changeDate}
                      trailerDropped={this.state.trailerDropped}
                      deliverySite={this.state.deliverySite}
                      droppedTrailers={this.state.droppedTrailers}
                      handleDragStart={this.handleDragStart}
                      sortPickup={this.sortPickup}
                      pickOrder={this.state.pickOrder}
                      sortDrop={this.sortDrop}
                      dropOrder={this.state.dropOrder}
                      selectedDate={this.state.dropDate}
                      updateDropSearchTerm={this.updateDropSearchTerm}
                      updatePickupSearchTerm={this.updatePickupSearchTerm}
                      searchDrp={this.state.searchDrpString}
                      searchPck={this.state.searchPckString}
                      selectedDocuments={this.state.selectedDocuments}
                    />
                  </Col>
                  <Col md="12">
                    <AddUpdateTrip1
                      isDragged={this.state.isDragged}
                      selectedDocuments={this.state.selectedDocuments}
                      dataTransfer={this.state.dataTransfer}
                      updatedArrSite={this.state.updatedArrSite}
                      confirmTrip={this.confirmTrip}
                      addGeoLocations={this.addGeoLocations}
                      addUpdateType={this.addUpdateType}
                      updatetypeTrip={this.state.updatetypeTrip}
                      clearTrips={this.state.clearTrips}
                      clearEquipments={this.clearEquipments}
                      disableDroppedDiv={this.disableDroppedDiv}
                      updateClearTripsFlag={this.updateClearTripsFlag}
                      trips={this.state.trips}
                      updateTrip={this.updateTrip}
                      updateTripCount={this.updateTripCount}
                      selectedTrips={this.state.selectedTrips}
                      toggleDetail={this.toggleDetail}
                      trailers={this.state.trailers}
                      equipments={this.state.equipments}
                      quantities={this.state.quantities}
                      updateTrialers={this.updateTrialers}
                      updateEqupments={this.updateEqupments}
                      updateQuantities={this.updateQuantities}
                      addGeoList={this.addGeoList}
                      refreshSite={this.refreshSite}
                      tripColor={this.state.tripColor}
                      tripbgColor={this.state.tripbgColor}
                      selectedTripData={this.state.selectedTripData}
                      left={this.state.left}
                      updateTripValue={this.updateTripValue}
                      updateSelectedTrip={this.updateSelectedTrip}
                      disableDivs={this.disableDivs}
                      colourDivs={this.colourDivs}
                      colourDocDivs={this.colourDocDivs}
                      notes={this.state.notes}
                      onSaveNotes={this.onSaveNotes}
                      curVehiclePanel={this.state.vehiclePanel}
                      unlockTrip={this.unlockTrip}
                      currDropsPanel={this.state.dropsPanel}
                      tripsPanel={this.state.tripsPanel}
                      addSelectedTrips={this.addSelectedTrips}
                      sites={this.state.sites}
                      selectedSitesArr={this.state.selectedSitesArr}
                      ResetUpdateTrip={this.ResetUpdateTrip}
                      filterTrans_depSite={this.filterTrans_depSite}
                      checkedTrip={this.state.checkedTrip}
                      handleArrSite={this.handleArrSite}
                      dropResetObj={this.dropResetObj}
                      updateResetTrip={this.updateResetTrip}
                      clearTrailers={this.clearTrailers}
                      enableDivs={this.enableDivs}
                      updateGeoLocations={this.updateGeoLocations}
                      selectedDocs={this.state.selectedDocuments}
                      updateSelectedDocList={this.updateSelectedDocList}
                    />
                  </Col>
                  <Col md="6">
                    <TripsList3
                      tripsList={this.state.tripsPanel}
                      onVRClick={this.onVRClick}
                      updateTripsSearchTerm={this.updateTripsSearchTerm}
                      searchTrip={this.state.searchTripString}
                      updateTripsGeoLocations={this.updateTripsGeoLocations}
                      updateTripsGeolocationbeforelock={
                        this.updateTripsGeolocationbeforelock
                      }
                      onLockRecord={this.onLockRecord}
                      vehiclePanel={this.state.vehiclePanel}
                      validate={this.validate}
                      onCompleteTripDelete={this.onCompleteTripDelete}
                      onLockRecord={this.onLockRecord}
                      date={this.state.date}
                      selectAllTripsPanel={this.selectAllTripsPanel}
                      routeSchedulerData={this.state.routeSchedulerTime}
                      UnlockConfirmTrip={this.UnlockConfirmTrip}
                      onValidateAll={this.onValidateAll}
                      onloaderMsg={this.onLoadermessage}
                      onForceseq={this.onForcesequnceCheck}
                    />
                  </Col>
                  <RouteMap1
                    markers={this.state.markers}
                    mapChanged={this.state.mapChanged}
                    updateMagChaged={this.updateMagChaged}
                    geoData={this.state.geoData}
                    tripsList={this.state.tripsPanel}
                    updateTimeLine={this.updateTimeLine}
                    onTripDelete={this.onTripDelete}
                    selectedTrips={this.state.tripsChecked}
                    IsAllTripsSelected={this.state.IsAllTripsSelected}
                    vehiclePanel={this.state.vehiclePanel}
                    trips={this.state.trips}
                    currDropsPanel={this.state.dropsPanel}
                    sites={this.state.sites}
                    onDocMsg={this.onDocmessage}
                    selectedDocuments={this.state.selectedDocuments}
                    selectedTrip={this.state.guageTrip}
                    ToPlan2TripDocuments={this.ToPlan2TripDocuments}
                  />
                </Row>
              </section>

              {/* Lvs allocation section starts form here */}
              <section style={{ display: this.state.toPickdetailsShow }}>
                <Row className="mt-3">
                  <Col xs="12">
                    <LVSToPickTabs
                      toPickDataList={this.state.toPickDataList}
                      vrdata={this.state.vrlist}
                      onHideToPickLVSShow={this.onHideToPickLVSShow}
                    />
                  </Col>
                </Row>
              </section>

              <section style={{ display: this.state.toAllocationdetailsShow }}>
                <Row className="mt-3">
                  <Col xs="12">
                    <LVSToAllocationTabs
                      toPickDataList={this.state.toAllocationDataList}
                      toStaggingLocationList={this.state.toStaggingLocationList}
                      toStaggingLocationList2={
                        this.state.toStaggingLocationList2
                      }
                      vrdata={this.state.vrlist}
                      onHideToPickLVSShow={this.onHideToPickLVSShow}
                      OnChangeFromStagginLocation={
                        this.OnChangeFromStagginLocation
                      }
                      OnChangeToStagginLocation={this.OnChangeToStagginLocation}
                      OnChangeFromStagginLocation2={
                        this.OnChangeFromStagginLocation2
                      }
                      OnChangeToStagginLocation2={
                        this.OnChangeToStagginLocation2
                      }
                      StaggingFromLoc={this.state.StaggingFromLoc}
                      StaggingFromLocIndex={this.state.StaggingFromLocIndex}
                      StaggingToLoc={this.state.StaggingToLoc}
                      StaggingToLocIndex={this.state.StaggingToLocIndex}
                      StaggingFromLoc2={this.state.StaggingFromLoc2}
                      StaggingFromLoc2Index={this.state.StaggingFromLoc2Index}
                      StaggingToLoc2={this.state.StaggingToLoc2}
                      StaggingToLoc2Index={this.state.StaggingToLoc2Index}
                      getDatabyStaggingLocations={
                        this.getDatabyStaggingLocations
                      }
                      SubmitforAllocation={this.SubmitforAllocation}
                      getLotDetailsbyProdSite={this.getLotDetailsbyProdSite}
                      toLogDataList={this.state.toLogDataList}
                      CloseLotdetails={this.CloseLotdetails}
                    />
                  </Col>
                </Row>
              </section>

              {/* Lvs allocation section ends from here */}

              <section style={{ display: this.state.vrShow }}>
                <Row className="mt-3">
                  <Col xs="12">
                    <VrHeader
                      vrdata={this.state.vrlist}
                      lvsData={this.props.loadvehstck}
                         createLVS={this.validateTrip}
                         pickTicketflg={this.state.IsPickTicket}
                      onlyReceiptflg={this.state.onlyReceiptflg}
                      ToPickData={this.ToPickData}
                      toPickDataList={this.state.toPickDataList}
                      ToAllocationData={this.ToAllocationGetData}
                      toAllocationDataList={this.state.toAllocationDataList}
                      SubmitforAllocation={this.SubmitforAllocation}
                      selectedVrValidated={this.state.selectedVrValidated}
                      confirmLVS={this.confirmLVS}
                      selectedVrIndex={this.state.selectedVrIndex}
                
                      validate={this.validate}
                      validateonly={this.validateonly}
                      loadvehstck={this.state.loadvehstock}
                      tripdetails={this.state.clickedTrips}
                      IsOnlyDeliveryflg = {this.state.IsOnlyDeliveryflg}

                      confirmLVSbyCode={this.confirmLVSbyCode}
                      ToPickDatafromVR={this.ToPickDatafromVR}
                    
                      ToAllocationGetDatafromVR={this.ToAllocationGetDatafromVR}
                      toAllocationDataList={this.state.toAllocationDataList}
                      SubmitforAllocation={this.SubmitforAllocation}
                    />
                  </Col>
                  <Col lg="12">
                    <VrStops3
                      vedetail={this.state.vrdetaillist}
                      tripdetails={this.state.clickedTrips}
                      sites={this.state.sites}
                    />
                  </Col>
                  <Col lg="12">
                    <IndividualRouteMap2
                      vrdata={this.state.vrlist}
                      markers={this.state.markers}
                      tripsList={this.state.tripsPanel}
                      siteDetails={siteDetails}
                      sites={this.state.sites}
                      bl_tripsList={this.state.bl_tripsList}
                      bl_markers={this.state.bl_markers}
                      triplock={this.state.triplock}
                    />
                  </Col>
                  <Col md="12">
                    <VrTotals
                      vrdata={this.state.vrlist}
                      vedetail={this.state.vrdetaillist}
                      tripdetails={this.state.clickedTrips}
                      sites={this.state.sites}
                    />
                  </Col>
                </Row>
              </section>
            </LoadingOverlay>
          </Container>
          <div
            className={`detail-sidebar ${this.state.isDetail ? "open" : ""}`}
          >
            <Timeline
              sites={this.state.sites}
              date={moment.tz(this.state.date, "").format("YYYY-MM-DD")}
              RouteoptiShow={this.state.RouteoptiShow}
              data={this.state.guageTrip}
              selectedSite={this.Timeline_SelectedSite}
              vehiclePanel={this.state.vehiclePanel}
              getValues={(routesSchedule, optiindex, auto) =>
                this.getRouteSchedulerApp(routesSchedule, optiindex, auto)
              }
              tripsPanel={this.state.tripsPanel}
              toggleDetail={this.toggleDetail}
              codeExecution={this.state.codeExecution}
              manualNextBillions={this.manualNextBillions}
            />
          </div>
          <Modal isOpen={this.state.modal_standard} toggle={this.tog_standard}>
            <ModalHeader
              toggle={() => this.setState({ modal_standard: false })}
            >
              Message
            </ModalHeader>
            <ModalBody>
              <div className="table-responsive">
                <FormGroup>
                  <Input type="textarea" name="message" rows="8" />
                </FormGroup>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                onClick={this.tog_standard}
                color="light"
                className="waves-effect"
              >
                Close
              </Button>
              <Button
                type="button"
                color="primary"
                className="waves-effect waves-light"
              >
                Save
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <Alert
          show={this.state.addAlertShow}
          onHide={addAlertClose}
          errorMessage={this.state.errorMessage}
        ></Alert>
        <AlertSummary
          show={this.state.addAlertSummaryShow}
          onHide={addAlertSummaryClose}
          errorArrayMessage={this.state.errorArrayMessage}
          errorSummartMessage={this.state.errorSummartMessage}
        ></AlertSummary>
        <AlertArray
          show={this.state.addAlertArrayShow}
          onHide={addAlertArrayClose}
          errorArrayMessage={this.state.errorArrayMessage}
        ></AlertArray>
        <AutoOptimizationPopup
          vehicles={this.state.vehiclePanel.vehicles}
          dropsPanel={this.state.dropsPanel}
          drivers={this.state.vehiclePanel.drivers}
          routecodes={this.state.RouteCode}
          modalState={this.state.openAutoPopup}
          autofromselection={this.autofromselection}
          autofromselection_nextBilloins={this.autofromselection_nextBilloins}
          openPopupAuto={this.openPopupAuto}
          codeExecution={this.state.codeExecution}
            docsStartDate={this.state.docsStartDate}
                    docsEndDate={this.state.docsEndDate}
                    documentsDateRange={this.documentsDateRange}
        />
      </React.Fragment>
    );
  }
}

export default Dashboard;
