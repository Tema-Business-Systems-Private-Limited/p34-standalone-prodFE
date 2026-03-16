import React, { Component, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { CardContent, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

class Dashboard extends Component {

  renderTable(title, data, valueLabel) {
    return (
      <div className="mt-3">
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>{title}</th>
              <th className="text-end">{valueLabel}</th>
            </tr>
          </thead>
          <tbody>
            {data.labels.map((label, index) => (
              <tr key={label}>
                <td>{label}</td>
                <td className="text-end">{data.datasets[0].data[index]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    const { drivingDistanceData, drivingHoursData, safetyData, chartOptions, vehicles } = this.props;

    return (
        <div className="mt-5">

      <div className="bg-white shadow-sm rounded">
       <Row className="g-3">
        {/* Driving Distance Card */}
        <Col xs={12} md={4}>
          <Card className="border rounded shadow-sm">
            <CardBody>
              <CardTitle tag="h6">Driving Distance</CardTitle>
              <h4>26.0 mi</h4>
              <p className="text-muted">AVG DISTANCE DRIVEN</p>
              <Bar data={drivingDistanceData} options={chartOptions} />
              {this.renderTable("Top Vehicles", drivingDistanceData, "Miles")}
            </CardBody>
          </Card>
        </Col>

        {/* Driving Hours Card */}
        <Col xs={12} md={4}>
          <Card className="border rounded shadow-sm">
            <CardBody>
              <CardTitle tag="h6">Driving Hours</CardTitle>
              <h4>2.5 h</h4>
              <p className="text-muted">AVG HOURS DRIVEN</p>
              <Bar data={drivingHoursData} options={chartOptions} />
              {this.renderTable("Top Vehicles", drivingHoursData, "Hours")}
            </CardBody>
          </Card>
        </Col>

        {/* Safety Violations Card */}
        <Col xs={12} md={4}>
          <Card className="border rounded shadow-sm">
            <CardBody>
              <CardTitle tag="h6">Safety Violations</CardTitle>
              <h4>0.0</h4>
              <p className="text-muted">AVG VIOLATIONS</p>
              <div style={{ width: 260, height: 260, margin: "0 auto" }}>
                <Doughnut data={safetyData} options={{ maintainAspectRatio: false }} />
              </div>
              {this.renderTable("Least Safe Vehicles", safetyData, "Violations")}
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
        <div className="bg-white shadow-sm rounded">
            <Table responsive hover striped className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0">Vehicle</th>
                  <th className="border-0">Efficency</th>
                  <th className="border-0">Fuel Used</th>
                  <th className="border-0">Distance</th>
                  <th className="border-0">Est. Carbon Emisions</th>
                  <th className="border-0">Est. Cost</th>
                  <th className="border-0">Total Engine Run Time</th>
                  <th className="border-0">Idle Time (%)</th>
                </tr>
              </thead>
              <tbody>
              {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.vehicle}
                  >
                    <td className="align-middle">{vehicle.vehicle}</td>
                    <td className="align-middle">{vehicle.efficiency}</td>
                    <td className="align-middle">{vehicle.fuelUsed}</td>
                    <td className="align-middle">
                      {vehicle.distance}
                    </td>
                    <td className="align-middle">{vehicle.estCarbonEmissions}</td>
                    <td className="align-middle">
                      {vehicle.estCost}
                    </td>
                    <td className="align-middle">
                      {vehicle.totalEngineRunTime}
                    </td>
                    <td className="align-middle">
                      {vehicle.idleTimePercentage}
                    </td>
                  </tr>
                  
                ))}
              </tbody>
            </Table>
          </div>
      </div>
    );
  }
}

export default Dashboard;
