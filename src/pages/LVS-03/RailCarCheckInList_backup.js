import React, { Component } from "react";
import {  CardBody, Container } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import SelectSite from "./Components/SelectSite";
import CheckInHeader  from './CheckInHeader';
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, Table, FormGroup } from 'reactstrap'
import DriverImg from './driver_lvs.png'
import TruckImg from './truck01.png'
import { fetchRailCarAPI } from '../../service';

import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import "./checkIn.scss";
import {
    convertSecToHr,
    splitTime,
    formatHrMin,
    nullAndNanChecking,
    formatTime,
    convertHrToSec,
    convertMinToSec,
    convertMinToHr,
} from './converterFunctions/converterFunctions';

class RailCarCheckInList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sites : [],
        selectedSite : '',
        CheckInList : [],
        CheckOutList : [],
        CheckAvailList : [],
         columns: [
                 {
                   name: "LVS NUMBER",
                   selector: "lvsno",
                    sortable: true,
                         minWidth: '220px',
                         cell: row => {
                           return (
                             <Link to={`/operation/lvsdetail/${row.vrno}`}>
                               {row.lvsno}
                             </Link>
                           )
                         }

                 },
                   {
                      name: "SCHEDULED DATE",
                                    selector: "iptdate",
                                     cell: row => {
                                                                                                                      return (
                                                                                                                        moment(row.iptdate).format('DD-MM-YYYY')
                                                                                                                      )
                                                                                                                    }
                                  },
                   {
                                                                          name: "STATUS",
                                                                          selector: "loadflg",
                                                                           sortable: true,
                                                                           minWidth: '150px',
                                                                           cell: row => {
                                                                                   return (
                                                                                     <Badge color={this.dlvStatus[row.loadflg].color} pill>
                                                                                       {this.dlvStatus[row.loadflg].title}
                                                                                     </Badge>
                                                                                   )
                                                                                 }


                                                                        },
                 {
                   name: "VR NUMBER",
                   selector: "vrno",
                   minWidth: '200px',

                 },
                 {
                   name: "SITE",
                   selector: "fcy",

                 },
                 {
                   name: "VR DATE",
                   selector: "vrdate",
                       cell: row => {
                                                                                                                                         return (
                                                                                                                                           moment(row.iptdate).format('DD-MM-YYYY')
                                                                                                                                         )
                                                                                                                                       }
                 },
                  {
                                    name: "VEHICLE",
                                    selector: "vehicle",
                                     cell: row => {
                                                                                                                                                            return (
                                                                                                                                                              <span>
                                                                                                                                                                <img src={TruckImg} />
                                                                                                                                                                {row.vehicle}
                                                                                                                                                              </span>
                                                                                                                                                            )
                                                                                                                                                          }


                                  },
                   {
                                     name: "DRIVER",
                                     selector: "driver",
                                       cell: row => {
                                                                                                                        return (
                                                                                                                          <span>
                                                                                                                            <img src={DriverImg} />
                                                                                                                             {row.driver}
                                                                                                                          </span>
                                                                                                                        )
                                                                                                                      }

                                   },
                    {
                                                        name: "VALIDATION",
                                                        selector: "valflg",

                                                         sortable: true,
                                                                                                                                   minWidth: '150px',
                                                                                                                                   cell: row => {
                                                                                                                                           return (
                                                                                                                                             <Badge color={this.validatedstatus[row.valflg].color} pill>
                                                                                                                                               {this.validatedstatus[row.valflg].title}
                                                                                                                                             </Badge>
                                                                                                                                           )
                                                                                                                                         }

                                                      },


                 ],
    }


    }


    validatedstatus = {
      1: { title: 'NOT VALIDATED', color: 'warning' },
      2: { title: 'VALIDATED', color: 'success' }
    }

    dlvStatus = {
    1: { title: 'TO LOAD', color: 'info' },
    2: { title: 'TO LOAD', color: 'info' },
    3: { title: 'Loaded  to Truck/Trailer', color: 'success' },
    4: { title: 'CONFIRMED', color: 'warning' },
    5: { title: 'TRIP COMPLETED', color: 'success' },
    6: { title: 'UNLOADED', color: 'success' },
    7: { title: 'CHECKED OUT', color: 'danger' },
    8: { title: 'ALL', color: 'warning' },
    9: { title: 'CHECKED-IN', color: 'success' },
    10: { title: 'CHECKED-OUT', color: 'success' },
    11: { title: 'CANCEL', color: 'danger' },
    12: { title: 'ROUTE-IN PROGRESS', color: 'warning' },
    13: { title: 'LOADING TO STAGING', color: 'warning' },
    14: { title: 'LOADING TO TRUCK', color: 'warning' }

  }

/*
   status  = (sta) =>  {

        1: return { title: 'Scheduled', color: 'light-info' },
        2: return { title: 'On the way', color: 'light-primary' },
        3: return { title: 'In-Progress', color: 'light-primary' },
        4: return { title: 'Completed', color: 'light-success' },
        5: return { title: 'Skipped', color: 'light-warning' },
        6: return { title: 'Re-Scheduled', color: 'light-warning' },
        7: return { title: 'Cancelled', color: 'light-danger' },
        8: return { title: 'To-Plan', color: 'light-dark' }
      }
      */

 dateFormatter = (cell, row)  =>
 { return
    console.log("inside dateformater",cell +'---'+row)
    ( <span>{moment(cell).format("DD-MM-YYYY")}</span> )
 }


 TimeFormatter = (cell, row)  =>
 { return
    console.log("inside time formater",cell +'---'+row)
    ( <span>{splitTime(cell)}</span> )
 }


  render() {

   console.log("inside RailcarcheckI list,",this.props.lvsList);
    const routeData = {
      columns : this.state.columns,
      rows: this.props.lvsList
    };

    return (
                <Card>
                  <CardBody>
                    <CheckInHeader
                                         sites = {this.props.sites}
                                         handleSiteChange={this.props.handleSiteChange}
                                         OnCheckInClicked= {this.OnCheckInClicked}
                                         searchValue = {this.props.searchValue}
                                         handleFilter = {this.props.handleFilter}
                                         clearData = {this.props.clearData}
                                         onDateChange = {this.props.onDateChange}

                                       />

                                         <hr className="my-2" />

                    <DataTable
                                 noHeader
                                 pagination
                                 data={routeData.rows}
                                 columns={this.state.columns}
                                 paginationPerPage={15}
                                 className='react-dataTable'
                                  paginationRowsPerPageOptions={[15, 30, 60, 120]}
                               />
                  </CardBody>
                </Card>
    );
  }
}

export default RailCarCheckInList;
