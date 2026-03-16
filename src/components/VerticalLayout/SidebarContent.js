import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
//i18n
import { withNamespaces } from "react-i18next";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: "",
      user: ""
    };
  }

  componentDidMount() {
    this.initMenu();
    var user = JSON.parse(localStorage.getItem("authUser"));
    this.setState({
      userid: user.username,
      user: user
    });

    user.rpflag = true
    user.schflag = true
    user.removpckt = true
    user.addpckt = true
    user.appointment = true
    user.railcaroutbond = true
    user.fleetm = true
    user.driverm = true
    user.calendar = true
    user.maps = true
    user.reports = true
    user.versionlo = true
    user.configurations = true
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };



  render() {

    let { user } = this.state;

    console.log(user, "this is user inside sidebar content")

    // sidebar animation

    const sidebarStyle = {
      transition: 'all 0.3s linear',
      /* Add other styles as needed */
    };


    //  const tracklink = process.env.REACT_APP_TRACK_INVENTORY_SITE +"?USERID="+ this.state.userid;
    const PODtracling = process.env.REACT_APP_POD_TRACKING;

    const tracklink =
      "http://tbsi.tema-systems.com:8089/scriptcase/app/TMS_TMSNEW/TRACK_01/?USERID=" +
      this.state.userid;
    return (
      <React.Fragment>

        <div id="sidebar-menu"
          style={{
            maxHeight: "calc(100vh - 60px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}>
          <ul className="metismenu list-unstyled" id="side-menu" style={{ width: "100%" }}>
            <li className={`${user.rpflag ? "d-block" : "d-none"}`}>
              <Link to="/dashboard" className="waves-effect">
                <i className="ri-guide-line"></i>
                <span className="badge badge-pill badge-success float-right"></span>
                <span className="ml-1">{this.props.t("Route Planner")}</span>
              </Link>
            </li>

            {/* <li className={`${user.schflag ? "d-block" : "d-none"}`}>
              <Link to="/scheduler2" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ml-1">{this.props.t("Scheduler")}</span>
              </Link>
            </li> */}

            <li>
              <Link to="/fvehicle" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ml-1">{this.props.t("VehicleMgmt")}</span>

              </Link>
            </li>
            {/*   <li className={`${user.removpckt ? "d-block" : "d-none"}`}>
              <Link to="/AddOn/removePCKT" className=" waves-effect">
                <i class="ri-delete-bin-line"></i>
                <span className="ml-1">
                  {this.props.t("Removal of Pick Tickets")}
                </span>
              </Link>
            </li>
            <li className={`${user.addpckt ? "d-block" : "d-none"}`}>
              <Link to="/AddOn/AddPCKT" className=" waves-effect">
                <i class="ri-add-circle-line"></i>
                <span className="ml-1">
                  {this.props.t("Add Pick tickets to Routes")}
                </span>
              </Link>
            </li> */}
            {/* <li className={`${user.appointment ? "d-block" : "d-none"}`}>
              <Link to="/appointment" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ml-1">{this.props.t("Appointment")}</span>
              </Link>
            </li> */}

            {/* <li className={`${user.railcaroutbond ? "d-block" : "d-none"}`}>
              <Link to="/#" className="has-arrow waves-effect">
                <i class="ri-train-line"></i>
                <span className="ml-1">{this.props.t("RailCar Outbound")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/railcar/checkin">
                    <i className="ri-login-box-line"></i>
                    {this.props.t("Check In")}
                  </Link>
                </li>
                <li>
                  <Link to="/railcar/buildload">
                    <i className="ri-train-wifi-line"></i>
                    {this.props.t("Build RailCar Load")}
                  </Link>
                </li>
                <li>
                  <Link to="/railcar/checkout">
                    <i className="ri-logout-box-line"></i>
                    {this.props.t("Check Out")}
                  </Link>
                </li>
              </ul>
            </li> */}

            {/* Fleet management */}




            {/* Trailer Management */}


            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-truck-line"></i>

                <span className="ml-1">{this.props.t("Trailer Management")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/ftrailer">
                    <i className="ri-car-line"></i>
                    Trailer
                  </Link>
                </li>
              </ul>

            </li>



            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i class="ri-steering-2-fill"></i>

                <span className="ml-1">{this.props.t("Driver Management")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/fdriver">
                    <i className="ri-car-line"></i>
                    Drivers
                  </Link>
                </li>
              </ul>

            </li>

            {/* Driver Management */}
            <li className={`${user.driverm ? "d-block" : "d-none"}`}>
              <Link to="/#" className="has-arrow waves-effect">
                <i class="ri-steering-2-fill"></i>

                <span className="ml-1">{this.props.t("Shift Management")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/drivermanagement/driver-shifts">
                    <i className="ri-car-line"></i>
                    {this.props.t("Driver Shift")}
                  </Link>
                </li>
                <li>
                  <Link to="/drivermanagement/driver-report">
                    <i className="ri-car-line"></i>
                    {this.props.t("Driver Report")}
                  </Link>
                </li>
                <li>
                  <Link to="/drivermanagement/shift-creation">
                    <i className="ri-car-line"></i>
                    {this.props.t("Shift Creation ")}
                  </Link>
                </li>
                <li>
                  <Link to="/drivermanagement/unavailability">
                    <i className="ri-car-line"></i>
                    {this.props.t("Unavailability")}
                  </Link>
                </li>

              </ul>
            </li>


            {/* <li className={`${user.calendar ? "d-block" : "d-none"}`}>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ml-1">{this.props.t("Calendar")}</span>
              </Link>
            </li> */}
            {/* <li className={`${user.maps ? "d-block" : "d-none"}`}>
              <Link to="/maps" className=" waves-effect">
                <i class="ri-map-pin-line"></i>
                <span className="ml-1">{this.props.t("Maps")}</span>
              </Link>
            </li> */}

            <li className={`${user.fleetm ? "d-block" : "d-none"}`}>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-truck-line"></i>

                <span className="ml-1">{this.props.t("Fleet Management")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/fvehicle">
                    <i className="ri-car-line"></i>
                    Vehicle Management
                  </Link>
                </li>

                {/* <li>
                  <Link to="/vehiclemanagement/vehicleclassassociation">
                    <i className="ri-car-line"></i>
                    Vehicle Class Association
                  </Link>
                </li> */}
                <li>
                  <Link to="/fvehicleclass">
                    <i className="ri-car-line"></i>
                    Vehicle Class
                  </Link>
                </li>

                <li>
                  <Link to="/ftrailer">
                    <i className="ri-truck-line"></i>
                    Trailer
                  </Link>
                </li>

                <li>
                  <Link to="/fdriver">
                    <i class="ri-steering-2-fill"></i>
                    Drivers
                  </Link>
                </li>

                <li>
                  <Link to="/fallocation">
                    <i class="ri-contacts-book-line" />
                    Vehicle Driver Allocation
                  </Link>
                </li>

                <li>
                  <Link to="/trailertype">
                    <i class="ri-contacts-book-line" />
                    Trailer Type
                  </Link>
                </li>

              </ul>

            </li>

            <li className={`${user.maps ? "d-block" : "d-none"}`}>
              <Link to="/usermgmt" className=" waves-effect">
                <i class="ri-file-list-line"></i>

                <span className="ml-1">User Management</span>
              </Link>
            </li>

            <li>
              <Link to="map" className=" waves-effect">
                <i className="ri-road-map-line"></i>
                <span className="ml-1">{this.props.t("Map View")}</span>
              </Link>
            </li>

            <li
            // className={`${user.scrptsmodflg == 2 ? "d-block" : "d-none"}`}
            >
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-article-line"></i>
                <span className="ml-1">{this.props.t("Live Tracker")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/maplive" className=" waves-effect">
                    <i className="ri-calendar-2-line"></i>
                    <span className="ml-1">{this.props.t("Live Tracking By Vehicle")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/trailerreport" className=" waves-effect">
                    <i className="ri-calendar-2-line"></i>
                    <span className="ml-1">{this.props.t("Scheduled Routes by Trailer")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/driverreport" className=" waves-effect">
                    <i className="ri-calendar-2-line"></i>
                    <span className="ml-1">{this.props.t("Scheduled Routes by Driver")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/driverhos" className=" waves-effect">
                    <i class="ri-file-list-line"></i>
                    <span className="ml-1">Driver HOS</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${user.configurations ? "d-block" : "d-none"}`}>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-truck-line"></i>

                <span className="ml-1">{this.props.t("Configuration")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/syncdata">
                    <i className="ri-refresh-line"></i>
                    Sync Data
                  </Link>
                </li>
                <li>
                  <Link to="/rolespermissions">
                    <i className="ri-user-settings-line"></i>
                    Roles & Permissions
                  </Link>
                </li>
                <li>
                  <Link to="/siteconfiguration">
                    <i className="ri-car-line"></i>
                    Site Management
                  </Link>
                </li>
                <li>
                  <Link to="/customer">
                    <i class="ri-contacts-book-line" />
                    Customer
                  </Link>
                </li>

                <li>
                  <Link to="/supplier">
                    <i class="ri-contacts-book-line" />
                    Supplier
                  </Link>
                </li>

                <li>
                  <Link to="/product">
                    <i class="ri-contacts-book-line" />
                    Product
                  </Link>
                </li>
                <li>
                  <Link to="/miscellaneous">
                    <i class="ri-contacts-book-line" />
                    Miscellaneous Stop
                  </Link>
                </li>
                <li>
                  <Link to="/productcategories">
                    <i class="ri-contacts-book-line" />
                    Product Categories
                  </Link>
                </li>

                <li>
                  <Link to="/documentconfiguration">
                    <i class="ri-contacts-book-line" />
                    Document Configuration
                  </Link>
                </li>
                <li>
                  <Link to="/routecancellation">
                    <i class="ri-contacts-book-line" />
                    Route Cancellation
                  </Link>
                </li>
                <li>
                  <Link to="/prerecipt">
                    <i class="ri-contacts-book-line" />
                    Prerecipt
                  </Link>
                </li>


                <li>
                  <Link to="/salesorder">
                    <i class="ri-contacts-book-line" />
                    Sales Order
                  </Link>
                </li>


              </ul>

            </li>


{/* 
            <li className={`${user.reports ? "d-block" : "d-none"}`}>
              <Link to="/#" className="has-arrow waves-effect">
                <i class="ri-file-chart-line"></i>
                <span className="ml-1">{this.props.t("Reports")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/reports/trackInventory" className=" waves-effect">
                    <i className="ri-calendar-2-line"></i>
                    <span className="ml-1">
                      {this.props.t("Track Vehicle Inventory")}
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_TMS_CALENDAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("TMS Calendar")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_TMS_PLANNING}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("TMS Planning")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_DELIVERY_PREPARATION}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">
                      {this.props.t("Delivery Preparation")}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_ROUTE_LIST}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("Route List")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={PODtracling}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("POD Tracking")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_KPI_GLOBAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("KPI - Global")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_KPI_SITE_VEHICLE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">
                      {this.props.t("KPI - Site & Vehicle")}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_KPI_VEHICLE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">
                      {this.props.t("KPI - Vehicle")}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.REACT_APP_KPI_SITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waves-effect"
                  >
                    <i className="ri-guide-line"></i>
                    <span className="ml-1">{this.props.t("KPI - Site")}</span>
                  </a>
                </li>
              </ul>
            </li> */}






            {/* <li className={`${user.versionlo ? "d-block" : "d-none"}`}>
              <Link to="/versionlogs" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <i class="ri-file-list-line"></i>

                <span className="ml-1">Version Logs</span>
              </Link>
            </li> */}




            {/* <li>
                                <Link to="/#" className="has-arrow waves-effect">
                                    <i className="ri-mail-send-line"></i>
                                    <span className="ml-1">{this.props.t('Email')}</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="email-inbox">{this.props.t('Inbox')}</Link></li>
                                    <li><Link to="email-read">{this.props.t('Read Email')}</Link></li>
                                </ul>
                            </li> */}

            {/* <li>
                                <Link to="apps-kanban-board" className=" waves-effect">
                                    <i className="ri-artboard-2-line"></i>
                                    <span className="ml-1">{this.props.t('Kanban Board')}</span>
                                </Link>
                            </li>






            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-account-circle-line"></i>
                <span className="ml-1">{this.props.t("Driver/Users")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#">
                    {this.props.t("Route Planner User Management")}
                  </Link>
                </li>
                <li>
                  <Link to="/#">{this.props.t("Driver Management")}</Link>
                </li>
                <li>
                  <Link to="/#">{this.props.t("Vehicle Allocation")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-gas-station-line"></i>
                <span className="ml-1">{this.props.t("Fuel Management")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#">{this.props.t("Fuel Station")}</Link>
                </li>
                <li>
                  <Link to="/#">{this.props.t("Fuel Log Entry")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-settings-3-line"></i>
                <span className="ml-1">{this.props.t("Utilization")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#">{this.props.t("Odometer Reading")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-tools-line"></i>
                <span className="ml-1">{this.props.t("Maintenance")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/#">{this.props.t("Service List")}</Link>
                </li>
                <li>
                  <Link to="/#">{this.props.t("Schedule a Service")}</Link>
                </li>
              </ul>
            </li>
            {/* <li>
                                <Link to="/#" className="has-arrow waves-effect">
                                    <i className="ri-profile-line"></i>
                                    <span className="ml-1">{this.props.t('Utility')}</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="pages-starter">{this.props.t('Starter Page')}</Link></li>
                                    <li><Link to="pages-maintenance">{this.props.t('Maintenance')}</Link></li>
                                    <li><Link to="pages-comingsoon">{this.props.t('Coming Soon')}</Link></li>
                                    <li><Link to="pages-timeline">{this.props.t('Timeline')}</Link></li>
                                    <li><Link to="pages-faqs">{this.props.t('FAQs')}</Link></li>
                                    <li><Link to="pages-pricing">{this.props.t('Pricing')}</Link></li>
                                    <li><Link to="pages-404">{this.props.t('Error 404')}</Link></li>
                                    <li><Link to="pages-500">{this.props.t('Error 500')}</Link></li>
                                </ul>
                            </li> */}

            {/* <li className="menu-title">{this.props.t("CONFIGURATION")}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-admin-line"></i>
                <span className="ml-1">{this.props.t("Access Control")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="auth-login">{this.props.t("Sites")}</Link>
                </li>
                <li>
                  <Link to="auth-register">{this.props.t("Roles")}</Link>
                </li>
                <li>
                  <Link to="auth-register">{this.props.t("Users")}</Link>
                </li>
                <li>
                  <Link to="auth-register">
                    {this.props.t("Users Assignment")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-lock-line"></i>
                <span className="ml-1">{this.props.t("Setup")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="auth-login">{this.props.t("TMS License")}</Link>
                </li>
                <li>
                  <Link to="auth-register">{this.props.t("POD License")}</Link>
                </li>
              </ul>
            </li>
            <li className="menu-title">{this.props.t("Components")}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-pencil-ruler-2-line"></i>
                <span className="ml-1">{this.props.t("UI Elements")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="ui-alerts">{this.props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="ui-buttons">{this.props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="ui-cards">{this.props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="ui-carousel">{this.props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="ui-dropdowns">{this.props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="ui-grid">{this.props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="ui-images">{this.props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="ui-lightbox">{this.props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="ui-modals">{this.props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="ui-rangeslider">
                    {this.props.t("Range Slider")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-roundslider">
                    {this.props.t("Round Slider")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-session-timeout">
                    {this.props.t("Session Timeout")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-progressbars">
                    {this.props.t("Progress Bars")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-sweet-alert">
                    {this.props.t("Sweet Alerts")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-tabs-accordions">
                    {this.props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="ui-typography">{this.props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="ui-video">{this.props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="ui-general">{this.props.t("General")}</Link>
                </li>
                <li>
                  <Link to="ui-rating">{this.props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="ui-notifications">
                    {this.props.t("Notifications")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="waves-effect">
                <i className="ri-eraser-fill"></i>
                <span className="badge badge-pill badge-danger float-right">
                  6
                </span>
                <span className="ml-1">{this.props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="form-elements">{this.props.t("Elements")}</Link>
                </li>
                <li>
                  <Link to="form-validation">{this.props.t("Validation")}</Link>
                </li>
                <li>
                  <Link to="form-advanced">
                    {this.props.t("Advanced Plugins")}
                  </Link>
                </li>
                <li>
                  <Link to="form-editors">{this.props.t("Editors")}</Link>
                </li>
                <li>
                  <Link to="form-uploads">{this.props.t("File Upload")}</Link>
                </li>
                <li>
                  <Link to="form-xeditable">{this.props.t("X-editable")}</Link>
                </li>
                <li>
                  <Link to="form-wizard">{this.props.t("Wizard")}</Link>
                </li>
                <li>
                  <Link to="form-mask">{this.props.t("Mask")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-table-2"></i>
                <span className="ml-1">{this.props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="tables-basic">{this.props.t("Basic Tables")}</Link>
                </li>
                <li>
                  <Link to="tables-datatable">
                    {this.props.t("Data Tables")}
                  </Link>
                </li>
                <li>
                  <Link to="tables-responsive">
                    {this.props.t("Responsive Table")}
                  </Link>
                </li>
                <li>
                  <Link to="tables-editable">
                    {this.props.t("Editable Table")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-bar-chart-line"></i>
                <span className="ml-1">{this.props.t("Charts")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="charts-apex">{this.props.t("Apexcharts")}</Link>
                </li>
                <li>
                  <Link to="charts-chartjs">{this.props.t("Chartjs")}</Link>
                </li>
                <li>
                  <Link to="charts-knob">{this.props.t("Jquery Knob")}</Link>
                </li>
                <li>
                  <Link to="charts-sparkline">{this.props.t("Sparkline")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-brush-line"></i>
                <span className="ml-1">{this.props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="icons-remix">{this.props.t("Remix Icons")}</Link>
                </li>
                <li>
                  <Link to="icons-materialdesign">
                    {this.props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="icons-dripicons">{this.props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="icons-fontawesome">
                    {this.props.t("Font awesome 5")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-map-pin-line"></i>
                <span className="ml-1">{this.props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="maps-google">{this.props.t("Google Maps")}</Link>
                </li>
                <li>
                  <Link to="maps-vector">{this.props.t("Vector Maps")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-share-line"></i>
                <span className="ml-1">{this.props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="true">
                <li>
                  <Link to="/#">{this.props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {this.props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <Link to="/#">{this.props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{this.props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
           */}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withNamespaces()(SidebarContent))
);
