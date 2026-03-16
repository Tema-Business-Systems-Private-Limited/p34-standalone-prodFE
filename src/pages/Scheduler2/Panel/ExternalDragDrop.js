import { render } from "react-dom";
import {
  convertHrToSec,
  formatTime,
  formatHHMM,
  splitTime,
  convertHrToMin,
} from "../converterFunctions/converterFunctions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import lateIcon from "./images/delay.png";
import notintime from "./images/delay.png";
import notokay from "./images/not_ok.png";
import ontime from "./images/on-time-4.png";
import IconButton from "@mui/material/IconButton";
import React, { Component } from "react";
import { green, orange } from "@mui/material/colors";
import moment from "moment";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeFilledTwoToneIcon from "@mui/icons-material/AccessTimeFilledTwoTone";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import StartIcon from "@mui/icons-material/Start";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import RedoIcon from "@mui/icons-material/Redo";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ProgressBarOuter from "./ProgressBarOuter";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "../dashboard.scss";
import DisplayInformationIconDetails1 from "./DisplayInformationIconDetails1";
import {
  ScheduleComponent,
  ResourcesDirective,
  CellClickEventArgs,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
  Inject,
  TimelineViews,
  Resize,
  DragAndDrop,
  TimelineMonth,
} from "@syncfusion/ej2-react-schedule";
import EditorTemp from "./EditorTemp.js";
import {
  TreeViewComponent,
  DragAndDropEventArgs,
} from "@syncfusion/ej2-react-navigations";
import dataSource from "./datasource.js";
import {
  extend,
  Draggable,
  Droppable,
  loadCldr,
  L10n,
} from "@syncfusion/ej2-base";
import Confirm from "./Confirm";
import ConfirmRouteCode from "./ConfirmRouteCode";
import Alert from "./Alert";
import * as numberingSystems from "./Jsonfile/numberingSystems.json";
import * as gregorian from "./Jsonfile/ca-gregorian.json";
import * as numbers from "./Jsonfile/numbers.json";
import * as timeZoneNames from "./Jsonfile/timeZoneNames.json";
import locale from "./Jsonfile/locale.json";
/**
 * schedule resources group-editing sample
 */
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
L10n.load(locale);
class ExternalDragDrop extends Component {
  constructor(props) {
    super(props);
    this.dragOver = this.dragOver.bind(this);
    this.scheduleObj = this.props.ref;
    this.drop = this.drop.bind(this);
    this.state = {
      isTreeItemDropped: false,
      isDropped: false,
      draggedItemId: "",
      showEditorTemplate: false,
      EditorData: "",
      addInfoShow: false,
      speciality: "",
      clickedVeh: "",
      addConfirmShow: false,
      addRouteCodeConfirmShow: false,
      droppedData: [],

      droppedIndex: 0,
      addAlertShow: false,
      errorMessage: "",
      errorType: "",
      error: false,

      droppedCellData: {},
      droppedEvent: {},
      confirmMessage: "",
      EventDraggedData: "",
      data: dataSource.hospitalData,

      driverData: [
        {
          Text: "OLIVIER LE HO",
          Id: 1,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "1104",
        },
        {
          Text: "CHRISTIAN LEMEE",
          Id: 2,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "1124",
        },
        {
          Text: "SYLVAIN LE GUEVOUT",
          Id: 3,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "1578",
        },
        {
          Text: "OLLIVAUX HERVE",
          Id: 4,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "1025",
        },
        {
          Text: "LAURENT NEVO",
          Id: 5,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "2452",
        },
        {
          Text: "Henry",
          Id: 6,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "1489",
        },
        {
          Text: "LE MEE CHRISTIAN",
          Id: 7,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "1921",
        },
      ],

      consultantData: [
        {
          Text: "GFP885D0P",
          Id: 1,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "FP885DP",
        },
        {
          Text: "FP885DPGY",
          Id: 2,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "FP-885-DPWE",
        },
        {
          Text: "RTY675E43",
          Id: 3,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "RTY675E4312",
        },
        {
          Text: "FP885DP02",
          Id: 4,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "FP-885-DPWE02",
        },
        {
          Text: "KAKV06",
          Id: 5,
          GroupId: 1,
          Color: "#5664d2",
          Designation: "KAKV06",
        },
        {
          Text: "V00001",
          Id: 6,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "EL-719-WFRP1",
        },
        {
          Text: "V00002",
          Id: 7,
          GroupId: 2,
          Color: "#5664d2",
          Designation: "EL-719-WFRP1",
        },
      ],
    };
  }

  getConsultantName(value) {
    return (
      <span
        style={{ cursor: "pointer", paddingLeft: "10%", color: "#2952a3" }}
        onClick={() => this.onInfoClick(value)}
      >
        {value.resourceData[value.resource.textField]}
      </span>
    );
  }

  getConsultantImage(value) {
    if (this.props.SelectedGroupBy === "Vehicles") return "truck";
    else return "driver";
  }

  showModal = (e) => {
    // console.log("e =",e)
    this.setState({
      showEditorTemplate: true,
      EditorData: e,
    });
  };

  hideModal = (e) => {
    this.setState({ showEditorTemplate: false });
  };

  onConfirmNo = () => {
    this.setState({
      addConfirmShow: false,
    });
  };

