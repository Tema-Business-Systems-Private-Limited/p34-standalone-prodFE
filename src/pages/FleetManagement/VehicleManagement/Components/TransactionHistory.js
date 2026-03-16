import React, { Component } from "react";
import { Col, FormGroup, Row, Table } from "reactstrap";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
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
    Date: "10/12/23",
    TransactionNo: "CORPS2202XCHG0000004(CHECK-IN)",
  },
  {
    "Sr.No": 2,
    Site: "Site B",
    Name: "Jane Smith",
    Service_Time: "1.5 hours",
    Date: "02/05/24",
    TransactionNo: "CORPS2202XCHG0000004(CHECK-IN)",
  },
];

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    // Initialize state if needed
    this.state = {
      dataArray: dummyData,
      selectedSites: Array(dummyData.length).fill(null),
    };
  }
  handleSiteChange = (selectedOption, index) => {
    const { selectedSites } = this.state;
    selectedSites[index] = selectedOption;
    this.setState({ selectedSites: [...selectedSites] });
  };
  render() {
    const { dataArray, selectedSites } = this.state;
    return (
      <Row>
        <Col md="12">
          <h5 className="text-primary">Transaction History</h5>

          <h6 className="text-primary mt-4">Odometer Reading History</h6>

          <hr />

          <Table responsive striped bordered hover className="mt-3">
            <thead>
              <tr className="text-center">
                <th style={{ background: "#3498db", color: "white" }}>Sr.No</th>
                <th
                  className="text-nowrap"
                  style={{ background: "#3498db", color: "white" }}
                >
                  Meter Reading
                </th>
                <th style={{ background: "#3498db", color: "white" }}>Time</th>
                <th style={{ background: "#3498db", color: "white" }}>Date</th>
                <th style={{ background: "#3498db", color: "white" }}>
                  Transaction Number
                </th>
                <th style={{ background: "#3498db", color: "white" }}>
                  Source
                </th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {dataArray.map((item, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{item.Service_Time}</td>

                  <td>{item.Service_Time}</td>
                  <td>{item.Date}</td>
                  <td>{item.TransactionNo}</td>

                  {/* Add more table data as needed */}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Service Shedule History */}

          <h6 className="text-primary mt-4">Service schedule History</h6>
          <hr />
          <Table responsive striped bordered hover className="mt-3">
            <thead>
              <tr className="text-center">
                <th style={{ background: "#3498db", color: "white" }}>Sr.No</th>
                <th
                  className="text-nowrap"
                  style={{ background: "#3498db", color: "white" }}
                >
                 Service
                </th>
                <th style={{ background: "#3498db", color: "white" }}>Service Date</th>
                <th style={{ background: "#3498db", color: "white" }}>Cist</th>
                <th style={{ background: "#3498db", color: "white" }}>
                 Currency
                </th>
                <th style={{ background: "#3498db", color: "white" }}>
                  Service Transaction Code
                </th>
                <th style={{ background: "#3498db", color: "white" }}>
                 Status
                </th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {dataArray.map((item, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{item.Service_Time}</td>

                  <td>{item.Service_Time}</td>
                  <td>{item.Date}</td>
                  <td>{item.TransactionNo}</td>
                  <td>{item.TransactionNo}</td>
                  <td>Active</td>
                  

                  {/* Add more table data as needed */}
                </tr>
              ))}
            </tbody>
          </Table>


        </Col>
      </Row>
    );
  }
}

export default TransactionHistory;
