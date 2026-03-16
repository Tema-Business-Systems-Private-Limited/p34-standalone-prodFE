import React, { Component } from "react";
import { Link } from "react-router-dom";
import NonAuthLayout from "../../../components/NonAuthLayout";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ToastContainer, toast } from "react-toastify";
import {
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  Card,
  CardTitle,
  Button,
  Table,
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

const optionGroup = [
  { label: "CORPS", value: "CORPS" },
  { label: "IN", value: "india" },
];

const RouteNo = [
  { label: "North Service Area", value: "North Service Area" },
  { label: "East Service Area", value: "East Service Area" },
  { label: "South Service Area", value: "South Service Area" },
  { label: "West Service Area", value: "West Service Area" },
  { label: "North-East", value: "South-East" },
];

const Performance = [
  { label: "Ecxellente", value: "Ecxellente" },
  // { label: "Ecxellente", value: "Ecxellente" },
];
class AddNewVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      routeRenewals: [
        {
          site: "",
          name: "",
          servicetime: "",
        },
      ],
      Drivers: [
        {
          loaderId: "",
          driver: "",
        },
      ],
      Customers: [
        {
          customer: "",
          companyname: "",
        },
      ],
    };
  }

  handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ selectedImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image deletion
  handleImageDelete = () => {
    this.setState({ selectedImage: null });
  };

  handleInputChange = (index, field, value) => {
    const { routeRenewals } = this.state;
    const newRows = [...routeRenewals];
    newRows[index][field] = value;
    this.setState({ routeRenewals: newRows });
  };

  handleDriverInputChange = (index, field, value) => {
    const { Drivers } = this.state;
    const newRows = [...Drivers];
    newRows[index][field] = value;
    this.setState({ Drivers: newRows });
  };

  
  // For customers
  handleCustomerInputChange = (index, field, value) => {
    const { Customers } = this.state;
    const newRows = [...Customers];
    newRows[index][field] = value;
    this.setState({ Customers: newRows });
  };


  handleKeyDown = (index, field, event, val) => {
    if (val === "routerenewals") {
      const { routeRenewals } = this.state;
      if (
        event.key === "Tab" &&
        index === routeRenewals.length - 1 &&
        field === "servicetime"
      ) {
        console.log(index, field, event, "this is handle key down add vehicle");
        const newRows = [...routeRenewals];
        const lastRow = newRows[newRows.length - 1];
        const allFieldsFilled = Object.values(lastRow).every(
          (val) => val.trim() !== ""
        );

        if (allFieldsFilled) {
          this.setState({
            routeRenewals: [
              ...newRows,
              {
                site: "",
                name: "",
                servicetime: "",
              },
            ],
          });
        }
      }
    }

    if (val === "drivers") {
      const { Drivers } = this.state;
      if (
        event.key === "Tab" &&
        index === Drivers.length - 1 &&
        field === "driver"
      ) {
        console.log(index, field, event, "this is handle key down add vehicle");
        const newRows = [...Drivers];
        const lastRow = newRows[newRows.length - 1];
        const allFieldsFilled = Object.values(lastRow).every(
          (val) => val.trim() !== ""
        );

        if (allFieldsFilled) {
          this.setState({
            Drivers: [
              ...newRows,
              {
                loaderId: "",
                driver: "",
              },
            ],
          });
        }
      }
    }

    if (val === "customers") {
      const { Customers } = this.state;
      if (
        event.key === "Tab" &&
        index === Customers.length - 1 &&
        field === "companyname"
      ) {
        // console.log(index, field, event, "this is handle key down add vehicle");
        const newRows = [...Customers];
        const lastRow = newRows[newRows.length - 1];
        const allFieldsFilled = Object.values(lastRow).every(
          (val) => val.trim() !== ""
        );

        if (allFieldsFilled) {
          this.setState({
            Customers: [
              ...newRows,
              {
                customer: "",
                companyname: "",
              },
            ],
          });
        }
      }
    }
  };

  handleDelete = (index, val) => {
    if (val === "routeRenewals") {
      if (index === 0) return; // Prevent deletion of the first row
      const { routeRenewals } = this.state;
      const newRows = routeRenewals.filter((_, i) => i !== index);
      this.setState({ routeRenewals: newRows });
    }

    if (val === "drivers") {
      const { Drivers } = this.state;
      const newRows = Drivers.filter((_, i) => i !== index);
      this.setState({ Drivers: newRows });
    }

    if(val === "customers"){
      const { Customers } = this.state;
      const newRows = Customers.filter((_, i) => i !== index);
      this.setState({ Customers: newRows });
    }
  };

  render() {
    // console.log(this.state.routeRenewals, "route renewals inside add vehicle");
    const optionOwnership = [
      {
        label: "Internal",
        value: "Internal",
        description: "Internal selected",
      },
      { label: "Leased", value: "Leased", description: "Leased selected" },
      { label: "Rented", value: "Rented", description: "Rented selected" },
    ];

    const ColorOptions = [
      {
        label: "red",
        value: "red",
        description: "Internal selected",
      },
      { label: "blue", value: "blue", description: "Leased selected" },
    ];

    const fuelType = [
      {
        label: "Petrol",
        value: "Petrol",
      },
      { label: "Diesel", value: "Diesel" },
      { label: "Hybrid", value: "Hybrid" },
      { label: "Electric", value: "Electric" },
    ];

    const optionVehicleClass = [
      {
        label: "DAFDVC",
        value: "DAFDVC",
        description: "Description 1",
      },
      { label: "DSADFA", value: "DSADFA", description: "Description 2" },
      { label: "JDSDFG", value: "JDSDFG", description: "Description 3" },
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

    return (
      <React.Fragment>
        <div className="page-content">
          <ToastContainer />
          <Container fluid>
            <Card className="p-3">
              <Row>
                <Col md="6" className="d-flex align-items-center">
                  <CardTitle className="h4 mb-0 text-primary p-3">
                    Add Vehicle
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
              </Row>
              <hr className="my-2" />
              <Row className="my-1">
                <Container fluid>
                  <Row className="">
                    <Col md="8" className="">
                      <Row>
                        <FormGroup className="col-md-4">
                          <Label htmlFor="code">
                            Code <span className="text-danger">*</span>
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            id="code"
                          />
                        </FormGroup>

                        <FormGroup className="col-md-4 ">
                          <Label htmlFor="name">
                            Registration plate{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            id="name"
                          />
                        </FormGroup>

                        <FormGroup className="select2-container col-md-4">
                          <Label htmlFor="site">
                            Site <span className="text-danger">*</span>
                          </Label>
                          <Select
                            options={optionGroup}
                            placeholder="site"
                            classNamePrefix=""
                          />
                        </FormGroup>

                        <FormGroup className="select2-container col-md-4">
                          <Label htmlFor="site">Ownership</Label>
                          <Select
                            options={optionOwnership}
                            placeholder="Internal"
                            classNamePrefix=""
                          />
                        </FormGroup>

                        <FormGroup className="select2-container col-md-4">
                          <Label htmlFor="site">
                            Vehicle Class <span className="text-danger">*</span>
                          </Label>
                          <Select
                            options={optionVehicleClass}
                            placeholder="vehicle class"
                            classNamePrefix=""
                            onChange={this.handleOptionSelect}
                          />
                          {/* Display description below the Select based on selected option */}
                          {/* {this.state.selectedOption && (
                    <span>{this.state.selectedOption.description}</span>
                  )} */}
                          {/* <span>{this.state.selectedOption?.description}</span> */}
                        </FormGroup>
                        <FormGroup className="col-md-4 d-flex  justify-content-center align-items-center ">
                          <Label htmlFor="Tailgate">Tailgate</Label>
                          <div className="custom-control custom-switch mb-2">
                            <Input
                              type="checkbox"
                              className="custom-control-input"
                              id="Tailgate"
                              defaultChecked
                            />
                            <Label
                              className="custom-control-label ml-2"
                              htmlFor="Tailgate"
                              onClick={(e) => {
                                this.setState({
                                  toggleSwitch: !this.state.toggleSwitch,
                                });
                              }}
                            ></Label>
                          </div>
                        </FormGroup>

                        <FormGroup className="col-md-4 d-flex  justify-content-center align-items-center ">
                          <Label htmlFor="LoadingRamp">Loading Ramp</Label>
                          <div className="custom-control custom-switch mb-2">
                            <Input
                              type="checkbox"
                              className="custom-control-input"
                              id="LoadingRamp"
                              defaultChecked
                            />
                            <Label
                              className="custom-control-label ml-2"
                              htmlFor="LoadingRamp"
                              onClick={(e) => {
                                this.setState({
                                  toggleSwitch: !this.state.toggleSwitch,
                                });
                              }}
                            ></Label>
                          </div>
                        </FormGroup>

                        <FormGroup className="col-md-4 d-flex  justify-content-center align-items-center ">
                          <Label htmlFor="Active">Active</Label>
                          <div className="custom-control custom-switch mb-2">
                            <Input
                              type="checkbox"
                              className="custom-control-input"
                              id="Active"
                              defaultChecked
                            />
                            <Label
                              className="custom-control-label ml-2"
                              htmlFor="Active"
                              onClick={(e) => {
                                this.setState({
                                  toggleSwitch: !this.state.toggleSwitch,
                                });
                              }}
                            ></Label>
                          </div>
                        </FormGroup>
                      </Row>
                    </Col>
                    <Col md="4" className="">
                      <Row className="d-flex justify-content-center align-items-center">
                        {/* <img
                  width={250}
                  src="https://img.etimg.com/thumb/width-640,height-480,imgsize-51826,resizemode-75,msid-86310328/industry/auto/lcv-hcv/daimler-india-ready-for-prolonged-truck-upcycle-says-md/untitled-7.jpg"
                /> */}
                        <FormGroup>
                          <Label for="picture">Picutre</Label>
                          <Input
                            name="picture"
                            type="file"
                            accept="image/*"
                            onChange={this.handleFileSelect}
                          />
                        </FormGroup>

                        {this.state.selectedImage && (
                          <>
                            <div>
                              <img
                                src={this.state.selectedImage}
                                alt="Selected"
                                width={200}
                              />
                            </div>
                            <i class="fa-solid fa-trash-can"></i>

                            <DeleteOutlineIcon
                              style={{ cursor: "pointer" }}
                              className="text-danger ml-3"
                              onClick={this.handleImageDelete}
                            />
                          </>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Row className="">
                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="carrier">
                        Carrier <span className="text-danger">*</span>
                      </Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="Carrier"
                        classNamePrefix=""
                        onChange={this.handleOptionSelect}
                      />
                      {/* Display description below the Select based on selected option */}
                      {/* {this.state.selectedOption && (
                <span>{this.state.selectedOption.description}</span>
              )} */}
                      {/* <span>{this.state.selectedOption?.description}</span> */}
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="startdepot">
                        Start Depot Name <span className="text-danger">*</span>
                      </Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="Carrier"
                        classNamePrefix=""
                        onChange={this.handleOptionSelect}
                      />
                      {/* Display description below the Select based on selected option */}
                      {/* {this.state.selectedOption && (
                <span>{this.state.selectedOption.description}</span>
              )} */}
                      {/* <span>{this.state.selectedOption?.description}</span> */}
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="enddepot">
                        End Depot Name <span className="text-danger">*</span>{" "}
                      </Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="End Depot Name"
                        classNamePrefix=""
                        onChange={this.handleOptionSelect}
                      />
                      {/* Display description below the Select based on selected option */}
                      {/* {this.state.selectedOption && (
                <span>{this.state.selectedOption.description}</span>
              )} */}
                      {/* <span>{this.state.selectedOption?.description}</span> */}
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="brand">Brand</Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="Brand"
                        classNamePrefix=""
                        onChange={this.handleOptionSelect}
                      />
                      {/* Display description below the Select based on selected option */}
                      {/* {this.state.selectedOption && (
                <span>{this.state.selectedOption.description}</span>
              )} */}
                      {/* <span>{this.state.selectedOption?.description}</span> */}
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="model">Model</Label>
                      <Input
                        value={"PLX2014K"}
                        className="form-control"
                        type="text"
                        id="model"
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="color">Color</Label>
                      <Select
                        options={ColorOptions}
                        placeholder="Color"
                        classNamePrefix=""
                        // onChange={this.handleColorChange}
                        // styles={selectStyles} // Apply custom styles to the select component
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="fuel type">Fuel Type</Label>
                      <Select
                        options={fuelType}
                        placeholder="Fuel type"
                        classNamePrefix=""
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        value={"DAFPV228"}
                        className="form-control"
                        type="text"
                        id="location"
                        disabled
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="location">Engine CC</Label>
                      <Input
                        value={"4500"}
                        className="form-control"
                        type="number"
                        id="location"
                        disabled
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="chassis number">
                        Chassis number <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"CHASIS018X42414218"}
                        className="form-control"
                        type="text"
                        id="chassis number"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="year of manufacture">
                        Year of Manufacture
                      </Label>
                      <Input
                        className="form-control"
                        type="text"
                        id="Year of Manufacture"
                        value={"2015"}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <span>Date </span>

                      <Flatpickr
                        className="form-control"
                        //   dateFormat= "m-d-Y"
                        //   value={this.props.selectedDate}
                        //   onChange={this.onDateselection}
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="performance">Performance</Label>
                      <Select
                        options={Performance}
                        placeholder="performance"
                        classNamePrefix=""
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="Insurance Amount">
                        Insurance Amount (Yearly)
                      </Label>
                      <Input
                        value={"1500"}
                        className="form-control"
                        type="text"
                        id="Insurance Amount"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="Road Tax Amount">
                        Road Tax Amount (Yearly)
                      </Label>
                      <Input
                        value={"250"}
                        className="form-control"
                        type="text"
                        id="Road Tax Amount"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="Empty Vehicle Mass">
                        Empty Vehicle Mass
                      </Label>
                      <Input
                        value={"9500.000"}
                        className="form-control"
                        type="text"
                        id="Empty Vehicle Mass"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="Gross Vehicle Mass ">
                        Gross Vehicle Mass
                      </Label>
                      <Input
                        value={"60000.000"}
                        className="form-control"
                        type="text"
                        id="  Gross Vehicle Mass"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="Tolerance">Tolerance %</Label>
                      <Input
                        value={"95.00"}
                        className="form-control"
                        type="text"
                        id="Tolerance"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="Skill Criteria">Skill Criteria</Label>
                      <Input
                        value={"5,10,15"}
                        className="form-control"
                        type="text"
                        id="Skill Criteria"
                        disabled
                      />
                    </FormGroup>
                  </Row>
                  <h6 className="text-primary">Time</h6>
                  <hr />

                  <Row className="pb-3">
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Loading Time">Loading Time</Label>
                      <Input
                        value={"0.50 Hours"}
                        className="form-control"
                        type="text"
                        id="Loading Time"
                        disabled
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="OffLoading Time">OffLoading Time</Label>
                      <Input
                        value={"0.50 Hours"}
                        className="form-control"
                        type="text"
                        id="OffLoading Time"
                        disabled
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="Earliest Start Time">
                        Earliest Start Time{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"07.0"}
                        className="form-control"
                        type="text"
                        id="Earliest Start Time"
                        disabled
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="Latest Start Time">
                        Latest Start Time <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"17.0"}
                        className="form-control"
                        type="text"
                        id="Latest Start Time"
                        disabled
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="Start Time Supp">
                        Start Time Supp <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"8.0"}
                        className="form-control"
                        type="text"
                        id="Start Time Supp"
                        disabled
                      />
                    </FormGroup>
                  </Row>

                  <h6 className="text-primary">Hours</h6>

                  <Row className="pb-3">
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Cost Per Unit Overtime">
                        Cost Per Unit Overtime{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"5.00 EUR"}
                        className="form-control"
                        type="text"
                        id="CostPerUnitOvertime"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Cost Per Unit Distance">
                        Cost Per Unit Distance{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"1.50 EUR/kilometers"}
                        className="form-control"
                        type="text"
                        id="CostPerUnitDistance"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Cost Per Unit Overtime">
                        Fixed cost <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"3.00 EUR/Hour"}
                        className="form-control"
                        type="text"
                        id="CostPerUnitOvertime"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Cost Per Unit Overtime">
                        Cost Per Unit Overtime{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"50.00 EUR"}
                        className="form-control"
                        type="text"
                        id="CostPerUnitOvertime"
                      />
                    </FormGroup>
                  </Row>

                  <h6 className="text-primary">Trip</h6>
                  <hr />

                  <Row className="pb-3">
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Maximumtotaldistance">
                        Maximum total distance{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"25000 Kilometers"}
                        className="form-control"
                        type="text"
                        id="Maximumtotaldistance"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Maxtotaltime">
                        Max. total time<span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"10.00 Hours"}
                        className="form-control"
                        type="text"
                        id="Maxtotaltime"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="MaxTotalTravelTime">
                        Max Total Travel Time
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"8.00 Hours"}
                        className="form-control"
                        type="text"
                        id="MaxTotalTravelTime"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Maximumspeed">
                        Maximum speed (per hour){" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"50.00 Kilometers"}
                        className="form-control"
                        type="text"
                        id="Maximumspeed"
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="RouteNo">Route No.</Label>
                      <Select
                        options={RouteNo}
                        placeholder="Route No"
                        classNamePrefix=""
                      />
                    </FormGroup>
                  </Row>

                  <h6 className="text-primary">Loading</h6>
                  <hr />
                  {/* THIS IS LOADING  */}
                  <Row className="pb-3">
                    <FormGroup className="col-md-3">
                      <Label htmlFor="MaxAllowedWeight">
                        Max Allowed Weight{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"45000 Kilometers"}
                        className="form-control"
                        type="text"
                        id="MaxAllowedWeight"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="MaxAllowedVolume">
                        Max Allowed Volume
                      </Label>
                      <Input
                        // value={"40000.000"}
                        className="form-control"
                        type="text"
                        id="MaxAllowedVolume"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Quantity">Quantity</Label>
                      <Input
                        value={"500.00 UN"}
                        className="form-control"
                        type="text"
                        id="Quantity"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="MaxOrderCount">Max Order Count</Label>
                      <Input
                        value={"50"}
                        className="form-control"
                        type="text"
                        id="MaxOrderCount"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="MaxPalletCount">Max Pallet Count</Label>
                      <Input
                        value={"0"}
                        className="form-control"
                        type="text"
                        id="MaxPalletCount"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="StackHeight">Stack Height</Label>
                      <Input
                        value={"0.00"}
                        className="form-control"
                        type="text"
                        id="Stack Height"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Surfacesol">Surface sol</Label>
                      <Input
                        value={"50"}
                        className="form-control"
                        type="text"
                        id="Surfacesol"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="VehicleFuelCapacity">
                        Vehicle Fuel Capacity
                      </Label>
                      <Input
                        value={"0.00"}
                        className="form-control"
                        type="text"
                        id="VehicleFuelCapacity"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="MaxOrderCount">
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        // value={"50"}
                        className="form-control"
                        type="text"
                        id="MaxOrderCount"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="VehicleLength">
                        Vehicle Length<span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"175 CM"}
                        className="form-control"
                        type="text"
                        id="VehicleLength"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="VehicleWidth">
                        Vehicle Width<span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"244 CM"}
                        className="form-control"
                        type="text"
                        id="VehicleWidth"
                      />
                    </FormGroup>
                    <FormGroup className="col-md-3">
                      <Label htmlFor="Height">
                        Height <span className="text-danger">*</span>
                      </Label>
                      <Input
                        value={"91 CM"}
                        className="form-control"
                        type="text"
                        id="Height"
                      />
                    </FormGroup>
                  </Row>

                  <h6 className="text-primary">Driver Allocation</h6>
                  <hr />

                  <Row className="pb-3">
                    <FormGroup className="col-md-3">
                      <Label htmlFor="CurrentlyAllocDriver">
                        Currently Alloc Driver
                      </Label>
                      <Input
                        // value={"0.50 Hours"}
                        className="form-control"
                        type="text"
                        id="CurrentlyAllocDriver"
                        disabled
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="DateDrivAllocation">Date</Label>
                      <Input
                        // value={"0.50 Hours"}
                        className="form-control"
                        type="text"
                        id="DateDrivAllocation"
                        disabled
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="TimeDriverAllocation">Time</Label>
                      <Input
                        // value={"07.0"}
                        className="form-control"
                        type="text"
                        id="Earliest Start Time"
                        disabled
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="co2coef">co2 coef</Label>
                      <Input
                        value={"0.00"}
                        className="form-control"
                        type="text"
                        id="co2coef"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-2 d-flex  justify-content-center align-items-center">
                      <Label htmlFor="customSwitch1">Side Operation</Label>
                      <div className="custom-control custom-switch mb-2">
                        <Input
                          type="checkbox"
                          className="custom-control-input"
                          id="customSwitch1"
                          defaultChecked
                        />
                        <Label
                          className="custom-control-label ml-2"
                          htmlFor="customSwitch1"
                          onClick={(e) => {
                            this.setState({
                              toggleSwitch: !this.state.toggleSwitch,
                            });
                          }}
                        ></Label>
                      </div>
                    </FormGroup>
                  </Row>

                  <h6 className="text-primary">Services</h6>
                  <hr />

                  <Row>
                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="ServiceListCode">Service List Code</Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="ServiceListCode"
                        classNamePrefix=""
                        id="ServiceListCode"
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="Meterreadingunits">
                        Meter reading units
                      </Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="Meterreadingunits"
                        classNamePrefix=""
                        id="Meterreadingunits"
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="Assistant">Assistant</Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="Assistant"
                        classNamePrefix=""
                        id="Assistant"
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="Salesman">Sales man</Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="Salesman"
                        classNamePrefix=""
                        id="Salesman"
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="Technician">Technician</Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="Technician"
                        classNamePrefix=""
                        id="Technician"
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="Unavailable">Unavailable</Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="Unavailable
                "
                        classNamePrefix=""
                        id="Unavailable
                "
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="SpecialEquipments">
                        Special Equipments
                      </Label>
                      <Input
                        // value={"0.50 Hours"}
                        className="form-control"
                        type="text"
                        id="Special Equipments"
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="Route Zone">Route Zone</Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="Route Zone"
                        classNamePrefix=""
                        id="Route Zone"
                      />
                    </FormGroup>

                    <FormGroup className="select2-container col-md-3">
                      <Label htmlFor="Style">
                        Style <span className="text-danger">*</span>
                      </Label>
                      <Select
                        options={optionVehicleCarrier}
                        placeholder="Style"
                        classNamePrefix=""
                        id="Style"
                      />
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="EquipmentCode">Equipment Code</Label>
                      <Input
                        // value={"0.50 Hours"}
                        className="form-control"
                        type="text"
                        id="Special Equipments"
                        disabled
                      />
                    </FormGroup>
                  </Row>
                </Container>
              </Row>

              {/* Route reneawals */}

              <Row>
                <Col md="12">
                  <Row>
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle
                        className="h2 mb-0 text-primary mt-3"
                        style={{ fontSize: "1.2rem" }}
                      >
                        Controls
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle className="h4 mb-0 text-primary py-3">
                        Route Renewals
                      </CardTitle>
                    </Col>
                  </Row>
                  <hr />
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr className="text-center">
                        <th style={{ background: "#3498db", color: "white" }}>
                          Sr.No
                        </th>
                        <th style={{ background: "#3498db", color: "white" }}>
                          Actions
                        </th>
                        <th
                          className="text-nowrap"
                          style={{ background: "#3498db", color: "white" }}
                        >
                          Site
                        </th>
                        <th style={{ background: "#3498db", color: "white" }}>
                          Name
                        </th>
                        <th style={{ background: "#3498db", color: "white" }}>
                          Service Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.routeRenewals.map((row, index) => (
                        <tr key={index} className="text-center">
                          <td>
                            <Button size="sm" color="primary">
                              {index + 1}
                            </Button>
                          </td>
                          <td>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() =>
                                this.handleDelete(index, "routeRenewals")
                              }
                              disabled={index === 0}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </Button>
                          </td>
                          <td>
                            <Input
                              type="text"
                              value={row.site}
                              onChange={(e) =>
                                this.handleInputChange(
                                  index,
                                  "site",
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) =>
                                this.handleKeyDown(
                                  index,
                                  "site",
                                  e,
                                  "routerenewals"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="text"
                              value={row.name}
                              onChange={(e) =>
                                this.handleInputChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) =>
                                this.handleKeyDown(
                                  index,
                                  "name",
                                  e,
                                  "routerenewals"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="text"
                              value={row.servicetime}
                              onChange={(e) =>
                                this.handleInputChange(
                                  index,
                                  "servicetime",
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) =>
                                this.handleKeyDown(
                                  index,
                                  "servicetime",
                                  e,
                                  "routerenewals"
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>

              {/* Drivers */}
              <Row>
                <Col md="12">
                  <Row>
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle className="h4 mb-0 text-primary py-3">
                        Drivers
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup check inline>
                        <Input style={{ padding: "1rem" }} type="checkbox" />
                        <Label check>All Drivers</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr className="text-center">
                        <th style={{ background: "#3498db", color: "white" }}>
                          Sr.No
                        </th>
                        <th style={{ background: "#3498db", color: "white" }}>
                          Actions
                        </th>
                        <th
                          className="text-nowrap"
                          style={{ background: "#3498db", color: "white" }}
                        >
                          Loader Id
                        </th>
                        <th style={{ background: "#3498db", color: "white" }}>
                          Driver
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Drivers.map((row, index) => (
                        <tr key={index} className="text-center">
                          <td>
                            <Button size="sm" color="primary">
                              {index + 1}
                            </Button>
                          </td>
                          <td>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() =>
                                this.handleDelete(index, "drivers")
                              }
                              disabled={index === 0}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </Button>
                          </td>
                          <td>
                            <Input
                              type="text"
                              value={row.loaderId}
                              onChange={(e) =>
                                this.handleDriverInputChange(
                                  index,
                                  "loaderId",
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) =>
                                this.handleKeyDown(
                                  index,
                                  "loaderId",
                                  e,
                                  "drivers"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="text"
                              value={row.driver}
                              onChange={(e) =>
                                this.handleDriverInputChange(
                                  index,
                                  "driver",
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) =>
                                this.handleKeyDown(
                                  index,
                                  "driver",
                                  e,
                                  "drivers"
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>

              {/* All customers */}
              <Row>
                <Col md="12">
                  <Row>
                    <Col md="6" className="d-flex align-items-center">
                      <CardTitle className="h4 mb-0 text-primary py-3">
                        Customer
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup check inline>
                        <Input style={{ padding: "1rem" }} type="checkbox" />
                        <Label check>All Customer</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr className="text-center">
                        <th style={{ background: "#3498db", color: "white" }}>
                          Sr.No
                        </th>
                        <th style={{ background: "#3498db", color: "white" }}>
                          Actions
                        </th>
                        <th
                          className="text-nowrap"
                          style={{ background: "#3498db", color: "white" }}
                        >
                          Customer
                        </th>
                        <th style={{ background: "#3498db", color: "white" }}>
                          Company Name
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Customers.map((row, index) => (
                        <tr key={index} className="text-center">
                          <td>
                            <Button size="sm" color="primary">
                              {index + 1}
                            </Button>
                          </td>
                          <td>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() =>
                                this.handleDelete(index, "customers")
                              }
                              disabled={index === 0}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </Button>
                          </td>
                          <td>
                            <Input
                              type="text"
                              value={row.customer}
                              onChange={(e) =>
                                this.handleCustomerInputChange(
                                  index,
                                  "customer",
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) =>
                                this.handleKeyDown(
                                  index,
                                  "customer",
                                  e,
                                  "customers"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="text"
                              value={row.companyname}
                              onChange={(e) =>
                                this.handleCustomerInputChange(
                                  index,
                                  "companyname",
                                  e.target.value
                                )
                              }
                              onKeyDown={(e) =>
                                this.handleKeyDown(
                                  index,
                                  "companyname",
                                  e,
                                  "customers"
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>



              {/* All Categories */}
            </Card>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default AddNewVehicle;
