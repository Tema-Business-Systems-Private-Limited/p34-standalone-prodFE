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
      isMapFullscreen: false,
      isPanelOpen: false,
      addConfirmShow: false,
      confirmMessage: '',
      showToPlanDocs : true,
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
      stagedAddDocs : [],
        stagedRemoveDocs: [],
      pendingDoc : null,
      isTripPanelOpen: false,

    }
  }



  // ===================== LIFECYCLE =====================
  componentDidMount() {
    document.addEventListener('fullscreenchange', this.handleFS)

   if(this.state.isMap) {
    this.initMapOnce()
    this.initDirectionsOnce()
    this.createSiteMarkers()
    this.updateMarkers()
    this.updateTripPolyline()
    }

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
       this.createSiteMarkers();
      this.updateTripPolyline()
    }

    if (prevProps.selectedTrips !== this.props.selectedTrips) {
      this.createSiteMarkers();
      this.updateTripPolyline();
    }
  }

  toggleTripPanel = () => {
    this.setState(prev => ({
      isTripPanelOpen: !prev.isTripPanelOpen
    }))
  }

getEffectiveTripDocs = () => {
  // base planned docs from backend
  const baseDocs = compactArray(this.props.geoData || [])
    .filter(d => d.seq > 0 && d.lat && d.lng)

  // staged additions (visual-only)
  const staged = this.state.stagedAddDocs.map(d => ({
    ...d,
    seq: Number.MAX_SAFE_INTEGER, // push to end temporarily
    __stagedAdd: true,
  }))

  return [...baseDocs, ...staged].sort((a, b) => a.seq - b.seq)
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

  attachInfoWindow = (marker, html) => {
    const info = new window.google.maps.InfoWindow({
      content: html,
    });

    marker.addListener('click', () => {
      info.open(this.map, marker);
    });
  };

updateMarkers = () => {
  if (!this.map) return

const SITE_ICON = '/assets/img/address.png';

const stagedAddIds = new Set(
    this.state.stagedAddDocs.map(d => d.docnum)
  )

  // ---------- CLEAN OLD MARKERS ----------
  Object.values(this.markersByDoc).forEach(m => m.setMap(null))
  this.markersByDoc = {}

  const allDocs = compactArray(this.props.markers || [])

  // ---------- SPLIT DOCS ----------
 // const plannedDocs = allDocs.filter(d => d.seq > 0)

  const plannedDocs = this.getEffectiveTripDocs()


 // const toPlanDocs  = allDocs.filter(d => !d.seq || d.seq === 0)

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

  // ---------- INFO WINDOW (SINGLE INSTANCE) ----------
  if (!this.infoWindow) {
    this.infoWindow = new window.google.maps.InfoWindow()
  }

  // ---------- CREATE DOC MARKERS ----------
  finalDocs.forEach(doc => {
    if (!doc.lat || !doc.lng || !doc.docnum) return

    //const isToPlan = !doc.seq || doc.seq === 0

    const isToPlan = !doc.seq || doc.seq === 0
    const isStagedAdd = stagedAddIds.has(doc.docnum)


    const marker = new window.google.maps.Marker({
      map: this.map,
      position: { lat: doc.lat, lng: doc.lng },
       draggable: isToPlan,
      label: {
        text: isStagedAdd ? 'P' : isToPlan ? '0' : String(doc.seq),
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
      },
     icon: {
       path: window.google.maps.SymbolPath.CIRCLE,
       scale: isStagedAdd ? 26 : isToPlan ? 20 : 24,
       fillColor: isStagedAdd
         ? '#f59e0b'     // 🟡 staged = amber
         : isToPlan
         ? '#9ca3af'     // gray
         : '#2563eb',    // planned
       fillOpacity: 1,
       strokeColor: isStagedAdd ? '#92400e' : '#000',
       strokeWeight: 2,
     }
    })

    // -------- DRAGGED LISTENER-----------

marker.addListener('dragstart', () => {
  marker.__originalPosition = marker.getPosition()
})

    // ---------- CLICK INFO ----------
    marker.addListener('click', () => {
      this.infoWindow.setContent(`
        <div style="min-width:220px">
          <b>${doc.bpname || 'Customer'}</b><br/>
          <b>Doc:</b> ${doc.docnum}<br/>
          <b>City:</b> ${doc.city || '-'}<br/>
          <b>Seq:</b> ${doc.seq || 0}<br/>
          <b>Status:</b> ${isStagedAdd ? 'Pending Add' : isToPlan ? 'To Plan' : 'Planned'}
        </div>
      `)
      this.infoWindow.open(this.map, marker)
    })

    this.markersByDoc[doc.docnum] = marker
  })

  // ---------- START / END SITES ----------
 // ---------- START / END SITES ----------
 const trip = this.props.selectedTrips?.[0]
 const sites = this.props.sites || []

 // remove old site markers
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

   // ===== SAME START & END =====
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
         scaledSize: new window.google.maps.Size(40, 40), // 🔥 adjust size here
         anchor: new window.google.maps.Point(20, 40),
       },
     })
   } else {
     // ===== START SITE =====
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

     // ===== END SITE =====
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


updateMarkers_old_working2 = () => {
  if (!this.map) return;

  const docs = compactArray(this.props.geoData || []);

  // ================= SITE MARKERS =================
  const { departure, arrival } = this.getTripSites();

  const sameSite = this.areSameLocation(departure, arrival);

  // REMOVE old site markers safely
  if (this.startMarker) {
    this.startMarker.setMap(null);
    this.startMarker = null;
  }
  if (this.endMarker) {
    this.endMarker.setMap(null);
    this.endMarker = null;
  }

  if (departure && sameSite) {
    // 🔥 SINGLE MARKER: START = END
    this.startMarker = new window.google.maps.Marker({
      map: this.map,
      position: departure,
      icon: this.createSiteIcon('both'),
      label: {
        text: 'S / E',
        color: '#fff',
        fontWeight: 'bold',
      },
      title: 'Start & End (Warehouse)',
    });

    this.attachInfoWindow(
      this.startMarker,
      `<b>Warehouse (Start & End)</b><br/>${departure.name}`
    );
  } else {
    // START
    if (departure) {
      this.startMarker = new window.google.maps.Marker({
        map: this.map,
        position: departure,
        icon: this.createSiteIcon('start'),
        label: {
          text: 'S',
          color: '#fff',
          fontWeight: 'bold',
        },
        title: 'Start Site',
      });

      this.attachInfoWindow(
        this.startMarker,
        `<b>Start (Warehouse)</b><br/>${departure.name}`
      );
    }

    // END
    if (arrival) {
      this.endMarker = new window.google.maps.Marker({
        map: this.map,
        position: arrival,
        icon: this.createSiteIcon('end'),
        label: {
          text: 'E',
          color: '#fff',
          fontWeight: 'bold',
        },
        title: 'End Site',
      });

      this.attachInfoWindow(
        this.endMarker,
        `<b>End (Warehouse)</b><br/>${arrival.name}`
      );
    }
  }
  // ================= DOCUMENT MARKERS =================
  docs.forEach((doc) => {
    if (!doc.docnum || !doc.lat || !doc.lng) return;

    const labelText = doc.seq > 0 ? String(doc.seq) : '0';

    if (!this.markersByDoc[doc.docnum]) {
      const marker = new window.google.maps.Marker({
        map: this.map,
        position: { lat: doc.lat, lng: doc.lng },
        draggable: doc.panelType === 'pickup' || doc.panelType === 'drop',
        icon: this.createMarkerIcon(
          labelText,
          doc.VehicleColor,
          doc.panelType
        ),
        label: {
          text: labelText,
          color: '#fff',
          fontWeight: 'bold',
        },
      });

      marker.markerData = doc;

      marker.addListener('dragend', (e) => {
        this.onMarkerDragEnd(doc, e);
      });

      this.attachInfoWindow(
        marker,
        `
        <b>${doc.bpname}</b><br/>
        Doc: ${doc.docnum}<br/>
        City: ${doc.city}<br/>
        Seq: ${doc.seq || 0}<br/>
        Weight: ${doc.netweight || 0} ${doc.weightunit || ''}
      `
      );

      this.markersByDoc[doc.docnum] = marker;
    }
  });

  // ================= REMOVE OLD MARKERS =================
  Object.keys(this.markersByDoc).forEach((docnum) => {
    if (!docs.find((d) => d.docnum === docnum)) {
      this.markersByDoc[docnum].setMap(null);
      delete this.markersByDoc[docnum];
    }
  });
};


  // ===================== POLYLINE =====================
  updateTripPolyline_old_withoutsites = () => {
    if (!this.map ||
!this.directionsService ||
    !this.directionsRenderer ||
     !this.props.geoData?.length) { return; }

    const tripDocs = this.props.geoData
      .filter((d) => Number(d.seq) > 0 && d.lat && d.lng)
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
        optimizeWaypoints: false,
      },
      (result, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(result)
        }
      }
    );
  };

