import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AlertArray extends React.Component {

    render() {




    const errorMessagesArray = this.props.errorArrayMessage;

        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header className='modal-header-bg'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span className='text-white'>Exception List</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                 {errorMessagesArray.length > 0 ? (
                           errorMessagesArray.map((msg, index) => (
                             <div key={index} style={{ marginBottom: '10px' }}>{msg}</div>
                           ))
                         ) : (
                           <div>No errors found</div> // In case errorMessage is not an array
                         )}
            </Modal.Body>
            <Modal.Footer>
                <button className='button-custom' onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default AlertArray;