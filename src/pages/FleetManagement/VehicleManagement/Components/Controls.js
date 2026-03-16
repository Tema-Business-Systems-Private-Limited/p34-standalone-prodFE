import React, { Component } from "react";
import { Table, FormGroup, Label, Input, Row, Col, CustomInput } from "reactstrap";
import Select from "react-select";

// import { dataArray } from "../../DummyData/Data";
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

class Controls extends Component {
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
      <h6 className="text-primary mt-4">Time</h6>

      <Table responsive striped bordered hover className="mt-3">
        <thead>
          <tr className="text-center">
            <th style={{ background: "#3498db", color: "white" }}>Sr.No</th>
            <th
              className="text-nowrap"
              style={{ background: "#3498db", color: "white" }}
            >
              Site
            </th>
            <th style={{ background: "#3498db", color: "white" }}>Name</th>
            <th style={{ background: "#3498db", color: "white" }}>
              Service Time
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
              <td>{item.Service_Time}</td>
              {/* Add more table data as needed */}
            </tr>
          ))}
        </tbody>
      </Table>

      <h6 className="text-primary mt-4">Drivers</h6>

      <FormGroup className="d-flex mt-3">
              <Label htmlFor="allDrivers">All Drivers</Label>
              <div className="custom-control custom-switch mb-2">
                <Input
                  type="checkbox"
                  className="custom-control-input"
                  id="allDrivers"
                  defaultChecked
                />
                <Label
                  className="custom-control-label ml-2"
                  htmlFor="allDrivers"
                  onClick={(e) => {
                    this.setState({
                      toggleSwitch: !this.state.toggleSwitch,
                    });
                  }}
                ></Label>
              </div>
            </FormGroup>


            <Table responsive striped bordered hover className="">
        <thead>
          <tr className="text-center">
            <th style={{ background: "#3498db", color: "white" }}>Sr.No</th>
            <th
              className="text-nowrap"
              style={{ background: "#3498db", color: "white" }}
            >
              Loader ID
            </th>
            <th style={{ background: "#3498db", color: "white" }}>
              Driver
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


      <h6 className="text-primary mt-4">Customers</h6>
      <FormGroup className="d-flex mt-3">
              <Label htmlFor="allCustomers">All Customers</Label>
              <div className="custom-control custom-switch mb-2">
                <Input
                  type="checkbox"
                  className="custom-control-input"
                  id="allCustomers"
                  defaultChecked
                />
                <Label
                  className="custom-control-label ml-2"
                  htmlFor="allCustomers"
                  onClick={(e) => {
                    this.setState({
                      toggleSwitch: !this.state.toggleSwitch,
                    });
                  }}
                ></Label>
              </div>
            </FormGroup>

      <Table responsive striped bordered hover className="">
        <thead>
          <tr className="text-center">
            <th style={{ background: "#3498db", color: "white" }}>Sr.No</th>
            <th
              className="text-nowrap"
              style={{ background: "#3498db", color: "white" }}
            >
             Customer
            </th>
            <th style={{ background: "#3498db", color: "white" }}>
              Company Name
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


      {/* All Categories */}


      <h6 className="text-primary mt-4">Categories</h6>
      <FormGroup className="d-flex mt-3">
              <Label htmlFor="AllCategories">All Categories</Label>
              <div className="custom-control custom-switch mb-2">
                <Input
                  type="checkbox"
                  className="custom-control-input"
                  id="AllCategories"
                  defaultChecked
                />
                <Label
                  className="custom-control-label ml-2"
                  htmlFor="AllCategories"
                  onClick={(e) => {
                    this.setState({
                      toggleSwitch: !this.state.toggleSwitch,
                    });
                  }}
                ></Label>
              </div>
            </FormGroup>

      <Table responsive striped bordered hover className="">
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



      {/* Loading layout */}

{/*  */}



   </>
    );
  }
}

export default Controls;