updateTripPolyline = () => {
  // ---------- CLEAR WHEN NO TRIP ----------
  if (!this.props.selectedTrips || !this.props.selectedTrips[0]) {
    if (this.directionsRenderer) {
      this.directionsRenderer.setDirections({ routes: [] })
    }
    return
  }

  if (!this.map || !window.google || !window.google.maps) return

  if (!this.directionsService) {
    this.directionsService = new window.google.maps.DirectionsService()
  }

  if (!this.directionsRenderer) {
    this.directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true, // we already draw custom markers
      polylineOptions: {
        strokeColor: '#2563eb',
        strokeOpacity: 0.9,
        strokeWeight: 4,
      },
    })
    this.directionsRenderer.setMap(this.map)
  }

  // ---------- SITES ----------
  const trip = this.props.selectedTrips[0]
  const sites = this.props.sites || []

  const depSite = sites.find(s => s.id === trip.depSite)
  const arrSite = sites.find(s => s.id === trip.arrSite)

  // ---------- PLANNED DOCS ----------
  /*const tripDocs = compactArray(this.props.geoData || [])
    .filter(d => d.seq > 0 && d.lat && d.lng)
    .sort((a, b) => a.seq - b.seq)
    */

    const tripDocs = this.getEffectiveTripDocs()


  let points = []

  // START
  if (depSite) {
    points.push({ lat: depSite.lat, lng: depSite.lng })
  }

  // STOPS
  tripDocs.forEach(d => {
    points.push({ lat: d.lat, lng: d.lng })
  })

  // END (avoid duplicate if same as start)
  if (
    arrSite &&
    (!depSite ||
      depSite.lat !== arrSite.lat ||
      depSite.lng !== arrSite.lng)
  ) {
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

  // ---------- REQUEST REAL ROAD ROUTE ----------
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




  handleToPlanDrop = (doc, latLng) => {
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
      addConfirmShow: false,
    },
    () => {
      this.updateMarkers()
      this.updateTripPolyline()
    }
  )
}



  confirmAddYes = () => {
    const { pendingAdd } = this.state
    if (!pendingAdd) return

    const { doc } = pendingAdd

    // 🔥 Mark as staged (TEMP ONLY)
    doc.__stagedAdd = true

    this.setState(
      {
        addConfirmShow: false,
        pendingAdd: null,
      },
      () => {
        this.updateMarkers()
      }
    )
  }

