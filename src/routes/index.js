import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

//Trailer Report

import TrailerReport from "../pages/TrailerReport/index";

import DriverReport from "../pages/DriverReport/index";

import UserManagement from "../pages/UserManagement/index";

import DriversHOS from "../pages/DriverHOS/index";





// Dashboard
import Dashboard from "../pages/Dashboard/index";
import RouteDetail from "../pages/Dashboard/RouteDetail";

import { useParams } from 'react-router-dom';

// list of LVS

import LVS4 from "../pages/LVS-03/index";
import LVS4Detail from "../pages/LVS-03/LVS-Detail/tabIndex";


// Pages Map
import Map from "../pages/Map-View/Map";

// Reports
import Reports from "../pages/Reports";

//RailCar
import RailCar from "../pages/RailCarBound/index";
import RailCarCheckIn from "../pages/RailCarBound/CheckIn/RailCarCheckIn";
import RailCarCheckOut from "../pages/RailCarBound/CheckOut/RailCarCheckOut";



// Group 2

import PTremoval from "../pages/PT-Group02/PT-Deletion/index";
import PTaddition from "../pages/PT-Group02/PT-Addition/index";
import PTadditionRouteDetails from "../pages/PT-Group02/PT-Addition/RouteDetails";


//users
import Users from '../pages/Users/index';
import CreateUser from '../pages/Users/create';



//WTA calendar
import WCalendar from '../pages/WCalendar/index';
import Sampletext from '../pages/WCalendar/sampletext';
import WMap from '../pages/WMap/index';


//WTA Maps
import WMaps from '../pages/WMap/App'


//Scheduler
import Scheduler2 from "../pages/Scheduler2/index";


// LIVE traker
import MapTracker from '../pages/MapLiveTracker/MapView/index'

import VehicleManagement1 from "../pages/VehicleManagement/index";
import VehicleClass1 from "../pages/VehicleClass/index.js";
import TrailerManagement1 from "../pages/TrailerManagement/index.js";
import DriverManagement1 from "../pages/FleetDriverManagement/index.js"
import VehicleAllocation from "../pages/VehicleAllocation/index.js"
import TrailerType from "../pages/TrailerType/index.js"
//Appointment
import Appointments from "../pages/SchedulerAppointments/index";

//Utility
import StarterPage from "../pages/Utility/StarterPage";
import Maintenance from "../pages/Utility/Maintenance";
import CommingSoon from "../pages/Utility/CommingSoon";
import Timeline from "../pages/Utility/Timeline";
import FAQs from "../pages/Utility/FAQs";
import Pricing from "../pages/Utility/Pricing";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";




// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import VehicleManagement from "../pages/FleetManagement/VehicleManagement";
import VehicleDetails from "../pages/FleetManagement/VehicleManagement/VehicleDetails";
import AddNewVehicle from "../pages/FleetManagement/VehicleManagement/AddNewVehicle.js";

import DriverShifts from "../pages/DriverManagement/DriverShift";
import DriverReports from "../pages/DriverManagement/Report";
import ShiftAssignment from "../pages/DriverManagement/ShiftAssignment";
import Unavailability from "../pages/DriverManagement/Unavailability";
import VersionLogs from "../pages/VersionLogs";
import VehicleClass from "../pages/FleetManagement/DriverClass/index.js";
import VehicleClassDetails from "../pages/FleetManagement/DriverClass/VehicleClassDetails.js";
import VehicleClassAssociation from "../pages/FleetManagement/VehicleClassAssociation/index.js";
import VehicleClassAssociationDetails from "../pages/FleetManagement/VehicleClassAssociation/VehicleClassAssociationDetails.js";
import VehicleAssociationAdd from "../pages/FleetManagement/VehicleClassAssociation/VehicleAssociationAdd.js";
import VehicleClassAdd from "../pages/FleetManagement/DriverClass/VehicleClassAdd.js";
import Error401 from "../pages/Utility/Error401";
// sync data module
import syncData from "pages/SyncData";
import SiteList from "pages/SyncData/components/SiteList";
import SiteDetail from "pages/SyncData/components/SiteDetail";
// Roles and Permissions
import RolesPermissions from "pages/RolesPermissions";
import CreateEditRole from "pages/RolesPermissions/components/CreateEditRole";
import SiteConfiguration from "pages/SiteConfiguration";
import Supplier from "pages/Supplier";
import Customer from "pages/Customer";
import Product from "pages/Product";
import MisecellaneousStop from "pages/MiscellaneousStop";
import ProductCategories from "pages/ProductCategories";
import DocumentConfiguration from "pages/DocumentConfiguration";
import RouteCancellation from "pages/RouteCancellation";
import Prerecipt from "pages/Prerecipts";
import SalesOrder from "pages/SalesOrder";
import { path } from "d3";

let user = JSON.parse(localStorage.getItem("authUser"));
// if (user) {
//   user.rpflag = true
//   user.schflag = true
//   user.removpckt = true
//   user.addpckt = true
//   user.appointment = true
//   user.railcaroutbond = true
//   user.fleetm = true
//   user.driverm = true
//   user.calendar = true
//   user.maps = true
//   user.reports = true
//   user.versionlo = true
//   console.log(user, "this is user from routes index")
// }


