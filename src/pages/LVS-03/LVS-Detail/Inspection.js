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
      columns5: [
              {
                        name: "List of Questions",
                        selector: "product",
                        sortable: true,
                        minWidth: '200px',


                      },
              {
                name: "List of Responses",
                selector: "serno",
                sortable: true,
                minWidth: '200px',
              },
            ],
    }
  }



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
<Col sm="12">
               <Card>
               <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
               <CardTitle tag='h4' className="mb-0">Inspection CheckIn</CardTitle>
               </CardHeader>
               <CardBody>
                 <Row className='mt-2'>
                   <Col md='4'>
                     <FormGroup row>
                        <Label sm='6'>Questionaries ID</Label>
                         <Col sm='6'>
                           <Input type="search" placeholder="INS023060003" disabled/>
                         </Col>
                     </FormGroup>
                     </Col>
                     <Col md = "4">
                     <FormGroup row>
                        <Label sm='6'>Description</Label>
                         <Col sm='6'>
                           <Input type="search" placeholder="Inspection" disabled/>
                         </Col>
                     </FormGroup>
                     </Col>
                     <Col md = "4">
                     <FormGroup row>
                        <Label sm='6'>Latitude</Label>
                         <Col sm='6'>
                           <Input type="search" placeholder="" disabled/>
                         </Col>
                     </FormGroup>
                     </Col>
                     <Col md = "4">
                                          <FormGroup row>
                                             <Label sm='6'>Longitude</Label>
                                              <Col sm='6'>
                                                <Input type="search" placeholder="" disabled/>
                                              </Col>
                                          </FormGroup>
                                          </Col>
                     <Col md = "8">
                                                               <FormGroup row>
                                                                  <Label sm='3'>Driver Comments</Label>
                                                                   <Col sm='9'>
                                                                     <Input type="search" placeholder="" disabled/>
                                                                   </Col>
                                                               </FormGroup>
                                                               </Col>
                 </Row>
               <Row>
                       <DataTable
                                  noHeader
                                  pagination
                                  data={MOCK_DATA.EquipmentDetails}
                                  columns={this.state.columns5}
                                  paginationPerPage={5}
                                  className='react-dataTable'
                                />

               </Row>
               </CardBody>
               </Card>

             </Col>


<Col sm="12">
               <Card>
               <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
               <CardTitle tag='h4' className="mb-0">Inspection CheckOut</CardTitle>
               </CardHeader>
               <CardBody>
                 <Row className='mt-2'>
                   <Col md='4'>
                     <FormGroup row>
                        <Label sm='6'>Questionaries ID</Label>
                         <Col sm='6'>
                           <Input type="search" placeholder="INS023060003" disabled/>
                         </Col>
                     </FormGroup>
                     </Col>
                     <Col md = "4">
                     <FormGroup row>
                        <Label sm='6'>Description</Label>
                         <Col sm='6'>
                           <Input type="search" placeholder="Inspection" disabled/>
                         </Col>
                     </FormGroup>
                     </Col>
                     <Col md = "4">
                     <FormGroup row>
                        <Label sm='6'>Latitude</Label>
                         <Col sm='6'>
                           <Input type="search" placeholder="" disabled/>
                         </Col>
                     </FormGroup>
                     </Col>
                     <Col md = "4">
                                          <FormGroup row>
                                             <Label sm='6'>Longitude</Label>
                                              <Col sm='6'>
                                                <Input type="search" placeholder="" disabled/>
                                              </Col>
                                          </FormGroup>
                                          </Col>
                     <Col md = "8">
                                                               <FormGroup row>
                                                                  <Label sm='3'>Driver Comments</Label>
                                                                   <Col sm='9'>
                                                                     <Input type="search" placeholder="" disabled/>
                                                                   </Col>
                                                               </FormGroup>
                                                               </Col>
                 </Row>
               <Row>
                       <DataTable
                                  noHeader
                                  pagination
                                  data={MOCK_DATA.EquipmentDetails}
                                  columns={this.state.columns5}
                                  paginationPerPage={5}
                                  className='react-dataTable'
                                />

               </Row>
               </CardBody>
               </Card>

             </Col>



      </div>



    );
  }
}

export default LVSDetailScreen;
