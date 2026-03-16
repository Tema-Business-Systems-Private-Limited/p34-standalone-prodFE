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
            <Modal.Header className='modal-header-bg' >
                <Modal.Title id="contained-modal-title-vcenter">
                   <span className='modal-header-bg'>ALERT</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-bg'>
                {this.props.errorMessage}
            </Modal.Body>
            <Modal.Footer className='bg-light'>
                <Button className='button-custom' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default Alert;