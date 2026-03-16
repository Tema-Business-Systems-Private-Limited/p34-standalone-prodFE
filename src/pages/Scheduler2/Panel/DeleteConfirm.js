import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';


class DeleteConfirm extends React.Component {
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
                <span className='modal-header-bg'>CONFIRMATION</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-bg'>
                {this.props.confirmMessage} <span className='font-weight-bold'>({this.props.tripcode ? this.props.tripcode : this.props.docnum})</span>
            </Modal.Body>
            <Modal.Footer className='bg-light'>
                <Button className='button-custom' onClick={() => this.props.confirmDelete(this.props.index, this.props.docnum)}>{'Yes'}</Button>
                <Button className='button-custom' onClick={this.props.onHide}>{'No'}</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default  withNamespaces()(DeleteConfirm);