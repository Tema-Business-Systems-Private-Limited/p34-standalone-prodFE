import React from 'react';
import NonAuthLayout from '../../../components/NonAuthLayout';
import { ToastContainer, toast } from "react-toastify";
import { Container } from 'reactstrap';
import DriverAssociationTable from './Components/DriverAssociationTable';



const VehicleClassAssociation = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <ToastContainer />
                <Container fluid>
               <DriverAssociationTable/>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default VehicleClassAssociation;
