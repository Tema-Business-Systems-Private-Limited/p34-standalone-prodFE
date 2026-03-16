import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import DriversList from "./DriversList";
import DriverDetails from "./DriverDetails";
import { fetchGetDrivers, fetchGetDriverDetails } from '../../service';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle
  } from "reactstrap";

class Drivers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      drivers: [],
      driverDetails: [],
      showDrivers: "block",
      showDriverDetails: "none",
      title: "Hours of Service Report"
    };
  }

  componentDidMount() {
    // Set loader to true before fetching
    this.setState({
        loader: true
    });

    // Fetch data and handle the response
    fetchGetDrivers()
        .then(([res1]) => {
            // Once data is received, update the state
            this.setState({
            drivers: res1,
            loader: false
            });
        })
    .catch((error) => {
        // Handle any errors, and ensure loader is set to false
        console.error('Error fetching data:', error);
        this.setState({
            drivers: [
                { driverId: "1", driverName: "Wed, Jan 16", driverStatus: "0:24:36", timeInStatus: "0:19:22", vechicleName: "0:00:00", timeBreak: "1.5 mi E San Francisco, CA", driverRemaining: "1.2 mi ESE San Francisco, CA", shiftRemaining: "None", cycleRemaining: "None", cycleTomorrow: "None", driverViolationToday: "None", driverViolationCycle: "None" }
              ],
            loader: false
        });
    });
  }

  getDriverDetails = (driver) => {
      this.setState({
        loader: true,
        showDrivers: "none",
        showDriverDetails: "block",
        title: "Hours of Service Report of " + driver.driverName
      })
  
      fetchGetDriverDetails(driver.driverId)
        .then(([res1]) => {
            // Once data is received, update the state
            this.setState({
            driverDetails: res1,
            loader: false
            });
        })
    .catch((error) => {
        // Handle any errors, and ensure loader is set to false
        console.error('Error fetching data:', error);
        this.setState({
            driverDetails: [
                { date: "Wed, Jan 16", shift: "0:24:36", driving: "0:19:22", from: "0:00:00", t0: "1.5 mi E San Francisco, CA", violations: "1.2 mi ESE San Francisco, CA"}
              ],
            loader: false
        });
    });
  }

  getAllDrivers = () => {
    this.setState({
      loader: true,
      showDrivers: "block",
      showDriverDetails: "none",
      title: "Hours of Service Report"
    })

    // Fetch data and handle the response
    fetchGetDrivers()
        .then(([res1]) => {
            // Once data is received, update the state
            this.setState({
            drivers: res1,
            loader: false
            });
        })
    .catch((error) => {
        // Handle any errors, and ensure loader is set to false
        console.error('Error fetching data:', error);
        this.setState({
            drivers: [
                { driverId: "1", driverName: "Wed, Jan 16", driverStatus: "0:24:36", timeInStatus: "0:19:22", vechicleName: "0:00:00", timeBreak: "1.5 mi E San Francisco, CA", driverRemaining: "1.2 mi ESE San Francisco, CA", shiftRemaining: "None", cycleRemaining: "None", cycleTomorrow: "None", driverViolationToday: "None", driverViolationCycle: "None" }
              ],
            loader: false
        });
    });
  }

  render() {
    return ( 
        <React.Fragment>
         <div className="page-content pb-0">
          <ToastContainer />
          <Container fluid>
            <LoadingOverlay
              active={this.state.loader}
              spinner
              text="Loading please wait..."
            >
              <Row>
                <Col xs="12">
                  <Card>
                    <CardBody>
                      <Row style={{ backgroundColor: "currentcolor", height: "50px" }}>
                        <Col md="6" className="d-flex align-items-center">
                          <CardTitle className="h1 mb-0 " style={{ color: "white" }}>
                            {this.state.title}
                          </CardTitle>
                        </Col>
                      </Row>
                      <section style={{ display: this.state.showDrivers }}>
                        <DriversList
                           drivers={this.state.drivers}
                           getDriverDetails={this.getDriverDetails}
                        />
                      </section>
                      <section style={{ display: this.state.showDriverDetails }}>
                        <DriverDetails
                           driverDetails={this.state.driverDetails}
                           getAllDrivers={this.getAllDrivers}
                        />
                      </section>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </LoadingOverlay>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Drivers;