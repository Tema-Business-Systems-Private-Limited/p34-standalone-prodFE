import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';
import VersionLogTable from './Table/Table';

const VersionLogs = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <ToastContainer />
                <Container fluid>
                   <VersionLogTable/>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default VersionLogs;
