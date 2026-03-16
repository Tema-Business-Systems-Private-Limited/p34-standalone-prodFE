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
    this.directionsService = null
    this.directionsRenderer = null

    this.state = {
      isMap: true,
      isList: false,
      isFullScreen: false,
      isPanelOpen: false,
      addConfirmShow: false,
      confirmMessage: '',
      index: -1,
      docnum: '',
      vehicleCode: '',
      addProductShow: false,
      products: [],
      docNumber: '',
      doctype: '',
      ShowDetailList: false,
      enableDocumnetMsgWindow: false,
      enableCarrierMsgWindow: false,
      selectedDocNumber: '',
      noteMessage: '',
      carrierMessage: '',
      instructionType: '',
      anchorEl: null,
    }
  }

  // ===================== LIFECYCLE =====================
  componentDidMount() {
    document.addEventListener('fullscreenchange', this.handleFS)

    this.initMapOnce()
    this.initDirectionsOnce()
    this.updateMarkers()
    this.updateTripPolyline()

    $('#diagnosis_list tbody').sortable({
      stop: function (e, ui) {
        const lock = ui.item[0].innerHTML
        if (lock.includes('unlock')) {
          renumber_table('#diagnosis_list')
        } else {
          $(this).sortable('cancel')
        }
      },
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.markers !== this.props.markers) {
      this.updateMarkers()
    }

    if (prevProps.geoData !== this.props.geoData) {
      this.updateTripPolyline()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.handleFS)
  }

  // ===================== MAP INIT =====================
  initMapOnce = () => {
    if (this.map) return

    const el = document.getElementById('google-map')
    if (!el) return

    this.map = new window.google.maps.Map(el, {
      zoom: 10,
      center: { lat: 10.6387, lng: -61.3859 },
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
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

  updateMarkers = () => {
    if (!this.map) return

    const docs = compactArray(this.props.markers)

    // ADD / UPDATE
    docs.forEach((doc) => {
      if (!doc?.docnum || !doc.lat || !doc.lng) return

      if (!this.markersByDoc[doc.docnum]) {
        const marker = new window.google.maps.Marker({
          map: this.map,
          position: { lat: doc.lat, lng: doc.lng },
          draggable: doc.panelType === 'pickup' || doc.panelType === 'drop',
          icon: this.createMarkerIcon(
            '0',
            doc.VehicleColor,
            doc.panelType ? 'toplan' : ''
          ),
        })

        marker.markerData = doc

        marker.addListener('dragend', (e) => {
          this.onMarkerDragEnd(doc, e)
        })

        this.markersByDoc[doc.docnum] = marker
      }
    })

    // REMOVE
    Object.keys(this.markersByDoc).forEach((docnum) => {
      if (!docs.find((d) => d.docnum === docnum)) {
        this.markersByDoc[docnum].setMap(null)
        delete this.markersByDoc[docnum]
      }
    })
  }

  // ===================== POLYLINE =====================
  updateTripPolyline = () => {
    if (!this.map || !this.props.geoData?.length) return

    const tripDocs = this.props.geoData
      .filter((d) => d.seq > 0 && d.lat && d.lng)
      .sort((a, b) => a.seq - b.seq)

    if (tripDocs.length < 2) {
      this.directionsRenderer.setDirections({ routes: [] })
      return
    }

    const origin = {
      lat: tripDocs[0].lat,
      lng: tripDocs[0].lng,
    }

    const destination = {
      lat: tripDocs[tripDocs.length - 1].lat,
      lng: tripDocs[tripDocs.length - 1].lng,
    }

    const waypoints = tripDocs.slice(1, -1).map((d) => ({
      location: { lat: d.lat, lng: d.lng },
      stopover: true,
    }))

    this.directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(result)
        }
      }
    )
  }

  // ===================== DRAG =====================
  isCloseToMarker = (a, b, t = 0.001) =>
    Math.abs(a.lat - b.lat) < t && Math.abs(a.lng - b.lng) < t

  onMarkerDragEnd = (doc, e) => {
    const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() }

    for (let target of this.props.geoData || []) {
      if (
        target.lat &&
        target.lng &&
        this.isCloseToMarker(newPos, target)
      ) {
        this.props.ToPlan2TripDocuments &&
          this.props.ToPlan2TripDocuments(
            doc,
            target,
            this.props.selectedIndex
          )
        return
      }
    }
  }

  // ===================== FULLSCREEN =====================
  handleFS = () => {
    this.setState({ isFullScreen: !!document.fullscreenElement })
  }

  toggleFullscreen = () => {
    const el = document.getElementById('map-fullscreen-wrapper')
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen()
    else el.requestFullscreen()
  }

  // ===================== RENDER =====================
  render() {
    const { t } = this.props

    return (
      <React.Fragment>
        {/* ================= TOP / LIST / TABLE SECTION ================= */}
        {/* ⚠️ NO UI CHANGES HERE — uses existing layout & CSS */}
        <div className="routeMapOuter">
          <Row>
            <Col md="12">
              {/* Existing search, filters, table, list view */}
              {this.props.children}
            </Col>
          </Row>

          {/* ================= MAP / LIST TOGGLE ================= */}
          <Row className="mt-2">
            <Col md="12" className="text-right">
              <ButtonGroup>
                <Button
                  size="sm"
                  color={this.state.isMap ? 'primary' : 'secondary'}
                  onClick={() => this.setState({ isMap: true, isList: false })}
                >
                  {t('Map')}
                </Button>
                <Button
                  size="sm"
                  color={this.state.isList ? 'primary' : 'secondary'}
                  onClick={() => this.setState({ isMap: false, isList: true })}
                >
                  {t('List')}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>

          {/* ================= MAP VIEW ================= */}
          {this.state.isMap && (
            <Row className="mt-2">
              <Col md="12">
                <div
                  id="map-fullscreen-wrapper"
                  className={
                    this.state.isFullScreen
                      ? 'map-fullscreen'
                      : 'map-normal'
                  }
                >
                  <div
                    id="google-map"
                    style={{
                      width: '100%',
                      height: this.state.isFullScreen
                        ? '100vh'
                        : '500px',
                    }}
                  />

                  {/* FULLSCREEN BUTTON (existing behavior) */}
                  <Button
                    size="sm"
                    className="map-fullscreen-btn"
                    onClick={this.toggleFullscreen}
                  >
                    {this.state.isFullScreen
                      ? t('Exit Fullscreen')
                      : t('Fullscreen')}
                  </Button>
                </div>
              </Col>
            </Row>
          )}

          {/* ================= LIST VIEW ================= */}
          {this.state.isList && (
            <Row className="mt-2">
              <Col md="12">
                {/* Existing list view content stays untouched */}
              </Col>
            </Row>
          )}
        </div>

        {/* ================= MODALS / POPUPS (unchanged) ================= */}
        {this.state.addConfirmShow && (
          <Modal isOpen toggle={() => this.setState({ addConfirmShow: false })}>
            <ModalHeader toggle={() => this.setState({ addConfirmShow: false })}>
              {t('Confirmation')}
            </ModalHeader>
            <ModalBody>{this.state.confirmMessage}</ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => this.setState({ addConfirmShow: false })}
              >
                {t('OK')}
              </Button>
            </ModalFooter>
          </Modal>
        )}

        <ToastContainer />
      </React.Fragment>
    )
  }
}

// ===================== EXPORT =====================
export default withNamespaces()(RouteMap)
