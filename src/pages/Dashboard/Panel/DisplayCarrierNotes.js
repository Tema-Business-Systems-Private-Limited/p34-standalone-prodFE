import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';

class DisplayCarrierNotes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.windowOffset  = 0
    }

    handleChange = (event)  => {
        this.setState({
            notes: event.target.value

         });
    }

    render() {
        console.log("insdie Displaycarrier",this.props.type);
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header className='modal-header-bg'>
                <Modal.Title id="contained-modal-title-vcenter">
                   <span className='text-white'> Message</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                    <textarea name="notes" rows="10" className="form-control"
                        onChange={(event) => this.handleChange(event) }
                    >
                        {this.props.notes}
                    </textarea>

            </Modal.Body>
            <Modal.Footer>
                <button className='button-custom-green' onClick={() => this.props.onSaveCarrierNotes(this.state.notes , this.props.type )}>{this.props.t('Save')}</button>
                <button className='button-custom' onClick={this.props.onHide}>{this.props.t('Close')}</button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default withNamespaces()(DisplayCarrierNotes);