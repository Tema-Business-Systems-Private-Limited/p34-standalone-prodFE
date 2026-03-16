import React, { Component, createRef } from 'react'
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirm from './DeleteConfirm';
import DisplayProducts from './DisplayProducts';
import ProductsDetailList from './ProductsDetailList';
import { withNamespaces } from 'react-i18next';
import { convertHrToSec, formatTime } from '../converterFunctions/converterFunctions';
import DisplayNotes from './DisplayNotes';
import DisplayCarrierNotes from './DisplayCarrierNotes';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { AlertCircle } from 'lucide-react'
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import '../dashboard.scss';
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

const x3Url = process.env.REACT_APP_X3_URL;

function renumber_table(tableID) {
    $(tableID + " tr").each(function () {
        let data = $(this).find('.type')[0];
        if (data) {
            var classCss;
            if (data.innerText === 'PICK' || data.innerText === 'PREP EXP') {
                classCss = 'badge-primary'
            } else if (data.innerText === 'PRECEIPT' || data.innerText === 'ENLV') {
                classCss = 'badge-warning'

            } else {
                //LIV-->DLV
                classCss = 'badge-success'
            }
            var count = $(this).parent().children().index($(this)) + 1;
            var innerHTML = `<span class='badge ${classCss}  text-uppercase'>` + count + "</span>";
            $(this).find('.priority').html(innerHTML);
        }
    });
}

const options = [
    'Document Message'
];

const ITEM_HEIGHT = 48;

class RouteMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMap: true,
            isList: false,
            index: -1,
            docnum: '',
            addConfirmShow: false,
            confirmMessage: '',
            addProductShow: false,
            isFullScreen : false,
            products: [],
            docNumber: "",
            doctype: "",
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
            anchorEl: null
        }
    }

    componentDidMount() {
        this.updateMap();
        //Make diagnosis table sortable
        $("#diagnosis_list tbody").sortable({
            stop: function (e, ui) {
                let lock = ui.item[0].innerHTML;
                if (lock.includes('unlock')) {
                    renumber_table('#diagnosis_list')
                } else {
                    $(this).sortable('cancel');
                    $(ui.sender).sortable('cancel');
                }
            }
        });
    }

    showMap = () => {
        this.setState({
            isMap: true,
            isList: false
        });
    }

    showList = () => {
        this.setState({
            isMap: false,
            isList: true
        });
    }

    customControl = (controlDiv, map) => {
        const controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#fff";
        controlUI.style.border = "2px solid #fff";
        controlUI.style.borderRadius = "2px";
        controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        controlUI.style.cursor = "pointer";
        //controlUI.style.marginBottom = "22px";
        controlUI.style.textAlign = "center";
        controlUI.title = "Click to recenter the map";
        controlDiv.appendChild(controlUI);
        // Set CSS for the control interior.
        const controlText = document.createElement("div");
        controlText.style.color = "rgb(25,25,25)";
        controlText.style.fontFamily = "Roboto,Arial,sans-serif";
        controlText.style.fontWeight = "bold";
        controlText.style.fontSize = "12px";
        controlText.style.lineHeight = "15px";
        controlText.style.paddingLeft = "2px";
        controlText.style.paddingRight = "2px";
        controlText.innerHTML = this.props.t('listview');
        controlUI.appendChild(controlText);
        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener("click", () => {
            this.showList();
        });

    }

    buildContent = (place) => {
        // const url = "${process.env.REACT_APP_X3_URL}/$sessions?f=GESSDH/2/M/" + place.docnum;
        const url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESSDH/2//M/` + place.docnum;
        return (
            <div id="content">
                <div id="siteNotice"></div>
                <div id="bodyContent">
                    {place.docnum && <a href={url}>{place.docnum}</a>}
                    {place.city}
                </div>
            </div>
        );
    }


    createCustomMarkerIcon = (baseColor, docnum) =>  {


      const docSeq = this.props.selectedTrip?.totalObject?.selectedTripData?.findIndex((doc) => doc.docnum === docnum);
            let seq = 0;
            // Check if docSeq was found (not -1)
            if (docSeq !== -1) {
                seq = docSeq + 1;  // Return the index of the found document
            } else {
                seq = -1;  // Return -1 if no document with the given docnum is found
            }
        const canvas = document.createElement('canvas');
         canvas.width = 50;
            canvas.height = 70; // Taller to accommodate the pin shape
            const ctx = canvas.getContext('2d');
  ctx.beginPath();
    ctx.arc(30, 30, 20, 0, 2 * Math.PI); // Circle at the top
    ctx.fillStyle = baseColor; // Fill with the base color
    ctx.fill();

    // Add border to the circle
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.stroke();


  ctx.beginPath();
    ctx.moveTo(30, 50); // Top of the triangle (centered)
    ctx.lineTo(20, 70); // Bottom-left corner of the triangle
    ctx.lineTo(40, 70); // Bottom-right corner of the triangle
    ctx.closePath();
    ctx.fillStyle = baseColor; // Same color as the circle
    ctx.fill();


//    // Draw pointer
//    ctx.beginPath();
//    ctx.moveTo(30, 50); // Bottom of the circle
//    ctx.lineTo(20, 70); // Left point of the triangle
//    ctx.lineTo(40, 70); // Right point of the triangle
//    ctx.closePath();
//    ctx.fillStyle = baseColor; // Same color as the circle
//    ctx.fill();

    // Draw sequence number in the circle
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(seq.toString(), 30, 30);

        return canvas.toDataURL(); // Convert to Base64 image URL
    }



      createMarkerIcon = (text, tripId, color, type) => {


      if(type === 'toplan')
      {
       return {
                 path: window.google.maps.SymbolPath.CIRCLE,
                 fillColor: '#808080', // Gray for non-assigned
                 fillOpacity: 1,
                 strokeColor: '#000000',
                 strokeWeight: 2,
                 scale: 15,
               }
      }
      else {
        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: color ? color : '#808080', // Gray for non-assigned
          fillOpacity: 1,
          strokeColor: '#000000',
          strokeWeight: 2,
          scale: 15,
        }
        }
      }



      isCloseToMarker = (position1, position2, threshold = 0.001) => {
          console.log("T222 at isclosetomarket");
          console.log("T222 at position 1",position1 );
          console.log("T222 at position2", position2);
          return (
            Math.abs(position1.lat - position2.lat) < threshold &&
            Math.abs(position1.lng - position2.lng) < threshold
          );
        };


       onMarkerDragEnd = (deliveryId, targetTripId) => {

          console.log("T222 after drag ", deliveryId)
          console.log("T222 after drag target object ", targetTripId);
          this.props.ToPlan2TripDocuments(deliveryId, targetTripId);
//          const { individualDeliveries, trips } = this.state;
//          const draggedDelivery = individualDeliveries.find((d) => d.id === deliveryId);
//          if (draggedDelivery) {
//            const updatedTrips = {
//              ...trips,
//              [targetTripId]: {
//                ...trips[targetTripId],
//                deliveries: [...trips[targetTripId].deliveries, { ...draggedDelivery, tripId: targetTripId }],
//              },
//            };
//            const updatedIndividualDeliveries = individualDeliveries.filter((d) => d.id !== deliveryId);
//            this.setState({ trips: updatedTrips, individualDeliveries: updatedIndividualDeliveries });
//          }
        };



    updateMap = () => {
       // console.log("T222 inside updateMap")
        document.getElementById('google-map').innerHTML = "";
          let IsTripSelected = false;
                let IsDeptAArrSameSite = false;
                let StartSite = '';
                 let EndSite = '';
                 let vehicleColor = '';

        // console.log("T222 Marker at udpateMap");
        if (this.props.markers !== undefined && this.props.markers.length > 0) {
            var centerLocation = this.props.markers[0];
            var mapOptions = {
                zoom: 10,
                center: {
                    lat: centerLocation.lat,
                    lng: centerLocation.lng
                }
            }
            var markerArray;
            markerArray = this.props.markers;
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
                        markerArray.shift();
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

                  if(StartSite === EndSite) {
                                   IsDeptAArrSameSite = true;
                                }

            }
            console.log("T222  Marker Mnutiple selection-----", this.props.IsAllTripsSelected)
            if(this.props.IsAllTripsSelected)
            {

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
                                    let Aflg = '' , Dflg = '';
                                    let labelIndex = -1;
                                     const labels = "123456789";
                                                //   let labelIndex = 0;
                                    var iconColor = {
                                      url: 'http://maps.google.com/mapfiles/ms/icons/green.png', // Use your own marker icon URL
                                      labelOrigin: new window.google.maps.Point(15, 10) // Position the label below the icon
                                    };
                                    let markerIndex = -1; // Marker index for numbering
                                    // console.log("Marker list of all", markerArray);
                                    markerArray.map((place) => {
                                        // console.log("Marker inside update place", place);
                                        var marker = null;
                                       labelIndex++;
                                        var label = ''; // Label for marker numbering
                                         markerIndex++;
                                         label = markerIndex.toString(); // Set label as marker index
                                                            // Increment marker index
                          // console.log("Marker index", markerIndex);
                                            // console.log("Marker index label", label);
                        					if (place.id !== undefined || place.idd !== undefined) {



                                            if(IsDeptAArrSameSite === true) {
            // console.log("Marker index 1 ", place);
                                               if(markerIndex === 0) {
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
                                                title: place.value,
                                                 //icon={createMarkerIcon(delivery.id.toString(), tripId)}



                                            });
                                            }
                                        } else {
                                              console.log("Marker inside All select before", place);

                                              if(place.itemCode != undefined)
                                              {

                                             console.log("Marker inside All select", place);
                                            let myStr1 = place.VehicleColor;
                                             let subStr1 = myStr1.match("background-color:(.*)");
                                                                    let   vehicleColor1 = subStr1[1];
                                            marker = new window.google.maps.Marker({
                                                position: { lat: place.lat, lng: place.lng },
                                                title: place.city,
                                                label:  {
                                                color: 'black', // Label color
                                                                            fontSize: '20px', // Label font size
                                                                            fontWeight: 'bold',
                                                text : place.seq.toString(),
                                                },
                                                icon : this.createMarkerIcon(place.seq.toString(), place.tripcode, vehicleColor1),
                                            });

                                              }
                                              else {

                                                  if (place.panelType && place.panelType === 'pickup') {
                                                                           marker = new window.google.maps.Marker({
                                                                                                                                  position: { lat: place.lat, lng: place.lng },
                                                                                                                                  title: place.city,
                                                                                                                                  draggable: true,
                                                                                                                                  label:  {
                                                                                                                                  color: 'white', // Label color
                                                                                                                                                              fontSize: '20px', // Label font size
                                                                                                                                                              fontWeight: 'bold',
                                                                                                                                  text : "0",
                                                                                                                                  },
                                                                                                                                  icon : this.createMarkerIcon("0", place.tripcode, "green", 'toplan'),

                                                                                                                              });

                                                                                              }
                                                  else if(place.panelType && place.panelType === 'drop') {


                                                                                                    marker = new window.google.maps.Marker({
                                                                                                                                                      position: { lat: place.lat, lng: place.lng },
                                                                                                                                                      title: place.city,
                                                                                                                                                      draggable: true,
                                                                                                                                                      label:  {
                                                                                                                                                      color: 'black', // Label color
                                                                                                                                                                                  fontSize: '20px', // Label font size
                                                                                                                                                                                  fontWeight: 'bold',
                                                                                                                                                      text : "0",
                                                                                                                                                      },
                                                                                                                                                      icon : this.createMarkerIcon("0", place.tripcode, vehicleColor, 'toplan'),

                                                                                                      });

                                                                                                      marker.markerData = {
                                                                                                        id: place.docnum,
                                                                                                        city: place.city,
                                                                                                        tripcode: place.tripcode,
                                                                                                        initialPosition: { lat: place.lat, lng: place.lng },
                                                                                                        markerObject : place, // Save original position
                                                                                                      };
                                                                                                  }
                                              }

                                        }

                                        var url = "";
                                        var content;
                                        if (place.doctype == 'PRECEIPT') {
                                            url = {x3Url} + "/$sessions?f=GESXX10CPTH/2//M/" + place.docnum;
                                            if (place.tripno == 0)
                                                content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
                                            else
                                                content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br>" + place.tripno + "-" + place.seq + "</br>" + place.vehicleCode +  "</br>" + place.itemCode + "</div></div>";

                                        } else if (place.doctype == 'DLV') {
                                            url = {x3Url} + "/$sessions?f=GESSDH/2//M/" + place.docnum;
                                            if (place.tripno == 0)
                                                content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
                                            else
                                                content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br>" + place.tripno + "-" + place.seq + "</br>" + place.vehicleCode +  "</br>" + place.itemCode + "</div></div>";

                                        } else if (place.doctype == 'PICK') {
                                            url = {x3Url} + "/$sessions?f=GESPRH2/2//M/" + place.docnum;
                                            if (place.tripno == 0)
                                                content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
                                            else
                                                content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br> </br> <b>Vehicle </b>: " + place.vehicleCode +  "</br> <b>TripCode : </b>" + place.itemCode + "</div></div>";

                                        } else {
                                            url = {x3Url} + "/$sessions?f=GESFCY/2//M/" + place.docnum;
                                            content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + SiteCode + "," + place.docnum + "</a></br>" + place.city + "</div></div>";

                                        }
                                        var infowindow = new window.google.maps.InfoWindow({
                                            content: content
                                        });
                                        marker.setMap(map);
                                        marker.addListener('click', function() {
                                            infowindow.open(map, marker);
                                        });
                                        //  polylinePath.push({ lat: place.lat, lng: place.lng });


                                          // add drag end listhner
                                                                   marker.addListener('dragend', (e) => {
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

                                                                          let targetposition  = {
                                                                            lat : tripDelivery.lat,
                                                                            lng : tripDelivery.lng
                                                                          };
                                                                         if (this.isCloseToMarker(newPosition, targetposition)) {
                                                                           this.onMarkerDragEnd(marker.markerData.markerObject, tripDelivery); // Adjusted to use `place.id`
                                                                           // marker.setPosition(marker.markerDetails.initialPosition); // Reset to original position
                                                                           return;
                                                                         }
                                                                       }
                                                                     // Optionally, update the marker's position in the state
                                                                     //marker.setPosition(newPosition); // Visually update the marker's position
                                                                   });


                                                                   //  polylinePath.push({ lat: place.lat, lng: place.lng });
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
            else if(IsTripSelected) {

                         console.log("T222 else if  Marker Map 1-----")
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
                        let Aflg = '' , Dflg = '';
                        let labelIndex = -1;
                         const labels = "123456789";
                                    //   let labelIndex = 0;
                        var iconColor = {
                          url: 'http://maps.google.com/mapfiles/ms/icons/green.png', // Use your own marker icon URL
                          labelOrigin: new window.google.maps.Point(15, 10) // Position the label below the icon
                        };
                        let markerIndex = -1; // Marker index for numbering
                        // console.log("Marker list of all", markerArray);
                        markerArray.map((place) => {
                             console.log("Marker inside update place", place);
                            var marker = null;
                           labelIndex++;
                            var label = ''; // Label for marker numbering
                             markerIndex++;
                             label = markerIndex.toString(); // Set label as marker index
                                                // Increment marker index
              // console.log("Marker index", markerIndex);
                                // console.log("Marker index label", label);
            					if (place.id !== undefined || place.idd !== undefined) {



                                if(IsDeptAArrSameSite === true) {
// console.log("Marker index 1 ", place);
                                   if(markerIndex === 0) {
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
                                    title: place.value,
                                     //icon={createMarkerIcon(delivery.id.toString(), tripId)}



                                });
                                }
                            } else {




                                 if(place.itemCode != undefined)
                            {
                                // console.log("Marker inside else place", place);
                                marker = new window.google.maps.Marker({
                                    position: { lat: place.lat, lng: place.lng },
                                    title: place.city,
                                    label:  {
                                    color: 'black', // Label color
                                                                fontSize: '20px', // Label font size
                                                                fontWeight: 'bold',
                                    text : labelIndex.toString(),
                                    },
                                    icon : this.createMarkerIcon(label.toString(), place.tripcode, vehicleColor),
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
                                                                                    label:  {
                                                                                    color: 'white', // Label color
                                                                                                                fontSize: '20px', // Label font size
                                                                                                                fontWeight: 'bold',
                                                                                    text : "0",
                                                                                    },
                                                                                    icon : this.createMarkerIcon("0", place.tripcode, vehicleColor, 'toplan'),

                                                                                });

                                                } else if(place.panelType && place.panelType === 'drop') {


                                                  marker = new window.google.maps.Marker({
                                                                                                    position: { lat: place.lat, lng: place.lng },
                                                                                                    title: place.city,
                                                                                                    draggable: true,
                                                                                                    label:  {
                                                                                                    color: 'black', // Label color
                                                                                                                                fontSize: '20px', // Label font size
                                                                                                                                fontWeight: 'bold',
                                                                                                    text : "0",
                                                                                                    },
                                                                                                    icon : this.createMarkerIcon("0", place.tripcode, vehicleColor, 'toplan'),

                                                    });

                                                    marker.markerData = {
                                                      id: place.docnum,
                                                      city: place.city,

                                                      tripcode: place.tripcode,
                                                      initialPosition: { lat: place.lat, lng: place.lng },
                                                      markerObject : place, // Save original position

                                                    };

                                                }
                                }
                            }

                            var url = "";
                            var content;
                            if (place.doctype == 'PRECEIPT') {
                                url = {x3Url} + "/$sessions?f=GESXX10CPTH/2//M/" + place.docnum;
                                if (place.tripno == 0)
                                    content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
                                else
                                    content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br>" + place.tripno + "-" + place.seq + "</br>" + place.vehicleCode +  "</br>" + place.itemCode + "</div></div>";

                            } else if (place.doctype == 'DLV') {
                                url = {x3Url} + "/$sessions?f=GESSDH/2//M/" + place.docnum;
                                if (place.tripno == 0)
                                    content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
                                else
                                    content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br>" + place.tripno + "-" + place.seq + "</br>" + place.vehicleCode +  "</br>" + place.itemCode + "</div></div>";

                            } else if (place.doctype == 'PICK') {
                                url = {x3Url} + "/$sessions?f=GESPRH2/2//M/" + place.docnum;
                                if (place.itemCode == undefined)
                                    content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";
                                else
                                    content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br> </br> <b>Vehicle </b>: " + place.vehicleCode +  "</br> <b>TripCode : </b>" + place.itemCode + "</div></div>";

                            } else {
                                url = {x3Url} + "/$sessions?f=GESFCY/2//M/" + place.docnum;
                                content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + SiteCode + "," + place.docnum + "</a></br>" + place.city + "</div></div>";

                            }
                            var infowindow = new window.google.maps.InfoWindow({
                                content: content
                            });
                            marker.setMap(map);
                            marker.addListener('click', function() {
                                infowindow.open(map, marker);
                            });



                            // add drag end listhner
                            marker.addListener('dragend', (e) => {
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

                                   let targetposition  = {
                                     lat : tripDelivery.lat,
                                     lng : tripDelivery.lng
                                   };
                                  if (this.isCloseToMarker(newPosition, targetposition)) {
                                    this.onMarkerDragEnd(marker.markerData.markerObject, tripDelivery); // Adjusted to use `place.id`
                                   //  marker.setPosition(marker.markerDetails.initialPosition); // Reset to original position
                                    return;
                                  }
                                    else {
                                    window.alert("insdie else part")
                                  }
                                }
                              // Optionally, update the marker's position in the state
                              //marker.setPosition(newPosition); // Visually update the marker's position
                            });



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
                if (place.id !== undefined) {
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
                } else if (place.panelType && place.panelType === 'pickup') {

                  marker = new window.google.maps.Marker({
                                                    position: { lat: place.lat, lng: place.lng },
                                                    title: place.city,
                                                    label:  {
                                                    color: 'white', // Label color
                                                                                fontSize: '20px', // Label font size
                                                                                fontWeight: 'bold',
                                                    text : "0",
                                                    },
                                                    icon : this.createMarkerIcon("0", place.tripcode, vehicleColor, 'toplan'),
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
                } else if (place.panelType && place.panelType === 'drop') {


                  marker = new window.google.maps.Marker({
                                                                    position: { lat: place.lat, lng: place.lng },
                                                                    title: place.city,
                                                                    label:  {
                                                                    color: 'white', // Label color
                                                                                                fontSize: '20px', // Label font size
                                                                                                fontWeight: 'bold',
                                                                    text : "0",
                                                                    },
                                                                    icon : this.createMarkerIcon("0", place.tripcode, vehicleColor, 'toplan'),


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
                else if (place.arrivalCheck === "arrival") {
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
                if (place.doctype == 'PRECEIPT') {
                    url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESXX10CPTH/2//M/` + place.docnum;
                    content = "<div id='content'><div id='siteNotice' style='position: absolute; padding-left: -5px'> " + seq + " </div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";

                }
                else if (place.doctype == 'DLV') {
                    url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESSDH/2//M/` + place.docnum;
                    content = "<div id='content' style='position: relative'><div id='siteNotice' style='position: absolute; padding-left: -5px'> " + seq + " </div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";

                }
                else if (place.doctype == 'PICK') {
                    url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESPRH2/2//M/` + place.docnum;
                    content = "<div id='content' style='position: relative'><div id='siteNotice' style='position: absolute; padding-left: -5px'> #" + seq + " </div><div id = 'bodyContent' style='padding-left : 20px'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + docStatusBadge + "</br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</br>" + deliveryno + "</div></div>";

                }
                else if (place.doctype == 'RETURN') {
                    url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESSRH/2//M/` + place.docnum;
                    content = "<div id='content' style='position: relative'><div id='siteNotice' style='position: absolute; padding-left: -5px'> " + seq + " </div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + place.docnum + "</a></br>" + docStatusBadge + "</br>" + place.bpname + "</br>" + place.poscode + " - " + place.city + "</div></div>";

                }
                else {
                    url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESFCY/2//M/` + place.docnum;
                    content = "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" + url + " target='_blank'>" + SiteCode + "," + place.docnum + "</a></br>" + place.city + "</div></div>";

                }
                var infowindow = new window.google.maps.InfoWindow({
                    content: content
                });
                marker.setMap(map);
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            });

            }
            this.props.updateMagChaged();
        } else {
            var myLatlng1 = new window.google.maps.LatLng(18.030390, -63.044780);
            var mapOptions = {
                zoom: 10,
                center: myLatlng1
            }
            var map = new window.google.maps.Map(document.getElementById('google-map'), mapOptions);
        }
    }

    displayPriority = (drop) => {

        if (drop.priority === 10) {
            return (
                <h6>
                    <span class='badge badge-primary text-uppercase'>Normal</span>
                </h6>
            );
        } else if (drop.priority === 40) {
            return (
                <h6>
                    <span class='badge badge-success text-uppercase'>Urgent</span>
                </h6>
            );
        }
        else if (drop.priority === 80) {
            return (
                <h6>
                    <span class='badge badge-danger text-uppercase'>Critical</span>
                </h6>
            );
        }
        else {
            return (
                <h6>
                    <span class='badge badge-primary text-uppercase'>Normal</span>
                </h6>
            );

        }

    }


    displayDeliverynumber = (docnum) => {
        let docDeliverno = '';

        // Loop through drops and find matching docnum
        this.props.currDropsPanel.drops.forEach((drop) => {
            if (drop.docnum == docnum) {
                docDeliverno = drop.deliveryNo
            }
            else {

            }
        })
        return docDeliverno;
    }

    displayMarkerStatus = (docnum) => {
        let docStatus = '';

        // Loop through drops and find matching docnum
        this.props.currDropsPanel.drops.forEach((drop) => {
            if (drop.docnum == docnum) {
                // Based on the conditions, set the appropriate docStatus
                if (drop.type == 'open' && ((drop.dlvystatus == '0' || drop.dlvystatus == '8') && !this.props.selectedDocuments.includes(docnum))) {
                    docStatus = `<span class='badge badge-warning text-uppercase'>${this.props.t('ToPlan')}</span>`;
                } else if (drop.type == 'open' && ((drop.dlvystatus == '0' || drop.dlvystatus == '8') && this.props.selectedDocuments.includes(docnum))) {
                    docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t('Planned')}</span>`;
                } else if (drop.type == 'open' && drop.dlvystatus == '1') {
                    docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t('Planned')}</span>`;
                } else if (drop.type == 'Allocated' && (drop.dlvystatus == '0' || drop.dlvystatus == '8') && this.props.selectedDocuments.includes(docnum)) {
                    docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t('Planned')}</span>`;
                } else if (drop.type == 'Allocated' && (drop.dlvystatus == '0' || drop.dlvystatus == '8') && !this.props.selectedDocuments.includes(docnum)) {
                    docStatus = `<span class='badge badge-warning text-uppercase'>${this.props.t('To Plan')}</span>`;
                } else if (drop.type == 'selected' && (drop.dlvystatus == '0' || drop.dlvystatus == '8')) {
                    docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t('Planned')}</span>`;
                } else if (drop.dlvystatus == '1') {
                    docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t('Planned')}</span>`;
                } else if (drop.dlvystatus == '2') {
                    docStatus = `<span class='badge badge-primary text-uppercase'>${this.props.t('OntheWay')}</span>`;
                } else if (drop.dlvystatus == '3') {
                    docStatus = `<span class='badge badge-warning text-uppercase'>${this.props.t('InProgress')}</span>`;
                } else if (drop.dlvystatus == '4') {
                    docStatus = `<span class='badge badge-success text-uppercase'>${this.props.t('Completed')}</span>`;
                } else if (drop.dlvystatus == '5') {
                    docStatus = `<span class='badge badge-danger text-uppercase'>${this.props.t('Skipped')}</span>`;
                } else if (drop.dlvystatus == '6') {
                    docStatus = `<span class='badge badge-dark text-uppercase'>${this.props.t('Rescheduled')}</span>`;
                } else if (drop.dlvystatus == '7') {
                    docStatus = `<span class='badge badge-danger text-uppercase'>${this.props.t('Canceled')}</span>`;
                }
            }
        });

        return docStatus || `<span class='badge badge-secondary text-uppercase'>${this.props.t('Completed')}</span>`;
    }

    displayMarkerSeq = (docnum) => {
        // Find the index of the document in the selectedTrip array
        const docSeq = this.props.selectedTrip?.totalObject?.selectedTripData?.findIndex((doc) => doc.docnum === docnum);

        // Check if docSeq was found (not -1)
        if (docSeq !== -1) {
            return `<span class='badge badge-primary text-uppercase '>${docSeq + 1}</span>`;  // Return the index of the found document
        } else {
            return -1;  // Return -1 if no document with the given docnum is found
        }
    }





    onConfirmClick = (index, docnum, vehicleCode, data) => {
        // console.log("on document deletion", index, docnum, vehicleCode, data)
        this.setState({
            addConfirmShow: true,
            confirmMessage: 'Are you sure you want to Delete?',
            index: index,
            docnum: docnum,
            vehicleCode: vehicleCode
        })
    }

    displayDeliverableStatus = (docnum) => {
        // console.log("inside RouteMap - dropspanel", this.props.currDropsPanel);
        var matched = false;
        var status = '';
        this.props.currDropsPanel.drops.length > 0 && this.props.currDropsPanel.drops.map((drop) => {
            // console.log("inside RouteMap - 3- drop", drop);
            // console.log("inside RouteMap - 3- docnum", docnum);
            // console.log("inside RouteMap - 3- status", status);
            if (drop.docnum === docnum) {
                matched = true;
                if (drop.dlvflg === '1') {
                    status = "No";
                }
                else if (drop.dlvflg === '2' || drop.dlvflg === '3') {
                    status = "Yes";
                }
                else {
                    status = "NA"
                }
            }
        });
        // console.log("inside RouteMap - 3- final status", status);

        return (<h5>
            <td width="3%" ><span class='badge badge-success text-uppercase'>{status}</span></td>
        </h5>);

    }



    displayRouteTag = (drop, lang) => {
        // console.log("T888 language =", lang);
        // console.log("T888 drop =", drop);
        var myStr = drop.routeColor;
        var subStr = myStr.match("background-color:(.*)");
        var s = subStr[1];

        if (lang == 'eng') {

            return (
                <h6>
                    <span style={{ backgroundColor: s }} >{drop.routeTag}</span>
                </h6>
            );
        }
        else {
            return (
                <h6>
                    <span style={{ backgroundColor: s }} >{drop.routeTagFRA}</span>
                </h6>
            );
        }

    }


    displayRouteTypeDocBadge = (typDoc, pDropPairedDoc) => {
        const RouteMvt = typDoc;
        const dropPairedDoc = pDropPairedDoc
        if (RouteMvt == 'PICK') {
            return (
                <h5>
                    <td width="3%" ><span class='badge badge-primary text-uppercase'>{this.props.t('PICK')}</span></td>
                </h5>
            );
        }
        if (RouteMvt == 'DLV') {
            if (dropPairedDoc.length > 1) {
                return (
                    <h5>
                        <td width="3%"><span class='badge badge-info style="font-size:2rem'>{this.props.t('DLVEXCHANGE')}</span></td>
                    </h5>
                );
            }
            return (
                <h5>
                    <td width="3%" ><span class='badge badge-success style="font-size:2rem'>{this.props.t('DLV')}</span></td>
                </h5>
            );
        }
        if (RouteMvt == 'PRECEIPT') {
            return (
                <h5>
                    <td width="3%" ><span class='badge badge-danger text-uppercase'>{this.props.t('PRECEIPT')}</span></td>
                </h5>
            );
        }
        if (RouteMvt == 'RETURN') {
            return (
                <h5>
                    <td width="3%" ><span class='badge badge-danger text-uppercase'>{this.props.t('RETURN')}</span></td>
                </h5>
            );
        }
    }


    toggleFullScreen  = () => {

    }

    onDetailList = () => {
        this.setState({
            ShowDetailList: true,
            Datalist: this.props.geoData
        });
    }

    displayDocumentMessage = (docNum, msg) => {

        this.setState({
            enableDocumnetMsgWindow: true,

            selectedDocNumber: docNum,
            noteMessage: msg,
            anchorEl: null
        })
    }
    displayCarrierMessage = (docNum, msg, type) => {

        this.setState({
            enableCarrierMsgWindow: true,
            instructionType: type,
            selectedDocNumber: docNum,
            carrierMessage: msg,
            anchorEl: null
        })
    }

    displayBadge = (typeMvt, iSeq) => {
        const docmvt = typeMvt
        const Seq = iSeq + 1;
        if (docmvt == 'PICK') {
            return (
                <h5>
                    <td width="3%" class='priority'><span class='badge badge-primary text-uppercase'>{Seq}</span></td>
                </h5>
            );
        }
        if (docmvt == 'DLV') {
            return (
                <h5>
                    <td width="3%" class='priority'><span class='badge badge-success '>{Seq}</span></td>
                </h5>
            );
        }
        if (docmvt == 'PRECEIPT') {
            return (
                <h5>
                    <td width="3%" class='priority'><span class='badge badge-warning text-uppercase'>{Seq}</span></td>
                </h5>
            );
        }
        if (docmvt == 'RETURN') {
            return (
                <h5>
                    <td width="3%" class='priority'><span class='badge badge-warning text-uppercase'>{Seq}</span></td>
                </h5>
            );
        }
         if (docmvt == 'BREAK') {
                    return (
                        <h5>
                            <td width="3%" class='priority'><span class='badge badge-info text-uppercase'>{Seq}</span></td>
                        </h5>
                    );
                }
    }

    onConfirmNo = () => {
        this.setState({
            addConfirmShow: false
        })
    }

    onConfirmYes = (index, docnum) => {
        let type;
        // console.log("inside confirmyes", index, docnum);
        if (this.state.confirmMessage.includes("Delete")) {
            type = "Delete";
            // console.log("inside confirmyes if", index, docnum);
            this.props.onTripDelete(index, docnum, type, this.state.vehicleCode);
        } else {
            // console.log("inside confirmyes else", index, docnum);
            this.props.onTripDelete(index, docnum);
        }

        this.setState({
            addConfirmShow: false
        })
    }

    onDocClick = (product, docNum, doctype) => {
        const products = product;
        this.setState({
            addProductShow: true,
            products: products,
            docNumber: docNum,
            doctype: doctype
        });
    }

    getBgcolor(qtyflage) {

        if (qtyflage === true) {
            return '#feff99';
        }
        else {
            return '';
        }
    }

    onSaveNotes = (note) => {
        // console.log("inside onsavenotes");
        this.props.onDocMsg(this.state.selectedDocNumber, note, 'doc');
        this.setState({ enableDocumnetMsgWindow: false })
    }

    onSaveCarrierNotes = (note, type) => {
        // console.log("inside onsaveCarrierNotes");

        if (type === 'carrier') {
            this.props.onDocMsg(this.state.selectedDocNumber, note, 'carrier');
        }
        else {
            this.props.onDocMsg(this.state.selectedDocNumber, note, 'loader');
        }
        this.setState({ enableCarrierMsgWindow: false })
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        // console.log("T222 inside addupdateTrip", this.props.geoData);
        let lang = localStorage.getItem("i18nextLng");
        let addProductsClose = () => this.setState({ addProductShow: false });
        let Productlist_win_Close = () => this.setState({ ShowDetailList: false });
        let addNotesClose = () => this.setState({ enableDocumnetMsgWindow: false });
        let addCarierNotesClose = () => this.setState({ enableCarrierMsgWindow: false });
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        if (this.props.mapChanged) {
           // console.log("T222 inside mapchanged");
            this.updateMap();
        }

        return (

            <div class="col-md-6 pt-0 pb-0 pr-0 pl-0 routeMapOuter" >
                <div className="mapouter topsection">
                    <div class="reportlist-view" style={{ display: this.state.isList ? "block" : "none" }}>
                        <button type="button" class="btn btn-secondary btn-sm" onClick={this.props.updateTimeLine}>{this.props.t('Updatebtn')}</button>
                        &nbsp; &nbsp;
                        <button type="button" class="btn btn-secondary btn-sm" onClick={this.onDetailList}>{this.props.t('DetailList')}</button>
                        &nbsp; &nbsp;
                        <button type="button" class="btn btn-secondary btn-sm" onClick={this.showMap}>{this.props.t('Map')}</button>

                        {/* <table class="table" id="diagnosis_list"> */}
                        <table class="table table-sm " id="diagnosis_list">
                            <thead style={{ textAlign: 'left' }}>
                                <tr>
                                    <th></th>
                                    <th width="3%" class="pl-2">{this.props.t('Seq')} #</th>
                                    <th width="6%">{this.props.t('Vehicle')}</th>
                                    <th width="6%">Document #</th>
                                    <th width="6%">{this.props.t('Type')}</th>
                                    <th width="6%">{this.props.t('Site')}</th>
                                    <th width="6%">Priority</th>
                                    <th width="6%">Client Code</th>
                                    <th>Address</th>
                                    <th width="6%">{this.props.t('Client')}</th>
                                    <th width="6%">Postal City</th>
                                    <th width="6%">{this.props.t('Weight')}</th>
                                    <th width="6%">{this.props.t('Volume')}</th>
                                    <th width="6%">{this.props.t('Arrival')}</th>
                                    <th width="6%">{this.props.t('Departure')}</th>
                                    <th width="6%">Service Time</th>
                                    <th width="6%">{this.props.t('WaitingTime')}</th>
                                    <th >Deliverable</th>
                                    <th width="0%" class="pairedDoc" style={{ display: 'none' }}>{this.props.t('PairedDoc')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(this.props.geoData && this.props.geoData || []).map((geoData, i) => {
                                    let data = geoData;
                                    this.props.markers.map((marker, index) => {
                                        if (data.docnum === marker.docnum) {
                                            data.lock = marker.lock;
                                        }
                                    })
                                    return (
                                        <tr key={i} id={data.docnum}
                                            style={{ backgroundColor: data.qtyflag ? this.getBgcolor(data.qtyflag) : '' }}
                                        >
                                            <td>
                                                <PopupState variant="popover" popupId="demo-popup-menu"
                                                >
                                                    {(popupState) => (
                                                        <React.Fragment>
                                                            <IconButton size="small">
                                                                <MoreVertIcon
                                                                    variant="contained"
                                                                    {...bindTrigger(popupState)}
                                                                ></MoreVertIcon>
                                                            </IconButton>
                                                            <Menu
                                                                {...bindMenu(popupState)}

                                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                            >
                                                                <MenuItem onClick={() => this.displayDocumentMessage(data.docnum, data.noteMessage)}>Document Instructions</MenuItem>
                                                                {data.doctype && data.doctype === 'DLV' ?
                                                                    <MenuItem onClick={() => this.displayCarrierMessage(data.docnum, data.CarrierMessage, 'carrier')}>Carrier Instructions</MenuItem>
                                                                    : ''}
                                                                {data.doctype && data.doctype === 'DLV' || data.doctype === 'PICK' ?
                                                                    <MenuItem onClick={() => this.displayCarrierMessage(data.docnum, data.loaderMessage, 'loader')}>Loader Instructions</MenuItem>
                                                                    : ''}
                                                            </Menu>
                                                        </React.Fragment>
                                                    )}
                                                </PopupState>

                                            </td>
                                            <td width="3%">{this.displayBadge(data.doctype, i)}</td>
                                            <td width="6%" name="itemCode">{data.vehicleCode}</td>
                                           <td width="6%" name="docNum" class="docnum">
                                             {data.doctype === 'BREAK' ? (
                                               data.docnum
                                             ) : (
                                               <a
                                                 href="#"
                                                 onClick={() => this.onDocClick(data.products, data.docnum, data.doctype)}
                                               >
                                                 {data.docnum}
                                               </a>
                                             )}
                                           </td>
                                            <td width="6%" class="type" >
                                                {data.routeColor ? this.displayRouteTag(data, lang)
                                                    : this.displayRouteTypeDocBadge(data.doctype, data.pairedDoc)}
                                            </td>
                                            <td width="6%">{data.site}</td>
                                            <td width="6%">{this.displayPriority(data)}</td>
                                            <td width="6%">{data.bpcode}</td>
                                            <td width="6%">{data.adresname}</td>
                                            <td width="6%">{data.bpname}</td>
                                            <td width="6%">{data.poscode} , {data.city}</td>
                                            <td width="6%">{data.netweight} {data.weightunit}</td>
                                            <td width="6%">{data.volume} {data.volume_unit}</td>
                                            <td width="6%">{data.arrival && data.arrival}</td>
                                            <td width="6%">{data.end && data.end}</td>
                                            <td width="6%">{formatTime(convertHrToSec(data.serviceTime))}</td>
                                            <td width="6%">{formatTime(convertHrToSec(data.waitingTime))}</td>
                                            <td>{this.displayDeliverableStatus(data.docnum)}</td>
                                            <td width="3%">
                                                {data.lock || (this.props.trips && this.props.trips[0] && this.props.trips[0].lock) ? '' :
                                                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"
                                                        onClick={() => this.onConfirmClick(i, data.docnum, data.vehicleCode, data)} disabled={data.lock || data.doctype === "BREAK"}>
                                                        <i class="fa fa-trash"></i>
                                                    </button>}
                                            </td>
                                            <td width="0%" class="pairedDoc" style={{ display: 'none' }}>{data.pairedDoc}</td>
                                            {(data.lock || (this.props.trips && this.props.trips[0] && this.props.trips[0].lock)) ? <td width="0%" class="lock" style={{ display: 'none' }}>lock</td> :
                                                <td width="0%" class="lock" style={{ display: 'none' }}>unlock</td>}
                                            {/* <td width="0%" class="lock" style={{ display: 'none' }}>
                                                {data.lock}
                                            </td> */}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div class="gmap_canvas" style={{ display: this.state.isMap ? "block" : "none", zIndex: 1 }}>

                        <div
                            id="google-map"
                            style={{ width: '100%', height: '100%' }}
                        />
                        <button className="toggle-button" onClick={this.toggleFullScreen}>
                               {this.state.isFullScreen ? "Exit Full Screen" : "Full Screen"}
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
                ></DeleteConfirm>
                <DisplayProducts
                    show={this.state.addProductShow}
                    onHide={addProductsClose}
                    products={this.state.products}
                    docNum={this.state.docNumber}
                    doctype={this.state.doctype}
                ></DisplayProducts>
                <ProductsDetailList
                    show={this.state.ShowDetailList}
                    onHide={Productlist_win_Close}
                    Datalist={this.state.Datalist}
                    vehiclePanel={this.props.vehiclePanel}
                ></ProductsDetailList>
                <DisplayNotes
                    show={this.state.enableDocumnetMsgWindow}
                    onHide={addNotesClose}
                    notes={this.state.noteMessage}
                    onSaveNotes={this.onSaveNotes}
                    displayEdit={true}
                ></DisplayNotes>
                <DisplayCarrierNotes
                    show={this.state.enableCarrierMsgWindow}
                    onHide={addCarierNotesClose}
                    notes={this.state.carrierMessage}
                    type={this.state.instructionType}
                    onSaveCarrierNotes={this.onSaveCarrierNotes}
                    displayEdit={true}
                ></DisplayCarrierNotes>
            </div>

        );
    }
}

export default withNamespaces()(RouteMap);