import React, { useState, useEffect } from "react";
import Vehicles from "./Vehicles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,

  Paper,
} from "@mui/material";
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
  Button
} from "reactstrap";
import {
  convertHrToSec,
  formatTime,
  formatHHMM,
  splitTime,
  convertHrToMin,
} from "../converterFunctions/converterFunctions";

const DisplayInformationIconDetails1 = (props) => {
  const [isOpen, setIsOpen] = useState(props.show);
  const [isSerTime, setIsSerTime] = useState(props.data.timings);
  const [isChnApplied, setIsChnApplied] = useState(false);

  useEffect(() => {
    console.log("inside Icon Details", props);
    setIsOpen(props.show);
    setIsChnApplied(false);
    setIsSerTime(props.data.timings);
  }, [props]);

  const onAvailable = (availdays) => {
    let finaldata = "";
    console.log("Available days= ", availdays);
    if (availdays.length > 1) {
      let days = availdays.split(",");

      for (let i = 0; i < days.length; i++) {
        console.log("day i= ", days[i]);
        if (days[i] == 2) {
          console.log("day i inside= ", days[i]);
          switch (i) {
            case 0:
              finaldata = finaldata + " Sunday ";
              break;
            case 1:
              finaldata = finaldata + " MONDAY ";
              break;
            case 2:
              finaldata = finaldata + " TUESDAY ";
              break;
            case 3:
              finaldata = finaldata + " WEDNESDAY ";
              break;
            case 4:
              finaldata = finaldata + " THURSDAY ";
              break;
            case 5:
              finaldata = finaldata + " FRIDAY ";
              break;
            case 6:
              finaldata = finaldata + " SATURDAY ";
              break;
            default:
              break;
          }
          console.log("day i inside= ", finaldata);
        }

        console.log("insdie =", days[i]);
      }
    }

    return finaldata;
  };

  const GetYesNo = (flag) => {
    if (flag === "Yes") {
      return (
        <Input
          value={flag}
          style={{ fontWeight: "bold", color: "blue" }}
          disabled
        />
      );
    } else {
      return (
        <Input
          value={flag}
          style={{ fontWeight: "bold", color: "darkorange" }}
          disabled
        />
      );
    }
  };

  const displayPriority = (priority) => {
    if (priority === 1) {
      return <div class="badge badge-primary text-uppercase">Normal</div>;
    } else if (priority === 2) {
      return <div class="badge badge-success text-uppercase">Urgent</div>;
    } else if (priority === 3) {
      return <div class="badge badge-danger text-uppercase">Critical</div>;
    } else {
      return <div class="badge badge-primary text-uppercase">Normal</div>;
    }
  };

  const submitChanges = () => {
    props.updateServiceTime(props.docNum, isSerTime);
  };

  const handleChangeServiceTime = (e) => {
    console.log("Service time =", e.target.value);

    setIsSerTime(e.target.value);
    setIsChnApplied(true);
  };

  const documentBadgeLink = (docno, dtype) => {
    console.log("Inside ");
    const docmvt = dtype;
    let url, content;

    if (docmvt == "PICK") {
      url =
        "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESPRH2/2//M/" +
        docno;
      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
      return (
        <a style={{ color: "white" }} href={url} target="_blank">
          {docno}{" "}
        </a>
      );
    }
    if (docmvt == "DLV") {
      url =
        "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESSDH/2//M/" +
        docno;
      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
      return (
        <a style={{ color: "white" }} href={url} target="_blank">
          {docno}{" "}
        </a>
      );
    }
    if (docmvt == "PRECEIPT") {
      url =
        "http://x3tms.tema-systems.com/syracuse-main/html/main.html?url=/trans/x3/erp/TMSNEW/$sessions?f=GESXX10CPTH/2/M//" +
        docno;
      // content = "<div id = 'bodyContent'><a href=" + url + " target='_blank'>" +docno + "</a>"</div></div>";
      return (
        <a style={{ color: "white" }} href={url} target="_blank">
          {docno}{" "}
        </a>
      );
    }
  };

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
          <span className='modal-header-bg'>DOCUMENT - ({documentBadgeLink(props.docNum, props.doctype)})</span>
        </Typography>
      </DialogTitle>
      <DialogContent style={{ width: "100%" }}>
        <>
          <Card>
            <CardBody>
              <Row className="mt-2">
                <Col sm="6">
                  <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
                    <CardTitle
                      tag="h4"
                      className="mb-0"
                      style={{ fontWeight: "bold" }}
                    >
                      BASIC INFO
                    </CardTitle>
                  </CardHeader>
                  <Row className="mt-3">
                    <Col>
                      <FormGroup row>
                        <Label sm="6">LOADBAY</Label>
                        <Col sm="6">{GetYesNo(props.data.loadBay)}</Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm="6">TAILGATE</Label>
                        <Col sm="6">{GetYesNo(props.data.tailGate)}</Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm="6">PACKING</Label>
                        <Col sm="6">
                          <Input
                            value={props.data.packing}
                            style={{ fontWeight: "bold", color: "blue" }}
                            disabled
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup row>
                        <Label md="6">HEIGHT</Label>
                        <Col md="6">
                          <Input
                            value={props.data.height}
                            style={{ fontWeight: "bold", color: "blue" }}
                            disabled
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label md="6">LOADING ORDER</Label>
                        <Col md="6">
                          <Input
                            value={props.data.loadingOrder}
                            style={{ fontWeight: "bold", color: "blue" }}
                            disabled
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm="6">STACK HEIGHT</Label>
                        <Col sm="6">
                          <Input
                            value={props.data.stackHeight}
                            style={{ fontWeight: "bold", color: "blue" }}
                            disabled
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>

                {/* this is right side header */}
                <Col sm="6">
                  <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
                    <CardTitle
                      tag="h4"
                      className="mb-0"
                      style={{ fontWeight: "bold" }}
                    >
                      ASSOCIATIONS
                    </CardTitle>
                  </CardHeader>

                  <Row className="mt-3">
                    <Col>
                      <FormGroup row>
                        <Label md="6"> PRIORITY</Label>
                        <Col md="6">{displayPriority(props.data.priority)}</Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label sm="6">ALL DRIVERS</Label>
                        <Col sm="6">
                          {props.data.allDrivers === "2" ? (
                            <Input
                              value="YES"
                              style={{ fontWeight: "bold", color: "blue" }}
                              disabled
                            />
                          ) : (
                            <Input
                              value="No"
                              style={{
                                fontWeight: "bold",
                                color: "darkorange",
                              }}
                              disabled
                            />
                          )}
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label sm="6">ALL VEHICLE CLASS</Label>
                        <Col sm="6">
                          {props.data.allVehClass === "2" ? (
                            <Input
                              value="YES"
                              style={{ fontWeight: "bold", color: "blue" }}
                              disabled
                            />
                          ) : (
                            <Input
                              value="No"
                              style={{
                                fontWeight: "bold",
                                color: "darkorange",
                              }}
                              disabled
                            />
                          )}
                        </Col>
                      </FormGroup>
                    </Col>

                    {/* right side column */}
                    <Col>
                      <FormGroup row>
                        <Label md="4">DRIVER LIST</Label>
                        <Col md="8">
                          <Input
                            value={props.data.driverList}
                            style={{ fontWeight: "bold", color: "blue" }}
                            disabled
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label md="4">VEHCLASS LIST</Label>
                        <Col md="8">
                          <Input
                            value={props.data.vehClassList}
                            style={{ fontWeight: "bold", color: "blue" }}
                            disabled
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
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
                AVAILABILITY AND TIMINGS
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="mt-2">
                <Col className="">
                  <FormGroup row>
                    <Label sm="6">WAITING TIME (HH:MM)</Label>
                    <Col sm="6">
                      <Input
                        value={props.data.waitingTime}
                        style={{ fontWeight: "bold", color: "blue" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup row>
                    <Label md="6"> SERVICE TIME</Label>
                    <Col md="6">
                      <Input
                        value={isSerTime}
                        style={{ fontWeight: "bold", color: "blue" }}
                        onChange={handleChangeServiceTime}
                        placeholder="HH:MM"
                      />
                    </Col>
                  </FormGroup>
                </Col>
       

                <Col>
                  {props.data.fromTime && props.data.fromTime.length > 0 ? (
                    <div className="px-2">
                      <h6 className="bg-light my-2 p-1">
                        DELIVERY TIME FRAME (HH:MM)
                      </h6>
                      {props.data.fromTime.length > 0 ? (
                        <Table bordered responsive>
                          <thead>
                            <tr>
                              <th style={{ fontWeight: "bold" }}>
                                <u>FROM </u>
                              </th>
                              <th style={{ fontWeight: "bold" }}>
                                <u>TO </u>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {props.data.fromTime.map((item, index) => {
                              return (
                                <tr key={index}>
                                  {/* <td>{item.SOPLIN_0}</td> */}
                                  <td
                                    style={{
                                      fontWeight: "bold",
                                      color: "blue",
                                    }}
                                  >
                                    {splitTime(props.data.fromTime[index])}
                                  </td>
                                  <td
                                    style={{
                                      fontWeight: "bold",
                                      color: "blue",
                                    }}
                                  >
                                    {splitTime(props.data.toTime[index])}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      ) : (
                        <p className="text-center mb-0">No data found</p>
                      )}
                    </div>
                  ) : (
                    <Row>
                      <Col>
                        <FormGroup row>
                          <Label md="4"> ANY TIME AVAILABLE </Label>
                          <Col md="8">
                            <Input
                              value="YES"
                              style={{ fontWeight: "bold", color: "blue" }}
                              disabled
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
              <Col className="">
                  <FormGroup row>
                    <Label md="2"> AVAILABLE DAYS </Label>
                    <Col md="6">
                      <Input
                        value={
                          props.data.availDays &&
                          onAvailable(props.data.availDays)
                        }
                        style={{ fontWeight: "bold", color: "blue" }}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                </Col>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex-md-row flex-column align-md-items-center border-bottom">
              <CardTitle
                tag="h4"
                className="mb-0"
                style={{ fontWeight: "bold" }}
              >
                COMMENTS
              </CardTitle>
            </CardHeader>

            <CardBody>
              <Row className="">
                <Col className="">
                  <FormGroup>

                    <Row>
                      <Col md="2">
                      <Label htmlFor="Note">
                      Driver Notes :
                    </Label>
                      </Col>
                      <Col md="10">
                      <Input
                      md="6"
                      type="textarea"
                      id="Note"
                      className="form-control"
                      rows="5"
                      cols="50"
                    />
                      </Col>
                    </Row>
                  
                  
                  </FormGroup>
                </Col>

                <Col className="">
                  <FormGroup>

                    <Row>
                      <Col md="2">
                      <Label htmlFor="Note">
                      Freight notes :
                    </Label>
                      </Col>
                      <Col md="10">
                      <Input
                      md="6"
                      type="textarea"
                      id="Note"
                      className="form-control"
                      rows="5"
                      cols="50"
                    />
                      </Col>
                    </Row>
                  
                  
                  </FormGroup>
                </Col>
                
                 
              </Row>
              <Row className="">
                <Col className="">
                  <FormGroup>

                    <Row>
                      <Col md="2">
                      <Label htmlFor="Note">
                      Logistic Notes :
                    </Label>
                      </Col>
                      <Col md="10">
                      <Input
                      md="6"
                      type="textarea"
                      id="Note"
                      className="form-control"
                      rows="5"
                      cols="50"
                    />
                      </Col>
                    </Row>
                  
                  
                  </FormGroup>
                </Col>

                <Col className="">
                  <FormGroup>

                    <Row>
                      <Col md="2">
                      <Label htmlFor="Note">
                      Operator Notes :
                    </Label>
                      </Col>
                      <Col md="10">
                      <Input
                      md="6"
                      type="textarea"
                      id="Note"
                      className="form-control"
                      rows="5"
                      cols="50"
                    />
                      </Col>
                    </Row>
                  
                  
                  </FormGroup>
                </Col>
                
                 
              </Row>

              <Row className="">
                <Col className="">
                  <FormGroup>

                    <Row>
                      <Col md="2">
                      <Label htmlFor="Note">
                      Customer  Notes :
                    </Label>
                      </Col>
                      <Col md="10">
                      <Input
                      md="6"
                      type="textarea"
                      id="Note"
                      className="form-control"
                      rows="5"
                      cols="50"
                    />
                      </Col>
                    </Row>
                  
                  
                  </FormGroup>
                </Col>

                <Col className="">
                  <FormGroup>

                    <Row>
                      <Col md="2">
                      <Label htmlFor="Note">
                      Service Provider Notes :
                    </Label>
                      </Col>
                      <Col md="10">
                      <Input
                      md="6"
                      type="textarea"
                      id="Note"
                      className="form-control"
                      rows="5"
                      cols="50"
                    />
                      </Col>
                    </Row>
                  
                  
                  </FormGroup>
                </Col>
                
                 
              </Row>
           
              <Row className="">
                <Col className="" md="6">
                  <FormGroup>

                    <Row>
                      <Col md="2">
                      <Label htmlFor="Note">
                      Supplier Notes :
                    </Label>
                      </Col>
                      <Col md="10">
                      <Input
                      md="6"
                      type="textarea"
                      id="Note"
                      className="form-control"
                      rows="5"
                      cols="50"
                    />
                      </Col>
                    </Row>
                  
                  
                  </FormGroup>
                </Col>

                
                 
              </Row>
           
              
            </CardBody>
          </Card>
        </>
      </DialogContent>
      <DialogActions>
        {isChnApplied ? (
          <Button
            className="badge badge-primary"
            onClick={submitChanges}
            variant="contained"
          >
            Apply Changes
          </Button>
        ) : (
          ""
        )}

        <Button
        className='button-custom'
         color="primary"
          onClick={props.onInfoIconHide}
        
        >
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisplayInformationIconDetails1;
