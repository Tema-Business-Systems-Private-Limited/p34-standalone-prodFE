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
                    <span className='modal-header-bg'>{this.props.warning ? 'AVERTISSEMENT' : 'CONFIRMATION'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body-bg'>
                    {this.props.confirmMessage}
                </Modal.Body>
                <Modal.Footer className='bg-light'>
                    {this.props.warning ? '' : <Button className='button-custom' onClick={() => this.props.confirmTrip(this.props.trip)}>{'Yes'}</Button>}
                    <Button className='button-custom' onClick={this.props.onHide}>{this.props.warning ? 'OK' : 'No'}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Confirm;