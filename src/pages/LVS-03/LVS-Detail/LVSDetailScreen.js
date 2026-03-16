import React, { Component, useEffect, useState } from "react";
import { useTable } from 'react-table';
import { CardBody, Container } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import SelectSite from "../Components/SelectSite";
import CheckInHeader from '../CheckInHeader';
import MOCK_DATA from '../Lvs_Data.json';
import axios from "axios";
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, Table, FormGroup } from 'reactstrap'

import { fetchRailCarAPI } from '../../../service';

import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import "../checkIn.scss";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  convertSecToHr,
  splitTime,
  formatHrMin,
  nullAndNanChecking,
  formatTime,
  convertHrToSec,
  convertMinToSec,
  convertMinToHr,
} from '../converterFunctions/converterFunctions';
import { GitHub } from "@material-ui/icons";

class LVSDetailScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      sites: [],
      selectedSite: '',
      CheckInList: [],
      CheckOutList: [],
      CheckAvailList: [],
      columns: [
        {
          name: "LVS NUMBER",
          selector: "lvsno",
          sortable: true,
          minWidth: '220px',
          cell: row => {
            return (
              <Link to={`../pages/LVS/index${row.lvsno}`}>
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


        },
        {
          name: "VR NUMBER",
          selector: "vrno",

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

        },
        {
          name: "DRIVER",
          selector: "driverid",

        },
        {
          name: "VALIDATION",
          selector: "valflg",

        },


      ],
      columns1: [
        {
          name: "PRODUCT",
          selector: "product",
          sortable: true,
          minWidth: '150px',
          

        },

        {
          name: "DESCRIPTION",
          selector: "Desc",
          sortable: true,
          minWidth: '150px',

        },
        {
          name: "LOT",
          selector: "lot",
          sortable: true,
          minWidth: '150px',

        },
        {
          name: "LOCATION TYPE",
          selector: "locationType",
          sortable: true,
          minWidth: '150px',

        },
        {
          name: "LOCATION",
          selector: "location",
          sortable: true,
          minWidth: '150px',

        },
        
        {
          name: "QUANTITY",
          selector: "quantity",
          sortable: true,
          minWidth: '150px',
        },
        {
          name: "UNIT",
          selector: "units",
          sortable: true,
          minWidth: '150px',

        },
        {
          name: "STOCK UNIT",
          selector: "stockunits",
          sortable: true,
          minWidth: '150px',

        },
        {
          name: "STK QUANTITY",
          selector: "quantity",
          sortable: true,
          minWidth: '150px',
        },
        {
          name: "DEST LOCATION TYPE",
          selector: "DestlocationType",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "DEST LOCATION",
          selector: "Destlocation",
          sortable: true,
          minWidth: '150px',

        },
        
      ],
      
      columns2: [
        {
          name: "DELIVERY NUMBER",
          selector: "sdhnum",
          sortable: true,
          minWidth: '200px',
          

        },

        {
          name: "DLV/PCK",
          selector: "xdoctyp",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "SEQUENCE",
          selector: "sequence",
          sortable: true,
          minWidth: '150px',


        },
        {
          name: "ACTUAL SEQUENCE",
          selector: "sequence",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "TRANSPORTATION STATUS",
          selector: "xdlv_status",
          sortable: true,
          minWidth: '250px',

        },
        {
          name: "GROSS WEIGHT",
          selector: "growei",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "DOCUMENT SITE",
          selector: "xdocSite",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "NAME",
          selector: "bprnam",
          sortable: true,
          minWidth: '200px',

        },

        {
          name: "VOLUME",
          selector: "vol",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "ACTUAL QUANTITY",
          selector: "quantity",
          sortable: true,
          minWidth: '200px',
        },
        {
          name: "PLANNED QUANTITY",
          selector: "quantity",
          sortable: true,
          minWidth: '200px',
        },
        {
          name: "NO OF PACKAGES",
          selector: "quantity",
          sortable: true,
          minWidth: '200px',
        }, {
          name: "SHIP-TO",
          selector: "bpcord",
          sortable: true,
          minWidth: '200px',
        },
        {
          name: "COMPANY NAME",
          selector: "bprnam",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "City",
          selector: "cty",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "SCHEDULE/STOP STATUS",
          selector: "Pick",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "SCHEDULE ARRIVAL DATE",
          selector: "arrivedate",
          sortable: true,
          minWidth: '200px',
          cell: row => {
            return (
              moment(row.arrivedate).format('DD-MM-YYYY')
            )
          }

        },
        {
          name: "SCHEDULE ARRIVAL TIME",
          selector: "arvtime",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "SCHEDULE DEPARTURE DATE",
          selector: "departdate",
          sortable: true,
          minWidth: '250px',
          cell: row => {
            return (
              moment(row.departdate).format('DD-MM-YYYY')
            )
          }

        },
        {
          name: "SCHEDULE DEPARTURE TIME",
          selector: "departtime",
          sortable: true,
          minWidth: '250px',

        },
        {
          name: "REVISED DEPARTURE DATE",
          selector: "Pick",
          sortable: true,
          minWidth: '250px',
          cell: row => {
            return (
              moment(row.iptdate).format('DD-MM-YYYY')
            )
          }

        },
        {
          name: "REVISED DEPARTURE TIME",
          selector: "Pick",
          sortable: true,
          minWidth: '250px',

        },
        {
          name: "REVISED ARRIVAL DATE",
          selector: "Pick",
          sortable: true,
          minWidth: '250px',
          cell: row => {
            return (
              moment(row.iptdate).format('DD-MM-YYYY')
            )
          }

        },
        {
          name: "REVISED ARRIVAL TIME",
          selector: "Pick",
          sortable: true,
          minWidth: '250px',

        },
        {
          name: "ACTUAL DEPARTURE DATE",
          selector: "Pick",
          sortable: true,
          minWidth: '250px',
          cell: row => {
            return (
              moment(row.iptdate).format('DD-MM-YYYY')
            )
          }

        },
        {
          name: "ACTUAL DEPARTURE TIME",
          selector: "Pick",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "ACTUAL ARRIVAL DATE",
          selector: "Pick",
          sortable: true,
          minWidth: '200px',
          cell: row => {
            return (
              moment(row.iptdate).format('DD-MM-YYYY')
            )
          }

        },
        {
          name: "ACTUAL ARRIVAL TIME",
          selector: "Pick",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "WAITING TIME(Hrs)",
          selector: "ywaitTime",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "SERVICE TIME",
          selector: "servicetim",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "MAXIMUM STACK HEIGHT(Cm)",
          selector: "Pick",
          sortable: true,
          minWidth: '250px',

        },
        {
          name: "A DOCK",
          selector: "Pick",
          sortable: true,
          minWidth: '200px',
        },
        {
          name: "PURCHASE ORDER NUMBER",
          selector: "Pick",
          sortable: true,
          minWidth: '250px',

        },
        {
          name: "PRE-RECEIPT",
          selector: "Pick",
          sortable: true,
          minWidth: '200px',

        },

      ],

      columns3: [
        {
          name: "PRODUCT",
          selector: "product",
          sortable: true,
          minWidth: '100px',
          

        },

        {
          name: "DESCRIPTION 1",
          selector: "Desc",
          sortable: true,
          minWidth: '100px',

        },
        {
          name: "QUANTITY",
          selector: "quantity",
          sortable: true,
          minWidth: '100px',

        },
        {
          name: "SERIAL NUMBER",
          selector: "Serno",
          sortable: true,
          minWidth: '100px',

        },
        {
          name: "PICK UP/DROP",
          selector: "Pick",
          sortable: true,
          minWidth: '100px',

        },  
      ],
      columns4: [
        {
          name: "VR STATUS",
          selector: "vr",
          sortable: true,
          minWidth: '150px',
          

        },

        {
          name: "VEHICLE ROUTING",
          selector: "vehicle routng",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "DATE",
          selector: "date",
          sortable: true,
          minWidth: '150px',
          cell: row => {
            return (
              moment(row.date).format('DD-MM-YYYY')
            )
          }
        },
        {
          name: "TIME",
          selector: "time",
          sortable: true,
          minWidth: '150px',

        },
        {
          name: "RESONS",
          selector: "resons",
          sortable: true,
          minWidth: '150px',

        },
        {
          name: "LATITUDE",
          selector: "lat",
          sortable: true,
          minWidth: '150px',

        },
        {
          name: "LONGITUDE",
          selector: "long",
          sortable: true,
          minWidth: '150px',

        },
      ],
      columns5: [
        {
                  name: "PRODUCT",
                  selector: "product",
                  sortable: true,
                  minWidth: '200px',


                },
        {
          name: "SERIAL NUMBER",
          selector: "serno",
          sortable: true,
          minWidth: '200px',
          

        },

        {
          name: "PICK UP/DROP",
          selector: "pick",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "CHECK-IN SCS NUMBER",
          selector: "check scc_num",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "DROP SCS NUMBER",
          selector: "drop scc_num",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "PICK UP SCS NUMBER",
          selector: "pick scc_num",
          sortable: true,
          minWidth: '200px',

        },  
      ],
      columns6: [
        {
          name: "TYPE",
          selector: "product",
          sortable: true,
          minWidth: '200px',
          

        },

        {
          name: "PAYMENT MODE",
          selector: "Desc",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "PAID BY",
          selector: "",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "DRIVER AMOUNT",
          selector: "",
          sortable: true,
          minWidth: '200px',

        },
        {
          name: "AMOUNT",
          selector: "",
          sortable: true,
          minWidth: '200px',

        },  
      ],
      
      
    }


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

  dateFormatter = (cell, row) => {
    return
    console.log("inside dateformater", cell + '---' + row)
      (<span>{moment(cell).format("DD-MM-YYYY")}</span>)
  }


  TimeFormatter = (cell, row) => {
    return
    console.log("inside time formater", cell + '---' + row)
      (<span>{splitTime(cell)}</span>)
  }
  


  render() {

    console.log("inside RailcarcheckI list,", this.props.lvsList);
    const routeData = {
      columns: this.state.columns,
      rows: MOCK_DATA
    };



    return (
      
      <div>
        
        {/* <Card>
        <CardBody>
          <CheckInHeader
            sites={this.props.sites}
            handleSiteChange={this.handleSiteChange}
            OnCheckInClicked={this.OnCheckInClicked}

          />
          <DataTable
            noHeader
            pagination
            data={routeData.rows}
            columns={this.state.columns}
            paginationPerPage={10}
            className='react-dataTable'
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
          
        </CardBody>
      </Card> */}
      
      <div className="w-100">
        <Row>
          <Col sm="12">
            <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
            <CardTitle tag='h4' className="mb-0">LOAD VEHICLE STOCK </CardTitle>  
            </CardHeader>
            <CardBody>
              <Row className='mt-2'>
                <Col md='6'>
                  <FormGroup row>
                     <Label sm='5'>Source Of Site</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder={MOCK_DATA.fcy} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Stock Transaction Number</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder={MOCK_DATA.lvs} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Status</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder={MOCK_DATA.xloadflg} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Trailer</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder={MOCK_DATA.trailer} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Carrier</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder={MOCK_DATA.bptnum} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Application Source</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="Tms Web" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Description</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="Stock is available" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Vehicle Routing</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder={MOCK_DATA.xnumpc} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Departure Loading Bay</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Return Loading Bay</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
                  <Col md = "6">
                  <FormGroup row>
                     <Label sm='5'>Destination Site</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder={MOCK_DATA.fcy} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Loading Date</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder={MOCK_DATA.datliv} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Staging Status</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="Confirm" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Date VR</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="05/22/2023" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Trip</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="1" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Loading User</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="Loading" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>User Name</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="user name" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Freight Po#</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="Loading" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Status</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="Pending" disabled/>
                      </Col>
                  </FormGroup>
                  
                </Col>
              </Row>
            </CardBody>
            </Card>
          
          </Col>
        </Row>

      </div>
      <div>
      <Card>
        <CardHeader>
          <label>SPOT SALES STOCK</label>
        </CardHeader>
        <CardBody>
          <DataTable
            noHeader
            pagination
            data={MOCK_DATA.SpotSales}
            columns={this.state.columns1}
            paginationPerPage={4}
            className='react-dataTable'
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
          
        </CardBody>
      </Card>
      </div>
      <div>
      <Card>
      <CardHeader>
          <label>DOCUMENT DETAILS</label>
        </CardHeader>
        <CardBody>
          <DataTable
            noHeader
            pagination
            data={MOCK_DATA.DocumentDetails}
            columns={this.state.columns2}
            paginationPerPage={4}
            className='react-dataTable'
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
          
        </CardBody>
      </Card>
      </div>
      
      <div className="w-100">
        <Row>
          <Col sm="12">
            <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
            <CardTitle tag='h4' className="mb-0">Selection</CardTitle>  
            </CardHeader>
            <CardBody>
              <Row className='mt-2'>
                <Col md='6'>
                  <FormGroup row>
                     <Label sm='4'>Product</Label>
                      <Col sm='8'>
                        <Input type="search" placeholder="Searching For Product" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
                  <Col md = "6">
                  <FormGroup row>
                     <Label sm='4'>Source Location</Label>
                      <Col sm='8'>
                        <Input type="search" placeholder="Searching For Location" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
              </Row>
            </CardBody>
            </Card>
          
          </Col>
        </Row>

      </div>
      <div className="w-100">
        <Row>
          <Col sm="12">
            <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
            <CardTitle tag='h4' className="mb-0"> Vehicle Staff</CardTitle>  
            </CardHeader>
            <CardBody>
              <Row className='mt-2'>
                <Col md='6'>
                  <FormGroup row>
                     <Label sm='4'>Driver Id</Label>
                      <Col sm='8'>
                        <Input type="search" placeholder={MOCK_DATA.driverid} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='4'>Sales Man</Label>
                      <Col sm='8'>
                        <Input type="search" placeholder="" disabled/>
                      </Col>
                  </FormGroup>
                  
                  </Col>
                  <Col md = "6">
                  <FormGroup row>
                     <Label sm='4'>Operator</Label>
                      <Col sm='8'>
                        <Input type="search" placeholder="" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='4'>Technician</Label>
                      <Col sm='8'>
                        <Input type="search" placeholder="" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
              </Row>
            </CardBody>
            </Card>
          
          </Col>
        </Row>

      </div>
      <div className="w-100">
        <Row>
          <Col sm="12">
            <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
            <CardTitle tag='h4' className="mb-0">Capacites & Load</CardTitle>  
            </CardHeader>
            <CardBody>
              <Row className='mt-2'>
                <Col md='6'>
                  <FormGroup row>
                     <Label sm='5'>Vehicle Weight</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder={MOCK_DATA.CapacitesLoad.capacities} disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Minimum Weight Capacity</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Total Spot Sales Stock</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Vehicle Volume</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Total Schedule Stock</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
                  <Col md = "6">
                  <FormGroup row>
                     <Label sm='5'>Trailer weight</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="480.00" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Volume</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="50000.00" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>Total Available Capacity</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="60000.00" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>UN</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="Units" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='5'>%Loading</Label>
                      <Col sm='7'>
                        <Input type="search" placeholder="80.36" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
              </Row>
            </CardBody>
            </Card>
          
          </Col>
        </Row>

      </div>
      <div className="w-100">
        <Row>
          <Col sm="12">
            <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
            <CardTitle tag='h4' className="mb-0">Total Drops</CardTitle>  
            </CardHeader>
            <CardBody>
              <Row className='mt-2'>
                <Col md='4'>
                  <FormGroup row>
                     <Label sm='6'>Delivery Weight</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="100.02" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
                  <Col md = "4">
                  <FormGroup row>
                     <Label sm='6'>Volume Delivered</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="221.36" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
                  <Col md = "4">
                  <FormGroup row>
                     <Label sm='6'>Deliverd Package</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="336.10" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
              </Row>
            </CardBody>
            </Card>
          
          </Col>
        </Row>

      </div>
      <div className="w-100">
        <Row>
          <Col sm="12">
            <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
            <CardTitle tag='h4' className="mb-0">Total Collections</CardTitle>  
            </CardHeader>
            <CardBody>
              <Row className='mt-2'>
                <Col md='4'>
                  <FormGroup row>
                     <Label sm='6'>Weight Removed</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="1245.63" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
                  <Col md = "4">
                  <FormGroup row>
                     <Label sm='6'>Volume Removed</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="698.35" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
                  <Col md = "4">
                  <FormGroup row>
                     <Label sm='6'>Package Removed</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="298.35" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
              </Row>
            </CardBody>
            </Card>
          
          </Col>
        </Row>

      </div>
      <div>
      <Card>
      <CardHeader>
          <label>VEHICLE STOCK DETAILS</label>
        </CardHeader>
        <CardBody>
          <DataTable
            noHeader
            pagination
            data={MOCK_DATA.VehicleStockDetails}
            columns={this.state.columns3}
            paginationPerPage={4}
            className='react-dataTable'
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
         <div className="w-100">
        <Row>
          <Col sm="12">
            <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
            <CardTitle tag='h4' className="mb-0">Time Tracing</CardTitle>  
            </CardHeader>
            <CardBody>
              <Row className='mt-2'>
                <Col md='4'>
                  <FormGroup row>
                     <Label sm='6'>Scheduled Departure Date</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="06/06/2023" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='6'>Scheduled Departure Time</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="12:26" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='6'>Scheduled Return Date</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="26/06/2023" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='6'>Scheduled Return Time</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="02:34" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
                  <Col md='4'>
                  <FormGroup row>
                     <Label sm='6'>Revised Departure Date</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="06/06/2023" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='6'>Revised Departure Time</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="12:26" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='6'>Revised Return Date</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="26/06/2023" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='6'>Revised Return Time</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="02:34" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
                  <Col md='4'>
                  <FormGroup row>
                     <Label sm='6'>Actual Departure Date</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="06/06/2023" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='6'>Actual Departure Time</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="12:26" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='6'>Actual Return Date</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="26/06/2023" disabled/>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                     <Label sm='6'>Actual Return Time</Label>
                      <Col sm='6'>
                        <Input type="search" placeholder="02:34" disabled/>
                      </Col>
                  </FormGroup>
                  </Col>
                  
              </Row>
            </CardBody>
            </Card>
          
          </Col>
        </Row>

      </div> 
        </CardBody>
      </Card>
      </div>
      <div>
      <Card>
      <CardHeader>
          <label>DELIVERY ACTIVITY MONITORING</label>
        </CardHeader>
        <CardBody>
          <DataTable
            noHeader
            pagination
            data={MOCK_DATA.DriverActivityMonitoring}
            columns={this.state.columns4}
            paginationPerPage={4}
            className='react-dataTable'
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
          
        </CardBody>
      </Card>
      </div>
      <div>
      <Card>
      <CardHeader>
          <label>EQUIPMENT DETAILS</label>
        </CardHeader>
        <CardBody>
          <DataTable
            noHeader
            pagination
            data={MOCK_DATA.EquipmentDetails}
            columns={this.state.columns5}
            paginationPerPage={4}
            className='react-dataTable'
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
          
        </CardBody>
      </Card>
      </div>
      <div>
      <Card>
      <CardHeader>
          <label>USER COST CAPTURE</label>
        </CardHeader>
        <CardBody>
          <DataTable
            noHeader
            pagination
            data={MOCK_DATA.cost}
            columns={this.state.columns6}
            paginationPerPage={4}
            className='react-dataTable'
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
           <Col sm='8'></Col>
            <Col sm='4' className="mt-5">
                <FormGroup row>
                    <Label sm='4'><h6>TOTAL AMOUNT (Incl.TAX) </h6></Label>
                          <Col sm='8'>
                              <Input className='text-right' disabled/>
                          </Col>
                 </FormGroup>
            </Col>
        </CardBody>
      </Card>
      </div>
      
      </div>
      
      
      
    );
  }
}

export default LVSDetailScreen;
