import React from 'react';
import {Modal, Button} from 'react-bootstrap';


class LockConfirm extends React.Component {
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
                <span className='modal-header-bg'>{this.props.lock ? 'WARNING' : 'CONFIRMATION'}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-bg'>
                {this.props.confirmMessage}
            </Modal.Body>
            <Modal.Footer className='bg-light'>
                {this.props.lock ? '' : <Button className='button-custom' onClick={() => this.props.lockConfirm(this.props.index)}>Yes</Button>}
                <Button className='button-custom' onClick={this.props.onHide}>{this.props.lock ? 'Close' : 'No'}</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default LockConfirm;