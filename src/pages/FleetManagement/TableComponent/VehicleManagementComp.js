// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import {
//   Button,
//   CardTitle,
//   Col,
//   Input,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Row,
//   Table,
// } from "reactstrap";
// import { dataArray } from "../DummyData/Data";
// const moment = require("moment-timezone");

// // console.log(dataArray);

// // console.log(data);

// function VehicleManagementComp() {
//   let [currentItems, setCurrentItems] = useState(dataArray);



//   const handleChange =(e)=>{
//     console.log(e.target.value);


//   }
//   return (
//     <div style={{ width: "100%", fontSize: "15px" }} className="">
//       <Row
//         style={{
//           backgroundColor: "currentcolor",
//           height: "70px",
//           width: "100%",
//         }}
//       >
//         <Col md="6" className="d-flex align-items-center">
//           <CardTitle className="h1 pl-3 " style={{ color: "white" }}>
//             Vehicle management at X3 side
//           </CardTitle>
//         </Col>
//       </Row>

//       {/* this is search functonality and add vehicle */}
//       <Row className="mt-3">
//         <Col className="d-flex justify-content-between align-items-center">
//           {/* Search Box */}
//           <div>
//             <Input onChange={handleChange} type="text" placeholder="Search ..." />
//           </div>

//           {/* Add Vehicle Button */}
//           <div> 
//           <Link to={"/vehicle/add-new-vehicle"}>
//             <Button color="primary text-light">
//              Add New Vehicle
//             </Button>
//             </Link>
//           </div>
//         </Col>
//       </Row>
//       <div className="mt-3">
//         <Table responsive striped hover>
//           <thead>
//             <tr>
        
//               <th style={{ background: "#3498db", color: "white" }}>
//                 Vehicule Id
//               </th>
//               <th style={{ background: "#3498db", color: "white" }}>Date</th>
//               <th
//                 className="text-nowrap"
//                 style={{ background: "#3498db", color: "white" }}
//               >
//                 Licence plat
//               </th>
//               <th style={{ background: "#3498db", color: "white" }}>Site</th>
//               <th style={{ background: "#3498db", color: "white" }}>
//                 Capacities
//               </th>
//               <th style={{ background: "#3498db", color: "white" }}>Vehicle</th>
//               <th style={{ background: "#3498db", color: "white" }}>Driver</th>
//               <th style={{ background: "#3498db", color: "white" }}>Volume</th>
//               <th
//                 style={{ background: "#3498db", color: "white" }}
//                 className="text-nowrap"
//               >
//                 Max total distance
//               </th>
//               <th
//                 style={{ background: "#3498db", color: "white" }}
//                 className="text-nowrap"
//               >
//                 Max Total Travel Time
//               </th>
//               <th
//                 style={{ background: "#3498db", color: "white" }}
//                 className="text-nowrap"
//               >
//                 Side Operation
//               </th>
//               <th
//                 style={{ background: "#3498db", color: "white" }}
//                 className="text-nowrap"
//               >
//                 Loading Ramp
//               </th>
//               <th style={{ background: "#3498db", color: "white" }}>
//                 Tailgate
//               </th>

//               {/* Add more table headers as needed */}
//             </tr>
//           </thead>
//           {/* <Link to={`/vehicle/${item.Vehicule_Id}`}>{item.Vehicule_Id}</Link> */}
//           <tbody>
//             {currentItems &&
//               currentItems.length > 0 &&
//               currentItems.map((item, index) => {
//                 let link = `/vehicle/${item.Vehicule_Id}`;
          
//                 return (
//                   <tr key={index} className="">
                
//                     <td>
//                       <Link to={link}>{item.Vehicule_Id}</Link>
//                     </td>
//                     <td className="text-nowrap">
//                       {moment.tz(item.docdate, "").format("MM-DD-YYYY")}
//                     </td>
//                     <td className="text-nowrap">{item.Licence_plat}</td>
//                     <td>{item.Site}</td>
//                     <td>{item.Capacities}</td>
//                     <td>{item.Vehicle}</td>
//                     <td className="text-nowrap">{item.Driver}</td>
//                     <td className="text-nowrap">{item.Volume}</td>
//                     <td>{item.Max_total_distance}</td>
//                     <td>{item.Max_Total_Travel_Time}</td>
//                     <td>{item.Side_Operation}</td>
//                     <td>{item.Loading_Ramp}</td>
//                     <td>{item.Tailgate}</td>

//                     {/* Add more table data as needed */}
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </Table>
//       </div>
   
//     </div>
//   );
// }

