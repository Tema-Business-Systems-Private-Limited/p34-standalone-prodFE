import React, { useState, useEffect } from "react";
import Vehicles from "./Vehicles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  // Button,
  Paper,
} from "@mui/material";
import { Button } from 'react-bootstrap';
import { styled } from "@mui/material/styles";
import {
  Row,
  Col,
  CardTitle,
  Card,
  CardHeader,
  CardBody,
  Table,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const DisplayInformationIconDetails1 = (props) => {
  const [isOpen, setIsOpen] = useState(props.show);

  useEffect(() => {
    setIsOpen(props.show);
  }, [props]);

  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      open={isOpen}
      disableEscapeKeyDown={true}
      // PaperComponent={StyledPaper}
      maxWidth="xl"
    >
      <DialogTitle className='modal-header-bg'>
        {" "}
        <Typography
          variant="h5"
          // style={{
          //   backgroundColor: "#0275d8",
          //   color: "white",
          //   paddingLeft: "10px",
          // }}
        >
          <span className='modal-header-bg'>VEHICLE - {props.vehicle}</span>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <>
          <Card>
            <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
              <CardTitle
                tag="h4"
                className="mb-0"
                style={{ fontWeight: "bold" }}
              >
                BASIC INFO
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="mt-2">
                <Col>
                  <FormGroup row>
                    <Label sm="4">VEHICLE NUMBER</Label>
                    <Col sm="8">
                      <Input
                        value={props.data.VehicleNumber}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="4">CLASS</Label>
                    <Col sm="8">
                      <Input
                        value={props.data.Class}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="4">Carrier</Label>
                    <Col sm="8">
                      <Input
                        value={props.data.Carrier}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="4">Driver</Label>
                    <Col sm="8">
                      <Input
                        value={props.data.Driver}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="4">Trailer</Label>
                    <Col sm="8">
                      <Input
                        value={props.data.Trailer}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup row>
                    <Label md="4">ARRIVAL SITE</Label>
                    <Col md="8">
                      <Input
                        value={props.data.ArrivalSite}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md="4">DEPARTURE SITE</Label>
                    <Col md="8">
                      <Input
                        value={props.data.DepartureSite}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md="4">EARLIER START TIME</Label>
                    <Col md="8">
                      <Input
                        value={props.data.EarliestStartTime}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md="4">LATEST START TIME</Label>
                    <Col md="8">
                      <Input
                        value={props.data.LatestStartTime}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup row>
                    <Label md="4">ROUTE CODE</Label>
                    <Col md="12">
                      <Input
                        value={props.data.routeCodeDesc}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Row className="mt-2">
                <Col>
                  <FormGroup row>
                    <Label sm="6">CAPACITY</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.Capacity}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="6">VOLUME</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.Volume}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="6">TAILGATE</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.Tailgate}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup row>
                    <Label md="4">LOADBAY</Label>
                    <Col md="8">
                      <Input
                        value={props.data.Loadbay}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md="4">DIMENSIONS</Label>
                    <Col md="8">
                      <Input
                        value={props.data.Dimensions}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
              <CardTitle
                tag="h4"
                className="mb-0"
                style={{ fontWeight: "bold" }}
              >
                TRIP DETAILS
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="mt-2">
                <Col>
                  <FormGroup row>
                    <Label sm="6">MAX DISTANCE</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.MaxDistance}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="6">MAX TOTALTIME</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.MaxTotalTime}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="6">MAX PALLET COUNT</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.MaxPckgCount}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="6">MAX TOTAL TRAVELTIME</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.MaxTotalTravelTime}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="6">LOADING TIME</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.LoadingTime}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup row>
                    <Label md="4">MAX ORDER COUNT</Label>
                    <Col md="8">
                      <Input
                        value={props.data.MaxOrderCount}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md="4">MAX SPEED</Label>
                    <Col md="8">
                      <Input
                        value={props.data.MaxSpeed}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md="4">OVERTIME START</Label>
                    <Col md="8">
                      <Input
                        value={props.data.OverTimeStart}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md="4">OFFLOADING TIME</Label>
                    <Col md="8">
                      <Input
                        value={props.data.OffLoadingTime}
                        style={{ fontWeight: "bold" }}
                  
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
              <CardTitle
                tag="h4"
                className="mb-0"
                style={{ fontWeight: "bold" }}
              >
                COST DETAILS
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="mt-2">
                <Col>
                  <FormGroup row>
                    <Label sm="6">FIXED COST</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.FixedCost}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm="6">COST PER OVERTIME</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.CostPerUnitOverTime}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup row>
                    <Label md="4">COST PER TIME</Label>
                    <Col md="8">
                      <Input
                        value={props.data.CostPerUnitTime}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md="4">COST PER DIST</Label>
                    <Col md="8">
                      <Input
                        value={props.data.CostPerUnitDistance}
                        style={{ fontWeight: "bold" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </>
      </DialogContent>
      <DialogActions>
        <Button
          className="button-custom"
          onClick={props.onInfoIconHide}
          // variant="contained"
        >
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisplayInformationIconDetails1;
