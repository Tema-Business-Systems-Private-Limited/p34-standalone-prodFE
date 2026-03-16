import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';


class DeleteConfirm extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                // style={{zIndex: 100000000}}
                container={document.fullscreenElement || document.body}
            >
                <Modal.Header style={{ backgroundColor: "#AFE1AF", color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ flex: 1 }}>
                        <div style={{ color: 'black', textAlign: 'left', fontSize: "28px" }}>{this.props.confirmMessage}</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <button variant="success" className="button-custom" onClick={() => this.props.confirmDelete(this.props.index, this.props.docnum)}>{this.props.t('Yes')}</button>
                    <button className='button-custom' onClick={this.props.onHide}>{this.props.t('No')}</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withNamespaces()(DeleteConfirm);