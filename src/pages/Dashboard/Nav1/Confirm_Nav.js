import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';


class Confirm extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='modal-header-bg'>
                    <Modal.Title id="contained-modal-title-vcenter">
                     <span className='text-white'>CONFIRMATION</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.confirmMessage}
                </Modal.Body>
                <Modal.Footer>
                    <button className='button-custom' onClick={() => this.props.confirmYes(this.props.messageType)}>Yes</button>
                    <button className='button-custom' onClick={this.props.onHide}>No</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Confirm;