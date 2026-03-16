import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import {  ExternalDragDrop } from './DragAndDropTable/DragDrop';
class DriverShifts extends Component {
  render() {
    return (
      <>
        <React.Fragment>
        <div className="page-content">
          <ToastContainer />
          <Container fluid>
           <ExternalDragDrop/>
           {/* hello */}

          </Container>
        </div>
      </React.Fragment>
      </>
    );
  }
}

export default DriverShifts;
