// // import React from 'react'

// // const VehicleClassDetails = () => {
// //   return (
// //     <div>

// //     </div>
// //   )
// // }

// // export default VehicleClassDetails

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import {
//   Card,
//   CardTitle,
//   Col,
//   Container,
//   Label,
//   Row,
//   FormGroup,
//   Input,
//   Table,
//   Button,
// } from "reactstrap";

// import Select from "react-select";
// const VehicleAssociationAdd = () => {
//   const [rows, setRows] = useState([
//     {
//       linkType: "",
//       TrailerEquipment: "",
//       Weight: "",
//       UOM1: "",
//       Volume: "",
//       VolumeUOM: "",
//       NoOfAxle: "",
//       UOM2: "",
//     },
//   ]);

//   console.log(rows, "these are rows");

//   const handleInputChange = (index, field, value) => {
//     const newRows = [...rows];
//     newRows[index][field] = value;
//     setRows(newRows);

//     // Check if all fields in the last row are filled
//     const lastRow = newRows[newRows.length - 1];
//     const allFieldsFilled = Object.values(lastRow).every(
//       (val) => val.trim() !== ""
//     );

//     // Check if the last row is completely filled
//     if (
//       index === rows.length - 1 &&
//       Object.values(newRows[index]).every((val) => val !== "")
//     ) {
//       setRows([
//         ...newRows,
//         {
//           linkType: "",
//           TrailerEquipment: "",
//           Weight: "",
//           UOM1: "",
//           Volume: "",
//           VolumeUOM: "",
//           NoOfAxle: "",
//           UOM2: "",
//         },
//       ]);
//     }

//     if (allFieldsFilled) {
//       setRows([
//         ...newRows,
//         {
//           linkType: "",
//           TrailerEquipment: "",
//           Weight: "",
//           UOM1: "",
//           Volume: "",
//           VolumeUOM: "",
//           NoOfAxle: "",
//           UOM2: "",
//         },
//       ]);
//     }
//   };

//   //   delete row

//   const handleDeleteTrailerType = (index) => {
//     if (index === 0) return;
//     const newRows = rows.filter((_, i) => i !== index);
//     setRows(newRows);
//   };

//   const optionGroup = [
//     { label: "No", value: "No" },
//     { label: "Yes", value: "Yes" },
//   ];

//   const vehicleType = [
//     { label: "Single Unit", value: "Single Unit" },
//     { label: "Multi Unit", value: "Multi Unit" },
//   ];
//   const dummyData = [
//     {
//       "Sr.No": 1,
//       linkType: "Trailer",
//       TrailerEquipment: "Single unit",
//       Weight: "2 KG",
//       UOM: "10/12/23",
//       Volume: "CORPS2202XCHG0000004(CHECK-IN)",
//       Volume: "5000",
//       VolumeUOM: "L",
//       NoOfAxle: "",
//     },
//     {
//       "Sr.No": 2,
//       linkType: "Trailer",
//       TrailerEquipment: " ",
//       Weight: "1.5 KG",
//       UOM: "02/05/24",
//       Volume: "6000",
//       VolumeUOM: "L",
//       NoOfAxle: "",
//     },
//   ];
//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <ToastContainer />
//         <Container fluid>
//           {/* This is for vehicle class inputs */}
//           <Card>
//             <Row>
//               <Col md="6" className="d-flex align-items-center">
//                 <CardTitle className="h4 mb-0 text-primary p-3">
//                   Vehicle Class Association Add
//                 </CardTitle>
//               </Col>

//               <Col
//                 md="6"
//                 className="d-flex justify-content-end align-items-center"
//               >
//                 <CardTitle className="h4 mb-0 text-primary p-3">
//                   <Link to="/vehiclemanagement/vehicleclassassociation">
//                     <Button>Back</Button>
//                   </Link>
//                 </CardTitle>
//               </Col>
//             </Row>

//             <hr className="my-2" />

//             <Row>
//               <Col md="12" className="px-4 py-4">
//                 <Row>
//                   <FormGroup className="col-md-3">
//                     <Label htmlFor="classcode">
//                       Class Code <span className="text-danger">*</span>
//                     </Label>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       id="classcode"
//                     />
//                   </FormGroup>

//                   <FormGroup className="col-md-3">
//                     <Label htmlFor="description">Description</Label>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       id="description"
//                     />
//                   </FormGroup>

//                   <FormGroup className="col-md-3">
//                     <Label htmlFor="skillno">Skill No.</Label>
//                     <Input className="form-control" type="text" id="skillno" />
//                   </FormGroup>

//                   {/* <FormGroup className="col-md-3">
//                     <Label htmlFor="type">Type</Label>
//                     <Input className="form-control" type="text" id="type" />
//                   </FormGroup> */}

//                   <FormGroup className="select2-container col-md-3">
//                     <Label htmlFor="Type">Type</Label>
//                     <Select
//                       options={vehicleType}
//                       placeholder="Type"
//                       classNamePrefix=""
//                     />
//                   </FormGroup>
//                 </Row>
//               </Col>
//             </Row>

//             {/* below Trailer Type table */}
//             <hr />
//             <Row>
//               <Col md="12">
//                 <Row>
//                   <Col md="6" className="d-flex align-items-center">
//                     <CardTitle className="h4 mb-0 text-primary p-3">
//                       Trailer Type
//                     </CardTitle>
//                   </Col>
//                 </Row>
//                 <Table responsive striped bordered hover>
//                   <thead>
//                     <tr className="text-center">
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Sr.No
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Actions
//                       </th>
//                       <th
//                         className="text-nowrap"
//                         style={{ background: "#3498db", color: "white" }}
//                       >
//                         Trailer
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Description
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Skill No
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         No of axle
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Max Allowed Weight
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         UOM
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Max Allowed Volume
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         UOM
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((row, index) => (
//                       <tr key={index} className="text-center">
//                         <td>
//                           <Button size="sm" color="primary">
//                             {index + 1}
//                           </Button>
//                         </td>
//                         <td>
//                           {index !== 0 ? (
//                             <Button
//                               size="sm"
//                               color="danger"
//                               onClick={() => handleDeleteTrailerType(index)}
//                             >
//                               <i className="ri-delete-bin-line"></i>
//                             </Button>
//                           ) : (
//                             <Button
//                               size="sm"
//                               disabled
//                               color="danger"
//                               onClick={() => handleDeleteTrailerType(index)}
//                             >
//                               <i className="ri-delete-bin-line"></i>
//                             </Button>
//                           )}
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.linkType}
//                             onChange={(e) =>
//                               handleInputChange(
//                                 index,
//                                 "linkType",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.TrailerEquipment}
//                             onChange={(e) =>
//                               handleInputChange(
//                                 index,
//                                 "TrailerEquipment",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.Weight}
//                             onChange={(e) =>
//                               handleInputChange(index, "Weight", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.UOM1}
//                             onChange={(e) =>
//                               handleInputChange(index, "UOM1", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.Volume}
//                             onChange={(e) =>
//                               handleInputChange(index, "Volume", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.VolumeUOM}
//                             onChange={(e) =>
//                               handleInputChange(
//                                 index,
//                                 "VolumeUOM",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.NoOfAxle}
//                             onChange={(e) =>
//                               handleInputChange(
//                                 index,
//                                 "NoOfAxle",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.UOM2}
//                             onChange={(e) =>
//                               handleInputChange(index, "UOM2", e.target.value)
//                             }
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//                 {/* <div className="d-flex justify-content-end">
//                     <Button color="warning" onClick={clearInputs} className="mr-3">Clear</Button>

//                     </div> */}
//               </Col>
//             </Row>

//             {/* Below one is Equipment Type */}
//             <hr />
//             <Row>
//               <Col md="12">
//                 {/* <h5 className="text-primary">Associations</h5> */}
//                 <Row>
//                   <Col md="6" className="d-flex align-items-center">
//                     <CardTitle className="h4 mb-0 text-primary p-3">
//                       Equipment Type
//                     </CardTitle>
//                   </Col>
//                 </Row>

//                 <Table responsive striped bordered hover>
//                   <thead>
//                     <tr className="text-center">
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Sr.No
//                       </th>
//                       <th
//                         className="text-nowrap"
//                         style={{ background: "#3498db", color: "white" }}
//                       >
//                         Equipment Type
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Description
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Skill No
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         No of axle
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Max Allowded Weight
//                       </th>

//                       <th style={{ background: "#3498db", color: "white" }}>
//                         UOM
//                       </th>

//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Max Allowded Volume
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         UOM
//                       </th>

//                       {/* Add more table headers as needed */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {dummyData.map((item, index) => (
//                       <tr key={index} className="text-center">
//                         <td>{index + 1}</td>
//                         <td>{item.linkType}</td>
//                         <td>{item.TrailerEquipment}</td>
//                         <td>{item.Weight}</td>
//                         <td>{item.UOM}</td>
//                         <td>{item.Volume}</td>
//                         <td>{item.VolumeUOM}</td>
//                         <td>{item.NoOfAxle}</td>
//                         <td></td>

//                         {/* Add more table data as needed */}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Col>
//             </Row>

//             <div className="d-flex justify-content-end p-3">
//               <Button color="primary" className="mr-3">
//                 Create
//               </Button>
//             </div>
//           </Card>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default VehicleAssociationAdd;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import {
//   Card,
//   CardTitle,
//   Col,
//   Container,
//   Label,
//   Row,
//   FormGroup,
//   Input,
//   Table,
//   Button,
// } from "reactstrap";
// import Select from "react-select";

// const VehicleAssociationAdd = () => {
//   const [rows, setRows] = useState([
//     {
//       linkType: "",
//       TrailerEquipment: "",
//       Weight: "",
//       UOM1: "",
//       Volume: "",
//       VolumeUOM: "",
//       NoOfAxle: "",
//       UOM2: "",
//     },
//   ]);

//   const handleInputChange = (index, field, value) => {
//     const newRows = [...rows];
//     newRows[index][field] = value;
//     setRows(newRows);

//     const lastRow = newRows[newRows.length - 1];
//     const allFieldsFilled = Object.values(lastRow).every(
//       (val) => val.trim() !== ""
//     );

//     if (
//       index === rows.length - 1 &&
//       allFieldsFilled
//     ) {
//       setRows([
//         ...newRows,
//         {
//           linkType: "",
//           TrailerEquipment: "",
//           Weight: "",
//           UOM1: "",
//           Volume: "",
//           VolumeUOM: "",
//           NoOfAxle: "",
//           UOM2: "",
//         },
//       ]);
//     }
//   };

//   const handleDeleteTrailerType = (index) => {
//     if (index === 0) return;
//     const newRows = rows.filter((_, i) => i !== index);
//     setRows(newRows);
//   };

//   const optionGroup = [
//     { label: "No", value: "No" },
//     { label: "Yes", value: "Yes" },
//   ];

//   const vehicleType = [
//     { label: "Single Unit", value: "Single Unit" },
//     { label: "Multi Unit", value: "Multi Unit" },
//   ];

//   const dummyData = [
//     {
//       "Sr.No": 1,
//       linkType: "Trailer",
//       TrailerEquipment: "Single unit",
//       Weight: "2 KG",
//       UOM: "10/12/23",
//       Volume: "CORPS2202XCHG0000004(CHECK-IN)",
//       VolumeUOM: "5000 L",
//       NoOfAxle: "",
//     },
//     {
//       "Sr.No": 2,
//       linkType: "Trailer",
//       TrailerEquipment: "",
//       Weight: "1.5 KG",
//       UOM: "02/05/24",
//       VolumeUOM: "6000 L",
//       NoOfAxle: "",
//     },
//   ];

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <ToastContainer />
//         <Container fluid>
//           <Card>
//             <Row>
//               <Col md="6" className="d-flex align-items-center">
//                 <CardTitle className="h4 mb-0 text-primary p-3">
//                   Vehicle Class Association Add
//                 </CardTitle>
//               </Col>
//               <Col
//                 md="6"
//                 className="d-flex justify-content-end align-items-center"
//               >
//                 <CardTitle className="h4 mb-0 text-primary p-3">
//                   <Link to="/vehiclemanagement/vehicleclassassociation">
//                     <Button>Back</Button>
//                   </Link>
//                 </CardTitle>
//               </Col>
//             </Row>
//             <hr className="my-2" />
//             <Row>
//               <Col md="12" className="px-4 py-4">
//                 <Row>
//                   <FormGroup className="col-md-3">
//                     <Label htmlFor="classcode">
//                       Class Code <span className="text-danger">*</span>
//                     </Label>
//                     <Input className="form-control" type="text" id="classcode" />
//                   </FormGroup>
//                   <FormGroup className="col-md-3">
//                     <Label htmlFor="description">Description</Label>
//                     <Input className="form-control" type="text" id="description" />
//                   </FormGroup>
//                   <FormGroup className="col-md-3">
//                     <Label htmlFor="skillno">Skill No.</Label>
//                     <Input className="form-control" type="text" id="skillno" />
//                   </FormGroup>
//                   <FormGroup className="select2-container col-md-3">
//                     <Label htmlFor="Type">Type</Label>
//                     <Select
//                       options={vehicleType}
//                       placeholder="Type"
//                       classNamePrefix=""
//                     />
//                   </FormGroup>
//                 </Row>
//               </Col>
//             </Row>
//             <hr />
//             <Row>
//               <Col md="12">
//                 <Row>
//                   <Col md="6" className="d-flex align-items-center">
//                     <CardTitle className="h4 mb-0 text-primary p-3">
//                       Trailer Type
//                     </CardTitle>
//                   </Col>
//                 </Row>
//                 <Table responsive striped bordered hover>
//                   <thead>
//                     <tr className="text-center">
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Sr.No
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Actions
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Trailer
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Description
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Skill No
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         No of axle
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Max Allowed Weight
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         UOM
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Max Allowed Volume
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         UOM
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((row, index) => (
//                       <tr key={index} className="text-center">
//                         <td>
//                           <Button size="sm" color="primary">
//                             {index + 1}
//                           </Button>
//                         </td>
//                         <td>
//                           <Button
//                             size="sm"
//                             color="danger"
//                             onClick={() => handleDeleteTrailerType(index)}
//                             disabled={index === 0}
//                           >
//                             <i className="ri-delete-bin-line"></i>
//                           </Button>
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.linkType}
//                             onChange={(e) =>
//                               handleInputChange(index, "linkType", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.TrailerEquipment}
//                             onChange={(e) =>
//                               handleInputChange(index, "TrailerEquipment", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.Weight}
//                             onChange={(e) =>
//                               handleInputChange(index, "Weight", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.UOM1}
//                             onChange={(e) =>
//                               handleInputChange(index, "UOM1", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.Volume}
//                             onChange={(e) =>
//                               handleInputChange(index, "Volume", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.VolumeUOM}
//                             onChange={(e) =>
//                               handleInputChange(index, "VolumeUOM", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.NoOfAxle}
//                             onChange={(e) =>
//                               handleInputChange(index, "NoOfAxle", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Input
//                             type="text"
//                             value={row.UOM2}
//                             onChange={(e) =>
//                               handleInputChange(index, "UOM2", e.target.value)
//                             }
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Col>
//             </Row>
//             <hr />
//             <Row>
//               <Col md="12">
//                 <Row>
//                   <Col md="6" className="d-flex align-items-center">
//                     <CardTitle className="h4 mb-0 text-primary p-3">
//                       Equipment Type
//                     </CardTitle>
//                   </Col>
//                 </Row>
//                 <Table responsive striped bordered hover>
//                   <thead>
//                     <tr className="text-center">
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Sr.No
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Equipment Type
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Description
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Skill No
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         No of axle
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Max Allowed Weight
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         UOM
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         Max Allowed Volume
//                       </th>
//                       <th style={{ background: "#3498db", color: "white" }}>
//                         UOM
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {dummyData.map((item, index) => (
//                       <tr key={index} className="text-center">
//                         <td>{index + 1}</td>
//                         <td>{item.linkType}</td>
//                         <td>{item.TrailerEquipment}</td>
//                         <td>{item.Weight}</td>
//                         <td>{item.UOM}</td>
//                         <td>{item.Volume}</td>
//                         <td>{item.VolumeUOM}</td>
//                         <td>{item.NoOfAxle}</td>
//                         <td></td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Col>
//             </Row>
//             <div className="d-flex justify-content-end p-3">
//               <Button color="primary" className="mr-3">
//                 Create
//               </Button>
//             </div>
//           </Card>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default VehicleAssociationAdd;

import React, { useState } from "react";
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

const VehicleAssociationAdd = () => {
  const [rows, setRows] = useState([
    {
      linkType: "",
      TrailerEquipment: "",
      Weight: "",
      UOM1: "",
      Volume: "",
      VolumeUOM: "",
      NoOfAxle: "",
      UOM2: "",
    },
  ]);

  // this state for Equipment type
  const [equipmentType, setEquipmentType] = useState([
    {
      equipmentType: "",
      description: "",
      skillNo: "",
      noOfAxle: "",
      maxAllowdedWeight: "",
      eqipmentUOM1: "",
      MaxAllowdedVolume: "",
      eqipmentUOM2: "",
    },
  ]);

  console.log(rows, "these are rows");

  // This is for trailer type
  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  //this is for equipment type
  const equipmentTypeInputChange = (index, field, value) => {
    const newequipmentType = [...equipmentType];
    newequipmentType[index][field] = value;
    setEquipmentType(newequipmentType);
  };

  // this function is for Trailer type table
  const handleKeyDown = (index, field, event) => {

    console.log(index,field,event , "this is")
    if (event.key === "Tab" && index === rows.length - 1 && field === "UOM2") {
      const newRows = [...rows];
      const lastRow = newRows[newRows.length - 1];
      const allFieldsFilled = Object.values(lastRow).every(
        (val) => val.trim() !== ""
      );

      if (allFieldsFilled) {
        setRows([
          ...newRows,
          {
            linkType: "",
            TrailerEquipment: "",
            Weight: "",
            UOM1: "",
            Volume: "",
            VolumeUOM: "",
            NoOfAxle: "",
            UOM2: "",
          },
        ]);
      }
    }
  };

  // this function is for equipment type
  const handleKeyDownEquipment = (index, field, event) => {
    if (
      event.key === "Tab" &&
      index === equipmentType.length - 1 &&
      field === "eqipmentUOM2"
    ) {
      const newRows = [...equipmentType];
      const lastRow = newRows[newRows.length - 1];
      const allFieldsFilled = Object.values(lastRow).every(
        (val) => val.trim() !== ""
      );

      if (allFieldsFilled) {
        setEquipmentType([
          ...newRows,
          {
            equipmentType: "",
            description: "",
            skillNo: "",
            noOfAxle: "",
            maxAllowdedWeight: "",
            eqipmentUOM1: "",
            MaxAllowdedVolume: "",
            eqipmentUOM2: "",
          },
        ]);
      }
    }
  };

  const handleDeleteTrailerType = (index) => {
    if (index === 0) return;
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };


  // this function is for equipment

  const handleDeleteEquipmentType = (index) => {
    if (index === 0) return;
    const newRows = equipmentType.filter((_, i) => i !== index);
    setEquipmentType(newRows);
  };

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
      VolumeUOM: "L",
      NoOfAxle: "",
    },
    {
      "Sr.No": 2,
      linkType: "Trailer",
      TrailerEquipment: "",
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
          <Card>
            <Row>
              <Col md="6" className="d-flex align-items-center">
                <CardTitle className="h4 mb-0 text-primary p-3">
                  Vehicle Class Association Add
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
            <hr />
            <Row>
              <Col md="12">
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
                      <th style={{ background: "#3498db", color: "white" }}>
                        Actions
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
                        Max Allowed Weight
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        UOM
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Max Allowed Volume
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        UOM
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
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
                            onClick={() => handleDeleteTrailerType(index)}
                            disabled={index === 0}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button>
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={row.linkType}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "linkType",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(index, "linkType", e)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={row.TrailerEquipment}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "TrailerEquipment",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(index, "TrailerEquipment", e)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={row.Weight}
                            onChange={(e) =>
                              handleInputChange(index, "Weight", e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, "Weight", e)}
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={row.UOM1}
                            onChange={(e) =>
                              handleInputChange(index, "UOM1", e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, "UOM1", e)}
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={row.Volume}
                            onChange={(e) =>
                              handleInputChange(index, "Volume", e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, "Volume", e)}
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={row.VolumeUOM}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "VolumeUOM",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(index, "VolumeUOM", e)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={row.NoOfAxle}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "NoOfAxle",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(index, "NoOfAxle", e)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={row.UOM2}
                            onChange={(e) =>
                              handleInputChange(index, "UOM2", e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, "UOM2", e)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col md="12">
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
                      <th style={{ background: "#3498db", color: "white" }}>
                        Actions
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
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
                        Max Allowed Weight
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        UOM
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        Max Allowed Volume
                      </th>
                      <th style={{ background: "#3498db", color: "white" }}>
                        UOM
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipmentType.map((item, index) => (
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
                            onClick={() => handleDeleteEquipmentType(index)}
                            disabled={index === 0}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Button>
                        </td>
                        {/* <td>{item.linkType}</td> */}
                        <td>
                          <Input
                            type="text"
                            value={equipmentType.equipmentType}
                            onChange={(e) =>
                              equipmentTypeInputChange(
                                index,
                                "equipmentType",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDownEquipment(index, "equipmentType", e)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={equipmentType.description}
                            onChange={(e) =>
                              equipmentTypeInputChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDownEquipment(index, "description", e)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={equipmentType.skillNo}
                            onChange={(e) =>
                              equipmentTypeInputChange(
                                index,
                                "skillNo",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDownEquipment(index, "skillNo", e)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={equipmentType.noOfAxle}
                            onChange={(e) =>
                              equipmentTypeInputChange(
                                index,
                                "noOfAxle",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDownEquipment(index, "noOfAxle", e)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={equipmentType.maxAllowdedWeight}
                            onChange={(e) =>
                              equipmentTypeInputChange(
                                index,
                                "maxAllowdedWeight",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDownEquipment(
                                index,
                                "maxAllowdedWeight",
                                e
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={equipmentType.eqipmentUOM1}
                            onChange={(e) =>
                              equipmentTypeInputChange(
                                index,
                                "eqipmentUOM1",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDownEquipment(index, "eqipmentUOM1", e)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={equipmentType.MaxAllowdedVolume}
                            onChange={(e) =>
                              equipmentTypeInputChange(
                                index,
                                "MaxAllowdedVolume",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDownEquipment(
                                index,
                                "MaxAllowdedVolume",
                                e
                              )
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={equipmentType.eqipmentUOM2}
                            onChange={(e) =>
                              equipmentTypeInputChange(
                                index,
                                "eqipmentUOM2",
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDownEquipment(index, "eqipmentUOM2", e)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <div className="d-flex justify-content-end p-3">
              <Button color="primary" className="mr-3">
                Create
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default VehicleAssociationAdd;
