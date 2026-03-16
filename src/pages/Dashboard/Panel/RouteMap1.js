// ===================== IMPORTS =====================
import React from 'react'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/sortable'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteConfirm from './DeleteConfirm'
import DisplayProducts from './DisplayProducts'
import ProductsDetailList from './ProductsDetailList'
import { withNamespaces } from 'react-i18next'
import {
  convertHrToSec,
  formatTime,
} from '../converterFunctions/converterFunctions'
import DisplayNotes from './DisplayNotes'
import DisplayCarrierNotes from './DisplayCarrierNotes'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import '../dashboard.scss'
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

const x3Url = process.env.REACT_APP_X3_URL_EXTERNAL

// ===================== UTILS =====================
const compactArray = (arr) =>
  Array.isArray(arr) ? arr.filter((_, i) => i in arr) : []

function renumber_table(tableID) {
  $(tableID + ' tr').each(function () {
    let data = $(this).find('.type')[0]
    if (!data) return
    const count = $(this).parent().children().index($(this)) + 1
    $(this).find('.priority').html(
      `<span class='badge badge-primary'>${count}</span>`
    )
  })
}




// ===================== COMPONENT =====================
class RouteMap extends React.Component {
  constructor(props) {
    super(props)

    // 🔹 MAP SINGLETONS
    this.map = null
    this.markersByDoc = {}
    this.spiderfier = null
    this.isSpiderfierLoading = false
    this.directionsService = null
    this.directionsRenderer = null
    this.isRowHoverPopupActive = false
    this.isResizingSplit = false

    this.state = {
      isMap: true,
      isList: false,
      isFullScreen: false,
      isMapFullscreen: false,
      isSplitView: false,
      isPanelOpen: false,
      addConfirmShow: false,
      addConfirmDeleteShow: false,
      addTripConfirmShow: false,
      tripConfirmPending: false,
      warningflg: false,
      confirmMessage: '',
      showToPlanDocs: false,
      index: -1,
      docnum: '',
      vehicleCode: '',
      addProductShow: false,
      products: [],
      docNumber: '',
      doctype: '',
      sortable: false,
      reorderedGeoData: null,
      ShowDetailList: false,
      enableDocumnetMsgWindow: false,
      enableCarrierMsgWindow: false,
      selectedDocNumber: '',
      noteMessage: '',
      carrierMessage: '',
      instructionType: '',
      anchorEl: null,
      stagedAddDocs: [],
      stagedRemoveDocs: [],
      pendingDoc: null,
      pendingMarker: null,
      pendingRemoveDoc: null,
      removeConfirmShow: false,
      isTripPanelOpen: false,
      multiDragConfirmShow: false,
      pendingDropPoint: null,
      pendingSameCoordDocs: [],
      splitMapHeightPct: 40,

    }
  }



  // ===================== LIFECYCLE =====================
  componentDidMount() {
    document.addEventListener('fullscreenchange', this.handleFS)

    if (this.state.isMap) {
      this.initMapOnce()
      this.initDirectionsOnce()
      this.createSiteMarkers()
      this.updateMarkers()
      this.updateTripPolyline()
    }
    if (this.isListUiVisible()) {
      this.initListSortable()
    }
  }

  isListUiVisible = () =>
    this.state.isList ||
    (this.state.isMap && this.state.isSplitView && this.state.isFullScreen)

  resetRouteMapState = () => {
    this.setState(
      {
        stagedAddDocs: [],
        stagedRemoveDocs: [],
        pendingDoc: null,
        pendingMarker: null,
        pendingRemoveDoc: null,
        pendingDropPoint: null,
        pendingSameCoordDocs: [],
        multiDragConfirmShow: false,
        addConfirmShow: false,
        warningflg: false,
        removeConfirmShow: false,
        isTripPanelOpen: false,
        reorderedGeoData: null
      },
      () => {
        this.updateMarkers()
        this.updateTripPolyline()
        if (this.isListUiVisible()) {
          this.initListSortable()
        }
      }
    )
  }

  applyListReorderFromDom = () => {

    if (this.isTripLocked()) {
      $('#diagnosis_list tbody').sortable('cancel');
      return;
    }

    const rows = $('#diagnosis_list tbody tr');

    const current =
      this.state.reorderedGeoData
        ? [...this.state.reorderedGeoData]
        : [...(this.props.geoData || [])];

    const mapByDoc = new Map(
      current.map(d => [String(d.docnum), d])
    );

    const newOrder = [];

    rows.each(function () {
      const doc = $(this).find('td.docnum a').text().trim();
      if (mapByDoc.has(doc)) {
        newOrder.push(mapByDoc.get(doc));
      }
    });

    // safety fallback
    if (newOrder.length !== current.length) {
      return;
    }

    // 🔴 re-sequence (only for planned docs)
    const reordered = newOrder.map((d, i) => ({
      ...d,
      seq: d.seq > 0 ? i + 1 : d.seq
    }));

    // update the reordered list in parent trips state
    this.props.updatereordersDocsInTrip(reordered)

    this.setState(
      { reorderedGeoData: reordered },
      () => {
        this.updateMarkers();
        this.updateTripPolyline();
      }
    );
  };


  initListSortable = () => {

    const $tbody = $('#diagnosis_list tbody');

    if (!$tbody.length) return;

    if ($tbody.hasClass('ui-sortable')) {
      $tbody.sortable('destroy');
    }

    $tbody.sortable({
      items: '> tr',
      helper: 'clone',

      stop: () => {
        this.applyListReorderFromDom();
      }
    });

  };


  componentDidUpdate(prevProps, prevState) {


    if (
      (prevState.isFullScreen !== this.state.isFullScreen ||
        prevState.isSplitView !== this.state.isSplitView) &&
      this.state.isMap
    ) {
      setTimeout(() => {
        if (!this.map) {
          this.initMapOnce()
          this.initDirectionsOnce()
          this.updateMarkers()
          this.updateTripPolyline()
        } else {
          window.google.maps.event.trigger(this.map, 'resize')
        }
        if (this.isListUiVisible()) {
          this.initListSortable()
        }
      }, 300)
    }

    //
    // 🔥 TRIP UNSELECTED → RESET ROUTE MAP STATE
    if (
      prevProps.selectedIndex !== this.props.selectedIndex &&
      (this.props.selectedIndex === null ||
        this.props.selectedIndex === undefined ||
        this.props.selectedIndex === -1)
    ) {
      this.resetRouteMapState()

      // optional: clear route line explicitly
      if (this.directionsRenderer) {
        this.directionsRenderer.setDirections({ routes: [] })
      }

      return
    }

    // 🔁 SWITCHED FROM ONE TRIP TO ANOTHER
    if (
      prevProps.selectedIndex !== this.props.selectedIndex &&
      prevProps.selectedIndex !== null &&
      this.props.selectedIndex !== null
    ) {
      this.resetRouteMapState()
      return
    }




    if (prevProps.markers !== this.props.markers) {
      this.updateMarkers()
    }

    if (prevProps.geoData !== this.props.geoData) {
      this.createSiteMarkers();
      this.updateTripPolyline()
      if (this.isListUiVisible()) this.initListSortable()
    }

    if (prevProps.selectedTrips !== this.props.selectedTrips) {
      this.createSiteMarkers();
      this.updateTripPolyline();
      if (this.isListUiVisible()) this.initListSortable()
    }

    if (!prevState.isMap && this.state.isMap) {
      this.initMapOnce()
      this.initDirectionsOnce()
      this.updateMarkers()
      this.updateTripPolyline()
    }

    const wasListVisible =
      prevState.isList ||
      (prevState.isMap && prevState.isSplitView && prevState.isFullScreen)

    const isListVisible = this.isListUiVisible()

    // when list UI becomes visible (List tab or Split fullscreen list)
    if (!wasListVisible && isListVisible) {
      this.initListSortable();
    }
  }

  toggleTripPanel = () => {
    this.setState(prev => ({
      isTripPanelOpen: !prev.isTripPanelOpen
    }))
  }


  getEffectiveTripDocs = () => {
    // const baseDocs = compactArray(this.props.geoData || [])
    const baseDocs = compactArray(
      this.state.reorderedGeoData || this.props.geoData || []
    )
      .filter(d => d.seq > 0 && d.lat && d.lng)


    const removedDocNums = new Set(
      this.state.stagedRemoveDocs.map(d => d.docnum)
    )

    const filtered = baseDocs.filter(
      d => !removedDocNums.has(d.docnum)
    )


    // 🟡 staged additions (no seq change)
    const stagedAdds = this.state.stagedAddDocs.map(d => ({
      ...d,
      __stagedAdd: true,
    }))

    return [...filtered, ...stagedAdds]
  }



  toggleMapFullscreen = () => {
    this.setState(
      (prev) => ({ isMapFullscreen: !prev.isMapFullscreen }),
      () => {
        // force Google map to resize correctly
        setTimeout(() => {
          if (this.map) {
            window.google.maps.event.trigger(this.map, 'resize')
          }
        }, 200)
      }
    )
  }


  displayRouteTag = (drop, lang) => {
    const myStr = drop.routeColor || ''
    const subStr = myStr.match('background-color:(.*)')
    const s = (subStr && subStr[1]) || '#ccc'
    if (lang === 'eng') {
      return (
        <h6>
          <span style={{ backgroundColor: s }}>{drop.routeTag}</span>
        </h6>
      )
    }
    return (
      <h6>
        <span style={{ backgroundColor: s }}>{drop.routeTagFRA}</span>
      </h6>
    )
  }