// export default VehicleManagementComp;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  CardTitle,
  Col,
  Input,
  Row,
  Table,
} from "reactstrap";
import { dataArray } from "../DummyData/Data";
const moment = require("moment-timezone");

function VehicleManagementComp() {
  const [currentItems, setCurrentItems] = useState(dataArray);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setCurrentItems(dataArray);
    } else {
      const filteredItems = dataArray.filter(item => 
        item.Vehicule_Id.toString().toLowerCase().includes(term) ||
        moment(item.docdate).format("MM-DD-YYYY").toLowerCase().includes(term) ||
        item.Licence_plat.toLowerCase().includes(term) ||
        item.Site.toLowerCase().includes(term) ||
        item.Capacities.toLowerCase().includes(term) ||
        item.Vehicle.toLowerCase().includes(term) ||
        item.Driver.toLowerCase().includes(term) ||
        item.Volume.toString().toLowerCase().includes(term) ||
        item.Max_total_distance.toString().toLowerCase().includes(term) ||
        item.Max_Total_Travel_Time.toString().toLowerCase().includes(term) ||
        item.Side_Operation.toLowerCase().includes(term) ||
        item.Loading_Ramp.toLowerCase().includes(term) ||
        item.Tailgate.toLowerCase().includes(term)
      );

      setCurrentItems(filteredItems);
    }
  }

  return (
    <div style={{ width: "100%", fontSize: "15px" }} className="">
      <Row
        style={{
          backgroundColor: "currentcolor",
          height: "70px",
          width: "100%",
        }}
      >
        <Col md="6" className="d-flex align-items-center">
          <CardTitle className="h1 pl-3 " style={{ color: "white" }}>
            Vehicle management at X3 side
          </CardTitle>
        </Col>
      </Row>

      {/* this is search functionality and add vehicle */}
      <Row className="mt-3">
        <Col className="d-flex justify-content-between align-items-center">
          {/* Search Box */}
          <div>
            <Input onChange={handleChange} type="text" placeholder="Search ..." value={searchTerm} />
          </div>

          {/* Add Vehicle Button */}
          <div> 
            <Link to={"/vehiclemanagement/addvehicle"}>
              <Button color="secondary text-light">
                Add New Vehicle
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
      <div className="mt-3">
        <Table responsive striped hover>
          <thead>
            <tr>
              <th style={{ background: "#3498db", color: "white" }}>
                Vehicule Id
              </th>
              <th style={{ background: "#3498db", color: "white" }}>Date</th>
              <th
                className="text-nowrap"
                style={{ background: "#3498db", color: "white" }}
              >
                Licence plate
              </th>
              <th style={{ background: "#3498db", color: "white" }}>Site</th>
              <th style={{ background: "#3498db", color: "white" }}>
                Capacities
              </th>
              <th style={{ background: "#3498db", color: "white" }}>Vehicle</th>
              <th style={{ background: "#3498db", color: "white" }}>Driver</th>
              <th style={{ background: "#3498db", color: "white" }}>Volume</th>
              <th
                style={{ background: "#3498db", color: "white" }}
                className="text-nowrap"
              >
                Max total distance
              </th>
              <th
                style={{ background: "#3498db", color: "white" }}
                className="text-nowrap"
              >
                Max Total Travel Time
              </th>
              <th
                style={{ background: "#3498db", color: "white" }}
                className="text-nowrap"
              >
                Side Operation
              </th>
              <th
                style={{ background: "#3498db", color: "white" }}
                className="text-nowrap"
              >
                Loading Ramp
              </th>
              <th style={{ background: "#3498db", color: "white" }}>
                Tailgate
              </th>

              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.length > 0 &&
              currentItems.map((item, index) => {
                let link = `/vehicle/${item.Vehicule_Id}`;
                return (
                  <tr key={index} className="">
                    <td>
                      <Link to={link}>{item.Vehicule_Id}</Link>
                    </td>
                    <td className="text-nowrap">
                      {moment(item.docdate).format("MM-DD-YYYY")}
                    </td>
                    <td className="text-nowrap">{item.Licence_plat}</td>
                    <td>{item.Site}</td>
                    <td>{item.Capacities}</td>
                    <td>{item.Vehicle}</td>
                    <td className="text-nowrap">{item.Driver}</td>
                    <td className="text-nowrap">{item.Volume}</td>
                    <td>{item.Max_total_distance}</td>
                    <td>{item.Max_Total_Travel_Time}</td>
                    <td>{item.Side_Operation}</td>
                    <td>{item.Loading_Ramp}</td>
                    <td>{item.Tailgate}</td>

                    {/* Add more table data as needed */}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default VehicleManagementComp;