confirmAddNo = () => {
  const { pendingDoc } = this.state

  if (pendingDoc && this.markersByDoc[pendingDoc.docnum]) {
    const marker = this.markersByDoc[pendingDoc.docnum]

    if (marker.__originalPosition) {
      marker.setPosition(marker.__originalPosition)
      delete marker.__originalPosition
    }
  }

  this.setState({
    addConfirmShow: false,
    pendingDoc: null,
  })
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

   if(this.map) {
      this.lastCenter = this.map.getCenter();
   }
    this.setState({ isMap: false, isList: true });
  };

 showMap = () => {
   this.setState({ isMap: true, isList: false }, () => {
     if (this.map) {
       // 🔥 CRITICAL
       window.google.maps.event.trigger(this.map, "resize");

       // Optional but recommended: re-center
       if (this.lastCenter) {
         this.map.setCenter(this.lastCenter);
       }
     }
   });
 };

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

  renderTripSummaryPanel = () => {
    const trip = this.props.selectedTrips?.[0]
    const { stagedAddDocs = [] } = this.state

    console.log("Trip information in RouteMap", trip)

    if (!trip) return null

    const effectiveDocs = this.getEffectiveTripDocs()
    const hasChanges = stagedAddDocs.length > 0

    return (
      <Card>
        <CardBody>

          <CardTitle>Trip Summary</CardTitle>
          <div><b>Trip:</b> {trip.tripcode}</div>
          <div><b>Vehicle:</b> {trip.vehiclecode || '-'}</div>
          <div><b>Driver:</b> {trip.driver || '-'}</div>

          <hr />

          <CardTitle>Route Stops</CardTitle>
          {effectiveDocs.map((d, i) => (
            <div key={d.docnum}>
              {d.__stagedAdd
                ? '🟡 P'
                : `🔵 ${i + 1}`
              } — {d.docnum}
            </div>
          ))}

          {hasChanges && (
            <>
              <hr />
              <CardTitle>Pending Changes</CardTitle>

              {stagedAddDocs.map(d => (
                <div key={d.docnum}>➕ {d.docnum}</div>
              ))}
            </>
          )}

        </CardBody>

        <div style={{ padding: '10px', textAlign: 'right' }}>
          <Button
            size="sm"
            color="secondary"
            disabled={!hasChanges}
            onClick={() =>
              this.setState({ stagedAddDocs: [] }, () => {
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
            onClick={() => toast.success('Trip confirmed (backend later)')}
          >
            Confirm Trip
          </Button>
        </div>
      </Card>
    )
  }


  // ===================== RENDER =====================
  render() {
    const { t } = this.props
console.log("selectedTrips[0]:", this.props.selectedTrips?.[0]);
console.log("sites:", this.props.sites);

console.log("Trip sites: 111", this.getTripSites());
    console.log("Site are", this.props.sites)
console.log(
  "Map div size:",
  document.getElementById("google-map")?.offsetWidth,
  document.getElementById("google-map")?.offsetHeight
);
    return (
      <React.Fragment>
        {/* ================= TOP / LIST / TABLE SECTION ================= */}
        {/* ⚠️ NO UI CHANGES HERE — uses existing layout & CSS */}
        <div class="col-md-6 pt-0 pb-0 pr-0 pl-0 routeMapOuter">
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
                  color={this.state.isMap ? 'primary' : 'secondary'}
                   onClick={this.showMap}
                >
                  {t('Map')}
                </Button>
                <Button
                  size="sm"
                  color={this.state.isList ? 'primary' : 'secondary'}

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
                  className={this.state.isMapFullscreen ? 'map-fullscreen' : 'map-normal'}
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
                      minWidth: '100%',
                      height: this.state.isFullScreen
                        ? '100vh'
                        : '500px',
                    }}
                  />

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
          {this.state.isList && (
            <Row className="mt-2">
              <Col md="12">
                {/* Existing list view content stays untouched */}
             <Row className="mt-2">
               <Col md="12">
                 <div
                   style={{
                     border: '1px solid #ddd',
                     borderRadius: 6,
                     overflow: 'hidden',
                     background: '#fff',
                   }}
                 >
                   {/* TABLE HEADER */}
                   <div
                     style={{
                       background: '#f8f9fa',
                       borderBottom: '1px solid #ddd',
                       padding: '8px 12px',
                       fontWeight: 600,
                     }}
                   >
                     Planned / To-Plan Documents
                   </div>

                   {/* SCROLLABLE TABLE */}
                   <div
                     style={{
                       maxHeight: '420px',     // ✅ fixed height
                       overflowY: 'auto',      // ✅ scroll when 80–100 rows
                     }}
                   >
                     <Table
                       size="sm"
                       striped
                       hover
                       responsive
                       style={{ marginBottom: 0 }}
                     >
                       <thead
                         style={{
                           position: 'sticky',
                           top: 0,
                           background: '#fff',
                           zIndex: 1,
                         }}
                       >
                         <tr>
                          <th></th>
                                          <th></th>
                                          <th width="3%" class="pl-2">
                                            {this.props.t('Seq')} #
                                          </th>
                                          {/* <th width="6%">{this.props.t('Vehicle')}</th> */}
                                          <th width="6%">Transaction</th>
                                          <th width="6%">Customer</th>
                                          <th width="6%">{this.props.t('Name')}</th>
                                          <th width="6%">City</th>
                                          <th width="6%">{this.props.t('Pallets')}</th>
                                          <th width="6%">{this.props.t('Cases')}</th>
                                          <th width="6%">{this.props.t('Weight')}</th>
                                          <th width="6%">{this.props.t('Volume')}</th>
                                          <th width="6%">Priority</th>
                                          <th width="6%">{this.props.t('Type')}</th>
                                          <th>Deliverable</th>
                         </tr>
                       </thead>

                       <tbody>
                         {(this.props.geoData || []).map((row, idx) => (
                           <tr
                             key={row.docnum || idx}
                             style={{
                               background:
                                 row.seq > 0 ? '#eef6ff' : 'transparent', // planned highlight
                             }}
                           >
                             <td>
                               <Input type="checkbox" />
                             </td>

                             <td>{row.tripcode || '-'}</td>

                             <td>
                               {row.seq > 0 ? (
                                 <span className="badge badge-primary">
                                   {row.seq}
                                 </span>
                               ) : (
                                 <span className="badge badge-secondary">0</span>
                               )}
                             </td>

                             <td>{row.vehiclecode || '-'}</td>

                             <td>
                               <span
                                 className={`badge ${
                                   row.status === 'OPEN'
                                     ? 'badge-info'
                                     : row.status === 'RETURNED'
                                     ? 'badge-success'
                                     : 'badge-secondary'
                                 }`}
                               >
                                 {row.status}
                               </span>
                             </td>

                             <td>{row.docnum}</td>

                             <td>{row.bpname}</td>

                             <td>{row.city}</td>

                             <td className="text-center">
                               {row.locked ? (
                                 <i className="fa fa-lock text-danger" />
                               ) : (
                                 <i className="fa fa-unlock text-success" />
                               )}
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </Table>
                   </div>
                 </div>
               </Col>
             </Row>

              </Col>
            </Row>
          )}
        </div>

        {/* ================= MODALS / POPUPS (unchanged) ================= */}
        {this.state.addConfirmShow && (
          <Modal
            isOpen={this.state.addConfirmShow}
            container={document.getElementById('map-fullscreen-wrapper')}
            backdrop="static"
            centered
          >
            <ModalHeader toggle={() => this.setState({ addConfirmShow: false })}>
              {t('Confirmation')}
            </ModalHeader>
            <ModalBody>{this.state.confirmMessage}</ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={this.confirmAddToTrip}>
              Yes
            </Button>
             <Button
               color="secondary"
               onClick={() => this.setState({ addConfirmShow: false, pendingDoc: null })}
             >
               No
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
