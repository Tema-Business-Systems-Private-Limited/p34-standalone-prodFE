import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';


class ConfirmDriver extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='modal-header-bg'>
                    <Modal.Title id="contained-modal-title-vcenter" className='text-white'>
                       CONFIRMATION
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <span style={{fontSize: "25px"}}>{this.props.confirmMessage}</span>
                </Modal.Body>
                <Modal.Footer>
                    {this.props.warning ? '' : <button className='button-custom' onClick={() => this.props.proceedwithDriver(this.props.trip)}>Yes</button>}
                    <button className='button-custom' onClick={this.props.onHideDriver}>No</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withNamespaces()(ConfirmDriver);