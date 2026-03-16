import React from 'react';
import {Modal, Button} from 'react-bootstrap';


class OptimiseConfirm extends React.Component {
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
                <span className='modal-header-bg'>CONFIRMATION</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-bg'>
                {this.props.confirmMessage}
            </Modal.Body>
            <Modal.Footer className='bg-light'>
                <Button className='button-custom' onClick={() => this.props.optimiseConfirm(this.props.index)} >Yes</Button>
                <Button className='button-custom' onClick={this.props.onHideOptimiseWin}>No</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default OptimiseConfirm;