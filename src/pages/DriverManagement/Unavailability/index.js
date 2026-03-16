import React, { Component } from "react";
import UnavailabilityForm from "./template";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import { ToastContainer } from "react-toastify";

class Unavailability extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <ToastContainer />
          <Container fluid>
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <Row
                      style={{
                        backgroundColor: "currentcolor",
                        height: "50px",
                      }}
                    >
                      <Col md="6" className="d-flex align-items-center">
                        <CardTitle
                          className="h1 mb-0 "
                          style={{ color: "white" }}
                        >
                          Unavailability
                        </CardTitle>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        borderLeft: "2px solid blue",
                        borderRight: "2px solid blue",
                        borderBottom: "2px solid blue",
                      }}
                    >
                      <Col md={12}>
                        <UnavailabilityForm />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Unavailability;
