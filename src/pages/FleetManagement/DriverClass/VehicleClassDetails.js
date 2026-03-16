// import React from 'react'

// const VehicleClassDetails = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default VehicleClassDetails

import React from "react";

import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  CardTitle,
  Col,
  Container,
  Label,
  Row,
  FormGroup,
  Input,
  Table,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
const VehicleClassDetails = () => {
  const optionGroup = [
    { label: "No", value: "No" },
    { label: "Yes", value: "Yes" },
  ];

  const dummyData = [
    {
      "Sr.No": 1,
      linkType: "Trailer",
      TrailerEquipment: "Single unit",
      Weight: "2 KG",
      UOM: "10/12/23",
      Volume: "CORPS2202XCHG0000004(CHECK-IN)",
      Volume: "5000",
      VolumeUOM: "L",
      NoOfAxle: "",
    },
    {
      "Sr.No": 2,
      linkType: "Trailer",
      TrailerEquipment: " ",
      Weight: "1.5 KG",
      UOM: "02/05/24",
      Volume: "6000",
      VolumeUOM: "L",
      NoOfAxle: "",
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <ToastContainer />
        <Container fluid>
          {/* This is for vehicle class inputs */}
          <Card>
            <Row>
              <Col md="6" className="d-flex align-items-center">
                <CardTitle className="h4 mb-0 text-primary p-3">
                  Vehicle class details
                </CardTitle>
              </Col>
              <Col
                md="6"
                className="d-flex justify-content-end align-items-center"
              >
                <CardTitle className="h4 mb-0 text-primary p-3">
                  <Link to="/vehiclemanagement/vehicleclass">
                    <Button>Back</Button>
                  </Link>
                </CardTitle>
              </Col>
            </Row>

            <hr className="my-2" />

            <Row>
              <Col md="8" className="px-4 py-4">
                <Row>
                  <FormGroup className="col-md-4">
                    <Label htmlFor="classcode">
                      Class Code <span className="text-danger">*</span>
                    </Label>
                    <Input
                      className="form-control"
                      type="text"
                      id="classcode"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-4">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      className="form-control"
                      type="text"
                      id="description"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-2 d-flex  justify-content-center align-items-center ">
                    <Label htmlFor="Tailgate">Active</Label>
                    <div className="custom-control custom-switch">
                      <Input
                        type="checkbox"
                        className="custom-control-input"
                        id="Tailgate"
                        defaultChecked
                      />
                      <Label
                        className="custom-control-label ml-2"
                        htmlFor="Tailgate"
                        // onClick={(e) => {
                        //   this.setState({
                        //     toggleSwitch: !this.state.toggleSwitch,
                        //   });
                        // }}
                      ></Label>
                    </div>
                  </FormGroup>

                  <FormGroup className="col-md-4">
                    <Label htmlFor="country">Country</Label>
                    <Input className="form-control" type="text" id="country" />
                  </FormGroup>

                  <FormGroup className="col-md-4">
                    <Label htmlFor="numberofaxle">Number Of Axle</Label>
                    <Input
                      className="form-control"
                      type="text"
                      id="numberofaxle"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-4">
                    <Label htmlFor="maximumweight">Maximum Weight</Label>
                    <Input
                      className="form-control"
                      type="text"
                      id="maximumweight"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-4">
                    <Label htmlFor="maximumvolume">Maximum Volume</Label>
                    <Input
                      className="form-control"
                      type="text"
                      id="maximumvolume"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-4">
                    <Label htmlFor="skillnumber">Skill No.</Label>
                    <Input
                      className="form-control"
                      type="text"
                      id="skillnumber"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-4">
                    <Label htmlFor="inspectioncheckin">Inspction Checkin</Label>
                    <Input
                      className="form-control"
                      type="text"
                      id="inspectioncheckin"
                    />
                  </FormGroup>

                  <FormGroup className="select2-container col-md-4">
                    <Label htmlFor="mandatory">Mandatory</Label>
                    <Select
                      options={optionGroup}
                      placeholder="mandatory"
                      classNamePrefix=""
                    />
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label htmlFor="inspectioncheckout">
                      Inspction Checkout
                    </Label>
                    <Input
                      className="form-control"
                      type="text"
                      id="inspectioncheckout"
                    />
                  </FormGroup>

                  <FormGroup className="select2-container col-md-4">
                    <Label htmlFor="mandatory">Mandatory</Label>
                    <Select
                      options={optionGroup}
                      placeholder="mandatory"
                      classNamePrefix=""
                    />
                  </FormGroup>
                </Row>
              </Col>

              <Col
                md="4"
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  width={300}
                  src="https://img.etimg.com/thumb/width-640,height-480,imgsize-51826,resizemode-75,msid-86310328/industry/auto/lcv-hcv/daimler-india-ready-for-prolonged-truck-upcycle-says-md/untitled-7.jpg"
                />
              </Col>
            </Row>

            {/* below Associations table */}

            <Row>
              <Col md="12">
                {/* <h5 className="text-primary">Associations</h5> */}
                <Row>
                  <Col md="6" className="d-flex align-items-center">
                    <CardTitle className="h4 mb-0 text-primary p-3">
                      Associations
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
                      <th
                        className="text-nowrap"
                        style={{ background: "#3498db", color: "white" }}
                      >
                        Link Type
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Trailer/Equipment Co
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Weight
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        UOM
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Volume
                      </th>

                      <th style={{ background: "#3498db", color: "white" }}>
                        Volume UOM
                      </th>

                      <th style={{ background: "#3498db", color: "white" }}>
                        No. of Axle
                      </th>
                      {/* Add more table headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.linkType}</td>
                        <td>{item.TrailerEquipment}</td>
                        <td>{item.Weight}</td>
                        <td>{item.UOM}</td>
                        <td>{item.Volume}</td>
                        <td>{item.VolumeUOM}</td>
                        <td>{item.NoOfAxle}</td>
                        {/* Add more table data as needed */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default VehicleClassDetails;
