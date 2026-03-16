import React, { Component } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { Container } from 'reactstrap';
import RolesList from './components/RolesList';
class RolesPermissions extends Component {
    render() {
        return (
            <React.Fragment>
        <div className="page-content">
          <ToastContainer />
          <Container fluid>
            <RolesList/>
          </Container>
        </div>
      </React.Fragment>
        );
    }
}

export default RolesPermissions;
