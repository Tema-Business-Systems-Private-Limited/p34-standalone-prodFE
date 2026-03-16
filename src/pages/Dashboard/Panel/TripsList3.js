import React from "react";
import moment from "moment";
import Alert from "./Alert";
import LockConfirm from "./LockConfirm";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import UnlockConfirm from "./UnlockConfirm";
import DeleteConfirm from "./DeleteConfirm";
import ValidateConfirm from "./ValidateConfirm";
import DisplayLoaderNotes from "./DisplayLoaderNotes";
import GroupValidateConfirm from "./GroupValidateConfirm";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import Checkbox from "@material-ui/core/Checkbox";
import LockRounded from "@material-ui/icons/LockRounded";
import DisplayEquipments from "./DisplayEquipments";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DisplayTripLogs from "./DisplayTripLogs";
import DisplayTrailers from "./DisplayTrailers";
import { withNamespaces } from "react-i18next";
import SvgIcon from "@material-ui/core/SvgIcon";
import { FormControl, InputLabel, Select, ListItemText, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  convertHrToSec,
  convertMinToSec,
  formatTime,
  nullAndNanChecking,
  splitTime,
} from "../converterFunctions/converterFunctions";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
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

class TripsList3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialRender: true,
      addConfirmShow: false,
      addEquipmentShow: false,
      showLogs: false,
      addTrailShow: false,
      addAlertShow: false,
      errorMessage: "",
      error: false,
      index: -1,
      docnum: "",
      confirmMessage: "",
      equipments: [],
      logs: [],
      trailers: [],
      lockButton: false,
      addunlockconfirmShow: false,
      addvalidateconfirmShow: false,
      addgroupvalidateconfirmShow: false,
      addDeleteconfirmShow: false,
      enableValidateAll: false,
      anchorEl: null,
      enableDocumnetMsgWindow: false,
      Seletedtripindex: "",
      loaderMessage: "",
      selectedStatuses: [],
      // sorting state
      sortField: null,
      sortOrder: "asc", // or 'desc'
    };
  }

  statusOptions = [
    "Open",
    "Optimized",
    "Locked",
    "Loaded",
    "Confirmed",
    "Trip Completed",
    "Unloaded in Stage Location",
    "Returned",
    "Checked-In",
    "Loads in Completed",
    "Counts In Process",
    "Cashier Reconcillation Completed",
    "Route Settled",
    "To Allocate",
    "Detail Allocated",
    "To Pick",
    "Pick Complete",
    "Supervisor Verified",
    "Pick Reconciled",
    "Picking",
    "Picking Stopped",
    "Ready To Load",
    "Partial Detail Allocation",
    "To Pick*"
  ];

  componentDidMount() {
    this.setState({ isInitialRender: false });
  }

  ListofDlv(DocList) {
    if (!DocList || !Array.isArray(DocList) || DocList.length === 0) {
      return null;
    }

    return (
      <table>
        <tbody>
          {DocList.map((doc, i) => (
            <tr key={i}>
              <td>{doc.documentNo}</td>
              <td>{doc.documentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }



  /*************************
   * Sorting helpers
   *************************/
  setSort = (field) => {
    this.setState((prev) => {
      if (prev.sortField === field) {
        // toggle
        return { sortOrder: prev.sortOrder === "asc" ? "desc" : "asc", sortField: field };
      }
      return { sortField: field, sortOrder: "asc" };
    });
  };

  // helper to render sort symbol, shows default symbol when not sorted
  renderSortSymbol = (field) => {
    const { sortField, sortOrder } = this.state;
    if (sortField === field) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "⇅";
  };

  // derive a sortable value for a given trip and field
  getSortValue = (trip, field) => {
    if (!trip) return "";
    switch (field) {
      case "itemCode":
        return trip.itemCode || "";
      case "trips":
        return Number(trip.trips) || 0;
      case "code":
        return trip.code || "";
      case "routeStatus":
        return trip.routeStatus || "";
      case "lock":
        return trip.lock ? 1 : 0;
      case "tmsValidated":
        return trip.tmsValidated ? 1 : 0;
      case "pendingDocStatus":
        return trip.pendingDocStatus || "";
      case "driverName":
        return (trip.driverName && trip.driverName !== "null") ? trip.driverName : "";
      case "depSite":
        return trip.depSite || "";
      case "arrSite":
        return trip.arrSite || "";
      case "startTime":
        // setStartTime returns a formatted time string; we parse to minutes since midnight
        try {
          const t = this.setStartTime(trip); // e.g. "08:30"
          if (!t) return -1;
          const parts = String(t).split(":");
          return Number(parts[0] || 0) * 60 + Number(parts[1] || 0);
        } catch (e) {
          return -1;
        }
      case "endTime":
        try {
          const et = trip.endTime || "";
          if (!et) return -1;
          const parts = String(et).split(":");
          return Number(parts[0] || 0) * 60 + Number(parts[1] || 0);
        } catch (e) {
          return -1;
        }
      case "totalWeight":
        return parseFloat(trip.totalWeight) || 0;
      case "totalVolume":
        return parseFloat(trip.totalVolume) || 0;
      case "weightPercentage":
        return parseFloat(trip.weightPercentage) || 0;
      case "volumePercentage":
        return parseFloat(trip.volumePercentage) || 0;
      case "pickups":
        return Number(trip.pickups) || 0;
      case "drops":
        return Number(trip.drops) || 0;
      case "totalCases":
        return parseFloat(trip.totalCases) || 0;
      case "stops":
        return Number(trip.stops) || 0;
      default:
        return trip[field] || "";
    }
  };

  compareTrips = (a, b) => {
    const { sortField, sortOrder } = this.state;
    if (!sortField) return 0;
    const va = this.getSortValue(a, sortField);
    const vb = this.getSortValue(b, sortField);

    // number comparison if both are numbers
    if (typeof va === "number" && typeof vb === "number") {
      return sortOrder === "asc" ? va - vb : vb - va;
    }

    // fallback to string comparison
    const sa = String(va || "").toLowerCase();
    const sb = String(vb || "").toLowerCase();
    if (sa < sb) return sortOrder === "asc" ? -1 : 1;
    if (sa > sb) return sortOrder === "asc" ? 1 : -1;
    return 0;
  };

  /*************************/

  handleCheckboxChange = (i, event) => {
    if (this.state.isInitialRender) return;

    this.props.updateTripsGeoLocations(i);
  };

  OnValidateTrip = (index) => {
    this.setState({
      confirmMessage: this.props.t("Validconfirm"),
      addvalidateconfirmShow: true,
      index: index,
    });
  };

  onValidateNo = () => {
    this.setState({
      addvalidateconfirmShow: false,
    });
  };

  onValidateYes = (index) => {
    this.props.validate(index);
    this.setState({
      addvalidateconfirmShow: false,
    });
  };

  OnGroupValidateTrips = () => {
    this.setState({
      confirmMessage: this.props.t("AllValidate"),
      addgroupvalidateconfirmShow: true,
    });
  };

  onGroupValidateNo = () => {
    this.setState({
      addgroupvalidateconfirmShow: false,
    });
  };

  onGroupValidateYes = () => {
    this.props.onValidateAll();
    this.setState({
      addgroupvalidateconfirmShow: false,
    });
  };

  notifyError = (message) => toast.error(message, { autoClose: 3000, style: { zIndex: 1050 } })

  onConfirmClick = (indexOrKey, opti, lock) => {
    const index = typeof indexOrKey === 'number' ? indexOrKey : this.resolveIndex(indexOrKey);
    const trips = this.props.tripsList;
    const clickedTrip = trips[index];
    if (this.props.isTripModified) {
      this.notifyError('Please confirm the modified trip prior to locking in order to save the changes.')
      return;
    }
    if (clickedTrip.driverId == " " || clickedTrip.driverId == "null" || clickedTrip.driverId == "") {
      this.setState({ errorMessage: "Please add a driver before proceeding.", addAlertShow: true });
      return;
    }

    if (lock) {
      if (clickedTrip.tmsValidated) {
        this.setState({ errorMessage: this.props.t("validatedTrip"), addAlertShow: true });
      } else {
        this.setState({ confirmMessage: this.props.t("unlockTrip"), addunlockconfirmShow: true, index });
      }
    } else {
      if (opti === "Optimized") {
        this.setState({ confirmMessage: this.props.t("lockTrip"), addConfirmShow: true, index, lockButton: false });
      } else {
        this.setState({ confirmMessage: this.props.t("optimizelocking"), lockButton: true, addConfirmShow: true, index });
      }
    }
  };

  onConfirmNo = () => {
    this.setState({
      addConfirmShow: false,
    });
  };

  SearchDrops = (e) => {
    this.props.updateTripsSearchTerm(e);
  };

  onConfirmYes = (index) => {
    this.props.onLockRecord(index);
    this.setState({
      addConfirmShow: false,
    });
  };

  onUnlockNo = () => {
    this.setState({
      addunlockconfirmShow: false,
    });
  };

  onUnlockYes = (index) => {
    var trips = this.props.tripsList;
    var clickedTrip = trips[index];
    this.props.UnlockConfirmTrip(clickedTrip);
    this.setState({
      addunlockconfirmShow: false,
    });
  };

  onEquipmentClick = (equipment) => {
    this.setState({
      addEquipmentShow: true,
      equipments: equipment,
    });
  };

  onTriplogClick = (totobject) => {
    this.setState({
      showLogs: true,
      logs: totobject,
    });
  };

  onTrailerClick = (trailer) => {
    this.setState({
      addTrailShow: true,
      trailers: trailer,
    });
  };

  getVRNumber = (count, currDate, site) => {
    var number = count > 9 ? "0" + (count + 1) : "00" + (count + 1);
    return "WVR-" + currDate + "-" + site + "-" + number;
  };


  getLockData = (lock, itemCode, opti) => {
    const onClick = () => this.onConfirmClick(itemCode, opti, lock);
    return lock ? (
      <span onClick={onClick}>
        <LockRounded style={{ fontSize: 22 }} />
        <SvgIcon><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" /></SvgIcon>
      </span>
    ) : (
      <span onClick={onClick}>
        <LockOpenRoundedIcon color="primary" style={{ fontSize: 22 }} />
        <SvgIcon><path d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" /></SvgIcon>
      </span>
    );
  };

  resolveIndex = (itemCode) =>
    this.props.tripsList.findIndex(t => t.itemCode === itemCode);

  getVRdetailBtnClick(lock, i, itemCode, tmsValidated) {
    if (lock) {
      this.props.onVRClick(i, itemCode, tmsValidated);
    } else {
      this.props.updateTripsGeolocationbeforelock(i, itemCode);
    }
  }


  getVrDetailsLink(lock, filteredIndex, tmsValidated, itemCode) {
    return (
      <a href="#" onClick={() => this.getVRdetailBtnClick(lock, filteredIndex, itemCode, tmsValidated)}>
        <i className="fa fa-info-circle fa-lg" aria-hidden="true"></i>
      </a>
    );
  }

  getVRdetailBtnClick = (lock, _filteredIndex, itemCode, tmsValidated) => {
    const index = this.resolveIndex(itemCode);
    if (index < 0) return;

    if (lock) {
      this.props.onVRClick(index, tmsValidated);
    } else {
      this.props.updateTripsGeolocationbeforelock(index);
    }
  };

  getValidatebtn(valid, lock, itemCode, docStatus) {
    if (!valid && lock) {
      return (
        <a href="#" onClick={() => this.CheckDocumentStatuForValidation(itemCode, docStatus)}>
          <i className="fas fa-check-circle" aria-hidden="true"></i>
        </a>
      );
    }
  }

  CheckDocumentStatuForValidation = (itemCode, docStatus) => {
    this.CheckValiationStatus(itemCode);
  };

  CheckValiationStatus = (indexOrKey) => {
    const index = typeof indexOrKey === 'number' ? indexOrKey : this.resolveIndex(indexOrKey);
    const Trips = this.props.tripsList;
    let vflag = true;

    Trips.forEach((trip, i) => {
      if (i <= index) {
        if (trip.code == Trips[index].code) {
          if (trip.trips < Trips[index].trips && trip.tmsValidated == false) {
            vflag = false;
          }
        }
      }
    });

    if (vflag) {
      this.OnValidateTrip(index);
    } else {
      this.setState({ errorMessage: "A previous trip for this vehicle has not been validated.", addAlertShow: true });
    }
  };

  onConfirmDeleteClick = (itemCode, tripcode) => {
    this.setState({
      addDeleteconfirmShow: true,
      confirmMessage: 'Are you sure you want to delete the trip?',
      index: this.resolveIndex(itemCode),   // store original index
      tripcode,
    });
  };

  onConfirmDeleteYes = (index, docnum) => {
    this.props.onCompleteTripDelete(index, docnum);
    this.setState({ addDeleteconfirmShow: false });
  };

  onConfirmDeleteNo = () => {
    this.setState({
      addDeleteconfirmShow: false,
    });
  };

  CheckValiationStatus(index) {
    var vflag = true;
    var Trips = this.props.tripsList;
    Trips.map((trip, i) => {
      if (i <= index) {
        if (trip.code == Trips[index].code) {
          if (trip.trips < Trips[index].trips && trip.tmsValidated == false) {
            vflag = false;
          }
        }
      }
    });
    if (vflag) {
      this.OnValidateTrip(index);
    } else {
      this.setState({
        errorMessage: "A previous trip for this vehicle has not been validated.",
        addAlertShow: true,
      });
    }
  }

  getBgcolor(t) {
    let color = "";
    let breakCondition = false;
    this.props.vehiclePanel.vehicles.map((vehicle) => {
      if (vehicle.codeyve === t && !breakCondition) {
        var myStr = vehicle.color;
        var subStr = myStr.match("background-color:(.*)");
        color = subStr[1];
        breakCondition = true;
      }
    });
    return color;
  }

  displayEquipments = (trip) => {
    let equpQuantity = 0;
    if (trip.equipmentObject.length > 0) {
      equpQuantity = trip.equipmentObject
        .map((item) => item.quantity)
        .reduce((prev, next) => Number(prev) + Number(next));
    }
    return equpQuantity;
  };

  selectAllTripsPanel = () => {
    this.props.selectAllTripsPanel();
    this.setState({ enableValidateAll: !this.state.enableValidateAll });
  };

  ForcedSequnce = (i, event) => {
    //this.props.ForcedSequnce(i);
  };

  checkForceSeq = (index, check) => {
    let updatedflg;
    if (check) {
      updatedflg = false;
    } else {
      updatedflg = true;
    }
    //  this.props.onForceseq(this.state.Seletedtripindex, updatedflg);
  };

  displayLoaderMessage = (index, msg) => {
    this.setState({
      enableloaderMsgWindow: true,
      Seletedtripindex: index,
      loaderMessage: msg,

      anchorEl: null,
    });
  };

  onSaveloaderNotes = (note) => {
    this.props.onloaderMsg(this.state.Seletedtripindex, note);
    this.setState({ enableloaderMsgWindow: false });
  };

  setStartTime(trip) {
    if (trip.optistatus === "Optimized" || trip.optistatus === "optimized") {
      return splitTime(trip.startTime);
    } else {
      let sameTrips = [];
      let loadHrs;
      if (this.props.tripsList && this.props.tripsList.length > 0) {
        this.props.tripsList.map((allTrips) => {
          if (allTrips.code === trip.code) {
            if (allTrips.optistatus === "Optimized") {
              loadHrs =
                trip.vehicleObject.enddepotserv +
                trip.vehicleObject.startdepots;
              sameTrips.push(allTrips);
            }
          }
        });
        if (sameTrips.length > 0) {
          let timeHr = sameTrips[sameTrips.length - 1].endTime.split(":")[0];
          let timeMin = sameTrips[sameTrips.length - 1].endTime.split(":")[1];
          let time =
            convertHrToSec(timeHr) +
            convertMinToSec(timeMin) +
            convertHrToSec(loadHrs);
          return formatTime(time);
        } else {
          let hr, min, loadingHrs;
          if (trip.vehicleObject.starttime.includes(':')) {
            hr = trip.vehicleObject.starttime.split(':')[0];
            min = trip.vehicleObject.starttime.split(':')[1];
          } else if (trip.vehicleObject.starttime.length === 4) {
            hr = trip.vehicleObject.starttime.substring(0, 2);
            min = trip.vehicleObject.starttime.substring(2, 4);
          }
          loadingHrs = trip.vehicleObject.startdepots;
          let loadingTime = this.loadingSecs(hr, min, loadingHrs);
          return loadingTime;
        }
      } else {
        let hr, min, loadingHrs;
        if (trip.vehicleObject.starttime.includes(':')) {
          hr = trip.vehicleObject.starttime.split(':')[0];
          min = trip.vehicleObject.starttime.split(':')[1];
        } else if (trip.vehicleObject.starttime.length === 4) {
          hr = trip.vehicleObject.starttime.substring(0, 2);
          min = trip.vehicleObject.starttime.substring(2, 4);
        }
        loadingHrs = trip.vehicleObject.startdepots;
        let loadingTime = this.loadingSecs(hr, min, loadingHrs);
        return loadingTime;
      }
    }
  }


  loadingSecs = (hr, min, loadingHrs) => {
    if (loadingHrs) {
      return formatTime(convertHrToSec(hr) + convertMinToSec(min) + convertHrToSec(loadingHrs));
    } else {
      return formatTime(convertHrToSec(hr) + convertMinToSec(min));
    }
  }

  getStatus(trip) {
    if (trip.routeStatus == "Open") {
      return (
        <span
          class="badge badge-primary text-uppercase"
          style={{ fontSize: 14 }}
        >
          {this.props.t("OPEN")}
        </span>
      );

    } else if (trip.routeStatus == "Optimized") {
      if (trip.generatedBy == "AutoScheduler" || trip.optistatus == "Auto-Optimized") {
        return (
          <span
            class="badge badge-secondary text-uppercase"
            style={{ fontSize: 14 }}
          >
            {this.props.t("AUTO OPTIMIZED")}
          </span>
        );
      } else {
        return (
          <span
            class="badge badge-secondary text-uppercase"
            style={{ fontSize: 14 }}
          >
            {this.props.t("OPTIMIZED")}
          </span>
        );
      }
    } else if (trip.routeStatus == "Locked") {
      return (
        <span class="badge badge-info text-uppercase" style={{ fontSize: 14 }}>
          {this.props.t("LOCKED")}
        </span>
      );
    } else if (trip.routeStatus == "To Load") {
      return (
        <span class="badge badge-dark text-uppercase" style={{ fontSize: 14 }}>
          {this.props.t("TO LOAD")}
        </span>
      );
    } else if (trip.routeStatus == "Confirmed") {
      return (
        <span
          class="badge badge-warning text-uppercase"
          style={{ fontSize: 14 }}
        >
          {this.props.t("LOAD CONFIRMED")} {" "}
        </span>
      );
    } else if (trip.routeStatus == "Load To Truck" || trip.routeStatus == "Loaded") {
      return (
        <span
          class="badge badge-warning text-uppercase"
          style={{ fontSize: 14 }}
        >
          {this.props.t("LOADED")}
        </span>
      );
    } else if (trip.routeStatus == "Trip Completed") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          Trip Completed
        </span>
      );
    } else if (trip.routeStatus == "Unloaded") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          UNLOADED
        </span>
      );
    } else if (trip.routeStatus == "Returned") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          Returned
        </span>
      );
    } else if (trip.routeStatus == "All") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          ALL
        </span>
      );
    } else if (trip.routeStatus == "Checked-In") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          Checked In
        </span>
      );
    } else if (trip.routeStatus == "Checked-Out") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          Checked Out
        </span>
      );
    }
    else if (trip.routeStatus == "To Allocate") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          To Allocate
        </span>
      );
    }
    else if (trip.routeStatus == "Pick Complete") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          Pick Complete
        </span>
      );
    }
    else if (trip.routeStatus == "To Pick") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          To Pick
        </span>
      );
    }
    else if (trip.routeStatus == "Supervisor Verified") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          Supervisor Verified
        </span>
      );
    }
    else if (trip.routeStatus == "Loads In Reconciled") {
      return (
        <span
          class="badge badge-success text-uppercase"
          style={{ fontSize: 14 }}
        >
          Loads In Reconciled
        </span>
      );
    }
    else {
      return (
        <span class="badge badge-dark text-uppercase" style={{ fontSize: 14 }}>
          {trip.routeStatus}
        </span>
      );
    }
  }

  handleStatusFilterChange = (event) => {
    const { value } = event.target;
    this.setState({
      selectedStatuses: typeof value === "string" ? value.split(",") : value,
    });
  };


  render() {
    let filterTrips;
    const currDate = moment(this.props.date).format("YYMMDD");
    let addEquipmentClose = () => this.setState({ addEquipmentShow: false });
    let addTrailClose = () => this.setState({ addTrailShow: false });
    let addAlertClose = () => this.setState({ addAlertShow: false });
    let addLogsClose = () => this.setState({ showLogs: false });
    let addLoaderClose = () => this.setState({ enableloaderMsgWindow: false });



    if (this.props.tripsList) {
      filterTrips = this.props.tripsList?.filter((trip) => {
        const search = this.props.searchTrip.toLowerCase().trim();

        const matchesSearch =
          trip.code?.toLowerCase().includes(search) ||
          trip.itemCode?.toLowerCase().includes(search) ||
          (trip.driverId && trip.driverId.toLowerCase().includes(search)) ||
          (trip.driverName && trip.driverName.toLowerCase().includes(search)) ||
          (trip.routeStatus && trip.routeStatus.toLowerCase().includes(search)) ||
          (trip.pendingDocStatus && trip.pendingDocStatus.toLowerCase().includes(search));

        const matchesStatus =
          this.props.selectedTripStatuses.length === 0 ||
          this.props.selectedTripStatuses.includes(trip.routeStatus);

        return matchesSearch && matchesStatus;
      });

      // apply sorting if set
      if (this.state.sortField) {
        filterTrips = filterTrips.slice().sort(this.compareTrips);
      }
    }


    return (
      <>
        <Card className="mb-3" style={{ height: "460px" }}>
          <CardBody className="p-2">
            <Row className="mb-2">
              <Col md="4">
                <FormGroup className="mb-0">
                  <Input
                    bsSize="sm"
                    type="search"
                    placeholder={this.props.t("SearchCaption")}
                    className="form-control"
                    onChange={this.SearchDrops}
                    value={this.props.searchTrip}
                  />
                </FormGroup>
              </Col>
              <Col md="8">
                <FormControl fullWidth size="small">
                  <InputLabel>Filter by Status</InputLabel>
                  <Select
                    multiple
                    value={this.props.selectedTripStatuses}
                    onChange={this.props.handleTripStatusFilterChange}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 250, // limit popup height
                          width: "auto",
                        },
                      },
                    }}
                    endAdornment={
                      this.props.selectedTripStatuses.length > 0 && (
                        <InputAdornment position="end" sx={{ marginRight: "10px" }}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent dropdown opening
                              this.props.clearTripStatusFilterSelections();
                            }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  >
                    {this.statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        <Checkbox checked={this.props.selectedTripStatuses.indexOf(status) > -1} />
                        <ListItemText primary={status} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              </Col>
            </Row>
            <div className="reportlist-view tablheight">
              <table className="table m-0">
                <thead>
                  <tr className="">

                    <th className="pl-2">

                    </th>
                    <th></th>
                    <th> {this.props.t("Details")}</th>
                    <th>
                      <a href="#" onClick={(e) => { e.preventDefault(); this.setSort('itemCode'); }}>
                        {this.props.t("TripCode")} {this.renderSortSymbol('itemCode')}
                      </a>
                    </th>
                    <th width="4%">
                      <a href="#" onClick={(e) => { e.preventDefault(); this.setSort('trips'); }}>
                        {this.props.t("Seq")} # {this.renderSortSymbol('trips')}
                      </a>
                    </th>
                    <th width="6%">
                      <a href="#" onClick={(e) => { e.preventDefault(); this.setSort('code'); }}>
                        {this.props.t("Vehicle")} {this.renderSortSymbol('code')}
                      </a>
                    </th>
                    <th width="4%">
                      <a href="#" onClick={(e) => { e.preventDefault(); this.setSort('routeStatus'); }}>
                        {this.props.t("Status")} {this.renderSortSymbol('routeStatus')}
                      </a>
                    </th>
                    <th width="3%">

                      {this.props.t("Lock")}

                    </th>
                    <th width="6%"> {this.props.t("Validate")}</th>
                    <th width="6%">

                      {this.props.t("Validation")}

                    </th>
                    <th>{"Document Status"} </th>
                    <th width="6%"><a href="#" onClick={(e) => { e.preventDefault(); this.setSort('driverName'); }}>{this.props.t("Driver")} {this.renderSortSymbol('driverName')}</a></th>
                    <th>{this.props.t("DepartureSite")}</th>
                    <th>{this.props.t("ArrivalSite")}</th>
                    <th width="2%"><a href="#" onClick={(e) => { e.preventDefault(); this.setSort('startTime'); }}>{this.props.t("Departure")} {this.renderSortSymbol('startTime')}</a></th>
                    <th width="2%"><a href="#" onClick={(e) => { e.preventDefault(); this.setSort('endTime'); }}>{this.props.t("Arrival")} {this.renderSortSymbol('endTime')}</a></th>
                    <th width="6%"><a href="#" onClick={(e) => { e.preventDefault(); this.setSort('totalWeight'); }}>{"Tot " + this.props.t("Weight")} {this.renderSortSymbol('totalWeight')}</a></th>
                    <th width="6%"><a href="#" onClick={(e) => { e.preventDefault(); this.setSort('totalVolume'); }}>{"Tot " + this.props.t("Volume")} {this.renderSortSymbol('totalVolume')}</a></th>
                    <th width="6%"><a href="#" onClick={(e) => { e.preventDefault(); this.setSort('weightPercentage'); }}>{"% " + this.props.t("Weight")} {this.renderSortSymbol('weightPercentage')}</a></th>
                    <th width="6%"><a href="#" onClick={(e) => { e.preventDefault(); this.setSort('volumePercentage'); }}>{"% " + this.props.t("Volume")} {this.renderSortSymbol('volumePercentage')}</a></th>
                    {/* <th width="6%">{"Pickups"}</th> */}
                    <th width="6%"><a href="#" onClick={(e) => { e.preventDefault(); this.setSort('drops'); }}>{"Deliveries"} {this.renderSortSymbol('drops')}</a></th>
                    <th width="6%"><a href="#" onClick={(e) => { e.preventDefault(); this.setSort('totalCases'); }}>{"Total Pallets"} {this.renderSortSymbol('totalCases')}</a></th>
                    <th width="6%"><a href="#" onClick={(e) => { e.preventDefault(); this.setSort('stops'); }}>{this.props.t("Stops")} {this.renderSortSymbol('stops')}</a></th>
                  </tr>
                </thead>
                <tbody>
                  {((filterTrips && filterTrips) || []).map(
                    (trip, i) => (
                      <tr
                        className="bg-blue"
                        style={{ backgroundColor: this.getBgcolor(trip.code) }}
                        key={i}
                      >

                        <td className="pl-2">
                          <input
                            type="checkbox"
                            name="tripsCheckBox"
                            checked={this.props.selectedCheckBoxes.includes(i)}
                            onChange={(e) => this.props.updateTripsGeoLocations(i, trip.itemCode)}
                          />
                        </td>
                        <td>
                          {trip.lock ? (
                            ""
                          ) : (
                            <button
                              className="btn btn-danger btn-sm rounded-0"
                              type="button"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              onClick={() =>
                                this.onConfirmDeleteClick(trip.itemCode, trip.docnum)
                              }
                              disabled={trip.lock}
                            >
                              <i class="fa fa-trash"></i>
                            </button>
                          )}
                        </td>
                        <td>
                          {this.getVrDetailsLink(
                            trip.lock,
                            i,
                            trip.tmsValidated, trip.itemCode
                          )}
                        </td>
                        <td>
                          <span className="vid">{trip.itemCode}</span>
                        </td>
                        <td>
                          <span className="vtrips">{trip.trips}</span>
                        </td>
                        <td width="6%">
                          <b>{trip.code}</b>
                        </td>
                        <td width="4%">
                          <span style={{ fontSize: "12pt" }}>
                            {this.getStatus(trip)}
                          </span>
                        </td>
                        <td width="3%">
                          {this.getLockData(
                            trip.lock,
                            trip.itemCode,
                            trip.optistatus || "open"
                          )}
                        </td>
                        <td width="4%">
                          {this.getValidatebtn(
                            trip.tmsValidated,
                            trip.lock,
                            trip.itemCode,
                            trip.pendingDocStatus
                          )}
                        </td>
                        <td width="6%">
                          <span style={{ fontSize: "12pt" }}>
                            {(() => {
                              if (trip.tmsValidated) {
                                return this.props.t("Validated");
                              } else {
                                return this.props.t("Non Validated");
                              }
                            })()}
                          </span>{" "}
                        </td>
                        <td>
                          {trip.lock ? (
                            <div>
                              {trip.pendingDocStatus}{" "}
                              <Tooltip title={trip.docDetails ? this.ListofDlv(trip.docDetails) : ""}>
                                <IconButton>
                                  <InfoOutlinedIcon color="blue" />
                                </IconButton>
                              </Tooltip>{" "}
                            </div>
                          ) : (
                            ""
                          )}
                        </td>
                        <td width="6%">{trip.driverName === "null" ? '' : trip.driverName}</td>
                        <td>{trip.depSite}</td>
                        <td>{trip.arrSite}</td>

                        <td width="2%">{this.setStartTime(trip)}</td>
                        <td width="2%">
                          {(trip.optistatus === "Open" ||
                            trip.optistatus === "open") && !trip.lock
                            ? ""
                            : nullAndNanChecking(trip.endTime, "time")}
                        </td>
                        <td width="2%">{trip.totalWeight}</td>
                        <td width="6%">{trip.totalVolume}</td>
                        <td width="6%">{trip.weightPercentage}</td>
                        <td width="6%">{trip.volumePercentage}</td>

                        {/* <td width="2%">{trip.pickups}</td> */}
                        <td width="2%">{trip.stops}</td>
                        <td width="2%">{parseFloat(trip.totalCases).toFixed(2)} PAL</td>
                        <td width="6%">
                          <span className="">{trip.stops}</span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <LockConfirm
              show={this.state.addConfirmShow}
              onHide={this.onConfirmNo}
              lockConfirm={this.onConfirmYes}
              index={this.state.index}
              confirmMessage={this.state.confirmMessage}
              lock={this.state.lockButton}
            ></LockConfirm>
            <UnlockConfirm
              show={this.state.addunlockconfirmShow}
              onHide={this.onUnlockNo}
              unlockConfirm={this.onUnlockYes}
              index={this.state.index}
              confirmMessage={this.state.confirmMessage}
            ></UnlockConfirm>
            <ValidateConfirm
              index={this.state.index}
              show={this.state.addvalidateconfirmShow}
              onHide={this.onValidateNo}
              validateConfirm={this.onValidateYes}
              confirmMessage={this.state.confirmMessage}
            ></ValidateConfirm>
            <GroupValidateConfirm
              show={this.state.addgroupvalidateconfirmShow}
              onHide={this.onGroupValidateNo}
              onGroupValidate={this.onGroupValidateYes}
              confirmMessage={this.state.confirmMessage}
            ></GroupValidateConfirm>
            <DisplayEquipments
              show={this.state.addEquipmentShow}
              onHide={addEquipmentClose}
              equipments={this.state.equipments}
              displayEdit={false}
            ></DisplayEquipments>
            <DisplayTripLogs
              show={this.state.showLogs}
              onHide={addLogsClose}
              totObjects={this.state.logs}
              displayEdit={false}
            ></DisplayTripLogs>
            <DisplayTrailers
              show={this.state.addTrailShow}
              onHide={addTrailClose}
              trailers={this.state.trailers}
            ></DisplayTrailers>
            <Alert
              show={this.state.addAlertShow}
              onHide={addAlertClose}
              errorMessage={this.state.errorMessage}
            ></Alert>
            <DeleteConfirm
              show={this.state.addDeleteconfirmShow}
              onHide={this.onConfirmDeleteNo}
              confirmDelete={this.onConfirmDeleteYes}
              index={this.state.index}
              tripcode={this.state.tripcode}
              confirmMessage={this.state.confirmMessage}
            ></DeleteConfirm>
            <DisplayLoaderNotes
              show={this.state.enableloaderMsgWindow}
              onHide={addLoaderClose}
              notes={this.state.loaderMessage}
              onSaveloaderNotes={this.onSaveloaderNotes}
              displayEdit={true}
            ></DisplayLoaderNotes>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default withNamespaces()(TripsList3);
