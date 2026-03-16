import React, { Component } from "react";
import { Col, FormGroup, Row, Table } from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

const dummyData = [
    {
      "Sr.No": 1,
      Site: "Site A",
      Name: "John Doe",
      Service_Time: "2 hours",
    },
  
  ];

  // Define options for Select components
const optionGroup = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

class SCHSetup extends Component {
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

    const { dataArray ,selectedSites} = this.state;
    return (
      <Row>
        <Col md="12">
          <h5 className="text-primary mt-2">Service SCH Setup</h5>
          <h6 className="text-primary mt-4">Service Schedule</h6>
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
                    Service grid screen
                  </th>
                  <th className="text-nowrap" style={{ background: "#3498db", color: "white" }}>
                    Service frequency type
                  </th>
                  <th className="text-nowrap" style={{ background: "#3498db", color: "white" }}>
                   Service frequency
                  </th>

                  <th className="text-nowrap" style={{ background: "#3498db", color: "white" }}>
                  Service frequency (Meter)
                  </th>

                  <th style={{ background: "#3498db", color: "white" }}>
                    UOM
                  </th>

                  <th className="text-nowrap" style={{ background: "#3498db", color: "white" }}>
                    Last performed (Date)
                  </th>

                  <th className="text-nowrap" style={{ background: "#3498db", color: "white" }}>
                    Last run (Meters)
                  </th>

                  <th style={{ background: "#3498db", color: "white" }}>
                    UOM
                  </th>

                  <th className="text-nowrap" style={{ background: "#3498db", color: "white" }}>
                    Next Planning (Date)
                  </th>
                  <th className="text-nowrap" style={{ background: "#3498db", color: "white" }}>
                    Next sheduled (Meter)
                  </th>

                  <th style={{ background: "#3498db", color: "white" }}>
                    UOM
                  </th>
                  <th className="text-nowrap" style={{ background: "#3498db", color: "white" }}>
                    To go days
                  </th>
                  <th className="text-nowrap" style={{ background: "#3498db", color: "white" }}>
                    To go in Meters
                  </th>
                  <th style={{ background: "#3498db", color: "white" }}>
                    Unit
                  </th>
                  <th style={{ background: "#3498db", color: "white" }}>
                    Cost
                  </th>
                  <th style={{ background: "#3498db", color: "white" }}>
                    Currency
                  </th>
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {dataArray.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
               
                    <td className="text-nowrap">{item.Name}</td>
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
          
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
                    <td className="text-nowrap">{item.Name}</td>
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

export default SCHSetup;