  onConfirmYes = () => {
    // this.props.onTripCreationwithDoc(this.state.EventDraggedData);
    console.log("zxcvbnmlkjhyuiop",this.state.EventDraggedData, this.state.droppedData, this.state.droppedEvent, this.state.droppedIndex, this.state.droppedCellData)
    this.draggingProcessedFurther(this.state.droppedData, this.state.droppedEvent, this.state.droppedIndex, this.state.droppedCellData);
    /* this.draggingProcessedFurtherForRouteCode(
       this.state.droppedData,
       this.state.droppedEvent,
       this.state.droppedIndex,
       this.state.droppedCellData
     );
     */
    this.setState({
      addConfirmShow: false,
    });
  };

  onRouteCodeConfirmNo = () => {
    this.setState({
      addRouteCodeConfirmShow: false,
    });
  };

  onRouteCodeConfirmYes = () => {
    //this.props.onTripCreationwithDoc(this.state.EventDraggedData);
    this.draggingProcessedFurther(
      this.state.droppedData,
      this.state.droppedEvent,
      this.state.droppedIndex,
      this.state.droppedCellData
    );
    this.setState({
      addRouteCodeConfirmShow: false,
    });
  };

  getConsultantDesignation(value) {
    // console.log("T444 value at designation =",value);
    // return value.resourceData.drivername;
    if (
      value.resourceData.drivername &&
      value.resourceData.drivername.length > 0
    ) {
      return value.resourceData.drivername;
    } else {
      return "-";
    }
  }

  getConsultantDesignationPlate(value) {
    // return <span style={{ cursor: 'pointer', paddingLeft : '10%' , color : "#2952a3"  }} >{value.resourceData[value.resource.name]}</span>;

    return value.resourceData.name;
  }

  getConsultantDesignationRoute(value) {
    return value.resourceData.routeCodeDesc;
  }

  onInfoClick = (value) => {
    let currunit = "",
      distunits = "",
      weiunits = "",
      volunits = "";
    var selsite = this.props.selectedSite;

    // console.log(selsite,"this is selected site unit checking")
    let site=this.props.sites[0];
    currunit = site.cur;
    distunits = site.distunit;
    weiunits = site.massunit;
    volunits = site.volunit;

    let data = value.resourceData;
    console.log(value ,"this is data checking 315")
    var lng = localStorage.getItem("lng");
    let costunits;
    if (currunit == "USD") {
      costunits = "USD";
      // distunits = 'Miles'
    } else if (currunit == "EUR") {
      costunits = "€";
      //  distunits = 'Kms'
    } else {
      costunits = currunit;
    }

    let length = data.length && data.length + "cm, ";
    let width = data.width && data.width + "cm, ";
    let heigth = data.heigth && data.heigth + "cm";
    const vehicleDetails = {};
    vehicleDetails.VehicleNumber = data.name && data.name;
    vehicleDetails.Class = data.className && data.className;
    vehicleDetails.routeCodeDesc = data.aroutecodeDesc && data.aroutecodeDesc;
    vehicleDetails.Carrier = data.bptnum && data.bptnum;
    vehicleDetails.Trailer = data.trailer && data.trailer;
    vehicleDetails.ArrivalSite = data.startdepotn && data.startdepotn;
    vehicleDetails.DepartureSite = data.enddepotname && data.enddepotname;
    vehicleDetails.Capacity =
      data.capacities && data.capacities + " " + data.xweu;
    vehicleDetails.Volume = data.vol && data.vol + " " + data.xvol;
    vehicleDetails.MaxDistance =
      data.maxtotaldist && data.maxtotaldist + " " + data.xmaxtotaldis;
    vehicleDetails.MaxTotalTime =
      data.maxtotaltime &&
      formatTime(convertHrToSec(data.maxtotaltime)) + " Hrs";
    vehicleDetails.MaxTotalTravelTime =
      data.maxtotaltrvtime &&
      formatTime(convertHrToSec(data.maxtotaltrvtime)) + " Hrs";
    vehicleDetails.MaxOrderCount = data.maxordercnt && data.maxordercnt;
    vehicleDetails.MaxPckgCount = data.maxpalletcnt && data.maxpalletcnt;
    vehicleDetails.MaxSpeed =
      data.maxspeed && data.maxspeed + " " + distunits + "/Hr";

    vehicleDetails.Driver = data.drivername && data.drivername;
    vehicleDetails.EarliestStartTime =
      data.starttime && splitTime(data.starttime) + "  HH:MM";
    vehicleDetails.LatestStartTime =
      data.lateststarttime && splitTime(data.lateststarttime) + "  HH:MM";

    vehicleDetails.OverTimeStart =
      data.overtimestar &&
      formatTime(convertHrToSec(data.overtimestar)) + " Hrs";
    vehicleDetails.LoadingTime =
      data.startdepots && convertHrToMin(data.startdepots) + " Mins";
    vehicleDetails.OffLoadingTime =
      data.enddepotserv && convertHrToMin(data.enddepotserv) + " Mins";

    vehicleDetails.FixedCost =
      data.fixedcost && data.fixedcost + " " + costunits;
    vehicleDetails.CostPerUnitTime =
      data.costperunitt && data.costperunitt + " " + costunits;
    vehicleDetails.CostPerUnitDistance =
      data.costperunitd && data.costperunitd + " " + costunits;
    vehicleDetails.CostPerUnitOverTime =
      data.costperunito && data.costperunito + " " + costunits;

    vehicleDetails.Tailgate = data.tailGate && data.tailGate;
    vehicleDetails.Loadbay = data.loadBay && data.loadBay;
    vehicleDetails.Dimensions = length + width + heigth;

    this.setState({
      addInfoShow: true,
      speciality: vehicleDetails,
      clickedVeh: value.resourceData.codeyve,
    });
  };