const authProtectedRoutes = [
  //Kanban Board
  //Utility
  { path: "/pages-starter", component: StarterPage },
  { path: "/pages-timeline", component: Timeline },
  { path: "/pages-faqs", component: FAQs },
  { path: "/pages-pricing", component: Pricing },
  //Reports
  { path: "/reports/tms-calendar", component: Reports },
  { path: "/reports/tms-planning", component: Reports },
  { path: "/reports/delivery-preparation", component: Reports },
  { path: "/reports/route-list", component: Reports },
  { path: "/reports/pod-tracking", component: Reports },
  { path: "/reports/kpi-global", component: Reports },
  { path: "/reports/kpi-site-vehicle", component: Reports },
  { path: "/reports/kpi-vehicle", component: Reports },
  { path: "/reports/kpi-site", component: Reports },
  { path: "/reports/trackInventory", component: Reports },



  { path: "/Users/create", component: CreateUser },
  { path: "/Users", component: Users },



  // { path: "/dashboard", component: Dashboard },

  { path: "/usermgmt", component: UserManagement },

  // Fleet Management
  { path: "/vehicle/add-new-vehicle", component: AddNewVehicle },
  { path: "/vehiclemanagement/vehicleclass", component: VehicleClass },
  { path: "/vehicleclass/add", component: VehicleClassAdd },

  { path: "/vehiclemanagement/vehicleclassAssociation", component: VehicleClassAssociation },
  { path: "/fvehicle", component: VehicleManagement1 },
  { path: "/fvehicleclass", component: VehicleClass1 },
  { path: "/ftrailer", component: TrailerManagement1 },
  { path: "/fdriver", component: DriverManagement1 },
  { path: "/fallocation", component: VehicleAllocation },
  { path: "/trailertype", component: TrailerType },
  { path: "/classcode/:classCode", component: VehicleClassDetails },
  { path: "/vehicleclassassociation/add", component: VehicleAssociationAdd },
  { path: "/vehicleclassassociation/:classcode", component: VehicleClassAssociationDetails },






  { path: "/vehiclemanagement/addvehicle", component: AddNewVehicle },
  { path: "/vehiclemanagement", component: VehicleManagement },

  { path: "/vehicle/:vehicleId", component: VehicleDetails },


  { path: "/drivermanagement/driver-shifts", component: DriverShifts },
  { path: "/drivermanagement/driver-report", component: DriverReports },
  { path: "/drivermanagement/shift-creation", component: ShiftAssignment },
  { path: "/drivermanagement/unavailability", component: Unavailability },

  // version logs
  { path: "/versionlogs", component: VersionLogs },

  // RailCar
  { path: "/railcar/buildload", component: RailCar },
  { path: "/railcar/checkin", component: RailCarCheckIn },
  { path: "/railcar/checkout", component: RailCarCheckOut },

  //delviery Automations
  { path: "/operation/lvslist", exact: true, component: LVS4 },
  { path: "/operation/lvsdetail/:id", component: LVS4Detail },


  // Group 2
  { path: "/AddOn/removePCKT", component: PTremoval },
  { path: "/AddOn/AddPCKT", component: PTaddition },
  { path: "/showRouteDetails/:id", component: PTadditionRouteDetails },


  //users
  { path: "/user", component: Users },

  { path: "/route-details", component: RouteDetail },

  //Maps and calendars
  { path: "/calendar", component: WCalendar },
  { path: "/wcalendar/sampletext", component: Sampletext },
  { path: "/maps", component: WMap },
 

  // live tracker
  { path: '/maplive', component: MapTracker },


  //Scheduler
  { path: "/scheduler2", component: Scheduler2 },


  //Trailer Report
  { path: "/trailerreport", component: TrailerReport },
  { path: "/driverreport", component: DriverReport },

  { path: "/driverhos", component: DriversHOS },

  // Sync Data
  { path: "/syncdata/site/:siteId", component: SiteDetail },
  { path: "/syncdata/site", component: SiteList },
  { path: "/syncdata", component: syncData },


  { path: "/siteconfiguration", component: SiteConfiguration },
  { path: "/supplier", component: Supplier },
  { path: "/customer", component: Customer },
  { path: "/product", component: Product },
  { path: "/miscellaneous", component: MisecellaneousStop },
  { path: "/productcategories", component: ProductCategories },
  { path: "/documentconfiguration", component: DocumentConfiguration },
  { path: "/routecancellation", component: RouteCancellation },
  { path: "/prerecipt", component: Prerecipt },
   { path: "/salesorder", component: SalesOrder },

  //Roles and Permissions
  { path: "/rolespermissions/edit/:roleId", component: CreateEditRole },
  { path: "/rolespermissions/create", component: CreateEditRole },
  { path: "/rolespermissions", component: RolesPermissions },





  //Appointment
  { path: "/appointment", component: Appointments },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/fvehicle" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/auth-lock-screen", component: AuthLockScreen },



  // Authentication Inner
  { path: "/auth-login", component: Login1 },
  { path: "/auth-register", component: Register1 },
  { path: "/auth-recoverpw", component: ForgetPwd1 },

  { path: "/pages-maintenance", component: Maintenance },
  { path: "/pages-comingsoon", component: CommingSoon },
  { path: "/pages-404", component: Error404 },
  { path: "/pages-500", component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
