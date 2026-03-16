import React, { Component } from "react";
import { FormGroup, Input, Label, Row, Table } from "reactstrap";
import Select from "react-select";
const dummyData = [
    {
      "Sr.No": 1,
      "Site": "Site A",
      "Name": "John Doe",
      "Service_Time": "2 hours"
    },
    {
      "Sr.No": 2,
      "Site": "Site B",
      "Name": "Jane Smith",
      "Service_Time": "1.5 hours"
    },
    {
      "Sr.No": 3,
      "Site": "Site C",
      "Name": "Alice Johnson",
      "Service_Time": "3 hours"
    },
    {
      "Sr.No": 4,
      "Site": "Site A",
      "Name": "Bob Brown",
      "Service_Time": "2.5 hours"
    }
  ];
  
  const optionGroup = [
    { label: "Site A", value: "Site A" },
    { label: "Site B", value: "Site B" },
    { label: "Site C", value: "Site C" },
    // Add more options as needed
  ];
  
class LoadingLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dataArray: dummyData,
          selectedSites: Array(dummyData.length).fill(null), // Initialize selectedSites array with null values
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
      
    <>
        {/* Loading layout */}

        <h6 className="text-primary mt-4">Loading Layout</h6>

        <Row className="mt-3">
          <FormGroup className="col-md-4">
            <Label htmlFor="Rows">Rows</Label>
            <Input className="form-control" type="text" id="Rows" />
          </FormGroup>

          <FormGroup className="col-md-4 ">
            <Label htmlFor="Blocks">Blocks</Label>
            <Input className="form-control" type="text" id="Blocks" />
          </FormGroup>
        </Row>

        <Row>
          <Table responsive striped bordered hover className="mt-3">
            <thead>
              <tr className="text-center">
                <th style={{ background: "#3498db", color: "white" }}>Sr.No</th>
                <th
                  className="text-nowrap"
                  style={{ background: "#3498db", color: "white" }}
                >
                  Category
                </th>
                <th style={{ background: "#3498db", color: "white" }}>
                  Description
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
                  {/* Add more table data as needed */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>

        {/* Picture */}

        <h6 className="text-primary mt-4">Picture</h6>

        <Label htmlFor="customFile">
          <img
            src="https://lh3.googleusercontent.com/proxy/Q_8T6d6LNE38NCipOwxL_PGZrvukvceNtrDX68U1nd900f2f3yTkaYowzvu5DaE0wX6_jdcRZb-wk9aUM8GQaWNDfBNKLvS_prQ9IM8-zMImSz_zqOnnHWU"
            alt="Upload Image"
            style={{ cursor: "pointer" }}
          />
          <Input
            type="file"
            className="custom-file-input"
            id="customFile"
            style={{ display: "none" }}
          />
        </Label>
    </>
    
    );
  }
}

export default LoadingLayout;
