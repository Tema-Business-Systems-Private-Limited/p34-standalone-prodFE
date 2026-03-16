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
         <Card>
           <CardBody>
                <Col sm='12'>
                  <DataTable
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
                </Col>
           </CardBody>
        </Card>



      </div>



    );
  }
}

export default LVSDetailScreen;
