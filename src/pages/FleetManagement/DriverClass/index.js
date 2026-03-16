import React from 'react';
import NonAuthLayout from '../../../components/NonAuthLayout';
import { ToastContainer, toast } from "react-toastify";
import { Container } from 'reactstrap';
import DriverTable from './Components/DriverTable';


const VehicleClass = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <ToastContainer />
                <Container fluid>
                 <DriverTable/>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default VehicleClass;
