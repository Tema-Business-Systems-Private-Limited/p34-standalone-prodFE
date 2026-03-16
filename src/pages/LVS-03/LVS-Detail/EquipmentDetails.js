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
         <Card>

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



    );
  }
}

export default LVSDetailScreen;
