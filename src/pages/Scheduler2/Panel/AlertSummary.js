import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AlertSummary extends React.Component {

    render() {




    const errorMessagesArray = this.props.errorArrayMessage;
 const errorSummartMessage = this.props.errorSummartMessage;
 console.log("TTT temp error display", errorMessagesArray);
        return (
            <Modal
            {...this.props}
            size="lg"
            fullscreen="lg-down"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header className='modal-header-bg'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span className='text-white'>Summary</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorSummartMessage.length > 0 ? (
                                          errorSummartMessage.map((msg, index) => (
                                            <div key={index} style={{ marginBottom: '10px', fontSize : "20px" }}>{msg}</div>
                                          ))
                                        ) : (
                                          <div></div> // In case errorMessage is not an array
                                        )}

             <div style={{ color : "black", fontSize : "18px",fontWeight : "bolder", marginTop : "30px" }}>Exception List</div>
            <hr />

                 {errorMessagesArray.length > 0 ? (
                           errorMessagesArray.map((msg, index) => (
                             <div key={index} style={{fontSize : "16px", marginBottom: '10px', whiteSpace: 'pre-line', }}>{msg}</div>
                           ))
                         ) : (
                           <div>No exceptions found</div> // In case errorMessage is not an array
                         )}
            </Modal.Body>
            <Modal.Footer>
                <button className='button-custom' onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
            </Modal>
        );
    }
}

export default AlertSummary;