  displayRouteTypeDocBadge = (typDoc, pDropPairedDoc) => {
    const RouteMvt = typDoc
    const dropPairedDoc = pDropPairedDoc || ''
    if (RouteMvt === 'PICK') {
      return (
        <h5>
          <td width="3%">
            <span class="badge badge-primary text-uppercase">
              {this.props.t('PICK')}
            </span>
          </td>
        </h5>
      )
    }
    if (RouteMvt === 'DLV') {
      if ((dropPairedDoc || '').length > 1) {
        return (
          <h5>
            <td width="3%">
              <span class='badge badge-info style="font-size:2rem'>
                {this.props.t('DLVEXCHANGE')}
              </span>
            </td>
          </h5>
        )
      }
      return (
        <h5>
          <td width="3%">
            <span class='badge badge-success style="font-size:2rem'>
              {this.props.t('DLV')}
            </span>
          </td>
        </h5>
      )
    }
    if (RouteMvt === 'PRECEIPT') {
      return (
        <h5>
          <td width="3%">
            <span class="badge badge-danger text-uppercase">
              {this.props.t('PRECEIPT')}
            </span>
          </td>
        </h5>
      )
    }
    if (RouteMvt === 'RETURN') {
      return (
        <h5>
          <td width="3%">
            <span class="badge badge-danger text-uppercase">
              {this.props.t('RETURN')}
            </span>
          </td>
        </h5>
      )
    }
    return null
  }


  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.handleFS)
    this.stopSplitResize()
    document.removeEventListener('mousemove', this.onSplitResizeMove)
    document.removeEventListener('mouseup', this.stopSplitResize)
    if (this.spiderfier) {
      this.spiderfier.unspiderfy()
      this.spiderfier.clearMarkers()
      this.spiderfier = null
    }
  }

  // ===================== MAP INIT =====================
  initMapOnce = () => {
    if (this.map) return

    const el = document.getElementById('google-map')
    if (!el || el.offsetWidth === 0 || el.offsetHeight === 0) {
      console.warn("Map container not visible yet");
      return;
    }

    this.map = new window.google.maps.Map(el, {
      zoom: 10,
      center: { lat: 10.6387, lng: -61.3859 },
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
    })

    this.initSpiderfierOnce()
    this.ensureSpiderfierLoaded()
  }

  ensureSpiderfierLoaded = () => {
    if (window.OverlappingMarkerSpiderfier || this.isSpiderfierLoading) return

    const existing = document.getElementById('oms-script')
    if (existing) {
      this.isSpiderfierLoading = true
      existing.addEventListener('load', () => {
        this.isSpiderfierLoading = false
        this.initSpiderfierOnce()
        this.updateMarkers()
      })
      return
    }

    this.isSpiderfierLoading = true
    const script = document.createElement('script')
    script.id = 'oms-script'
    script.src = '/assets/dist/js/oms.min.js'
    script.async = true

    script.onload = () => {
      this.isSpiderfierLoading = false
      this.initSpiderfierOnce()
      this.updateMarkers()
    }

    script.onerror = () => {
      this.isSpiderfierLoading = false
      console.warn('Failed to load local Spiderfier script')
    }

    document.body.appendChild(script)
  }

  initSpiderfierOnce = () => {
    if (this.spiderfier || !this.map || !window.OverlappingMarkerSpiderfier) return

    this.spiderfier = new window.OverlappingMarkerSpiderfier(this.map, {
      markersWontMove: false,
      markersWontHide: true,
      keepSpiderfied: true,
      nearbyDistance: 20,
        circleFootSeparation: 80,      
      basicFormatEvents: true,
    })

    this.spiderfier.addListener('spiderfy', () => {
      if (this.infoWindow) this.infoWindow.close()
    })
  }

  initDirectionsOnce = () => {
    if (this.directionsRenderer) return

    this.directionsService = new window.google.maps.DirectionsService()
    this.directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#2563eb',
        strokeOpacity: 0.85,
        strokeWeight: 4,
      },
    })

    this.directionsRenderer.setMap(this.map)
  }

  // ===================== MARKERS =====================
  createMarkerIcon = (label, color, type) => {
    if (type === 'toplan') {
      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#808080',
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 15,
      }
    }
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: color || '#2563eb',
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 15,
    }
  }



  getMarkerIcon = ({ type }) => {
    switch (type) {
      case 'ADD': // staged add
        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 26,
          fillColor: '#f59e0b',
          fillOpacity: 1,
          strokeColor: '#92400e',
          strokeWeight: 3,
        }

      case 'REMOVE': // staged remove
        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 26,
          fillColor: '#dc2626',
          fillOpacity: 1,
          strokeColor: '#7f1d1d',
          strokeWeight: 3,
        }

      case 'TOPLAN':
        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 22,
          fillColor: '#9ca3af',
          fillOpacity: 0.85,
          strokeColor: '#374151',
          strokeWeight: 2,
        }

      default: // PLANNED
        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 24,
          fillColor: '#2563eb',
          fillOpacity: 1,
          strokeColor: '#1e3a8a',
          strokeWeight: 3,
        }
    }
  }

  normalizeApostrophes = (text) => {
    return text.replace(/'+/g, "'");
  }

  showRowHoverPopup = (doc) => {
    if (!this.map || !this.infoWindow || !doc?.docnum) return

    const marker = this.markersByDoc[String(doc.docnum)]
    if (!marker || typeof marker.__getPopupContent !== 'function') return

    this.isRowHoverPopupActive = true
    this.infoWindow.setContent(marker.__getPopupContent())
    this.infoWindow.open(this.map, marker)

    window.google.maps.event.addListenerOnce(this.infoWindow, 'domready', () => {
      const btn = document.getElementById(`remove-${doc.docnum}`)
      if (btn) {
        btn.onclick = () => this.askRemoveConfirm(doc)
      }
    })
  }

  hideRowHoverPopup = () => {
    if (!this.infoWindow || !this.isRowHoverPopupActive) return
    this.isRowHoverPopupActive = false
    this.infoWindow.close()
  }


  renderListView = () => {
    return (
      <Row className="mt-0" style={{ height: '100%' }}>
        <Col md="12">
          {/* 🔁 paste your EXISTING table JSX here */}
          <div
            style={{
              height:
                this.state.isSplitView && this.state.isFullScreen
                  ? '100%'
                  : '410px',
              overflowY: 'auto',
              // overflowX: 'hidden',
            }}
          >
            <Table
              id="diagnosis_list"
              size="sm"
              striped
              hover
              // responsive
              style={{ marginBottom: 0 }}
            >
              <thead
                style={{
                  position: 'sticky',
                  top: 0,

                  background: '#f8f9fa',
                  zIndex: 1,
                }}
              >
                <tr>
                  <th width="6%"></th>

                  {/* <th></th> */}
                  <th width="6%" class="pl-2">
                    {this.props.t('Seq')} #
                  </th>
                  {/* <th width="6%">{this.props.t('Vehicle')}</th> */}
                  <th width="6%">Transaction</th>
                  <th width="6%">Customer</th>
                  <th width="16%">{this.props.t('Name')}</th>
                  <th width="6%">Address</th>
                  <th width="6%">City</th>
                  <th width="6%">{this.props.t('Pallets')}</th>
                  <th width="6%">{this.props.t('Cases')}</th>
                  <th width="6%">{this.props.t('Weight')}</th>
                  <th width="6%">{this.props.t('Volume')}</th>
                  <th width="6%">{this.props.t('Arrival')}</th>
                  <th width="6%">{this.props.t('Departure')}</th>
                  <th width="6%">Service Time</th>
                  <th width="6%">{this.props.t('WaitingTime')}</th>
                  <th width="6%">Priority</th>


                </tr>
              </thead>

              <tbody >
                {(this.state.reorderedGeoData || this.props.geoData || []).map((row, idx) => (
                  <tr
                    key={row.docnum || idx}
                    onMouseEnter={() => this.showRowHoverPopup(row)}
                    onMouseLeave={this.hideRowHoverPopup}
                    style={{
                      background:
                        row.seq > 0 ? '#eef6ff' : 'transparent', // planned highlight
                      fontSize: '12px',

                    }}
                  >
                    {/*
                                      <td>
                                        <PopupState variant="popover" popupId="demo-popup-menu">
                                          {(popupState) => (
                                            <React.Fragment>
                                              <IconButton size="small">
                                                <MoreVertIcon
                                                  variant="contained"
                                                  {...bindTrigger(popupState)}
                                                />
                                              </IconButton>
                                              <Menu
                                                {...bindMenu(popupState)}
                                                anchorOrigin={{
                                                  vertical: 'bottom',
                                                  horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                  vertical: 'top',
                                                  horizontal: 'left',
                                                }}
                                              >
                                                <MenuItem
                                                  onClick={() =>
                                                    this.displayDocumentMessage(
                                                      row.docnum,
                                                      row.noteMessage
                                                    )
                                                  }
                                                >
                                                  Document Instructions
                                                </MenuItem>
                                                {row.doctype === 'DLV' ? (
                                                  <MenuItem
                                                    onClick={() =>
                                                      this.displayCarrierMessage(
                                                        row.docnum,
                                                        row.CarrierMessage,
                                                        'carrier'
                                                      )
                                                    }
                                                  >
                                                    Carrier Instructions
                                                  </MenuItem>
                                                ) : null}
                                                {row.doctype === 'DLV' ||
                                                  row.doctype === 'PICK' ? (
                                                  <MenuItem
                                                    onClick={() =>
                                                      this.displayCarrierMessage(
                                                        row.docnum,
                                                        row.loaderMessage,
                                                        'loader'
                                                      )
                                                    }
                                                  >
                                                    Loader Instructions
                                                  </MenuItem>
                                                ) : null}
                                              </Menu>
                                            </React.Fragment>
                                          )}
                                        </PopupState>
                                      </td>
                                       */}
                    {/* <td>
                                            <Input type="checkbox" />
                                          </td> */}

                    <td>  {this.isTripLocked() ? ('') : (
                      <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"
                        onClick={() => this.onConfirmDeleteClick(idx, row.docnum, row.vehicleCode, row)} disabled={this.isTripLocked()}>
                        <i class="fa fa-trash"></i>
                      </button>)}</td>
                    <td>{this.displayBadge(row.doctype, idx)}</td>


                    {/* <td>{row.tripcode || '-'}</td> */}
                    <td
                      width="6%"
                      name="docNum"
                      class="docnum"
                      style={{
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                      }}
                    >
                      <a
                        href="#"
                        onClick={() =>
                          this.onDocClick(
                            row.products,
                            row.docnum,
                            row.doctype
                          )
                        }
                      >
                        {row.docnum}
                      </a>
                    </td>
                    <td>{row.bpcode}</td>

                    <td>{this.normalizeApostrophes(row.bpname)}</td>
                    <td>{row.addlig1} </td>

                    <td>
                      {this.normalizeApostrophes(row.city)}
                    </td>

                    <td>
                      {(parseFloat(row.noofCases)).toFixed(2)} PAL
                    </td>

                    <td width="6%">
                      {row?.mainCases ? parseFloat(row.mainCases) : 0} CS
                    </td>

                    <td>
                      {row.netweight} {row.weightunit}
                    </td>

                    <td>
                      {row.volume} {row.volume_unit}
                    </td>
                    <td width="6%">{row.arrival && row.arrival}</td>
                    <td width="6%">{row.end && row.end}</td>
                    <td width="6%">{formatTime(convertHrToSec(row.serviceTime))}</td>
                    <td width="6%">{formatTime(convertHrToSec(row.waitingTime))}</td>

                    <td>{this.displayPriority(row)}</td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    )
  }

  onConfirmDeleteClick = (index, docnum, vehicleCode, data) => {
    this.setState({
      addConfirmDeleteShow: true,
      confirmMessage: 'Are you sure you want to Delete?',
      index: index,
      docnum: docnum,
      vehicleCode: vehicleCode
    })
  }

  onConfirmDeleteNo = () => {
    this.setState({
      addConfirmDeleteShow: false
    })
  }


  onConfirmDeleteYes = (index, docnum) => {
    let type;
    if (this.state.confirmMessage.includes("Delete")) {
      type = "Delete";
      this.props.onTripDelete(index, docnum, type, this.state.vehicleCode);
    } else {
      this.props.onTripDelete(index, docnum);
    }

    this.setState({
      addConfirmDeleteShow: false
    })
  }


  attachInfoWindow = (marker, html) => {
    const info = new window.google.maps.InfoWindow({
      content: html,
    });

    marker.addListener('click', () => {
      info.open(this.map, marker);
    });
  };

//   updateMarkers = () => {
//     if (!this.map) return

//     const SITE_ICON = '/assets/img/address.png';

//     const stagedAddIds = new Set(
//       this.state.stagedAddDocs.map(d => d.docnum)
//     )

//     // ---------- CLEAN OLD MARKERS ----------
//     Object.values(this.markersByDoc).forEach(m => m.setMap(null))
//     this.markersByDoc = {}

//     const allDocs = compactArray(this.props.markers || [])

//     // ---------- SPLIT DOCS ----------
//     // const plannedDocs = allDocs.filter(d => d.seq > 0)

//     const plannedDocs = this.getEffectiveTripDocs()


//     // const toPlanDocs  = allDocs.filter(d => !d.seq || d.seq === 0)

//     const plannedDocIds = new Set(
//       plannedDocs.map(d => d.docnum)
//     )

//     const toPlanDocs = allDocs.filter(
//       d =>
//         (!d.seq || d.seq === 0) &&
//         !plannedDocIds.has(d.docnum)
//     )



//     let finalDocs = [...plannedDocs]

//     if (this.state.showToPlanDocs) {
//       finalDocs = finalDocs.concat(toPlanDocs)
//     }

//     // ---------- INFO WINDOW (SINGLE INSTANCE) ----------
//     if (!this.infoWindow) {
//       this.infoWindow = new window.google.maps.InfoWindow()
//     }

//     // ---------- CREATE DOC MARKERS ----------
//     finalDocs.forEach(doc => {
//       if (!doc.lat || !doc.lng || !doc.docnum) return

//       //const isToPlan = !doc.seq || doc.seq === 0

//       const isToPlan = !doc.seq || doc.seq === 0
//       const isStagedAdd = stagedAddIds.has(doc.docnum)
//       const stagedRemoveIds = new Set(this.state.stagedRemoveDocs)

//       const isStagedRemove = stagedRemoveIds.has(doc.docnum)

//       const markerType =
//         isStagedAdd
//           ? 'ADD'
//           : isStagedRemove
//             ? 'REMOVE'
//             : isToPlan
//               ? 'TOPLAN'
//               : 'PLANNED'

//       const labelText =
//         isStagedAdd ? 'P' :
//           isStagedRemove ? 'D' :
//             isToPlan ? '0' :
//               String(doc.seq)

//       const marker = new window.google.maps.Marker({
//         map: this.map,
//         position: { lat: doc.lat, lng: doc.lng },
//         draggable: isToPlan && !this.isTripLocked(),
//         icon: this.getMarkerIcon({ type: markerType }),
//         label: {
//           text: labelText,
//           color: '#fff',
//           fontSize: '13px',
//           fontWeight: 'bold',
//         },
//         zIndex:
//           isStagedAdd || isStagedRemove
//             ? 999
//             : isToPlan
//               ? 300
//               : 600,
//       })

//       // -------- DRAGGED LISTENER-----------

//       marker.addListener('dragstart', () => {
//         marker.__originalPosition = marker.getPosition()
//       })

//       marker.addListener('dragend', (e) => {
//         this.handleToPlanDrop(doc, e.latLng, marker)
//       })

//       const canRemove = doc.seq > 0 && !isStagedAdd && !this.isTripLocked()

//       // ---------- CLICK INFO ----------
//       marker.addListener('click', () => {
//         this.infoWindow.setContent(`
//         <div style="min-width:220px">
//           <b>${doc.bpname || 'Customer'}</b><br/>
//           <b>Doc:</b> ${doc.docnum}<br/>
//           <b>City:</b> ${doc.city || '-'}<br/>
//            ${(parseInt(doc.mainCases)) || 0} CS  <b>|| </b> ${(parseFloat(doc.noofCases).toFixed(2)) || 0} PAL  <br/>
//         <b>Status:</b> 

//           <span class="badge ${isStagedAdd
//             ? 'badge-warning'
//             : isToPlan
//               ? 'badge-secondary'
//               : 'badge-success'
//           }">
//   ${isStagedAdd ? 'Pending Add' : isToPlan ? 'To Plan' : 'Planned'}
// </span>
//           ${canRemove
//             ? `<br/><button id="remove-${doc.docnum}" style="margin-top:10px;color:white">
//                        Remove from Trip
//                      </button>`
//             : ''
//           }
//         </div>
//       `)
//         this.infoWindow.open(this.map, marker)

//         this.infoWindow.open(this.map, marker)

//         // ✅ MUST be here
//         window.google.maps.event.addListenerOnce(
//           this.infoWindow,
//           'domready',
//           () => {
//             const btn = document.getElementById(`remove-${doc.docnum}`)
//             if (btn) {
//               btn.onclick = () => this.askRemoveConfirm(doc)
//             }
//           }
//         )
//       })

//       this.markersByDoc[doc.docnum] = marker
//     })





//     // ---------- START / END SITES ----------
//     // ---------- START / END SITES ----------
//     const trip = this.props.selectedTrips?.[0]
//     const sites = this.props.sites || []

//     // remove old site markers
//     if (this.startSiteMarker) {
//       this.startSiteMarker.setMap(null)
//       this.startSiteMarker = null
//     }
//     if (this.endSiteMarker) {
//       this.endSiteMarker.setMap(null)
//       this.endSiteMarker = null
//     }

//     if (trip) {
//       const depSite = sites.find(s => String(s.id) === String(trip.depSite))
//       const arrSite = sites.find(s => String(s.id) === String(trip.arrSite))

//       const sameSite =
//         depSite &&
//         arrSite &&
//         Number(depSite.lat) === Number(arrSite.lat) &&
//         Number(depSite.lng) === Number(arrSite.lng)

//       // ===== SAME START & END =====
//       if (depSite && sameSite) {
//         this.startSiteMarker = new window.google.maps.Marker({
//           map: this.map,
//           position: {
//             lat: Number(depSite.lat),
//             lng: Number(depSite.lng),
//           },
//           title: 'Warehouse (Start & End)',
//           icon: {
//             url: SITE_ICON,
//             scaledSize: new window.google.maps.Size(40, 40), // 🔥 adjust size here
//             anchor: new window.google.maps.Point(20, 40),
//           },
//         })
//       } else {
//         // ===== START SITE =====
//         if (depSite && depSite.lat && depSite.lng) {
//           this.startSiteMarker = new window.google.maps.Marker({
//             map: this.map,
//             position: {
//               lat: Number(depSite.lat),
//               lng: Number(depSite.lng),
//             },
//             title: 'Start Warehouse',
//             icon: {
//               url: SITE_ICON,
//               scaledSize: new window.google.maps.Size(40, 40),
//               anchor: new window.google.maps.Point(20, 40),
//             },
//           })
//         }

//         // ===== END SITE =====
//         if (arrSite && arrSite.lat && arrSite.lng) {
//           this.endSiteMarker = new window.google.maps.Marker({
//             map: this.map,
//             position: {
//               lat: Number(arrSite.lat),
//               lng: Number(arrSite.lng),
//             },
//             title: 'End Warehouse',
//             icon: {
//               url: SITE_ICON,
//               scaledSize: new window.google.maps.Size(40, 40),
//               anchor: new window.google.maps.Point(20, 40),
//             },
//           })
//         }
//       }
//     }


//   }

updateMarkers = () => {
  if (!this.map) return
  this.initSpiderfierOnce()

  const SITE_ICON = '/assets/img/address.png';

  const stagedAddIds = new Set(
    this.state.stagedAddDocs.map(d => d.docnum)
  )

  if (this.spiderfier) {
    this.spiderfier.unspiderfy()
    this.spiderfier.clearMarkers()
  }
  Object.values(this.markersByDoc).forEach(m => m.setMap(null))
  this.markersByDoc = {}

  const allDocs = compactArray(this.props.markers || [])

  const plannedDocs = this.getEffectiveTripDocs()

  const plannedDocIds = new Set(
    plannedDocs.map(d => d.docnum)
  )

  const toPlanDocs = allDocs.filter(
    d =>
      (!d.seq || d.seq === 0) &&
      !plannedDocIds.has(d.docnum)
  )

  let finalDocs = [...plannedDocs]

  if (this.state.showToPlanDocs) {
    finalDocs = finalDocs.concat(toPlanDocs)
  }

  if (!this.infoWindow) {
    this.infoWindow = new window.google.maps.InfoWindow()
  }

  finalDocs.forEach(doc => {
    if (!doc.lat || !doc.lng || !doc.docnum) return

    const isToPlan = !doc.seq || doc.seq === 0
    const isStagedAdd = stagedAddIds.has(doc.docnum)
    const stagedRemoveIds = new Set(this.state.stagedRemoveDocs)
    const isStagedRemove = stagedRemoveIds.has(doc.docnum)

    const markerType =
      isStagedAdd
        ? 'ADD'
        : isStagedRemove
          ? 'REMOVE'
          : isToPlan
            ? 'TOPLAN'
            : 'PLANNED'

    const labelText =
      isStagedAdd ? 'P' :
        isStagedRemove ? 'D' :
          isToPlan ? '0' :
            String(doc.seq)

    const marker = new window.google.maps.Marker({
      map: this.map,
      position: { lat: doc.lat, lng: doc.lng },
      draggable: isToPlan && !this.isTripLocked(),
      icon: this.getMarkerIcon({ type: markerType }),
      label: {
        text: labelText,
        color: '#fff',
        fontSize: '13px',
        fontWeight: 'bold',
      },
      zIndex:
        isStagedAdd || isStagedRemove
          ? 999
          : isToPlan
            ? 300
            : 600,
    })

    marker.addListener('dragstart', () => {
      if (this.spiderfier) this.spiderfier.unspiderfy()
      marker.__originalPosition = marker.getPosition()
    })

    marker.addListener('dragend', (e) => {
      this.handleToPlanDrop(doc, e.latLng, marker)
    })

    const canRemove = doc.seq > 0 && !isStagedAdd && !this.isTripLocked()

    // ⭐ track if popup was clicked
    let isClicked = false

    const getPopupContent = () => `
      <div style="min-width:220px">
        <b>${doc.bpname || 'Customer'}</b><br/>
        <b>Doc:</b> ${doc.docnum}<br/>
        <b>City:</b> ${doc.city || '-'}<br/>
        ${(parseInt(doc.mainCases)) || 0} CS  <b>||</b> ${(parseFloat(doc.noofCases).toFixed(2)) || 0} PAL<br/>
        <b>Status:</b> 
        <span class="badge ${
          isStagedAdd
            ? 'badge-warning'
            : isToPlan
              ? 'badge-secondary'
              : 'badge-success'
        }">
          ${isStagedAdd ? 'Pending Add' : isToPlan ? 'To Plan' : 'Planned'}
        </span>
        ${
          canRemove
            ? `<br/><button id="remove-${doc.docnum}" style="margin-top:10px;color:white">
                 Remove from Trip
               </button>`
            : ''
        }
      </div>
    `
    marker.__getPopupContent = getPopupContent

    // ---------- HOVER ----------
    marker.addListener('mouseover', () => {

      if (isClicked) return

      this.infoWindow.setContent(getPopupContent())
      this.infoWindow.open(this.map, marker)
    })

    // ---------- HOVER OUT ----------
    marker.addListener('mouseout', () => {

      if (!isClicked) {
        this.infoWindow.close()
      }
    })

    // ---------- CLICK ----------
    const onMarkerClick = () => {

      isClicked = true

      this.infoWindow.setContent(getPopupContent())
      this.infoWindow.open(this.map, marker)

      window.google.maps.event.addListenerOnce(
        this.infoWindow,
        'domready',
        () => {

          const btn = document.getElementById(`remove-${doc.docnum}`)
          if (btn) {
            btn.onclick = () => this.askRemoveConfirm(doc)
          }

          const closeBtn = document.querySelector(".gm-ui-hover-effect")
          if (closeBtn) {
            closeBtn.addEventListener("click", () => {
              isClicked = false
            })
          }
        }
      )
    }

    if (this.spiderfier) {
      marker.addListener('spider_click', onMarkerClick)
    } else {
      marker.addListener('click', onMarkerClick)
    }

    if (this.spiderfier) {
      this.spiderfier.addMarker(marker)
    }

    this.markersByDoc[doc.docnum] = marker
  })

  const trip = this.props.selectedTrips?.[0]
  const sites = this.props.sites || []

  if (this.startSiteMarker) {
    this.startSiteMarker.setMap(null)
    this.startSiteMarker = null
  }
  if (this.endSiteMarker) {
    this.endSiteMarker.setMap(null)
    this.endSiteMarker = null
  }

  if (trip) {

    const depSite = sites.find(s => String(s.id) === String(trip.depSite))
    const arrSite = sites.find(s => String(s.id) === String(trip.arrSite))

    const sameSite =
      depSite &&
      arrSite &&
      Number(depSite.lat) === Number(arrSite.lat) &&
      Number(depSite.lng) === Number(arrSite.lng)

    if (depSite && sameSite) {

      this.startSiteMarker = new window.google.maps.Marker({
        map: this.map,
        position: {
          lat: Number(depSite.lat),
          lng: Number(depSite.lng),
        },
        title: 'Warehouse (Start & End)',
        icon: {
          url: SITE_ICON,
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 40),
        },
      })

    } else {

      if (depSite && depSite.lat && depSite.lng) {

        this.startSiteMarker = new window.google.maps.Marker({
          map: this.map,
          position: {
            lat: Number(depSite.lat),
            lng: Number(depSite.lng),
          },
          title: 'Start Warehouse',
          icon: {
            url: SITE_ICON,
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40),
          },
        })
      }

      if (arrSite && arrSite.lat && arrSite.lng) {

        this.endSiteMarker = new window.google.maps.Marker({
          map: this.map,
          position: {
            lat: Number(arrSite.lat),
            lng: Number(arrSite.lng),
          },
          title: 'End Warehouse',
          icon: {
            url: SITE_ICON,
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40),
          },
        })
      }
    }
  }
}

  requestRemoveFromPanel = (doc) => {
    this.setState({
      pendingRemoveDoc: doc,
      removeConfirmShow: true,
    })
  }



  askRemoveConfirm = (doc) => {


    this.setState({
      pendingRemoveDoc: doc,
      removeConfirmShow: true,
    })
  }

  confirmRemove = () => {
    const { pendingRemoveDoc, stagedRemoveDocs } = this.state
    if (!pendingRemoveDoc) return

    this.setState(
      {
        stagedRemoveDocs: [...stagedRemoveDocs, pendingRemoveDoc],
        pendingRemoveDoc: null,
        removeConfirmShow: false,
      },
      () => {
        this.updateMarkers()
        this.updateTripPolyline()
        toast.warn('Document marked for removal')
      }
    )
  }



  // ===================== POLYLINE =====================
  // updateTripPolyline = () => {
  //   // ---------- CLEAR WHEN NO TRIP ----------
  //   if (!this.props.selectedTrips || !this.props.selectedTrips[0]) {
  //     if (this.directionsRenderer) {
  //       this.directionsRenderer.setDirections({ routes: [] })
  //     }
  //     return
  //   }

  //   if (!this.map || !window.google || !window.google.maps) return

  //   if (!this.directionsService) {
  //     this.directionsService = new window.google.maps.DirectionsService()
  //   }

  //   if (!this.directionsRenderer) {
  //     this.directionsRenderer = new window.google.maps.DirectionsRenderer({
  //       suppressMarkers: true, // we already draw custom markers
  //       polylineOptions: {
  //         strokeColor: '#2563eb',
  //         strokeOpacity: 0.9,
  //         strokeWeight: 4,
  //       },
  //     })
  //     this.directionsRenderer.setMap(this.map)
  //   }

  //   // ---------- SITES ----------
  //   const trip = this.props.selectedTrips[0]
  //   const sites = this.props.sites || []

  //   const depSite = sites.find(s => s.id === trip.depSite)
  //   const arrSite = sites.find(s => s.id === trip.arrSite)

  //   // ---------- PLANNED DOCS ----------
  //   /*const tripDocs = compactArray(this.props.geoData || [])
  //     .filter(d => d.seq > 0 && d.lat && d.lng)
  //     .sort((a, b) => a.seq - b.seq)
  //     */

  //   //    const tripDocs = this.getEffectiveTripDocs()

  //   const tripDocs = this.getEffectiveTripDocs()
  //     .filter(d => d.lat && d.lng)
  //     .sort((a, b) => (a.seq || 0) - (b.seq || 0))

  //   let points = []

  //   // START
  //   if (depSite) {
  //     points.push({ lat: depSite.lat, lng: depSite.lng })
  //   }

  //   // STOPS
  //   tripDocs.forEach(d => {
  //     points.push({ lat: d.lat, lng: d.lng })
  //   })

  //   /* END (avoid duplicate if same as start)
  //   if (
  //     arrSite &&
  //     (!depSite ||
  //       depSite.lat !== arrSite.lat ||
  //       depSite.lng !== arrSite.lng)
  //   ) {
  //     points.push({ lat: arrSite.lat, lng: arrSite.lng })
  //   }

  //   */

  //   if (arrSite?.lat && arrSite?.lng) {
  //     points.push({
  //       lat: arrSite.lat,
  //       lng: arrSite.lng,
  //     })
  //   }

  //   if (points.length < 2) {
  //     this.directionsRenderer.setDirections({ routes: [] })
  //     return
  //   }

  //   const origin = points[0]
  //   const destination = points[0]

  //   const waypoints = points.slice(1, -1).map(p => ({
  //     location: p,
  //     stopover: true,
  //   }))


  //   // ---------- REQUEST REAL ROAD ROUTE ----------
  //   this.directionsService.route(
  //     {
  //       origin,
  //       destination,
  //       waypoints,
  //       travelMode: window.google.maps.TravelMode.DRIVING,
  //       optimizeWaypoints: false,
  //     },
  //     (result, status) => {
  //       if (status === 'OK') {
  //         this.directionsRenderer.setDirections(result)
  //       } else {
  //         console.warn('Directions failed:', status)
  //       }
  //     }
  //   )
  // }

  updateTripPolyline = () => {

  const trip = this.props.selectedTrips?.[0]

  // ---------- CLEAR WHEN NO TRIP ----------
  if (!trip) {
    if (this.tripPolyline) {
      this.tripPolyline.setMap(null)
      this.tripPolyline = null
    }

    if (this.directionsRenderer) {
      this.directionsRenderer.setDirections({ routes: [] })
    }

    return
  }

  if (!this.map) return

  const geometry = trip?.totalObject?.geometry

  // ==================================================
  // 1️⃣ USE VRP GEOMETRY (FAST PATH)
  // ==================================================
  if (geometry) {

    try {

      // remove previous directions
      if (this.directionsRenderer) {
        this.directionsRenderer.setDirections({ routes: [] })
      }

      // remove previous polyline
      if (this.tripPolyline) {
        this.tripPolyline.setMap(null)
      }

      const decodedPath =
        window.google.maps.geometry.encoding.decodePath(geometry)

      this.tripPolyline = new window.google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: '#2563eb',
        strokeOpacity: 0.9,
        strokeWeight: 4,
      })

      this.tripPolyline.setMap(this.map)

      // fit map
      const bounds = new window.google.maps.LatLngBounds()
      decodedPath.forEach(p => bounds.extend(p))
      this.map.fitBounds(bounds)

      return

    } catch (err) {
      console.warn("Geometry decode failed. Falling back to Directions.", err)
    }
  }

  // ==================================================
  // 2️⃣ FALLBACK → GOOGLE DIRECTIONS
  // ==================================================

  if (!this.directionsService) {
    this.directionsService = new window.google.maps.DirectionsService()
  }

  if (!this.directionsRenderer) {
    this.directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#2563eb',
        strokeOpacity: 0.9,
        strokeWeight: 4,
      },
    })

    this.directionsRenderer.setMap(this.map)
  }

  const sites = this.props.sites || []

  const depSite = sites.find(s => s.id === trip.depSite)
  const arrSite = sites.find(s => s.id === trip.arrSite)

  const tripDocs = this.getEffectiveTripDocs()
    .filter(d => d.lat && d.lng)
    .sort((a, b) => (a.seq || 0) - (b.seq || 0))

  let points = []

  if (depSite) {
    points.push({ lat: depSite.lat, lng: depSite.lng })
  }

  tripDocs.forEach(d => {
    points.push({ lat: d.lat, lng: d.lng })
  })

  if (arrSite?.lat && arrSite?.lng) {
    points.push({ lat: arrSite.lat, lng: arrSite.lng })
  }

  if (points.length < 2) {
    this.directionsRenderer.setDirections({ routes: [] })
    return
  }

  const origin = points[0]
  const destination = points[points.length - 1]

  const waypoints = points.slice(1, -1).map(p => ({
    location: p,
    stopover: true,
  }))

  this.directionsService.route(
    {
      origin,
      destination,
      waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
      optimizeWaypoints: false,
    },
    (result, status) => {

      if (status === 'OK') {

        if (this.tripPolyline) {
          this.tripPolyline.setMap(null)
          this.tripPolyline = null
        }

        this.directionsRenderer.setDirections(result)

      } else {

        console.warn('Directions failed:', status)

      }
    }
  )
}



  updateTripPolyline_working2_old = () => {


    if (!this.props.selectedTrips || !this.props.selectedTrips[0]) {
      if (this.tripPolyline) {
        this.tripPolyline.setMap(null)
        this.tripPolyline = null
      }
      return
    }

    if (!this.map || !this.props.geoData?.length) return;

    if (!this.directionsService || !this.directionsRenderer) return;

    // ---- get start / end sites ----
    const { departure, arrival } = this.getTripSites();

    // ---- planned trip documents ----
    const tripDocs = this.props.geoData
      .filter((d) => d.lat && d.lng)
      .sort((a, b) => (a.seq || 0) - (b.seq || 0));

    let points = [];

    // START (warehouse)
    if (departure?.lat && departure?.lng) {
      points.push({
        lat: departure.lat,
        lng: departure.lng,
      });
    }

    // DOCUMENT STOPS
    tripDocs.forEach((d) => {
      points.push({
        lat: d.lat,
        lng: d.lng,
      });
    });

    // END (warehouse)
    if (arrival?.lat && arrival?.lng) {
      points.push({
        lat: arrival.lat,
        lng: arrival.lng,
      });
    }

    // Need at least 2 points
    if (points.length < 2) {
      this.directionsRenderer.setDirections({ routes: [] });
      return;
    }

    const origin = points[0];
    const destination = points[points.length - 1];

    const waypoints = points.slice(1, -1).map((p) => ({
      location: p,
      stopover: true,
    }));

    this.directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false,
      },
      (result, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(result);
        } else {
          console.warn('Directions failed:', status);
        }
      }
    );
  };


  // ===================== DRAG =====================
  isCloseToMarker = (a, b, t = 0.005) =>
    Math.abs(a.lat - b.lat) < t && Math.abs(a.lng - b.lng) < t

  getSameCoordinateToPlanDocs = (doc) => {
    const stagedAddDocIds = new Set(this.state.stagedAddDocs.map(d => d.docnum))
    return compactArray(this.props.markers || []).filter(d =>
      d &&
      d.docnum &&
      (!d.seq || d.seq === 0) &&
      d.lat &&
      d.lng &&
      !stagedAddDocIds.has(d.docnum) &&
      this.isCloseToMarker(
        { lat: Number(doc.lat), lng: Number(doc.lng) },
        { lat: Number(d.lat), lng: Number(d.lng) },
        0.00001
      )
    )
  }

  resetDraggedMarker = (marker) => {
    if (marker?.__originalPosition) {
      marker.setPosition(marker.__originalPosition)
      delete marker.__originalPosition
    }
  }

  resolveDropTarget = (dropPoint) => {
    const plannedDocs = this.getEffectiveTripDocs()
      .filter(d => d.seq > 0 && d.lat && d.lng)

    return plannedDocs.find(d =>
      this.isCloseToMarker(dropPoint, { lat: d.lat, lng: d.lng })
    )
  }

  getCompatibilityMessage = (doc, trip) => {
    if (!trip?.vehicleObject) return ''

    let productCompatability = true
    const vehProdCategories = trip.vehicleObject.tclcod
      ? trip.vehicleObject.tclcod.trim().split(/\s+/)
      : []

    if (
      trip?.vehicleObject?.aprodCategDesc?.toLowerCase() !== 'all' &&
      doc.aprodCategDesc?.toLowerCase() !== 'all'
    ) {
      for (let i = 0; i < (doc.products || []).length; i++) {
        const productCategory = doc.products[i].productCateg
        if (!vehProdCategories.includes(productCategory)) {
          productCompatability = false
        }
      }
    }

    let vehCustomerCompatability = true
    const vehCustomerCategories = trip.vehicleObject.customerlist
      ? trip.vehicleObject.customerlist.trim().split(/\s+/)
      : []

    if (
      trip?.vehicleObject?.avehClassListDesc?.toLowerCase() !== 'all' &&
      doc.avehClassListDesc?.toLowerCase() !== 'all'
    ) {
      const customer = doc.bpcode
      if (!vehCustomerCategories.includes(customer)) {
        vehCustomerCompatability = false
      }
    }

    let routeCodeCompatability = true
    const vehRouteCode = trip.vehicleObject.routeCode
      ? trip.vehicleObject.routeCode.split(',').map(v => v.trim())
      : []

    if (
      trip?.vehicleObject?.aroutecodeDesc?.toLowerCase() !== 'all' &&
      doc.aroutecodeDesc?.toLowerCase() !== 'all'
    ) {
      if (!vehRouteCode.includes(doc.routeCode)) {
        routeCodeCompatability = false
      }
    }

    let message = ''
    if (!productCompatability) {
      message += `Products are not compatible with the vehicle's product category restrictions. \n`
    }
    if (!vehCustomerCompatability) {
      message += `The selected vehicle is not compatible with customer's vehicle class restrictions. \n`
    }
    if (!routeCodeCompatability) {
      message += `The selected vehicle route code does not match the customer's route code. \n`
    }

    return message
  }

  stageMultipleDocs = (docsToAdd) => {
    const existing = new Set(this.state.stagedAddDocs.map(d => d.docnum))
    const filtered = docsToAdd.filter(d => !existing.has(d.docnum))

    if (!filtered.length) {
      this.setState({
        multiDragConfirmShow: false,
        pendingSameCoordDocs: [],
      })
      toast.info('All same-location documents are already staged')
      return
    }

    this.setState(
      prev => ({
        stagedAddDocs: [...prev.stagedAddDocs, ...filtered],
        pendingDoc: null,
        pendingMarker: null,
        pendingDropPoint: null,
        pendingSameCoordDocs: [],
        addConfirmShow: false,
        multiDragConfirmShow: false,
        warningflg: false,
      }),
      () => {
        this.updateMarkers()
        this.updateTripPolyline()
        toast.success(`${filtered.length} documents added to trip`)
      }
    )
  }

  proceedSingleDrop = (doc, dropPoint, marker) => {
    const trip = this.props.selectedTrips?.[0]
    const target = this.resolveDropTarget(dropPoint)

    if (!target) {
      this.resetDraggedMarker(marker)
      return
    }

    const message = this.getCompatibilityMessage(doc, trip)
    if (message) {
      this.setState({
        pendingDoc: doc,
        pendingMarker: marker,
        warningflg: false,
        addConfirmShow: true,
        confirmMessage: `${message} \n Are you sure you want to add document ${doc.docnum} to this trip?`,
      })
      return
    }

    this.setState({
      pendingDoc: doc,
      pendingMarker: marker,
      warningflg: false,
      addConfirmShow: true,
      confirmMessage: `Do you want to add document ${doc.docnum} to this trip?`,
    })
  }

  proceedMultiDropSkipValidation = () => {
    const { pendingSameCoordDocs, pendingDropPoint, pendingMarker } = this.state
    if (!pendingSameCoordDocs?.length || !pendingDropPoint) return

    const target = this.resolveDropTarget(pendingDropPoint)
    if (!target) {
      this.resetDraggedMarker(pendingMarker)
      this.setState({
        multiDragConfirmShow: false,
        pendingSameCoordDocs: [],
        pendingDoc: null,
        pendingMarker: null,
        pendingDropPoint: null,
      })
      return
    }

    this.stageMultipleDocs(pendingSameCoordDocs)
  }

  proceedMultiDropSingle = () => {
    const { pendingDoc, pendingDropPoint, pendingMarker } = this.state
    if (!pendingDoc || !pendingDropPoint) return

    this.setState(
      {
        multiDragConfirmShow: false,
        pendingSameCoordDocs: [],
      },
      () => this.proceedSingleDrop(pendingDoc, pendingDropPoint, pendingMarker)
    )
  }

  cancelMultiDrop = () => {
    this.resetDraggedMarker(this.state.pendingMarker)
    this.setState({
      multiDragConfirmShow: false,
      pendingSameCoordDocs: [],
      pendingDropPoint: null,
      pendingDoc: null,
      pendingMarker: null,
      warningflg: false,
    })
  }
  handleToPlanDrop = (doc, latLng, marker) => {
    if (doc.seq > 0) return

    if (this.state.stagedAddDocs.some(d => d.docnum === doc.docnum)) {
      this.resetDraggedMarker(marker)
      this.setState({
        pendingDoc: doc,
        pendingMarker: marker,
        addConfirmShow: true,
        warningflg: true,
        confirmMessage: `Already document ${doc.docnum} planned  to this trip?`,
      })
      return
    }

    const dropPoint = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    }

    const sameCoordDocs = this.getSameCoordinateToPlanDocs(doc)
    if (sameCoordDocs.length > 1) {
      this.setState({
        pendingDoc: doc,
        pendingMarker: marker,
        pendingDropPoint: dropPoint,
        pendingSameCoordDocs: sameCoordDocs,
        warningflg: false,
        multiDragConfirmShow: true,
      })
      return
    }

    this.proceedSingleDrop(doc, dropPoint, marker)
  }
  handleToPlanDrop__ = (doc, latLng) => {
    // Only To-Plan docs
    if (doc.seq > 0) return

    const dropPoint = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    }

    const plannedDocs = compactArray(this.props.geoData || [])
      .filter(d => d.seq > 0 && d.lat && d.lng)

    const target = plannedDocs.find(d =>
      this.isCloseToMarker(dropPoint, { lat: d.lat, lng: d.lng })
    )

    if (!target) {
      // ❌ Not dropped on route → reset
      this.updateMarkers()
      return
    }

    if (this.state.stagedAddDocs.some(d => d.docnum === doc.docnum)) {
      toast.info('Document already staged for this trip')
      return
    }


    // ✅ Store pending doc and ask confirmation
    this.setState({
      pendingDoc: doc,
      addConfirmShow: true,
      confirmMessage: `Do you want to add document ${doc.docnum} to this trip?`,
    })
  }


  confirmAddToTrip = () => {
    const { pendingDoc, stagedAddDocs } = this.state
    if (!pendingDoc) return

    this.setState(
      {
        stagedAddDocs: [...stagedAddDocs, pendingDoc],
        pendingDoc: null,
        pendingMarker: null,
        pendingDropPoint: null,
        pendingSameCoordDocs: [],
        multiDragConfirmShow: false,
        warningflg: false,
        addConfirmShow: false,
      },
      () => {
        this.updateMarkers()
        this.updateTripPolyline()
        if (this.isListUiVisible()) {
          this.initListSortable()
        }
      }
    )
  }


  isTripLocked = () => {
    const trip = this.props.selectedTrips?.[0]
    const lockVal = trip?.lock

    if (lockVal === true || lockVal === 1 || lockVal === '1') return true
    if (typeof lockVal === 'string' && lockVal.toLowerCase() === 'true') return true

    return false
  }


  confirmAddNo = () => {
    const { pendingDoc } = this.state


    if (pendingDoc && this.markersByDoc[pendingDoc.docnum]) {
      const marker = this.markersByDoc[pendingDoc.docnum]

      this.resetDraggedMarker(marker)
    }

    this.setState({
      addConfirmShow: false,
      pendingDoc: null,
      pendingMarker: null,
      pendingDropPoint: null,
      pendingSameCoordDocs: [],
      multiDragConfirmShow: false,
    })
  }


  undoAdd = (docnum) => {
    this.setState(
      prev => ({
        stagedAddDocs: prev.stagedAddDocs.filter(d => d.docnum !== docnum),
      }),
      () => {
        this.updateMarkers()
        this.updateTripPolyline()
      }
    )
  }


  undoRemove = (docnum) => {
    this.setState(
      prev => ({
        stagedRemoveDocs: prev.stagedRemoveDocs.filter(d => d.docnum !== docnum),
      }),
      () => {
        this.updateMarkers()
        this.updateTripPolyline()
      }
    )
  }




  createSiteMarkers = () => {
    if (!this.map) return;

    const { departure, arrival } = this.getTripSites();

    // ===== DEPARTURE (WAREHOUSE / HOME) =====
    if (departure) {
      if (!this.departureMarker) {
        this.departureMarker = new window.google.maps.Marker({
          map: this.map,
          position: { lat: departure.lat, lng: departure.lng },
          title: departure.name || 'Departure Site',
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-home.png',
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });
      } else {
        // update position if trip changes
        this.departureMarker.setPosition({
          lat: departure.lat,
          lng: departure.lng,
        });
      }
    }

    // ===== ARRIVAL (END SITE) =====
    if (arrival) {
      if (!this.arrivalMarker) {
        this.arrivalMarker = new window.google.maps.Marker({
          map: this.map,
          position: { lat: arrival.lat, lng: arrival.lng },
          title: arrival.name || 'Arrival Site',
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-flag.png',
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });
      } else {
        this.arrivalMarker.setPosition({
          lat: arrival.lat,
          lng: arrival.lng,
        });
      }
    }
  };


  getTripSites = () => {
    const trip = this.props.selectedTrips?.[0];
    if (!trip || !Array.isArray(this.props.sites)) return {};

    const depCode = String(trip.depSite || '');
    const arrCode = String(trip.arrSite || '');

    const depSite = this.props.sites.find(
      (s) => String(s.id) === depCode
    );

    const arrSite = this.props.sites.find(
      (s) => String(s.id) === arrCode
    );

    return {
      departure: depSite
        ? {
          lat: Number(depSite.lat),
          lng: Number(depSite.lng),
          name: depSite.value,
          siteId: depSite.id,
        }
        : null,

      arrival: arrSite
        ? {
          lat: Number(arrSite.lat),
          lng: Number(arrSite.lng),
          name: arrSite.value,
          siteId: arrSite.id,
        }
        : null,
    };
  };

  areSameLocation = (a, b, tolerance = 0.0001) => {
    if (!a || !b) return false;
    return (
      Math.abs(a.lat - b.lat) < tolerance &&
      Math.abs(a.lng - b.lng) < tolerance
    );
  };

  createSiteIcon = (type) => {
    if (type === 'both') {
      return {
        url: 'https://maps.google.com/mapfiles/ms/icons/purple-home.png',
        scaledSize: new window.google.maps.Size(48, 48),
      };
    }

    if (type === 'start') {
      return {
        url: 'https://maps.google.com/mapfiles/ms/icons/homegardenbusiness.png',
        scaledSize: new window.google.maps.Size(44, 44),
      };
    }

    if (type === 'end') {
      return {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-home.png',
        scaledSize: new window.google.maps.Size(44, 44),
      };
    }

    return null;
  };



  updateSiteMarkers = () => {
    if (!this.map) return;

    const { departure, arrival } = this.getTripSites();

    if (departure) {
      if (!this.startMarker) {
        this.startMarker = new window.google.maps.Marker({
          map: this.map,
          position: departure,
          icon: this.createSiteIcon('start'),
          label: {
            text: 'S',
            color: '#fff',
            fontWeight: 'bold',
          },
          title: `Start: ${departure.name}`,
        });

        this.attachInfoWindow(this.startMarker, `
        <b>Start Site</b><br/>
        ${departure.name}<br/>
        Site: ${departure.siteId}
      `);
      }
    }

    if (arrival) {
      if (!this.endMarker) {
        this.endMarker = new window.google.maps.Marker({
          map: this.map,
          position: arrival,
          icon: this.createSiteIcon('end'),
          label: {
            text: 'E',
            color: '#fff',
            fontWeight: 'bold',
          },
          title: `End: ${arrival.name}`,
        });

        this.attachInfoWindow(this.endMarker, `
        <b>End Site</b><br/>
        ${arrival.name}<br/>
        Site: ${arrival.siteId}
      `);
      }
    }
  };



  refreshMapSize = () => {
    if (this.map) {
      window.google.maps.event.trigger(this.map, "resize");
    }
  };

  showList = () => {

    if (this.map) {
      this.lastCenter = this.map.getCenter();
    }
    this.setState(
      { isMap: false, isList: true },
      () => {
        setTimeout(() => this.initListSortable(), 0)
      }
    );
  };


  showMap = () => {
    this.setState(
      {
        isMap: true,
        isList: false,
      },
      () => {
        // 🔥 WAIT for DOM to be visible
        setTimeout(() => {
          if (this.map) {
            window.google.maps.event.trigger(this.map, 'resize')

            // restore last center
            if (this.lastCenter) {
              this.map.setCenter(this.lastCenter)
            }
          } else {
            // safety: map was never initialized
            this.initMapOnce()
            this.initDirectionsOnce()
            this.updateMarkers()
            this.updateTripPolyline()
          }
        }, 200)
      }
    )
  }

  //    LIVE metrics calculations for trip summary display
  getLiveTripMetrics = () => {
    const docs = this.getEffectiveTripDocs()

    const totalCases = docs.reduce(
      (t, d) => t + (Number(d.mainCases) || 0),
      0
    )

    const totalWeight = docs.reduce(
      (t, d) => t + (Number(d.netweight) || 0),
      0
    )

    const totalPallets = docs.reduce(
      (t, d) => t + (Number(d.noofCases) || 0),
      0
    )

    return {
      cases: totalCases,
      pallets: parseFloat(totalPallets).toFixed(2),
      capacity: totalWeight.toFixed(2),
      stops: docs.length,
    }
  }



  // Validate each drag and drop the document
  validateAddToTrip = (doc, targetDoc) => {
    // Example rules (adjust as needed)

    if (doc.bpcode !== targetDoc.bpcode) {
      return 'Customer mismatch. Cannot add to this route.'
    }

    if (doc.netweight > this.props.selectedTrips[0].capacity) {
      return 'Exceeds vehicle capacity.'
    }

    if (doc.doctype === 'RETURN') {
      return 'Return documents cannot be added to this trip.'
    }

    return null // ✅ valid
  }


  //   ======================= render each of doc type ====================
  renderDocRow = (doc, color, onClose, flag) => (
    <div
      key={doc.docnum}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
        color,
      }}
    >
      <div>
        <div>
          <b>{doc.seq ? `#${doc.seq}` : ''} </b> {' '}
          <b>{doc.docnum}</b> — {this.normalizeApostrophes(doc.bpname) || '-'}</div>
        <div style={{ fontSize: 12, color: '#555' }}>
          {doc.city || '-'}
        </div>
        <div style={{ fontSize: 12, color: '#555' }}>
          {parseInt(doc.mainCases) || 0} CS  <b>|| </b> {parseFloat(doc.noofCases).toFixed(2) || 0}  PAL
        </div>
      </div>
      {flag &&
        <button onClick={onClose}>✕</button>
      }
    </div>
  )
  // ====================Split screen ====================


  toggleSplitFullscreen = async () => {
    const el = document.getElementById('map-fullscreen-wrapper')
    if (!el) return

    if (!document.fullscreenElement) {
      await el.requestFullscreen()
    }

    this.setState(
      {
        isSplitView: true,
        isFullScreen: true,   // 🔥 REQUIRED
        isMap: true,
        isList: true,
      },
      () => {
        setTimeout(() => {
          if (this.map) {
            window.google.maps.event.trigger(this.map, 'resize')
          } else {
            this.initMapOnce()
            this.initDirectionsOnce()
          }
          this.initListSortable()
        }, 300)
      }
    )
  }


  toggleSplitView = () => {
    this.setState(
      prev => ({
        isSplitView: !prev.isSplitView,
        isMap: true,
        isList: true, // force both visible
      }),
      () => {
        setTimeout(() => {
          if (this.map) {
            window.google.maps.event.trigger(this.map, 'resize')
          }
          this.initListSortable()
        }, 200)
      }
    )
  }

  startSplitResize = (e) => {
    e.preventDefault()
    this.isResizingSplit = true
    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', this.onSplitResizeMove)
    document.addEventListener('mouseup', this.stopSplitResize)
  }

  onSplitResizeMove = (e) => {
    if (!this.isResizingSplit) return

    const wrapper = document.getElementById('map-fullscreen-wrapper')
    if (!wrapper) return

    const rect = wrapper.getBoundingClientRect()
    if (!rect.height) return

    const pointerY = e.clientY - rect.top
    let nextPct = (pointerY / rect.height) * 100
    nextPct = Math.max(20, Math.min(80, nextPct))

    this.setState({ splitMapHeightPct: nextPct }, () => {
      if (this.map) {
        window.google.maps.event.trigger(this.map, 'resize')
      }
    })
  }

  stopSplitResize = () => {
    if (!this.isResizingSplit) return

    this.isResizingSplit = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    document.removeEventListener('mousemove', this.onSplitResizeMove)
    document.removeEventListener('mouseup', this.stopSplitResize)

    if (this.map) {
      window.google.maps.event.trigger(this.map, 'resize')
    }
  }




  // =====================end of split screen=============


  // ===================== FULLSCREEN =====================
  /* handleFS = () => {
     this.setState({ isFullScreen: !!document.fullscreenElement })
   }
    */

  handleFS = () => {
    const isFs = !!document.fullscreenElement

    this.setState(prev => ({
      isFullScreen: isFs,

      // 🔥 auto-exit split when leaving fullscreen
      isSplitView: isFs ? prev.isSplitView : false,
    }))
  }


  toggleFullscreen = () => {
    const el = document.getElementById('map-fullscreen-wrapper')
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen()
    else el.requestFullscreen()
  }

  renderTripSummaryPanel = () => {

    const trip = this.props.selectedTrips?.[0]
    if (!trip) return null

    const { stagedAddDocs, stagedRemoveDocs } = this.state

    /*
      const {
          stagedAddDocs = [],
          stagedRemoveDocs = [],
        } = this.state




    // 🔹 planned docs = effective docs MINUS staged removals
    const plannedDocs = this.getEffectiveTripDocs().filter(
      d => !stagedRemoveDocs.includes(d.docnum)
    )
    */
    const plannedDocs = this.getEffectiveTripDocs()

    const originalOrder = (this.props.geoData || []).map(d => d.docnum)
const plannedOrder = (plannedDocs || []).map(d => d.docnum)

const orderChanged =
  originalOrder.length === plannedOrder.length &&
  !originalOrder.every((doc, i) => doc === plannedOrder[i])

    const hasChanges =
      stagedAddDocs.length > 0 || stagedRemoveDocs.length > 0 || orderChanged


    return (
      <Card>
        <CardBody>

          <CardTitle>Trip Summary</CardTitle>
          <div><b>Trip:</b> {trip.itemCode}</div>
          <div><b>Vehicle:</b> {trip.vehicleObject.name || '-'}</div>
          <div><b>Driver:</b> {trip.driverName || '-'}</div>
          {trip.lock && (
            <div style={{ color: '#dc2626', fontWeight: 'bold' }}>
              🔒 Trip Locked
            </div>
          )}

          {(() => {
            const m = this.getLiveTripMetrics()

            return (
              <>
                <div><b>Cases:</b> {m.cases} CS</div>
                <div><b>Stops:</b> {m.stops}</div>
                <div><b>Pallets:</b> {m.pallets} PAL</div>
                <div><b>Capacity:</b> {m.capacity} KG</div>
              </>
            )
          })()}

          <hr />

          <CardTitle>Route Stops</CardTitle>

          {plannedDocs.map(d =>
            this.renderDocRow(
              d,
              '#2563eb',
              () => this.requestRemoveFromPanel(d)
            )
          )}


          {hasChanges && (
            <>
              <hr />
              <CardTitle>Pending Changes</CardTitle>

              {/* ADDITIONS */}
              {/* ADDITIONS */}
              {stagedAddDocs.length > 0 && (
                <>
                  <div className="text-muted mb-1">➕ Added</div>
                  {stagedAddDocs.map(d =>
                    this.renderDocRow(
                      d,
                      '#d97706',
                      () => this.undoAdd(d.docnum),
                      true
                    )
                  )}
                </>
              )}

              {/* DELETIONS */}
              {stagedRemoveDocs.length > 0 && (
                <>
                  <div className="text-muted mt-2 mb-1">➖ Removed</div>
                  {stagedRemoveDocs.map(d =>
                    this.renderDocRow(
                      d,
                      '#dc2626',
                      () => this.undoRemove(d.docnum),
                      true
                    )
                  )}
                </>
              )}

            </>
          )}

        </CardBody>

        <div style={{ padding: '10px', textAlign: 'right' }}>
          <Button
            size="sm"
            color="secondary"
            disabled={!hasChanges}
            onClick={() =>
              this.setState({
                stagedAddDocs: [],
                pendingDoc: null,
                pendingMarker: null,
                stagedRemoveDocs: [],
                pendingRemoveDoc: null
              }, () => {
                this.updateMarkers()
                this.updateTripPolyline()
              })
            }
          >
            Discard
          </Button>{' '}

          <Button
            size="sm"
            color="primary"
            disabled={!hasChanges}
            onClick={this.confirmTrip}
          >
            Confirm Trip
          </Button>
        </div>
      </Card>
    )
  }




  // =========================confirmUpdatedTrip==========================

  sum = (arr, key) =>
    arr.reduce((t, x) => t + (Number(x[key]) || 0), 0)

  countBy = (arr, predicate) =>
    arr.filter(predicate).length

  buildFinalSelectedTripData = () => {
    const trip = this.props.selectedTrips?.[0]
    if (!trip) return []

    const originalDocs =
      // trip.totalObject?.selectedTripData
      //   ? [...trip.totalObject.selectedTripData]
      //   : []
      this.state.reorderedGeoData ||
      trip.totalObject?.selectedTripData ||
      [];



    // 1️⃣ Remove deleted docs
    let result = originalDocs.filter(
      d =>
        !this.state.stagedRemoveDocs.some(
          r => r.docnum === d.docnum
        )
    )




    // 2️⃣ Add staged docs (avoid duplicates)
    this.state.stagedAddDocs.forEach(doc => {
      if (!result.some(d => d.docnum === doc.docnum)) {
        result.push({
          ...doc,
          tripno: trip.trips || '1',
          panelType: 'drop',
          itemCode: trip.itemCode,
        })
      }
    })

    // 3️⃣ Re-sequence (backend expects clean seq)
    result = result.map((d, idx) => ({
      ...d,
      seq: idx + 1,
    }))

    return result
  }



  buildTripMetrics = (docs) => {
    const drops = this.countBy(docs, d => d.panelType === 'drop')
    const pickups = this.countBy(docs, d => d.panelType === 'pickup')

    const totalWeight = this.sum(docs, 'netweight')
    const totalVolume = this.sum(docs, 'volume')
    const totalPallets = this.sum(docs, 'noofCases')

    return {
      drops: docs.length,
      pickups,
      stops: docs.length,
      totalWeight: `${totalWeight.toFixed(2)} KG`,
      totalVolume: `${totalVolume.toFixed(2)} M3`,
      totalPallets: totalPallets.toFixed(2),
      doc_capacity: totalWeight,
      doc_volume: totalVolume,
      doc_qty: docs.length,
    }
  }


  buildFinalTripPayload = () => {
    const trip = this.props.selectedTrips[0]

    const finalDocs = this.buildFinalSelectedTripData()
    const metrics = this.buildTripMetrics(finalDocs)

    // 🔥 IMPORTANT: force NEW references
    const updatedTotalObject = {
      ...(trip.totalObject || {}),
      selectedTripData: finalDocs, // 👈 NEW ARRAY
    }


    return {
      ...trip,

      // 🔥 SINGLE SOURCE OF TRUTH
      dropObject: finalDocs,        // 👈 NEW ARRAY

      totalObject: {
        ...trip.totalObject,
        selectedTripData: finalDocs, // backend MUST trust this
      },
      // 👈 NEW OBJECT

      // 🔢 METRICS
      ...metrics,

      reorder: true,
      forceSeq: false,
      route: false,
      lock: false,
    }
  }




  resetRouteMapState = () => {
    this.setState(
      {
        stagedAddDocs: [],
        stagedRemoveDocs: [],
        pendingDoc: null,
        pendingMarker: null,
        pendingRemoveDoc: null,
        addConfirmShow: false,
        warningflg: false,
        removeConfirmShow: false,
        reorderedGeoData: null
      },
      () => {
        this.updateMarkers()
        this.updateTripPolyline()
        if (this.isListUiVisible()) {
          this.initListSortable()
        }
      }
    )
  }



  // confirmTrip = async () => {


  //   const payload = this.buildFinalTripPayload()

  //   // if (payload.) {

  //   // }

  //   try {
  //     // 🔥 wait for backend
  //     await this.props.finalUpdatedTrip(payload)

  //     // ✅ EXIT FULLSCREEN
  //     this.exitFullscreenIfNeeded()

  //     // ✅ reset staged UI
  //     this.resetRouteMapState()

  //     //  toast.success('Trip updated successfully')

  //   } catch (e) {
  //     console.error(e)
  //     toast.error('Trip update failed')
  //   }

  // }

  confirmTrip = async () => {

    const trip = this.props.selectedTrips[0]

    const finalDocs = this.buildFinalSelectedTripData()
    const metrics = this.buildTripMetrics(finalDocs)


    // -------------------------------
    // keep your message structure
    // -------------------------------
    let mess = ''

    if (metrics.doc_capacity > trip.vehicleObject.capacities) {
      mess += `Trip Weight (${Number(metrics.doc_capacity).toFixed(2)} KG) exceeds the vehicle’s maximum weight capacity (${trip.vehicleObject.capacities} KG). \n`
    }

    if (metrics.doc_volume > trip.vehicleObject.vol) {
      mess += `Trip Volume (${Number(metrics.doc_volume).toFixed(2)} M3) exceeds the vehicle’s maximum volume capacity (${trip.vehicleObject.vol} M3). \n`
    }

    if (metrics.totalPallets > trip.vehicleObject.maxqty) {
      mess += `Trip total Pallets (${metrics.totalPallets} PAL) exceeds the vehicle’s maximum pallets capacity (${trip.vehicleObject.maxqty} PAL). \n`
    }

    // -------------------------------
    // show modal and STOP execution
    // -------------------------------
    if (mess) {
      this.setState({
        addTripConfirmShow: true,
        confirmMessage: `${mess} Are you sure you want to continue ?`,
        tripConfirmPending: true
      })

      return   // ⛔ stop here
    }

    // no warning → continue directly
    await this.submitFinalTrip()
  }

  onTripConfirmYes = async () => {
    this.setState(
      {
        addTripConfirmShow: false,
        tripConfirmPending: false
      },
      async () => {
        await this.submitFinalTrip()
      }
    )
  }

  onTripConfirmNo = () => {
    this.setState({
      addTripConfirmShow: false,
      tripConfirmPending: false
    })
  }

  submitFinalTrip = async () => {
    const payload = this.buildFinalTripPayload()

    try {
      // 🔥 wait for backend
      await this.props.finalUpdatedTrip(payload)
      // ✅ EXIT FULLSCREEN
      this.exitFullscreenIfNeeded()
      // ✅ reset staged UI
      this.resetRouteMapState()
    } catch (e) {
      console.error(e)
      toast.error('Trip update failed')
    }
  }



  exitFullscreenIfNeeded = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }


  displayBadge = (typeMvt, iSeq) => {
    const docmvt = typeMvt
    const Seq = iSeq + 1
    if (docmvt === 'PICK')
      return (
        <h5>
          <td width="3%" class="priority">
            <span class="badge badge-primary text-uppercase">{Seq}</span>
          </td>
        </h5>
      )
    if (docmvt === 'DLV')
      return (
        <h5>
          <td width="3%" class="priority">
            <span class="badge badge-success ">{Seq}</span>
          </td>
        </h5>
      )
    if (docmvt === 'PRECEIPT')
      return (
        <h5>
          <td width="3%" class="priority">
            <span class="badge badge-warning text-uppercase">{Seq}</span>
          </td>
        </h5>
      )
    if (docmvt === 'RETURN')
      return (
        <h5>
          <td width="3%" class="priority">
            <span class="badge badge-warning text-uppercase">{Seq}</span>
          </td>
        </h5>
      )
    return null
  }




  onDocClick = (product, docNum, doctype) => {
    this.setState({
      addProductShow: true,
      products: product,
      docNumber: docNum,
      doctype: doctype,
    })
  }

  displayPriority = (drop) => {
    if (drop.priority === 10) {
      return (
        <h6>
          <span class="badge badge-primary text-uppercase">Normal</span>
        </h6>
      )
    } else if (drop.priority === 40) {
      return (
        <h6>
          <span class="badge badge-success text-uppercase">Urgent</span>
        </h6>
      )
    } else if (drop.priority === 80) {
      return (
        <h6>
          <span class="badge badge-danger text-uppercase">Critical</span>
        </h6>
      )
    }
    return (
      <h6>
        <span class="badge badge-primary text-uppercase">Normal</span>
      </h6>
    )
  }


  displayRouteTag = (drop, lang) => {
    const myStr = drop.routeColor || ''
    const subStr = myStr.match('background-color:(.*)')
    const s = (subStr && subStr[1]) || '#ccc'
    if (lang === 'eng') {
      return (
        <h6>
          <span style={{ backgroundColor: s }}>{drop.routeTag}</span>
        </h6>
      )
    }
    return (
      <h6>
        <span style={{ backgroundColor: s }}>{drop.routeTagFRA}</span>
      </h6>
    )
  }

  displayRouteTypeDocBadge = (typDoc, pDropPairedDoc) => {
    const RouteMvt = typDoc
    const dropPairedDoc = pDropPairedDoc || ''
    if (RouteMvt === 'PICK') {
      return (
        <h5>
          <td width="3%">
            <span class="badge badge-primary text-uppercase">
              {this.props.t('PICK')}
            </span>
          </td>
        </h5>
      )
    }
    if (RouteMvt === 'DLV') {
      if ((dropPairedDoc || '').length > 1) {
        return (
          <h5>
            <td width="3%">
              <span class='badge badge-info style="font-size:2rem'>
                {this.props.t('DLVEXCHANGE')}
              </span>
            </td>
          </h5>
        )
      }
      return (
        <h5>
          <td width="3%">
            <span class='badge badge-success style="font-size:2rem'>
              {this.props.t('DLV')}
            </span>
          </td>
        </h5>
      )
    }
    if (RouteMvt === 'PRECEIPT') {
      return (
        <h5>
          <td width="3%">
            <span class="badge badge-danger text-uppercase">
              {this.props.t('PRECEIPT')}
            </span>
          </td>
        </h5>
      )
    }
    if (RouteMvt === 'RETURN') {
      return (
        <h5>
          <td width="3%">
            <span class="badge badge-danger text-uppercase">
              {this.props.t('RETURN')}
            </span>
          </td>
        </h5>
      )
    }
    return null
  }


  displayDeliverableStatus = (docnum) => {
    let status = 'NA'
      ; (this.props.currDropsPanel?.drops || []).forEach((drop) => {
        if (drop.docnum === docnum) {
          if (drop.dlvflg === '1') status = 'No'
          else if (drop.dlvflg === '2' || drop.dlvflg === '3') status = 'Yes'
          else status = 'NA'
        }
      })
    return (
      <h5>
        {status === 'Yes' ? (
          <td width="3%">
            <span class="badge badge-success text-uppercase">{status}</span>
          </td>
        ) : (
          <td width="3%">
            <span class="badge badge-danger text-uppercase">{status}</span>
          </td>
        )}
      </h5>
    )
  }

  // ===================== RENDER =====================
  render() {
    const { t } = this.props
    const addProductsClose = () => this.setState({ addProductShow: false })
    return (
      <React.Fragment>
        {/* ================= TOP / LIST / TABLE SECTION ================= */}
        {/* ⚠️ NO UI CHANGES HERE — uses existing layout & CSS */}
        <div
          className="routeMapOuter"
          style={{
            height: this.state.isFullScreen ? '100vh' : '460px',
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}
        >
          <Row>
            <Col md="12">
              {/* Existing search, filters, table, list view */}
              {this.props.children}
            </Col>
          </Row>


          {/* ================= MAP / LIST TOGGLE ================= */}
          <Row className="mt-2">
            <Col md="6" className="text-left">
              <div
                style={{
                  position: 'absolute',

                  left: 10,
                  zIndex: 5,
                  background: '#fff',
                  padding: '6px 10px',
                  borderRadius: 4,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
                }}
              >
                <label style={{ margin: 0 }}>
                  <input
                    type="checkbox"
                    checked={this.state.showToPlanDocs}
                    onChange={() =>
                      this.setState(
                        prev => ({ showToPlanDocs: !prev.showToPlanDocs }),
                        () => this.updateMarkers()
                      )
                    }
                  />{' '}
                  Show To-Plan
                </label>
              </div>
            </Col>
            <Col md="6" className="text-right">
              <ButtonGroup>
                <Button
                  size="sm"
                  disabled={this.state.isSplitView}
                  color={this.state.isMap ? 'primary' : 'secondary'}
                  onClick={this.showMap}
                >
                  {t('Map')}
                </Button>
                <Button
                  size="sm"
                  color={this.state.isList ? 'primary' : 'secondary'}
                  disabled={this.state.isSplitView}
                  onClick={this.showList}
                >
                  {t('List')}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>

          {/* ================= MAP VIEW ================= */}

          <Row className="mt-2">
            <Col md="12">
              <div
                id="map-fullscreen-wrapper"
                style={{
                  display: this.state.isMap ? 'flex' : 'none',
                  flexDirection: this.state.isSplitView ? 'column' : 'row',
                  position: 'relative',

                  // 🔥 FIX
                  height: this.state.isFullScreen
                    ? '100vh'
                    : this.state.isSplitView
                      ? '460px'
                      : '460px',
                }}
              >
                {/* ▶ Trip Summary Toggle Button */}
                {this.state.isFullScreen && (
                  <Button
                    size="sm"
                    onClick={this.toggleTripPanel}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      zIndex: 20,
                      borderRadius: '0 6px 6px 0',
                      background: '#1c2fc4',
                      color: '#fff',
                      transform: 'translateY(-50%)'
                    }}
                  >
                    {this.state.isTripPanelOpen ? '<' : '>'}
                  </Button>
                )}

                <div
                  id="google-map"
                  style={{
                    width: '100%',
                    height: this.state.isSplitView
                      ? `${this.state.splitMapHeightPct}%`
                      : '100%',
                  }}
                />

                {this.state.isSplitView && this.state.isFullScreen && (
                  <div
                    onMouseDown={this.startSplitResize}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: `${this.state.splitMapHeightPct}%`,
                      transform: 'translateY(-50%)',
                      height: '12px',
                      cursor: 'row-resize',
                      zIndex: 30,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '2px',
                        background: '#1c2fc4',
                        opacity: 0.8,
                      }}
                    />
                  </div>
                )}

                {/* 🔥 SPLIT LIST VIEW (FULLSCREEN) */}
                {this.state.isSplitView && this.state.isFullScreen && (
                  <div
                    style={{
                      width: '100%',
                      height: `${100 - this.state.splitMapHeightPct}%`,
                      background: '#fff',
                      overflowY: 'auto',
                    }}
                  >
                    {this.renderListView()}
                  </div>
                )}


                {/* SPLITSCREEN BUTTON (existing behavior) */}
                <Button
                  size="sm"
                  onClick={this.toggleSplitFullscreen}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 120,
                    zIndex: 10,
                    background: this.state.isSplitView ? '#16a34a' : '#1c2fc4',
                    border: '1px solid #ccc',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    color: '#fff',
                  }}
                >
                  ⧉ Split
                </Button>


                {/* FULLSCREEN BUTTON (existing behavior) */}
                <Button
                  size="sm"
                  onClick={this.toggleFullscreen}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 10,
                    background: '#1c2fc4',
                    border: '1px solid #ccc',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  {this.state.isFullScreen ? '⤢ Exit' : '⤢ Fullscreen'}
                </Button>

                {this.state.isFullScreen && this.state.isTripPanelOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '320px',
                      height: '100%',
                      background: '#fff',
                      zIndex: 15,
                      boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
                      overflowY: 'auto',
                      padding: '10px'
                    }}
                  >
                    {this.renderTripSummaryPanel()}
                  </div>
                )}
              </div>
            </Col>
          </Row>


          {/* ================= LIST VIEW ================= */}

          {this.state.isList && !this.state.isFullScreen && (
            this.renderListView()
          )}
        </div>

        {/* ================= MODALS / POPUPS (unchanged) ================= */}
        {this.state.multiDragConfirmShow && (
          <Modal
            isOpen={this.state.multiDragConfirmShow}
            container={document.getElementById('map-fullscreen-wrapper')}
            backdrop="static"
            centered
          >
            <ModalHeader>
              {t('Confirmation')}
            </ModalHeader>
            <ModalBody>
              <p style={{ whiteSpace: 'pre-line' }}>
                Multiple To-Plan documents share this location. Do you want to drag all documents with same coordinates or only this one?
              </p>
              <p>
                <b>Total at same location:</b> {this.state.pendingSameCoordDocs.length}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.proceedMultiDropSkipValidation}>
                Drag All 
              </Button>
              <Button color="info" onClick={this.proceedMultiDropSingle}>
                Only This One
              </Button>
              <Button
                color="secondary"
                onClick={this.cancelMultiDrop}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )}

        {/* // To plan to Planned documents confirmation */}
        {this.state.addConfirmShow && (
          <Modal
            isOpen={this.state.addConfirmShow}
            container={document.getElementById('map-fullscreen-wrapper')}
            backdrop="static"
            centered
          >
            <ModalHeader>
              {t('Confirmation')}
            </ModalHeader>
            <ModalBody>
              <p style={{ whiteSpace: 'pre-line' }}>
                {this.state.confirmMessage}
              </p>
            </ModalBody>

            <ModalFooter>
              {this.state.warningflg ? (
                // ⚠️ ALERT MODE
                <Button
                  color="primary"
                  onClick={() =>
                    this.setState({
                      addConfirmShow: false,
                      pendingDoc: null,
                      pendingMarker: null,
                      pendingDropPoint: null,
                      pendingSameCoordDocs: [],
                      multiDragConfirmShow: false,
                      warningflg: false,
                    })
                  }
                >
                  OK
                </Button>
              ) : (
                // ✅ CONFIRM MODE
                <>
                  <Button color="primary" onClick={this.confirmAddToTrip}>
                    Yes
                  </Button>
                  <Button color="secondary" onClick={this.confirmAddNo}>
                    No
                  </Button>
                </>
              )}
            </ModalFooter>
          </Modal>
        )}

        {/* // remove confirmation modal */}
        {this.state.removeConfirmShow && (
          //<Modal centered backdrop="static">
          <Modal
            isOpen={this.state.removeConfirmShow}
            container={document.getElementById('map-fullscreen-wrapper')}
            backdrop="static"
            centered
          >
            <ModalHeader>
              Remove Document
            </ModalHeader>

            <ModalBody>
              Remove document <b>{this.state.pendingRemoveDoc?.docnum}</b> from trip?
            </ModalBody>

            <ModalFooter>
              <Button color="danger" onClick={this.confirmRemove}>
                Yes
              </Button>
              <Button
                color="secondary"
                onClick={() =>
                  this.setState({ removeConfirmShow: false, pendingRemoveDoc: null })
                }
              >
                No
              </Button>
            </ModalFooter>
          </Modal>
        )}

        {/* Confirmation of trip */}
        {this.state.addTripConfirmShow && (
          <Modal
            isOpen={this.state.addTripConfirmShow}
            container={document.getElementById('map-fullscreen-wrapper')}
            backdrop="static"
            centered
          >
            <ModalHeader toggle={() => this.setState({ addTripConfirmShow: false })}>
              {t('Confirmation')}
            </ModalHeader>
            <ModalBody>
              <p style={{ whiteSpace: 'pre-line' }}>
                {this.state.confirmMessage}
              </p>
            </ModalBody>

            <ModalFooter>
              {this.state.warningflg ? (
                // ⚠️ ALERT MODE
                <Button
                  color="primary"
                  onClick={() =>
                    this.setState({
                      addTripConfirmShow: false,
                      warningflg: false,
                    })
                  }
                >
                  OK
                </Button>
              ) : (
                // ✅ CONFIRM MODE
                <>
                  <Button color="primary" onClick={this.onTripConfirmYes}>
                    Yes
                  </Button>
                  <Button color="secondary" onClick={this.onTripConfirmNo}>
                    No
                  </Button>
                </>
              )}
            </ModalFooter>
          </Modal>
        )}
        <DisplayProducts
          show={this.state.addProductShow}
          onHide={addProductsClose}
          products={this.state.products}
          docNum={this.state.docNumber}
          doctype={this.state.doctype}
        />
        <DeleteConfirm
          show={this.state.addConfirmDeleteShow}
          onHide={this.onConfirmDeleteNo}
          confirmDelete={this.onConfirmDeleteYes}
          index={this.state.index}
          docnum={this.state.docnum}
          confirmMessage={this.state.confirmMessage}
        ></DeleteConfirm>
        <ToastContainer />
      </React.Fragment>
    )
  }
}

// ===================== EXPORT =====================
export default withNamespaces()(RouteMap)
