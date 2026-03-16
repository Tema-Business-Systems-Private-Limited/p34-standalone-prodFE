// import React from 'react'

// const VehicleClassDetails = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default VehicleClassDetails

import React from "react";
import { Link } from "react-router-dom";
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

import Select from "react-select";
const VehicleClassAssociationDetails = () => {
  const optionGroup = [
    { label: "No", value: "No" },
    { label: "Yes", value: "Yes" },
  ];

  const vehicleType = [
    { label: "Single Unit", value: "Single Unit" },
    { label: "Multi Unit", value: "Multi Unit" },
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
                  Vehicle Class Association Details
                </CardTitle>
              </Col>

              <Col
                md="6"
                className="d-flex justify-content-end align-items-center"
              >
                <CardTitle className="h4 mb-0 text-primary p-3">
                  <Link to="/vehiclemanagement/vehicleclassassociation">
                    <Button>Back</Button>
                  </Link>
                </CardTitle>
              </Col>
            </Row>

            <hr className="my-2" />

            <Row>
              <Col md="12" className="px-4 py-4">
                <Row>
                  <FormGroup className="col-md-3">
                    <Label htmlFor="classcode">
                      Class Code <span className="text-danger">*</span>
                    </Label>
                    <Input
                      className="form-control"
                      type="text"
                      id="classcode"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-3">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      className="form-control"
                      type="text"
                      id="description"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-3">
                    <Label htmlFor="skillno">Skill No.</Label>
                    <Input className="form-control" type="text" id="skillno" />
                  </FormGroup>

                  {/* <FormGroup className="col-md-3">
                    <Label htmlFor="type">Type</Label>
                    <Input className="form-control" type="text" id="type" />
                  </FormGroup> */}

                  <FormGroup className="select2-container col-md-3">
                    <Label htmlFor="Type">Type</Label>
                    <Select
                      options={vehicleType}
                      placeholder="Type"
                      classNamePrefix=""
                    />
                  </FormGroup>
                </Row>
              </Col>
            </Row>

            {/* below Trailer Type table */}
            <hr />
            <Row>
              <Col md="12">
                {/* <h5 className="text-primary">Associations</h5> */}
                <Row>
                  <Col md="6" className="d-flex align-items-center">
                    <CardTitle className="h4 mb-0 text-primary p-3">
                      Trailer Type
                    </CardTitle>
                  </Col>
                </Row>

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
                        Trailer
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Description
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Skill No
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        No of axle
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Max Allowded Weight
                      </th>

                      <th style={{ background: "#3498db", color: "white" }}>
                        UOM
                      </th>

                      <th style={{ background: "#3498db", color: "white" }}>
                        Max Allowded Volume
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        UOM
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
                        <td></td>

                        {/* Add more table data as needed */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/* Below one is Equipment Type */}
            <hr />
            <Row>
              <Col md="12">
                {/* <h5 className="text-primary">Associations</h5> */}
                <Row>
                  <Col md="6" className="d-flex align-items-center">
                    <CardTitle className="h4 mb-0 text-primary p-3">
                      Equipment Type
                    </CardTitle>
                  </Col>
                </Row>

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
                        Equipment Type
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Description
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Skill No
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        No of axle
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Max Allowded Weight
                      </th>

                      <th style={{ background: "#3498db", color: "white" }}>
                        UOM
                      </th>

                      <th style={{ background: "#3498db", color: "white" }}>
                        Max Allowded Volume
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        UOM
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
                        <td></td>

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

export default VehicleClassAssociationDetails;
