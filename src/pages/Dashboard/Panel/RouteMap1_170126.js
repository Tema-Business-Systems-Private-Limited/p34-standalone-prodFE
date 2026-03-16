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
import { AlertCircle } from 'lucide-react'
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

/** ---------- Utilities ---------- */

/** Compacts an array by removing empty slots (holes), preserving defined values */
const compactArray = (arr) => {
  const a = Array.isArray(arr) ? arr : []
  return a.filter((_, i) => i in a)
}

function renumber_table(tableID) {
  $(tableID + ' tr').each(function () {
    let data = $(this).find('.type')[0]
    if (data) {
      let classCss
      if (data.innerText === 'PICK' || data.innerText === 'PREP EXP') {
        classCss = 'badge-primary'
      } else if (data.innerText === 'PRECEIPT' || data.innerText === 'ENLV') {
        classCss = 'badge-warning'
      } else {
        //LIV-->DLV
        classCss = 'badge-success'
      }
      const count = $(this).parent().children().index($(this)) + 1
      const innerHTML =
        `<span class='badge ${classCss}  text-uppercase'>` + count + '</span>'
      $(this).find('.priority').html(innerHTML)
    }
  })
}

const options = ['Document Message']
const ITEM_HEIGHT = 48

class RouteMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMap: true,
      isList: false,
      index: -1,
      docnum: '',
      addConfirmShow: false,
      confirmMessage: '',
      addProductShow: false,
      isFullScreen: false,
      isPanelOpen: false,
      products: [],
      docNumber: '',
      doctype: '',
      sortable: false,
      groData: this.props.geoData || [],
      vehicleCode: '',
      enableDocumnetMsgWindow: false,
      enableCarrierMsgWindow: false,
      selectedDocNumber: '',
      noteMessage: '',
      noteMessageflg: false,
      carrierMessage: '',
      instructionType: '',
      anchorEl: null,
    }
  }

  componentDidMount() {
    document.addEventListener("fullscreenchange", this.handleFS);
    this.updateMap()
    // Make diagnosis table sortable
    $('#diagnosis_list tbody').sortable({
      stop: function (e, ui) {
        const lock = ui.item[0].innerHTML
        if (lock.includes('unlock')) {
          renumber_table('#diagnosis_list')
        } else {
          $(this).sortable('cancel')
          $(ui.sender).sortable('cancel')
        }
      },
    })
  }

  componentWillUnmount() {
    document.removeEventListener("fullscreenchange", this.handleFS);
  }

  showMap = () => {
    this.setState({ isMap: true, isList: false })
  }

  showList = () => {
    this.setState({ isMap: false, isList: true })
  }

  customControl = (controlDiv, map) => {
    const controlUI = document.createElement('div')
    controlUI.style.backgroundColor = '#fff'
    controlUI.style.border = '2px solid #fff'
    controlUI.style.borderRadius = '2px'
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
    controlUI.style.cursor = 'pointer'
    controlUI.style.textAlign = 'center'
    controlUI.title = 'Click to recenter the map'
    controlDiv.appendChild(controlUI)

    const controlText = document.createElement('div')
    controlText.style.color = 'rgb(25,25,25)'
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
    controlText.style.fontWeight = 'bold'
    controlText.style.fontSize = '12px'
    controlText.style.lineHeight = '15px'
    controlText.style.paddingLeft = '2px'
    controlText.style.paddingRight = '2px'
    controlText.innerHTML = this.props.t('listview')
    controlUI.appendChild(controlText)

    controlUI.addEventListener('click', () => this.showList())
  }

  buildContent = (place) => {
    const url =
      `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESSDH/2//M/` +
      place.docnum
    return (
      <div id="content">
        <div id="siteNotice"></div>
        <div id="bodyContent">
          {place.docnum && <a href={url}>{place.docnum}</a>}
          {place.city}
        </div>
      </div>
    )
  }

  createCustomMarkerIcon = (baseColor, docnum) => {
    const docSeq =
      this.props.selectedTrip?.totalObject?.selectedTripData?.findIndex(
        (doc) => doc.docnum === docnum
      )
    let seq = 0
    if (docSeq !== -1) {
      seq = docSeq + 1
    } else {
      seq = -1
    }
    const canvas = document.createElement('canvas')
    canvas.width = 50
    canvas.height = 70
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.arc(30, 30, 20, 0, 2 * Math.PI)
    ctx.fillStyle = baseColor
    ctx.fill()

    ctx.lineWidth = 3
    ctx.strokeStyle = 'white'
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(30, 50)
    ctx.lineTo(20, 70)
    ctx.lineTo(40, 70)
    ctx.closePath()
    ctx.fillStyle = baseColor
    ctx.fill()

    ctx.font = 'bold 18px Arial'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(seq.toString(), 30, 30)

    return canvas.toDataURL()
  }

  createMarkerIcon = (text, tripId, color, type) => {
    if (type === 'toplan') {
      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#808080',
        fillOpacity: 1,
        strokeColor: '#000000',
        strokeWeight: 2,
        scale: 15,
      }
    }
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: color ? color : '#808080',
      fillOpacity: 1,
      strokeColor: '#000000',
      strokeWeight: 2,
      scale: 15,
    }
  }

  isCloseToMarker = (position1, position2, threshold = 0.001) => {
    return (
      Math.abs(position1.lat - position2.lat) < threshold &&
      Math.abs(position1.lng - position2.lng) < threshold
    )
  }

  // onMarkerDragEnd = (deliveryId, targetTripId) => {
  //   console.log('T222 after drag ', deliveryId)
  //   console.log('T222 after drag trip index ', this.props.selectedIndex)
  //   console.log('T222 after drag target object ', targetTripId)
  //   this.props.ToPlan2TripDocuments &&
  //     this.props.ToPlan2TripDocuments(
  //       deliveryId,
  //       targetTripId,
  //       this.props.selectedIndex
  //     )
  // }
  onMarkerDragEnd = (deliveryId, targetTripId) => {
    let userData = JSON.parse(localStorage.getItem('authUser'))
    console.log('T222 after drag ', deliveryId)
    console.log('T222 after drag trip index ', this.props.selectedIndex)
    console.log('T222 after drag target object ', targetTripId)
    let document = {
      ...deliveryId,
      generatedBy: userData.username,
      generatedFrom: 'Maps',
    }
    this.props.ToPlan2TripDocuments &&
      this.props.ToPlan2TripDocuments(
        // deliveryId,
        document,
        targetTripId,
        this.props.selectedIndex
      )
  }

  /** Group markers by rounded lat/lng to detect same-location points */
  groupMarkersByLocation(markers) {
    const grouped = {}
      ; (markers || []).forEach((m) => {
        if (!m || m.lat == null || m.lng == null) return
        const key = `${Number(m.lat).toFixed(6)}_${Number(m.lng).toFixed(6)}`
        if (!grouped[key]) grouped[key] = []
        grouped[key].push(m)
      })
    return Object.values(grouped)
  }

  updateMap = () => {
    console.log('T222 inside updateMap markers', this.props.markers)
    console.log('T222 inside updateMap sites', this.props.sites)

    const host = document.getElementById('google-map')
    if (!host) return
    host.innerHTML = ''

    let IsTripSelected = false
    let IsDeptAArrSameSite = false
    let vehicleColor = ''

    // --- compact markers and clone so we NEVER mutate props ---
    const denseMarkers = compactArray(this.props.markers)
    if (!denseMarkers.length) {
      const myLatlng1 = new window.google.maps.LatLng(
        10.638787592522007,
        -61.38596369893519
      )
      const mapOptions = { zoom: 10, center: myLatlng1, fullscreenControl: false }
      new window.google.maps.Map(host, mapOptions)
      return
    }

    const centerLocation = denseMarkers[0] // after compaction, index 0 is safe
    const mapOptions = {
      zoom: 10,
      center: { lat: centerLocation?.lat, lng: centerLocation?.lng },
      fullscreenControl: false
    }

    // Work on a local copy only
    let markerArray = denseMarkers.slice()

    if (this.props.selectedTrips && this.props.selectedTrips[0]) {
      IsTripSelected = true

      // vehicle color
      try {
        const myStr = this.props.selectedTrips[0].vehicleObject?.color || ''
        const subStr = myStr.match('background-color:(.*)')
        vehicleColor = subStr ? subStr[1] : ''
      } catch (e) {
        vehicleColor = ''
      }

      // prepend departure site
      if (this.props.selectedTrips[0].depSite) {
        const depId = this.props.selectedTrips[0].depSite
        if (Array.isArray(this.props.sites)) {
          const found = this.props.sites.find((site) => site.id === depId)
          if (found) {
            const depatureSite = {
              city: found.value,
              docnum: found.value,
              id: found.id,
              lat: found.lat,
              lng: found.lng,
              value: found.value,
            }
            //  markerArray.shift()
            markerArray.unshift(depatureSite)
          }
        }
      }

      // append arrival site
      if (this.props.selectedTrips[0].arrSite) {
        const arrId = this.props.selectedTrips[0].arrSite
        if (Array.isArray(this.props.sites)) {
          const found = this.props.sites.find((site) => site.id === arrId)
          if (found) {
            const arrivalSite = {
              city: found.value,
              docnum: found.value,
              idd: found.id,
              lat: found.lat,
              lng: found.lng,
              value: found.value,
              arrivalCheck: 'arrival',
            }
            markerArray.push(arrivalSite)
          }
        }
      }

      // same-site depart/arrive?
      const first = markerArray[0]
      const last = markerArray[markerArray.length - 1]
      if ((first?.id || first?.idd) && (last?.id || last?.idd)) {
        IsDeptAArrSameSite = first.id === last.id || first.idd === last.idd
      }
    }

    // Build the map
    // const map = new window.google.maps.Map(host, mapOptions)
    // const centerControlDiv = document.createElement('div')
    // this.customControl(centerControlDiv, map)
    // map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
    //   centerControlDiv
    // )

    // Build the map
    const map = new window.google.maps.Map(host, mapOptions)
    const centerControlDiv = document.createElement('div')
    this.customControl(centerControlDiv, map)
    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
      centerControlDiv
    )
    const fsBtnDiv = document.createElement("div");
    fsBtnDiv.style.background = "white";
    fsBtnDiv.style.padding = "6px 8px";
    fsBtnDiv.style.cursor = "pointer";
    fsBtnDiv.style.border = "1px solid #ccc";
    fsBtnDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    fsBtnDiv.innerText = "⛶"; // fullscreen icon
    fsBtnDiv.onclick = () => this.toggleFullscreen();

    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(fsBtnDiv);

    // ====== DRAW MARKERS ======
    const drawMarker = (place, labelText) => {
      let icon

      if (place?.id !== undefined || place?.idd !== undefined) {
        // sites
        icon = { url: '/assets/img/address.png' }
        if (place?.arrivalCheck === 'arrival') {
          icon = {
            url: IsDeptAArrSameSite
              ? '/assets/img/address.png'
              : '/assets/img/home36.png',
          }
        }
      } else if (place?.panelType === 'pickup' || place?.panelType === 'drop') {
        icon = this.createMarkerIcon(
          '0',
          place.tripcode,
          vehicleColor,
          'toplan'
        )
      } else if (place?.itemCode != null) {
        icon = this.createMarkerIcon(
          (place.seq || '').toString(),
          place.tripcode,
          vehicleColor
        )
      } else {
        icon = this.createMarkerIcon('0', place.tripcode, vehicleColor)
      }

      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        title: place.city || '',
        label: labelText
          ? {
            color:
              place?.panelType === 'pickup' || place?.panelType === 'drop'
                ? 'white'
                : 'black',
            fontSize: '20px',
            fontWeight: 'bold',
            text: String(labelText),
          }
          : undefined,
        icon,
        draggable: !!(
          place?.panelType === 'pickup' || place?.panelType === 'drop'
        ),
      })
      // Info window content (kept your per-doctype behavior)
      let url = ''
      let content = ''
      if (place?.doctype === 'PRECEIPT') {
        url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESXX10CPTH/2//M/${place.docnum}`
        content = `<div id='content'><div id='bodyContent'><a href="${url}" target="_blank">${place.docnum
          }</a></br>${place.bpname || ''}</br>${place.poscode || ''} - ${place.city || ''}</br> <b> Pallets </b> : ${parseFloat(place.mainCases) || ''} PAL</br></br> <b> Cases </b> : ${place.noofCases || ''} CS</br>
        </div></div>`
      } else if (place?.doctype === 'DLV') {
        url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESSDH/2//M/${place.docnum}`
        content = `<div id='content'><div id='bodyContent'><a href="${url}" target="_blank">${place.docnum
          }</a></br>${place.bpname || ''}</br>${place.poscode || ''} - ${place.city || ''}</br> <b> Pallets </b> : ${parseFloat(place.mainCases) || ''} PAL</br></br> <b> Cases </b> : ${place.noofCases || ''} CS</br>
          </div></div>`
      } else if (place?.doctype === 'PICK') {
        url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESPRH2/2//M/${place.docnum}`
        if (place.itemCode == null) {
          content = `<div id='content'><div id='bodyContent'><a href="${url}" target="_blank">${place.docnum
            }</a></br>${place.bpname || ''}</br>${place.poscode || ''} - ${place.city || ''}</br> <b> Pallets </b> : ${parseFloat(place.mainCases) || ''} PAL</br></br> <b> Cases </b> : ${place.noofCases || ''} CS</br>
            </div></div>`
        } else {
          content = `<div id='content'><div id='bodyContent'><a href="${url}" target="_blank">${place.docnum
            }</a></br>${place.bpname || ''}</br>${place.poscode || ''} - ${place.city || ''}</br> <b> Pallets </b> : ${parseFloat(place.mainCases) || ''} PAL
            </br></br> <b> Cases </b> : ${place.noofCases || ''} CS</br>
          </br> </br> <b>Vehicle </b>: ${place.vehicleCode || ''
            }</br> <b>TripCode : </b>${place.itemCode || ''}</div></div>`
        }
      } else if (place?.doctype === 'RETURN') {
        url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESSRH/2//M/${place.docnum}`
        content = `<div id='content'><div id='bodyContent'><a href="${url}" target="_blank">${place.docnum
          }</a></br>${place.bpname || ''}</br>${place.poscode || ''} - ${place.city || ''} </br> <b> Pallets </b> : ${parseFloat(place.mainCases) || ''} PAL</br></br> <b> Cases </b> : ${place.noofCases || ''} CS</br>
        </div></div>`
      } else if (place?.id || place?.idd) {
        const siteId = place.id || place.idd
        url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESFCY/2//M/${siteId}`
        content = `<div id='content'><div id='bodyContent'><a href="${url}" target="_blank">${siteId}</a>, ${place.docnum || ''
          }</div></div>`
      } else {
        content = `<div id='content'><div id='bodyContent'>${place.docnum || ''
          }</div></div>`
      }

      const infowindow = new window.google.maps.InfoWindow({ content })
      marker.setMap(map)
      marker.addListener('click', () => infowindow.open(map, marker))

      // drag end
      if (place?.panelType === 'pickup' || place?.panelType === 'drop') {
        marker.markerData = {
          id: place.docnum,
          city: place.city,
          tripcode: place.tripcode,
          initialPosition: { lat: place.lat, lng: place.lng },
          markerObject: place,
        }
        marker.addListener('dragend', (e) => {
          const newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() }
          for (let tripDelivery of markerArray) {
            const targetposition = {
              lat: tripDelivery.lat,
              lng: tripDelivery.lng,
            }
            if (this.isCloseToMarker(newPosition, targetposition)) {
              this.onMarkerDragEnd(marker.markerData.markerObject, tripDelivery)
              return
            }
          }
        })
      }
    }

    // When all trips selected: you previously drew all markers similarly.
    if (this.props.IsAllTripsSelected) {
      const grouped = this.groupMarkersByLocation(markerArray)
      let globalIndex = 0
      grouped.forEach((group) => {
        if (group.length === 1) {
          globalIndex += 1
          drawMarker(group[0], globalIndex.toString())
        } else {
          // For same-location points, show a single marker with group size label
          const representative = group[0]
          drawMarker(representative, String(group.length))
        }
      })

      // (kept) directions request object creation – not executed
      const waypoints = markerArray.map((place) => ({
        location: { lat: place.lat, lng: place.lng },
        stopover: true,
      }))
      const directionsWaypoints = waypoints.slice(1, -1).map((waypoint) => ({
        location: waypoint.location,
        stopover: true,
      }))
      const request = {
        origin: waypoints[0].location,
        destination: waypoints[waypoints.length - 1].location,
        waypoints: directionsWaypoints,
        travelMode: 'DRIVING',
      }
    }
    // Single trip selected
    else if (IsTripSelected) {
      let markerIndex = -1
      markerArray.forEach((place) => {
        markerIndex++
        drawMarker(place, markerIndex.toString())
      })

      const waypoints = markerArray.map((place) => ({
        location: { lat: place.lat, lng: place.lng },
        stopover: true,
      }))
      const directionsWaypoints = waypoints.slice(1, -1).map((waypoint) => ({
        location: waypoint.location,
        stopover: true,
      }))
      const request = {
        origin: waypoints[0].location,
        destination: waypoints[waypoints.length - 1].location,
        waypoints: directionsWaypoints,
        travelMode: 'DRIVING',
      }
    }
    // No trip selection
    else {
      markerArray.forEach((place) => {
        drawMarker(place, '0')
      })
    }

    this.props.updateMagChaged && this.props.updateMagChaged()
  }

  // Make sure your script tag allows importLibrary (v=weekly or v=beta).
  // Example loader URL:
  // https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&v=weekly&libraries=marker


  updateMap_old_working = () => {
    const g = window.google && window.google.maps;
    const el = document.getElementById('google-map');
    if (!g || !el) return;

    // reset container
    el.innerHTML = '';

    if (this.props.markers && this.props.markers.length > 0) {
      // --- Map center & options ---
      const centerLocation = this.props.markers[0];
      const mapOptions = {
        zoom: 10,
        center: { lat: centerLocation.lat, lng: centerLocation.lng },
      };
      const map = new g.Map(el, mapOptions);

      // Optional custom control (kept from your code)
      const centerControlDiv = document.createElement('div');
      if (this.customControl) {
        this.customControl(centerControlDiv, map);
        map.controls[g.ControlPosition.TOP_RIGHT].push(centerControlDiv);
      }

      // --- Build a working copy of markers (no prop mutation) ---
      let markerArray = [...this.props.markers];

      console.log("T222 before site assigngin markers are ", markerArray)

      if (this.props.selectedTrips && this.props.selectedTrips[0]) {
        // Handle departure
        if (this.props.selectedTrips[0].depSite) {
          let depatureSite = {};
          if (this.props.sites && this.props.sites.length > 0) {
            this.props.sites.forEach((site) => {
              if (site.id === this.props.selectedTrips[0].depSite) {
                depatureSite.city = site.value;
                depatureSite.docnum = site.value;
                depatureSite.id = site.id;
                depatureSite.lat = site.lat;
                depatureSite.lng = site.lng;
                depatureSite.value = site.value;
              }
            });
            // replace first with departure site
            //  markerArray = markerArray.slice(1);
            markerArray.unshift(depatureSite);
          }
        }

        // Handle arrival
        if (this.props.selectedTrips[0].arrSite) {
          let arrivalSite = {};
          (this.props.sites || []).forEach((site) => {
            if (site.id === this.props.selectedTrips[0].arrSite) {
              arrivalSite.city = site.value;
              arrivalSite.docnum = site.value;
              arrivalSite.idd = site.id;
              arrivalSite.lat = site.lat;
              arrivalSite.lng = site.lng;
              arrivalSite.value = site.value;
              arrivalSite.arrivalCheck = 'arrival';
            }
          });
          markerArray.push(arrivalSite);
        }
      }

      // --- Helpers / shared state ---
      let DepartureSite = '';
      let SiteCode = '';

      const chooseIconUrl = (place) => {
        if (place.id !== undefined) {
          return '/assets/img/address.png'; // departure
        }
        else if ((place.dlvystatus === "8" || place.dlvystatus === "0") && !place.lock) {
          return 'http://maps.google.com/mapfiles/ms/icons/grey.png';
        } else if (place.panelType && place.panelType === 'pickup') {
          return 'http://maps.google.com/mapfiles/ms/icons/blue.png';
        } else if (place.panelType && place.panelType === 'drop') {
          return 'http://maps.google.com/mapfiles/ms/icons/green.png';
        } else if (place.arrivalCheck === 'arrival') {
          // arrival icon depends on whether it's the same site as departure
          return (DepartureSite !== place.idd)
            ? '/assets/img/home36.png'
            : '/assets/img/address.png';
        }
        // default if needed
        return '/assets/img/address.png';
      };

      // Tweak these numbers to perfectly center the text in your assets.
      // For a ~36x36px pin, (18, 13) usually looks good.
      const iconFor = (url) => ({
        url,
        scaledSize: new g.Size(44, 44),
        labelOrigin: new g.Point(22, 15),
      });

      const numberFor = (place, idx) => {
        if (place.seq != null && place.seq !== '') return String(place.seq);
        if (place.tripno != null && place.tripno !== '') return String(place.tripno);
        return String(idx + 1); // fallback to index
      };

      const buildInfoContent = (place, siteCodeForLink) => {
        let url = '';
        let content = '';
        const base = process.env.REACT_APP_X3_URL_EXTERNAL;

        if (place.doctype == 'PRECEIPT') {
          url = `${base}/$sessions?f=GESXX10CPTH/2//M/` + place.docnum;
          if (place.tripno == 0)
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</div></div>';
          else
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</br>' +
              place.tripno +
              '-' +
              place.seq +
              '</br>' +
              place.vehicleCode +
              '</div></div>';
        } else if (place.doctype == 'DLV') {
          url = `${base}/$sessions?f=GESSDH/2//M/` + place.docnum;
          if (place.tripno == 0)
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</div></div>';
          else
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</br>' +
              place.tripno +
              '-' +
              place.seq +
              '</br>' +
              place.vehicleCode +
              '</div></div>';
        } else if (place.doctype == 'PICK') {
          url = `${base}/$sessions?f=GESPRH2/2//M/` + place.docnum;
          if (place.tripno == 0)
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</div></div>';
          else
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</br>' +
              place.tripno +
              '-' +
              place.seq +
              '</br>' +
              place.vehicleCode +
              '</div></div>';
        } else {
          url = `${base}/$sessions?f=GESFCY/2//M/` + place.docnum;
          content =
            "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
            url +
            " target='_blank'>" +
            siteCodeForLink +
            ',' +
            place.docnum +
            '</a></br>' +
            place.city +
            '</div></div>';
        }
        return content;
      };

      // --- Place markers ---
      markerArray.map((place, idx) => {
        // Preserve your state tracking for departure/arrival
        if (place.id !== undefined) {
          DepartureSite = place.id;
          SiteCode = place.id;
          place.docnum = place.value;
          place.city = place.value;
        } else if (place.arrivalCheck === 'arrival') {
          SiteCode = place.idd;
        }
        console.log("T222 data from maps place", place)
        const iconUrl = chooseIconUrl(place);
        const icon = iconFor(iconUrl);




        const isDeparture = (place.id !== undefined);
        const isArrival = (place.arrivalCheck === 'arrival');

        const label = (!isDeparture && !isArrival)
          ? {
            text: numberFor(place, idx),
            color: '#000000',   // black
            fontSize: '16px',   // bigger
            fontWeight: '900',  // bold
          }
          : undefined;

        const marker = new g.Marker({
          position: { lat: place.lat, lng: place.lng },
          title: place.city || place.value,
          icon,
          label,
          map,
        });

        const content = buildInfoContent(place, SiteCode);
        const infowindow = new g.InfoWindow({ content });
        marker.addListener('click', () => infowindow.open(map, marker));
      });

      this.props.updateMagChaged && this.props.updateMagChaged();
    } else {
      // fallback map when no markers
      const myLatlng1 = new g.LatLng(40.7749273842782, -74.03976111393493);
      const mapOptions = { zoom: 10, center: myLatlng1 };
      new g.Map(el, mapOptions);
    }
  };


  updateMap = () => {
    console.log("T222 inside updateMap markers", this.props.markers);
    console.log("T222 inside updateMap sites", this.props.sites);

    document.getElementById('google-map').innerHTML = "";
    let IsTripSelected = false;
    let IsDeptAArrSameSite = false;
    let StartSite = '';
    let EndSite = '';
    let vehicleColor = '';

    // console.log("T222 Marker at udpateMap");
    if (this.props.markers !== undefined && this.props.markers.length > 0) {
      var centerLocation = this.props?.markers[0];
      var mapOptions = {
        zoom: 10,
        center: {
          lat: centerLocation?.lat,
          lng: centerLocation?.lng
        },
        fullscreenControl: false
      }
      var markerArray;
      markerArray = this.props?.markers;
      // console.log("T222 Marker 1 - selected trip ", this.props.selectedTrips)
      if (this.props.selectedTrips && this.props.selectedTrips[0]) {
        IsTripSelected = true;
        // get the vehicle color from the list
        // console.log("Markers inside - selected trip ", this.props.selectedTrips[0])
        let myStr = this.props.selectedTrips[0].vehicleObject.color;
        let subStr = myStr.match("background-color:(.*)");
        vehicleColor = subStr[1];
        if (this.props.selectedTrips[0].depSite) {
          let depatureSite = {};



          if (this.props.sites && this.props.sites.length > 0) {
            this.props.sites.map((site) => {
              if (site.id === this.props.selectedTrips[0].depSite) {
                depatureSite.city = site.value;
                depatureSite.docnum = site.value;
                depatureSite.id = site.id;
                depatureSite.lat = site.lat;
                depatureSite.lng = site.lng;
                depatureSite.value = site.value;
              }
            });
            // markerArray.shift();
            markerArray.unshift(depatureSite);
          }
        }

        if (this.props.selectedTrips[0].arrSite) {
          let arrivalSite = {};
          this.props.sites.map((site) => {
            if (site.id === this.props.selectedTrips[0].arrSite) {
              arrivalSite.city = site.value;
              arrivalSite.docnum = site.value;
              arrivalSite.idd = site.id;
              arrivalSite.lat = site.lat;
              arrivalSite.lng = site.lng;
              arrivalSite.value = site.value;
              arrivalSite.arrivalCheck = "arrival";
            }
          });
          markerArray.push(arrivalSite);
        }

        if (StartSite === EndSite) {
          IsDeptAArrSameSite = true;
        }

      }
      console.log("T222  Marker Mnutiple selection-----", this.props.IsAllTripsSelected)
      if (this.props.IsAllTripsSelected) {

        console.log("T222  Marker Map 1-----")
        var map = new window.google.maps.Map(document.getElementById('google-map'), mapOptions);
        //  var directionsService = new window.google.maps.DirectionsService();
        //   var directionsDisplay = new window.google.maps.DirectionsRenderer({map: map, suppressMarkers: true, polylineOptions: { strokeColor: "#3848ca" } });
        //directionsDisplay.setMap(map);
        var DepartureSite = "";
        var SiteCode = "";
        const centerControlDiv = document.createElement("div");
        this.customControl(centerControlDiv, map);
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
        var polylinePath = [];
        let Aflg = '', Dflg = '';
        let labelIndex = -1;
        const labels = "123456789";
        //   let labelIndex = 0;
        var iconColor = {
          url: 'http://maps.google.com/mapfiles/ms/icons/green.png', // Use your own marker icon URL
          labelOrigin: new window.google.maps.Point(15, 10) // Position the label below the icon
        };
        let markerIndex = -1; // Marker index for numbering
        // console.log("Marker list of all", markerArray);
        // markerArray.map((place) => {
        //     // console.log("Marker inside update place", place);
        //     var marker = null;
        //     labelIndex++;
        //     var label = ''; // Label for marker numbering
        //     markerIndex++;
        //     label = markerIndex.toString(); // Set label as marker index
        //     // Increment marker index
        //     // console.log("Marker index", markerIndex);
        //     // console.log("Marker index label", label);
        //     if (place.id !== undefined || place.idd !== undefined) {



        //         if (IsDeptAArrSameSite === true) {
        //             // console.log("Marker index 1 ", place);
        //             if (markerIndex === 0) {
        //                 // console.log("Marker index 2 ", place);
        //                 marker = new window.google.maps.Marker({
        //                     position: { lat: place.lat, lng: place.lng },
        //                     icon: {
        //                         url: '/assets/img/address.png'
        //                     }

        //                 });
        //             }
        //             else {
        //                 // console.log("Marker index 3 ", place);
        //                 DepartureSite = place.id;
        //                 SiteCode = place.id;
        //                 place.docnum = place.value;
        //                 place.city = place.value;
        //                 label = 'S,E';
        //                 marker = new window.google.maps.Marker({
        //                     position: { lat: place.lat, lng: place.lng },
        //                     title: place.value,
        //                     icon: {
        //                         url: '/assets/img/address.png'
        //                     }

        //                 });

        //             }
        //         }
        //         else {

        //             DepartureSite = place.id;
        //             SiteCode = place.id;
        //             place.docnum = place.value;
        //             place.city = place.value;
        //             marker = new window.google.maps.Marker({
        //                 position: { lat: place.lat, lng: place.lng },
        //                 title: place.value,
        //                 //icon={createMarkerIcon(delivery.id.toString(), tripId)}



        //             });
        //         }
        //     } else {
        //         console.log("Marker inside All select before", place);

        //         if (place.itemCode != undefined) {

        //             console.log("Marker inside All select", place);
        //             let myStr1 = place.VehicleColor;
        //             let subStr1 = myStr1.match("background-color:(.*)");
        //             let vehicleColor1 = subStr1[1];
        //             marker = new window.google.maps.Marker({
        //                 position: { lat: place.lat, lng: place.lng },
        //                 title: place.city,
        //                 label: {
        //                     color: 'black', // Label color
        //                     fontSize: '20px', // Label font size
        //                     fontWeight: 'bold',
        //                     text: place.seq.toString(),
        //                 },
        //                 icon: this.createMarkerIcon(place.seq.toString(), place.tripcode, vehicleColor1),
        //             });

        //         }
        //         else {

        //             if (place.panelType && place.panelType === 'pickup') {
        //                 marker = new window.google.maps.Marker({
        //                     position: { lat: place.lat, lng: place.lng },
        //                     title: place.city,
        //                     draggable: true,
        //                     label: {
        //                         color: 'white', // Label color
        //                         fontSize: '20px', // Label font size
        //                         fontWeight: 'bold',
        //                         text: "0",
        //                     },
        //                     icon: this.createMarkerIcon("0", place.tripcode, "green", 'toplan'),

        //                 });

        //             }
        //             else if (place.panelType && place.panelType === 'drop') {


        //                 marker = new window.google.maps.Marker({
        //                     position: { lat: place.lat, lng: place.lng },
        //                     title: place.city,
        //                     draggable: true,
        //                     label: {
        //                         color: 'black', // Label color
        //                         fontSize: '20px', // Label font size
        //                         fontWeight: 'bold',
        //                         text: "0",
        //                     },
        //                     icon: this.createMarkerIcon("0", place.tripcode, vehicleColor, 'toplan'),

        //                 });

        //                 marker.markerData = {
        //                     id: place.docnum,
        //                     city: place.city,
        //                     tripcode: place.tripcode,
        //                     initialPosition: { lat: place.lat, lng: place.lng },
        //                     markerObject: place, // Save original position
        //                 };
        //             }
        //         }

        //     }

        //     var url = "";
        //     var content;
        //     if (place.doctype == 'PRECEIPT') {
        //         url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESXX10CPTH/2//M/` + place.docnum;
        //         if (place.tripno == 0)
        //             content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
        //         else
        //             content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br>" + place.tripno + "-" + place.seq + "</br>" + place.vehicleCode + "</br>" + place.itemCode + "</div></div>";

        //     } else if (place.doctype == 'DLV') {
        //         url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESSDH/2//M/` + place.docnum;
        //         if (place.tripno == 0)
        //             content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
        //         else
        //             content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br>" + place.tripno + "-" + place.seq + "</br>" + place.vehicleCode + "</br>" + place.itemCode + "</div></div>";

        //     } else if (place.doctype == 'PICK') {
        //         url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESPRH2/2//M/` + place.docnum;
        //         if (place.tripno == 0)
        //             content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
        //         else
        //             content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br> </br> <b>Vehicle </b>: " + place.vehicleCode + "</br> <b>TripCode : </b>" + place.itemCode + "</div></div>";

        //     } else {
        //         url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESFCY/2//M/` + `${place.id || place.idd}`;
        //         content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + `${place.id || place.idd}` + "," + place.docnum + "</div></div>";

        //     }
        //     var infowindow = new window.google.maps.InfoWindow({
        //         content: content
        //     });
        //     marker.setMap(map);
        //     marker.addListener('click', function () {
        //         infowindow.open(map, marker);
        //     });
        //     //  polylinePath.push({ lat: place.lat, lng: place.lng });


        //     // add drag end listhner
        //     marker.addListener('dragend', (e) => {
        //         console.log("T222 at dragend event", e);
        //         console.log("T222 at dragend marker", marker);
        //         const newPosition = {
        //             lat: e.latLng.lat(),
        //             lng: e.latLng.lng(),
        //         };

        //         // Loop through trips and check proximity to other markers
        //         console.log("T222 at dragable", markerArray)
        //         //for (const [tripId, trip] of Object.entries(markerArray)) {
        //         for (let tripDelivery of markerArray) {

        //             let targetposition = {
        //                 lat: tripDelivery.lat,
        //                 lng: tripDelivery.lng
        //             };
        //             if (this.isCloseToMarker(newPosition, targetposition)) {
        //                 this.onMarkerDragEnd(marker.markerData.markerObject, tripDelivery); // Adjusted to use `place.id`
        //                 // marker.setPosition(marker.markerDetails.initialPosition); // Reset to original position
        //                 return;
        //             }
        //         }
        //         // Optionally, update the marker's position in the state
        //         //marker.setPosition(newPosition); // Visually update the marker's position
        //     });


        //     //  polylinePath.push({ lat: place.lat, lng: place.lng });
        // });

        const groupedMarkers = this.groupMarkersByLocation(markerArray);

        groupedMarkers.forEach((group, idx) => {
          const representative = group[0];
          const docnums = group.map(m => m.docnum).filter(Boolean).join(', ');
          const cityNames = [...new Set(group.map(m => m.city))].join(', ');
          const markerTitle = `${docnums} (${cityNames})`;

          const marker = new window.google.maps.Marker({
            position: { lat: representative.lat, lng: representative.lng },
            title: markerTitle,
            label: {
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              text: group.length > 1 ? group.length.toString() : (idx + 1).toString(),
            },
            icon: this.createMarkerIcon("0", representative.tripcode, "blue"), // Customize icon if needed
          });

          const contentString = `
        <div>
            <strong>Documents:</strong><br/>
            ${docnums.split(', ').map(d => `<div>${d}</div>`).join('')}
        </div>
    `;

          const infowindow = new window.google.maps.InfoWindow({
            content: contentString
          });

          marker.setMap(map);
          marker.addListener('click', function () {
            infowindow.open(map, marker);
          });
        });





        // });
        // Code to calculate and display route using DirectionsService
        var waypoints = markerArray.map(place => ({
          location: { lat: place.lat, lng: place.lng },
          stopover: true

        }));

        var directionsWaypoints = waypoints.slice(1, -1).map(waypoint => ({
          location: waypoint.location,
          stopover: true
        }));

        var request = {
          origin: waypoints[0].location,
          destination: waypoints[waypoints.length - 1].location,
          waypoints: directionsWaypoints,
          travelMode: 'DRIVING'
        };




      }
      else if (IsTripSelected) {

        console.log("T222 else if  Marker Map 1-----")
        var map = new window.google.maps.Map(document.getElementById('google-map'), mapOptions);
                const fsBtn = document.createElement("div");
        fsBtn.style.background = "white";
        fsBtn.style.padding = "10px 14px";
        fsBtn.style.cursor = "pointer";
        fsBtn.style.border = "1px solid #ccc";
        fsBtn.style.borderRadius = "6px";
        fsBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        fsBtn.style.marginTop = "40px";        // move button DOWN
        fsBtn.style.marginRight = "10px";       // small right gap
        fsBtn.innerText = "⛶";
        fsBtn.title = "Toggle Fullscreen";
        // fsBtn.onmouseenter = () => (fsBtn.style.opacity = "0.85");
        // fsBtn.onmouseleave = () => (fsBtn.style.opacity = "1");
        fsBtn.onclick = () => this.toggleFullscreen();
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(fsBtn);
        //  var directionsService = new window.google.maps.DirectionsService();
        //   var directionsDisplay = new window.google.maps.DirectionsRenderer({map: map, suppressMarkers: true, polylineOptions: { strokeColor: "#3848ca" } });
        //directionsDisplay.setMap(map);
        var DepartureSite = "";
        var SiteCode = "";
        const centerControlDiv = document.createElement("div");
        this.customControl(centerControlDiv, map);
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
        var polylinePath = [];
        let Aflg = '', Dflg = '';
        let labelIndex = -1;
        const labels = "123456789";
        //   let labelIndex = 0;
        var iconColor = {
          url: 'http://maps.google.com/mapfiles/ms/icons/green.png', // Use your own marker icon URL
          labelOrigin: new window.google.maps.Point(15, 10) // Position the label below the icon
        };
        let markerIndex = -1; // Marker index for numbering
        console.log("Marker list of all", markerArray);
        let labelCounter = 1; // start at 1
        markerArray.map((place) => {
          let markerLabel;

          if (place.doctype) {
            markerLabel = labelCounter.toString();
            labelCounter++; // increment only when docnum is present
          }


          console.log("Marker inside update place", place);
          console.log("Marker inside update marker label", markerLabel);
          console.log("Marker inside update labelCounter", labelCounter);

          var marker = null;
          labelIndex++;
          var label = ''; // Label for marker numbering
          // label = markerIndex.toString(); // Set label as marker index
          label = markerLabel;
          markerIndex++;

          // Increment marker index
          // console.log("Marker index", markerIndex);
          // console.log("Marker index label", label);
          if (place.id !== undefined || place.idd !== undefined) {



            if (IsDeptAArrSameSite === true) {
              // console.log("Marker index 1 ", place);
              if (markerIndex === 0) {
                // console.log("Marker index 2 ", place);
                marker = new window.google.maps.Marker({
                  position: { lat: place.lat, lng: place.lng },
                  icon: {
                    url: '/assets/img/address.png'
                  }

                });
              }
              else {
                // console.log("Marker index 3 ", place);
                DepartureSite = place.id;
                SiteCode = place.id;
                place.docnum = place.value;
                place.city = place.value;
                label = 'S,E';
                marker = new window.google.maps.Marker({
                  position: { lat: place.lat, lng: place.lng },
                  title: place.value,
                  icon: {
                    url: '/assets/img/address.png'
                  }

                });

              }
            }
            else {

              DepartureSite = place.id;
              SiteCode = place.id;
              place.docnum = place.value;
              place.city = place.value;
              marker = new window.google.maps.Marker({
                position: { lat: place.lat, lng: place.lng },
                title: '8', //'place.value',
                //icon={createMarkerIcon(delivery.id.toString(), tripId)}



              });
            }
          } else {




            if (place.itemCode != undefined) {
              // console.log("Marker inside else place", place);
              marker = new window.google.maps.Marker({
                position: { lat: place.lat, lng: place.lng },
                title: place.city,
                label: {
                  color: 'black', // Label color
                  fontSize: '20px', // Label font size
                  fontWeight: 'bold',
                  text: markerLabel,
                },
                icon: this.createMarkerIcon(label.toString(), place.tripcode, vehicleColor),
                //                                    Icon : {
                //                                     url: "https://maps.google.com/mapfiles/ms/icons/blue.png", // url
                //                                        scaledSize: new window.google.maps.Size(50, 50),
                //                                        labelOrigin: new window.google.maps.Point(25, 18)
                //                                    }
              });

            }
            else {

              if (place.panelType && place.panelType === 'pickup') {
                marker = new window.google.maps.Marker({
                  position: { lat: place.lat, lng: place.lng },
                  title: place.city,
                  draggable: true,
                  label: {
                    color: 'white', // Label color
                    fontSize: '20px', // Label font size
                    fontWeight: 'bold',
                    text: "0",
                  },
                  icon: this.createMarkerIcon("0", place.tripcode, vehicleColor, 'toplan'),

                });

              } else if (place.panelType && place.panelType === 'drop') {


                marker = new window.google.maps.Marker({
                  position: { lat: place.lat, lng: place.lng },
                  title: place.city,
                  draggable: true,
                  label: {
                    color: 'black', // Label color
                    fontSize: '20px', // Label font size
                    fontWeight: 'bold',
                    text: "0",
                  },
                  icon: this.createMarkerIcon("0", place.tripcode, vehicleColor, 'toplan'),

                });

                marker.markerData = {
                  id: place.docnum,
                  city: place.city,

                  tripcode: place.tripcode,
                  initialPosition: { lat: place.lat, lng: place.lng },
                  markerObject: place, // Save original position

                };

              }
            }
          }

          var url = "";
          var content;
          if (place.doctype == 'PRECEIPT') {
            url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESXX10CPTH/2//M/` + place.docnum;
            if (place.tripno == 0)
              content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
            else
              content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br>" + place.tripno + "-" + place.seq + "</br>" + place.vehicleCode + "</br>" + place.itemCode + "</div></div>";

          } else if (place.doctype == 'DLV') {
            url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESSDH/2//M/` + place.docnum;
            if (place.tripno == 0)
              content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
            else
              content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br>" + place.tripno + "-" + place.seq + "</br>" + place.vehicleCode + "</br>" + place.itemCode + "</div></div>";

          } else if (place.doctype == 'PICK') {
            url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESPRH2/2//M/` + place.docnum;
            if (place.itemCode == undefined)
              content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + " </br> <b>Pallets </b>: " + (place.noofCases ?? 0) + "<b>PAL </b>" + "</br> <b>Cases : </b>" + (parseFloat(place.mainCases) ?? 0) + " <b>CS </b> " + "</div></div>";
            else
              content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + " </br> <b>Pallets </b>: " + (place.noofCases ?? 0) + " <b> PAL </b>" + "</br> <b>Cases : </b>" + (parseFloat(place.mainCases) ?? 0) + " <b>CS </b>" + "</br> </br> <b>Vehicle </b>: " + place.vehicleCode + "</br> <b>TripCode : </b>" + place.itemCode + "</div></div>";

          } else {
            url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESFCY/2//M/` + `${place.id || place.idd}`;
            content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + `${place.id || place.idd}` + "," + place.docnum + "</div></div>";

          }
          var infowindow = new window.google.maps.InfoWindow({
            content: content
          });
          marker?.setMap(map);
          marker?.addListener('click', function () {
            infowindow.open(map, marker);
          });



          // add drag end listhner
          marker?.addListener('dragend', (e) => {
            console.log("T222 at dragend event", e);
            console.log("T222 at dragend marker", marker);
            const newPosition = {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            };

            // Loop through trips and check proximity to other markers
            console.log("T222 at dragable", markerArray)
            //for (const [tripId, trip] of Object.entries(markerArray)) {
            for (let tripDelivery of markerArray) {

              let targetposition = {
                lat: tripDelivery.lat,
                lng: tripDelivery.lng
              };
              if (this.isCloseToMarker(newPosition, targetposition)) {
                this.onMarkerDragEnd(marker.markerData.markerObject, tripDelivery); // Adjusted to use `place.id`
                //  marker.setPosition(marker.markerDetails.initialPosition); // Reset to original position
                return;
              }
            }
            // Optionally, update the marker's position in the state
            //marker.setPosition(newPosition); // Visually update the marker's position
          });

          //    labelCounter ++;

          //  polylinePath.push({ lat: place.lat, lng: place.lng });
        });


        // Code to calculate and display route using DirectionsService
        var waypoints = markerArray.map(place => ({
          location: { lat: place.lat, lng: place.lng },
          stopover: true

        }));

        var directionsWaypoints = waypoints.slice(1, -1).map(waypoint => ({
          location: waypoint.location,
          stopover: true
        }));

        var request = {
          origin: waypoints[0].location,
          destination: waypoints[waypoints.length - 1].location,
          waypoints: directionsWaypoints,
          travelMode: 'DRIVING'
        };

        /*
                        directionsService.route(request, function (result, status) {
                            if (status == 'OK') {
                                directionsDisplay.setDirections(result);
                            }

                        });
        /*


                                /* Create an arrow polyline
                                var polyline = new window.google.maps.Polyline({
                                    path: polylinePath,
                                    geodesic: true,
                                    strokeColor: '#0000ff',
                                    strokeOpacity: 1.0,
                                    strokeWeight: 2,
                                    icons: [{
                                        icon: {
                                            path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                            scale: 3,
                                            strokeColor: '#FFFFFF',
                                                      fillColor: '#FFFFFF',
                                                      fillOpacity: 1.0,
                                                  },
                                                  offset: '0',
                                                  repeat: '100px'
                                    }]
                                });
                                polyline.setMap(map);
                                         */
      }
      else {
        var map = new window.google.maps.Map(document.getElementById('google-map'), mapOptions);
        var DepartureSite = "";
        var SiteCode = "";
        const centerControlDiv = document.createElement("div");
        this.customControl(centerControlDiv, map);
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
        markerArray.map((place) => {
          // console.log("asdfghjkl", place)
          var marker = null;
          let docStatusBadge = "";
          let deliveryno = "";
          let seq = 0;
          if (place?.id !== undefined) {
            DepartureSite = place.id;
            SiteCode = place.id;
            place.docnum = place.value;
            place.city = place.value;
            marker = new window.google.maps.Marker({
              position: { lat: place.lat, lng: place.lng },
              title: place.value,
              icon: {
                url: '/assets/img/address.png'
              }
            });
          } else if (place?.panelType && place.panelType === 'pickup') {

            marker = new window.google.maps.Marker({
              position: { lat: place.lat, lng: place.lng },
              title: place.city,
              label: {
                color: 'white', // Label color
                fontSize: '20px', // Label font size
                fontWeight: 'bold',
                text: "0",
              },
              icon: this.createMarkerIcon("0", place.tripcode, vehicleColor, 'toplan'),
              //                                    Icon : {
              //                                     url: "https://maps.google.com/mapfiles/ms/icons/blue.png", // url
              //                                        scaledSize: new window.google.maps.Size(50, 50),
              //                                        labelOrigin: new window.google.maps.Point(25, 18)
              //                                    }


            });


            //     docStatusBadge = this.displayMarkerStatus(place.docnum);
            //    seq = this.displayMarkerSeq(place.docnum);
            //     deliveryno = this.displayDeliverynumber(place.docnum);

            /*
                                 let customIcon = this.createCustomMarkerIcon('blue', place.docnum);

                                marker = new window.google.maps.Marker({
                                    position: { lat: place.lat, lng: place.lng },
                                    title: place.city,
                                    icon: {
                                        //url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                                        url: customIcon,
                                        scaledSize: new window.google.maps.Size(40, 40)
                                    }
                                });
                                */
          } else if (place?.panelType && place.panelType === 'drop') {


            marker = new window.google.maps.Marker({
              position: { lat: place.lat, lng: place.lng },
              title: place.city,
              label: {
                color: 'white', // Label color
                fontSize: '20px', // Label font size
                fontWeight: 'bold',
                text: "0",
              },
              icon: this.createMarkerIcon("0", place.tripcode, vehicleColor, 'toplan'),


              /*
                  // place.docnum = this.displayMarkerDetails(place.docnum);
                  docStatusBadge = this.displayMarkerStatus(place.docnum);
                  deliveryno = this.displayDeliverynumber(place.docnum);

                  const customIcon = this.createCustomMarkerIcon('green', place.docnum);

                  seq = this.displayMarkerSeq(place.docnum);
                  marker = new window.google.maps.Marker({
                      position: { lat: place.lat, lng: place.lng },
                      title: place.city,
                      icon: {
                        //  url: 'https://toppng.com/free-image/simple-location-map-pin-icon-drop-pin-icon-gree-PNG-free-PNG-Images_170465.png'

                                     url: customIcon,
                                    scaledSize: new window.google.maps.Size(40, 40) // Scale marker size



                      }
                      */
            });

          }
          else if (place?.arrivalCheck === "arrival") {
            var ArrIcon = '';
            SiteCode = place.idd;
            if (DepartureSite != place.idd) {
              ArrIcon = '/assets/img/home36.png';
            }
            else {
              ArrIcon = '/assets/img/address.png';
            }
            marker = new window.google.maps.Marker({
              position: { lat: place.lat, lng: place.lng },
              title: place.city,
              icon: {
                url: ArrIcon
              }
            });
          }
          /*else if (place.type === "arrival") {
                              var ArrIcon = '';
                               SiteCode = place.idd;
                              if(DepartureSite != place.idd){
                                 ArrIcon = '/assets/img/home36.png';
                              }
                              else{
                                 ArrIcon = '/assets/img/address.png';
                              }
                              marker = new window.google.maps.Marker({
                                  position: { lat: place.lat, lng: place.lng },
                                  title: place.city,
                                  icon: {
                                      url: ArrIcon
                                  }
                              });
                          }
                          */
          // const url = "http://125.18.84.158:8124/syracuse-main/html/main.html?url=/trans/x3/erp/DRYRUN/$sessions?f=GESSDH/2/M/" + place.docnum;
          var url = "";
          var content;
          if (place?.doctype == 'PRECEIPT') {
            url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESXX10CPTH/2//M/` + place.docnum;
            content = "<div id='content'><div id='siteNotice' style='position: absolute; padding-left: -5px'> " + seq + " </div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";

          }
          else if (place?.doctype == 'DLV') {
            url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESSDH/2//M/` + place.docnum;
            content = "<div id='content' style='position: relative'><div id='siteNotice' style='position: absolute; padding-left: -5px'> " + seq + " </div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";

          }
          else if (place?.doctype == 'PICK') {
            url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESPRH2/2//M/` + place.docnum;
            content = "<div id='content' style='position: relative'><div id='siteNotice' style='position: absolute; padding-left: -5px'> #" + seq + " </div><div id = 'bodyContent' style='padding-left : 20px'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + docStatusBadge + "</br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br>" + deliveryno + "</div></div>";

          }
          else if (place?.doctype == 'RETURN') {
            url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESSRH/2//M/` + place.docnum;
            content = "<div id='content' style='position: relative'><div id='siteNotice' style='position: absolute; padding-left: -5px'> " + seq + " </div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + docStatusBadge + "</br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";

          }
          else {
            url = `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESFCY/2//M/` + `${place.id || place.idd}`;
            content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + `${place.id || place.idd}` + "," + place?.docnum + "</div></div>";

          }
          var infowindow = new window.google.maps.InfoWindow({
            content: content
          });
          marker?.setMap(map);
          marker?.addListener('click', function () {
            infowindow.open(map, marker);
          });
        });

      }
      this.props.updateMagChaged();
    } else {
      var myLatlng1 = new window.google.maps.LatLng(10.638787592522007, -61.38596369893519);
      var mapOptions = {
        zoom: 10,
        center: myLatlng1
      }
      var map = new window.google.maps.Map(document.getElementById('google-map'), mapOptions);
    }
  }



  updateMap_working = () => {
    document.getElementById('google-map').innerHTML = ''
    if (this.props.markers !== undefined && this.props.markers.length > 0) {
      var centerLocation = this.props.markers[0]
      var mapOptions = {
        zoom: 10,
        center: {
          lat: centerLocation.lat,
          lng: centerLocation.lng,
        },
      }
      var markerArray
      markerArray = this.props.markers
      console.log('inside update place markersArray', markerArray)
      if (this.props.selectedTrips && this.props.selectedTrips[0]) {
        if (this.props.selectedTrips[0].depSite) {
          let depatureSite = {}
          if (this.props.sites && this.props.sites.length > 0) {
            this.props.sites.map((site) => {
              if (site.id === this.props.selectedTrips[0].depSite) {
                depatureSite.city = site.value
                depatureSite.docnum = site.value
                depatureSite.id = site.id
                depatureSite.lat = site.lat
                depatureSite.lng = site.lng
                depatureSite.value = site.value
              }
            })
            markerArray.shift()
            markerArray.unshift(depatureSite)
          }
        }
        if (this.props.selectedTrips[0].arrSite) {
          let arrivalSite = {}
          this.props.sites.map((site) => {
            if (site.id === this.props.selectedTrips[0].arrSite) {
              arrivalSite.city = site.value
              arrivalSite.docnum = site.value
              arrivalSite.idd = site.id
              arrivalSite.lat = site.lat
              arrivalSite.lng = site.lng
              arrivalSite.value = site.value
              arrivalSite.arrivalCheck = 'arrival'
            }
          })
          markerArray.push(arrivalSite)
        }
      }
      var map = new window.google.maps.Map(
        document.getElementById('google-map'),
        mapOptions
      )
      var DepartureSite = ''
      var SiteCode = ''
      const centerControlDiv = document.createElement('div')
      this.customControl(centerControlDiv, map)
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
        centerControlDiv
      )
      markerArray.map((place) => {
        console.log('inside update place', place)
        var marker = null
        if (place.id !== undefined) {
          DepartureSite = place.id
          SiteCode = place.id
          place.docnum = place.value
          place.city = place.value
          marker = new window.google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            title: place.value,
            icon: {
              url: '/assets/img/address.png',
            },
          })
        } else if (place.panelType && place.panelType === 'pickup') {
          marker = new window.google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            title: place.city,
            // label : place.tripno+" - ",
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            },
          })
        } else if (place.panelType && place.panelType === 'drop') {
          marker = new window.google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            title: place.city,
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            },
          })
        } else if (place.arrivalCheck === 'arrival') {
          var ArrIcon = ''
          SiteCode = place.idd
          if (DepartureSite != place.idd) {
            ArrIcon = '/assets/img/home36.png'
          } else {
            ArrIcon = '/assets/img/address.png'
          }
          marker = new window.google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            title: place.city,
            icon: {
              url: ArrIcon,
            },
          })
        }
        /*else if (place.type === "arrival") {
                                 var ArrIcon = '';
                                  SiteCode = place.idd;
                                 if(DepartureSite != place.idd){
                                    ArrIcon = '/assets/img/home36.png';
                                 }
                                 else{
                                    ArrIcon = '/assets/img/address.png';
                                 }
                                 marker = new window.google.maps.Marker({
                                     position: { lat: place.lat, lng: place.lng },
                                     title: place.city,
                                     icon: {
                                         url: ArrIcon
                                     }
                                 });
                             }
                             */
        // const url = "http://125.18.84.158:8124/syracuse-main/html/main.html?url=/trans/x3/erp/BURV12PRD_BPRPROD/$sessions?f=GESSDH/2/M
        var url = ''
        var content
        if (place.doctype == 'PRECEIPT') {
          url =
            `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESXX10CPTH/2//M/` +
            place.docnum
          if (place.tripno == 0)
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</div></div>'
          else
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</br>' +
              place.tripno +
              '-' +
              place.seq +
              '</br>' +
              place.vehicleCode +
              '</div></div>'
        } else if (place.doctype == 'DLV') {
          url =
            `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESSDH/2//M/` +
            place.docnum
          if (place.tripno == 0)
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</div></div>'
          else
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</br>' +
              place.tripno +
              '-' +
              place.seq +
              '</br>' +
              place.vehicleCode +
              '</div></div>'
        } else if (place.doctype == 'PICK') {
          url =
            `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESPRH2/2//M/` +
            place.docnum
          if (place.tripno == 0)
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</div></div>'
          else
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              place.docnum +
              '</a></br>' +
              place.bpname +
              '</br>' +
              place.poscode +
              ' - ' +
              place.city +
              '</br>' +
              place.tripno +
              '-' +
              place.seq +
              '</br>' +
              place.vehicleCode +
              '</div></div>'
        } else {
          url =
            `${process.env.REACT_APP_X3_URL_EXTERNAL}/$sessions?f=GESFCY/2//M/` +
            place.docnum
          content =
            "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
            url +
            " target='_blank'>" +
            SiteCode +
            ',' +
            place.docnum +
            '</a></br>' +
            place.city +
            '</div></div>'
        }

        var infowindow = new window.google.maps.InfoWindow({
          content: content,
        })
        marker.setMap(map)
        marker.addListener('click', function () {
          infowindow.open(map, marker)
        })
      })
      this.props.updateMagChaged()
    } else {
      var myLatlng1 = new window.google.maps.LatLng(
        40.7749273842782,
        -74.03976111393493
      )
      var mapOptions = {
        zoom: 10,
        center: myLatlng1,
      }
      var map = new window.google.maps.Map(
        document.getElementById('google-map'),
        mapOptions
      )
    }
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

  displayDeliverynumber = (docnum) => {
    let docDeliverno = ''
      ; (this.props.currDropsPanel?.drops || []).forEach((drop) => {
        if (drop.docnum == docnum) {
          docDeliverno = drop.deliveryNo
        }
      })
    return docDeliverno
  }

  displayMarkerStatus = (docnum) => {
    let docStatus = ''
      ; (this.props.currDropsPanel?.drops || []).forEach((drop) => {
        if (drop.docnum == docnum) {
          if (
            drop.type == 'open' &&
            (drop.dlvystatus == '0' || drop.dlvystatus == '8') &&
            !this.props.selectedDocuments.includes(docnum)
          ) {
            docStatus = `<span class='badge badge-warning text-uppercase'>${this.props.t(
              'ToPlan'
            )}</span>`
          } else if (
            drop.type == 'open' &&
            (drop.dlvystatus == '0' || drop.dlvystatus == '8') &&
            this.props.selectedDocuments.includes(docnum)
          ) {
            docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t(
              'Planned'
            )}</span>`
          } else if (drop.type == 'open' && drop.dlvystatus == '1') {
            docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t(
              'Planned'
            )}</span>`
          } else if (
            drop.type == 'Allocated' &&
            (drop.dlvystatus == '0' || drop.dlvystatus == '8') &&
            this.props.selectedDocuments.includes(docnum)
          ) {
            docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t(
              'Planned'
            )}</span>`
          } else if (
            drop.type == 'Allocated' &&
            (drop.dlvystatus == '0' || drop.dlvystatus == '8') &&
            !this.props.selectedDocuments.includes(docnum)
          ) {
            docStatus = `<span class='badge badge-warning text-uppercase'>${this.props.t(
              'To Plan'
            )}</span>`
          } else if (
            drop.type == 'selected' &&
            (drop.dlvystatus == '0' || drop.dlvystatus == '8')
          ) {
            docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t(
              'Planned'
            )}</span>`
          } else if (drop.dlvystatus == '1') {
            docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t(
              'Planned'
            )}</span>`
          } else if (drop.dlvystatus == '2') {
            docStatus = `<span class='badge badge-primary text-uppercase'>${this.props.t(
              'OntheWay'
            )}</span>`
          } else if (drop.dlvystatus == '3') {
            docStatus = `<span class='badge badge-warning text-uppercase'>${this.props.t(
              'InProgress'
            )}</span>`
          } else if (drop.dlvystatus == '4') {
            docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t(
              'Completed'
            )}</span>`
          } else if (drop.dlvystatus == '5') {
            docStatus = `<span class='badge badge-danger text-uppercase'>${this.props.t(
              'Skipped'
            )}</span>`
          } else if (drop.dlvystatus == '6') {
            docStatus = `<span class='badge badge-dark text-uppercase'>${this.props.t(
              'Rescheduled'
            )}</span>`
          } else if (drop.dlvystatus == '7') {
            docStatus = `<span class='badge badge-danger text-uppercase'>${this.props.t(
              'Canceled'
            )}</span>`
          }
        }
      })

    return (
      docStatus ||
      `<span class='badge badge-secondary text-uppercase'>${this.props.t(
        'Completed'
      )}</span>`
    )
  }

  displayMarkerSeq = (docnum) => {
    const docSeq =
      this.props.selectedTrip?.totalObject?.selectedTripData?.findIndex(
        (doc) => doc.docnum === docnum
      )
    if (docSeq !== -1) {
      return `<span class='badge badge-primary text-uppercase '>${docSeq + 1
        }</span>`
    }
    return -1
  }

  onConfirmClick = (index, docnum, vehicleCode) => {
    this.setState({
      addConfirmShow: true,
      confirmMessage: 'Are you sure you want to Delete?',
      index,
      docnum,
      vehicleCode,
    })
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

  handleFS = () => {
    const isFS = !!this.getFullscreenElement();
    this.setState({
      isFullScreen: isFS,
      isPanelOpen: isFS ? false : false,
    });
  };


  getFullscreenElement = () => {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  };

  enterFullscreen = () => {
    const wrapper = document.getElementById("map-fullscreen-wrapper");
    if (!wrapper) return;
    if (wrapper.requestFullscreen) wrapper.requestFullscreen();
    else if (wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
    else if (wrapper.mozRequestFullScreen) wrapper.mozRequestFullScreen();
    else if (wrapper.msRequestFullscreen) wrapper.msRequestFullscreen();
  };

  exitFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  };

  toggleFullscreen = () => {
    if (this.getFullscreenElement()) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }
  };

  onDetailList = () => {
    this.setState({ ShowDetailList: true, Datalist: this.props.geoData })
  }

  displayDocumentMessage = (docNum, msg) => {
    this.setState({
      enableDocumnetMsgWindow: true,
      selectedDocNumber: docNum,
      noteMessage: msg,
      anchorEl: null,
    })
  }

  displayCarrierMessage = (docNum, msg, type) => {
    this.setState({
      enableCarrierMsgWindow: true,
      instructionType: type,
      selectedDocNumber: docNum,
      carrierMessage: msg,
      anchorEl: null,
    })
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

  onConfirmNo = () => this.setState({ addConfirmShow: false })

  onConfirmYes = (index, docnum) => {
    let type
    if (this.state.confirmMessage.includes('Delete')) {
      type = 'Delete'
      this.props.onTripDelete &&
        this.props.onTripDelete(index, docnum, type, this.state.vehicleCode)
    } else {
      this.props.onTripDelete && this.props.onTripDelete(index, docnum)
    }
    this.setState({ addConfirmShow: false })
  }

  onDocClick = (product, docNum, doctype) => {
    this.setState({
      addProductShow: true,
      products: product,
      docNumber: docNum,
      doctype: doctype,
    })
  }

  getBgcolor(qtyflage) {
    return qtyflage === true ? '#feff99' : ''
  }

  onSaveNotes = (note) => {
    this.props.onDocMsg &&
      this.props.onDocMsg(this.state.selectedDocNumber, note, 'doc')
    this.setState({ enableDocumnetMsgWindow: false })
  }

  onSaveCarrierNotes = (note, type) => {
    if (type === 'carrier') {
      this.props.onDocMsg &&
        this.props.onDocMsg(this.state.selectedDocNumber, note, 'carrier')
    } else {
      this.props.onDocMsg &&
        this.props.onDocMsg(this.state.selectedDocNumber, note, 'loader')
    }
    this.setState({ enableCarrierMsgWindow: false })
  }

  handleClick = (event) => this.setState({ anchorEl: event.currentTarget })
  handleClose = () => this.setState({ anchorEl: null })

  handleItemHover = (marker) => {
    if (!marker) return;

    marker.setAnimation(window.google.maps.Animation.BOUNCE);

    const icon = marker.getIcon();
    if (icon && typeof icon === "object") {
      marker.setIcon({
        ...icon,
        scaledSize: new window.google.maps.Size(45, 45),  // bigger on hover
      });
    }
  };

  handleItemLeave = (marker) => {
    if (!marker) return;

    marker.setAnimation(null);

    const icon = marker.getIcon();
    if (icon && typeof icon === "object") {
      marker.setIcon({
        ...icon,
        scaledSize: new window.google.maps.Size(30, 30),  // normal
      });
    }
  };

  render() {
    console.log(
      'T222 inside addupdateTrip 1428',
      this.props.markers
    )
    const lang = localStorage.getItem('i18nextLng')

    // ✅ ADD HERE
      const trip = this.props.selectedTrips?.[0]

      const totals = (this.props.geoData || []).reduce(
        (acc, d) => {
          acc.cases += Number(d.mainCases || 0)
          acc.pallets += Number(d.noofCases || 0)
          acc.weight += Number(d.netweight || 0)
          acc.volume += Number(d.volume || 0)
          acc.count += 1
          return acc
        },
        { cases: 0, pallets: 0, weight: 0, volume: 0, count: 0 }
      )


    const addProductsClose = () => this.setState({ addProductShow: false })
    const Productlist_win_Close = () => this.setState({ ShowDetailList: false })
    const addNotesClose = () =>
      this.setState({ enableDocumnetMsgWindow: false })
    const addCarierNotesClose = () =>
      this.setState({ enableCarrierMsgWindow: false })
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    if (this.props.mapChanged) {
      this.updateMap()
    }

    const tableGeoData = compactArray(this.props.geoData)

    return (
      <div class="col-md-6 pt-0 pb-0 pr-0 pl-0 routeMapOuter">
        <div className="mapouter topsection">
          <div
            class="reportlist-view"
            style={{ display: this.state.isList ? 'block' : 'none' }}
          >
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              onClick={this.props.updateTimeLine}
            >
              {this.props.t('Updatebtn')}
            </button>
            &nbsp; &nbsp;
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              onClick={this.onDetailList}
            >
              {this.props.t('DetailList')}
            </button>
            &nbsp; &nbsp;
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              onClick={this.showMap}
            >
              {this.props.t('Map')}
            </button>
            <table class="table table-sm " id="diagnosis_list">
              <thead style={{ textAlign: 'left' }}>
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
                  {/* <th width="6%">{this.props.t('Site')}</th> */}
                  {/* <th>Address</th> */}

                  {/* <th width="6%">{this.props.t('Arrival')}</th>
                  <th width="6%">{this.props.t('Departure')}</th>
                  <th width="6%">Service Time</th>
                  <th width="6%">{this.props.t('WaitingTime')}</th> */}
                  <th width="0%" class="pairedDoc" style={{ display: 'none' }}>
                    {this.props.t('PairedDoc')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableGeoData.map((geoData, i) => {
                  const data = { ...geoData }
                  compactArray(this.props.markers).forEach((marker) => {
                    if (data.docnum === marker.docnum) {
                      data.lock = marker.lock
                    }
                  })
                  const totalQty = (data?.products || []).reduce(
                    (sum, item) => sum + (parseInt(item.quantity) || 0),
                    0
                  )
                  const uom =
                    data?.products && data.products[0] && data.products[0].uom
                      ? data.products[0].uom
                      : 'CS'

                  return (
                    <tr
                      key={i}
                      id={data.docnum}
                      style={{
                        backgroundColor: data.qtyflag
                          ? this.getBgcolor(data.qtyflag)
                          : '',
                      }}
                    >
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
                                      data.docnum,
                                      data.noteMessage
                                    )
                                  }
                                >
                                  Document Instructions
                                </MenuItem>
                                {data.doctype === 'DLV' ? (
                                  <MenuItem
                                    onClick={() =>
                                      this.displayCarrierMessage(
                                        data.docnum,
                                        data.CarrierMessage,
                                        'carrier'
                                      )
                                    }
                                  >
                                    Carrier Instructions
                                  </MenuItem>
                                ) : null}
                                {data.doctype === 'DLV' ||
                                  data.doctype === 'PICK' ? (
                                  <MenuItem
                                    onClick={() =>
                                      this.displayCarrierMessage(
                                        data.docnum,
                                        data.loaderMessage,
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

                      <td width="3%">
                        {data.lock ||
                          (this.props.trips &&
                            this.props.trips[0] &&
                            this.props.trips[0].lock) ? (
                          ''
                        ) : (
                          <button
                            class="btn btn-danger btn-sm rounded-0"
                            type="button"
                            title="Delete"
                            onClick={() =>
                              this.onConfirmClick(
                                i,
                                data.docnum,
                                data.vehicleCode
                              )
                            }
                            disabled={data.lock}
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        )}
                      </td>

                      <td width="3%">{this.displayBadge(data.doctype, i)}</td>
                      {/* <td width="6%" name="itemCode">
                        {data.vehicleCode}
                      </td> */}
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
                              data.products,
                              data.docnum,
                              data.doctype
                            )
                          }
                        >
                          {data.docnum}
                        </a>
                      </td>
                      <td width="6%">{data.bpcode}</td>
                      <td width="6%">{data.bpname}</td>
                      <td width="6%">
                        {data.poscode} {data.city}
                      </td>
                      <td width="6%">
                        {(parseFloat(data.noofCases)).toFixed(2)} PAL
                      </td>
                      <td width="6%">
                        {data?.mainCases ? parseFloat(data.mainCases) : 0} CS
                      </td>
                      <td width="6%">
                        {data.netweight} {data.weightunit}
                      </td>
                      <td width="6%">
                        {data.volume} {data.volume_unit}
                      </td>
                      <td width="6%">{this.displayPriority(data)}</td>
                      <td width="6%" class="type">
                        {data.routeColor
                          ? this.displayRouteTag(data, lang)
                          : this.displayRouteTypeDocBadge(
                            data.doctype,
                            data.pairedDoc
                          )}
                      </td>
                      <td>{this.displayDeliverableStatus(data.docnum)}</td>
                      {/* <td width="6%">{data.site}</td> */}


                      {/* <td width="6%">{data.adresname}</td> */}


                      {/* <td width="6%">{data.arrival && data.arrival}</td>
                      <td width="6%">{data.end && data.end}</td>
                      <td width="6%">
                        {data.serTime
                          ? data.serTime
                          : formatTime(convertHrToSec(data.serviceTime))}
                      </td>
                      <td width="6%">
                        {formatTime(convertHrToSec(data.waitingTime))}
                      </td> */}

                      <td
                        width="0%"
                        class="pairedDoc"
                        style={{ display: 'none' }}
                      >
                        {data.pairedDoc}
                      </td>
                      {data.lock ||
                        (this.props.trips &&
                          this.props.trips[0] &&
                          this.props.trips[0].lock) ? (
                        <td width="0%" class="lock" style={{ display: 'none' }}>
                          lock
                        </td>
                      ) : (
                        <td width="0%" class="lock" style={{ display: 'none' }}>
                          unlock
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div
            class="gmap_canvas"
            style={{ display: this.state.isMap ? 'block' : 'none', zIndex: 1 }}
          >
            {/* <div id="google-map" style={{ width: '100%', height: '100%' }} /> */}
            <div id="map-fullscreen-wrapper" style={{ width: "100%", height: "100%", position: "relative" }}>
              {this.state.isFullScreen && (
                <>
                  {/* SIDE PANEL */}
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: this.state.isPanelOpen ? "350px" : "0px",
                      height: "100vh",
                      background: "#d8dbde",
                      overflowY: "auto",
                      overflowX: "visible",
                      transition: "0.3s",
                      zIndex: 1000000,
                      boxShadow: this.state.isPanelOpen ? "2px 0 8px rgba(0,0,0,0.2)" : "none",
                    }}
                  >
                    {this.state.isPanelOpen && (

                      <div style={{ padding: 16 }}>

                        {/* ===== HEADER ===== */}
                      {/* ===== TRIP SUMMARY (NO CARD) ===== */}
                      <div
                        style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid #ccc",
                          marginBottom: "12px"
                        }}
                      >
                        {/* Trip & Vehicle */}
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            marginBottom: "6px"
                          }}
                        >
                          Trip : {trip?.itemCode || "-"} &nbsp;&nbsp;
                          Vehicle : {trip?.code || "-"}
                        </div>

                        {/* Metrics */}
                        <div
                           style={{
                             display: "grid",
                             gridTemplateColumns: "1fr 1fr",
                             rowGap: "6px",
                             columnGap: "20px"
                           }}
                         >
                           <div style={{ display: "flex", justifyContent: "space-between" }}>
                             <span>Weight</span>
                             <b>{totals.weight.toFixed(2)} KG</b>
                           </div>

                           <div style={{ display: "flex", justifyContent: "space-between" }}>
                             <span>Volume</span>
                             <b>{totals.volume.toFixed(2)} M3</b>
                           </div>

                           <div style={{ display: "flex", justifyContent: "space-between" }}>
                             <span>Cases</span>
                             <b>{totals.cases} CS</b>
                           </div>

                           <div style={{ display: "flex", justifyContent: "space-between" }}>
                             <span>Count</span>
                             <b>{totals.count} </b>
                           </div>
                         </div>

                        {/* Total
                     <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "8px",
                          fontWeight: 600
                        }}
                      >
                        <span>Total Count</span>
                        <span>{totals.count}</span>
                      </div>
                      */}
                      </div>


                        {/* ===== LIST ===== */}
                        <div
                          style={{
                            maxHeight: "calc(100vh - 220px)", // adjusts with screen
                            overflowY: "auto",
                            padding: "12px 16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px"
                          }}
                        >
                          {this.props.geoData.map((doc, i) => (
                            <div
                              key={doc.docnum}
                              style={{
                                position: "relative",              // ✅ needed for close button
                                background: "#ffffff",
                                borderRadius: "10px",
                                padding: "14px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                              }}
                            >
                              {/* ❌ CLOSE BUTTON */}
                              <div
                                onClick={() =>
                                  this.onConfirmClick(i, doc.docnum, doc.vehicleCode)
                                }
                                style={{
                                  position: "absolute",
                                  top: "8px",
                                  right: "8px",
                                  width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "16px",
                                  cursor: "pointer",
                                  color: "#666",
                                  background: "#f1f1f1",
                                  transition: "0.2s"
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#e74c3c";
                                  e.currentTarget.style.color = "#fff";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "#f1f1f1";
                                  e.currentTarget.style.color = "#666";
                                }}
                                title="Remove document"
                              >
                                ×
                              </div>

                              {/* DOC + CLIENT */}
                              <div style={{ fontWeight: 600, paddingRight: "24px" }}>
                                {doc.docnum}
                                <span style={{ color: "#555", marginLeft: "6px" }}>
                                  {doc.bpname}
                                </span>
                              </div>

                              {/* ADDRESS */}
                              <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                                {doc.adresname}, {doc.city}, {doc.postcode}
                              </div>

                              {/* COUNTS */}
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: "8px",
                                  fontSize: "12px"
                                }}
                              >
                                <span>Cases : <b>{Number(doc.mainCases || 0).toFixed(3)}</b></span>
                                <span>Pallets : <b>{Number(doc.noofCases || 0).toFixed(3)}</b></span>
                              </div>
                            </div>

                          ))}
                        </div>


                      </div>
                    )}
                  </div>

                  {/* COLLAPSE BUTTON */}
                  <div
                    onClick={() => this.setState({ isPanelOpen: !this.state.isPanelOpen })}
                    style={{
                      position: "fixed",
                      top: "50%",
                      left: this.state.isPanelOpen ? "350px" : "0px",
                      transform: "translateY(-50%)",
                      background: "white",
                      width: "28px",
                      height: "80px",
                      borderRadius: "0 8px 8px 0",
                      boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      zIndex: 1000001,
                      transition: "left 0.3s",
                    }}
                  >
                    {this.state.isPanelOpen ? "<" : ">"}
                  </div>
                </>
              )}

              <div id="google-map" style={{ width: "100%", height: "100%" }}></div>
            </div>
            <button className="toggle-button" onClick={this.toggleFullScreen}>
              {this.state.isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
            </button>
          </div>
        </div>

        <DeleteConfirm
          show={this.state.addConfirmShow}
          onHide={this.onConfirmNo}
          confirmDelete={this.onConfirmYes}
          index={this.state.index}
          docnum={this.state.docnum}
          confirmMessage={this.state.confirmMessage}
        />
        <DisplayProducts
          show={this.state.addProductShow}
          onHide={addProductsClose}
          products={this.state.products}
          docNum={this.state.docNumber}
          doctype={this.state.doctype}
        />
        <ProductsDetailList
          show={this.state.ShowDetailList}
          onHide={Productlist_win_Close}
          Datalist={this.state.Datalist}
          vehiclePanel={this.props.vehiclePanel}
        />
        <DisplayNotes
          show={this.state.enableDocumnetMsgWindow}
          onHide={addNotesClose}
          notes={this.state.noteMessage}
          onSaveNotes={this.onSaveNotes}
          displayEdit={true}
        />
        <DisplayCarrierNotes
          show={this.state.enableCarrierMsgWindow}
          onHide={addCarierNotesClose}
          notes={this.state.carrierMessage}
          type={this.state.instructionType}
          onSaveCarrierNotes={this.onSaveCarrierNotes}
          displayEdit={true}
        />
      </div>
    )
  }
}

export default withNamespaces()(RouteMap)
