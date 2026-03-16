import React, { Component } from 'react'
import Select from 'react-select'
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingOverlay from 'react-loading-overlay'
import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from './Panel/Alert'
import AlertArray from './Panel/AlertArray'
import AlertSummary from './Panel/AlertSummary'
import moment from 'moment'
import SideNav from './Nav1/SideNav'
import { fetchAPI } from '../../service'
import { fetchPanel } from '../../service'
import ConfirmToAdd from './Panel/ConfirmToAdd'
import { fetchTrips } from '../../service'
import { fetchDropsPanel } from '../../service'
import { fetchDropsPanelwithRange } from '../../service'
import { fetchVR, fetchLVS } from '../../service'
import VehiclePanel from './Panel/VehiclePanel'
import DocumentsPanel from './Panel/DocumentsPanel'
import AddUpdateTrip1 from './Panel/AddUpdateTrip1'
import TripsList3 from './Panel/TripsList3'
import VrHeader from './Panel/VrHeader'
import VrStops3 from './Panel/VrStops3'
import Timeline from './Panel/Timeline'
import RouteMap1 from './Panel/RouteMap1'
import IndividualRouteMap2 from './Panel/IndividualRouteMap2'
import VrTotals from './Panel/VrTotals'
import RouteDetails from './RouteDetail'
import './dashboard.scss'
import AutoOptimizationPopup from './Panel/AutoOptimizationPopup'
import {
  convertHrToSec,
  convertSecToMin,
  secondsToHms,
  splitTimeAndConv2Sec,
  splitTimeAndAddtimeAndConv2Sec,
  convertSecToHr,
  formatHrMin,
  convertMinToSec,
  formatTime,
  formatHHMM,
  convertHHMMtoSeconds,
  splitTime,
  convertHrToMin,
} from './converterFunctions/converterFunctions'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
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
} from 'reactstrap'
import classnames from 'classnames'

//Import Components
import MiniWidgets from './MiniWidgets'
import RouteInfoRenderer from './RouteInfoRenderer'

const optionGroup = [
  { label: 'CORPS', value: 'corps' },
  { label: 'WASTE', value: 'waste' },
]


// --------------------------------------
// SOUTH SITE CITY GROUPS
// --------------------------------------
const SOUTH_SITE_CITY_GROUPS = [
  // GROUP 1 – San Fernando Core
  [
    "SAN FERNANDO", "LA ROMAIN", "PLEASANTVILLE",
    "VISTABELLA", "PALMISTE", "COCOYEA",
    "SOUTH PARK", "TORTUGA", "CORINTH", "PALMYRA"
  ],

  // GROUP 2 – Penal / Debe Belt
  [
    "PENAL", "DEBE", "FYZABAD", "SIPARIA",
    "PALO SECO", "BARRACKPORE", "GUARACARA", "MORNE DIABLO"
  ],

  // GROUP 3 – Princes Town Region
  [
    "PRINCES TOWN", "ROUSILLAC", "TABLELAND", "AVOCAT",
    "MORUGA", "WOODLAND", "SANTA FLORA", "ESPERANCE",
    "PHILLIPINE", "GRANVILLE", "POOLE", "MAYO",
    "NEW GRANT", "TABAQUITE", "OROPOUCHE", "SOUTH OROPOUCHE"
  ],

  // GROUP 4 – South-West Peninsula
  [
    "POINT FORTIN", "LA BREA", "LOS IROS",
    "CEDROS", "ICACOS", "RANCHO QUEMADO",
    "CHATHAM", "CHATAM"
  ],

  // GROUP 5 – East / South-East
  [
    "RIO CLARO", "MAYARO", "NAVET",
    "MANZANILLA", "GUAYAGUAYARE"
  ],

  // GROUP 6 – Central-South / Industrial
  [
    "CHAGUANAS", "COUVA", "CALIFORNIA", "POINT LISAS",
    "POINTE-A-PIERRE", "WILLIAMSVILLE", "GOLCONDA",
    "MARABELLA", "GASPARILLO", "TAROUBA",
    "ST MADELEINE", "STE MADELEINE",
    "ST MARY'S", "ST.MARGARET'S", "ST JAMES",
    "CROSS CROSSING"
  ]
];


// ===============================
// NORTH SITE – CITY GROUPS
// ===============================
export const NORTH_SITE_CITY_GROUPS = [
  // 🟦 Port of Spain / West
  [
    'PORT OF SPAIN', 'WOODBROOK', 'ST JAMES', 'BELMONT',
    'ST ANN\'S', 'WESTMOORINGS', 'DIEGO MARTIN', 'CASCADES',
    'MARAVAL', 'PETIT VALLEY', 'GLENCOE', 'CARENAGE',
    'COCORITE', 'MORVANT', 'LAVENTILLE', 'MT LAMBERT'
  ],

  // 🟩 East–West Corridor
  [
    'SAN JUAN', 'EL SOCORRO', 'CHAMPS FLEURS', 'BARATARIA',
    'TACARIGUA', 'ARANGUEZ', 'CUREPE', 'ST AUGUSTINE',
    'TUNAPUNA', 'MT HOPE', 'MALONEY'
  ],

  // 🟨 Central / Chaguanas Belt
  [
    'CHAGUANAS', 'CUNUPIA', 'FREEPORT', 'CHASE VILLAGE',
    'FELICITY', 'LONGDENVILLE', 'MONTROSE', 'ENTERPRISE',
    'EDINBURGH', 'CARAPICHAIMA', 'CHARLIEVILLE', 'PREYSAL',
    'ENDEAVOUR'
  ],

  // 🟧 Arima / East
  [
    'ARIMA', 'VALSAYN', 'LOWER VALSAYN', 'ST HELENA',
    'D\'ABADIE', 'TRINCITY', 'TUNAPUNA', 'PIARCO',
    'MACOYA', 'EL DORADO', 'CARAPO', 'CUMUTO',
    'WALLERFIELD'
  ],

  // 🟥 North–East / Rural
  [
    'SANGRE GRANDE', 'VALENCIA', 'MATURA', 'TOCO',
    'BLANCHISSEUSE', 'SANTA CRUZ', 'PLUM MITAN',
    'SANGRE CHIQUITO', 'BICHE', 'GUAICO', 'TALPARO',
    'TAMANA', 'SAN RAFAEL'
  ]
];



class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.usedVehicleIds = new Set();
    this.state = {
      selectedCheckBoxes: [],
      activeTab: 'Vehicles',
      checkedToPlan: false,
      checkedDeliverables: false,
      checkedInProcess: false,
      checked5days: false,
      isDragged: false,
      breadcrumbItems: [
        { title: 'Route Planner', link: '#' },
        { title: 'Dashboard', link: '#' },
      ],
      optiError: {
        docnum: '',
        skillerrorflg: false,
        skillmessage: '',
        capacatyflg: false,
        capacityError: '',
        generalflg: false,
        genearalError: '',
      },
      isTimeline: false,
      vehicleShow: 'block',
      IsAllTripsSelected: false,
      updatetypeTrip: false,
      RouteoptiShow: 'none',
      vrShow: 'none',
      vrlist: [],
      deliverySite: '',
      loader: false,
      loaderText: 'Loading please wait...',
      addAlertShow: false,
      errorMessage: '',
      addAlertArrayShow: false,
      targetinsertedPosition: 0,
      droppedData: {},
      addConfirmToProceedShow: false,
      targettedTrip: {},
      addAlertSummaryShow: false,
      selectedTripIndex: 0,
      errorSummartMessage: '',
      errorNotesArray: '',
      processID: '',
      errorArrayMessage: '',
      searchVString: '',
      searchTripString: '',
      searchTString: '',
      searchEString: '',
      searchDString: '',
      searchDrpString: '',
      searchPckString: '',
      selectedRouteCode: {
        id: 'All',
      },
      selectedRoutecodeValue: '',
      RouteCode: null,
      selectedRouteCodeArr: [],
      triplock: false,
      panelSearchString: '',
      vrdetaillist: [],
      openAutoPopup: false,
      selectedDocuments: [],
      loadvehstock: [],
      slectedTrips: [],
      selectedTripData: {},
      checkedsameVehicles: false,
      documentPanel_date: '',
      defaultdocprocess: 90,
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
      docsStartDate: new Date(),
      docsEndDate: new Date(),
      sites: null,
      selectedSite: {
        id: 'All',
      },

      selectedSiteValue: '',
      guageTrip: {},
      selectedMultipleSites: '',
      markers: [],
      geoData: [],
      mapChanged: false,
      clearTrips: false,
      trips: [],
      isTimeline: false,
      isDetail: false,
      selectedVrIndex: '',
      selectedVrValidated: '',
      slectedTrips: [],
      clickedTrips: [],
      selectedTripData: {},
      default_date: new Date().toDateString().replace(/-/g, '/'),
      dropDate: new Date().toDateString().replace(/-/g, '/'),
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
        currentCard: '',
        type: '',
        id: '',
        index: -1,
      },
      tripColor: [
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
      ],
      tripbgColor: [
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
        '#26a541',
      ],
      pickOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      dropOrder: [-1, -1, -1, -1, -1, -1, -1, -1],
      equpOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      diverOrder: [-1, -1, -1, -1],
      vehOrder: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
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
      selectedTripStatuses: [],
      selectedSitesArr: [],
      isTripModified: false,
      reports: [
        {
          icon: 'ri-truck-line',
          background: 'bg-secondary',
          title: 'Vehicles',
          value: '0',
        },
        {
          icon: 'ri-route-line',
          background: 'bg-primary',
          title: 'Routes',
          value: '0',
        },
        {
          icon: 'ri-checkbox-circle-line',
          background: 'bg-success',
          title: 'Assigned Orders',
          value: '0',
        },
        {
          icon: 'ri-close-circle-line',
          background: 'bg-warning',
          title: 'Not Assigned Orders',
          value: '0',
        },
        {
          icon: 'ri-logout-box-r-line',
          background: 'bg-danger',
          title: 'Total Delivery Qty',
          value: '0',
        },
        {
          icon: 'ri-logout-box-line',
          background: 'bg-info',
          title: 'Total Pickup Qty',
          value: '0',
        },
      ],
      googeMapURL:
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    }
    this.toggleTab = this.toggleTab.bind(this)
    this.handleDefault = this.handleDefault.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.toggleDetail = this.toggleDetail.bind(this)
    this.tog_standard = this.tog_standard.bind(this)
    this.googleMapRef = React.createRef()
  }

  handleTripStatusFilterChange = (event) => {
    const { value } = event.target;
    this.setState({
      selectedTripStatuses: typeof value === "string" ? value.split(",") : value,
    });
  };

  clearTripStatusFilterSelections = () => {
    this.setState({ selectedTripStatuses: [] });
  };

  tog_standard() {
    this.setState((prevState) => ({
      modal_standard: !prevState.modal_standard,
    }))
    this.removeBodyCss()
  }

  removeBodyCss() {
    document.body.classList.add('no_padding')
  }

  toggleDetail(flag) {
    if (this.state.isDetail !== flag) {
      this.setState({ isDetail: flag })
    }
  }
  updateMagChaged = () => {
    this.setState({
      mapChanged: false,
    })
  }

  updateVehSearchTerm = (event) => {
    this.setState({ searchVString: event.target.value })
  }
  updateTrailSearchTerm = (event) => {
    this.setState({ searchTString: event.target.value })
  }
  updateEquSearchTerm = (event) => {
    this.setState({ searchEString: event.target.value })
  }
  updateDriverSearchTerm = (event) => {
    this.setState({ searchDString: event.target.value })
  }
  updateDropSearchTerm = (event) => {
    this.setState({ searchDrpString: event.target.value })
  }
  updatePickupSearchTerm = (event) => {
    this.setState({ searchPckString: event.target.value })
  }

  onDocmessage = (docNum, msg, Msgtype) => {
    var currentGeoData = this.state.geoData
    var currentMarkers = this.state.markers
    var trips = []
    var geoData = []
    var currMarkers = []
    var trip = this.state.trips[0]

    currentGeoData &&
      currentGeoData.map((geoData, index) => {
        if (geoData.docnum && geoData.docnum === docNum) {
          if (Msgtype === 'doc') {
            geoData.noteMessage = msg
          } else if (Msgtype === 'carrier') {
            geoData.CarrierMessage = msg
          } else {
            geoData.loaderMessage = msg
          }
        }
      })

    currentMarkers &&
      currentMarkers.map((currMarker, index) => {
        if (currMarker.docnum && currMarker.docnum === docNum) {
          currMarker.noteMessage = msg
        }
      })
    trip &&
      trip.totalObject &&
      trip.totalObject.selectedTripData &&
      trip.totalObject.selectedTripData.map((TripData) => {
        if (TripData.docnum && TripData.docnum === docNum) {
          if (Msgtype === 'doc') {
            TripData.noteMessage = msg
          } else if (Msgtype === 'carrier') {
            TripData.CarrierMessage = msg
          } else {
            TripData.LoaderMessage = msg
          }
        }
      })

    geoData.push(currentGeoData)
    currMarkers.push(currentMarkers)
    trips.push(trip)

    this.setState({
      markers: currentMarkers,
      geoData: currentGeoData,
      trips: trips,
    })
  }

  updateTripsSearchTerm = (event) => {
    this.setState({ searchTripString: event.target.value })
  }

  colourDivs = (allDrivers, dlist, allTrailers, tlist) => {
    this.setState({
      allAllowedDrivers: allDrivers,
      allAllowedTrailers: allTrailers,
      allowedDrivers: dlist,
      vehicleDropped: true,
      allowedTrailers: tlist,
    })
  }
  colourDocDivs = (drpTrailer) => {
    if (drpTrailer !== null || drpTrailer !== '') {
      this.setState({
        trailerDropped: true,
        droppedTrailers: drpTrailer,
      })
    }
  }

  setCurrentRoutecode = (selectedOption) => {
    var currSelected = {}
    this.state.RouteCode &&
      this.state.RouteCode.map((routecode) => {
        if (selectedOption[0] === routecode.routeNo) {
          currSelected = routecode
          currSelected.city = routecode.routeDesc
        }
      })
    this.setState({
      selectedRouteCode: currSelected,
      //selectedMultipleSites: selectedOption
    })
  }

  RouteCodeArr = (val) => {
    this.setCurrentRoutecode(val)
    this.setState({ selectedRouteCodeArr: val })
  }

  sortPickup = (type, index) => {
    var cusDropsPanel = this.state.dropsPanel
    var cusPick = this.state.dropsPanel.pickUps
    var picOrder = this.state.pickOrder
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0
      if ('docnum' === type) {
        cusPick.sort((a, b) => (a.docnum < b.docnum ? 1 : -1))
      }
      if ('site' === type) {
        cusPick.sort((a, b) => (a.site < b.site ? 1 : -1))
      }
      if ('bpcode' === type) {
        cusPick.sort((a, b) => (a.bpcode < b.bpcode ? 1 : -1))
      }
      if ('bpname' === type) {
        cusPick.sort((a, b) => (a.bpname < b.bpname ? 1 : -1))
      }
      if ('doctype' === type) {
        cusPick.sort((a, b) => (a.doctype < b.doctype ? 1 : -1))
      }
      if ('poscode' === type) {
        cusPick.sort((a, b) => (a.poscode < b.poscode ? 1 : -1))
      }
      if ('netweight' === type) {
        cusPick.sort((a, b) => (a.netweight < b.netweight ? 1 : -1))
      }
      if ('volume' === type) {
        cusPick.sort((a, b) => (a.volume < b.volume ? 1 : -1))
      }
      if ('vehicleCode' === type) {
        cusPick.sort((a, b) => (a.vehicleCode < b.vehicleCode ? 1 : -1))
      }
      if ('type' === type) {
        cusPick.sort((a, b) => (a.type < b.type ? 1 : -1))
      }
      if ('site' === type) {
        cusPick.sort((a, b) => (a.site < b.site ? 1 : -1))
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1
      if ('docnum' === type) {
        cusPick.sort((a, b) => (a.docnum > b.docnum ? 1 : -1))
      }
      if ('bpcode' === type) {
        cusPick.sort((a, b) => (a.bpcode > b.bpcode ? 1 : -1))
      }
      if ('bpname' === type) {
        cusPick.sort((a, b) => (a.bpname > b.bpname ? 1 : -1))
      }
      if ('doctype' === type) {
        cusPick.sort((a, b) => (a.doctype > b.doctype ? 1 : -1))
      }
      if ('poscode' === type) {
        cusPick.sort((a, b) => (a.poscode > b.poscode ? 1 : -1))
      }
      if ('netweight' === type) {
        cusPick.sort((a, b) => (a.netweight > b.netweight ? 1 : -1))
      }
      if ('volume' === type) {
        cusPick.sort((a, b) => (a.volume > b.volume ? 1 : -1))
      }
      if ('vehicleCode' === type) {
        cusPick.sort((a, b) => (a.vehicleCode > b.vehicleCode ? 1 : -1))
      }
      if ('type' === type) {
        cusPick.sort((a, b) => (a.type > b.type ? 1 : -1))
      }
      if ('site' === type) {
        cusPick.sort((a, b) => (a.site > b.site ? 1 : -1))
      }
    }
    cusDropsPanel.pickUps = cusPick
    this.setState({
      dropsPanel: cusDropsPanel,
      pickOrder: picOrder,
      mapChanged: false,
    })
  }

  // sortDrop = (type, index) => {
  //   var cusDropsPanel = this.state.dropsPanel
  //   var cusPick = this.state.dropsPanel.drops
  //   var picOrder = this.state.dropOrder
  //   if (picOrder[index] == -1 || picOrder[index] == 1) {
  //     picOrder[index] = 0
  //     if ('docnum' === type) {
  //       cusPick.sort((a, b) => (a.docnum < b.docnum ? 1 : -1))
  //     }
  //     if ('bpcode' === type) {
  //       cusPick.sort((a, b) => (a.bpcode < b.bpcode ? 1 : -1))
  //     }
  //     if ('bpname' === type) {
  //       cusPick.sort((a, b) => (a.bpname < b.bpname ? 1 : -1))
  //     }
  //     if ('doctype' === type) {
  //       cusPick.sort((a, b) => (a.doctype < b.doctype ? 1 : -1))
  //     }
  //     if ('poscode' === type) {
  //       cusPick.sort((a, b) => (a.poscode < b.poscode ? 1 : -1))
  //     }
  //     if ('netweight' === type) {
  //       cusPick.sort((a, b) => (a.netweight < b.netweight ? 1 : -1))
  //     }
  //     if ('volume' === type) {
  //       cusPick.sort((a, b) => (a.volume < b.volume ? 1 : -1))
  //     }
  //     if ('vehicleCode' === type) {
  //       cusPick.sort((a, b) => (a.vehicleCode < b.vehicleCode ? 1 : -1))
  //     }
  //     if ('type' === type) {
  //       cusPick.sort((a, b) => (a.type < b.type ? 1 : -1))
  //     }
  //     if ('site' === type) {
  //       cusPick.sort((a, b) => (a.site < b.site ? 1 : -1))
  //     }
  //           if ('routeCode' === type) {
  //       cusPick.sort((a, b) => (a.routeCode < b.routeCode ? 1 : -1))
  //     }
  //           if ('noofCases' === type) {
  //       cusPick.sort((a, b) => (a.noofCases < b.noofCases ? 1 : -1))
  //     }
  //           if ('mainCases' === type) {
  //       cusPick.sort((a, b) => (a.mainCases < b.mainCases ? 1 : -1))
  //     }
  //   } else if (picOrder[index] == 0) {
  //     picOrder[index] = 1
  //     if ('docnum' === type) {
  //       cusPick.sort((a, b) => (a.docnum > b.docnum ? 1 : -1))
  //     }
  //     if ('bpcode' === type) {
  //       cusPick.sort((a, b) => (a.bpcode > b.bpcode ? 1 : -1))
  //     }
  //     if ('bpname' === type) {
  //       cusPick.sort((a, b) => (a.bpname > b.bpname ? 1 : -1))
  //     }
  //     if ('doctype' === type) {
  //       cusPick.sort((a, b) => (a.doctype > b.doctype ? 1 : -1))
  //     }
  //     if ('poscode' === type) {
  //       cusPick.sort((a, b) => (a.poscode > b.poscode ? 1 : -1))
  //     }
  //     if ('netweight' === type) {
  //       cusPick.sort((a, b) => (a.netweight > b.netweight ? 1 : -1))
  //     }
  //     if ('volume' === type) {
  //       cusPick.sort((a, b) => (a.volume > b.volume ? 1 : -1))
  //     }
  //     if ('vehicleCode' === type) {
  //       cusPick.sort((a, b) => (a.vehicleCode > b.vehicleCode ? 1 : -1))
  //     }
  //     if ('type' === type) {
  //       cusPick.sort((a, b) => (a.type > b.type ? 1 : -1))
  //     }
  //     if ('site' === type) {
  //       cusPick.sort((a, b) => (a.site > b.site ? 1 : -1))
  //     }
  //                 if ('routeCode' === type) {
  //       cusPick.sort((a, b) => (a.routeCode > b.routeCode ? 1 : -1))
  //     }
  //           if ('noofCases' === type) {
  //       cusPick.sort((a, b) => (a.noofCases > b.noofCases ? 1 : -1))
  //     }
  //           if ('mainCases' === type) {
  //       cusPick.sort((a, b) => (a.mainCases > b.mainCases ? 1 : -1))
  //     }
  //   }
  //   cusDropsPanel.drops = cusPick
  //   this.setState({
  //     dropsPanel: cusDropsPanel,
  //     dropOrder: picOrder,
  //     mapChanged: false,
  //   })
  // }

  // added by ramana on 10-09-2025 to fix sorting issue for drops
  sortDrop = (type, index) => {
    // Clone state safely (avoid mutation)
    let cusDropsPanel = { ...this.state.dropsPanel };
    let cusPick = [...this.state.dropsPanel.drops];
    let picOrder = [...this.state.dropOrder];

    // Determine current sort direction and toggle
    const isAsc = picOrder[index] === 1;
    picOrder.fill(-1); // reset all others
    picOrder[index] = isAsc ? 0 : 1; // toggle asc/desc

    // Normalize data types for sorting
    const getValue = (obj, key) => {
      const val = obj[key];
      if (['noofCases', 'mainCases', 'routeCode', 'dlvystatus'].includes(key)) {
        return parseFloat(val) || 0;
      }
      if (key === 'docdate') {
        // Take only date part (YYYY-MM-DD)
        return val ? val.split(' ')[0] : '';
      }
      if (typeof val === 'string') {
        return val.toLowerCase();
      }
      return val;
    };

    // Sort based on direction
    cusPick.sort((a, b) => {
      const valA = getValue(a, type);
      const valB = getValue(b, type);
      if (valA > valB) return 1;
      if (valA < valB) return -1;
      return 0;
    });

    // Reverse for descending order
    if (!isAsc) cusPick.reverse();

    cusDropsPanel.drops = cusPick;

    this.setState({
      dropsPanel: cusDropsPanel,
      dropOrder: picOrder,
      mapChanged: false,
    });
  };


  sortEquipement = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel
    var cusPick = this.state.vehiclePanel.equipments
    var picOrder = this.state.equpOrder
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0
      if ('xequipid' === type) {
        cusPick.sort((a, b) => (a.xequipid < b.xequipid ? 1 : -1))
      }
      if ('xdescript' === type) {
        cusPick.sort((a, b) => (a.xdescript < b.xdescript ? 1 : -1))
      }
      if ('xequiptyp' === type) {
        cusPick.sort((a, b) => (a.xequiptyp < b.xequiptyp ? 1 : -1))
      }
      if ('xcodeyve' === type) {
        cusPick.sort((a, b) => (a.xcodeyve < b.xcodeyve ? 1 : -1))
      }
      if ('xfcy' === type) {
        cusPick.sort((a, b) => (a.xfcy < b.xfcy ? 1 : -1))
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1
      if ('xequipid' === type) {
        cusPick.sort((a, b) => (a.xequipid > b.xequipid ? 1 : -1))
      }
      if ('xdescript' === type) {
        cusPick.sort((a, b) => (a.xdescript > b.xdescript ? 1 : -1))
      }
      if ('xequiptyp' === type) {
        cusPick.sort((a, b) => (a.xequiptyp > b.xequiptyp ? 1 : -1))
      }
      if ('xcodeyve' === type) {
        cusPick.sort((a, b) => (a.xcodeyve > b.xcodeyve ? 1 : -1))
      }
      if ('xfcy' === type) {
        cusPick.sort((a, b) => (a.xfcy > b.xfcy ? 1 : -1))
      }
    }
    cusDropsPanel.equipments = cusPick
    this.setState({
      vehiclePanel: cusDropsPanel,
      equpOrder: picOrder,
      mapChanged: false,
    })
  }

  // sortDriver = (type, index) => {
  //   var cusDropsPanel = this.state.vehiclePanel
  //   var cusPick = this.state.vehiclePanel.drivers
  //   var picOrder = this.state.diverOrder
  //   if (picOrder[index] == -1 || picOrder[index] == 1) {
  //     picOrder[index] = 0
  //     if ('driverid' === type) {
  //       cusPick.sort((a, b) => (a.driverid < b.driverid ? 1 : -1))
  //     }
  //     if ('driver' === type) {
  //       cusPick.sort((a, b) => (a.driver < b.driver ? 1 : -1))
  //     }
  //     if ('licenum' === type) {
  //       cusPick.sort((a, b) => (a.licenum < b.licenum ? 1 : -1))
  //     }
  //     if ('licedat' === type) {
  //       cusPick.sort((a, b) => (a.licedat < b.licedat ? 1 : -1))
  //     }
  //     if ('cty' === type) {
  //       cusPick.sort((a, b) => (a.cty < b.cty ? 1 : -1))
  //     }
  //     if ('poscod' === type) {
  //       cusPick.sort((a, b) => (a.poscod < b.poscod ? 1 : -1))
  //     }
  //     if ('cry' === type) {
  //       cusPick.sort((a, b) => (a.cry < b.cry ? 1 : -1))
  //     }
  //     if ('fcy' === type) {
  //       cusPick.sort((a, b) => (a.fcy < b.fcy ? 1 : -1))
  //     }
  //   } else if (picOrder[index] == 0) {
  //     picOrder[index] = 1
  //     if ('driverid' === type) {
  //       cusPick.sort((a, b) => (a.driverid > b.driverid ? 1 : -1))
  //     }
  //     if ('driver' === type) {
  //       cusPick.sort((a, b) => (a.driver > b.driver ? 1 : -1))
  //     }
  //     if ('licenum' === type) {
  //       cusPick.sort((a, b) => (a.licenum > b.licenum ? 1 : -1))
  //     }
  //     if ('licedat' === type) {
  //       cusPick.sort((a, b) => (a.licedat > b.licedat ? 1 : -1))
  //     }
  //     if ('cty' === type) {
  //       cusPick.sort((a, b) => (a.cty > b.cty ? 1 : -1))
  //     }
  //     if ('poscod' === type) {
  //       cusPick.sort((a, b) => (a.poscod > b.poscod ? 1 : -1))
  //     }
  //     if ('cry' === type) {
  //       cusPick.sort((a, b) => (a.cry > b.cry ? 1 : -1))
  //     }
  //     if ('fcy' === type) {
  //       cusPick.sort((a, b) => (a.fcy > b.fcy ? 1 : -1))
  //     }
  //   }
  //   cusDropsPanel.drivers = cusPick
  //   this.setState({
  //     vehiclePanel: cusDropsPanel,
  //     diverOrder: picOrder,
  //     mapChanged: false,
  //   })
  // }

  // added by ramana on 10-09-2025 to fix sorting issue for drivers
  sortDriver = (type, index) => {
    let vehiclePanel = { ...this.state.vehiclePanel };
    let drivers = [...this.state.vehiclePanel.drivers];
    let order = [...this.state.diverOrder];

    const isAsc = order[index] === 1;
    order.fill(-1);       // reset all other columns
    order[index] = isAsc ? 0 : 1; // toggle current column

    const getValue = (obj, key) => {
      // If numeric column exists, parse as float
      // if (['driverid'].includes(key)) return parseFloat(obj[key]) || 0;
      if (typeof obj[key] === 'string') return obj[key].toLowerCase();
      return obj[key];
    };

    drivers.sort((a, b) => {
      const valA = getValue(a, type);
      const valB = getValue(b, type);
      if (valA > valB) return 1;
      if (valA < valB) return -1;
      return 0;
    });

    if (!isAsc) drivers.reverse();

    vehiclePanel.drivers = drivers;
    this.setState({ vehiclePanel, diverOrder: order, mapChanged: false });
  };


  // sortVehicles = (type, index) => {
  //   var cusDropsPanel = this.state.vehiclePanel
  //   var cusPick = this.state.vehiclePanel.vehicles
  //   var picOrder = this.state.vehOrder
  //   if (picOrder[index] == -1 || picOrder[index] == 1) {
  //     picOrder[index] = 0
  //     if ('codeyve' === type) {
  //       cusPick.sort((a, b) => (a.codeyve < b.codeyve ? 1 : -1))
  //     }
  //     if ('name' === type) {
  //       cusPick.sort((a, b) => (a.name < b.name ? 1 : -1))
  //     }
  //     if ('startdepotn' === type) {
  //       cusPick.sort((a, b) => (a.startdepotn < b.startdepotn ? 1 : -1))
  //     }
  //     if ('enddepotname' === type) {
  //       cusPick.sort((a, b) => (a.enddepotname < b.enddepotname ? 1 : -1))
  //     }
  //     if ('drivername' === type) {
  //       cusPick.sort((a, b) => (a.drivername < b.drivername ? 1 : -1))
  //     }
  //     if ('lateral' === type) {
  //       cusPick.sort((a, b) => (a.lateral < b.lateral ? 1 : -1))
  //     }
  //     if ('trailer' === type) {
  //       cusPick.sort((a, b) => (a.trailer < b.trailer ? 1 : -1))
  //     }
  //     if ('catego' === type) {
  //       cusPick.sort((a, b) => (a.catego < b.catego ? 1 : -1))
  //     }
  //     if ('capacities' === type) {
  //       cusPick.sort((a, b) => (a.capacities < b.capacities ? 1 : -1))
  //     }
  //     if ('vol' === type) {
  //       cusPick.sort((a, b) => (a.vol < b.vol ? 1 : -1))
  //     }
  //     if ('maxordercnt' === type) {
  //       cusPick.sort((a, b) => (a.maxordercnt < b.maxordercnt ? 1 : -1))
  //     }
  //     if ('maxqty' === type) {
  //       cusPick.sort((a, b) => (a.maxqty < b.maxqty ? 1 : -1))
  //     }
  //     if ('starttime' === type) {
  //       cusPick.sort((a, b) => (a.starttime < b.starttime ? 1 : -1))
  //     }
  //     if ('lateststarttime' === type) {
  //       cusPick.sort((a, b) => (a.lateststarttime < b.lateststarttime ? 1 : -1))
  //     }
  //     if ('maxtotaldist' === type) {
  //       cusPick.sort((a, b) => (a.maxtotaldist < b.maxtotaldist ? 1 : -1))
  //     }
  //     if ('maxtotaltime' === type) {
  //       cusPick.sort((a, b) => (a.maxtotaltime < b.maxtotaltime ? 1 : -1))
  //     }
  //     if ('maxtotaltrvtime' === type) {
  //       cusPick.sort((a, b) => (a.maxtotaltrvtime < b.maxtotaltrvtime ? 1 : -1))
  //     }
  //     if ('bptnum' === type) {
  //       cusPick.sort((a, b) => (a.bptnum < b.bptnum ? 1 : -1))
  //     }
  //   } else if (picOrder[index] == 0) {
  //     picOrder[index] = 1
  //     if ('codeyve' === type) {
  //       cusPick.sort((a, b) => (a.codeyve > b.codeyve ? 1 : -1))
  //     }
  //     if ('name' === type) {
  //       cusPick.sort((a, b) => (a.name > b.name ? 1 : -1))
  //     }
  //     if ('startdepotn' === type) {
  //       cusPick.sort((a, b) => (a.startdepotn > b.startdepotn ? 1 : -1))
  //     }
  //     if ('enddepotname' === type) {
  //       cusPick.sort((a, b) => (a.enddepotname > b.enddepotname ? 1 : -1))
  //     }
  //     if ('drivername' === type) {
  //       cusPick.sort((a, b) => (a.drivername > b.drivername ? 1 : -1))
  //     }
  //     if ('lateral' === type) {
  //       cusPick.sort((a, b) => (a.lateral > b.lateral ? 1 : -1))
  //     }
  //     if ('trailer' === type) {
  //       cusPick.sort((a, b) => (a.trailer > b.trailer ? 1 : -1))
  //     }
  //     if ('catego' === type) {
  //       cusPick.sort((a, b) => (a.catego > b.catego ? 1 : -1))
  //     }
  //     if ('starttime' === type) {
  //       cusPick.sort((a, b) => (a.starttime > b.starttime ? 1 : -1))
  //     }
  //     if ('lateststarttime' === type) {
  //       cusPick.sort((a, b) => (a.lateststarttime > b.lateststarttime ? 1 : -1))
  //     }
  //     if ('capacities' === type) {
  //       cusPick.sort((a, b) => (a.capacities > b.capacities ? 1 : -1))
  //     }
  //     if ('vol' === type) {
  //       cusPick.sort((a, b) => (a.vol > b.vol ? 1 : -1))
  //     }
  //     if ('maxordercnt' === type) {
  //       cusPick.sort((a, b) => (a.maxordercnt > b.maxordercnt ? 1 : -1))
  //     }
  //     if ('maxqty' === type) {
  //       cusPick.sort((a, b) => (a.maxqty > b.maxqty ? 1 : -1))
  //     }
  //     if ('maxtotaldist' === type) {
  //       cusPick.sort((a, b) => (a.maxtotaldist > b.maxtotaldist ? 1 : -1))
  //     }
  //     if ('maxtotaltime' === type) {
  //       cusPick.sort((a, b) => (a.maxtotaltime > b.maxtotaltime ? 1 : -1))
  //     }
  //     if ('maxtotaltrvtime' === type) {
  //       cusPick.sort((a, b) => (a.maxtotaltrvtime > b.maxtotaltrvtime ? 1 : -1))
  //     }
  //     if ('bptnum' === type) {
  //       cusPick.sort((a, b) => (a.bptnum > b.bptnum ? 1 : -1))
  //     }
  //   }
  //   cusDropsPanel.vehicles = cusPick
  //   this.setState({
  //     vehiclePanel: cusDropsPanel,
  //     vehOrder: picOrder,
  //     mapChanged: false,
  //   })
  // }
  // added by ramana on 10-09-2024 to fix sorting issue for vehicles
  sortVehicles = (type, index) => {
    let vehiclePanel = { ...this.state.vehiclePanel };
    let vehicles = [...this.state.vehiclePanel.vehicles];
    let order = [...this.state.vehOrder];

    const isAsc = order[index] === 1;
    order.fill(-1);       // reset all others
    order[index] = isAsc ? 0 : 1; // toggle

    const getValue = (obj, key) => {
      const val = obj[key];
      if (['maxqty', 'capacities', 'vol', 'maxordercnt'].includes(key)) {
        return parseFloat(val) || 0;
      }
      if (typeof val === 'string') {
        return val.toLowerCase();
      }
      return val;
    };

    vehicles.sort((a, b) => {
      const valA = getValue(a, type);
      const valB = getValue(b, type);

      // Special case: drivername null or empty comes first
      if (type === 'drivername') {
        if (!valA && valB) return -1;
        if (!valB && valA) return 1;
        if (!valA && !valB) return 0;
      }

      if (valA > valB) return 1;
      if (valA < valB) return -1;
      return 0;
    });

    if (!isAsc) vehicles.reverse();

    vehiclePanel.vehicles = vehicles;
    this.setState({ vehiclePanel, vehOrder: order, mapChanged: false });
  };



  sortTrailer = (type, index) => {
    var cusDropsPanel = this.state.vehiclePanel
    var cusPick = this.state.vehiclePanel.trails
    var picOrder = this.state.trailOrder
    if (picOrder[index] == -1 || picOrder[index] == 1) {
      picOrder[index] = 0
      if ('trailer' === type) {
        cusPick.sort((a, b) => (a.trailer < b.trailer ? 1 : -1))
      }
      if ('des' === type) {
        cusPick.sort((a, b) => (a.des < b.des ? 1 : -1))
      }
      if ('fcy' === type) {
        cusPick.sort((a, b) => (a.fcy < b.fcy ? 1 : -1))
      }
      if ('typ' === type) {
        cusPick.sort((a, b) => (a.typ < b.typ ? 1 : -1))
      }
      if ('model' === type) {
        cusPick.sort((a, b) => (a.model < b.model ? 1 : -1))
      }
      if ('maxloams' === type) {
        cusPick.sort((a, b) => (a.maxloams < b.maxloams ? 1 : -1))
      }
      if ('maxlovol' === type) {
        cusPick.sort((a, b) => (a.maxlovol < b.maxlovol ? 1 : -1))
      }
    } else if (picOrder[index] == 0) {
      picOrder[index] = 1
      if ('trailer' === type) {
        cusPick.sort((a, b) => (a.trailer > b.trailer ? 1 : -1))
      }
      if ('des' === type) {
        cusPick.sort((a, b) => (a.des > b.des ? 1 : -1))
      }
      if ('fcy' === type) {
        cusPick.sort((a, b) => (a.fcy > b.fcy ? 1 : -1))
      }
      if ('typ' === type) {
        cusPick.sort((a, b) => (a.typ > b.typ ? 1 : -1))
      }
      if ('model' === type) {
        cusPick.sort((a, b) => (a.model > b.model ? 1 : -1))
      }
      if ('maxloams' === type) {
        cusPick.sort((a, b) => (a.maxloams > b.maxloams ? 1 : -1))
      }
      if ('maxlovol' === type) {
        cusPick.sort((a, b) => (a.maxlovol > b.maxlovol ? 1 : -1))
      }
    }
    cusDropsPanel.trails = cusPick
    this.setState({
      vehiclePanel: cusDropsPanel,
      trailOrder: picOrder,
      mapChanged: false,
    })
  }

  submitRoutesforTripsCreationOSRMManually = async (
    routes,
    site,
    Vehicle,
    alreadyTrip,
    selectedTripList,
    res, from
  ) => {
    this.setState({ loader: true, loaderText: 'Loading please wait..' })
    let existingTrip = alreadyTrip
    var RouteprocessedData = []
    let selectedTripList_L = alreadyTrip.totalObject.selectedTripData
    var sameProcessUsedDriversList = []
    var TripsfromRoutes = []
    for (let k = 0; k < routes.length; k++) {
      var currRoute = routes[k]
      var Veh = routes[k].description
      var auto_tot_travel_time = formatTime(routes[k].duration)
      var auto_total_time = (routes[k].duration + routes[k].service) / 60 / 60
      var auto_service_time = routes[k].service / 60 / 60
      var auto_tot_distance = routes[k].distance / 1000

      var fdistanceCost = 0,
        ftimeCost = 0,
        ftotalCost = 0,
        fovertimecost = 0,
        fRegularcost = 0,
        ffixedcost = 0
      var dropObject = [],
        pickupObject = [],
        drops = 0,
        pickups = 0
      var startTime = '',
        endTime = ''
      var totalWeight = 0
      var ddate = ''
      var totalVolume = 0
      var fld_per_capacity = 0
      var fld_per_volume = 0
      var fld_doc_capacity = 0
      var fld_doc_volume = 0
      var fld_doc_qty = 0
      var fld_uom_qty = ''
      var flds_doc_capacity = ''
      var flds_per_capacity = ''
      var flds_doc_volume = ''
      var flds_per_volume = ''
      var fld_uom_capacity = ''
      var fld_uom_volume = ''
      var weight = ''
      var volume = ''
      var vol_unit = ''
      var wei_unit = ''
      var percentageMass = 0
      var percentageVolume = 0
      var VehicleObject = Vehicle
      var flds_uom_capacity = ''
      var flds_uom_volume = ''
      var vehobj = []
      var itemTrip = {
        selectedTripData: [],
        timelineInterval: [],
        equipments: [],
        trailers: [],
        quantities: [],
      }
      var timelneInterval = []
      // itemTrip.selectedTripData = GroupedObjects;
      // itemTrip.timelineInterval = [];
      itemTrip.equipments = []
      itemTrip.trailers = []
      itemTrip.quantities = []
      var freqtype = false
      var appointmentExist = false

      // loop thorugh the documents steps
      let totTime = 0
      let totDistance = 0
      for (let t = 0; t < currRoute.steps.length; t++) {
        var ttime = ''
        var currTask = currRoute.steps[t]
        if (currTask.type !== 'start' && currTask.type !== 'end') {
          var docno = currTask.description
          for (let d = 0; d < this.state.dropsPanel.drops.length; d++) {
            var currDoc = this.state.dropsPanel.drops[d]
            var SelectedDoc = []
            if (currDoc.docnum === docno) {
              currDoc.vehicleCode = Veh
              currDoc.arrival = secondsToHms(currTask.arrival)
              currDoc.time = convertSecToHr(currTask.duration)
              let tempwaittime = 0
              let tempservicetime = currTask.service - tempwaittime
              currDoc.serTime = secondsToHms(tempservicetime)
              currDoc.distance = currTask.distance / 1000
              currDoc.end = secondsToHms(
                currTask.arrival + tempservicetime + tempwaittime
              )
              ttime = currDoc.arrival
              if (currDoc.doctype === 'PRECEIPT') {
                pickups = pickups + 1
                currDoc.panelType = 'pickup'
                pickupObject.push(currDoc)
                fld_doc_capacity = fld_doc_capacity + currDoc.netweight
                fld_doc_volume = fld_doc_volume + currDoc.volume

                let tempqty = 0,
                  tempuom = ''
                currDoc.products &&
                  currDoc.products.length > 0 &&
                  currDoc.products.map((prod, index) => {
                    tempqty = tempqty + parseInt(prod.quantity)
                    tempuom = prod.uom
                  })
                fld_doc_qty = fld_doc_qty + tempqty
                // fld_uom_qty = fld_uom_qty + tempuom;
                if (!fld_uom_qty.includes(tempuom)) {
                  fld_uom_qty += tempuom
                }
              } else {
                drops = drops + 1
                currDoc.panelType = 'drop'
                dropObject.push(currDoc)
                fld_doc_capacity = fld_doc_capacity + currDoc.netweight
                fld_doc_volume = fld_doc_volume + currDoc.volume

                let tempqty = 0,
                  tempuom = ''
                currDoc.products &&
                  currDoc.products.length > 0 &&
                  currDoc.products.map((prod, index) => {
                    tempqty = tempqty + parseInt(prod.quantity)
                    tempuom = prod.uom
                  })
                fld_doc_qty = fld_doc_qty + tempqty
                // fld_uom_qty = fld_uom_qty + tempuom;
                if (!fld_uom_qty.includes(tempuom)) {
                  fld_uom_qty += tempuom
                }
              }
              itemTrip.selectedTripData.push(currDoc)
              totalWeight =
                parseFloat(totalWeight) + parseFloat(currDoc.netweight)
              totalVolume = parseFloat(totalVolume) + parseFloat(currDoc.volume)
              break
            }
          }

          //end of search task with document panel
        } // end of if, task
        else if (currTask.type === 'start') {
          startTime = secondsToHms(currTask.arrival)
          ttime = startTime
        } else if (currTask.type === 'end') {
          endTime = secondsToHms(currTask.arrival)
          ttime = endTime
        }
        //for timeline
        var index = t * 12
        timelneInterval.push({ value: index, label: ttime })
      } // end of steps
      // totalWeight = 0 //totalWeight + parseInt(docItem.obbject.netweight);
      // totalVolume = 0 //totalVolume + parseInt(docItem.obbject.volume);
      ddate = existingTrip.docdate

      itemTrip.timelineInterval = timelneInterval
      var TimelineInterval = VehicleObject.timelineInterval
      var stops = pickups + drops
      var site = VehicleObject.fcy
      var capacity = VehicleObject.capacities

      // cost calculations
      fdistanceCost = VehicleObject.costperunitd * Number(auto_tot_distance)
      if (auto_total_time > VehicleObject.overtimestar) {
        fovertimecost =
          (auto_total_time - VehicleObject.overtimestar) *
          VehicleObject.costperunito
        fRegularcost = VehicleObject.overtimestar * VehicleObject.costperunitt
        ftimeCost = Math.round(fovertimecost + fRegularcost)
      } else {
        fRegularcost = VehicleObject.costperunitt * auto_total_time
        ftimeCost = fRegularcost
      }
      ffixedcost = VehicleObject.fixedcost
      ftotalCost = VehicleObject.fixedcost + fdistanceCost + ftimeCost

      var fld_tot_capacity = VehicleObject.capacities
      var fld_tot_volume = VehicleObject.vol
      var fld_uom_capacity = VehicleObject.xweu
      var fld_uom_volume = VehicleObject.xvol

      fld_per_capacity = Math.round((fld_doc_capacity / fld_tot_capacity) * 100)
      fld_per_volume = Math.round((fld_doc_volume / fld_tot_volume) * 100)

      var volume = VehicleObject.vol
      //  var StartTime = VehicleObject.timelineInterval[0].label;
      vehobj = VehicleObject
      flds_uom_capacity = VehicleObject.xweu
      flds_uom_volume = VehicleObject.xvol

      if (totalWeight > 0) {
        // Convert totalWeight and capacity to floating-point numbers
        let weight = parseFloat(totalWeight).toFixed(2)
        let cap = parseFloat(capacity)

        // Calculate the percentage mass and format it to one decimal place
        percentageMass = ((weight / cap) * 100).toFixed(2)

        // Store values as floating-point numbers
        flds_doc_capacity = weight
        flds_per_capacity = percentageMass
      }

      if (totalVolume > 0) {
        // Convert totalVolume and volume to floating-point numbers
        let volumeVal = parseFloat(totalVolume).toFixed(2)
        let vol = parseFloat(volume)

        // Calculate the percentage volume and format it to one decimal place
        percentageVolume = ((volumeVal / vol) * 100).toFixed(2)

        // Store values as floating-point numbers
        flds_doc_volume = volumeVal
        flds_per_volume = percentageVolume
      }
      // totalVolume =
      //   totalVolume % 1 === 0
      //     ? totalVolume.toString() // If the number is an integer, show it without decimals
      //     : totalVolume.toString(); // Otherwise, show it rounded to three decimal places

      // totalWeight =
      //   totalWeight % 1 === 0 ? totalWeight.toString() : totalWeight.toString();

      var today = new Date()
      var execdate = today.getDate()

      existingTrip.date = moment.tz(ddate, '').format('YYYY-MM-DD')
      existingTrip.docdate = moment.tz(ddate, '').format('YYYY-MM-DD')
      existingTrip.datexec = today
      existingTrip.endDate = ddate
      existingTrip.tot_capacity = fld_tot_capacity
      existingTrip.tot_volume = fld_tot_volume
      existingTrip.doc_capacity = fld_doc_capacity
      existingTrip.doc_volume = fld_doc_volume
      existingTrip.doc_qty = fld_doc_qty
      existingTrip.uom_qty = fld_uom_qty
      existingTrip.per_capacity = fld_per_capacity
      existingTrip.per_volume = fld_per_volume
      existingTrip.uom_capacity = fld_uom_capacity
      existingTrip.uom_volume = fld_uom_volume


      if (existingTrip.generatedBy === 'AutoScheduler') {

        if (from === 'timeline') {
          existingTrip.generatedBy = 'Auto_MO_Scheduler'
        }
        else {
          existingTrip.generatedBy = 'Auto_GO_Scheduler'
        }
      }
      else {
        if (from === 'timeline') {
          existingTrip.generatedBy = 'MScheduler'
        }
        else {
          existingTrip.generatedBy = 'M_GO_Scheduler'
        }
      }
      existingTrip.vehicleObject = vehobj
      existingTrip.optistatus = 'Optimized'
      existingTrip.routeStatus = 'Optimized'
      existingTrip.capacities = capacity
      existingTrip.adeptime = startTime
      existingTrip.startTime = startTime
      existingTrip.endTime = endTime
      existingTrip.pickups = pickups
      existingTrip.lock = false
      existingTrip.pickupObject = pickupObject
      existingTrip.dropObject = dropObject
      existingTrip.totalObject = itemTrip
      existingTrip.drops = drops
      existingTrip.stops = stops
      existingTrip.startIndex = stops
      existingTrip.pickUps = pickups
      existingTrip.timelineInterval = TimelineInterval
      existingTrip.weightPercentage = percentageMass
      existingTrip.volumePercentage = percentageVolume
      existingTrip.totalWeight =
        totalWeight.toFixed(2) + ' ' + flds_uom_capacity
      existingTrip.totalVolume = totalVolume.toFixed(2) + ' ' + flds_uom_volume
      existingTrip.travelTime = auto_tot_travel_time
      existingTrip.serviceTime = auto_service_time
      existingTrip.totalTime = auto_total_time
      existingTrip.totalDistance = auto_tot_distance
      existingTrip.pickups = pickups
      existingTrip.route = true
      existingTrip.distanceCost = fdistanceCost
      existingTrip.regularCost = fRegularcost
      existingTrip.overtimeCost = fovertimecost
      existingTrip.timeCost = ftimeCost
      existingTrip.fixedCost = ffixedcost
      existingTrip.totalCost = ftotalCost
      /*

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

      RouteprocessedData.push(existingTrip)
    }
    TripsfromRoutes = RouteprocessedData
    //   this.ConfirmScheduledTrips(TripsfromRoutes);
    /*
            fetch(`${process.env.REACT_APP_API_URL}/api/v1/transport/trips`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trips)
              }).then((response) => {
                this.handleErrors(response);
              }).then(function (response) {

              }).then(() => {
                this.handleDateRangeChange();
              }).then(() => {
                this.setState({ laoder: false, checkedTrip: false, isDetail: false });
                this.notifySucess("Trip Added/Updated Sucessfully");
              }).catch(error => {
                this.handleDateRangeChange();
                this.setState({ loader: false });
                this.notifyError("Trip creation/updation failed: invalid  data or all the  documents already assigned to another trips.");
              });

              */
    try {
      let fresponse = await fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/trips`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(TripsfromRoutes),
        }
      )

      if (fresponse.status === 200) {
        await this.ExceptionalanalysisManual(
          selectedTripList_L,
          Vehicle,
          res,
          existingTrip,
          'autoManually'
        )
        this.notifySucess('Trip Optimised Successfully')
        this.reloadTrips()
        this.refreshAllPanels()
        this.setState({ loader: false })
      } else {
        this.notifyError('Trip is not optimised properly')
      }
    } catch (error) {
      console.error('Error in processing trip:', error)
      this.setState({
        errorMessage: 'Error in processing trip',
        loader: false,
        addAlertShow: true,
      })
    }
  }

  OSRM_manuallytrip = async (
    optitrip,
    updatedDAtefromTimeline,
    validations,
    autooptimise
  ) => {
    this.setState({ loader: true, loaderText: 'Optimization is in process..' })
    let processtrip = optitrip
    let selectedTripdata = processtrip.totalObject.selectedTripData
    // get site details
    let VehListM = [],
      DocListM = []
    let veh = {},
      vehObject = {}
    let siteLatM, siteLangM
    let docM = {}
    let selSite = this.state.selectedMultipleSites[0]
    this.state.sites.map((site) => {
      if (selSite === site.id) {
        siteLatM = site.lat
        siteLangM = site.lng
      }
    })

    // get vehicle from the vehicle list

    for (let vi = 0; vi < this.state.vehiclePanel.vehicles.length; vi++) {
      let tempveh = this.state.vehiclePanel.vehicles[vi]
      if (processtrip.code === tempveh.codeyve) {
        vehObject = tempveh
        let MVeh = {}
        let tripStartTime = processtrip.startTime

        //  MVeh.max_travel_time = convertHrToSec(tempveh.maxtotaltrvtime);
        //  MVeh.capacity = [tempveh.capacities];
        MVeh.id = 1
        MVeh.description = tempveh.codeyve

        // 🔑 NEW LOGIC FOR STARTTIME
        let starttime

        // Step 1: Get all trips of this vehicle for the day
        let existingTrips = this.state.tripsPanel.filter(
          (t) => t.code === tempveh.codeyve
        )

        // Step 2: Sort trips by start time (if available)
        // existingTrips.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        // Step 3: Find index of current trip
        let tripIndex = existingTrips.findIndex(
          (t) => t.itemCode === processtrip.itemCode // make sure tripId exists
        )

        let stime = null
        let loadingHrs = convertHrToSec(tempveh.startdepots)
        let OffLoadingHrs = convertHrToSec(tempveh.enddepotserv)

        if (tripIndex > 0) {
          // Not the first trip → use previous trip’s end time

          let prevTrip = existingTrips[tripIndex - 1]
          if (prevTrip && prevTrip.endTime) {
            starttime = splitTimeAndConv2Sec(prevTrip.endTime)

            stime = starttime + loadingHrs + OffLoadingHrs
          } else {
            // starttime = convertHHMMtoSeconds(tempveh.starttime)
            starttime = this.convertDateTimeToSeconds(updatedDAtefromTimeline)
            // console.warn("Previous trip endTime not found. Using vehicle starttime.");
          }
        } else {
          // First trip → use vehicle-level start time
          starttime = this.convertDateTimeToSeconds(updatedDAtefromTimeline)
          // starttime = convertHHMMtoSeconds(tempveh.starttime)
          stime = starttime

          // stime = starttime + loadingHrs;
        }

        let etime = splitTimeAndAddtimeAndConv2Sec(
          tempveh.starttime,
          tempveh.overtimestar
        )
        //  let timew = [stime, etime]
        // let geo = [siteLangM, siteLatM]

        let VehEndTimeforDay = 86400
        /* let starttime = splitTimeAndConv2Sec(tempveh.starttime)
       // let loadingHrs = convertHrToSec(tempveh.startdepots)
        let stime = starttime + loadingHrs
        //  let VehStartTime = splitTimeAndConv2Sec(tripStartTime)
        let VehStartTime =
          tripStartTime && tripStartTime.trim() !== ''
            ? splitTimeAndConv2Sec(tripStartTime)
            : stime

        let etime = splitTimeAndAddtimeAndConv2Sec(
          tempveh.starttime,
          tempveh.overtimestar
        )
        */
        let timew = [stime, VehEndTimeforDay]
        let geo = [siteLatM, siteLangM]

        MVeh.time_window = timew
        MVeh.start = geo
        MVeh.end = geo
        var array = JSON.parse('[' + tempveh.skills + ']')
        //   MVeh.skills = array;
        if (veh.maxordercnt > 0) {
          MVeh.max_tasks = 99
        } else {
          MVeh.max_tasks = 99
        }
        VehListM.push(MVeh)
        break
      }
    }

    // get the list of documents to process

    for (let j = 0; j < selectedTripdata.length; j++) {
      let doc = selectedTripdata[j]
      var Doc = {}
      Doc.id = j + 1
      Doc.description = doc.docnum

      var FromArr
      var fromflag = false
      var toflag = false
      if (doc.fromTime.length > 0) {
        FromArr = doc.fromTime.split(' ')
        fromflag = true
      }
      var ToArr
      if (doc.toTime.length > 0) {
        ToArr = doc.toTime.split(' ')
        toflag = true
      }

      var timeWindw = []

      fromflag &&
        FromArr.map((ft, index) => {
          var tt = []
          tt.push(splitTimeAndConv2Sec(ft))
          tt.push(splitTimeAndConv2Sec(ToArr[index]))

          timeWindw.push(tt)
        })

      var DocLat, DocLang
      DocLat = doc.lng
      DocLang = doc.lat
      Doc.location = [DocLat, DocLang]
      //  Doc.priority = doc.priority;
      // Doc.amount = [Math.round(doc.netweight)];

      // var array1 = JSON.parse("[" + doc.skills + "]");
      // Doc.skills = array1;
      //  Veh.skills = array;
      // Doc.skills = (doc.skills).split(',');
      // let wtime = convertHrToSec(doc?.serviceTime ? doc.serviceTime : 0);
      // Doc.service = parseInt(wtime === null ? 0 : wtime);
      let wtime = convertHrToSec(doc?.serviceTime ? doc.serviceTime : 0)
      let tempwtime = convertHrToSec(doc?.waitingTime ? doc.waitingTime : 0)
      Doc.service = 0  //parseInt(wtime === null ? 0 : wtime + tempwtime)
      let ps,
        pe = 0
      let ds,
        de = 0

      //       if (fromflag) {
      //         Doc.time_windows = timeWindw;
      //       }
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
      DocListM.push(Doc)
    }

    //process for the JSON file
    var processedData = {}
    processedData.vehicles = VehListM
    processedData.jobs = DocListM
    processedData.options = {
      g: true,
    }

    try {
      let response = await fetch('https://maps.tema-systems.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      })
      if (response.status === 200) {
        let res = await response.json()
        if (res.routes.length > 0) {
          await this.submitRoutesforTripsCreationOSRMManually(
            res.routes,
            selSite,
            vehObject,
            processtrip,
            selectedTripdata,
            res,
            'timeline'
          )
        } else {
          this.setState({
            errorMessage:
              'Trip optimization failed as the document delivery timeline exceeds the 24:00 cutoff.',
            loader: false,
            addAlertShow: true,
          })
        }
      } else {
        this.setState({
          errorMessage:
            'Trip optimization failed as the document delivery timeline exceeds the 24:00 cutoff.',
          loader: false,
          addAlertShow: true,
        })
      }
    } catch (error) {
      console.error('Error in processing trip:', error)
      this.setState({
        errorMessage: 'Error in processing trip',
        loader: false,
        addAlertShow: true,
      })
    }
    this.toggleDetail(false);  // added by ramana on 10-06-2025 to auto close timeline modal after optimization
  }

  manualNextBillions = (
    tripData,
    selectedDate,
    excludeValidationFlag,
    OptimisationFlag
  ) => {
    this.NB_manuallytrip_sameroute_sameseq(
      tripData,
      'TimeLine',
      selectedDate,
      excludeValidationFlag,
      OptimisationFlag
    )

    this.toggleDetail(false)
    //toggleDetail
  }

  OptimisemanuallywithOSRM = async (Optimisedtrips) => {

    for (let tt = 0; tt < Optimisedtrips.length; tt++) {
      await this.OSRM_manuallytrip(Optimisedtrips[tt])
    }
  }

  OrganiseNextBillionsResponse_GroupOptimise = async (
    data,
    selSite,
    vehObject,
    processtrip,
    assignedJobs,
    assignedShipments
  ) => {
    let SelDocs = [
      ...(processtrip.dropObject || []),
      ...(processtrip.pickupObject || []),
    ]

    try {
      const apiKey = 'b1cebb49fcaa4366abcb19cfb12b43b3'
      const jobId = data.id
      const postAPICodewithId = `https://api.nextbillion.io/optimization/v2/result?id=${jobId}&key=${apiKey}`

      let attempt = 0
      const maxAttempts = 50 // Stop after 20 tries (200 seconds)

      let unassignedListRes = ''
      let loopflg = true

      while (attempt < maxAttempts && loopflg) {
        await new Promise((res) => setTimeout(res, 10000)) // Wait for 10 seconds before each retry
        attempt++

        const response = await fetch(postAPICodewithId, { method: 'GET' })

        if (response.status !== 200) {
          this.setState({
            errorMessage: 'Something went wrong while fetching the route.',
            addAlertShow: true,
            loader: false,
          })
          throw new Error('Failed to fetch route optimization result')
        }

        const res = await response.json()

        if (res.status !== 'Ok') {
          throw new Error(`API Error: ${res.message || 'Unknown error'}`)
        }

        if (
          res.message === 'Job is still processing.' ||
          !res.result ||
          (res.result.routes && res.result.routes.length === 0)
        ) {
          continue
        } else if (
          res.message === '' &&
          res.result &&
          res.result.unassigned &&
          res.result.unassigned.length > 0
        ) {
          loopflg = false

          let matchedUnassignedWithReason = res.result.unassigned
            .map((unassignedDoc) => {
              const [lat, lng] = unassignedDoc.location

              const matchedDoc = SelDocs.find(
                (doc) => doc.lat === lat && doc.lng === lng
              )

              if (matchedDoc) {
                return {
                  docnum: matchedDoc.docnum,
                  reason: unassignedDoc.reason || 'N/A', // fallback if reason not present
                }
              }

              return null // skip if no match
            })
            .filter(Boolean) // remove nulls (unmatched)

          unassignedListRes = matchedUnassignedWithReason
            .map((item) => `Doc: ${item.docnum}, Reason: ${item.reason}`)
            .join('\n') // \n for line breaks

          this.setState({
            errorMessage: unassignedListRes,
            addAlertShow: true,
            loader: false,
          })
          break // Stop the while loop
          return
        } else if (res.result?.routes?.length > 0) {
          loopflg = false
          this.submitRoutesforTripsCreationOSRMManually(
            res.result.routes,
            selSite,
            vehObject,
            processtrip,
            [],
            res.result,
            'next'
          )
          return
        }
      }

      if (attempt === 50) {
        this.setState({
          errorMessage:
            `The optimization is taking longer than expected. Please try again later. Transaction Id : ${jobId} `,
          addAlertShow: true,
          loader: false,
        })
      }
    } catch (error) {
      console.error('Error:', error)
      this.setState({
        errorMessage: error.message || 'An error occurred',
        addAlertShow: true,
        loader: false,
      })
    }
  }

  convertDateTimeToSeconds = (datetimeString) => {
    const date = new Date(datetimeString)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return hours * 3600 + minutes * 60
  }

  NB_manuallytrip_sameroute_sameseq = async (
    optitrip,
    from,
    updatedDAtefromTimeline,
    excludeValidationFlag,
    OptimisationFlag
  ) => {
    this.setState({ loader: true, loaderText: 'Loading please wait..' })
    let processtrip = optitrip

    let vehile_profile_options = {
      grouping: {
        proximity_factor: 5
      },
      routing: {
        mode: 'car',
        // traffic_timestamp: 1724679300,
        profiles: {
          car: {
            mode: 'car',
          },
          minivan: {
            mode: 'car',
            //  truck_size: '200,210,400',
            avoid: [],
          },
        },
      },
    }

    let postAPICode =
      'https://api.nextbillion.io/optimization/v2?key=b1cebb49fcaa4366abcb19cfb12b43b3'

    let locationArraybefore = []

    let selectedTripdata = processtrip.totalObject.selectedTripData
    // get site details
    let VehListM = [],
      DocListM = []
    let VehicleID_Relations = ''
    let veh = {},
      vehObject = {}
    let siteLatM, siteLangM
    let docM = {}
    let selSite = this.state.selectedMultipleSites[0]

    this.state.sites.map((site) => {
      if (selSite === site.id) {
        siteLatM = site.lat
        siteLangM = site.lng

        let newCoord = `${siteLatM},${siteLangM}`
        locationArraybefore.push(newCoord)
      }
    })

    // get vehicle from the vehicle list

    for (let vi = 0; vi < this.state.vehiclePanel.vehicles.length; vi++) {
      let tempveh = this.state.vehiclePanel.vehicles[vi]
      if (processtrip.code === tempveh.codeyve) {
        vehObject = tempveh
        let MVeh = {}

        MVeh.max_travel_time = convertHrToSec(tempveh.maxtotaltrvtime)

        if (tempveh.xmaxtotaldis === 'Miles') {
          MVeh.max_distance = Math.round(tempveh.maxtotaldist * 1609.34)
        } else {
          MVeh.max_distance = Math.round(tempveh.maxtotaldist * 1000)
        }
        MVeh.capacity = [parseInt(tempveh.capacities), parseInt(tempveh.vol)]
        MVeh.id = tempveh.codeyve
        VehicleID_Relations = tempveh.codeyve
        MVeh.start_index = 0
        MVeh.end_index = 0

        MVeh.description = tempveh.codeyve
        let starttime = splitTimeAndConv2Sec(tempveh.starttime)
        // if (from === "TimeLine") {
        //   starttime = this.convertDateTimeToSeconds(updatedDAtefromTimeline);
        // }
        let loadingHrs = convertHrToSec(tempveh.startdepots)
        let stime = starttime + loadingHrs
        let etime = splitTimeAndAddtimeAndConv2Sec(
          tempveh.starttime,
          tempveh.overtimestar
        )
        // let timew = [stime, etime];
        let timew = [stime, 2147483647]
        let geo = [siteLangM, siteLatM]

        MVeh.time_window = timew
        //    MVeh.start = geo;
        //  MVeh.end = geo;
        var array = JSON.parse('[' + tempveh.skills + ']')
        MVeh.skills = array
        if (veh.maxordercnt > 0) {
          MVeh.max_tasks = 99
        } else {
          MVeh.max_tasks = 99
        }
        //            let breakArray = [];
        //          let Break1 = {
        //                      				"id": 1,
        //                      				"time_windows": [[1662105600, 1662148800]],
        //                      				"service": 120
        //                      			}
        //
        //                      breakArray.push(Break1);
        //
        //                      MVeh.breaks = breakArray;
        //                      let continousdrivingBreak =  {
        //                                     "max_continuous_driving": 14400,
        //                                     "layover_duration": 900
        //                                 }
        //                          MVeh.drive_time_layover_config =   continousdrivingBreak;  // continous break based on driving
        //                       //   MVeh.profile =  "car";

        MVeh.profile = 'car'
        VehListM.push(MVeh)
        break
      }
    }

    // get the list of documents to process
    const jobs = []
    const shipments = []
    const receiptPickupMap = {}
    const receiptsObj = {}
    const relations = [] // To store relations
    let idCounter = 1 // Start ID from 1
    let relationSteps = [{ type: 'start' }]
    let weightKey = ''

    if (excludeValidationFlag) {
      for (let j1 = 0; j1 < selectedTripdata.length; j1++) {
        let item = selectedTripdata[j1]
        if (item.doctype === 'PRECEIPT' && item.docnum) {
          const id = idCounter++

          let newCoord = `${item.lat},${item.lng}`
          let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index

          // Convert skills to an array (handle empty case)
          //   const skills = item.skills ? JSON.parse("[" + item.skills + "]") : [];

          let skillsArray
          try {
            let parsedSkills = JSON.parse('[' + item.skills + ']')
            if (
              Array.isArray(parsedSkills) &&
              parsedSkills.every((skill) => typeof skill === 'number')
            ) {
              skillsArray = parsedSkills
              // loc_i = loc_i + 1;
            } else {
              console.warn(
                `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
              )
              // **Exclude the entire document**
            }
          } catch (e) {
            console.warn(
              `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
            )
            // **Exclude the entire document**
          }

          if (item.pairedDoc && item.pairedDoc.trim() !== '') {
            receiptPickupMap[item.docnum] = id
            receiptsObj[item.docnum] = {
              id: id,
              location_index: loc_index, // Replace with real coordinates
              service: parseInt(convertHrToSec(item.serviceTime)),
              description: item.docnum,
            }

            shipments.push({
              pickup: receiptsObj[item.docnum],
            })
            relationSteps.push({ type: 'pickup', id: id }) // Add to relations
          } else {
            jobs.push({
              id: id,
              location_index: loc_index, // Replace with real coordinates
              service: parseInt(convertHrToSec(item.serviceTime)),
              description: item.docnum,
            })
            relationSteps.push({ type: 'job', id: id }) // Add to relations
          }
        }
      }

      for (let j = 0; j < selectedTripdata.length; j++) {
        let item = selectedTripdata[j]

        if (item.doctype !== 'PRECEIPT' && item.docnum) {
          const deliveryId = idCounter++

          let newCoord = `${item.lat},${item.lng}`
          let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index

          // Convert skills to an array (handle empty case)
          let skillsArray
          try {
            let parsedSkills = JSON.parse('[' + item.skills + ']')
            if (
              Array.isArray(parsedSkills) &&
              parsedSkills.every((skill) => typeof skill === 'number')
            ) {
              skillsArray = parsedSkills
              // loc_i = loc_i + 1;
            } else {
              console.warn(
                `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
              )
              // **Exclude the entire document**
            }
          } catch (e) {
            console.warn(
              `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
            )
            // **Exclude the entire document**
          }

          if (
            item.pairedDoc.trim() !== '' &&
            receiptPickupMap[item.pairedDoc]
          ) {
            // If delivery is linked to a receipt, create a shipment
            const shipment = shipments.find(
              (s) => s.pickup.id === receiptPickupMap[item.pairedDoc]
            )

            if (shipment) {
              // Add delivery to the existing shipment
              const deliveryKey = shipment.delivery
                ? `delivery_${Object.keys(shipment).length - 1}`
                : 'delivery'

              shipment[deliveryKey] = {
                id: deliveryId,
                location_index: loc_index,
                service:
                  parseInt(convertHrToSec(item.serviceTime)) +
                  parseInt(convertHrToSec(item.waitingTime)),
                description: item.docnum,
              }
              relationSteps.push({ type: 'delivery', id: deliveryId }) // Add delivery to relations
            } else {
              // Paired document exists but is not in reality
              jobs.push({
                id: deliveryId,
                location_index: loc_index, // Replace with real coordinates
                service:
                  parseInt(convertHrToSec(item.serviceTime)) +
                  parseInt(convertHrToSec(item.waitingTime)),
                description: item.docnum,
              })
              relationSteps.push({ type: 'job', id: deliveryId }) // Add job to relations
            }
          } else {
            // If no pairing, add as a standalone job
            if (item.pairedDoc.trim() === '') {
              jobs.push({
                id: deliveryId,
                location_index: loc_index, // Replace with real coordinates
                service:
                  parseInt(convertHrToSec(item.serviceTime)) +
                  parseInt(convertHrToSec(item.waitingTime)),
                description: item.docnum,
              })
              relationSteps.push({ type: 'job', id: deliveryId }) // Add to relations
            }
          }
        }
        //  DocListM.push(Doc);
      }
    } else {
      for (let j1 = 0; j1 < selectedTripdata.length; j1++) {
        let item = selectedTripdata[j1]
        if (item.doctype === 'PRECEIPT' && item.docnum) {
          const id = idCounter++

          let newCoord = `${item.lat},${item.lng}`
          let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index

          // Convert skills to an array (handle empty case)
          //   const skills = item.skills ? JSON.parse("[" + item.skills + "]") : [];

          let skillsArray
          try {
            let parsedSkills = JSON.parse('[' + item.skills + ']')
            if (
              Array.isArray(parsedSkills) &&
              parsedSkills.every((skill) => typeof skill === 'number')
            ) {
              skillsArray = parsedSkills
              // loc_i = loc_i + 1;
            } else {
              console.warn(
                `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
              )
              // **Exclude the entire document**
            }
          } catch (e) {
            console.warn(
              `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
            )
            // **Exclude the entire document**
          }

          if (item.pairedDoc && item.pairedDoc.trim() !== '') {
            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }

            receiptPickupMap[item.docnum] = id
            receiptsObj[item.docnum] = {
              id: id,
              location_index: loc_index, // Replace with real coordinates
              service:
                parseInt(convertHrToSec(item.serviceTime)) +
                parseInt(convertHrToSec(item.waitingTime)),
              [weightKey]: [parseInt(item.netweight), parseInt(item.volume)],
              description: item.docnum,
              skills: skillsArray,
              priority: parseInt(item.priority),
            }

            shipments.push({
              pickup: receiptsObj[item.docnum],
            })
            relationSteps.push({ type: 'pickup', id: id }) // Add to relations
          } else {
            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }

            let timeWindw = []
            let FromArr
            let fromflag = false
            let toflag = false
            if (item.fromTime.length > 0) {
              FromArr = item.fromTime.split(' ')
              fromflag = true
            }
            let ToArr
            if (item.toTime.length > 0) {
              ToArr = item.toTime.split(' ')
              toflag = true
            }
            fromflag &&
              FromArr.map((ft, index) => {
                var tt = []
                tt.push(splitTimeAndConv2Sec(ft))
                tt.push(splitTimeAndConv2Sec(ToArr[index]))

                timeWindw.push(tt)
              })

            if (fromflag) {
              item.time_windows = timeWindw
            }

            jobs.push({
              id: id,
              location_index: loc_index, // Replace with real coordinates
              service:
                parseInt(convertHrToSec(item.serviceTime)) +
                parseInt(convertHrToSec(item.waitingTime)),
              [weightKey]: [parseInt(item.netweight), parseInt(item.volume)],
              description: item.docnum,
              skills: skillsArray,
              priority: parseInt(item.priority),
              time_windows: timeWindw,
            })
            relationSteps.push({ type: 'job', id: id }) // Add to relations
          }
        }
      }

      for (let j = 0; j < selectedTripdata.length; j++) {
        let item = selectedTripdata[j]

        if (item.doctype !== 'PRECEIPT' && item.docnum) {
          const deliveryId = idCounter++

          let newCoord = `${item.lat},${item.lng}`
          let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index

          // Convert skills to an array (handle empty case)
          let skillsArray
          try {
            let parsedSkills = JSON.parse('[' + item.skills + ']')
            if (
              Array.isArray(parsedSkills) &&
              parsedSkills.every((skill) => typeof skill === 'number')
            ) {
              skillsArray = parsedSkills
              // loc_i = loc_i + 1;
            } else {
              console.warn(
                `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
              )
              // **Exclude the entire document**
            }
          } catch (e) {
            console.warn(
              `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
            )
            // **Exclude the entire document**
          }

          if (
            item.pairedDoc.trim() !== '' &&
            receiptPickupMap[item.pairedDoc]
          ) {
            // If delivery is linked to a receipt, create a shipment
            const shipment = shipments.find(
              (s) => s.pickup.id === receiptPickupMap[item.pairedDoc]
            )

            if (shipment) {
              // Add delivery to the existing shipment
              const deliveryKey = shipment.delivery
                ? `delivery_${Object.keys(shipment).length - 1}`
                : 'delivery'
              if (
                item.doctype == 'PICK' ||
                item.doctype == 'DLV' ||
                item.doctype == 'MISCDROP'
              ) {
                weightKey = 'delivery'
              } else if (
                item.doctype == 'RETURN' ||
                item.doctype == 'MISCPICK' ||
                item.doctype == 'PRECEIPT'
              ) {
                weightKey = 'pickup'
              }
              shipment[deliveryKey] = {
                id: deliveryId,
                location_index: loc_index,
                service:
                  parseInt(convertHrToSec(item.serviceTime)) +
                  parseInt(convertHrToSec(item.waitingTime)),
                [weightKey]: [parseInt(item.netweight), parseInt(item.volume)],
                description: item.docnum,
                skills: skillsArray,
                priority: parseInt(item.priority),
              }
              relationSteps.push({ type: 'delivery', id: deliveryId }) // Add delivery to relations
            } else {
              // Paired document exists but is not in reality
              if (
                item.doctype == 'PICK' ||
                item.doctype == 'DLV' ||
                item.doctype == 'MISCDROP'
              ) {
                weightKey = 'delivery'
              } else if (
                item.doctype == 'RETURN' ||
                item.doctype == 'MISCPICK' ||
                item.doctype == 'PRECEIPT'
              ) {
                weightKey = 'pickup'
              }

              jobs.push({
                id: deliveryId,
                location_index: loc_index, // Replace with real coordinates
                service:
                  parseInt(convertHrToSec(item.serviceTime)) +
                  parseInt(convertHrToSec(item.waitingTime)),
                [weightKey]: [parseInt(item.netweight), parseInt(item.volume)],
                description: item.docnum,
                skills: skillsArray,
                priority: parseInt(item.priority),
              })
              relationSteps.push({ type: 'job', id: deliveryId }) // Add job to relations
            }
          } else {
            // If no pairing, add as a standalone job
            if (item.pairedDoc.trim() === '') {
              if (
                item.doctype == 'PICK' ||
                item.doctype == 'DLV' ||
                item.doctype == 'MISCDROP'
              ) {
                weightKey = 'delivery'
              } else if (
                item.doctype == 'RETURN' ||
                item.doctype == 'MISCPICK' ||
                item.doctype == 'PRECEIPT'
              ) {
                weightKey = 'pickup'
              }
              jobs.push({
                id: deliveryId,
                location_index: loc_index, // Replace with real coordinates
                service:
                  parseInt(convertHrToSec(item.serviceTime)) +
                  parseInt(convertHrToSec(item.waitingTime)),
                [weightKey]: [parseInt(item.netweight), parseInt(item.volume)],
                description: item.docnum,
                skills: skillsArray,
                priority: parseInt(item.priority),
              })
              relationSteps.push({ type: 'job', id: deliveryId }) // Add to relations
            }
          }
        }
        //  DocListM.push(Doc);
      }
    }
    relationSteps.push({ type: 'end' })

    if (!OptimisationFlag) {
      relations.push({
        type: 'in_sequence',
        steps: relationSteps,
        vehicle: VehicleID_Relations, // Ensure it follows the same vehicle route
      })

      relations.push({
        type: 'in_same_route',
        steps: relationSteps,
      })
    }

    let finallocationList = locationArraybefore // for another type optimisation this.formatLocationCoordinates(locationArraybefore);
    let locactionsFinal = {
      id: 1,
      location: finallocationList,
    }

    let nextBillonObject = {
      jobs: jobs,
      shipments: shipments,
      options: vehile_profile_options,
      //   "options": vehile_profile_options,
      locations: locactionsFinal,
      relations: relations,
      vehicles: VehListM,
    }

    try {
      let response = await fetch(`${postAPICode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextBillonObject),
      })
      if (response.status === 200) {
        if (!response.ok) {
          const errorDetails = await response.json()
          console.error('THHH Error:', errorDetails)
          this.setState({ loader: false })
        } else {
          const data = await response.json()
          await this.OrganiseNextBillionsResponse_GroupOptimise(
            data,
            selSite,
            vehObject,
            processtrip
          ) //  await this.submitRoutesforTripsCreationOSRMManually(response.routes, selSite, vehObject, processtrip,[], response);
          this.setState({ loader: false })
        }
      } else {
        console.error('THHH Error in ArcGIS response:', response.status)
        this.setState({ loader: false })
      }
    } catch (error) {
      console.error('Error in processing trip:', error)
      this.setState({
        errorMessage: 'Error in processing trip',
        loader: false,
        addAlertShow: true,
      })
    }
  }


  getLastTripEndTimeForVehicle = async (vehicleCode) => {
    let trips = this.state.tripsPanel || []

    console.log("Group Opti Last Trip End time insdie process 1", trips)
    // filter trips for same vehicle
    let vehicleTrips = trips.filter(
      trip => trip.code === vehicleCode
    )

    console.log("Group Opti Last Trip End time insdie process 2", vehicleTrips)
    if (vehicleTrips.length === 0) return null

    // get latest end time
    let lastTrip = vehicleTrips.reduce((latest, trip) => {
      let tripEnd =
        trip.endTime
          ? trip.endTime
          : splitTimeAndConv2Sec(trip.endtime)

      let latestEnd =
        latest.endTime
          ? latest.endTime
          : splitTimeAndConv2Sec(latest.endtime)

      return tripEnd > latestEnd ? trip : latest
    })
    console.log("Group Opti Last Trip End time insdie process", lastTrip)

    return lastTrip.endTime
      ? lastTrip.endTime
      : splitTimeAndConv2Sec(lastTrip.endtime)
  }


  NB_manuallytrip = async (optitrip, from, updatedDAtefromTimeline) => {
    this.setState({ loader: true, loaderText: 'Loading please wait...' })
    let processtrip = optitrip

    let vehile_profile_options = {
      grouping: {
        proximity_factor: 5
      },
      routing: {
        mode: 'car',
        profiles: {
          car: {
            mode: 'car',
          },
          minivan: {
            mode: 'car',
            // truck_size: '200,210,400',
            avoid: [],
          },
        },
      },
    }

    let postAPICode =
      'https://api.nextbillion.io/optimization/v2?key=b1cebb49fcaa4366abcb19cfb12b43b3'

    let locationArraybefore = []

    let selectedTripdata = processtrip.totalObject.selectedTripData
    // get site details
    let VehListM = [],
      DocListM = []
    let veh = {},
      vehObject = {}
    let siteLatM, siteLangM
    let docM = {}
    let selSite = this.state.selectedMultipleSites[0]
    this.state.sites.map((site) => {
      if (selSite === site.id) {
        siteLatM = site.lat
        siteLangM = site.lng

        let newCoord = `${siteLatM},${siteLangM}`
        locationArraybefore.push(newCoord)
      }
    })

    // get vehicle from the vehicle list

    for (let vi = 0; vi < this.state.vehiclePanel.vehicles.length; vi++) {
      let tempveh = this.state.vehiclePanel.vehicles[vi]
      if (processtrip.code === tempveh.codeyve) {
        vehObject = tempveh
        let MVeh = {}

        MVeh.max_travel_time = convertHrToSec(tempveh.maxtotaltrvtime)

        if (tempveh.xmaxtotaldis === 'Miles') {
          MVeh.max_distance = Math.round(tempveh.maxtotaldist * 1609.34)
        } else {
          MVeh.max_distance = Math.round(tempveh.maxtotaldist * 1000)
        }
        MVeh.capacity = [parseInt(tempveh.capacities), parseInt(tempveh.vol)]
        MVeh.id = tempveh.codeyve
        MVeh.start_index = 0
        MVeh.end_index = 0

        MVeh.description = tempveh.codeyve

        let baseStartTime = splitTimeAndConv2Sec(tempveh.starttime)

        if (from === 'TimeLine') {
          baseStartTime = this.convertDateTimeToSeconds(updatedDAtefromTimeline)
        }
        let lastTripEndTime;

        if (processtrip.trips > 1) {
          // check if vehicle already exists in tripsPanel
          lastTripEndTime = await this.getLastTripEndTimeForVehicle(tempveh.codeyve)
        }


        console.log("Group Opti Last Trip End time", lastTripEndTime)
        let loadingHrs = convertHrToSec(tempveh.startdepots)

        let starttime = baseStartTime

        if (lastTripEndTime) {
          starttime = splitTimeAndConv2Sec(lastTripEndTime)
        }

        //    let starttime = splitTimeAndConv2Sec(tempveh.starttime)
        //let loadingHrs = convertHrToSec(tempveh.startdepots)
        let stime = starttime + loadingHrs
        let etime = splitTimeAndAddtimeAndConv2Sec(
          tempveh.starttime,
          tempveh.overtimestar
        )
        let timew = [stime, etime]
        let geo = [siteLangM, siteLatM]

        MVeh.time_window = timew
        MVeh.start = geo
        MVeh.end = geo
        var array = JSON.parse('[' + tempveh.skills + ']')
        // MVeh.skills = array
        if (veh.maxordercnt > 0) {
          MVeh.max_tasks = 99
        } else {
          MVeh.max_tasks = 99
        }
        //            let breakArray = [];
        //          let Break1 = {
        //                      				"id": 1,
        //                      				"time_windows": [[1662105600, 1662148800]],
        //                      				"service": 120
        //                      			}
        //
        //                      breakArray.push(Break1);
        //
        //                      MVeh.breaks = breakArray;
        //                      let continousdrivingBreak =  {
        //                                     "max_continuous_driving": 14400,
        //                                     "layover_duration": 900
        //                                 }
        //                          MVeh.drive_time_layover_config =   continousdrivingBreak;  // continous break based on driving
        //                       //   MVeh.profile =  "car";

        MVeh.profile = 'car'
        VehListM.push(MVeh)
        break
      }
    }

    // get the list of documents to process
    const jobs = []
    const shipments = []
    const receiptPickupMap = {}
    const receiptsObj = {}
    let idCounter = 1 // Start ID from 1

    for (let j1 = 0; j1 < selectedTripdata.length; j1++) {
      let item = selectedTripdata[j1]
      if (item.doctype === 'PRECEIPT' && item.docnum) {
        const id = idCounter++

        let newCoord = `${item.lat},${item.lng}`
        let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index

        // Convert skills to an array (handle empty case)
        //   const skills = item.skills ? JSON.parse("[" + item.skills + "]") : [];

        let skillsArray
        try {
          let parsedSkills = JSON.parse('[' + item.skills + ']')
          if (
            Array.isArray(parsedSkills) &&
            parsedSkills.every((skill) => typeof skill === 'number')
          ) {
            skillsArray = parsedSkills
            // loc_i = loc_i + 1;
          } else {
            console.warn(
              `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
            )
            // **Exclude the entire document**
          }
        } catch (e) {
          console.warn(
            `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
          )
          // **Exclude the entire document**
        }

        if (item.pairedDoc && item.pairedDoc.trim() !== '') {
          receiptPickupMap[item.docnum] = id
          receiptsObj[item.docnum] = {
            id: id,
            location_index: loc_index, // Replace with real coordinates
            service: parseInt(convertHrToSec(item.serviceTime)),
            amount: [parseInt(item.netweight), parseInt(item.volume)],
            description: item.docnum,
            priority: parseInt(item.priority),
          }

          shipments.push({
            pickup: receiptsObj[item.docnum],
          })
        } else {
          jobs.push({
            id: id,
            location_index: loc_index, // Replace with real coordinates
            service: parseInt(convertHrToSec(item.serviceTime)),
            amount: [parseInt(item.netweight), parseInt(item.volume)],
            description: item.docnum,
            priority: parseInt(item.priority),
          })
        }
      }
    }

    for (let j = 0; j < selectedTripdata.length; j++) {
      let item = selectedTripdata[j]

      if (item.doctype !== 'PRECEIPT' && item.docnum) {
        const deliveryId = idCounter++

        let newCoord = `${item.lat},${item.lng}`
        let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index

        // Convert skills to an array (handle empty case)
        let skillsArray
        try {
          let parsedSkills = JSON.parse('[' + item.skills + ']')
          if (
            Array.isArray(parsedSkills) &&
            parsedSkills.every((skill) => typeof skill === 'number')
          ) {
            skillsArray = parsedSkills
            // loc_i = loc_i + 1;
          } else {
            console.warn(
              `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
            )
            // **Exclude the entire document**
          }
        } catch (e) {
          console.warn(
            `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
          )
          // **Exclude the entire document**
        }

        if (item.pairedDoc.trim() !== '' && receiptPickupMap[item.pairedDoc]) {
          // If delivery is linked to a receipt, create a shipment
          const shipment = shipments.find(
            (s) => s.pickup.id === receiptPickupMap[item.pairedDoc]
          )

          if (shipment) {
            // Add delivery to the existing shipment
            const deliveryKey = shipment.delivery
              ? `delivery_${Object.keys(shipment).length - 1}`
              : 'delivery'

            shipment[deliveryKey] = {
              id: deliveryId,
              location_index: loc_index,
              service: parseInt(convertHrToSec(item.serviceTime)),
              amount: [parseInt(item.netweight), parseInt(item.volume)],
              description: item.docnum,
              priority: parseInt(item.priority),
            }
          } else {
            // Paired document exists but is not in reality
            jobs.push({
              id: deliveryId,
              location_index: loc_index, // Replace with real coordinates
              service: parseInt(convertHrToSec(item.serviceTime)),
              amount: [parseInt(item.netweight), parseInt(item.volume)],
              description: item.docnum,
              priority: parseInt(item.priority),
            })
          }
        } else {
          // If no pairing, add as a standalone job
          if (item.pairedDoc.trim() === '') {
            jobs.push({
              id: deliveryId,
              location_index: loc_index, // Replace with real coordinates
              service: 0, //parseInt(convertHrToSec(item.serviceTime)),
              amount: [parseInt(item.netweight), parseInt(item.volume)],
              description: item.docnum,
              priority: parseInt(item.priority),
            })
          }
        }
      }
      //  DocListM.push(Doc);
    }

    let finallocationList = locationArraybefore // for another type optimisation this.formatLocationCoordinates(locationArraybefore);
    let locactionsFinal = {
      id: 1,
      location: finallocationList,
    }

    let nextBillonObject = {
      jobs: jobs,
      shipments: shipments,
      options: vehile_profile_options,
      //   "options": vehile_profile_options,
      locations: locactionsFinal,
      vehicles: VehListM,
    }

    try {
      let response = await fetch(`${postAPICode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextBillonObject),
      })
      if (response.status === 200) {
        if (!response.ok) {
          const errorDetails = await response.json()
          console.error('THHH Error:', errorDetails)
          this.setState({ loader: false })
        } else {
          const data = await response.json()
          await this.OrganiseNextBillionsResponse_GroupOptimise(
            data,
            selSite,
            vehObject,
            processtrip
          ) //  await this.submitRoutesforTripsCreationOSRMManually(response.routes, selSite, vehObject, processtrip,[], response);
          //  this.setState({ loader: false });

        }
      } else {
        console.error('THHH Error in ArcGIS response:', response.status)
        this.setState({ loader: false })
      }
    } catch (error) {
      console.error('Error in processing trip:', error)
      this.setState({
        errorMessage: 'Error in processing trip',
        loader: false,
        addAlertShow: true,
      })
    }
  }

  OptimisemanuallywithNB11 = async (Optimisedtrips) => {

    for (let tt = 0; tt < Optimisedtrips.length; tt++) {
      await this.NB_manuallytrip(Optimisedtrips[tt])
    }
  }

  refreshTripsPanel = async () => {
    await this.reloadTrips() // API call
  }

  OptimisemanuallywithNB = async (Optimisedtrips) => {
    for (let tt = 0; tt < Optimisedtrips.length; tt++) {
      const result = await this.NB_manuallytrip(Optimisedtrips[tt])
      console.log("Group Optimisation ", result)
      //if (result?.success) {
      await this.refreshTripsPanel()
      // }
    }
  }

  groupNextBillionsOptmiseTrips = () => {
    let OptimisedtripsPanel = this.state.tripsPanel
    let Optimisedtrips = []
    for (let ttrip in OptimisedtripsPanel) {
      if (OptimisedtripsPanel[ttrip].optistatus === 'Open') {
        Optimisedtrips.push(OptimisedtripsPanel[ttrip])
      }
    }
    if (Optimisedtrips.length > 0) {
      this.OptimisemanuallywithNB(Optimisedtrips)
    } else {
      this.setState({
        errorMessage: 'No trips are in open status to do optimization.',
        loader: false,
        addAlertShow: true,
      })
    }
  }

  groupOptmiseTrips = () => {
    let OptimisedtripsPanel = this.state.tripsPanel
    let Optimisedtrips = []
    for (let ttrip in OptimisedtripsPanel) {
      if (OptimisedtripsPanel[ttrip].optistatus === 'Open') {
        Optimisedtrips.push(OptimisedtripsPanel[ttrip])
      }
    }

    if (Optimisedtrips.length > 0) {
      this.OptimisemanuallywithOSRM(Optimisedtrips)
    } else {
      this.setState({
        errorMessage: 'No trips are in open status to do optimization.',
        loader: false,
        addAlertShow: true,
      })
    }
  }

  // autofromselection = (SelDocs, selVeh, selDrivers) => {
  //   let tempTripPanel = this.state.tripsPanel;
  //   if (selVeh.length > 0 && SelDocs.length > 0) {
  //     this.setState({ loader: true });
  //     let VehList = [],
  //       DocList = [];
  //     let sameVehiclesflag = this.state.checkedsameVehicles;
  //     let VehStartTime, VehEndTime;
  //     var siteLat, siteLang;
  //     var doc = {};
  //     var selSite = this.state.selectedMultipleSites[0];
  //     this.state.sites.map((site) => {
  //       if (selSite === site.id) {
  //         siteLat = site.lat;
  //         siteLang = site.lng;
  //       }
  //     });

  //     let resArr = [];
  //     tempTripPanel.filter(function (item) {
  //       var i = resArr.findIndex((x) => x.code == item.code);
  //       if (i <= -1) {
  //         resArr.push(item);
  //       }
  //       return null;
  //     });

  //     for (let i = 0; i < selVeh.length; i++) {
  //       var Veh = {};
  //       let veh = selVeh[i];
  //       var sflag = false;
  //       var prevEndTime = 0;

  //       for (let t = 0; t < resArr.length; t++) {
  //         var currtrip = resArr[t];
  //         if (currtrip.code === veh.codeyve) {
  //           sflag = true;
  //           var endTime = splitTimeAndConv2Sec(currtrip.endTime);
  //           var unloadingtime = convertHrToSec(veh.enddepotserv);
  //           prevEndTime = endTime + unloadingtime;
  //           break;
  //         }
  //       }

  //       if (!sameVehiclesflag && !sflag) {
  //         Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
  //         Veh.capacity = [veh.capacities];
  //         Veh.id = i + 1;
  //         Veh.description = veh.codeyve;
  //         let starttime = splitTimeAndConv2Sec(veh.starttime);
  //         let loadingHrs = convertHrToSec(veh.startdepots);
  //         let stime = starttime + loadingHrs;
  //         let etime = splitTimeAndAddtimeAndConv2Sec(
  //           veh.starttime,
  //           veh.overtimestar
  //         );
  //         let timew = [stime, etime];
  //         let geo = [siteLang, siteLat];

  //         Veh.time_window = timew;
  //         Veh.start = geo;
  //         Veh.end = geo;
  //            var array = JSON.parse('[' + veh.skills + ']')
  //           Veh.skills = array

  //         if (veh.maxordercnt > 0) {
  //           Veh.max_tasks = veh.maxordercnt;
  //         } else {
  //           Veh.max_tasks = 3;
  //         }
  //         VehList.push(Veh);
  //         VehEndTime = etime;
  //         VehStartTime = stime;
  //       } else if (sameVehiclesflag || sflag) {
  //         let starttime = prevEndTime;
  //         let loadingHrs = convertHrToSec(veh.startdepots);
  //         let stime = starttime + loadingHrs;
  //         let etime = splitTimeAndAddtimeAndConv2Sec(
  //           veh.starttime,
  //           veh.overtimestar
  //         );

  //         if (stime < etime) {
  //           Veh.id = i + 1;
  //           Veh.description = veh.codeyve;
  //           Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime);
  //           Veh.capacity = [veh.capacities];

  //           let timew = [stime, etime];
  //           let geo = [siteLang, siteLat];
  //           Veh.time_window = timew;
  //           Veh.start = geo;
  //           Veh.end = geo;
  //              var array = JSON.parse('[' + veh.skills + ']')
  //              if(array.length > 0) {

  //             Veh.skills = array
  //             }
  //           if (veh.maxordercnt > 0) {
  //             Veh.max_tasks = veh.maxordercnt;
  //           } else {
  //             Veh.max_tasks = 3;
  //           }

  //           VehList.push(Veh);
  //           VehEndTime = etime;
  //           VehStartTime = stime;
  //         }
  //       }
  //     }
  //     let maxDoc = this.state.defaultdocprocess;
  //     let docprocessedCount = 0;
  //     for (let j = 0; j < SelDocs.length; j++) {
  //       let doc = SelDocs[j];
  //       if (
  //         (doc.type === "open" || doc.type === "Allocated") &&
  //         (doc.dlvystatus === "0" || doc.dlvystatus === "8") &&
  //         docprocessedCount < maxDoc
  //       ) {
  //         var Doc = {};
  //         Doc.id = j + 1;
  //         Doc.description = doc.docnum;

  //         var FromArr;
  //         var fromflag = false;
  //         var toflag = false;
  //         if (doc.fromTime.length > 0) {
  //           FromArr = doc.fromTime.split(" ");
  //           fromflag = true;
  //         }
  //         var ToArr;
  //         if (doc.toTime.length > 0) {
  //           ToArr = doc.toTime.split(" ");
  //           toflag = true;
  //         }

  //         var timeWindw = [];

  //         fromflag &&
  //           FromArr.map((ft, index) => {
  //             var tt = [];
  //             tt.push(splitTimeAndConv2Sec(ft));
  //             tt.push(splitTimeAndConv2Sec(ToArr[index]));

  //             timeWindw.push(tt);
  //           });


  //         var DocLat, DocLang;
  //         DocLat = doc.lat;
  //         DocLang = doc.lng;
  //         Doc.location = [DocLang, DocLat];
  //         Doc.priority = doc.priority;
  //         Doc.amount = [Math.round(doc.netweight)];
  //           var array1 = JSON.parse('[' + doc.skills + ']')
  //         //  Veh.skills = array;
  //         if(array1.length > 0) {
  //         // Doc.skills = (doc.skills).split(',');

  //          Doc.skills = array1
  //         }
  //         let wtime =
  //           convertHrToSec(doc.waitingTime) + convertHrToSec(doc.serviceTime);
  //         Doc.service = parseInt(wtime);
  //         let ps,
  //           pe = 0;
  //         let ds,
  //           de = 0;

  //         if (fromflag) {
  //           Doc.time_windows = timeWindw;
  //         }
  //         /*
  //         ps = VehStartTime + 10800;
  //         ds = VehStartTime ;
  //         pe = VehEndTime ;
  //         de = VehStartTime + 10800;
  //         if(doc.doctype === "PRECEIPT") {
  //           //Doc.time_windows = [0,28800]
  //         //Doc.time_window = [36000, 54000];
  //         Doc.time_windows = [[ps, pe]];

  //         }
  //         else {
  //      Doc.time_windows =[[ds,de]];
  //         }
  //   */

  //         DocList.push(Doc);
  //         docprocessedCount = docprocessedCount + 1;
  //       }
  //     }

  //     //process for the JSON file
  //     var processedData = {};
  //     processedData.vehicles = VehList;
  //     processedData.jobs = DocList;
  //     processedData.options = {
  //       g: false,
  //     };

  //     // latest - 34.171.208.219
  //     // v10   - 34.134.143.219
  //     //new frane  - 34.118.143.128
  //     //34.136.15.124
  //     //34.132.234.177
  //     // US-west instance 34.95.36.63
  //     // 35.223.68.187 - new USA north america
  //     // 35.239.36.13  - great Britan & France

  //     //latest - 22/08/23 --- http://34.118.143.128:3000

  //     let ssitecur = this.state.selectedSite && this.state.selectedSite.id;
  //     let uurl = "";

  //     uurl = "https://maps.tema-systems.com";

  //     /*
  //      if(ssitecur === 'BERTO' || ssitecur ==== 'EXODU') {
  //         uurl = 'http://35.223.68.187:3000'
  //      }
  //      else {
  //        uurl = 'http://35.239.36.13:3000'
  //      }
  //   */
  //     fetch(uurl, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(processedData),
  //     })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           return response.json();
  //         } else {
  //           var StatusErrorMessage = response.statusText;
  //           this.setState({
  //             errorMessage:  StatusErrorMessage ,
  //             loader: false,
  //             addAlertShow: true,
  //           });
  //         }
  //       })
  //       .then((res) => {
  //         if (res.routes.length > 0) {
  //           this.submitRoutesforTripsCreation(res.routes, selSite, SelDocs , selDrivers);
  //         } else {
  //           this.setState({
  //             errorMessage:
  //               "Trips are not generated, Due to Documents are Not In Range",
  //             loader: false,
  //             addAlertShow: true,
  //           });
  //         }
  //       });
  //   } else {
  //     if (selVeh.length === 0) {
  //       this.setState({
  //         errorMessage:
  //           "Please choose at least one vehicle. There are no vehicles selected. ",
  //         addAlertShow: true,
  //       });
  //     } else {
  //       this.setState({
  //         errorMessage:
  //           "Please choose at least one document. There are no documents selected.",
  //         addAlertShow: true,
  //       });
  //     }
  //   }
  // };

  ExceptionalanalysisManual = async (
    selectedDocs,
    SelectedVehicles,
    res,
    tripsfromAuto
  ) => {
    let totalSelectedDocs = selectedDocs.length
    let unassignedDocCount = res?.unassigned?.length ?? 0
    let unassignedDocs = res.unassigned
    let trips = res?.routes.length
    let assignedDocs = totalSelectedDocs - unassignedDocCount
    let glabalSummaryOBject = ''
    let summarybox = []
    let noneDocs = []
    let allDocs = this.state.docsPanel
    let vehicleAssignedDocCount = {}

    let selVeh = SelectedVehicles

    let tempselDocs = []
    if (unassignedDocs?.length) {
      unassignedDocs.map((undoc, index) => {
        for (let tempdoc of selectedDocs) {
          if (tempdoc.docnum === undoc.description) {
            tempselDocs.push(tempdoc)
            break
          }
        }
      })
    }

    // Initialize counts from tripsfromAuto or from previous calculation

    const vehicleCode = tripsfromAuto.vehicleObject.name
    const dropCount = tripsfromAuto.dropObject
      ? tripsfromAuto.dropObject.length
      : 0
    const pickupCount = tripsfromAuto.pickupObject
      ? tripsfromAuto.pickupObject.length
      : 0

    vehicleAssignedDocCount[vehicleCode] = dropCount + pickupCount

    summarybox.push(
      ` ${trips} trips have been successfully optimized, containing a total of  ${assignedDocs} documents  \n`
    )
    summarybox.push(
      `${unassignedDocCount} out of ${totalSelectedDocs} documents have been excluded from the trip optimization process. \n`
    )

    // summarybox.push(glabalSummaryOBject);
    // `Trips ${trips} are generated with ${assignedDocs} Documents  \n`;

    let errorbox = []

    //

    // specifically checking which vehicle weight exceed

    // Track assigned weight and volume per vehicle
    let vehicleAssignedWeight = {}
    let vehicleAssignedVolume = {}

    tempselDocs.forEach((doc) => {
      let glbalmissingskill = []
      let tempoptiError = {
        docnum: '',
        skillerrorflg: false,
        skillmessage: '',
        capacatyflg: false,
        capacityError: '',
        generalflg: false,
        genearalError: '',
      }
      // let glabalerrorOBject = [];

      let regionflg = true

      let errorMessagesArray = []

      if (regionflg) {
        errorMessagesArray.push(
          `$Document ${doc.docnum} has been excluded because the vehicle time window does not align with the delivery schedule.`
        )
      }
      let glabalerrorOBject = errorMessagesArray
        .map((msg) => msg + '\n')
        .join('')

      errorbox.push(glabalerrorOBject + '\n')
    })
    //   errorbox.push(glabalerrorOBject);

    const finalErrorMessage = errorbox.join('\n')

    this.setState({
      errorArrayMessage: errorbox,
      errorSummartMessage: summarybox,
      errorNotesArray: '',
      loader: false,
      addAlertSummaryShow: true,
    })
  }


  Exceptionalanalysis1134 = (
    selectedDocs,
    SelectedVehicles,
    res,
    X3SetupErrors,
    from,
    assignedShipments,
    assignedJobs,
    jobId,
    extraError,
    customerJobMap,
    NotesBox
  ) => {
    /* --------------------------------------
       NORMALIZE RESULT (SAFE)
    -------------------------------------- */
    const routes = Array.isArray(res?.routes) ? res.routes : [];
    const unassigned = Array.isArray(res?.unassigned) ? res.unassigned : [];
    const summary = res?.summary || { delivery: [0, 0, 0] };

    const trips = routes.length;
    const noTripsGenerated = trips === 0;

    const totalSelectedDocs = selectedDocs.length;
    let unassignedDocCount = unassigned.length + (extraError?.length || 0);
    let assignedDocs = noTripsGenerated ? 0 : totalSelectedDocs - unassignedDocCount;

    const totalDocsWeight = summary.delivery[0] || 0;
    const totalDocsVolume = summary.delivery[1] || 0;
    const totalDocsCases = summary.delivery[2] || 0;

    /* --------------------------------------
       SUMMARY
    -------------------------------------- */
    const summarybox = [];

    if (noTripsGenerated) {
      summarybox.push(
        `No trips could be generated for the selected documents.\n`
      );
      summarybox.push(
        `All ${totalSelectedDocs} documents have been excluded from the trip optimization process.\n`
      );
    } else {
      summarybox.push(
        `${trips} trips have been auto generated containing a total of ${assignedDocs} documents.\n`
      );
      summarybox.push(
        `${unassignedDocCount} out of ${totalSelectedDocs} documents have been excluded from the trip optimization process.\n`
      );
    }

    /* --------------------------------------
       MAP UNASSIGNED → DOCUMENTS
    -------------------------------------- */
    const tempselDocs = [];

    if (from === 'auto_next') {
      unassigned.forEach(undoc => {
        if (undoc.type === 'job') {
          const job = assignedJobs.find(j => j.id === undoc.id);
          if (job) {
            selectedDocs
              .filter(d => d.docnum === job.description)
              .forEach(d => tempselDocs.push({ ...d, reason: undoc.reason }));
          }
        }
      });
    }

    /* --------------------------------------
       CUSTOMER DISPLAY MAP
    -------------------------------------- */
    const customerDisplayMap = {};
    selectedDocs.forEach(doc => {
      if (doc.bpcode && !customerDisplayMap[doc.bpcode]) {
        customerDisplayMap[doc.bpcode] =
          `${doc.bpname || 'Unknown Customer'} (${doc.bpcode})`;
      }
    });

    /* --------------------------------------
       VEHICLE SKILL SET
    -------------------------------------- */
    const vehicleSkillSet = new Set();
    SelectedVehicles.forEach(v => {
      JSON.parse('[' + v.skills + ']').forEach(s => vehicleSkillSet.add(s));
    });

    const isRouteCode = s => s >= 1 && s <= 100;
    const isProductCategory = s => s >= 101 && s <= 200;
    const isVehicleClass = s => s >= 501;

    /* --------------------------------------
       SKILL MISMATCH (HIGHEST PRIORITY)
    -------------------------------------- */
    const skillMismatchByCustomer = {};

    tempselDocs.forEach(doc => {
      const custKey = doc.bpcode || 'UNKNOWN';
      const skills = JSON.parse('[' + doc.skills + ']');

      const missingRoute = skills.some(s => isRouteCode(s) && !vehicleSkillSet.has(s));
      const missingVehicleClass = skills.some(s => isVehicleClass(s) && !vehicleSkillSet.has(s));
      const missingProduct = skills.some(s => isProductCategory(s) && !vehicleSkillSet.has(s));

      if (missingRoute || missingVehicleClass || missingProduct) {
        if (!skillMismatchByCustomer[custKey]) {
          skillMismatchByCustomer[custKey] = {
            docs: [],
            missingRoute: false,
            missingVehicleClass: false,
            missingProduct: false
          };
        }

        skillMismatchByCustomer[custKey].docs.push(doc.docnum);
        skillMismatchByCustomer[custKey].missingRoute ||= missingRoute;
        skillMismatchByCustomer[custKey].missingVehicleClass ||= missingVehicleClass;
        skillMismatchByCustomer[custKey].missingProduct ||= missingProduct;
      }
    });

    const errorbox = [];

    Object.keys(skillMismatchByCustomer).forEach(custKey => {
      const entry = skillMismatchByCustomer[custKey];
      const customerLabel =
        customerDisplayMap[custKey] || `Customer ${custKey}`;

      const reasons = [];
      if (entry.missingRoute) reasons.push('Route Code');
      if (entry.missingVehicleClass) reasons.push('Vehicle Class');
      if (entry.missingProduct) reasons.push('Product Category');

      errorbox.push(
        `Customer ${customerLabel}: Pick tickets (${entry.docs.join(', ')}) ` +
        `do not match the ${reasons.join(', ')} of the selected vehicles.`
      );
    });

    const customersWithSkillIssue = new Set(Object.keys(skillMismatchByCustomer));

    /* --------------------------------------
       INFEASIBLE RELATION → VEHICLES OCCUPIED
    -------------------------------------- */
    const infeasibleByCustomer = {};

    tempselDocs.forEach(doc => {
      if (
        doc.reason &&
        doc.reason.toLowerCase().includes('infeasible relation')
      ) {
        const custKey = doc.bpcode || 'UNKNOWN';
        if (customersWithSkillIssue.has(custKey)) return;

        if (!infeasibleByCustomer[custKey]) {
          infeasibleByCustomer[custKey] = [];
        }
        infeasibleByCustomer[custKey].push(doc.docnum);
      }
    });

    Object.keys(infeasibleByCustomer).forEach(custKey => {
      const docs = infeasibleByCustomer[custKey];
      if (docs.length > 1) {
        const customerLabel =
          customerDisplayMap[custKey] || `Customer ${custKey}`;

        errorbox.push(
          `Customer ${customerLabel}: Pick tickets (${docs.join(', ')}) ` +
          `could not be assigned because all matching vehicles are already occupied with other trips.`
        );
      }
    });

    /* --------------------------------------
       ADD PRE-COMPUTED ERRORS
    -------------------------------------- */
    if (X3SetupErrors?.length) errorbox.push(...X3SetupErrors);
    if (extraError?.length) errorbox.push(...extraError);

    /* --------------------------------------
       FINAL STATE UPDATE
    -------------------------------------- */
    this.setState({
      errorArrayMessage: errorbox,
      errorSummartMessage: summarybox,
      errorNotesArray: NotesBox,
      loader: false,
      processID: jobId,
      addAlertSummaryShow: true
    });
  };

  // analyzeUnassignedDocs_OSRM = (selectedDocs, SelectedVehicles, res, tripsfromAuto) => {

  //   try {

  //     if (!res || !res.unassigned || res.unassigned.length === 0) return;

  //     const minLat = 9.982106;
  //     const maxLat = 10.85555;
  //     const minLng = -61.95056;
  //     const maxLng = -60.8988;

  //     const errors = [];

  //     const docMap = {};
  //     selectedDocs.forEach(d => docMap[d.docnum] = d);

  //     const tripVehicleCodes = tripsfromAuto.map(t => t.vehicleObject?.codeyve);

  //     res.unassigned.forEach(un => {

  //       const doc = docMap[un.description];
  //       console.log("Analyzing unassigned document:", un.description, doc);
  //       if (!doc) return;

  //       const reasons = [];

  //       const docId = doc.docnum;
  //       const docCustomer = `${doc.bpname} (${doc.bpcode})`;

  //       // ------------------------
  //       // 1 REGION CHECK
  //       // ------------------------

  //       if (
  //         doc.lat < minLat ||
  //         doc.lat > maxLat ||
  //         doc.lng < minLng ||
  //         doc.lng > maxLng
  //       ) {

  //         reasons.push("Coordinates are out of supported region");

  //       }

  //       // ------------------------
  //       // 2 ROUTE CODE CHECK
  //       // ------------------------

  //       let routeMatchedVehicles = [];

  //       if (doc.aroutecodeDesc === "ALL") {

  //         routeMatchedVehicles = SelectedVehicles;

  //       } else {

  //         const docRoutes = (doc.routeCode || "")
  //           .split(",")
  //           .map(r => r.trim());

  //         SelectedVehicles.forEach(v => {

  //           const vehicleRoutes = (v.routeCode || "")
  //             .split(",")
  //             .map(r => r.trim());

  //           const match = docRoutes.some(r => vehicleRoutes.includes(r));

  //           if (match) routeMatchedVehicles.push(v);

  //         });

  //         if (routeMatchedVehicles.length === 0) {

  //           reasons.push(
  //             `Route Code`
  //           );

  //         }
  //       }

  //       // ------------------------
  //       // 3 VEHICLE CLASS CHECK
  //       // ------------------------

  //       let classMatchedVehicles = [];

  //       if (doc.avehClassListDesc === "ALL") {

  //         classMatchedVehicles = routeMatchedVehicles;

  //       } else {

  //         const docClasses = (doc.vehClassList || "")
  //           .split(" ")
  //           .map(v => v.trim())
  //           .filter(Boolean);

  //         routeMatchedVehicles.forEach(v => {

  //           if (docClasses.includes(v.catego)) {
  //             classMatchedVehicles.push(v);
  //           }

  //         });

  //         if (classMatchedVehicles.length === 0) {

  //           reasons.push(
  //             `Vehicle Class`
  //           );

  //         }
  //       }

  //       // ------------------------
  //       // 4 TRIP CAPACITY CHECK
  //       // ------------------------

  //       classMatchedVehicles.forEach(v => {

  //         const trip = tripsfromAuto.find(
  //           t => t.vehicleObject?.codeyve === v.codeyve
  //         );

  //         if (!trip) return;

  //         const remainingWeight =
  //           Number(v.capacities) - Number(trip.doc_capacity || 0);

  //         const remainingCases =
  //           Number(v.maxCases) - Number(trip.mainCases || 0);

  //         const remainingPallets =
  //           Number(v.maxPallets) - Number(trip.totalCases || 0);

  //         if (doc.netweight > remainingWeight) {

  //           reasons.push(
  //             `Vehicle ${v.codeyve} has only ${remainingWeight}kg remaining weight capacity`
  //           );

  //         }

  //         if (Number(doc.mainCases) > remainingCases) {

  //           reasons.push(
  //             `Vehicle ${v.codeyve} has only ${remainingCases} cases remaining`
  //           );

  //         }

  //         if (Number(doc.mainPallets) > remainingPallets) {

  //           reasons.push(
  //             `Vehicle ${v.codeyve} has only ${remainingPallets} pallets remaining`
  //           );

  //         }

  //       });

  //       // ------------------------
  //       // 5 UNUSED VEHICLES CHECK
  //       // ------------------------

  //       const unusedVehicles = classMatchedVehicles.filter(
  //         v => !tripVehicleCodes.includes(v.codeyve)
  //       );

  //       unusedVehicles.forEach(v => {

  //         if (doc.netweight > v.capacities) {

  //           reasons.push(
  //             `Weight ${doc.netweight}kg exceeds vehicle ${v.codeyve} capacity ${v.capacities}kg`
  //           );

  //         }

  //         if (Number(doc.mainCases) > Number(v.maxCases)) {

  //           reasons.push(
  //             `Cases ${doc.mainCases} exceed vehicle ${v.codeyve} limit ${v.maxCases}`
  //           );

  //         }

  //         if (Number(doc.mainPallets) > Number(v.maxPallets)) {

  //           reasons.push(
  //             `Pallets ${doc.mainPallets} exceed vehicle ${v.codeyve} limit ${v.maxPallets}`
  //           );

  //         }

  //       });

  //       // ------------------------
  //       // 6 FALLBACK
  //       // ------------------------

  //       if (reasons.length === 0) {

  //         reasons.push(
  //           "Could not be assigned due to travel time or distance constraints"
  //         );

  //       }

  //       errors.push(
  //         `Customer ${docCustomer}: Pick Ticket (${docId}) does not match the ${reasons.join(" , ")} of the selected vehicles.`
  //       );

  //     });

  //     // ------------------------
  //     // SUMMARY
  //     // ------------------------

  //     let summary = [];

  //     const totalDocs = selectedDocs.length;
  //     const excludedDocs = errors.length;
  //     const assignedDocs = totalDocs - excludedDocs;
  //     const tripCount = res.routes.length;

  //     const docWord = totalDocs === 1 ? "document" : "documents";
  //     const tripWord = tripCount === 1 ? "trip" : "trips";
  //     const hasHave = totalDocs === 1 ? "has" : "have";

  //     if (tripCount === 0) {

  //       summary.push(
  //         "No trips could be generated for the selected documents."
  //       );

  //       summary.push(
  //         `All ${totalDocs} ${docWord} ${hasHave} been excluded from the trip optimization process.`
  //       );

  //     } else {

  //       summary.push(
  //         `${tripCount} ${tripWord} ${tripCount === 1 ? "has" : "have"} been automatically generated, containing a total of ${assignedDocs} ${assignedDocs === 1 ? "document" : "documents"}.`
  //       );

  //       summary.push(
  //         `${excludedDocs} out of ${totalDocs} ${docWord} ${hasHave} been excluded from the trip optimization process.`
  //       );

  //     }
  //     this.setState({
  //       errorArrayMessage: errors,
  //       errorSummartMessage: summary,
  //       addAlertSummaryShow: true,
  //       loader: false
  //     });

  //   } catch (err) {

  //     this.setState({
  //       errorArrayMessage: [`Unexpected error: ${err.message}`],
  //       errorSummartMessage: [],
  //       addAlertSummaryShow: true,
  //       loader: false
  //     });

  //   }

  // };

  // analyzeUnassignedDocs_OSRM = (selectedDocs, SelectedVehicles, res, tripsfromAuto) => {

  //   try {

  //     if (!res || !res.unassigned || res.unassigned.length === 0) return;

  //     const minLat = 9.982106;
  //     const maxLat = 10.85555;
  //     const minLng = -61.95056;
  //     const maxLng = -60.8988;

  //     const errors = [];
  //     const customerGroupedErrors = {};
  //     const individualGroupedErrors = {};

  //     const docMap = {};
  //     selectedDocs.forEach(d => docMap[d.docnum] = d);

  //     const tripVehicleCodes = tripsfromAuto.map(t => t.vehicleObject?.codeyve);

  //     res.unassigned.forEach(un => {

  //       const doc = docMap[un.description];
  //       if (!doc) return;

  //       const docId = doc.docnum;
  //       const docCustomer = `${doc.bpname} (${doc.bpcode})`;

  //       const groupedReasons = [];
  //       const individualReasons = [];

  //       // ------------------------
  //       // REGION CHECK
  //       // ------------------------

  //       if (
  //         doc.lat < minLat ||
  //         doc.lat > maxLat ||
  //         doc.lng < minLng ||
  //         doc.lng > maxLng
  //       ) {
  //         individualReasons.push("Coordinates");
  //       }

  //       // ------------------------
  //       // ROUTE CODE CHECK
  //       // ------------------------

  //       let routeMatchedVehicles = [];

  //       if (doc.aroutecodeDesc === "ALL") {

  //         routeMatchedVehicles = SelectedVehicles;

  //       } else {

  //         const docRoutes = (doc.routeCode || "")
  //           .split(",")
  //           .map(r => r.trim());

  //         SelectedVehicles.forEach(v => {

  //           const vehicleRoutes = (v.routeCode || "")
  //             .split(",")
  //             .map(r => r.trim());

  //           const match = docRoutes.some(r => vehicleRoutes.includes(r));

  //           if (match) routeMatchedVehicles.push(v);

  //         });

  //         if (routeMatchedVehicles.length === 0) {
  //           groupedReasons.push("Route Code");
  //         }
  //       }

  //       // ------------------------
  //       // VEHICLE CLASS CHECK
  //       // ------------------------

  //       let classMatchedVehicles = [];

  //       if (doc.avehClassListDesc === "ALL") {

  //         classMatchedVehicles = routeMatchedVehicles;

  //       } else {

  //         const docClasses = (doc.vehClassList || "")
  //           .split(" ")
  //           .map(v => v.trim())
  //           .filter(Boolean);

  //         routeMatchedVehicles.forEach(v => {

  //           if (docClasses.includes(v.catego)) {
  //             classMatchedVehicles.push(v);
  //           }

  //         });

  //         if (classMatchedVehicles.length === 0) {
  //           groupedReasons.push("Vehicle Class");
  //         }
  //       }

  //       // ------------------------
  //       // TRIP CAPACITY CHECK
  //       // ------------------------

  //       classMatchedVehicles.forEach(v => {

  //         const trip = tripsfromAuto.find(
  //           t => t.vehicleObject?.codeyve === v.codeyve
  //         );

  //         if (!trip) return;

  //         const remainingWeight =
  //           Number(v.capacities) - Number(trip.doc_capacity || 0);

  //         const remainingCases =
  //           Number(v.maxCases) - Number(trip.mainCases || 0);

  //         const remainingPallets =
  //           Number(v.maxPallets) - Number(trip.totalCases || 0);

  //         if (doc.netweight > remainingWeight) {
  //           individualReasons.push("Weight");
  //         }

  //         if (Number(doc.mainCases) > remainingCases) {
  //           individualReasons.push("Cases");
  //         }

  //         if (Number(doc.mainPallets) > remainingPallets) {
  //           individualReasons.push("Pallets");
  //         }

  //       });

  //       // ------------------------
  //       // UNUSED VEHICLES CHECK
  //       // ------------------------

  //       const unusedVehicles = classMatchedVehicles.filter(
  //         v => !tripVehicleCodes.includes(v.codeyve)
  //       );

  //       unusedVehicles.forEach(v => {

  //         if (doc.netweight > v.capacities) {
  //           individualReasons.push("Weight");
  //         }

  //         if (Number(doc.mainCases) > Number(v.maxCases)) {
  //           individualReasons.push("Cases");
  //         }

  //         if (Number(doc.mainPallets) > Number(v.maxPallets)) {
  //           individualReasons.push("Pallets");
  //         }

  //       });

  //       // ------------------------
  //       // GROUPED CUSTOMER ERRORS
  //       // ------------------------

  //       if (groupedReasons.length > 0) {

  //         if (!customerGroupedErrors[docCustomer]) {
  //           customerGroupedErrors[docCustomer] = {
  //             docs: [],
  //             reasons: new Set()
  //           };
  //         }

  //         customerGroupedErrors[docCustomer].docs.push(docId);

  //         groupedReasons.forEach(r =>
  //           customerGroupedErrors[docCustomer].reasons.add(r)
  //         );

  //       }

  //       // ------------------------
  //       // INDIVIDUAL REASON GROUPING
  //       // ------------------------

  //       if (individualReasons.length > 0) {

  //         const uniqueReasons = [...new Set(individualReasons)];
  //         const key = uniqueReasons.sort().join(" , ");

  //         if (!individualGroupedErrors[key]) {
  //           individualGroupedErrors[key] = new Set();
  //         }

  //         individualGroupedErrors[key].add(docId);

  //       }

  //       // ------------------------
  //       // FALLBACK
  //       // ------------------------

  //       if (groupedReasons.length === 0 && individualReasons.length === 0) {

  //         const key = "Travel Time / Distance";

  //         if (!individualGroupedErrors[key]) {
  //           individualGroupedErrors[key] = new Set();
  //         }

  //         individualGroupedErrors[key].add(docId);

  //       }

  //     });

  //     // ------------------------
  //     // BUILD CUSTOMER GROUPED ERRORS
  //     // ------------------------

  //     Object.keys(customerGroupedErrors).forEach(customer => {

  //       const docList = customerGroupedErrors[customer].docs.sort().join(", ");
  //       const reasons = Array.from(customerGroupedErrors[customer].reasons).join(" , ");

  //       errors.push(
  // `Customer : ${customer}
  // Pick Tickets : ${docList}
  // Reasons : ${reasons}`
  //       );

  //     });

  //     // ------------------------
  //     // BUILD INDIVIDUAL GROUPED ERRORS
  //     // ------------------------

  //     Object.keys(individualGroupedErrors).forEach(reason => {

  //       const docs = Array.from(individualGroupedErrors[reason]).sort().join(", ");

  //       errors.push(
  // `Pick Tickets : ${docs}
  // Reasons : ${reason}`
  //       );

  //     });

  //     // ------------------------
  //     // SUMMARY
  //     // ------------------------

  //     let summary = [];

  //     const totalDocs = selectedDocs.length;
  //     const excludedDocs = res.unassigned.length;
  //     const assignedDocs = totalDocs - excludedDocs;
  //     const tripCount = res.routes.length;

  //     const docWord = totalDocs === 1 ? "document" : "documents";
  //     const tripWord = tripCount === 1 ? "trip" : "trips";
  //     const hasHave = totalDocs === 1 ? "has" : "have";

  //     if (tripCount === 0) {

  //       summary.push(
  //         "No trips could be generated for the selected documents."
  //       );

  //       summary.push(
  //         `All ${totalDocs} ${docWord} ${hasHave} been excluded from the trip optimization process.`
  //       );

  //     } else {

  //       summary.push(
  //         `${tripCount} ${tripWord} ${tripCount === 1 ? "has" : "have"} been automatically generated, containing a total of ${assignedDocs} ${assignedDocs === 1 ? "document" : "documents"}.`
  //       );

  //       summary.push(
  //         `${excludedDocs} out of ${totalDocs} ${docWord} ${hasHave} been excluded from the trip optimization process.`
  //       );

  //     }

  //     this.setState({
  //       errorArrayMessage: errors,
  //       errorSummartMessage: summary,
  //       addAlertSummaryShow: true,
  //       loader: false
  //     });

  //   } catch (err) {

  //     this.setState({
  //       errorArrayMessage: [`Unexpected error: ${err.message}`],
  //       errorSummartMessage: [],
  //       addAlertSummaryShow: true,
  //       loader: false
  //     });

  //   }

  // };

  analyzeUnassignedDocs_OSRM = (selectedDocs, SelectedVehicles, res, tripsfromAuto, NotesExecptions) => {

    try {

      // if (!res || !res.unassigned || res.unassigned.length === 0) return;
      if (!res || !res.unassigned) return;

      if (res.unassigned.length === 0) {

        const totalDocs = selectedDocs.length;
        const tripCount = res.routes?.length || 0;

        const docWord = totalDocs === 1 ? "document" : "documents";
        const tripWord = tripCount === 1 ? "trip" : "trips";
        const hasHave = totalDocs === 1 ? "has" : "have";

        let summary = [];

        if (tripCount === 0) {

          summary.push("No trips could be generated for the selected documents.");
          summary.push(
            `All ${totalDocs} ${docWord} ${hasHave} been excluded from the trip optimization process.`
          );

        } else {

          summary.push(
            `${tripCount} ${tripWord} ${tripCount === 1 ? "has" : "have"} been automatically generated, containing a total of ${totalDocs} ${docWord}.`
          );

          summary.push(
            `0 out of ${totalDocs} ${docWord} ${hasHave} been excluded from the trip optimization process.`
          );

        }

        this.setState({
          errorArrayMessage: [],   // important
          errorSummartMessage: summary,
          addAlertSummaryShow: true,
          loader: false
        });

        return;
      }

      const minLat = 9.982106;
      const maxLat = 10.85555;
      const minLng = -61.95056;
      const maxLng = -60.8988;

      const customerGroupedErrors = {};
      const individualGroupedErrors = {};
      const wrongCoordinateDocs = new Set();

      const docMap = {};
      selectedDocs.forEach(d => docMap[d.docnum] = d);

      // ------------------------
// WRONG GEO-COORDINATES CHECK
// ------------------------

selectedDocs.forEach(doc => {

  if (Number(doc.lat) === 0) {
    wrongCoordinateDocs.add(doc.docnum);
  }

});

      const tripVehicleCodes = tripsfromAuto.map(t => t.vehicleObject?.codeyve);

      res.unassigned.forEach(un => {

        const doc = docMap[un.description];
        if (!doc) return;

        const docId = doc.docnum;
        const docCustomer = `${doc.bpname} (${doc.bpcode})`;

        const groupedReasons = [];
        const individualReasons = [];

        if (Number(doc.lat) === 0) {
          wrongCoordinateDocs.add(docId);
        }

        // REGION CHECK
        if (
          doc.lat < minLat ||
          doc.lat > maxLat ||
          doc.lng < minLng ||
          doc.lng > maxLng
        ) {
          individualReasons.push("Coordinates");
        }

        // ROUTE CODE CHECK
        let routeMatchedVehicles = [];

        const docRoutes = (doc.routeCode || "")
          .split(",")
          .map(r => r.trim())
          .filter(Boolean);

        SelectedVehicles.forEach(v => {

          if (doc.aroutecodeDesc === "ALL") {
            routeMatchedVehicles.push(v);
            return;
          }

          if (v.aroutecodeDesc === "ALL") {
            routeMatchedVehicles.push(v);
            return;
          }

          const vehicleRoutes = (v.routeCode || "")
            .split(",")
            .map(r => r.trim())
            .filter(Boolean);

          const match = docRoutes.some(r => vehicleRoutes.includes(r));

          if (match) routeMatchedVehicles.push(v);

        });

        if (routeMatchedVehicles.length === 0) {
          groupedReasons.push("Route Code");
        }

        // VEHICLE CLASS CHECK
        let classMatchedVehicles = [];

        if (doc.avehClassListDesc === "ALL") {

          classMatchedVehicles = routeMatchedVehicles;

        } else {

          const docClasses = (doc.vehClassList || "")
            .split(" ")
            .map(v => v.trim())
            .filter(Boolean);

          routeMatchedVehicles.forEach(v => {

            if (docClasses.includes(v.catego)) {
              classMatchedVehicles.push(v);
            }

          });

          if (classMatchedVehicles.length === 0) {
            groupedReasons.push("Vehicle Class");
          }
        }

        // ------------------------
        // SKILL MATCH CHECK
        // ------------------------

        let skillMatchedVehicles = [];

        if (classMatchedVehicles.length > 0) {

          const jobSkills = Array.isArray(doc.skills)
            ? doc.skills.map(Number)
            : (doc.skills || "")
              .split(",")
              .map(s => Number(s.trim()))
              .filter(Boolean);

          classMatchedVehicles.forEach(v => {

            const vehicleSkills = (v.skills || "")
              .split(",")
              .map(s => Number(s.trim()))
              .filter(Boolean);

            const skillMatch = jobSkills.every(skill =>
              vehicleSkills.includes(skill)
            );

            if (skillMatch) {
              skillMatchedVehicles.push(v);
            }

          });

          if (skillMatchedVehicles.length === 0) {

            groupedReasons.push(
              // `No vehicle matches all required skills (Route Code : ${doc.aroutecodeDesc}, Vehicle Class : ${doc.avehClassListDesc})`
              `route code and vehicle class`
            );

          }

        }

        // TRIP CAPACITY CHECK
        skillMatchedVehicles.forEach(v => {

          const trip = tripsfromAuto.find(
            t => t.vehicleObject?.codeyve === v.codeyve
          );

          if (!trip) return;

          const remainingWeight =
            Number(v.capacities) - Number(trip.doc_capacity || 0);

          const remainingCases =
            Number(v.maxCases) - Number(trip.mainCases || 0);

          const remainingPallets =
            Number(v.maxPallets) - Number(trip.totalCases || 0);

          if (doc.netweight > remainingWeight) individualReasons.push("Weight");
          if (Number(doc.mainCases) > remainingCases) individualReasons.push("Cases");
          if (Number(doc.mainPallets) > remainingPallets) individualReasons.push("Pallets");

        });

        // UNUSED VEHICLES CHECK
        const unusedVehicles = classMatchedVehicles.filter(
          v => !tripVehicleCodes.includes(v.codeyve)
        );

        unusedVehicles.forEach(v => {

          if (doc.netweight > v.capacities) individualReasons.push("Weight");
          if (Number(doc.mainCases) > Number(v.maxCases)) individualReasons.push("Cases");
          if (Number(doc.mainPallets) > Number(v.maxPallets)) individualReasons.push("Pallets");

        });

        // ------------------------
        // CUSTOMER GROUPED ERRORS (FIXED)
        // ------------------------
        if (groupedReasons.length > 0) {

          const reasonKey = groupedReasons.sort().join(" , ");
          const groupKey = `${docCustomer}|${reasonKey}`;

          if (!customerGroupedErrors[groupKey]) {
            customerGroupedErrors[groupKey] = {
              customer: docCustomer,
              docs: [],
              reasons: reasonKey
            };
          }

          customerGroupedErrors[groupKey].docs.push(docId);
        }

        // INDIVIDUAL REASON GROUPING
        if (individualReasons.length > 0) {

          const uniqueReasons = [...new Set(individualReasons)];
          const key = uniqueReasons.sort().join(", ");

          if (!individualGroupedErrors[key]) {
            individualGroupedErrors[key] = new Set();
          }

          individualGroupedErrors[key].add(docId);
        }

        // FALLBACK
        if (groupedReasons.length === 0 && individualReasons.length === 0) {

          const key = "Travel Time / Distance";

          if (!individualGroupedErrors[key]) {
            individualGroupedErrors[key] = new Set();
          }

          individualGroupedErrors[key].add(docId);
        }

      });

      // BUILD ERROR OUTPUT
      const errors = [];

      if (wrongCoordinateDocs.size > 0) {

        const docs = Array.from(wrongCoordinateDocs).sort().join(", ");

        errors.push(`<b>Wrong Geo-Coordinates</b>`);
        errors.push(`<hr/>`);

        errors.push(`
          <b>Pick Tickets</b> : ${docs}<br/>
          Above pick tickets has been excluded because geo-coordinates are missing.<br/><br/>
        `);

      }

      if (Object.keys(customerGroupedErrors).length > 0) {

        errors.push(`<b>Customer Based Exceptions</b>`);
        errors.push(`<hr/>`);

        Object.values(customerGroupedErrors).forEach(entry => {

          const docList = entry.docs.sort().join(", ");

          errors.push(`
            <b>Pick Tickets</b> : ${docList}<br/>
            The ${entry.reasons} assigned to customer <b>${entry.customer}</b> does not match the ${entry.reasons} of the selected vehicles.<br/><br/>
          `);

        });

      }

      if (Object.keys(individualGroupedErrors).length > 0) {

        errors.push(`<hr/>`);
        errors.push(`<b>Capacity / Constraint Based Exceptions</b>`);
        errors.push(`<hr/>`);

        Object.keys(individualGroupedErrors).forEach(reason => {

          const docs = Array.from(individualGroupedErrors[reason]).sort().join(", ");

          errors.push(`
            <b>Pick Tickets</b> : ${docs}<br/>
            The ${reason} for the above pick tickets exceeded the allowable limits. Therefore, these documents could not be assigned to any of the selected vehicles.<br/><br/>
          `);


        });

      }

      // SUMMARY
      let summary = [];

      const totalDocs = selectedDocs.length;
      const excludedDocs = res.unassigned.length;
      const assignedDocs = totalDocs - excludedDocs;
      const tripCount = res.routes.length;

      const docWord = totalDocs === 1 ? "document" : "documents";
      const tripWord = tripCount === 1 ? "trip" : "trips";
      const hasHave = totalDocs === 1 ? "has" : "have";

      if (tripCount === 0) {

        summary.push("No trips could be generated for the selected documents.");

        summary.push(
          `All ${totalDocs} ${docWord} ${hasHave} been excluded from the trip optimization process.`
        );

      } else {

        summary.push(
          `${tripCount} ${tripWord} ${tripCount === 1 ? "has" : "have"} been automatically generated, containing a total of ${assignedDocs} ${assignedDocs === 1 ? "document" : "documents"}.`
        );

        summary.push(
          `${excludedDocs} out of ${totalDocs} ${docWord} ${hasHave} been excluded from the trip optimization process.`
        );

      }

      this.setState({
        errorArrayMessage: errors,
        errorSummartMessage: summary,
        errorNotesArray: NotesExecptions,
        addAlertSummaryShow: true,
        loader: false
      });

    } catch (err) {

      this.setState({
        errorArrayMessage: [`Unexpected error: ${err.message}`],
        errorSummartMessage: [],
        errorNotesArray: NotesExecptions || [],
        addAlertSummaryShow: true,
        loader: false
      });

    }

  };

  Exceptionalanalysis = (
    selectedDocs,
    SelectedVehicles,
    res,
    X3SetupErrors,
    from,
    assignedShipments,
    allJobs,           // ⚠️ MUST be FULL job list
    jobId,
    extraError,
    customerJobMap,
    NotesBox
  ) => {

    /* --------------------------------------
       NORMALIZE RESULT
    -------------------------------------- */
    const routes = Array.isArray(res?.routes) ? res.routes : [];
    const unassigned = Array.isArray(res?.unassigned) ? res.unassigned : [];

    const totalSelectedDocs = selectedDocs.length;
    const unassignedDocCount =
      unassigned.length + (Array.isArray(extraError) ? extraError.length : 0);

    const trips = routes.length;
    const assignedDocs =
      trips === 0 ? 0 : Math.max(totalSelectedDocs - unassignedDocCount, 0);

    /* --------------------------------------
       SUMMARY
    -------------------------------------- */
    const summarybox = [];

    if (trips === 0) {
      summarybox.push(`No trips could be generated for the selected documents.\n`);
      summarybox.push(
        `All ${totalSelectedDocs} documents have been excluded from the trip optimization process.\n`
      );
    } else {
      summarybox.push(
        `${trips} trips have been automatically generated, containing a total of ${assignedDocs} documents.\n`
      );
      summarybox.push(
        `${unassignedDocCount} out of ${totalSelectedDocs} documents have been excluded from the trip optimization process.\n`
      );
    }

    /* --------------------------------------
       MAP UNASSIGNED → DOCUMENTS (CRITICAL FIX)
    -------------------------------------- */
    const tempselDocs = [];

    if (from === 'auto_next') {
      unassigned.forEach(undoc => {
        if (undoc.type !== 'job') return;

        const job = allJobs.find(j => j.id === undoc.id);
        if (!job) return;

        selectedDocs
          .filter(d => d.docnum === job.description)
          .forEach(d =>
            tempselDocs.push({
              ...d,
              jobId: undoc.id,
              reason: undoc.reason || 'unknown reason'
            })
          );
      });
    }

    /* --------------------------------------
       CUSTOMER DISPLAY MAP
    -------------------------------------- */
    const customerDisplayMap = {};
    selectedDocs.forEach(doc => {
      if (doc.bpcode && !customerDisplayMap[doc.bpcode]) {
        customerDisplayMap[doc.bpcode] =
          `${doc.bpname || 'Unknown Customer'} (${doc.bpcode})`;
      }
    });

    /* --------------------------------------
       VEHICLE SKILL MAP (PER VEHICLE)
    -------------------------------------- */
    const vehicleSkillMap = SelectedVehicles.map(v => ({
      code: v.codeyve,
      skills: (() => {
        try {
          return Array.isArray(v.skills)
            ? v.skills
            : JSON.parse('[' + v.skills + ']');
        } catch {
          return [];
        }
      })()
    }));

    const isRouteCode = s => s >= 1 && s <= 100;
    const isProductCategory = s => s >= 101 && s <= 200;
    const isVehicleClass = s => s >= 501;

    /* --------------------------------------
       ERROR BOX
    -------------------------------------- */
    const errorbox = [];

    // ✅ Tracks pick tickets already explained (DEDUP KEY)
    const reportedSkillDocs = new Set();

    /* ======================================================
       1️⃣ SKILL MISMATCH (CUSTOMER LEVEL)
    ====================================================== */
    const skillMismatchByCustomer = {};

    tempselDocs.forEach(doc => {
      const custKey = doc.bpcode || 'UNKNOWN';

      let docSkills = [];
      try {
        docSkills = Array.isArray(doc.skills)
          ? doc.skills
          : JSON.parse('[' + doc.skills + ']');
      } catch {
        docSkills = [];
      }

      if (!docSkills.length) return;

      // Must match ALL skills in at least one vehicle
      const isServiceable = vehicleSkillMap.some(v =>
        docSkills.every(s => v.skills.includes(s))
      );

      if (isServiceable) return;

      if (!skillMismatchByCustomer[custKey]) {
        skillMismatchByCustomer[custKey] = {
          docs: [],
          missingRoute: false,
          missingVehicleClass: false,
          missingProduct: false
        };
      }

      skillMismatchByCustomer[custKey].docs.push(doc.docnum);

      docSkills.forEach(s => {
        if (isRouteCode(s)) skillMismatchByCustomer[custKey].missingRoute = true;
        else if (isVehicleClass(s)) skillMismatchByCustomer[custKey].missingVehicleClass = true;
        else if (isProductCategory(s)) skillMismatchByCustomer[custKey].missingProduct = true;
      });
    });

    Object.keys(skillMismatchByCustomer).forEach(custKey => {
      const entry = skillMismatchByCustomer[custKey];
      const customerLabel =
        customerDisplayMap[custKey] || `Customer ${custKey}`;

      const reasons = [];
      if (entry.missingRoute) reasons.push('Route Code');
      if (entry.missingVehicleClass) reasons.push('Vehicle Class');
      if (entry.missingProduct) reasons.push('Product Category');

      errorbox.push(
        `Customer ${customerLabel}: Pick tickets (${entry.docs.join(', ')}) ` +
        `does not match the ${reasons.join(', ')} of the selected vehicles.`
      );

      // ✅ Mark as already reported
      entry.docs.forEach(d => reportedSkillDocs.add(d));
    });

    const customersWithSkillIssue =
      new Set(Object.keys(skillMismatchByCustomer));

    /* ======================================================
       2️⃣ INFEASIBLE RELATION
    ====================================================== */
    const infeasibleByCustomer = {};

    tempselDocs.forEach(doc => {
      if (!doc.reason?.toLowerCase().includes('infeasible')) return;
      if (customersWithSkillIssue.has(doc.bpcode)) return;

      const key = doc.bpcode || 'UNKNOWN';
      if (!infeasibleByCustomer[key]) infeasibleByCustomer[key] = [];
      infeasibleByCustomer[key].push(doc.docnum);
    });

    Object.keys(infeasibleByCustomer).forEach(custKey => {
      const docs = infeasibleByCustomer[custKey];
      if (docs.length <= 1) return;

      const label =
        customerDisplayMap[custKey] || `Customer ${custKey}`;

      errorbox.push(
        `Customer ${label}: Pick tickets (${docs.join(', ')}) ` +
        `could not be grouped into a feasible trip under the current constraints.`
      );
    });

    /* ======================================================
       3️⃣ CAPACITY FAILURE
    ====================================================== */
    const capacityFailedByCustomer = {};

    tempselDocs.forEach(doc => {
      if (!doc.reason?.toLowerCase().includes('capacity')) return;
      if (customersWithSkillIssue.has(doc.bpcode)) return;

      const key = doc.bpcode || 'UNKNOWN';
      if (!capacityFailedByCustomer[key]) capacityFailedByCustomer[key] = [];
      capacityFailedByCustomer[key].push(doc.docnum);
    });

    Object.keys(capacityFailedByCustomer).forEach(custKey => {
      const docs = capacityFailedByCustomer[custKey];
      if (!docs.length) return;

      const label =
        customerDisplayMap[custKey] || `Customer ${custKey}`;

      errorbox.push(
        `Customer ${label}: Pick tickets (${docs.join(', ')}) ` +
        `could not be assigned due to vehicle capacity limitations.`
      );
    });

    /* ======================================================
       4️⃣ GLOBAL SKILL MESSAGE (DEDUPED ✅)
    ====================================================== */
    const remainingSkillDocs = tempselDocs
      .filter(d =>
        d.reason?.toLowerCase().includes('skills') &&
        !reportedSkillDocs.has(d.docnum)
      )
      .map(d => d.docnum);

    if (remainingSkillDocs.length > 0) {
      errorbox.push(
        `Pick tickets (${remainingSkillDocs.join(', ')}) ` +
        `does not match the route code or vehicle class of the selected vehicles.`
      );
    }

    /* --------------------------------------
       ADD PRE-COMPUTED ERRORS
    -------------------------------------- */
    if (Array.isArray(X3SetupErrors)) errorbox.push(...X3SetupErrors);
    if (Array.isArray(extraError)) errorbox.push(...extraError);

    /* --------------------------------------
       FINAL STATE UPDATE
    -------------------------------------- */
    this.setState({
      errorArrayMessage: errorbox,
      errorSummartMessage: summarybox,
      errorNotesArray: NotesBox,
      loader: false,
      processID: jobId,
      addAlertSummaryShow: true
    });
  };



  Exceptionalanalysis333 = (
    selectedDocs,
    SelectedVehicles,
    res,
    X3SetupErrors,
    from,
    assignedShipments,
    allJobs,                 // ⚠️ MUST be full job list (not only assigned)
    jobId,
    extraError,
    customerJobMap,
    NotesBox
  ) => {

    /* --------------------------------------
       NORMALIZE RESULT
    -------------------------------------- */
    const routes = Array.isArray(res?.routes) ? res.routes : [];
    const unassigned = Array.isArray(res?.unassigned) ? res.unassigned : [];

    const totalSelectedDocs = selectedDocs.length;
    const unassignedDocCount =
      unassigned.length + (Array.isArray(extraError) ? extraError.length : 0);

    const trips = routes.length;
    const assignedDocs =
      trips === 0 ? 0 : Math.max(totalSelectedDocs - unassignedDocCount, 0);

    /* --------------------------------------
       SUMMARY
    -------------------------------------- */
    const summarybox = [];

    if (trips === 0) {
      summarybox.push(`No trips could be generated for the selected documents.\n`);
      summarybox.push(
        `All ${totalSelectedDocs} documents have been excluded from the trip optimization process.\n`
      );
    } else {
      summarybox.push(
        `${trips} trips have been auto generated containing a total of ${assignedDocs} documents.\n`
      );
      summarybox.push(
        `${unassignedDocCount} out of ${totalSelectedDocs} documents have been excluded from the trip optimization process.\n`
      );
    }

    /* --------------------------------------
       MAP UNASSIGNED → DOCUMENTS (FIXED)
    -------------------------------------- */
    const tempselDocs = [];

    if (from === 'auto_next') {
      unassigned.forEach(undoc => {
        if (undoc.type !== 'job') return;

        // 🔑 lookup from FULL job list
        const job = allJobs.find(j => j.id === undoc.id);
        if (!job) return;

        selectedDocs
          .filter(d => d.docnum === job.description)
          .forEach(d =>
            tempselDocs.push({
              ...d,
              jobId: undoc.id,
              reason: undoc.reason || 'unknown reason'
            })
          );
      });
    }

    /* --------------------------------------
       CUSTOMER DISPLAY MAP
    -------------------------------------- */
    const customerDisplayMap = {};
    selectedDocs.forEach(doc => {
      if (doc.bpcode && !customerDisplayMap[doc.bpcode]) {
        customerDisplayMap[doc.bpcode] =
          `${doc.bpname || 'Unknown Customer'} (${doc.bpcode})`;
      }
    });

    /* --------------------------------------
       VEHICLE SKILL MAP (PER VEHICLE)
    -------------------------------------- */
    const vehicleSkillMap = SelectedVehicles.map(v => ({
      code: v.codeyve,
      skills: (() => {
        try {
          return Array.isArray(v.skills)
            ? v.skills
            : JSON.parse('[' + v.skills + ']');
        } catch {
          return [];
        }
      })()
    }));

    const isRouteCode = s => s >= 1 && s <= 100;
    const isProductCategory = s => s >= 101 && s <= 200;
    const isVehicleClass = s => s >= 501;

    /* --------------------------------------
       ERROR BOX
    -------------------------------------- */
    const errorbox = [];

    /* ======================================================
       1️⃣ SKILL MISMATCH (CORRECT & RELIABLE)
    ====================================================== */
    const skillMismatchByCustomer = {};

    tempselDocs.forEach(doc => {
      const custKey = doc.bpcode || 'UNKNOWN';

      let docSkills = [];
      try {
        docSkills = Array.isArray(doc.skills)
          ? doc.skills
          : JSON.parse('[' + doc.skills + ']');
      } catch {
        docSkills = [];
      }

      if (!docSkills.length) return;

      // ✅ must match ALL skills in at least one vehicle
      const isServiceable = vehicleSkillMap.some(v =>
        docSkills.every(s => v.skills.includes(s))
      );

      if (isServiceable) return;

      if (!skillMismatchByCustomer[custKey]) {
        skillMismatchByCustomer[custKey] = {
          docs: [],
          missingRoute: false,
          missingVehicleClass: false,
          missingProduct: false
        };
      }

      skillMismatchByCustomer[custKey].docs.push(doc.docnum);

      docSkills.forEach(s => {
        if (isRouteCode(s)) skillMismatchByCustomer[custKey].missingRoute = true;
        else if (isVehicleClass(s)) skillMismatchByCustomer[custKey].missingVehicleClass = true;
        else if (isProductCategory(s)) skillMismatchByCustomer[custKey].missingProduct = true;
      });
    });

    Object.keys(skillMismatchByCustomer).forEach(custKey => {
      const entry = skillMismatchByCustomer[custKey];
      const customerLabel =
        customerDisplayMap[custKey] || `Customer ${custKey}`;

      const reasons = [];
      if (entry.missingRoute) reasons.push('Route Code');
      if (entry.missingVehicleClass) reasons.push('Vehicle Class');
      if (entry.missingProduct) reasons.push('Product Category');

      errorbox.push(
        `Customer ${customerLabel}: Pick tickets (${entry.docs.join(', ')}) ` +
        `do not match the ${reasons.join(', ')} of the selected vehicles.`
      );
    });

    const customersWithSkillIssue =
      new Set(Object.keys(skillMismatchByCustomer));

    /* ======================================================
       2️⃣ INFEASIBLE RELATION
    ====================================================== */
    const infeasibleByCustomer = {};

    tempselDocs.forEach(doc => {
      if (!doc.reason?.toLowerCase().includes('infeasible')) return;
      if (customersWithSkillIssue.has(doc.bpcode)) return;

      const key = doc.bpcode || 'UNKNOWN';
      if (!infeasibleByCustomer[key]) infeasibleByCustomer[key] = [];
      infeasibleByCustomer[key].push(doc.docnum);
    });

    Object.keys(infeasibleByCustomer).forEach(custKey => {
      const docs = infeasibleByCustomer[custKey];
      if (docs.length <= 1) return;

      const label =
        customerDisplayMap[custKey] || `Customer ${custKey}`;

      errorbox.push(
        `Customer ${label}: Pick tickets (${docs.join(', ')}) ` +
        `could not be grouped into a feasible trip under the current constraints.`
      );
    });

    /* ======================================================
       3️⃣ CAPACITY FAILURE
    ====================================================== */
    const capacityFailedByCustomer = {};

    tempselDocs.forEach(doc => {
      if (!doc.reason?.toLowerCase().includes('capacity')) return;
      if (customersWithSkillIssue.has(doc.bpcode)) return;

      const key = doc.bpcode || 'UNKNOWN';
      if (!capacityFailedByCustomer[key]) capacityFailedByCustomer[key] = [];
      capacityFailedByCustomer[key].push(doc.docnum);
    });

    Object.keys(capacityFailedByCustomer).forEach(custKey => {
      const docs = capacityFailedByCustomer[custKey];
      if (!docs.length) return;

      const label =
        customerDisplayMap[custKey] || `Customer ${custKey}`;

      errorbox.push(
        `Customer ${label}: Pick tickets (${docs.join(', ')}) ` +
        `could not be assigned due to vehicle capacity limitations.`
      );
    });

    /* ======================================================
       4️⃣ GLOBAL SKILL-UNASSIGNED MESSAGE (NEW ✅)
    ====================================================== */
    const skillUnassignedDocs = tempselDocs.filter(d =>
      d.reason?.toLowerCase().includes('skills')
    );

    if (skillUnassignedDocs.length > 0) {
      const docNums = skillUnassignedDocs.map(d => d.docnum);

      errorbox.push(
        `Some pick tickets (${docNums.join(', ')}) ` +
        `could not be assigned because they do not match the skill requirements ` +
        `of the selected vehicles.`
      );
    }

    /* --------------------------------------
       ADD PRE-COMPUTED ERRORS
    -------------------------------------- */
    if (Array.isArray(X3SetupErrors)) errorbox.push(...X3SetupErrors);
    if (Array.isArray(extraError)) errorbox.push(...extraError);

    /* --------------------------------------
       FINAL STATE UPDATE
    -------------------------------------- */
    this.setState({
      errorArrayMessage: errorbox,
      errorSummartMessage: summarybox,
      errorNotesArray: NotesBox,
      loader: false,
      processID: jobId,
      addAlertSummaryShow: true
    });
  };




  Exceptionalanalysis222 = (
    selectedDocs,
    SelectedVehicles,
    res,
    X3SetupErrors,
    from,
    assignedShipments,
    assignedJobs,
    jobId,
    extraError,
    customerJobMap,
    NotesBox
  ) => {

    /* --------------------------------------
       NORMALIZE RESULT (SAFE)
    -------------------------------------- */
    const routes = Array.isArray(res?.routes) ? res.routes : [];
    const unassigned = Array.isArray(res?.unassigned) ? res.unassigned : [];
    const summary = res?.summary || { delivery: [0, 0, 0] };

    const trips = routes.length;
    const noTripsGenerated = trips === 0;

    const totalSelectedDocs = selectedDocs.length;
    const unassignedDocCount =
      unassigned.length + (Array.isArray(extraError) ? extraError.length : 0);

    const assignedDocs = noTripsGenerated
      ? 0
      : Math.max(totalSelectedDocs - unassignedDocCount, 0);

    /* --------------------------------------
       SUMMARY
    -------------------------------------- */
    const summarybox = [];

    if (noTripsGenerated) {
      summarybox.push(`No trips could be generated for the selected documents.\n`);
      summarybox.push(
        `All ${totalSelectedDocs} documents have been excluded from the trip optimization process.\n`
      );
    } else {
      summarybox.push(
        `${trips} trips have been auto generated containing a total of ${assignedDocs} documents.\n`
      );
      summarybox.push(
        `${unassignedDocCount} out of ${totalSelectedDocs} documents have been excluded from the trip optimization process.\n`
      );
    }

    /* --------------------------------------
       MAP UNASSIGNED → DOCUMENTS
    -------------------------------------- */
    const tempselDocs = [];

    if (from === 'auto_next') {
      unassigned.forEach(undoc => {
        if (undoc.type !== 'job') return;

        const job = assignedJobs.find(j => j.id === undoc.id);
        if (!job) return;

        selectedDocs
          .filter(d => d.docnum === job.description)
          .forEach(d =>
            tempselDocs.push({
              ...d,
              reason: undoc.reason || 'unknown reason'
            })
          );
      });
    }

    /* --------------------------------------
       CUSTOMER DISPLAY MAP
    -------------------------------------- */
    const customerDisplayMap = {};
    selectedDocs.forEach(doc => {
      if (doc.bpcode && !customerDisplayMap[doc.bpcode]) {
        customerDisplayMap[doc.bpcode] =
          `${doc.bpname || 'Unknown Customer'} (${doc.bpcode})`;
      }
    });

    /* --------------------------------------
       VEHICLE SKILL SET
    -------------------------------------- */
    const vehicleSkillSet = new Set();
    SelectedVehicles.forEach(v => {
      JSON.parse('[' + v.skills + ']').forEach(s => vehicleSkillSet.add(s));
    });

    const isRouteCode = s => s >= 1 && s <= 100;
    const isProductCategory = s => s >= 101 && s <= 200;
    const isVehicleClass = s => s >= 501;

    /* --------------------------------------
       ERROR BOX
    -------------------------------------- */
    const errorbox = [];

    /* --------------------------------------
       1️⃣ SKILL MISMATCH (FIXED & CORRECT)
    -------------------------------------- */

    const skillMismatchByCustomer = {};

    // Parse vehicle skills once (per vehicle)
    const vehicleSkillMap = SelectedVehicles.map(v => ({
      code: v.codeyve,
      skills: (() => {
        try {
          return Array.isArray(v.skills)
            ? v.skills
            : JSON.parse('[' + v.skills + ']');
        } catch {
          return [];
        }
      })()
    }));

    tempselDocs.forEach(doc => {
      const custKey = doc.bpcode || 'UNKNOWN';

      // ✅ Safe parse doc skills
      let docSkills = [];
      try {
        docSkills = Array.isArray(doc.skills)
          ? doc.skills
          : JSON.parse('[' + doc.skills + ']');
      } catch {
        docSkills = [];
      }

      if (docSkills.length === 0) return;

      // ✅ Check if ANY vehicle can satisfy ALL skills
      const isServiceable = vehicleSkillMap.some(v =>
        docSkills.every(s => v.skills.includes(s))
      );

      if (isServiceable) return; // no mismatch

      // ❌ Skill mismatch confirmed
      if (!skillMismatchByCustomer[custKey]) {
        skillMismatchByCustomer[custKey] = {
          docs: [],
          missingRoute: false,
          missingVehicleClass: false,
          missingProduct: false
        };
      }

      skillMismatchByCustomer[custKey].docs.push(doc.docnum);

      // Optional categorization (for message clarity)
      docSkills.forEach(s => {
        if (isRouteCode(s)) skillMismatchByCustomer[custKey].missingRoute = true;
        else if (isVehicleClass(s)) skillMismatchByCustomer[custKey].missingVehicleClass = true;
        else if (isProductCategory(s)) skillMismatchByCustomer[custKey].missingProduct = true;
      });
    });

    console.log('Skill mismatch (final):', skillMismatchByCustomer);

    // Build messages
    Object.keys(skillMismatchByCustomer).forEach(custKey => {
      const entry = skillMismatchByCustomer[custKey];
      const customerLabel =
        customerDisplayMap[custKey] || `Customer ${custKey}`;

      const reasons = [];
      if (entry.missingRoute) reasons.push('Route Code');
      if (entry.missingVehicleClass) reasons.push('Vehicle Class');
      if (entry.missingProduct) reasons.push('Product Category');

      errorbox.push(
        `Customer ${customerLabel}: Pick tickets (${entry.docs.join(', ')}) ` +
        `do not match the ${reasons.join(', ') || 'required skills'} of the selected vehicles.`
      );
    });

    const customersWithSkillIssue = new Set(Object.keys(skillMismatchByCustomer));


    /* --------------------------------------
       2️⃣ INFEASIBLE RELATION
    -------------------------------------- */
    const infeasibleByCustomer = {};

    tempselDocs.forEach(doc => {
      if (!doc.reason?.toLowerCase().includes('infeasible relation')) return;

      const custKey = doc.bpcode || 'UNKNOWN';
      if (customersWithSkillIssue.has(custKey)) return;

      if (!infeasibleByCustomer[custKey]) {
        infeasibleByCustomer[custKey] = [];
      }
      infeasibleByCustomer[custKey].push(doc.docnum);
    });

    Object.keys(infeasibleByCustomer).forEach(custKey => {
      const docs = infeasibleByCustomer[custKey];
      if (docs.length <= 1) return;

      const customerLabel =
        customerDisplayMap[custKey] || `Customer ${custKey}`;

      if (noTripsGenerated) {
        errorbox.push(
          `Customer ${customerLabel}: Pick tickets (${docs.join(', ')}) ` +
          `could not be grouped into a feasible trip under the current vehicle, skill and capacity constraints.`
        );
      } else {
        errorbox.push(
          `Customer ${customerLabel}: Pick tickets (${docs.join(', ')}) ` +
          `could not be assigned together because all matching vehicles are already occupied with other trips.`
        );
      }
    });

    /* --------------------------------------
       3️⃣ CAPACITY SPLIT – NO EXTRA VEHICLE
    -------------------------------------- */
    const capacityFailedByCustomer = {};

    tempselDocs.forEach(doc => {
      if (!doc.reason?.toLowerCase().includes('capacity constraint')) return;

      const custKey = doc.bpcode || 'UNKNOWN';
      if (customersWithSkillIssue.has(custKey)) return;

      if (!capacityFailedByCustomer[custKey]) {
        capacityFailedByCustomer[custKey] = [];
      }
      capacityFailedByCustomer[custKey].push(doc.docnum);
    });

    Object.keys(capacityFailedByCustomer).forEach(custKey => {
      const docs = capacityFailedByCustomer[custKey];
      if (!docs.length) return;

      const customerLabel =
        customerDisplayMap[custKey] || `Customer ${custKey}`;

      errorbox.push(
        `Customer ${customerLabel}: Pick tickets (${docs.join(', ')}) ` +
        `could not be assigned because the available vehicle capacity was exhausted and no additional vehicle was available.`
      );
    });

    /* --------------------------------------
       ADD PRE-COMPUTED ERRORS
    -------------------------------------- */
    if (Array.isArray(X3SetupErrors)) errorbox.push(...X3SetupErrors);
    if (Array.isArray(extraError)) errorbox.push(...extraError);

    /* --------------------------------------
       FINAL STATE UPDATE
    -------------------------------------- */
    this.setState({
      errorArrayMessage: errorbox,
      errorSummartMessage: summarybox,
      errorNotesArray: NotesBox,
      loader: false,
      processID: jobId,
      addAlertSummaryShow: true
    });
  };


  Exceptionalanalysis111 = (
    selectedDocs,
    SelectedVehicles,
    res,
    X3SetupErrors,
    from,
    assignedShipments,
    assignedJobs, jobId, extraError, customerJobMap, NotesBox
  ) => {
    let totalSelectedDocs = selectedDocs.length
    // let unassignedDocCount = res.unassigned.length; // > 0 ? res.unassigned.length : X3SetupErrors?.length;
    let unassignedDocs =
      res.unassigned && res.unassigned.length > 0 ? res.unassigned : []
    let unassignedDocCount = unassignedDocs.length
    if (extraError.length > 0) {
      unassignedDocCount = unassignedDocCount + extraError.length;
    }
    // let unassignedDocs = res.unassigned;
    //  let trips = res?.routes?.length
    const trips = Array.isArray(res?.routes) ? res.routes.length : 0;
    const noTripsGenerated = trips === 0;
    let assignedDocs = totalSelectedDocs - unassignedDocCount
    let totalDocsWeight = res.summary.delivery[0]
    let totalDocsVolume = res.summary.delivery[1]
    let totalDocsCases = res.summary.delivery[2]

    let glabalSummaryOBject = ''
    let summarybox = []

    let selVeh = SelectedVehicles
    let tempselDocs = []

    if (from === 'auto_next') {
      unassignedDocs.forEach((undoc) => {
        let matchedJob = null
        let matchedShipment = null

        if (undoc.type === 'job') {
          // Find a matching job
          matchedJob = assignedJobs.find((job) => job.id === undoc.id)
        } else if (undoc.type === 'delivery' || undoc.type === 'shipment') {
          // Find a matching shipment
          matchedShipment = assignedShipments.find(
            (shipment) =>
              shipment.delivery.id === undoc.id ||
              shipment.pickup.id === undoc.id
          )
        }
        // If a job or shipment is found, check against selDocs
        if (matchedJob) {
          //  let matchedDocs = selectedDocs.filter(selDoc => selDoc.docnum === matchedJob.description);
          let matchedDocs = selectedDocs
            .filter((selDoc) => selDoc.docnum === matchedJob.description)
            .map((selDoc) => ({
              ...selDoc,
              reason: undoc.reason, // Add the reason from unassignedDocs
            }))

          tempselDocs.push(...matchedDocs)
        }

        if (matchedShipment) {
          let matchedDocs = selectedDocs
            .filter(
              (selDoc) =>
                selDoc.docnum === matchedShipment.delivery.description ||
                selDoc.docnum === matchedShipment.pickup.description
            )
            .map((selDoc) => ({
              ...selDoc,
              reason: undoc.reason, // Add the reason from unassignedDocs
            }))
          tempselDocs.push(...matchedDocs)
        }
      })
    } else {
      unassignedDocs.map((undoc, index) => {
        for (let tempdoc of selectedDocs) {
          if (tempdoc.docnum === undoc.description) {
            tempselDocs.push(tempdoc)
            break
          }
        }
      })
    }


    if (noTripsGenerated) {
      summarybox.push(
        `No trips could be generated for the selected documents.\n`
      );
      summarybox.push(
        `All ${totalSelectedDocs} documents have been excluded from the trip optimization process.\n`
      );
    } else {
      summarybox.push(
        `${trips} trips have been auto generated containing a total of ${assignedDocs} documents.\n`
      );
      summarybox.push(
        `${unassignedDocCount} out of ${totalSelectedDocs} documents have been excluded from the trip optimization process.\n`
      );
    }

    //
    //    summarybox.push(
    //      ` ${trips} trips have been auto generated containing a total of  ${assignedDocs} documents  \n`
    //    )
    //    summarybox.push(
    //      `${unassignedDocCount} out of ${totalSelectedDocs} documents have been excluded from the trip optimization process. \n`
    //    )

    // summarybox.push(glabalSummaryOBject);
    // `Trips ${trips} are generated with ${assignedDocs} Documents  \n`;

    let errorbox = []

    if (X3SetupErrors.length > 0) {
      errorbox.push(...X3SetupErrors)
    }

    if (extraError.length > 0) {
      errorbox.push(...extraError)
    }

    const customerDisplayMap = {};

    selectedDocs.forEach(doc => {
      if (doc.bpcode && !customerDisplayMap[doc.bpcode]) {
        const name = doc.bpname || 'Unknown Customer';
        customerDisplayMap[doc.bpcode] = `${name} (${doc.bpcode})`;
      }
    });

    tempselDocs.forEach((doc) => {
      let glbalmissingskill = []
      let tempoptiError = {
        docnum: '',
        skillerrorflg: false,
        skillmessage: '',
        capacatyflg: false,
        capacityError: '',
        generalflg: false,
        genearalError: '',
      }
      // let glabalerrorOBject = [];

      let isSkillMatchFoundflg = false
      let docskill = JSON.parse('[' + doc.skills + ']')
      let tcapacatyflg = false
      let tskillflg = false
      let tvolumeflg = false
      let prodCodevehList = []
      let routeCodeVehList = []
      let timewindowVehList = []
      let capacityVehList = []
      let volumeVehList = []
      let vehClassVehList = []
      let TimewindowforDoc = []

      // variables for leftover capacities
      let remainingVehWeight = 0
      let remainingVehVolume = 0
      let remainingVehCases = 0


      selVeh.forEach((veh) => {
        let missingSkillsForDoc = []

        remainingVehWeight = veh.capacities - totalDocsWeight
        remainingVehVolume = veh.vol - totalDocsVolume
        remainingVehCases = veh.maxqty - totalDocsCases

        // Check if all skills of doc are in veh's skills
        let varray = JSON.parse('[' + veh.skills + ']')
        //  Veh.skills = array
        //   let vehskill = ;
        //  const isSubset = docskill.every((skill) => varray.includes(skill));
        const missingSkills = docskill.filter(
          (skill) => !varray.includes(skill)
        )

        if (missingSkills.length === 0) {
          // If no missing skills, it's a match
          if (veh.capacities < doc.netweight) {
            tcapacatyflg = true
            capacityVehList.push(veh.codeyve)
          }
          // volume check
          if (veh.vol < doc.volume) {
            tvolumeflg = true
            volumeVehList.push(veh.codeyve)
          }
        } else {
          // If there are missing skills, collect them
          isSkillMatchFoundflg = true
          missingSkillsForDoc.push(...missingSkills)
          glbalmissingskill.push(...missingSkills)

          if (veh.capacities < doc.netweight) {
            tcapacatyflg = true
            capacityVehList.push(veh.codeyve)
          }
          // volume check
          if (veh.vol < doc.volume) {
            tvolumeflg = true
            volumeVehList.push(veh.codeyve)
          }
          // assign the not mathced skills to the vehicle array
          const tempuniqueMissingSkills = [...new Set(missingSkills)]
          const temprouteCodeErrors = tempuniqueMissingSkills.filter(
            (skill) => skill >= -1 && skill <= 100
          )
          const tempproductCategoryErrors = tempuniqueMissingSkills.filter(
            (skill) => skill > 100 && skill <= 200
          )
          const tempvehicleClassErrors = tempuniqueMissingSkills.filter(
            (skill) => skill > 200
          )

          if (temprouteCodeErrors.length > 0) {
            routeCodeVehList.push(veh.codeyve)
          }
          if (tempproductCategoryErrors.length > 0) {
            prodCodevehList.push(veh.codeyve)
          }
          if (tempvehicleClassErrors.length > 0) {
            vehClassVehList.push(veh.codeyve)
          }
        }
      })


      // empty geo corrdinates



      if (doc.reason && doc.reason.length > 0) {
        let errorMessagesArray = []
        if (
          doc.reason &&
          doc.reason.length > 0 &&
          doc.reason === 'cannot be served due to capacity constraint'
        ) {
          if (remainingVehWeight < doc.netweight) {
            errorMessagesArray.push(
              ` ${doc.docnum} - has been excluded because it exceeds the maximum vehicle’s weight capacity.`
            )
            let glabalerrorOBject = errorMessagesArray
            errorbox.push(glabalerrorOBject + '\n')
          } else if (remainingVehVolume < doc.volume) {
            errorMessagesArray.push(
              ` ${doc.docnum} - has been excluded because it exceeds the maximum vehicle’s volume capacity.`
            )
            let glabalerrorOBject = errorMessagesArray
            errorbox.push(glabalerrorOBject + '\n')
          } else {
            errorMessagesArray.push(
              ` ${doc.docnum} - has been excluded because it exceeds the maximum vehicle’s pallet capacity.`
            )
            let glabalerrorOBject = errorMessagesArray
            errorbox.push(glabalerrorOBject + '\n')
          }
        } else {
          let glabalerrorOBject = errorMessagesArray
          if (doc.reason &&
            doc.reason.length > 0 &&
            doc.reason === 'cannot be served due to skills requirement' || doc.reason === 'cannot be served due to time window constraints in task or vehicles'
          ) {
            if (doc.reason === 'cannot be served due to skills requirement') {
              errorMessagesArray.push(` ${doc.docnum} - has been excluded because the route code or product category is not compatible with vehicle’s restrictions.`)
              errorbox.push(glabalerrorOBject + '\n')
            }
            if (doc.reason === 'cannot be served due to time window constraints in task or vehicles') {
              errorMessagesArray.push(` ${doc.docnum} - has been excluded due to time window restrictions.`)
              errorbox.push(glabalerrorOBject + '\n')
            }
          } else {
            if (
              doc.reason &&
              doc.reason.toLowerCase().includes('infeasible relation')
            ) {
              return;
            }

            errorMessagesArray.push(` ${doc.docnum} - ${doc.reason}.`)
            errorbox.push(glabalerrorOBject + '\n')
          }
        }
      } else if (!tvolumeflg || !tcapacatyflg || !isSkillMatchFoundflg) {
        tempoptiError.docnum = doc.docnum
        let tmsg = '',
          timeWindowStr = ''
        let errorMessagesArray = []

        if (doc.fromTime.length > 0) {
          TimewindowforDoc.push(splitTime(doc.fromTime))
          TimewindowforDoc.push(splitTime(doc.toTime))
          timeWindowStr = `(${TimewindowforDoc[0]} - ${TimewindowforDoc[1]})`
        }

        if (vehClassVehList.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded as the Customer's assigned Vehicle Class does not match  of these vehicles  ${vehClassVehList}.`
          )
        }
        if (prodCodevehList.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded as it contains products not matching the selected vehicles' ${prodCodevehList}  product categories .`
          )
        }
        if (routeCodeVehList.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded as the customer's assigned RouteCode does not match any of the selected vehicles ${routeCodeVehList}.`
          )
        }
        if (capacityVehList.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded due to Weight Capacity restriction on the selected vehicles ${capacityVehList}.`
          )
        }
        if (volumeVehList.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded due to Volume Capacity restriction on the selected vehicles ${volumeVehList}.`
          )
        }
        if (TimewindowforDoc.length > 0) {
          errorMessagesArray.push(
            ` ${doc.docnum} has been excluded due to Delivery Time Frame restriction ${timeWindowStr}.`
          )
        }

        if (errorMessagesArray.length < 1) {
          if (TimewindowforDoc.length > 0) {
            errorMessagesArray.push(
              ` ${doc.docnum} has been excluded due to Delivery Time Frame restriction ${timeWindowStr}.`
            )
          } else {
            errorMessagesArray.push(
              ` ${doc.docnum} has been excluded due to the vehicles weight/volume capacity was full in the current trip.`
            )
          }
        }

        // glabalerrorOBject = glabalerrorOBject + "\n";
        //  const glabalerrorOBject = errorMessagesArray.join('\n');
        let glabalerrorOBject = errorMessagesArray
          .map((msg) => msg + '\n')
          .join('')

        errorbox.push(glabalerrorOBject + '\n')
      } else {
      }
    })


    // --------------------------------------
    // GROUP INFEASIBLE-RELATION DOCS BY CUSTOMER
    // --------------------------------------
    // --------------------------------------
    // GROUP INFEASIBLE-RELATION DOCS BY CUSTOMER
    // (using enriched customerJobMap)
    // --------------------------------------
    // --------------------------------------
    // GROUP INFEASIBLE-RELATION DOCS BY CUSTOMER
    // --------------------------------------
    const infeasibleByCustomer = {};

    tempselDocs.forEach(doc => {
      if (
        doc.reason &&
        doc.reason.toLowerCase().includes('infeasible relation')
      ) {
        const custKey = doc.bpcode || 'UNKNOWN';

        if (!infeasibleByCustomer[custKey]) {
          infeasibleByCustomer[custKey] = [];
        }

        infeasibleByCustomer[custKey].push(doc.docnum);
      }
    });

    Object.keys(infeasibleByCustomer).forEach(custKey => {
      const pickTickets = infeasibleByCustomer[custKey];

      if (pickTickets.length > 1) {
        const customerLabel =
          customerDisplayMap[custKey] || `Customer ${custKey}`;

        errorbox.push(
          `Customer ${customerLabel}: Pick tickets (${pickTickets.join(', ')}) ` +
          `could not be assigned together as they do not fit in a single available truck.`
        );
      }
    });




    //   errorbox.push(glabalerrorOBject);

    const finalErrorMessage = errorbox.join('\n')

    this.setState({
      errorArrayMessage: errorbox,
      errorSummartMessage: summarybox,
      errorNotesArray: NotesBox,
      loader: false,
      processID: jobId,
      addAlertSummaryShow: true,
    })
  }

  // documentsDateRange = (sdate, edate) => {
  //   this.setState({
  //     loader: true,

  //   });

  //   fetchDropsPanelwithRange(
  //     this.state.selectedMultipleSites,
  //     sdate,
  //     edate
  //   ).then(([res1]) => {
  //     let dropsP = res1;
  //     this.setState({
  //       docsEndDate: edate,
  //       docsStartDate: sdate,
  //       dropsPanel: res1,
  //       loader: false,
  //     });
  //   });
  // };

  documentsDateRange = (sdate, edate) => {
    // Validate start and end dates before proceedi
    //
    // ng

    const startDate = moment(sdate, 'YYYY-MM-DD')
    const endDate = moment(edate, 'YYYY-MM-DD')

    this.setState({
      loader: true, loaderText: 'Loading please wait..'
    })

    if (startDate.isAfter(endDate)) {
      this.notifyError('Start date cannot be greater than end date.')
      this.setState({
        loader: false,
      })
    } else if (endDate.isBefore(startDate)) {
      this.notifyError('End date cannot be less than start date.')
      this.setState({
        loader: false,
      })
    } else {
      fetchDropsPanelwithRange(this.state.selectedMultipleSites, sdate, edate)
        .then(([res1]) => {
          this.setState({
            docsEndDate: edate,
            docsStartDate: sdate,
            dropsPanel: res1,
            loader: false,
          })
        })
        .catch((err) => {
          // this.notifyError("End date cannot be less than start date.")
          this.setState({
            loader: false,
          })
        })
    }
  }

  dateTimeToMilliseconds = (dateString, timeString) => {
    //const [hours, minutes] = timeString?.split(':').map(Number);

    // Create a Date object from the date string
    const date = new Date(dateString)

    date.setSeconds(timeString)

    // Set the time (hours and minutes) on the Date object
    //  date.setHours(hours, minutes, 0, 0);

    // Convert to milliseconds since the Unix epoch
    return date.getTime()
  }


  setStateAsync = (stateUpdate) => {
    return new Promise((resolve) => {
      this.setState(stateUpdate, resolve);
    });
  };


  // --------------------------------------
  // CITY HELPERS (NEW)
  // --------------------------------------
  normalizeCity = (city = '') =>
    city.trim().toUpperCase();

  // Business-defined nearby cities (soft)
  CITY_ZONES1 = {
    "SAN FERNANDO": ["PENAL", "DEBE"],
    "POINT FORTIN": ["LA BREA"],
    "RIO CLARO": ["MAYARO", "NAVET"],
    "CHAGUANAS": ["COUVA", "FREEPORT"]
  };


  // --------------------------------------
  // CITY ADJACENCY MAP – TRINIDAD & TOBAGO
  // --------------------------------------

  CITY_ZONES_2 = {

    // =============================
    // SOUTH MAIN HUB (SAN FERNANDO)
    // =============================
    "SAN FERNANDO": [
      "LA ROMAIN",
      "PALMISTE",
      "PLEASANTVILLE",
      "VISTABELLA",
      "COCOYEA",
      "MARABELLA",
      "ST MADELEINE",
      "STE MADELEINE",
      "DEBE",
      "PENAL"
    ],

    "LA ROMAIN": ["SAN FERNANDO", "PENAL"],
    "PALMISTE": ["SAN FERNANDO"],
    "PLEASANTVILLE": ["SAN FERNANDO"],
    "VISTABELLA": ["SAN FERNANDO"],
    "COCOYEA": ["SAN FERNANDO"],
    "MARABELLA": ["SAN FERNANDO"],
    "ST MADELEINE": ["SAN FERNANDO"],
    "STE MADELEINE": ["SAN FERNANDO"],


    // =============================
    // SOUTH CENTRAL CORRIDOR
    // =============================
    "DEBE": ["PENAL", "FYZABAD", "SAN FERNANDO"],
    "PENAL": ["DEBE", "FYZABAD", "SIPARIA", "SAN FERNANDO"],
    "FYZABAD": ["PENAL", "DEBE", "SIPARIA"],
    "SIPARIA": ["FYZABAD", "PENAL", "LA BREA", "POINT FORTIN"],

    "ROUSILLAC": ["PRINCES TOWN", "PENAL"],
    "TABLELAND": ["PRINCES TOWN"],
    "NEW GRANT": ["PRINCES TOWN"],
    "PRINCES TOWN": [
      "TABLELAND",
      "NEW GRANT",
      "ROUSILLAC",
      "MORUGA",
      "MAYO"
    ],

    "MAYO": ["PRINCES TOWN"],
    "MORUGA": ["PRINCES TOWN", "GUAYAGUAYARE"],
    "GUAYAGUAYARE": ["MORUGA"],


    // =============================
    // SOUTH WEST PENINSULA
    // =============================
    "POINT FORTIN": ["LA BREA", "SIPARIA", "GUAPO"],
    "LA BREA": ["POINT FORTIN", "SIPARIA"],
    "CEDROS": ["ICACOS"],
    "ICACOS": ["CEDROS"],
    "ARIPERO": ["POINT FORTIN"],
    "PALO SECO": ["SIPARIA"],


    // =============================
    // CENTRAL REGION
    // =============================
    "CHAGUANAS": ["COUVA", "FREEPORT", "PIPARO"],
    "COUVA": ["CHAGUANAS", "CALIFORNIA", "POINT LISAS"],
    "CALIFORNIA": ["COUVA", "POINT LISAS"],
    "POINT LISAS": ["COUVA", "CALIFORNIA"],
    "PIPARO": ["CHAGUANAS"],
    "FREEPORT": ["CHAGUANAS"],
    "TABAQUITE": ["PRINCES TOWN"],


    // =============================
    // EAST / SOUTH EAST CORRIDOR
    // =============================
    "RIO CLARO": ["MAYARO", "NAVET"],
    "NAVET": ["RIO CLARO"],
    "MAYARO": ["RIO CLARO", "MANZANILLA"],
    "MANZANILLA": ["MAYARO"],


    // =============================
    // OUTER SMALL CLUSTERS
    // =============================
    "BARRACKPORE": ["SAN FERNANDO"],
    "GASPARILLO": ["SAN FERNANDO"],
    "LOS IROS": ["SIPARIA"],
    "SANTA FLORA": ["SIPARIA"],
    "SOUTH OROPOUCHE": ["SAN FERNANDO"],
    "WILLIAMSVILLE": ["PRINCES TOWN"],
    "CORINTH": ["SAN FERNANDO"],
    "GRANVILLE": ["POINT FORTIN"],
    "PHILLIPINE": ["PRINCES TOWN"],
    "OROPOUCHE": ["SAN FERNANDO"],
    "PALMYRA": ["SAN FERNANDO"],
    "ROUSILLAC": ["PRINCES TOWN"],
    "CHATHAM": ["POINT FORTIN"],
    "GOLCONDA": ["SAN FERNANDO"],
    "CROSS CROSSING": ["SAN FERNANDO"],
    "POOLE": ["POINT FORTIN"],
    "ST JAMES": ["SAN FERNANDO"],


    // =============================
    // DEFAULT HANDLING
    // =============================
    // Any city not listed will naturally behave independently.
  };


  // --------------------------------------
  // CITY_ADJACENCY – TRINIDAD & TOBAGO
  // NON-CHAINING, DIRECT NEIGHBORS ONLY
  // --------------------------------------
  CITY_ZONES = {

    /* =========================
       SOUTH / SOUTH-WEST CORE
    ========================= */
    "SAN FERNANDO": [
      "LA ROMAIN",
      "PALMISTE",
      "PLEASANTVILLE",
      "VISTABELLA",
      "MARABELLA",
      "DEBE",
      "PENAL"
    ],

    "LA ROMAIN": ["SAN FERNANDO"],
    "PALMISTE": ["SAN FERNANDO"],
    "PLEASANTVILLE": ["SAN FERNANDO"],
    "VISTABELLA": ["SAN FERNANDO"],
    "MARABELLA": ["SAN FERNANDO", "GASPARILLO"],
    "GASPARILLO": ["MARABELLA"],

    /* =========================
       PENAL / DEBE BELT
    ========================= */
    "PENAL": ["DEBE"],
    "DEBE": ["PENAL", "FYZABAD"],
    "FYZABAD": ["DEBE", "SIPARIA"],
    "SIPARIA": ["FYZABAD", "LA BREA"],

    /* =========================
       SOUTH-WEST PENINSULA
    ========================= */
    "LA BREA": ["SIPARIA", "POINT FORTIN"],
    "POINT FORTIN": ["LA BREA", "LOS IROS", "CHATHAM"],
    "LOS IROS": ["POINT FORTIN"],
    "CHATHAM": ["POINT FORTIN"],
    "CHATAM": ["POINT FORTIN"],
    "CEDROS": ["ICACOS"],
    "ICACOS": ["CEDROS"],
    "PALO SECO": ["LA BREA"],

    /* =========================
       PRINCES TOWN REGION
    ========================= */
    "PRINCES TOWN": [
      "ROUSILLAC",
      "MORUGA",
      "TABLELAND",
      "AVOCAT",
      "GRANVILLE",
      "POOLE"
    ],

    "ROUSILLAC": ["PRINCES TOWN"],
    "MORUGA": ["PRINCES TOWN", "GUAYAGUAYARE"],
    "GUAYAGUAYARE": ["MORUGA"],
    "TABLELAND": ["PRINCES TOWN", "TABAQUITE"],
    "TABAQUITE": ["TABLELAND"],
    "AVOCAT": ["PRINCES TOWN"],
    "GRANVILLE": ["PRINCES TOWN"],
    "POOLE": ["PRINCES TOWN"],
    "WOODLAND": ["PRINCES TOWN"],
    "ESPERANCE": ["PRINCES TOWN"],
    "SANTA FLORA": ["PRINCES TOWN"],
    "MAYO": ["PRINCES TOWN"],
    "PHILLIPINE": ["PRINCES TOWN"],
    "SOUTH OROPOUCHE": ["PRINCES TOWN"],
    "OROPOUCHE": ["PRINCES TOWN"],

    /* =========================
       CENTRAL
    ========================= */
    "CHAGUANAS": ["COUVA", "FREEPORT", "WILLIAMSVILLE"],
    "COUVA": ["CHAGUANAS", "CALIFORNIA", "POINT LISAS"],
    "CALIFORNIA": ["COUVA"],
    "POINT LISAS": ["COUVA"],
    "FREEPORT": ["CHAGUANAS"],
    "WILLIAMSVILLE": ["CHAGUANAS"],
    "PIPARO": ["TABAQUITE"],
    "NEW GRANT": ["PRINCES TOWN"],

    /* =========================
       EAST / SOUTH-EAST
    ========================= */
    "RIO CLARO": ["MAYARO", "NAVET"],
    "MAYARO": ["RIO CLARO", "MANZANILLA"],
    "NAVET": ["RIO CLARO"],
    "MANZANILLA": ["MAYARO"],

    /* =========================
       MISC / LOCAL
    ========================= */
    "BARRACKPORE": ["PENAL"],
    "PALMYRA": ["SAN FERNANDO"],
    "COCOYEA": ["SAN FERNANDO"],
    "SOUTH PARK": ["SAN FERNANDO"],
    "TORTUGA": ["SAN FERNANDO"],
    "CORINTH": ["SAN FERNANDO"],
    "RANCHO QUEMADO": ["POINT FORTIN"],
    "ARIPERO": ["PRINCES TOWN"],
  };


  extractUsedVehicles = (result) => {
    if (!result || !Array.isArray(result.routes)) {
      console.warn("No routes returned from optimizer", result);
      return [];
    }

    const usedVehicleIds = new Set();

    result.routes.forEach(route => {
      if (route.vehicle_id) {
        usedVehicleIds.add(route.vehicle_id);
      }
    });

    return Array.from(usedVehicleIds);
  };


  extractAssignedDocs = (result) => {
    if (!result || !Array.isArray(result.trips)) return [];

    const assignedDocs = new Set();

    result.trips.forEach(trip => {
      if (!Array.isArray(trip.stops)) return;

      trip.stops.forEach(stop => {
        if (!Array.isArray(stop.jobs)) return;

        stop.jobs.forEach(job => {
          if (job.description) {
            assignedDocs.add(job.description); // this is your docnum
          }
        });
      });
    });

    return Array.from(assignedDocs);
  };


  updateAutoPlanLoader = (current, total, cities) => {
    this.setState({
      loader: true,
      loaderText: `Auto planning routes (${current} of ${total})\n` +
        `Cities: ${cities.join(', ')}`
    });
  };

  getCityGroupsBySite = (siteCode) => {
    // Adjust siteCode check based on your actual site IDs
    if (siteCode === '1100') {
      return NORTH_SITE_CITY_GROUPS;
    }

    if (siteCode === '1200') {
      return SOUTH_SITE_CITY_GROUPS;
    }

    return [];
  };


  onAutoPlanClick = async (selectedDocs, selectedVehicles, selectedDrivers, loadType, engineType) => {

    this.usedVehicleIds.clear();

    console.log("Site selection", this.state.selectedSite)
    //const selSite = this.state.selectedMultipleSites[0];
    const selectedSiteObj = this.state.selectedSite;
    const selSiteId = selectedSiteObj?.id;
    const groups = this.getCityGroupsBySite(selSiteId);


    const totalGroups = groups.length;
    console.log("AUTO - onAutoPlanBy City", selectedVehicles)
    let remainingVehicles = [...selectedVehicles];
    let carryForwardDocs = [];
    const result = [];

    for (let i = 0; i < groups.length; i++) {
      const cityGroup = groups[i];

      // 1️⃣ Get docs for this group
      const groupDocs = selectedDocs.filter(doc =>
        cityGroup.includes(doc.city.toUpperCase())
      );

      //    // 2️⃣ Optionally include unassigned docs from previous group
      //    const docsToProcess = [
      //      ...groupDocs,
      //      ...carryForwardDocs
      //    ];



      if (groupDocs.length === 0) continue;
      if (remainingVehicles.length === 0) break;

      // 🟡 SHOW PROGRESS
      this.updateAutoPlanLoader(
        i + 1,
        totalGroups,
        cityGroup
      );



      if (engineType === "NB") {

        if (loadType === "ALL") {
          await this.autofromselection_nextBilloins_Weight_Cases_Pallets(groupDocs, remainingVehicles, selectedDrivers, 'GroupByCity');

        }
        else {
          // 3️⃣ Call optimization - onAutoPlanClick
          await this.autofromselection_nextBilloins_onlyPallets(
            groupDocs,
            remainingVehicles,
            selectedDrivers,
            'GroupByCity'
          );
        }
      }
      else {
        await this.autofromselection_OSRM(groupDocs, remainingVehicles, selectedDrivers, 'GroupByCity');
      }

      console.log("AUTO - onAutoPlanBy results", result)
      // 4️⃣ From result, determine:
      //    a) which vehicles were used
      //    b) which docs were assigned
      //  const usedVehicles = this.extractUsedVehicles(result);
      //  const assignedDocs = this.extractAssignedDocs(result);

      console.log("AUTO - onAutoPlanBy Used Vehicles", this.usedVehicleIds)
      // 5️⃣ Remove used vehicles
      remainingVehicles = remainingVehicles.filter(
        v => !this.usedVehicleIds.has(v.codeyve)
      );

      //    // 6️⃣ Carry forward unassigned docs (optional)
      //    carryForwardDocs = docsToProcess.filter(
      //      d => !assignedDocs.includes(d.docnum)
      //    );
    }
    this.usedVehicleIds.clear();
    this.setState({
      loader: false,
      loaderText: 'Auto planning completed successfully'
    });
  };

  autofromselection_OSRM = async (SelDocs, selVeh, selDrivers, engineType, NotesExecptions = []) => {
    await this.setStateAsync({ loader: true, loaderText: 'Validating Vehicles and Document for Optimization. Please wait...' });
    let locationArraybefore = []
    let vehile_profile_options = {

      grouping: {
        proximity_factor: 5
      },
      routing: {
        mode: 'car',
        profiles: {
          car: {
            mode: 'car',
          },
          minivan: {
            mode: 'car',
            avoid: [],
          },
        },
      },
    }

    let tempTripPanel = this.state.tripsPanel
    let resArr = []
    let ddate = this.state.date
    let formatedDate = moment.tz(ddate, '').format('YYYY-MM-DD')
    tempTripPanel.filter((item) => {
      resArr.push(item)
    })
    let BreakFeatures = []
    let VehStartTime, VehEndTime

    if (selVeh.length > 0 && SelDocs.length > 0) {
      this.setState({ loader: true, loaderText: 'Loading Please wait....' })

      let VehList = [],
        DocList = []
      let DocListFeatures = []
      let DeportListFeatures = []
      let VehListFeatures = []

      let siteLat, siteLang

      let selSite = this.state.selectedMultipleSites[0]
      this.state.sites.map((site) => {
        if (selSite === site.id) {
          siteLat = site.lat
          siteLang = site.lng

          let newCoord = `${siteLat},${siteLang}`
          locationArraybefore.push(newCoord)
        }
      })


      for (let i = 0; i < selVeh.length; i++) {
        let Veh = {}
        let veh = selVeh[i]

        let sflag = false
        let prevEndTime = 0
        for (let t = 0; t < resArr.length; t++) {
          let currtrip = resArr[t]
          if (currtrip.code === veh.codeyve) {
            if (currtrip.endTime && currtrip.endTime.trim() !== '' && currtrip.endTime.trim() !== 'null') {
              sflag = true;
              let endTime = splitTimeAndConv2Sec(currtrip.endTime);
              let unloadingtime = convertHrToSec(veh.enddepotserv);
              prevEndTime = endTime + unloadingtime;
            }
          }
        }
        if (!sflag) {
          prevEndTime = splitTimeAndConv2Sec(veh.starttime)
        }

        let starttime = prevEndTime
        let loadingHrs = convertHrToSec(veh.startdepots)
        let stime = starttime + loadingHrs
        let etime = splitTimeAndAddtimeAndConv2Sec(
          veh.starttime,
          veh.overtimestar
        )
        if (stime < etime) {
        } else {
          etime = 86400
        }
        Veh.id = i + 1
        Veh.start = [siteLang, siteLat]
        Veh.end = [siteLang, siteLat]
        Veh.description = veh.codeyve
        Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime)

        let totalWeight = 0;
        let totalVolume = 0;

        totalWeight = Number(veh.capacities || 0);
        totalVolume = Number(veh.vol || 0);
        // Veh.capacity = [totalWeight, totalVolume];
        Veh.capacity = [parseInt(veh.capacities * 100), parseInt(veh.maxPallets * 100), parseInt(veh.maxCases * 100)]
        if (veh.xmaxtotaldis === 'Miles') {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1609.34)
        } else {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1000)
        }
        let timew = [stime, etime]
        let geo = [siteLang, siteLat]
        Veh.time_window = timew
        Veh.skills = (veh.skills ?? '')
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)
          .map(Number);

        Veh.max_tasks = veh.maxordercnt > 0 ? veh.maxordercnt : 3

        VehEndTime = etime
        VehStartTime = stime
        let earliestSTateTime = this.dateTimeToMilliseconds(ddate, stime)
        let tempdddd = earliestSTateTime / 1000
        if (stime < etime) {
          VehList.push(Veh)
        }
      }
      let maxDoc = this.state.defaultdocprocess
      let docprocessedCount = 0

      const jobs = []
      const shipments = []
      const extraError = [];
      const receiptPickupMap = {}
      const receiptsObj = {}
      let idCounter = 1 // Start ID from 1
      let weightKey = ''
      const MAX_TASKS = 999;
      let taskCount = 0;
      let skippedDocs = [];


      SelDocs.forEach((item) => {
        if (taskCount >= MAX_TASKS) {
          return;
        }


        var FromArr;
        var fromflag = false;
        var toflag = false;
        if (item.fromTime.length > 0) {
          FromArr = item.fromTime.split(" ");
          fromflag = true;
        }
        var ToArr;
        if (item.toTime.length > 0) {
          ToArr = item.toTime.split(" ");
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
        const validTimeWindows = this.normalizeTimeWindows(timeWindw);

        if (item.doctype === 'PRECEIPT' || item.doctype === 'RETURN' && item.docnum) {
          const id = idCounter++

          let newCoord = `${item.lat},${item.lng}`
          let loc_index = locationArraybefore.push(newCoord) - 1
          let skillsArray
          try {
            let parsedSkills = JSON.parse(
              '[' + String(item.skills || '').replace(/^[\s,]+|[\s,]+$/g, '').replace(/,+/g, ',') + ']'
            );
            if (
              Array.isArray(parsedSkills) &&
              parsedSkills.every((skill) => typeof skill === 'number')
            ) {
              skillsArray = parsedSkills
            } else {
            }
          } catch (e) {
          }

          if (item.pairedDoc && item.pairedDoc.trim() !== '') {
            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP' ||
              item.doctype == 'SORDER'

            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }
            var DocLat, DocLang
            DocLat = item.lat
            DocLang = item.lng
            console.log("bpcode:1", item.bpcode, "doc:", item.docnum)
            receiptPickupMap[item.docnum] = id
            receiptsObj[item.docnum] = {
              id: id,
              service:
                parseInt(convertHrToSec(item.serviceTime)) +
                parseInt(convertHrToSec(item.waitingTime)),
              [weightKey]: [parseInt(item.netweight * 100), parseInt(item.mainPallets * 100), parseInt(item.mainCases * 100)],
              description: item.docnum,
              location: [DocLang, DocLat],
              skills: skillsArray,
              priority: parseInt(item.priority),
              group: item.bpcode, // Group by business partner code
              ...(validTimeWindows.length > 0
                ? { time_windows: validTimeWindows }
                : {})

            }

            shipments.push({
              pickup: receiptsObj[item.docnum],
            })
          } else {
            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP' ||
              item.doctype == 'SORDER'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }

            var DocLat, DocLang
            DocLat = item.lat
            DocLang = item.lng

            console.log("bpcode:2", item.bpcode, "doc:", item.docnum)
            jobs.push({
              id: id,
              service:
                parseInt(convertHrToSec(item.serviceTime)) +
                parseInt(convertHrToSec(item.waitingTime)),
              [weightKey]: [parseInt(item.netweight * 100), parseInt(item.mainPallets * 100), parseInt(item.mainCases * 100)],
              description: item.docnum,
              location: [DocLang, DocLat],
              skills: skillsArray,
              priority: parseInt(item.priority),
              group: item.bpcode, // Group by business partner code
              ...(validTimeWindows.length > 0
                ? { time_windows: validTimeWindows }
                : {})
            })
            taskCount += 1;
          }
        }
      })

      const minLat = 9.982106
      const maxLat = 10.85555;
      const minLng = -61.95056;
      const maxLng = -60.8988;
      SelDocs.forEach((item) => {
        if (taskCount >= MAX_TASKS) {
          return;
        }


        var FromArr;
        var fromflag = false;
        var toflag = false;
        if (item.fromTime.length > 0) {
          FromArr = item.fromTime.split(" ");
          fromflag = true;
        }
        var ToArr;
        if (item.toTime.length > 0) {
          ToArr = item.toTime.split(" ");
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
        const validTimeWindows = this.normalizeTimeWindows(timeWindw);

        let coordinatesFlag = false;
        if (item.lat != '' || item.lng != '') {
          const dlat = parseFloat(item.lat);
          const dlng = parseFloat(item.lng);
          if (dlat < minLat || dlat > maxLat || dlng < minLng || dlng > maxLng) {
            coordinatesFlag = true;
            let message = `${item.docnum} - Coordinates appear to be incorrect. please verify once.`;
            extraError.push(message);
          }
          if (item.doctype !== 'PRECEIPT' && item.doctype !== 'RETURN' && item.docnum && !coordinatesFlag) {
            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP' ||
              item.doctype == 'SORDER'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }
            const deliveryId = idCounter++

            let newCoord = `${item.lat},${item.lng}`
            let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index
            let skillsArray
            try {
              let parsedSkills = JSON.parse(
                '[' + String(item.skills || '').replace(/^[\s,]+|[\s,]+$/g, '').replace(/,+/g, ',') + ']'
              );
              if (
                Array.isArray(parsedSkills) &&
                parsedSkills.every((skill) => typeof skill === 'number')
              ) {
                skillsArray = parsedSkills
              } else {
              }
            } catch (e) {
            }

            if (
              item.pairedDoc.trim() !== '' &&
              receiptPickupMap[item.pairedDoc]
            ) {
              const shipment = shipments.find(
                (s) => s.pickup.id === receiptPickupMap[item.pairedDoc]
              )
              if (
                item.doctype == 'PICK' ||
                item.doctype == 'DLV' ||
                item.doctype == 'MISCDROP' ||
                item.doctype == 'SORDER'
              ) {
                weightKey = 'delivery'
              } else if (
                item.doctype == 'RETURN' ||
                item.doctype == 'MISCPICK' ||
                item.doctype == 'PRECEIPT'
              ) {
                weightKey = 'pickup'
              }
              console.log("bpcode:3", item.bpcode, "doc:", item.docnum)
              if (shipment) {
                const deliveryKey = shipment.delivery
                  ? `delivery_${Object.keys(shipment).length - 1}`
                  : 'delivery'

                shipment[deliveryKey] = {
                  id: deliveryId,
                  service:
                    parseInt(convertHrToSec(item.serviceTime)) +
                    parseInt(convertHrToSec(item.waitingTime)),
                  [weightKey]: [parseInt(item.netweight * 100), parseInt(item.mainPallets * 100), parseInt(item.mainCases * 100)],
                  description: item.docnum,
                  skills: skillsArray,
                  priority: parseInt(item.priority),
                  group: item.bpcode, // Group by business partner code
                  ...(validTimeWindows.length > 0
                    ? { time_windows: validTimeWindows }
                    : {})
                }
              }
              else {
                if (
                  item.doctype == 'PICK' ||
                  item.doctype == 'DLV' ||
                  item.doctype == 'MISCDROP' ||
                  item.doctype == 'SORDER'
                ) {
                  weightKey = 'delivery'
                } else if (
                  item.doctype == 'RETURN' ||
                  item.doctype == 'MISCPICK' ||
                  item.doctype == 'PRECEIPT'
                ) {
                  weightKey = 'pickup'
                }
                var DocLat, DocLang
                DocLat = item.lat
                DocLang = item.lng
                console.log("bpcode:4", item.bpcode, "doc:", item.docnum)
                jobs.push({
                  id: deliveryId,
                  service:
                    parseInt(convertHrToSec(item.serviceTime)) +
                    parseInt(convertHrToSec(item.waitingTime)),
                  [weightKey]: [parseInt(item.netweight * 100), parseInt(item.mainPallets * 100), parseInt(item.mainCases * 100)],
                  description: item.docnum,
                  location: [DocLang, DocLat],
                  skills: skillsArray,
                  priority: parseInt(item.priority),
                  group: item.bpcode, // Group by business partner code
                  ...(validTimeWindows.length > 0
                    ? { time_windows: validTimeWindows }
                    : {})
                })
                taskCount += 1;
              }
            } else {
              if (
                item.doctype == 'PICK' ||
                item.doctype == 'DLV' ||
                item.doctype == 'MISCDROP' ||
                item.doctype == 'SORDER'
              ) {
                weightKey = 'delivery'
              } else if (
                item.doctype == 'RETURN' ||
                item.doctype == 'MISCPICK' ||
                item.doctype == 'PRECEIPT'
              ) {
                weightKey = 'pickup'
              }

              let timeWindw = []
              var FromArr
              var fromflag = false
              var toflag = false
              if (item.fromTime.length > 0) {
                FromArr = item.fromTime.split(' ')
                fromflag = true
              }
              var ToArr
              if (item.toTime.length > 0) {
                ToArr = item.toTime.split(' ')
                toflag = true
              }
              fromflag &&
                FromArr.map((ft, index) => {
                  var tt = []
                  tt.push(splitTimeAndConv2Sec(ft))
                  tt.push(splitTimeAndConv2Sec(ToArr[index]))
                  timeWindw.push(tt)
                })

              if (fromflag) {
                item.time_windows = timeWindw
              }

              if (item.pairedDoc.trim() === '') {
                var DocLat, DocLang
                DocLat = item.lat
                DocLang = item.lng
                console.log("bpcode:5", item.bpcode, "doc:", item.docnum)
                jobs.push({
                  id: deliveryId,
                  service:
                    parseInt(convertHrToSec(item.serviceTime)) +
                    parseInt(convertHrToSec(item.waitingTime)),
                  [weightKey]: [parseInt(item.netweight * 100), parseInt(item.mainPallets * 100), parseInt(item.mainCases * 100)],
                  description: item.docnum,
                  location: [DocLang, DocLat],
                  skills: skillsArray,
                  priority: parseInt(item.priority),
                  group: item.bpcode, // Group by business partner code
                  ...(validTimeWindows.length > 0
                    ? { time_windows: validTimeWindows }
                    : {})
                })
                taskCount += 1;
              }
            }
          }
        }
        else {
          let message = `${item.docnum} -    Geo Coordinates are missing for the document`;
          extraError.push(message);
        }
      })
      let finallocationList = locationArraybefore
      let locactionsFinal = {
        id: 1,
        location: finallocationList,
      }

      let nextBillonObject = {
        vehicles: VehList,
        options: {
          g: true,
        },
        jobs: jobs,
        grouping: {
          proximity_factor: 10
        }
      }


      console.log(this.state.loader, "checking loader here");
      let response = await fetch(`https://maps.tema-systems.com`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextBillonObject),
      })
      if (response.status === 200) {
        if (!response.ok) {
          const errorDetails = await response.json()
          this.setState({ loader: false })
          console.log(this.state.loader, "checking loader here 6592");
        } else {
          const data = await response.json();
          this.submitRoutesforTripsCreation(
            data.routes,
            selSite,
            SelDocs,
            selDrivers,
            selVeh,
            data,
            [],
            'auto_next',
            "",
            [],
            [],
            extraError,
            [],
            NotesExecptions,
            "",
            engineType
          )
        }
      } else {
        const data = await response.json()
        let finalMessage = '';
        if (extraError.length > 0) {

          extraError.forEach((msg) => {
            finalMessage += msg + '\n';
          });
        }
        else {
          const originalMessage = data.error || data.message || data.msg || '' // Use whichever exists, or default to an empty string

          const updatedMessage = originalMessage
            .replaceAll('NextBillion', 'TEMA')
            .replaceAll('support@nextbillion.ai', 'support@tema-systems.com')
          finalMessage = updatedMessage
          if (
            updatedMessage.includes('Unfound route(s) from location') ||
            updatedMessage.includes('No route found')
          ) {
            finalMessage =
              `Geo coordinates are incorrect or outside the serviceable area. Please verify the document location.`
          }
          else if (
            updatedMessage.includes(
              'Please ensure that the time window has valid and chronological timestamps'
            )
          ) {
            const match = updatedMessage.match(/vehicle with ID (\w+)/)
            const vehicleId = match ? match[1] : 'Unknown'

            finalMessage =
              `Trip generation with vehicle ID ${vehicleId} is failed as the document delivery timeline exceeds the 24:00 cutoff.`
          }
          else {
            finalMessage = updatedMessage
          }
        }
        this.setState({
          errorMessage: finalMessage,
          addAlertShow: true,
          loader: false,
        })
      }
    } else {
      this.setState({
        errorMessage:
          selVeh.length === 0
            ? 'There are no vehicles selected.'
            : 'There are no documents selected.',
        addAlertShow: true,
      })
    }
  }



  autofromselection_nextBilloins__ = async (DocsData, selVeh, selDrivers) => {

    // ===============================
    // BASIC VALIDATION
    // ===============================
    if (!selVeh || selVeh.length === 0) {
      this.setState({
        errorMessage: 'No vehicles selected.',
        addAlertShow: true
      });
      return;
    }

    if (!DocsData || DocsData.length === 0) {
      this.setState({
        errorMessage: 'No documents selected.',
        addAlertShow: true
      });
      return;
    }

    // ===============================
    // SORT BY CUSTOMER (bpcode)
    // ===============================
    const SelDocs = [...DocsData].sort((a, b) =>
      Number(a.bpcode) - Number(b.bpcode)
    );

    // ===============================
    // CALCULATE CUSTOMER TOTAL DEMAND
    // ===============================
    const customerDemandMap = {};

    SelDocs.forEach(item => {
      if (!item.bpcode) return;

      if (!customerDemandMap[item.bpcode]) {
        customerDemandMap[item.bpcode] = 0;
      }

      const demand = parseInt(item.noofCases || 0) * 100;
      customerDemandMap[item.bpcode] += demand;
    });

    await this.setStateAsync({
      loader: true,
      loaderText: 'Optimizing routes... Please wait.'
    });

    const postAPICode =
      'https://api.nextbillion.io/optimization/v2?key=b1cebb49fcaa4366abcb19cfb12b43b3';

    // ===============================
    // BUILD VEHICLES
    // ===============================
    let vehicles = [];

    selVeh.forEach(veh => {

      let vehicle = {
        id: veh.codeyve,
        start_index: 0,
        end_index: 0,
        name: veh.codeyve,
        description: veh.codeyve,
        profile: 'car',
        max_travel_time: convertHrToSec(veh.maxtotaltrvtime),
        capacity: [parseInt(veh.maxqty * 100)],
        max_tasks: veh.maxordercnt > 0 ? veh.maxordercnt : 99,
        skills: JSON.parse(`[${veh.skills}]`),
        time_window: [
          splitTimeAndConv2Sec(veh.starttime),
          86400
        ]
      };

      if (veh.xmaxtotaldis === 'Miles') {
        vehicle.max_distance = Math.round(veh.maxtotaldist * 1609.34);
      } else {
        vehicle.max_distance = Math.round(veh.maxtotaldist * 1000);
      }

      vehicles.push(vehicle);
    });

    // ===============================
    // FIND MAX VEHICLE CAPACITY
    // ===============================
    const maxVehicleCapacity = Math.max(
      ...vehicles.map(v => v.capacity[0] || 0)
    );

    // ===============================
    // BUILD JOBS
    // ===============================
    let jobs = [];
    let locations = [];
    let idCounter = 1;

    SelDocs.forEach(item => {

      if (!item.lat || !item.lng) return;

      const locationIndex =
        locations.push(`${item.lat},${item.lng}`) - 1;

      let skillsArray = [];
      try {
        skillsArray = JSON.parse(`[${item.skills}]`);
      } catch {
        skillsArray = [];
      }

      // ===============================
      // GROUP LOGIC
      // ===============================
      let groupValue = undefined;

      if (item.bpcode && customerDemandMap[item.bpcode]) {
        const totalDemand = customerDemandMap[item.bpcode];

        if (totalDemand <= maxVehicleCapacity) {
          groupValue = item.bpcode;
        }
      }

      // ===============================
      // TIME WINDOWS (if provided)
      // ===============================
      let timeWindows = [];

      if (item.fromTime && item.toTime) {
        const fromArr = item.fromTime.split(' ');
        const toArr = item.toTime.split(' ');

        fromArr.forEach((ft, index) => {
          if (toArr[index]) {
            timeWindows.push([
              splitTimeAndConv2Sec(ft),
              splitTimeAndConv2Sec(toArr[index])
            ]);
          }
        });
      }

      jobs.push({
        id: idCounter++,
        location_index: locationIndex,
        service:
          parseInt(convertHrToSec(item.serviceTime || 0)) +
          parseInt(convertHrToSec(item.waitingTime || 0)),
        delivery: [parseInt(item.noofCases || 0) * 100],
        description: item.docnum,
        skills: skillsArray,
        priority: parseInt(item.priority || 0),
        group: groupValue,
        time_windows: timeWindows
      });

    });

    // ===============================
    // OPTIMIZATION OPTIONS
    // ===============================
    const options = {
      grouping: {
        proximity_factor: 5
      },
      routing: {
        mode: 'car',
        continue_straight: true
      }
    };

    const requestBody = {
      jobs,
      shipments: [],
      vehicles,
      locations: {
        id: 1,
        location: locations
      },
      options
    };

    try {

      const response = await fetch(postAPICode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        this.setState({
          errorMessage: data.message || 'Optimization failed.',
          addAlertShow: true,
          loader: false
        });
        return;
      }

      await this.OrganiseNextBillionsResponse(
        data,
        this.state.selectedMultipleSites[0],
        SelDocs,
        selVeh,
        selDrivers,
        jobs,
        [],
        []
      );

    } catch (error) {

      this.setState({
        errorMessage: 'Optimization service error.',
        addAlertShow: true,
        loader: false
      });

    }
  };

  normalizeTimeWindows = (timeWindw) => {
    if (
      Array.isArray(timeWindw) &&
      timeWindw.length === 2 &&
      timeWindw.every(v => Number(v) === 0)
    ) {
      return [];
    }
    if (Array.isArray(timeWindw) && Array.isArray(timeWindw[0])) {
      return timeWindw.filter(
        tw =>
          Array.isArray(tw) &&
          tw.length === 2 &&
          !(Number(tw[0]) === 0 && Number(tw[1]) === 0)
      );
    }
    return [];
  };


  autofromselection_nextBilloins = (DocsData, selVeh, selDrivers, loadType, autoType, engineType) => {

    console.log("AUTO - loadType", loadType);
    console.log("AUTO - AutoType", autoType);
    console.log("AUTO - EngineType", engineType);

    const NotesExecptions = [];

    const customerJobMap = {};
    DocsData.forEach(doc => {
      if (!customerJobMap[doc.bpcode]) {
        customerJobMap[doc.bpcode] = [];
      }
      customerJobMap[doc.bpcode].push(doc);
    });

    Object.entries(customerJobMap).forEach(([bpcode, docs]) => {

      const totalWeight = docs.reduce((sum, d) => sum + Number(d.netweight || 0), 0);
      const totalCases = docs.reduce((sum, d) => sum + Number(d.mainCases || 0), 0);
      const totalPallets = docs.reduce((sum, d) => sum + Number(d.mainPallets || 0), 0);

      const vehicles = selVeh;

      let maxWeight = 0;
      let maxCases = 0;
      let maxPallets = 0;

      vehicles.forEach(v => {
        maxWeight = Math.max(maxWeight, Number(v.capacities || 0));
        maxCases = Math.max(maxCases, Number(v.maxCases || 0));
        maxPallets = Math.max(maxPallets, Number(v.maxPallets || 0));
      });

      const doc = docs[0];

      if (totalWeight > maxWeight) {
        NotesExecptions.push(
          `For Customer <b>${doc.bpname} (${doc.bpcode})</b>, the pick ticket reflects a total weight which exceeds the maximum available vehicle capacity.`
        );
      }

      if (totalCases > maxCases) {
        NotesExecptions.push(
          `For Customer <b>${doc.bpname} (${doc.bpcode})</b>, the pick ticket reflects a total of ${totalCases} CS which exceeds the maximum available vehicle capacity.`
        );
      }

      if (totalPallets > maxPallets) {
        NotesExecptions.push(
          `For Customer <b>${doc.bpname} (${doc.bpcode})</b>, the pick ticket reflects a total of ${totalPallets} PAL which exceeds the maximum available vehicle capacity.`
        );
      }

    });

    // loadType = PALLETS | ALL
    // autoType =  AUTO | AUTO_ROUTE

    if (engineType === "NB") {

      if (loadType === "PALLETS") {

        if (autoType === "AUTO_ROUTE") {
          // this.autofromselection_nextBilloins_onlyPallets_City(DocsData, selVeh, selDrivers);

          this.onAutoPlanClick(DocsData, selVeh, selDrivers, loadType, engineType)
        }
        else {
          this.autofromselection_nextBilloins_onlyPallets(DocsData, selVeh, selDrivers, 'ALL');
        }
      }
      else {

        if (autoType === "AUTO_ROUTE") {
          // this.autofromselection_nextBilloins_Weight_Cases_Pallets(DocsData, selVeh, selDrivers);
          this.onAutoPlanClick(DocsData, selVeh, selDrivers, loadType, engineType)
        }
        else {
          this.autofromselection_nextBilloins_Weight_Cases_Pallets(DocsData, selVeh, selDrivers, 'ALL');
        }

      }
    }
    else {

      if (autoType === "AUTO_ROUTE") {
        this.onAutoPlanClick(DocsData, selVeh, selDrivers, autoType, engineType)
      }
      else {
        this.autofromselection_OSRM(DocsData, selVeh, selDrivers, engineType, NotesExecptions);
      }
    }
  }

  autofromselection_nextBilloins_Weight_Cases_Pallets = async (DocsData, selVeh, selDrivers, fromBy) => {

    const DIMENSIONS = [
      { key: 'pallets', label: 'PAL' },
      { key: 'cases', label: 'CASES' },
      { key: 'weight', label: 'WEIGHT' }
    ];
    // --------------------------------------
    // SKILL & VEHICLE HELPERS (✅ NEW)
    // --------------------------------------
    const doesVehicleMatchSkills = (vehicleSkills = [], requiredSkills = []) =>
      requiredSkills.every(skill => vehicleSkills.includes(skill));

    const getSkillMatchedVehiclesForCustomer = (vehicles, requiredSkills) =>
      vehicles.filter(v =>
        doesVehicleMatchSkills(v.skills || [], requiredSkills)
      );

    //const getMaxCapacityFromVehicles = (vehicles) => {
    //  let max = 0;
    //  vehicles.forEach(v => {
    //    if (Array.isArray(v.capacity) && v.capacity.length > 0) {
    //      max = Math.max(max, v.capacity[0]);
    //    }
    //  });
    //  return max;
    //};

    const getVehicleCapacityByDim = (vehicles) => {
      const max = { pallets: 0, cases: 0, weight: 0 };
      vehicles.forEach(v => {
        if (!Array.isArray(v.capacity)) return;
        max.pallets = Math.max(max.pallets, v.capacity[0] || 0);
        max.cases = Math.max(max.cases, v.capacity[1] || 0);
        max.weight = Math.max(max.weight, v.capacity[2] || 0);
      });
      return max;
    };

    const exceedsAnyDimension = (load, job, cap) =>
      Object.keys(load).some(dim =>
        load[dim] + job.demandByDim[dim] > cap[dim]
      );

    const getCustomerPriority = (docCount) => {
      if (docCount > 5) return 80;
      if (docCount > 2) return 40;
      return 10;
    };


    /* =====================================================
       SORT DOCUMENTS
    ===================================================== */
    const SelDocs = [...DocsData].sort((a, b) =>
      Number(a.bpcode) - Number(b.bpcode)
    );

    this.existingTripsBeforeOptimization =
      this.state.tripsPanel.map(t => t.itemCode);


    // this.setState({ loader: true , loaderText : 'Validating Vehicles and Document for Optimization. Please wait...' })
    let postAPICode =
      'https://api.nextbillion.io/optimization/v2?key=b1cebb49fcaa4366abcb19cfb12b43b3'

    let locationArraybefore = []

    let vehile_profile_options = {

      grouping: {
        proximity_factor: 8
      },
      routing: {
        mode: 'car',
        //  continue_straight: true,

        // traffic_timestamp: 1724679300,
        profiles: {
          car: {
            mode: 'car',
          },
          minivan: {
            mode: 'car',
            //  truck_size: '200,210,400',
            avoid: [],
          },
        },
      }
    }

    let tempTripPanel = this.state.tripsPanel
    let resArr = []
    let ddate = this.state.date
    let formatedDate = moment.tz(ddate, '').format('YYYY-MM-DD')
    tempTripPanel.filter((item) => {
      resArr.push(item)
    })
    let BreakFeatures = []

    let VehStartTime, VehEndTime
    if (selVeh.length > 0 && SelDocs.length > 0) {
      this.setState({ loader: true, loaderText: 'Loading Please wait....' })

      let VehList = [],
        DocList = []
      let DocListFeatures = []
      let DeportListFeatures = []
      let VehListFeatures = []

      let siteLat, siteLang

      let selSite = this.state.selectedMultipleSites[0]
      this.state.sites.map((site) => {
        if (selSite === site.id) {
          siteLat = site.lat
          siteLang = site.lng

          let newCoord = `${siteLat},${siteLang}`
          locationArraybefore.push(newCoord)
        }
      })

      for (let i = 0; i < selVeh.length; i++) {
        let Veh = {}
        let veh = selVeh[i]

        let sflag = false
        let prevEndTime = 0


        for (let t = 0; t < resArr.length; t++) {
          let currtrip = resArr[t]
          if (currtrip.code === veh.codeyve) {
            //            sflag = true
            //            let endTime = splitTimeAndConv2Sec(currtrip.endTime)
            //            let unloadingtime = convertHrToSec(veh.enddepotserv)
            //            prevEndTime = endTime + unloadingtime
            //

            if (currtrip.endTime && currtrip.endTime.trim() !== '' && currtrip.endTime.trim() !== 'null') {
              sflag = true;
              let endTime = splitTimeAndConv2Sec(currtrip.endTime);
              let unloadingtime = convertHrToSec(veh.enddepotserv);
              prevEndTime = endTime + unloadingtime;
            }
          }
        }

        if (!sflag) {
          prevEndTime = splitTimeAndConv2Sec(veh.starttime)
        }

        let starttime = prevEndTime
        let loadingHrs = convertHrToSec(veh.startdepots)
        let stime = starttime + loadingHrs
        let etime = splitTimeAndAddtimeAndConv2Sec(
          veh.starttime,
          veh.overtimestar
        )

        if (stime < etime) {
        } else {
          etime = 86400
        }
        Veh.id = veh.codeyve
        Veh.start_index = 0
        Veh.end_index = 0

        Veh.name = veh.codeyve
        Veh.description = veh.codeyve
        Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime)
        //        Veh.capacity = [
        //          parseInt(veh.capacities * 100),
        //          parseInt(veh.vol * 100),
        //          parseInt(veh.maxqty * 100),
        //        ]

        Veh.capacity = [parseInt(veh.maxqty * 100), parseInt(veh.maxCases * 100), parseInt(veh.capacities * 100)]

        if (veh.xmaxtotaldis === 'Miles') {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1609.34)
        } else {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1000)
        }

        let timew = [stime, etime]
        let geo = [siteLang, siteLat]
        Veh.time_window = timew

        Veh.skills = JSON.parse(`[${veh.skills}]`)
        Veh.max_tasks = veh.maxordercnt > 0 ? veh.maxordercnt : 3

        VehEndTime = etime
        VehStartTime = stime
        let earliestSTateTime = this.dateTimeToMilliseconds(ddate, stime)
        let tempdddd = earliestSTateTime / 1000
        Veh.profile = 'car'
        Veh.costs = {
          fixed: Number(parseFloat(veh.tempFixedCost).toFixed(2)) || 0
        }
        if (stime < etime) {
          VehList.push(Veh)
        }
      }


      // ✅ Calculate maximum vehicle capacity
      let maxVehicleCapacity = 0;

      VehList.forEach(v => {
        if (Array.isArray(v.capacity) && v.capacity.length > 0) {
          maxVehicleCapacity = Math.max(maxVehicleCapacity, v.capacity[0]);
        }
      });
      let maxDoc = this.state.defaultdocprocess
      let docprocessedCount = 0

      const jobs = []
      const shipments = []
      const extraError = [];
      const NotesExecptions = [];
      const receiptPickupMap = {}
      const receiptsObj = {}
      let idCounter = 1 // Start ID from 1
      let weightKey = ''

      const relations = [];
      const customerJobMap = {};
      const minLat = 9.982106
      const maxLat = 10.85555;
      const minLng = -61.95056;
      const maxLng = -60.8988;
      // Process Deliveries
      SelDocs.forEach((item) => {
        let coordinatesFlag = false;

        if (item.lat != '' || item.lng != '') {
          const dlat = parseFloat(item.lat);
          const dlng = parseFloat(item.lng);
          if (dlat < minLat || dlat > maxLat || dlng < minLng || dlng > maxLng) {
            coordinatesFlag = true;
            let message = `Pick Ticket (${item.docnum}) appears to have invalid GPS coordinates. Please verify the Customer record and update accordingly.`;
            extraError.push(message);
          }

          if (item.doctype !== 'PRECEIPT' && item.docnum && !coordinatesFlag) {
            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }
            const deliveryId = idCounter++

            let newCoord = `${item.lat},${item.lng}`
            let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index

            // Convert skills to an array (handle empty case)
            let skillsArray
            try {
              let parsedSkills = JSON.parse('[' + item.skills + ']')
              if (
                Array.isArray(parsedSkills) &&
                parsedSkills.every((skill) => typeof skill === 'number')
              ) {
                skillsArray = parsedSkills
                // loc_i = loc_i + 1;
              } else {
                console.warn(
                  `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
                )
                // **Exclude the entire document**
              }
            } catch (e) {
              console.warn(
                `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
              )
              // **Exclude the entire document**
            }

            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }

            let timeWindw = []
            var FromArr
            var fromflag = false
            var toflag = false
            if (item.fromTime.length > 0) {
              FromArr = item.fromTime.split(' ')
              fromflag = true
            }
            var ToArr
            if (item.toTime.length > 0) {
              ToArr = item.toTime.split(' ')
              toflag = true
            }
            fromflag &&
              FromArr.map((ft, index) => {
                var tt = []
                tt.push(splitTimeAndConv2Sec(ft))
                tt.push(splitTimeAndConv2Sec(ToArr[index]))

                timeWindw.push(tt)
              })

            if (fromflag) {
              item.time_windows = timeWindw
            }

            const pallets = parseInt(item.noofCases * 100);
            const cases = parseInt(item.mainCases * 100);
            const weight = parseInt(item.netweight * 100);

            if (item.pairedDoc.trim() === '') {
              jobs.push({
                id: deliveryId,
                location_index: loc_index, // Replace with real coordinates
                service:
                  parseInt(convertHrToSec(item.serviceTime)) +
                  parseInt(convertHrToSec(item.waitingTime)),
                //                  [weightKey]: [
                //                    parseInt(item.netweight * 100),
                //                    parseInt(item.volume * 100),
                //                    parseInt(item.noofCases * 100),
                //                  ],
                //[weightKey]: [parseInt(item.noofCases * 100)],
                delivery: [pallets, cases, weight],
                description: item.docnum,
                skills: skillsArray,
                time_windows: timeWindw,
                priority: parseInt(item.priority)

              })
              const customerKey = item.bpcode || "UNKNOWN";

              if (!customerJobMap[customerKey]) {
                customerJobMap[customerKey] = {
                  bpcode: item.bpcode || "UNKNOWN",
                  bpname: item.bpname || "Unknown Customer",
                  jobs: [],
                  skills: []
                };
              }

              customerJobMap[customerKey].jobs.push({
                jobId: deliveryId,
                demandByDim: { pallets, cases, weight },
                docnum: item.docnum
              });

              customerJobMap[customerKey].skills = Array.from(
                new Set([...customerJobMap[customerKey].skills, ...skillsArray])
              );
            }
            //   }
          }
        }
        else {
          let message = `Pick Ticket (${item.docnum}) appears to have missing GPS coordinates. Please verify the Customer record and update accordingly.`;
          extraError.push(message);
        }
      })

      /*S
        // ✅ Build relations only for customers having more than 1 job without spling and without veh max capacity
        Object.keys(customerJobMap).forEach((custKey) => {
          const jobIds = customerJobMap[custKey];

          if (jobIds.length > 1) {
            relations.push({
              type: "in_same_route",
              steps: jobIds.map((id) => ({
                type: "job",
                id: id
              }))
            });
          }
        });

        */


      // --------------------------------------
      // APPLY CUSTOMER PRIORITY (✅ NEW)
      // --------------------------------------
      const customerPriorityMap = {};

      Object.keys(customerJobMap).forEach(custKey => {
        const count = customerJobMap[custKey].jobs.length;
        customerPriorityMap[custKey] = getCustomerPriority(count);
      });

      jobs.forEach(job => {
        const doc = SelDocs.find(d => d.docnum === job.description);
        const custKey = doc?.bpcode || 'UNKNOWN';
        job.priority = customerPriorityMap[custKey] || 10;
      });

      // --------------------------------------
      // CUSTOMER CAPACITY VALIDATION (NEW)
      // --------------------------------------
      Object.keys(customerJobMap).forEach((custKey) => {
        const customer = customerJobMap[custKey];
        const jobsOfCustomer = customer.jobs;
        const eligibleVehicles =
          getSkillMatchedVehiclesForCustomer(VehList, customer.skills);

        if (eligibleVehicles.length === 0) {
          //              NotesExecptions.push(
          //                `Customer ${customer.bpname} (${customer.bpcode}) has no skill-compatible vehicles.`
          //              );
          return;
        }

        //  const maxCap = getMaxCapacityFromVehicles(eligibleVehicles);

        const cap = getVehicleCapacityByDim(eligibleVehicles);
        const total = { pallets: 0, cases: 0, weight: 0 };
        const maxSingle = { pallets: 0, cases: 0, weight: 0 };
        // let totalDemand = 0;
        // let maxSingleJob = 0;

        //        jobsOfCustomer.forEach(j => {
        //          totalDemand += j.demand;
        //          maxSingleJob = Math.max(maxSingleJob, j.demand);
        //        });

        jobsOfCustomer.forEach(j => {
          Object.keys(j.demandByDim).forEach(dim => {
            total[dim] += j.demandByDim[dim];
            maxSingle[dim] = Math.max(maxSingle[dim], j.demandByDim[dim]);
          });
        });


        /*
                // Convert to PAL for display
                const totalDemandPAL = totalDemand / 100;
                const maxSingleJobPAL = maxSingleJob / 100;
                const maxVehicleCapacityPAL = maxCap / 100;
        
                const customerLabel = `${customer.bpname} (${customer.bpcode})`;
        
                // ❌ Blocking case: a single pick ticket exceeds vehicle capacity
                if (maxSingleJob > maxCap) {
                  NotesExecptions.push(
                    `Customer ${customerLabel}: The pick ticket has a capacity of ` +
                    `(${maxSingleJobPAL} PAL) which exceeds the maximum available vehicle capacity of` +
                    `(${maxVehicleCapacityPAL} PAL).`
                  );
                  return;
                }
        
                // ⚠️ Informational case: customer requires multiple trucks
                if (totalDemand > maxCap) {
                  const trucksNeeded = Math.ceil(totalDemand / maxCap);
        
                  NotesExecptions.push(
                    `Customer ${customerLabel}: Multiple pick tickets totaling ${totalDemandPAL} PAL ` +
                    `exceed the maximum available vehicle capacity of ${maxVehicleCapacityPAL} PAL. ` +
                    `Therefore, the selected pick tickets have been split across ${trucksNeeded} vehicles.`
                  );
                }
              });
              */

        DIMENSIONS.forEach(({ key, label }) => {
          if (maxSingle[key] > cap[key]) {
            NotesExecptions.push(
              `For Customer ${customer.bpname} (${customer.bpcode}), ` +
              `the pick ticket reflects a total of  ${label} which exceeds the maximum available vehicle capacity of ` +
              `(${maxSingle[key] / 100} > ${cap[key] / 100}).`
            );
          } else if (total[key] > cap[key]) {
            const trucks = Math.ceil(total[key] / cap[key]);
            NotesExecptions.push(
              `For Customer ${customer.bpname} (${customer.bpcode}), ` +
              `the combined total of  ${label} - (${total[key] / 100}) across multiple pick tickets exceeds the maximum available vehicle capacity of  ` +
              `(${cap[key] / 100}). Accordingly, the pick tickets have been allocated across ${trucks} vehicles.`
            );
          }
        });
      });

      /* =====================================================
          SPLIT RELATIONS (ANY DIMENSION)
       ===================================================== */

      Object.keys(customerJobMap).forEach(custKey => {
        const customer = customerJobMap[custKey];
        if (customer.jobs.length <= 1) return;

        const eligibleVehicles =
          getSkillMatchedVehiclesForCustomer(VehList, customer.skills);
        if (!eligibleVehicles.length) return;

        const cap = getVehicleCapacityByDim(eligibleVehicles);

        let currentLoad = { pallets: 0, cases: 0, weight: 0 };
        let chunk = [];

        customer.jobs.forEach(job => {
          if (exceedsAnyDimension(currentLoad, job, cap)) {
            if (chunk.length > 1) {
              relations.push({
                type: "in_same_route",
                steps: chunk.map(j => ({ type: "job", id: j.jobId }))
              });
            }
            chunk = [];
            currentLoad = { pallets: 0, cases: 0, weight: 0 };
          }

          chunk.push(job);
          Object.keys(currentLoad).forEach(dim => {
            currentLoad[dim] += job.demandByDim[dim];
          });
        });

        if (chunk.length > 1) {
          relations.push({
            type: "in_same_route",
            steps: chunk.map(j => ({ type: "job", id: j.jobId }))
          });
        }
      });

      /*
            // ✅ Build relations only for customers having more than 1 job
            Object.keys(customerJobMap).forEach((custKey) => {
              const customer = customerJobMap[custKey];
              const jobsOfCustomer = customer.jobs; // ✅ FIX
      
              if (!Array.isArray(jobsOfCustomer) || jobsOfCustomer.length <= 1) return;
      
          const eligibleVehicles =
              getSkillMatchedVehiclesForCustomer(VehList, customer.skills);
      
            if (eligibleVehicles.length === 0) return;
      
        const maxCap = getMaxCapacityFromVehicles(eligibleVehicles);
      
              let currentChunk = [];
              let currentLoad = 0;
      
              jobsOfCustomer.forEach((job) => {
                // If adding this job exceeds capacity → close current chunk
                if (currentLoad + job.demand > maxCap) {
                  if (currentChunk.length > 1) {
                    relations.push({
                      type: "in_same_route",
                      steps: currentChunk.map(j => ({
                        type: "job",
                        id: j.jobId
                      }))
                    });
                  }
      
                  // Start new chunk
                  currentChunk = [];
                  currentLoad = 0;
                }
      
                currentChunk.push(job);
                currentLoad += job.demand;
              });
      
              // Push last chunk
              if (currentChunk.length > 1) {
                relations.push({
                  type: "in_same_route",
                  steps: currentChunk.map(j => ({
                    type: "job",
                    id: j.jobId
                  }))
                });
              }
            });*/

      let finallocationList = locationArraybefore // for another type optimisation this.formatLocationCoordinates(locationArraybefore);

      let locactionsFinal = {
        id: 1,
        location: finallocationList,
      }

      let nextBillonObject = {
        relations: relations, // ✅ Added here
        jobs: jobs,
        shipments: shipments,
        options: vehile_profile_options,
        locations: locactionsFinal,
        vehicles: VehList,
      }

      let response = await fetch(`${postAPICode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextBillonObject),
      })
      if (response.status === 200) {
        if (!response.ok) {
          const errorDetails = await response.json()
          console.error('TBBB if response not ok Error:', this.state.loader)
          this.setState({ loader: false })
        } else {
          const data = await response.json()
          await this.OrganiseNextBillionsResponse(
            data,
            selSite,
            SelDocs,
            selVeh,
            selDrivers,
            jobs,
            shipments, extraError, customerJobMap, NotesExecptions, fromBy
          )
        }
      } else {
        console.error('TBBB Error in ArcGIS response status:', response.status)
        console.error('TEEE Error in ArcGIS response data :', response.data)
        console.error('TEEE Error in ArcGIS respośnse data :', response.message)
        const data = await response.json()
        let finalMessage = '';
        if (extraError.length > 0) {

          extraError.forEach((msg) => {
            finalMessage += msg + '\n'; // Add newline after each message
          });
        }
        else {
          const originalMessage = data.message || data.msg || '' // Use whichever exists, or default to an empty string

          const updatedMessage = originalMessage
            .replaceAll('NextBillion', 'TEMA')
            .replaceAll('support@nextbillion.ai', 'support@tema-systems.com')

          //start added by ramana on 10-06-2025 - when vehicle is already covered the whole day
          finalMessage = updatedMessage

          // ✅ Check for that specific phrase
          if (updatedMessage.includes('Please ensure that the time window has valid and chronological timestamps')) {
            // Extract vehicle ID dynamically
            const match = updatedMessage.match(/vehicle with ID (\w+)/)
            const vehicleId = match ? match[1] : 'Unknown'

            // Use your custom message
            finalMessage = `Trip generation for vehicle ${vehicleId} has failed because the document delivery timeline exceeds the 24:00 cutoff time.`
          } else {
            // ✅ If condition fails, keep original message

            finalMessage = updatedMessage
          }
        }
        this.setState({
          errorMessage: finalMessage,
          addAlertShow: true,
          loader: false,
        })
        //end added by ramana on 10-06-2025 - when vehicle is already covered the whole day
      }
    } else {
      this.setState({
        errorMessage:
          selVeh.length === 0
            ? 'There are no vehicles selected.'
            : 'There are no documents selected.',
        addAlertShow: true,
      })
    }
  }



  autofromselection_nextBilloins_onlyPallets_City = async (DocsData, selVeh, selDrivers) => {


    // --------------------------------------
    // SKILL & VEHICLE HELPERS (✅ NEW)
    // --------------------------------------
    const doesVehicleMatchSkills = (vehicleSkills = [], requiredSkills = []) =>
      requiredSkills.every(skill => vehicleSkills.includes(skill));

    const getSkillMatchedVehiclesForCustomer = (vehicles, requiredSkills) =>
      vehicles.filter(v =>
        doesVehicleMatchSkills(v.skills || [], requiredSkills)
      );

    const getMaxCapacityFromVehicles = (vehicles) => {
      let max = 0;
      vehicles.forEach(v => {
        if (Array.isArray(v.capacity) && v.capacity.length > 0) {
          max = Math.max(max, v.capacity[0]);
        }
      });
      return max;
    };



    const getCustomerPriority = (docCount) => {
      if (docCount > 5) return 80;
      if (docCount > 2) return 40;
      return 10;
    };

    const SelDocs = [...DocsData].sort((a, b) =>
      Number(a.bpcode) - Number(b.bpcode)
    );

    this.existingTripsBeforeOptimization =
      this.state.tripsPanel.map(t => t.itemCode);


    // this.setState({ loader: true , loaderText : 'Validating Vehicles and Document for Optimization. Please wait...' })
    let postAPICode =
      'https://api.nextbillion.io/optimization/v2?key=b1cebb49fcaa4366abcb19cfb12b43b3'

    let locationArraybefore = []

    let vehile_profile_options = {

      grouping: {
        proximity_factor: 5
      },
      routing: {
        mode: 'car',
        continue_straight: true,

        // traffic_timestamp: 1724679300,
        profiles: {
          car: {
            mode: 'car',
          },
          minivan: {
            mode: 'car',
            //  truck_size: '200,210,400',
            avoid: [],
          },
        },
      }
    }

    let tempTripPanel = this.state.tripsPanel
    let resArr = []
    let ddate = this.state.date
    let formatedDate = moment.tz(ddate, '').format('YYYY-MM-DD')
    tempTripPanel.filter((item) => {
      resArr.push(item)
    })
    let BreakFeatures = []

    let VehStartTime, VehEndTime
    if (selVeh.length > 0 && SelDocs.length > 0) {
      this.setState({ loader: true, loaderText: 'Loading Please wait....' })

      let VehList = [],
        DocList = []
      let DocListFeatures = []
      let DeportListFeatures = []
      let VehListFeatures = []

      let siteLat, siteLang

      let selSite = this.state.selectedMultipleSites[0]
      this.state.sites.map((site) => {
        if (selSite === site.id) {
          siteLat = site.lat
          siteLang = site.lng

          let newCoord = `${siteLat},${siteLang}`
          locationArraybefore.push(newCoord)
        }
      })

      for (let i = 0; i < selVeh.length; i++) {
        let Veh = {}
        let veh = selVeh[i]

        let sflag = false
        let prevEndTime = 0


        for (let t = 0; t < resArr.length; t++) {
          let currtrip = resArr[t]
          if (currtrip.code === veh.codeyve) {
            //            sflag = true
            //            let endTime = splitTimeAndConv2Sec(currtrip.endTime)
            //            let unloadingtime = convertHrToSec(veh.enddepotserv)
            //            prevEndTime = endTime + unloadingtime
            //

            if (currtrip.endTime && currtrip.endTime.trim() !== '' && currtrip.endTime.trim() !== 'null') {
              sflag = true;
              let endTime = splitTimeAndConv2Sec(currtrip.endTime);
              let unloadingtime = convertHrToSec(veh.enddepotserv);
              prevEndTime = endTime + unloadingtime;
            }
          }
        }

        if (!sflag) {
          prevEndTime = splitTimeAndConv2Sec(veh.starttime)
        }

        let starttime = prevEndTime
        let loadingHrs = convertHrToSec(veh.startdepots)
        let stime = starttime + loadingHrs
        let etime = splitTimeAndAddtimeAndConv2Sec(
          veh.starttime,
          veh.overtimestar
        )

        if (stime < etime) {
        } else {
          etime = 86400
        }
        Veh.id = veh.codeyve
        Veh.start_index = 0
        Veh.end_index = 0

        Veh.name = veh.codeyve
        Veh.description = veh.codeyve
        Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime)
        //        Veh.capacity = [
        //          parseInt(veh.capacities * 100),
        //          parseInt(veh.vol * 100),
        //          parseInt(veh.maxqty * 100),
        //        ]

        Veh.capacity = [parseInt(veh.maxqty * 100)]

        if (veh.xmaxtotaldis === 'Miles') {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1609.34)
        } else {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1000)
        }

        let timew = [stime, etime]
        let geo = [siteLang, siteLat]
        Veh.time_window = timew

        Veh.skills = JSON.parse(`[${veh.skills}]`)
        Veh.max_tasks = veh.maxordercnt > 0 ? veh.maxordercnt : 3

        VehEndTime = etime
        VehStartTime = stime
        let earliestSTateTime = this.dateTimeToMilliseconds(ddate, stime)
        let tempdddd = earliestSTateTime / 1000
        Veh.profile = 'car'
        Veh.costs = {
          fixed: Number(parseFloat(veh.tempFixedCost).toFixed(2)) || 0
        }
        if (stime < etime) {
          VehList.push(Veh)
        }
      }


      // ✅ Calculate maximum vehicle capacity
      let maxVehicleCapacity = 0;

      VehList.forEach(v => {
        if (Array.isArray(v.capacity) && v.capacity.length > 0) {
          maxVehicleCapacity = Math.max(maxVehicleCapacity, v.capacity[0]);
        }
      });
      let maxDoc = this.state.defaultdocprocess
      let docprocessedCount = 0

      const jobs = []
      const shipments = []
      const extraError = [];
      const NotesExecptions = [];
      const receiptPickupMap = {}
      const receiptsObj = {}
      let idCounter = 1 // Start ID from 1
      let weightKey = ''

      const relations = [];
      const customerJobMap = {};

      // --------------------------------------
      // CITY → JOB MAP (NEW)
      // --------------------------------------
      const cityJobMap = {};


      const minLat = 9.982106
      const maxLat = 10.85555;
      const minLng = -61.95056;
      const maxLng = -60.8988;
      // Process Deliveries
      SelDocs.forEach((item) => {
        let coordinatesFlag = false;

        if (item.lat != '' || item.lng != '') {
          const dlat = parseFloat(item.lat);
          const dlng = parseFloat(item.lng);
          if (dlat < minLat || dlat > maxLat || dlng < minLng || dlng > maxLng) {
            coordinatesFlag = true;
            let message = `Pick Ticket (${item.docnum}) appears to have invalid GPS coordinates. Please verify the Customer record and update accordingly.`;
            extraError.push(message);
          }

          if (item.doctype !== 'PRECEIPT' && item.docnum && !coordinatesFlag) {
            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }
            const deliveryId = idCounter++

            let newCoord = `${item.lat},${item.lng}`
            let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index

            // Convert skills to an array (handle empty case)
            let skillsArray
            try {
              let parsedSkills = JSON.parse('[' + item.skills + ']')
              if (
                Array.isArray(parsedSkills) &&
                parsedSkills.every((skill) => typeof skill === 'number')
              ) {
                skillsArray = parsedSkills
                // loc_i = loc_i + 1;
              } else {
                console.warn(
                  `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
                )
                // **Exclude the entire document**
              }
            } catch (e) {
              console.warn(
                `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
              )
              // **Exclude the entire document**
            }

            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }

            let timeWindw = []
            var FromArr
            var fromflag = false
            var toflag = false
            if (item.fromTime.length > 0) {
              FromArr = item.fromTime.split(' ')
              fromflag = true
            }
            var ToArr
            if (item.toTime.length > 0) {
              ToArr = item.toTime.split(' ')
              toflag = true
            }
            fromflag &&
              FromArr.map((ft, index) => {
                var tt = []
                tt.push(splitTimeAndConv2Sec(ft))
                tt.push(splitTimeAndConv2Sec(ToArr[index]))

                timeWindw.push(tt)
              })

            if (fromflag) {
              item.time_windows = timeWindw
            }

            if (item.pairedDoc.trim() === '') {
              jobs.push({
                id: deliveryId,
                location_index: loc_index, // Replace with real coordinates
                service:
                  parseInt(convertHrToSec(item.serviceTime)) +
                  parseInt(convertHrToSec(item.waitingTime)),
                //                  [weightKey]: [
                //                    parseInt(item.netweight * 100),
                //                    parseInt(item.volume * 100),
                //                    parseInt(item.noofCases * 100),
                //                  ],
                [weightKey]: [parseInt(item.noofCases * 100)],
                description: item.docnum,
                skills: skillsArray,
                time_windows: timeWindw,
                priority: parseInt(item.priority)

              })

              // --------------------------------------
              // CITY TAGGING (NEW)
              // --------------------------------------
              const city = this.normalizeCity(item.city || "UNKNOWN");

              if (!cityJobMap[city]) {
                cityJobMap[city] = [];
              }
              cityJobMap[city].push(deliveryId);

              // end city tagging

              const customerKey = item.bpcode || "UNKNOWN";

              if (!customerJobMap[customerKey]) {
                customerJobMap[customerKey] = {
                  bpcode: item.bpcode || "UNKNOWN",
                  bpname: item.bpname || "Unknown Customer",
                  jobs: [],
                  skills: []
                };
              }

              customerJobMap[customerKey].jobs.push({
                jobId: deliveryId,
                demand: parseInt(item.noofCases * 100),
                docnum: item.docnum
              });

              customerJobMap[customerKey].skills = Array.from(
                new Set([...customerJobMap[customerKey].skills, ...skillsArray])
              );
            }
            //   }
          }
        }
        else {
          let message = `Pick Ticket (${item.docnum}) appears to have missing GPS coordinates. Please verify the Customer record and update accordingly.`;
          extraError.push(message);
        }
      })

      /*S
        // ✅ Build relations only for customers having more than 1 job without spling and without veh max capacity
        Object.keys(customerJobMap).forEach((custKey) => {
          const jobIds = customerJobMap[custKey];

          if (jobIds.length > 1) {
            relations.push({
              type: "in_same_route",
              steps: jobIds.map((id) => ({
                type: "job",
                id: id
              }))
            });
          }
        });

        */


      // --------------------------------------
      // APPLY CUSTOMER PRIORITY (✅ NEW)
      // --------------------------------------
      const customerPriorityMap = {};

      Object.keys(customerJobMap).forEach(custKey => {
        const count = customerJobMap[custKey].jobs.length;
        customerPriorityMap[custKey] = getCustomerPriority(count);
      });

      jobs.forEach(job => {
        const doc = SelDocs.find(d => d.docnum === job.description);
        const custKey = doc?.bpcode || 'UNKNOWN';
        job.priority = customerPriorityMap[custKey] || 10;
      });

      // --------------------------------------
      // CUSTOMER CAPACITY VALIDATION (NEW)
      // --------------------------------------
      Object.keys(customerJobMap).forEach((custKey) => {
        const customer = customerJobMap[custKey];
        const jobsOfCustomer = customer.jobs;
        const eligibleVehicles =
          getSkillMatchedVehiclesForCustomer(VehList, customer.skills);

        if (eligibleVehicles.length === 0) {
          //              NotesExecptions.push(
          //                `Customer ${customer.bpname} (${customer.bpcode}) has no skill-compatible vehicles.`
          //              );
          return;
        }

        const maxCap = getMaxCapacityFromVehicles(eligibleVehicles);

        let totalDemand = 0;
        let maxSingleJob = 0;

        jobsOfCustomer.forEach(j => {
          totalDemand += j.demand;
          maxSingleJob = Math.max(maxSingleJob, j.demand);
        });

        // Convert to PAL for display
        const totalDemandPAL = totalDemand / 100;
        const maxSingleJobPAL = maxSingleJob / 100;
        const maxVehicleCapacityPAL = maxCap / 100;

        const customerLabel = `${customer.bpname} (${customer.bpcode})`;

        // ❌ Blocking case: a single pick ticket exceeds vehicle capacity
        if (maxSingleJob > maxCap) {
          NotesExecptions.push(
            `For Customer ${customerLabel}, the pick ticket reflects a total of  ` +
            `(${maxSingleJobPAL} PAL) which exceeds the maximum available vehicle capacity of` +
            `(${maxVehicleCapacityPAL} PAL).`
          );
          return;
        }

        // ⚠️ Informational case: customer requires multiple trucks
        if (totalDemand > maxCap) {
          const trucksNeeded = Math.ceil(totalDemand / maxCap);

          NotesExecptions.push(
            `Customer ${customerLabel}, the combined total of  ${totalDemandPAL} PAL ` +
            `across multiple pick tickets exceeds the maximum available vehicle capacity of ${maxVehicleCapacityPAL} PAL. ` +
            `Accordingly, the pick tickets have been allocated across ${trucksNeeded} vehicles.`
          );
        }
      });

      // ✅ Build relations only for customers having more than 1 job
      Object.keys(customerJobMap).forEach((custKey) => {
        const customer = customerJobMap[custKey];
        const jobsOfCustomer = customer.jobs; // ✅ FIX

        if (!Array.isArray(jobsOfCustomer) || jobsOfCustomer.length <= 1) return;

        const eligibleVehicles =
          getSkillMatchedVehiclesForCustomer(VehList, customer.skills);

        if (eligibleVehicles.length === 0) return;

        const maxCap = getMaxCapacityFromVehicles(eligibleVehicles);

        let currentChunk = [];
        let currentLoad = 0;

        jobsOfCustomer.forEach((job) => {
          // If adding this job exceeds capacity → close current chunk
          if (currentLoad + job.demand > maxCap) {
            if (currentChunk.length > 1) {
              relations.push({
                type: "in_same_route",
                steps: currentChunk.map(j => ({
                  type: "job",
                  id: j.jobId
                }))
              });
            }

            // Start new chunk
            currentChunk = [];
            currentLoad = 0;
          }

          currentChunk.push(job);
          currentLoad += job.demand;
        });

        // Push last chunk
        if (currentChunk.length > 1) {
          relations.push({
            type: "in_same_route",
            steps: currentChunk.map(j => ({
              type: "job",
              id: j.jobId
            }))
          });
        }
      });

      let finallocationList = locationArraybefore // for another type optimisation this.formatLocationCoordinates(locationArraybefore);

      let locactionsFinal = {
        id: 1,
        location: finallocationList,
      }


      // --------------------------------------
      // VEHICLE CITY PREFERENCE (SOFT)
      // --------------------------------------
      VehList.forEach(v => {
        const preferredCity = this.normalizeCity(v.city || "SAN FERNANDO");

        v.metadata = {
          preferred_city: preferredCity,
          allowed_cities: [
            preferredCity,
            ...(this.CITY_ZONES[preferredCity] || [])
          ]
        };
      });

      // vehicle by city soft constraint

      // --------------------------------------
      // SOFT CITY RELATION (ONLY THIS)
      // --------------------------------------
      Object.keys(cityJobMap).forEach(city => {
        const jobsInCity = cityJobMap[city];

        // Only meaningful if more than 1 job
        if (jobsInCity.length > 1) {
          relations.push({
            type: "in_same_route",
            soft: true,          // 🔑 VERY IMPORTANT
            steps: jobsInCity.map(jobId => ({
              type: "job",
              id: jobId
            }))
          });
        }
      });


      // end of SOFT CITY RELATION CONSTRAINT


      let nextBillonObject = {
        relations: relations, // ✅ Added here
        jobs: jobs,
        shipments: shipments,
        options: vehile_profile_options,
        locations: locactionsFinal,
        vehicles: VehList,
      }

      let response = await fetch(`${postAPICode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextBillonObject),
      })
      if (response.status === 200) {
        if (!response.ok) {
          const errorDetails = await response.json()
          console.error('TBBB if response not ok Error:', this.state.loader)
          this.setState({ loader: false })
        } else {
          const data = await response.json()
          await this.OrganiseNextBillionsResponse(
            data,
            selSite,
            SelDocs,
            selVeh,
            selDrivers,
            jobs,
            shipments, extraError, customerJobMap, NotesExecptions
          )
        }
      } else {
        console.error('TBBB Error in ArcGIS response status:', response.status)
        console.error('TEEE Error in ArcGIS response data :', response.data)
        console.error('TEEE Error in ArcGIS respośnse data :', response.message)
        const data = await response.json()
        let finalMessage = '';
        if (extraError.length > 0) {

          extraError.forEach((msg) => {
            finalMessage += msg + '\n'; // Add newline after each message
          });
        }
        else {
          const originalMessage = data.message || data.msg || '' // Use whichever exists, or default to an empty string

          const updatedMessage = originalMessage
            .replaceAll('NextBillion', 'TEMA')
            .replaceAll('support@nextbillion.ai', 'support@tema-systems.com')

          //start added by ramana on 10-06-2025 - when vehicle is already covered the whole day
          finalMessage = updatedMessage

          // ✅ Check for that specific phrase
          if (updatedMessage.includes('Please ensure that the time window has valid and chronological timestamps')) {
            // Extract vehicle ID dynamically
            const match = updatedMessage.match(/vehicle with ID (\w+)/)
            const vehicleId = match ? match[1] : 'Unknown'

            // Use your custom message
            finalMessage = `Trip generation for vehicle ${vehicleId} has failed because the document delivery timeline exceeds the 24:00 cutoff time.`
          } else {
            // ✅ If condition fails, keep original message

            finalMessage = updatedMessage
          }
        }
        this.setState({
          errorMessage: finalMessage,
          addAlertShow: true,
          loader: false,
        })
        //end added by ramana on 10-06-2025 - when vehicle is already covered the whole day
      }
    } else {
      this.setState({
        errorMessage:
          selVeh.length === 0
            ? 'There are no vehicles selected.'
            : 'There are no documents selected.',
        addAlertShow: true,
      })
    }
  }


  autofromselection_nextBilloins_onlyPallets_GroupCity = async (DocsData, selVeh, selDrivers, fromBy) => {


    // --------------------------------------
    // SKILL & VEHICLE HELPERS (✅ NEW)
    // --------------------------------------
    const doesVehicleMatchSkills = (vehicleSkills = [], requiredSkills = []) =>
      requiredSkills.every(skill => vehicleSkills.includes(skill));

    const getSkillMatchedVehiclesForCustomer = (vehicles, requiredSkills) =>
      vehicles.filter(v =>
        doesVehicleMatchSkills(v.skills || [], requiredSkills)
      );

    const getMaxCapacityFromVehicles = (vehicles) => {
      let max = 0;
      vehicles.forEach(v => {
        if (Array.isArray(v.capacity) && v.capacity.length > 0) {
          max = Math.max(max, v.capacity[0]);
        }
      });
      return max;
    };



    const getCustomerPriority = (docCount) => {
      if (docCount > 5) return 80;
      if (docCount > 2) return 40;
      return 10;
    };

    const SelDocs = [...DocsData].sort((a, b) =>
      Number(a.bpcode) - Number(b.bpcode)
    );

    this.existingTripsBeforeOptimization =
      this.state.tripsPanel.map(t => t.itemCode);


    // this.setState({ loader: true , loaderText : 'Validating Vehicles and Document for Optimization. Please wait...' })
    let postAPICode =
      'https://api.nextbillion.io/optimization/v2?key=b1cebb49fcaa4366abcb19cfb12b43b3'

    let locationArraybefore = []

    let vehile_profile_options = {

      grouping: {
        proximity_factor: 5
      },
      routing: {
        mode: 'car',
        continue_straight: true,

        // traffic_timestamp: 1724679300,
        profiles: {
          car: {
            mode: 'car',
          },
          minivan: {
            mode: 'car',
            //  truck_size: '200,210,400',
            avoid: [],
          },
        },
      }
    }

    let tempTripPanel = this.state.tripsPanel
    let resArr = []
    let ddate = this.state.date
    let formatedDate = moment.tz(ddate, '').format('YYYY-MM-DD')
    tempTripPanel.filter((item) => {
      resArr.push(item)
    })
    let BreakFeatures = []

    let VehStartTime, VehEndTime
    if (selVeh.length > 0 && SelDocs.length > 0) {
      this.setState({ loader: true, loaderText: 'Loading Please wait....' })

      let VehList = [],
        DocList = []
      let DocListFeatures = []
      let DeportListFeatures = []
      let VehListFeatures = []

      let siteLat, siteLang

      let selSite = this.state.selectedMultipleSites[0]
      this.state.sites.map((site) => {
        if (selSite === site.id) {
          siteLat = site.lat
          siteLang = site.lng

          let newCoord = `${siteLat},${siteLang}`
          locationArraybefore.push(newCoord)
        }
      })

      for (let i = 0; i < selVeh.length; i++) {
        let Veh = {}
        let veh = selVeh[i]

        let sflag = false
        let prevEndTime = 0


        for (let t = 0; t < resArr.length; t++) {
          let currtrip = resArr[t]
          if (currtrip.code === veh.codeyve) {
            //            sflag = true
            //            let endTime = splitTimeAndConv2Sec(currtrip.endTime)
            //            let unloadingtime = convertHrToSec(veh.enddepotserv)
            //            prevEndTime = endTime + unloadingtime
            //

            if (currtrip.endTime && currtrip.endTime.trim() !== '' && currtrip.endTime.trim() !== 'null') {
              sflag = true;
              let endTime = splitTimeAndConv2Sec(currtrip.endTime);
              let unloadingtime = convertHrToSec(veh.enddepotserv);
              prevEndTime = endTime + unloadingtime;
            }
          }
        }

        if (!sflag) {
          prevEndTime = splitTimeAndConv2Sec(veh.starttime)
        }

        let starttime = prevEndTime
        let loadingHrs = convertHrToSec(veh.startdepots)
        let stime = starttime + loadingHrs
        let etime = splitTimeAndAddtimeAndConv2Sec(
          veh.starttime,
          veh.overtimestar
        )

        if (stime < etime) {
        } else {
          etime = 86400
        }
        Veh.id = veh.codeyve
        Veh.start_index = 0
        Veh.end_index = 0

        Veh.name = veh.codeyve
        Veh.description = veh.codeyve
        Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime)
        //        Veh.capacity = [
        //          parseInt(veh.capacities * 100),
        //          parseInt(veh.vol * 100),
        //          parseInt(veh.maxqty * 100),
        //        ]

        Veh.capacity = [parseInt(veh.maxqty * 100)]

        if (veh.xmaxtotaldis === 'Miles') {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1609.34)
        } else {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1000)
        }

        let timew = [stime, etime]
        let geo = [siteLang, siteLat]
        Veh.time_window = timew

        Veh.skills = JSON.parse(`[${veh.skills}]`)
        Veh.max_tasks = veh.maxordercnt > 0 ? veh.maxordercnt : 3

        VehEndTime = etime
        VehStartTime = stime
        let earliestSTateTime = this.dateTimeToMilliseconds(ddate, stime)
        let tempdddd = earliestSTateTime / 1000
        Veh.profile = 'car'
        Veh.costs = {
          fixed: Number(parseFloat(veh.tempFixedCost).toFixed(2)) || 0
        }
        if (stime < etime) {
          VehList.push(Veh)
        }
      }


      // ✅ Calculate maximum vehicle capacity
      let maxVehicleCapacity = 0;

      VehList.forEach(v => {
        if (Array.isArray(v.capacity) && v.capacity.length > 0) {
          maxVehicleCapacity = Math.max(maxVehicleCapacity, v.capacity[0]);
        }
      });
      let maxDoc = this.state.defaultdocprocess
      let docprocessedCount = 0

      const jobs = []
      const shipments = []
      const extraError = [];
      const NotesExecptions = [];
      const receiptPickupMap = {}
      const receiptsObj = {}
      let idCounter = 1 // Start ID from 1
      let weightKey = ''

      const relations = [];
      const customerJobMap = {};

      // --------------------------------------
      // CITY → JOB MAP (NEW)
      // --------------------------------------
      const cityJobMap = {};


      const minLat = 9.982106
      const maxLat = 10.85555;
      const minLng = -61.95056;
      const maxLng = -60.8988;
      // Process Deliveries
      SelDocs.forEach((item) => {
        let coordinatesFlag = false;

        if (item.lat != '' || item.lng != '') {
          const dlat = parseFloat(item.lat);
          const dlng = parseFloat(item.lng);
          if (dlat < minLat || dlat > maxLat || dlng < minLng || dlng > maxLng) {
            coordinatesFlag = true;
            let message = `Pick Ticket (${item.docnum}) appears to have invalid GPS coordinates. Please verify the Customer record and update accordingly.`;
            extraError.push(message);
          }

          if (item.doctype !== 'PRECEIPT' && item.docnum && !coordinatesFlag) {
            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }
            const deliveryId = idCounter++

            let newCoord = `${item.lat},${item.lng}`
            let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index

            // Convert skills to an array (handle empty case)
            let skillsArray
            try {
              let parsedSkills = JSON.parse('[' + item.skills + ']')
              if (
                Array.isArray(parsedSkills) &&
                parsedSkills.every((skill) => typeof skill === 'number')
              ) {
                skillsArray = parsedSkills
                // loc_i = loc_i + 1;
              } else {
                console.warn(
                  `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
                )
                // **Exclude the entire document**
              }
            } catch (e) {
              console.warn(
                `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
              )
              // **Exclude the entire document**
            }

            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }

            let timeWindw = []
            var FromArr
            var fromflag = false
            var toflag = false
            if (item.fromTime.length > 0) {
              FromArr = item.fromTime.split(' ')
              fromflag = true
            }
            var ToArr
            if (item.toTime.length > 0) {
              ToArr = item.toTime.split(' ')
              toflag = true
            }
            fromflag &&
              FromArr.map((ft, index) => {
                var tt = []
                tt.push(splitTimeAndConv2Sec(ft))
                tt.push(splitTimeAndConv2Sec(ToArr[index]))

                timeWindw.push(tt)
              })

            if (fromflag) {
              item.time_windows = timeWindw
            }

            if (item.pairedDoc.trim() === '') {
              jobs.push({
                id: deliveryId,
                location_index: loc_index, // Replace with real coordinates
                service:
                  parseInt(convertHrToSec(item.serviceTime)) +
                  parseInt(convertHrToSec(item.waitingTime)),
                //                  [weightKey]: [
                //                    parseInt(item.netweight * 100),
                //                    parseInt(item.volume * 100),
                //                    parseInt(item.noofCases * 100),
                //                  ],
                [weightKey]: [parseInt(item.noofCases * 100)],
                description: item.docnum,
                skills: skillsArray,
                time_windows: timeWindw,
                priority: parseInt(item.priority)

              })

              // --------------------------------------
              // CITY TAGGING (NEW)
              // --------------------------------------
              const city = this.normalizeCity(item.city || "UNKNOWN");

              if (!cityJobMap[city]) {
                cityJobMap[city] = [];
              }
              cityJobMap[city].push(deliveryId);

              // end city tagging

              const customerKey = item.bpcode || "UNKNOWN";

              if (!customerJobMap[customerKey]) {
                customerJobMap[customerKey] = {
                  bpcode: item.bpcode || "UNKNOWN",
                  bpname: item.bpname || "Unknown Customer",
                  jobs: [],
                  skills: []
                };
              }

              customerJobMap[customerKey].jobs.push({
                jobId: deliveryId,
                demand: parseInt(item.noofCases * 100),
                docnum: item.docnum
              });

              customerJobMap[customerKey].skills = Array.from(
                new Set([...customerJobMap[customerKey].skills, ...skillsArray])
              );
            }
            //   }
          }
        }
        else {
          let message = `Pick Ticket (${item.docnum}) appears to have missing GPS coordinates. Please verify the Customer record and update accordingly.`;
          extraError.push(message);
        }
      })

      /*S
        // ✅ Build relations only for customers having more than 1 job without spling and without veh max capacity
        Object.keys(customerJobMap).forEach((custKey) => {
          const jobIds = customerJobMap[custKey];

          if (jobIds.length > 1) {
            relations.push({
              type: "in_same_route",
              steps: jobIds.map((id) => ({
                type: "job",
                id: id
              }))
            });
          }
        });

        */


      // --------------------------------------
      // APPLY CUSTOMER PRIORITY (✅ NEW)
      // --------------------------------------
      const customerPriorityMap = {};

      Object.keys(customerJobMap).forEach(custKey => {
        const count = customerJobMap[custKey].jobs.length;
        customerPriorityMap[custKey] = getCustomerPriority(count);
      });

      jobs.forEach(job => {
        const doc = SelDocs.find(d => d.docnum === job.description);
        const custKey = doc?.bpcode || 'UNKNOWN';
        job.priority = customerPriorityMap[custKey] || 10;
      });

      // --------------------------------------
      // CUSTOMER CAPACITY VALIDATION (NEW)
      // --------------------------------------
      Object.keys(customerJobMap).forEach((custKey) => {
        const customer = customerJobMap[custKey];
        const jobsOfCustomer = customer.jobs;
        const eligibleVehicles =
          getSkillMatchedVehiclesForCustomer(VehList, customer.skills);

        if (eligibleVehicles.length === 0) {
          //              NotesExecptions.push(
          //                `Customer ${customer.bpname} (${customer.bpcode}) has no skill-compatible vehicles.`
          //              );
          return;
        }

        const maxCap = getMaxCapacityFromVehicles(eligibleVehicles);

        let totalDemand = 0;
        let maxSingleJob = 0;

        jobsOfCustomer.forEach(j => {
          totalDemand += j.demand;
          maxSingleJob = Math.max(maxSingleJob, j.demand);
        });

        // Convert to PAL for display
        const totalDemandPAL = totalDemand / 100;
        const maxSingleJobPAL = maxSingleJob / 100;
        const maxVehicleCapacityPAL = maxCap / 100;

        const customerLabel = `${customer.bpname} (${customer.bpcode})`;

        // ❌ Blocking case: a single pick ticket exceeds vehicle capacity
        if (maxSingleJob > maxCap) {
          NotesExecptions.push(
            `For Customer ${customerLabel}, the pick ticket reflects a total of  ` +
            `(${maxSingleJobPAL} PAL) which exceeds the maximum available vehicle capacity of` +
            `(${maxVehicleCapacityPAL} PAL).`
          );
          return;
        }

        // ⚠️ Informational case: customer requires multiple trucks
        if (totalDemand > maxCap) {
          const trucksNeeded = Math.ceil(totalDemand / maxCap);

          NotesExecptions.push(
            `For Customer ${customerLabel}, the combined total of  ${totalDemandPAL} PAL ` +
            `across multiple pick tickets exceeds the maximum available vehicle capacity of ${maxVehicleCapacityPAL} PAL. ` +
            `Accordingly, the pick tickets have been allocated across ${trucksNeeded} vehicles.`
          );
        }
      });

      // ✅ Build relations only for customers having more than 1 job
      Object.keys(customerJobMap).forEach((custKey) => {
        const customer = customerJobMap[custKey];
        const jobsOfCustomer = customer.jobs; // ✅ FIX

        if (!Array.isArray(jobsOfCustomer) || jobsOfCustomer.length <= 1) return;

        const eligibleVehicles =
          getSkillMatchedVehiclesForCustomer(VehList, customer.skills);

        if (eligibleVehicles.length === 0) return;

        const maxCap = getMaxCapacityFromVehicles(eligibleVehicles);

        let currentChunk = [];
        let currentLoad = 0;

        jobsOfCustomer.forEach((job) => {
          // If adding this job exceeds capacity → close current chunk
          if (currentLoad + job.demand > maxCap) {
            if (currentChunk.length > 1) {
              relations.push({
                type: "in_same_route",
                steps: currentChunk.map(j => ({
                  type: "job",
                  id: j.jobId
                }))
              });
            }

            // Start new chunk
            currentChunk = [];
            currentLoad = 0;
          }

          currentChunk.push(job);
          currentLoad += job.demand;
        });

        // Push last chunk
        if (currentChunk.length > 1) {
          relations.push({
            type: "in_same_route",
            steps: currentChunk.map(j => ({
              type: "job",
              id: j.jobId
            }))
          });
        }
      });

      let finallocationList = locationArraybefore // for another type optimisation this.formatLocationCoordinates(locationArraybefore);

      let locactionsFinal = {
        id: 1,
        location: finallocationList,
      }


      // --------------------------------------
      // VEHICLE CITY PREFERENCE (SOFT)
      // --------------------------------------
      VehList.forEach(v => {
        const preferredCity = this.normalizeCity(v.city || "SAN FERNANDO");

        v.metadata = {
          preferred_city: preferredCity,
          allowed_cities: [
            preferredCity,
            ...(this.CITY_ZONES[preferredCity] || [])
          ]
        };
      });

      // vehicle by city soft constraint

      // --------------------------------------
      // SOFT CITY RELATION (ONLY THIS)
      // --------------------------------------
      Object.keys(cityJobMap).forEach(city => {
        const jobsInCity = cityJobMap[city];

        // Only meaningful if more than 1 job
        if (jobsInCity.length > 1) {
          relations.push({
            type: "in_same_route",
            soft: true,          // 🔑 VERY IMPORTANT
            steps: jobsInCity.map(jobId => ({
              type: "job",
              id: jobId
            }))
          });
        }
      });


      // end of SOFT CITY RELATION CONSTRAINT


      let nextBillonObject = {
        relations: relations, // ✅ Added here
        jobs: jobs,
        shipments: shipments,
        options: vehile_profile_options,
        locations: locactionsFinal,
        vehicles: VehList,
      }

      let response = await fetch(`${postAPICode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextBillonObject),
      })
      if (response.status === 200) {
        if (!response.ok) {
          const errorDetails = await response.json()
          console.error('TBBB if response not ok Error:', this.state.loader)
          this.setState({ loader: false })
        } else {
          const data = await response.json()
          await this.OrganiseNextBillionsResponse(
            data,
            selSite,
            SelDocs,
            selVeh,
            selDrivers,
            jobs,
            shipments, extraError, customerJobMap, NotesExecptions, fromBy
          )
        }
      } else {
        console.error('TBBB Error in ArcGIS response status:', response.status)
        console.error('TEEE Error in ArcGIS response data :', response.data)
        console.error('TEEE Error in ArcGIS respośnse data :', response.message)
        const data = await response.json()
        let finalMessage = '';
        if (extraError.length > 0) {

          extraError.forEach((msg) => {
            finalMessage += msg + '\n'; // Add newline after each message
          });
        }
        else {
          const originalMessage = data.message || data.msg || '' // Use whichever exists, or default to an empty string

          const updatedMessage = originalMessage
            .replaceAll('NextBillion', 'TEMA')
            .replaceAll('support@nextbillion.ai', 'support@tema-systems.com')

          //start added by ramana on 10-06-2025 - when vehicle is already covered the whole day
          finalMessage = updatedMessage

          // ✅ Check for that specific phrase
          if (updatedMessage.includes('Please ensure that the time window has valid and chronological timestamps')) {
            // Extract vehicle ID dynamically
            const match = updatedMessage.match(/vehicle with ID (\w+)/)
            const vehicleId = match ? match[1] : 'Unknown'

            // Use your custom message
            finalMessage = `Trip generation for vehicle ${vehicleId} has failed because the document delivery timeline exceeds the 24:00 cutoff time.`
          } else {
            // ✅ If condition fails, keep original message

            finalMessage = updatedMessage
          }
        }
        this.setState({
          errorMessage: finalMessage,
          addAlertShow: true,
          loader: false,
        })
        //end added by ramana on 10-06-2025 - when vehicle is already covered the whole day
      }
    } else {
      this.setState({
        errorMessage:
          selVeh.length === 0
            ? 'There are no vehicles selected.'
            : 'There are no documents selected.',
        addAlertShow: true,
      })
    }
  }



  autofromselection_nextBilloins_onlyPallets = async (DocsData, selVeh, selDrivers, fromBy) => {


    // --------------------------------------
    // SKILL & VEHICLE HELPERS (✅ NEW)
    // --------------------------------------
    const doesVehicleMatchSkills = (vehicleSkills = [], requiredSkills = []) =>
      requiredSkills.every(skill => vehicleSkills.includes(skill));

    const getSkillMatchedVehiclesForCustomer = (vehicles, requiredSkills) =>
      vehicles.filter(v =>
        doesVehicleMatchSkills(v.skills || [], requiredSkills)
      );

    const getMaxCapacityFromVehicles = (vehicles) => {
      let max = 0;
      vehicles.forEach(v => {
        if (Array.isArray(v.capacity) && v.capacity.length > 0) {
          max = Math.max(max, v.capacity[0]);
        }
      });
      return max;
    };



    const getCustomerPriority = (docCount) => {
      if (docCount > 5) return 80;
      if (docCount > 2) return 40;
      return 10;
    };

    const SelDocs = [...DocsData].sort((a, b) =>
      Number(a.bpcode) - Number(b.bpcode)
    );

    this.existingTripsBeforeOptimization =
      this.state.tripsPanel.map(t => t.itemCode);


    // this.setState({ loader: true , loaderText : 'Validating Vehicles and Document for Optimization. Please wait...' })
    let postAPICode =
      'https://api.nextbillion.io/optimization/v2?key=b1cebb49fcaa4366abcb19cfb12b43b3'

    let locationArraybefore = []

    let vehile_profile_options = {

      grouping: {
        proximity_factor: 5
      },
      routing: {
        mode: 'car',
        continue_straight: true,

        // traffic_timestamp: 1724679300,
        profiles: {
          car: {
            mode: 'car',
          },
          minivan: {
            mode: 'car',
            //  truck_size: '200,210,400',
            avoid: [],
          },
        },
      }
    }

    let tempTripPanel = this.state.tripsPanel
    let resArr = []
    let ddate = this.state.date
    let formatedDate = moment.tz(ddate, '').format('YYYY-MM-DD')
    tempTripPanel.filter((item) => {
      resArr.push(item)
    })
    let BreakFeatures = []

    let VehStartTime, VehEndTime
    if (selVeh.length > 0 && SelDocs.length > 0) {
      this.setState({ loader: true, loaderText: 'Loading Please wait....' })

      let VehList = [],
        DocList = []
      let DocListFeatures = []
      let DeportListFeatures = []
      let VehListFeatures = []

      let siteLat, siteLang

      let selSite = this.state.selectedMultipleSites[0]
      this.state.sites.map((site) => {
        if (selSite === site.id) {
          siteLat = site.lat
          siteLang = site.lng

          let newCoord = `${siteLat},${siteLang}`
          locationArraybefore.push(newCoord)
        }
      })

      for (let i = 0; i < selVeh.length; i++) {
        let Veh = {}
        let veh = selVeh[i]

        let sflag = false
        let prevEndTime = 0


        for (let t = 0; t < resArr.length; t++) {
          let currtrip = resArr[t]
          if (currtrip.code === veh.codeyve) {
            //            sflag = true
            //            let endTime = splitTimeAndConv2Sec(currtrip.endTime)
            //            let unloadingtime = convertHrToSec(veh.enddepotserv)
            //            prevEndTime = endTime + unloadingtime
            //

            if (currtrip.endTime && currtrip.endTime.trim() !== '' && currtrip.endTime.trim() !== 'null') {
              sflag = true;
              let endTime = splitTimeAndConv2Sec(currtrip.endTime);
              let unloadingtime = convertHrToSec(veh.enddepotserv);
              prevEndTime = endTime + unloadingtime;
            }
          }
        }

        if (!sflag) {
          prevEndTime = splitTimeAndConv2Sec(veh.starttime)
        }

        let starttime = prevEndTime
        let loadingHrs = convertHrToSec(veh.startdepots)
        let stime = starttime + loadingHrs
        let etime = splitTimeAndAddtimeAndConv2Sec(
          veh.starttime,
          veh.overtimestar
        )

        if (stime < etime) {
        } else {
          etime = 86400
        }
        Veh.id = veh.codeyve
        Veh.start_index = 0
        Veh.end_index = 0

        Veh.name = veh.codeyve
        Veh.description = veh.codeyve
        Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime)
        //        Veh.capacity = [
        //          parseInt(veh.capacities * 100),
        //          parseInt(veh.vol * 100),
        //          parseInt(veh.maxqty * 100),
        //        ]

        Veh.capacity = [parseInt(veh.maxqty * 100)]

        if (veh.xmaxtotaldis === 'Miles') {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1609.34)
        } else {
          Veh.max_distance = Math.round(veh.maxtotaldist * 1000)
        }

        let timew = [stime, etime]
        let geo = [siteLang, siteLat]
        Veh.time_window = timew

        Veh.skills = JSON.parse(`[${veh.skills}]`)
        Veh.max_tasks = veh.maxordercnt > 0 ? veh.maxordercnt : 3

        VehEndTime = etime
        VehStartTime = stime
        let earliestSTateTime = this.dateTimeToMilliseconds(ddate, stime)
        let tempdddd = earliestSTateTime / 1000
        Veh.profile = 'car'
        Veh.costs = {
          fixed: Number(parseFloat(veh.tempFixedCost).toFixed(2)) || 0
        }
        if (stime < etime) {
          VehList.push(Veh)
        }
      }


      // ✅ Calculate maximum vehicle capacity
      let maxVehicleCapacity = 0;

      VehList.forEach(v => {
        if (Array.isArray(v.capacity) && v.capacity.length > 0) {
          maxVehicleCapacity = Math.max(maxVehicleCapacity, v.capacity[0]);
        }
      });
      let maxDoc = this.state.defaultdocprocess
      let docprocessedCount = 0

      const jobs = []
      const shipments = []
      const extraError = [];
      const NotesExecptions = [];
      const receiptPickupMap = {}
      const receiptsObj = {}
      let idCounter = 1 // Start ID from 1
      let weightKey = ''

      const relations = [];
      const customerJobMap = {};
      const minLat = 9.982106
      const maxLat = 10.85555;
      const minLng = -61.95056;
      const maxLng = -60.8988;
      // Process Deliveries
      SelDocs.forEach((item) => {
        let coordinatesFlag = false;

        if (item.lat != '' || item.lng != '') {
          const dlat = parseFloat(item.lat);
          const dlng = parseFloat(item.lng);
          if (dlat < minLat || dlat > maxLat || dlng < minLng || dlng > maxLng) {
            coordinatesFlag = true;
            let message = `Pick Ticket (${item.docnum}) appears to have invalid GPS coordinates. Please verify the Customer record and update accordingly.`;
            extraError.push(message);
          }

          if (item.doctype !== 'PRECEIPT' && item.docnum && !coordinatesFlag) {
            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }
            const deliveryId = idCounter++

            let newCoord = `${item.lat},${item.lng}`
            let loc_index = locationArraybefore.push(newCoord) - 1 // Get the index

            // Convert skills to an array (handle empty case)
            let skillsArray
            try {
              let parsedSkills = JSON.parse('[' + item.skills + ']')
              if (
                Array.isArray(parsedSkills) &&
                parsedSkills.every((skill) => typeof skill === 'number')
              ) {
                skillsArray = parsedSkills
                // loc_i = loc_i + 1;
              } else {
                console.warn(
                  `Skipping document ${item.docnum} due to invalid skills format: ${item.skills}`
                )
                // **Exclude the entire document**
              }
            } catch (e) {
              console.warn(
                `Skipping document ${item.docnum} due to JSON parsing error in skills: ${item.skills}`
              )
              // **Exclude the entire document**
            }

            if (
              item.doctype == 'PICK' ||
              item.doctype == 'DLV' ||
              item.doctype == 'MISCDROP'
            ) {
              weightKey = 'delivery'
            } else if (
              item.doctype == 'RETURN' ||
              item.doctype == 'MISCPICK' ||
              item.doctype == 'PRECEIPT'
            ) {
              weightKey = 'pickup'
            }

            let timeWindw = []
            var FromArr
            var fromflag = false
            var toflag = false
            if (item.fromTime.length > 0) {
              FromArr = item.fromTime.split(' ')
              fromflag = true
            }
            var ToArr
            if (item.toTime.length > 0) {
              ToArr = item.toTime.split(' ')
              toflag = true
            }
            fromflag &&
              FromArr.map((ft, index) => {
                var tt = []
                tt.push(splitTimeAndConv2Sec(ft))
                tt.push(splitTimeAndConv2Sec(ToArr[index]))

                timeWindw.push(tt)
              })

            if (fromflag) {
              item.time_windows = timeWindw
            }

            if (item.pairedDoc.trim() === '') {
              jobs.push({
                id: deliveryId,
                location_index: loc_index, // Replace with real coordinates
                service:
                  parseInt(convertHrToSec(item.serviceTime)) +
                  parseInt(convertHrToSec(item.waitingTime)),
                //                  [weightKey]: [
                //                    parseInt(item.netweight * 100),
                //                    parseInt(item.volume * 100),
                //                    parseInt(item.noofCases * 100),
                //                  ],
                [weightKey]: [parseInt(item.noofCases * 100)],
                description: item.docnum,
                skills: skillsArray,
                time_windows: timeWindw,
                priority: parseInt(item.priority)

              })
              const customerKey = item.bpcode || "UNKNOWN";

              if (!customerJobMap[customerKey]) {
                customerJobMap[customerKey] = {
                  bpcode: item.bpcode || "UNKNOWN",
                  bpname: item.bpname || "Unknown Customer",
                  jobs: [],
                  skills: []
                };
              }

              customerJobMap[customerKey].jobs.push({
                jobId: deliveryId,
                demand: parseInt(item.noofCases * 100),
                docnum: item.docnum
              });

              customerJobMap[customerKey].skills = Array.from(
                new Set([...customerJobMap[customerKey].skills, ...skillsArray])
              );
            }
            //   }
          }
        }
        else {
          let message = `Pick Ticket (${item.docnum}) appears to have missing GPS coordinates. Please verify the Customer record and update accordingly.`;
          extraError.push(message);
        }
      })

      /*S
        // ✅ Build relations only for customers having more than 1 job without spling and without veh max capacity
        Object.keys(customerJobMap).forEach((custKey) => {
          const jobIds = customerJobMap[custKey];
  
          if (jobIds.length > 1) {
            relations.push({
              type: "in_same_route",
              steps: jobIds.map((id) => ({
                type: "job",
                id: id
              }))
            });
          }
        });
  
        */


      // --------------------------------------
      // APPLY CUSTOMER PRIORITY (✅ NEW)
      // --------------------------------------
      const customerPriorityMap = {};

      Object.keys(customerJobMap).forEach(custKey => {
        const count = customerJobMap[custKey].jobs.length;
        customerPriorityMap[custKey] = getCustomerPriority(count);
      });

      jobs.forEach(job => {
        const doc = SelDocs.find(d => d.docnum === job.description);
        const custKey = doc?.bpcode || 'UNKNOWN';
        job.priority = customerPriorityMap[custKey] || 10;
      });

      // --------------------------------------
      // CUSTOMER CAPACITY VALIDATION (NEW)
      // --------------------------------------
      Object.keys(customerJobMap).forEach((custKey) => {
        const customer = customerJobMap[custKey];
        const jobsOfCustomer = customer.jobs;
        const eligibleVehicles =
          getSkillMatchedVehiclesForCustomer(VehList, customer.skills);

        if (eligibleVehicles.length === 0) {
          //              NotesExecptions.push(
          //                `Customer ${customer.bpname} (${customer.bpcode}) has no skill-compatible vehicles.`
          //              );
          return;
        }

        const maxCap = getMaxCapacityFromVehicles(eligibleVehicles);

        let totalDemand = 0;
        let maxSingleJob = 0;

        jobsOfCustomer.forEach(j => {
          totalDemand += j.demand;
          maxSingleJob = Math.max(maxSingleJob, j.demand);
        });

        // Convert to PAL for display
        const totalDemandPAL = totalDemand / 100;
        const maxSingleJobPAL = maxSingleJob / 100;
        const maxVehicleCapacityPAL = maxCap / 100;

        const customerLabel = `${customer.bpname} (${customer.bpcode})`;

        // ❌ Blocking case: a single pick ticket exceeds vehicle capacity
        if (maxSingleJob > maxCap) {
          NotesExecptions.push(
            `For Customer ${customerLabel}, the pick ticket reflects a total of  ` +
            `(${maxSingleJobPAL} PAL) which exceeds the maximum available vehicle capacity of` +
            `(${maxVehicleCapacityPAL} PAL).`
          );
          return;
        }

        // ⚠️ Informational case: customer requires multiple trucks
        if (totalDemand > maxCap) {
          const trucksNeeded = Math.ceil(totalDemand / maxCap);

          NotesExecptions.push(
            `For Customer ${customerLabel}, the combined total of  ${totalDemandPAL} PAL ` +
            `across multiple pick tickets exceeds the maximum available vehicle capacity of  ${maxVehicleCapacityPAL} PAL. ` +
            `Accordingly, the pick tickets have been allocated across ${trucksNeeded} vehicles.`
          );
        }
      });

      // ✅ Build relations only for customers having more than 1 job
      Object.keys(customerJobMap).forEach((custKey) => {
        const customer = customerJobMap[custKey];
        const jobsOfCustomer = customer.jobs; // ✅ FIX

        if (!Array.isArray(jobsOfCustomer) || jobsOfCustomer.length <= 1) return;

        const eligibleVehicles =
          getSkillMatchedVehiclesForCustomer(VehList, customer.skills);

        if (eligibleVehicles.length === 0) return;

        const maxCap = getMaxCapacityFromVehicles(eligibleVehicles);

        let currentChunk = [];
        let currentLoad = 0;

        jobsOfCustomer.forEach((job) => {
          // If adding this job exceeds capacity → close current chunk
          if (currentLoad + job.demand > maxCap) {
            if (currentChunk.length > 1) {
              relations.push({
                type: "in_same_route",
                steps: currentChunk.map(j => ({
                  type: "job",
                  id: j.jobId
                }))
              });
            }

            // Start new chunk
            currentChunk = [];
            currentLoad = 0;
          }

          currentChunk.push(job);
          currentLoad += job.demand;
        });

        // Push last chunk
        if (currentChunk.length > 1) {
          relations.push({
            type: "in_same_route",
            steps: currentChunk.map(j => ({
              type: "job",
              id: j.jobId
            }))
          });
        }
      });

      let finallocationList = locationArraybefore // for another type optimisation this.formatLocationCoordinates(locationArraybefore);

      let locactionsFinal = {
        id: 1,
        location: finallocationList,
      }

      let nextBillonObject = {
        relations: relations, // ✅ Added here
        jobs: jobs,
        shipments: shipments,
        options: vehile_profile_options,
        locations: locactionsFinal,
        vehicles: VehList,
      }

      let response = await fetch(`${postAPICode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextBillonObject),
      })
      if (response.status === 200) {
        if (!response.ok) {
          const errorDetails = await response.json()
          console.error('TBBB if response not ok Error:', this.state.loader)
          this.setState({ loader: false })
        } else {
          const data = await response.json()
          await this.OrganiseNextBillionsResponse(
            data,
            selSite,
            SelDocs,
            selVeh,
            selDrivers,
            jobs,
            shipments, extraError, customerJobMap, NotesExecptions, fromBy
          )

          //          return {
          //            routes: data.result?.routes || data.routes || []
          //          };
        }
      } else {
        console.error('TBBB Error in ArcGIS response status:', response.status)
        console.error('TEEE Error in ArcGIS response data :', response.data)
        console.error('TEEE Error in ArcGIS respośnse data :', response.message)
        const data = await response.json()
        let finalMessage = '';
        if (extraError.length > 0) {

          extraError.forEach((msg) => {
            finalMessage += msg + '\n'; // Add newline after each message
          });
        }
        else {
          const originalMessage = data.message || data.msg || '' // Use whichever exists, or default to an empty string

          const updatedMessage = originalMessage
            .replaceAll('NextBillion', 'TEMA')
            .replaceAll('support@nextbillion.ai', 'support@tema-systems.com')

          //start added by ramana on 10-06-2025 - when vehicle is already covered the whole day
          finalMessage = updatedMessage

          // ✅ Check for that specific phrase
          if (updatedMessage.includes('Please ensure that the time window has valid and chronological timestamps')) {
            // Extract vehicle ID dynamically
            const match = updatedMessage.match(/vehicle with ID (\w+)/)
            const vehicleId = match ? match[1] : 'Unknown'

            // Use your custom message
            finalMessage = `Trip generation for vehicle ${vehicleId} has failed because the document delivery timeline exceeds the 24:00 cutoff time.`
          } else {
            // ✅ If condition fails, keep original message

            finalMessage = updatedMessage
          }
        }
        this.setState({
          errorMessage: finalMessage,
          addAlertShow: true,
          loader: false,
        })
        //end added by ramana on 10-06-2025 - when vehicle is already covered the whole day
      }
    } else {
      this.setState({
        errorMessage:
          selVeh.length === 0
            ? 'There are no vehicles selected.'
            : 'There are no documents selected.',
        addAlertShow: true,
      })
    }
  }


  OrganiseNextBillionsResponse = async (
    data,
    selSite,
    SelDocs,
    selVeh,
    selDrivers,
    assignedJobs,
    assignedShipments,
    extraError, customerJobMap, NotesExecptions, fromBy
  ) => {
    await this.setStateAsync({ loader: true, loaderText: 'The Routes generation process is in progress. Please wait..' })
    let unassignedListRes = ''
    let loopflg = true
    try {
      this.setState({ loader: true, loaderText: 'The Routes generation process is in progress. Please wait..' })
      const apiKey = 'b1cebb49fcaa4366abcb19cfb12b43b3'
      const jobId = data.id
      const postAPICodewithId = `https://api.nextbillion.io/optimization/v2/result?id=${jobId}&key=${apiKey}`

      let attempt = 0
      const maxAttempts = 150 // Stop after 20 tries (200 seconds)

      while (attempt < maxAttempts) {

        this.setState({ loader: true, loaderText: 'The Routes generation process is in progress. Please wait..' })
        await new Promise((res) => setTimeout(res, 10000)) // Wait for 10 seconds before each retry
        attempt++

        const response = await fetch(postAPICodewithId, { method: 'GET' })

        if (response.status !== 200) {
          this.setState({
            errorMessage: 'Something went wrong while fetching the route.',
            addAlertShow: true,
            loader: false,
          })
          throw new Error('Failed to fetch route optimization result')
        }

        const res = await response.json()

        if (res.status !== 'Ok') {
          throw new Error(`API Error: ${res.message || 'Unknown error'}`)
        }

        if (
          res.message === 'Job still processing' ||
          !res.result ||
          (res.result.routes && res.result.routes.length === 0)
        ) {
          continue
        }
        //  else if (
        //   res.message === "" &&
        //   res.result &&
        //   res.result?.unassigned?.length > 0
        // ) {
        //   loopflg = false;

        //   let matchedUnassignedWithReason = res.result.unassigned
        //     .map((unassignedDoc) => {
        //       const [lat, lng] = unassignedDoc.location;

        //       const matchedDoc = SelDocs.find(
        //         (doc) => doc.lat === lat && doc.lng === lng
        //       );

        //       if (matchedDoc) {
        //         return {
        //           docnum: matchedDoc.docnum,
        //           reason: unassignedDoc.reason || "N/A", // fallback if reason not present
        //         };
        //       }

        //       return null; // skip if no match
        //     })
        //     .filter(Boolean); // remove nulls (unmatched)


        //   unassignedListRes = matchedUnassignedWithReason
        //     .map((item) => `Doc: ${item.docnum}, Reason: ${item.reason}`)
        //     .join("\n"); // \n for line breaks

        //   this.setState({
        //     errorMessage: unassignedListRes,
        //     addAlertShow: true,
        //     loader: false,
        //   });
        //   break; // Stop the while loop
        //   return;
        // }
        else if (res.result?.routes?.length > 0) {

          res.result.routes.forEach(route => {
            if (route.vehicle) {
              this.usedVehicleIds.add(route.vehicle);
            }
          });

          console.log("AUTO - onAuto ----", this.usedVehicleIds)

          this.submitRoutesforTripsCreation(
            res.result.routes,
            selSite,
            SelDocs,
            selDrivers,
            selVeh,
            res.result,
            [],
            'auto_next',
            jobId,
            assignedShipments,
            assignedJobs,
            extraError, customerJobMap, NotesExecptions, fromBy
          )

          return
        }

        else if (res.result) {
          // Always route through Exceptionalanalysis
          this.Exceptionalanalysis(
            SelDocs,
            selVeh,
            res.result,
            [],                 // X3SetupErrors
            'auto_next',
            assignedShipments,
            assignedJobs,
            jobId,
            extraError
          )
          return
        }

        /* else {
          // adding by ramana on 12-08-25 for only unassigned docs without routes with reasons
          if (res.result.unassigned.length > 0) {
            let summarybox = []
            let errorbox = []

            let matchedUnassignedWithReason = res.result.unassigned
              .map((unassignedDoc) => {
                const [lat, lng] = unassignedDoc.location
                const matchedDoc = SelDocs.find(
                  (doc) => doc.lat === lat && doc.lng === lng
                )

                if (matchedDoc) {
                  return {
                    docnum: matchedDoc.docnum,
                    reason: unassignedDoc.reason || 'N/A', // fallback if reason not present
                  }
                }

                return null // skip if no match
              })
              .filter(Boolean) // remove nulls (unmatched)

            unassignedListRes = matchedUnassignedWithReason
              .map(
                (item) =>
                  `${item.docnum} - ${item.reason === 'cannot be served due to skills requirement'
                    ? `has been excluded because the route code or product category is not compatible with vehicle's restrictions.`
                    : item.reason === 'cannot be served due to time window constraints in task or vehicles'
                      ? `has been excluded due to time window restrictions.`
                      : item.reason === 'cannot be served due to capacity constraint'
                        ? `has been excluded because it exceeds the maximum vehicle’s weight or volume or pallet capacity.`
                        : item.reason
                  }`
              )
              .join('\n') // \n for line breaks
            errorbox.push(unassignedListRes)

            summarybox.push(
              ` 0 trips have been auto generated containing a total of  0 documents  \n`
            )
            summarybox.push(
              `${res.result.unassigned.length} out of ${SelDocs.length} documents have been excluded from the trip optimization process. \n`
            )

            this.setState({
              errorArrayMessage: errorbox,
              errorSummartMessage: summarybox,
              errorNotesArray : '',
              loader: false,
              addAlertSummaryShow: true,
            })
            return
          }
        }
            */
        //   if (res.result.unassigned.length > 0) {
        //     let unassignedList = res.result.unassigned

        //     //unassignedList

        //     // assignedJobs
        //     // assignedShipments

        //     const outputList = [
        //       {
        //         docnum: 'SHPDH0010058',
        //         weight: 500,
        //         volume: 30,
        //         timewindow: '08:00-12:00',
        //         skills: [1, 2],
        //       },
        //       {
        //         docnum: 'SHPDH0010059',
        //         weight: 700,
        //         volume: 40,
        //         timewindow: '10:00-14:00',
        //         skills: [3, 4],
        //       },
        //     ]

        //     // Create a mapping from docnum to details in outputList
        //     const outputMap = new Map(
        //       outputList.map((doc) => [doc.docnum, doc])
        //     )

        //     // Process unassigned list
        //     const finalMappedList = unassignedList.map((item) => {
        //       // Find matching docnum from selDocs
        //       const matchedDoc = SelDocs.find(
        //         (doc) => doc.docnum === item.description
        //       )
        //       if (!matchedDoc)
        //         return {
        //           ...item,
        //           weight: 'N/A',
        //           volume: 'N/A',
        //           timewindow: 'N/A',
        //           skills: 'N/A',
        //         } // Handle missing cases

        //       // Get weight, volume, timewindow, skills from outputList using docnum
        //       const docDetails = outputMap.get(matchedDoc.docnum) || {}

        //       return {
        //         ...item,
        //         weight: docDetails.weight || 'N/A',
        //         volume: docDetails.volume || 'N/A',
        //         timewindow: docDetails.timewindow || 'N/A',
        //         skills: docDetails.skills || 'N/A',
        //       }
        //     })
        //   }
        // }
        // Job completed, process the result
      }

      if (attempt === 150) {
        this.setState({
          errorMessage:
            `The optimization is taking longer than expected. Please try again later. Transaction Id : ${jobId} `,
          addAlertShow: true,
          loader: false,
        })
      }
    } catch (error) {
      console.error('Error:', error)
      this.setState({
        errorMessage: error.message || 'An error occurred',
        addAlertShow: true,
        loader: false,
      })
    }
  }

  autofromselection = (SelDocs, selVeh, selDrivers) => {
    let tempTripPanel = this.state.tripsPanel

    if (selVeh.length > 0 && SelDocs.length > 0) {
      this.setState({ loader: true, loaderText: 'Loading please wait..' })

      let VehList = [],
        DocList = []
      let sameVehiclesflag = this.state.checkedsameVehicles
      let VehStartTime, VehEndTime
      var siteLat, siteLang
      var doc = {}
      var selSite = this.state.selectedMultipleSites[0]

      this.state.sites.map((site) => {
        if (selSite === site.id) {
          siteLat = site.lat
          siteLang = site.lng
        }
      })

      let resArr = []
      tempTripPanel.filter(function (item) {
        //  var i = resArr.findIndex((x) => x.code == item.code);
        //  if (i <= -1) {
        resArr.push(item)
        //  }
        //  return null;
      })

      let X3SetupErrors = []

      for (let i = 0; i < selVeh.length; i++) {
        var Veh = {}
        let veh = selVeh[i]
        if (
          veh.aprodCategDesc === '' ||
          veh.aroutecodeDesc === '' ||
          veh.avehClassListDesc === ''
        ) {
          if (veh.aprodCategDesc === '') {
            X3SetupErrors.push(
              'The Vehicle' +
              ' ' +
              veh.name +
              '(' +
              veh.codeyve +
              ')' +
              "don't have any Product Category"
            )
          }
          if (veh.aroutecodeDesc === '') {
            X3SetupErrors.push(
              'The Vehicle' +
              ' ' +
              veh.name +
              '(' +
              veh.codeyve +
              ')' +
              "doesn't have any Route Code"
            )
          }
          if (veh.avehClassListDesc === '') {
            X3SetupErrors.push(
              'The Vehicle' +
              ' ' +
              veh.name +
              '(' +
              veh.codeyve +
              ')' +
              "doesn't have any Vehicle Class"
            )
          }
        } else {
          var sflag = false
          var prevEndTime = 0

          for (let t = 0; t < resArr.length; t++) {
            var currtrip = resArr[t]
            if (currtrip.code === veh.codeyve) {
              sflag = true
              var endTime = splitTimeAndConv2Sec(currtrip.endTime)
              var unloadingtime = convertHrToSec(veh.enddepotserv)
              prevEndTime = endTime + unloadingtime
            }
          }

          if (!sameVehiclesflag && !sflag) {
            Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime)
            //  Veh.capacity = [parseInt(veh.capacities),parseInt(veh.vol), parseInt(veh.totalCases)];
            Veh.capacity = [parseInt(veh.capacities), parseInt(veh.vol)]

            Veh.id = i + 1
            Veh.description = veh.codeyve
            let starttime = splitTimeAndConv2Sec(veh.starttime)
            let loadingHrs = convertHrToSec(veh.startdepots)
            let stime = starttime + loadingHrs
            let etime = splitTimeAndAddtimeAndConv2Sec(
              veh.starttime,
              veh.overtimestar
            )
            let timew = [stime, etime]
            let geo = [siteLat, siteLang]

            Veh.time_window = timew
            Veh.start = geo
            Veh.end = geo
            var array = JSON.parse('[' + veh.skills + ']')
            Veh.skills = array
            if (veh.maxordercnt > 0) {
              Veh.max_tasks = veh.maxordercnt
            } else {
              Veh.max_tasks = 3
            }
            VehList.push(Veh)
            VehEndTime = etime
            VehStartTime = stime
          } else if (sameVehiclesflag || sflag) {
            let starttime = prevEndTime
            let loadingHrs = convertHrToSec(veh.startdepots)
            let stime = starttime + loadingHrs
            let etime = splitTimeAndAddtimeAndConv2Sec(
              veh.starttime,
              veh.overtimestar
            )

            if (stime < etime) {
              Veh.id = i + 1
              Veh.description = veh.codeyve
              Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime)
              //   Veh.capacity = [parseInt(veh.capacities) , parseInt(veh.vol), parseInt(veh.totalCases)];
              Veh.capacity = [parseInt(veh.capacities), parseInt(veh.vol)]

              let timew = [stime, etime]
              let geo = [siteLat, siteLang]
              Veh.time_window = timew
              Veh.start = geo
              Veh.end = geo
              var array = JSON.parse('[' + veh.skills + ']')
              Veh.skills = array
              if (veh.maxordercnt > 0) {
                Veh.max_tasks = veh.maxordercnt
              } else {
                Veh.max_tasks = 3
              }

              VehList.push(Veh)
              VehEndTime = etime
              VehStartTime = stime
            }
          }
        }
      }
      let maxDoc = this.state.defaultdocprocess
      let docprocessedCount = 0
      for (let j = 0; j < SelDocs.length; j++) {
        let doc = SelDocs[j]
        if (
          doc.aprodCategDesc === '' ||
          doc.aroutecodeDesc === '' ||
          doc.avehClassListDesc === '' ||
          doc.lat == 0 ||
          doc.lng == 0
        ) {
          if (doc.aprodCategDesc === '') {
            X3SetupErrors.push(
              'The Products in the document' +
              ' ' +
              doc.docnum +
              ' ' +
              "don't have Product Category"
            )
          }
          if (doc.aroutecodeDesc === '') {
            X3SetupErrors.push(
              'The document' +
              ' ' +
              doc.docnum +
              ' ' +
              "doesn't have Route Code"
            )
          }
          if (doc.avehClassListDesc === '') {
            X3SetupErrors.push(
              'The Customer' +
              ' ' +
              doc.bpname +
              '(' +
              doc.bpcode +
              ')' +
              "doesn't have Vehicle Class"
            )
          }
          if (doc.lat == 0 || doc.lng == 0) {
            X3SetupErrors.push(
              `Coordinates are missing for this document (${doc.docnum})`
            )
          }
        } else if (
          (doc.type === 'open' || doc.type === 'Allocated') &&
          (doc.dlvystatus === '0' || doc.dlvystatus === '8') &&
          docprocessedCount < maxDoc
        ) {
          var Doc = {}
          Doc.id = j + 1
          Doc.description = doc.docnum

          var FromArr
          var fromflag = false
          var toflag = false
          if (doc.fromTime.length > 0) {
            FromArr = doc.fromTime.split(' ')
            fromflag = true
          }
          var ToArr
          if (doc.toTime.length > 0) {
            ToArr = doc.toTime.split(' ')
            toflag = true
          }

          var timeWindw = []

          fromflag &&
            FromArr.map((ft, index) => {
              var tt = []
              tt.push(splitTimeAndConv2Sec(ft))
              tt.push(splitTimeAndConv2Sec(ToArr[index]))

              timeWindw.push(tt)
            })

          var DocLat, DocLang
          DocLat = doc.lat
          DocLang = doc.lng
          Doc.location = [DocLat, DocLang]
          Doc.priority = doc.priority
          //  Doc.amount = [parseInt(doc.netweight) , parseInt(doc.volume), parseInt(doc.noofcases)];
          Doc.amount = [parseInt(doc.netweight), parseInt(doc.volume)]
          var array1 = JSON.parse('[' + doc.skills + ']')

          //  Veh.skills = array1;
          // Doc.skills = (doc.skills).split(',');
          Doc.skills = array1
          let wtime =
            convertHrToSec(doc.waitingTime) + convertHrToSec(doc.serviceTime)

          Doc.service = parseInt(wtime)
          let ps,
            pe = 0
          let ds,
            de = 0

          if (fromflag) {
            Doc.time_windows = timeWindw
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

          DocList.push(Doc)
          docprocessedCount = docprocessedCount + 1
        }
      }

      //process for the JSON file
      var processedData = {}
      processedData.vehicles = VehList
      processedData.jobs = DocList
      processedData.options = {
        g: true,
      }

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

      let ssitecur = this.state.selectedSite && this.state.selectedSite.id
      let uurl = ''

      uurl = 'https://maps.tema-systems.com'

      /*
       if(ssitecur === 'BERTO' || ssitecur ==== 'EXODU') {
          uurl = 'http://35.223.68.187:3000'
       }
       else {
         uurl = 'http://35.239.36.13:3000'
       }
    */
      fetch(uurl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else {
            if (X3SetupErrors.length > 0) {
              this.setState({
                errorArrayMessage: X3SetupErrors,
                loader: false,
                addAlertArrayShow: true,
              })
              return
            } else {
              const rrr = response.json()
              this.setState({
                errorMessage: `${response.error == 'Invalid jobs or shipments.'
                  ? 'Invalid documents or vehicles'
                  : 'The selected documents coordinates are either out of range or incorrect.'
                  }`,
                addAlertShow: true,
                loader: false,
              })
            }
          }
        })
        .then((res) => {
          if (res.routes.length > 0) {
            this.submitRoutesforTripsCreation(
              res.routes,
              selSite,
              SelDocs,
              selDrivers,
              selVeh,
              res,
              X3SetupErrors,
              'auto_old'
            )
          } else {
            let errorbox = []

            SelDocs.forEach((doc) => {
              let glbalmissingskill = []
              let tempoptiError = {
                docnum: '',
                skillerrorflg: false,
                skillmessage: '',
                capacatyflg: false,
                capacityError: '',
                generalflg: false,
                genearalError: '',
              }
              let glabalerrorOBject = ''

              let isSkillMatchFoundflg = false
              let docskill = JSON.parse('[' + doc.skills + ']')
              let tcapacatyflg = false
              let tskillflg = false
              let tvolumeflg = false
              let prodCodevehList = []
              let routeCodeVehList = []
              let timewindowVehList = []
              let capacityVehList = []
              let volumeVehList = []
              let vehClassVehList = []
              let TimewindowforDoc = []
              selVeh.forEach((veh) => {
                let missingSkillsForDoc = []

                // Check if all skills of doc are in veh's skills
                let varray = JSON.parse('[' + veh.skills + ']')
                //  Veh.skills = array
                //   let vehskill = ;
                //  const isSubset = docskill.every((skill) => varray.includes(skill));
                const missingSkills = docskill.filter(
                  (skill) => !varray.includes(skill)
                )

                if (missingSkills.length === 0) {
                  // If no missing skills, it's a match
                  if (veh.capacities < doc.netweight) {
                    tcapacatyflg = true
                    capacityVehList.push(veh.codeyve)
                  }
                  // volume check
                  if (veh.vol < doc.volume) {
                    tvolumeflg = true
                    volumeVehList.push(veh.codeyve)
                  }
                } else {
                  // If there are missing skills, collect them
                  isSkillMatchFoundflg = true
                  missingSkillsForDoc.push(...missingSkills)
                  glbalmissingskill.push(...missingSkills)

                  if (veh.capacities < doc.netweight) {
                    tcapacatyflg = true
                    capacityVehList.push(veh.codeyve)
                  }
                  // volume check
                  if (veh.vol < doc.volume) {
                    tvolumeflg = true
                    volumeVehList.push(veh.codeyve)
                  }

                  // assign the not mathced skills to the vehicle array
                  const tempuniqueMissingSkills = [...new Set(missingSkills)]
                  const temprouteCodeErrors = tempuniqueMissingSkills.filter(
                    (skill) => skill >= -1 && skill <= 100
                  )
                  const tempproductCategoryErrors =
                    tempuniqueMissingSkills.filter(
                      (skill) => skill > 100 && skill <= 200
                    )
                  const tempvehicleClassErrors = tempuniqueMissingSkills.filter(
                    (skill) => skill > 200
                  )

                  if (temprouteCodeErrors.length > 0) {
                    routeCodeVehList.push(veh.codeyve)
                  }
                  if (tempproductCategoryErrors.length > 0) {
                    prodCodevehList.push(veh.codeyve)
                  }
                  if (tempvehicleClassErrors.length > 0) {
                    vehClassVehList.push(veh.codeyve)
                  }
                }
              })

              /*
                // If no vehicle has matching skills for this document, set an error
                if (!isSkillMatchFoundflg) {
                 // optiError.skillmessage = `No vehicle found with the required skills for document ${doc.docnum}`;
                }
              */

              if (!tvolumeflg || !tcapacatyflg || !isSkillMatchFoundflg) {
                tempoptiError.docnum = doc.docnum
                let tmsg = ''

                if (doc.fromTime.length > 0) {
                  TimewindowforDoc.push(splitTime(doc.fromTime))
                  TimewindowforDoc.push(splitTime(doc.toTime))
                }

                if (vehClassVehList.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded as the Customer's assigned Vehicle Class does not match  of these vehicles  ${vehClassVehList}. \n`
                }
                if (prodCodevehList.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded as it contains products not matching the selected vehicles' ${prodCodevehList}  product categories . \n`
                }
                if (routeCodeVehList.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded as the customer's assigned RouteCode does not match any of the selected vehicles ${routeCodeVehList}. \n`
                }
                if (capacityVehList.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded due to Weight Capacity restriction on the selected vehicles ${capacityVehList}. \n`
                }
                if (volumeVehList.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded due to Volume Capacity restriction on the selected vehicles ${volumeVehList}. \n`
                }
                if (TimewindowforDoc.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded due to Delivery Time Frame restriction (${TimewindowforDoc}) . \n`
                }
                if (X3SetupErrors.length > 0) {
                  glabalerrorOBject =
                    glabalerrorOBject +
                    `Document ${doc.docnum} has been excluded due to the missing Coordinates . \n`
                }

                if (glabalerrorOBject.length < 1) {
                  if (TimewindowforDoc.length > 0) {
                    glabalerrorOBject =
                      glabalerrorOBject +
                      `Document ${doc.docnum} has been excluded due to Delivery Time Frame restriction (${TimewindowforDoc}). \n`
                  } else {
                    glabalerrorOBject = `Document ${doc.docnum} has been excluded due to the vehicles weight/volume capacity was full in the current trip. \n`
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
                glabalerrorOBject = glabalerrorOBject + '\n'
                errorbox.push(glabalerrorOBject)
              }
            })
            const finalErrorMessage = errorbox.join('\n')

            this.setState({
              errorArrayMessage: errorbox,
              loader: false,
              addAlertArrayShow: true,
            })
          }
        })
    } else {
      if (selVeh.length === 0) {
        this.setState({
          errorMessage: 'There are no vehicles selected.',
          addAlertShow: true,
        })
      } else {
        this.setState({
          errorMessage: 'There are no documents selected.',
          addAlertShow: true,
        })
      }
    }
  }

  openPopupAuto = (val) => {
    if (!val) {
      this.refreshAllPanels()
    }
    this.setState({
      openAutoPopup: val,
    })
  }

  disableDivs = (index, type, docNum) => {
    var currVehPanel = this.state.vehiclePanel
    var currDropsPanel = this.state.dropsPanel

    if (type === 'vehicle') {
      var currVeh = currVehPanel.vehicles
      currVeh[index].isDropped = true
      currVeh[index].type = 'selected'
      currVehPanel.vehicles = currVeh
    }
    if (type === 'trailer') {
      var currVeh = currVehPanel.trails
      currVeh[index].isDropped = true
      currVeh[index].type = 'selected'
      currVehPanel.trails = currVeh
    }
    if (type === 'driver') {
      var currVeh = currVehPanel.drivers
      currVeh[index].isDropped = true
      currVeh[index].type = 'selected'
      currVehPanel.drivers = currVeh
    }
    if (type === 'equipment') {
      var currVeh = currVehPanel.equipments
      currVeh[index].isDropped = true
      currVeh[index].type = 'selected'
      currVehPanel.equipments = currVeh
    }
    if (type === 'pickup') {
      var currVeh = currDropsPanel.pickUps

      if (this.state.checkedToPlan || this.state.searchPanel) {
        if (currDropsPanel.pickUps && currDropsPanel.pickUps.length > 0) {
          currDropsPanel.pickUps.map((pickups, i) => {
            if (pickups.docnum === docNum) {
              currVeh[i].isDropped = true
              currVeh[i].type = 'selected'
            }
          })
        }
      } else {
        currVeh[index].isDropped = true
        currVeh[index].type = 'selected'
      }
      currDropsPanel.pickUps = currVeh
    }
    if (type === 'drops') {

      var currVeh = currDropsPanel.drops
      if (currDropsPanel.drops && currDropsPanel.drops.length > 0) {
        currDropsPanel.drops.map((drops, i) => {
          if (drops.docnum === docNum) {
            currVeh[i].isDropped = true
            currVeh[i].type = 'selected'
          }
        })
      }
      currDropsPanel.drops = currVeh
    }
    this.setState({
      vehiclePanel: currVehPanel,
      dropsPanel: currDropsPanel,
    })
  }

  UnlockConfirmTrip = (ClickedTrip) => {
    this.confirmTrip(ClickedTrip, 'unlock')
  }

  submitTrips = async (trips) => {
    this.setState({ loader: true, loaderText: 'Loading please wait..' })

    try {
      const res = await fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/trips`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trips),
        }
      )

      if (!res.ok) {
        const contentType = res.headers.get('content-type') || ''
        let msg = 'Server Error'

        if (contentType.includes('application/json')) {
          // Prefer JSON if server says it's JSON
          try {
            const err = await res.json() // { status, message, errors, ... }
            msg = err?.message || msg
          } catch {
            // Fallback: try as text, then parse
            const text = await res.text()
            try {
              msg = JSON.parse(text)?.message || text || msg
            } catch {
              msg = text || msg
            }
          }
        } else {
          // Plain text or unknown; read once and try to parse
          const text = await res.text()
          try {
            msg = JSON.parse(text)?.message || text || msg
          } catch {
            msg = text || msg
          }
        }

        throw new Error(msg)
      }

      const data = await res.json()

      if (data?.skippedDocuments?.length) {
        const skippedList = data.skippedDocuments.join(', ')
        this.notifySucess(
          `Trip generated successfully, but the following documents are excluded since they are already allocated to another trip: ${skippedList}`
        )
      } else {
        this.notifySucess('Trip Added/Updated Successfully')
      }

      this.handleDateChange(this.state.date)
      this.setState({
        loader: false,
        checkedTrip: false,
        isDetail: false,
        updatetypeTrip: false,
      })

      const checkBoxAllTrips = document.getElementById('tripsCheckBoxAll')
      if (checkBoxAllTrips?.checked) checkBoxAllTrips.checked = false
    } catch (error) {
      this.handleDateChange(this.state.date)
      this.setState({ loader: false })

      // Will show exactly the server message if provided:
      // "All the documents in the trip are already scheduled. So cannot generate Trip"
      this.notifyError(
        error?.message ||
        'Trip creation/updation failed: invalid  data or all the  documents already assigned to another trips.'
      )
    }
  }

  submitTrips_old_2 = (trips) => {
    this.setState({ loader: true })
    fetch(`${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        // this.handleErrors(response)
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || 'Server Error')
          })
        }

        return response.json()
      })
      .then((data) => {

        if (data.skippedDocuments && data.skippedDocuments.length > 0) {
          const skippedList = data.skippedDocuments.join(', ')
          this.notifySucess(
            `Trip generated, but some documents skipped: ${skippedList}`
          )
        } else {
          this.notifySucess('Trip Added/Updated Successfully')
        }

        this.handleDateChange(this.state.date)
        this.setState({
          loader: false,
          checkedTrip: false,
          isDetail: false,
          updatetypeTrip: false,
        })

        let checkBoxAllTrips = document.getElementById('tripsCheckBoxAll')
        if (checkBoxAllTrips && checkBoxAllTrips.checked) {
          checkBoxAllTrips.checked = false
        }
        // this.notifySucess('Trip Added/Updated Sucessfully')
      })
      .catch((error) => {
        this.handleDateChange(this.state.date)
        this.setState({ loader: false })
        this.notifyError(
          error.message ||
          'Trip creation/updation failed: invalid  data or all the  documents already assigned to another trips.'
        )
      })
    //   this.updateTripsGeoLocations(this.state.selectedTripIndex)
  }

  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  }




  finalUpdatedTrip = async (tripdata) => {
    try {
      await this.confirmTrip(tripdata, 'OpenwithMaps')
      return true;
    }
    catch (e) {
      console.error('Backend trip update failed', e)
      throw e       // ❌ propagate failure
    }
  }

  resolveStartTime = (trip) => {
    if (trip.startTime) {
      return trip.startTime
    }

    if (trip.vehicleObject?.starttime) {
      const time = trip.vehicleObject.starttime
      // "0400" → "04:00"
      return `${time.slice(0, 2)}:${time.slice(2, 4)}`
    }

    return '02:00'
  }

  addMinutes = (time, minutesToAdd) => {
    const [hours, minutes] = time.split(':').map(Number)
    const date = new Date()
    date.setHours(hours, minutes)
    date.setMinutes(date.getMinutes() + minutesToAdd)

    const hh = String(date.getHours()).padStart(2, '0')
    const mm = String(date.getMinutes()).padStart(2, '0')

    return `${hh}:${mm}`
  }



  confirmTrip = (trip, route, routesSchedule, newGeoData) => {
    var user = JSON.parse(localStorage.getItem('authUser'))
    let details = {
      loginUser: user.username,
      dateTime: new Date().toDateString().replace(/-/g, '/'),
      type: '',
    }
    this.setState({ loader: true, loaderText: 'Loading please wait...' })
    let vehStarttime = splitTimeAndConv2Sec(trip?.vehicleObject?.starttime)
    let vehLoadingHrs = convertHrToSec(trip?.vehicleObject?.startdepots)
    let tripStartTime = secondsToHms(vehStarttime + vehLoadingHrs)
    if (
      (trip.timelineInterval != undefined &&
        trip.timelineInterval.length > 0) ||
      route === 'unlock' ||
      route === 'loaderMsg' ||
      route === 'ForceSeq' ||
      route === 'Open' ||
      route === 'OpenwithMaps'
    ) {
      trip.xusrcode = user?.username
      // trip.site = this.state.selectedSite.id;
      this.setState({ selectedSite: trip.site })
      this.setState({ selectedSiteValue: trip.site })
      var today = new Date()
      var execdate = today.getDate()
      var hr = today.getHours()
      if (hr <= 9) {
        hr = '0' + hr
      }
      var min = today.getMinutes()
      if (min <= 9) {
        min = '0' + min
      }
      var time = hr + ':' + min
      trip.heuexec = time
      if (route === 'route') {
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
        trip.datexec = today
        trip.date = moment.tz(this.state.date, '').format('YYYY-MM-DD')
        //trip.date = this.state.date;
        trip.drops = trip.totalObject.selectedTripData.length
        trip.startTime = routesSchedule.startTime
        trip.endTime = routesSchedule.endTime
        trip.startDate = routesSchedule.startDate
        trip.endDate = routesSchedule.endDate
        trip.travelTime = routesSchedule.tripData.tripTravelTime
        trip.serviceTime = routesSchedule.tripData.tripTotalServiceTime
        trip.totalTime = routesSchedule.tripData.tripTotalTime
        trip.totalDistance = routesSchedule.tripData.totalDistance
        trip.route = true
        trip.fixedCost = routesSchedule.cost.fixedCost
        trip.totalCost = routesSchedule.cost.totalCost
        trip.distanceCost = routesSchedule.cost.distanceCost
        trip.regularCost = routesSchedule.cost.Regularcost
        trip.overtimeCost = routesSchedule.cost.overtimecost
        trip.timeCost = routesSchedule.cost.timeCost
        trip.optistatus = 'Optimized'
        if (trip.generatedBy === 'AutoScheduler') {
          trip.generatedBy = 'Auto_MO_Scheduler'
        }
        else {
          trip.generatedBy = 'MScheduler'
        }
        trip.uomTime = 'Hr'
        trip.uomDistance = 'Kms'
        trip.route = true
      } else if (route === 'unlock') {
        trip.lock = false
        trip.lockP = true
        trip.date = moment.tz(this.state.date, '').format('YYYY-MM-DD')
        trip.route = true
      } else if (route === 'loaderMsg' || route === 'ForceSeq') {
        // trip.loaderInfo =
        trip.date = moment.tz(this.state.date, '').format('YYYY-MM-DD')
        trip.route = false
      } else {
        trip.date = moment.tz(this.state.date, '').format('YYYY-MM-DD')
        trip.endDate = ''
        trip.optistatus = 'Open'
        if (trip.generatedBy && trip.generatedBy.includes('Auto')) {
          trip.generatedBy = 'AutoScheduler';
        } else {
          trip.generatedBy = 'MScheduler';
        }
        trip.route = false
        trip.startTime = tripStartTime
      }
      var totalWeight = 0
      var totalVolume = 0
      var weight = ''
      var volume = ''

      if (trip?.pickupObject?.length > 0) {
        for (var i = 0; i < trip?.pickupObject.length; i++) {
          totalWeight =
            totalWeight + parseFloat(trip?.pickupObject[i].netweight)
          totalVolume = totalVolume + parseFloat(trip?.pickupObject[i].volume)
          if (weight == '') {
            weight = trip.pickupObject[i]?.weightunit
          }
          if (volume == '') {
            volume = trip.pickupObject[i]?.volume_unit
          }
        }
      }

      if (trip?.dropObject?.length > 0) {
        for (var i = 0; i < trip.dropObject.length; i++) {
          totalWeight = totalWeight + parseFloat(trip.dropObject[i].netweight)
          totalVolume = totalVolume + parseFloat(trip.dropObject[i].volume)
          if (weight == '') {
            weight = trip.dropObject[i].weightunit
          }
          if (volume == '') {
            volume = trip.dropObject[i].volume_unit
          }
        }
      }

      var percentageMass = 0
      var percentageVolume = 0

      if (totalWeight > 0) {
        percentageMass = (
          (parseFloat(totalWeight) / parseFloat(trip.capacities)) *
          100
        ).toFixed(2)
      }

      if (totalVolume > 0) {
        percentageVolume = (
          (parseFloat(totalVolume) / parseFloat(trip.vehicleObject.vol)) *
          100
        ).toFixed(2)
      }

      trip.weightPercentage = percentageMass
      trip.volumePercentage = percentageVolume
      trip.totalWeight = totalWeight.toFixed(2) + ' ' + weight
      trip.totalVolume = totalVolume.toFixed(2) + ' ' + volume
      var itemTrips = []
      this.refreshTrips()
      var itemTrip = {}

      if (route === 'unlock' || route === 'loaderMsg' || route === 'ForceSeq') {
        itemTrips.push(trip)
      }
      else if (route === 'OpenwithMaps') {

        const temptimelineInterval = []

        const startTime = this.resolveStartTime(trip)
        const documentCount = trip.totalObject.selectedTripData.length

        // start time
        temptimelineInterval.push({
          value: 0,
          label: startTime,
        })

        // documents + end time
        for (let i = 1; i <= documentCount + 1; i++) {
          temptimelineInterval.push({
            value: i * 12,
            label: this.addMinutes(startTime, i * 10),
          })
        }

        trip.totalObject.timelineInterval = temptimelineInterval



        itemTrips.push(trip)
      }
      else {
        if (route === 'route') {
          if (routesSchedule) {
            while (
              this.state.tripsPanel[this.state.selectedIndex].timelineInterval
                .length > 0
            ) {
              this.state.tripsPanel[
                this.state.selectedIndex
              ].timelineInterval.pop()
            }
            this.state.tripsPanel[
              this.state.selectedIndex
            ].timelineInterval.push({
              value: 0,
              label: routesSchedule.startTime,
            })
            routesSchedule.routesData.map((data, index) => {
              let values
              values = (index + 1) * 12
              this.state.tripsPanel[
                this.state.selectedIndex
              ].timelineInterval.push({ value: values, label: data.end })
            })
          }
          itemTrip.timelineInterval =
            this.state.tripsPanel[this.state.selectedIndex].timelineInterval
          itemTrip.selectedTripData = newGeoData
        } else {
          var tempslectedTrips = []
          for (var l = 0; l < this.state.slectedTrips.length; l++) {
            var tempDoc = this.state.slectedTrips[l]
            tempDoc.vehicleCode = trip.code
            tempslectedTrips.push(tempDoc)
          }
          itemTrip.selectedTripData = tempslectedTrips
          itemTrip.timelineInterval = trip.timelineInterval
        }
        itemTrip.equipments = this.state.equipments
        itemTrip.trailers = this.state.trailers
        itemTrip.quantities = this.state.quantities
        if (
          this.state.tripsPanel &&
          this.state.tripsPanel[this.state.selectedIndex] &&
          this.state.tripsPanel[this.state.selectedIndex].totalObject &&
          this.state.tripsPanel[this.state.selectedIndex].totalObject.logData
        ) {
          itemTrip.logData =
            this.state.tripsPanel[this.state.selectedIndex].totalObject.logData
        } else {
          itemTrip.logData = []
        }

        trip.totalObject = itemTrip
        if (this.state.reorder) {
          trip.reorder = this.state.reorder
        } else {
          trip.reorder = false
        }

        this.setState({ reorder: false })
        itemTrips.push(trip)
        if (
          this.state.docType &&
          this.state.docType.length > 0 &&
          this.state.deletedVehicleCode &&
          this.state.deletedVehicleCode.length > 0
        ) {
          let tripPanel = this.state.tripsPanel
          tripPanel.map((trip) => {
            if (trip.code === this.state.deletedVehicleCode) {
              trip.optistatus = null
            }
          })
          this.setState({ tripsPanel: tripPanel })
          this.setState({ docType: '' })
          this.setState({ deletedVehicleCode: '' })
        }
      }
      var user = JSON.parse(localStorage.getItem('authUser'))
      let details = {
        loginUser: user.username,
        dateTime: new Date().toDateString().replace(/-/g, '/'),
        type: '',
      }

      if (
        itemTrips[0].totalObject.logData &&
        itemTrips[0].totalObject.logData.length > 0
      ) {
        if (route && route.length > 0) {
          details.type = route
        } else {
          details.type = 'modify'
        }
        itemTrips[0].totalObject.logData.push(details)
      } else {
        itemTrips[0].totalObject.logData = []
        details.type = 'create'
        itemTrips[0].totalObject.logData.push(details)
      }

      this.submitTrips(itemTrips)
      var currDropsPanel = this.state.dropsPanel
      var drops = currDropsPanel.drops
      var pickUps = currDropsPanel.pickUps

      for (var i = 0; i < trip.dropObject.length; i++) {
        for (var j = 0; j < drops.length; j++) {
          if (trip.dropObject[i].docnum === drops[j].docnum) {
            drops[j].vehicleCode = trip.code
            drops[j].type = 'Allocated'
          }
        }
      }

      for (var i = 0; i < trip.pickupObject.length; i++) {
        for (var j = 0; j < pickUps.length; j++) {
          if (trip.pickupObject[i].docnum === pickUps[j].docnum) {
            pickUps[j].vehicleCode = trip.code
            pickUps[j].type = 'Allocated'
          }
        }
      }

      currDropsPanel.drops = drops
      currDropsPanel.pickUps = pickUps
    } else {
      this.handleDateChange(this.state.date)
      this.notifyError('Vehicle is mandatory')
    }
  }

  refreshTrips = () => {
    this.updateGeoLocations()
    this.removeTrips()
  }

  filterTrans_depSite = (site) => {
    this.setState({ deliverySite: site })
  }

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
    var elements = document.getElementsByName('docNum')
    var docElements = []
    var currTripsLine = this.state.slectedTrips
    var tripColor = [
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
    ]
    for (var k = 0; k < currTripsLine.length; k++) {
      if (currTripsLine[k].docnum == undefined) {
        docElements.push(currTripsLine[k])
      }
    }
    for (var i = 0; i < elements.length; i++) {
      for (var j = 0; j < currTripsLine.length; j++) {
        if (elements[i].innerText === currTripsLine[j].docnum) {
          docElements.push(currTripsLine[j])
          if (currTripsLine[j].panelType === 'drop') {
            tripColor[docElements.length - 1] = '#7ace4c'
          } else if (currTripsLine[j].panelType === 'pickup') {
            tripColor[docElements.length - 1] = '#09aaed'
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
    })
  }

  changeDate = (day, dayflag, from) => {

    var flagconsider = false
    if (from == 'checked') {
      flagconsider = dayflag
    } else if (from == 'buttons') {
      flagconsider = this.state.checked5days
    }
    var currDate = moment(this.state.dropDate).add(day, 'days')
    var newDate = moment(currDate).format('YYYY-MM-DD')
    var sdate = moment(currDate).add(-5, 'days')
    var edate = moment(currDate).add(5, 'days')
    var newStartDate = moment(sdate).format('YYYY-MM-DD')
    var newEndDate = moment(edate).format('YYYY-MM-DD')

    if (flagconsider) {
      fetchDropsPanelwithRange(
        this.state.selectedMultipleSites,
        newStartDate,
        newEndDate
      )
        .then(([res1]) => {
          var dropsP = res1
          // this.filterDropsDiv(newDate, dropsP);
          this.setState({
            dropDate: new Date(newDate.replace(/-/g, '/')).toDateString(),
            dropsPanel: dropsP,
          })
          if (day == 0 && from !== 'deleteTrip') {
            this.notifySucess('Documents Refreshed Successfully')
          }
        })
        .catch((error) => { })
    } else {

      fetchDropsPanel(this.state.selectedMultipleSites, newDate)
        .then(([res1]) => {
          var dropsP = res1
          // this.filterDropsDiv(newDate, dropsP);
          this.setState({
            dropDate: new Date(newDate.replace(/-/g, '/')).toDateString(),
            dropsPanel: dropsP,
          })
          if (day == 0 && from !== 'deleteTrip') {
            this.notifySucess('Documents Refreshed Successfully')
          }
        })
        .catch((error) => { })
    }
  }

  checked5days = (checked) => {
    this.setState({ checked5days: checked })
    this.changeDate(0, checked, 'checked')
  }

  filterDropsDiv = (day, dropsPanel) => {
    var currDate = moment.tz(this.state.date).format('YYYY-MM-DD')
    var status = false
    if (currDate > day) {
      status = true
    } else if (currDate < day) {
      status = true
    } else {
      status = true
    }

    if (status) {
      var trips = this.state.slectedTrips
      for (var i = 0; i < dropsPanel.drops.length; i++) {
        for (var j = 0; j < trips.length; j++) {
          if (trips[j].docnum == dropsPanel.drops[i].docnum) {
            dropsPanel.drops[i].type = 'selected'
            dropsPanel.drops[i].vehicleCode = trips[j].vehicleCode
          }
        }
      }
      for (var i = 0; i < dropsPanel.pickUps.length; i++) {
        for (var j = 0; j < trips.length; j++) {
          if (trips[j].docnum == dropsPanel.pickUps[i].docnum) {
            dropsPanel.pickUps[i].type = 'selected'
            dropsPanel.pickUps[i].vehicleCode = trips[j].vehicleCode
          }
        }
      }
    }
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  checkedToPlan = (checked) => {
    this.setState({ checkedToPlan: checked })
  }

  checkedDeliverables = (checked) => {
    this.setState({ checkedDeliverables: checked })
  }

  checkedInProcess = (checked) => {
    this.setState({ checkedInProcess: checked })
  }

  updateTopBar = () => {
    var trips = this.state.tripsPanel
    var vehicleList = []
    var routesCount = 0
    var Drop_prodCount = 0
    var Pickup_prodCount = 0
    var assignedOrders = 0
    var unassignedOrders = 0
    for (var i = 0; i < trips.length; i++) {
      if (!vehicleList.includes(trips[i].code)) {
        vehicleList.push(trips[i].code)
      }
      routesCount += 1
    }
    for (var i = 0; i < trips.length; i++) {
      var dropobj = []
      var pickupobj = []

      if (null !== trips[i].dropObject) {
        for (var j = 0; j < trips[i].dropObject.length; j++) {
          for (var k = 0; k < trips[i].dropObject[j].products.length; k++) {
            Drop_prodCount += parseInt(
              trips[i].dropObject[j].products[k].quantity
            )
          }
        }
      }

      if (null !== trips[i].pickupObject) {
        for (var j = 0; j < trips[i].pickupObject.length; j++) {
          for (var k = 0; k < trips[i].pickupObject[j].products.length; k++) {
            Pickup_prodCount += parseInt(
              trips[i].pickupObject[j].products[k].quantity
            )
          }
        }
      }
    }

    var drops = this.state.dropsPanel.drops
    var pickups = this.state.dropsPanel.pickUps
    for (var j = 0; j < drops.length; j++) {
      if (drops[j].dlvystatus != '8') {
        assignedOrders += 1
      } else {
        unassignedOrders += 1
      }
    }
    for (var k = 0; k < pickups.length; k++) {
      if (pickups[k].dlvystatus != '8') {
        assignedOrders += 1
      } else {
        unassignedOrders += 1
      }
    }
    unassignedOrders =
      this.state.dropsPanel.drops.length +
      this.state.dropsPanel.pickUps.length -
      assignedOrders
    var topDetails = {}
    topDetails.vehicleCount = vehicleList.length
    topDetails.routesCount = routesCount
    topDetails.assignedOrders = assignedOrders
    topDetails.unassignedOrders = unassignedOrders
    topDetails.travelTime = 0
    topDetails.serviceTime = 0

    topDetails.DropProdCount = Drop_prodCount
    topDetails.PickupProdCount = Pickup_prodCount
    this.setState({
      topDetails: topDetails,
    })

    // this.updateTripsGeoLocations(this.state.selectedTripIndex);
  }

  handleMulti = (sites) => {
    this.setState({ sites })
  }

  handleDefault(date) {
    this.setState({
      default_date: date,
      date: date,
      docsStartDate: date,
      docsEndDate: date,
    })
  }

  onMarkerClick(props, marker, e) {
    alert('You clicked in this marker')
  }

  Timeline_SelectedSite = () => {
    let optionItems = []
    var optionSelected = {}
    var selectedSite = {}
    var placeHolder = 'All'
    this.state.sites &&
      this.state.sites.length > 0 &&
      this.state.sites.map((site) => {
        if (site.id == this.state.selectedSite) {
          selectedSite = site
          placeHolder = site.value
          optionSelected.value = site.id
          optionSelected.label = site.value + '(' + site.id + ')'
        }
        optionItems.push({
          value: site.id,
          label: site.value + '(' + site.id + ')',
        })
      })
  }

  setCurrentSite = (selectedOption) => {
    var currSelected = {}
    this.state.sites &&
      this.state.sites.map((site) => {
        if (selectedOption[0] === site.id) {
          currSelected = site
          currSelected.city = site.value
        }
      })
    this.setState({
      selectedSite: currSelected,
      selectedMultipleSites: selectedOption,
    })
  }

  refreshAllPanels = () => {
    const emptyTrip = []
    this.setState({
      loader: true,
      selectedDocuments: [],
      trips: emptyTrip,
      selectedCheckBoxes: [],
    })
    this.handleDateChange(this.state.date)
  }

  onGridReady(params) {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    var timeLineContainer = document.querySelector('.timeline-container')
    var dropZone = {
      getContainer: function () {
        return timeLineContainer
      },
      onDragStop: function (params) {
        const el = document.querySelector('.timeline-data')
        el.classList.remove('d-none')
        // var el = document.createElement("div");
        // el.classList.add("tile");
        // el.innerHTML =
        //   '<div class="id">' + params.node.data.vehicle_code + "</div>";
        // timeLineContainer.appendChild(el);
      },
    }
    params.api.addRowDropZone(dropZone)
  }

  sitesArr = (val) => {
    this.setCurrentSite(val)
    this.setState({ selectedSitesArr: val })
  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('authUser'))
    const currDate = moment
      .tz(new Date().toDateString().replace(/-/g, '/'))
      .format('YYYY-MM-DD')
    Promise.all([
      fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/usrsites?user=` +
        user.username
      ),
    ])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      })
      .then(([res1]) => {
        this.setState({
          sites: res1,
        })

        setTimeout(() => {
          document.getElementsByName('tripsCheckBox').forEach((checkbox) => {
            checkbox.checked = false
          })
        }, 100)
      })
  }

  updateSelectedSite = (siteId) => {
    var curSites = this.state.sites
    for (var i = 0; i < curSites.length; i++) {
      if (curSites[i].id == siteId) {
        this.setState({ selectedSite: curSites[i] })
      }
    }
  }

  handleSiteChange = (selectedOption) => {
    this.setState({ loader: true, loaderText: 'Loading please wait...' })
    this.setCurrentSite(selectedOption)
    const currDate = moment.tz(this.state.date, '').format('YYYY-MM-DD')
    fetchAPI(selectedOption, currDate)
      .then(([res1, res2, res3, res4]) => {
        this.setState({
          vehiclePanel: res1,
          deliverySite: '',
          updatedArrSite: '',
          searchTripString: '',
          dropsPanel: res2,
          tripsPanel: res3,
          RouteCode: res4,
          loader: false,
          selectedCheckBoxes: [],
          selectedTripStatuses: [],
        })
      })
      .then(() => {
        this.updateTopBar()
        this.refreshSite()
      })
      .catch((error) => { })
  }

  refreshSite = () => {
    this.updateGeoLocations()
    this.enableDroppedDiv()
    this.removeTrips()
  }

  updateGeoLocations = () => {
    this.removeMarkers()
    this.setState({
      mapChanged: true,
    })
  }

  removeMarkers = () => {
    this.setState(
      {
        markers: [],
        geoData: [],
      },
      this.addStateMarker
    )
  }

  addStateMarker = () => {
    if (this.state.selectedSite.lat != undefined) {
      let currMarkers
      if (this.state.markers.length > 0) {
        currMarkers = this.state.markers
      } else {
        currMarkers = []
        currMarkers.push(this.state.selectedSite)

        let currDropsList = this.state.dropsPanel.drops
        let currPickupsList = this.state.dropsPanel.pickUps

        /*
        for (let di = 0; di < currDropsList.length; di++) {
          if (
            currDropsList[di].dlvystatus === '0' ||
            currDropsList[di].dlvystatus === '8'
          ) {
            currDropsList[di].panelType = 'drop'
            currMarkers.push(currDropsList[di])
          }
        }

        for (let pi = 0; pi < currPickupsList.length; pi++) {
          if (
            currPickupsList[pi].dlvystatus === '0' ||
            currPickupsList[pi].dlvystatus === '8'
          ) {
            currPickupsList[pi].panelType = 'pickup'
            currMarkers.push(currPickupsList[pi])
          }
        }
        */
      }
      this.setState({
        markers: currMarkers,
        mapChanged: true,
      })
    }
  }

  removeGeoMarkers = () => {
    var currMarkers = []
    this.setState({
      geoMarkers: currMarkers,
    })
  }

  addUpdateType = () => {
    this.setState({
      updatetypeTrip: true,
    })
  }

  addGeoLocations = (geoObj) => {
    const currMarkers = this.state.markers
    currMarkers.push(geoObj)
    // currMarkers = this.startAndEndDeport(currMarkers, this.state.trips[0])
    this.setState({
      markers: currMarkers,
      mapChanged: true,
    })
  }

  addGeoList = (geoData, index) => {
    const currData = this.state.geoData
    currData.push(geoData)
    var selectedTrips = this.state.slectedTrips
    selectedTrips.push(geoData)
    var tripColor = this.state.tripColor

    if (geoData.panelType === 'drop') {
      tripColor[index - 1] = '#7ace4c'
    } else {
      tripColor[index - 1] = '#09aaed'
    }

    this.setState({
      geoData: currData,
      tripColor: tripColor,
      selectedTripData: geoData,
      slectedTrips: selectedTrips,
      left: index * 55,
    })
  }

  addSelectedTrips = (count) => {
    var slctTrips = this.state.slectedTrips
    var emptyTrip = {}
    for (var i = 0; i < count; i++) {
      slctTrips.push(emptyTrip)
    }
    this.setState({
      slectedTrips: slctTrips,
      left: count,
    })
  }




  handleSyncTrips = async () => {
    if (this.state.isSyncing) return;

    this.setState({ isSyncing: true });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/sync-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      // If HTTP failed
      if (!response.ok) {
        throw new Error(data?.message || "Sync data failed");
      }

      const processedRecords = Number(data?.processedRecords || 0);
      const status = data?.status;

      if (status === "SUCCESS") {
        if (processedRecords === 0) {
          toast.info("No data exist to synchronize", {
            position: "top-right",
            autoClose: 4000,
          });
        } else {
          toast.success(
            `${processedRecords} record(s) are synced from LVS to Route Planner`,
            {
              position: "top-right",
              autoClose: 4000,
            }
          );
        }
      } else {
        toast.error(data?.message || "Sync data failed", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      toast.error(error.message || "Sync data failed", {
        position: "top-right",
        autoClose: 4000,
      });
      console.error("Sync trips failed:", error);
    } finally {
      this.refreshAllPanels()
      this.setState({ isSyncing: false });
    }
  };



  handleDateChange = async (date) => {
    this.setState({ loader: true, loaderText: 'Loading please wait...' })
    const currDate = moment.tz(date, '').format('YYYY-MM-DD')

    let value = this.state.selectedMultipleSites
    await fetchAPI(value, currDate)
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
          deliverySite: '',
          trips: [],
          updatedArrSite: '',
          allowedDrivers: [],
          trailers: [],
          allAllowedDrivers: false,
          checked5days: false,
          vehicleDropped: false,
          trailerDropped: false,
          allowedTrailers: [],
          droppedTrailers: [],
          searchTripString: '',
          allAllowedTrailers: false,
          dropDate: currDate,
          vehiclePanel: res1,
          dropsPanel: res2,
          tripsPanel: res3,
          RouteCode: res4,
          loader: false,
          selectedCheckBoxes: [],
          selectedTripStatuses: [],
        })
      })
      .then(() => {
        this.updateTopBar()
        this.refreshSite()
        // this.updateTripsGeoLocations(this.state.selectedTripIndex)
      })
      .catch((error) => {
      })
  }

  onVRhide = () => {
    this.setState({
      vehicleShow: 'block',
      RouteoptiShow: 'none',
      vrShow: 'none',
    })
    // this.handleDateChange(this.state.date);
  }

  handleRouteCodeChange = (selectedRouteCodes) => {
    this.setCurrentRoutecode(selectedRouteCodes)
  }

  onVRClick = (i, tmsValidated) => {
    var tripsPanels = this.state.tripsPanel
    var selectedTrip = []
    var selectedTrips = []
    var trailers = []
    var selVR_num = tripsPanels[i].itemCode
    var ClickedVR = tripsPanels[i]

    var sel_Driver_name = tripsPanels[i].driverName
    //caling API

    fetchVR(selVR_num)
      .then(([res1, res2, res3]) => {
        this.setState({
          vrlist: res1,
          vrdetaillist: res2,
          loadvehstock: res3,
        })
      })
      .then(() => { })
      .catch((error) => {
        //  history.push('/');
      })
    if (this.state.markers && this.state.markers.length == 0) {
      this.state.sites.map((site) => {
        if (this.state.selectedSite === site.id) {
          let marker = []
          marker.push(site)
          this.setState({ markers: marker })
        }
      })
    }
    this.setState({
      clickedTrips: ClickedVR,
      selectedVrIndex: i,
      selectedVrValidated: tmsValidated,
      vehicleShow: 'none',
      RouteoptiShow: 'none',
      vrShow: 'block',
    })
  }

  /*
  updateTripsGeoLocations = (index , status) => {
   // var checkboxes = document.getElementsByName("tripsCheckBox");
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
      this.removeTrips();
//      checkboxes[index].checked = true;

      this.updateTripsPanel(currMarkers, currGeoData, index);
      this.setState({ selectedIndex: index, checkedTrip: true, RouteoptiShow:'block' })
    } else {
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
  updateSelectedTrip = (count) => {
    var selectedTrips = this.state.slectedTrips
    this.setState({
      selectedTripData: selectedTrips[count],
      left: (count + 1) * 55,
    })
  }

  // updateTripsPanel = (currMarkers, currGeoData, i) => {
  //   var tripsPanels = this.state.tripsPanel;
  //   var selectedTrip = [];
  //   var selectedTrips = [];
  //   var trailers = [];
  //   var equipments = [];
  //   var quantities = [];
  //   var gTrip = this.state.guageTrip;
  //   gTrip = tripsPanels[i];
  //   var slectTrip = tripsPanels[i].totalObject;
  //   tripsPanels[i].timelineInterval = slectTrip.timelineInterval;
  //   selectedTrips = slectTrip.selectedTripData;
  //   trailers = slectTrip.trailers;
  //   equipments = slectTrip.equipments;
  //   quantities = slectTrip.quantities;
  //   selectedTrip.push(tripsPanels[i]);
  //   /*
  //   for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
  //     tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
  //     tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
  //     currMarkers.push(tripsPanels[i].dropObject[j]);
  //   }
  //   for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
  //     tripsPanels[i].pickupObject[k].type = "pickup";
  //     tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode;
  //     tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock;
  //     currMarkers.push(tripsPanels[i].pickupObject[k]);
  //   }
  //   */

  //   let selectedDataforaTrip = tripsPanels[i].totalObject.selectedTripData;
  //   let VehicleColor = tripsPanels[i].vehicleObject.color;
  //   for (let tpl = 0; tpl < selectedDataforaTrip.length; tpl++) {
  //     let tempselectedDate = selectedDataforaTrip[tpl]
  //     if (tempselectedDate.doctype === 'PICK') {
  //       // tempselectedDate.itemCode = tripsPanels[i].itemCode;
  //       // currDropsList[di].panelType = 'drop';
  //       tempselectedDate.panelType = "drop";
  //       tempselectedDate.lock = tripsPanels[i].lock;
  //       tempselectedDate.VehicleColor = VehicleColor;
  //       tempselectedDate.itemCode = tripsPanels[i].itemCode;
  //       tempselectedDate.seq = tpl + 1;
  //       currMarkers.push(tempselectedDate);
  //       //  currGeoData.push(tempselectedDate);
  //     }
  //     else {
  //       tempselectedDate.panelType = "pickup";
  //       tempselectedDate.seq = tpl + 1;
  //       tempselectedDate.lock = tripsPanels[i].lock;
  //       tempselectedDate.itemCode = tripsPanels[i].itemCode;
  //       tempselectedDate.VehicleColor = VehicleColor;
  //       currMarkers.push(tempselectedDate);
  //       //     currGeoData.push(tempselectedDate);
  //     }
  //   }

  //   if (!tripsPanels[i].lock) {

  //     // assign to plan document to the list
  //     let currDropsList = this.state.dropsPanel.drops;
  //     let currPickupsList = this.state.dropsPanel.pickUps;

  //     for (let di = 0; di < currDropsList.length; di++) {

  //       if (currDropsList[di].dlvystatus === '0' || currDropsList[di].dlvystatus === '8') {
  //         currDropsList[di].panelType = 'drop';
  //         currMarkers.push(currDropsList[di])
  //       }
  //     }

  //     for (let pi = 0; pi < currPickupsList.length; pi++) {

  //       if (currPickupsList[pi].dlvystatus === '0' || currPickupsList[pi].dlvystatus === '8') {
  //         currPickupsList[pi].panelType = 'pickup';
  //         currMarkers.push(currPickupsList[pi])
  //       }
  //     }
  //   }

  //   this.updateSelectedTrip(selectedTrips.length);
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
  //   var tempSelectedDocs = [];
  //   for (var i = 0; i < selectedTrips.length; i++) {
  //     if (Object.keys(selectedTrips[i]).length != 0) {
  //       if (selectedTrips[i].panelType === "drop") {
  //         tripColor[i] = "#7ace4c";
  //       } else if (selectedTrips[i].panelType === "pickup") {
  //         tripColor[i] = "#09aaed";
  //       }
  //       currGeoData.push(selectedTrips[i]);
  //     }
  //   }
  //   this.setState({
  //     trips: selectedTrip,
  //     guageTrip: gTrip,
  //     tripColor: tripColor,
  //     selectedDocuments: tempSelectedDocs,
  //     slectedTrips: selectedTrips,
  //     selectedTripData: selectedTrips[count - 1],
  //     left: count * 55,
  //     trailers: trailers,
  //     equipments: equipments,
  //     quantities: quantities,
  //     geoData: currGeoData,
  //     markers: currMarkers,
  //     mapChanged: true,
  //     tripsChecked: selectedTrip,
  //   });
  // };

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
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
      ],
      slectedTrips: [],
    })
  }

  handleDragStart = (event, valueObj, type, index, id) => {
    if (type === 'vehicle') {
      const currDate = moment.tz(this.state.date, '').format('YYYY-MM-DD')
      const url =
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/prevtrpsite?veh=` +
        valueObj.codeyve +
        '&date=' +
        currDate
      fetch(url)
        .then(function (response) {
          return response.json()
        })
        .then((res) => {
          let endSite = ''
          if (res.arrSite && res.arrSite.length > 0) {
            endSite = res.arrSite
            this.setState({ updatedArrSite: endSite })
          } else {
            endSite = valueObj.startdepotn
            this.setState({ updatedArrSite: '' })
          }
          let latestMarkers = this.state.markers
          let currMarkers = []
          if (latestMarkers && latestMarkers.length > 0) {
            latestMarkers.map((marker) => {
              if (marker.panelType) {
                currMarkers.push(marker)
              }
            })
          }
          let arrivalSite = {}
          if (this.state.sites && this.state.sites.length > 0) {
            this.state.sites.map((site) => {
              if (site.id === endSite) {
                currMarkers.unshift(site)
              }
              if (site.id === valueObj.enddepotname) {
                arrivalSite.city = site.value
                arrivalSite.docnum = site.value
                arrivalSite.idd = site.id
                arrivalSite.lat = site.lat
                arrivalSite.lng = site.lng
                arrivalSite.value = site.value
                arrivalSite.arrivalCheck = 'arrival'
              }
            })
          }
          if (
            !(
              currMarkers[0].lat === arrivalSite.lat &&
              currMarkers[0].lng === arrivalSite.lng
            )
          ) {
            currMarkers.push(arrivalSite)
          }
          this.setState({
            markers: currMarkers,
            mapChanged: true,
            tripsChecked: [],
          })
        })
    }

    /*
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
    event.dataTransfer.setData('currentCard', JSON.stringify(valueObj))
    event.dataTransfer.setData('type', type)
    event.dataTransfer.setData('row-id', id)
    event.dataTransfer.setData('index', index)

  }

  enableDivs = (trails, type) => {
    let vPanel = this.state.vehiclePanel
    vPanel.trails.map((vTrial) => {
      trails.map((trail) => {
        if (trail.trailer === vTrial.trailer) {
          vTrial.type = 'open'
        }
      })
    })
    this.setState({ vehiclePanel: vPanel })
  }

  updateClearTripsFlag = () => {
    this.setState({
      clearTrips: false,
    })
  }

  handleArrSite = (siteLabel, type) => {
    let currMarkers = this.state.markers
    let arrivalSite = {}
    let depSite = {}
    if (currMarkers && currMarkers.length > 0) {
      currMarkers.map((marker) => {
        this.state.sites &&
          this.state.sites.map((site) => {
            if (type === 'end' && site.id === siteLabel) {
              if (marker.arrivalCheck === 'arrival') {
                let removeObjIndex = currMarkers.findIndex(
                  (data) => data.arrivalCheck === 'arrival'
                )
                currMarkers.splice(removeObjIndex, 1)
                arrivalSite.city = site.value
                arrivalSite.docnum = site.value
                arrivalSite.idd = site.id
                arrivalSite.lat = site.lat
                arrivalSite.lng = site.lng
                arrivalSite.value = site.value
                arrivalSite.arrivalCheck = 'arrival'
              } else {
                arrivalSite.city = site.value
                arrivalSite.docnum = site.value
                arrivalSite.idd = site.id
                arrivalSite.lat = site.lat
                arrivalSite.lng = site.lng
                arrivalSite.value = site.value
                arrivalSite.arrivalCheck = 'arrival'
              }
            }

            if (type === 'start' && site.id === siteLabel) {
              depSite.city = site.value
              depSite.docnum = site.value
              depSite.id = site.id
              depSite.lat = site.lat
              depSite.lng = site.lng
              depSite.value = site.value
            }
          })
      })
      if (
        type === 'end' &&
        !(
          currMarkers[0].lat === arrivalSite.lat &&
          currMarkers[0].lng === arrivalSite.lng
        )
      ) {
        if (Object.keys(arrivalSite).length > 0) {
          currMarkers.push(arrivalSite)
        }
      }
      if (
        type === 'start' &&
        !(
          currMarkers[0].lat === depSite.lat &&
          currMarkers[0].lng === depSite.lng
        )
      ) {
        if (Object.keys(depSite).length > 0) {
          currMarkers = []
          currMarkers.push(depSite)
        }
      }
    }
    this.setState({
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: [],
    })
  }

  updateResetTrip = (trip) => {
    this.setState({
      trips: trip,
      equipments: [],
    })
    this.removeMarkers()
  }

  dropResetObj = (trip) => {
    if (
      this.state.dropsPanel &&
      this.state.dropsPanel &&
      this.state.dropsPanel.drops.length > 0
    ) {
      let dropsPanel = this.state.dropsPanel
      var drops = dropsPanel.drops
      var pickUps = dropsPanel.pickUps
      drops.map((drop) => {
        if (trip.dropObj && trip.dropObj.length > 0) {
          trip.dropObj.map((dropOb) => {
            if (drop.docnum === dropOb.docnum) {
              drop.type = 'open'
            }
          })
        }
      })
      pickUps.map((pickUp) => {
        if (trip.pickupObject && trip.pickupObject.length > 0) {
          trip.pickupObject.map((pickOb) => {
            if (pickUp.docnum === pickOb.docnum) {
              pickUp.type = 'open'
            }
          })
        }
      })

      dropsPanel.drops = drops
      dropsPanel.pickUps = pickUps
      this.setState({ dropsPanel: dropsPanel })
    }
  }

  updateTrip = (trip) => {
    var SelectedDocs = []
    for (var j = 0; j < trip[0].dropObject.length; j++) {
      SelectedDocs.push(trip[0].dropObject[j].docnum)
    }
    for (var k = 0; k < trip[0].pickupObject.length; k++) {
      SelectedDocs.push(trip[0].pickupObject[k].docnum)
    }

    this.setState({
      trips: trip,
      selectedDocuments: SelectedDocs,
    })
    // this.removeMarkers();
  }

  updateTrialers = (trailer) => {
    this.setState({
      trailers: trailer,
    })
  }

  updateQuantities = (quantity) => {
    this.setState({
      quantities: quantity,
    })
  }

  updateEqupments = (equipment) => {
    this.setState({
      equipments: equipment,
    })
  }

  updateTripCount = () => {
    var tripCount = this.state.selectedTrips
    tripCount += 12
    this.setState({
      selectedTrips: tripCount,
    })
  }

  removeTrips = () => {
    this.clearAllCheckBoxes()
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
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
      ],
      slectedTrips: [],
    })
  }

  clearTrailers = () => {
    this.setState({
      trailers: [],
    })
  }

  clearEquipments = () => {
    this.setState({
      equipments: [],
      quantities: [],
    })
  }

  disableDroppedDiv = (divTag) => {
    var temp = '[row-id=' + divTag + ']'
    //  var htmlDiv = document.getElementById(divTag);
    var htmlDiv = document.querySelectorAll(temp)
    var { droppedDivs } = this.state
    droppedDivs.push(temp)
    this.setState({ droppedDivs })
  }

  enableDroppedDiv = () => {
    var currVehPanel = this.state.vehiclePanel
    var currDropsPanel = this.state.dropsPanel
    var vehicles = currVehPanel.vehicles
    var equipments = currVehPanel.equipments
    var drivers = currVehPanel.drivers
    var trails = currVehPanel.trails
    var drops = currDropsPanel.drops
    var pickUps = currDropsPanel.pickUps

    for (var i = 0; i < vehicles.length; i++) {
      if (vehicles[i].isDropped) {
        vehicles[i].type = 'open'
      }
    }
    for (var i = 0; i < equipments.length; i++) {
      if (equipments[i].isDropped) {
        equipments[i].type = 'open'
      }
    }
    for (var i = 0; i < drivers.length; i++) {
      if (drivers[i].isDropped) {
        drivers[i].type = 'open'
      }
    }
    for (var i = 0; i < trails.length; i++) {
      if (trails[i].isDropped) {
        trails[i].type = 'open'
      }
    }
    currVehPanel.vehicles = vehicles
    currVehPanel.equipments = equipments
    currVehPanel.drivers = drivers
    currVehPanel.trails = trails

    for (var i = 0; i < drops.length; i++) {
      if (drops[i].isDropped && drops[i].type != 'Allocated') {
        drops[i].type = 'open'
      }
    }
    for (var i = 0; i < pickUps.length; i++) {
      if (pickUps[i].isDropped && pickUps[i].type != 'Allocated') {
        pickUps[i].type = 'open'
      }
    }

    currDropsPanel.drops = drops
    currDropsPanel.pickUps = pickUps

    this.setState({
      vehiclePanel: currVehPanel,
      dropsPanel: currDropsPanel,
    })
  }

  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  }

  updateTripValue = (count, tripData) => {
    var currLeft = this.state.left
    var tripColor = this.state.tripColor
    if (tripData.panelType === 'drop') {
      tripColor[count] = '#7ace4c'
    } else {
      tripColor[count] = '#09aaed'
    }
    var currSlectedTrips = this.state.slectedTrips
    currSlectedTrips.push(tripData)
    setTimeout(() => {
      this.setState({
        left: currLeft + 55,
        tripColor: tripColor,
        selectedTripData: tripData,
        slectedTrips: currSlectedTrips,
      })
    }, 10)
  }

  updateSelectedTrip = (count) => {
    var selectedTrips = this.state.slectedTrips
    this.setState({
      selectedTripData: selectedTrips[count],
      left: (count + 1) * 55,
    })
  }

  onValidateAll = () => {
    this.setState({ loader: true, loaderText: 'Loading please wait...' })
    var tripsPanel = this.state.tripsPanel
    var ValidateTrips = []
    var Validatecount = 0
    for (let i = 0; i < tripsPanel.length; i++) {
      var trip = tripsPanel[i]
      if (trip.lock && !trip.tmsValidated) {
        Validatecount = Validatecount + 1
        ValidateTrips.push(trip)
      }
    }
    if (Validatecount > 0) {
      fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/groupvalidate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ValidateTrips),
        }
      )
        .then((response) => {
          this.handleErrors(response)
        })
        .then(function (response) { })
        .then(() => {
          this.handleDateChange(this.state.date)
        })
        .then(() => {
          this.setState({ loader: false })
          this.notifySucess('Trips Validated Sucessfully')
        })
        .catch((error) => {
          this.handleDateChange(this.state.date)
          this.setState({ loader: false })
          this.notifyError("Can't validate the Trips")
        })
    } else {
      this.setState({
        loader: false,
        errorMessage: 'There are no trips available for validation.',
        addAlertShow: true,
      })
    }
  }

  validate = (i) => {
    this.setState({ loader: true, loaderText: 'Loading please wait...' })
    var tripsPanels = this.state.tripsPanel
    var ClickedTrip = tripsPanels[i]
    let trips = ClickedTrip
    fetch(`${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        this.handleErrors(response)
      })
      .then(function (response) { })
      .then(() => {
        this.handleDateChange(this.state.date)
      })
      .then(() => {
        this.updateMaprelatedstuff(i)
      })
      .then(() => {
        this.setState({ laoder: false })
        this.notifySucess('Trip Validated Sucessfully')
        // call vrClick functionality
      })
      .catch((error) => {
        this.handleDateChange(this.state.date)
        this.setState({ loader: false })
        this.notifyError("Can't validate the Trip")
      })
  }

  validateonly = (i, pageType) => {
    this.setState({ loader: true, loaderText: 'Loading please wait...' })
    var tripsPanels = this.state.tripsPanel
    var ClickedTrip = tripsPanels[i]
    let trips = ClickedTrip
    fetch(`${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        this.handleErrors(response)
      })
      .then(() => {
        this.setState({ loader: false })
        this.notifySucess('Trip Validated Sucessfully')
        // call vrClick functionality
        if (pageType === 'vrHeader') {
          var tripsPanels = this.state.tripsPanel
          var selVR_num = tripsPanels[i].itemCode
          fetchLVS(selVR_num)
            .then(([res1]) => {
              this.setState({
                loadvehstock: res1,
              })
            })
            .then(() => {
              this.setState({ selectedVrValidated: true })
            })
            .catch((error) => {
              // history.push('/');
            })
        }
      })
      .catch((error) => {
        this.handleDateChange(this.state.date)
        this.setState({ loader: false })
        this.notifyError("Can't validate the Trip")
      })
  }

  updateMaprelatedstuff(index) {
    const currMarkers = []
    const currGeoData = []
    if (typeof this.state.selectedSite === 'string') {
      if (this.state.sites.length > 0) {
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers.push(site)
          }
        })
      }
    } else if (this.state.selectedSite.lat != undefined) {
      currMarkers.push(this.state.selectedSite)
    }
    this.removeTrips()
    this.updateTripsPanel(currMarkers, currGeoData, index)
  }

  updateTripsGeolocationbeforelock = (index) => {
    const currMarkers_bl = []
    const currGeoData_bl = []
    if (typeof this.state.selectedSite === 'string') {
      if (this.state.sites.length > 0) {
        this.state.sites.map((site) => {
          if (site.id === this.state.selectedSite) {
            currMarkers_bl.push(site)
          }
        })
      }
    } else if (this.state.selectedSite.lat != undefined) {
      currMarkers_bl.push(this.state.selectedSite)
    }
    this.updateTripsPanel_beforeLocking(currMarkers_bl, index)
  }

  // updateTripsGeoLocations = (index, from) => {
  //  // this.setState({selectedTripIndex: index})
  //   var checkboxes = document.getElementsByName("tripsCheckBox");
  //   const currMarkers = [];
  //   const currGeoData = [];
  //   if (typeof this.state.selectedSite === "string") {
  //     if (this.state.sites.length > 0) {
  //       this.state.sites.map((site) => {
  //         if (site.id === this.state.selectedSite) {
  //           currMarkers.push(site);
  //         }
  //       });
  //     }
  //   } else if (this.state.selectedSite.lat != undefined) {
  //     currMarkers.push(this.state.selectedSite);
  //   }

  //   //to assign to plan documents to the maps

  //   if (checkboxes[index]?.checked || from === 'map') {
  //     this.removeTrips();
  //     checkboxes[index].checked = true;
  //     this.updateTripsPanel(currMarkers, currGeoData, index);
  //     this.setState({ selectedIndex: index, checkedTrip: true });
  //   } else {
  //     this.removeTrips();
  //     let marker = [];
  //     marker.push(currMarkers[0]);
  //     this.setState({
  //       markers: marker,
  //       mapChanged: true,
  //       geoData: currGeoData,
  //       tripsChecked: [],
  //       checkedTrip: false,
  //     });
  //   }
  // };

  ResetUpdateTrip() {
    const currMarkers = []
    const currGeoData = []
    this.setState({
      markers: currMarkers,
      geoData: currGeoData,
      trailers: [],
      equipments: [],
      quantities: [],
      left: 0,
      selectedTripData: {},
      tripColor: [
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
        '#e0e0e0',
      ],
      slectedTrips: [],
    })
  }

  updateTripsPanel_beforeLocking(currMarkers_bl, i) {
    var tripsPanels = this.state.tripsPanel
    var tripsList_bl = tripsPanels[i]
    var slectTrip_bl = tripsPanels[i].totalObject
    var selectedTrip_bl = slectTrip_bl.selectedTripData
    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode
      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock
      currMarkers_bl.push(tripsPanels[i].dropObject[j])
    }
    for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
      tripsPanels[i].pickupObject[k].type = 'pickup'
      tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode
      tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock
      currMarkers_bl.push(tripsPanels[i].pickupObject[k])
    }
    this.setState({
      clickedTrips: tripsList_bl,
      bl_tripsList: tripsList_bl,
      bl_selectedTripData: selectedTrip_bl,
      bl_markers: currMarkers_bl,
      triplock: false,
      vehicleShow: 'none',
      RouteoptiShow: 'none',
      vrShow: 'block',
    })
  }

  updateTripsPanel = (currMarkers, currGeoData, index) => {

    let tripsPanels = this.state.tripsPanel
    let selectedTrip = []
    let selectedTrips = []
    let trailers = []
    let equipments = []
    let quantities = []

    // Update gauge trip
    let gTrip = tripsPanels[index]
    const selectedTripObject = tripsPanels[index].totalObject
    tripsPanels[index].timelineInterval = selectedTripObject.timelineInterval
    selectedTrips = selectedTripObject.selectedTripData
    trailers = selectedTripObject.trailers
    equipments = selectedTripObject.equipments
    quantities = selectedTripObject.quantities
    selectedTrip.push(tripsPanels[index])

    // Add selected trip data to markers
    const VehicleColor = tripsPanels[index].vehicleObject.color
    selectedTripObject.selectedTripData.forEach((tripItem, tplIndex) => {
      tripItem.seq = tplIndex + 1
      tripItem.itemCode = tripsPanels[index].itemCode
      tripItem.lock = tripsPanels[index].lock
      tripItem.VehicleColor = VehicleColor
      tripItem.panelType = tripItem.doctype === 'PICK' ? 'drop' : 'pickup'

      // Prevent duplicates in currMarkers
      if (!currMarkers.some((m) => m.docnum === tripItem.docnum)) {
        currMarkers.push(tripItem)
      }
    })

    // Add unassigned drops/pickups if trip is not locked
    if (!tripsPanels[index].lock) {
      const currDropsList = this.state.dropsPanel.drops
      const currPickupsList = this.state.dropsPanel.pickUps

      currDropsList.forEach((dropItem) => {
        if (dropItem.dlvystatus === '0' || dropItem.dlvystatus === '8') {
          dropItem.panelType = 'drop'
          if (!currMarkers.some((m) => m.docnum === dropItem.docnum)) {
            currMarkers.push(dropItem)
          }
        }
      })

      currPickupsList.forEach((pickupItem) => {
        if (pickupItem.dlvystatus === '0' || pickupItem.dlvystatus === '8') {
          pickupItem.panelType = 'pickup'
          if (!currMarkers.some((m) => m.docnum === pickupItem.docnum)) {
            currMarkers.push(pickupItem)
          }
        }
      })
    }

    // Update selected trip count
    this.updateSelectedTrip(selectedTrips.length)

    // Set colors and geoData
    const tripColor = Array(9).fill('#e0e0e0')
    const selectedDocs = []
    selectedTrips.forEach((tripItem, idx) => {
      if (Object.keys(tripItem).length !== 0) {
        if (tripItem.panelType === 'drop') {
          selectedDocs.push(tripItem.docnum)
          tripColor[idx] = '#7ace4c'
        } else if (tripItem.panelType === 'pickup') {
          selectedDocs.push(tripItem.docnum)
          tripColor[idx] = '#09aaed'
        }

        // Prevent duplicates in currGeoData
        if (!currGeoData.some((g) => g.docnum === tripItem.docnum)) {
          currGeoData.push(tripItem)
        }
      }
    })

    // Update state
    this.setState({
      trips: selectedTrip,
      guageTrip: gTrip,
      tripColor: tripColor,
      selectedDocuments: selectedDocs,
      slectedTrips: selectedTrips,
      selectedTripData: selectedTrips[selectedTrips.length - 1],
      left: selectedTrips.length * 55,
      trailers: trailers,
      equipments: equipments,
      quantities: quantities,
      geoData: currGeoData,
      markers: currMarkers,
      mapChanged: true,
      tripsChecked: selectedTrip,
    })
  }

  // old one ramana added for the trips select and deselect.. but we got duplicates in it
  //  updateTripsPanel = (currMarkers, currGeoData, i) => {
  //
  //
  //    var tripsPanels = this.state.tripsPanel
  //    var selectedTrip = []
  //    var selectedTrips = []
  //    var trailers = []
  //    var equipments = []
  //    var quantities = []
  //    var gTrip = this.state.guageTrip
  //    gTrip = tripsPanels[i]
  //    var slectTrip = tripsPanels[i].totalObject
  //    tripsPanels[i].timelineInterval = slectTrip.timelineInterval
  //    selectedTrips = slectTrip.selectedTripData
  //    trailers = slectTrip.trailers
  //    equipments = slectTrip.equipments
  //    quantities = slectTrip.quantities
  //    selectedTrip.push(tripsPanels[i])
  //
  //    /*
  //    for (var j = 0; j < tripsPanels[i].dropObject.length; j++) {
  //      tripsPanels[i].dropObject[j].itemCode = tripsPanels[i].itemCode;
  //      tripsPanels[i].dropObject[j].lock = tripsPanels[i].lock;
  //      currMarkers.push(tripsPanels[i].dropObject[j]);
  //    }
  //    for (var k = 0; k < tripsPanels[i].pickupObject.length; k++) {
  //      tripsPanels[i].pickupObject[k].type = "pickup";
  //      tripsPanels[i].pickupObject[k].itemCode = tripsPanels[i].itemCode;
  //      tripsPanels[i].pickupObject[k].lock = tripsPanels[i].lock;
  //      currMarkers.push(tripsPanels[i].pickupObject[k]);
  //    }
  //    */
  //
  //    let selectedDataforaTrip = tripsPanels[i].totalObject.selectedTripData
  //    let VehicleColor = tripsPanels[i].vehicleObject.color
  //    for (let tpl = 0; tpl < selectedDataforaTrip.length; tpl++) {
  //      let tempselectedDate = selectedDataforaTrip[tpl]
  //      if (tempselectedDate.doctype === 'PICK') {
  //        // tempselectedDate.itemCode = tripsPanels[i].itemCode;
  //        // currDropsList[di].panelType = 'drop';
  //        tempselectedDate.panelType = 'drop'
  //        tempselectedDate.lock = tripsPanels[i].lock
  //        tempselectedDate.VehicleColor = VehicleColor
  //        tempselectedDate.itemCode = tripsPanels[i].itemCode
  //        tempselectedDate.seq = tpl + 1
  //        currMarkers.push(tempselectedDate)
  //        //  currGeoData.push(tempselectedDate);
  //      } else {
  //        tempselectedDate.panelType = 'pickup'
  //        tempselectedDate.seq = tpl + 1
  //        tempselectedDate.lock = tripsPanels[i].lock
  //        tempselectedDate.itemCode = tripsPanels[i].itemCode
  //        tempselectedDate.VehicleColor = VehicleColor
  //        currMarkers.push(tempselectedDate)
  //        //     currGeoData.push(tempselectedDate);
  //      }
  //    }
  //
  //    if (!tripsPanels[i].lock) {
  //      // add To Plan document to the trip as well
  //      let currDropsList = this.state.dropsPanel.drops
  //      let currPickupsList = this.state.dropsPanel.pickUps
  //
  //
  //      for (let di = 0; di < currDropsList.length; di++) {
  //        if (
  //          currDropsList[di].dlvystatus === '0' ||
  //          currDropsList[di].dlvystatus === '8'
  //        ) {
  //          currDropsList[di].panelType = 'drop'
  //          currMarkers.push(currDropsList[di])
  //        }
  //      }
  //
  //      for (let pi = 0; pi < currPickupsList.length; pi++) {
  //        if (
  //          currPickupsList[pi].dlvystatus === '0' ||
  //          currPickupsList[pi].dlvystatus === '8'
  //        ) {
  //          currPickupsList[pi].panelType = 'pickup'
  //          currMarkers.push(currPickupsList[pi])
  //        }
  //      }
  //    }
  //
  //    this.updateSelectedTrip(selectedTrips.length)
  //    var tripColor = [
  //      '#e0e0e0',
  //      '#e0e0e0',
  //      '#e0e0e0',
  //      '#e0e0e0',
  //      '#e0e0e0',
  //      '#e0e0e0',
  //      '#e0e0e0',
  //      '#e0e0e0',
  //      '#e0e0e0',
  //    ]
  //    var count = selectedTrips.length
  //    var selectedDocs = []
  //    for (var i = 0; i < selectedTrips.length; i++) {
  //      if (Object.keys(selectedTrips[i]).length != 0) {
  //        if (selectedTrips[i].panelType === 'drop') {
  //          selectedDocs.push(selectedTrips[i].docnum)
  //          tripColor[i] = '#7ace4c'
  //        } else if (selectedTrips[i].panelType === 'pickup') {
  //          selectedDocs.push(selectedTrips[i].docnum)
  //          tripColor[i] = '#09aaed'
  //        }
  //        currGeoData.push(selectedTrips[i])
  //      }
  //    }
  //    this.setState({
  //      trips: selectedTrip,
  //      guageTrip: gTrip,
  //      tripColor: tripColor,
  //      selectedDocuments: selectedDocs,
  //      slectedTrips: selectedTrips,
  //      selectedTripData: selectedTrips[count - 1],
  //      left: count * 55,
  //      trailers: trailers,
  //      equipments: equipments,
  //      quantities: quantities,
  //      geoData: currGeoData,
  //      markers: currMarkers,
  //      mapChanged: true,
  //      tripsChecked: selectedTrip,
  //    })
  //  }

  onSaveNotes = (note) => {
    this.setState({
      notes: note,
    })
  }

  clearAllCheckBoxes = () => {
    var checkboxes = document.getElementsByName('tripsCheckBox')
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false
    }
  }

  selectAllTripsPanel = () => {
    this.removeTrips()
    var checkB = document.getElementById('tripsCheckBoxAll')
    const currMarkers = []
    const currGeoData = []
    if (this.state.selectedSite.lat != undefined) {
      currMarkers.push(this.state.selectedSite)
    }
    let selectedIndexes = [...this.state.selectedCheckBoxes]

    if (checkB.checked) {
      var checkboxes = document.getElementsByName('tripsCheckBox')
      var tripsPanels = this.state.tripsPanel
      for (var i = 0; i < checkboxes.length; i++) {
        var checkBox = checkboxes[i]
        checkBox.checked = true
        if (!selectedIndexes.includes(i)) {
          selectedIndexes.push(i)
        }
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
          let selectedDataforaTrip = tripsPanels[i].totalObject.selectedTripData
          let VehicleColor = tripsPanels[i].vehicleObject.color
          for (let tpl = 0; tpl < selectedDataforaTrip.length; tpl++) {
            let tempselectedDate = selectedDataforaTrip[tpl]
            if (tempselectedDate.doctype === 'PICK') {
              // tempselectedDate.itemCode = tripsPanels[i].itemCode;
              // currDropsList[di].panelType = 'drop';
              tempselectedDate.panelType = 'drop'
              tempselectedDate.VehicleColor = VehicleColor
              tempselectedDate.itemCode = tripsPanels[i].itemCode
              tempselectedDate.seq = tpl + 1
              currMarkers.push(tempselectedDate)
              currGeoData.push(tempselectedDate)
            } else {
              tempselectedDate.panelType = 'pickup'
              tempselectedDate.seq = tpl + 1
              tempselectedDate.itemCode = tripsPanels[i].itemCode
              tempselectedDate.VehicleColor = VehicleColor
              currMarkers.push(tempselectedDate)
              currGeoData.push(tempselectedDate)
            }
          }
        }
      }
      this.setState({
        selectedTripData: tripsPanels,
        tripsChecked: tripsPanels,
        IsAllTripsSelected: true,
      })

      // to the update to plan markers to it
      // assign to plan document to the list
      let currDropsList = this.state.dropsPanel.drops
      let currPickupsList = this.state.dropsPanel.pickUps

      for (let di = 0; di < currDropsList.length; di++) {
        if (
          currDropsList[di].dlvystatus === '0' ||
          currDropsList[di].dlvystatus === '8'
        ) {
          currDropsList[di].panelType = 'drop'
          currMarkers.push(currDropsList[di])
        }
      }

      for (let pi = 0; pi < currPickupsList.length; pi++) {
        if (
          currPickupsList[pi].dlvystatus === '0' ||
          currPickupsList[pi].dlvystatus === '8'
        ) {
          currPickupsList[pi].panelType = 'pickup'
          currMarkers.push(currPickupsList[pi])
        }
      }
    } else {
      var checkboxes = document.getElementsByName('tripsCheckBox')
      selectedIndexes = []
      for (var i = 0; i < checkboxes.length; i++) {
        var checkBox = checkboxes[i]
        checkBox.checked = false
      }
      this.setState({
        IsAllTripsSelected: false,
      })
    }

    this.setState({
      markers: currMarkers,
      geoData: currGeoData,
      mapChanged: true,
      selectedCheckBoxes: selectedIndexes,
    })
  }

  // updateTripsGeoLocations = (index) => {

  //   this.removeTrips()
  //   const currMarkers = []
  //   const currGeoData = []
  //   if (this.state.selectedSite.lat != undefined) {
  //     currMarkers.push(this.state.selectedSite)
  //   }

  //   var checkboxes = document.getElementsByName('tripsCheckBox')

  //   var tripsPanels = this.state.tripsPanel
  //   let selectedIndexes = [...this.state.selectedCheckBoxes]

  //   if (selectedIndexes.includes(index)) {
  //     checkboxes[index].checked = false
  //     selectedIndexes = selectedIndexes.filter((i) => i !== index)
  //     this.reloadTrips();
  //   } else {
  //     if (!selectedIndexes.includes(index)) {
  //       selectedIndexes.push(index)
  //     }
  //   }

  //   if (selectedIndexes.length === 1) {
  //     this.removeTrips()
  //     checkboxes[index].checked = true
  //     this.updateTripsPanel(currMarkers, currGeoData, index)
  //     this.setState({
  //       selectedIndex: index,
  //       checkedTrip: true,
  //       selectedCheckBoxes: selectedIndexes,
  //     })
  //   } else {
  //     this.removeTrips()
  //     selectedIndexes.forEach((index) => {
  //       var checkBox = checkboxes[index]
  //       checkBox.checked = true
  //       if (
  //         null !== tripsPanels[index].dropObject &&
  //         null !== tripsPanels[index].pickupObject
  //       ) {
  //         let selectedDataforaTrip =
  //           tripsPanels[index].totalObject.selectedTripData
  //         let VehicleColor = tripsPanels[index].vehicleObject.color
  //         for (let tpl = 0; tpl < selectedDataforaTrip.length; tpl++) {
  //           let tempselectedDate = selectedDataforaTrip[tpl]
  //           if (tempselectedDate.doctype === 'PICK') {
  //             // tempselectedDate.itemCode = tripsPanels[i].itemCode;
  //             // currDropsList[di].panelType = 'drop';
  //             tempselectedDate.panelType = 'drop'
  //             tempselectedDate.VehicleColor = VehicleColor
  //             tempselectedDate.itemCode = tripsPanels[index].itemCode
  //             tempselectedDate.seq = tpl + 1
  //             currMarkers.push(tempselectedDate)
  //             currGeoData.push(tempselectedDate)
  //           } else {
  //             tempselectedDate.panelType = 'pickup'
  //             tempselectedDate.seq = tpl + 1
  //             tempselectedDate.itemCode = tripsPanels[index].itemCode
  //             tempselectedDate.VehicleColor = VehicleColor
  //             currMarkers.push(tempselectedDate)
  //             currGeoData.push(tempselectedDate)
  //           }
  //         }
  //       }
  //     })
  //     // to the update to plan markers to it
  //     // assign to plan document to the list
  //     let currDropsList = this.state.dropsPanel.drops
  //     let currPickupsList = this.state.dropsPanel.pickUps


  //     for (let di = 0; di < currDropsList.length; di++) {
  //       if (
  //         currDropsList[di].dlvystatus === '0' ||
  //         currDropsList[di].dlvystatus === '8'
  //       ) {
  //         currDropsList[di].panelType = 'drop'
  //         currMarkers.push(currDropsList[di])
  //       }
  //     }

  //     for (let pi = 0; pi < currPickupsList.length; pi++) {
  //       if (
  //         currPickupsList[pi].dlvystatus === '0' ||
  //         currPickupsList[pi].dlvystatus === '8'
  //       ) {
  //         currPickupsList[pi].panelType = 'pickup'
  //         currMarkers.push(currPickupsList[pi])
  //       }
  //     }
  //     let allTripsFlag = false
  //     allTripsFlag = selectedIndexes.length === checkboxes.length ? true : false
  //     var checkB = document.getElementById('tripsCheckBoxAll')
  //     checkB.checked = allTripsFlag

  //     this.setState({
  //       selectedTripData: tripsPanels,
  //       tripsChecked: tripsPanels,
  //       selectedCheckBoxes: selectedIndexes,
  //       markers: currMarkers,
  //       geoData: currGeoData,
  //       mapChanged: true,
  //       IsAllTripsSelected: allTripsFlag,
  //     })
  //   }
  // }


  resolveOriginalIndex = (tripsPanel, filteredIndex, key /* itemCode */) => {
    if (key) {
      const i = tripsPanel.findIndex(t => t.itemCode === key);
      if (i !== -1) return i;
    }
    // fallback if key missing or not found
    return filteredIndex;
  };


  updateTripsGeoLocations = (filteredIndex, vrcode /* == trip.itemCode */) => {

    this.removeTrips();
    const currMarkers = [];
    const currGeoData = [];

    const { selectedSite, tripsPanel } = this.state;
    if (selectedSite?.lat !== undefined) currMarkers.push(selectedSite);

    // translate filtered row -> original index (the one in tripsPanel)
    const originalIndex = this.resolveOriginalIndex(tripsPanel, filteredIndex, vrcode);

    let selectedIndexes = [...this.state.selectedCheckBoxes];

    // toggle off if same filtered row clicked again
    if (selectedIndexes.includes(filteredIndex)) {
      const checkboxes = document.getElementsByName('tripsCheckBox');
      if (checkboxes && checkboxes[filteredIndex]) {
        checkboxes[filteredIndex].checked = false;
      }

      this.reloadTrips();

      const fallbackMarkers = [];
      if (selectedSite?.lat !== undefined) fallbackMarkers.push(selectedSite);

      this.setState({
        selectedCheckBoxes: [],
        selectedIndex: null,
        checkedTrip: false,
        markers: fallbackMarkers,
        geoData: [],
        mapChanged: true,
        IsAllTripsSelected: false,
      });
      return;
    }

    // single-select: keep filtered index for UI
    selectedIndexes = [filteredIndex];

    // uncheck all, then check the clicked one (UI-only; optional)
    const checkboxes = document.getElementsByName('tripsCheckBox');
    if (checkboxes) {
      Array.from(checkboxes).forEach(cb => (cb.checked = false));
      if (checkboxes[filteredIndex]) checkboxes[filteredIndex].checked = true;
    }

    // use the ORIGINAL index for data operations
    const trip = tripsPanel[originalIndex];
    if (!trip) {
      console.warn('Trip not found at originalIndex:', originalIndex, 'for key:', vrcode);
      return;
    }

    if (trip.dropObject || trip.pickupObject) {
      const selectedDataforaTrip = (trip.totalObject && trip.totalObject.selectedTripData) || [];
      const VehicleColor = trip.vehicleObject?.color;

      selectedDataforaTrip.forEach((row, tpl) => {
        const r = { ...row };
        r.seq = tpl + 1;
        r.itemCode = trip.itemCode;
        r.VehicleColor = VehicleColor;
        r.panelType = r.doctype === 'PICK' ? 'drop' : 'pickup';
        currMarkers.push(r);
        currGeoData.push(r);
      });
    }

    // open active panel with ORIGINAL index
    this.updateTripsPanel(currMarkers, currGeoData, originalIndex);

    // state: filtered index for UI, original index for data
    this.setState({
      selectedIndex: originalIndex,
      checkedTrip: true,
      selectedCheckBoxes: selectedIndexes,
      markers: currMarkers,
      geoData: currGeoData,
      mapChanged: true,
      IsAllTripsSelected: false,
    });
  };



  // adding by ramana on 15-08-25 for changing from ultiple check to single
  updateTripsGeoLocations_backup = (filteredIndex, vrcode) => {


    this.removeTrips()
    const currMarkers = []
    const currGeoData = []

    if (this.state.selectedSite?.lat !== undefined) {
      currMarkers.push(this.state.selectedSite)
    }

    var checkboxes = document.getElementsByName('tripsCheckBox')
    var tripsPanels = this.state.tripsPanel

    const index = this.resolveOriginalIndex(tripsPanels, filteredIndex, vrcode);

    let selectedIndexes = [...this.state.selectedCheckBoxes]

    // If same trip clicked again → unselect it
    if (selectedIndexes.includes(index)) {
      checkboxes[index].checked = false
      this.reloadTrips()

      const fallbackMarkers = []
      if (this.state.selectedSite?.lat !== undefined) {
        fallbackMarkers.push(this.state.selectedSite)
      }

      this.setState({
        selectedCheckBoxes: [],
        selectedIndex: null,
        checkedTrip: false,
        markers: fallbackMarkers, // ✅ restore site marker
        geoData: [],
        mapChanged: true,
        IsAllTripsSelected: false,
      })
      return
    }

    // Force single selection
    selectedIndexes = [index]

    // Uncheck all checkboxes first
    checkboxes.forEach((cb) => (cb.checked = false))

    // Check only the selected one
    checkboxes[index].checked = true

    // Build markers/geoData for selected trip
    let trip = tripsPanels[index]
    if (trip.dropObject || trip.pickupObject) {
      let selectedDataforaTrip = trip.totalObject.selectedTripData
      let VehicleColor = trip.vehicleObject.color

      selectedDataforaTrip.forEach((tempselectedDate, tpl) => {
        tempselectedDate.seq = tpl + 1
        tempselectedDate.itemCode = trip.itemCode
        tempselectedDate.VehicleColor = VehicleColor
        tempselectedDate.panelType =
          tempselectedDate.doctype === 'PICK' ? 'drop' : 'pickup'
        currMarkers.push(tempselectedDate)
        currGeoData.push(tempselectedDate)
      })
    }


    // ✅ open active panel for this trip
    this.updateTripsPanel(currMarkers, currGeoData, index)

    // Update state
    this.setState({
      selectedIndex: index,
      checkedTrip: true,
      selectedCheckBoxes: [index],
      markers: currMarkers,
      geoData: currGeoData,
      mapChanged: true,
      IsAllTripsSelected: false,
    })
  }

  updateSelectedDocList = (docnum) => {
    var currentSelectedDocs = this.state.selectedDocuments
    currentSelectedDocs.push(docnum)
    this.setState = {
      selectedDocuments: currentSelectedDocs,
    }
  }

  updateTimeLine = () => {
    var elements = document.getElementsByName('docNum')
    var docElements = []
    var currTripsLine = this.state.slectedTrips
    var tripColor = [
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
    ]
    for (var k = 0; k < currTripsLine.length; k++) {
      if (currTripsLine[k].docnum == undefined) {
        docElements.push(currTripsLine[k])
      }
    }
    for (var i = 0; i < elements.length; i++) {
      for (var j = 0; j < currTripsLine.length; j++) {
        if (elements[i].innerText === currTripsLine[j].docnum) {
          docElements.push(currTripsLine[j])
          if (currTripsLine[j].panelType === 'drop') {
            tripColor[docElements.length - 1] = '#7ace4c'
          } else if (currTripsLine[j].panelType === 'pickup') {
            tripColor[docElements.length - 1] = '#09aaed'
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
    })
  }

  onVRClick = (i, tmsValidated) => {
    var tripsPanels = this.state.tripsPanel
    var selectedTrip = []
    var selectedTrips = []
    var trailers = []
    var selVR_num = tripsPanels[i].itemCode
    var ClickedVR = tripsPanels[i]

    var sel_Driver_name = tripsPanels[i].driverName
    //caling API

    fetchVR(selVR_num)
      .then(([res1, res2, res3]) => {
        this.setState({
          vrlist: res1,
          vrdetaillist: res2,
          loadvehstock: res3,
        })
      })
      .then(() => { })
      .catch((error) => {
        // history.push('/');
      })
    if (this.state.markers && this.state.markers.length == 0) {
      this.state.sites.map((site) => {
        if (this.state.selectedSite === site.id) {
          let marker = []
          marker.push(site)
          this.setState({ markers: marker })
        }
      })
    }
    this.setState({
      clickedTrips: ClickedVR,
      selectedVrIndex: i,
      selectedVrValidated: tmsValidated,
      triplock: true,
      vehicleShow: 'none',
      RouteoptiShow: 'none',
      vrShow: 'block',
    })
  }

  onVRhide = () => {
    this.reloadTrips()
    this.setState({
      vehicleShow: 'block',
      RouteoptiShow: 'none',
      vrShow: 'none',
    })
  }

  onRouteoptihide = () => {
    this.setState({
      vehicleShow: 'block',
      RouteoptiShow: 'none',
      vrShow: 'none',
    })
  }

  onLoadermessage = (tripindex, msg) => {
    var tripsPanels = this.state.tripsPanel
    var tripsList_loader = tripsPanels[tripindex]
    tripsList_loader.loaderInfo = msg
    this.confirmTrip(tripsList_loader, 'loaderMsg')
  }

  onForcesequnceCheck = (tripindex, msg) => {
    var tripsPanels = this.state.tripsPanel
    var trips = []
    var tripsList_force = tripsPanels[tripindex]
    tripsList_force.date = moment.tz(this.state.date, '').format('YYYY-MM-DD')
    if (msg) {
      tripsList_force.forceSeq = true
    } else {
      tripsList_force.forceSeq = false
    }
    trips.push(tripsList_force)
    this.submitTrips(trips)
  }

  onDocmessage = (docNum, msg, Msgtype) => {
    var currentGeoData = this.state.geoData
    var currentMarkers = this.state.markers
    var trips = []
    var geoData = []
    var currMarkers = []
    var trip = this.state.trips[0]

    currentGeoData &&
      currentGeoData.map((geoData, index) => {
        if (geoData.docnum && geoData.docnum === docNum) {
          if (Msgtype === 'doc') {
            geoData.noteMessage = msg
          } else if (Msgtype === 'carrier') {
            geoData.CarrierMessage = msg
          } else {
            geoData.loaderMessage = msg
          }
        }
      })

    currentMarkers &&
      currentMarkers.map((currMarker, index) => {
        if (currMarker.docnum && currMarker.docnum === docNum) {
          currMarker.noteMessage = msg
        }
      })
    trip &&
      trip.totalObject &&
      trip.totalObject.selectedTripData &&
      trip.totalObject.selectedTripData.map((TripData) => {
        if (TripData.docnum && TripData.docnum === docNum) {
          if (Msgtype === 'doc') {
            TripData.noteMessage = msg
          } else if (Msgtype === 'carrier') {
            TripData.CarrierMessage = msg
          } else {
            TripData.LoaderMessage = msg
          }
        }
      })

    geoData.push(currentGeoData)
    currMarkers.push(currentMarkers)
    trips.push(trip)

    this.setState({
      markers: currentMarkers,
      geoData: currentGeoData,
      trips: trips,
    })
  }

  OnProceedToExcludeValidations = () => {
    let targetTrip = this.state.targettedTrip
    let data = this.state.droppedData
    let insertPosition = this.state.targetinsertedPosition

    let currentTrip = []

    data.panelType = 'drop'
    data.vehicleCode = targetTrip.code
    data.itemCode = targetTrip.itemCode
    targetTrip.doc_capacity =
      parseFloat(targetTrip.doc_capacity, 10) + data.netweight
    targetTrip.doc_volume =
      parseFloat(targetTrip.doc_volume, 10) + parseFloat(data.volume)
    targetTrip.totalCases = parseFloat(targetTrip.totalCases) + parseFloat(data.noofCases)
    targetTrip.mainCases = parseInt(targetTrip.mainCases) + parseInt(data.mainCases)
    targetTrip.doc_qty = parseInt(targetTrip.doc_qty) //+ tempqty;
    //targetTrip.uom_capacity = data.weightunit;
    // targetTrip.uom_volume = data.volume_unit;selectedTripData // totalObject
    let selectedTripList = []
    selectedTripList = targetTrip.totalObject.selectedTripData

    // data isthe insertion document
    if (insertPosition === 0) {
      selectedTripList.push(data)
    } else {
      selectedTripList.splice(insertPosition, 0, data)
    }
    // selectedTripList.push(data);
    targetTrip.totalObject.selectedTripData = selectedTripList
    targetTrip.dropObject.push(data)
    targetTrip.drops += 1
    targetTrip.startIndex += 1
    targetTrip.stops = targetTrip.pickups + targetTrip.drops
    targetTrip.date = moment.tz(targetTrip.docdate, '').format('YYYY-MM-DD')
    targetTrip.endDate = ''
    targetTrip.optistatus = 'Open'
    targetTrip.generatedBy = 'MScheduler'
    targetTrip.route = false
    currentTrip.push(targetTrip)
    //   this.props.updateTrip(currentTrip);
    // this.submitTrips(currentTrip)
    this.removeMarkerAfterDrag(data);
  }

  onConfirmToProceedYes = (trip) => {
    // this.props.confirmTrip(this.state.currentTrip);
    this.OnProceedToExcludeValidations()
    this.setState({
      addConfirmToProceedShow: false,
      targettedTrip: {},
      droppedData: {},
      targetinsertedPosition: 0,
    })
  }

  onConfirmNoToProceed = () => {
    this.setState({
      addConfirmToProceedShow: false,
      droppedData: {},
      targettedTrip: {},
      targetinsertedPosition: 0,
    })
  }

  removeMarkerAfterDrag = (markerObj, insertIndex) => {
    const { markers, geoData, dropsPanel } = this.state;
    const drops = dropsPanel?.drops || [];
    // 1️⃣ Remove the object with the matching docnum from markers
    const updatedMarkers = markers.filter(m => m.docnum !== markerObj.docnum);
    // 2️⃣ Update type = "Allocated" in dropsPanel.drops if docnum matches
    const updatedDrops = drops.map((drop) =>
      drop.docnum === markerObj.docnum
        ? { ...drop, type: "selected" }
        : drop
    );
    // 3️⃣ Insert markerObj into geoData
    let updatedGeoData;
    if (insertIndex !== null) {
      const position = insertIndex; // insert after this index
      updatedGeoData = [
        ...geoData.slice(0, position),
        markerObj,
        ...geoData.slice(position)
      ];
    } else {
      updatedGeoData = [...geoData, markerObj]; // default append
    }

    // Set the remaining markers back to state
    this.setState({
      dropsPanel: {
        ...dropsPanel,
        drops: updatedDrops,
      },
      markers: updatedMarkers,
      geoData: updatedGeoData,
      mapChanged: true,
      isTripModified: true
    });
  };

  addDocument2ExistingTrip = (data, tripcode, insertPosition) => {
    let error = ''
    let dropCompatability = true
    let excludeValidationFlag = false
    let tripsList = this.state.tripsPanel
    let targetTrip
    let currentTrip = []
    for (let im = 0; im < tripsList.length; im++) {
      if (tripsList[im].itemCode === tripcode) {
        targetTrip = tripsList[im]
        break
      }
    }
    /// adding conditions while dragging from Map as well

    // driver validation
    if (dropCompatability && !excludeValidationFlag) {
      if (targetTrip.driverId !== '') {
        if (
          targetTrip.driverId === data.drivercode ||
          targetTrip.driverId.trim() === '' ||
          data.drivercode.trim() === ''
        ) {
          dropCompatability = true
        } else {
          dropCompatability = false
          error = 'Driver'
          excludeValidationFlag = true
          this.setState({
            errorType: 'Driver',
            droppedData: data,
            addConfirmToProceedShow: true,
            targettedTrip: targetTrip,
            targetinsertedPosition: insertPosition,
            confirmMessage:
              'Driver is not compatability to the customer. Please confirm to exclude all the validations to add document to the trip',
          })
        }
      } else {
        dropCompatability = true
      }
    }

    // customer compatability
    //to check vehicle & customer List

    if (dropCompatability === true && !excludeValidationFlag) {
      let customerlist = targetTrip.vehicleObject.customerlist

      let tempcustomerArray = customerlist
        ? customerlist.trim().split(/\s+/)
        : []
      if (targetTrip.vehicleObject.allcustomers === 2) {
        dropCompatability = true
      } else {
        // need to check the vehicle and products category compatability;
        if (!tempcustomerArray.includes(data.bpcode)) {
          dropCompatability = false
          excludeValidationFlag = true
          error = 'Veh_CustList'
          this.setState({
            errorType: 'Veh_CustList',
            droppedData: data,
            addConfirmToProceedShow: true,
            targettedTrip: targetTrip,
            targetinsertedPosition: insertPosition,
            confirmMessage:
              "Vehicle is incompatability to the customers'. Are you sure you want to continue ?",
          })
        } else {
          dropCompatability = true
        }
      }
    }

    //To Check Vehicle Class of  Vehicle  & Vehicle Class at Customer - Compatability
    if (dropCompatability && !excludeValidationFlag) {
      if (data.vehClassList.length > 0) {
        var tempVehClass = data.vehClassList.split(' ')
        var veh_vehclass_cus_vehClass_flg = tempVehClass.includes(
          targetTrip?.vehicleObject?.catego
        )
        if (veh_vehclass_cus_vehClass_flg) {
          dropCompatability = true
        } else {
          dropCompatability = false
          excludeValidationFlag = true
          error = 'Veh_VehClass_Cus_VehClass'
          this.setState({
            errorType: 'Veh_VehClass_Cus_VehClass',
            droppedData: data,
            addConfirmToProceedShow: true,
            targettedTrip: targetTrip,
            targetinsertedPosition: insertPosition,
            confirmMessage:
              "Vehicle Class is incompatible with the customer's assigned vehicle classes.  Are you sure you want to continue? ",
          })
        }
      }
    }

    //To Check weight, volume, pallets - compatability
    if (dropCompatability && !excludeValidationFlag) {
      if (
        parseFloat(targetTrip.doc_capacity) + parseFloat(data.netweight) > parseFloat(targetTrip.vehicleObject.capacities) ||
        parseFloat(targetTrip.doc_volume) + parseFloat(data.volume) > parseFloat(targetTrip.vehicleObject.vol) ||
        parseFloat(targetTrip.totalCases) + parseFloat(data.noofCases) > parseFloat(targetTrip.vehicleObject.maxqty)
      ) {
        dropCompatability = false
        const totalWeight = parseFloat(targetTrip.doc_capacity) + parseFloat(data.netweight)
        const totalVolume = parseFloat(targetTrip.doc_volume) + parseFloat(data.volume)
        const totalCases = parseFloat(targetTrip.totalCases) + parseFloat(data.noofCases)

        let message = ''
        if (totalWeight > parseFloat(targetTrip.vehicleObject.capacities)) {
          message += `Trip Weight (${totalWeight.toFixed(2)} KG) exceeds the vehicle’s maximum weight capacity (${parseFloat(targetTrip.vehicleObject.capacities).toFixed(2)} KG).\n`
        }
        if (totalVolume > parseFloat(targetTrip.vehicleObject.vol)) {
          message += `Trip Volume (${totalVolume.toFixed(2)} M3) exceeds the vehicle’s maximum volume capacity (${parseFloat(targetTrip.vehicleObject.vol).toFixed(2)} M3).\n`
        }
        if (totalCases > parseFloat(targetTrip.vehicleObject.maxqty)) {
          message += `Trip total Pallets (${totalCases.toFixed(2)} PAL) exceeds the vehicle’s maximum pallets capacity (${parseFloat(targetTrip.vehicleObject.maxqty).toFixed(2)} PAL).\n`
        }

        this.setState({
          errorType: '',
          droppedData: data,
          addConfirmToProceedShow: true,
          targettedTrip: targetTrip,
          targetinsertedPosition: insertPosition,
          confirmMessage: `${message}Are you sure you want to continue ?`,
        })
      }
      else {
        dropCompatability = true
      }
    }

    // product compatability
    //to check vehicle & prodcut category

    if (dropCompatability === true && !excludeValidationFlag) {
      const vehicleCategories = targetTrip.vehicleObject.tclcod
        ? targetTrip.vehicleObject.tclcod.trim().split(/\s+/) // split by spaces
        : []

      if (vehicleCategories.length === 0) {
        dropCompatability = true
      } else {
        // need to check the vehicle and products category compatability;

        for (var j = 0; j < data.products.length; j++) {
          const productCategory = data.products[j].productCateg
          if (!vehicleCategories.includes(productCategory)) {
            // incompatible product found
            dropCompatability = false
            excludeValidationFlag = true
            error = 'productVehicle'

            this.setState({
              errorType: 'productVehicle',
              droppedData: data,
              addConfirmToProceedShow: true,
              targettedTrip: targetTrip,
              targetinsertedPosition: insertPosition,
              confirmMessage:
                'Product category is incompatible with the vehicle assigned to the trip. Are you sure you want to continue?',
            })
            break // no need to check further
          }
        }
      }
    }

    if (dropCompatability && !excludeValidationFlag) {
      data.panelType = 'drop'
      data.vehicleCode = targetTrip.code
      data.itemCode = targetTrip.itemCode
      targetTrip.doc_capacity =
        parseFloat(targetTrip.doc_capacity, 10) + data.netweight
      targetTrip.doc_volume =
        parseFloat(targetTrip.doc_volume, 10) + parseFloat(data.volume)
      targetTrip.totalCases = parseFloat(targetTrip.totalCases) + parseFloat(data.noofCases)
      targetTrip.mainCases = parseInt(targetTrip.mainCases) + parseInt(data.mainCases)
      targetTrip.doc_qty = parseInt(targetTrip.doc_qty) //+ tempqty;
      //targetTrip.uom_capacity = data.weightunit;
      // targetTrip.uom_volume = data.volume_unit;selectedTripData // totalObject
      let selectedTripList = []
      selectedTripList = targetTrip.totalObject.selectedTripData

      // data isthe insertion document
      if (insertPosition === 0) {
        selectedTripList.push(data)
      } else {
        selectedTripList.splice(insertPosition, 0, data)
      }
      // selectedTripList.push(data);
      targetTrip.totalObject.selectedTripData = selectedTripList
      targetTrip.dropObject.push(data)
      targetTrip.drops += 1
      targetTrip.startIndex += 1
      targetTrip.stops = targetTrip.pickups + targetTrip.drops
      targetTrip.date = moment.tz(targetTrip.docdate, '').format('YYYY-MM-DD')
      targetTrip.endDate = ''
      targetTrip.optistatus = 'Open'
      if (targetTrip.generatedBy === 'AutoScheduler') {
        targetTrip.generatedBy = 'AutoScheduler'
      }
      else {
        targetTrip.generatedBy = 'MScheduler'
      }
      targetTrip.route = false
      currentTrip.push(targetTrip)
      this.removeMarkerAfterDrag(data, insertPosition);
      //   this.props.updateTrip(currentTrip);

      // this.submitTrips(currentTrip)
    } else if (!excludeValidationFlag) {
      if (error === 'product') {
        this.setState({
          errorMessage:
            "Selected products are not compatible with the vehicle's product category",
          addAlertShow: true,
          error: true,
        })
      } else if (error === 'Trailer') {
        this.setState({
          errorMessage:
            'The document already contains a trailer, but does not correspond to a trip trailer.',
          addAlertShow: true,
          error: true,
        })
      } else if (error === 'productVehicle') {
        this.setState({
          errorMessage:
            'Product category is incompatible with the vehicle assigned to the trip.',
          addAlertShow: true,
          error: true,
        })
      } else if (error === 'Driver') {
        this.setState({
          errorMessage:
            'The document already contains the driver, but it does not match with trip Driver.',
          addAlertShow: true,
          error: true,
        })
      } else if (error === 'Veh_VehClass_Cus_VehClass') {
        this.setState({
          errorMessage:
            'The Vehicle Class assigned to this vehicle does not match the Vehicle Class specified for the customer. Please review and update the details accordingly',
          addAlertShow: true,
          error: true,
        })
      } else if (error === 'Veh_CustList') {
        this.setState({
          errorMessage:
            "Vehicle is incompatability to the customers'. Are you sure you want to continue ?",
          addAlertShow: true,
          error: true,
        })
      }
    }
  }

  ToPlan2TripDocuments = (source, target) => {

    // let insertPosition  = target.seq ? target.seq :

    if (target.itemCode === '' || target.itemCode === undefined) {

      // notifySucess = (message) => toast.success(message, { autoClose: 3000 });

      // notifyError = (message) => toast.error('Cannot drag ToPlan document to another ToPlan document', { autoClose: 3000 });
      // this.notifyError('Cannot drag ToPlan document to another ToPlan document');
      window.alert(
        'Cannot drag the To plan document to another To Plan document'
      )
      //   window.alert("Document added successfully");
    } else {
      let tripcode = target.itemCode
      let insertPosition = target.seq ? target.seq : 0
      this.addDocument2ExistingTrip(source, tripcode, insertPosition)
      //  this.notifySucess('Document added successfully')
      let targetTrip
      let tripsList = this.state.tripsPanel
      for (let im = 0; im < tripsList.length; im++) {
        if (tripsList[im].itemCode === tripcode) {
          targetTrip = tripsList[im]
          break
        }
      }
      // window.alert(
      //   `${source.docnum} - ${source.bpname}(${source.bpcode}) processing to added into the trip (${targetTrip.itemCode})`
      // )

      // this.updateTripsGeoLocations(this.state.selectedIndex, 'map')
    }
  }

  onTripDelete = (index, docnum, vtype, vcode, from) => {
    var currentGeoData = this.state.geoData
    var currentMarkers = this.state.markers
    var geoData = []
    var currMarkers = []
    var currDropsPanel = this.state.dropsPanel
    var drops = currDropsPanel.drops
    var pickUps = currDropsPanel.pickUps
    var trips = []
    var trip = this.state.trips[0]
    var removeDocs = []

    if (currentGeoData[index].panelType == 'pickup') {
      var pickCount = trip.pickups
      trip.pickups = pickCount > 0 ? pickCount - 1 : 0
      removeDocs.push(docnum)
      for (var i = 0; i < pickUps.length; i++) {
        if (pickUps[i].docnum == docnum) {
          pickUps[i].type = 'open'
          pickUps[i].vehicleCode = ''
        }
      }

      //to get Paired document for the deleted Pikcup element
      for (var k = 0; k < trip.pickupObject.length; k++) {
        if (trip.pickupObject[k].docnum === docnum) {
          if (
            trip.pickupObject[k].pairedDoc != undefined &&
            trip.pickupObject[k].pairedDoc != ' '
          ) {
            var dropCount = trip.drops
            trip.drops = dropCount - 1
            removeDocs.push(trip.pickupObject[k].pairedDoc)
          }
          for (var j = 0; j < drops.length; j++) {
            if (drops[j].docnum == trip.pickupObject[k].pairedDoc) {
              drops[j].type = 'open'
              drops[j].vehicleCode = ''
            }
          }
        }
      }
    }

    if (currentGeoData[index].panelType == 'drop') {
      var dropCount = trip.drops
      trip.drops = dropCount > 0 ? dropCount - 1 : 0
      removeDocs.push(docnum)
      for (var j = 0; j < drops.length; j++) {
        if (drops[j].docnum == docnum) {
          drops[j].type = 'open'
          drops[j].vehicleCode = ''
          trip.doc_capacity = trip.doc_capacity - drops[j].netweight
          trip.doc_volume = trip.doc_volume - drops[j].volume
          trip.totalCases = trip.totalCases - parseFloat(drops[j].noofCases)
          trip.mainCases = parseInt(trip.mainCases) - parseInt(drops[j].mainCases)
          let deletedQty = drops[j].products.reduce((acc, product) => {
            return acc + Number(product.quantity || 0) // Sum the qty values, defaulting to 0 if qty is undefined
          }, 0)

          trip.doc_qty = trip.doc_qty - deletedQty
        }
      }

      //to get Paired document for the deleted Drop element
      for (var k = 0; k < trip.dropObject.length; k++) {
        if (trip.dropObject[k].docnum === docnum) {
          if (
            trip.dropObject[k].pairedDoc != undefined &&
            trip.dropObject[k].pairedDoc != ' '
          ) {
            var pickCount = trip.pickups
            trip.pickups = pickCount - 1
            removeDocs.push(trip.dropObject[k].pairedDoc)
          }
          for (var i = 0; i < pickUps.length; i++) {
            if (pickUps[i].docnum == trip.dropObject[k].pairedDoc) {
              pickUps[i].type = 'open'
              pickUps[i].vehicleCode = ''
            }
          }
        }
      }
    }

    currDropsPanel.drops = drops
    currDropsPanel.pickUps = pickUps
    var stops = parseInt(trip.pickups) + parseInt(trip.drops)
    trip.startIndex = stops
    trip.stops = stops
    for (var i = 0; i < currentGeoData.length; i++) {
      if (!removeDocs.includes(currentGeoData[i].docnum)) {
        geoData.push(currentGeoData[i])
      }
    }

    for (var i = 0; i < currentMarkers.length; i++) {
      if (!removeDocs.includes(currentMarkers[i].docnum)) {
        currMarkers.push(currentMarkers[i])
      }
    }
    var currSelectedTrips = this.state.slectedTrips
    var selectedTrips = []

    for (var i = 0; i < currSelectedTrips.length; i++) {
      if (!removeDocs.includes(currSelectedTrips[i].docnum)) {
        selectedTrips.push(currSelectedTrips[i])
      }
    }
    var pickupObject = []
    for (var i = 0; i < trip.pickupObject.length; i++) {
      if (!removeDocs.includes(trip.pickupObject[i].docnum)) {
        pickupObject.push(trip.pickupObject[i])
      }
    }
    var dropObject = []
    for (var i = 0; i < trip.dropObject.length; i++) {
      if (!removeDocs.includes(trip.dropObject[i].docnum)) {
        dropObject.push(trip.dropObject[i])
      }
    }

    trip.pickupObject = pickupObject
    trip.dropObject = dropObject

    var tripColor = [
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
      '#e0e0e0',
    ]

    var count = selectedTrips.length
    for (var i = 0; i < count; i++) {
      if (selectedTrips[i].panelType === 'drop') {
        tripColor[i] = '#7ace4c'
      } else if (selectedTrips[i].panelType === 'pickup') {
        tripColor[i] = '#09aaed'
      }
      else {
        tripColor[i] = '#7ace4c';
      }
    }
    trips.push(trip)

    if (from === 'Map') {
      this.confirmTrip(trip, 'Open')
    }
    else {

      this.setState({
        markers: currMarkers,
        geoData: geoData,
        trips: trips,
        tripColor: tripColor,
        isTripModified: true,
        slectedTrips: selectedTrips,
        selectedTripData: selectedTrips[count - 1],
        left: count * 55,
        dropsPanel: currDropsPanel,
        mapChanged: true,
        docType: vtype,
        deletedVehicleCode: vcode,
      })
    }
  }
  // end of onTrip Delete
  lockTrip = (trips, index) => {
    this.setState({ loader: true, loaderText: 'Loading please wait...' })
    var tripsPanel = this.state.tripsPanel
    tripsPanel[index].lock = true
    fetch(
      `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/lock/trips`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trips),
      }
    )
      .then((response) => {
        this.reloadTrips()
        this.updateTripsGeoLocations(index, tripsPanel[index].itemCode)
        this.setState({
          loader: false,
        })
        this.notifySucess('Trip Locked Sucessfully')
      })
      .catch((error) => {
        this.setState({ loader: false })
        this.notifyError('Unable to Lock the Trip')
      })
  }

  onLockRecord = (index, lockP) => {
    var tripsPanel = this.state.tripsPanel
    var trips = []
    var trip = tripsPanel[index]
    trip.date = this.state.date
    trip.lockP = lockP
    trips.push(trip)
    var user = JSON.parse(localStorage.getItem('authUser'))
    let details = {
      loginUser: user.username,
      dateTime: new Date().toDateString().replace(/-/g, '/'),
      type: 'lock',
    }
    if (
      trips[0].totalObject &&
      trips[0].totalObject.logData &&
      trips[0].totalObject.logData.length > 0
    ) {
      trips[0].totalObject.logData.push(details)
    }
    this.lockTrip(trips, index)
  }

  onCompleteTripDelete = (index, tripcode) => {
    var tripsPanel = this.state.tripsPanel
    var trips = []
    var trip = tripsPanel[index]
    trips.push(trip)
    this.deleteTrip(trips, index)
    // this.dropResetObj(trip,"completeDelete");
    this.setState({
      guageTrip: {},
      geoData: [],
      markers: [],
      mapChanged: true,
      trips: [],
      slectedTrips: [],
      checkedTrip: false,
    })
    //this.reloadTrips();
  }

  reloadTrips = () => {
    const currDate = moment.tz(this.state.date, '').format('YYYY-MM-DD')
    let value = this.state.selectedMultipleSites
    fetchTrips(value, currDate)
      .then(([res1]) => {
        this.setState({
          tripsPanel: res1,
        })
      })
      .then(() => {
        // this.changeDate(0, false, "buttons");
      })
  }

  deleteTrip = (trips, index) => {
    this.setState({ loader: true, loaderText: 'Loading please wait...' })
    var tripsPanel = this.state.tripsPanel
    tripsPanel[index].lock = true
    const currDate = moment.tz(this.state.date, '').format('YYYY-MM-DD')
    let value = this.state.selectedMultipleSites
    fetch(
      `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/delete/trip`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trips),
      }
    ).then((response) => {
      if (response.status == 200) {
        // this.reloadTrips();
        // this.changeDate(0, '', "deleteTrip");
        this.refreshAllPanels()
        this.setState({ loader: false })
        //  this.handlePanelsUpdate(currDate);
        this.notifySucess('Trip deleted Sucessfully')
      } else {
        this.setState({ loader: false })
        this.notifyError('ERROR')
      }
    })
  }
  unlockTrip = () => {
    var totalTrips = []
    var ctrips = this.state.trips[0]
    var tripsPan = this.state.tripsPanel
    for (var i = 0; i < tripsPan.length; i++) {
      if (ctrips.itemCode == tripsPan[i].itemCode) {
        tripsPan[i].lock = false
        tripsPan[i].lockP = true
      }
    }
    ctrips.lock = false
    totalTrips.push(ctrips)
    this.setState({
      trips: totalTrips,
      tripsPanel: tripsPan,
    })
  }
  getRouteSchedulerApp = (routesSchedule, optimisedindex, auto) => {
    var data = []
    var newGeoData = []
    if (auto) {
      var tempoptimisedIndex = []

      //map
      const tempdata = optimisedindex.map((order, index) => {
        for (var i = 0; i < order.length; i++) {
          tempoptimisedIndex.push(order[i].optimizedIndex)
        }
      })
      var tempGeoData = this.state.geoData
      routesSchedule.routesData.map((route, routeIndex) => {
        var matched = false

        var optimiseddataindex = tempoptimisedIndex[routeIndex]

        tempGeoData.map((geo, geoIndex) => {
          if (geoIndex === optimiseddataindex) {
            data = { ...geo, ...route }
            matched = true
          }
        })
        if (matched === true) {
          newGeoData.push(data)
        }
      })
    } else {
      var data = []
      var newGeoData = []
      this.state.geoData.map((geo, geoIndex) => {
        routesSchedule.routesData.map((route, routeIndex) => {
          if (geoIndex === routeIndex) {
            data = { ...geo, ...route }
          }
        })
        newGeoData.push(data)
      })
    }
    this.setState({ geoData: newGeoData })
    this.setState({ routeSchedulerTime: routesSchedule })
    this.confirmTrip(routesSchedule.trips, 'route', routesSchedule, newGeoData)
  }
  notifySucess = (message) => toast.success(message, { autoClose: 3000 })

  notifyError = (message) =>
    toast.error(message, { autoClose: 3000, style: { zIndex: 1050 } })

  OncheckedSameVehicles = (checked) => {
    this.setState({
      checkedsameVehicles: checked,
    })
  }

  groupunlockTrips = () => {
    this.setState({ loader: true, loaderText: 'loading Please wait...' })
    var tripsPanel = this.state.tripsPanel
    var lockedTrips = []
    var UnLockcount = 0
    var driverCnt = 0
    for (let i = 0; i < tripsPanel.length; i++) {
      var trip = tripsPanel[i]

      if (trip.lock && !trip.tmsValidated) {
        UnLockcount = UnLockcount + 1
        let tripdate = moment.tz(trip.docdate, '').format('YYYY-MM-DD')
        trip.date = tripdate
        trip.lock = false
        trip.lockP = true
        lockedTrips.push(trip)
      }
    }

    if (UnLockcount > 0) {
      fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/unlock/multipletrips`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lockedTrips),
        }
      ).then((response) => {
        this.reloadTrips()
        this.setState({
          // tripsPanel: tripsPanel,
          loader: false,
        })
        this.notifySucess('Trips are Unlocked Sucessfully')
      })
    } else {
      this.setState({
        errorMessage: 'No Trips are available for Unlocking',
        loader: false,
        addAlertShow: true,
      })
    }
  }

  grouplockTrips = () => {
    this.setState({ loader: true, loaderText: "loading please wait.." })
    var tripsPanel = this.state.tripsPanel
    var unlockedTrips = []
    var Lockcount = 0
    var driverCnt = 0
    for (let i = 0; i < tripsPanel.length; i++) {
      var trip = tripsPanel[i]

      if (!trip.lock && (!trip.driverName || trip.driverName === 'null')) {
        driverCnt = driverCnt + 1
      }

      if (!trip.lock && trip.optistatus !== 'Open') {
        Lockcount = Lockcount + 1
        let tripdate = moment.tz(trip.docdate, '').format('YYYY-MM-DD')
        trip.date = tripdate
        trip.lock = true
        unlockedTrips.push(trip)
      }
    }


    if (driverCnt > 0) {
      this.refreshAllPanels()
      this.setState({
        errorMessage: `The driver is missing in ${driverCnt} ${driverCnt == 1 ? 'trip' : 'trips'
          }.`,
        loader: false,
        addAlertShow: true,
      })
    } else if (Lockcount > 0) {
      fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/lock/multipletrips`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(unlockedTrips),
        }
      )
        .then((response) => {
          this.notifySucess('Trips are Locked Sucessfully')
          this.setState({
            tripsPanel: tripsPanel,
            loader: false,
          })
        })
        .then(() => {
          // Now reload trips after the fetch is complete
          this.reloadTrips()
        })
        .catch((error) => {
          // Handle errors if necessary
          console.error('Error locking trips:', error)
        })
    } else {
      this.setState({
        errorMessage: 'No Trips are available for Locking',
        loader: false,
        addAlertShow: true,
      })
    }
  }

  onDocProcessChange = (val) => {
    this.setState({
      defaultdocprocess: val,
    })
  }

  OncheckedSameVehicles = (checked) => {
    this.setState({
      checkedsameVehicles: checked,
    })
  }

  // autoResetTrips = () => {
  //   this.setState({ loader: true })
  //   var tripsPanel = this.state.tripsPanel
  //   var unlockedTrips = []
  //   var deletecount = 0

  //   for (let i = 0; i < tripsPanel.length; i++) {
  //     var trip = tripsPanel[i]
  //     if (!trip.lock) {
  //       deletecount = deletecount + 1
  //       unlockedTrips.push(trip)
  //     }
  //   }

  //   if (deletecount > 0) {
  //     fetch(
  //       `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/delete/trips`,
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(unlockedTrips),
  //       }
  //     ).then((response) => {
  //       // this.reloadTrips();
  //       this.refreshAllPanels()
  //       //  this.handlePanelsUpdate(currDate);
  //       this.setState({ loader: false })
  //       this.notifySucess('Trips deleted Sucessfully')
  //       this.onRouteoptihide()
  //     })
  //   } else {
  //     this.setState({
  //       errorMessage: 'No Trips are available for Deletion',
  //       loader: false,
  //       addAlertShow: true,
  //     })
  //   }
  // }

  autoResetTrips = (selectedTripIds = []) => {
    this.setState({ loader: true });
    var tripsPanel = this.state.tripsPanel;

    // Filter only the trips whose itemCode was selected in the modal
    var selectedTrips = tripsPanel.filter((trip) =>
      selectedTripIds.includes(trip.itemCode)
    );

    if (selectedTrips.length > 0) {
      fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/delete/trips`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedTrips),
        }
      ).then((response) => {
        this.refreshAllPanels();
        this.setState({ loader: false });
        this.notifySucess("Trips deleted Successfully");
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
    var tempTripPanel = this.state.tripsPanel
    var orginalTripOrder = this.state.tripsPanel

    tempTripPanel.sort(
      (a, b) => b.code.localeCompare(a.code) || b.trips - a.trips
    )

    const key = 'code'

    // let uniqueTripListByCode = [...new Map(tempTripPanel.map((item) => [item["code"], item])).values(),];

    var resArr = []
    tempTripPanel.filter(function (item) {
      var i = resArr.findIndex((x) => x.code == item.code)
      if (i <= -1) {
        resArr.push(item)
      }
      return null
    })

    this.setState({ loader: true })
    var sameVehiclesflag = this.state.checkedsameVehicles
    var DocCount = 0
    var docsPanel = []
    let VehStartTime, VehEndTime
    for (let jj = 0; jj < this.state.dropsPanel.drops.length; jj++) {
      let doc = this.state.dropsPanel.drops[jj]
      docsPanel.push(doc)
      if (
        doc.type === 'open' &&
        (doc.dlvystatus === '0' || doc.dlvystatus === '8')
      ) {
        DocCount = DocCount + 1
      }
    }

    for (let jk = 0; jk < this.state.dropsPanel.pickUps.length; jk++) {
      let doc = this.state.dropsPanel.pickUps[jk]
      docsPanel.push(doc)
      if (
        doc.type === 'open' &&
        (doc.dlvystatus === '0' || doc.dlvystatus === '8')
      ) {
        DocCount = DocCount + 1
      }
    }

    if (DocCount > 0) {
      var VehList = [],
        DocList = []
      var siteLat, siteLang
      var doc = {}
      var selSite = this.state.selectedMultipleSites[0]
      this.state.sites.map((site) => {
        if (selSite === site.id) {
          siteLat = site.lat
          siteLang = site.lng
        }
      })

      for (let i = 0; i < this.state.vehiclePanel.vehicles.length; i++) {
        var Veh = {}
        let veh = this.state.vehiclePanel.vehicles[i]
        var sflag = false
        var prevEndTime = 0
        for (let t = 0; t < resArr.length; t++) {
          var currtrip = resArr[t]
          if (currtrip.code === veh.codeyve) {
            sflag = true
            var endTime = splitTimeAndConv2Sec(currtrip.endTime)
            var unloadingtime = convertHrToSec(veh.enddepotserv)
            prevEndTime = endTime + unloadingtime
          }
        }

        if (!sameVehiclesflag && !sflag) {
          Veh.id = i + 1
          Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime)
          Veh.capacity = [veh.capacities]

          Veh.description = veh.codeyve
          let starttime = splitTimeAndConv2Sec(veh.starttime)
          let loadingHrs = convertHrToSec(veh.startdepots)
          let stime = starttime + loadingHrs
          let etime = splitTimeAndAddtimeAndConv2Sec(
            veh.starttime,
            veh.overtimestar
          )
          let timew = [stime, etime]
          let geo = [siteLat, siteLang]
          Veh.time_window = timew
          Veh.start = geo
          Veh.end = geo
          //  var array = JSON.parse("[" + veh.skills + "]");
          Veh.skills = []
          if (veh.maxordercnt > 0) {
            Veh.max_tasks = veh.maxordercnt
          } else {
            Veh.max_tasks = 3
          }
          VehList.push(Veh)
          VehEndTime = etime
          VehStartTime = stime
        } else if (sameVehiclesflag && sflag) {
          let starttime = prevEndTime
          let loadingHrs = convertHrToSec(veh.startdepots)
          let stime = starttime + loadingHrs
          let etime = splitTimeAndAddtimeAndConv2Sec(
            veh.starttime,
            veh.overtimestar
          )

          if (stime < etime) {
            Veh.id = i + 1
            Veh.description = veh.codeyve
            Veh.max_travel_time = convertHrToSec(veh.maxtotaltrvtime)
            Veh.capacity = [veh.capacities]

            let timew = [stime, etime]
            let geo = [siteLat, siteLang]
            Veh.time_window = timew
            Veh.start = geo
            Veh.end = geo
            // var array = JSON.parse("[" + veh.skills + "]");
            Veh.skills = []
            if (veh.maxordercnt > 0) {
              Veh.max_tasks = veh.maxordercnt
            } else {
              Veh.max_tasks = 3
            }

            VehList.push(Veh)
            VehEndTime = etime
            VehStartTime = stime
          }
        }
      }
      let maxDoc = this.state.defaultdocprocess
      let docprocessedCount = 0
      for (let j = 0; j < docsPanel.length; j++) {
        let doc = docsPanel[j]
        if (
          doc.type === 'open' &&
          (doc.dlvystatus === '0' || doc.dlvystatus === '8') &&
          docprocessedCount < maxDoc
        ) {
          var Doc = {}
          Doc.id = j + 1
          Doc.description = doc.docnum

          var FromArr
          var fromflag = false
          var toflag = false
          var ToArr
          if (doc.fromTime.length > 0) {
            FromArr = doc.fromTime.split(' ')
            fromflag = true
          }

          if (doc.toTime.length > 0) {
            ToArr = doc.toTime.split(' ')
            toflag = true
          }

          var timeWindw = []

          fromflag &&
            FromArr.map((ft, index) => {
              var tt = []
              tt.push(splitTimeAndConv2Sec(ft))
              tt.push(splitTimeAndConv2Sec(ToArr[index]))

              timeWindw.push(tt)
            })

          var DocLat, DocLang
          DocLat = doc.lat
          DocLang = doc.lng
          Doc.location = [DocLat, DocLang]
          Doc.priority = doc.priority
          Doc.amount = [Math.round(doc.netweight)]
          // var array1 =   JSON.parse("[" + doc.skills + "]");
          //       Veh.skills = array1;
          ////  Doc.skills = (doc.skills).split(',');
          // Doc.skills = array1;
          let wtime =
            convertHrToSec(doc.waitingTime) + convertHrToSec(doc.serviceTime)
          Doc.service = parseInt(wtime)
          let ps,
            pe = 0
          let ds,
            de = 0

          if (fromflag) {
            Doc.time_windows = timeWindw
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

          DocList.push(Doc)
          docprocessedCount = docprocessedCount + 1
        }
      }

      //process for the JSON file
      var processedData = {}
      processedData.vehicles = VehList
      processedData.jobs = DocList
      processedData.options = {
        g: false,
      }

      // latest - 34.171.208.219
      // v10   - 34.134.143.219
      //new frane  - 35.193.234.153
      // https://maps.tema-systems.com
      // US-west instance 34.95.36.63

      fetch('https://maps.tema-systems.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else {
            var StatusErrorMsg = response.statusText
            this.setState({
              errorMessage: { StatusErrorMsg },
              loader: false,
              addAlertShow: true,
            })
          }
        })
        .then((res) => {
          if (res.routes.length > 0) {
            this.submitRoutesforTripsCreation(
              res.routes,
              selSite,
              docsPanel,
              [],
              [],
              res
            )
          } else {
            this.setState({
              errorMessage: 'something  wrong with the data ,  please check',
              loader: false,
              addAlertShow: true,
            })
          }
        })
    } else {
      this.setState({
        errorMessage: 'No Documents are available for Trips creation',
        loader: false,
        addAlertShow: true,
      })
    }
  }

  submitRoutesforTripsCreation = (
    routes,
    site,
    docsPanel,
    selDrivers,
    SelVehicles,
    res,
    X3SetupErrors,
    from,
    jobId,
    assignedShipments,
    assignedJobs,
    extraError, customerJobMap, NotesExecptions, fromBy, engineType
  ) => {
    console.log('routes from optimizer', customerJobMap, engineType)
    var RouteprocessedData = []
    var sameProcessUsedDriversList = []
    var TripsfromRoutes = []
    let allocatedDrivers = []


    // sorting to store the capacity first
    const sortedRoutes = [...routes].sort((a, b) => {
      const capA = a.adopted_capacity?.[0] || 0
      const delA = a.delivery?.[0] || 0
      const utilA = capA > 0 ? (delA / capA) * 100 : 0

      const capB = b.adopted_capacity?.[0] || 0
      const delB = b.delivery?.[0] || 0
      const utilB = capB > 0 ? (delB / capB) * 100 : 0

      return utilB - utilA
    })

    console.log('sorted routes from optimizer', sortedRoutes)



    for (let k = 0; k < sortedRoutes.length; k++) {
      var currRoute = sortedRoutes[k]
      var Vehicle = {},
        Veh = sortedRoutes[k].description

      var auto_tot_travel_time = formatTime(sortedRoutes[k].duration)
      var auto_total_time = (sortedRoutes[k].duration + sortedRoutes[k].service) / 60 / 60
      var auto_service_time = sortedRoutes[k].service / 60 / 60
      var auto_tot_distance = sortedRoutes[k].distance / 1000

      // var totalcost = 0, fixedCost = 0, overtimeCost = 0;
      var fdistanceCost = 0,
        ftimeCost = 0,
        ftotalCost = 0,
        fovertimecost = 0,
        fRegularcost = 0,
        ffixedcost = 0

      for (let i = 0; i < this.state.vehiclePanel.vehicles.length; i++) {
        let tempvveh = this.state.vehiclePanel.vehicles[i]
        // should not use the vehicle when driver is already allocated

        if (
          tempvveh.driverid === ' ' ||
          tempvveh.driverid === '' ||
          tempvveh.driverid === null
        ) {
        } else {
          allocatedDrivers.push(tempvveh.driverid)
        }

        // select the vehicle from the list
        if (Veh == this.state.vehiclePanel.vehicles[i].codeyve) {
          Vehicle = this.state.vehiclePanel.vehicles[i]
        }
      }

      var dropObject = [],
        pickupObject = [],
        drops = 0,
        pickups = 0
      var startTime = '',
        endTime = ''
      var totalWeight = 0
      var ddate = ''
      var totalVolume = 0
      var fld_doc_capacity = 0
      var fld_uom_volume = ''
      var fld_uom_capacity = ''
      var flds_uom_volume = ''
      var fld_doc_volume = 0
      let totalCases = 0
      let mainCases = 0
      var flds_uom_capacity = ''
      var fld_doc_qty = 0
      let fld_doc_cases = 0
      let flg_doc_maincases = 0
      var flds_per_volume = ''
      var fld_uom_qty = ''
      var weight = ''
      var volume = ''
      var vol_unit = ''
      var wei_unit = ''
      var percentageMass = 0
      var percentageVolume = 0
      var VehicleObject = Vehicle
      var flds_per_capacity = 0
      var flds_doc_capacity = 0
      var flds_doc_volume = 0
      var vehobj = []
      var itemTrip = {
        selectedTripData: [],
        timelineInterval: [],
        equipments: [],
        trailers: [],
        quantities: [],
        geometry: currRoute.geometry,
      }
      var timelneInterval = []
      // itemTrip.selectedTripData = GroupedObjects;
      // itemTrip.timelineInterval = [];
      itemTrip.equipments = []
      itemTrip.trailers = []
      itemTrip.quantities = []
      var freqtype = false
      var appointmentExist = false

      // loop thorugh the documents steps

      for (let t = 0; t < currRoute.steps.length; t++) {
        var ttime = ''
        var currTask = currRoute.steps[t]

        var prevTask = t > 0 ? currRoute.steps[t - 1] : null;
        if (currTask.type !== 'start' && currTask.type !== 'end') {
          var docno = currTask.description
          for (let d = 0; d < docsPanel.length; d++) {
            var currDoc = docsPanel[d]
            var SelectedDoc = []
            if (currDoc.docnum === docno) {



              const legDistance =
                prevTask && currTask.distance && prevTask.distance !== undefined
                  ? (currTask.distance - prevTask.distance) / 1000
                  : 0;

              const legDuration =
                prevTask && currTask.duration && prevTask.duration !== undefined
                  ? currTask.duration - prevTask.duration
                  : 0;


              currDoc.vehicleCode = Veh
              currDoc.arrival = secondsToHms(currTask.arrival)
              // currDoc.time = convertSecToMin(legDuration)

              //
              currDoc.time = convertSecToHr(legDuration).toFixed(3);
              let tempwaittime = 0  //convertHrToSec(currDoc.waitingTime)
              let tempservicetime = currTask.service - tempwaittime
              currDoc.serTime = secondsToHms(currTask.service)
              currDoc.distance = legDistance
              currDoc.end = secondsToHms(
                currTask.arrival + currTask.service + tempwaittime
              )
              ttime = currDoc.arrival
              if (currDoc.doctype === 'PRECEIPT') {
                pickups = pickups + 1
                currDoc.panelType = 'pickup'
                pickupObject.push(currDoc)
                fld_doc_capacity = fld_doc_capacity + currDoc.netweight
                fld_doc_volume = fld_doc_volume + currDoc.volume
                fld_doc_cases = fld_doc_cases + currDoc.noofCases

                flg_doc_maincases = flg_doc_maincases + currDoc.mainCases

                let tempqty = 0,
                  tempuom = ''
                currDoc.products &&
                  currDoc.products.length > 0 &&
                  currDoc.products.map((prod, index) => {
                    tempqty = tempqty + parseInt(prod.quantity)
                    tempuom = prod.uom
                  })
                fld_doc_qty = fld_doc_qty + tempqty
                // fld_uom_qty = fld_uom_qty + tempuom;
                if (!fld_uom_qty.includes(tempuom)) {
                  fld_uom_qty += tempuom
                }
              } else {
                drops = drops + 1
                currDoc.panelType = 'drop'
                dropObject.push(currDoc)
                fld_doc_capacity = fld_doc_capacity + currDoc.netweight
                fld_doc_volume = fld_doc_volume + currDoc.volume
                //  fld_doc_cases = fld_doc_cases + currDoc.noofCases
                fld_doc_cases += parseFloat(currDoc.noofCases)

                flg_doc_maincases += parseInt(currDoc.mainCases);

                let tempqty = 0,
                  tempuom = ''
                currDoc.products &&
                  currDoc.products.length > 0 &&
                  currDoc.products.map((prod, index) => {
                    tempqty = tempqty + parseInt(prod.quantity)
                    tempuom = prod.uom
                  })
                fld_doc_qty = fld_doc_qty + tempqty
                // fld_uom_qty = fld_uom_qty + tempuom;

                if (!fld_uom_qty.includes(tempuom)) {
                  fld_uom_qty += tempuom
                }
              }
              itemTrip.selectedTripData.push(currDoc)
              totalWeight =
                parseFloat(totalWeight) + parseFloat(currDoc.netweight)
              totalVolume = parseFloat(totalVolume) + parseFloat(currDoc.volume)
              break
            }
          }
          //end of search task with document panel
        } // end of if, task
        else if (currTask.type === 'start') {
          startTime = secondsToHms(currTask.arrival)
          ttime = startTime
        } else if (currTask.type === 'end') {
          endTime = secondsToHms(currTask.arrival)
          ttime = endTime
        }
        //for timeline
        var index = t * 12
        timelneInterval.push({ value: index, label: ttime })

      } // end of steps
      // totalWeight = 0; //totalWeight + parseInt(docItem.obbject.netweight);
      // totalVolume = 0; //totalVolume + parseInt(docItem.obbject.volume);
      ddate = this.state.date

      itemTrip.timelineInterval = timelneInterval
      var TimelineInterval = VehicleObject.timelineInterval
      var stops = pickups + drops
      var site = VehicleObject.fcy
      var capacity = VehicleObject.capacities

      fdistanceCost = VehicleObject.costperunitd * Number(auto_tot_distance)
      if (auto_total_time > VehicleObject.overtimestar) {
        fovertimecost =
          (auto_total_time - VehicleObject.overtimestar) *
          VehicleObject.costperunito
        fRegularcost = VehicleObject.overtimestar * VehicleObject.costperunitt
        ftimeCost = Math.round(fovertimecost + fRegularcost)
      } else {
        fRegularcost = VehicleObject.costperunitt * auto_total_time
        ftimeCost = fRegularcost
      }
      ffixedcost = VehicleObject.fixedcost
      ftotalCost = VehicleObject.fixedcost + fdistanceCost + ftimeCost
      var defaultDriver = '',
        defaultDrivername = ''
      if (
        VehicleObject.driverid === ' ' ||
        VehicleObject.driverid === '' ||
        VehicleObject.driverid === null
      ) {
        //assign some random driver from the active drivers
        var activeDrivers = this.state.vehiclePanel.drivers
        var tempTripPanel = this.state.tripsPanel
        var sflag = false
        var dflag = false

        let driverflg = false
        let ExistingTripdata = []

        //
        let temptrip2 = this.state.tripsPanel
        if (temptrip2.length > 0) {
          for (let i = 0; i < temptrip2.length; i++) {
            const acttrip = temptrip2[i]
            if (acttrip.code === Veh) {
              // defaultdriver = trip.driverid;
              defaultDriver = acttrip.driverId
              defaultDrivername = acttrip.driverName
              driverflg = true
              break // Exit the loop when driverflg is true
            } else {
              if (trip && trip.driver !== null) {
                allocatedDrivers.push(trip.driver)
              }
              // ExistingTripdata.push(tripData);
            }
          }
        }
        if (!driverflg && selDrivers?.length > 0) {
          if (allocatedDrivers.length > 0) {
            for (let seldriver of selDrivers) {
              if (!allocatedDrivers.includes(seldriver.driverid)) {

                driverflg = true
                defaultDriver = seldriver.driverid
                defaultDrivername = seldriver.driver
                allocatedDrivers.push(seldriver.driverid)
                break // Exit the loop if a driver is not allocated
              } else if (allocatedDrivers.length === selDrivers.length) {
                driverflg = true
                defaultDriver = seldriver.driverid
                defaultDrivername = seldriver.driver
                break
              }
            }
          } else {
            defaultDriver = selDrivers[0].driverid
            defaultDrivername = selDrivers[0].driver
            allocatedDrivers.push(selDrivers[0].driverid)
          }
        }
      } else {
        defaultDriver = VehicleObject.driverid
        if (
          VehicleObject.drivername != null ||
          VehicleObject.drivername != ''
        ) {
          defaultDriver = VehicleObject.driverid
          defaultDrivername = VehicleObject.drivername
        }
      }

      var volume = VehicleObject.vol
      //  var StartTime = VehicleObject.timelineInterval[0].label;
      vehobj = VehicleObject
      flds_uom_capacity = VehicleObject.xweu
      flds_uom_volume = VehicleObject.xvol
      var dddd1 = new Date()
      let h = (dddd1.getHours() < 10 ? '0' : '') + dddd1.getHours()
      let m = (dddd1.getMinutes() < 10 ? '0' : '') + dddd1.getMinutes()
      let currtime = h + ':' + m

      // if (totalWeight > 0) {
      //   percentageMass = 0; //((parseInt(totalWeight) / parseInt(capacity)) * 100).toFixed(1);
      // }

      // if (totalVolume > 0) {
      //   percentageVolume = 0; //((parseInt(totalVolume) / parseInt(volume)) * 100).toFixed(1);
      // }
      if (totalWeight > 0) {
        // Convert totalWeight and capacity to floating-point numbers
        let weight = parseFloat(totalWeight)
        let cap = parseFloat(capacity)

        // Calculate the percentage mass and format it to one decimal place
        percentageMass = ((weight / cap) * 100).toFixed(2)

        // Store values as floating-point numbers
        flds_doc_capacity = weight
        flds_per_capacity = percentageMass
      }

      if (totalVolume > 0) {
        // Convert totalVolume and volume to floating-point numbers
        let volumeVal = parseFloat(totalVolume)
        let vol = parseFloat(volume)

        // Calculate the percentage volume and format it to one decimal place
        percentageVolume = ((volumeVal / vol) * 100).toFixed(2)
        // Store values as floating-point numbers
        flds_doc_volume = volumeVal
        flds_per_volume = percentageVolume
      }
      // totalVolume =
      //   totalVolume % 1 === 0
      //     ? totalVolume.toString() // If the number is an integer, show it without decimals
      //     : totalVolume.toFixed(2); // Otherwise, show it rounded to three decimal places

      // totalWeight =
      //   totalWeight % 1 === 0 ? totalWeight.toString() : totalWeight.toFixed(2);
      var today = new Date()
      var execdate = today.getDate()
      var trip = {
        arrSite: site,
        code: Veh,
        date: moment.tz(ddate, '').format('YYYY-MM-DD'),
        docdate: moment.tz(ddate, '').format('YYYY-MM-DD'),
        endDate: ddate,
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
        generatedBy: 'AutoScheduler',
        defaultDriver: '',
        trailers: 0,
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
        trialerObject: [],
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
          pickUps: [],
        },
        pickups: pickups,
        alldrivers: '',
        weightPercentage: percentageMass,
        volumePercentage: percentageVolume,
        totalWeight: totalWeight.toFixed(2) + ' ' + flds_uom_capacity,
        totalVolume: totalVolume.toFixed(2) + ' ' + flds_uom_volume,
        travelTime: auto_tot_travel_time,
        serviceTime: auto_service_time.toFixed(2),
        totalTime: Number((auto_total_time || 0).toFixed(2)),
        totalDistance: auto_tot_distance.toFixed(2),

        doc_capacity: fld_doc_capacity,
        uom_capacity: fld_uom_capacity,
        uom_volume: fld_uom_volume,
        doc_volume: fld_doc_volume,
        uom_qty: fld_uom_qty,
        doc_qty: fld_doc_qty,
        totalCases: fld_doc_cases.toString(),
        mainCases: flg_doc_maincases.toString(),
        fixedCost: ffixedcost,
        totalCost: Number((ftotalCost || 0).toFixed(2)),
        distanceCost: Number((fdistanceCost || 0).toFixed(2)),
        regularCost: Number((fRegularcost || 0).toFixed(2)),
        overtimeCost: Number((fovertimecost || 0).toFixed(2)),
        timeCost: Number((ftimeCost || 0).toFixed(2)),
        driverslist: '',
        allcustomers: '',
        customerlist: '',
      }

      console.log('Trip from route in submitRoutesforTripsCreation', trip)
      RouteprocessedData.push(trip)
    }
    console.log('RouteprocessedData', RouteprocessedData)
    TripsfromRoutes = RouteprocessedData
    console.log('TripsfromRoutes', TripsfromRoutes)
    this.ConfirmScheduledTrips(
      TripsfromRoutes,
      docsPanel,
      SelVehicles,
      res,
      X3SetupErrors,
      from,
      jobId,
      assignedShipments,
      assignedJobs,
      extraError, customerJobMap, NotesExecptions, fromBy, engineType
    )
  }

  ConfirmScheduledTrips = async (
    trips,
    selDocs,
    SelVeh,
    res,
    X3SetupErrors,
    from,
    jobId,
    assignedShipments,
    assignedJobs,
    extraError, customerJobMap, NotesExecptions, fromBy, engineType
  ) => {

    this.setState({ loader: true, loaderText: 'Trips are generating...' })

    try {
      const response = await fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/trips`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trips),
        }
      )

      if (!response.ok) {
        const contentType = response.headers.get('content-type') || ''
        let msg = 'Server Error'

        if (contentType.includes('application/json')) {
          try {
            const err = await response.json() // { status, message, ... }
            msg = err?.message || msg
          } catch {
            const text = await response.text()
            try {
              msg = JSON.parse(text)?.message || text || msg
            } catch {
              msg = text || msg
            }
          }
        } else {
          const text = await response.text()
          try {
            msg = JSON.parse(text)?.message || text || msg
          } catch {
            msg = text || msg
          }
        }

        throw new Error(msg)
      }

      const data = await response.json()

      // Success notifications
      if (data?.skippedDocuments?.length) {
        const skippedList = data.skippedDocuments.join(', ')
        this.notifySucess(
          `Trip generated successfully, but the following documents are excluded since they are already allocated to another trip: ${skippedList}`
        )
      } else {
        this.notifySucess('Trip Added/Updated Successfully')
      }

      // Update state/UI
      await this.handleDateChange(this.state.date)

      const oldTripCodes = this.existingTripsBeforeOptimization || [];

      const newTrips = this.state.tripsPanel.filter(
        trip => !oldTripCodes.includes(trip.itemCode)
      );


      // if (newTrips.length > 0) {
      //   await this.routeTripsWithTomTom(newTrips);
      // }

      this.setState({
        loader: false,
        checkedTrip: false,
        isDetail: false,
      })

      // Follow-up processing
      console.log("Group By", fromBy, engineType);

      if (fromBy === "ALL") {
        this.Exceptionalanalysis(
          selDocs,
          SelVeh,
          res,
          X3SetupErrors,
          from,
          assignedShipments,
          assignedJobs, jobId, extraError, customerJobMap, NotesExecptions
        )
      }

      if (engineType === "OSRM") {
        this.analyzeUnassignedDocs_OSRM(
          selDocs,
          SelVeh,
          res,
          trips,
          NotesExecptions
        );
      }

    } catch (error) {
      console.error('ConfirmScheduledTrips at catch ee error:', error)
      this.handleDateChange(this.state.date)
      this.setState({ loader: false })

      // Shows only the server message if present (e.g., "All the documents in the trip are already scheduled. So cannot generate Trip")
      this.notifyError(
        error?.message ||
        'Trip creation/updation failed: invalid  data or all the  documents already assigned to another trips.'
      )
    }
  }


  routeTripsWithTomTom = async (trips) => {


    if (!trips?.length) return;
    this.setState({
      loader: true,
      loaderText: `Optimizing routes... (0/${trips.length})`
    });
    for (let i = 0; i < trips.length; i++) {

      const trip = trips[i];
      try {
        await this.processTomTomTripAsync(trip);
      } catch (err) {
        console.warn("TomTom failed for", trip.itemCode);
        continue; // fallback silently
      }
      this.setState({
        loaderText: `Optimizing routes..  (${i + 1}/${trips.length})`
      });
    }

    await this.handleDateChange(this.state.date);
    this.setState({
      loader: false,
      loaderText: ""
    });
  };

  processTomTomTripAsync = async (trip) => {

    const tomTomResult = await this.callTomTom(trip);

    if (!tomTomResult) {
      console.warn("TomTom returned no result for", trip.itemCode);
      return; // fallback silently
    }

    const updatedTrip = this.buildTripFromTomTom(trip, tomTomResult);

    await this.submitTripsSilently([updatedTrip]); // WAIT for DB save
  };

  callTomTom = async (trip) => {

    const apiurl = 'https://api.tomtom.com/routing/1/calculateRoute/';
    const lanLat = this.buildCoordinateString(trip);

    const url =
      apiurl +
      encodeURIComponent(lanLat) +
      `/json?computeBestOrder=true&routeRepresentation=summaryOnly&computeTravelTimeFor=all&traffic=true&routeType=fastest&travelMode=truck&vehicleCommercial=true&vehicleLoadType=otherHazmatGeneral&key=ctZzLlfGUpaNdfHiIobOeub8NBzzGkNG`;
    const response = await fetch(url);

    if (!response.ok) return null;

    const data = await response.json();

    if (!data.routes || data.routes.length === 0) return null;

    return data;
  };

  buildTripFromTomTom = (trip, res) => {

    if (!res?.routes?.[0]) return trip;

    const route = res.routes[0];
    const legs = route.legs;

    if (!legs || !trip.totalObject?.selectedTripData) return trip;

    const originalStops = [...trip.totalObject.selectedTripData];

    // =====================================================
    // 1️⃣ REORDER STOPS USING originalWaypointIndexAtEndOfLeg
    // =====================================================

    const visitOrder = [];

    legs.forEach((leg) => {
      if (leg.summary.originalWaypointIndexAtEndOfLeg !== undefined) {
        visitOrder.push(leg.summary.originalWaypointIndexAtEndOfLeg);
      }
    });

    const reorderedStops = visitOrder.map(i => originalStops[i]);

    // =====================================================
    // 2️⃣ DETERMINE TRIP START TIME
    // =====================================================

    let tripStartTime = trip.startTime;

    if (!tripStartTime && trip.vehicleObject) {
      const vehStartSec = splitTimeAndConv2Sec(
        trip.vehicleObject.starttime || "00:00"
      );
      const loadingSec = convertHrToSec(
        trip.vehicleObject.startdepots || 0
      );
      tripStartTime = secondsToHms(vehStartSec + loadingSec);
    }

    if (!tripStartTime) tripStartTime = "00:00";
    trip.startTime = tripStartTime;

    let [hr, min] = tripStartTime.split(":");

    let departure = new Date();
    departure.setHours(Number(hr));
    departure.setMinutes(Number(min));
    departure.setSeconds(0);

    // =====================================================
    // 3️⃣ REBUILD STOPS + TIMELINE
    // =====================================================

    const rebuiltStops = [];
    const timeline = [];

    timeline.push({
      value: 0,
      label: tripStartTime
    });

    let totalServiceSec = 0;
    let totalWaitingSec = 0;

    reorderedStops.forEach((stop, i) => {

      const leg = legs[i];
      if (!leg) return;

      const travelSec = leg.summary.travelTimeInSeconds;
      const distanceMeters = leg.summary.lengthInMeters;

      // ARRIVAL TIME
      const arrivalDate = new Date(departure.getTime() + travelSec * 1000);

      const arrivalSec =
        arrivalDate.getHours() * 3600 +
        arrivalDate.getMinutes() * 60;

      const arrival = formatTime(arrivalSec);

      // SERVICE + WAITING
      const serviceSec = convertHrToSec(stop.serviceTime || 0);
      const waitingSec = convertHrToSec(stop.waitingTime || 0);

      totalServiceSec += serviceSec;
      totalWaitingSec += waitingSec;

      // DEPARTURE FROM STOP
      departure = new Date(
        arrivalDate.getTime() + (serviceSec + waitingSec) * 1000
      );

      const endSec =
        departure.getHours() * 3600 +
        departure.getMinutes() * 60;

      const end = formatTime(endSec);

      rebuiltStops.push({
        ...stop,
        arrival,
        end,
        time: convertSecToHr(travelSec).toFixed(3),
        distance: (distanceMeters / 1000).toFixed(3),
        tTime: travelSec,
        tDistance: distanceMeters
      });

      timeline.push({
        value: (i + 1) * 12,
        label: arrival
      });
    });

    // =====================================================
    // 4️⃣ FINAL LEG (LAST STOP → END DEPOT)
    // =====================================================

    const finalLeg = legs[reorderedStops.length];

    if (finalLeg) {
      const finalTravelSec = finalLeg.summary.travelTimeInSeconds;

      departure = new Date(
        departure.getTime() + finalTravelSec * 1000
      );
    }

    // =====================================================
    // 5️⃣ FINAL END TIME
    // =====================================================

    const finalEndSec =
      departure.getHours() * 3600 +
      departure.getMinutes() * 60;

    const finalEndTime = formatTime(finalEndSec);
    trip.endTime = finalEndTime;

    timeline.push({
      value: (reorderedStops.length + 1) * 12,
      label: finalEndTime
    });

    // =====================================================
    // 6️⃣ UPDATE TRIP OBJECT
    // =====================================================

    trip.totalObject.selectedTripData = rebuiltStops;
    trip.totalObject.timelineInterval = timeline;

    const totalTravelSec = route.summary.travelTimeInSeconds;
    const totalDistanceKm = route.summary.lengthInMeters / 1000;

    const totalTripSec =
      totalTravelSec + totalServiceSec + totalWaitingSec;

    trip.travelTime = formatTime(totalTravelSec);
    trip.serviceTime = convertSecToHr(totalServiceSec);
    trip.totalTime = convertSecToHr(totalTripSec);
    trip.totalDistance = totalDistanceKm.toFixed(2);

    const formattedDate = moment
      .tz(this.state.date, '')
      .format('YYYY-MM-DD');

    trip.date = formattedDate;
    trip.docdate = formattedDate;
    trip.datexec = new Date();
    trip.heuexec = moment().format("HH:mm");
    trip.route = true;
    trip.optistatus = "Optimized";
    trip.generatedBy = "AutoScheduler";

    return trip;
  };


  buildTripFromTomTom1111 = (trip, res) => {

    if (!res?.routes?.[0]) return trip;

    const route = res.routes[0];
    const legs = route.legs;

    if (!legs || !trip.totalObject?.selectedTripData) return trip;

    const originalStops = [...trip.totalObject.selectedTripData];

    // =====================================================
    // 1️⃣ REORDER STOPS USING originalWaypointIndexAtEndOfLeg
    // =====================================================

    const visitOrder = [];

    legs.forEach((leg) => {
      if (leg.summary.originalWaypointIndexAtEndOfLeg !== undefined) {
        visitOrder.push(leg.summary.originalWaypointIndexAtEndOfLeg);
      }
    });

    // Remove final depot leg
    //  if (visitOrder.length > originalStops.length) {
    //    visitOrder.pop();
    //  }

    const reorderedStops = visitOrder.map(i => originalStops[i]);

    // =====================================================
    // 2️⃣ DETERMINE TRIP START TIME
    // (Vehicle start + loading)
    // =====================================================

    let tripStartTime = trip.startTime;

    if (!tripStartTime && trip.vehicleObject) {
      const vehStartSec = splitTimeAndConv2Sec(
        trip.vehicleObject.starttime || "00:00"
      );
      const loadingSec = convertHrToSec(
        trip.vehicleObject.startdepots || 0
      );
      tripStartTime = secondsToHms(vehStartSec + loadingSec);
    }

    if (!tripStartTime) tripStartTime = "00:00";

    trip.startTime = tripStartTime;

    // end of trip start time


    let [hr, min] = tripStartTime.split(":");

    let departure = new Date();
    departure.setHours(Number(hr));
    departure.setMinutes(Number(min));
    departure.setSeconds(0);

    // =====================================================
    // 3️⃣ REBUILD STOPS + TIMELINE
    // =====================================================

    const rebuiltStops = [];
    const timeline = [];

    // Add start time to timeline
    timeline.push({
      value: 0,
      label: tripStartTime
    });

    let totalServiceSec = 0;
    let totalWaitingSec = 0;

    reorderedStops.forEach((stop, i) => {

      const leg = legs[i];
      if (!leg) return;

      const travelSec = leg.summary.travelTimeInSeconds;
      const distanceMeters = leg.summary.lengthInMeters;

      // ARRIVAL = departure + travel
      const arrivalDate = new Date(departure.getTime() + travelSec * 1000);

      const arrivalSec =
        arrivalDate.getHours() * 3600 +
        arrivalDate.getMinutes() * 60;

      const arrival = formatTime(arrivalSec);

      // Service + waiting
      const serviceSec = convertHrToSec(stop.serviceTime || 0);
      const waitingSec = convertHrToSec(stop.waitingTime || 0);

      totalServiceSec += serviceSec;
      totalWaitingSec += waitingSec;

      // DEPARTURE = arrival + service + waiting
      departure = new Date(
        arrivalDate.getTime() + (serviceSec + waitingSec) * 1000
      );

      const endSec =
        departure.getHours() * 3600 +
        departure.getMinutes() * 60;

      const end = formatTime(endSec);

      rebuiltStops.push({
        ...stop,
        arrival,
        end,
        time: convertSecToHr(travelSec).toFixed(3),
        distance: (distanceMeters / 1000).toFixed(3),
        tTime: travelSec,
        tDistance: distanceMeters
      });

      // Add arrival to timeline
      timeline.push({
        value: (i + 1) * 12,
        label: arrival
      });
    });

    // =====================================================
    // 4️⃣ FINAL END TIME
    // =====================================================

    const finalEndSec =
      departure.getHours() * 3600 +
      departure.getMinutes() * 60;

    const finalEndTime = formatTime(finalEndSec);

    trip.endTime = finalEndTime;

    // Add final end time to timeline
    timeline.push({
      value: (reorderedStops.length + 1) * 12,
      label: finalEndTime
    });

    // Update trip object
    trip.totalObject.selectedTripData = rebuiltStops;
    trip.totalObject.timelineInterval = timeline;

    // =====================================================
    // 5️⃣ UPDATE SUMMARY (CORRECT LOGIC)
    // =====================================================

    const totalTravelSec = route.summary.travelTimeInSeconds;
    const totalDistanceKm = route.summary.lengthInMeters / 1000;

    const totalTripSec =
      totalTravelSec + totalServiceSec + totalWaitingSec;

    trip.travelTime = formatTime(totalTravelSec);          // Drive only
    trip.serviceTime = convertSecToHr(totalServiceSec);    // Optional
    trip.totalTime = convertSecToHr(totalTripSec);         // Full time
    trip.totalDistance = totalDistanceKm.toFixed(2);
    const formattedDate = moment.tz(this.state.date, '').format('YYYY-MM-DD');

    trip.date = formattedDate;
    trip.docdate = formattedDate;
    trip.datexec = new Date();
    trip.heuexec = moment().format("HH:mm");
    trip.route = true;
    trip.optistatus = "Optimized";
    trip.generatedBy = "AutoScheduler";

    return trip;
  };



  buildTripFromTomTom11 = (trip, res) => {

    if (!res || !res.routes || !res.routes[0]) return trip;

    const route = res.routes[0];
    const legs = route.legs;

    if (!legs || !trip.totalObject?.selectedTripData) return trip;

    const originalStops = [...trip.totalObject.selectedTripData];

    // 🔥 STEP 1: Build order from LEGS (correct way)
    const visitOrder = [];

    legs.forEach((leg) => {
      if (leg.summary.originalWaypointIndexAtEndOfLeg !== undefined) {
        visitOrder.push(leg.summary.originalWaypointIndexAtEndOfLeg);
      }
    });

    // Remove last leg (return to depot)
    if (visitOrder.length > originalStops.length) {
      visitOrder.pop();
    }

    // 🔥 STEP 2: Reorder stops exactly as TomTom traveled
    const reorderedStops = visitOrder.map(index => originalStops[index]);



    let tripStartTime = trip.startTime;

    if (!tripStartTime && trip.vehicleObject) {
      const vehStartSec = splitTimeAndConv2Sec(trip.vehicleObject.starttime || "00:00");
      const loadingSec = convertHrToSec(trip.vehicleObject.startdepots || 0);
      tripStartTime = secondsToHms(vehStartSec + loadingSec);
      trip.startTime = tripStartTime;
    }

    if (!tripStartTime) tripStartTime = "00:00";

    let [startHr, startMin] = tripStartTime.split(':');

    let departure = new Date();
    departure.setHours(Number(startHr));
    departure.setMinutes(Number(startMin));
    departure.setSeconds(0);

    // ---------------------------------------------------
    // 🔥 STEP 3: Rebuild Stops With Correct Timing
    // ---------------------------------------------------

    const rebuiltStops = [];

    reorderedStops.forEach((stop, i) => {

      const leg = legs[i];
      if (!leg) return;

      const travelSec = leg.summary.travelTimeInSeconds;
      const distanceMeters = leg.summary.lengthInMeters;

      // ARRIVAL = departure + travel
      const arrivalDate = new Date(departure.getTime() + travelSec * 1000);

      const arrivalSec =
        arrivalDate.getHours() * 3600 +
        arrivalDate.getMinutes() * 60;

      const arrival = formatTime(arrivalSec);

      // Service & waiting time
      const serviceSec = convertHrToSec(stop.serviceTime || 0);
      const waitingSec = convertHrToSec(stop.waitingTime || 0);

      // DEPARTURE = arrival + service + waiting
      departure = new Date(
        arrivalDate.getTime() + (serviceSec + waitingSec) * 1000
      );

      const endSec =
        departure.getHours() * 3600 +
        departure.getMinutes() * 60;

      const end = formatTime(endSec);

      rebuiltStops.push({
        ...stop,
        arrival,
        end,
        time: convertSecToHr(travelSec).toFixed(3),
        distance: (distanceMeters / 1000).toFixed(3),
        tTime: travelSec,
        tDistance: distanceMeters
      });
    });



    // 🔥 STEP 3: Now rebuild timing cleanly
    // let departure = new Date(route.summary.departureTime);






    /*
      const rebuiltStops = reorderedStops.map((stop, i) => {
    
        const leg = legs[i];
        const travelSec = leg.summary.travelTimeInSeconds;
        const distanceMeters = leg.summary.lengthInMeters;
    
        const arrivalDate = new Date(departure.getTime() + travelSec * 1000);
    
        const arrivalSec =
          arrivalDate.getHours() * 3600 +
          arrivalDate.getMinutes() * 60;
    
        const arrival = formatTime(arrivalSec);
    
        const serviceSec = convertHrToSec(stop.serviceTime || 0);
        const waitingSec = convertHrToSec(stop.waitingTime || 0);
    
        departure = new Date(
          arrivalDate.getTime() + (serviceSec + waitingSec) * 1000
        );
    
        const endSec =
          departure.getHours() * 3600 +
          departure.getMinutes() * 60;
    
        const end = formatTime(endSec);
    
        return {
          ...stop,
          arrival,
          end,
          time: convertSecToHr(travelSec).toFixed(3),
          distance: (distanceMeters / 1000).toFixed(3),
          tTime: travelSec,
          tDistance: distanceMeters
        };
      });
      */

    trip.totalObject.selectedTripData = rebuiltStops;

    // 🔥 STEP 4: Update summary
    trip.travelTime = formatTime(route.summary.travelTimeInSeconds);
    trip.totalDistance = (route.summary.lengthInMeters / 1000).toFixed(2);
    trip.totalTime = convertSecToHr(route.summary.travelTimeInSeconds);

    const formattedDate = moment.tz(this.state.date, '').format('YYYY-MM-DD');

    trip.date = formattedDate;
    trip.docdate = formattedDate;
    trip.datexec = new Date();
    trip.heuexec = moment().format("HH:mm");
    trip.travelTime = formatTime(route.summary.travelTimeInSeconds);
    trip.totalDistance = (route.summary.lengthInMeters / 1000).toFixed(2);
    trip.totalTime = convertSecToHr(route.summary.travelTimeInSeconds);
    trip.optistatus = "Optimized";
    trip.route = true;
    trip.generatedBy = "AutoScheduler";

    return trip;
  };

  buildCoordinateString = (trip) => {

    if (!trip || !trip.totalObject || !trip.totalObject.selectedTripData) {
      return '';
    }

    const stops = trip.totalObject.selectedTripData;

    // Find depot coordinates
    const depSite = this.state.sites.find(
      site => site.id === trip.depSite
    );

    const arrSite = this.state.sites.find(
      site => site.id === trip.arrSite
    );

    if (!depSite || !arrSite) return '';

    // Start with depot
    let coordinateString = `${depSite.lat},${depSite.lng}`;

    // Add all stops
    stops.forEach(stop => {
      if (stop.lat && stop.lng) {
        coordinateString += `:${stop.lat},${stop.lng}`;
      }
    });

    // End with arrival depot
    coordinateString += `:${arrSite.lat},${arrSite.lng}`;

    return coordinateString;
  };

  submitTripsSilently = async (trips) => {

    try {

      const res = await fetch(
        `${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/trips`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trips),
        }
      );

      if (!res.ok) {
        throw new Error("Silent trip update failed");
      }

      return true;

    } catch (error) {

      console.warn("Silent trip update error:", error.message);

      return false;
    }
  };


  loadingSecs = (hr, min, loadingHrs) => {
    if (loadingHrs) {
      return formatTime(convertHrToSec(hr) + convertMinToSec(min) + convertHrToSec(loadingHrs));
    } else {
      return formatTime(convertHrToSec(hr) + convertMinToSec(min));
    }
  }

  routeSingleTripWithTomTom = (data) => {

    let passedData = data;
    this.setState({ loader: true });

    // pre process data before using in Optimisation
    let hr;
    let min;
    let loadingHrs;
    let unloadHrs;
    let loadingTime;
    let tripEndTime = [];
    let c, d, m, v;
    let date = new Date();
    this.state.vehiclePanel && this.state.vehiclePanel.vehicles.length > 0 && this.state.vehiclePanel.vehicles.map((vehicle) => {
      if (vehicle.codeyve === data.code) {
        if (vehicle.starttime.includes(':')) {
          hr = vehicle.starttime.split(':')[0];
          min = vehicle.starttime.split(':')[1];
        } else if (vehicle.starttime.length === 4) {
          hr = vehicle.starttime.substring(0, 2);
          min = vehicle.starttime.substring(2, 4);
        }
        loadingHrs = vehicle.startdepots;
        unloadHrs = vehicle.enddepotserv;
      }
    });
    hr = formatHrMin(parseInt(hr));
    min = formatHrMin(parseInt(min));
    if (data.optistatus === "Optimized" || data.optistatus === "optimized") {
      hr = data.startTime.split(':')[0];
      min = data.startTime.split(':')[1];
      loadingTime = this.loadingSecs(hr, min)
    } else {
      loadingTime = this.loadingSecs(hr, min, loadingHrs);
    }

    //unit setting
    this.state.sites && this.state.sites.length > 0 && this.state.sites.map((site) => {
      if (data.depSite === site.id) {
        m = site.massunit;
        v = site.volunit;
        d = site.distunit;
        c = site.cur;

      }
    })

    let siteLat;
    let siteLang;
    let distanceCost = 0;
    let timeCost = 0;
    let totalCost = 0;
    let Regularcost = 0;
    let overtimecost = 0;

    let arrSiteLat, setHandleDateChange;
    let arrSiteLang, setEndTime, setTotalTime, setTotalDistance, loadHrs = loadingHrs;
    let setHr = hr, setMin = min, setCurrency = c, setDistunts = d;
    let setVolunits = v, setMassunit = m, setDistErrorMessage = '', setTimeErrorMessage = '', setTripsClosedErrorMessage = '', setTripClosedError = false;
    let setDistError = false, setTimeError = false, setOptimizationMessage = '', setOptiStatusError = false;

    this.state.sites.map((site) => {
      if (data.depSite === site.id) {
        siteLat = site.lat;
        siteLang = site.lng;
      }
      if (data.arrSite === site.id) {
        arrSiteLat = site.lat;
        arrSiteLang = site.lng;
      }
    })

    let apiurl;
    let jsonUrl;
    apiurl = 'https://api.tomtom.com/routing/1/calculateRoute/';
    jsonUrl = `/json?computeBestOrder=true&routeRepresentation=summaryOnly&computeTravelTimeFor=all&routeType=shortest&avoid=unpavedRoads&travelMode=truck&vehicleMaxSpeed=${data.vehicleObject.maxspeed}&vehicleWeight=${data.vehicleObject.capacities}&vehicleLength=${((data.vehicleObject.length) / 100)}&vehicleWidth=${((data.vehicleObject.width) / 100)}&vehicleHeight=${((data.vehicleObject.heigth) / 100)}&vehicleCommercial=true&vehicleLoadType=otherHazmatGeneral&vehicleEngineType=combustion&key=ctZzLlfGUpaNdfHiIobOeub8NBzzGkNG`;



    let prevTripsDist = 0;
    let prevTripsTime = 0;
    var summaryData = [];
    var optiindex = [];
    let serviceTime = [];
    let waitingTime = [];
    let lanLat = siteLat + ',' + siteLang;
    data.totalObject.selectedTripData.map((tripData) => {
      if (Object.keys(tripData).length > 0) {
        serviceTime.push(tripData.serviceTime);
        waitingTime.push(tripData.waitingTime);
        lanLat = lanLat + ':' + tripData.lat + ',' + tripData.lng;
      }
    });
    //change end depo lan n lat below siteLat + ',' + siteLang
    lanLat = lanLat + ':' + arrSiteLat + ',' + arrSiteLang
    let url = apiurl + encodeURIComponent(lanLat) + jsonUrl;
    return fetch(url)
      .then(function (response) {
        if (response.status === 200) {
          // this.setState({ loader: false });
          return response.json()
        } else {
          this.setState({ loader: false });
        }
      }).then((res) => {
        if (res && res.optimizedWaypoints) {
          optiindex.push(res.optimizedWaypoints);
        }

        if (res && res.routes) {
          summaryData.push(res.routes);
        }
        let summaryResult = { "summarydata": [...summaryData], "serviceTime": serviceTime, "waitingTime": waitingTime }
        if (summaryResult && summaryResult.summarydata && summaryResult.serviceTime && summaryResult.waitingTime) {
          let summaryData = summaryResult.summarydata;
          let serviceTime = summaryResult.serviceTime;
          let waitingTime = summaryResult.waitingTime;
          let results = summaryData[0];
          if (results) {
            let legs = results[0].legs;
            if (data && legs && data.stops < results[0].legs.length) {
              let dateformatter = (date, index) => {
                let d = date.toDateString()
                let t = date.toTimeString()
                t = t.split(" ")[0]
                return d + " " + t;
              }
              let resultsData = [];
              var departure = new Date();
              let depsetHrs, depsetMin;
              let optimisedTrips = [];
              this.state.tripsList.map((tripData) => {
                if ((tripData.optistatus === 'Optimized' || tripData.optistatus === 'optimized') && tripData.itemCode !== data.itemCode) {
                  optimisedTrips.push(tripData);
                }
              });
              let currTripTimeHr = setHr;
              let currTripTimeMin = setMin;
              departure.setHours(Number(currTripTimeHr));
              departure.setMinutes(Number(currTripTimeMin));
              let sameTrips = [];
              let startTimeInSec;
              if (optimisedTrips.length > 0) {
                optimisedTrips.map((optiTrip) => {
                  if (optiTrip.code === data.code && optiTrip.docdate === data.docdate) {
                    sameTrips.push(optiTrip);
                  }
                })
              };
              let previousCheck = [];
              this.state.tripsList.map((tripPanel) => {
                if (tripPanel.code === data.code && tripPanel.docdate === data.docdate) {
                  if (tripPanel.trips === data.trips - 1) {
                    previousCheck.push(tripPanel)
                  }
                }
              })
              let optimizationStatus = false;
              if (previousCheck.length > 0) {
                if (previousCheck[0].optistatus === 'Optimized') {
                  optimizationStatus = false;
                } else {
                  optimizationStatus = true;
                }
              }

              if (sameTrips.length > 0) {
                let sameTripTime = []
                sameTrips.map((times, index) => {
                  sameTripTime.push({ hr: times.endTime.split(":")[0], min: times.endTime.split(":")[1] })
                });
                sameTripTime.sort((a, b) => {
                  return Number(b.hr) - Number(a.hr)
                })
                if (sameTripTime.length > 0) {
                  currTripTimeHr = sameTripTime[0].hr;
                  currTripTimeMin = sameTripTime[0].min;
                  setHr = currTripTimeHr;
                  setMin = currTripTimeMin;

                  let sametripTime = formatTime(convertHrToSec(currTripTimeHr) + convertMinToSec(currTripTimeMin) + convertHrToSec(unloadHrs) + convertHrToSec(loadHrs))
                  //departure.setHours(Number(currTripTimeHr) + 1);
                  let sametripHrs = sametripTime.split(':')[0];
                  let sametripMin = sametripTime.split(':')[1];
                  if (Number(setHr) >= Number(sametripHrs)) {
                    if (Number(setHr) == Number(sametripHrs) && Number(setMin) > Number(sametripMin)) {
                      sametripHrs = setHr;
                      sametripMin = setMin;
                    } else if (setHr > sametripHrs) {
                      sametripHrs = setHr;
                      sametripMin = setMin;
                    }
                  }
                  departure.setHours(Number(sametripHrs));
                  departure.setMinutes(Number(sametripMin));
                }
                //need to check
                startTimeInSec = convertMinToSec(departure.getMinutes()) + convertHrToSec(departure.getHours());

              } else {
                startTimeInSec = convertMinToSec(departure.getMinutes()) + convertHrToSec(departure.getHours());
              }
              startTimeInSec = formatTime(startTimeInSec);
              let startTimeHrs = startTimeInSec.split(':')[0];
              let startTimeMins = startTimeInSec.split(':')[1];
              departure.setHours(startTimeHrs);
              departure.setMinutes(startTimeMins);


              //  setHandleDateChange = departure;

              let startTimeHr = departure.getHours();
              let startTimeMin = departure.getMinutes();
              let startTimeLocal = formatHrMin(startTimeHr) + ":" + formatHrMin(startTimeMin);
              let prevDate = data.docdate;
              let prevDocTime = '00:00';

              legs.forEach((data_inside, index) => {
                let time = data_inside.summary.travelTimeInSeconds
                let length = data_inside.summary.lengthInMeters;
                let sec = 0;
                let waitSec = 0;
                if (Number(serviceTime[index])) {
                  sec = sec + convertHrToSec(Number(serviceTime[index]))
                } else {
                  sec = sec + 0;
                }
                if (Number(waitingTime[index])) {
                  waitSec = waitSec + convertHrToSec(Number(waitingTime[index]))
                } else {
                  waitSec = waitSec + 0;
                }
                let serTime = formatTime(convertHrToSec(Number(serviceTime[index])));
                let waitTime = formatTime(convertHrToSec(Number(waitingTime[index])));
                serTime = serTime.split(':');
                let serTimeHr = serTime[0];
                let serTimeMin = serTime[1];
                serTime = formatHrMin(serTimeHr) + ":" + formatHrMin(serTimeMin);

                waitTime = waitTime.split(':');
                let waitTimeHr = waitTime[0];
                let waitTimeMin = waitTime[1];
                waitTime = formatHrMin(waitTimeHr) + ":" + formatHrMin(waitTimeMin);

                let res = {
                  start: dateformatter(departure, index),
                  distance: length / 1000,
                  time: convertSecToHr(time).toFixed(3),
                  serviceTime: serviceTime[index],
                  serTime: splitTime(serTime),
                  tTime: time,
                  tDistance: length
                };
                departure.setSeconds(departure.getSeconds() + time + sec + waitSec);
                //added sersec+wait sec+time
                let endTimeRoute = dateformatter(departure);
                endTimeRoute = new Date(endTimeRoute);
                let endTimeHr = endTimeRoute.getHours();
                let endTimeMin = endTimeRoute.getMinutes();
                endTimeRoute = (endTimeHr) + ':' + endTimeMin;
                var a = endTimeRoute.split(':');
                var endTimeSec = (+a[0]) * 60 * 60 + (+a[1]) * 60;
                var arrivalTime = endTimeSec -
                  (Number(serviceTime[index]) * 60 * 60) - (Number(waitingTime[index]) * 60 * 60);
                arrivalTime = formatTime(arrivalTime);
                res.end = splitTime(endTimeRoute);
                res.arrival = splitTime(arrivalTime);

                res.startDate = prevDate;
                res.endDate = prevDate
                let latestEndDate = prevDate
                let latestStartDate = prevDate
                let prevdocsplittime = prevDocTime.split(':');

                let currartsec = time;
                let prevdocsec = (+prevdocsplittime[0]) * 60 * 60 + (+prevdocsplittime[1]) * 60;
                let temptotsec = currartsec + prevdocsec;
                let temptothrs = convertSecToHr(temptotsec);
                let daysfromtemphrs = temptothrs / 24;

                if (daysfromtemphrs > 1) {
                  let tempdate = moment(prevDate).add(Math.floor(daysfromtemphrs), 'days');
                  let newStartDate = moment(tempdate).format('YYYY-MM-DD');
                  latestStartDate = newStartDate;
                  latestEndDate = newStartDate;
                  prevDate = newStartDate;

                }
                else {

                  if (prevdocsplittime[0] > endTimeRoute.split(':')[0]) {
                    let tempdate1 = moment(prevDate).add(1, 'days');
                    let newStartDate1 = moment(tempdate1).format('YYYY-MM-DD');
                    latestStartDate = newStartDate1;
                    latestEndDate = newStartDate1;
                    prevDate = newStartDate1;
                  }
                }


                res.endDate = latestEndDate;
                res.startDate = latestStartDate;
                prevDate = latestEndDate;
                prevDocTime = splitTime(endTimeRoute);

                resultsData.push(res);
              });
              let totTime = 0;
              let totDistance = 0;
              let endTime;
              resultsData.map((tdata, index) => {
                if (index === data.stops) {
                  endTime = tdata.end.split(':');
                  let endTimeHrs = endTime[0];
                  let endTimeMins = endTime[1];
                  let endLoadHrs = this.loadingSecs(Number(endTimeHrs), Number(endTimeMins))
                  endTime = endLoadHrs;
                  setEndTime = endTime;
                }
                totTime += tdata.tTime;
                totDistance += tdata.tDistance;
              });
              let reducer1 = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);
              let serTime = serviceTime.reduce(reducer1);
              let waitTime = waitingTime.reduce(reducer1)
              let tTime = totTime;
              totTime = formatTime(tTime + convertHrToSec(serTime) + convertHrToSec(waitTime));
              setTotalTime = totTime;
              setTotalDistance = totDistance / 1000;
              let vehicleStartTime = '';
              if (sameTrips.length > 0) {
                sameTrips.map((sameTrip) => {
                  if (sameTrip.trips === 1) {
                    vehicleStartTime = sameTrip.startTime
                  }
                })
                prevTripsDist = sameTrips.reduce((sum, { totalDistance }) => sum + Number(totalDistance), 0);
                prevTripsTime = sameTrips.reduce((sum, { totalTime }) => sum + convertHrToSec(Number(totalTime)), 0)
              }
              let tripsClosed = false;
              if (vehicleStartTime.length > 0) {
                let vehicleStartTimeDate = new Date();
                vehicleStartTimeDate.setHours(Number(vehicleStartTime.split(':')[0]));
                vehicleStartTimeDate.setMinutes(Number(vehicleStartTime.split(':')[1]));
                let currentStartTimeDate = new Date();
                currentStartTimeDate.setHours(Number(startTimeLocal.split(':')[0]))
                currentStartTimeDate.setMinutes(Number(startTimeLocal.split(':')[1]))
                if (vehicleStartTimeDate > currentStartTimeDate) {
                  tripsClosed = true;
                } else {
                  tripsClosed = false;
                }
              }
              prevTripsDist = prevTripsDist + (totDistance / 1000)
              let totTimeSec = convertHrToSec(Number(totTime.split(':')[0])) + convertMinToSec(Number(totTime.split(':')[1]));
              let maxTotTimeSec = convertHrToSec(Number(data.vehicleObject.maxtotaltime));
              if (prevTripsDist >= data.vehicleObject.maxtotaldist
                || prevTripsTime >= maxTotTimeSec
                || optimizationStatus
                || tripsClosed) {
                if (prevTripsDist >= data.vehicleObject.maxtotaldist) {
                  setDistErrorMessage(`The vehicle cannot perform trip more than ${data.vehicleObject.maxtotaldist} Miles, please review trip documents.`)
                  setDistError(true);
                } else if (prevTripsTime >= maxTotTimeSec) {
                  setTimeErrorMessage(`The vehicle cannot perform trip more than ${data.vehicleObject.maxtotaltime} Hrs, please review trip documents.`)
                  setTimeError(true);
                } else if (tripsClosed) {
                  setTripsClosedErrorMessage('Today trips was closed.')
                  setTripClosedError(true);
                } else if (optimizationStatus) {
                  setOptimizationMessage('Please optimize previous trip.');
                  setOptiStatusError(true);
                }
                // setHandleDateChange = selectedDate;
              } else {
                let loadingHrs = convertHrToSec(loadHrs);
                let tripData = {
                  tripCode: data.itemCode,
                  tripVehicle: data.code,
                  tripTotalTime: convertSecToHr(tTime + convertHrToSec(serTime) + convertHrToSec(waitTime) + loadingHrs),
                  tripTravelTime: formatTime(tTime),
                  tripTotalServiceTime: splitTime(serTime),
                  totalDistance: totDistance / 1000,
                  autoOptimised: false,

                };
                let routesSchedule = {
                  startDate: data.docdate,
                  endDate: data.docdate,
                  startTime: splitTime(startTimeLocal),
                  endTime: splitTime(endTime),
                  routesData: resultsData,
                  tripData: tripData,
                  trips: data,
                  cost: this.costCalculation(this.state.vehiclePanel, totTime, Math.round(totDistance / 1000), data.code)
                }
                let latestEndDate = data.docdate
                let totaltimeforcal = Number(startTimeLocal.split(':')[0]) + tripData.tripTotalTime;

                let dayscal = totaltimeforcal / 24;
                let dateNew = new Date(data.docdate);
                if (dayscal > 0) {

                  let date1 = new Date(dateNew.setDate(dateNew.getDate() + Math.floor(dayscal)));
                  latestEndDate = date1;
                }
                else {
                  latestEndDate = dateNew;
                }

                routesSchedule.endDate = latestEndDate;
                this.getRouteSchedulerApp(routesSchedule, optiindex, false);
              }
            }
          }
        }
      });
  };








  ConfirmScheduledTrips_old_2 = (
    trips,
    selDocs,
    SelVeh,
    res,
    X3SetupErrors,
    from,
    jobId,
    assignedShipments,
    assignedJobs
  ) => {

    this.setState({ loader: true })

    fetch(`${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        if (!response.ok) {
          // If server returns error, read text and throw
          return response.text().then((text) => {
            throw new Error(text || 'Server Error')
          })
        }
        // Parse JSON response
        return response.json()
      })
      .then((data) => {
        // Show skipped documents if any
        if (data.skippedDocuments && data.skippedDocuments.length > 0) {
          const skippedList = data.skippedDocuments.join(', ')
          this.notifySucess(
            `Trip generated successfully, but the following documents are excluded since they are already allocated to another trip: ${skippedList}`
          )
        } else {
          this.notifySucess('Trip Added/Updated Successfully')
        }

        // Update state/UI
        this.handleDateChange(this.state.date)
        this.setState({
          loader: false,
          checkedTrip: false,
          isDetail: false,
        })

        // Call exceptional analysis
        this.Exceptionalanalysis(
          selDocs,
          SelVeh,
          res,
          X3SetupErrors,
          from,
          assignedShipments,
          assignedJobs
        )
      })
      .catch((error) => {
        console.error('ConfirmScheduledTrips at catch ee error:', error)
        this.handleDateChange(this.state.date)
        this.setState({ loader: false })
        this.notifyError(
          error.message ||
          'Trip creation/updation failed: invalid  data or all the  documents already assigned to another trips.'
        )
      })
  }

  ConfirmScheduledTrips_old = (
    trips,
    selDocs,
    SelVeh,
    res,
    X3SetupErrors,
    from,
    jobId,
    assignedShipments,
    assignedJobs
  ) => {
    this.setState({ loader: true })
    fetch(`${process.env.REACT_APP_ROUTE_PLANNER}/api/v1/transport/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trips),
    })
      .then((response) => {
        this.handleErrors(response)
      })
      .then(function (response) { })
      .then(() => {
        this.handleDateChange(this.state.date)
      })
      .then(() => {
        this.setState({ laoder: false, checkedTrip: false, isDetail: false })
        this.notifySucess('Trip Added/Updated Sucessfully')

        this.Exceptionalanalysis(
          selDocs,
          SelVeh,
          res,
          X3SetupErrors,
          from,
          assignedShipments,
          assignedJobs
        )
      })
      .catch((error) => {
        this.handleDateChange(this.state.date)
        this.setState({ loader: false })
        this.notifyError(
          'Trip creation/updation failed: invalid  data or all the  documents already assigned to another trips.'
        )
      })
  }

  handleIsTripModified = (isModified) => {
    this.setState({ isTripModified: isModified })
  }

  updatereordersDocsInTrip = (reorderedDocs) => {
    this.setState(prev => {

      if (!prev.trips || !prev.trips.length) return null;

      const trip = prev.trips[0];

      if (!trip || !trip.code) return null;

      const updatedTrip = {
        ...trip,
        dropObject: [...reorderedDocs],
        totalObject: {
          ...(trip.totalObject || {}),
          selectedTripData: [...reorderedDocs]
        }
      };

      return {
        trips: [
          updatedTrip,
          ...prev.trips.slice(1)
        ]
      };

    });

  };


  render() {
    let addAlertClose = () => this.setState({ addAlertShow: false })
    let addAlertArrayClose = () => this.setState({ addAlertArrayShow: false })
    let addAlertSummaryClose = () =>
      this.setState({ addAlertSummaryShow: false, processID: '' })
    let optionItems = []
    var optionSelected = {}
    var selectedSite = {}
    var placeHolder = 'All'

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
          label: site.value + '(' + site.id + ')',
        })
      })
    const { sites } = this.state

    let siteDetails = {}

    if (this.state.markers && this.state.markers[0]) {
      this.state.sites &&
        this.state.sites.map((site) => {
          if (site.id === this.state.markers[0].id) {
            siteDetails = { lat: site.lat, lng: site.lng }
          }
        })
    } else if (this.state.bl_markers && this.state.bl_markers[0]) {
      this.state.sites &&
        this.state.sites.map((site) => {
          if (site.id === this.state.bl_markers[0].id) {
            siteDetails = { lat: site.lat, lng: site.lng }
          }
        })
    }

    return (
      <React.Fragment>
        <div className="page-content pb-0">
          <ToastContainer />
          <Container fluid>
            <LoadingOverlay
              active={this.state.loader}
              spinner
              text={this.state.loaderText}
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
                handleSyncTrips={this.handleSyncTrips}
                isTripModified={this.state.isTripModified}
              ></SideNav>
              <section style={{ display: this.state.vehicleShow }}>
                <Row className="mt-3">
                  <Col xs="12">
                    <Row>
                      <MiniWidgets topDetails={this.state.topDetails} />
                    </Row>
                  </Col>

                  <Col md="5">
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
                  <Col md="7">
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
                      //  addUpdateType={this.addUpdateType}
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
                      handleIsTripModified={this.handleIsTripModified}
                    />
                  </Col>
                </Row>

                <Row className='mb-3'>
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
                      date={this.state.date}
                      selectAllTripsPanel={this.selectAllTripsPanel}
                      routeSchedulerData={this.state.routeSchedulerTime}
                      UnlockConfirmTrip={this.UnlockConfirmTrip}
                      onValidateAll={this.onValidateAll}
                      onloaderMsg={this.onLoadermessage}
                      onForceseq={this.onForcesequnceCheck}
                      selectedCheckBoxes={this.state.selectedCheckBoxes}
                      selectedTripStatuses={this.state.selectedTripStatuses}
                      handleTripStatusFilterChange={this.handleTripStatusFilterChange}
                      clearTripStatusFilterSelections={this.clearTripStatusFilterSelections}
                      isTripModified={this.state.isTripModified}
                    />
                  </Col>
                  <Col md="6">
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
                      selectedIndex={this.state.selectedIndex}
                      removeMarkerAfterDrag={this.removeMarkerAfterDrag}
                      finalUpdatedTrip={this.finalUpdatedTrip}
                      updatereordersDocsInTrip={this.updatereordersDocsInTrip}
                    />
                  </Col>


                </Row>


              </section>
              <section style={{ display: this.state.vrShow }}>
                <Row className="mt-3">
                  <Col xs="12">
                    <VrHeader
                      vrdata={this.state.vrlist}
                      selectedVrIndex={this.state.selectedVrIndex}
                      selectedVrValidated={this.state.selectedVrValidated}
                      validate={this.validate}
                      validateonly={this.validateonly}
                      loadvehstck={this.state.loadvehstock}
                      tripdetails={this.state.clickedTrips}
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
            className={`detail-sidebar ${this.state.isDetail ? 'open' : ''}`}
          >
            <Timeline
              sites={this.state.sites}
              date={moment.tz(this.state.date, '').format('YYYY-MM-DD')}
              RouteoptiShow={this.state.RouteoptiShow}
              data={this.state.guageTrip}
              selectedSite={this.Timeline_SelectedSite}
              vehiclePanel={this.state.vehiclePanel}
              getValues={(routesSchedule, optiindex, auto) =>
                this.getRouteSchedulerApp(routesSchedule, optiindex, auto)
              }
              tripsPanel={this.state.tripsPanel}
              toggleDetail={this.toggleDetail}
              manualNextBillions={this.manualNextBillions}
              OSRM_manuallytrip={this.OSRM_manuallytrip}
              isTripModified={this.state.isTripModified}
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
        <ConfirmToAdd
          show={this.state.addConfirmToProceedShow}
          onClose={this.onConfirmNoToProceed}
          onConfirm={this.onConfirmToProceedYes}
          trip={this.state.targettedTrip}
          message={this.state.confirmMessage}
          document={this.state.droppedData}
        ></ConfirmToAdd>
        <AlertSummary
          show={this.state.addAlertSummaryShow}
          onHide={addAlertSummaryClose}
          errorArrayMessage={this.state.errorArrayMessage}
          errorSummartMessage={this.state.errorSummartMessage}
          errorNotesArray={this.state.errorNotesArray}
          processID={this.state.processID}
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
          docsStartDate={this.state.docsStartDate}
          docsEndDate={this.state.docsEndDate}
          documentsDateRange={this.documentsDateRange}
          loader={this.state.loader}
          tripsList={this.state.tripsPanel}
        />
      </React.Fragment>
    )
  }
}

export default Dashboard
