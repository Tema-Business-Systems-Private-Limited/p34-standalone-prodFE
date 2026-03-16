import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';


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
                    <Modal.Title id="contained-modal-title-vcenter" className='text-white'>
                        {this.props.warning ? 'Warning' : 'CONFIRMATION'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <span style={{fontSize: "25px"}}>{this.props.confirmMessage}</span>
                </Modal.Body>
                <Modal.Footer>
                    {this.props.warning ? '' : <button className='button-custom' onClick={() => this.props.confirmTrip(this.props.trip)}>{this.props.t('Yes')}</button>}
                    <button className='button-custom' onClick={this.props.onHide}>{this.props.warning ? 'OK' : this.props.t('No')}</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withNamespaces()(Confirm);