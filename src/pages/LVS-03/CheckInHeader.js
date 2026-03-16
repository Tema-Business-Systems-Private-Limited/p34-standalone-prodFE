import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import Alert from './Alert';
import { Link } from "react-router-dom";
import { fetchRailCarAPI } from '../../service';
import Select from "./Components/Select";
import Confirm from './Confirm';
import { ToastContainer, toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Row, Col, Label, Container,Card, Input, Badge, CardHeader, CardTitle, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Button, FormGroup } from 'reactstrap'
import { ChevronDown, X} from 'react-feather'
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/material_green.css"
import "./checkIn.scss";

class CheckInHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sites : [],
        selectedSite : '',
        selectedRailCar : '',
        confirmMessage : '',
        addConfirmShow : false,
        addAlertShow: false,
        errorMessage: '',
        error: false,
        CheckInList : [],
        CheckOutList : [],
        CheckAvailList : [],
        CurrentCheckinRailCar : {},

    };
  }


   setCurrentRailCar = selectedOption => {
     var currentCheckin = {};
     this.props.railcarAvaillist && this.props.railcarAvaillist.map(activeRailcar => {
         if(activeRailcar.railcarid == selectedOption){

         currentCheckin = activeRailcar;
            console.log("matched railcar",activeRailcar);
            console.log("matched selectedoption",selectedOption);
         }

     });
      this.setState({
        selectedRailCar: selectedOption,
        CurrentCheckinRailCar : currentCheckin
      });
    }

    handleRailCarChange = selectedOption => {
          console.log("Trrr selected Railcar change",selectedOption);
          this.setCurrentRailCar(selectedOption);

       }

     onConfirmNo = () => {
            this.setState({
                addConfirmShow: false
            })
        }

        onConfirmYes = () => {
           this.props.OnCheckInClicked(this.state.CurrentCheckinRailCar);
            this.setState({
                addConfirmShow: false
            })
        }



    onCheckIn = () => {
        console.log("Trrr site value =",this.state.selectedSite);
        console.log("Trrr railcar value =",this.state.selectedRailCar);
       if(this.state.selectedRailCar === '') {
         this.setState({
                                 errorMessage: 'Please Select the RailCar, before CheckIn',
                                 addAlertShow: true,
                                 error: true
                             });
       }
       else {

        this.setState({
                          confirmMessage: 'Are you sure to CheckIN , selected RailCar',
                          addConfirmShow: true,

                      })

       }

    }


     OnSiteChanged = (event) => {
         console.log("inside onsite changed",event )
         this.props.handleSiteChange(event);

      };


      OnRailCarChanged = (event, newValue) => {
              console.log("newvalue =", newValue);
              if (newValue == null) {
                 }
               else {
               this.handleRailCarChange(newValue.railcarid);
               }
            }



  render() {

   let addAlertClose = () => this.setState({ addAlertShow: false });


    return (
  <div className="w-100">
        <Row>
          <Col sm='12'>
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4'>Load/UnLoad Vehicle Stock</CardTitle>

              </CardHeader>
              <Row className='justify-content-between mx-0'>
              <Col md='3' lg='3' className='mt-1 d-flex'>
                 <FormGroup>
                                   <Select
                                     id='site'
                                     classNamePrefix='select'
                                     placeholder='Select Site'
                                     data={this.props.sites}
                                     isClearable
                                     value={this.props.sites.filter((d) => d.value === this.state.selectedSite)}
                                     onSiteChange = {this.OnSiteChanged}
                                   />
                                 </FormGroup>
               </Col>
                <Col md='7' lg='6' className='mt-1'>
                               <FormGroup>
                                 <Input
                                   className='dataTable-filter mb-50'
                                   type='text'
                                   placeholder='Search'
                                   id='search-input'
                                   value={this.props.searchValue}
                                   onChange={this.props.handleFilter}
                                 />
                               </FormGroup>
                             </Col>
                 <Col md='2' lg='2' className='mt-1 d-flex'>
                  <Flatpickr
                                   value={this.props.fromDate}
                                   id='Date'
                                   className='form-control mb-50 mr-1'
                                   placeholder='Select Date'
                                   onChange={date => this.props.onDateChange(date)}


                                 />

                                 { this.props.toDate || this.props.fromDate || this.props.searchValue || this.props.selectedSite ?
                                    <div>
                                    <Button className='btn-icon mb-50' color='flat-danger' onClick={() => this.props.clearData}>
                                      <X size={22} color="red" />
                                    </Button>
                                    </div>
                                    : ''
                                    }

                  </Col>
              </Row>
            </Card>
            </Col>
          </Row>
       </div>

    );
  }
}

export default CheckInHeader;
