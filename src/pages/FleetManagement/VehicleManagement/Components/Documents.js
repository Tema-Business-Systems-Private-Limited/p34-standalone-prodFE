import React, { Component } from "react";
import { Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

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

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: dummyData,
      selectedSites: Array(dummyData.length).fill(null),
      // Initialize state variables if needed
    };
  }

  componentDidMount() {
    // Fetch data or perform any initialization here
  }

  render() {
    const { dataArray, selectedSites } = this.state;
    return (
      <Row>
        <Col md="12">
          <h6 className="text-primary">Documents</h6>

          <h6 className="text-primary mt-4">Pursh. / Leasing</h6>

          <hr />

          <Row>
            <FormGroup className="select2-container col-md-3">
              <Label htmlFor="Asset">Asset</Label>
              <Select
                options={optionVehicleCarrier}
                placeholder="Carrier"
                classNamePrefix=""
              />
            </FormGroup>
          </Row>

          <h6 className="text-primary mt-3">License of vehicle</h6>
          <hr />
          <Row>
            <FormGroup className="col-md-3">
              <Label htmlFor="Reference">Reference</Label>
              <Input className="form-control" type="text" id="Reference" />
            </FormGroup>

            <FormGroup className="col-md-3  d-flex flex-column justify-content-between">
              <span>Expiration </span>

              <Flatpickr
                className="form-control"
                //   dateFormat= "m-d-Y"
                //   value={this.props.selectedDate}
                //   onChange={this.onDateselection}
              />
            </FormGroup>
          </Row>

          <Row>
            <FormGroup className="col-md-12">
              <Label htmlFor="Note">Note</Label>
              <Input
                type="textarea"
                id="Note"
                className="form-control"
                style={{ height: "200px" }}
              />
            </FormGroup>
          </Row>

          {/* Insurance */}
          <h6 className="text-primary mt-3">Insurance</h6>
          <hr />

          <Row>
            <FormGroup className="col-md-3">
              <Label htmlFor="Supplier">Supplier</Label>
              <Input className="form-control" type="text" id="Supplier" />
            </FormGroup>

            <FormGroup className="col-md-3  d-flex flex-column justify-content-between">
              <span>Insurance Expiration </span>

              <Flatpickr
                className="form-control"
                //   dateFormat= "m-d-Y"
                //   value={this.props.selectedDate}
                //   onChange={this.onDateselection}
              />
            </FormGroup>

            <FormGroup className="col-md-3">
              <Label htmlFor="Reference">Reference</Label>
              <Input className="form-control" type="text" id="Reference" />
            </FormGroup>
          </Row>

          <Row>
            <FormGroup className="col-md-12">
              <Label htmlFor="Insurancenote">Insurance note</Label>
              <Input
                type="textarea"
                id="Insurancenote"
                className="form-control"
                style={{ height: "200px" }}
              />
            </FormGroup>
          </Row>

          <h6 className="text-primary mt-3">Documents</h6>
          <hr />

          <Row>
            <Table responsive striped bordered hover className="mt-3">
              <thead>
                <tr className="text-center">
                  <th style={{ background: "#3498db", color: "white" }}>
                    Sr.No
                  </th>
                  <th
                    className="text-nowrap"
                    style={{ background: "#3498db", color: "white" }}
                  >
                    Documents
                  </th>
                  <th style={{ background: "#3498db", color: "white" }}>
                    Document Number
                  </th>
                  <th style={{ background: "#3498db", color: "white" }}>
                    Issuing Authority
                  </th>

                  <th style={{ background: "#3498db", color: "white" }}>
                    Issuing Date
                  </th>

                  <th style={{ background: "#3498db", color: "white" }}>
                    Expiration
                  </th>

                  <th style={{ background: "#3498db", color: "white" }}>
                    Document Upload
                  </th>
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {dataArray.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>
                      <FormGroup>
                        <Select
                          className="text-left"
                          options={optionGroup}
                          value={selectedSites[index]}
                          onChange={(selectedOption) =>
                            this.handleSiteChange(selectedOption, index)
                          }
                        />
                      </FormGroup>
                    </td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td>
                      <FormGroup>
                        <Select
                          className="text-left"
                          options={optionGroup}
                          value={selectedSites[index]}
                          onChange={(selectedOption) =>
                            this.handleSiteChange(selectedOption, index)
                          }
                        />
                      </FormGroup>
                    </td>
                    <td>
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
                      <FormGroup className="d-flex flex-column justify-content-between">
                        <Flatpickr
                          className="form-control"
                          //   dateFormat= "m-d-Y"
                          //   value={this.props.selectedDate}
                          //   onChange={this.onDateselection}
                        />
                      </FormGroup>
                    </td>
                    <td className="text-nowrap">{item.Name}</td>
                    {/* Add more table data as needed */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Documents;
