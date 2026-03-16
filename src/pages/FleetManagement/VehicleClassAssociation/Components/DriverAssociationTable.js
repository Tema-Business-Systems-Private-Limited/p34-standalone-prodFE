import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  CardTitle,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
// import { Dummyclass } from "";
// import { DummyVehicleAssociation } from "../Dummyclass";
import { DummyVehicleAssociation } from "../DummyClassAssociation";
const moment = require("moment-timezone");

function DriverAssociationTable() {
  let [currentItems, setCurrentItems] = useState(DummyVehicleAssociation);

  let [searchQuery, setSearchQuery] = useState("");

  //   console.log(searchQuery)

  // let handleSearch = (e) => {
  //   let query = e.target.value;
  //   setSearchQuery(query)

  //   console.log(query)

  //   if(query.trim() === ""){
  //       setCurrentItems(DummyVehicleAssociation)
  //   }else{
  //       let filteredItems = currentItems.filter(
  //           (item) =>
  //             item.classCode.toLowerCase().includes(query.toLowerCase()) ||
  //             item.description.toLowerCase().includes(query.toLowerCase()) ||
  //           //   item.active.toLowerCase().includes(query.toLowerCase()) ||
  //             item.type.toLowerCase().includes(query.toLowerCase())
  //         );
      
  //         setCurrentItems(filteredItems);
  //   }

    
  // };

  let handleSearch = (e) => {
    let query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
        setCurrentItems(DummyVehicleAssociation);
    } else {
        let filteredItems = DummyVehicleAssociation.filter(
            (item) =>
                item.classCode.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase()) ||
                item.type.toLowerCase().includes(query.toLowerCase())
        );

        setCurrentItems(filteredItems);
    }
};


  console.log(searchQuery);
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
            Vehicle Class Association at X3 side
          </CardTitle>
        </Col>
      </Row>

      {/* this is search functonality and add vehicle */}
      <Row className="mt-3">
        <Col className="d-flex justify-content-between align-items-center">
          {/* Search Box */}
          <div>
            <Input
              value={searchQuery}
              onChange={handleSearch}
              type="text"
              placeholder="Search ..."
            />
          </div>

          {/* Add Vehicle Button */}
          <div>
            <Link to={"/vehicleclassassociation/add"}>
              <Button>Add Vehicle Class Association</Button>
            </Link>
          </div>
        </Col>
      </Row>
      <div className="mt-3">
        <Table responsive striped hover>
          <thead>
            <tr>
              <th style={{ background: "#3498db", color: "white" }}>
                Class Code
              </th>
              
              <th style={{ background: "#3498db", color: "white" }}>Type</th>
            </tr>
          </thead>
          {/* <Link to={`/vehicle/${item.Vehicule_Id}`}>{item.Vehicule_Id}</Link> */}
          <tbody>
            {currentItems &&
              currentItems.length > 0 &&
              currentItems.map((item, index) => {
                let link = `/vehicleclassassociation/${item.classCode}`;
                // console.log(link)
                return (
                  <tr key={index} className="">
                    <td>
                      <Link to={link}>{item.classCode}</Link>
                    </td>
                 
                    <td>{item.type}</td>

                    {/* Add more table data as needed */}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination aria-label="Page navigation example"></Pagination>
      </div>
    </div>
  );
}

export default DriverAssociationTable;
