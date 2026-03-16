
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import { HiInformationCircle, HiExclamation, HiCheck, HiX } from 'react-icons/hi';


class ValidateConfirm extends React.Component {
    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header style={{ backgroundColor: "#AFE1AF", color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                         <Modal.Title id="contained-modal-title-vcenter" style={{ flex: 1 }}>
                                           <div style={{ color: 'black', textAlign: 'left', fontSize: "28px" }}>{this.props.confirmMessage}</div>
                                         </Modal.Title>
                                       </Modal.Header>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                {this.props.lock ?'' : <Button variant="success" onClick={() => this.props.validateConfirm(this.props.index)} ><HiCheck className="mr-2" /><span>Confirm</span></Button>}
                <Button variant="secondary" onClick={this.props.onHide}><HiX className="mr-2" /> <span>{this.props.lock ? 'Close' : 'Close'}</span></Button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default withNamespaces()(ValidateConfirm);