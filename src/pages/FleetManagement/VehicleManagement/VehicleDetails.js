import React from "react";
import { ToastContainer } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import {Link} from "react-router-dom"
import { dataArray } from "../DummyData/Data";
import { InfoWindow } from "google-maps-react";
import classnames from "classnames";
import Home from "./Components/Home";
import Controls from "./Components/Controls";
import LoadingLayout from "./Components/LoadingLayout";
import Details from "./Components/Details";
import Documents from "./Components/Documents";
import SCHSetup from "./Components/serviceSCHSetup";
import TransactionHistory from "./Components/TransactionHistory";

class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "Home",
      vehicleId: "",
    };
    console.log("T22 inside Vehicle panel - conc", props);

    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount() {
    // Accessing the vehicle ID from the URL
    const { match } = this.props;
    const { vehicleId } = match.params;
    // Setting the vehicle ID in the component's state
    this.setState({ vehicleId });
  }

  render() {
    const { vehicleId } = this.state; // Accessing vehicleId from state

    // let fileterData = AllData.filter((value)=>(
    //   return value.vehicleId === vehicleId
    // ))
    return (
      <>
        <ToastContainer />
        <Container fluid>
          <React.Fragment>
            <div className="page-content">
              <Container fluid>
                <Row>
                  <Col xs="12">
                    <Card>
                      <CardBody>
                        <Row>
                          <Col md="6" className="d-flex align-items-center">
                            <CardTitle className="h4 mb-0 text-primary mb-3">
                              Management of Vehicle
                            </CardTitle>
                          </Col>
                          <Col
                            md="6"
                            className="d-flex justify-content-end align-items-center"
                          >
                            <CardTitle className="h4 mb-0 text-primary p-3">
                              <Link to="/vehiclemanagement">
                                <Button>Back</Button>
                              </Link>
                            </CardTitle>
                          </Col>
                          {/* <Col md="6" className="text-right">
                              <Button
                                color="success"
                                size="sm"
                                className="waves-effect"
                              >
                                VALIDATE
                              </Button>
                            </Col> */}
                        </Row>
                        <hr className="my-2" />

                        {/* active tab code for vehicle details */}

                        <Nav
                          tabs
                          className="nav-tabs-custom nav-justified mt-3 mb-3"
                        >
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: this.state.activeTab === "Home",
                              })}
                              onClick={() => {
                                this.toggleTab("Home");
                              }}
                            >
                              Home
                              {/* <span>{this.props.t("Vehicles")}</span> */}
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: this.state.activeTab === "Controls",
                              })}
                              onClick={() => {
                                this.toggleTab("Controls");
                              }}
                            >
                              Controls
                              {/* <span>{this.props.t("Trailers")}</span> */}
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active:
                                  this.state.activeTab === "LoadingLayout",
                              })}
                              onClick={() => {
                                this.toggleTab("LoadingLayout");
                              }}
                            >
                              LoadingLayout
                              {/* <span>{this.props.t("Equipments")}</span> */}
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: this.state.activeTab === "Details",
                              })}
                              onClick={() => {
                                this.toggleTab("Details");
                              }}
                            >
                              Details
                              {/* <span>{this.props.t("Drivers")}</span> */}
                            </NavLink>
                          </NavItem>

                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: this.state.activeTab === "Documents",
                              })}
                              onClick={() => {
                                this.toggleTab("Documents");
                              }}
                            >
                              Documents
                              {/* <span>{this.props.t("Drivers")}</span> */}
                            </NavLink>
                          </NavItem>

                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active:
                                  this.state.activeTab === "ServiceSCHSetup",
                              })}
                              onClick={() => {
                                this.toggleTab("ServiceSCHSetup");
                              }}
                            >
                              Service SCH Setup
                              {/* <span>{this.props.t("Drivers")}</span> */}
                            </NavLink>
                          </NavItem>

                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active:
                                  this.state.activeTab === "TransactionHistory",
                              })}
                              onClick={() => {
                                this.toggleTab("TransactionHistory");
                              }}
                            >
                              Transaction History
                              {/* <span>{this.props.t("Drivers")}</span> */}
                            </NavLink>
                          </NavItem>
                        </Nav>
                        {/* <TabContent activeTab={this.state.activeTab}>
              <Vehicles3
                curVehicleList={filterVehicles}
                handleDragStart={this.props.handleDragStart}
                updateVehSearchTerm={this.props.updateVehSearchTerm}
                vehOrder={this.props.vehOrder}
                sortVehicles={this.props.sortVehicles}
              />
              <Trailers3
                curTrails={filterTrailers}
                handleDragStart={this.props.handleDragStart}
                allowedTrailers={this.props.allowedTrailers}
                allAllowedTrailers={this.props.allAllowedTrailers}
                vehicleDropped={this.props.vehicleDropped}
                updateTrailSearchTerm={this.props.updateTrailSearchTerm}
                sortTrailer={this.props.sortTrailer}
                trailOrder={this.props.trailOrder}
              />
              <Equipments3
                curEquipments={filterEquipments}
                handleDragStart={this.props.handleDragStart}
                updateEquSearchTerm={this.props.updateEquSearchTerm}
                sortEquipement={this.props.sortEquipement}
                equpOrder={this.props.equpOrder}
              />
              <Drivers3
                curDrivers={filterDriver}
                handleDragStart={this.props.handleDragStart}
                allAllowedDrivers={this.props.allAllowedDrivers}
                vehicleDropped={this.props.vehicleDropped}
                allowedDrivers={this.props.allowedDrivers}
                updateDriverSearchTerm={this.props.updateDriverSearchTerm}
                sortDriver={this.props.sortDriver}
                diverOrder={this.props.diverOrder}
              />
            </TabContent> */}

                        {/* <h1>{this.state.activeTab}</h1> */}

                        {/* active tab code ends here */}

                        {this.state.activeTab === "Home" && <Home />}

                        {this.state.activeTab === "Controls" && <Controls />}

                        {this.state.activeTab === "LoadingLayout" && (
                          <LoadingLayout />
                        )}
                        {this.state.activeTab === "Details" && <Details />}

                        {this.state.activeTab === "Documents" && <Documents />}

                        {this.state.activeTab === "ServiceSCHSetup" && (
                          <SCHSetup />
                        )}

                        {this.state.activeTab === "TransactionHistory" && (
                          <TransactionHistory />
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </React.Fragment>
        </Container>
      </>
    );
  }
}

export default VehicleDetails;
