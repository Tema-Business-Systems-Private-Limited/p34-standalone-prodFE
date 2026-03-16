import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Alert extends React.Component {

    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header style={{ backgroundColor: "#F2DEDE", color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <Modal.Title id="contained-modal-title-vcenter" style={{ flex: 1 }}>
                     <div style={{ color: 'black', textAlign: 'left', fontSize: "20px" }}>{this.props.errorMessage}</div>
                   </Modal.Title>
                 </Modal.Header>
             <Modal.Footer style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <button className='button-custom' onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default Alert;