  resourceHeaderTemplate(props) {

    console.log(props,"these are props 390 checking");
    return (
      <div className="template-wrap">
        <div className="specialist-category" style={{width:"200px"}}>
          <div
            style={{
              display: "grid",
              height: "inherit",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Tooltip title="Registration Plate">
              <div
                style={{
                  padding: "1%",
                  backgroundColor: "#a3c590",
                  marginTop: "3%",
                  marginRight: "5%",
                  gridColumn: "span 2",

                  borderRadius: "3px",
                }}
              >
                <span
                  onClick={() => this.onInfoClick(props)}
                  style={{
                    paddingLeft: "10px",
                    color: "#2952a3",
                    fontWeight: "500",
                    width:"100%"
                  }}
                >
                  {this.getConsultantDesignationPlate(props)}
                </span>
              </div>
            </Tooltip>
            <Tooltip title="Vehicle Class">
              <div
                style={{
                  padding: "1%",
                  backgroundColor: "#a3c590",
                  gridColumn: "span 2",
                  marginRight: "3%",
                  marginTop: "3%",

                  borderRadius: "3px",
                }}
              >
                <span style={{ paddingLeft: "10px", fontWeight: "500" }}>
                  {props.resourceData.className}{" "}
                </span>
              </div>
            </Tooltip>
            <br />
            {props.resourceData.drivername &&
              props.resourceData.drivername.length > 0 && (
                <Tooltip title="Driver Name">
                  <div
                    style={{
                      padding: "1%",
                      backgroundColor: "#00ace6",
                      height: "22px",
                      gridColumn: "span 2",
                      marginRight: "3%",
                      marginTop: "3%",

                      borderRadius: "3px",
                    }}
                  >
                    <span
                      style={{
                        paddingLeft: "10px",
                        color: "white",
                        fontWeight: "500",
                      }}
                    >
                      {this.getConsultantDesignation(props)}
                    </span>
                  </div>
                </Tooltip>
              )}
            {props.resourceData.routeCodeDesc &&
              props.resourceData.routeCodeDesc &&
              props.resourceData.routeCodeDesc.length > 0 && (
                <Tooltip title="Route Code">
                  <div
                    style={{
                      padding: "1%",
                      backgroundColor: "#000080",
                      height: "22px",
                      gridColumn: "span 2",
                      marginRight: "3%",
                      marginTop: "3%",

                      borderRadius: "3px",
                    }}
                  >
                    <span style={{ paddingLeft: "10px", color: "yellow" }}>
                      {this.getConsultantDesignationRoute(props)}
                    </span>
                  </div>
                </Tooltip>
              )}
          </div>
        </div>
      </div>
    );
  }
  treeTemplate(props) {
    return (
      <div id="waiting">
        <div id="waitdetails">
          <div id="waitlist">{props.Name}</div>
          <div id="waitcategory">
            {props.DepartmentName} - {props.Description}
          </div>
        </div>
      </div>
    );
  }
  onItemDrag(event) {
    if (this.scheduleObj.isAdaptive) {
      let classElement =
        this.scheduleObj.element.querySelector(".e-device-hover");
      if (classElement) {
        classElement.classList.remove("e-device-hover");
      }
      if (event.event.target.classList.contains("e-work-cells")) {
        // addClass([event.event.target], 'e-device-hover');
      }
    }
    if (document.body.style.cursor === "not-allowed") {
      document.body.style.cursor = "";
    }
    if (event.name === "nodeDragging") {
      let dragElementIcon = document.querySelectorAll(
        ".e-drag-item.treeview-external-drag .e-icon-expandable"
      );
      for (let i = 0; i < dragElementIcon.length; i++) {
        dragElementIcon[i].style.display = "none";
      }
    }
  }
  onActionBegin(event) {
    if (event.requestType === "eventCreate" && this.isTreeItemDropped) {
      let treeViewData = this.treeObj.fields.dataSource;
      const filteredPeople = treeViewData.filter(
        (item) => item.Id !== parseInt(this.draggedItemId, 10)
      );
      this.treeObj.fields.dataSource = filteredPeople;
      let elements = document.querySelectorAll(
        ".e-drag-item.treeview-external-drag"
      );
      for (let i = 0; i < elements.length; i++) {
        // remove(elements[i]);
      }
    }
  }
  onTreeDragStop(event) {
    let treeElement = ""; //closest(event.target, '.e-treeview');
    let classElement =
      this.scheduleObj.element.querySelector(".e-device-hover");
    if (classElement) {
      classElement.classList.remove("e-device-hover");
    }
    if (!treeElement) {
      event.cancel = true;
      let scheduleElement = ""; //closest(event.target, '.e-content-wrap');
      if (scheduleElement) {
        let treeviewData = this.treeObj.fields.dataSource;
        if (event.target.classList.contains("e-work-cells")) {
          const filteredData = treeviewData.filter(
            (item) => item.Id === parseInt(event.draggedNodeData.id, 10)
          );
          let cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(
            event.target
          );
          let resourceDetails = this.scheduleObj.getResourcesByIndex(
            cellData.groupIndex
          );
          let eventData = {
            Name: filteredData[0].Name,
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            IsAllDay: cellData.isAllDay,
            IsReadonly: true,
            Description: filteredData[0].Description,
            DepartmentID: resourceDetails.resourceData.GroupId,
            ConsultantID: resourceDetails.resourceData.Id,
          };
          this.scheduleObj.openEditor(eventData, "Add", true);
          this.isTreeItemDropped = true;
          this.draggedItemId = event.draggedNodeData.id;
        }
      }
    }
  }

  onPopupOpen = (args) => {
    if (args.type === "Editor") {
      args.cancel = true;
      this.data = args.data;
      this.showModal(args.data);
    } else {
      args.cancel = true;
    }
  };

  saveModal = (args) => {
    var app = {};
    var dialog = document.querySelector(".custom-event-editor");
    var subject = dialog.querySelector("#routeid");
    app.Subject = subject.value;
    var Vehicle = dialog.querySelector("#vehicle");
    app.Vehicle = Vehicle.value;
    var Driver = dialog.querySelector("#driver");
    app.Driver = Driver.value;
    var Status = dialog.querySelector("#sts");
    app.Status = Status.value;
    var DepSite = dialog.querySelector("#depsite");
    app.DepSite = DepSite.value;
    var ArrSite = dialog.querySelector("#arrsite");
    app.ArrSite = ArrSite.value;
    var startTime = dialog.querySelector("#StartTime").ej2_instances[0];
    app.StartTime = startTime.value;
    var endTime = dialog.querySelector("#EndTime").ej2_instances[0];
    app.EndTime = endTime.value;

    var scheduleObj = document.querySelector(".e-schedule").ej2_instances[0];
    if (this.data.Id) {
      scheduleObj.saveEvent(app);
    } else {
      scheduleObj.addEvent(app);
    }
    this.hideModal(this);
  };

  onDragStart(args) {
    args.navigation.enable = true;
  }

  onSchActionBegin(event) {
    // console.log("action begin sch event",event);
  }

  onSchActionComplete(event) {
    // console.log("action compltes sch event",event);
    if (event.requestType === "dateNavigate") {
      // console.log("schduler object =",this.scheduleObj);
      this.props.handleDateRangeChange();
    }
  }

  addcontenttoScheduler = (passeddata, event, index, cellData) => {
    // console.log("T333 at drop event - schduler_data =",passeddata);
    var data = passeddata;
    var doctype;

    if (data.doctype === "DLV" || data.doctype === "PICK") {
      doctype = "Drop";
    } else if(data.doctype === "MISCDEAD") {
      doctype = "dead";
    }else {
           doctype = "Pickup";
         }

    //    let cellData : CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
    // console.log("T111 inside cellData = ",cellData);
    let resourceDetails = this.scheduleObj.getResourcesByIndex(
      cellData.groupIndex
    );
    // add validation for the dropped document
    let dropCompatability = true;
    let error = "";


    console.log("after dragged data =", data);
    if(data.doctype === "MISCDEAD")
    {
       dropCompatability = true;
    }
    else {
    // To check vehicle and product category
    if (dropCompatability) {
      if (resourceDetails.resourceData.tclcod === "") {
        // console.log("T1111 inside tclcod is empty = ");
        dropCompatability = true;
      } else {
        // need to check the vehicle and products category compatability;
        for (var i = 0; i < data.products.length; i++) {
          if (
            resourceDetails.resourceData &&
            resourceDetails.resourceData.tclcod &&
            resourceDetails.resourceData.tclcod.includes(
              data.products[i].productCateg
            )
          ) {
            dropCompatability = true;
          } else {
            // console.log("T1111 inside prod doesn't cat = ");
            dropCompatability = false;
            error = "product";
            this.setState({
              errorType: "product",
              errorMessage:
                "Product Category is not associated with current Vehicle",
              addAlertShow: true,
              error: true,
            });
            break;
          }
        }
      }
    }
    //to  check customer compatability
    if (dropCompatability == true) {
      if (resourceDetails.resourceData.allcustomers === 2) {
        // console.log("T1111 inside all customers ");
        dropCompatability = true;
      } else {
        // console.log("T1111 inside few customers ");
        // need to check the venicle and products category compatability;
        if (
          resourceDetails.resourceData.customerlist &&
          !resourceDetails.resourceData.customerlist.includes(data.bpcode)
        ) {
          dropCompatability = false;
          // console.log("T1111 inside customer doesn't match");
          error = "customer";
          this.setState({
            errorType: "customer",
            errorMessage: "Customer is not associated with current Vehicle",
            addAlertShow: true,
            error: true,
          });
        } else {
          dropCompatability = true;
        }
      }
    }

    /*
    console.log("data at cells =", this.props.droppedEventData);
//console.log("data at cells =",this.schedulerRef.current.scheduleObj.getCurrentViewEvents());
  // to check pallet count

   let sameVehicleData = [];
   let DocumentPalletCount = 0;
   let tempddata = this.props.droppedEventData;
   for( let i12 = 0 ; i12 < this.props.droppedEventData.length > 0 ; i12++) {
        if(tempddata[i12].vehicleCode === resourceDetails.resourceData.codeyve) {
           DocumentPalletCount = DocumentPalletCount + tempddata[i12].obbject.noofpackgs;
        }
   }




console.log("T1112 inside existing document palletCount = ",DocumentPalletCount);
 console.log("T1112 inside vehicle  data = ",resourceDetails);
  console.log("T1112 inside data = ",data);
  console.log("T1112 inside existing document palletCount sum = ", parseInt(DocumentPalletCount,10) +  parseInt(data.noofpackgs,10));
        if (dropCompatability == true) {
                     if (resourceDetails.resourceData.maxpalletcnt && resourceDetails.resourceData.maxpalletcnt < data.noofpackgs ) {
                            dropCompatability = false;
                             // console.log("T1111 inside customer doesn't match");
                             error = 'pallet';
                            this.setState({
                                                       errorType : 'pallet',
                                                        errorMessage: 'Pallet Count is more for Document than Max Pallet Count for Vehicle',
                                                        addAlertShow: true,
                                                        error: true
                                                    });
                                                }
                               else {

                                   if(resourceDetails.resourceData.maxpalletcnt && resourceDetails.resourceData.maxpalletcnt <  parseInt(data.noofpackgs,10) + parseInt(DocumentPalletCount,10) ) {
                                           dropCompatability = false;
                                                                     // console.log("T1111 inside customer doesn't match");
                                                                     error = 'pallet';
                                                                    this.setState({
                                                                                               errorType : 'pallet',
                                                                                                errorMessage: 'Pallet Count is Exceded the Vehicle Max Pallet Count',
                                                                                                addAlertShow: true,
                                                                                                error: true
                                                                                            });

                                        }
                                   else {
                                    dropCompatability = true;
                                    }
                               }
                         }
*/
}

    if (dropCompatability) {
      const parseDate = new Date(Date.parse(cellData.startTime)).toString();
      const SelParsedate = moment.tz(parseDate, "").format("YYYY-MM-DD");
      let eventData: { [key: string]: Object } = {
        docnum: data.docnum,
        bpcode: data.bpcode,
        bpname: data.bpname,
        city: data.city,
        poscode: data.poscode,
        subject: data.docnum,
        optistatus: "dragged",
        obbject: data,
        docdate: SelParsedate,
        Location: data.docnum,
        docType: doctype,
        IsAllDay: false,
        IsReadonly: true,
        doctype: data.doctype,
        Description: data.bpcode + "-" + data.bpname,
        vehicleCode: resourceDetails.resourceData.codeyve,
        VehicleObject: resourceDetails.resourceData,
      };

      /*

          this.setState({
            EventDraggedData : eventData,
            addConfirmShow: true,
            confirmMessage: 'Are you sure you want  to create the trip',
        })
        */
      //    console.log("T333 after eventdata prep",  this.state.droppedEventData)
      this.scheduleObj.addEvent(eventData);
      this.props.disableDivs(index, "doc", data.docnum);
      this.props.addDAtaintoDraggedData(eventData);
    }
  };

  drop(event, eventType, args: DragAndDropEventArgs) {
    // console.log("T111 inside drop event, add ExternalDragDrop");

    var data;
    var doctype;
    data = JSON.parse(event.dataTransfer.getData("currentCard"));
    var transferedData = event.dataTransfer;
    var index = event.dataTransfer.getData("index");

    let cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(
      event.target
    );

    const parseDate1 = new Date(Date.parse(cellData.startTime)).toString();
    const SelParsedate1 = moment.tz(parseDate1, "").format("YYYY-MM-DD");

    console.log("Data pallets  cell data=", cellData);
    console.log("Data pallets  data  =", data);

    if (moment(data.docdate).format("YYYY-MM-DD") === SelParsedate1) {
      //  this.draggingProcessedFurtherForRouteCode(data, event, index, cellData);
      this.draggingProcessedFurther(data, event, index, cellData);
    } else {
      this.setState({
        droppedData: data,
        droppedIndex: index,
        droppedCellData: cellData,
        droppedEvent: event,
        addConfirmShow: true,
        confirmMessage:
          "Document date and the calendar date are different. Confirm the addition to the trip",
      });
    }
  }

  // To  Add Route Code Compatability and get confirmation if it is different
  draggingProcessedFurtherForRouteCode = (data, event, index, cellData) => {
    let tempresourceDetails = this.scheduleObj.getResourcesByIndex(
      cellData.groupIndex
    );
    let tempresourceData = tempresourceDetails.resourceData;

    if (tempresourceData.routeCodeDesc.length > 0) {
      if (data.routeCodeDesc && data.routeCodeDesc.length > 0) {
        if (tempresourceData.routeCode === data.routeCode) {
          this.draggingProcessedFurther(data, event, index, cellData);
        } else {
          this.setState({
            droppedData: data,
            droppedIndex: index,
            droppedCellData: cellData,
            droppedEvent: event,
            addRouteCodeConfirmShow: true,
            confirmMessage:
              "Document RouteCode and Vehicle Route Code is different, Do you want to proceed ?",
          });
        }
      } else {
        this.draggingProcessedFurther(data, event, index, cellData);
      }
    } else {
      this.draggingProcessedFurther(data, event, index, cellData);
    }
  };

  draggingProcessedFurther = (data, event, index, cellData) => {
    if (data.miscpickflg == 2) {
      if (data.pairedDoc != undefined && data.pairedDoc != "") {
        for (var i = 0; i < this.props.dropsPanel.length; i++) {
          if (data.pairedDoc === this.props.dropsPanel[i].docnum) {
            //currentTrip = this.props.trips;
            this.addcontenttoScheduler(
              this.props.dropsPanel[i],
              event,
              i,
              cellData
            );
            break;
          }
        }
      }
      this.addcontenttoScheduler(data, event, index, cellData);
    } else {
      if (data.pairedDoc != undefined && data.pairedDoc != "") {

        if (data.doctype === "DLV" || data.doctype === "MISCDROP") {
          for (var i = 0; i < this.props.dropsPanel.length; i++) {
            if (data.pairedDoc === this.props.dropsPanel[i].docnum) {
              this.addcontenttoScheduler(
                this.props.dropsPanel[i],
                event,
                i,
                cellData
              );
              break;
            }
          }

          this.addcontenttoScheduler(data, event, index, cellData);
        } else {
          this.addcontenttoScheduler(data, event, index, cellData);
          if (data.pairedDoc != undefined && data.pairedDoc != "") {
            for (var i = 0; i < this.props.dropsPanel.length; i++) {
              if (data.pairedDoc === this.props.dropsPanel[i].docnum) {
                this.addcontenttoScheduler(
                  this.props.dropsPanel[i],
                  event,
                  i,
                  cellData
                );
                break;
              }
            }
          }
        }



      } else {
        this.addcontenttoScheduler(data, event, index, cellData);
        // if (data.pairedDoc != undefined && data.pairedDoc != "") {
        //   for (var i = 0; i < this.props.dropsPanel.length; i++) {
        //     if (data.pairedDoc === this.props.dropsPanel[i].docnum) {
        //       this.addcontenttoScheduler(
        //         this.props.dropsPanel[i],
        //         event,
        //         i,
        //         cellData
        //       );
        //       break;
        //     }
        //   }
        // }
      }
    }
  };

  dragOver(event) {
    event.preventDefault();
  }

  GetDeliveryStatus1 = (x) => {
    switch (x) {
      case "1":
        return "Scheduled";
      case "2":
        return "On the Way";
      case "3":
        return "In-progress";
      case "4":
        return "Completed";
      case "5":
        return "Skipped";
      case "6":
        return "Re-Scheduled";
      case "7":
        return "Cancelled";
      case "8":
        return "To-Plan";
      default:
        return "To-Plan";
    }
  };

  GetRouteStatus1 = (x) => {
    switch (x) {
      case "Open":
        return "DS - Planned , RS - Open";
      case "Optimized":
        return "DS - Planned , RS - Optimized";
      case "Locked":
        return "DS - Confirmed , RS - Locked";
      case "LVS Generated":
        return "DS - Confirmed , RS - LVS Generated";
      case "LVS Confirmed":
        return "DS - Dispatched , RS -LVS Confirmed";
      case "Cancelled":
        return "RS - Cancelled";
      case "Completed":
        return "DS - Completed , RS - Completed";
      case "To Plan":
        return "DS - To Plan";
      case "Skipped":
        return "DS - Skipped";
    }
  };

  bgcolor = (type) => {
    if (type === "DLV") {
      return "#008000		";
    } else if (type === "PICK") {
      return "#000080";
    } else {
      return "#ff3d60";
    }
  };

  GetDeliveryStatus = (x) => {
    switch (x) {
      case "1":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/planned.png"
          ></img>
        );
      case "2":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/onway2.png"
          ></img>
        );
      case "3":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/inprogress.png"
          ></img>
        );
      case "4":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/completed.png"
          ></img>
        );
      case "5":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/skipped.png"
          ></img>
        );
      case "6":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/rescheduled.png"
          ></img>
        );
      case "7":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/cancelled.png"
          ></img>
        );
      case "8":
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/toPlan.png"
          ></img>
        );
      default:
        return (
          <img
            class="manImg"
            style={{ height: "30px" }}
            src="/assets/img/status/toPlan.png"
          ></img>
        );
    }
  };

  isTimeRangeWithinAnotherRange = (
    outerStartTime,
    outerEndTime,
    innerStartTime,
    innerEndTime
  ) => {
    const outerStartDate = new Date(`1970-01-01T${outerStartTime}`);
    const outerEndDate = new Date(`1970-01-01T${outerEndTime}`);
    const innerStartDate = new Date(`1970-01-01T${innerStartTime}`);
    const innerEndDate = new Date(`1970-01-01T${innerEndTime}`);

    return innerStartDate >= outerStartDate && innerEndDate <= outerEndDate;
  };

  GetTiminingWithinRange1 = (acceptedProps) => {
    let arrtime1 = acceptedProps.arvtime,
      deptime1 = acceptedProps.deptime,
      Tfromtime1,
      Ttotime1;
    let resultMatch1 = false,
      timeExist1 = true;

    if (acceptedProps.fromTime && acceptedProps.fromTime.length > 0) {
      timeExist1 = false;
      Tfromtime1 = acceptedProps.fromTime.split(" ");
      Ttotime1 = acceptedProps.toTime.split(" ");

      for (var ti1 = 0; ti1 < Tfromtime1.length; ti1++) {
        //console.log(strArray[i]);
        resultMatch1 = this.isTimeRangeWithinAnotherRange(
          Tfromtime1[ti1],
          Ttotime1[ti1],
          arrtime1,
          deptime1
        );
        if (resultMatch1 === true) break;
      }
    }

    //  resultMatch =  this.isTimeRangeWithinAnotherRange(fromtime,totime,arrtime,deptime);

    if (resultMatch1) {
      return "On Time";
    } else if (timeExist1) {
      return "On Time";
    } else {
      return "Delayed";
    }
  };

  GetTiminingWithinRange = (acceptedProps) => {
    let arrtime = acceptedProps.arvtime,
      deptime = acceptedProps.deptime,
      Tfromtime,
      Ttotime;
    let resultMatch = false,
      timeExist = true;

    if (acceptedProps.fromTime && acceptedProps.fromTime.length > 0) {
      timeExist = false;
      Tfromtime = acceptedProps.fromTime.split(" ");
      Ttotime = acceptedProps.toTime.split(" ");

      for (var ti = 0; ti < Tfromtime.length; ti++) {
        resultMatch = this.isTimeRangeWithinAnotherRange(
          Tfromtime[ti],
          Ttotime[ti],
          arrtime,
          deptime
        );
        if (resultMatch === true) break;
      }
    }

    //  resultMatch =  this.isTimeRangeWithinAnotherRange(fromtime,totime,arrtime,deptime);

    if (resultMatch) {
      return <img src={ontime} height="34" />;
    } else if (timeExist) {
      return <img src={ontime} height="34" />;
    } else {
      return <img src={notintime} style={{ paddingLeft: "20%" }} />;
    }
  };

  GetRouteStatus = (x) => {
    switch (x) {
      case "Open":
        return <CalendarMonthIcon style={{ fontSize: 32 }} />;
      case "Optimized":
        return <CalendarMonthIcon style={{ fontSize: 32 }} />;
      case "Locked":
        return <EventAvailableIcon style={{ fontSize: 32 }} />;
      case "LVS Generated":
        return <EventAvailableIcon style={{ fontSize: 32 }} />;
      case "LVS Confirmed":
        return <StartIcon style={{ fontSize: 32 }} />;
      case "Cancelled":
        return <EventBusyIcon style={{ fontSize: 32 }} />;
      case "Completed":
        return <ThumbUpAltIcon style={{ fontSize: 32 }} />;
      case "To Plan":
        return <FiberNewIcon style={{ fontSize: 32 }} />;
      case "Skipped":
        return <RedoIcon style={{ fontSize: 32 }} />;
    }
  };

  eventTemplate(props: { [key: string]: Object }): JSX.Element {
    // console.log("inside props -",props);
    return (
      <div
        className="template-wrap"
        style={{
          fontSize: "14px",
          width: "450px",
          height: "105px",
          display: "flex",
          background: this.bgcolor(props.doctype),
        }}
      >
        <div className="tooltip1" style={{ width: "10%" }}>
          {this.GetRouteStatus(props.routeStatus)}
          <span className="tooltiptext1">
            {this.GetRouteStatus1(props.routeStatus)}
          </span>
        </div>

        <div className="tooltip_time" style={{ width: "10%" }}>
          {this.GetTiminingWithinRange(props)}
          <span className="tooltiptext_time">
            {this.GetTiminingWithinRange1(props)}
          </span>
        </div>

        <div className="subject" style={{ width: "80%", wrap: "true" }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <span>{props.docnum}</span>
            <span>
              T{props.tripno} - #{props.seq}
            </span>
            <span>
              {props.arvtime} - {props.deptime}
            </span>
          </div>

          <div style={{ fontSize: "12px", paddingLeft: "10px" }}>
            {props.bpcode} - {props.bpname} - {props.city} - {props.poscode}{" "}
          </div>
        </div>
      </div>
    );
  }

  getVehicleName(value) {
    return value.resourceData
      ? value.resourceData[value.resource.textField]
      : value.resourceName;
  }
  getDrivername(value) {
    let resourceName = this.getDoctorName(value);
    return resourceName === "Will Smith"
      ? "Cardiologist"
      : resourceName === "Alice"
        ? "Neurologist"
        : "Orthopedic Surgeon";
  }

  render() {
    var lang = localStorage.getItem("i18nextLng");
    // console.log("Tvvv site values are",this.props.selectedSite);
    let loc = "";
    if (lang === "eng") {
      loc = "en";
    } else {
      loc = "en";
    }
    let addAlertClose = () => this.setState({ addAlertShow: false });
    let addInfoIconClose = () => this.setState({ addInfoShow: false });

    let filteredVehicle = [];
    this.props.vehicles &&
      this.props.vehicles.length > 0 &&
      this.props.vehicles.map((veh) => {
        if (
          this.props.selectedVehicleCodeArr &&
          this.props.selectedVehicleCodeArr.length > 0
        ) {
          if (this.props.selectedVehicleCodeArr.includes(veh.codeyve)) {
            filteredVehicle.push(veh);
          }
        }
      });

    //  route codes
    if (
      this.props.selectedRouteCodeArr &&
      this.props.selectedRouteCodeArr.length > 0
    ) {
      if (filteredVehicle.length > 0) {
        const tempfilteredVeh = filteredVehicle;
        filteredVehicle = [];

        tempfilteredVeh.map((fvel) => {
          if (this.props.selectedRouteCodeArr.includes(fvel.routeCodeDesc)) {
            filteredVehicle.push(fvel);
          }
        });
      } else {
        this.props.vehicles &&
          this.props.vehicles.length > 0 &&
          this.props.vehicles.map((actveh) => {
            if (
              this.props.selectedRouteCodeArr.includes(actveh.routeCodeDesc)
            ) {
              filteredVehicle.push(actveh);
            } else {
            }
          });
      }
    }

    const vehicles =
      filteredVehicle.length > 0
        ? filteredVehicle
        : this.props.selectedRouteCodeArr &&
          this.props.selectedRouteCodeArr.length > 0
          ? filteredVehicle
          : this.props.vehicles;
    const drivers = this.props.drivers;
    const TripsDocData = this.props.dropsPanel;

    console.log(TripsDocData, "this is dripsDocData");

    console.log(this.props.vehicles, "these are vehicles ")

    return (
      <div
        className="schedule-control-section"
        onDragOver={(evnt) => this.dragOver(evnt)}
        onDrop={(evnt) => this.drop(evnt)}
      >
        <div className="col-lg-12 control-section">
          <div className="control-wrapper drag-sample-wrapper">
            <div className="schedule-container">
              <ScheduleComponent
                allowResizing={false}
                allowDragAndDrop={false}
                locale={loc}
                actionBegin={this.onSchActionBegin.bind(this)}
                actionComplete={this.onSchActionComplete.bind(this)}
                rowAutoHeight={true}
                ref={(schedule) => (this.scheduleObj = schedule)}
                popupOpen={this.onPopupOpen.bind(this)}
                cssClass="schedule-drag-drop"
                width="100%"
                height="650px"
                selectedDate={this.props.selectedDate}
                currentView="TimelineWorkWeek"
                resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
                eventSettings={{
                  dataSource: TripsDocData,
                  template: this.eventTemplate.bind(this),
                  enableMaxHeight: false,
                  fields: {
                    id: "docnum",
                    subject: { name: "bpcode" },
                    isAllDay: false,
                    startTime: { name: "docdate" },
                    endTime: { name: "docdate" },
                    isReadonly: true,
                  },
                }}
                group={{ enableCompactView: false, resources: ["Consultants"] }}
                actionBegin={this.onActionBegin.bind(this)}
                drag={this.onItemDrag.bind(this)}
                timeScale={{ enable: false }}
              >
                <ResourcesDirective>
                  {" "}
                  <ResourceDirective
                    field="vehicleCode"
                    title="vehicleCode"
                    name="Consultants"
                    allowMultiple={false}
                    dataSource={vehicles}
                    textField="codeyve"
                    idField="codeyve"
                    groupIDField="GroupId"
                    colorField={this.bgcolor("doctype")}
                  ></ResourceDirective>
                </ResourcesDirective>
                <ViewsDirective>
                  <ViewDirective option="TimelineDay" />
                  <ViewDirective
                    option="TimelineWorkWeek"
                    displayName="Week"
                    allowVirtualScrolling={true}
                  />
                  <ViewDirective
                    option="TimelineMonth"
                    allowVirtualScrolling={true}
                  />
                </ViewsDirective>
                <Inject
                  services={[TimelineViews, TimelineMonth, Resize, DragAndDrop]}
                />
              </ScheduleComponent>
            </div>
            {this.state.showEditorTemplate && (
              <EditorTemp
                onClose={this.hideModal}
                onSave={this.saveModal}
                onCreated={this.onCreated}
                SelectedDocData={this.state.EditorData}
              />
            )}
          </div>
          <Confirm
            show={this.state.addConfirmShow}
            onHide={this.onConfirmNo}
            confirmTrip={this.onConfirmYes}
            confirmMessage={this.state.confirmMessage}
          ></Confirm>
          <ConfirmRouteCode
            show={this.state.addRouteCodeConfirmShow}
            onHide={this.onRouteCodeConfirmNo}
            confirmTrip={this.onRouteCodeConfirmYes}
            confirmMessage={this.state.confirmMessage}
          ></ConfirmRouteCode>

          <DisplayInformationIconDetails1
            show={this.state.addInfoShow}
            onInfoIconHide={addInfoIconClose}
            data={this.state.speciality}
            vehicle={this.state.clickedVeh}
            dataName="vinfo"
            dataType="object"
          ></DisplayInformationIconDetails1>
          <Alert
            show={this.state.addAlertShow}
            onHide={addAlertClose}
            errorMessage={this.state.errorMessage}
          ></Alert>
        </div>
      </div>
    );
  }
}
const ScheduleTrips = React.forwardRef((props, ref) => (
  <ExternalDragDrop {...props} ref={ref} />
));
export default ScheduleTrips;
