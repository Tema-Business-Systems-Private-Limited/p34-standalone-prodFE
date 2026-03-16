import React, { Component, createRef } from "react";
import $ from "jquery";
import "jquery-ui/ui/widgets/sortable";
import DeleteConfirm from "./DeleteConfirm";
import { green, orange } from "@mui/material/colors";
import lateIcon from "./images/delay.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import notintime from "./images/delay.png";
import notokay from "./images/not_ok.png";
import ontime from "./images/on-time-4.png";
import maptruck from "./images/maptruck.png";
import AccessTimeFilledTwoToneIcon from "@mui/icons-material/AccessTimeFilledTwoTone";
import DisplayProducts from "./DisplayProducts";
import ProductsDetailList from "./ProductsDetailList";
import { withNamespaces } from "react-i18next";
import {
  convertHrToSec,
  formatTime,
  nullAndNanChecking,
} from "../converterFunctions/converterFunctions";
import DisplayNotes from "./DisplayNotes";
import DisplayCarrierNotes from "./DisplayCarrierNotes";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import DisplayInformationIconDetails2 from "./DisplayInformationIconDetails2";
import "../dashboard.scss";
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

function renumber_table(tableID) {
  $(tableID + " tr").each(function () {
    let data = $(this).find(".type")[0];
    if (data) {
      var classCss;
      if (data.innerText === "PICK" || data.innerText === "PREP EXP") {
        classCss = "badge-primary";
      } else if (data.innerText === "PRECEIPT" || data.innerText === "ENLV") {
        classCss = "badge-warning";
      } else {
        //LIV-->DLV
        classCss = "badge-success";
      }
      var count = $(this).parent().children().index($(this)) + 1;
      var innerHTML =
        `<span class='badge ${classCss}  text-uppercase'>` + count + "</span>";
      $(this).find(".priority").html(innerHTML);
    }
  });
}

const options = ["Document Message"];

const ITEM_HEIGHT = 48;

class RouteMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMap: true,
      isList: false,
      index: -1,
      docnum: "",
      addConfirmShow: false,
      confirmMessage: "",
      addProductShow: false,
      products: [],
      docNumber: "",
      doctype: "",
      sortable: false,
      groData: this.props.geoData || [],
      vehicleCode: "",
      enableDocumnetMsgWindow: false,
      enableCarrierMsgWindow: false,
      selectedDocNumber: "",
      noteMessage: "",
      noteMessageflg: false,
      carrierMessage: "",
      instructionType: "",
      deletedDocument: [],
      addInfoShow: false,
      docNumber_1: "",
      skills: "",
      doctype_1: "",
      logisticDetails: "",
      anchorEl: null,
    };
  }

  componentDidMount() {
    this.updateMap();
    //Make diagnosis table sortable
    $("#diagnosis_list tbody").sortable({
      stop: function (e, ui) {
        let lock = ui.item[0].innerHTML;
        if (lock.includes("unlock")) {
          renumber_table("#diagnosis_list");
        } else {
          $(this).sortable("cancel");
          $(ui.sender).sortable("cancel");
        }
      },
    });
  }
  

  showMap = () => {
    this.props.ChangeShowListFlag(false);
    /*
        this.setState({
            isMap: true,
            isList: false
        });
        */
  };

  onInfoClick = (logisticData, docNum, doctype) => {
    const logisticDetails = logisticData;
    this.setState({
      addInfoShow: true,
      logisticDetails: logisticDetails,
      docNumber_1: docNum,
      doctype_1: doctype,
    });
  };

  displayDeliverableStatus = (docnum) => {
    console.log("inside RouteMap - dropspanel", this.props.currDropsPanel);
    var matched = false;
    var status = "";
    this.props.currDropsPanel.length > 0 &&
      this.props.currDropsPanel.map((drop) => {
        console.log("inside RouteMap - 3- drop", drop);
        console.log("inside RouteMap - 3- docnum", docnum);
        console.log("inside RouteMap - 3- status", status);
        if (drop.docnum === docnum) {
          matched = true;
          if (drop.dlvflg === "1") {
            status = "No";
          } else if (drop.dlvflg === "2" || drop.dlvflg === "3") {
            status = "Yes";
          } else {
            status = "NA";
          }
        }
      });
    console.log("inside RouteMap - 3- final status", status);

    return (
      <h5>
        <td width="3%">
          <span class="badge badge-success text-uppercase">{status}</span>
        </td>
      </h5>
    );
  };

  showListClick = () => {
    this.props.ChangeShowListFlag(true);
    /*
        this.setState({
            isMap: false,
            isList: true
        });
        */
  };

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
    controlText.innerHTML = this.props.t("listview");
    controlUI.appendChild(controlText);
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", () => {
      this.showListClick();
    });
  };

  buildContent = (place) => {
    // const url = "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/BURV12PRD_BPRPROD/$sessions?f=GESSDH/2/M/" + place.docnum;
    const url =
      "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESSDH/2//M/" +
      place.docnum;
    return (
      <div id="content">
        <div id="siteNotice"></div>
        <div id="bodyContent">
          {place.docnum && <a href={url}>{place.docnum}</a>}
          {place.city}
        </div>
      </div>
    );
  };

  updateMap = () => {
    document.getElementById("google-map").innerHTML = "";
    let IsTripSelected = false;
    let IsDeptAArrSameSite = false;
    let StartSite = "";
    let EndSite = "";
    if (this.props.markers !== undefined && this.props.markers.length > 0) {
      var centerLocation = this.props.markers[0];
      var mapOptions = {
        zoom: 10,
        center: {
          lat: centerLocation.lat,
          lng: centerLocation.lng,
        },
        mapTypeId: "roadmap",
      };
      var markerArray;

      markerArray = this.props.markers;
      console.log("inside update place markersArray", markerArray);
      if (this.props.selectedTrips && this.props.selectedTrips[0]) {
        IsTripSelected = true;
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
                StartSite = site.id;
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
              arrivalSite.id = site.id;
              arrivalSite.lat = site.lat;
              arrivalSite.lng = site.lng;
              arrivalSite.value = site.value;
              arrivalSite.arrivalCheck = "arrival";
              EndSite = site.id;
            }
          });
          markerArray.push(arrivalSite);
        }

        if (StartSite === EndSite) {
          IsDeptAArrSameSite = true;
        }
      }

      if (IsTripSelected) {
        var map = new window.google.maps.Map(
          document.getElementById("google-map"),
          mapOptions
        );
        var directionsService = new window.google.maps.DirectionsService();
        var directionsDisplay = new window.google.maps.DirectionsRenderer({
          map: map,
          suppressMarkers: true,
          polylineOptions: { strokeColor: "#3848ca" },
        });
        //directionsDisplay.setMap(map);
        var DepartureSite = "";
        var SiteCode = "";
        const centerControlDiv = document.createElement("div");
        this.customControl(centerControlDiv, map);
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
          centerControlDiv
        );
        var polylinePath = [];
        let Aflg = "",
          Dflg = "";
        const labels = "123456789";
        let labelIndex = 0;
        var iconColor = {
          url: "http://maps.google.com/mapfiles/ms/icons/green.png", // Use your own marker icon URL
          labelOrigin: new window.google.maps.Point(15, 10), // Position the label below the icon
        };
        let markerIndex = -1; // Marker index for numbering
        markerArray.map((place) => {
          console.log("inside update place", place);
          var marker = null;

          var label = ""; // Label for marker numbering
          markerIndex++;
          label = markerIndex.toString(); // Set label as marker index
          // Increment marker index
          console.log("Marker index", markerIndex);
          console.log("Marker index label", label);
          if (place.id !== undefined) {
            if (IsDeptAArrSameSite === true) {
              if (markerIndex === 0) {
                marker = new window.google.maps.Marker({
                  position: { lat: place.lat, lng: place.lng },
                  icon: {
                    url: "/assets/img/address.png",
                  },
                });
              } else {
                DepartureSite = place.id;
                SiteCode = place.id;
                place.docnum = place.value;
                place.city = place.value;
                label = "S,E";
                marker = new window.google.maps.Marker({
                  position: { lat: place.lat, lng: place.lng },
                  title: place.value,
                  icon: {
                    url: "/assets/img/address.png",
                  },
                });
              }
            } else {



              DepartureSite = place.id;
              SiteCode = place.id;
              place.docnum = place.value;
              place.city = place.value;
              marker = new window.google.maps.Marker({
                position: { lat: place.lat, lng: place.lng },
                title: place.value,
                icon: {
                  url: "/assets/img/address.png",
                },
              });
            }

          } else {

            if (place.doctype === 'MISCDEAD') {

              DepartureSite = place.id;
              SiteCode = place.id;
              place.docnum = place.value;
              place.city = place.value;
              marker = new window.google.maps.Marker({
                position: { lat: place.lat, lng: place.lng },
                title: place.value,
                icon: {
                  url: "/assets/img/trailer.png",
                },
              });
            }


            else {

              console.log("inside else place", place);
              marker = new window.google.maps.Marker({
                position: { lat: place.lat, lng: place.lng },
                title: place.city,
                label: {
                  color: "white", // Label color
                  fontSize: "20px", // Label font size
                  fontWeight: "bold",
                  text: labels[labelIndex++ % labels.length],
                },
                Icon: {
                  url: "https://maps.google.com/mapfiles/ms/icons/blue.png", // url
                  scaledSize: new window.google.maps.Size(50, 50),
                  labelOrigin: new window.google.maps.Point(25, 18),
                },
              });
            }
          }
          var url = "";
          var content;
          if (place.doctype == "PRECEIPT") {
            url =
              "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESXX10CPTH/2//M/" +
              place.docnum;
            if (place.tripno == 0)
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</div></div>";
            else
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</br>" +
                place.tripno +
                "-" +
                place.seq +
                "</br>" +
                place.vehicleCode +
                "</div></div>";
          } else if (place.doctype == "DLV") {
            url =
              "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESSDH/2//M/" +
              place.docnum;
            if (place.tripno == 0)
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</div></div>";
            else
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</br>" +
                place.tripno +
                "-" +
                place.seq +
                "</br>" +
                place.vehicleCode +
                "</div></div>";
          } else if (place.doctype == "PICK") {
            url =
              "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESPRH2/2//M/" +
              place.docnum;
            if (place.tripno == 0)
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</div></div>";
            else
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</br>" +
                place.tripno +
                "-" +
                place.seq +
                "</br>" +
                place.vehicleCode +
                "</div></div>";
          } else {
            url =
              "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESFCY/2//M/" +
              place.docnum;
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              SiteCode +
              "," +
              place.docnum +
              "</a></br>" +
              place.city +
              "</div></div>";
          }
          var infowindow = new window.google.maps.InfoWindow({
            content: content,
          });

          marker.setMap(map);
          marker.addListener("click", function () {
            infowindow.open(map, marker);
          });
          // polylinePath.push({ lat: place.lat, lng: place.lng });
        });

        // Code to calculate and display route using DirectionsService
        var waypoints = markerArray.map((place) => ({
          location: { lat: place.lat, lng: place.lng },
          stopover: true,
        }));

        var directionsWaypoints = waypoints.slice(1, -1).map((waypoint) => ({
          location: waypoint.location,
          stopover: true,
        }));

        var request = {
          origin: waypoints[0].location,
          destination: waypoints[waypoints.length - 1].location,
          waypoints: directionsWaypoints,
          travelMode: "DRIVING",
        };

        // directionsService.route(request, function (result, status) {
        //   if (status == "OK") {
        //     directionsDisplay.setDirections(result);
        //   }
        // });
        directionsService.route(request, (result, status) => {
          console.log("Selected Trips:", this.props.selectedTrips);
          if (this.props.selectedTrips && this.props.selectedTrips[0] && (this.props.selectedTrips[0].routeStatus !== "Open" || this.props.selectedTrips[0].optistatus !== "Open")) {
            console.log("Route Status is not Open:", this.props.selectedTrips[0].routeStatus);
            if (status === 'OK') {
              directionsDisplay.setDirections(result);
            }
          } else {
            console.log("Route Status is Open or selectedTrips is empty or undefined");
          }
        });

        /* Create an arrow polyline
            var polyline = new window.google.maps.Polyline({
                path: polylinePath,
                geodesic: false,
                strokeColor: '#0000ff',
                strokeOpacity: 1.0,
                strokeWeight: 4,

            });
            polyline.setMap(map);
            */
      } else {
        var map = new window.google.maps.Map(
          document.getElementById("google-map"),
          mapOptions
        );
        var DepartureSite = "";
        var SiteCode = "";
        const centerControlDiv = document.createElement("div");
        this.customControl(centerControlDiv, map);
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
          centerControlDiv
        );
        markerArray.map((place) => {
          console.log("inside update place", place);
          var marker = null;
          if (place.id !== undefined) {
            DepartureSite = place.id;
            SiteCode = place.id;
            place.docnum = place.value;
            place.city = place.value;
            marker = new window.google.maps.Marker({
              position: { lat: place.lat, lng: place.lng },
              title: place.value,
              icon: {
                url: "/assets/img/address.png",
              },
            });
          } else if (place.panelType && place.panelType === "pickup") {
            marker = new window.google.maps.Marker({
              position: { lat: place.lat, lng: place.lng },
              title: place.city,
              // label : place.tripno+" - ",
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              },
            });
          } else if (place.panelType && place.panelType === "drop") {
            marker = new window.google.maps.Marker({
              position: { lat: place.lat, lng: place.lng },
              title: place.city,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              },
            });
          } else if (place.arrivalCheck === "arrival") {
            var ArrIcon = "";
            SiteCode = place.idd;
            if (DepartureSite != place.idd) {
              ArrIcon = "/assets/img/home36.png";
            } else {
              ArrIcon = "/assets/img/address.png";
            }
            marker = new window.google.maps.Marker({
              position: { lat: place.lat, lng: place.lng },
              title: place.city,
              icon: {
                url: ArrIcon,
              },
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
          // const url = "http://125.18.84.158:8124/syracuse-main/html/main.html?url=/trans/x3/erp/BURV12PRD_BPRPROD/$sessions?f=GESSDH/2/M/" + place.docnum;
          var url = "";
          var content;
          if (place.doctype == "PRECEIPT") {
            url =
              "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESXX10CPTH/2//M/" +
              place.docnum;
            if (place.tripno == 0)
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</div></div>";
            else
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</br>" +
                place.tripno +
                "-" +
                place.seq +
                "</br>" +
                place.vehicleCode +
                "</div></div>";
          } else if (place.doctype == "DLV") {
            url =
              "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESSDH/2//M/" +
              place.docnum;
            if (place.tripno == 0)
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</div></div>";
            else
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</br>" +
                place.tripno +
                "-" +
                place.seq +
                "</br>" +
                place.vehicleCode +
                "</div></div>";
          } else if (place.doctype == "PICK") {
            url =
              "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESPRH2/2//M/" +
              place.docnum;
            if (place.tripno == 0)
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</div></div>";
            else
              content =
                "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
                url +
                " target='_blank'>" +
                place.docnum +
                "</a></br>" +
                place.bpname +
                "</br>" +
                place.poscode +
                " - " +
                place.city +
                "</br>" +
                place.tripno +
                "-" +
                place.seq +
                "</br>" +
                place.vehicleCode +
                "</div></div>";
          } else {
            url =
              "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESFCY/2//M/" +
              place.docnum;
            content =
              "<div id='content'><div id='siteNotice'></div><div id = 'bodyContent'><a href=" +
              url +
              " target='_blank'>" +
              SiteCode +
              "," +
              place.docnum +
              "</a></br>" +
              place.city +
              "</div></div>";
          }
          var infowindow = new window.google.maps.InfoWindow({
            content: content,
          });
          marker.setMap(map);
          marker.addListener("click", function () {
            infowindow.open(map, marker);
          });
        });
      }

      this.props.updateMagChaged();
    } else {
      var myLatlng1 = new window.google.maps.LatLng(
        33.31469,
        44.3767616
      );
      var mapOptions = {
        zoom: 10,
        center: myLatlng1,
      };
      var map = new window.google.maps.Map(
        document.getElementById("google-map"),
        mapOptions
      );
    }
  };

  onConfirmClick = (index, docnum, vehicleCode, document) => {
    console.log(
      "T222 inside RouteMAp after onConfirmClick clicked- index",
      index
    );
    console.log(
      "T222 inside RouteMAp after onConfirmClick clicked- docnum",
      docnum
    );
    console.log(
      "T222 inside RouteMAp after onConfirmClick clicked- vehicleCode",
      vehicleCode
    );
    this.setState({
      addConfirmShow: true,
      confirmMessage: "Are you sure you want to Delete?",
      index: index,
      docnum: docnum,
      vehicleCode: vehicleCode,
      deletedDocument: document,
    });
  };

  displayRouteTypeDocBadge = (typDoc, pDropPairedDoc) => {
    const RouteMvt = typDoc;
    const dropPairedDoc = pDropPairedDoc;
    if (RouteMvt == "PICK") {
      return (
        <h5>
          <td width="3%">
            <span class="badge badge-primary text-uppercase">{"PICK"}</span>
          </td>
        </h5>
      );
    }
    if (RouteMvt == "DLV") {
      if (dropPairedDoc.length > 1) {
        return (
          <h5>
            <td width="3%">
              <span class='badge badge-info style="font-size:2rem'>
                {"DLVEXCHANGE"}
              </span>
            </td>
          </h5>
        );
      }
      return (
        <h5>
          <td width="3%">
            <span class='badge badge-success style="font-size:2rem'>
              {"DLV"}
            </span>
          </td>
        </h5>
      );
    }
    if (RouteMvt == "PRECEIPT") {
      return (
        <h5>
          <td width="3%">
            <span class="badge badge-danger text-uppercase">{"PRECEIPT"}</span>
          </td>
        </h5>
      );
    }
  };

  displayRouteTagBadge = (typDoc) => {

    console.log(typDoc, "this is type doc")
    const dropMvt = typDoc;
    if (dropMvt == "EQUIP DLV") {
      return (
        <h6>
          <span class="badge badge-primary text-uppercase">{dropMvt}</span>
        </h6>
      );
    }
    if (dropMvt == "DLV") {
      return (
        <h6>
          <span class='badge badge-success style="font-size:4rem'>
            {dropMvt}
          </span>
        </h6>
      );
    }
    if (dropMvt == "PICKTKT") {
      return (
        <h6>
          <span class="badge badge-warning text-uppercase">{dropMvt}</span>
        </h6>
      );
    }
    if (dropMvt == "PREP EXP") {
      return (
        <h6>
          <span class='badge badge-success style="font-size:4rem'>
            {dropMvt}
          </span>
        </h6>
      );
    }
    if (dropMvt == "LIV REP") {
      return (
        <h6>
          <span class="badge badge-danger text-uppercase">{dropMvt}</span>
        </h6>
      );
    }
    if (dropMvt == "ENLV") {
      return (
        <h6>
          <span class='badge badge-info style="font-size:4rem'>{dropMvt}</span>
        </h6>
      );
    }
    if (dropMvt == "REC REP") {
      return (
        <h6>
          <span class='badge badge-secondary style="font-size:4rem'>
            {dropMvt}
          </span>
        </h6>
      );
    }
  };

  onDetailList = () => {
    this.setState({
      ShowDetailList: true,
      Datalist: this.props.geoData,
    });
  };

  displayDocumentMessage = (docNum, msg) => {
    this.setState({
      enableDocumnetMsgWindow: true,

      selectedDocNumber: docNum,
      noteMessage: msg,
      anchorEl: null,
    });
  };
  displayCarrierMessage = (docNum, msg, type) => {
    this.setState({
      enableCarrierMsgWindow: true,
      instructionType: type,
      selectedDocNumber: docNum,
      carrierMessage: msg,
      anchorEl: null,
    });
  };

  displayRouteTag = (drop, lang) => {
    console.log("T888 language =", lang);
    console.log("T888 drop =", drop);
    var myStr = drop.routeColor;
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr[1];


    return (
      <h6>
        <span style={{ backgroundColor: s }}>{drop.routeTag}</span>
      </h6>
    )

  };

  displayBadgeSeq = (doc, iSeq) => {
    var myStr = doc.routeColor;
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr[1];
    const Seq = iSeq + 1;
    return (
      <h5>
        <td width="3%" style={{ backgroundColor: s }}>
          {Seq}
        </td>
      </h5>
    );
  };

  displayBadge = (typeMvt, iSeq) => {
    const docmvt = typeMvt;
    const Seq = iSeq + 1;
    if (docmvt == "PICK") {
      return (
        <h5>
          <td width="3%" class="priority">
            <span class="badge badge-primary text-uppercase">{Seq}</span>
          </td>
        </h5>
      );
    }
    if (docmvt == "DLV") {
      return (
        <h5>
          <td width="3%" class="priority">
            <span class="badge badge-success ">{Seq}</span>
          </td>
        </h5>
      );
    }
    if (docmvt == "PRECEIPT") {
      return (
        <h5>
          <td width="3%" class="priority">
            <span class="badge badge-warning text-uppercase">{Seq}</span>
          </td>
        </h5>
      );
    }
    if (docmvt == "BREAK") {
      return (
        <h5>
          <td width="3%" class="priority">
            <span class="badge badge-secondary text-uppercase">{Seq}</span>
          </td>
        </h5>
      );
    }
  };

  onConfirmNo = () => {
    this.setState({
      addConfirmShow: false,
    });
  };

  onConfirmYes = (index, docnum) => {
    let type;
    console.log("T222 inside confirm yes");
    if (this.state.confirmMessage.includes("Delete")) {
      type = "Delete";
      console.log("T222 inside confirm Yes - if");
      this.props.onTripDelete(
        index,
        docnum,
        type,
        this.state.vehicleCode,
        this.state.deletedDocument
      );
    } else {
      console.log("T222 inside confirm Yes - else");
      this.props.onTripDelete(index, docnum);
    }

    this.setState({
      addConfirmShow: false,
    });
  };

  onDocClick = (product, docNum, doctype) => {
    const products = product;
    this.setState({
      addProductShow: true,
      products: products,
      docNumber: docNum,
      doctype: doctype,
    });
  };

  getBgcolor(qtyflage) {
    if (qtyflage === true) {
      return "#feff99";
    } else {
      return "";
    }
  }

  onSaveNotes = (note) => {
    console.log("inside onsavenotes");
    this.props.onDocMsg(this.state.selectedDocNumber, note, "doc");
    this.setState({ enableDocumnetMsgWindow: false });
  };

  onSaveCarrierNotes = (note, type) => {
    console.log("inside onsaveCarrierNotes");

    if (type === "carrier") {
      this.props.onDocMsg(this.state.selectedDocNumber, note, "carrier");
    } else {
      this.props.onDocMsg(this.state.selectedDocNumber, note, "loader");
    }
    this.setState({ enableCarrierMsgWindow: false });
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
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

    console.log("Inner start time arvtime", innerStartDate);
    console.log("Inner end time deptime", innerEndDate);
    console.log("Outer start time fromTime", outerStartDate);
    console.log("Outer end time toTime", outerEndDate);

    return innerStartDate >= outerStartDate && innerEndDate <= outerEndDate;
  };

  BPartnerBadgeLink = (clientcode, dtype) => {
    const docmvt = dtype;
    let url, content;

    if (docmvt == "DLV") {
      url =
        "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESBPC/2//M/" +
        clientcode;
      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
      return (
        <a href={url} target="_blank">
          {clientcode}{" "}
        </a>
      );
    }
    if (docmvt == "PICK") {
      url =
        "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESBPC/2//M/" +
        clientcode;
      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
      return (
        <a href={url} target="_blank">
          {clientcode}{" "}
        </a>
      );
    }
    if (docmvt == "PRECEIPT") {
      url =
        "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESBPS/2/M//" +
        clientcode;
      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
      return (
        <a href={url} target="_blank">
          {clientcode}{" "}
        </a>
      );
    } else {
      url =
        "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESBPS/2/M//" +
        clientcode;
      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
      return (
        <a href={url} target="_blank">
          {clientcode}{" "}
        </a>
      );
    }
  };

  GetTiminingWithinRange1 = (acceptedProps) => {
    console.log("TTTT props are tooltip time", acceptedProps);
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

    console.log("TTTT props are tooltip time resultmatch", resultMatch1);

    console.log("TTTT props are tooltip time time exist", timeExist1);
    //  resultMatch =  this.isTimeRangeWithinAnotherRange(fromtime,totime,arrtime,deptime);

    if (resultMatch1) {
      return "On Time";
    } else if (timeExist1) {
      return "On Time";
    } else {
      return "Delayed";
    }
  };


  formatedName = (rawString) => {

    const cleanedString = rawString
      .replace(/'+/g, "'")   // Replace multiple apostrophes with a single one
      .replace(/\t+/g, ' ')  // Replace tabs with a single space
      .trim();               // Remove leading/trailing spaces
    return cleanedString
  }


  GetTiminingWithinRange = (acceptedProps) => {
    console.log("TTTT props are", acceptedProps);
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
        //console.log(strArray[i]);
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
      return (
        <span className="tooltip_time1">
          <img src={ontime} height="34" />
          <span className="tooltiptext_time1">On Time</span>
        </span>
      );
    } else if (timeExist) {
      return (
        <span className="tooltip_time1">
          <img src={ontime} height="34" />
          <span className="tooltiptext_time1">On Time</span>
        </span>
      );
    } else {
      return (
        <span className="tooltip_time1">
          <img src={notintime} style={{ paddingLeft: "20%" }} />
          <span className="tooltiptext_time1">Delayed</span>
        </span>
      );
    }
  };

  render() {
    console.log("inside RouteMap-  geodata", this.props.geoData);
    console.log("inside RouteMap - markers", this.props.markers);
    console.log("inside RouteMap - mapchanged", this.props.mapChanged);
    console.log("inside RouteMap - CheckTrips", this.props.showList);
    let addProductsClose = () => this.setState({ addProductShow: false });
    let Productlist_win_Close = () => this.setState({ ShowDetailList: false });
    let addInfoIconClose = () => this.setState({ addInfoShow: false });
    let addNotesClose = () => this.setState({ enableDocumnetMsgWindow: false });
    let lang = localStorage.getItem("i18nextLng");

    let addCarierNotesClose = () =>
      this.setState({ enableCarrierMsgWindow: false });
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    if (this.props.mapChanged) {
      this.updateMap();
    }

    console.log(this.props.geoData, "tesese are geodata from our side")
    return (
      <div class="routeMapOuter" style={{ height: "400px" }}>
        <div className="mapouter topsection">
          <div
            class="reportlist-view"
            style={{ display: this.props.showList ? "block" : "none" }}
          >
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              onClick={this.props.updateTimeLine}
            >
              {this.props.t("Updatebtn")}
            </button>
            &nbsp; &nbsp;
            {/* <button type="button" class="btn btn-secondary btn-sm">
              {this.props.reorder ? "yes" : "no"}
            </button> */}
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              onClick={this.onDetailList}
            >
              {this.props.t("DetailList")}
            </button>
            &nbsp; &nbsp;
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              onClick={this.showMap}
            >
              {this.props.t("Map")}
            </button>
            {/* <table class="table" id="diagnosis_list"> */}
            <table class="table table-sm " id="diagnosis_list">
              <thead style={{ textAlign: "left" }}>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th width="3%" class="pl-2">
                    {this.props.t("Seq")} #
                  </th>
                  <th width="6%">{this.props.t("Vehicle")}</th>
                  <th></th>
                  <th width="6%">Document #</th>
                  <th width="6%">{this.props.t("Type")}</th>
                  <th width="6%">{this.props.t("Site")}</th>
                  <th width="6%">{this.props.t("Client Code")}</th>
                  <th width="6%">{this.props.t("Client")}</th>
                  <th width="6%">{this.props.t("postal City")}</th>
                  <th width="6%">{this.props.t("Weight")}</th>
                  <th width="6%">{this.props.t("Volume")}</th>
                  <th width="6%">{this.props.t("Arrival")}</th>
                  <th width="6%">{this.props.t("Departure")}</th>
                  <th width="6%">{this.props.t("ServiceTime")}</th>
                  <th width="6%">{this.props.t("WaitingTime")}</th>
                  {/* <th>Deliverable</th>{" "} */}
                  <th width="0%" class="pairedDoc" style={{ display: "none" }}>
                    {this.props.t("PairedDoc")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {((this.props.geoData && this.props.geoData) || []).map(

                  (geoData, i) => {

                    console.log(geoData, "this is geodata in map method")
                    let data = geoData;
                    let logisticDetails = {};
                    logisticDetails.loadBay = data.loadBay && data.loadBay;
                    logisticDetails.tailGate = data.tailGate && data.tailGate;
                    logisticDetails.waitingTime =
                      data.waitingTime &&
                      formatTime(convertHrToSec(data.waitingTime));
                    logisticDetails.stackHeight =
                      data.stackHeight && nullAndNanChecking(data.stackHeight);
                    logisticDetails.timings =
                      data.serviceTime &&
                      formatTime(convertHrToSec(data.serviceTime));
                    logisticDetails.packing = data.packing && data.packing;
                    logisticDetails.height = data.height && data.height;
                    logisticDetails.priority = data.priority && data.priority;
                    logisticDetails.loadingOrder =
                      data.loadingOrder && data.loadingOrder;
                    logisticDetails.allDrivers =
                      data.allDrivers && data.allDrivers;
                    logisticDetails.driverList =
                      data.driverNameList && data.driverNameList;
                    logisticDetails.allVehClass =
                      data.allVehClass && data.allVehClass;
                    logisticDetails.vehClassList =
                      data.vehClassDescList && data.vehClassDescList;
                    logisticDetails.fromTime =
                      data.fromTime && data.fromTime.length > 1
                        ? data.fromTime.split(" ")
                        : data.fromTime;
                    logisticDetails.toTime =
                      data.toTime && data.toTime.length > 1
                        ? data.toTime.split(" ")
                        : data.toTime;
                    logisticDetails.availDays =
                      data.availDays && data.availDays;

                    this.props.markers.map((marker, index) => {
                      if (data.docnum === marker.docnum) {
                        data.lock = marker.lock;
                      }
                    });

                    console.log("this is data at the end before return 1419", data)
                    return (
                      <tr
                        key={i}
                        id={data.docnum}
                        style={{
                          backgroundColor: data.qtyflag
                            ? this.getBgcolor(data.qtyflag)
                            : "",
                        }}
                      >
                        <td>
                          <PopupState
                            variant="popover"
                            popupId="demo-popup-menu"
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
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                  }}
                                >
                                  <MenuItem
                                    onClick={() =>
                                      this.displayDocumentMessage(
                                        data.docnum,
                                        data.ptheader
                                      )
                                    }
                                  >
                                    {this.props.t("Document Instructions")}
                                  </MenuItem>
                                  {data.doctype && data.doctype === "DLV" ? (
                                    <MenuItem
                                      onClick={() =>
                                        this.displayCarrierMessage(
                                          data.docnum,
                                          data.CarrierMessage,
                                          "carrier"
                                        )
                                      }
                                    >
                                      {this.props.t("Carrier Instructions")}
                                    </MenuItem>
                                  ) : (
                                    ""
                                  )}
                                  {(data.doctype && data.doctype === "DLV") ||
                                    data.doctype === "PICK" ? (
                                    <MenuItem
                                      onClick={() =>
                                        this.displayCarrierMessage(
                                          data.docnum,
                                          data.loaderMessage,
                                          "loader"
                                        )
                                      }
                                    >
                                      {this.props.t("Loader Instructions")}
                                    </MenuItem>
                                  ) : (
                                    ""
                                  )}
                                  {/* <MenuItem>Comment1</MenuItem>
                                  <MenuItem>Comment2</MenuItem>
                                  <MenuItem>Comment3</MenuItem>
                                  <MenuItem>Comment4</MenuItem> */}
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
                            ""
                          ) : (
                            <button
                              class="btn btn-danger btn-sm rounded-0"
                              type="button"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                              onClick={() =>
                                this.onConfirmClick(
                                  i,
                                  data.docnum,
                                  data.vehicleCode,
                                  data
                                )
                              }
                              disabled={data.lock || data.doctype === "BREAK"}
                            >
                              <i class="fa fa-trash"></i>
                            </button>
                          )}
                        </td>
                        <td></td>
                        <td width="3%">
                          {data.routeColor
                            ? this.displayBadgeSeq(data, i)
                            : this.displayBadge(data.doctype, i)}
                        </td>

                        <td width="6%" name="itemCode">
                          {data.vehicleCode}
                        </td>
                        <td>{this.GetTiminingWithinRange(data)}</td>
                        <td width="6%" name="docNum" class="docnum">
                          { data.doctype !== "BREAK" ?
                          ( <a
                            href="#"
                            onClick={() =>
                              this.onDocClick(
                                data.products,
                                data.docnum,
                                data.doctype
                              )
                            }
                          >{data.docnum}</a>
                          ) : (data.docnum)
                          }
                        </td>
                        <td width="6%" class="type">
                          {data.routeColor
                            ? this.displayRouteTag(data, lang)
                            : this.displayRouteTagBadge(data.routeTag)}
                        </td>
                        <td width="6%">{data.site}</td>
                        <td width="6%">{data.bpcode}</td>
                        <td width="6%">{this.formatedName(data?.bpname || '')}</td>
                        <td width="6%">
                          {data.poscode} , {data.city}
                        </td>
                        <td width="6%">
                          {data.netweight} {data.weightunit}
                        </td>
                        <td width="6%">
                          {data.volume} {data.volume_unit}
                        </td>
                        <td width="6%">{data.arrival && data.arrival}</td>
                        <td width="6%">{data.end && data.end}</td>
                        <td width="6%">
                          {formatTime(convertHrToSec(data.serviceTime != "" ? data.serviceTime : data.bpserviceTime))}
                        </td>

                        <td width="6%">
                          {formatTime(convertHrToSec(data.waitingTime))}
                        </td>

                        {/* <td>{this.displayDeliverableStatus(data.docnum)}</td> */}
                        <td
                          width="0%"
                          class="pairedDoc"
                          style={{ display: "none" }}
                        >
                          {data.pairedDoc}
                        </td>
                        {data.lock ||
                          (this.props.trips &&
                            this.props.trips[0] &&
                            this.props.trips[0].lock) ? (
                          <td
                            width="0%"
                            class="lock"
                            style={{ display: "none" }}
                          >
                            lock
                          </td>
                        ) : (
                          <td
                            width="0%"
                            class="lock"
                            style={{ display: "none" }}
                          >
                            unlock
                          </td>
                        )}
                        {/* <td width="0%" class="lock" style={{ display: 'none' }}>
                                                {data.lock}
                                            </td> */}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <div
            class="gmap_canvas"
            style={{ display: this.props.showList ? "none" : "block" }}
          >
            <div id="google-map" style={{ width: "100%", height: "100%" }} />
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
        <DisplayInformationIconDetails2
          show={this.state.addInfoShow}
          onInfoIconHide={addInfoIconClose}
          data={this.state.logisticDetails}
          dataType="object"
          docNum={this.state.docNumber_1}
          doctype={this.state.doctype_1}
        ></DisplayInformationIconDetails2>
      </div>
    );
  }
}

export default withNamespaces()(RouteMap);
