import React, { Component } from 'react';
import NonAuthLayout from '../../../components/NonAuthLayout';
import { ToastContainer, toast } from "react-toastify";
import { Container } from 'reactstrap';
import VehicleManagementComp from '../TableComponent/VehicleManagementComp';
class VehicleManagement extends Component {
    render() {
        return (
            <React.Fragment>
        <div className="page-content">
          <ToastContainer />
          <Container fluid>
            
      <VehicleManagementComp/>
          </Container>
        </div>
      </React.Fragment>
        );
    }
}

export default VehicleManagement;
