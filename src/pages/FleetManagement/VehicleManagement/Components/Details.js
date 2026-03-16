import React, { Component } from "react";
import { Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
import Flatpickr from "react-flatpickr";
import Select from "react-select";

const optionVehicleCarrier = [
  {
    label: "DAFDVC",
    value: "DAFDVC",
    description: "Description 1",
  },
  { label: "DSADFA", value: "DSADFA", description: "Description 2" },
  { label: "JDSDFG", value: "JDSDFG", description: "Description 3" },
];

const optionGroup = [
  { label: "Site A", value: "Site A" },
  { label: "Site B", value: "Site B" },
  { label: "Site C", value: "Site C" },
  // Add more options as needed
];

const dummyData = [
  {
    "Sr.No": 1,
    Site: "Site A",
    Name: "John Doe",
    Service_Time: "2 hours",
  },
  {
    "Sr.No": 2,
    Site: "Site B",
    Name: "Jane Smith",
    Service_Time: "1.5 hours",
  },
  {
    "Sr.No": 3,
    Site: "Site C",
    Name: "Alice Johnson",
    Service_Time: "3 hours",
  },
  {
    "Sr.No": 4,
    Site: "Site A",
    Name: "Bob Brown",
    Service_Time: "2.5 hours",
  },
];

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize state variables if needed
      dataArray: dummyData,
      selectedSites: Array(dummyData.length).fill(null),
    };
  }

  componentDidMount() {
    // Fetch data or perform any initialization here
  }
  handleSiteChange = (selectedOption, index) => {
    const { selectedSites } = this.state;
    selectedSites[index] = selectedOption;
    this.setState({ selectedSites: [...selectedSites] });
  };
  render() {
    const { dataArray } = this.state;

    return (
      <Row>
        {/* Details Page */}
        <Col md="12">
          <h6 className="text-primary">Details</h6>

          <h6 className="text-primary mt-4">Odometer</h6>

          <hr />

          <Row>
            <FormGroup className="col-md-3">
              <Label htmlFor="CurrentOdometerReading">
                Current Odometer Reading
              </Label>
              <Input
                value={"10"}
                className="form-control"
                type="text"
                id="CurrentOdometerReading"
                disabled
              />
            </FormGroup>

            <FormGroup className="col-md-3">
              <Label htmlFor="LatestUpdatedDate">Latest Updated Date</Label>
              <Input
                value={"03/23/22"}
                className="form-control"
                type="text"
                id="LatestUpdatedDate"
                disabled
              />
            </FormGroup>

            <FormGroup className="col-md-3">
              <Label htmlFor="LatestUpdatedTime">Latest Updated Time</Label>
              <Input
                value={"15:51"}
                className="form-control"
                type="text"
                id="LatestUpdatedTime"
                disabled
              />
            </FormGroup>
          </Row>

          <h6 className="text-primary mt-4">Technical inspection</h6>

          <hr />
          <Row>
            <FormGroup className="col-md-3">
              <Label htmlFor="Reference">Reference</Label>
              <Input
                className="form-control"
                type="text"
                id="Reference"
                disabled
              />
            </FormGroup>

            <FormGroup className="col-md-3 ">
              <Label
                htmlFor="Last inspection
"
              >
                Lastinspection
              </Label>
              <Input
                className="form-control"
                type="text"
                id="Lastinspection"
                disabled
              />
            </FormGroup>

            <FormGroup className="col-md-3  d-flex flex-column justify-content-between">
              <span>Expiry inspection </span>

              <Flatpickr
                className="form-control"
                //   dateFormat= "m-d-Y"
                //   value={this.props.selectedDate}
                //   onChange={this.onDateselection}
              />
            </FormGroup>
          </Row>

          {/* vehicle inspection */}

          <h6 className="text-primary mt-4">Vehicle inspection</h6>

          <hr />

          <Row>
            <FormGroup className="select2-container col-md-3">
              <Label htmlFor="VehicleAllocationInspection">
                Vehicle Allocation Inspection
              </Label>
              <Select
                options={optionVehicleCarrier}
                placeholder="Carrier"
                classNamePrefix=""
              />
            </FormGroup>
            <FormGroup className="select2-container col-md-3">
              <Label htmlFor="Returnoftheinspectionvehic">
                Return of the inspection vehic
              </Label>
              <Select
                options={optionVehicleCarrier}
                placeholder="Carrier"
                classNamePrefix=""
              />
            </FormGroup>
          </Row>

          {/* Equipment */}

          <h6 className="text-primary mt-4">Equipent</h6>

          <hr />

          <Row>
            <FormGroup className="col-md-3">
              <Label htmlFor="GPStrackerID">GPS tracker ID</Label>
              <Input className="form-control" type="text" id="GPStrackerID" />
            </FormGroup>

            <FormGroup className="col-md-3 ">
              <Label htmlFor="RefGMSmobile">Ref GMS mobile</Label>
              <Input className="form-control" type="text" id="RefGMSmobile" />
            </FormGroup>
            <FormGroup className="col-md-3 ">
              <Label htmlFor="TrackingWebService">Tracking Web Service</Label>
              <Input
                className="form-control"
                type="text"
                id="TrackingWebService"
                disabled
              />
            </FormGroup>
            <FormGroup className="col-md-3 ">
              <Label htmlFor="Mobileradio">Mobile radio / CB</Label>
              <Input
                className="form-control"
                type="text"
                id="Mobileradio"
                disabled
              />
            </FormGroup>
            <FormGroup className="col-md-3 ">
              <Label htmlFor="FireExtinguisher">Fire / Extinguisher</Label>
              <Input
                className="form-control"
                type="text"
                id="FireExtinguisher"
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="col-md-12">
              <Label htmlFor="FireExtinguisher">Equipment notes</Label>
              <Input
                type="textarea"
                id="FireExtinguisher"
                className="form-control"
                style={{ height: "200px" }}
              />
            </FormGroup>
          </Row>
          {/* Technical Inspection */}

          <h6 className="text-primary mt-4">Technical Inspection</h6>

          <Table responsive striped bordered hover className="mt-3">
            <thead>
              <tr className="text-center">
                <th style={{ background: "#3498db", color: "white" }}>Sr.No</th>
                <th
                  className="text-nowrap"
                  style={{ background: "#3498db", color: "white" }}
                >
                  Inspection Type
                </th>
                <th style={{ background: "#3498db", color: "white" }}>
                  Last Check
                </th>
                <th style={{ background: "#3498db", color: "white" }}>
                  Periodicty
                </th>
                <th style={{ background: "#3498db", color: "white" }}>
                  Next Visit
                </th>
                <th style={{ background: "#3498db", color: "white" }}>Type</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {dataArray.map((item, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{item.Service_Time}</td>
                  <td className="text-nowrap">
                    <FormGroup className="d-flex flex-column justify-content-between">
                      <Flatpickr
                        className="form-control"
                        //   dateFormat= "m-d-Y"
                        //   value={this.props.selectedDate}
                        //   onChange={this.onDateselection}
                      />
                    </FormGroup>
                  </td>
                  <td>
                    <FormGroup>
                      <Select
                        className="text-left"
                        options={optionGroup}
                        // value={selectedSites[index]}
                        // onChange={(selectedOption) =>
                        //   this.handleSiteChange(selectedOption, index)
                        // }
                      />
                    </FormGroup>
                  </td>
                  <td>{item.Service_Time}</td>
                  <td>
                    {" "}
                    <FormGroup>
                      <Select
                        className="text-left"
                        options={optionGroup}
                        // value={selectedSites[index]}
                        // onChange={(selectedOption) =>
                        //   this.handleSiteChange(selectedOption, index)
                        // }
                      />
                    </FormGroup>
                  </td>

                  {/* Add more table data as needed */}
                </tr>
              ))}
            </tbody>
          </Table>

          <hr />
        </Col>
      </Row>
    );
  }
}

export default Details;
